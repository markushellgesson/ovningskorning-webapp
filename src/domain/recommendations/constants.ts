/**
 * Konstanter för rekommendationsmotorn enligt ADR 0002.
 *
 * [ANTAGANDE] Vikter och trösklar nedan är inte källbelagda — de är ett rimligt
 * startantagande som ska kalibreras mot verklig användning. Se OQ-05 i
 * docs/open-questions.md för samma typ av kalibreringsbehov.
 */

export const ENGINE_VERSION = '1.0.0';

/**
 * Hur `prerequisite_unlock_value` ska tolkas (ADR 0002 namnger termen men
 * definierar den aldrig). Se `unlock-value.ts` för de två läsningarna.
 *
 *   READY       belönar moment som just blivit tillgängliga
 *   GATEKEEPER  belönar grundmoment som blockerar många andra
 *   BOTH        medelvärdet av båda
 *
 * [ANTAGANDE] GATEKEEPER är vald som standard eftersom den ligger närmast
 * ordalydelsen "värdet av att låsa upp" och pedagogiskt prioriterar det som
 * annars blir en flaskhals i kompetensträdet. Byt fritt — båda är testade,
 * och detta är ett kalibreringsbeslut som bör provas mot verklig användning.
 */
export const UNLOCK_VALUE_STRATEGY = 'GATEKEEPER' as const;

/** Antal blockerade moment där GATEKEEPER-värdet mättas. */
export const UNLOCK_VALUE_SATURATION = 3;

/**
 * Viktning för prioriteringsscore enligt ADR 0002.
 */
export const PRIORITY_WEIGHTS = {
  /** Gapet i säkerhetskritiska moment */
  safetyGap: 0.3,
  /** Hur länge sedan momentet tränades */
  repetitionDue: 0.25,
  /** Skillnaden mellan nuvarande och önskad mastery */
  masteryGap: 0.2,
  /** Värdet av att låsa upp nya moment */
  prerequisiteUnlockValue: 0.1,
  /** Hur väl momentet passar användarens mål */
  userGoalFit: 0.1,
  /** Möjlighet som kontexten ger (t.ex. rätt väder) */
  contextOpportunity: 0.05,
} as const;

/**
 * Penalties som dras från prioriteringsscore.
 */
export const PRIORITY_PENALTIES = {
  /** Straff för för stort svårighetshopp */
  difficultyJump: 0.2,
  /** Straff för för hög belastning */
  stress: 0.15,
} as const;

/**
 * Trösklar för progression enligt ADR 0001 och OQ-05.
 * [ANTAGANDE] — börja konservativt, justera efter verklig användning.
 */
export const PROGRESSION_THRESHOLDS = {
  /** Minsta masteryScore för CONSOLIDATED */
  consolidatedMasteryScore: 0.8,
  /** Minsta antal independent observations för CONSOLIDATED */
  consolidatedIndependentObservations: 3,
  /** Minsta antal sessioner för CONSOLIDATED */
  consolidatedSessions: 3,
  /** Minsta antal olika miljökategorier för CONSOLIDATED */
  consolidatedContextCategories: 2,
} as const;

/**
 * Trösklar för repetitionsstatus enligt OQ-06.
 * [ANTAGANDE] — parametrar kan justeras.
 */
export const REVIEW_THRESHOLDS = {
  /** Dagar sedan senaste träning: CURRENT */
  currentDays: 14,
  /** Dagar sedan senaste träning: DUE */
  dueDays: 28,
  /** Dagar sedan senaste träning: > dueDays = OVERDUE */
} as const;

/**
 * Trösklar för att avgöra om underlag är tillräckligt.
 * [ANTAGANDE] enligt implementationsplanen slice 3.
 */
export const SUFFICIENT_DATA_THRESHOLDS = {
  /** Minsta antal skills med progress för att ge rekommendation */
  minimumSkillsWithProgress: 1,
  /** Minsta antal sessioner för att känna till mönster */
  minimumTotalSessions: 1,
} as const;

/**
 * Hystereströsklar för hastighetsstyrt lås enligt ADR 0011.
 * OBS: Dessa används inte i rekommendationsmotorn, men finns här för
 * dokumentation och framtida användning i körpassets livscykel.
 */
export const SPEED_LOCK_THRESHOLDS = {
  /** Låses vid hastighet över denna (km/h) under minst lockDurationSeconds */
  lockSpeedKmh: 5,
  /** Tid över lockSpeedKmh innan låset aktiveras (sekunder) */
  lockDurationSeconds: 3,
  /** Låses upp vid hastighet under denna (km/h) under minst unlockDurationSeconds */
  unlockSpeedKmh: 3,
  /** Tid under unlockSpeedKmh innan låset släpper (sekunder) */
  unlockDurationSeconds: 30,
} as const;
