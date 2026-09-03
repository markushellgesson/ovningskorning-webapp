/**
 * Stoppsträckan — reaktionssträcka + bromssträcka.
 * Visar att bromssträckan växer snabbare än farten.
 * Inga specifika siffror — proportionerna räcker.
 */

export function StoppstrackaDiagram() {
  return (
    <svg
      viewBox="0 0 600 300"
      className="w-full max-w-3xl mx-auto"
      role="img"
      aria-labelledby="stopping-title stopping-desc"
    >
      <title id="stopping-title">Stoppsträckan uppdelad</title>
      <desc id="stopping-desc">
        Linjär figur som visar stoppsträckan uppdelad i reaktionssträcka (gul) och bromssträcka
        (röd). Två scenarier visas: vid lägre hastighet och vid högre hastighet. Bromssträckan växer
        kvadratiskt — den blir fyra gånger längre när hastigheten fördubblas, medan
        reaktionssträckan bara fördubblas.
      </desc>

      {/* Scenario 1: Lägre hastighet */}
      <g>
        <text x="20" y="50" className="fill-text-primary text-[14px] font-semibold">
          Vid lägre hastighet
        </text>

        {/* Bil */}
        <defs>
          <pattern id="stop-dots" patternUnits="userSpaceOnUse" width="8" height="8">
            <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
          </pattern>
        </defs>
        <rect
          x="30"
          y="70"
          width="40"
          height="25"
          fill="url(#stop-dots)"
          className="stroke-attention-600"
          strokeWidth="2"
          rx="3"
        />

        {/* Reaktionssträcka */}
        <rect
          x="70"
          y="70"
          width="120"
          height="25"
          className="fill-attention-200 stroke-attention-600"
          strokeWidth="1.5"
        />
        <text
          x="130"
          y="88"
          className="fill-text-primary text-[13px] font-medium"
          textAnchor="middle"
        >
          Reaktionssträcka
        </text>
        <text x="130" y="115" className="fill-text-secondary text-[13px]" textAnchor="middle">
          (från att du ser till att du bromsar)
        </text>

        {/* Bromssträcka */}
        <rect
          x="190"
          y="70"
          width="140"
          height="25"
          className="fill-safety-200 stroke-safety-600"
          strokeWidth="1.5"
        />
        <text
          x="260"
          y="88"
          className="fill-text-primary text-[13px] font-medium"
          textAnchor="middle"
        >
          Bromssträcka
        </text>
        <text x="260" y="115" className="fill-text-secondary text-[13px]" textAnchor="middle">
          (från bromsstart till stillastående)
        </text>

        {/* Total stoppsträcka */}
        <line x1="30" y1="130" x2="330" y2="130" className="stroke-text-tertiary" strokeWidth="1" />
        <line x1="30" y1="125" x2="30" y2="135" className="stroke-text-tertiary" strokeWidth="1" />
        <line
          x1="330"
          y1="125"
          x2="330"
          y2="135"
          className="stroke-text-tertiary"
          strokeWidth="1"
        />
        <text
          x="180"
          y="148"
          className="fill-text-tertiary text-[13px] font-medium"
          textAnchor="middle"
        >
          Total stoppsträcka
        </text>
      </g>

      {/* Scenario 2: Högre hastighet */}
      <g transform="translate(0, 150)">
        <text x="20" y="50" className="fill-text-primary text-[14px] font-semibold">
          Vid högre hastighet
        </text>

        {/* Bil */}
        <rect
          x="30"
          y="70"
          width="40"
          height="25"
          fill="url(#stop-dots)"
          className="stroke-attention-600"
          strokeWidth="2"
          rx="3"
        />

        {/* Reaktionssträcka (dubbelt så lång) */}
        <rect
          x="70"
          y="70"
          width="240"
          height="25"
          className="fill-attention-200 stroke-attention-600"
          strokeWidth="1.5"
        />
        <text
          x="190"
          y="88"
          className="fill-text-primary text-[13px] font-medium"
          textAnchor="middle"
        >
          Reaktionssträcka (dubbelt så lång)
        </text>

        {/* Bromssträcka (fyra gånger så lång) */}
        <rect
          x="310"
          y="70"
          width="280"
          height="25"
          className="fill-safety-200 stroke-safety-600"
          strokeWidth="1.5"
        />
        <text
          x="450"
          y="88"
          className="fill-text-primary text-[13px] font-medium"
          textAnchor="middle"
        >
          Bromssträcka (fyra gånger så lång)
        </text>

        {/* Total stoppsträcka */}
        <line x1="30" y1="110" x2="590" y2="110" className="stroke-text-tertiary" strokeWidth="1" />
        <line x1="30" y1="105" x2="30" y2="115" className="stroke-text-tertiary" strokeWidth="1" />
        <line
          x1="590"
          y1="105"
          x2="590"
          y2="115"
          className="stroke-text-tertiary"
          strokeWidth="1"
        />
        <text
          x="310"
          y="128"
          className="fill-text-tertiary text-[13px] font-medium"
          textAnchor="middle"
        >
          Total stoppsträcka
        </text>
      </g>
    </svg>
  );
}
