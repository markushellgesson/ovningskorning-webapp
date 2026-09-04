/**
 * Påfart motorväg (HWY-01) — accelerationsfältet: anpassa farten, välj luckan
 * och fläta in innan fältet tar slut. Trafikförordningen 3 kap 23 § (med
 * accelerationsfält) och 3 kap 21 § (utan).
 *
 * Geometri: trafiken kör åt höger i bilden (ökande x). Förarens högra sida är
 * då bildens nedre kant (ökande y). Höger körfält är därför det nedre av de
 * två (y 130–190) och accelerationsfältet ligger under det (y 190–235).
 *
 * Vägmärkesbilden B1 i public/signs/ är ett svenskt officiellt vägmärke
 * (allmän handling) och fri att återge.
 */

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

export function AccelerationsfaltDiagram() {
  return (
    <svg
      viewBox="0 0 620 480"
      className="w-full max-w-2xl mx-auto"
      role="img"
      aria-labelledby="accel-title accel-desc"
    >
      <title id="accel-title">Påfart motorväg med accelerationsfält</title>
      <desc id="accel-desc">
        Motorväg sedd uppifrån, trafiken kör åt höger. Det högra körfältet är det nedre av de två,
        och under det ligger accelerationsfältet som en påfartsväg leder in i nedifrån vänster. Din
        bil har prickmönster och en fylld nos som visar färdriktningen; den visas i tre lägen. Först
        på påfarten i låg fart. Sedan mitt i accelerationsfältet med en pil framför sig märkt
        accelerera bestämt. Till sist inflätad i det högra körfältet, mitt i en lucka mellan två
        bilar med diagonalt randmönster som kör på motorvägen. En klammer ovanför vägen markerar
        luckan: plats utan att andra måste bromsa. En streckad grön pil med pilspets visar
        inflätningen från fältet upp i körfältet, och den sker före en röd markering där fältet tar
        slut. Text nederst: med accelerationsfält har du inte väjningsplikt utan anpassar farten
        till trafiken och flyttar över när det kan ske utan fara eller onödigt hinder (3 kap 23 §).
        Saknas accelerationsfält har du väjningsplikt (3 kap 21 §), vägmärke B1.
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

      <text x="310" y="22" textAnchor="middle" className="fill-text-primary text-[15px] font-semibold">
        Påfart: anpassa farten i accelerationsfältet och fläta in i tid
      </text>

      {/* Luckan — klammer ovanför vägen mellan bilen bakom (x 322) och bilen framför (x 540) */}
      <line x1="322" y1="56" x2="540" y2="56" className="stroke-progress-600" strokeWidth="2" />
      <line x1="322" y1="50" x2="322" y2="62" className="stroke-progress-600" strokeWidth="2" />
      <line x1="540" y1="50" x2="540" y2="62" className="stroke-progress-600" strokeWidth="2" />
      <text x="431" y="46" textAnchor="middle" className="fill-text-primary text-[13px] font-medium">
        Luckan: plats utan att andra måste bromsa
      </text>
      <circle cx="300" cy="56" r="10" className="fill-none stroke-text-tertiary" strokeWidth="1.5" />
      <text x="300" y="61" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        2
      </text>

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
      <text x="138" y="218" className="fill-text-primary text-[13px] font-medium">
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
      <text x="486" y="262" className="fill-text-primary text-[13px] font-medium">
        Fältet tar slut
      </text>

      {/* Trafik på motorvägen: en bil i vänster körfält, två i höger körfält runt luckan */}
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

      {/* Fartpilar: kort på påfarten, längre i fältet */}
      <line
        x1="100"
        y1="322"
        x2="100"
        y2="296"
        className="stroke-progress-600"
        strokeWidth="2.5"
        markerEnd="url(#accel-arrow)"
      />
      <text x="108" y="312" className="fill-text-secondary text-[13px]">
        Låg fart
      </text>
      <circle cx="108" cy="262" r="10" className="fill-none stroke-text-tertiary" strokeWidth="1.5" />
      <text x="108" y="267" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        1
      </text>

      <line
        x1="258"
        y1="256"
        x2="338"
        y2="256"
        className="stroke-progress-600"
        strokeWidth="2.5"
        markerEnd="url(#accel-arrow)"
      />
      <text x="348" y="261" className="fill-text-secondary text-[13px]">
        Accelerera bestämt
      </text>

      <circle cx="470" cy="154" r="10" className="fill-none stroke-text-tertiary" strokeWidth="1.5" />
      <text x="470" y="159" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        3
      </text>

      {/* Teckenförklaring */}
      <g transform="translate(430, 288)">
        <rect width="16" height="16" fill="url(#accel-dots)" className="stroke-attention-600" strokeWidth="1.5" />
        <text x="22" y="12" className="fill-text-secondary text-[13px]">
          Din bil
        </text>
        <rect
          y="22"
          width="16"
          height="16"
          fill="url(#accel-stripes)"
          className="stroke-primary-600"
          strokeWidth="1.5"
        />
        <text x="22" y="34" className="fill-text-secondary text-[13px]">
          Trafik på motorvägen
        </text>
      </g>

      {/* Steg och regel */}
      <text x="20" y="356" className="fill-text-primary text-[13px] font-medium">
        1. Sök trafik på motorvägen tidigt och accelerera bestämt i fältet
      </text>
      <text x="20" y="376" className="fill-text-primary text-[13px] font-medium">
        2. Välj en lucka där du får plats utan att andra måste bromsa
      </text>
      <text x="20" y="396" className="fill-text-primary text-[13px] font-medium">
        3. Blinka, axelblick, fläta in — beslutet fattat innan fältet tar slut
      </text>
      <text x="20" y="422" className="fill-text-secondary text-[13px]">
        Med accelerationsfält har du inte väjningsplikt: anpassa farten till trafiken i körfältet
      </text>
      <text x="20" y="440" className="fill-text-secondary text-[13px]">
        och flytta över när det kan ske utan fara eller onödigt hinder (3 kap 23 §).
      </text>
      <image href="/signs/B1.svg" x="20" y="450" width="24" height="24" />
      <text x="52" y="467" className="fill-text-secondary text-[13px]">
        Saknas accelerationsfält har du väjningsplikt (3 kap 21 §).
      </text>
    </svg>
  );
}
