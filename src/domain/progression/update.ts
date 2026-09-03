/**
 * Progressionsuppdatering enligt ADR 0001 och slice 7.
 *
 * Ren funktion — ingen React, Prisma eller Next.js. Tidsberoende logik
 * styrs av `now: Date` så att den är deterministiskt testbar.
 *
 * Regler som inte får brytas:
 * - Endast handledarens bedömningar påverkar masteryScore (använd contributesToMastery)
 * - Mastery, freshness och support är tre skilda dimensioner
 * - Progression kan gå NEDÅT: vid CRITICAL safetyFlag, upprepad FULL_INSTRUCTION efter INDEPENDENT
 * - CONSOLIDATED kräver ALLA villkor från PROGRESSION_THRESHOLDS
 * - reviewStatus beräknas ur tiden sedan senaste träning
 * - Observationshistoriken bevaras — aldrig bara senaste status
 */

import { contributesToMastery } from '@/domain/assessment/performance-level';
import { PROGRESSION_THRESHOLDS, REVIEW_THRESHOLDS } from '@/domain/recommendations/constants';
import type {
  ProgressState,
  ReviewStatus,
  SupportLevel,
  SafetyFlag,
  EnvironmentType,
} from './types';

/** Snapshot av nuvarande progression för en skill. */
export interface SkillProgressSnapshot {
  skillId: string;
  state: ProgressState;
  masteryScore: number | null;
  reviewStatus: ReviewStatus;
  lastPracticedAt: Date | null;
  lastIndependentAt: Date | null;
  independentObservationCount: number;
  distinctSessionCount: number;
  contextCoverageScore: number | null;
  /** Historik av observationer, nyast först */
  observations: ObservationSnapshot[];
}

/** Snapshot av en observation. */
export interface ObservationSnapshot {
  assessorRole: string;
  supportLevel: SupportLevel | null;
  safetyFlag: SafetyFlag | null;
  environment: EnvironmentType | null;
  sessionId: string;
  observedAt: Date;
}

/** Input till uppdateringsfunktionen. */
export interface UpdateSkillProgressInput {
  /** Nuvarande progression för denna skill */
  current: SkillProgressSnapshot;
  /** Nya observationer att lägga till (redan lagrade), nyast först */
  newObservations: ObservationSnapshot[];
  /** Nuvarande tidpunkt (för deterministiska tester) */
  now: Date;
}

/** Output från uppdateringen. */
export interface UpdatedSkillProgress {
  state: ProgressState;
  masteryScore: number | null;
  reviewStatus: ReviewStatus;
  lastPracticedAt: Date | null;
  lastIndependentAt: Date | null;
  independentObservationCount: number;
  distinctSessionCount: number;
  contextCoverageScore: number | null;
}

/**
 * Uppdaterar progression för en skill baserat på nya observationer.
 */
export function updateSkillProgress(input: UpdateSkillProgressInput): UpdatedSkillProgress {
  const { current, newObservations, now } = input;

  // Sammanfoga historik: nya observationer först
  const allObservations = [...newObservations, ...current.observations];

  // Räkna nya unika sessioner
  const allSessionIds = new Set(allObservations.map((o) => o.sessionId));
  const distinctSessionCount = allSessionIds.size;

  // Beräkna mastery-score från assessments som bidrar
  const masteryScore = calculateMasteryScore(allObservations);

  // Räkna självständiga observationer
  const independentObservationCount = countIndependentObservations(allObservations);

  // Beräkna context coverage (miljöbredd)
  const contextCoverageScore = calculateContextCoverage(allObservations);

  // Senaste träning och senaste självständiga träning
  const lastPracticedAt =
    allObservations.length > 0 ? allObservations[0].observedAt : current.lastPracticedAt;
  const lastIndependentAt = getLastIndependentAt(allObservations, current.lastIndependentAt);

  // Beräkna review status baserat på tid sedan senaste träning
  const reviewStatus = calculateReviewStatus(lastPracticedAt, now);

  // Avgör ny state
  const state = deriveState({
    currentState: current.state,
    allObservations,
    masteryScore,
    independentObservationCount,
    distinctSessionCount,
    contextCoverageScore,
  });

  return {
    state,
    masteryScore,
    reviewStatus,
    lastPracticedAt,
    lastIndependentAt,
    independentObservationCount,
    distinctSessionCount,
    contextCoverageScore,
  };
}

/**
 * Beräkna mastery-score från observationer.
 * Endast SUPERVISOR och INSTRUCTOR bidrar (ADR 0001, P7, ADR 0008).
 */
