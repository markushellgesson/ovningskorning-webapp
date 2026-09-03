/**
 * Blicken långt fram — vägen framåt med blickpunkt.
 * Visar skillnaden mellan att titta långt fram och strax framför bilen.
 */

export function BlickenLangtFramDiagram() {
  return (
    <svg
      viewBox="0 0 500 600"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="gaze-title gaze-desc"
    >
      <title id="gaze-title">Blickriktning under körning</title>
      <desc id="gaze-desc">
        Två scenarier. Överst: Bra körning — blicken riktas långt fram på vägen (markerad med grön
        cirkel och streckad linje). Detta ger jämn körning och god framförhållning. Underst: Mindre
        bra — blicken riktas strax framför bilen (markerad med röd cirkel). Detta ger ryckig körning
        och dålig framförhållning.
      </desc>

      {/* Scenario 1: Blicken långt fram (bra) */}
      <g>
        <text x="20" y="30" className="fill-text-primary text-[15px] font-semibold">
          Bra: Titta långt fram
        </text>

        {/* Väg perspektiv */}
        <defs>
          <linearGradient id="road-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className="stop-color-neutral-400" />
            <stop offset="100%" className="stop-color-neutral-300" />
          </linearGradient>
        </defs>
        <path
          d="M 150 260 L 100 80 L 300 80 L 250 260 Z"
          fill="url(#road-grad)"
          className="stroke-neutral-600"
          strokeWidth="2"
        />

        {/* Vägmarkeringar */}
        <path
          d="M 200 80 L 200 100 M 200 120 L 200 140 M 200 160 L 200 180 M 200 200 L 200 220 M 200 240 L 200 260"
          className="stroke-neutral-50"
          strokeWidth="3"
        />

        {/* Bil */}
        <defs>
          <pattern id="gaze-dots" patternUnits="userSpaceOnUse" width="8" height="8">
            <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
          </pattern>
        </defs>
        <rect
          x="185"
          y="235"
          width="30"
          height="40"
          fill="url(#gaze-dots)"
          className="stroke-attention-600"
          strokeWidth="2"
          rx="3"
        />

        {/* Blickpunkt långt fram (grön) */}
        <circle
          cx="200"
          cy="110"
          r="12"
          className="fill-progress-200 stroke-progress-600"
          strokeWidth="2"
        />
        <line
          x1="200"
          y1="235"
          x2="200"
          y2="122"
          className="stroke-progress-600"
          strokeWidth="2"
          strokeDasharray="4 4"
        />

        <text x="220" y="115" className="fill-text-primary text-[13px] font-medium">
          Blicken hit
        </text>

        {/* Förklaring */}
        <text x="320" y="150" className="fill-text-secondary text-[13px]">
          Ger jämn körning
        </text>
        <text x="320" y="165" className="fill-text-secondary text-[13px]">
          och god framförhållning
        </text>
      </g>

      {/* Scenario 2: Blicken strax framför (dåligt) */}
      <g transform="translate(0, 300)">
        <text x="20" y="30" className="fill-text-primary text-[15px] font-semibold">
          Mindre bra: Titta strax framför bilen
        </text>

        {/* Väg perspektiv */}
        <path
          d="M 150 260 L 100 80 L 300 80 L 250 260 Z"
          fill="url(#road-grad)"
          className="stroke-neutral-600"
          strokeWidth="2"
        />

        {/* Vägmarkeringar */}
        <path
          d="M 200 80 L 200 100 M 200 120 L 200 140 M 200 160 L 200 180 M 200 200 L 200 220 M 200 240 L 200 260"
          className="stroke-neutral-50"
          strokeWidth="3"
        />

        {/* Bil */}
        <rect
          x="185"
          y="235"
          width="30"
          height="40"
          fill="url(#gaze-dots)"
          className="stroke-attention-600"
          strokeWidth="2"
          rx="3"
        />

        {/* Blickpunkt strax framför (röd) */}
        <circle
          cx="200"
          cy="200"
          r="12"
          className="fill-safety-200 stroke-safety-600"
          strokeWidth="2"
        />
        <line
          x1="200"
          y1="235"
          x2="200"
          y2="212"
          className="stroke-safety-600"
          strokeWidth="2"
          strokeDasharray="4 4"
        />

        <text x="220" y="205" className="fill-text-primary text-[13px] font-medium">
          Blicken hit
        </text>

        {/* Förklaring */}
        <text x="320" y="150" className="fill-text-secondary text-[13px]">
          Ger ryckig körning
        </text>
        <text x="320" y="165" className="fill-text-secondary text-[13px]">
          och dålig framförhållning
        </text>
      </g>
    </svg>
  );
}
