import { describe, it, expect, beforeEach } from 'vitest';
import {
  getProfile,
  saveProfile,
  getAllSessions,
  saveSession,
  getSession,
  clearAllData,
  ärPassAvslutat,
  avmarkeraGjort,
  avslutandePasspost,
  härledPosition,
  getKördaPass,
  getPasslogg,
  loggaPass,
  markeraGjort,
  senasteNastaGang,
  uppdateraNastaGang,
  getValkomst,
  saveValkomst,
} from './storage';
import type { Profile, DrivingSession, Passutfall } from './types';
import type { PassSteg } from '@/components/pass/typer';

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

describe('välkomst', () => {
  beforeEach(() => localStorage.clear());

  it('är osedd tills den sparas', () => {
    expect(getValkomst()).toBe(false);
    expect(saveValkomst()).toBe(true);
    expect(getValkomst()).toBe(true);
  });

  it('tolkar bara true som sedd', () => {
    localStorage.setItem('ovningskorning:v1:valkomst', JSON.stringify('true'));
    expect(getValkomst()).toBe(false);
  });
});

const passSteg: PassSteg[] = [
  {
    nummer: 1,
    titel: 'Första steget',
    fas: 'Fas',
    grupper: [
      {
        id: '1-0',
        typ: 'kor',
        moment: [{ id: 'M-1', namn: 'Ett', continuous: false, fragor: [] }],
      },
      {
        id: '1-1',
        typ: 'kor',
        moment: [{ id: 'M-2', namn: 'Två', continuous: false, fragor: [] }],
      },
    ],
  },
  {
    nummer: 2,
    titel: 'Andra steget',
    fas: 'Fas',
    grupper: [
      {
        id: '2-0',
        typ: 'kor',
        moment: [{ id: 'M-3', namn: 'Tre', continuous: false, fragor: [] }],
      },
    ],
  },
];

const sjuSteg: PassSteg[] = Array.from({ length: 7 }, (_, index) => ({
  nummer: index + 1,
  titel: `Steg ${index + 1}`,
  fas: 'Fas',
  grupper: [
    {
      id: `${index + 1}-0`,
      typ: 'kor',
      moment: [
        { id: `M-${index + 1}`, namn: `Moment ${index + 1}`, continuous: false, fragor: [] },
      ],
    },
  ],
}));

const passPost = (
  steg: number,
  grupp: number,
  utfall: Passutfall,
  nastaGang: string | null = null,
  momentIds = passSteg[steg - 1]?.grupper[grupp]?.moment.map((moment) => moment.id) ?? [
    `M-${steg}-${grupp}`,
  ],
) => ({
  datum: '2026-09-08T10:00:00.000Z',
  steg,
  grupp,
  momentIds,
  utfall,
  nastaGang,
});

describe('härledd position', () => {
  beforeEach(() => localStorage.clear());

  it('börjar på första passet med tom logg', () => {
    expect(härledPosition(passSteg)).toEqual({ steg: 1, grupp: 0 });
  });

  it('går vidare efter ett avslutat pass men inte efter ta om', () => {
    loggaPass(passPost(1, 0, 'bra'));
    expect(härledPosition(passSteg)).toEqual({ steg: 1, grupp: 1 });
    loggaPass(passPost(1, 1, 'taom'));
    expect(härledPosition(passSteg)).toEqual({ steg: 1, grupp: 1 });
  });

  it('går till steget efter planen när alla pass är avslutade', () => {
    loggaPass(passPost(1, 0, 'bra'));
    loggaPass(passPost(1, 1, 'sadar'));
    loggaPass(passPost(2, 0, 'redan'));
    expect(härledPosition(passSteg)).toEqual({ steg: 3, grupp: 0 });
  });

  it('migrerar currentStep till redan-poster och tar bort nyckeln', () => {
    localStorage.setItem('ovningskorning:v1:currentStep', '7');
    expect(härledPosition(sjuSteg)).toEqual({ steg: 7, grupp: 0 });
    expect(getPasslogg().map((p) => [p.steg, p.grupp, p.utfall])).toEqual([
      [1, 0, 'redan'],
      [2, 0, 'redan'],
      [3, 0, 'redan'],
      [4, 0, 'redan'],
      [5, 0, 'redan'],
      [6, 0, 'redan'],
    ]);
    expect(localStorage.getItem('ovningskorning:v1:currentStep')).toBeNull();
  });

  it('migrerar currentPass före det äldre currentStep och tar bort båda nycklarna', () => {
    localStorage.setItem('ovningskorning:v1:currentPass', JSON.stringify({ steg: 1, grupp: 1 }));
    localStorage.setItem('ovningskorning:v1:currentStep', '2');
    expect(härledPosition(passSteg)).toEqual({ steg: 1, grupp: 1 });
    expect(getPasslogg().map((p) => [p.steg, p.grupp, p.utfall])).toEqual([[1, 0, 'redan']]);
    expect(localStorage.getItem('ovningskorning:v1:currentPass')).toBeNull();
    expect(localStorage.getItem('ovningskorning:v1:currentStep')).toBeNull();
  });
});