function calculateMasteryScore(observations: ObservationSnapshot[]): number | null {
  const relevantObservations = observations.filter((o) => contributesToMastery(o.assessorRole));

  if (relevantObservations.length === 0) {
    return null;
  }

  // Viktad medelvärde med exponentiell avklingning för äldre observationer
  const weights: number[] = [];
  const scores: number[] = [];

  for (let i = 0; i < Math.min(10, relevantObservations.length); i++) {
    const obs = relevantObservations[i];
    const score = supportLevelToScore(obs.supportLevel, obs.safetyFlag);
    if (score === null) continue;

    const weight = Math.exp(-i * 0.3); // Exponentiell avklingning
    weights.push(weight);
    scores.push(score);
  }

  if (scores.length === 0) return null;

  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  const weightedSum = scores.reduce((sum, score, i) => sum + score * weights[i], 0);

  return weightedSum / totalWeight;
}

/**
 * Mappa supportLevel och safetyFlag till mastery-score (0-1).
 */
function supportLevelToScore(
  supportLevel: SupportLevel | null,
  safetyFlag: SafetyFlag | null,
): number | null {
  if (supportLevel === null) return null;

  // CRITICAL safetyFlag ger 0
  if (safetyFlag === 'CRITICAL') return 0;

  // Baspoäng från supportLevel
  let base: number;
  switch (supportLevel) {
    case 'FULL_INSTRUCTION':
      base = 0.25;
      break;
    case 'PROMPTED':
      base = 0.5;
      break;
    case 'MINIMAL_CUE':
      base = 0.75;
      break;
    case 'INDEPENDENT':
      base = 1.0;
      break;
    default:
      return null;
  }

  // ATTENTION safetyFlag drar ner
  if (safetyFlag === 'ATTENTION') {
    return Math.max(0, base - 0.25);
  }

  return base;
}

/**
 * Räkna antal självständiga observationer (MINIMAL_CUE eller INDEPENDENT, utan CRITICAL).
 */
function countIndependentObservations(observations: ObservationSnapshot[]): number {
  return observations.filter(
    (o) =>
      contributesToMastery(o.assessorRole) &&
      (o.supportLevel === 'MINIMAL_CUE' || o.supportLevel === 'INDEPENDENT') &&
      o.safetyFlag !== 'CRITICAL',
  ).length;
}

/**
 * Beräkna miljöbredd (context coverage) som andel av olika miljötyper.
 * Null om ingen miljödata finns.
 */
function calculateContextCoverage(observations: ObservationSnapshot[]): number | null {
  const environments = observations
    .filter((o) => contributesToMastery(o.assessorRole) && o.environment !== null)
    .map((o) => o.environment);

  if (environments.length === 0) return null;

  const uniqueEnvironments = new Set(environments);
  // Normalisera mot upp till 4 olika miljötyper som "fullt täckt"
  return Math.min(1.0, uniqueEnvironments.size / 4);
}

/**
 * Hämta datum för senaste självständiga träning.
 */
function getLastIndependentAt(
  observations: ObservationSnapshot[],
  currentLastIndependent: Date | null,
): Date | null {
  const independentObs = observations.find(
    (o) =>
      contributesToMastery(o.assessorRole) &&
      (o.supportLevel === 'MINIMAL_CUE' || o.supportLevel === 'INDEPENDENT') &&
      o.safetyFlag !== 'CRITICAL',
  );

  return independentObs ? independentObs.observedAt : currentLastIndependent;
}

/**
 * Beräkna review status baserat på tid sedan senaste träning.
 */
function calculateReviewStatus(lastPracticedAt: Date | null, now: Date): ReviewStatus {
  if (!lastPracticedAt) return 'OVERDUE';

  const daysSince = (now.getTime() - lastPracticedAt.getTime()) / (1000 * 60 * 60 * 24);

  if (daysSince <= REVIEW_THRESHOLDS.currentDays) return 'CURRENT';
  if (daysSince <= REVIEW_THRESHOLDS.dueDays) return 'DUE';
  return 'OVERDUE';
}

/**
 * Härleda ny state baserat på observationer och aggregerad data.
 * Progression kan gå både uppåt OCH nedåt.
 */
