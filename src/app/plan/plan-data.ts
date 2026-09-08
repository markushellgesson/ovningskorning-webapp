import content from '@/content';
import type { Skill } from '@/content/types';
import { CATEGORY_LABELS } from '@/content/category-labels';
import { buildProgressionMap } from '@/domain/progression-map/build-map';
import type { SkillMapLevel } from '@/domain/progression-map/build-map';
import type { PassSteg } from '@/components/pass/typer';

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

/** Gemen begynnelsebokstav — momentnamn är vanliga substantiv, inte egennamn. */
function lowerFirst(name: string): string {
  return `${name.charAt(0).toLowerCase()}${name.slice(1)}`;
}

/**
 * Slår ihop visade namn till text. "m.fl." bara om något utelämnas.
 *
 * Bara det första namnet behåller versal: "Spegelinställning, Ljus och
 * signaler m.fl." har en versal mitt i rubriken, vilket är det som får den
 * att se maskingjord ut. Samma regel som categoryTitle nedan använder.
 */
function formatNames(shown: string[], hasMore: boolean): string {
  const [first, ...rest] = shown;
  const names = [first, ...rest.map(lowerFirst)];
  if (names.length === 1) return hasMore ? `${names[0]} m.fl.` : names[0];
  if (hasMore) return `${names.join(', ')} m.fl.`;
  return `${names.slice(0, -1).join(', ')} och ${names[names.length - 1]}`;
}

/**
 * Provar att visa fler och fler momentnamn, från ett och uppåt till
 * MAX_NAMES_SHOWN, och behåller det bredaste alternativet som fortfarande
 * ryms inom längdbudgeten — inte kortare än nödvändigt, men aldrig så långt
 * att raden spricker. Kapar aldrig mitt i ett namn: om redan ETT namn är
 * för långt får det stå som det är.
 */
/**
 * Ett sammanhållet steg — ett eller två kategorier — heter bäst det
 * kategorin heter. Momentnamnen blir då bara ett godtyckligt urval: steg
 * med grupptryck, impulsivitet och självbedömning hette "Grupptryck m.fl."
 * bara för att grupptrycket råkade ligga först i sortOrder, medan
 * "Riskmedvetenhet och självbedömning" säger vad steget faktiskt är.
 *
 * Blandade steg får däremot momentnamn: där finns ingen kategori som
 * täcker helheten, och en av tre kategorier vore lika godtycklig.
 *
 * Returnerar null när kategorierna inte duger som rubrik.
 */
function joinLabels(first: string, second: string): string {
  const eitherHasOch = / och /.test(first) || / och /.test(second);
  return eitherHasOch ? `${first}, ${second}` : `${first} och ${second}`;
}

function categoryTitle(level: SkillMapLevel): string | null {
  const categories = [...new Set(level.groups.flatMap((group) => group.categories))];
  if (categories.length === 0 || categories.length > 2) return null;

  const labels = categories.map(
    (category) => CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] ?? category,
  );
  // Gemener på det andra ledet — "och Självbedömning" mitt i en rubrik är
  // inte svenska.
  //
  // Två kategorinamn binds ihop med komma i stället för "och" när något av
  // dem redan innehåller ett "och": "Grundmanövrering och observation och
  // blick" går inte att läsa.
  const title =
    labels.length === 1
      ? labels[0]
      : joinLabels(labels[0], `${labels[1].charAt(0).toLowerCase()}${labels[1].slice(1)}`);

  return title.length <= MAX_TITLE_LENGTH ? title : null;
}

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

    // Kategorin först när steget är sammanhållet. Är den redan tagen —
    // två steg kan dela enda kategori, som de två motorvägsstegen — faller
    // vi tillbaka på momentnamnen, som alltid skiljer sig åt.
    const byCategory = categoryTitle(level);
    let title = byCategory && !used.has(byCategory) ? byCategory : candidateTitle(names);

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
 * Härleder en kort rubrik för ett steg ur dess kategori eller momentnamn.
 *
 * BESLUT: härledda namn, inte handskrivna. Formgivningsgranskningen
 * föreslog handskrivna stegnamn ("Förarställning m.fl." ser genererat ut)
 * med härledningen som reserv. Det valdes bort, av två skäl:
 *
 * 1. Stegen är inte författade objekt utan utdata från build-map.ts. De
 *    bytte antal tre gånger på en dag (12, 14, 15) i takt med att innehållet
 *    växte, och de flyttar även när ett enda förkunskapskrav ändras eller
 *    MAX_STEP_SIZE justeras. Ett handskrivet namn beskriver då en gruppering
 *    som inte längre finns — och ett namn som nästan stämmer är värre än
 *    ett fult, eftersom det ser rätt ut. Appen har redan haft den buggen i
 *    en annan skepnad: antalet moment stod i klartext som 47 när det var 57.
 * 2. Ett handskrivet namn hade dessutom kunnat dölja att algoritmen grupperat
 *    konstigt (t.ex. att "Stopplikt" hamnar i grundstegen därför att det
 *    saknar förkunskapskrav). Det härledda namnet visar grupperingen som den
 *    är, så att felet syns och kan rättas i innehållet, där det hör hemma.
 *
 * Om handskrivna namn ändå införs någon gång: nyckla dem på stegets
 * uppsättning moment-id (inte på stegnummer eller level-id), och låt ett
 * test fallera när en nyckel inte längre matchar något steg — annars ruttnar
 * de tyst, precis som 47:an.
 *
 * Det som gjordes i stället är typografiskt: sammanhållna steg heter det
 * kategorin heter, blandade steg får momentnamn med bara första namnet i
 * versal (se formatNames), och stegsidan visar hela momentlistan så att
 * rubriken bara behöver vara igenkännbar, inte fullständig.
 */
export function stepTitle(level: SkillMapLevel): string {
  return stepTitles.get(level.id) ?? 'Steg';
}

/**
 * Stegen som passvyn får dem: titel, grupper, momentnamn och handledarens
 * frågor. Byggs en gång här och delas av startsidan och stegsidan — de två
 * hade var sin kopia av samma uträkning.
 *
 * Sist i filen med avsikt: den anropar stepTitle vid modulladdning, och
 * stepTitles-kartan måste finnas då. Högre upp gav det en temporal dead
 * zone som bara syntes i bygget.
 *
 * Bara det skärmen visar. Beskrivningarna ligger kvar på momentsidan; att
 * skicka med dem här var en av tre platser samma text renderades.
 */
export const passSteg: PassSteg[] = progressionMap.levels.map((level, index) => ({
  nummer: index + 1,
  titel: stepTitle(level),
  grupper: level.groups.map((group) => ({
    id: group.id,
    moment: group.skillIds
      .map((id) => skillsById.get(id))
      .filter((skill): skill is Skill => skill !== undefined)
      .map((skill) => ({
        id: skill.id,
        namn: skill.name,
        continuous: skill.continuous,
        fragor: skill.supervisorObservations,
      })),
  })),
}));
