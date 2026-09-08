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

// Aktuellt pass

const FÖRSTA_PASSET: Passposition = { steg: 1, grupp: 0 };

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
 * Var paret är: steg och grupp. Gruppen är passet.
 *
 * Det här är appens tillstånd. Startsidan visar det passet och inget annat,
 * och svaret på "Hur gick det?" för det vidare. Utan lagrat värde är svaret
 * första passet — ingen onboarding, ingen fråga.
 *
 * Lagringen hette en dag `currentStep` och var ett heltal, innan passet
 * blev enheten. Ett sådant värde läses som "första passet i det steget", så
 * ingen tappar sin plats av att appen bytte enhet.
 *
 * `null` betyder att lagringen inte gick att läsa (privat läge, blockerade
 * kakor, full kvot). Det skiljer sig från "har inte börjat än": anroparen
 * ska visa första passet i båda fallen, men bara säga till om sparandet i
 * det första. Därför går skillnaden inte att slå ihop.
 */
export function getCurrentPass(): Passposition | null {
  try {
    const raw = localStorage.getItem(`${PREFIX}:currentPass`);
    if (raw !== null) {
      const v: unknown = JSON.parse(raw);
      return ärPosition(v) ? v : FÖRSTA_PASSET;
    }
    const gammalt = localStorage.getItem(`${PREFIX}:currentStep`);
    if (gammalt !== null) {
      const steg = Number(JSON.parse(gammalt));
      return Number.isInteger(steg) && steg >= 1 ? { steg, grupp: 0 } : FÖRSTA_PASSET;
    }
    return FÖRSTA_PASSET;
  } catch (error) {
    console.warn('Failed to read currentPass from localStorage:', error);
    return null;
  }
}

export function saveCurrentPass(position: Passposition): boolean {
  return safeSet('currentPass', position);
}

// Passloggen

/** Alla genomförda pass, äldst först. Tom lista om lagringen inte går att läsa. */
export function getPasslogg(): Passpost[] {
  const v = safeGet<unknown>('passlogg', []);
  return Array.isArray(v) ? (v as Passpost[]) : [];
}

export function loggaPass(post: Passpost): boolean {
  return safeSet('passlogg', [...getPasslogg(), post]);
}

/**
 * Ändrar "Nästa gång" på det senaste passet — det är den rad som står överst
 * på nästa pass, och den ändras i uppfarten när planen ändras. Finns inget
 * pass finns ingen rad att ändra.
 */
export function uppdateraNastaGang(text: string | null): boolean {
  const logg = getPasslogg();
  if (logg.length === 0) return false;
  const sista = { ...logg[logg.length - 1], nastaGang: text };
  return safeSet('passlogg', [...logg.slice(0, -1), sista]);
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
