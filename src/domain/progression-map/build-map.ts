/**
 * Träningskarta — härleder en linjär, lodrät ordning genom kompetensmomenten
 * från förkunskapsgrafen i innehållet.
 *
 * REN funktion — inget React, ingen import från content.json. Tar emot
 * moment som argument så den går att testa med påhittade data (se
 * build-map.test.ts).
 *
 * Härledning:
 * 1. NIVÅ — topologiskt djup i hela grafen. Moment utan förkunskapskrav
 *    ligger på nivå 0. Kontinuerliga moment (`continuous: true`) får sin
 *    nivå på exakt samma sätt som alla andra — nivån är introduktionspunkten
 *    som deras förkunskapskrav ger. De tränas sedan vidare löpande genom
 *    resten av utbildningen, men det ändrar inte var de introduceras.
 * 2. STEG — varje nivå som innehåller minst ett moment blir ett synligt steg.
 *    En nivå som svämmar över MAX_STEP_SIZE moment (t.ex. nivåer där många
 *    kontinuerliga moment introduceras tillsammans med flera fristående
 *    kategorier) delas i flera steg efter varandra, utan att någon grupp
 *    bryts isär — annars svarar sidan inte längre på "vad tränar vi idag".
 * 3. GRUPPER inom ett steg — två moment hör ihop om de delar kategori ELLER
 *    har EXAKT samma uppsättning förkunskapskrav (inte bara ett gemensamt,
 *    avlägset krav — annars kedjar nästan allt ihop via ett moment som
 *    SPD-02, som är förkunskap till väldigt mycket). Grupper som blir större
 *    än maxGroupSize delas i ordning efter sortOrder.
 *
 * Kontinuerliga moment ligger alltså i `levels` precis som övriga, men bär
 * med sig `continuous: true` i utdatat så sidan kan märka dem. `continuousSkillIds`
 * finns kvar som en samlad, sorterad lista för sidans avslutande
 * påminnelse-avsnitt — den är inte längre den enda platsen de nämns.
 */

export interface SkillMapPrerequisite {
  prerequisiteSkillId: string;
  minimumState: string;
}

export interface SkillMapInput {
  id: string;
  category: string;
  continuous: boolean;
  sortOrder: number;
  prerequisites: SkillMapPrerequisite[];
}

export interface SkillMapGroup {
  /** Deterministiskt id, t.ex. "level-0-group-1". */
  id: string;
  level: number;
  skillIds: string[];
  /** Unika kategorier bland gruppens moment, sorterade. */
  categories: string[];
  /**
   * Unionen av alla förkunskapskrav för gruppens moment. Ligger alltid på
   * en tidigare nivå (grafen är acyklisk och nivån härleds från kraven),
   * så det här är precis det som ska visas som text mellan steg.
   */
  prerequisiteIds: string[];
}

export interface SkillMapLevel {
  /** Deterministiskt id, t.ex. "level-6" eller "level-6-part-2" om nivån delats. */
  id: string;
  /**
   * Topologiskt djup. Flera SkillMapLevel kan dela samma `level` om nivån
   * var för stor för ett enda steg och delades — de förblir i ordning.
   */
  level: number;
  groups: SkillMapGroup[];
}

export interface ProgressionMap {
  /** Alla moment i ordning, kontinuerliga inräknade — se `SkillMapInput.continuous`. */
  levels: SkillMapLevel[];
  /**
   * Kontinuerliga moment, sorterade för stabil visning. De finns redan i
   * `levels` på sin introduktionsnivå — det här är en samlad lista för en
   * avslutande påminnelse om att de tränas löpande, inte den enda platsen
   * de förekommer.
   */
  continuousSkillIds: string[];
}

/** Grupper på 8 moment är ingen körpass, det är en lista — håll dem små. */
export const MAX_GROUP_SIZE = 4;

/**
 * Ett steg med fler moment än så här svarar inte längre tydligt på
 * "vad tränar vi idag" — dela det i flera steg efter varandra istället.
 */
export const MAX_STEP_SIZE = 8;

export function buildProgressionMap(skills: SkillMapInput[]): ProgressionMap {
  if (skills.length === 0) {
    return { levels: [], continuousSkillIds: [] };
  }

  const byId = new Map(skills.map((s) => [s.id, s]));
  const levelOf = computeLevels(skills, byId);

  const sortKey = (skill: SkillMapInput) => [skill.sortOrder, skill.id] as const;
  const compareSkills = (a: SkillMapInput, b: SkillMapInput) => {
    const [aOrder, aId] = sortKey(a);
    const [bOrder, bId] = sortKey(b);
    return aOrder - bOrder || aId.localeCompare(bId);
  };

  const continuousSkillIds = skills
    .filter((s) => s.continuous)
    .slice()
    .sort(compareSkills)
    .map((s) => s.id);

  const skillsByLevel = new Map<number, SkillMapInput[]>();
  for (const skill of skills) {
    const level = levelOf.get(skill.id)!;
    if (!skillsByLevel.has(level)) skillsByLevel.set(level, []);
    skillsByLevel.get(level)!.push(skill);
  }

  const levels: SkillMapLevel[] = [...skillsByLevel.entries()]
    .sort(([a], [b]) => a - b)
    .flatMap(([level, levelSkills]) =>
      splitIntoSteps(level, buildGroups(level, levelSkills, compareSkills)),
    );

  return { levels, continuousSkillIds };
}

