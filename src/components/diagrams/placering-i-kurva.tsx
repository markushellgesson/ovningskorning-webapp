/**
 * Placering i kurva — hur sikten genom kurvan påverkas.
 * Visar skillnaden mellan mittplacering och ytterplacering i kurva.
 */

export function PlaceringIKurvaDiagram() {
  return (
    <svg
      viewBox="0 0 500 600"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="curve-title curve-desc"
    >
      <title id="curve-title">Placering i kurva och sikt</title>
      <desc id="curve-desc">
        Två scenarier för högerkurva. Överst: Bra placering — håll till vänster i ditt körfält
        (markerad med grön pil). Detta ger bättre sikt genom kurvan (grön streckad linje). Underst:
        Mindre bra — placering till höger i kurvan (markerad med röd pil) ger sämre sikt (röd
        streckad linje).
      </desc>

      {/* Scenario 1: Bra placering (vänster i körfältet) */}
      <g>
        <text x="20" y="30" className="fill-text-primary text-[15px] font-semibold">
          Bra: Placera dig till vänster i körfältet
        </text>

        {/* Väg med högerkurva */}
        <defs>
          <linearGradient id="curve-road" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className="stop-color-neutral-400" />
            <stop offset="100%" className="stop-color-neutral-300" />
          </linearGradient>
        </defs>

        {/* Väg kurva höger */}
        <path
          d="M 50 260 L 50 180 Q 50 100 130 100 L 300 100 Q 380 100 380 180 L 380 260"
          className="fill-none stroke-neutral-600"
          strokeWidth="80"
        />

        {/* Mittlinje */}
        <path
          d="M 50 230 L 50 180 Q 50 130 90 130 L 300 130 Q 350 130 350 180 L 350 260"
          className="stroke-neutral-50"
          strokeWidth="3"
          strokeDasharray="8 8"
        />

        {/* Bil placerad till vänster */}
        <defs>
          <pattern id="curve-dots" patternUnits="userSpaceOnUse" width="8" height="8">
            <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
          </pattern>
        </defs>
        <rect
          x="55"
          y="235"
          width="30"
          height="40"
          fill="url(#curve-dots)"
          className="stroke-attention-600"
          strokeWidth="2"
          rx="3"
        />

        {/* Siktlinje (bra) */}
        <path
          d="M 70 235 L 70 180 Q 70 120 110 120 L 280 120"
          className="stroke-progress-600"
          strokeWidth="2"
          strokeDasharray="6 4"
          fill="none"
        />

        {/* Siktpunkt */}
        <circle
          cx="280"
          cy="120"
          r="8"
          className="fill-progress-200 stroke-progress-600"
          strokeWidth="2"
        />

        <text x="150" y="80" className="fill-text-secondary text-[13px]">
          Bättre sikt genom kurvan
        </text>
      </g>

      {/* Scenario 2: Mindre bra placering (höger i körfältet) */}
      <g transform="translate(0, 300)">
        <text x="20" y="30" className="fill-text-primary text-[15px] font-semibold">
          Mindre bra: Placerad till höger i körfältet
        </text>

        {/* Väg kurva höger */}
        <path
          d="M 50 260 L 50 180 Q 50 100 130 100 L 300 100 Q 380 100 380 180 L 380 260"
          className="fill-none stroke-neutral-600"
          strokeWidth="80"
        />

        {/* Mittlinje */}
        <path
          d="M 50 230 L 50 180 Q 50 130 90 130 L 300 130 Q 350 130 350 180 L 350 260"
          className="stroke-neutral-50"
          strokeWidth="3"
          strokeDasharray="8 8"
        />

        {/* Bil placerad till höger */}
        <rect
          x="5"
          y="235"
          width="30"
          height="40"
          fill="url(#curve-dots)"
          className="stroke-attention-600"
          strokeWidth="2"
          rx="3"
        />

        {/* Siktlinje (dålig) */}
        <path
          d="M 20 235 L 20 180 Q 20 135 60 135 L 180 135"
          className="stroke-safety-600"
          strokeWidth="2"
          strokeDasharray="6 4"
          fill="none"
        />

        {/* Siktpunkt */}
        <circle
          cx="180"
          cy="135"
          r="8"
          className="fill-safety-200 stroke-safety-600"
          strokeWidth="2"
        />

        <text x="150" y="80" className="fill-text-secondary text-[13px]">
          Sämre sikt genom kurvan
        </text>
      </g>

      {/* Legend */}
      <g transform="translate(20, 560)">
        <line
          x1="0"
          y1="5"
          x2="20"
          y2="5"
          className="stroke-progress-600"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <text x="25" y="10" className="fill-text-secondary text-[13px]">
          Siktlinje (grön = bättre, röd = sämre)
        </text>
      </g>
    </svg>
  );
}