describe('passloggen', () => {
  beforeEach(() => localStorage.clear());

  const post = (utfall: Passutfall, nastaGang: string | null = null) =>
    passPost(2, 0, utfall, nastaGang);

  it('är tom från början', () => {
    expect(getPasslogg()).toEqual([]);
  });

  it('lägger pass sist, äldst först', () => {
    loggaPass(post('bra'));
    loggaPass(post('taom', 'backningen igen'));
    expect(getPasslogg().map((p) => p.utfall)).toEqual(['bra', 'taom']);
    expect(getPasslogg()[1].nastaGang).toBe('backningen igen');
  });

  it('markerar ett pass som redan gjort och avmarkerar bara den posten', () => {
    loggaPass(post('bra'));
    markeraGjort(2, 0, ['MAN-01']);
    markeraGjort(2, 0, ['MAN-01']);
    expect(getPasslogg().map((p) => p.utfall)).toEqual(['bra', 'redan', 'redan']);
    expect(avmarkeraGjort(['MAN-01'])).toBe(true);
    expect(getPasslogg().map((p) => p.utfall)).toEqual(['bra', 'redan']);
  });

  it('räknar inte redan-poster som körda pass på Ordning', () => {
    markeraGjort(1, 0, ['M-1']);
    expect(getKördaPass()).toEqual([]);
    loggaPass(passPost(1, 1, 'taom'));
    expect(getKördaPass().map((p) => p.utfall)).toEqual(['taom']);
  });

  it('ändrar "Nästa gång" på det senaste körda passet', () => {
    loggaPass(post('bra', 'första'));
    loggaPass(post('sadar', 'andra'));
    markeraGjort(1, 0, ['M-1']);
    expect(uppdateraNastaGang('ta Lundavägen')).toBe(true);
    expect(getPasslogg().map((p) => p.nastaGang)).toEqual(['första', 'ta Lundavägen', null]);
  });

  it('behåller den senaste anteckningen när ett senare pass saknar text', () => {
    loggaPass(passPost(3, 0, 'bra', 'backa in på parkeringen'));
    loggaPass(passPost(4, 0, 'sadar'));
    expect(senasteNastaGang()).toBe('backa in på parkeringen');
    loggaPass(passPost(5, 0, 'bra', 'öva rondell igen'));
    expect(senasteNastaGang()).toBe('öva rondell igen');
  });

  it('låter en markering som gjord vara utan påverkan på nästa gång', () => {
    loggaPass(post('bra', 'titta längre fram'));
    markeraGjort(1, 0, ['M-1']);
    expect(senasteNastaGang()).toBe('titta längre fram');
  });

  it('kan inte ändra en rad som inte finns', () => {
    expect(uppdateraNastaGang('x')).toBe(false);
  });

  it('låter en större post avsluta ett pass med några av dess moment', () => {
    loggaPass(passPost(8, 3, 'bra', null, ['A', 'B', 'C', 'D']));
    expect(ärPassAvslutat(['A', 'B', 'C'])).toBe(true);
  });

  it('låter flera poster tillsammans avsluta ett pass', () => {
    loggaPass(passPost(8, 3, 'bra', null, ['A', 'B']));
    loggaPass(passPost(8, 4, 'sadar', null, ['C']));
    expect(ärPassAvslutat(['A', 'B', 'C'])).toBe(true);
  });

  it('låter inte ta om täcka ett moment', () => {
    loggaPass(passPost(8, 3, 'taom', null, ['A', 'B', 'C']));
    expect(ärPassAvslutat(['A', 'B', 'C'])).toBe(false);
  });

  it('behåller avslutet när passet fått ett nytt steg och gruppnummer', () => {
    loggaPass(passPost(3, 0, 'bra', null, ['X', 'Y']));
    const omnumreradPlan: PassSteg[] = [
      {
        nummer: 1,
        titel: 'Nytt steg',
        fas: 'Fas',
        grupper: [
          {
            id: 'nytt-0',
            typ: 'kor',
            moment: [{ id: 'A', namn: 'A', continuous: false, fragor: [] }],
          },
          {
            id: 'nytt-1',
            typ: 'kor',
            moment: [{ id: 'B', namn: 'B', continuous: false, fragor: [] }],
          },
          {
            id: 'nytt-2',
            typ: 'kor',
            moment: [
              { id: 'X', namn: 'X', continuous: false, fragor: [] },
              { id: 'Y', namn: 'Y', continuous: false, fragor: [] },
            ],
          },
        ],
      },
    ];
    loggaPass(passPost(1, 0, 'redan', null, ['A']));
    loggaPass(passPost(1, 1, 'redan', null, ['B']));
    expect(härledPosition(omnumreradPlan)).toEqual({ steg: 2, grupp: 0 });
  });

  it('avmarkerar bara den senaste redan-posten med exakt samma momentmängd', () => {
    markeraGjort(1, 0, ['A', 'B']);
    markeraGjort(1, 1, ['A', 'B', 'C']);
    markeraGjort(1, 2, ['B', 'A']);
    expect(avmarkeraGjort(['A', 'B'])).toBe(true);
    expect(getPasslogg().map((post) => post.momentIds)).toEqual([
      ['A', 'B'],
      ['A', 'B', 'C'],
    ]);
  });
});

