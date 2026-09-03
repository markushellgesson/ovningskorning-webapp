/**
 * Rekommendationstyper enligt ADR 0002.
 * REN domänlogik — inget React, Prisma eller Next.js.
 */

import type { EnvironmentType, SupportLevel } from '../progression/types.js';

export type RecommendationReason =
  | { type: 'PREREQUISITE_READY'; unlockedSkillId?: string }
  | { type: 'NEEDS_REPETITION'; daysSincePractice: number }
  | { type: 'RECENT_DIFFICULTY'; sessionId?: string }
  | { type: 'LOW_INDEPENDENCE'; currentSupportLevel: SupportLevel }
  | { type: 'MISSING_ENVIRONMENT_EXPOSURE'; environment: EnvironmentType }
  | { type: 'CONTINUE_CURRENT_FOCUS' }
  | { type: 'LONG_TIME_SINCE_PRACTICE'; daysSince: number }
  | { type: 'USER_GOAL'; goalId?: string }
  | { type: 'SUPERVISOR_REQUESTED' };

export type SkillRole = 'PRIMARY' | 'REVIEW' | 'OBSERVATION' | 'INCIDENTAL';

export interface RecommendedSkill {
  skillId: string;
  skillName: string;
  role: SkillRole;
  priorityScore: number;
  reasons: RecommendationReason[];
}

export interface RecommendationResult {
  primary: RecommendedSkill | null;
  review: RecommendedSkill | null;
  observation: RecommendedSkill | null;
  engineVersion: string;
  insufficientData?: boolean;
  explanation?: string;
}

/**
 * Kontextinformation för rekommendationsgenereringen.
 */
export interface RecommendationContext {
  now: Date;
  availableMinutes?: number;
  environment?: EnvironmentType;
  daylight?: boolean;
  transmissionType?: 'MANUAL' | 'AUTOMATIC';
}
