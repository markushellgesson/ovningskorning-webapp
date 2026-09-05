/**
 * Obevakat övergångsställe sett uppifrån (VRU-01) och vad föraren gör.
 * Trafikförordningen 3 kap 61 §: väjningsplikt mot gående som gått ut på
 * eller ska just gå ut på övergångsstället.
 *
 * A13 heter VARNING FÖR ÖVERGÅNGSSTÄLLE. Märket som heter varning för gående är
 * A14 — förväxla inte de två; bilden här är A13.
 *
 * Geometri (högertrafik, vy uppifrån), i scenens koordinater. Scenen ritas
 * i en grupp förskjuten (20, 40) så att rubriken och etiketterna i
 * marginalerna får luft; inget i scenen har flyttats.
 * - Din bil kör uppåt i bilden. Dess högra sida är bildens högra, så den
 *   ligger i den högra halvan av vägen (x 200–260).
 * - Vägmärket A13, varning för övergångsställe, står på höger sida av vägen i din
 *   färdriktning, före övergångsstället.
 * - En gående har gått ut på övergångsstället från vänster och går åt höger.
 *   En annan gående står på högra trottoaren och ska just gå ut.
 *
 * Mönster: prickar = du, streckgubbar = gående. Heldragen pil = rör sig nu,
 * streckad pil = planerad rörelse (din väg fram mot övergångsstället, den
 * gående som ska just gå ut). Förklaringsrutan längst ned ritar samma gata
 * i halv skala med samma placering.
 *
 * Vägmärkesbilden A13 i public/signs/ är ett svenskt officiellt vägmärke
 * (allmän handling) och fri att återge.
 */

import { BASE_PATH } from '@/lib/base-path';

interface PedestrianProps {
  x: number;
  y: number;
}

/** Streckgubbe, huvudet vid (x, y). Cirka 34 px hög. */
function Pedestrian({ x, y }: PedestrianProps) {
  return (
    <g className="stroke-safety-600" strokeWidth="2.5" strokeLinecap="round">
      <circle cx={x} cy={y} r="6" className="fill-safety-600" />
      <line x1={x} y1={y + 6} x2={x} y2={y + 22} />
      <line x1={x - 8} y1={y + 12} x2={x + 8} y2={y + 12} />
      <line x1={x} y1={y + 22} x2={x - 6} y2={y + 34} />
      <line x1={x} y1={y + 22} x2={x + 6} y2={y + 34} />
    </g>
  );
}

interface CarProps {
  cx: number;
  cy: number;
  width: number;
  length: number;
  fill: string;
  stroke: string;
  brakeLights?: boolean;
}

/**
 * Bil ritad med fronten uppåt. Karossen upptar exakt
 * (cx ± width/2, cy ± length/2); hjulen sticker ut 3 px.
 */
