/**
 * Initial progression-logik enligt implementationsplan slice 3.
 *
 * Härleder initiala SkillProgress-states ur onboardingens erfarenhets- och
 * miljösvar. Konservativ: hellre för lågt än för högt. En elev som säger sig
 * ha kört mycket ska ändå inte få avancerade moment upplåsta utan att ha
 * tränat dem.
 */

import type { ProgressState, EnvironmentType } from './types.js';

export type ExperienceLevel = 'NEW' | 'BEGINNER' | 'REGULAR' | 'EXPERIENCED';

export interface OnboardingAnswers {
  experienceLevel: ExperienceLevel;
  trainedEnvironments: EnvironmentType[];
  hasLearnerPermit: boolean;
}

export interface InitialSkillState {
  skillId: string;
  state: ProgressState;
  /** Konservativ initial mastery-score */
  masteryScore: number | null;
}

/**
 * Härleder initiala states för alla skills.
 * Returnerar bara de skills som får en annan state än NOT_STARTED.
 */
export function deriveInitialProgress(
  answers: OnboardingAnswers,
  allSkillIds: string[],
): InitialSkillState[] {
  const result: InitialSkillState[] = [];

  // Om körkortstillstånd saknas: allt är NOT_STARTED
  if (!answers.hasLearnerPermit) {
    return [];
  }

  // Basera på erfarenhetsnivå
  const baseState = getBaseStateFromExperience(answers.experienceLevel);

  for (const skillId of allSkillIds) {
    // Grundläggande fordonskontroll får alla som har körkortstillstånd
    if (isBasicVehicleControl(skillId)) {
      if (answers.experienceLevel !== 'NEW') {
        result.push({
          skillId,
          state: baseState,
          masteryScore: getInitialMasteryScore(baseState),
        });
      }
      continue;
    }

    // Miljöspecifika moment
    const relevantEnv = getRelevantEnvironment(skillId);
    if (relevantEnv && answers.trainedEnvironments.includes(relevantEnv)) {
      result.push({
        skillId,
        state: 'INTRODUCED',
        masteryScore: 0.3, // Konservativt
      });
    }
  }

  return result;
}

/**
 * Basera initial state på erfarenhetsnivå.
 * Konservativt: ingen får INDEPENDENT eller CONSOLIDATED från onboarding.
 */
function getBaseStateFromExperience(level: ExperienceLevel): ProgressState {
  switch (level) {
    case 'NEW':
      return 'NOT_STARTED';
    case 'BEGINNER':
      return 'INTRODUCED';
    case 'REGULAR':
      return 'PRACTICING';
    case 'EXPERIENCED':
      return 'PRACTICING'; // Inte INDEPENDENT — kräver faktiska observationer
    default:
      return 'NOT_STARTED';
  }
}

/**
 * Konservativ initial mastery-score baserad på state.
 */
function getInitialMasteryScore(state: ProgressState): number | null {
  switch (state) {
    case 'NOT_STARTED':
      return null;
    case 'INTRODUCED':
      return 0.2;
    case 'PRACTICING':
      return 0.5;
    case 'INDEPENDENT':
      return 0.75;
    case 'CONSOLIDATED':
      return 0.9;
    default:
      return null;
  }
}

/**
 * Avgör om ett skill-ID är grundläggande fordonskontroll.
 * Förenklad — verklig implementation skulle använda skill.category.
 */
function isBasicVehicleControl(skillId: string): boolean {
  return skillId.startsWith('VEH-') || skillId.startsWith('MAN-');
}

/**
 * Härleder vilken miljö ett moment är relevant för.
 * Förenklad mappning baserad på skill-ID-prefix.
 */
function getRelevantEnvironment(skillId: string): EnvironmentType | null {
  if (skillId.startsWith('URB-')) return 'URBAN';
  if (skillId.startsWith('RUR-')) return 'RURAL';
  if (skillId.startsWith('HWY-')) return 'HIGHWAY';
  if (skillId.startsWith('RAB-')) return 'URBAN'; // Rondeller är oftast i tätort
  if (skillId.startsWith('INT-')) return 'RESIDENTIAL'; // Korsningar finns överallt
  return null;
}
