/**
 * Assessment-domäntyper (ADR 0008: Dual Assessment Model).
 *
 * Ingen import av React, Prisma eller Next.js — ren domänlogik.
 */

export type AssessorRole = 'STUDENT' | 'SUPERVISOR' | 'INSTRUCTOR';

export type SupportLevel =
  | 'FULL_INSTRUCTION' // Behövde aktiv guidning
  | 'PROMPTED' // Behövde påminnelser
  | 'MINIMAL_CUE' // Någon enstaka cue
  | 'INDEPENDENT'; // Självständigt

export type SafetyFlag =
  | 'NONE' // Inga säkerhetsproblem
  | 'ATTENTION' // Något att uppmärksamma
  | 'CRITICAL'; // Säkerhetskritisk händelse

export type SessionFeeling = 'HEAVY' | 'MIXED' | 'GOOD';

/**
 * En bedömning av ett moment i en session.
 */
export interface Assessment {
  id: string;
  sessionId: string;
  skillId: string;
  assessorId: string;
  assessorRole: AssessorRole;
  supportLevel: SupportLevel;
  /** Härleds server-side från supportLevel + safetyFlag. Aldrig ett användarval. */
  performanceLevel: number | null;
  safetyFlag: SafetyFlag;
  note?: string | null;
  createdAt: Date;
}

/**
 * Elevens reflektion.
 */
export interface StudentReflection {
  id: string;
  sessionId: string;
  overallFeeling?: SessionFeeling | null;
  confidence?: number | null; // 1-5
  wentWell?: string | null;
  improveNext?: string | null;
  createdAt: Date;
}

/**
 * Handledarens feedback.
 */
export interface SupervisorFeedback {
  id: string;
  sessionId: string;
  strength?: string | null;
  nextFocus?: string | null;
  createdAt: Date;
}

/**
 * Jämförelse mellan två perspektiv på samma moment.
 */
export interface AssessmentComparison {
  skillId: string;
  skillName: string;
  studentAssessment?: Assessment;
  supervisorAssessment?: Assessment;
  divergence: AssessmentDivergence;
}

/**
 * Skillnad mellan två bedömningar.
 */
export interface AssessmentDivergence {
  exists: boolean;
  /** Formulerad som lärosignal, aldrig som "fel". */
  discussionPrompt?: string;
}