function Car({ cx, cy, width, length, fill, stroke, brakeLights }: CarProps) {
  const hw = width / 2;
  const hl = length / 2;
  const glass = `fill-diagram-marking ${stroke}`;
  return (
    <g transform={`translate(${cx} ${cy})`}>
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
 * Samma gata i halv skala för förklaringsrutan. Origo mitt i vägen vid
 * övergångsstället. Din bil i högra körfältet, den gående har gått ut från
 * vänster — som i huvudbilden.
 */
function MiniGata({ x, y, variant }: { x: number; y: number; variant: 'stannar' | 'kor-forbi' }) {
  const stops = variant === 'stannar';
  return (
    <g transform={`translate(${x} ${y}) scale(0.5)`}>
      <rect x="-60" y="-100" width="120" height="200" className="fill-diagram-road" />
      <g className="stroke-diagram-edge" strokeWidth="4">
        <line x1="-60" y1="-100" x2="-60" y2="100" />
        <line x1="60" y1="-100" x2="60" y2="100" />
      </g>
      <g className="stroke-diagram-marking" strokeWidth="3" strokeDasharray="10 8">
        <line x1="0" y1="-100" x2="0" y2="-40" />
        <line x1="0" y1="22" x2="0" y2="100" />
      </g>
      <g className="fill-diagram-marking">
        <rect x="-54" y="-30" width="14" height="42" />
        <rect x="-28" y="-30" width="14" height="42" />
        <rect x="-2" y="-30" width="14" height="42" />
        <rect x="24" y="-30" width="14" height="42" />
        <rect x="48" y="-30" width="10" height="42" />
      </g>
      <Pedestrian x={-32} y={-24} />
      <line x1="-20" y1="-10" x2="-4" y2="-10" className="stroke-safety-600" strokeWidth="3" markerEnd="url(#ovg-arrow-ped)" />
      <Car cx={30} cy={60} width={30} length={48} fill="url(#ovg-dots)" stroke="stroke-attention-600" brakeLights={stops} />
      {!stops && (
        <path d="M 30 32 L 30 -60" className="stroke-attention-600" strokeWidth="5" markerEnd="url(#ovg-arrow-you)" />
      )}
    </g>
  );
}

export function OvergangsstalleVarningDiagram() {
  return (
    <svg
      viewBox="0 0 440 836"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="ovg-title ovg-desc"
    >
      <title id="ovg-title">Obevakat övergångsställe — sänk farten, var beredd att stanna</title>
      <desc id="ovg-desc">
        Gata sedd uppifrån med trottoar på båda sidor. Tvärs över gatan ligger ett
        övergångsställe, markerat med breda vita band i vägbanan. Din bil, fylld med prickar,
        kör uppåt i det högra körfältet mot övergångsstället med bromsljusen tända, en streckad
        pil framåt och texten sänk farten, var beredd att stanna. På höger sida före
        övergångsstället står vägmärket A13, varning för övergångsställe, en triangel med röd kant
        och en gående figur på ett övergångsställe, markerat 3: det varnar i förväg. Två gående är ritade som streckgubbar:
        den ena, markerad 1, har gått ut på övergångsstället från vänster och går åt höger med
        en heldragen pil; den andra, markerad 2, står på den högra trottoaren och ska just gå
        ut, markerad med en streckad pil in mot vägen. Du har väjningsplikt mot båda: mot den
        som gått ut och mot den som ska just gå ut. En teckenförklaring skiljer på heldragen
        pil, rör sig nu, och streckad pil, planerad väg. Under bilden: sänk farten, ge marginal,
        var beredd att stanna. En ruta längst ned visar gatan två gånger: du sänker farten i tid
        och stannar om det behövs, markerat med en bock; du kör förbi framför den gående,
        markerat med ett kryss.
      </desc>

      <defs>
        <pattern id="ovg-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <marker
          id="ovg-arrow-you"
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
          id="ovg-arrow-ped"
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
          id="ovg-arrow-neutral"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-text-primary" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Obevakat övergångsställe
      </text>
      <text x="20" y="48" className="fill-text-secondary text-[13px]">
        Sänk farten, var beredd att stanna
      </text>

      {/* Teckenförklaring, övre högra hörnet */}
      <g>
        <path d="M 300 22 L 326 22" className="stroke-text-primary" strokeWidth="3" markerEnd="url(#ovg-arrow-neutral)" />
        <text x="334" y="27" className="fill-text-secondary text-[13px]">
          Rör sig nu
        </text>
        <path
          d="M 300 44 L 326 44"
          className="stroke-text-primary"
          strokeWidth="3"
          strokeDasharray="6 5"
          markerEnd="url(#ovg-arrow-neutral)"
        />
        <text x="334" y="49" className="fill-text-secondary text-[13px]">
          Planerad väg
        </text>
      </g>

      <g transform="translate(20 40)">
        {/* Trottoarer (ramade ytor) och vägbana */}
        <rect
          x="90"
          y="40"
          width="220"
          height="400"
          className="fill-none stroke-border-default"
          strokeWidth="1.5"
        />
        <rect x="140" y="40" width="120" height="400" className="fill-diagram-road" />
        <g className="stroke-diagram-edge" strokeWidth="2">
          <line x1="140" y1="40" x2="140" y2="440" />
          <line x1="260" y1="40" x2="260" y2="440" />
        </g>
        {/* Mittlinje, bryts vid övergångsstället */}
        <g className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="10 8">
          <line x1="200" y1="40" x2="200" y2="160" />
          <line x1="200" y1="222" x2="200" y2="440" />
        </g>

        {/* Övergångsställe: breda band längs färdriktningen */}
        <g className="fill-diagram-marking">
          <rect x="146" y="170" width="14" height="42" />
          <rect x="172" y="170" width="14" height="42" />
          <rect x="198" y="170" width="14" height="42" />
          <rect x="224" y="170" width="14" height="42" />
          <rect x="248" y="170" width="10" height="42" />
        </g>

        {/* 1. Gående som gått ut, går åt höger */}
        <g>
          <Pedestrian x={168} y={176} />
          <line
            x1="180"
            y1="190"
            x2="196"
            y2="190"
            className="stroke-safety-600"
            strokeWidth="2"
            markerEnd="url(#ovg-arrow-ped)"
          />
          <Callout x={-4} y={150} n={1} />
          <text x="12" y="155" className="fill-text-primary text-[13px] font-semibold">
            Har gått ut
          </text>
          <Pointer x1={60} y1={160} x2={161} y2={178} />
        </g>

        {/* 2. Gående på högra trottoaren, ska just gå ut */}
        <g>
          <Pedestrian x={286} y={176} />
          <line
            x1="274"
            y1="190"
            x2="256"
            y2="190"
            className="stroke-safety-600"
            strokeWidth="2"
            strokeDasharray="3 3"
            markerEnd="url(#ovg-arrow-ped)"
          />
          <Callout x={326} y={150} n={2} />
          <text x="342" y="155" className="fill-text-primary text-[13px] font-semibold">
            Just ska
          </text>
          <text x="342" y="172" className="fill-text-primary text-[13px] font-semibold">
            gå ut
          </text>
          <Pointer x1={322} y1={160} x2={293} y2={176} />
        </g>

        {/* 3. A13 på höger sida, före övergångsstället */}
        <g>
          <image href={`${BASE_PATH}/signs/A13.svg`} x="282" y="290" width="48" height="43" />
          <Callout x={338} y={360} n={3} />
          <text x="354" y="365" className="fill-text-primary text-[13px] font-semibold">
            A13
          </text>
          <text x="322" y="383" className="fill-text-secondary text-[13px]">
            varnar i förväg
          </text>
          <Pointer x1={338} y1={348} x2={326} y2={334} />
        </g>

        {/* Din bil: kör uppåt, högra körfältet, bromsar */}
        <g>
          <Car cx={230} cy={404} width={30} length={48} fill="url(#ovg-dots)" stroke="stroke-attention-600" brakeLights />
          <path
            d="M 230 374 L 230 240"
            className="stroke-attention-600"
            strokeWidth="3"
            strokeDasharray="8 6"
            markerEnd="url(#ovg-arrow-you)"
          />
          <text x="-8" y="396" className="fill-text-primary text-[14px] font-semibold">
            Du
          </text>
          <g className="fill-text-secondary text-[13px]">
            <text x="-8" y="414">
              sänk farten,
            </text>
            <text x="-8" y="430">
              var beredd
            </text>
            <text x="-8" y="446">
              att stanna
            </text>
          </g>
          <Pointer x1={26} y1={392} x2={212} y2={404} />
        </g>
      </g>

      {/* Regeltext */}
      <text
        x="220"
        y="510"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-medium"
      >
        Du har väjningsplikt mot gående som gått ut på
      </text>
      <text
        x="220"
        y="528"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-medium"
      >
        eller ska just gå ut på övergångsstället.
      </text>
      <text x="220" y="552" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Sänk farten, ge marginal, var beredd att stanna.
      </text>
      <text x="220" y="570" textAnchor="middle" className="fill-text-secondary text-[13px]">
        A13 varnar i förväg för platsen.
      </text>

      {/* Förklaringsruta: vad väjningsplikten innebär i praktiken */}
      <rect x="20" y="594" width="400" height="228" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="34" y="618" className="fill-text-primary text-[13px] font-semibold">
        När en gående gått ut på övergångsstället:
      </text>
      <line x1="220" y1="636" x2="220" y2="816" className="stroke-border-default" strokeWidth="1.5" strokeDasharray="6 4" />

      <MiniGata x={120} y={700} variant="stannar" />
      <text x="120" y="768" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Sänker farten i tid,
      </text>
      <text x="120" y="784" textAnchor="middle" className="fill-text-secondary text-[13px]">
        stannar om det behövs
      </text>
      <Check x={120} y={802} />

      <MiniGata x={320} y={700} variant="kor-forbi" />
      <text x="320" y="768" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Kör förbi framför
      </text>
      <text x="320" y="784" textAnchor="middle" className="fill-text-secondary text-[13px]">
        den gående
      </text>
      <Cross x={320} y={802} />
    </svg>
  );
}
