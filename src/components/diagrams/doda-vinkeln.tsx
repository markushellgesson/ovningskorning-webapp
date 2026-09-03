/**
 * Döda vinkeln — bilen uppifrån med speglarnas täckningsområden.
 * Fysikaliskt förhållande, ingen regel.
 */

export function DodaVinkelnDiagram() {
  return (
    <svg
      viewBox="0 0 400 500"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="blind-title blind-desc"
    >
      <title id="blind-title">Döda vinkeln sedd uppifrån</title>
      <desc id="blind-desc">
        Bil sedd uppifrån. Ljusblå streckade områden visar vad backspegeln och sidospeglarna täcker
        in. Mörka områden med kryss-mönster vid sidan om bilen är de döda vinklarna — zoner som inte
        syns i speglarna. För att se dessa måste föraren titta över axeln.
      </desc>

      {/* Bilens kropp */}
      <rect
        x="150"
        y="200"
        width="100"
        height="160"
        className="fill-neutral-200 stroke-neutral-700"
        strokeWidth="2"
        rx="8"
      />

      {/* Vindruta */}
      <rect
        x="155"
        y="205"
        width="90"
        height="40"
        className="fill-primary-100 stroke-neutral-600"
        strokeWidth="1"
        rx="4"
      />

      {/* Backspeglarnas täckning (bakom bilen) */}
      <defs>
        <pattern
          id="mirror-view"
          patternUnits="userSpaceOnUse"
          width="10"
          height="10"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="10"
            className="stroke-primary-300"
            strokeWidth="1"
            opacity="0.5"
          />
        </pattern>
        <pattern id="blind-spot" patternUnits="userSpaceOnUse" width="12" height="12">
          <path
            d="M 0 0 L 12 12 M 12 0 L 0 12"
            className="stroke-safety-600"
            strokeWidth="1"
            opacity="0.4"
          />
        </pattern>
      </defs>

      {/* Backspegeln täcker området rakt bakom */}
      <path
        d="M 150 360 L 120 420 L 120 480 L 280 480 L 280 420 L 250 360 Z"
        fill="url(#mirror-view)"
        className="stroke-primary-400"
        strokeWidth="2"
        strokeDasharray="4 4"
        opacity="0.7"
      />

      {/* Vänster sidospegel täckning */}
      <ellipse
        cx="100"
        cy="280"
        rx="45"
        ry="80"
        fill="url(#mirror-view)"
        className="stroke-primary-400"
        strokeWidth="2"
        strokeDasharray="4 4"
        opacity="0.7"
      />

      {/* Höger sidospegel täckning */}
      <ellipse
        cx="300"
        cy="280"
        rx="45"
        ry="80"
        fill="url(#mirror-view)"
        className="stroke-primary-400"
        strokeWidth="2"
        strokeDasharray="4 4"
        opacity="0.7"
      />

      {/* Döda vinkeln vänster */}
      <path
        d="M 150 290 L 80 300 L 70 340 L 130 350 Z"
        fill="url(#blind-spot)"
        className="stroke-safety-600"
        strokeWidth="2"
        opacity="0.8"
      />

      {/* Döda vinkeln höger */}
      <path
        d="M 250 290 L 320 300 L 330 340 L 270 350 Z"
        fill="url(#blind-spot)"
        className="stroke-safety-600"
        strokeWidth="2"
        opacity="0.8"
      />

      {/* Etiketter */}
      <text
        x="200"
        y="30"
        className="fill-text-primary text-[16px] font-semibold"
        textAnchor="middle"
      >
        Vy uppifrån
      </text>

      {/* Förklaringar */}
      <g transform="translate(20, 60)">
        <rect
          x="0"
          y="0"
          width="20"
          height="12"
          fill="url(#mirror-view)"
          className="stroke-primary-400"
          strokeWidth="1"
        />
        <text x="25" y="10" className="fill-text-primary text-[13px]">
          Syns i speglar
        </text>

        <rect
          x="0"
          y="20"
          width="20"
          height="12"
          fill="url(#blind-spot)"
          className="stroke-safety-600"
          strokeWidth="1"
        />
        <text x="25" y="30" className="fill-text-primary text-[13px]">
          Döda vinkeln
        </text>
      </g>

      {/* Pil till vänster döda vinkel */}
      <path
        d="M 40 320 L 65 320"
        className="stroke-text-secondary"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#arrow-dark)"
      />
      <text x="10" y="318" className="fill-text-secondary text-[13px]">
        Döda
      </text>
      <text x="5" y="330" className="fill-text-secondary text-[13px]">
        vinkeln
      </text>

      {/* Pil till höger döda vinkel */}
      <path
        d="M 360 320 L 335 320"
        className="stroke-text-secondary"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#arrow-dark)"
      />
      <text x="365" y="318" className="fill-text-secondary text-[13px]">
        Döda
      </text>
      <text x="360" y="330" className="fill-text-secondary text-[13px]">
        vinkeln
      </text>

      {/* Arrow markers */}
      <defs>
        <marker
          id="arrow-dark"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-text-secondary" />
        </marker>
      </defs>

      <text x="200" y="470" className="fill-text-secondary text-[13px]" textAnchor="middle">
        Titta över axeln innan filbyte
      </text>
    </svg>
  );
}
