/**
 * Beräkning av `prerequisite_unlock_value` (ADR 0002).
 *
 * ADR 0002 namnger termen men definierar den aldrig, och de två rimliga
 * läsningarna ger olika beteende:
 *
 *   READY       Momentets EGNA förkunskapskrav är nyss uppfyllda — momentet
 *               har precis blivit tillgängligt. Belönar att gå vidare till
 *               det som just öppnats.
 *
 *   GATEKEEPER  Momentet är i sig ett förkunskapskrav för många ANDRA moment.
 *               Att träna det öppnar dörrar. Belönar grundläggande moment som
 *               annars blockerar stora delar av kompetensträdet.
 *
 * Skillnaden är pedagogisk, inte kosmetisk. READY driver eleven framåt i den
 * ordning momenten låses upp; GATEKEEPER prioriterar det som annars blir en
 * flaskhals. Ett moment kan vara det ena utan att vara det andra.
 *
 * Båda finns implementerade. Valet ligger i `UNLOCK_VALUE_STRATEGY` i
 * `constants.ts` och är medvetet enkelt att byta, eftersom det är ett
 * kalibreringsbeslut som bör provas mot verklig användning (OQ-05).
 *
 * INGEN import av React, Prisma eller Next.js — ren domänlogik.
 */

import type { SkillNode, SkillProgressSnapshot } from '../progression/types.js';

export type UnlockValueStrategy = 'READY' | 'GATEKEEPER' | 'BOTH';

/** Rangordning av progressionstillstånd, lägst först. */
const STATE_ORDER = [
  'NOT_STARTED',
  'INTRODUCED',
  'PRACTICING',
  'INDEPENDENT',
  'CONSOLIDATED',
] as const;

function stateAtLeast(actual: string, required: string): boolean {
  return STATE_ORDER.indexOf(actual as never) >= STATE_ORDER.indexOf(required as never);
}

/**
 * Är momentets egna förkunskapskrav uppfyllda?
 *
 * Ett moment helt utan förkunskapskrav räknas inte som "nyss upplåst" — det
 * har alltid varit tillgängligt, och skulle annars få bonus i all evighet.
 */
export function hasJustBecomeAvailable(
  skill: SkillNode,
  allProgress: readonly SkillProgressSnapshot[],
): boolean {
  if (skill.prerequisites.length === 0) return false;

  return skill.prerequisites.every((pr) => {
    const progress = allProgress.find((p) => p.skillId === pr.prerequisiteSkillId);
    return progress !== undefined && stateAtLeast(progress.state, pr.minimumState);
  });
}

/**
 * Hur många andra moment blockeras direkt av det här momentet, och är ännu
 * inte upplåsta?
 *
 * Räknar bara moment vars krav faktiskt är ouppfyllda just nu — ett moment
 * som redan är tillgängligt låses inte upp av mer träning.
 */
export function countBlockedDependents(
  skill: SkillNode,
  allSkills: readonly SkillNode[],
  allProgress: readonly SkillProgressSnapshot[],
): number {
  return allSkills.filter((candidate) => {
    const requirement = candidate.prerequisites.find((pr) => pr.prerequisiteSkillId === skill.id);
    if (!requirement) return false;

    const progress = allProgress.find((p) => p.skillId === skill.id);
    const met = progress !== undefined && stateAtLeast(progress.state, requirement.minimumState);
    return !met;
  }).length;
}

/**
 * Normaliserat värde i intervallet 0–1, som sedan viktas av
 * `PRIORITY_WEIGHTS.prerequisiteUnlockValue`.
 *
 * GATEKEEPER-delen mättas vid `saturationCount` beroende moment. Utan
 * mättnad skulle ett enda mycket grundläggande moment dominera scoringen
 * helt, och eleven skulle fastna på det tills det var färdigtränat.
 */
export function computeUnlockValue(
  skill: SkillNode,
  allSkills: readonly SkillNode[],
  allProgress: readonly SkillProgressSnapshot[],
  strategy: UnlockValueStrategy,
  saturationCount = 3,
): number {
  const ready = hasJustBecomeAvailable(skill, allProgress) ? 1 : 0;
  const blocked = countBlockedDependents(skill, allSkills, allProgress);
  const gatekeeper = Math.min(blocked / saturationCount, 1);

  switch (strategy) {
    case 'READY':
      return ready;
    case 'GATEKEEPER':
      return gatekeeper;
    case 'BOTH':
      // Medelvärde, inte summa — annars kan ett moment få dubbelt värde och
      // tyst väga tyngre än vikten i ADR 0002 tillåter.
      return (ready + gatekeeper) / 2;
  }
}
