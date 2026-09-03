/**
 * Backning runt hörn — svängradie, bakhjulens väg och blickriktning.
 * Ren teknik/geometri, ingen regel.
 */

export function BackningRuntHornetDiagram() {
  return (
    <svg
      viewBox="0 0 500 500"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="corner-title corner-desc"
    >
      <title id="corner-title">Backning runt ett hörn, sett uppifrån</title>
      <desc id="corner-desc">
        Vy uppifrån av en gata som svänger i ett hörn. Bilen (prickmönster) backar från den lodräta
        gatan och runt hörnet in på den vågräta gatan. En heldragen linje visar bakhjulens väg — den
        skär hörnet i en tät kurva. En streckad linje visar framvagnens svep, som går i en vidare
        kurva utåt. Blicken (markerad med öga-symbol och streckad ledlinje) riktas över axeln, i
        färdriktningen bakåt.
      </desc>

      <defs>
        <pattern id="back-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
        </pattern>
        <marker
          id="back-arrow-solid"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-progress-600" />
        </marker>
        <marker
          id="back-arrow-dashed"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-safety-600" />
        </marker>
      </defs>

      {/* Lodrät gata */}
      <rect x="40" y="0" width="100" height="400" className="fill-diagram-road" />
      {/* Vågrät gata (sidogata) */}
      <rect x="140" y="300" width="360" height="100" className="fill-diagram-road" />
      {/* Kantstöd vid hörnet (inre) */}
      <path
        d="M 140 300 L 140 400"
        className="stroke-diagram-edge"
        strokeWidth="3"
      />
      <path d="M 140 300 L 500 300" className="stroke-diagram-edge" strokeWidth="0" opacity="0" />

      {/* Startposition: bilen lodrätt i den vertikala gatan */}
      <rect
        x="65"
        y="60"
        width="30"
        height="65"
        fill="url(#back-dots)"
        className="stroke-attention-600"
        strokeWidth="2"
        rx="4"
      />
      <text x="20" y="45" className="fill-text-primary text-[13px] font-medium">
        Start
      </text>

      {/* Slutposition: bilen vågrätt i sidogatan */}
      <rect
        x="290"
        y="335"
        width="65"
        height="30"
        fill="url(#back-dots)"
        className="stroke-attention-600"
        strokeWidth="2"
        rx="4"
      />
      <text x="290" y="325" className="fill-text-primary text-[13px] font-medium">
        Slut
      </text>

      {/* Bakhjulens väg — tät kurva nära hörnet, heldragen */}
      <path
        d="M 80 125 L 80 260 Q 80 300 120 300 L 285 300"
        className="stroke-progress-600"
        strokeWidth="2.5"
        fill="none"
        markerEnd="url(#back-arrow-solid)"
      />

      {/* Framvagnens svep — vidare kurva utåt, streckad */}
      <path
        d="M 110 125 L 110 250 Q 110 340 200 340 L 285 340"
        className="stroke-safety-600"
        strokeWidth="2.5"
        strokeDasharray="7 5"
        fill="none"
        markerEnd="url(#back-arrow-dashed)"
      />

      {/* Blickriktning: öga-symbol och ledlinje bakåt/i färdriktningen */}
      <circle
        cx="230"
        cy="380"
        r="10"
        className="fill-primary-100 stroke-primary-600"
        strokeWidth="2"
      />
      <path
        d="M 222 380 Q 230 374 238 380 Q 230 386 222 380 Z"
        className="fill-primary-600"
      />
      <line
        x1="90"
        y1="90"
        x2="222"
        y2="378"
        className="stroke-primary-600"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      <text x="345" y="384" className="fill-text-primary text-[13px] font-medium">
        Blicken hit
      </text>

      {/* Legend */}
      <g transform="translate(20, 430)">
        <line x1="0" y1="0" x2="30" y2="0" className="stroke-progress-600" strokeWidth="2.5" />
        <text x="36" y="4" className="fill-text-secondary text-[13px]">
          Bakhjulens väg — tät kurva mot hörnet
        </text>
        <line
          x1="0"
          y1="24"
          x2="30"
          y2="24"
          className="stroke-safety-600"
          strokeWidth="2.5"
          strokeDasharray="7 5"
        />
        <text x="36" y="28" className="fill-text-secondary text-[13px]">
          Framvagnens svep — vidare kurva utåt
        </text>
      </g>

      <text x="345" y="400" className="fill-text-secondary text-[13px]">
        över axeln
      </text>
    </svg>
  );
}
