/**
 * Fickparkering — tre steg med referenspunkt och rattutslag.
 * Ren teknik/geometri, ingen regel.
 */

export function FickparkeringDiagram() {
  return (
    <svg
      viewBox="0 0 500 720"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="parking-title parking-desc"
    >
      <title id="parking-title">Fickparkering i tre steg</title>
      <desc id="parking-desc">
        Tre steg för att backa in i en parkeringsficka. Din bil är markerad med prickmönster, den
        redan parkerade referensbilen med diagonalt randmönster. Steg 1: stanna i höjd med
        referenspunkten på den parkerade bilen, ratten rak. Steg 2: lägg på fullt rattutslag och
        backa långsamt tills bilen vinklas in mot fickan. Steg 3: räta upp ratten och kör rakt in,
        med jämn marginal runt om.
      </desc>

      <defs>
        <pattern id="park-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
        </pattern>
        <pattern id="park-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path
            d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4"
            className="stroke-primary-600"
            strokeWidth="2"
          />
        </pattern>
        <marker
          id="park-arrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-attention-600" />
        </marker>
      </defs>

      {/* Steg 1: Stanna i höjd med referenspunkten */}
      <g>
        <text x="10" y="18" className="fill-text-primary text-[15px] font-semibold">
          1. Stanna i höjd med referenspunkten
        </text>

        {/* Gata */}
        <rect x="0" y="30" width="500" height="55" className="fill-diagram-road" />
        {/* Trottoarkant */}
        <line x1="0" y1="85" x2="500" y2="85" className="stroke-diagram-edge" strokeWidth="2" />

        {/* Ficka: två platser, delade av streckad linje */}
        <rect
          x="150"
          y="85"
          width="150"
          height="75"
          className="fill-none stroke-diagram-marking"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <line
          x1="300"
          y1="85"
          x2="300"
          y2="160"
          className="stroke-diagram-marking"
          strokeWidth="2"
          strokeDasharray="6 4"
        />

        {/* Referensbil, redan parkerad, i högra platsen */}
        <rect
          x="305"
          y="90"
          width="65"
          height="65"
          fill="url(#park-stripes)"
          className="stroke-primary-600"
          strokeWidth="2"
          rx="4"
        />
        <text x="337" y="128" textAnchor="middle" className="fill-text-primary text-[13px] font-medium">
          Ref
        </text>

        {/* Din bil på gatan, i höjd med referensbilens bakre kant */}
        <rect
          x="200"
          y="42"
          width="65"
          height="30"
          fill="url(#park-dots)"
          className="stroke-attention-600"
          strokeWidth="2"
          rx="4"
        />

        {/* Referenslinje mellan bakkanterna */}
        <line
          x1="265"
          y1="57"
          x2="370"
          y2="122"
          className="stroke-text-tertiary"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <circle cx="265" cy="57" r="4" className="fill-text-tertiary" />
        <circle cx="370" cy="122" r="4" className="fill-text-tertiary" />
        <text x="20" y="200" className="fill-text-secondary text-[13px]">
          Referenspunkt: din bakre dörrkarm i höjd med referensbilens bakkant. Ratten rak.
        </text>
      </g>

      {/* Steg 2: Fullt rattutslag, backa */}
      <g transform="translate(0, 250)">
        <text x="10" y="18" className="fill-text-primary text-[15px] font-semibold">
          2. Fullt rattutslag, backa långsamt
        </text>

        <rect x="0" y="30" width="500" height="55" className="fill-diagram-road" />
        <line x1="0" y1="85" x2="500" y2="85" className="stroke-diagram-edge" strokeWidth="2" />
        <rect
          x="150"
          y="85"
          width="150"
          height="75"
          className="fill-none stroke-diagram-marking"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <line
          x1="300"
          y1="85"
          x2="300"
          y2="160"
          className="stroke-diagram-marking"
          strokeWidth="2"
          strokeDasharray="6 4"
        />

        <rect
          x="305"
          y="90"
          width="65"
          height="65"
          fill="url(#park-stripes)"
          className="stroke-primary-600"
          strokeWidth="2"
          rx="4"
        />

        {/* Din bil, vinklad in mot fickan */}
        <rect
          x="205"
          y="80"
          width="65"
          height="30"
          fill="url(#park-dots)"
          className="stroke-attention-600"
          strokeWidth="2"
          rx="4"
          transform="rotate(35 237 95)"
        />

        {/* Svängbåge från steg 1 till steg 2 */}
        <path
          d="M 232 72 Q 200 110 220 140"
          className="stroke-attention-600"
          strokeWidth="2"
          strokeDasharray="5 4"
          fill="none"
          markerEnd="url(#park-arrow)"
        />

        <text x="20" y="200" className="fill-text-secondary text-[13px]">
          Fullt rattutslag mot fickan direkt när du börjar backa.
        </text>
      </g>

      {/* Steg 3: Räta upp, kör rakt in */}
      <g transform="translate(0, 500)">
        <text x="10" y="18" className="fill-text-primary text-[15px] font-semibold">
          3. Räta upp ratten, kör rakt in
        </text>

        <rect x="0" y="30" width="500" height="55" className="fill-diagram-road" />
        <line x1="0" y1="85" x2="500" y2="85" className="stroke-diagram-edge" strokeWidth="2" />
        <rect
          x="150"
          y="85"
          width="150"
          height="75"
          className="fill-none stroke-diagram-marking"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <line
          x1="300"
          y1="85"
          x2="300"
          y2="160"
          className="stroke-diagram-marking"
          strokeWidth="2"
          strokeDasharray="6 4"
        />

        <rect
          x="305"
          y="90"
          width="65"
          height="65"
          fill="url(#park-stripes)"
          className="stroke-primary-600"
          strokeWidth="2"
          rx="4"
        />

        {/* Din bil, rak i fickan */}
        <rect
          x="160"
          y="90"
          width="65"
          height="65"
          fill="url(#park-dots)"
          className="stroke-attention-600"
          strokeWidth="2"
          rx="4"
        />

        {/* Marginalmarkeringar */}
        <line x1="225" y1="122" x2="305" y2="122" className="stroke-progress-600" strokeWidth="2" />
        <line x1="225" y1="118" x2="225" y2="126" className="stroke-progress-600" strokeWidth="2" />
        <line x1="305" y1="118" x2="305" y2="126" className="stroke-progress-600" strokeWidth="2" />

        <text x="20" y="200" className="fill-text-secondary text-[13px]">
          Jämn marginal runt om — inte bara framåt, utan även till sidorna.
        </text>
      </g>
    </svg>
  );
}
