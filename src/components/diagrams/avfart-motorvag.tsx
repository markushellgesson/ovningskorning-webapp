/**
 * Avfart från motorväg (HWY-02) — retardationsfältet är platsen att ta ned
 * farten, inte det genomgående körfältet. Det är körteknik, inte en regel.
 * Att vända eller backa på motorväg är förbjudet (trafikförordningen 9 kap 1 §).
 *
 * Geometri: trafiken kör åt höger i bilden (ökande x). Förarens högra sida är
 * då bildens nedre kant (ökande y). Höger körfält är därför det nedre av de
 * två (y 130–190) och retardationsfältet ligger under det (y 190–235) innan
 * avfartsvägen viker av snett nedåt höger och in i avfartskurvan.
 *
 * Koordinaterna ovan är scenens egna. Scenen ligger i en grupp med
 * translate(0 50) som bara ger plats för rubriken; inga koordinater inne i
 * gruppen har flyttats.
 *
 * Vägmärkesbilden C31-5 i public/signs/ är ett svenskt officiellt vägmärke
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

/** Fartstreck bakom ett fordon som kör åt höger: x är bakkanten, cy mittlinjen.
 *  Långa streck = motorvägsfart, korta = farten på väg ned. */
function Streaks({ x, cy, stroke, size = 'long' }: { x: number; cy: number; stroke: string; size?: 'long' | 'short' }) {
  const [side, mid] = size === 'long' ? [18, 26] : [10, 16];
  return (
    <g className={stroke} strokeWidth="2" strokeLinecap="round">
      <line x1={x - 6} y1={cy - 6} x2={x - 6 - side} y2={cy - 6} />
      <line x1={x - 6} y1={cy} x2={x - 6 - mid} y2={cy} />
      <line x1={x - 6} y1={cy + 6} x2={x - 6 - side} y2={cy + 6} />
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

/** Bromspedal sedd från sidan: en enkel trapets. */
function BrakeGlyph({ x, y, stroke }: { x: number; y: number; stroke: string }) {
  return (
    <path
      d={`M ${x} ${y} L ${x + 26} ${y} L ${x + 21} ${y + 14} L ${x + 5} ${y + 14} Z`}
      className={`fill-none ${stroke}`}
      strokeWidth="2"
    />
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

export function AvfartMotorvagDiagram() {
  return (
    <svg
      viewBox="0 0 640 830"
      className="w-full max-w-2xl mx-auto"
      role="img"
      aria-labelledby="exit-title exit-desc"
    >
      <title id="exit-title">Avfart från motorväg med retardationsfält</title>
      <desc id="exit-desc">
        Motorväg sedd uppifrån, trafiken kör åt höger. Det högra körfältet är det nedre av de två.
        Under det börjar ett retardationsfält som en bit längre fram viker av snett nedåt höger och
        övergår i en avfartskurva. Din bil har prickmönster och en fylld nos som visar
        färdriktningen; den visas i tre lägen. Först, markerad 1, i det högra körfältet med långa
        fartstreck bakom sig, en lång fartpil framför sig och en bil med diagonalt randmönster tätt
        bakom: här behåller du motorvägsfarten, och under körfältet står en genomkryssad
        bromspedal med texten att du inte bromsar här. Sedan, markerad 2, helt inne i
        retardationsfältet med korta fartstreck, en kort fartpil och en grön bromspedal utan kryss:
        här sänker du farten, först när hela bilen är i fältet. Till sist, markerad 3, på den sneda
        avfartsvägen med farten nere innan kurvan börjar, intill vägmärket C31-5 som visar
        avfartens skyltade hastighet. En teckenförklaring nere till vänster i bilden: prickmönster
        är din bil, randmönster är annan trafik, och en längre fartpil betyder högre fart. Texten
        under bilden: ligg i höger körfält i god tid, bromsa först i retardationsfältet, läs
        avfartens skylt och kontrollera hastighetsmätaren efteråt. Missar du avfarten kör du till
        nästa, eftersom det är förbjudet att vända och backa på motorväg (9 kap 1 §). En ruta
        längst ned visar två små scenarier: bromsar du i retardationsfältet behåller bilen bakom
        farten, markerat med en bock; bromsar du i körfältet måste bilen bakom bromsa, markerat med
        ett kryss.
      </desc>

      <defs>
        <pattern id="exit-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
        </pattern>
        <pattern id="exit-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="2" />
        </pattern>
        <marker
          id="exit-arrow"
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
        Avfart från motorväg
      </text>
      <text x="20" y="58" className="fill-text-secondary text-[14px]">
        Farten ned i retardationsfältet — inte i det genomgående körfältet
      </text>

      {/* Scenen. Koordinaterna här inne är de verifierade (se filhuvudet). */}
      <g transform="translate(0 50)">
        {/* Motorvägen: vänster körfält y 70–130, höger körfält y 130–190 */}
        <rect x="20" y="70" width="600" height="120" className="fill-diagram-road" />
        <line x1="20" y1="70" x2="620" y2="70" className="stroke-diagram-edge" strokeWidth="2" />
        <line
          x1="20"
          y1="130"
          x2="620"
          y2="130"
          className="stroke-diagram-marking"
          strokeWidth="2"
          strokeDasharray="10 8"
        />
        <line x1="20" y1="190" x2="250" y2="190" className="stroke-diagram-edge" strokeWidth="2" />
        <line x1="470" y1="190" x2="620" y2="190" className="stroke-diagram-edge" strokeWidth="2" />

        {/* Retardationsfältet y 190–235: börjar vid x 250, full bredd från x 300 till x 470 */}
        <polygon points="250,190 470,190 470,235 300,235" className="fill-diagram-road" />
        <path d="M 250 190 L 300 235 L 470 235" className="fill-none stroke-diagram-edge" strokeWidth="2" />
        <line
          x1="250"
          y1="190"
          x2="470"
          y2="190"
          className="stroke-diagram-marking"
          strokeWidth="2"
          strokeDasharray="10 8"
        />
        <text x="300" y="252" className="fill-text-secondary text-[13px] font-medium">
          Retardationsfält
        </text>

        {/* Avfartsvägen: snett nedåt höger från fältets slut, sedan kurva åt höger ut ur bilden */}
        <path
          d="M 470 190 L 560 280 Q 600 320 640 330 L 640 372 Q 570 360 528 312 L 470 235 Z"
          className="fill-diagram-road"
        />
        <path d="M 470 190 L 560 280 Q 600 320 640 330" className="fill-none stroke-diagram-edge" strokeWidth="2" />
        <path d="M 470 235 L 528 312 Q 570 360 640 372" className="fill-none stroke-diagram-edge" strokeWidth="2" />
        <text x="590" y="300" className="fill-text-secondary text-[13px]">
          Kurvan
        </text>

        {/* Annan trafik i motorvägsfart: bil tätt bakom i höger körfält, bil i vänster körfält */}
        <Streaks x={40} cy={164} stroke="stroke-primary-600" size="short" />
        <Car
          x={40}
          y={152}
          w={42}
          h={24}
          heading="right"
          fill="url(#exit-stripes)"
          stroke="stroke-primary-600"
          nose="fill-primary-600"
        />
        <Streaks x={300} cy={104} stroke="stroke-primary-600" />
        <Car
          x={300}
          y={92}
          w={42}
          h={24}
          heading="right"
          fill="url(#exit-stripes)"
          stroke="stroke-primary-600"
          nose="fill-primary-600"
        />

        {/* 1. Din bil i höger körfält med motorvägsfart: långa fartstreck, lång fartpil */}
        <Streaks x={130} cy={164} stroke="stroke-attention-600" />
        <Car
          x={130}
          y={152}
          w={42}
          h={24}
          heading="right"
          fill="url(#exit-dots)"
          stroke="stroke-attention-600"
          nose="fill-attention-600"
        />
        <line
          x1="178"
          y1="164"
          x2="240"
          y2="164"
          className="stroke-progress-600"
          strokeWidth="2.5"
          markerEnd="url(#exit-arrow)"
        />
        <Badge cx={150} cy={52} n={1} />
        <Pointer x1={150} y1={63} x2={150} y2={148} />

        {/* Bromsa inte här: genomkryssad pedal under det genomgående körfältet */}
        <g transform="translate(30, 208)">
          <BrakeGlyph x={0} y={0} stroke="stroke-text-tertiary" />
          <line x1="-4" y1="-4" x2="30" y2="18" className="stroke-safety-600" strokeWidth="2.5" />
          <text x="36" y="12" className="fill-text-primary text-[14px] font-semibold">
            Inte här: behåll motorvägsfarten
          </text>
        </g>

        {/* 2. Din bil helt inne i retardationsfältet: korta fartstreck, kort fartpil */}
        <Streaks x={360} cy={213} stroke="stroke-attention-600" size="short" />
        <Car
          x={360}
          y={201}
          w={42}
          h={24}
          heading="right"
          fill="url(#exit-dots)"
          stroke="stroke-attention-600"
          nose="fill-attention-600"
        />
        <line
          x1="408"
          y1="213"
          x2="436"
          y2="213"
          className="stroke-progress-600"
          strokeWidth="2.5"
          markerEnd="url(#exit-arrow)"
        />
        <Badge cx={322} cy={213} n={2} />

        {/* Sänk farten här: pedal utan kryss under fältet */}
        <g transform="translate(300, 268)">
          <BrakeGlyph x={0} y={0} stroke="stroke-progress-600" />
          <text x="36" y="6" className="fill-text-primary text-[14px] font-semibold">
            Sänk farten här:
          </text>
          <text x="36" y="24" className="fill-text-secondary text-[13px]">
            hela bilen i fältet först
          </text>
        </g>

        {/* 3. Din bil på avfartsvägen med farten nere innan kurvan */}
        <g transform="rotate(45 503 250)">
          <Car
            x={482}
            y={238}
            w={42}
            h={24}
            heading="right"
            fill="url(#exit-dots)"
            stroke="stroke-attention-600"
            nose="fill-attention-600"
          />
          <line
            x1="528"
            y1="250"
            x2="546"
            y2="250"
            className="stroke-progress-600"
            strokeWidth="2.5"
            markerEnd="url(#exit-arrow)"
          />
        </g>
        {/* Etiketten ligger i den fria ytan ovanför avfartsvägen, pekaren går
            ned till bilens övre långsida. */}
        <Badge cx={530} cy={200} n={3} />
        <text x="546" y="196" className="fill-text-primary text-[14px] font-semibold">
          Farten nere
        </text>
        <text x="546" y="214" className="fill-text-secondary text-[13px]">
          innan kurvan
        </text>
        <Pointer x1={530} y1={211} x2={511} y2={236} />

        {/* C31-5: avfartens skyltade hastighet */}
        <image href={`${BASE_PATH}/signs/C31-5.svg`} x="360" y="300" width="46" height="46" />
        <text x="383" y="366" textAnchor="middle" className="fill-text-secondary text-[13px]">
          Avfartens hastighet
        </text>

        {/* Teckenförklaring, i eget hörn */}
        <g transform="translate(20, 262)">
          <rect width="14" height="14" fill="url(#exit-dots)" className="stroke-attention-600" strokeWidth="1.5" />
          <text x="22" y="12" className="fill-text-secondary text-[13px]">
            Din bil
          </text>
          <rect
            y="22"
            width="14"
            height="14"
            fill="url(#exit-stripes)"
            className="stroke-primary-600"
            strokeWidth="1.5"
          />
          <text x="22" y="34" className="fill-text-secondary text-[13px]">
            Annan trafik
          </text>
          <line x1="0" y1="51" x2="30" y2="51" className="stroke-progress-600" strokeWidth="2.5" markerEnd="url(#exit-arrow)" />
          <text x="38" y="56" className="fill-text-secondary text-[13px]">
            Fart nu — längre pil, högre fart
          </text>
        </g>
      </g>

      {/* Steg */}
      <text x="20" y="452" className="fill-text-primary text-[16px] font-semibold">
        Så gör du
      </text>
      <Badge cx={30} cy={480} n={1} />
      <text x="48" y="485" className="fill-text-primary text-[15px] font-medium">
        Höger körfält i god tid — behåll motorvägsfarten
      </text>
      <text x="48" y="504" className="fill-text-secondary text-[13px]">
        trafiken bakom räknar med det
      </text>
      <Badge cx={30} cy={532} n={2} />
      <text x="48" y="537" className="fill-text-primary text-[15px] font-medium">
        Först när hela bilen är i retardationsfältet:
      </text>
      <text x="48" y="556" className="fill-text-secondary text-[13px]">
        släpp gasen och bromsa ned
      </text>
      <Badge cx={30} cy={584} n={3} />
      <text x="48" y="589" className="fill-text-primary text-[15px] font-medium">
        Läs avfartens skylt, ha farten nere innan kurvan
      </text>
      <text x="48" y="608" className="fill-text-secondary text-[13px]">
        kontrollera mätaren efteråt
      </text>
      <text x="20" y="640" className="fill-text-secondary text-[13px]">
        Missar du avfarten: kör till nästa. Att vända eller backa på motorväg är förbjudet
      </text>
      <text x="20" y="658" className="fill-text-secondary text-[13px]">
        (trafikförordningen 9 kap 1 §).
      </text>

      {/* Förklaringsruta: var du bromsar avgör vad bilen bakom måste göra */}
      <rect x="20" y="680" width="600" height="130" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="36" y="706" className="fill-text-primary text-[15px] font-semibold">
        Var du bromsar avgör vad bilen bakom måste göra:
      </text>

      {/* Panel A: bromsar i retardationsfältet, bilen bakom behåller farten */}
      <rect x="36" y="720" width="260" height="24" className="fill-diagram-road" />
      <polygon points="150,744 296,744 296,764 168,764" className="fill-diagram-road" />
      <line x1="36" y1="720" x2="296" y2="720" className="stroke-diagram-edge" strokeWidth="1.5" />
      <line x1="36" y1="744" x2="150" y2="744" className="stroke-diagram-edge" strokeWidth="1.5" />
      <line x1="150" y1="744" x2="296" y2="744" className="stroke-diagram-marking" strokeWidth="1.5" strokeDasharray="6 5" />
      <path d="M 150 744 L 168 764 L 296 764" className="fill-none stroke-diagram-edge" strokeWidth="1.5" />
      <Streaks x={60} cy={732} stroke="stroke-primary-600" />
      <Car x={60} y={725} w={30} h={14} heading="right" fill="url(#exit-stripes)" stroke="stroke-primary-600" nose="fill-primary-600" />
      <Car x={200} y={747} w={30} h={14} heading="right" fill="url(#exit-dots)" stroke="stroke-attention-600" nose="fill-attention-600" />
      <BrakeLights x={200} y={747} h={14} />
      <text x="36" y="784" className="fill-text-primary text-[14px] font-semibold">
        Bromsar i retardationsfältet:
      </text>
      <path d="M 262 782 l 6 6 l 12 -13" className="fill-none stroke-progress-600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="36" y="802" className="fill-text-primary text-[13px]">
        bilen bakom behåller farten
      </text>

      {/* Panel B: bromsar i körfältet, bilen bakom måste bromsa */}
      <rect x="330" y="720" width="260" height="24" className="fill-diagram-road" />
      <polygon points="444,744 590,744 590,764 462,764" className="fill-diagram-road" />
      <line x1="330" y1="720" x2="590" y2="720" className="stroke-diagram-edge" strokeWidth="1.5" />
      <line x1="330" y1="744" x2="444" y2="744" className="stroke-diagram-edge" strokeWidth="1.5" />
      <line x1="444" y1="744" x2="590" y2="744" className="stroke-diagram-marking" strokeWidth="1.5" strokeDasharray="6 5" />
      <path d="M 444 744 L 462 764 L 590 764" className="fill-none stroke-diagram-edge" strokeWidth="1.5" />
      <Car x={400} y={725} w={30} h={14} heading="right" fill="url(#exit-stripes)" stroke="stroke-primary-600" nose="fill-primary-600" />
      <BrakeLights x={400} y={725} h={14} />
      <Car x={440} y={725} w={30} h={14} heading="right" fill="url(#exit-dots)" stroke="stroke-attention-600" nose="fill-attention-600" />
      <BrakeLights x={440} y={725} h={14} />
      <text x="330" y="784" className="fill-text-primary text-[14px] font-semibold">
        Bromsar i körfältet:
      </text>
      <path d="M 490 776 L 502 788 M 502 776 L 490 788" className="stroke-safety-600" strokeWidth="3" strokeLinecap="round" />
      <text x="330" y="802" className="fill-text-primary text-[13px]">
        bilen bakom måste bromsa
      </text>
    </svg>
  );
}
