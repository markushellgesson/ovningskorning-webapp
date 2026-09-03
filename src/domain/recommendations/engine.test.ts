/**
 * Tester för rekommendationsmotorn enligt implementationsplan slice 3.
 *
 * Tyngdpunkten i testningen ligger här. Testerna är i Given/When/Then-format
 * och täcker särskilt prerequisites-fallen enligt ADR 0002.
 */

import { describe, it, expect } from 'vitest';
import { recommendNextTraining } from './engine.js';
import type { SkillNode, SkillProgressSnapshot, GoalSnapshot } from '../progression/types.js';
import type { RecommendationContext } from './types.js';

describe('Rekommendationsmotor v1', () => {
  const baseContext: RecommendationContext = {
    now: new Date('2026-09-02T12:00:00Z'),
    transmissionType: 'MANUAL',
  };

  describe('Hårda constraints: prerequisites', () => {
    it('Given: Skill B kräver A på minst PRACTICING, A är INTRODUCED; When: rekommendation genereras; Then: B får ALDRIG bli primary', () => {
      const skillA: SkillNode = {
        id: 'VEH-01',
        category: 'VEHICLE_CONTROL',
        name: 'Grundläggande fordonskontroll',
        prerequisites: [],
        safetyCritical: true,
        continuous: false,
        applicableTransmissions: [],
      };

      const skillB: SkillNode = {
        id: 'RUR-01',
        category: 'RURAL',
        name: 'Landsväg',
        prerequisites: [
          {
            prerequisiteSkillId: 'VEH-01',
            minimumState: 'PRACTICING',
          },
        ],
        safetyCritical: false,
        continuous: false,
        applicableTransmissions: [],
      };

      const progressA: SkillProgressSnapshot = {
        skillId: 'VEH-01',
        state: 'INTRODUCED', // Under kravet!
        masteryScore: 0.3,
        reviewStatus: 'CURRENT',
        lastPracticedAt: new Date('2026-09-01T10:00:00Z'),
        lastIndependentAt: null,
        independentObservationCount: 0,
        distinctSessionCount: 1,
        contextCoverageScore: 0.2,
        recentObservations: [],
      };

      const progressB: SkillProgressSnapshot = {
        skillId: 'RUR-01',
        state: 'NOT_STARTED',
        masteryScore: null,
        reviewStatus: 'OVERDUE',
        lastPracticedAt: null,
        lastIndependentAt: null,
        independentObservationCount: 0,
        distinctSessionCount: 0,
        contextCoverageScore: null,
        recentObservations: [],
      };

      const result = recommendNextTraining({
        skills: [skillA, skillB],
        progress: [progressA, progressB],
        recentSessions: [
          {
            sessionId: 's1',
            startedAt: new Date('2026-09-01T10:00:00Z'),
            skillIds: ['VEH-01'],
            environmentTypes: [],
            trafficLoad: null,
          },
        ],
        goals: [],
        context: baseContext,
      });

      expect(result.primary?.skillId).not.toBe('RUR-01');
      expect(result.primary?.skillId).toBe('VEH-01'); // A ska rekommenderas i stället
    });

    it('Given: Motorväg kräver landsväg på PRACTICING; landsväg är NOT_STARTED; When: rekommendation genereras; Then: motorväg får inte rekommenderas', () => {
      const landsväg: SkillNode = {
        id: 'RUR-01',
        category: 'RURAL',
        name: 'Landsväg',
        prerequisites: [],
        safetyCritical: false,
        continuous: false,
        applicableTransmissions: [],
      };

      const motorväg: SkillNode = {
        id: 'HWY-01',
        category: 'HIGHWAY',
        name: 'Motorväg',
        prerequisites: [
          {
            prerequisiteSkillId: 'RUR-01',
            minimumState: 'PRACTICING',
          },
        ],
        safetyCritical: false,
        continuous: false,
        applicableTransmissions: [],
      };

      const progressLandsväg: SkillProgressSnapshot = {
        skillId: 'RUR-01',
        state: 'NOT_STARTED',
        masteryScore: null,
        reviewStatus: 'OVERDUE',
        lastPracticedAt: null,
        lastIndependentAt: null,
        independentObservationCount: 0,
        distinctSessionCount: 0,
        contextCoverageScore: null,
        recentObservations: [],
      };

      const result = recommendNextTraining({
        skills: [landsväg, motorväg],
        progress: [progressLandsväg],
        recentSessions: [
          {
            sessionId: 's1',
            startedAt: new Date('2026-09-01T10:00:00Z'),
            skillIds: [],
            environmentTypes: [],
            trafficLoad: null,
          },
        ],
        goals: [],
        context: baseContext,
      });

      expect(result.primary?.skillId).not.toBe('HWY-01');
      expect(result.review?.skillId).not.toBe('HWY-01');
      expect(result.observation?.skillId).not.toBe('HWY-01');
    });

    it('Given: Kedja A → B → C, A är PRACTICING, B är INTRODUCED; When: rekommendation; Then: C får inte rekommenderas', () => {
      const skillA: SkillNode = {
        id: 'A',
        category: 'VEHICLE_CONTROL',
        name: 'A',
        prerequisites: [],
        safetyCritical: false,
        continuous: false,
        applicableTransmissions: [],
      };

      const skillB: SkillNode = {
        id: 'B',
        category: 'URBAN',
        name: 'B',
        prerequisites: [{ prerequisiteSkillId: 'A', minimumState: 'PRACTICING' }],
        safetyCritical: false,
        continuous: false,
        applicableTransmissions: [],
      };

      const skillC: SkillNode = {
        id: 'C',
        category: 'RURAL',
        name: 'C',
        prerequisites: [{ prerequisiteSkillId: 'B', minimumState: 'PRACTICING' }],
        safetyCritical: false,
        continuous: false,
        applicableTransmissions: [],
      };

      const progressA: SkillProgressSnapshot = {
        skillId: 'A',
        state: 'PRACTICING',
        masteryScore: 0.6,
        reviewStatus: 'CURRENT',
        lastPracticedAt: new Date('2026-09-01'),
        lastIndependentAt: null,
        independentObservationCount: 1,
        distinctSessionCount: 3,
        contextCoverageScore: 0.5,
        recentObservations: [],
      };

      const progressB: SkillProgressSnapshot = {
        skillId: 'B',
        state: 'INTRODUCED', // Under kravet för C
        masteryScore: 0.2,
        reviewStatus: 'CURRENT',
        lastPracticedAt: new Date('2026-08-30'),
        lastIndependentAt: null,
        independentObservationCount: 0,
        distinctSessionCount: 1,
        contextCoverageScore: 0.2,
        recentObservations: [],
      };

      const result = recommendNextTraining({
        skills: [skillA, skillB, skillC],
        progress: [progressA, progressB],
        recentSessions: [
          {
            sessionId: 's1',
            startedAt: new Date('2026-09-01'),
            skillIds: ['A', 'B'],
            environmentTypes: [],
            trafficLoad: null,
          },
        ],
        goals: [],
        context: baseContext,
      });

      expect(result.primary?.skillId).not.toBe('C');
      expect(result.review?.skillId).not.toBe('C');
    });
  });

  describe('Repetition och freshness', () => {
    it('Given: Moment stabilt men inte tränats på 30 dagar; When: rekommendation; Then: ska komma upp som REVIEW', () => {
      const skill: SkillNode = {
        id: 'VEH-01',
        category: 'VEHICLE_CONTROL',
        name: 'Fordonskontroll',
        prerequisites: [],
        safetyCritical: false,
        continuous: false,
        applicableTransmissions: [],
      };

      const progress: SkillProgressSnapshot = {
        skillId: 'VEH-01',
        state: 'INDEPENDENT',
        masteryScore: 0.75,
        reviewStatus: 'OVERDUE',
        lastPracticedAt: new Date('2026-08-03T10:00:00Z'), // 30 dagar sedan
        lastIndependentAt: new Date('2026-08-01'),
        independentObservationCount: 4,
        distinctSessionCount: 6,
        contextCoverageScore: 0.8,
        recentObservations: [],
      };

      const otherSkill: SkillNode = {
        id: 'URB-01',
        category: 'URBAN',
        name: 'Stadsförande',
        prerequisites: [],
        safetyCritical: false,
        continuous: false,
        applicableTransmissions: [],
      };

      const otherProgress: SkillProgressSnapshot = {
        skillId: 'URB-01',
        state: 'PRACTICING',
        masteryScore: 0.5,
        reviewStatus: 'CURRENT',
        lastPracticedAt: new Date('2026-09-01'),
        lastIndependentAt: null,
        independentObservationCount: 1,
        distinctSessionCount: 2,
        contextCoverageScore: 0.3,
        recentObservations: [],
      };

      const result = recommendNextTraining({
        skills: [skill, otherSkill],
        progress: [progress, otherProgress],
        recentSessions: [
          {
            sessionId: 's1',
            startedAt: new Date('2026-09-01'),
            skillIds: ['URB-01'],
            environmentTypes: [],
            trafficLoad: null,
          },
        ],
        goals: [],
        context: baseContext,
      });

      // Antingen primary eller review, men ska finnas med
      const recommended =
        result.primary?.skillId === 'VEH-01' || result.review?.skillId === 'VEH-01';
      expect(recommended).toBe(true);

      // Och ska ha skälet LONG_TIME_SINCE_PRACTICE
      const reasons =
        result.primary?.skillId === 'VEH-01'
          ? result.primary.reasons
          : (result.review?.reasons ?? []);
      const hasRepetitionReason = reasons.some(
        (r) => r.type === 'LONG_TIME_SINCE_PRACTICE' || r.type === 'NEEDS_REPETITION',
      );
      expect(hasRepetitionReason).toBe(true);
    });
  });

  describe('Stödnivå och självständighet', () => {
    it('Given: Observation med FULL_INSTRUCTION; When: rekommendation; Then: ska ha skälet LOW_INDEPENDENCE', () => {
      const skill: SkillNode = {
        id: 'INT-01',
        category: 'INTERSECTIONS',
        name: 'Korsningar',
        prerequisites: [],
        safetyCritical: true,
        continuous: false,
        applicableTransmissions: [],
      };

      const progress: SkillProgressSnapshot = {
        skillId: 'INT-01',
        state: 'PRACTICING',
        masteryScore: 0.4,
        reviewStatus: 'CURRENT',
        lastPracticedAt: new Date('2026-09-01'),
        lastIndependentAt: null,
        independentObservationCount: 0,
        distinctSessionCount: 2,
        contextCoverageScore: 0.3,
        recentObservations: [
          {
            supportLevel: 'FULL_INSTRUCTION',
            safetyFlag: 'NONE',
            observedAt: new Date('2026-09-01'),
          },
        ],
      };

      const result = recommendNextTraining({
        skills: [skill],
        progress: [progress],
        recentSessions: [
          {
            sessionId: 's1',
            startedAt: new Date('2026-09-01'),
            skillIds: ['INT-01'],
            environmentTypes: [],
            trafficLoad: null,
          },
        ],
        goals: [],
        context: baseContext,
      });

      expect(result.primary?.skillId).toBe('INT-01');
      const hasLowIndependence = result.primary?.reasons.some((r) => r.type === 'LOW_INDEPENDENCE');
      expect(hasLowIndependence).toBe(true);
    });
  });

  describe('Säkerhetsflagga blockerar uppgradering', () => {
    it('Given: CRITICAL safetyFlag nyligen; When: rekommendation; Then: momentet ska INTE rekommenderas', () => {
      const skill: SkillNode = {
        id: 'RAB-01',
        category: 'ROUNDABOUTS',
        name: 'Cirkulationsplats',
        prerequisites: [],
        safetyCritical: true,
        continuous: false,
        applicableTransmissions: [],
      };

      const progress: SkillProgressSnapshot = {
        skillId: 'RAB-01',
        state: 'PRACTICING',
        masteryScore: 0.5,
        reviewStatus: 'CURRENT',
        lastPracticedAt: new Date('2026-09-01'),
        lastIndependentAt: null,
        independentObservationCount: 0,
        distinctSessionCount: 3,
        contextCoverageScore: 0.4,
        recentObservations: [
          {
            supportLevel: 'PROMPTED',
            safetyFlag: 'CRITICAL', // !!!
            observedAt: new Date('2026-09-01'),
          },
        ],
      };

      const otherSkill: SkillNode = {
        id: 'VEH-01',
        category: 'VEHICLE_CONTROL',
        name: 'Fordonskontroll',
        prerequisites: [],
        safetyCritical: false,
        continuous: false,
        applicableTransmissions: [],
      };

      const otherProgress: SkillProgressSnapshot = {
        skillId: 'VEH-01',
        state: 'PRACTICING',
        masteryScore: 0.6,
        reviewStatus: 'CURRENT',
        lastPracticedAt: new Date('2026-08-30'),
        lastIndependentAt: null,
        independentObservationCount: 1,
        distinctSessionCount: 4,
        contextCoverageScore: 0.5,
        recentObservations: [],
      };

      const result = recommendNextTraining({
        skills: [skill, otherSkill],
        progress: [progress, otherProgress],
        recentSessions: [
          {
            sessionId: 's1',
            startedAt: new Date('2026-09-01'),
            skillIds: ['RAB-01'],
            environmentTypes: [],
            trafficLoad: null,
          },
        ],
        goals: [],
        context: baseContext,
      });

      // RAB-01 får INTE rekommenderas
      expect(result.primary?.skillId).not.toBe('RAB-01');
      expect(result.review?.skillId).not.toBe('RAB-01');
      expect(result.observation?.skillId).not.toBe('RAB-01');
    });
  });

  describe('Determinism', () => {
    it('Given: Samma input och samma now; When: kört flera gånger; Then: exakt samma output', () => {
      const skill: SkillNode = {
        id: 'VEH-01',
        category: 'VEHICLE_CONTROL',
        name: 'Fordonskontroll',
        prerequisites: [],
        safetyCritical: false,
        continuous: false,
        applicableTransmissions: [],
      };

      const progress: SkillProgressSnapshot = {
        skillId: 'VEH-01',
        state: 'PRACTICING',
        masteryScore: 0.5,
        reviewStatus: 'CURRENT',
        lastPracticedAt: new Date('2026-09-01'),
        lastIndependentAt: null,
        independentObservationCount: 1,
        distinctSessionCount: 2,
        contextCoverageScore: 0.4,
        recentObservations: [],
      };

      const input = {
        skills: [skill],
        progress: [progress],
        recentSessions: [
          {
            sessionId: 's1',
            startedAt: new Date('2026-09-01'),
            skillIds: ['VEH-01'],
            environmentTypes: [],
            trafficLoad: null,
          },
        ],
        goals: [],
        context: baseContext,
      };

      const result1 = recommendNextTraining(input);
      const result2 = recommendNextTraining(input);
      const result3 = recommendNextTraining(input);

      expect(result1).toEqual(result2);
      expect(result2).toEqual(result3);
    });
  });

  describe('Max antal mål', () => {
    it('Given: Många kandidater; When: rekommendation; Then: max 3 mål (1 PRIMARY + 1 REVIEW + 1 OBSERVATION)', () => {
      const skills: SkillNode[] = Array.from({ length: 10 }, (_, i) => ({
        id: `SKILL-${i}`,
        category: i < 5 ? 'VEHICLE_CONTROL' : 'URBAN',
        name: `Skill ${i}`,
        prerequisites: [],
        safetyCritical: i % 2 === 0,
        continuous: i % 3 === 0,
        applicableTransmissions: [],
      }));

      const progress: SkillProgressSnapshot[] = skills.map((s, i) => ({
        skillId: s.id,
        state: 'PRACTICING',
        masteryScore: 0.5 + i * 0.02,
        reviewStatus: 'CURRENT',
        lastPracticedAt: new Date('2026-09-01'),
        lastIndependentAt: null,
        independentObservationCount: i,
        distinctSessionCount: i + 2,
        contextCoverageScore: 0.5,
        recentObservations: [],
      }));

      const result = recommendNextTraining({
        skills,
        progress,
        recentSessions: [
          {
            sessionId: 's1',
            startedAt: new Date('2026-09-01'),
            skillIds: skills.map((s) => s.id),
            environmentTypes: [],
            trafficLoad: null,
          },
        ],
        goals: [],
        context: baseContext,
      });

      const recommended = [result.primary, result.review, result.observation].filter(
        (r) => r !== null,
      );

      expect(recommended.length).toBeLessThanOrEqual(3);
    });
  });

  describe('Otillräckligt underlag', () => {
    it('Given: Tomt underlag (inga skills med progress); When: rekommendation; Then: insufficientData=true', () => {
      const skills: SkillNode[] = [
        {
          id: 'VEH-01',
          category: 'VEHICLE_CONTROL',
          name: 'Fordonskontroll',
          prerequisites: [],
          safetyCritical: false,
          continuous: false,
          applicableTransmissions: [],
        },
      ];

      const result = recommendNextTraining({
        skills,
        progress: [],
        recentSessions: [],
        goals: [],
        context: baseContext,
      });

      expect(result.insufficientData).toBe(true);
      expect(result.primary).toBeNull();
      expect(result.explanation).toBeDefined();
    });

    it('Given: Endast 2 skills med progress men inga sessioner; When: rekommendation; Then: insufficientData=true', () => {
      const skills: SkillNode[] = [
        {
          id: 'VEH-01',
          category: 'VEHICLE_CONTROL',
          name: 'Fordonskontroll',
          prerequisites: [],
          safetyCritical: false,
          continuous: false,
          applicableTransmissions: [],
        },
        {
          id: 'VEH-02',
          category: 'VEHICLE_CONTROL',
          name: 'Styrning',
          prerequisites: [],
          safetyCritical: false,
          continuous: false,
          applicableTransmissions: [],
        },
      ];

      const progress: SkillProgressSnapshot[] = [
        {
          skillId: 'VEH-01',
          state: 'INTRODUCED',
          masteryScore: 0.3,
          reviewStatus: 'CURRENT',
          lastPracticedAt: new Date('2026-09-01'),
          lastIndependentAt: null,
          independentObservationCount: 0,
          distinctSessionCount: 1,
          contextCoverageScore: 0.2,
          recentObservations: [],
        },
        {
          skillId: 'VEH-02',
          state: 'INTRODUCED',
          masteryScore: 0.3,
          reviewStatus: 'CURRENT',
          lastPracticedAt: new Date('2026-09-01'),
          lastIndependentAt: null,
          independentObservationCount: 0,
          distinctSessionCount: 1,
          contextCoverageScore: 0.2,
          recentObservations: [],
        },
      ];

      const result = recommendNextTraining({
        skills,
        progress,
        recentSessions: [], // Inga sessioner!
        goals: [],
        context: baseContext,
      });

      expect(result.insufficientData).toBe(true);
    });
  });

  describe('Varje förslag har skäl', () => {
    it('Given: Rekommendation genererad med minst primary; When: inspekterar resultat; Then: minst ett skäl finns', () => {
      const skill: SkillNode = {
        id: 'VEH-01',
        category: 'VEHICLE_CONTROL',
        name: 'Fordonskontroll',
        prerequisites: [],
        safetyCritical: true,
        continuous: false,
        applicableTransmissions: [],
      };

      const progress: SkillProgressSnapshot = {
        skillId: 'VEH-01',
        state: 'PRACTICING',
        masteryScore: 0.4,
        reviewStatus: 'CURRENT',
        lastPracticedAt: new Date('2026-09-01'),
        lastIndependentAt: null,
        independentObservationCount: 1,
        distinctSessionCount: 3,
        contextCoverageScore: 0.3,
        recentObservations: [],
      };

      const result = recommendNextTraining({
        skills: [skill],
        progress: [progress],
        recentSessions: [
          {
            sessionId: 's1',
            startedAt: new Date('2026-09-01'),
            skillIds: ['VEH-01'],
            environmentTypes: [],
            trafficLoad: null,
          },
        ],
        goals: [],
        context: baseContext,
      });

      expect(result.primary).not.toBeNull();
      expect(result.primary!.reasons.length).toBeGreaterThan(0);
    });
  });

  describe('Användar goal', () => {
    it('Given: Aktivt goal för skill X; When: rekommendation; Then: skill X ska ha skälet USER_GOAL', () => {
      const skillX: SkillNode = {
        id: 'RAB-01',
        category: 'ROUNDABOUTS',
        name: 'Cirkulationsplats',
        prerequisites: [],
        safetyCritical: false,
        continuous: false,
        applicableTransmissions: [],
      };

      const skillY: SkillNode = {
        id: 'VEH-01',
        category: 'VEHICLE_CONTROL',
        name: 'Fordonskontroll',
        prerequisites: [],
        safetyCritical: false,
        continuous: false,
        applicableTransmissions: [],
      };

      const progressX: SkillProgressSnapshot = {
        skillId: 'RAB-01',
        state: 'INTRODUCED',
        masteryScore: 0.3,
        reviewStatus: 'DUE',
        lastPracticedAt: new Date('2026-08-20'),
        lastIndependentAt: null,
        independentObservationCount: 0,
        distinctSessionCount: 1,
        contextCoverageScore: 0.2,
        recentObservations: [],
      };

      const progressY: SkillProgressSnapshot = {
        skillId: 'VEH-01',
        state: 'PRACTICING',
        masteryScore: 0.6,
        reviewStatus: 'CURRENT',
        lastPracticedAt: new Date('2026-09-01'),
        lastIndependentAt: null,
        independentObservationCount: 2,
        distinctSessionCount: 4,
        contextCoverageScore: 0.5,
        recentObservations: [],
      };

      const goal: GoalSnapshot = {
        goalId: 'goal-1',
        skillId: 'RAB-01',
        description: 'Jag vill kunna köra cirkulationsplatser själv',
        status: 'ACTIVE',
      };

      const result = recommendNextTraining({
        skills: [skillX, skillY],
        progress: [progressX, progressY],
        recentSessions: [
          {
            sessionId: 's1',
            startedAt: new Date('2026-09-01'),
            skillIds: ['VEH-01'],
            environmentTypes: [],
            trafficLoad: null,
          },
        ],
        goals: [goal],
        context: baseContext,
      });

      // RAB-01 ska prioriteras högre p.g.a. goal
      const rabRecommended =
        result.primary?.skillId === 'RAB-01' || result.review?.skillId === 'RAB-01';
      expect(rabRecommended).toBe(true);

      const reasons =
        result.primary?.skillId === 'RAB-01'
          ? result.primary.reasons
          : (result.review?.reasons ?? []);
      const hasUserGoal = reasons.some((r) => r.type === 'USER_GOAL');
      expect(hasUserGoal).toBe(true);
    });
  });

  describe('Växellåda', () => {
    it('Given: Moment enbart för manuell växellåda; context är AUTOMATIC; When: rekommendation; Then: momentet får inte rekommenderas', () => {
      const manualSkill: SkillNode = {
        id: 'VEH-CLUTCH',
        category: 'VEHICLE_CONTROL',
        name: 'Koppling och växling',
        prerequisites: [],
        safetyCritical: false,
        continuous: false,
        applicableTransmissions: ['MANUAL'],
      };

      const progress: SkillProgressSnapshot = {
        skillId: 'VEH-CLUTCH',
        state: 'PRACTICING',
        masteryScore: 0.5,
        reviewStatus: 'CURRENT',
        lastPracticedAt: new Date('2026-09-01'),
        lastIndependentAt: null,
        independentObservationCount: 1,
        distinctSessionCount: 2,
        contextCoverageScore: 0.4,
        recentObservations: [],
      };

      const automaticContext: RecommendationContext = {
        now: new Date('2026-09-02T12:00:00Z'),
        transmissionType: 'AUTOMATIC',
      };

      const result = recommendNextTraining({
        skills: [manualSkill],
        progress: [progress],
        recentSessions: [
          {
            sessionId: 's1',
            startedAt: new Date('2026-09-01'),
            skillIds: [],
            environmentTypes: [],
            trafficLoad: null,
          },
        ],
        goals: [],
        context: automaticContext,
      });

      expect(result.primary).toBeNull();
      // Borde vara insufficientData ELLER explanation om inga andra skills finns
    });
  });
});
