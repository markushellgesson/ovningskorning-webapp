/**
 * Registrerar vilka diagram som ska visas för varje moment.
 * Diagrammen illustrerar bara verifierade regler eller fysikaliska förhållanden.
 */

import { ReactNode } from 'react';
import {
  HogerregelnDiagram,
  CirkulationsplatsDiagram,
  AccelerationsfaltDiagram,
  DodaVinkelnDiagram,
  StoppstrackaDiagram,
  BlickenLangtFramDiagram,
  PlaceringIKurvaDiagram,
} from './index';

/**
 * Mappar skillId till diagram-komponent.
 * Flera moment kan dela samma diagram om det är relevant för båda.
 */
export const diagramRegistry: Record<string, () => ReactNode> = {
  // Högerregeln — trafikförordningen 3 kap 18 §
  'INT-01': () => <HogerregelnDiagram />,
  'INT-02': () => <HogerregelnDiagram />,

  // Cirkulationsplats — 3 kap 22 §
  'RAB-01': () => <CirkulationsplatsDiagram />,

  // Accelerationsfält — 3 kap 21 § och 23 §
  'HWY-01': () => <AccelerationsfaltDiagram />,

  // Döda vinkeln — fysikaliskt förhållande
  'VEH-02': () => <DodaVinkelnDiagram />,

  // Stoppsträcka — fysik (reaktion + bromsning)
  'MAN-06': () => <StoppstrackaDiagram />,

  // Blicken långt fram — grundmanöver och observation
  'MAN-02': () => <BlickenLangtFramDiagram />,
  'OBS-01': () => <BlickenLangtFramDiagram />,

  // Placering i kurva — sikt och positionering
  'RUR-01': () => <PlaceringIKurvaDiagram />,
  'RUR-02': () => <PlaceringIKurvaDiagram />,
};

/**
 * Hämtar diagram för ett givet skillId.
 * Returnerar null om inget diagram finns mappat.
 */
export function getDiagramForSkill(skillId: string): ReactNode | null {
  const diagramFn = diagramRegistry[skillId];
  return diagramFn ? diagramFn() : null;
}
