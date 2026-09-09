import { describe, expect, it } from 'vitest';
import type { EnvironmentType, Exercise, TrafficEnvironment } from '@/content/types';
import { beraknaPassTid } from './plan-data';

function ovning(
  skillId: string,
  estimatedMinutes: number,
  requiredEnvironments: EnvironmentType[],
): Exercise {
  return {
    id: skillId,
    skillId,
    title: skillId,
    description: '',
    difficulty: 'BASIC',
    estimatedMinutes,
    requiredEnvironments,
  };
}

const miljoer: TrafficEnvironment[] = [
  {
    id: 'closed',
    type: 'CLOSED_AREA',
    description: 'Avstängd plats utan trafik — gott om utrymme',
  },
  { id: 'residential', type: 'RESIDENTIAL', description: 'Bostadsområde — låg fart' },
];

describe('beraknaPassTid', () => {
  it('summerar minuter och avrundar till närmaste femtal', () => {
    expect(
      beraknaPassTid(
        ['A', 'B'],
        [ovning('A', 22, ['CLOSED_AREA']), ovning('B', 21, ['CLOSED_AREA'])],
        miljoer,
      ),
    ).toBe('Cirka 45 minuter · Avstängd plats utan trafik');
  });

  it('utelämnar metaraden när passets moment saknar övningar', () => {
    expect(beraknaPassTid(['A'], [ovning('B', 20, ['CLOSED_AREA'])], miljoer)).toBeUndefined();
  });

  it('väljer den vanligaste miljön från passets övningar', () => {
    expect(
      beraknaPassTid(
        ['A', 'B'],
        [ovning('A', 20, ['RESIDENTIAL']), ovning('B', 20, ['RESIDENTIAL', 'CLOSED_AREA'])],
        miljoer,
      ),
    ).toBe('Cirka 40 minuter · Bostadsområde');
  });
});
