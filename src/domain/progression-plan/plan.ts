/**
 * Ordningen genom de 75 momenten — planerad för hand.
 *
 * Kartan räknades förut fram ur förkunskapsgrafen: topologiskt djup,
 * gruppering på kategori, klippgräns vid fyra. Strukturellt korrekt och
 * pedagogiskt godtyckligt. Fem föräldrar som spelade appen hittade samma
 * sak: bilen rullade första gången på kväll sex, efter fem kvällar med
 * stillastående bil och samtal om alkohol och grupptryck; spårvagn fick en
 * egen kväll medan alla korsningstyper delade en; påfart motorväg övades
 * fyra kvällar före avfarten. Ingen av dem följde det.
 *
 * Den här planen följer i stället stegringsföljden som källorna ger
 * tillsammans (docs/research/underlag-moment-och-metod.md 5.6):
 *
 * 1. Avstängd yta — manövrering "längre än nödvändigt" tills den är
 *    automatiserad. Bilen rullar kväll ett.
 * 2. Lugn plats med lite trafik — enkla korsningar, låg fart.
 * 3. Ökande svårighet i trafik, med teorin gången i förväg.
 * 4. Alla trafikmiljöer och övergångarna mellan dem.
 * 5. Besvärliga förhållanden — sist, och bara när vädret ger.
 * 6. Självständig körning mot ett mål.
 *
 * Två slags pass. Ett KÖRPASS görs i bilen. Ett SAMTAL görs vid
 * köksbordet — alkohol, grupptryck, självbedömning, resplanering — och
 * ligger i den fas där samtalet hör hemma, inte där förkunskapsgrafen
 * råkade lägga det. Ett samtalspass ska aldrig mötas av "skylten på, en
 * snabb koll av bilen".
 *
 * Förkunskaperna gäller fortfarande. Byggaren (build-from-plan.ts) vägrar
 * bygga om ett moment ligger före något det bygger på. Inom ett pass räcker
 * det att förkunskapen står först i listan — momenten övas i ordning.
 *
 * Passen är avsiktligt små: två–fyra moment, sällan ett. Ett pass med ett
 * enda moment finns bara där momentet är en hel kväll (mörker, halka) —
 * och då säger `notering` varför.
 */

export type Passtyp = 'kor' | 'samtal';

export interface PlanPass {
  /** Stabilt id, t.ex. "s1p1". Loggen refererar till moment, inte till id. */
  id: string;
  typ: Passtyp;
  /** Kort rad under passet: när, var, eller varför just så. Registret gäller. */
  notering?: string;
  momentIds: string[];
}

export interface PlanSteg {
  id: string;
  /** Rubriken på stolpen. Kort, i registret — ett namn, inte en lista. */
  titel: string;
  /** Vilken av de sex faserna steget hör till. Visas som mellanrubrik på Ordning. */
  fas: string;
  pass: PlanPass[];
}

export const FASER = [
  'Avstängd yta',
  'Lugn plats med lite trafik',
  'Ökande svårighet i trafik',
  'Alla trafikmiljöer',
  'Besvärliga förhållanden',
  'Självständig körning',
] as const;

