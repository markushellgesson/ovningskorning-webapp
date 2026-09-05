/**
 * Cirkulationsplats sedd uppifrån (RAB-01): infart, placering, utfart.
 * Trafikförordningen 3 kap 22 §: väjningsplikt mot fordon som redan är i
 * cirkulationen.
 *
 * Geometri (högertrafik, vy uppifrån), i scenens koordinater. Scenen ritas
 * i en grupp förskjuten 44 px nedåt så att rubriken får luft; inget i
 * scenen har flyttats. Trafiken i cirkulationen går moturs.
 * - Din bil kör uppåt i bilden på den södra armen. Dess högra sida är
 *   bildens högra, så den ligger i den högra halvan (x 200–240).
 * - Fordonet i cirkulationen ligger i sydväst och kör åt sydost, alltså
 *   moturs mot den södra infarten. Det kommer från din vänster — som
 *   cirkulerande trafik alltid gör.
 * - Din planerade väg går in vid den södra armen, moturs runt östra sidan
 *   och ut på den norra armen i dess högra halva (x 200–240), eftersom
 *   du även där kör uppåt.
 * - En cyklist kör uppåt i högerkant vid den norra utfarten.
 *
 * Mönster: prickar = du, diagonala ränder = fordon i cirkulationen,
 * ring = cyklist. Grön streckad linje = din planerade väg. Heldragen pil =
 * rör sig nu. Förklaringsrutan längst ned ritar samma infart i mindre
 * skala med samma körfält och riktningar.
 *
 * Vägmärkena B1 och D3 i public/signs/ är svenska officiella vägmärken
 * (allmänna handlingar) och fria att återge.
 */

import { BASE_PATH } from '@/lib/base-path';

type Heading = 'up' | 'right' | 'down' | 'left';
const HEADING_DEG: Record<Heading, number> = { up: 0, right: 90, down: 180, left: -90 };

interface CarProps {
  cx: number;
  cy: number;
  width: number;
  length: number;
  /** Färdriktning, eller en vinkel i grader medurs från uppåt. */
  heading: Heading | number;
  fill: string;
  stroke: string;
  brakeLights?: boolean;
}

/**
 * Bil ritad med fronten uppåt och sedan vriden efter färdriktningen.
 * Karossen upptar exakt (cx ± width/2, cy ± length/2); hjulen sticker ut 3 px.
 */
function Car({ cx, cy, width, length, heading, fill, stroke, brakeLights }: CarProps) {
  const hw = width / 2;
  const hl = length / 2;
  const deg = typeof heading === 'number' ? heading : HEADING_DEG[heading];
  const glass = `fill-diagram-marking ${stroke}`;
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${deg})`}>
      <g className="fill-text-primary">
        <rect x={-hw - 3} y={-hl + 5} width="5" height="10" rx="1.5" />
        <rect x={hw - 2} y={-hl + 5} width="5" height="10" rx="1.5" />
        <rect x={-hw - 3} y={hl - 15} width="5" height="10" rx="1.5" />
        <rect x={hw - 2} y={hl - 15} width="5" height="10" rx="1.5" />
      </g>
      <rect x={-hw} y={-hl} width={width} height={length} rx="4" fill={fill} className={stroke} strokeWidth="2" />
      <rect x={-hw + 5} y={-hl + 7} width={width - 10} height="8" rx="2" className={glass} strokeWidth="1" />
      <rect x={-hw + 5} y={hl - 11} width={width - 10} height="5" rx="2" className={glass} strokeWidth="1" />
      {brakeLights && (
        <g className="fill-safety-600">
          <rect x={-hw + 2} y={hl - 1} width="6" height="3" />
          <rect x={hw - 8} y={hl - 1} width="6" height="3" />
        </g>
      )}
    </g>
  );
}

/** Numrerad hänvisning: mörk cirkel med siffra. */
function Callout({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="11" className="fill-text-primary" />
      <text x={x} y={y + 5} textAnchor="middle" className="fill-surface-base text-[13px] font-semibold">
        {n}
      </text>
    </g>
  );
}

/** Tunn pekarlinje från en etikett till det den syftar på, med en punkt i målet. */
function Pointer({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-text-tertiary" strokeWidth="1.5" />
      <circle cx={x2} cy={y2} r="3" className="fill-text-tertiary" />
    </g>
  );
}

function Check({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M ${x - 9} ${y} l 6 6 l 12 -13`}
      className="fill-none stroke-progress-600"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

