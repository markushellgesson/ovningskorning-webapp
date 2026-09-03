/**
 * Rekommendationsmotor v1 enligt ADR 0002.
 *
 * REN funktion — inget React, Prisma eller Next.js.
 * Deterministisk: samma input + samma `now` → exakt samma output.
 *
 * Pipeline:
 * 1. Samla kandidater
 * 2. Tillämpa HÅRDA CONSTRAINTS (filtrera bort)
 * 3. Beräkna PRIORITERINGSSCORE
 * 4. Välj PRIMARY + REVIEW + OBSERVATION
 * 5. Generera strukturerade skäl
 * 6. Returnera med engineVersion
 */

import type {
  SkillNode,
  SkillProgressSnapshot,
  SessionSummary,
  GoalSnapshot,
} from '../progression/types';
import type {
  RecommendationResult,
  RecommendationContext,
  RecommendedSkill,
  RecommendationReason,
} from './types';
import {
  ENGINE_VERSION,
  PRIORITY_WEIGHTS,
  SUFFICIENT_DATA_THRESHOLDS,
  REVIEW_THRESHOLDS,
  UNLOCK_VALUE_STRATEGY,
  UNLOCK_VALUE_SATURATION,
} from './constants';
import { computeUnlockValue, hasJustBecomeAvailable } from './unlock-value';

interface RecommendationInput {
  skills: SkillNode[];
  progress: SkillProgressSnapshot[];
  recentSessions: SessionSummary[];
  goals: GoalSnapshot[];
  context: RecommendationContext;
}

interface ScoredCandidate {
  skill: SkillNode;
  progress: SkillProgressSnapshot | null;
  score: number;
  reasons: RecommendationReason[];
}

/**
 * Huvudfunktion: generera rekommendation.
 */
export function recommendNextTraining(input: RecommendationInput): RecommendationResult {
  const { skills, progress, recentSessions, goals, context } = input;

  // Otillräckligt underlag?
  if (!hasSufficientData(progress, recentSessions)) {
    return {
      primary: null,
      review: null,
      observation: null,
      engineVersion: ENGINE_VERSION,
      insufficientData: true,
      explanation:
        'Det finns ännu inte tillräckligt underlag för en tydlig rekommendation. Träna några moment och kom tillbaka.',
    };
  }

  // 1. Samla kandidater
  const candidates = skills.map((skill) => ({
    skill,
    progress: progress.find((p) => p.skillId === skill.id) ?? null,
  }));

  // 2. Hårda constraints
  const viable = candidates.filter((c) =>
    passesHardConstraints(c.skill, c.progress, progress, context),
  );

  if (viable.length === 0) {
    return {
      primary: null,
      review: null,
      observation: null,
      engineVersion: ENGINE_VERSION,
      explanation:
        'Inga moment passar de nuvarande förutsättningarna (växellåda, väder, dagsljus). Prova en annan kontext.',
    };
  }

  // 3. Beräkna prioriteringsscore och skäl
  const scored = viable.map((c) =>
    scoreCandidate(c.skill, c.progress, progress, skills, goals, recentSessions, context),
  );

  // 4. Välj PRIMARY, REVIEW, OBSERVATION
  const primary = selectPrimary(scored);
  const review = selectReview(scored, primary);
  const observation = selectObservation(scored, primary, review);

  return {
    primary,
    review,
    observation,
    engineVersion: ENGINE_VERSION,
  };
}

/**
 * Avgör om underlaget är tillräckligt för en rekommendation.
 */
function hasSufficientData(progress: SkillProgressSnapshot[], sessions: SessionSummary[]): boolean {
  const skillsWithProgress = progress.filter((p) => p.state !== 'NOT_STARTED').length;
  return (
    skillsWithProgress >= SUFFICIENT_DATA_THRESHOLDS.minimumSkillsWithProgress &&
    sessions.length >= SUFFICIENT_DATA_THRESHOLDS.minimumTotalSessions
  );
}

/**
 * Hårda constraints enligt ADR 0002.
 * Returnerar true om momentet KAN rekommenderas.
 */