export const PLAN: PlanSteg[] = [
  {
    id: 's1',
    titel: 'Bilen och de första metrarna',
    fas: 'Avstängd yta',
    pass: [
      { id: 's1p1', typ: 'kor', momentIds: ['VEH-01', 'VEH-02', 'VEH-04', 'MAN-01'] },
      { id: 's1p2', typ: 'kor', momentIds: ['VEH-03', 'VEH-06', 'VEH-05', 'MAN-02'] },
      { id: 's1p3', typ: 'kor', momentIds: ['MAN-03', 'MAN-04', 'MAN-06'] },
    ],
  },
  {
    id: 's2',
    titel: 'Manövrering — längre än nödvändigt',
    fas: 'Avstängd yta',
    pass: [
      { id: 's2p1', typ: 'kor', momentIds: ['OBS-02', 'MAN-05', 'MAN-07'] },
      { id: 's2p2', typ: 'kor', momentIds: ['MAN-08', 'OBS-03'] },
      { id: 's2p3', typ: 'kor', momentIds: ['MAN-09', 'MAN-10'] },
      {
        id: 's2p4',
        typ: 'samtal',
        notering: 'Hur ni två ska jobba ihop — innan trafiken börjar',
        momentIds: ['SELF-01', 'SELF-02', 'SELF-04'],
      },
    ],
  },
  {
    id: 's3',
    titel: 'Ut på lugna gator',
    fas: 'Lugn plats med lite trafik',
    pass: [
      { id: 's3p1', typ: 'kor', momentIds: ['OBS-01', 'POS-01', 'SPD-01'] },
      { id: 's3p2', typ: 'kor', momentIds: ['MAN-11', 'INT-01', 'INT-03'] },
      {
        id: 's3p3',
        typ: 'samtal',
        notering: 'Det som stör: trötthet, stress, telefonen',
        momentIds: ['RISK-03', 'RISK-04', 'RISK-07'],
      },
    ],
  },
  {
    id: 's4',
    titel: 'Fart, avstånd och de som rör sig',
    fas: 'Lugn plats med lite trafik',
    pass: [
      { id: 's4p1', typ: 'kor', momentIds: ['SPD-02', 'SPD-03', 'OBS-04'] },
      { id: 's4p2', typ: 'kor', momentIds: ['VRU-02', 'VRU-01', 'VRU-04'] },
      { id: 's4p3', typ: 'kor', momentIds: ['INT-02', 'INT-04'] },
    ],
  },
  {
    id: 's5',
    titel: 'Korsningar och cirkulationsplatser',
    fas: 'Ökande svårighet i trafik',
    pass: [
      { id: 's5p1', typ: 'kor', momentIds: ['INT-05', 'RAB-01'] },
      { id: 's5p2', typ: 'kor', momentIds: ['LANE-02', 'OBS-05'] },
      { id: 's5p3', typ: 'kor', momentIds: ['VRU-03', 'URB-02', 'EMR-01'] },
    ],
  },
  {
    id: 's6',
    titel: 'Tätare trafik',
    fas: 'Ökande svårighet i trafik',
    pass: [
      { id: 's6p1', typ: 'kor', momentIds: ['SPD-04', 'LANE-04'] },
      {
        id: 's6p2',
        typ: 'kor',
        notering: 'Spårvagnen bara där den finns',
        momentIds: ['ECO-01', 'URB-01'],
      },
      {
        id: 's6p3',
        typ: 'samtal',
        notering: 'Kompisarna i bilen',
        momentIds: ['RISK-05', 'RISK-06'],
      },
    ],
  },
  {
    id: 's7',
    titel: 'Landsväg',
    fas: 'Alla trafikmiljöer',
    pass: [
      { id: 's7p1', typ: 'kor', momentIds: ['RUR-02', 'RUR-01'] },
      { id: 's7p2', typ: 'kor', momentIds: ['RUR-03', 'RUR-04'] },
      { id: 's7p3', typ: 'kor', momentIds: ['LANE-03', 'SPEC-06'] },
    ],
  },
  {
    id: 's8',
    titel: 'Motorväg — på och av samma kväll',
    fas: 'Alla trafikmiljöer',
    pass: [
      { id: 's8p1', typ: 'kor', momentIds: ['HWY-01', 'HWY-02'] },
      { id: 's8p2', typ: 'kor', momentIds: ['HWY-03', 'NAV-01'] },
      {
        id: 's8p3',
        typ: 'samtal',
        notering: 'Alkohol och läkemedel — innan hen kör själv',
        momentIds: ['RISK-01', 'RISK-02'],
      },
    ],
  },
  {
    id: 's9',
    titel: 'När vädret och ljuset ger',
    fas: 'Besvärliga förhållanden',
    pass: [
      { id: 's9p1', typ: 'kor', notering: 'När det är mörkt', momentIds: ['SPEC-02'] },
      { id: 's9p2', typ: 'kor', notering: 'När det regnar', momentIds: ['SPEC-03'] },
      { id: 's9p3', typ: 'kor', notering: 'När det är halt — inte förr', momentIds: ['SPEC-04'] },
      {
        id: 's9p4',
        typ: 'kor',
        notering: 'Där de finns på er väg',
        momentIds: ['SPEC-01', 'SPEC-05', 'SPEC-07', 'SPEC-08'],
      },
    ],
  },
  {
    id: 's10',
    titel: 'Självständigt mot ett mål',
    fas: 'Självständig körning',
    pass: [
      { id: 's10p1', typ: 'kor', momentIds: ['SELF-03', 'NAV-02'] },
      {
        id: 's10p2',
        typ: 'samtal',
        notering: 'Innan hen kör själv',
        momentIds: ['SELF-05', 'TRIP-01', 'EMR-02'],
      },
    ],
  },
];
