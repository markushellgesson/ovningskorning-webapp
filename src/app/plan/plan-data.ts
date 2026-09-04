import content from '@/content';
import type { Skill } from '@/content/types';
import { CATEGORY_LABELS } from '@/content/category-labels';
import { buildProgressionMap } from '@/domain/progression-map/build-map';
import type { SkillMapLevel } from '@/domain/progression-map/build-map';

export const skills = content.skills;
export const skillsById = new Map(skills.map((skill) => [skill.id, skill]));

// Beräknas vid bygget — sidan är statiskt exporterad och har ingen server
// att räkna om kartan i efterhand (se ADR 0013 / output: 'export'). Delas
// mellan översikten och detaljvyn genom den här modulen så kartan bara
// byggs en gång, inte en gång per sida.
export const progressionMap = buildProgressionMap(skills);

// Kontinuerliga moment grupperade per kategori, i den ordning kategorin
// först dyker upp bland de kontinuerliga momenten — samma sorterade
// ordning som resten av innehållet (sortOrder).
export const continuousByCategory = new Map<string, Skill[]>();
for (const id of progressionMap.continuousSkillIds) {
  const skill = skillsById.get(id);
  if (!skill) continue;
  if (!continuousByCategory.has(skill.category)) {
    continuousByCategory.set(skill.category, []);
  }
  continuousByCategory.get(skill.category)!.push(skill);
}

/** Antal moment ett steg innehåller, oavsett hur momenten är grupperade inom det. */
export function countSkillsInLevel(level: SkillMapLevel): number {
  return level.groups.reduce((sum, group) => sum + group.skillIds.length, 0);
}

/**
 * Momentnamnen i ett steg, i samma ordning de listas i steget (grupper och
 * moment inom grupper ligger redan i sortOrder — se build-map.ts).
 *
 * Kategorin räcker inte som rubrik: flera steg delar kategori (t.ex. tre
 * steg i rad är MANEUVERING), medan momentnamnen alltid skiljer sig åt
 * eftersom varje moment bara hör till ett enda steg (nivån härleds en gång
 * per moment i build-map.ts). Rubriker byggs därför av momentnamn, inte av
 * kategori.
 */
function skillNamesForLevel(level: SkillMapLevel): string[] {
  return level.groups
    .flatMap((group) => group.skillIds)
    .map((skillId) => skillsById.get(skillId)?.name)
    .filter((name): name is string => Boolean(name));
}

/** Fler namn än så här ryms inte på en rad, oavsett hur korta de är. */
const MAX_NAMES_SHOWN = 2;

/**
 * Ungefärlig maxlängd för att rymmas på en rad på en telefon. Satt med
 * marginal under den tidigare, handskrivna rubriken "Riskmedvetenhet och
 * Självbedömning" (35 tecken), som redan visades på en rad i detaljvyns
 * rubrik (den trängsta platsen rubriken används på, se plan/[step]/page.tsx)
 * utan att spricka.
 */
const MAX_TITLE_LENGTH = 44;

/** Slår ihop visade namn till text. "med flera" bara om något utelämnas. */
function formatNames(shown: string[], hasMore: boolean): string {
  if (shown.length === 1) return hasMore ? `${shown[0]} m.fl.` : shown[0];
  if (hasMore) return `${shown.join(', ')} m.fl.`;
  return `${shown.slice(0, -1).join(', ')} och ${shown[shown.length - 1]}`;
}

/**
 * Provar att visa fler och fler momentnamn, från ett och uppåt till
 * MAX_NAMES_SHOWN, och behåller det bredaste alternativet som fortfarande
 * ryms inom längdbudgeten — inte kortare än nödvändigt, men aldrig så långt
 * att raden spricker. Kapar aldrig mitt i ett namn: om redan ETT namn är
 * för långt får det stå som det är.
 */
function candidateTitle(names: string[]): string {
  if (names.length === 0) return 'Steg';

  let best = formatNames(names.slice(0, 1), names.length > 1);
  for (let count = 2; count <= Math.min(MAX_NAMES_SHOWN, names.length); count++) {
    const candidate = formatNames(names.slice(0, count), names.length > count);
    if (candidate.length > MAX_TITLE_LENGTH) break;
    best = candidate;
  }
  return best;
}

/**
 * Rubrik per steg, förberäknad för hela kartan (inte bara ett steg i
 * taget) så att inga två steg kan få samma rubrik. Momentnamn är i praktiken
 * unika per moment och varje moment hör bara till ett steg, så kollisioner
 * ska aldrig inträffa — men om innehållet någon gång växer på ett sätt som
 * ger samma kandidatrubrik i två steg, visas fler momentnamn i den senare
 * tills de skiljer sig åt, med kategorin som absolut sista utväg.
 */
const stepTitles = new Map<string, string>();
{
  const used = new Set<string>();
  for (const level of progressionMap.levels) {
    const names = skillNamesForLevel(level);
    let shownCount = Math.min(MAX_NAMES_SHOWN, names.length) || 1;
    let title = candidateTitle(names);

    while (used.has(title) && shownCount < names.length) {
      shownCount += 1;
      title = formatNames(names.slice(0, shownCount), names.length > shownCount);
    }
    if (used.has(title)) {
      const category = level.groups[0]?.categories[0];
      const label = category
        ? (CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] ?? category)
        : level.id;
      title = `${title} (${label})`;
    }

    used.add(title);
    stepTitles.set(level.id, title);
  }
}

/**
 * Härleder en kort rubrik för ett steg ur dess faktiska momentnamn, i
 * stället för en handskriven lista eller kategorinamnet — antalet steg och
 * moment växer i takt med innehållet (se plan/[step]/page.tsx), och
 * kategorin ensam räcker inte för att skilja steg åt.
 */
export function stepTitle(level: SkillMapLevel): string {
  return stepTitles.get(level.id) ?? 'Steg';
}
