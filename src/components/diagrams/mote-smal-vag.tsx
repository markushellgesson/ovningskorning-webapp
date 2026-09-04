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
      viewBox="0 0 520 830"
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
        i sidled mellan hindret och din bil: betryggande avstånd i sidled. Texten nederst: håll till
        höger och lämna betryggande avstånd i sidled (3 kap 30 §). Har du hindret på din sida ska
        du stanna om det behövs för att den mötande ska kunna passera (3 kap 30 § andra stycket).
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

      {/* Övre bilden: hindret på din sida */}
      <g>
        <text x="20" y="24" className="fill-text-primary text-[14px] font-semibold">
          Hindret på din sida: du stannar vid behov
        </text>
        <Road />

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
        <text x="205" y="74" textAnchor="end" className="fill-text-secondary text-[13px]">
          Mötande,
        </text>
        <text x="205" y="92" textAnchor="end" className="fill-text-secondary text-[13px]">
          kör nedåt
        </text>

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
        <text x="205" y="300" textAnchor="end" className="fill-text-secondary text-[13px]">
          Den mötande
        </text>
        <text x="205" y="318" textAnchor="end" className="fill-text-secondary text-[13px]">
          passerar
        </text>

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
        <text x="315" y="158" className="fill-text-primary text-[13px] font-medium">
          Hinder på
        </text>
        <text x="315" y="176" className="fill-text-primary text-[13px] font-medium">
          din högra sida
        </text>

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
        <text x="315" y="260" className="fill-text-primary text-[13px] font-semibold">
          Du stannar
        </text>
        <text x="315" y="278" className="fill-text-primary text-[13px] font-semibold">
          vid behov
        </text>

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
        <text x="205" y="150" textAnchor="end" className="fill-text-secondary text-[13px]">
          Ni ser varandra
        </text>
        <text x="205" y="168" textAnchor="end" className="fill-text-secondary text-[13px]">
          tidigt
        </text>

        {/* Farten ned i god tid: avsmalnande kil i färdriktningen */}
        <polygon points="312,340 324,340 318,295" className="fill-progress-600" />
        <text x="332" y="316" className="fill-text-secondary text-[13px]">
          Farten ned
        </text>
        <text x="332" y="334" className="fill-text-secondary text-[13px]">
          i god tid
        </text>
      </g>

      {/* Nedre bilden: hindret på den mötandes sida */}
      <g transform="translate(0, 390)">
        <text x="20" y="24" className="fill-text-primary text-[14px] font-semibold">
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
        <text x="205" y="158" textAnchor="end" className="fill-text-primary text-[13px] font-medium">
          Hinder på den
        </text>
        <text x="205" y="176" textAnchor="end" className="fill-text-primary text-[13px] font-medium">
          mötandes sida
        </text>

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
        <text x="205" y="74" textAnchor="end" className="fill-text-primary text-[13px] font-semibold">
          Den mötande
        </text>
        <text x="205" y="92" textAnchor="end" className="fill-text-primary text-[13px] font-semibold">
          stannar vid behov
        </text>

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
        <text x="315" y="286" className="fill-text-primary text-[13px] font-semibold">
          Du håller till höger
        </text>
        <text x="315" y="304" className="fill-text-primary text-[13px] font-semibold">
          och passerar
        </text>

        {/* Avstånd i sidled mellan hindret (x 250) och din bana (x 268) */}
        <line x1="251" y1="165" x2="267" y2="165" className="stroke-text-primary" strokeWidth="2" />
        <line x1="251" y1="160" x2="251" y2="170" className="stroke-text-primary" strokeWidth="2" />
        <line x1="267" y1="160" x2="267" y2="170" className="stroke-text-primary" strokeWidth="2" />
        <text x="315" y="160" className="fill-text-secondary text-[13px]">
          Betryggande
        </text>
        <text x="315" y="178" className="fill-text-secondary text-[13px]">
          avstånd i sidled
        </text>
      </g>

      {/* Teckenförklaring */}
      <g transform="translate(20, 748)">
        <rect width="16" height="16" fill="url(#meet-dots)" className="stroke-attention-600" strokeWidth="1.5" />
        <text x="22" y="12" className="fill-text-secondary text-[13px]">
          Din bil
        </text>
        <rect x="110" width="16" height="16" fill="url(#meet-stripes)" className="stroke-primary-600" strokeWidth="1.5" />
        <text x="132" y="12" className="fill-text-secondary text-[13px]">
          Mötande
        </text>
        <rect x="220" width="16" height="16" fill="url(#meet-bars)" className="stroke-safety-600" strokeWidth="1.5" />
        <text x="242" y="12" className="fill-text-secondary text-[13px]">
          Hinder
        </text>
      </g>

      {/* Regeln, som den står i momentet */}
      <text x="20" y="786" className="fill-text-secondary text-[13px]">
        Håll till höger och lämna betryggande avstånd i sidled (3 kap 30 §).
      </text>
      <text x="20" y="804" className="fill-text-secondary text-[13px]">
        Har du hindret på din sida ska du stanna om det behövs för att den mötande
      </text>
      <text x="20" y="822" className="fill-text-secondary text-[13px]">
        ska kunna passera (3 kap 30 § andra stycket).
      </text>
    </svg>
  );
}
