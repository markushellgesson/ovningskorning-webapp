/**
 * localStorage repository för användargenererad data.
 *
 * Varje läsning och skrivning i try/catch — localStorage kastar i privat läge,
 * med blockerade cookies, och när kvoten är full. Appen får inte krascha av det.
 *
 * ADR 0013: Data lever bara i en webbläsare på en enhet. Ingen backup, ingen synk.
 */

import type {
  Profile,
  DrivingSession,
  SessionSkill,
  Assessment,
  StudentReflection,
  SkillProgress,
  SkillProgressObservation,
  Goal,
  Recommendation,
  Passposition,
  Passpost,
} from './types';
import type { PassSteg } from '@/components/pass/typer';

const VERSION = 'v1';
const PREFIX = `ovningskorning:${VERSION}`;

// Hjälpfunktioner
function safeGet<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(`${PREFIX}:${key}`);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Failed to read from localStorage (${key}):`, error);
    return defaultValue;
  }
}

function safeSet<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(`${PREFIX}:${key}`, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Failed to write to localStorage (${key}):`, error);
    return false;
  }
}

function safeRemove(key: string): boolean {
  try {
    localStorage.removeItem(`${PREFIX}:${key}`);
    return true;
  } catch (error) {
    console.error(`Failed to remove from localStorage (${key}):`, error);
    return false;
  }
}

// Profile
export function getProfile(): Profile | null {
  return safeGet<Profile | null>('profile', null);
}

export function saveProfile(profile: Profile): boolean {
  return safeSet('profile', profile);
}

// DrivingSessions
export function getAllSessions(): DrivingSession[] {
  return safeGet<DrivingSession[]>('sessions', []);
}

export function getSession(id: string): DrivingSession | null {
  const sessions = getAllSessions();
  return sessions.find((s) => s.id === id) || null;
}

export function saveSession(session: DrivingSession): boolean {
  const sessions = getAllSessions();
  const index = sessions.findIndex((s) => s.id === session.id);
  if (index >= 0) {
    sessions[index] = session;
  } else {
    sessions.push(session);
  }
  return safeSet('sessions', sessions);
}

export function deleteSession(id: string): boolean {
  const sessions = getAllSessions();
  const filtered = sessions.filter((s) => s.id !== id);
  return safeSet('sessions', filtered);
}

// SessionSkills
export function getSessionSkills(sessionId: string): SessionSkill[] {
  const all = safeGet<SessionSkill[]>('sessionSkills', []);
  return all.filter((s) => s.sessionId === sessionId);
}

export function saveSessionSkill(sessionSkill: SessionSkill): boolean {
  const all = safeGet<SessionSkill[]>('sessionSkills', []);
  const index = all.findIndex(
    (s) => s.sessionId === sessionSkill.sessionId && s.skillId === sessionSkill.skillId,
  );
  if (index >= 0) {
    all[index] = sessionSkill;
  } else {
    all.push(sessionSkill);
  }
  return safeSet('sessionSkills', all);
}

// Assessments
export function getAssessments(sessionId: string): Assessment[] {
  const all = safeGet<Assessment[]>('assessments', []);
  return all.filter((a) => a.sessionId === sessionId);
}

export function saveAssessment(assessment: Assessment): boolean {
  const all = safeGet<Assessment[]>('assessments', []);
  const index = all.findIndex((a) => a.id === assessment.id);
  if (index >= 0) {
    all[index] = assessment;
  } else {
    all.push(assessment);
  }
  return safeSet('assessments', all);
}

// StudentReflection
export function getReflection(sessionId: string): StudentReflection | null {
  const all = safeGet<StudentReflection[]>('reflections', []);
  return all.find((r) => r.sessionId === sessionId) || null;
}

export function saveReflection(reflection: StudentReflection): boolean {
  const all = safeGet<StudentReflection[]>('reflections', []);
  const index = all.findIndex((r) => r.sessionId === reflection.sessionId);
  if (index >= 0) {
    all[index] = reflection;
  } else {
    all.push(reflection);
  }
  return safeSet('reflections', all);
}

// SkillProgress
export function getAllSkillProgress(): SkillProgress[] {
  return safeGet<SkillProgress[]>('skillProgress', []);
}

export function getSkillProgress(skillId: string): SkillProgress | null {
  const all = getAllSkillProgress();
  return all.find((p) => p.skillId === skillId) || null;
}

