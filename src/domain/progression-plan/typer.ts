export interface SkillMapPrerequisite {
  prerequisiteSkillId: string;
  minimumState: string;
}

export interface SkillMapInput {
  id: string;
  category: string;
  continuous: boolean;
  sortOrder: number;
  prerequisites: SkillMapPrerequisite[];
}

export interface SkillMapGroup {
  id: string;
  level: number;
  skillIds: string[];
  categories: string[];
  prerequisiteIds: string[];
}

export interface SkillMapLevel {
  id: string;
  level: number;
  groups: SkillMapGroup[];
}

export interface ProgressionMap {
  levels: SkillMapLevel[];
  continuousSkillIds: string[];
}