/**
 * Delar en nivås grupper i flera steg om de tillsammans innehåller fler
 * moment än MAX_STEP_SIZE. Delningen sker mellan grupper, i den ordning de
 * redan har (aldrig mitt i en grupp), så "hör ihop"-grupperingen bevaras.
 */
function splitIntoSteps(level: number, groups: SkillMapGroup[]): SkillMapLevel[] {
  const chunks: SkillMapGroup[][] = [];
  let current: SkillMapGroup[] = [];
  let currentSize = 0;

  for (const group of groups) {
    if (current.length > 0 && currentSize + group.skillIds.length > MAX_STEP_SIZE) {
      chunks.push(current);
      current = [];
      currentSize = 0;
    }
    current.push(group);
    currentSize += group.skillIds.length;
  }
  if (current.length > 0) chunks.push(current);

  return chunks.map((chunkGroups, index) => ({
    id: chunks.length > 1 ? `level-${level}-part-${index + 1}` : `level-${level}`,
    level,
    groups: chunkGroups,
  }));
}

/**
 * Topologiskt djup per moment, över HELA grafen (kontinuerliga moment
 * inräknade — de bär ofta kedjan vidare mellan icke-kontinuerliga moment).
 */
function computeLevels(
  skills: SkillMapInput[],
  byId: Map<string, SkillMapInput>,
): Map<string, number> {
  const levelOf = new Map<string, number>();
  const inProgress = new Set<string>();

  function resolve(id: string): number {
    const cached = levelOf.get(id);
    if (cached !== undefined) return cached;

    const skill = byId.get(id);
    if (!skill) {
      throw new Error(`Träningskarta: okänt moment "${id}" refereras som förkunskap.`);
    }
    if (inProgress.has(id)) {
      throw new Error(`Träningskarta: cykel i förkunskapskraven vid "${id}".`);
    }
    if (skill.prerequisites.length === 0) {
      levelOf.set(id, 0);
      return 0;
    }

    inProgress.add(id);
    const level = 1 + Math.max(...skill.prerequisites.map((p) => resolve(p.prerequisiteSkillId)));
    inProgress.delete(id);

    levelOf.set(id, level);
    return level;
  }

  for (const skill of skills) resolve(skill.id);
  return levelOf;
}

/**
 * Bygger grupper inom en nivå. Två moment hamnar i samma grupp om de delar
 * kategori eller har exakt samma (icke-tomma) uppsättning förkunskapskrav.
 * Sammanhängande komponenter (union-find) som blir större än
 * MAX_GROUP_SIZE delas i sorterad ordning.
 */
function buildGroups(
  level: number,
  levelSkills: SkillMapInput[],
  compareSkills: (a: SkillMapInput, b: SkillMapInput) => number,
): SkillMapGroup[] {
  const sorted = levelSkills.slice().sort(compareSkills);

  const parent = new Map<string, string>();
  const find = (id: string): string => {
    let root = id;
    while (parent.get(root) !== root) root = parent.get(root)!;
    // path compression
    let curr = id;
    while (parent.get(curr) !== root) {
      const next = parent.get(curr)!;
      parent.set(curr, root);
      curr = next;
    }
    return root;
  };
  const union = (a: string, b: string) => {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA !== rootB) parent.set(rootA, rootB);
  };
  for (const skill of sorted) parent.set(skill.id, skill.id);

  const prereqKey = (skill: SkillMapInput) =>
    skill.prerequisites
      .map((p) => p.prerequisiteSkillId)
      .slice()
      .sort()
      .join('|');

  for (let i = 0; i < sorted.length; i++) {
    for (let j = i + 1; j < sorted.length; j++) {
      const a = sorted[i];
      const b = sorted[j];
      const sameCategory = a.category === b.category;
      const aKey = prereqKey(a);
      const bKey = prereqKey(b);
      const sharedPrerequisites = aKey.length > 0 && aKey === bKey;
      if (sameCategory || sharedPrerequisites) {
        union(a.id, b.id);
      }
    }
  }

  const components = new Map<string, SkillMapInput[]>();
  for (const skill of sorted) {
    const root = find(skill.id);
    if (!components.has(root)) components.set(root, []);
    components.get(root)!.push(skill);
  }

  // Dela komponenter större än MAX_GROUP_SIZE i ordning, och sortera
  // grupperna efter det lägsta sortOrder de innehåller för determinism.
  const chunks: SkillMapInput[][] = [];
  for (const members of components.values()) {
    for (let i = 0; i < members.length; i += MAX_GROUP_SIZE) {
      chunks.push(members.slice(i, i + MAX_GROUP_SIZE));
    }
  }
  chunks.sort((a, b) => compareSkills(a[0], b[0]));

  return chunks.map((members, index) => {
    const categories = [...new Set(members.map((m) => m.category))].sort();
    const prerequisiteIds = [
      ...new Set(members.flatMap((m) => m.prerequisites.map((p) => p.prerequisiteSkillId))),
    ].sort();

    return {
      id: `level-${level}-group-${index + 1}`,
      level,
      skillIds: members.map((m) => m.id),
      categories,
      prerequisiteIds,
    };
  });
}
