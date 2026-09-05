/**
 * Järnvägs- och spårvägskorsning med bommar (SPEC-05), vy uppifrån.
 * Bilden lär ut en enda sak: kör inte in i korsningen förrän du vet att du
 * kan komma ut ur den igen — stanna på betryggande avstånd före bom och
 * signal, läs spåret själv åt båda håll, och kontrollera luckan på andra
 * sidan.
 *
 * Geometri (högertrafik, vy uppifrån), i scenens koordinater. Scenen ligger
 * i en grupp förskjuten 64 px nedåt så att rubriken får luft; ingen koordinat
 * inne i gruppen har flyttats.
 * - Vägen går lodrätt, körbanan x 165–245 med mittlinjen på x 205.
 * - Din bil kör uppåt i bilden (minskande y). Dess högra sida är då bildens
 *   högra, alltså ligger den i det högra körfältet x 205–245. Den står
 *   stannad med mitten på x 225, kaross x 211–239 — helt inom sitt körfält.
 * - Kön på andra sidan kör åt samma håll (uppåt) och ligger därför i samma
 *   körfält, x 211–239, cy 72.
 * - Vägmärket A35 och ljussignalen står till höger i färdriktningen, alltså
 *   till höger i bilden (x > 245).
 * - Tåget går på spåret y 145–185 och närmar sig från höger.
 * - Förklaringsrutans miniscener har samma körfält: din bil på x +20 räknat
 *   från mittlinjen, alltså i högra körfältet, riktad uppåt, precis som i
 *   huvudbilden.
 *
 * Mönster (inget mönster betyder två saker): prickar = din bil, snedränder =
 * andra bilar, liggande balkar = tåget. Tåget har med flit ett eget mönster
 * — i just den här bilden är hela poängen att upptäcka det.
 *
 * Vägmärkesbilden A35 i public/signs/ är ett svenskt officiellt vägmärke
 * (allmän handling) och fri att återge.
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
 * Ljus grundfyllning under mönstret, så att bilen lyfter från vägbanan i
 * både ljust och mörkt läge.
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
      <rect x={-hw} y={-hl} width={width} height={length} rx="4" className="fill-diagram-marking" />
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

/** Bom: röd-vita band, ritade som växlande segment (form, inte bara färg). */
function Bom({ x, y, width }: { x: number; y: number; width: number }) {
  const segments = 5;
  const w = width / segments;
  return (
    <g>
      {Array.from({ length: segments }).map((_, i) => (
        <rect
          key={i}
          x={x + i * w}
          y={y}
          width={w}
          height="10"
          className={i % 2 === 0 ? 'fill-safety-600' : 'fill-diagram-marking'}
        />
      ))}
      <rect x={x} y={y} width={width} height="10" className="fill-none stroke-text-primary" strokeWidth="1.5" />
    </g>
  );
}

/**
 * Samma korsning i halv skala för förklaringsrutan. Origo i spårets mitt.
 * Din bil ligger i högra körfältet (x +2 till +34 räknat från mittlinjen på
 * x 0) och kör uppåt, kön ligger i samma körfält bortom spåret — precis som
 * i huvudbilden. Luckan mellan spåret och kön är 14 enheter, kortare än
 * bilens 44, vilket är hela poängen med rutan.
 */
function MiniPlankorsning({ x, y, variant }: { x: number; y: number; variant: 'vantar' | 'kor-in' }) {
  const waits = variant === 'vantar';
  return (
    <g transform={`translate(${x} ${y}) scale(0.5)`}>
      <rect x="-40" y="-120" width="80" height="240" className="fill-diagram-road" />
      <g className="stroke-diagram-edge" strokeWidth="3">
        <line x1="-40" y1="-120" x2="-40" y2="120" />
        <line x1="40" y1="-120" x2="40" y2="120" />
      </g>
      <g className="stroke-diagram-marking" strokeWidth="3" strokeDasharray="12 10">
        <line x1="0" y1="-120" x2="0" y2="-40" />
        <line x1="0" y1="20" x2="0" y2="120" />
      </g>

      {/* Spåret */}
      <rect x="-110" y="-30" width="220" height="40" className="fill-diagram-edge" opacity="0.25" />
      <g className="fill-diagram-edge">
        <rect x="-104" y="-30" width="8" height="40" />
        <rect x="-76" y="-30" width="8" height="40" />
        <rect x="-48" y="-30" width="8" height="40" />
        <rect x="48" y="-30" width="8" height="40" />
        <rect x="76" y="-30" width="8" height="40" />
        <rect x="96" y="-30" width="8" height="40" />
      </g>
      <g className="stroke-primary-600" strokeWidth="3">
        <line x1="-110" y1="-20" x2="110" y2="-20" />
        <line x1="-110" y1="2" x2="110" y2="2" />
      </g>

      {/* Stopplats före spåret */}
      <line x1="2" y1="46" x2="40" y2="46" className="stroke-progress-600" strokeWidth="4" />

      {/* Kön bortom spåret, samma körfält som du */}
      <Car cx={20} cy={-84} width={28} length={44} heading="up" fill="url(#rail-stripes)" stroke="stroke-primary-600" brakeLights />

      {/* Du: väntar före stopplatsen, eller står kvar mitt på spåret */}
      <Car
        cx={20}
        cy={waits ? 76 : -14}
        width={28}
        length={44}
        heading="up"
        fill="url(#rail-dots)"
        stroke="stroke-attention-600"
        brakeLights
      />
    </g>
  );
}