export function saveSkillProgress(progress: SkillProgress): boolean {
  const all = getAllSkillProgress();
  const index = all.findIndex((p) => p.skillId === progress.skillId);
  if (index >= 0) {
    all[index] = progress;
  } else {
    all.push(progress);
  }
  return safeSet('skillProgress', all);
}

// SkillProgressObservations
export function getSkillObservations(skillId: string): SkillProgressObservation[] {
  const all = safeGet<SkillProgressObservation[]>('observations', []);
  return all.filter((o) => o.skillId === skillId);
}

export function saveObservation(observation: SkillProgressObservation): boolean {
  const all = safeGet<SkillProgressObservation[]>('observations', []);
  all.push(observation);
  return safeSet('observations', all);
}

// Goals
export function getAllGoals(): Goal[] {
  return safeGet<Goal[]>('goals', []);
}

export function saveGoal(goal: Goal): boolean {
  const all = getAllGoals();
  const index = all.findIndex((g) => g.id === goal.id);
  if (index >= 0) {
    all[index] = goal;
  } else {
    all.push(goal);
  }
  return safeSet('goals', all);
}

export function deleteGoal(id: string): boolean {
  const all = getAllGoals();
  const filtered = all.filter((g) => g.id !== id);
  return safeSet('goals', filtered);
}

// Recommendations
export function getAllRecommendations(): Recommendation[] {
  return safeGet<Recommendation[]>('recommendations', []);
}

export function saveRecommendation(recommendation: Recommendation): boolean {
  const all = getAllRecommendations();
  const index = all.findIndex((r) => r.id === recommendation.id);
  if (index >= 0) {
    all[index] = recommendation;
  } else {
    all.push(recommendation);
  }
  return safeSet('recommendations', all);
}

// Utility
export function clearAllData(): boolean {
  try {
    const keys = Object.keys(localStorage);
    const ourKeys = keys.filter((k) => k.startsWith(PREFIX));
    ourKeys.forEach((k) => localStorage.removeItem(k));
    return true;
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
    return false;
  }
}

// Passloggen

/** Alla genomförda pass, äldst först. Tom lista om lagringen inte går att läsa. */
export function getPasslogg(): Passpost[] {
  const v = safeGet<unknown>('passlogg', []);
  return Array.isArray(v) ? (v as Passpost[]) : [];
}

/** Historiska "redan"-markeringar visar framsteg, men är inga körda pass. */
export function getKördaPass(): Passpost[] {
  return getPasslogg().filter((post) => post.utfall !== 'redan');
}

/** Den senaste sparade planen hör till ett kört pass, aldrig en historisk markering. */
export function senasteNastaGang(): string | null {
  const post = [...getKördaPass()]
    .reverse()
    .find((pass) => pass.nastaGang !== null && pass.nastaGang.trim().length > 0);
  return post?.nastaGang ?? null;
}

export function loggaPass(post: Passpost): boolean {
  return safeSet('passlogg', [...getPasslogg(), post]);
}

/** Ett "ta om" är en anteckning om ett försök, inte ett avslut på passet. */
export function ärAvslutat(steg: number, grupp: number): boolean {
  return getPasslogg().some(
    (post) => post.steg === steg && post.grupp === grupp && post.utfall !== 'taom',
  );
}

/** Ett kört pass väger tyngre än en historisk markering på stegsidan. */
export function avslutandePasspost(steg: number, grupp: number): Passpost | null {
  const poster = getPasslogg()
    .filter((post) => post.steg === steg && post.grupp === grupp)
    .reverse();
  return (
    poster.find((post) => post.utfall === 'bra' || post.utfall === 'sadar') ??
    poster.find((post) => post.utfall === 'redan') ??
    null
  );
}

export function markeraGjort(steg: number, grupp: number, momentIds: string[]): boolean {
  return loggaPass({
    datum: new Date().toISOString(),
    steg,
    grupp,
    momentIds,
    utfall: 'redan',
    nastaGang: null,
  });
}

export function avmarkeraGjort(steg: number, grupp: number): boolean {
  const logg = getPasslogg();
  let index = -1;
  for (let i = logg.length - 1; i >= 0; i -= 1) {
    const post = logg[i];
    if (post.steg === steg && post.grupp === grupp && post.utfall === 'redan') {
      index = i;
      break;
    }
  }
  return index === -1
    ? false
    : safeSet('passlogg', [...logg.slice(0, index), ...logg.slice(index + 1)]);
}