function passesHardConstraints(
  skill: SkillNode,
  skillProgress: SkillProgressSnapshot | null,
  allProgress: SkillProgressSnapshot[],
  context: RecommendationContext,
): boolean {
  // Växellåda: skill ej tillämpbar för fordonet?
  if (
    context.transmissionType &&
    skill.applicableTransmissions.length > 0 &&
    !skill.applicableTransmissions.includes(context.transmissionType)
  ) {
    return false;
  }

  // Prerequisites: ej uppfyllda?
  for (const prereq of skill.prerequisites) {
    const prereqProgress = allProgress.find((p) => p.skillId === prereq.prerequisiteSkillId);
    if (!prereqProgress || !isStateAtLeast(prereqProgress.state, prereq.minimumState)) {
      return false;
    }
  }

  // CRITICAL safety flag nyligen?
  if (skillProgress?.recentObservations.some((o) => o.safetyFlag === 'CRITICAL')) {
    // Rekommendera inte detta moment — det behöver remediering
    return false;
  }

  return true;
}

/**
 * Jämför om state är minst lika långt som required.
 * Exporterad för att kunna användas i scoreCandidate.
 */
export function isStateAtLeast(current: string, required: string): boolean {
  const order = ['NOT_STARTED', 'INTRODUCED', 'PRACTICING', 'INDEPENDENT', 'CONSOLIDATED'];
  const currentIdx = order.indexOf(current);
  const requiredIdx = order.indexOf(required);
  return currentIdx >= requiredIdx;
}

/**
 * Beräkna prioriteringsscore och skäl för en kandidat.
 */
function scoreCandidate(
  skill: SkillNode,
  progress: SkillProgressSnapshot | null,
  allProgress: SkillProgressSnapshot[],
  allSkills: SkillNode[],
  goals: GoalSnapshot[],
  recentSessions: SessionSummary[],
  context: RecommendationContext,
): ScoredCandidate {
  let score = 0;
  const reasons: RecommendationReason[] = [];

  // Safety gap
  if (skill.safetyCritical) {
    const masteryGap = 1 - (progress?.masteryScore ?? 0);
    score += PRIORITY_WEIGHTS.safetyGap * masteryGap;
    if (masteryGap > 0.5) {
      reasons.push({
        type: 'RECENT_DIFFICULTY',
      });
    }
  }

  // Repetition due
  if (progress?.lastPracticedAt) {
    const daysSince = daysBetween(progress.lastPracticedAt, context.now);
    if (daysSince > REVIEW_THRESHOLDS.dueDays) {
      score += PRIORITY_WEIGHTS.repetitionDue;
      reasons.push({ type: 'LONG_TIME_SINCE_PRACTICE', daysSince });
    } else if (daysSince > REVIEW_THRESHOLDS.currentDays) {
      score += PRIORITY_WEIGHTS.repetitionDue * 0.5;
      reasons.push({ type: 'NEEDS_REPETITION', daysSincePractice: daysSince });
    }
  }

  // Mastery gap
  const masteryGap = 1 - (progress?.masteryScore ?? 0);
  score += PRIORITY_WEIGHTS.masteryGap * masteryGap;

  // Prerequisite unlock value. ADR 0002 namnger termen men definierar den
  // inte — se unlock-value.ts för de två läsningarna och constants.ts för
  // vilken som är vald. Poängen och skälet är avsiktligt frikopplade:
  // PREREQUISITE_READY är alltid ett begripligt skäl att visa användaren,
  // oavsett hur värdet råkar beräknas.
  score +=
    PRIORITY_WEIGHTS.prerequisiteUnlockValue *
    computeUnlockValue(
      skill,
      allSkills,
      allProgress,
      UNLOCK_VALUE_STRATEGY,
      UNLOCK_VALUE_SATURATION,
    );

  const justBecameAvailable = hasJustBecomeAvailable(skill, allProgress);
  if (
    justBecameAvailable &&
    (!progress || progress.state === 'NOT_STARTED' || progress.state === 'INTRODUCED')
  ) {
    reasons.push({ type: 'PREREQUISITE_READY' });
  }

  // User goal fit
  const hasGoal = goals.some((g) => g.status === 'ACTIVE' && g.skillId === skill.id);
  if (hasGoal) {
    score += PRIORITY_WEIGHTS.userGoalFit;
    reasons.push({ type: 'USER_GOAL' });
  }

  // Context opportunity
  // Om kontexten passar momentets miljö, ge liten bonus
  if (context.environment && skill.relevantEnvironments?.includes(context.environment)) {
    score += PRIORITY_WEIGHTS.contextOpportunity;
  }

  // LOW_INDEPENDENCE
  const recentSupport = progress?.recentObservations[0]?.supportLevel;
  if (recentSupport === 'FULL_INSTRUCTION' || recentSupport === 'PROMPTED') {
    reasons.push({
      type: 'LOW_INDEPENDENCE',
      currentSupportLevel: recentSupport,
    });
  }

  // MISSING_ENVIRONMENT_EXPOSURE
  // (Förenklad — en verklig implementation skulle kolla historiken)
  if (progress && progress.contextCoverageScore !== null && progress.contextCoverageScore < 0.5) {
    const missingEnv = skill.relevantEnvironments?.[0];
    if (missingEnv) {
      reasons.push({
        type: 'MISSING_ENVIRONMENT_EXPOSURE',
        environment: missingEnv,
      });
    }
  }

  return {
    skill,
    progress,
    score,
    reasons,
  };
}

