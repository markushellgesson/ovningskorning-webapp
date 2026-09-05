/**
 * Väjningsplikt (B1) mot stopplikt (B2), sida vid sida (INT-01, INT-03).
 * Varje märke visas ovanför en liten korsning som visar vad föraren gör:
 * B1 — väj för trafiken på den korsande vägen, stanna bara om det behövs;
 * B2 — stanna helt vid stopplinjen, inte rullande.
 *
 * SPRÅK: väjningsplikt beskrivs som att VÄJA, aldrig som att "ge fri väg".
 * Lämna fri väg är en annan plikt (utryckningsfordon, spårvagn) och de två
 * hålls isär i hela appen — se THEORY-UTRYCKNING.
 *
 * Geometri (högertrafik, vy uppifrån), lika i båda panelerna. Panelerna
 * ritas i en grupp förskjuten 36 px nedåt så att rubriken får luft; inget
 * i panelerna har flyttats.
 * - Din bil kör uppåt. Dess högra sida är bildens högra, så den ligger i
 *   den högra halvan av den lodräta vägen.
 * - Annan trafik på den korsande vägen kör åt höger i bilden (österut).
 *   Dess högra sida är då bildens nedre, så den ligger i den nedre halvan
 *   av den vågräta vägen — det körfält som ligger närmast dig.
 *
 * Mönster: prickar = du, diagonala ränder = annan trafik. Heldragen pil =
 * rör sig nu, streckad pil = din väg. Förklaringsrutan längst ned ritar
 * ditt körfält och vägmarkeringen i mindre skala, med samma placering.
 *
 * Vägmärkesbilderna B1 och B2 i public/signs/ är svenska officiella
 * vägmärken (allmänna handlingar) och fria att återge.
 */

import { BASE_PATH } from '@/lib/base-path';

type Heading = 'up' | 'right' | 'down' | 'left';
const HEADING_DEG: Record<Heading, number> = { up: 0, right: 90, down: 180, left: -90 };