function ärPosition(v: unknown): v is Passposition {
  return (
    typeof v === 'object' &&
    v !== null &&
    Number.isInteger((v as Passposition).steg) &&
    (v as Passposition).steg >= 1 &&
    Number.isInteger((v as Passposition).grupp) &&
    (v as Passposition).grupp >= 0
  );
}

/**
 * Flyttar den gamla lagrade positionen till historik innan den tolkas som
 * framsteg. Det gör övergången en gång och lämnar därefter en enda källa till
 * sanningen: passloggen.
 */
function migreraGammalPosition(steg: PassSteg[]): void {
  try {
    const currentPass = localStorage.getItem(`${PREFIX}:currentPass`);
    const currentStep = localStorage.getItem(`${PREFIX}:currentStep`);
    if (currentPass === null && currentStep === null) return;

    let position: Passposition | null = null;
    if (currentPass !== null) {
      const parsed: unknown = JSON.parse(currentPass);
      position = ärPosition(parsed) ? parsed : null;
    }
    if (position === null && currentStep !== null) {
      const parsed: unknown = JSON.parse(currentStep);
      const nummer = Number(parsed);
      position = Number.isInteger(nummer) && nummer >= 1 ? { steg: nummer, grupp: 0 } : null;
    }

    if (position !== null) {
      const logg = getPasslogg();
      const redanAvslutade = new Set(
        logg.filter((post) => post.utfall !== 'taom').map((post) => `${post.steg}:${post.grupp}`),
      );
      const datum = new Date().toISOString();
      const migrerade = steg.flatMap((ettSteg) =>
        ettSteg.grupper.flatMap((grupp, gruppIndex) => {
          const förePositionen =
            ettSteg.nummer < position.steg ||
            (ettSteg.nummer === position.steg && gruppIndex < position.grupp);
          const nyckel = `${ettSteg.nummer}:${gruppIndex}`;
          return förePositionen && !redanAvslutade.has(nyckel)
            ? [
                {
                  datum,
                  steg: ettSteg.nummer,
                  grupp: gruppIndex,
                  momentIds: grupp.moment.map((moment) => moment.id),
                  utfall: 'redan' as const,
                  nastaGang: null,
                },
              ]
            : [];
        }),
      );
      if (migrerade.length > 0 && !safeSet('passlogg', [...logg, ...migrerade])) return;
    }

    safeRemove('currentPass');
    safeRemove('currentStep');
  } catch (error) {
    console.warn('Failed to migrate currentPass from localStorage:', error);
  }
}

/**
 * Var paret är härleds ur första passet i ordningen som inte avslutats.
 *
 * När allt är avslutat blir positionen steget efter planen. Passvyn använder
 * det för att visa att hela sträckan är passerad.
 */
export function härledPosition(steg: PassSteg[]): Passposition {
  migreraGammalPosition(steg);
  const logg = getPasslogg();
  const avslutade = new Set(
    logg.filter((post) => post.utfall !== 'taom').map((post) => `${post.steg}:${post.grupp}`),
  );

  for (const ettSteg of steg) {
    for (let grupp = 0; grupp < ettSteg.grupper.length; grupp += 1) {
      if (!avslutade.has(`${ettSteg.nummer}:${grupp}`)) return { steg: ettSteg.nummer, grupp };
    }
  }
  return { steg: steg.length + 1, grupp: 0 };
}

/**
 * Ändrar "Nästa gång" på det senaste körda passet. Historiska markeringar
 * får aldrig ta över parets egen plan för nästa gång.
 */
export function uppdateraNastaGang(text: string | null): boolean {
  const logg = getPasslogg();
  let index = -1;
  for (let i = logg.length - 1; i >= 0; i -= 1) {
    if (logg[i].utfall !== 'redan') {
      index = i;
      break;
    }
  }
  if (index === -1) return false;
  const senaste = { ...logg[index], nastaGang: text };
  return safeSet('passlogg', [...logg.slice(0, index), senaste, ...logg.slice(index + 1)]);
}

export function exportData(): Record<string, any> {
  return {
    profile: getProfile(),
    sessions: getAllSessions(),
    sessionSkills: safeGet('sessionSkills', []),
    assessments: safeGet('assessments', []),
    reflections: safeGet('reflections', []),
    skillProgress: getAllSkillProgress(),
    observations: safeGet('observations', []),
    goals: getAllGoals(),
    recommendations: getAllRecommendations(),
    exportedAt: new Date().toISOString(),
  };
}
