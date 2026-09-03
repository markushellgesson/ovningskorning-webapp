/**
 * Divergensdetektering mellan assessments (ADR 0008).
 *
 * Skillnaden mellan elev och handledare är en lärosignal, aldrig bevis
 * på att någon hade fel. Ingen medelvärdesberäkning, ingen "vinnare".
 *
 * Ren funktion — ingen React, Prisma eller Next.js.
 */

import type { Assessment, AssessmentDivergence } from './types';

/**
 * Detektera och formulera skillnad mellan två bedömningar.
 *
 * @param studentAssessment - Elevens bedömning (om den finns)
 * @param supervisorAssessment - Handledarens bedömning (om den finns)
 * @param skillName - Namnet på momentet
 * @returns Divergensinformation med diskussionsprompt om skillnad finns
 */
export function detectDivergence(
  studentAssessment: Assessment | undefined | null,
  supervisorAssessment: Assessment | undefined | null,
  skillName: string,
): AssessmentDivergence {
  // Om någon saknas, finns ingen divergens att detektera
  if (!studentAssessment || !supervisorAssessment) {
    return { exists: false };
  }

  // Jämför supportLevel — det är den dimension användaren såg
  const studentLevel = studentAssessment.supportLevel;
  const supervisorLevel = supervisorAssessment.supportLevel;

  if (studentLevel === supervisorLevel) {
    return { exists: false };
  }

  // Skillnad finns — formulera som lärosignal
  return {
    exists: true,
    discussionPrompt: formulateDiscussionPrompt(studentLevel, supervisorLevel, skillName),
  };
}

/**
 * Generera diskussionsprompt baserat på vilken sorts skillnad som finns.
 *
 * @param studentLevel - Elevens supportLevel
 * @param supervisorLevel - Handledarens supportLevel
 * @param skillName - Namnet på momentet
 * @returns En diskussionsprompt, aldrig dömande
 */
function formulateDiscussionPrompt(
  studentLevel: string,
  supervisorLevel: string,
  skillName: string,
): string {
  // Orden "högre" och "lägre" har inget meningsfullt värde här — eleven kan
  // ha bedömt sig själv strängare än handledaren gjorde, vilket inte är fel.
  // Prompts är därför generiska: fokus på *vad* som skilde, inte på vem som
  // "hade rätt".

  const prompts = [
    'Vad skilde era intryck åt — och när?',
    'Prata om vilka situationer ni upplevde olika.',
    'Fanns det ögonblick där det kändes svårare än det såg ut?',
    'Vad skulle göra det här momentet enklare nästa gång?',
  ];

  // Välj en prompt baserat på momentnamnet (deterministiskt, inte slumpat)
  const index = skillName.length % prompts.length;
  return prompts[index] || prompts[0];
}

/**
 * Kontrollera om båda parter har bedömt en session.
 *
 * @param studentReflectionExists - Finns elevens reflektion?
 * @param supervisorAssessmentExists - Finns handledarens bedömning?
 * @returns true om båda finns, vilket gör reveal möjlig
 */
export function canReveal(
  studentReflectionExists: boolean,
  supervisorAssessmentExists: boolean,
): boolean {
  return studentReflectionExists && supervisorAssessmentExists;
}

/**
 * Räkna antal skillnader mellan två uppsättningar assessments.
 *
 * @param studentAssessments - Elevens bedömningar
 * @param supervisorAssessments - Handledarens bedömningar
 * @returns Antal moment där de bedömde olika
 */
export function countDivergences(
  studentAssessments: Assessment[],
  supervisorAssessments: Assessment[],
): number {
  let count = 0;

  // Bygg en map av supervisor assessments för snabb lookup
  const supervisorBySkill = new Map(supervisorAssessments.map((a) => [a.skillId, a]));

  for (const studentAssessment of studentAssessments) {
    const supervisorAssessment = supervisorBySkill.get(studentAssessment.skillId);
    if (!supervisorAssessment) continue;

    if (studentAssessment.supportLevel !== supervisorAssessment.supportLevel) {
      count++;
    }
  }

  return count;
}
