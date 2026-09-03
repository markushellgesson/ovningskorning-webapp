/**
 * Tester för initial progression-logik.
 */

import { describe, it, expect } from 'vitest';
import { deriveInitialProgress } from './initial-state.js';

describe('Initial progression', () => {
  it('Given: Elev utan körkortstillstånd; When: initial progress härleds; Then: allt är NOT_STARTED', () => {
    const result = deriveInitialProgress(
      {
        experienceLevel: 'NEW',
        trainedEnvironments: [],
        hasLearnerPermit: false,
      },
      ['VEH-01', 'VEH-02', 'URB-01'],
    );

    expect(result).toEqual([]);
  });

  it('Given: Nybörjare med tillstånd; When: initial progress; Then: grundläggande INTRODUCED', () => {
    const result = deriveInitialProgress(
      {
        experienceLevel: 'BEGINNER',
        trainedEnvironments: [],
        hasLearnerPermit: true,
      },
      ['VEH-01', 'MAN-01', 'URB-01'],
    );

    const vehState = result.find((r) => r.skillId === 'VEH-01');
    expect(vehState?.state).toBe('INTRODUCED');
    expect(vehState?.masteryScore).toBeLessThanOrEqual(0.5);
  });

  it('Given: Erfaren elev; When: initial progress; Then: grundläggande PRACTICING, inte INDEPENDENT', () => {
    const result = deriveInitialProgress(
      {
        experienceLevel: 'EXPERIENCED',
        trainedEnvironments: ['URBAN', 'RURAL'],
        hasLearnerPermit: true,
      },
      ['VEH-01', 'MAN-01', 'URB-01', 'RUR-01'],
    );

    const vehState = result.find((r) => r.skillId === 'VEH-01');
    expect(vehState?.state).toBe('PRACTICING');
    expect(vehState?.state).not.toBe('INDEPENDENT'); // Konservativt!
  });

  it('Given: Tränat i URBAN; When: initial progress; Then: URB-moment INTRODUCED', () => {
    const result = deriveInitialProgress(
      {
        experienceLevel: 'REGULAR',
        trainedEnvironments: ['URBAN'],
        hasLearnerPermit: true,
      },
      ['VEH-01', 'URB-01', 'RUR-01'],
    );

    const urbState = result.find((r) => r.skillId === 'URB-01');
    expect(urbState?.state).toBe('INTRODUCED');

    const rurState = result.find((r) => r.skillId === 'RUR-01');
    expect(rurState).toBeUndefined(); // Inte tränat på landsbygd
  });
});
