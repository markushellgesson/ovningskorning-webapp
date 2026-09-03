import type { SkillCategory } from './types';

/**
 * Svenska visningsnamn för kategorierna i content.json.
 *
 * Duplicerad avsiktligt i stället för importerad från `src/app/skills/page.tsx`
 * — sidorna hör till separata route-träd och ska kunna ändras oberoende av
 * varandra (samma princip som ADR 0013 för domänlagret).
 */
export const CATEGORY_LABELS: Record<SkillCategory, string> = {
  VEHICLE_CONTROL: 'Fordonskännedom',
  MANEUVERING: 'Grundmanövrering',
  OBSERVATION: 'Observation och blick',
  SPEED_DISTANCE: 'Hastighet och avstånd',
  POSITIONING: 'Placering',
  INTERSECTIONS: 'Korsningar',
  ROUNDABOUTS: 'Cirkulationsplatser',
  LANE_CHANGE: 'Körfältsbyten',
  VULNERABLE_ROAD_USERS: 'Oskyddade trafikanter',
  URBAN: 'Stadstrafik',
  RURAL: 'Landsväg',
  HIGHWAY: 'Motorväg',
  SPECIAL_CONDITIONS: 'Särskilda förhållanden',
  ECO_DRIVING: 'Sparsam körning',
  NAVIGATION: 'Navigation',
  TRIP_PLANNING: 'Färdplanering',
  RISK_AWARENESS: 'Riskmedvetenhet',
  SELF_ASSESSMENT: 'Självbedömning',
  EMERGENCY: 'Nödsituationer',
};
