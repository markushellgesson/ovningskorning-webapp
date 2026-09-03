// Typer för exporterat läroplansinnehåll
// Exporteras från granskad databas, inte härlett från seed-filer (ADR 0013)
//
// Facit för enumvärden och fält: prisma/schema.prisma. Men vilka NYCKLAR
// som faktiskt finns på varje objekt styrs av scripts/export-content.mts —
// det skriptet utelämnar medvetet några fält som schemat har men som
// content.json aldrig får (dokumenterat i skriptets egen kommentar). De
// fälten ska därför INTE finnas i typerna nedan, även om motsvarande
// Prisma-modell har dem. Se index.ts för hur typen faktiskt tillämpas på
// den importerade JSON:en.

export type SkillCategory =
  | 'VEHICLE_CONTROL'
  | 'MANEUVERING'
  | 'OBSERVATION'
  | 'SPEED_DISTANCE'
  | 'POSITIONING'
  | 'INTERSECTIONS'
  | 'ROUNDABOUTS'
  | 'LANE_CHANGE'
  | 'VULNERABLE_ROAD_USERS'
  | 'URBAN'
  | 'RURAL'
  | 'HIGHWAY'
  | 'SPECIAL_CONDITIONS'
  | 'ECO_DRIVING'
  | 'NAVIGATION'
  | 'TRIP_PLANNING'
  | 'RISK_AWARENESS'
  | 'SELF_ASSESSMENT'
  | 'EMERGENCY';

export type ProgressState =
  | 'NOT_STARTED'
  | 'INTRODUCED'
  | 'PRACTICING'
  | 'INDEPENDENT'
  | 'CONSOLIDATED';

export type TheoryRelationType = 'PREREQUISITE' | 'INTEGRATED' | 'DEEP_DIVE';

export type TheoryCategory =
  | 'VEHICLE_KNOWLEDGE'
  | 'TRAFFIC_RULES'
  | 'ENVIRONMENT'
  | 'TRAFFIC_SAFETY'
  | 'HUMAN_FACTORS';

export type DifficultyLevel = 'INTRODUCTION' | 'BASIC' | 'INTERMEDIATE' | 'ADVANCED';

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

export type RegulatoryAuthority = 'TRANSPORTSTYRELSEN' | 'TRAFIKVERKET' | 'RIKSDAGEN' | 'IMY';

export type PhraseType =
  | 'INSTRUCTION'
  | 'QUESTION'
  | 'CUE'
  | 'FEEDBACK'
  | 'REFLECTION'
  | 'SAFETY_INTERVENTION';

export interface SkillPrerequisite {
  prerequisiteSkillId: string;
  minimumState: ProgressState;
}

export interface SkillTheoryRelation {
  theoryTopicId: string;
  relationType: TheoryRelationType;
}

export interface Skill {
  id: string;
  parentId: string | null;
  category: SkillCategory;
  name: string;
  description: string;
  goals: string[];
  practiceSteps: string[];
  commonErrors: string[];
  supervisorObservations: string[];
  continuous: boolean;
  safetyCritical: boolean;
  applicableTransmissions: string[];
  sortOrder: number;
  sourceVersion: string;
  prerequisites: SkillPrerequisite[];
  theoryRelations: SkillTheoryRelation[];
}

export interface TheoryTopic {
  id: string;
  category: TheoryCategory;
  title: string;
  summary: string | null;
  sourceId: string | null;
  sourceVersion: string;
}

// Exercise.sourceVersion finns i schemat men skrivs inte ut av
// export-content.mts — utelämnat här av samma skäl.
export interface Exercise {
  id: string;
  skillId: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  estimatedMinutes: number | null;
  requiredEnvironments: EnvironmentType[];
}

// TrafficEnvironment.difficulty finns i schemat men skrivs inte ut av
// export-content.mts — utelämnat här av samma skäl. name/characteristics/
// relevantSkills/sourceVersion finns varken i schemat eller i exporten.
export interface TrafficEnvironment {
  id: string;
  type: EnvironmentType;
  description: string | null;
}

export interface SupervisorPhrase {
  id: string;
  /** null = allmänt mönster, inte knutet till ett specifikt moment. */
  skillId: string | null;
  type: PhraseType;
  text: string;
  context: string | null;
  sourceVersion: string;
}

// RegulatorySource.title/.relevantSections finns varken i schemat eller i
// exporten — utelämnade här.
export interface RegulatorySource {
  id: string;
  authority: RegulatoryAuthority;
  url: string | null;
  sourceVersion: string;
}

export interface ContentData {
  skills: Skill[];
  theoryTopics: TheoryTopic[];
  exercises: Exercise[];
  trafficEnvironments: TrafficEnvironment[];
  supervisorPhrases: SupervisorPhrase[];
  regulatorySources: RegulatorySource[];
  exportedAt: string;
  databaseVersion: string;
}
