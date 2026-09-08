import { describe, it, expect, beforeEach } from 'vitest';
import {
  getProfile,
  saveProfile,
  getAllSessions,
  saveSession,
  getSession,
  clearAllData,
  getCurrentPass,
  saveCurrentPass,
  getPasslogg,
  loggaPass,
  uppdateraNastaGang,
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

describe('aktuellt pass', () => {
  beforeEach(() => localStorage.clear());

  it('är första passet utan lagrat värde', () => {
    expect(getCurrentPass()).toEqual({ steg: 1, grupp: 0 });
  });

  it('läser ett gammalt currentStep som första passet i det steget', () => {
    // Appen bytte enhet från steg till pass. Ingen ska tappa sin plats.
    localStorage.setItem('ovningskorning:v1:currentStep', '7');
    expect(getCurrentPass()).toEqual({ steg: 7, grupp: 0 });
  });

  it('föredrar currentPass framför det gamla värdet', () => {
    localStorage.setItem('ovningskorning:v1:currentStep', '7');
    saveCurrentPass({ steg: 3, grupp: 2 });
    expect(getCurrentPass()).toEqual({ steg: 3, grupp: 2 });
  });

  it('faller tillbaka på första passet vid trasigt värde', () => {
    localStorage.setItem('ovningskorning:v1:currentPass', '{"steg":"x"}');
    expect(getCurrentPass()).toEqual({ steg: 1, grupp: 0 });
  });
});

describe('passloggen', () => {
  beforeEach(() => localStorage.clear());

  const post = (utfall: 'bra' | 'sadar' | 'taom', nastaGang: string | null = null) => ({
    datum: '2026-09-08T10:00:00.000Z',
    steg: 2,
    grupp: 0,
    momentIds: ['MAN-01'],
    utfall,
    nastaGang,
  });

  it('är tom från början', () => {
    expect(getPasslogg()).toEqual([]);
  });

  it('lägger pass sist, äldst först', () => {
    loggaPass(post('bra'));
    loggaPass(post('taom', 'backningen igen'));
    expect(getPasslogg().map((p) => p.utfall)).toEqual(['bra', 'taom']);
    expect(getPasslogg()[1].nastaGang).toBe('backningen igen');
  });

  it('ändrar "Nästa gång" bara på det senaste passet', () => {
    loggaPass(post('bra', 'första'));
    loggaPass(post('sadar', 'andra'));
    expect(uppdateraNastaGang('ta Lundavägen')).toBe(true);
    expect(getPasslogg().map((p) => p.nastaGang)).toEqual(['första', 'ta Lundavägen']);
  });

  it('kan inte ändra en rad som inte finns', () => {
    expect(uppdateraNastaGang('x')).toBe(false);
  });
});
