/**
 * Högerregeln — korsning uppifrån.
 * Visar att väjningsplikten åligger dig när fordon närmar sig från höger.
 * Trafikförordningen 3 kap 18 §.
 */

export function HogerregelnDiagram() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="hogerregeln-title hogerregeln-desc"
    >
      <title id="hogerregeln-title">Högerregeln vid korsning</title>
      <desc id="hogerregeln-desc">
        Korsning sedd uppifrån. Din bil (markerad med rektangel och prickmönster) kommer från söder
        och ska rakt fram. En annan bil (markerad med diagonal randmönster) närmar sig från höger,
        österut. Du har väjningsplikt mot den bilen enligt högerregeln.
      </desc>

      {/* Vägar */}
      <rect x="180" y="0" width="40" height="400" className="fill-neutral-300" />
      <rect x="0" y="180" width="400" height="40" className="fill-neutral-300" />

      {/* Vägmarkeringar */}
      <line x1="200" y1="0" x2="200" y2="180" className="stroke-neutral-50" strokeWidth="2" />
      <line x1="200" y1="220" x2="200" y2="400" className="stroke-neutral-50" strokeWidth="2" />
      <line x1="0" y1="200" x2="180" y2="200" className="stroke-neutral-50" strokeWidth="2" />
      <line x1="220" y1="200" x2="400" y2="200" className="stroke-neutral-50" strokeWidth="2" />

      {/* Bil från höger (diagonal ränder) */}
      <defs>
        <pattern id="stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path
            d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4"
            className="stroke-primary-600"
            strokeWidth="2"
          />
        </pattern>
        <pattern id="dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
        </pattern>
      </defs>

      {/* Bil från höger med randmönster */}
      <g>
        <rect
          x="280"
          y="185"
          width="40"
          height="30"
          fill="url(#stripes)"
          className="stroke-primary-600"
          strokeWidth="2"
        />
        {/* Riktningspil */}
        <path
          d="M 260 200 L 275 200 M 270 195 L 275 200 L 270 205"
          className="stroke-primary-600"
          strokeWidth="2"
          fill="none"
        />
        <text x="330" y="205" className="fill-text-primary text-[14px] font-semibold">
          Från höger
        </text>
      </g>

      {/* Din bil med prickmönster */}
      <g>
        <rect
          x="185"
          y="280"
          width="30"
          height="40"
          fill="url(#dots)"
          className="stroke-attention-600"
          strokeWidth="2"
        />
        {/* Riktningspil */}
        <path
          d="M 200 260 L 200 275 M 195 270 L 200 275 L 205 270"
          className="stroke-attention-600"
          strokeWidth="2"
          fill="none"
        />
        <text x="220" y="305" className="fill-text-primary text-[14px] font-semibold">
          Du
        </text>
      </g>

      {/* Väjningssymbol vid din bil */}
      <g>
        <path
          d="M 200 350 L 185 370 L 215 370 Z"
          className="fill-safety-600 stroke-neutral-900"
          strokeWidth="1.5"
        />
        <text x="145" y="395" className="fill-text-secondary text-[13px] font-medium">
          Väjningsplikt
        </text>
      </g>
    </svg>
  );
}