function Cross({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M ${x - 7} ${y - 7} L ${x + 7} ${y + 7} M ${x + 7} ${y - 7} L ${x - 7} ${y + 7}`}
      className="stroke-safety-600"
      strokeWidth="3"
      strokeLinecap="round"
    />
  );
}

/**
 * Samma infart i skala 0,4 för förklaringsrutan. Origo i rondellöns mitt.
 * Din bil i högra halvan av södra armen, fordonet i cirkulationen i sydväst
 * på väg åt sydost — precis som i huvudbilden.
 */
function MiniInfart({ x, y, variant }: { x: number; y: number; variant: 'vantar' | 'kor-in' }) {
  const waits = variant === 'vantar';
  return (
    <g transform={`translate(${x} ${y}) scale(0.4)`}>
      <circle cx="0" cy="0" r="92" className="fill-none stroke-diagram-road" strokeWidth="44" />
      <circle cx="0" cy="0" r="70" className="fill-none stroke-diagram-edge" strokeWidth="3" />
      <rect x="-40" y="86" width="80" height="104" className="fill-diagram-road" />
      <g className="stroke-diagram-edge" strokeWidth="3">
        <line x1="-40" y1="108" x2="-40" y2="190" />
        <line x1="40" y1="108" x2="40" y2="190" />
      </g>
      <line x1="0" y1="110" x2="0" y2="190" className="stroke-diagram-marking" strokeWidth="3" strokeDasharray="12 10" />
      <g className="fill-diagram-marking">
        <path d="M 2 118 L 14 118 L 8 128 Z" />
        <path d="M 16 118 L 28 118 L 22 128 Z" />
        <path d="M 30 118 L 40 118 L 35 128 Z" />
      </g>
      {/* Fordon i cirkulationen: sydväst, kör åt sydost (moturs) */}
      <Car cx={-65} cy={65} width={28} length={44} heading={135} fill="url(#rab-stripes)" stroke="stroke-primary-600" />
      <path
        d="M -46 80 A 92 92 0 0 0 -16 91"
        className="fill-none stroke-primary-600"
        strokeWidth="5"
        markerEnd="url(#rab-arrow-other)"
      />
      {/* Du: högra halvan av södra armen, kör uppåt */}
      <Car cx={20} cy={160} width={28} length={44} heading="up" fill="url(#rab-dots)" stroke="stroke-attention-600" brakeLights={waits} />
      {!waits && (
        <path d="M 20 134 L 20 70" className="stroke-attention-600" strokeWidth="5" markerEnd="url(#rab-arrow-you)" />
      )}
    </g>
  );
}

export function CirkulationsplatsDiagram() {
  return (
    <svg
      viewBox="0 0 400 844"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="rab-title rab-desc"
    >
      <title id="rab-title">Cirkulationsplats — infart, placering och utfart</title>
      <desc id="rab-desc">
        Cirkulationsplats med fyra armar sedd uppifrån. Trafiken i cirkulationen kör moturs,
        markerat med vita pilar på vägbanan. Din bil, fylld med prickmönster, närmar sig nedifrån
        i det högra körfältet med bromsljusen tända. Vid infarten står vägmärkena D3
        cirkulationsplats och B1 väjningsplikt, och i vägbanan ligger en väjningslinje av vita
        trianglar. Ett fordon fyllt med diagonala ränder, markerat 1, är redan i cirkulationen,
        kommer från din vänster med fartstreck bakom sig och är på väg att passera din infart.
        Du har väjningsplikt mot det. Markering 2 pekar på din bil: du väntar vid
        väjningslinjen. En grön streckad linje visar din planerade väg: in vid den södra armen,
        moturs runt östra sidan och ut på den norra armen. Markering 3 vid utfarten säger blinka
        höger och sök cyklister, och en cyklist, ritad som en ring, kör i högerkanten av
        utfarten. Utfarten är bestämd redan vid infarten. En teckenförklaring skiljer på
        heldragen pil, rör sig nu, och streckad linje, din planerade väg. En ruta längst ned
        visar infarten två gånger: du väntar och fordonet i cirkulationen passerar först,
        markerat med en bock; du kör in framför det och bryter mot väjningsplikten, markerat
        med ett kryss.
      </desc>

      <defs>
        <pattern id="rab-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="rab-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path
            d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4"
            className="stroke-primary-600"
            strokeWidth="2"
          />
        </pattern>
        <marker
          id="rab-arrow-plan"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-progress-600" />
        </marker>
        <marker
          id="rab-arrow-other"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary-600" />
        </marker>
        <marker
          id="rab-arrow-you"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-attention-600" />
        </marker>
        <marker
          id="rab-arrow-cyclist"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-safety-600" />
        </marker>
        <marker
          id="rab-arrow-marking"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-diagram-marking" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Cirkulationsplats — trafiken kör moturs
      </text>
      <text x="20" y="48" className="fill-text-secondary text-[13px]">
        Infart, placering och utfart
      </text>

      <g transform="translate(0 44)">
        {/* Fyra armar */}
        <rect x="160" y="34" width="80" height="80" className="fill-diagram-road" />
        <rect x="160" y="286" width="80" height="104" className="fill-diagram-road" />
        <rect x="20" y="160" width="80" height="80" className="fill-diagram-road" />
        <rect x="300" y="160" width="80" height="80" className="fill-diagram-road" />

        {/* Mittlinjer på armarna */}
        <g className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="10 8">
          <line x1="200" y1="34" x2="200" y2="90" />
          <line x1="200" y1="310" x2="200" y2="390" />
          <line x1="20" y1="200" x2="90" y2="200" />
          <line x1="310" y1="200" x2="380" y2="200" />
        </g>

        {/* Vägkanter på armarna */}
        <g className="stroke-diagram-edge" strokeWidth="1.5">
          <line x1="160" y1="34" x2="160" y2="92" />
          <line x1="240" y1="34" x2="240" y2="92" />
          <line x1="160" y1="308" x2="160" y2="390" />
          <line x1="240" y1="308" x2="240" y2="390" />
          <line x1="20" y1="160" x2="92" y2="160" />
          <line x1="20" y1="240" x2="92" y2="240" />
          <line x1="308" y1="160" x2="380" y2="160" />
          <line x1="308" y1="240" x2="380" y2="240" />
        </g>

        {/* Cirkulationen: ringformad vägbana, rondellön i mitten */}
        <circle
          cx="200"
          cy="200"
          r="92"
          className="fill-none stroke-diagram-road"
          strokeWidth="44"
        />
        <circle cx="200" cy="200" r="70" className="fill-none stroke-diagram-edge" strokeWidth="1.5" />

        {/* Riktningspilar på vägbanan: moturs */}
        <line
          x1="108"
          y1="186"
          x2="108"
          y2="214"
          className="stroke-diagram-marking"
          strokeWidth="3"
          markerEnd="url(#rab-arrow-marking)"
        />
        <line
          x1="214"
          y1="108"
          x2="186"
          y2="108"
          className="stroke-diagram-marking"
          strokeWidth="3"
          markerEnd="url(#rab-arrow-marking)"
        />

        {/* Väjningslinje vid din infart: trianglar med spetsen mot dig */}
        <g className="fill-diagram-marking">
          <path d="M 202 318 L 214 318 L 208 328 Z" />
          <path d="M 216 318 L 228 318 L 222 328 Z" />
          <path d="M 230 318 L 240 318 L 235 328 Z" />
        </g>

        {/* Teckenförklaring, högerkanten ovanför östra armen */}
        <g>
          <path d="M 292 100 L 318 100" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#rab-arrow-other)" />
          <text x="324" y="105" className="fill-text-secondary text-[13px]">
            Rör sig nu
          </text>
          <path
            d="M 292 122 L 318 122"
            className="stroke-progress-600"
            strokeWidth="3"
            strokeDasharray="8 6"
            markerEnd="url(#rab-arrow-plan)"
          />
          <text x="324" y="127" className="fill-text-secondary text-[13px]">
            Din väg
          </text>
        </g>

        {/* Din planerade väg: in söderifrån, moturs runt östra sidan, ut norrut */}
        <path
          d="M 220 334 L 220 290 A 92 92 0 0 0 292 200 A 92 92 0 0 0 220 110 L 220 50"
          className="fill-none stroke-progress-600"
          strokeWidth="3"
          strokeDasharray="8 6"
          markerEnd="url(#rab-arrow-plan)"
        />

        {/* 1. Fordon i cirkulationen: sydväst, kör åt sydost (moturs), med fartstreck bakom */}
        <g>
          <g transform="rotate(135 135 265)" className="stroke-primary-600" strokeWidth="2.5" strokeLinecap="round">
            <line x1="123" y1="293" x2="123" y2="305" />
            <line x1="135" y1="293" x2="135" y2="311" />
            <line x1="147" y1="293" x2="147" y2="305" />
          </g>
          <Car cx={135} cy={265} width={28} length={44} heading={135} fill="url(#rab-stripes)" stroke="stroke-primary-600" />
          <path
            d="M 154 280 A 92 92 0 0 0 184 291"
            className="fill-none stroke-primary-600"
            strokeWidth="3"
            markerEnd="url(#rab-arrow-other)"
          />
          <Callout x={24} y={318} n={1} />
          <text x="40" y="323" className="fill-text-primary text-[13px] font-semibold">
            I cirkulationen
          </text>
          <text x="14" y="342" className="fill-text-secondary text-[13px]">
            från din vänster
          </text>
          <Pointer x1={60} y1={306} x2={112} y2={262} />
        </g>

        {/* 2. Din bil: kör uppåt, högra körfältet på södra armen, väntar */}
        <g>
          <Car cx={220} cy={360} width={28} length={44} heading="up" fill="url(#rab-dots)" stroke="stroke-attention-600" brakeLights />
          <Callout x={24} y={372} n={2} />
          <text x="40" y="377" className="fill-text-primary text-[14px] font-semibold">
            Du
          </text>
          <text x="14" y="396" className="fill-text-secondary text-[13px]">
            väntar vid väjningslinjen
          </text>
          <Pointer x1={58} y1={368} x2={203} y2={352} />
        </g>

        {/* Vägmärken vid infarten: B1 väjningsplikt över D3 cirkulationsplats */}
        <image href={`${BASE_PATH}/signs/B1.svg`} x="262" y="304" width="36" height="32" />
        <image href={`${BASE_PATH}/signs/D3.svg`} x="262" y="342" width="36" height="36" />
        <text x="304" y="326" className="fill-text-secondary text-[13px]">
          B1
        </text>
        <text x="304" y="366" className="fill-text-secondary text-[13px]">
          D3
        </text>

        {/* 3. Utfart: blinka höger, sök cyklister */}
        <g>
          <Callout x={24} y={60} n={3} />
          <text x="40" y="65" className="fill-text-primary text-[13px] font-semibold">
            Blinka höger
          </text>
          <text x="14" y="84" className="fill-text-secondary text-[13px]">
            sök cyklister
          </text>
          <Pointer x1={96} y1={60} x2={214} y2={72} />
        </g>
        <g>
          <circle
            cx="252"
            cy="76"
            r="8"
            className="fill-none stroke-safety-600"
            strokeWidth="2.5"
          />
          <line
            x1="252"
            y1="66"
            x2="252"
            y2="52"
            className="stroke-safety-600"
            strokeWidth="2"
            markerEnd="url(#rab-arrow-cyclist)"
          />
          <text x="266" y="81" className="fill-text-primary text-[13px] font-medium">
            Cyklist
          </text>
        </g>
      </g>

      {/* Regeltext */}
      <text
        x="200"
        y="474"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-medium"
      >
        Du har väjningsplikt mot alla fordon
      </text>
      <text
        x="200"
        y="492"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-medium"
      >
        som redan är i cirkulationen.
      </text>
      <text x="200" y="516" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Grön streckad linje: din planerade väg. Bestäm utfarten
      </text>
      <text x="200" y="534" textAnchor="middle" className="fill-text-secondary text-[13px]">
        redan vid infarten. Blinka höger vid utfart, sök cyklister.
      </text>

      {/* Mönsterförklaring */}
      <g>
        <rect
          x="40"
          y="558"
          width="22"
          height="14"
          rx="2"
          fill="url(#rab-dots)"
          className="stroke-attention-600"
          strokeWidth="1.5"
        />
        <text x="68" y="570" className="fill-text-tertiary text-[13px]">
          Du
        </text>
        <rect
          x="110"
          y="558"
          width="22"
          height="14"
          rx="2"
          fill="url(#rab-stripes)"
          className="stroke-primary-600"
          strokeWidth="1.5"
        />
        <text x="138" y="570" className="fill-text-tertiary text-[13px]">
          I cirkulationen
        </text>
        <circle cx="260" cy="565" r="6" className="fill-none stroke-safety-600" strokeWidth="2" />
        <text x="272" y="570" className="fill-text-tertiary text-[13px]">
          Cyklist
        </text>
      </g>

      {/* Förklaringsruta: vad väjningsplikten innebär i praktiken */}
      <rect x="20" y="590" width="360" height="238" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="34" y="614" className="fill-text-primary text-[13px] font-semibold">
        När ett fordon redan är i cirkulationen:
      </text>
      <line x1="200" y1="632" x2="200" y2="822" className="stroke-border-default" strokeWidth="1.5" strokeDasharray="6 4" />

      <MiniInfart x={100} y={690} variant="vantar" />
      <text x="100" y="782" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Du väntar
      </text>
      <text x="100" y="798" textAnchor="middle" className="fill-text-secondary text-[13px]">
        det passerar först
      </text>
      <Check x={100} y={814} />

      <MiniInfart x={290} y={690} variant="kor-in" />
      <text x="290" y="782" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Du kör in framför det
      </text>
      <text x="290" y="798" textAnchor="middle" className="fill-text-secondary text-[13px]">
        bryter mot väjningsplikten
      </text>
      <Cross x={290} y={814} />
    </svg>
  );
}
