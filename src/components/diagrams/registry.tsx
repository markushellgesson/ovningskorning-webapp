/**
 * Registrerar vilka diagram som ska visas för varje moment.
 * Diagrammen illustrerar bara verifierade regler eller fysikaliska förhållanden.
 *
 * Vägmärkesbilderna i public/signs/ (A13, A35, B1, B2, D3, C31-5) som
 * förekommer i några av diagrammen nedan är svenska officiella vägmärken
 * (allmänna handlingar) och fria att återge.
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
  FickparkeringDiagram,
  BackningRuntHornetDiagram,
  VagmarkenVajningsreglerDiagram,
  HastighetsbegransningDiagram,
  TrafiksignalerPolismanDiagram,
  VanstersvangLandsvagDiagram,
  StartFranVagkantDiagram,
  OvergangsstalleVarningDiagram,
  OmkorningLandsvagDiagram,
  MoteSmalVagDiagram,
  VandningDiagram,
  JarnvagskorsningDiagram,
  AvfartMotorvagDiagram,
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

  // Döda vinkeln — fysikaliskt förhållande. Delas av VEH-02 (spegelinställningen)
  // och OBS-03 (att kontrollera vinkeln), som båda handlar om samma yta.
  'VEH-02': () => <DodaVinkelnDiagram />,
  'OBS-03': () => <DodaVinkelnDiagram />,

  // Stoppsträcka — fysik (reaktion + bromsning)
  'MAN-06': () => <StoppstrackaDiagram />,

  // Blicken långt fram — grundmanöver och observation
  'MAN-02': () => <BlickenLangtFramDiagram />,
  'OBS-01': () => <BlickenLangtFramDiagram />,

  // Placering i kurva — sikt och positionering. Hör bara till RUR-02: bilden säger
  // inget om anslutning eller luckbedömning och illustrerar därför inte RUR-01.
  'RUR-02': () => <PlaceringIKurvaDiagram />,

  // Fickparkering — referenspunkter och rattutslag
  'MAN-10': () => <FickparkeringDiagram />,

  // Backning runt hörn — svängradie, bakhjulens väg, blickriktning
  'MAN-08': () => <BackningRuntHornetDiagram />,

  // Väjningsplikt (B1) och stopplikt (B2) — vägmärken sida vid sida
  'INT-03': () => <VagmarkenVajningsreglerDiagram />,

  // Hastighetsbegränsning (C31) och bashastighet — 3 kap 17 §
  'SPD-01': () => <HastighetsbegransningDiagram />,

  // Trafiksignaler och polismans tecken — vägmärkesförordningen 3 kap och 7 kap.
  // P1 stopp betyder stopp framifrån och bakifrån, men fri väg från sidan.
  'INT-05': () => <TrafiksignalerPolismanDiagram />,

  // Vänstersväng på landsväg — mötande, bakomvarande och hjulens läge
  'RUR-04': () => <VanstersvangLandsvagDiagram />,

  // Start från vägkant — kontroller före utfart
  'MAN-11': () => <StartFranVagkantDiagram />,

  // Varning för övergångsställe (A13) — sätts ofta upp före övergångsstället.
  // A13 är varning för övergångsställe; A14 är varning för gående.
  'VRU-01': () => <OvergangsstalleVarningDiagram />,

  // Omkörning på landsväg — sikt, mötande trafik, marginal — 3 kap 31-40 §§
  'LANE-03': () => <OmkorningLandsvagDiagram />,

  // Möte på smal väg — hinder, vem som stannar, var man stannar — 3 kap 30 §
  'RUR-03': () => <MoteSmalVagDiagram />,

  // Trepunktsvändning i tre steg med kontrollpunkter
  'MAN-09': () => <VandningDiagram />,

  // Järnvägskorsning — stopplats, siktlinje längs spåret, bommar — 2 kap 7 §
  'SPEC-05': () => <JarnvagskorsningDiagram />,

  // Avfart från motorväg — retardationsfältet, motstycke till HWY-01
  'HWY-02': () => <AvfartMotorvagDiagram />,
};

/**
 * Hämtar diagram för ett givet skillId.
 * Returnerar null om inget diagram finns mappat.
 */
export function getDiagramForSkill(skillId: string): ReactNode | null {
  const diagramFn = diagramRegistry[skillId];
  return diagramFn ? diagramFn() : null;
}
