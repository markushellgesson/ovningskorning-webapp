/**
 * Möte på smal väg (RUR-03) — hindret, vem som stannar och sidoavståndet.
 * Trafikförordningen 3 kap 30 §: håll till höger och lämna betryggande avstånd
 * i sidled (första stycket); den som har hindret på sin sida ska stanna, om
 * det behövs för att den mötande ska kunna passera (andra stycket). Det är
 * villkorat och formuleras därför som "stanna vid behov" genomgående.
 *
 * Geometri: din bil kör UPPÅT i bilden (minskande y). Sedd uppifrån är då
 * förarens högra sida bildens högra sida, alltså vägens högra halva
 * (x 260–305). Den mötande kör NEDÅT (ökande y); dess högra sida är bildens
 * vänstra, alltså vägens vänstra halva (x 215–260).
 *
 * Koordinaterna ovan är panelernas egna. Övre panelen ligger i en grupp med
 * translate(20 76), nedre i translate(20 456); grupperna ger bara plats för
 * rubrik och luft. Inga koordinater inne i panelerna har flyttats.
 */

type Heading = 'up' | 'down';

function nosePoints(x: number, y: number, w: number, h: number, heading: Heading): string {
  return heading === 'up'
    ? `${x + 4},${y + 9} ${x + w / 2},${y + 2} ${x + w - 4},${y + 9}`
    : `${x + 4},${y + h - 9} ${x + w / 2},${y + h - 2} ${x + w - 4},${y + h - 9}`;
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

/** Den smala vägen: körbana x 215–305, mittlinje x 260. */
function Road() {
  return (
    <g>
      <rect x="215" y="40" width="90" height="305" className="fill-diagram-road" />
      <line x1="215" y1="40" x2="215" y2="345" className="stroke-diagram-edge" strokeWidth="2" />
      <line x1="305" y1="40" x2="305" y2="345" className="stroke-diagram-edge" strokeWidth="2" />
      <line
        x1="260"
        y1="40"
        x2="260"
        y2="345"
        className="stroke-diagram-marking"
        strokeWidth="2"
        strokeDasharray="8 8"
      />
    </g>
  );
}

export function MoteSmalVagDiagram() {
  return (
    <svg
      viewBox="0 0 560 900"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="meet-title meet-desc"
    >
      <title id="meet-title">Möte vid hinder på smal väg</title>
      <desc id="meet-desc">
        Två bilder av en smal väg sedd uppifrån, staplade över varandra. Din bil har prickmönster
        och en fylld nos som pekar uppåt: du kör uppåt i bilden, så din högra sida är vägens högra
        halva. Den mötande bilen har diagonalt randmönster och nosen nedåt: den kör nedåt, så dess
        högra sida är vägens vänstra halva. Hindret, till exempel en parkerad bil, har vågrätt
        streckmönster. Övre bilden: hindret står i vägens högra halva, på din sida. Din bil står
        stilla i högra halvan en bit före hindret med texten du stannar vid behov, och den mötande
        kör förbi i sin vänstra halva längs en streckad grön pil. En prickad siktlinje mellan bilarna
        visar att ni ser varandra tidigt, och en avsmalnande kil intill vägen visar att du tar ned
        farten i god tid. Nedre bilden: hindret står i vägens vänstra halva, på den mötandes sida.
        Nu är det den mötande som står stilla före hindret med texten den mötande stannar vid
        behov, medan du kör förbi i din högra halva längs en streckad grön pil, med en markerad lucka
        i sidled mellan hindret och din bil: betryggande avstånd i sidled. Etiketterna pekar med
        tunna linjer på det de avser. Texten nederst: håll till höger och lämna betryggande avstånd
        i sidled (3 kap 30 §). Har du hindret på din sida ska du stanna om det behövs för att den
        mötande ska kunna passera (3 kap 30 § andra stycket).
      </desc>

      <defs>
        <pattern id="meet-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
        </pattern>
        <pattern id="meet-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="2" />
        </pattern>
        <pattern id="meet-bars" patternUnits="userSpaceOnUse" width="8" height="6">
          <line x1="0" y1="3" x2="8" y2="3" className="stroke-safety-600" strokeWidth="2" />
        </pattern>
        <marker
          id="meet-arrow"
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
      <text x="20" y="38" className="fill-text-primary text-[22px] font-bold">
        Möte vid hinder på smal väg
      </text>
      <text x="20" y="60" className="fill-text-secondary text-[14px]">
        Vy uppifrån. Du kör uppåt i bilden, den mötande nedåt.
      </text>

      {/* Övre bilden: hindret på din sida */}
      <g transform="translate(20 76)">
        <text x="0" y="24" className="fill-text-primary text-[16px] font-semibold">
          Hindret på din sida: du stannar vid behov
        </text>
        <Road />

        {/* Teckenförklaring, i eget hörn */}
        <g>
          <rect x="330" y="40" width="14" height="14" fill="url(#meet-dots)" className="stroke-attention-600" strokeWidth="1.5" />
          <text x="352" y="52" className="fill-text-secondary text-[13px]">
            Din bil
          </text>
          <rect x="330" y="62" width="14" height="14" fill="url(#meet-stripes)" className="stroke-primary-600" strokeWidth="1.5" />
          <text x="352" y="74" className="fill-text-secondary text-[13px]">
            Mötande
          </text>
          <rect x="330" y="84" width="14" height="14" fill="url(#meet-bars)" className="stroke-safety-600" strokeWidth="1.5" />
          <text x="352" y="96" className="fill-text-secondary text-[13px]">
            Hinder
          </text>
          <line
            x1="330"
            y1="113"
            x2="360"
            y2="113"
            className="stroke-progress-600"
            strokeWidth="2.5"
            strokeDasharray="7 5"
            markerEnd="url(#meet-arrow)"
          />
          <text x="368" y="118" className="fill-text-secondary text-[13px]">
            Väg förbi hindret
          </text>
        </g>

        {/* Mötande, kör nedåt i vägens vänstra halva (x 220–255) */}
        <Car
          x={220}
          y={60}
          w={35}
          h={40}
          heading="down"
          fill="url(#meet-stripes)"
          stroke="stroke-primary-600"
          nose="fill-primary-600"
        />
        <text x="20" y="74" className="fill-text-primary text-[14px] font-semibold">
          Mötande
        </text>
        <text x="20" y="92" className="fill-text-secondary text-[13px]">
          kör nedåt
        </text>
        <Pointer x1={82} y1={78} x2={218} y2={80} />

        {/* Den mötandes väg förbi hindret, i sin egen halva */}
        <line
          x1="237"
          y1="104"
          x2="237"
          y2="322"
          className="stroke-progress-600"
          strokeWidth="2.5"
          strokeDasharray="7 5"
          markerEnd="url(#meet-arrow)"
        />
        <text x="20" y="300" className="fill-text-secondary text-[13px]">
          Den mötande
        </text>
        <text x="20" y="318" className="fill-text-secondary text-[13px]">
          passerar
        </text>
        <Pointer x1={100} y1={304} x2={233} y2={298} />

        {/* Hindret i vägens högra halva (x 265–300) — din högra sida när du kör uppåt */}
        <rect
          x="265"
          y="130"
          width="35"
          height="65"
          fill="url(#meet-bars)"
          className="stroke-safety-600"
          strokeWidth="2"
        />
        <text x="340" y="158" className="fill-text-primary text-[14px] font-semibold">
          Hinder på
        </text>
        <text x="340" y="176" className="fill-text-primary text-[14px] font-semibold">
          din högra sida
        </text>
        <Pointer x1={334} y1={162} x2={302} y2={162} />

        {/* Din bil, stannad före hindret i samma halva (x 265–300), nosen uppåt */}
        <Car
          x={265}
          y={245}
          w={35}
          h={40}
          heading="up"
          fill="url(#meet-dots)"
          stroke="stroke-attention-600"
          nose="fill-attention-600"
        />
        <Badge cx={350} cy={258} n={3} />
        <text x="368" y="263" className="fill-text-primary text-[15px] font-semibold">
          Du stannar
        </text>
        <text x="368" y="282" className="fill-text-primary text-[15px] font-semibold">
          vid behov
        </text>
        <Pointer x1={338} y1={262} x2={302} y2={262} />

        {/* Siktlinje: ni ser varandra tidigt */}
        <line
          x1="266"
          y1="245"
          x2="240"
          y2="102"
          className="stroke-progress-600"
          strokeWidth="1.5"
          strokeDasharray="3 4"
        />
        <Badge cx={30} cy={154} n={1} />
        <text x="46" y="159" className="fill-text-primary text-[15px] font-semibold">
          Ni ser varandra
        </text>
        <text x="46" y="177" className="fill-text-primary text-[15px] font-semibold">
          tidigt
        </text>
        <Pointer x1={165} y1={162} x2={252} y2={172} />

        {/* Farten ned i god tid: avsmalnande kil i färdriktningen */}
        <polygon points="312,340 324,340 318,295" className="fill-progress-600" />
        <Badge cx={350} cy={316} n={2} />
        <text x="368" y="321" className="fill-text-primary text-[14px] font-semibold">
          Farten ned
        </text>
        <text x="368" y="339" className="fill-text-secondary text-[13px]">
          i god tid
        </text>
      </g>

      {/* Nedre bilden: hindret på den mötandes sida */}
      <g transform="translate(20 456)">
        <text x="0" y="24" className="fill-text-primary text-[16px] font-semibold">
          Hindret på den mötandes sida: den mötande stannar vid behov
        </text>
        <Road />

        {/* Hindret i vägens vänstra halva (x 220–250) — den mötandes högra sida när den kör nedåt */}
        <rect
          x="220"
          y="130"
          width="30"
          height="65"
          fill="url(#meet-bars)"
          className="stroke-safety-600"
          strokeWidth="2"
        />
        <text x="20" y="158" className="fill-text-primary text-[14px] font-semibold">
          Hinder på den
        </text>
        <text x="20" y="176" className="fill-text-primary text-[14px] font-semibold">
          mötandes sida
        </text>
        <Pointer x1={126} y1={162} x2={218} y2={162} />

        {/* Mötande, stannad före hindret i sin halva (x 220–255), nosen nedåt */}
        <Car
          x={220}
          y={60}
          w={35}
          h={40}
          heading="down"
          fill="url(#meet-stripes)"
          stroke="stroke-primary-600"
          nose="fill-primary-600"
        />
        <Badge cx={30} cy={72} n={1} />
        <text x="46" y="77" className="fill-text-primary text-[15px] font-semibold">
          Den mötande
        </text>
        <text x="46" y="96" className="fill-text-primary text-[15px] font-semibold">
          stannar vid behov
        </text>
        <Pointer x1={142} y1={76} x2={218} y2={78} />

        {/* Din väg förbi hindret, i din högra halva */}
        <line
          x1="284"
          y1="266"
          x2="284"
          y2="60"
          className="stroke-progress-600"
          strokeWidth="2.5"
          strokeDasharray="7 5"
          markerEnd="url(#meet-arrow)"
        />

        {/* Din bil, kör uppåt i vägens högra halva (x 268–300) */}
        <Car
          x={268}
          y={270}
          w={32}
          h={40}
          heading="up"
          fill="url(#meet-dots)"
          stroke="stroke-attention-600"
          nose="fill-attention-600"
        />
        <Badge cx={350} cy={284} n={2} />
        <text x="368" y="289" className="fill-text-primary text-[14px] font-semibold">
          Du håller till höger
        </text>
        <text x="368" y="307" className="fill-text-secondary text-[13px]">
          och passerar
        </text>
        <Pointer x1={338} y1={288} x2={302} y2={288} />

        {/* Avstånd i sidled mellan hindret (x 250) och din bana (x 268) */}
        <line x1="251" y1="165" x2="267" y2="165" className="stroke-text-primary" strokeWidth="2" />
        <line x1="251" y1="160" x2="251" y2="170" className="stroke-text-primary" strokeWidth="2" />
        <line x1="267" y1="160" x2="267" y2="170" className="stroke-text-primary" strokeWidth="2" />
        <Badge cx={350} cy={160} n={3} />
        <text x="368" y="165" className="fill-text-primary text-[14px] font-semibold">
          Betryggande
        </text>
        <text x="368" y="183" className="fill-text-secondary text-[13px]">
          avstånd i sidled
        </text>
        <Pointer x1={338} y1={165} x2={270} y2={165} />
      </g>

      {/* Regeln, som den står i momentet */}
      <rect x="20" y="812" width="520" height="78" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="36" y="838" className="fill-text-primary text-[13px] font-medium">
        Håll till höger och lämna betryggande avstånd i sidled (3 kap 30 §).
      </text>
      <text x="36" y="858" className="fill-text-secondary text-[13px]">
        Har du hindret på din sida ska du stanna om det behövs för att den mötande
      </text>
      <text x="36" y="878" className="fill-text-secondary text-[13px]">
        ska kunna passera (3 kap 30 § andra stycket).
      </text>
    </svg>
  );
}
