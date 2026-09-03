/**
 * Accelerationsfält — påfart med och utan.
 * Trafikförordningen 3 kap 21 § och 23 §.
 *
 * Vägmärkesbilden B1 i public/signs/ är ett svenskt officiellt vägmärke
 * (allmän handling) och fri att återge.
 */

export function AccelerationsfaltDiagram() {
  return (
    <svg
      viewBox="0 0 500 400"
      className="w-full max-w-2xl mx-auto"
      role="img"
      aria-labelledby="accel-title accel-desc"
    >
      <title id="accel-title">Påfart med och utan accelerationsfält</title>
      <desc id="accel-desc">
        Två scenarier visas. Överst: Påfart med accelerationsfält (markerat med lodräta ränder). Du
        anpassar farten och flätar in — ingen väjningsplikt enligt 3 kap 23 §. Underst: Påfart utan
        accelerationsfält, markerad med vägmärket B1, väjningsplikt. Du har väjningsplikt mot
        trafiken på huvudleden enligt 3 kap 21 §.
      </desc>

      {/* Scenario 1: MED accelerationsfält */}
      <g>
        {/* Huvudled */}
        <rect x="50" y="30" width="400" height="60" className="fill-diagram-road" />
        <line x1="50" y1="60" x2="450" y2="60" className="stroke-diagram-marking" strokeWidth="2" />

        {/* Accelerationsfält (lodräta ränder) */}
        <defs>
          <pattern id="accel-lane" patternUnits="userSpaceOnUse" width="8" height="20">
            <line x1="4" y1="0" x2="4" y2="20" className="stroke-diagram-edge" strokeWidth="1.5" />
          </pattern>
        </defs>
        <path
          d="M 100 90 L 300 90 L 350 60 L 100 60 Z"
          fill="url(#accel-lane)"
          className="stroke-diagram-edge"
          strokeWidth="2"
        />

        {/* Påfartsväg */}
        <rect x="60" y="90" width="40" height="80" className="fill-diagram-road" />

        {/* Din bil */}
        <defs>
          <pattern id="accel-dots" patternUnits="userSpaceOnUse" width="8" height="8">
            <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
          </pattern>
        </defs>
        <rect
          x="120"
          y="65"
          width="30"
          height="20"
          fill="url(#accel-dots)"
          className="stroke-attention-600"
          strokeWidth="1.5"
        />
        <path
          d="M 155 75 L 175 75 M 170 70 L 175 75 L 170 80"
          className="stroke-attention-600"
          strokeWidth="2"
          fill="none"
        />

        {/* Bil på huvudleden */}
        <defs>
          <pattern id="accel-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
            <path
              d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4"
              className="stroke-primary-600"
              strokeWidth="2"
            />
          </pattern>
        </defs>
        <rect
          x="280"
          y="35"
          width="30"
          height="20"
          fill="url(#accel-stripes)"
          className="stroke-primary-600"
          strokeWidth="1.5"
        />

        {/* Etikett */}
        <text x="200" y="120" className="fill-text-primary text-[14px] font-semibold">
          Påfart med accelerationsfält
        </text>
        <text x="160" y="140" className="fill-text-secondary text-[13px]">
          Ingen väjningsplikt — anpassa farten (3 kap 23 §)
        </text>
      </g>

      {/* Scenario 2: UTAN accelerationsfält */}
      <g transform="translate(0, 200)">
        {/* Huvudled */}
        <rect x="50" y="30" width="400" height="60" className="fill-diagram-road" />
        <line x1="50" y1="60" x2="450" y2="60" className="stroke-diagram-marking" strokeWidth="2" />

        {/* Påfartsväg utan accelerationsfält */}
        <rect x="60" y="90" width="40" height="80" className="fill-diagram-road" />
        {/* Infart direkt till huvudled */}
        <line x1="100" y1="90" x2="150" y2="60" className="stroke-diagram-edge" strokeWidth="2" />

        {/* Din bil */}
        <rect
          x="75"
          y="100"
          width="20"
          height="30"
          fill="url(#accel-dots)"
          className="stroke-attention-600"
          strokeWidth="1.5"
        />
        <path
          d="M 85 80 L 85 95 M 80 90 L 85 95 L 90 90"
          className="stroke-attention-600"
          strokeWidth="2"
          fill="none"
        />

        {/* Bil på huvudleden */}
        <rect
          x="280"
          y="35"
          width="30"
          height="20"
          fill="url(#accel-stripes)"
          className="stroke-primary-600"
          strokeWidth="1.5"
        />

        {/* B1 — vägmärket för väjningsplikt */}
        <image href="/signs/B1.svg" x="108" y="100" width="28" height="28" />
        <text x="108" y="145" className="fill-text-secondary text-[13px]">
          B1
        </text>

        {/* Etikett */}
        <text x="190" y="120" className="fill-text-primary text-[14px] font-semibold">
          Påfart utan accelerationsfält
        </text>
        <text x="175" y="140" className="fill-text-secondary text-[13px]">
          Väjningsplikt mot trafiken på huvudleden (3 kap 21 §)
        </text>
      </g>
    </svg>
  );
}
