import type { ProgressionMap, SkillMapInput, SkillMapLevel } from '../progression-map/build-map';
import type { PlanSteg } from './plan';

/**
 * Gör den handskrivna planen till samma form som den uträknade kartan hade,
 * så att Ordning, stegsidan och passvyn inte behöver veta att ordningen
 * numera är planerad. Ett steg blir en `SkillMapLevel`, ett pass blir en
 * grupp; gruppens id är passets id.
 *
 * Och vägrar bygga om planen är fel. Det är hela poängen med att ha kvar
 * förkunskapsgrafen: den är inte längre det som *bestämmer* ordningen, men
 * den är det som *vaktar* den. Skulle någon flytta Backning före Styrning
 * faller bygget, inte eleven.
 */
export function buildMapFromPlan(plan: PlanSteg[], skills: SkillMapInput[]): ProgressionMap {
  const fel = validatePlan(plan, skills);
  if (fel.length > 0) {
    throw new Error(`Planen håller inte:\n- ${fel.join('\n- ')}`);
  }

  const byId = new Map(skills.map((s) => [s.id, s]));

  const levels: SkillMapLevel[] = plan.map((steg, i) => ({
    id: steg.id,
    level: i,
    groups: steg.pass.map((pass) => {
      const medlemmar = pass.momentIds.map((id) => byId.get(id)!);
      const egna = new Set(pass.momentIds);
      return {
        id: pass.id,
        level: i,
        categories: [...new Set(medlemmar.map((m) => m.category))].sort(),
        skillIds: pass.momentIds,
        // Förkunskaper utanför passet — de som ska vara gjorda innan.
        prerequisiteIds: [
          ...new Set(
            medlemmar
              .flatMap((m) => m.prerequisites.map((p) => p.prerequisiteSkillId))
              .filter((id) => !egna.has(id)),
          ),
        ].sort(),
      };
    }),
  }));

  const continuousSkillIds = skills
    .filter((s) => s.continuous)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.id.localeCompare(b.id))
    .map((s) => s.id);

  return { levels, continuousSkillIds };
}

/**
 * Allt som kan vara fel med en plan, som lista. Tom lista = planen håller.
 *
 * Reglerna: varje moment exakt en gång; inga okända id:n; varje förkunskap
 * ligger i ett tidigare pass, eller tidigare i samma pass — momenten inom
 * ett pass övas i den ordning de står.
 */
export function validatePlan(plan: PlanSteg[], skills: SkillMapInput[]): string[] {
  const fel: string[] = [];
  const kända = new Set(skills.map((s) => s.id));
  const byId = new Map(skills.map((s) => [s.id, s]));

  // Position för varje moment: (passindex globalt, index i passet).
  const position = new Map<string, [number, number]>();
  let passnr = 0;
  for (const steg of plan) {
    for (const pass of steg.pass) {
      if (pass.momentIds.length === 0) fel.push(`${pass.id}: tomt pass`);
      pass.momentIds.forEach((id, i) => {
        if (!kända.has(id)) fel.push(`${pass.id}: okänt moment ${id}`);
        if (position.has(id)) fel.push(`${id} ligger två gånger (${pass.id})`);
        position.set(id, [passnr, i]);
      });
      passnr += 1;
    }
  }

  for (const id of kända) {
    if (!position.has(id)) fel.push(`${id} saknas i planen`);
  }

  for (const [id, [pass, i]] of position) {
    const skill = byId.get(id);
    if (!skill) continue;
    for (const { prerequisiteSkillId: krav } of skill.prerequisites) {
      const kravPos = position.get(krav);
      if (!kravPos) continue; // rapporteras redan som saknat
      const [kravPass, kravI] = kravPos;
      const före = kravPass < pass || (kravPass === pass && kravI < i);
      if (!före) fel.push(`${id} bygger på ${krav}, som kommer efter`);
    }
  }

  return fel;
}
