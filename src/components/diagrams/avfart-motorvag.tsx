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

export function AvfartMotorvagDiagram() {
  return (
    <svg
      viewBox="0 0 640 490"
      className="w-full max-w-2xl mx-auto"
      role="img"
      aria-labelledby="exit-title exit-desc"
    >
      <title id="exit-title">Avfart från motorväg med retardationsfält</title>
      <desc id="exit-desc">
        Motorväg sedd uppifrån, trafiken kör åt höger. Det högra körfältet är det nedre av de två.
        Under det börjar ett retardationsfält som en bit längre fram viker av snett nedåt höger och
        övergår i en avfartskurva. Din bil har prickmönster och en fylld nos som visar
        färdriktningen; den visas i tre lägen. Först i det högra körfältet med en lång fartpil framför
        sig och en bil med diagonalt randmönster tätt bakom: här behåller du motorvägsfarten, och
        under körfältet står en genomkryssad bromspedal med texten att du inte bromsar här. Sedan
        helt inne i retardationsfältet med en kort fartpil och en grön bromspedal utan kryss: här
        sänker du farten, först när hela bilen är i fältet. Till sist på den sneda avfartsvägen med
        farten nere innan kurvan börjar, intill vägmärket C31-5 som visar avfartens skyltade
        hastighet. Texten nederst: ligg i höger körfält i god tid, bromsa först i retardationsfältet,
        läs avfartens skylt och kontrollera hastighetsmätaren efteråt. Missar du avfarten kör du till
        nästa, eftersom det är förbjudet att vända och backa på motorväg (9 kap 1 §).
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

      <text x="320" y="22" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Avfart: farten ned i retardationsfältet — inte i det genomgående körfältet
      </text>

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
      <text x="308" y="228" className="fill-text-primary text-[13px] font-medium">
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

      {/* Annan trafik: bil tätt bakom i höger körfält, bil i vänster körfält */}
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

      {/* Din bil, läge 1: i höger körfält med motorvägsfart (lång fartpil) */}
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
      <circle cx="150" cy="52" r="10" className="fill-none stroke-text-tertiary" strokeWidth="1.5" />
      <text x="150" y="57" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        1
      </text>

      {/* Bromsa inte här: genomkryssad pedal under det genomgående körfältet */}
      <g transform="translate(30, 208)">
        <BrakeGlyph x={0} y={0} stroke="stroke-text-tertiary" />
        <line x1="-4" y1="-4" x2="30" y2="18" className="stroke-safety-600" strokeWidth="2.5" />
        <text x="36" y="12" className="fill-text-primary text-[13px] font-medium">
          Inte här: behåll motorvägsfarten
        </text>
      </g>

      {/* Din bil, läge 2: hela bilen i retardationsfältet (kort fartpil) */}
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
      <circle cx="280" cy="212" r="10" className="fill-none stroke-text-tertiary" strokeWidth="1.5" />
      <text x="280" y="217" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        2
      </text>

      {/* Sänk farten här: pedal utan kryss under fältet */}
      <g transform="translate(300, 248)">
        <BrakeGlyph x={0} y={0} stroke="stroke-progress-600" />
        <text x="36" y="6" className="fill-text-primary text-[13px] font-medium">
          Sänk farten här:
        </text>
        <text x="36" y="24" className="fill-text-secondary text-[13px]">
          hela bilen i fältet först
        </text>
      </g>

      {/* Din bil, läge 3: på avfartsvägen med farten nere innan kurvan */}
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
      <circle cx="440" cy="300" r="10" className="fill-none stroke-text-tertiary" strokeWidth="1.5" />
      <text x="440" y="305" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        3
      </text>
      <text x="456" y="296" className="fill-text-primary text-[13px] font-medium">
        Farten nere
      </text>
      <text x="456" y="314" className="fill-text-secondary text-[13px]">
        innan kurvan
      </text>

      {/* C31-5: avfartens skyltade hastighet */}
      <image href={`${BASE_PATH}/signs/C31-5.svg`} x="360" y="300" width="46" height="46" />
      <text x="383" y="366" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Avfartens hastighet
      </text>

      {/* Teckenförklaring */}
      <g transform="translate(20, 262)">
        <rect width="16" height="16" fill="url(#exit-dots)" className="stroke-attention-600" strokeWidth="1.5" />
        <text x="22" y="12" className="fill-text-secondary text-[13px]">
          Din bil
        </text>
        <rect
          y="22"
          width="16"
          height="16"
          fill="url(#exit-stripes)"
          className="stroke-primary-600"
          strokeWidth="1.5"
        />
        <text x="22" y="34" className="fill-text-secondary text-[13px]">
          Annan trafik
        </text>
      </g>

      {/* Steg */}
      <text x="20" y="396" className="fill-text-primary text-[13px] font-medium">
        1. Höger körfält i god tid — behåll motorvägsfarten, trafiken bakom räknar med det
      </text>
      <text x="20" y="416" className="fill-text-primary text-[13px] font-medium">
        2. Först när hela bilen är i retardationsfältet: släpp gasen och bromsa ned
      </text>
      <text x="20" y="436" className="fill-text-primary text-[13px] font-medium">
        3. Läs avfartens skylt, ha farten nere innan kurvan — kontrollera mätaren efteråt
      </text>
      <text x="20" y="462" className="fill-text-secondary text-[13px]">
        Missar du avfarten: kör till nästa. Att vända eller backa på motorväg är förbjudet
      </text>
      <text x="20" y="480" className="fill-text-secondary text-[13px]">
        (trafikförordningen 9 kap 1 §).
      </text>
    </svg>
  );
}
