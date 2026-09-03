// Typer för exporterat läroplansinnehåll
// Exporteras från granskad databas, inte härlett från seed-filer (ADR 0013)

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

export type DifficultyLevel = 'BASIC' | 'INTERMEDIATE' | 'ADVANCED';

export type EnvironmentType =
  | 'RESIDENTIAL'
  | 'URBAN'
  | 'RURAL'
  | 'HIGHWAY'
  | 'PARKING'
  | 'PARKING_GARAGE'
  | 'NARROW_STREET'
  | 'CONSTRUCTION_ZONE'
  | 'SCHOOL_ZONE';

export type RegulatoryAuthority = 'TRANSPORTSTYRELSEN' | 'RIKSDAG' | 'KORKORTSPORTALEN';

export type PhraseType =
  | 'QUESTION'
  | 'INSTRUCTION'
  | 'OBSERVATION'
  | 'FEEDBACK'
  | 'REFLECTION_PROMPT';

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

export interface Exercise {
  id: string;
  skillId: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  requiredEnvironments: EnvironmentType[];
  sourceVersion: string;
}

export interface TrafficEnvironment {
  id: string;
  type: EnvironmentType;
  name: string;
  description: string;
  characteristics: string[];
  relevantSkills: string[];
  sourceVersion: string;
}

export interface SupervisorPhrase {
  id: string;
  skillId: string;
  type: PhraseType;
  text: string;
  context: string | null;
  sourceVersion: string;
}

export interface RegulatorySource {
  id: string;
  authority: RegulatoryAuthority;
  title: string;
  url: string | null;
  relevantSections: string[];
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
