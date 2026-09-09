import { describe, expect, it } from 'vitest';
import type { Exercise } from '@/content/types';
import { beraknaPassTid } from './plan-data';

function ovning(skillId: string, estimatedMinutes: number | null): Exercise {
  return {
    id: skillId,
    skillId,
    title: skillId,
    description: '',
    difficulty: 'BASIC',
    estimatedMinutes,
    requiredEnvironments: [],
  };
}

describe('beraknaPassTid', () => {
  it('ger inte samtal en tidsrad', () => {
    expect(beraknaPassTid(['A'], 'Avstängd yta', 'samtal', [ovning('A', 20)])).toBeUndefined();
  });

  it('visar bara fasen när ett moment saknar minuter', () => {
    expect(
      beraknaPassTid(['A', 'B'], 'Lugn plats med lite trafik', 'kor', [
        ovning('A', 20),
        ovning('B', null),
      ]),
    ).toBe('Lugn plats med lite trafik');
  });

  it('summerar alla kända minuter och avrundar till närmaste femtal', () => {
    expect(
      beraknaPassTid(['A', 'B'], 'Avstängd yta', 'kor', [ovning('A', 22), ovning('B', 21)]),
    ).toBe('Cirka 45 minuter · Avstängd yta');
  });
});