/**
 * Välj primary rekommendation.
 */
function selectPrimary(candidates: ScoredCandidate[]): RecommendedSkill | null {
  if (candidates.length === 0) return null;

  // Sortera efter score, högst först
  const sorted = [...candidates].sort((a, b) => b.score - a.score);
  const best = sorted[0];

  return {
    skillId: best.skill.id,
    skillName: best.skill.name,
    role: 'PRIMARY',
    priorityScore: best.score,
    reasons: best.reasons,
  };
}

/**
 * Välj review rekommendation.
 * Ska vara något som tränat förut men behöver repetition.
 */
function selectReview(
  candidates: ScoredCandidate[],
  primary: RecommendedSkill | null,
): RecommendedSkill | null {
  const reviewCandidates = candidates.filter(
    (c) =>
      c.progress &&
      c.progress.state !== 'NOT_STARTED' &&
      c.progress.distinctSessionCount >= 1 &&
      c.skill.id !== primary?.skillId,
  );

  if (reviewCandidates.length === 0) return null;

  // Välj den med längst tid sedan senaste träning
  const sorted = [...reviewCandidates].sort((a, b) => {
    const aDays = a.progress?.lastPracticedAt
      ? new Date().getTime() - a.progress.lastPracticedAt.getTime()
      : Infinity; // Om aldrig tränat, längst tid
    const bDays = b.progress?.lastPracticedAt
      ? new Date().getTime() - b.progress.lastPracticedAt.getTime()
      : Infinity;
    return bDays - aDays;
  });

  const best = sorted[0];
  return {
    skillId: best.skill.id,
    skillName: best.skill.name,
    role: 'REVIEW',
    priorityScore: best.score,
    reasons: best.reasons,
  };
}

/**
 * Välj observation rekommendation.
 * Kontinuerliga moment (hazard-relaterade).
 */
function selectObservation(
  candidates: ScoredCandidate[],
  primary: RecommendedSkill | null,
  review: RecommendedSkill | null,
): RecommendedSkill | null {
  const observationCandidates = candidates.filter(
    (c) => c.skill.continuous && c.skill.id !== primary?.skillId && c.skill.id !== review?.skillId,
  );

  if (observationCandidates.length === 0) return null;

  // Välj det med högst score bland de kontinuerliga
  const sorted = [...observationCandidates].sort((a, b) => b.score - a.score);
  const best = sorted[0];

  return {
    skillId: best.skill.id,
    skillName: best.skill.name,
    role: 'OBSERVATION',
    priorityScore: best.score,
    reasons: best.reasons,
  };
}

/**
 * Räkna antal dagar mellan två datum.
 */
function daysBetween(earlier: Date, later: Date): number {
  const ms = later.getTime() - earlier.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}