interface CarProps {
  cx: number;
  cy: number;
  width: number;
  length: number;
  heading: Heading;
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
  const glass = `fill-diagram-marking ${stroke}`;
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${HEADING_DEG[heading]})`}>
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

interface PanelProps {
  /** Panelens mittlinje i x-led. */
  cx: number;
  /** Prefix för id:n så att mönster inte krockar mellan panelerna. */
  idPrefix: string;
  variant: 'vajningsplikt' | 'stopplikt';
}

function Panel({ cx, idPrefix, variant }: PanelProps) {
  const isStop = variant === 'stopplikt';
  const laneCenter = cx + 15;

  return (
    <g>
      {/* Vägmärke */}
      <image
        href={isStop ? `${BASE_PATH}/signs/B2.svg` : `${BASE_PATH}/signs/B1.svg`}
        x={cx - 50}
        y="14"
        width="100"
        height="100"
      />
      <text
        x={cx}
        y="140"
        textAnchor="middle"
        className="fill-text-primary text-[15px] font-semibold"
      >
        {isStop ? 'B2 — Stopplikt' : 'B1 — Väjningsplikt'}
      </text>

      {/* Korsande väg (vågrät) och din väg (lodrät) */}
      <rect x={cx - 120} y="160" width="240" height="60" className="fill-diagram-road" />
      <rect x={cx - 30} y="220" width="60" height="116" className="fill-diagram-road" />
      <g className="stroke-diagram-edge" strokeWidth="1.5">
        <line x1={cx - 120} y1="160" x2={cx + 120} y2="160" />
        <line x1={cx - 120} y1="220" x2={cx - 30} y2="220" />
        <line x1={cx + 30} y1="220" x2={cx + 120} y2="220" />
        <line x1={cx - 30} y1="220" x2={cx - 30} y2="336" />
        <line x1={cx + 30} y1="220" x2={cx + 30} y2="336" />
      </g>
      <g className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="10 8">
        <line x1={cx - 120} y1="190" x2={cx - 30} y2="190" />
        <line x1={cx + 30} y1="190" x2={cx + 120} y2="190" />
        <line x1={cx} y1="240" x2={cx} y2="336" />
      </g>

      {/* 1. Vägmarkering tvärs ditt körfält */}
      {isStop ? (
        <line
          x1={cx + 2}
          y1="228"
          x2={cx + 30}
          y2="228"
          className="stroke-diagram-marking"
          strokeWidth="6"
        />
      ) : (
        <g className="fill-diagram-marking">
          <path d={`M ${cx + 2} 224 L ${cx + 11} 224 L ${cx + 6.5} 234 Z`} />
          <path d={`M ${cx + 13} 224 L ${cx + 22} 224 L ${cx + 17.5} 234 Z`} />
          <path d={`M ${cx + 24} 224 L ${cx + 30} 224 L ${cx + 27} 234 Z`} />
        </g>
      )}
      <Callout x={cx - 106} y={252} n={1} />
      <text x={cx - 118} y="274" className="fill-text-primary text-[13px] font-semibold">
        {isStop ? 'Stopplinje' : 'Väjningslinje'}
      </text>
      <Pointer x1={cx - 94} y1={252} x2={cx + 4} y2={229} />

      {/* Annan trafik på korsande väg: kör åt höger, nedre körfältet */}
      <Car
        cx={cx - 92}
        cy={190}
        width={24}
        length={40}
        heading="right"
        fill={`url(#${idPrefix}-stripes)`}
        stroke="stroke-primary-600"
      />
      <line
        x1={cx - 66}
        y1="190"
        x2={cx - 40}
        y2="190"
        className="stroke-primary-600"
        strokeWidth="3"
        markerEnd={`url(#${idPrefix}-arrow-other)`}
      />

      {/* Din bil: kör uppåt, högra körfältet */}
      {isStop ? (
        <g>
          {/* Stannad precis vid stopplinjen */}
          <Car
            cx={laneCenter}
            cy={258}
            width={24}
            length={40}
            heading="up"
            fill={`url(#${idPrefix}-dots)`}
            stroke="stroke-attention-600"
            brakeLights
          />
          {/* Stoppsymbol: fylld kvadrat, och vad du gör */}
          <rect x={cx - 52} y="346" width="14" height="14" rx="2" className="fill-safety-600" />
          <text x={cx + 6} y="358" textAnchor="middle" className="fill-text-primary text-[13px] font-medium">
            Stanna helt
          </text>
        </g>
      ) : (
        <g>
          {/* På väg fram, kör vidare om det är fritt */}
          <Car
            cx={laneCenter}
            cy={282}
            width={24}
            length={40}
            heading="up"
            fill={`url(#${idPrefix}-dots)`}
            stroke="stroke-attention-600"
          />
          <line
            x1={laneCenter}
            y1="256"
            x2={laneCenter}
            y2="238"
            className="stroke-progress-600"
            strokeWidth="3"
            strokeDasharray="6 4"
            markerEnd={`url(#${idPrefix}-arrow-go)`}
          />
          {/* Pilsymbol, och vad du gör */}
          <line
            x1={cx - 64}
            y1="353"
            x2={cx - 48}
            y2="353"
            className="stroke-progress-600"
            strokeWidth="3"
            strokeDasharray="6 4"
            markerEnd={`url(#${idPrefix}-arrow-go)`}
          />
          <text x={cx + 10} y="358" textAnchor="middle" className="fill-text-primary text-[13px] font-medium">
            Vidare om fritt
          </text>
        </g>
      )}
      <text
        x={cx - 15}
        y={isStop ? 263 : 287}
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-semibold"
      >
        Du
      </text>

      {/* Vad märket kräver */}
      <text x={cx} y="386" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        {isStop ? 'Stanna helt vid stopplinjen.' : 'Väj för den korsande trafiken.'}
      </text>
      <text x={cx} y="406" textAnchor="middle" className="fill-text-secondary text-[13px]">
        {isStop ? 'Inte rullande. Sök trafik,' : 'Stanna bara om det behövs.'}
      </text>
      <text x={cx} y="424" textAnchor="middle" className="fill-text-secondary text-[13px]">
        {isStop ? 'fortsätt när det är säkert.' : 'Sök trafik, fortsätt när det är fritt.'}
      </text>
    </g>
  );
}

/**
 * Ditt körfält i skala 0,6 för förklaringsrutan: märket, vägmarkeringen
 * tvärs högra körfältet och din bil som rullar vidare. Samma placering som
 * i panelen ovanför.
 */
function MiniKorfalt({ x, y, variant }: { x: number; y: number; variant: 'vajningsplikt' | 'stopplikt' }) {
  const isStop = variant === 'stopplikt';
  return (
    <g transform={`translate(${x} ${y}) scale(0.6)`}>
      <image
        href={isStop ? `${BASE_PATH}/signs/B2.svg` : `${BASE_PATH}/signs/B1.svg`}
        x="-96"
        y="-56"
        width="48"
        height="48"
      />
      <rect x="-30" y="-60" width="60" height="120" className="fill-diagram-road" />
      <g className="stroke-diagram-edge" strokeWidth="2.5">
        <line x1="-30" y1="-60" x2="-30" y2="60" />
        <line x1="30" y1="-60" x2="30" y2="60" />
      </g>
      <line x1="0" y1="-60" x2="0" y2="60" className="stroke-diagram-marking" strokeWidth="2.5" strokeDasharray="10 8" />
      {isStop ? (
        <line x1="2" y1="-20" x2="30" y2="-20" className="stroke-diagram-marking" strokeWidth="6" />
      ) : (
        <g className="fill-diagram-marking">
          <path d="M 2 -24 L 11 -24 L 6.5 -14 Z" />
          <path d="M 13 -24 L 22 -24 L 17.5 -14 Z" />
          <path d="M 24 -24 L 30 -24 L 27 -14 Z" />
        </g>
      )}
      <Car cx={15} cy={14} width={24} length={40} heading="up" fill="url(#vs-dots)" stroke="stroke-attention-600" />
      <path d="M 15 -12 L 15 -50" className="stroke-attention-600" strokeWidth="4" markerEnd="url(#vs-arrow-you)" />
    </g>
  );
}

