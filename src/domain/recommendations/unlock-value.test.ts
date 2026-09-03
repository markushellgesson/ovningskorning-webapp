import { describe, it, expect } from 'vitest';
import { computeUnlockValue, hasJustBecomeAvailable, countBlockedDependents } from './unlock-value';
import type { SkillNode, SkillProgressSnapshot } from '../progression/types';

/**
 * ADR 0002 namnger `prerequisite_unlock_value` men definierar den inte.
 * Båda läsningarna är implementerade och testas här, så att valet mellan dem
 * kan göras på observerat beteende i stället för på gissning.
 */

function skill(id: string, prereqs: Array<[string, string]> = []): SkillNode {
  return {
    id,
    name: id,
    category: 'MANEUVERING',
    prerequisites: prereqs.map(([prerequisiteSkillId, minimumState]) => ({
      prerequisiteSkillId,
      minimumState,
    })),
    safetyCritical: false,
    continuous: false,
    relevantEnvironments: [],
    applicableTransmissions: [],
  } as unknown as SkillNode;
}

function progress(skillId: string, state: string): SkillProgressSnapshot {
  return { skillId, state, masteryScore: 0.5 } as unknown as SkillProgressSnapshot;
}

describe('prerequisite unlock value', () => {
  describe('READY — momentets egna krav är nyss uppfyllda', () => {
    it('ger värde när alla förkunskapskrav är uppfyllda', () => {
      const b = skill('B', [['A', 'PRACTICING']]);
      const state = [progress('A', 'PRACTICING')];

      expect(hasJustBecomeAvailable(b, state)).toBe(true);
      expect(computeUnlockValue(b, [skill('A'), b], state, 'READY')).toBe(1);
    });

    it('ger inget värde när ett krav ännu inte är uppfyllt', () => {
      const b = skill('B', [['A', 'PRACTICING']]);
      const state = [progress('A', 'INTRODUCED')];

      expect(hasJustBecomeAvailable(b, state)).toBe(false);
      expect(computeUnlockValue(b, [skill('A'), b], state, 'READY')).toBe(0);
    });

    it('ger inget värde till moment helt utan förkunskapskrav', () => {
      // Annars skulle grundmoment få bonus i all evighet — de har alltid
      // varit tillgängliga och blir aldrig "nyss upplåsta".
      const a = skill('A');
      expect(hasJustBecomeAvailable(a, [])).toBe(false);
    });
  });

  describe('GATEKEEPER — momentet blockerar andra moment', () => {
    it('räknar moment som blockeras av det här momentet', () => {
      const a = skill('A');
      const all = [a, skill('B', [['A', 'PRACTICING']]), skill('C', [['A', 'PRACTICING']])];

      expect(countBlockedDependents(a, all, [progress('A', 'INTRODUCED')])).toBe(2);
    });

    it('räknar inte moment vars krav redan är uppfyllt', () => {
      const a = skill('A');
      const all = [a, skill('B', [['A', 'PRACTICING']])];

      // A är redan PRACTICING — B är inte längre blockerat av A.
      expect(countBlockedDependents(a, all, [progress('A', 'PRACTICING')])).toBe(0);
    });

    it('mättas så att ett enda grundmoment inte dominerar scoringen', () => {
      const a = skill('A');
      const many = [a, ...['B', 'C', 'D', 'E', 'F'].map((id) => skill(id, [['A', 'PRACTICING']]))];

      const value = computeUnlockValue(a, many, [progress('A', 'NOT_STARTED')], 'GATEKEEPER', 3);
      expect(value).toBe(1);
      expect(value).toBeLessThanOrEqual(1);
    });
  });

  describe('strategierna skiljer sig åt — det är hela poängen', () => {
    it('ger olika svar för ett grundmoment som blockerar många', () => {
      const a = skill('A');
      const all = [a, skill('B', [['A', 'PRACTICING']]), skill('C', [['A', 'PRACTICING']])];
      const state = [progress('A', 'INTRODUCED')];

      // A har inga egna krav → READY ser inget värde alls.
      expect(computeUnlockValue(a, all, state, 'READY')).toBe(0);
      // Men A blockerar två andra moment → GATEKEEPER ser värde.
      expect(computeUnlockValue(a, all, state, 'GATEKEEPER')).toBeGreaterThan(0);
    });

    it('BOTH håller sig inom 0–1 och dubbelräknar inte', () => {
      const b = skill('B', [['A', 'PRACTICING']]);
      const all = [skill('A'), b, skill('C', [['B', 'PRACTICING']])];
      const state = [progress('A', 'PRACTICING'), progress('B', 'NOT_STARTED')];

      const value = computeUnlockValue(b, all, state, 'BOTH');
      expect(value).toBeGreaterThan(0);
      expect(value).toBeLessThanOrEqual(1);
    });
  });
});
