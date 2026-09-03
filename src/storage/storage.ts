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
