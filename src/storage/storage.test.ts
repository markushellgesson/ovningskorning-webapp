import { describe, it, expect, beforeEach } from 'vitest';
import {
  getProfile,
  saveProfile,
  getAllSessions,
  saveSession,
  getSession,
  clearAllData,
} from './storage';
import type { Profile, DrivingSession } from './types';

// Mock localStorage för tester
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

global.localStorage = localStorageMock as any;

describe('localStorage repository', () => {
  beforeEach(() => {
    clearAllData();
  });

  it('sparar och läser profil', () => {
    const profile: Profile = {
      displayName: 'Test Testsson',
      journeyStage: 'FOUNDATION',
      transmissionGoal: 'MANUAL',
      learnerPermitConfirmedAt: '2026-01-01',
      experienceLevel: 'NEW',
      desiredCadence: 'WEEKLY',
      priorEnvironments: ['RESIDENTIAL'],
    };

    const saved = saveProfile(profile);
    expect(saved).toBe(true);

    const loaded = getProfile();
    expect(loaded).toEqual(profile);
  });

  it('sparar och läser sessioner', () => {
    const session: DrivingSession = {
      id: '123',
      status: 'PLANNED',
      source: 'PRIVATE',
      plannedAt: '2026-09-03T10:00:00Z',
      plannedMinutes: 60,
      plannedFocus: 'Test',
      startedAt: null,
      endedAt: null,
      drivingMinutes: null,
      distanceKm: null,
      daylight: null,
      weather: null,
      trafficLoad: null,
      createdAt: '2026-09-03T10:00:00Z',
      updatedAt: '2026-09-03T10:00:00Z',
    };

    saveSession(session);
    const loaded = getSession('123');
    expect(loaded).toEqual(session);

    const all = getAllSessions();
    expect(all).toHaveLength(1);
  });

  it('hanterar felaktiga data graciöst', () => {
    // Skriv skräpdata
    localStorage.setItem('ovningskorning:v1:profile', 'invalid json');

    // Ska returnera default-värde utan att krascha
    const profile = getProfile();
    expect(profile).toBeNull();
  });
});