describe('avslutandePasspost — samma definition av gjort som positionen', () => {
  beforeEach(() => localStorage.clear());
  const post = (
    momentIds: string[],
    utfall: 'bra' | 'sadar' | 'taom' | 'redan',
    datum: string,
  ) => ({
    datum,
    steg: 1,
    grupp: 0,
    momentIds,
    utfall,
    nastaGang: null,
  });

  it('räknar ett pass som kört när flera körda poster täcker det tillsammans', () => {
    // Gammal numrering: momenten låg i två olika pass. Positionen går vidare —
    // stegsidan ska säga samma sak, inte "Markera som gjort".
    loggaPass(post(['A', 'B'], 'bra', '2026-08-01T10:00:00Z'));
    loggaPass(post(['C', 'D'], 'sadar', '2026-08-08T10:00:00Z'));
    const p = avslutandePasspost(['A', 'C']);
    expect(p?.utfall).toBe('sadar');
    expect(p?.datum).toBe('2026-08-08T10:00:00Z');
  });

  it('ger redan när bara historiska markeringar täcker passet', () => {
    loggaPass(post(['A'], 'redan', '2026-08-01T10:00:00Z'));
    loggaPass(post(['B'], 'redan', '2026-08-02T10:00:00Z'));
    expect(avslutandePasspost(['A', 'B'])?.utfall).toBe('redan');
  });

  it('låter ett kört pass väga tyngre än en historisk markering', () => {
    loggaPass(post(['A', 'B'], 'redan', '2026-08-01T10:00:00Z'));
    loggaPass(post(['A', 'B'], 'bra', '2026-08-02T10:00:00Z'));
    expect(avslutandePasspost(['A', 'B'])?.utfall).toBe('bra');
  });

  it('räknar inte ta om, och inte ett pass som bara delvis täcks', () => {
    loggaPass(post(['A', 'B'], 'taom', '2026-08-01T10:00:00Z'));
    expect(avslutandePasspost(['A', 'B'])).toBeNull();
    loggaPass(post(['A'], 'bra', '2026-08-02T10:00:00Z'));
    expect(avslutandePasspost(['A', 'B'])).toBeNull();
  });
});
