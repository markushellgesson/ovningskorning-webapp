/**
 * Tester för performance level-härledning.
 */

import { describe, it, expect } from 'vitest';
import { derivePerformanceLevel, contributesToMastery } from './performance-level';
import type { SafetyFlag } from './types';

describe('derivePerformanceLevel', () => {
  describe('Given no safety issues', () => {
    const safetyFlag: SafetyFlag = 'NONE';

    it('When FULL_INSTRUCTION, Then returns 1', () => {
      const result = derivePerformanceLevel('FULL_INSTRUCTION', safetyFlag);
      expect(result).toBe(1);
    });

    it('When PROMPTED, Then returns 2', () => {
      const result = derivePerformanceLevel('PROMPTED', safetyFlag);
      expect(result).toBe(2);
    });

    it('When MINIMAL_CUE, Then returns 3', () => {
      const result = derivePerformanceLevel('MINIMAL_CUE', safetyFlag);
      expect(result).toBe(3);
    });

    it('When INDEPENDENT, Then returns 4', () => {
      const result = derivePerformanceLevel('INDEPENDENT', safetyFlag);
      expect(result).toBe(4);
    });
  });

  describe('Given ATTENTION safety flag', () => {
    const safetyFlag: SafetyFlag = 'ATTENTION';

    it('When FULL_INSTRUCTION, Then returns 0 (clamped)', () => {
      const result = derivePerformanceLevel('FULL_INSTRUCTION', safetyFlag);
      expect(result).toBe(0);
    });

    it('When PROMPTED, Then returns 1 (2 - 1 penalty)', () => {
      const result = derivePerformanceLevel('PROMPTED', safetyFlag);
      expect(result).toBe(1);
    });

    it('When MINIMAL_CUE, Then returns 2 (3 - 1 penalty)', () => {
      const result = derivePerformanceLevel('MINIMAL_CUE', safetyFlag);
      expect(result).toBe(2);
    });

    it('When INDEPENDENT, Then returns 3 (4 - 1 penalty)', () => {
      const result = derivePerformanceLevel('INDEPENDENT', safetyFlag);
      expect(result).toBe(3);
    });
  });

  describe('Given CRITICAL safety flag', () => {
    const safetyFlag: SafetyFlag = 'CRITICAL';

    it('When FULL_INSTRUCTION, Then returns 0', () => {
      const result = derivePerformanceLevel('FULL_INSTRUCTION', safetyFlag);
      expect(result).toBe(0);
    });

    it('When PROMPTED, Then returns 0', () => {
      const result = derivePerformanceLevel('PROMPTED', safetyFlag);
      expect(result).toBe(0);
    });

    it('When MINIMAL_CUE, Then returns 0', () => {
      const result = derivePerformanceLevel('MINIMAL_CUE', safetyFlag);
      expect(result).toBe(0);
    });

    it('When INDEPENDENT, Then returns 0 (CRITICAL overrides everything)', () => {
      const result = derivePerformanceLevel('INDEPENDENT', safetyFlag);
      expect(result).toBe(0);
    });
  });
});

describe('contributesToMastery', () => {
  it('Given STUDENT role, Then returns false', () => {
    expect(contributesToMastery('STUDENT')).toBe(false);
  });

  it('Given SUPERVISOR role, Then returns true', () => {
    expect(contributesToMastery('SUPERVISOR')).toBe(true);
  });

  it('Given INSTRUCTOR role, Then returns true', () => {
    expect(contributesToMastery('INSTRUCTOR')).toBe(true);
  });

  it('Given unknown role, Then returns false', () => {
    expect(contributesToMastery('UNKNOWN')).toBe(false);
  });
});