export function JarnvagskorsningDiagram() {
  return (
    <svg
      viewBox="0 0 400 900"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="rail-title rail-desc"
    >
      <title id="rail-title">Järnvägskorsning med bommar: stopplats, siktlinje och plats på andra sidan</title>
      <desc id="rail-desc">
        Vy uppifrån av en väg med två körfält som korsar ett järnvägsspår. Din bil, fylld med
        prickmönster, kör uppåt i bilden i det högra körfältet och står stannad vid en stopplats,
        ritad som en grön tvärlinje, på betryggande avstånd före både ljussignalen och bommen.
        Avståndet är markerat med en måttlinje i vägkanten. Vid vägkanten till höger i
        färdriktningen står vägmärket A35, varning för korsning med bommar, och en ljussignal med
        rött sken; det röda skenet är dessutom markerat med ett kryss: kör inte in. Två bommar,
        ritade som röd-vita band, ligger fällda tvärs körbanan, en på var sida om spåret. Två
        streckade pilar längs spåret, en åt vänster och en åt höger, visar att du själv ska läsa
        korsningen åt båda håll. På spåret till höger närmar sig ett tåg, fyllt med liggande
        balkar — ett eget mönster, skilt både från prickarna och från de snedränder som betyder
        andra bilar — med fartstreck bakom sig. Bortom spåret står en kö, fylld med snedränder, i
        samma körfält som du. Mellan spåret och kön är luckan markerad med en streckad ram, och
        bredvid den ligger en lika streckad ram som visar din bils längd: den är längre än luckan
        och sticker ut i korsningen. Längst ned en ruta med samma korsning två gånger: du väntar
        före spåret och bilen står fri, markerat med en bock; du kör in ändå och bilen blir
        stående mitt på spåret, markerat med ett kryss.
      </desc>

      <defs>
        <pattern id="rail-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="rail-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="2" />
        </pattern>
        {/* Tågets eget mönster: liggande balkar. Får inte likna prickarna
            (din bil) eller snedränderna (andra bilar). */}
        <pattern id="rail-train" patternUnits="userSpaceOnUse" width="8" height="8">
          <rect y="0" width="8" height="3.5" className="fill-text-primary" />
        </pattern>
        <marker
          id="rail-arrow-sight"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-text-secondary" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Järnvägskorsning med bommar
      </text>
      <text x="20" y="48" className="fill-text-secondary text-[13px]">
        Stanna före. Läs spåret själv. Kontrollera platsen efter.
      </text>

      <g transform="translate(0 64)">
        {/* Vägen, lodrät, två körfält */}
        <rect x="165" y="0" width="80" height="440" className="fill-diagram-road" />
        <g className="stroke-diagram-edge" strokeWidth="1.5">
          <line x1="165" y1="0" x2="165" y2="440" />
          <line x1="245" y1="0" x2="245" y2="440" />
        </g>
        <g className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="10 8">
          <line x1="205" y1="0" x2="205" y2="112" />
          <line x1="205" y1="212" x2="205" y2="440" />
        </g>

        {/* Spåret, vågrätt: sliprar utanför vägbanan, två räler tvärs bilden */}
        <rect x="0" y="145" width="400" height="40" className="fill-diagram-edge" opacity="0.25" />
        <g className="fill-diagram-edge">
          {[6, 32, 58, 84, 110, 136, 254, 280, 306, 332, 358, 384].map((sx) => (
            <rect key={sx} x={sx} y="145" width="8" height="40" />
          ))}
        </g>
        <g className="stroke-primary-600" strokeWidth="3">
          <line x1="0" y1="155" x2="400" y2="155" />
          <line x1="0" y1="175" x2="400" y2="175" />
        </g>

        {/* Siktlinjer längs spåret, åt båda håll */}
        <g
          className="stroke-text-secondary"
          strokeWidth="2"
          strokeDasharray="7 5"
          markerEnd="url(#rail-arrow-sight)"
        >
          <line x1="160" y1="165" x2="105" y2="165" />
          <line x1="250" y1="165" x2="296" y2="165" />
        </g>

        {/* Tåget: eget mönster, fartstreck bakom, närmar sig från höger */}
        <g>
          <path d="M 310 152 L 380 152 L 380 178 L 310 178 L 298 165 Z" className="fill-diagram-marking" />
          <path
            d="M 310 152 L 380 152 L 380 178 L 310 178 L 298 165 Z"
            fill="url(#rail-train)"
            className="stroke-safety-600"
            strokeWidth="2"
          />
          <rect x="313" y="159" width="6" height="12" rx="1" className="fill-diagram-marking" />
          <g className="stroke-safety-600" strokeWidth="2.5" strokeLinecap="round">
            <line x1="384" y1="157" x2="394" y2="157" />
            <line x1="382" y1="165" x2="396" y2="165" />
            <line x1="384" y1="173" x2="394" y2="173" />
          </g>
          <text x="340" y="200" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
            Tåg
          </text>
        </g>

        {/* Bommar, fällda tvärs körbanan, en på var sida om spåret */}
        <Bom x={165} y={124} width={80} />
        <Bom x={165} y={196} width={80} />
        <g className="fill-text-primary">
          <circle cx="161" cy="129" r="4" />
          <circle cx="249" cy="129" r="4" />
          <circle cx="161" cy="201" r="4" />
          <circle cx="249" cy="201" r="4" />
        </g>

        {/* Ljussignal vid högra vägkanten, före bommen */}
        <g>
          <rect
            x="249"
            y="216"
            width="24"
            height="36"
            rx="4"
            className="fill-surface-raised stroke-diagram-edge"
            strokeWidth="1.5"
          />
          <circle cx="261" cy="234" r="8" className="fill-safety-600 stroke-text-primary" strokeWidth="1" />
          <Cross x={287} y={234} />
          <text x="300" y="228" className="fill-text-primary text-[13px] font-semibold">
            Rött sken:
          </text>
          <text x="300" y="244" className="fill-text-primary text-[13px] font-semibold">
            kör inte in
          </text>
        </g>

        {/* Betryggande avstånd: måttlinje från bommen ned till stopplatsen */}
        <g className="stroke-text-tertiary" strokeWidth="1.2">
          <line x1="155" y1="206" x2="155" y2="278" />
          <line x1="151" y1="206" x2="159" y2="206" />
          <line x1="151" y1="278" x2="159" y2="278" />
        </g>

        {/* Stopplats i ditt körfält, före signal och bom */}
        <line x1="207" y1="278" x2="243" y2="278" className="stroke-progress-600" strokeWidth="4" />
        <text x="250" y="282" className="fill-text-primary text-[13px] font-semibold">
          Stopplats
        </text>

        {/* Din bil: kör uppåt, högra körfältet, stannad före stopplatsen */}
        <Car cx={225} cy={306} width={28} length={44} heading="up" fill="url(#rail-dots)" stroke="stroke-attention-600" brakeLights />
        <text x="250" y="312" className="fill-text-primary text-[14px] font-semibold">
          Du
        </text>
        <text x="250" y="328" className="fill-text-secondary text-[13px]">
          står stilla
        </text>

        {/* Kön bortom spåret, samma körfält som du */}
        <Car cx={225} cy={72} width={28} length={44} heading="up" fill="url(#rail-stripes)" stroke="stroke-primary-600" brakeLights />
        <text x="250" y="44" className="fill-text-secondary text-[13px]">
          Kö framför korsningen
        </text>
        <text x="250" y="60" className="fill-text-secondary text-[13px]">
          står stilla
        </text>

        {/* Luckan mellan spåret och kön, och bilens längd bredvid för jämförelse */}
        <rect
          x="209"
          y="94"
          width="32"
          height="30"
          className="fill-none stroke-text-tertiary"
          strokeWidth="2"
          strokeDasharray="5 4"
        />
        <rect
          x="252"
          y="94"
          width="28"
          height="44"
          className="fill-none stroke-safety-600"
          strokeWidth="2"
          strokeDasharray="5 4"
        />
        <text x="288" y="110" className="fill-text-primary text-[13px] font-semibold">
          Bilens längd
        </text>
        <text x="288" y="126" className="fill-text-primary text-[13px] font-semibold">
          får inte plats
        </text>

        {/* 3. Plats efter spåret */}
        <Callout x={24} y={52} n={3} />
        <text x="40" y="57" className="fill-text-primary text-[13px] font-semibold">
          Plats efter spåret?
        </text>
        <text x="14" y="76" className="fill-text-secondary text-[13px]">
          Kör inte in om luckan
        </text>
        <text x="14" y="92" className="fill-text-secondary text-[13px]">
          är kortare än bilen
        </text>
        <Pointer x1={140} y1={64} x2={206} y2={102} />

        {/* 2. Läs spåret själv */}
        <Callout x={24} y={112} n={2} />
        <text x="40" y="117" className="fill-text-primary text-[13px] font-semibold">
          Titta längs spåret
        </text>
        <text x="14" y="136" className="fill-text-secondary text-[13px]">
          åt båda håll
        </text>
        <Pointer x1={96} y1={130} x2={124} y2={160} />

        {/* 1. Stopplatsen */}
        <Callout x={24} y={276} n={1} />
        <text x="40" y="281" className="fill-text-primary text-[13px] font-semibold">
          Stanna här
        </text>
        <text x="14" y="300" className="fill-text-secondary text-[13px]">
          på betryggande
        </text>
        <text x="14" y="316" className="fill-text-secondary text-[13px]">
          avstånd
        </text>
        <Pointer x1={108} y1={290} x2={152} y2={258} />

        {/* Vägmärket A35 vid högra vägkanten, en bit före korsningen */}
        <line x1="270" y1="382" x2="270" y2="392" className="stroke-text-tertiary" strokeWidth="2" />
        <image href={`${BASE_PATH}/signs/A35.svg`} x="252" y="350" width="36" height="32" />
        <text x="252" y="410" className="fill-text-primary text-[13px] font-semibold">
          A35
        </text>
        <text x="252" y="426" className="fill-text-secondary text-[13px]">
          Varning för korsning
        </text>
        <text x="252" y="442" className="fill-text-secondary text-[13px]">
          med bommar
        </text>
      </g>

      {/* Sammanfattning */}
      <text x="200" y="532" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        Kör inte in om du riskerar att bli
      </text>
      <text x="200" y="552" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        stående i korsningen.
      </text>
      <text x="200" y="576" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Sänk farten så att bilen kan stannas före korsningen.
      </text>
      <text x="200" y="594" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Läs korsningen själv: titta längs spåret åt båda håll.
      </text>

      {/* Mönsterförklaring */}
      <g>
        <rect x="30" y="616" width="22" height="14" rx="2" fill="url(#rail-dots)" className="stroke-attention-600" strokeWidth="1.5" />
        <text x="58" y="628" className="fill-text-tertiary text-[13px]">
          Du
        </text>
        <rect x="110" y="616" width="22" height="14" rx="2" fill="url(#rail-stripes)" className="stroke-primary-600" strokeWidth="1.5" />
        <text x="138" y="628" className="fill-text-tertiary text-[13px]">
          Kö framför
        </text>
        <rect x="240" y="616" width="22" height="14" rx="2" fill="url(#rail-train)" className="stroke-safety-600" strokeWidth="1.5" />
        <text x="268" y="628" className="fill-text-tertiary text-[13px]">
          Tåg
        </text>
      </g>

      {/* Förklaringsruta: vad luckan på andra sidan avgör */}
      <rect x="20" y="650" width="360" height="234" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="34" y="674" className="fill-text-primary text-[13px] font-semibold">
        Om luckan efter spåret är kortare än bilen:
      </text>
      <line x1="200" y1="686" x2="200" y2="874" className="stroke-border-default" strokeWidth="1.5" strokeDasharray="6 4" />

      <MiniPlankorsning x={104} y={750} variant="vantar" />
      <text x="104" y="828" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Du väntar före spåret
      </text>
      <text x="104" y="844" textAnchor="middle" className="fill-text-secondary text-[13px]">
        bilen står fri från spåret
      </text>
      <Check x={104} y={866} />

      <MiniPlankorsning x={290} y={750} variant="kor-in" />
      <text x="290" y="828" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Du kör in ändå
      </text>
      <text x="290" y="844" textAnchor="middle" className="fill-text-secondary text-[13px]">
        bilen blir stående på spåret
      </text>
      <Cross x={290} y={866} />
    </svg>
  );
}