function deriveState(input: {
  currentState: ProgressState;
  allObservations: ObservationSnapshot[];
  masteryScore: number | null;
  independentObservationCount: number;
  distinctSessionCount: number;
  contextCoverageScore: number | null;
}): ProgressState {
  const {
    currentState,
    allObservations,
    masteryScore,
    independentObservationCount,
    distinctSessionCount,
    // contextCoverageScore används inte i state-logiken ännu, men sparas för framtida behov
  } = input;

  // Kontrollera nedgraderingstriggers först
  const downgrade = checkDowngrade(currentState, allObservations);
  if (downgrade) return downgrade;

  // Kontrollera CONSOLIDATED-villkor. Miljöbredden räknas bara på
  // handledarens observationer — elevens självskattning är kalibrering och
  // får inte heller här påverka hur långt momentet anses ha kommit.
  const distinctEnvironmentCount = new Set(
    allObservations
      .filter((o) => contributesToMastery(o.assessorRole) && o.environment !== null)
      .map((o) => o.environment),
  ).size;

  if (
    canConsolidate(
      masteryScore,
      independentObservationCount,
      distinctSessionCount,
      distinctEnvironmentCount,
    )
  ) {
    return 'CONSOLIDATED';
  }

  // Kontrollera INDEPENDENT-villkor
  if (canBecomeIndependent(allObservations, masteryScore)) {
    return 'INDEPENDENT';
  }

  // Kontrollera PRACTICING-villkor
  if (allObservations.length >= 2) {
    return 'PRACTICING';
  }

  // Kontrollera INTRODUCED-villkor
  if (allObservations.length >= 1) {
    return 'INTRODUCED';
  }

  return 'NOT_STARTED';
}

/**
 * Kontrollera om nedgradering ska ske.
 * Returnerar ny state om nedgradering krävs, annars null.
 */
function checkDowngrade(
  currentState: ProgressState,
  observations: ObservationSnapshot[],
): ProgressState | null {
  // Nedgradering 1: CRITICAL safetyFlag i senaste observationen
  const latestRelevant = observations.find((o) => contributesToMastery(o.assessorRole));
  if (latestRelevant?.safetyFlag === 'CRITICAL') {
    return downgradeOneStep(currentState);
  }

  // Nedgradering 2: upprepad FULL_INSTRUCTION efter INDEPENDENT
  if (currentState === 'INDEPENDENT' || currentState === 'CONSOLIDATED') {
    const recentRelevant = observations
      .filter((o) => contributesToMastery(o.assessorRole))
      .slice(0, 3);

    const fullInstructionCount = recentRelevant.filter(
      (o) => o.supportLevel === 'FULL_INSTRUCTION',
    ).length;

    if (fullInstructionCount >= 2) {
      return downgradeOneStep(currentState);
    }
  }

  return null;
}

/**
 * Nedgradera ett steg.
 */
function downgradeOneStep(currentState: ProgressState): ProgressState {
  switch (currentState) {
    case 'CONSOLIDATED':
      return 'INDEPENDENT';
    case 'INDEPENDENT':
      return 'PRACTICING';
    case 'PRACTICING':
      return 'INTRODUCED';
    case 'INTRODUCED':
      return 'NOT_STARTED';
    default:
      return currentState;
  }
}

/**
 * Kontrollera om CONSOLIDATED-villkor uppfylls.
 * ALLA villkor måste uppfyllas — inget får hoppas över.
 */
function canConsolidate(
  masteryScore: number | null,
  independentObservationCount: number,
  distinctSessionCount: number,
  distinctEnvironmentCount: number,
): boolean {
  if (masteryScore === null) return false;
  if (masteryScore < PROGRESSION_THRESHOLDS.consolidatedMasteryScore) return false;
  if (independentObservationCount < PROGRESSION_THRESHOLDS.consolidatedIndependentObservations)
    return false;
  if (distinctSessionCount < PROGRESSION_THRESHOLDS.consolidatedSessions) return false;

  // Miljöbredd är ett hårt villkor, inte ett valfritt.
  //
  // CONSOLIDATED betyder "stabil över tid" — att momentet suttit i mer än en
  // sorts trafikmiljö. Utan det här villkoret kan någon som bara kört på en
  // tom parkering nå den högsta nivån, vilket är precis den falska trygghet
  // produkten finns för att undvika.
  //
  // Saknas miljödata räknas villkoret som EJ uppfyllt. Frånvaro av bevis är
  // inte bevis på bredd, och konservativt är rätt riktning här.
  if (distinctEnvironmentCount < PROGRESSION_THRESHOLDS.consolidatedContextCategories) {
    return false;
  }

  return true;
}

/**
 * Kontrollera om INDEPENDENT-villkor uppfylls.
 */
function canBecomeIndependent(
  observations: ObservationSnapshot[],
  masteryScore: number | null,
): boolean {
  if (masteryScore === null || masteryScore < 0.7) return false;

  // Minst 2 självständiga observationer (MINIMAL_CUE eller INDEPENDENT)
  const independentCount = observations.filter(
    (o) =>
      contributesToMastery(o.assessorRole) &&
      (o.supportLevel === 'MINIMAL_CUE' || o.supportLevel === 'INDEPENDENT') &&
      o.safetyFlag !== 'CRITICAL',
  ).length;

  return independentCount >= 2;
}
