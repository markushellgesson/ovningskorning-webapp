/**
 * Tester för divergensdetektering.
 */

import { describe, it, expect } from 'vitest';
import { detectDivergence, canReveal, countDivergences } from './divergence';
import type { Assessment } from './types';

const createAssessment = (overrides: Partial<Assessment> = {}): Assessment => ({
  id: 'test-id',
  sessionId: 'session-1',
  skillId: 'SKILL-01',
  assessorId: 'user-1',
  assessorRole: 'STUDENT',
  supportLevel: 'INDEPENDENT',
  performanceLevel: 4,
  safetyFlag: 'NONE',
  note: null,
  createdAt: new Date(),
  ...overrides,
});

describe('detectDivergence', () => {
  it('Given same supportLevel, Then no divergence exists', () => {
    const student = createAssessment({
      assessorRole: 'STUDENT',
      supportLevel: 'INDEPENDENT',
    });
    const supervisor = createAssessment({
      assessorRole: 'SUPERVISOR',
      supportLevel: 'INDEPENDENT',
    });

    const result = detectDivergence(student, supervisor, 'Rondeller');

    expect(result.exists).toBe(false);
    expect(result.discussionPrompt).toBeUndefined();
  });

  it('Given different supportLevel, Then divergence exists with prompt', () => {
    const student = createAssessment({
      assessorRole: 'STUDENT',
      supportLevel: 'INDEPENDENT',
    });
    const supervisor = createAssessment({
      assessorRole: 'SUPERVISOR',
      supportLevel: 'PROMPTED',
    });

    const result = detectDivergence(student, supervisor, 'Rondeller');

    expect(result.exists).toBe(true);
    expect(result.discussionPrompt).toBeDefined();
    expect(result.discussionPrompt).toBeTruthy();
  });

  it('Given student assessment missing, Then no divergence', () => {
    const supervisor = createAssessment({
      assessorRole: 'SUPERVISOR',
      supportLevel: 'PROMPTED',
    });

    const result = detectDivergence(null, supervisor, 'Rondeller');

    expect(result.exists).toBe(false);
  });

  it('Given supervisor assessment missing, Then no divergence', () => {
    const student = createAssessment({
      assessorRole: 'STUDENT',
      supportLevel: 'INDEPENDENT',
    });

    const result = detectDivergence(student, null, 'Rondeller');

    expect(result.exists).toBe(false);
  });

  it('Given both assessments missing, Then no divergence', () => {
    const result = detectDivergence(null, null, 'Rondeller');

    expect(result.exists).toBe(false);
  });

  describe('Discussion prompts are non-judgmental', () => {
    it('Then prompt never contains "rätt" or "fel"', () => {
      const student = createAssessment({
        supportLevel: 'INDEPENDENT',
      });
      const supervisor = createAssessment({
        supportLevel: 'PROMPTED',
      });

      const result = detectDivergence(student, supervisor, 'Rondeller');

      expect(result.discussionPrompt).toBeDefined();
      expect(result.discussionPrompt?.toLowerCase()).not.toContain('rätt');
      expect(result.discussionPrompt?.toLowerCase()).not.toContain('fel');
    });
  });
});

describe('canReveal', () => {
  it('Given both reflections exist, Then can reveal', () => {
    expect(canReveal(true, true)).toBe(true);
  });

  it('Given only student reflection, Then cannot reveal', () => {
    expect(canReveal(true, false)).toBe(false);
  });

  it('Given only supervisor assessment, Then cannot reveal', () => {
    expect(canReveal(false, true)).toBe(false);
  });

  it('Given neither exists, Then cannot reveal', () => {
    expect(canReveal(false, false)).toBe(false);
  });
});

describe('countDivergences', () => {
  it('Given no assessments, Then returns 0', () => {
    const count = countDivergences([], []);
    expect(count).toBe(0);
  });

  it('Given matching supportLevels, Then returns 0', () => {
    const student = [
      createAssessment({
        skillId: 'SKILL-01',
        supportLevel: 'INDEPENDENT',
      }),
    ];
    const supervisor = [
      createAssessment({
        skillId: 'SKILL-01',
        supportLevel: 'INDEPENDENT',
      }),
    ];

    const count = countDivergences(student, supervisor);
    expect(count).toBe(0);
  });

  it('Given one divergence, Then returns 1', () => {
    const student = [
      createAssessment({
        skillId: 'SKILL-01',
        supportLevel: 'INDEPENDENT',
      }),
    ];
    const supervisor = [
      createAssessment({
        skillId: 'SKILL-01',
        supportLevel: 'PROMPTED',
      }),
    ];

    const count = countDivergences(student, supervisor);
    expect(count).toBe(1);
  });

  it('Given multiple skills with divergences, Then returns correct count', () => {
    const student = [
      createAssessment({
        skillId: 'SKILL-01',
        supportLevel: 'INDEPENDENT',
      }),
      createAssessment({
        skillId: 'SKILL-02',
        supportLevel: 'PROMPTED',
      }),
      createAssessment({
        skillId: 'SKILL-03',
        supportLevel: 'MINIMAL_CUE',
      }),
    ];
    const supervisor = [
      createAssessment({
        skillId: 'SKILL-01',
        supportLevel: 'PROMPTED', // divergens
      }),
      createAssessment({
        skillId: 'SKILL-02',
        supportLevel: 'PROMPTED', // ingen divergens
      }),
      createAssessment({
        skillId: 'SKILL-03',
        supportLevel: 'INDEPENDENT', // divergens
      }),
    ];

    const count = countDivergences(student, supervisor);
    expect(count).toBe(2);
  });

  it('Given student assessed skill supervisor did not, Then ignores it', () => {
    const student = [
      createAssessment({
        skillId: 'SKILL-01',
        supportLevel: 'INDEPENDENT',
      }),
      createAssessment({
        skillId: 'SKILL-02',
        supportLevel: 'PROMPTED',
      }),
    ];
    const supervisor = [
      createAssessment({
        skillId: 'SKILL-01',
        supportLevel: 'INDEPENDENT',
      }),
      // SKILL-02 saknas
    ];

    const count = countDivergences(student, supervisor);
    expect(count).toBe(0);
  });
});