export function VagmarkenVajningsreglerDiagram() {
  return (
    <svg
      viewBox="0 0 520 748"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="signs-title signs-desc"
    >
      <title id="signs-title">Väjningsplikt och stopplikt — två olika krav</title>
      <desc id="signs-desc">
        Två paneler sida vid sida, var och en med ett vägmärke ovanför en liten korsning sedd
        uppifrån. Till vänster B1 väjningsplikt, en nedåtpekande triangel med röd kant. Under
        märket ligger en väjningslinje av små vita trianglar tvärs ditt körfält, markerad 1, och
        din bil, fylld med prickar, kör uppåt mot linjen med en streckad pil framåt och texten
        vidare om fritt. Väjningsplikt betyder att du ska väja för den korsande trafiken: sänk farten
        i god tid och stanna om det behövs.
        Till höger B2 stopplikt, en åttakantig röd skylt med texten STOP. Under märket ligger en
        bred vit stopplinje tvärs ditt körfält, markerad 1, och din bil står stilla precis vid
        linjen med bromsljusen tända, en fylld röd kvadrat och texten stanna helt. Stopplikt
        kräver att du stannar helt, inte rullande. I båda panelerna kör ett randigt fordon med
        heldragen pil på den korsande vägen i körfältet närmast dig. En teckenförklaring skiljer
        på prickar, du, ränder, annan trafik, heldragen pil, rör sig nu, och streckad pil, din
        väg. Längst ned en ruta om ett vanligt misstag, att blanda ihop de två märkena: vid B1
        rullar bilen vidare när det är fritt, markerat med en bock; vid B2 rullar bilen över
        linjen utan att stanna helt, markerat med ett kryss.
      </desc>

      <defs>
        <pattern id="vs-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="vs-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path
            d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4"
            className="stroke-primary-600"
            strokeWidth="2"
          />
        </pattern>
        <marker
          id="vs-arrow-other"
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
          id="vs-arrow-go"
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
          id="vs-arrow-you"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-attention-600" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Väjningsplikt och stopplikt — två olika krav
      </text>

      <g transform="translate(0 36)">
        <Panel cx={130} idPrefix="vs" variant="vajningsplikt" />

        {/* Skiljelinje */}
        <line
          x1="260"
          y1="14"
          x2="260"
          y2="430"
          className="stroke-border-default"
          strokeWidth="1.5"
          strokeDasharray="6 4"
        />

        <Panel cx={390} idPrefix="vs" variant="stopplikt" />
      </g>

      {/* Teckenförklaring */}
      <g>
        <rect
          x="30"
          y="478"
          width="22"
          height="14"
          rx="2"
          fill="url(#vs-dots)"
          className="stroke-attention-600"
          strokeWidth="1.5"
        />
        <text x="58" y="490" className="fill-text-tertiary text-[13px]">
          Du
        </text>
        <rect
          x="90"
          y="478"
          width="22"
          height="14"
          rx="2"
          fill="url(#vs-stripes)"
          className="stroke-primary-600"
          strokeWidth="1.5"
        />
        <text x="118" y="490" className="fill-text-tertiary text-[13px]">
          Annan trafik
        </text>
        <path d="M 230 485 L 256 485" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#vs-arrow-other)" />
        <text x="264" y="490" className="fill-text-tertiary text-[13px]">
          Rör sig nu
        </text>
        <path
          d="M 350 485 L 376 485"
          className="stroke-progress-600"
          strokeWidth="3"
          strokeDasharray="6 4"
          markerEnd="url(#vs-arrow-go)"
        />
        <text x="384" y="490" className="fill-text-tertiary text-[13px]">
          Din väg
        </text>
      </g>

      {/* Förklaringsruta: det vanliga misstaget */}
      <rect x="20" y="508" width="480" height="226" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text
        x="260"
        y="532"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-medium"
      >
        Vanligt misstag: att blanda ihop dem.
      </text>
      <text x="260" y="550" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Väjningsplikt = väj för korsande trafik. Stopplikt = stanna helt.
      </text>
      <line x1="260" y1="566" x2="260" y2="722" className="stroke-border-default" strokeWidth="1.5" strokeDasharray="6 4" />

      <MiniKorfalt x={130} y={620} variant="vajningsplikt" />
      <text x="130" y="674" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Vid B1: rullar vidare
      </text>
      <text x="130" y="690" textAnchor="middle" className="fill-text-secondary text-[13px]">
        när det är fritt
      </text>
      <Check x={130} y={708} />

      <MiniKorfalt x={390} y={620} variant="stopplikt" />
      <text x="390" y="674" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Vid B2: rullar över linjen
      </text>
      <text x="390" y="690" textAnchor="middle" className="fill-text-secondary text-[13px]">
        utan att stanna helt
      </text>
      <Cross x={390} y={708} />
    </svg>
  );
}
