/**
 * Tester för progressionsuppdatering (slice 7).
 *
 * Omfattande tester enligt specen:
 * - Elevens självskattning ändrar inte masteryScore (regressionsskydd)
 * - Handledarens bedömning gör det
 * - Nedgradering vid CRITICAL safetyFlag
 * - Nedgradering vid upprepad FULL_INSTRUCTION efter INDEPENDENT
 * - CONSOLIDATED kräver SAMTLIGA villkor
 * - reviewStatus vid olika tider
 * - Determinism: samma input och now → samma output
 * - Historiken bevaras
 */

import { describe, it, expect } from 'vitest';
import { updateSkillProgress } from './update';
import type { SkillProgressSnapshot, ObservationSnapshot } from './update';

describe('updateSkillProgress', () => {
  const now = new Date('2026-09-02T12:00:00Z');

  describe('elevens självskattning påverkar INTE masteryScore', () => {
    it('STUDENT-assessments ändrar inte masteryScore', () => {
      const current: SkillProgressSnapshot = {
        skillId: 'VEH-01',
        state: 'NOT_STARTED',
        masteryScore: null,
        reviewStatus: 'CURRENT',
        lastPracticedAt: null,
        lastIndependentAt: null,
        independentObservationCount: 0,
        distinctSessionCount: 0,
        contextCoverageScore: null,
        observations: [],
      };

      const observations: ObservationSnapshot[] = [
        {
          assessorRole: 'STUDENT',
          supportLevel: 'INDEPENDENT',
          safetyFlag: 'NONE',
          environment: 'URBAN',
          sessionId: 'session-1',
          observedAt: new Date('2026-09-01T10:00:00Z'),
        },
        {
          assessorRole: 'STUDENT',
          supportLevel: 'INDEPENDENT',
          safetyFlag: 'NONE',
          environment: 'URBAN',
          sessionId: 'session-2',
          observedAt: new Date('2026-09-02T10:00:00Z'),
        },
      ];

      const result = updateSkillProgress({ current, newObservations: observations, now });

      // masteryScore ska fortfarande vara null eftersom endast STUDENT bedömt
      expect(result.masteryScore).toBeNull();
      // State blir PRACTICING med 2 observationer, men INTE INDEPENDENT eftersom ingen handledare bedömt
      expect(result.state).toBe('PRACTICING');
    });

    it('SUPERVISOR-assessments påverkar masteryScore', () => {
      const current: SkillProgressSnapshot = {
        skillId: 'VEH-01',
        state: 'NOT_STARTED',
        masteryScore: null,
        reviewStatus: 'CURRENT',
        lastPracticedAt: null,
        lastIndependentAt: null,
        independentObservationCount: 0,
        distinctSessionCount: 0,
        contextCoverageScore: null,
        observations: [],
      };

      const observations: ObservationSnapshot[] = [
        {
          assessorRole: 'SUPERVISOR',
          supportLevel: 'INDEPENDENT',
          safetyFlag: 'NONE',
          environment: 'URBAN',
          sessionId: 'session-1',
          observedAt: new Date('2026-09-01T10:00:00Z'),
        },
        {
          assessorRole: 'SUPERVISOR',
          supportLevel: 'INDEPENDENT',
          safetyFlag: 'NONE',
          environment: 'URBAN',
          sessionId: 'session-2',
          observedAt: new Date('2026-09-02T10:00:00Z'),
        },
      ];

      const result = updateSkillProgress({ current, newObservations: observations, now });

      // masteryScore ska vara 1.0 eftersom båda är INDEPENDENT
      expect(result.masteryScore).toBeCloseTo(1.0, 1);
      expect(result.state).toBe('INDEPENDENT'); // Två självständiga från handledare
    });
  });

  describe('nedgradering vid CRITICAL safetyFlag', () => {
    it('nedgraderar från INDEPENDENT till PRACTICING vid CRITICAL', () => {
      const current: SkillProgressSnapshot = {
        skillId: 'VEH-01',
        state: 'INDEPENDENT',
        masteryScore: 0.8,
        reviewStatus: 'CURRENT',
        lastPracticedAt: new Date('2026-08-30T10:00:00Z'),
        lastIndependentAt: new Date('2026-08-30T10:00:00Z'),
        independentObservationCount: 3,
        distinctSessionCount: 3,
        contextCoverageScore: 0.5,
        observations: [
          {
            assessorRole: 'SUPERVISOR',
            supportLevel: 'INDEPENDENT',
            safetyFlag: 'NONE',
            environment: 'URBAN',
            sessionId: 'session-1',
            observedAt: new Date('2026-08-28T10:00:00Z'),
          },
        ],
      };

      const observations: ObservationSnapshot[] = [
        {
          assessorRole: 'SUPERVISOR',
          supportLevel: 'PROMPTED',
          safetyFlag: 'CRITICAL',
          environment: 'URBAN',
          sessionId: 'session-2',
          observedAt: new Date('2026-09-02T10:00:00Z'),
        },
      ];

      const result = updateSkillProgress({ current, newObservations: observations, now });

      // Ska nedgraderas till PRACTICING
      expect(result.state).toBe('PRACTICING');
    });

    it('nedgraderar från CONSOLIDATED till INDEPENDENT vid CRITICAL', () => {
      const current: SkillProgressSnapshot = {
        skillId: 'VEH-01',
        state: 'CONSOLIDATED',
        masteryScore: 0.9,
        reviewStatus: 'CURRENT',
        lastPracticedAt: new Date('2026-08-30T10:00:00Z'),
        lastIndependentAt: new Date('2026-08-30T10:00:00Z'),
        independentObservationCount: 5,
        distinctSessionCount: 5,
        contextCoverageScore: 0.75,
        observations: [],
      };

      const observations: ObservationSnapshot[] = [
        {
          assessorRole: 'SUPERVISOR',
          supportLevel: 'INDEPENDENT',
          safetyFlag: 'CRITICAL',
          environment: 'URBAN',
          sessionId: 'session-new',
          observedAt: new Date('2026-09-02T10:00:00Z'),
        },
      ];

      const result = updateSkillProgress({ current, newObservations: observations, now });

      expect(result.state).toBe('INDEPENDENT');
    });
  });

  describe('nedgradering vid upprepad FULL_INSTRUCTION efter INDEPENDENT', () => {
    it('nedgraderar från INDEPENDENT när 2+ FULL_INSTRUCTION i senaste 3', () => {
      const current: SkillProgressSnapshot = {
        skillId: 'VEH-01',
        state: 'INDEPENDENT',
        masteryScore: 0.75,
        reviewStatus: 'CURRENT',
        lastPracticedAt: new Date('2026-08-30T10:00:00Z'),
        lastIndependentAt: new Date('2026-08-28T10:00:00Z'),
        independentObservationCount: 2,
        distinctSessionCount: 4,
        contextCoverageScore: 0.5,
        observations: [
          {
            assessorRole: 'SUPERVISOR',
            supportLevel: 'INDEPENDENT',
            safetyFlag: 'NONE',
            environment: 'URBAN',
            sessionId: 'session-1',
            observedAt: new Date('2026-08-25T10:00:00Z'),
          },
          {
            assessorRole: 'SUPERVISOR',
            supportLevel: 'INDEPENDENT',
            safetyFlag: 'NONE',
            environment: 'URBAN',
            sessionId: 'session-2',
            observedAt: new Date('2026-08-28T10:00:00Z'),
          },
        ],
      };

      const observations: ObservationSnapshot[] = [
        {
          assessorRole: 'SUPERVISOR',
          supportLevel: 'FULL_INSTRUCTION',
          safetyFlag: 'NONE',
          environment: 'URBAN',
          sessionId: 'session-3',
          observedAt: new Date('2026-09-01T10:00:00Z'),
        },
        {
          assessorRole: 'SUPERVISOR',
          supportLevel: 'FULL_INSTRUCTION',
          safetyFlag: 'NONE',
          environment: 'URBAN',
          sessionId: 'session-4',
          observedAt: new Date('2026-09-02T10:00:00Z'),
        },
      ];

      const result = updateSkillProgress({ current, newObservations: observations, now });

      expect(result.state).toBe('PRACTICING');
    });
  });

  describe('CONSOLIDATED kräver ALLA villkor', () => {
    const baseObservations: ObservationSnapshot[] = [
      {
        assessorRole: 'SUPERVISOR',
        supportLevel: 'INDEPENDENT',
        safetyFlag: 'NONE',
        environment: 'URBAN',
        sessionId: 'session-1',
        observedAt: new Date('2026-08-20T10:00:00Z'),
      },
      {
        assessorRole: 'SUPERVISOR',
        supportLevel: 'INDEPENDENT',
        safetyFlag: 'NONE',
        environment: 'RURAL',
        sessionId: 'session-2',
        observedAt: new Date('2026-08-25T10:00:00Z'),
      },
      {
        assessorRole: 'SUPERVISOR',
        supportLevel: 'INDEPENDENT',
        safetyFlag: 'NONE',
        environment: 'HIGHWAY',
        sessionId: 'session-3',
        observedAt: new Date('2026-08-30T10:00:00Z'),
      },
      {
        assessorRole: 'SUPERVISOR',
        supportLevel: 'MINIMAL_CUE',
        safetyFlag: 'NONE',
        environment: 'URBAN',
        sessionId: 'session-4',
        observedAt: new Date('2026-09-01T10:00:00Z'),
      },
    ];

    it('uppnår CONSOLIDATED när alla villkor uppfylls', () => {
      const current: SkillProgressSnapshot = {
        skillId: 'VEH-01',
        state: 'INDEPENDENT',
        masteryScore: 0.75,
        reviewStatus: 'CURRENT',
        lastPracticedAt: new Date('2026-08-30T10:00:00Z'),
        lastIndependentAt: new Date('2026-08-30T10:00:00Z'),
        independentObservationCount: 2,
        distinctSessionCount: 3,
        contextCoverageScore: 0.5,
        observations: baseObservations.slice(0, 3),
      };

      const observations: ObservationSnapshot[] = [baseObservations[3]];

      const result = updateSkillProgress({ current, newObservations: observations, now });

      // masteryScore >= 0.8, >= 3 independent, >= 3 sessions
      expect(result.masteryScore).toBeGreaterThanOrEqual(0.8);
      expect(result.independentObservationCount).toBeGreaterThanOrEqual(3);
      expect(result.distinctSessionCount).toBeGreaterThanOrEqual(3);
      expect(result.state).toBe('CONSOLIDATED');
    });

    it('blockerar CONSOLIDATED när momentet bara tränats i en enda miljö', () => {
      // "Stabil över tid" ska betyda att momentet suttit i mer än en sorts
      // trafikmiljö. Utan det här villkoret kan någon som bara kört på en tom
      // parkering nå högsta nivån — precis den falska trygghet produkten
      // finns för att undvika.
      const enMiljö: ObservationSnapshot[] = [0, 1, 2, 3].map((i) => ({
        assessorRole: 'SUPERVISOR',
        supportLevel: 'INDEPENDENT' as const,
        safetyFlag: 'NONE' as const,
        environment: 'PARKING_AREA' as const,
        sessionId: `session-${i}`,
        observedAt: new Date('2026-08-30T10:00:00Z'),
      }));

      const current: SkillProgressSnapshot = {
        skillId: 'VEH-01',
        state: 'INDEPENDENT',
        masteryScore: 0.9,
        reviewStatus: 'CURRENT',
        lastPracticedAt: new Date('2026-08-30T10:00:00Z'),
        lastIndependentAt: new Date('2026-08-30T10:00:00Z'),
        independentObservationCount: 3,
        distinctSessionCount: 3,
        contextCoverageScore: 0.25,
        observations: enMiljö.slice(0, 3),
      };

      const result = updateSkillProgress({
        current,
        newObservations: [enMiljö[3]],
        now,
      });

      // Allt annat är uppfyllt — bara miljöbredden saknas.
      expect(result.masteryScore).toBeGreaterThanOrEqual(0.8);
      expect(result.independentObservationCount).toBeGreaterThanOrEqual(3);
      expect(result.distinctSessionCount).toBeGreaterThanOrEqual(3);
      expect(result.state).not.toBe('CONSOLIDATED');
    });

    it('blockerar CONSOLIDATED när masteryScore < 0.8', () => {
      const current: SkillProgressSnapshot = {
        skillId: 'VEH-01',
        state: 'INDEPENDENT',
        masteryScore: 0.75,
        reviewStatus: 'CURRENT',
        lastPracticedAt: new Date('2026-08-30T10:00:00Z'),
        lastIndependentAt: new Date('2026-08-30T10:00:00Z'),
        independentObservationCount: 3,
        distinctSessionCount: 3,
        contextCoverageScore: 0.5,
        observations: [
          {
            assessorRole: 'SUPERVISOR',
            supportLevel: 'MINIMAL_CUE',
            safetyFlag: 'NONE',
            environment: 'URBAN',
            sessionId: 'session-1',
            observedAt: new Date('2026-08-20T10:00:00Z'),
          },
          {
            assessorRole: 'SUPERVISOR',
            supportLevel: 'MINIMAL_CUE',
            safetyFlag: 'NONE',
            environment: 'RURAL',
            sessionId: 'session-2',
            observedAt: new Date('2026-08-25T10:00:00Z'),
          },
          {
            assessorRole: 'SUPERVISOR',
            supportLevel: 'MINIMAL_CUE',
            safetyFlag: 'NONE',
            environment: 'HIGHWAY',
            sessionId: 'session-3',
            observedAt: new Date('2026-08-30T10:00:00Z'),
          },
        ],
      };

      const observations: ObservationSnapshot[] = [];

      const result = updateSkillProgress({ current, newObservations: observations, now });

      // masteryScore är ~0.75 (MINIMAL_CUE = 0.75), < 0.8
      expect(result.masteryScore).toBeLessThan(0.8);
      expect(result.state).not.toBe('CONSOLIDATED');
    });

    it('blockerar CONSOLIDATED när independentObservationCount < 3', () => {
      const current: SkillProgressSnapshot = {
        skillId: 'VEH-01',
        state: 'INDEPENDENT',
        masteryScore: 0.85,
        reviewStatus: 'CURRENT',
        lastPracticedAt: new Date('2026-08-30T10:00:00Z'),
        lastIndependentAt: new Date('2026-08-30T10:00:00Z'),
        independentObservationCount: 2,
        distinctSessionCount: 3,
        contextCoverageScore: 0.5,
        observations: [
          {
            assessorRole: 'SUPERVISOR',
            supportLevel: 'INDEPENDENT',
            safetyFlag: 'NONE',
            environment: 'URBAN',
            sessionId: 'session-1',
            observedAt: new Date('2026-08-25T10:00:00Z'),
          },
          {
            assessorRole: 'SUPERVISOR',
            supportLevel: 'INDEPENDENT',
            safetyFlag: 'NONE',
            environment: 'RURAL',
            sessionId: 'session-2',
            observedAt: new Date('2026-08-30T10:00:00Z'),
          },
        ],
      };

      const observations: ObservationSnapshot[] = [];

      const result = updateSkillProgress({ current, newObservations: observations, now });

      expect(result.independentObservationCount).toBe(2);
      expect(result.state).not.toBe('CONSOLIDATED');
    });

    it('blockerar CONSOLIDATED när distinctSessionCount < 3', () => {
      const current: SkillProgressSnapshot = {
        skillId: 'VEH-01',
        state: 'INDEPENDENT',
        masteryScore: 0.85,
        reviewStatus: 'CURRENT',
        lastPracticedAt: new Date('2026-08-30T10:00:00Z'),
        lastIndependentAt: new Date('2026-08-30T10:00:00Z'),
        independentObservationCount: 3,
        distinctSessionCount: 2,
        contextCoverageScore: 0.5,
        observations: [
          {
            assessorRole: 'SUPERVISOR',
            supportLevel: 'INDEPENDENT',
            safetyFlag: 'NONE',
            environment: 'URBAN',
            sessionId: 'session-1',
            observedAt: new Date('2026-08-25T10:00:00Z'),
          },
          {
            assessorRole: 'SUPERVISOR',
            supportLevel: 'INDEPENDENT',
            safetyFlag: 'NONE',
            environment: 'URBAN',
            sessionId: 'session-1', // Samma session
            observedAt: new Date('2026-08-25T11:00:00Z'),
          },
          {
            assessorRole: 'SUPERVISOR',
            supportLevel: 'INDEPENDENT',
            safetyFlag: 'NONE',
            environment: 'RURAL',
            sessionId: 'session-2',
            observedAt: new Date('2026-08-30T10:00:00Z'),
          },
        ],
      };

      const observations: ObservationSnapshot[] = [];

      const result = updateSkillProgress({ current, newObservations: observations, now });

      expect(result.distinctSessionCount).toBe(2);
      expect(result.state).not.toBe('CONSOLIDATED');
    });
  });

  describe('reviewStatus vid olika tider', () => {
    it('CURRENT när tränat inom 14 dagar', () => {
      const current: SkillProgressSnapshot = {
        skillId: 'VEH-01',
        state: 'PRACTICING',
        masteryScore: 0.5,
        reviewStatus: 'CURRENT',
        lastPracticedAt: new Date('2026-08-25T10:00:00Z'), // 8 dagar sedan
        lastIndependentAt: null,
        independentObservationCount: 0,
        distinctSessionCount: 1,
        contextCoverageScore: null,
        observations: [
          {
            assessorRole: 'SUPERVISOR',
            supportLevel: 'PROMPTED',
            safetyFlag: 'NONE',
            environment: 'URBAN',
            sessionId: 'session-1',
            observedAt: new Date('2026-08-25T10:00:00Z'),
          },
        ],
      };

      const observations: ObservationSnapshot[] = [];

      const result = updateSkillProgress({ current, newObservations: observations, now });

      expect(result.reviewStatus).toBe('CURRENT');
    });

    it('DUE när tränat för 20 dagar sedan', () => {
      const current: SkillProgressSnapshot = {
        skillId: 'VEH-01',
        state: 'PRACTICING',
        masteryScore: 0.5,
        reviewStatus: 'CURRENT',
        lastPracticedAt: new Date('2026-08-13T10:00:00Z'), // 20 dagar sedan
        lastIndependentAt: null,
        independentObservationCount: 0,
        distinctSessionCount: 1,
        contextCoverageScore: null,
        observations: [
          {
            assessorRole: 'SUPERVISOR',
            supportLevel: 'PROMPTED',
            safetyFlag: 'NONE',
            environment: 'URBAN',
            sessionId: 'session-1',
            observedAt: new Date('2026-08-13T10:00:00Z'),
          },
        ],
      };

      const observations: ObservationSnapshot[] = [];

      const result = updateSkillProgress({ current, newObservations: observations, now });

      expect(result.reviewStatus).toBe('DUE');
    });

    it('OVERDUE när tränat för 40 dagar sedan', () => {
      const current: SkillProgressSnapshot = {
        skillId: 'VEH-01',
        state: 'PRACTICING',
        masteryScore: 0.5,
        reviewStatus: 'CURRENT',
        lastPracticedAt: new Date('2026-07-23T10:00:00Z'), // 40 dagar sedan
        lastIndependentAt: null,
        independentObservationCount: 0,
        distinctSessionCount: 1,
        contextCoverageScore: null,
        observations: [
          {
            assessorRole: 'SUPERVISOR',
            supportLevel: 'PROMPTED',
            safetyFlag: 'NONE',
            environment: 'URBAN',
            sessionId: 'session-1',
            observedAt: new Date('2026-07-23T10:00:00Z'),
          },
        ],
      };

      const observations: ObservationSnapshot[] = [];

      const result = updateSkillProgress({ current, newObservations: observations, now });

      expect(result.reviewStatus).toBe('OVERDUE');
    });
  });

  describe('determinism', () => {
    it('samma input och now ger samma output', () => {
      const current: SkillProgressSnapshot = {
        skillId: 'VEH-01',
        state: 'PRACTICING',
        masteryScore: 0.5,
        reviewStatus: 'CURRENT',
        lastPracticedAt: new Date('2026-08-30T10:00:00Z'),
        lastIndependentAt: null,
        independentObservationCount: 0,
        distinctSessionCount: 1,
        contextCoverageScore: null,
        observations: [
          {
            assessorRole: 'SUPERVISOR',
            supportLevel: 'PROMPTED',
            safetyFlag: 'NONE',
            environment: 'URBAN',
            sessionId: 'session-1',
            observedAt: new Date('2026-08-30T10:00:00Z'),
          },
        ],
      };

      const observations: ObservationSnapshot[] = [];

      const result1 = updateSkillProgress({ current, newObservations: observations, now });
      const result2 = updateSkillProgress({ current, newObservations: observations, now });

      expect(result1).toEqual(result2);
    });
  });

  describe('historik bevaras', () => {
    it('beräknar progression baserat på hela historiken', () => {
      const current: SkillProgressSnapshot = {
        skillId: 'VEH-01',
        state: 'NOT_STARTED',
        masteryScore: null,
        reviewStatus: 'CURRENT',
        lastPracticedAt: null,
        lastIndependentAt: null,
        independentObservationCount: 0,
        distinctSessionCount: 0,
        contextCoverageScore: null,
        observations: [
          {
            assessorRole: 'SUPERVISOR',
            supportLevel: 'FULL_INSTRUCTION',
            safetyFlag: 'NONE',
            environment: 'URBAN',
            sessionId: 'session-1',
            observedAt: new Date('2026-08-20T10:00:00Z'),
          },
          {
            assessorRole: 'SUPERVISOR',
            supportLevel: 'PROMPTED',
            safetyFlag: 'NONE',
            environment: 'URBAN',
            sessionId: 'session-2',
            observedAt: new Date('2026-08-25T10:00:00Z'),
          },
        ],
      };

      const observations: ObservationSnapshot[] = [
        {
          assessorRole: 'SUPERVISOR',
          supportLevel: 'INDEPENDENT',
          safetyFlag: 'NONE',
          environment: 'URBAN',
          sessionId: 'session-3',
          observedAt: new Date('2026-09-01T10:00:00Z'),
        },
      ];

      const result = updateSkillProgress({ current, newObservations: observations, now });

      // Ska ha 3 sessioner i historiken, och senaste är INDEPENDENT
      expect(result.distinctSessionCount).toBe(3);
      expect(result.lastIndependentAt).toEqual(new Date('2026-09-01T10:00:00Z'));
    });
  });
});
