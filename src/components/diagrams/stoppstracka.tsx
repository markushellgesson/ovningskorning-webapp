/**
 * Stoppsträckan — reaktionssträcka + bromssträcka (MAN-06).
 * Två rader, lägre och högre fart, sedda uppifrån med bilen på väg åt höger.
 *
 * Kvalitativt, inga siffror: staplarnas längder är valda så att reaktionssträckan
 * växer i takt med farten och bromssträckan växer snabbare än så, utan att någon
 * bestämd multipel eller meterangivelse ritas ut eller går att läsa av som fakta.
 */

export function StoppstrackaDiagram() {
  return (
    <svg
      viewBox="0 0 410 436"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="ss-title ss-desc"
    >
      <title id="ss-title">Stoppsträckans två delar</title>
      <desc id="ss-desc">
        Två vägremsor sedda uppifrån, en för lägre fart och en för högre fart. På varje remsa
        står din bil, ritad med prickmönster, till vänster och kör åt höger. Från den punkt där
        du ser faran löper stoppsträckan i två delar efter varandra: först reaktionssträckan,
        ritad med diagonala ränder, som är vägen bilen hinner rulla från att du ser faran tills
        du trycker på bromsen, och sedan bromssträckan, ritad med rutmönster på röd botten, som
        är vägen från att du bromsar tills bilen står still. Ett lodrätt streck märkt Stopp
        avslutar varje remsa. På raden för högre fart är båda delarna längre, men bromssträckan
        har vuxit betydligt mer än reaktionssträckan och utgör nu den klart största delen av
        stoppsträckan. Inga mått anges. Slutsatsen står under figuren: se stoppunkten tidigt, då
        hinner du bromsa mjukt.
      </desc>

      <defs>
        {/* Elevens bil: prickar */}
        <pattern id="ss-car" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
        </pattern>
        {/* Reaktionssträcka: diagonala ränder */}
        <pattern id="ss-react" patternUnits="userSpaceOnUse" width="8" height="8">
          <path
            d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4"
            className="stroke-primary-600"
            strokeWidth="1.5"
          />
        </pattern>
        {/* Bromssträcka: rutmönster på röd botten */}
        <pattern id="ss-brake" patternUnits="userSpaceOnUse" width="12" height="12">
          <rect width="12" height="12" className="fill-safety-200" />
          <path d="M 0 0 L 12 12 M 12 0 L 0 12" className="stroke-safety-600" strokeWidth="1.2" />
        </pattern>
      </defs>

      <text
        x="205"
        y="22"
        className="fill-text-primary text-[14px] font-semibold"
        textAnchor="middle"
      >
        Stoppsträcka = reaktionssträcka + bromssträcka
      </text>

      {/* Rad 1: lägre fart */}
      <g transform="translate(0, 60)">
        <text x="20" y="0" className="fill-text-primary text-[13px] font-semibold">
          Lägre fart
        </text>

        {/* Händelser */}
        <text x="64" y="18" className="fill-text-secondary text-[13px]" textAnchor="middle">
          Ser faran
        </text>
        <text x="134" y="18" className="fill-text-secondary text-[13px]" textAnchor="middle">
          Bromsar
        </text>
        <text x="194" y="18" className="fill-text-primary text-[13px] font-semibold" textAnchor="middle">
          Stopp
        </text>
        <line x1="64" y1="22" x2="64" y2="28" className="stroke-text-tertiary" strokeWidth="1" />
        <line x1="134" y1="22" x2="134" y2="28" className="stroke-text-tertiary" strokeWidth="1" />

        {/* Vägremsa */}
        <rect x="20" y="28" width="366" height="32" className="fill-diagram-road" />

        {/* Reaktionssträcka */}
        <rect
          x="64"
          y="28"
          width="70"
          height="32"
          fill="url(#ss-react)"
          className="stroke-primary-600"
          strokeWidth="1.5"
        />
        {/* Bromssträcka */}
        <rect
          x="134"
          y="28"
          width="60"
          height="32"
          fill="url(#ss-brake)"
          className="stroke-safety-600"
          strokeWidth="1.5"
        />
        {/* Stoppmarkering */}
        <line x1="194" y1="22" x2="194" y2="66" className="stroke-safety-600" strokeWidth="3" />

        {/* Bilen, kör åt höger */}
        <rect
          x="24"
          y="31"
          width="40"
          height="26"
          rx="3"
          fill="url(#ss-car)"
          className="stroke-attention-600"
          strokeWidth="2"
        />

        {/* Hela stoppsträckan */}
        <line x1="64" y1="72" x2="194" y2="72" className="stroke-text-tertiary" strokeWidth="1" />
        <line x1="64" y1="67" x2="64" y2="77" className="stroke-text-tertiary" strokeWidth="1" />
        <line x1="194" y1="67" x2="194" y2="77" className="stroke-text-tertiary" strokeWidth="1" />
        <text
          x="129"
          y="90"
          className="fill-text-secondary text-[13px] font-medium"
          textAnchor="middle"
        >
          Stoppsträcka
        </text>
      </g>

      {/* Rad 2: högre fart */}
      <g transform="translate(0, 180)">
        <text x="20" y="0" className="fill-text-primary text-[13px] font-semibold">
          Högre fart
        </text>

        <text x="64" y="18" className="fill-text-secondary text-[13px]" textAnchor="middle">
          Ser faran
        </text>
        <text x="190" y="18" className="fill-text-secondary text-[13px]" textAnchor="middle">
          Bromsar
        </text>
        <text x="380" y="18" className="fill-text-primary text-[13px] font-semibold" textAnchor="middle">
          Stopp
        </text>
        <line x1="64" y1="22" x2="64" y2="28" className="stroke-text-tertiary" strokeWidth="1" />
        <line x1="190" y1="22" x2="190" y2="28" className="stroke-text-tertiary" strokeWidth="1" />

        <rect x="20" y="28" width="366" height="32" className="fill-diagram-road" />

        <rect
          x="64"
          y="28"
          width="126"
          height="32"
          fill="url(#ss-react)"
          className="stroke-primary-600"
          strokeWidth="1.5"
        />
        <rect
          x="190"
          y="28"
          width="190"
          height="32"
          fill="url(#ss-brake)"
          className="stroke-safety-600"
          strokeWidth="1.5"
        />
        <line x1="380" y1="22" x2="380" y2="66" className="stroke-safety-600" strokeWidth="3" />

        <rect
          x="24"
          y="31"
          width="40"
          height="26"
          rx="3"
          fill="url(#ss-car)"
          className="stroke-attention-600"
          strokeWidth="2"
        />

        <line x1="64" y1="72" x2="380" y2="72" className="stroke-text-tertiary" strokeWidth="1" />
        <line x1="64" y1="67" x2="64" y2="77" className="stroke-text-tertiary" strokeWidth="1" />
        <line x1="380" y1="67" x2="380" y2="77" className="stroke-text-tertiary" strokeWidth="1" />
        <text
          x="222"
          y="90"
          className="fill-text-secondary text-[13px] font-medium"
          textAnchor="middle"
        >
          Stoppsträcka
        </text>

        <text x="205" y="114" className="fill-text-primary text-[13px]" textAnchor="middle">
          Båda delarna växer med farten —
        </text>
        <text x="205" y="130" className="fill-text-primary text-[13px]" textAnchor="middle">
          bromssträckan växer snabbast.
        </text>
      </g>

      {/* Teckenförklaring */}
      <g transform="translate(20, 338)">
        <rect
          x="0"
          y="-11"
          width="22"
          height="14"
          fill="url(#ss-react)"
          className="stroke-primary-600"
          strokeWidth="1"
        />
        <text x="30" y="0" className="fill-text-primary text-[13px] font-semibold">
          Reaktionssträcka
        </text>
        <text x="30" y="16" className="fill-text-secondary text-[13px]">
          från att du ser faran tills du trycker på bromsen
        </text>

        <rect
          x="0"
          y="29"
          width="22"
          height="14"
          fill="url(#ss-brake)"
          className="stroke-safety-600"
          strokeWidth="1"
        />
        <text x="30" y="40" className="fill-text-primary text-[13px] font-semibold">
          Bromssträcka
        </text>
        <text x="30" y="56" className="fill-text-secondary text-[13px]">
          från att du bromsar tills bilen står still
        </text>
      </g>

      <text
        x="205"
        y="426"
        className="fill-text-primary text-[13px] font-medium"
        textAnchor="middle"
      >
        Se stoppunkten tidigt — då hinner du bromsa mjukt.
      </text>
    </svg>
  );
}
