/**
 * Påfart motorväg (HWY-01) — accelerationsfältet: anpassa farten, välj luckan
 * och fläta in innan fältet tar slut. Trafikförordningen 3 kap 23 § (med
 * accelerationsfält) och 3 kap 21 § (utan).
 *
 * Geometri: trafiken kör åt höger i bilden (ökande x). Förarens högra sida är
 * då bildens nedre kant (ökande y). Höger körfält är därför det nedre av de
 * två (y 130–190) och accelerationsfältet ligger under det (y 190–235).
 *
 * Koordinaterna ovan är scenens egna. Scenen ligger i en grupp med
 * translate(0 50) som bara ger plats för rubriken; inga koordinater inne i
 * gruppen har flyttats.
 *
 * Vägmärkesbilden B1 i public/signs/ är ett svenskt officiellt vägmärke
 * (allmän handling) och fri att återge.
 */

import { BASE_PATH } from '@/lib/base-path';

type Heading = 'up' | 'down' | 'left' | 'right';

function nosePoints(x: number, y: number, w: number, h: number, heading: Heading): string {
  switch (heading) {
    case 'right':
      return `${x + w - 9},${y + 4} ${x + w - 2},${y + h / 2} ${x + w - 9},${y + h - 4}`;
    case 'left':
      return `${x + 9},${y + 4} ${x + 2},${y + h / 2} ${x + 9},${y + h - 4}`;
    case 'up':
      return `${x + 4},${y + 9} ${x + w / 2},${y + 2} ${x + w - 4},${y + 9}`;
    case 'down':
      return `${x + 4},${y + h - 9} ${x + w / 2},${y + h - 2} ${x + w - 4},${y + h - 9}`;
  }
}

/** Fordon sett uppifrån: mönstrad kropp och en fylld nos som visar färdriktningen. */
function Car({
  x,
  y,
  w,
  h,
  heading,
  fill,
  stroke,
  nose,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  heading: Heading;
  fill: string;
  stroke: string;
  nose: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="4" fill={fill} className={stroke} strokeWidth="2" />
      <polygon points={nosePoints(x, y, w, h, heading)} className={nose} />
    </g>
  );
}

/** Fartstreck bakom ett fordon som kör åt höger: x är bakkanten, cy mittlinjen. */
function Streaks({ x, cy, stroke }: { x: number; cy: number; stroke: string }) {
  return (
    <g className={stroke} strokeWidth="2" strokeLinecap="round">
      <line x1={x - 6} y1={cy - 6} x2={x - 18} y2={cy - 6} />
      <line x1={x - 6} y1={cy} x2={x - 26} y2={cy} />
      <line x1={x - 6} y1={cy + 6} x2={x - 18} y2={cy + 6} />
    </g>
  );
}

/** Bromsljus bak på ett fordon som kör åt höger (bakkanten är vänsterkanten). */
function BrakeLights({ x, y, h }: { x: number; y: number; h: number }) {
  return (
    <g className="fill-safety-600">
      <rect x={x - 1} y={y + 2} width="3" height="4" />
      <rect x={x - 1} y={y + h - 6} width="3" height="4" />
    </g>
  );
}

/** Numrerad hänvisning: fylld cirkel med siffra. */
function Badge({ cx, cy, n }: { cx: number; cy: number; n: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="11" className="fill-text-primary" />
      <text x={cx} y={cy + 5} textAnchor="middle" className="fill-surface-base text-[13px] font-bold">
        {n}
      </text>
    </g>
  );
}

/** Tunn pekarlinje från etiketten till det den syftar på, med en punkt i änden. */
function Pointer({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-text-secondary" strokeWidth="1.5" />
      <circle cx={x2} cy={y2} r="3" className="fill-text-secondary" />
    </g>
  );
}

