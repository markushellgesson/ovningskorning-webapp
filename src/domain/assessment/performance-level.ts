/**
 * Performance level-härledning (ADR 0008).
 *
 * performanceLevel är nullable och härleds deterministiskt server-side
 * från supportLevel + safetyFlag. Det är ALDRIG ett användarval och
 * visas ALDRIG i UI.
 *
 * Performance levels:
 * - 0: Kunde inte genomföra säkert / säkerhetsingripande krävdes
 * - 1: Genomförde med omfattande instruktion
 * - 2: Genomförde med tydliga prompts
 * - 3: Genomförde självständigt
 * - 4: Genomförde självständigt med god framförhållning
 *
 * Ren funktion — ingen React, Prisma eller Next.js.
 */

import type { SafetyFlag, SupportLevel } from './types';

/**
 * Härleder performance level från supportLevel och safetyFlag.
 *
 * @param supportLevel - Hur mycket stöd som behövdes
 * @param safetyFlag - Säkerhetsflagga
 * @returns Performance level 0-4, eller null om inte möjligt att härleda
 */
export function derivePerformanceLevel(
  supportLevel: SupportLevel,
  safetyFlag: SafetyFlag,
): number | null {
  // CRITICAL säkerhetsflagga = automatiskt 0
  if (safetyFlag === 'CRITICAL') {
    return 0;
  }

  // ATTENTION säkerhetsflagga sänker performanceLevel med ett steg
  const attentionPenalty = safetyFlag === 'ATTENTION' ? 1 : 0;

  // Basvärde från supportLevel
  let baseLevel: number;
  switch (supportLevel) {
    case 'FULL_INSTRUCTION':
      baseLevel = 1;
      break;
    case 'PROMPTED':
      baseLevel = 2;
      break;
    case 'MINIMAL_CUE':
      baseLevel = 3;
      break;
    case 'INDEPENDENT':
      baseLevel = 4;
      break;
    default:
      return null;
  }

  // Applicera penalty
  const finalLevel = Math.max(0, baseLevel - attentionPenalty);
  return finalLevel;
}

/**
 * Kontrollera om en assessorRole får bidra till masteryScore.
 *
 * Endast SUPERVISOR och INSTRUCTOR får mata mastery. Elevens (STUDENT)
 * självskattning påverkar den ALDRIG (P7, ADR-0001, ADR-0008).
 *
 * @param role - Assessorns roll
 * @returns true om rollen får bidra till mastery
 */
export function contributesToMastery(role: string): boolean {
  return role === 'SUPERVISOR' || role === 'INSTRUCTOR';
}
