// Typer för användargenererad data i localStorage

export type JourneyStage = 'FOUNDATION' | 'DEVELOPMENT' | 'INTEGRATION' | 'MASTERY';
export type TransmissionGoal = 'MANUAL' | 'AUTOMATIC' | 'UNDECIDED';
export type ExperienceLevel = 'NEW' | 'BEGINNER' | 'REGULAR' | 'EXPERIENCED';
export type DesiredCadence = 'MULTIPLE_WEEKLY' | 'WEEKLY' | 'OCCASIONAL' | 'UNKNOWN';

export type SessionStatus =
  'PLANNED' | 'READY' | 'IN_PROGRESS' | 'COMPLETED' | 'REFLECTED' | 'CANCELLED';

export type ProgressState =
  'NOT_STARTED' | 'INTRODUCED' | 'PRACTICING' | 'INDEPENDENT' | 'CONSOLIDATED';

export type SupportLevel = 'FULL_INSTRUCTION' | 'PROMPTED' | 'MINIMAL_CUE' | 'INDEPENDENT';
export type SafetyFlag = 'NONE' | 'ATTENTION' | 'CRITICAL';
export type AssessorRole = 'STUDENT' | 'SUPERVISOR' | 'INSTRUCTOR';
export type ReviewStatus = 'CURRENT' | 'DUE' | 'OVERDUE';

export interface Profile {
  displayName: string;
  journeyStage: JourneyStage;
  transmissionGoal: TransmissionGoal;
  learnerPermitConfirmedAt: string | null;
  experienceLevel: ExperienceLevel | null;
  desiredCadence: DesiredCadence | null;
  priorEnvironments: string[];
}

export interface DrivingSession {
  id: string;
  status: SessionStatus;
  source: string;
  plannedAt: string | null;
  plannedMinutes: number | null;
  plannedFocus: string | null;
  startedAt: string | null;
  endedAt: string | null;
  drivingMinutes: number | null;
  distanceKm: number | null;
  daylight: string | null;
  weather: string | null;
  trafficLoad: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Var paret är: ett steg i ordningen och en grupp i steget.
 *
 * Gruppen är passet. Grupperna "hör ihop, kan tränas i samma pass" är
 * redan den granskade indelningen av ett steg i kvällar, och de är den
 * enhet föräldern räknar i. Steget är bara stolpen vägen passerar.
 */
export interface Passposition {
  /** 1-baserat, som stolpen. */
  steg: number;
  /** 0-baserat index i stegets grupper. */
  grupp: number;
}

export type Passutfall = 'bra' | 'sadar' | 'taom' | 'redan';

/**
 * Ett genomfört pass. En rad per pass, aldrig mer.
 *
 * `nastaGang` är den enda fritexten i appen: det föräldern tänkte vid
 * köksbordet och behöver i uppfarten nästa söndag. Den hör till passet den
 * skrevs efter, så historiken blir en rad per pass med datum, utfall och
 * vad man tänkte — och flyttar med till servern som ett fält på passet.
 */
export interface Passpost {
  datum: string;
  steg: number;
  grupp: number;
  momentIds: string[];
  utfall: Passutfall;
  nastaGang: string | null;
}

export interface SessionSkill {
  sessionId: string;
  skillId: string;
  role: string; // PRIMARY | REVIEW | OBSERVATION | INCIDENTAL
}

export interface Assessment {
  id: string;
  sessionId: string;
  skillId: string;
  assessorRole: AssessorRole;
  observedState: ProgressState;
  supportLevel: SupportLevel | null;
  safetyFlag: SafetyFlag;
  notes: string | null;
  createdAt: string;
}

export interface StudentReflection {
  sessionId: string;
  wentWell: string | null;
  challenging: string | null;
  learned: string | null;
  nextFocus: string | null;
  createdAt: string;
}

export interface SkillProgress {
  skillId: string;
  state: ProgressState;
  masteryScore: number | null;
  reviewStatus: ReviewStatus;
  lastPracticedAt: string | null;
  lastIndependentAt: string | null;
  independentObservationCount: number;
  distinctSessionCount: number;
  contextCoverageScore: number | null;
  updatedAt: string;
}

export interface SkillProgressObservation {
  id: string;
  skillId: string;
  sessionId: string | null;
  assessorRole: AssessorRole | null;
  observedState: ProgressState;
  supportLevel: SupportLevel | null;
  safetyFlag: SafetyFlag | null;
  observedAt: string;
}

export interface Goal {
  id: string;
  skillId: string | null;
  description: string | null;
  status: string; // ACTIVE | COMPLETED | ABANDONED
  createdAt: string;
  completedAt: string | null;
}

export interface Recommendation {
  id: string;
  generatedAt: string;
  engineVersion: string;
  status: string; // GENERATED | VIEWED | ACCEPTED | DISMISSED
  durationMinutes: number | null;
  explanation: string | null;
  items: RecommendationItem[];
}

export interface RecommendationItem {
  id: string;
  skillId: string;
  role: string; // PRIMARY | REVIEW | OBSERVATION | INCIDENTAL
  priorityScore: number | null;
  reasons: any[];
}
