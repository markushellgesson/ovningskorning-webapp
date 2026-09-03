/**
 * Progressionstyper enligt ADR 0001.
 * Dessa är domäntyper — inte Prisma-modeller.
 */

export type ProgressState =
  'NOT_STARTED' | 'INTRODUCED' | 'PRACTICING' | 'INDEPENDENT' | 'CONSOLIDATED';

export type SupportLevel = 'FULL_INSTRUCTION' | 'PROMPTED' | 'MINIMAL_CUE' | 'INDEPENDENT';

export type ReviewStatus = 'CURRENT' | 'DUE' | 'OVERDUE';

export type SafetyFlag = 'NONE' | 'ATTENTION' | 'CRITICAL';

export type EnvironmentType =
  | 'CLOSED_AREA'
  | 'PARKING_AREA'
  | 'RESIDENTIAL'
  | 'URBAN'
  | 'MULTILANE_URBAN'
  | 'RURAL'
  | 'HIGHWAY'
  | 'ROADWORK'
  | 'OTHER';

/**
 * Snapshot av skill-progress vid tidpunkten för rekommendationsgenerering.
 */
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
  recentObservations: {
    supportLevel: SupportLevel | null;
    safetyFlag: SafetyFlag | null;
    observedAt: Date;
  }[];
}

/**
 * Metadata om en skill, nödvändig för rekommendationslogiken.
 */
export interface SkillNode {
  id: string;
  category: string;
  name: string;
  prerequisites: Array<{
    prerequisiteSkillId: string;
    minimumState: ProgressState;
  }>;
  safetyCritical: boolean;
  continuous: boolean;
  applicableTransmissions: string[];
  /** Vilka miljöer som är relevanta för detta moment */
  relevantEnvironments?: EnvironmentType[];
}

/**
 * Sammanfattning av nyliga sessioner.
 */
export interface SessionSummary {
  sessionId: string;
  startedAt: Date;
  skillIds: string[];
  environmentTypes: EnvironmentType[];
  trafficLoad: string | null;
}

/**
 * Snapshot av användarens mål.
 */
export interface GoalSnapshot {
  goalId: string;
  skillId: string | null;
  description: string | null;
  status: 'ACTIVE' | 'COMPLETED' | 'ABANDONED';
}