export function AccelerationsfaltDiagram() {
  return (
    <svg
      viewBox="0 0 620 770"
      className="w-full max-w-2xl mx-auto"
      role="img"
      aria-labelledby="accel-title accel-desc"
    >
      <title id="accel-title">Påfart motorväg med accelerationsfält</title>
      <desc id="accel-desc">
        Motorväg sedd uppifrån, trafiken kör åt höger. Det högra körfältet är det nedre av de två,
        och under det ligger accelerationsfältet som en påfartsväg leder in i nedifrån vänster. Din
        bil har prickmönster och en fylld nos som visar färdriktningen; den visas i tre lägen. Först
        på påfarten i låg fart, markerad 1. Sedan mitt i accelerationsfältet med en pil framför sig
        märkt accelerera bestämt. Till sist inflätad i det högra körfältet, markerad 3, mitt i en
        lucka mellan två bilar med diagonalt randmönster som kör på motorvägen; fartstreck bakom dem
        visar att de håller hög fart. En klammer ovanför vägen, markerad 2, visar luckan: plats utan
        att andra måste bromsa. En streckad grön pil med pilspets visar inflätningen från fältet
        upp i körfältet, och den sker före en röd markering där fältet tar slut. En
        teckenförklaring nere till höger i bilden: prickmönster är din bil, randmönster är trafik
        på motorvägen, heldragen pil betyder rör sig nu och streckad pil planerad väg. Text under
        bilden: med accelerationsfält har du inte väjningsplikt utan anpassar farten till trafiken
        och flyttar över när det kan ske utan fara eller onödigt hinder (3 kap 23 §). Saknas
        accelerationsfält har du väjningsplikt (3 kap 21 §), vägmärke B1. En ruta längst ned visar
        två små scenarier: en lucka som räcker, där trafiken bakom behåller farten, markerad med en
        bock, och en för liten lucka där bilen bakom måste bromsa, markerad med ett kryss.
      </desc>

      <defs>
        <pattern id="accel-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
        </pattern>
        <pattern id="accel-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="2" />
        </pattern>
        <marker
          id="accel-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-progress-600" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="36" className="fill-text-primary text-[22px] font-bold">
        Påfart motorväg
      </text>
      <text x="20" y="58" className="fill-text-secondary text-[14px]">
        Anpassa farten i accelerationsfältet och fläta in i tid
      </text>

      {/* Scenen. Koordinaterna här inne är de verifierade (se filhuvudet). */}
      <g transform="translate(0 50)">
        {/* 2. Luckan — klammer ovanför vägen mellan bilen bakom (x 322) och bilen framför (x 540) */}
        <line x1="322" y1="56" x2="540" y2="56" className="stroke-progress-600" strokeWidth="2" />
        <line x1="322" y1="50" x2="322" y2="62" className="stroke-progress-600" strokeWidth="2" />
        <line x1="540" y1="50" x2="540" y2="62" className="stroke-progress-600" strokeWidth="2" />
        <text x="431" y="46" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
          Luckan: plats utan att andra måste bromsa
        </text>
        <Badge cx={300} cy={56} n={2} />

        {/* Motorvägen: vänster körfält y 70–130, höger körfält y 130–190 */}
        <rect x="20" y="70" width="580" height="120" className="fill-diagram-road" />
        <line x1="20" y1="70" x2="600" y2="70" className="stroke-diagram-edge" strokeWidth="2" />
        <line
          x1="20"
          y1="130"
          x2="600"
          y2="130"
          className="stroke-diagram-marking"
          strokeWidth="2"
          strokeDasharray="10 8"
        />
        {/* Kantlinje där inget fält finns */}
        <line x1="20" y1="190" x2="115" y2="190" className="stroke-diagram-edge" strokeWidth="2" />
        <line x1="480" y1="190" x2="600" y2="190" className="stroke-diagram-edge" strokeWidth="2" />

        {/* Accelerationsfältet y 190–235, smalnar av och tar slut vid x 480 */}
        <polygon points="130,190 480,190 400,235 130,235" className="fill-diagram-road" />
        <path d="M 130 235 L 400 235 L 480 190" className="fill-none stroke-diagram-edge" strokeWidth="2" />
        <line
          x1="130"
          y1="190"
          x2="480"
          y2="190"
          className="stroke-diagram-marking"
          strokeWidth="2"
          strokeDasharray="10 8"
        />
        <text x="138" y="218" className="fill-text-secondary text-[13px] font-medium">
          Accelerationsfält
        </text>

        {/* Påfartsvägen: kommer nedifrån (x 45–90) och svänger in i fältets början */}
        <path
          d="M 45 330 L 45 260 Q 45 190 115 190 L 130 190 L 130 235 Q 90 235 90 270 L 90 330 Z"
          className="fill-diagram-road"
        />
        <path
          d="M 45 330 L 45 260 Q 45 190 115 190 L 130 190"
          className="fill-none stroke-diagram-edge"
          strokeWidth="2"
        />
        <path d="M 90 330 L 90 270 Q 90 235 130 235" className="fill-none stroke-diagram-edge" strokeWidth="2" />

        {/* Fältet tar slut */}
        <line x1="480" y1="190" x2="480" y2="246" className="stroke-safety-600" strokeWidth="3" />
        <text x="486" y="262" className="fill-text-primary text-[14px] font-semibold">
          Fältet tar slut
        </text>

        {/* Trafik på motorvägen, i hög fart: en bil i vänster körfält, två i höger körfält runt luckan */}
        <Streaks x={150} cy={104} stroke="stroke-primary-600" />
        <Car
          x={150}
          y={92}
          w={42}
          h={24}
          heading="right"
          fill="url(#accel-stripes)"
          stroke="stroke-primary-600"
          nose="fill-primary-600"
        />
        <Streaks x={280} cy={154} stroke="stroke-primary-600" />
        <Car
          x={280}
          y={142}
          w={42}
          h={24}
          heading="right"
          fill="url(#accel-stripes)"
          stroke="stroke-primary-600"
          nose="fill-primary-600"
        />
        <Streaks x={540} cy={154} stroke="stroke-primary-600" />
        <Car
          x={540}
          y={142}
          w={42}
          h={24}
          heading="right"
          fill="url(#accel-stripes)"
          stroke="stroke-primary-600"
          nose="fill-primary-600"
        />

        {/* Inflätningen: från fältet upp i höger körfält, före fältets slut */}
        <path
          d="M 300 213 Q 365 213 385 175 L 408 154"
          className="fill-none stroke-progress-600"
          strokeWidth="2.5"
          strokeDasharray="7 5"
          markerEnd="url(#accel-arrow)"
        />

        {/* Din bil, tre lägen: på påfarten, i fältet, inflätad */}
        <Car
          x={53}
          y={280}
          w={28}
          h={40}
          heading="up"
          fill="url(#accel-dots)"
          stroke="stroke-attention-600"
          nose="fill-attention-600"
        />
        <Car
          x={258}
          y={201}
          w={42}
          h={24}
          heading="right"
          fill="url(#accel-dots)"
          stroke="stroke-attention-600"
          nose="fill-attention-600"
        />
        <Car
          x={410}
          y={142}
          w={42}
          h={24}
          heading="right"
          fill="url(#accel-dots)"
          stroke="stroke-attention-600"
          nose="fill-attention-600"
        />

        {/* 1. Låg fart på påfarten: kort fartpil */}
        <line
          x1="100"
          y1="326"
          x2="100"
          y2="300"
          className="stroke-progress-600"
          strokeWidth="2.5"
          markerEnd="url(#accel-arrow)"
        />
        <Badge cx={122} cy={286} n={1} />
        <text x="140" y="291" className="fill-text-primary text-[14px] font-semibold">
          Låg fart
        </text>
        <Pointer x1={111} y1={288} x2={85} y2={292} />

        {/* Längre fartpil i fältet */}
        <line
          x1="258"
          y1="256"
          x2="338"
          y2="256"
          className="stroke-progress-600"
          strokeWidth="2.5"
          markerEnd="url(#accel-arrow)"
        />
        <text x="348" y="261" className="fill-text-primary text-[14px] font-semibold">
          Accelerera bestämt
        </text>

        {/* 3. Inflätad i luckan */}
        <Badge cx={470} cy={154} n={3} />

        {/* Teckenförklaring, i eget hörn */}
        <g transform="translate(430, 280)">
          <rect width="14" height="14" fill="url(#accel-dots)" className="stroke-attention-600" strokeWidth="1.5" />
          <text x="22" y="12" className="fill-text-secondary text-[13px]">
            Din bil
          </text>
          <rect
            y="22"
            width="14"
            height="14"
            fill="url(#accel-stripes)"
            className="stroke-primary-600"
            strokeWidth="1.5"
          />
          <text x="22" y="34" className="fill-text-secondary text-[13px]">
            Trafik på motorvägen
          </text>
          <line x1="0" y1="51" x2="30" y2="51" className="stroke-progress-600" strokeWidth="2.5" markerEnd="url(#accel-arrow)" />
          <text x="38" y="56" className="fill-text-secondary text-[13px]">
            Rör sig nu
          </text>
          <line
            x1="0"
            y1="73"
            x2="30"
            y2="73"
            className="stroke-progress-600"
            strokeWidth="2.5"
            strokeDasharray="7 5"
            markerEnd="url(#accel-arrow)"
          />
          <text x="38" y="78" className="fill-text-secondary text-[13px]">
            Planerad väg
          </text>
        </g>
      </g>

      {/* Steg och regel */}
      <text x="20" y="436" className="fill-text-primary text-[16px] font-semibold">
        Så gör du
      </text>
      <Badge cx={30} cy={464} n={1} />
      <text x="48" y="469" className="fill-text-primary text-[15px] font-medium">
        Sök trafik på motorvägen tidigt och accelerera bestämt i fältet
      </text>
      <Badge cx={30} cy={494} n={2} />
      <text x="48" y="499" className="fill-text-primary text-[15px] font-medium">
        Välj en lucka där du får plats utan att andra måste bromsa
      </text>
      <Badge cx={30} cy={524} n={3} />
      <text x="48" y="529" className="fill-text-primary text-[15px] font-medium">
        Blinka, axelblick, fläta in — beslutet fattat innan fältet tar slut
      </text>
      <text x="20" y="556" className="fill-text-secondary text-[13px]">
        Med accelerationsfält har du inte väjningsplikt: anpassa farten till trafiken i körfältet
      </text>
      <text x="20" y="574" className="fill-text-secondary text-[13px]">
        och flytta över när det kan ske utan fara eller onödigt hinder (3 kap 23 §).
      </text>
      <image href={`${BASE_PATH}/signs/B1.svg`} x="20" y="586" width="24" height="24" />
      <text x="52" y="603" className="fill-text-secondary text-[13px]">
        Saknas accelerationsfält har du väjningsplikt (3 kap 21 §).
      </text>

      {/* Förklaringsruta: vad "plats utan att andra måste bromsa" betyder */}
      <rect x="20" y="624" width="580" height="130" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="36" y="650" className="fill-text-primary text-[15px] font-semibold">
        Luckan: plats utan att andra måste bromsa
      </text>

      {/* Panel A: luckan räcker, trafiken bakom behåller farten */}
      <rect x="36" y="664" width="250" height="30" className="fill-diagram-road" />
      <line x1="36" y1="664" x2="286" y2="664" className="stroke-diagram-edge" strokeWidth="1.5" />
      <line x1="36" y1="694" x2="286" y2="694" className="stroke-diagram-edge" strokeWidth="1.5" />
      <Streaks x={60} cy={679} stroke="stroke-primary-600" />
      <Car x={60} y={672} w={30} h={14} heading="right" fill="url(#accel-stripes)" stroke="stroke-primary-600" nose="fill-primary-600" />
      <Car x={130} y={672} w={30} h={14} heading="right" fill="url(#accel-dots)" stroke="stroke-attention-600" nose="fill-attention-600" />
      <Streaks x={200} cy={679} stroke="stroke-primary-600" />
      <Car x={200} y={672} w={30} h={14} heading="right" fill="url(#accel-stripes)" stroke="stroke-primary-600" nose="fill-primary-600" />
      <text x="36" y="716" className="fill-text-primary text-[14px] font-semibold">
        Luckan räcker:
      </text>
      <path d="M 150 712 l 6 6 l 12 -13" className="fill-none stroke-progress-600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="36" y="734" className="fill-text-primary text-[13px]">
        trafiken bakom behåller farten
      </text>

      {/* Panel B: luckan för liten, bilen bakom måste bromsa */}
      <rect x="330" y="664" width="250" height="30" className="fill-diagram-road" />
      <line x1="330" y1="664" x2="580" y2="664" className="stroke-diagram-edge" strokeWidth="1.5" />
      <line x1="330" y1="694" x2="580" y2="694" className="stroke-diagram-edge" strokeWidth="1.5" />
      <Car x={378} y={672} w={30} h={14} heading="right" fill="url(#accel-stripes)" stroke="stroke-primary-600" nose="fill-primary-600" />
      <BrakeLights x={378} y={672} h={14} />
      <Car x={416} y={672} w={30} h={14} heading="right" fill="url(#accel-dots)" stroke="stroke-attention-600" nose="fill-attention-600" />
      <Streaks x={486} cy={679} stroke="stroke-primary-600" />
      <Car x={486} y={672} w={30} h={14} heading="right" fill="url(#accel-stripes)" stroke="stroke-primary-600" nose="fill-primary-600" />
      <text x="330" y="716" className="fill-text-primary text-[14px] font-semibold">
        Luckan för liten:
      </text>
      <path d="M 470 710 L 482 722 M 482 710 L 470 722" className="stroke-safety-600" strokeWidth="3" strokeLinecap="round" />
      <text x="330" y="734" className="fill-text-primary text-[13px]">
        bilen bakom måste bromsa
      </text>
    </svg>
  );
}
