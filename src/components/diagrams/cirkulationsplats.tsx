/**
 * Cirkulationsplats — väjningsplikt vid infart.
 * Trafikförordningen 3 kap 22 §.
 * Visar också cyklisters position.
 */

export function CirkulationsplatsDiagram() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="roundabout-title roundabout-desc"
    >
      <title id="roundabout-title">Cirkulationsplats sedd uppifrån</title>
      <desc id="roundabout-desc">
        Cirkulationsplats med fyra infarter. Din bil (markerad med prickmönster och orange ram)
        närmar sig söderifrån. En bil i cirkulationen (markerad med diagonala ränder och blå ram) kör
        moturs. Du har väjningsplikt mot fordon som redan befinner sig i cirkulationen. En cyklist
        (markerad med en cirkel) visas också i cirkulationen.
      </desc>

      {/* Cirkulationsplats yttre ring */}
      <circle cx="200" cy="200" r="100" className="fill-diagram-road" />

      {/* Cirkulationsplats inre ring (ö) */}
      <circle cx="200" cy="200" r="60" className="fill-neutral-200" />

      {/* Infarter */}
      <rect x="180" y="0" width="40" height="80" className="fill-diagram-road" />
      <rect x="180" y="320" width="40" height="80" className="fill-diagram-road" />
      <rect x="0" y="180" width="80" height="40" className="fill-diagram-road" />
      <rect x="320" y="180" width="80" height="40" className="fill-diagram-road" />

      {/* Vägmarkeringar på infarter */}
      <line x1="200" y1="0" x2="200" y2="80" className="stroke-diagram-marking" strokeWidth="2" />
      <line
        x1="200"
        y1="320"
        x2="200"
        y2="400"
        className="stroke-diagram-marking"
        strokeWidth="2"
      />
      <line x1="0" y1="200" x2="80" y2="200" className="stroke-diagram-marking" strokeWidth="2" />
      <line
        x1="320"
        y1="200"
        x2="400"
        y2="200"
        className="stroke-diagram-marking"
        strokeWidth="2"
      />

      {/* Mönster */}
      <defs>
        <pattern id="rab-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path
            d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4"
            className="stroke-primary-600"
            strokeWidth="2"
          />
        </pattern>
        <pattern id="rab-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
        </pattern>
      </defs>

      {/* Bil i cirkulationen (diagonal ränder) */}
      <g>
        <rect
          x="245"
          y="160"
          width="30"
          height="40"
          fill="url(#rab-stripes)"
          className="stroke-primary-600"
          strokeWidth="2"
          transform="rotate(45 260 180)"
        />
        {/* Riktningspil moturs */}
        <path
          d="M 270 145 Q 285 155 280 170"
          className="stroke-primary-600"
          strokeWidth="2"
          fill="none"
          markerEnd="url(#arrow-primary)"
        />
      </g>

      {/* Cyklist i cirkulationen */}
      <circle
        cx="150"
        cy="170"
        r="8"
        className="fill-neutral-700 stroke-neutral-900"
        strokeWidth="1.5"
      />
      <text x="125" y="155" className="fill-text-secondary text-[13px]">
        Cyklist
      </text>

      {/* Din bil som närmar sig (prickmönster) */}
      <g>
        <rect
          x="185"
          y="270"
          width="30"
          height="40"
          fill="url(#rab-dots)"
          className="stroke-attention-600"
          strokeWidth="2"
        />
        {/* Riktningspil uppåt */}
        <path
          d="M 200 250 L 200 265 M 195 260 L 200 265 L 205 260"
          className="stroke-attention-600"
          strokeWidth="2"
          fill="none"
        />
        <text x="220" y="295" className="fill-text-primary text-[14px] font-semibold">
          Du
        </text>
      </g>

      {/* Väjningssymbol */}
      <g>
        <path
          d="M 200 330 L 185 350 L 215 350 Z"
          className="fill-safety-600 stroke-neutral-900"
          strokeWidth="1.5"
        />
        <text x="150" y="375" className="fill-text-secondary text-[13px] font-medium">
          Väjningsplikt vid infart
        </text>
      </g>

      {/* Arrow marker definition */}
      <defs>
        <marker
          id="arrow-primary"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary-600" />
        </marker>
      </defs>
    </svg>
  );
}
