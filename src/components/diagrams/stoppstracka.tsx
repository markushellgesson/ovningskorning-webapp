/**
 * Stoppsträckan — reaktionssträcka + bromssträcka (MAN-06).
 * Två rader, lägre och högre fart, sedda uppifrån med bilen på väg åt höger.
 *
 * Kvalitativt, inga siffror: staplarnas längder är valda så att reaktionssträckan
 * växer i takt med farten och bromssträckan växer snabbare än så, utan att någon
 * bestämd multipel eller meterangivelse ritas ut eller går att läsa av som fakta.
 * Längderna (70/60 respektive 126/190 bildenheter) är desamma i båda figurerna.
 *
 * Rutan längst ned ställer samma två farter mot ett och samma avstånd till en
 * fara: vid den lägre farten slutar stoppsträckan före faran, vid den högre
 * räcker den förbi. Inte heller där anges något mått.
 */

function Badge({ cx, cy, n }: { cx: number; cy: number; n: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="11" className="fill-text-primary" />
      <text
        x={cx}
        y={cy + 5}
        textAnchor="middle"
        className="fill-surface-base text-[13px] font-semibold"
      >
        {n}
      </text>
    </g>
  );
}

/** Fartstreck bakom bilen: fler och längre ju högre fart. */
function SpeedLines({ x, y, high }: { x: number; y: number; high: boolean }) {
  return (
    <g className="stroke-attention-600" strokeWidth="2.5" strokeLinecap="round">
      {high ? (
        <>
          <line x1={x - 12} y1={y - 8} x2={x} y2={y - 8} />
          <line x1={x - 18} y1={y} x2={x} y2={y} />
          <line x1={x - 12} y1={y + 8} x2={x} y2={y + 8} />
        </>
      ) : (
        <>
          <line x1={x - 7} y1={y - 6} x2={x} y2={y - 6} />
          <line x1={x - 7} y1={y + 6} x2={x} y2={y + 6} />
        </>
      )}
    </g>
  );
}

/**
 * En vägremsa med bil, reaktionssträcka, bromssträcka och stopp.
 * `start` är bilens front, där reaktionssträckan börjar.
 */
function Segments({ start, react, brake, top, height }: { start: number; react: number; brake: number; top: number; height: number }) {
  const stop = start + react + brake;
  return (
    <g>
      <rect x={start} y={top} width={react} height={height} fill="url(#ss-react)" className="stroke-primary-600" strokeWidth="1.5" />
      <rect x={start + react} y={top} width={brake} height={height} fill="url(#ss-brake)" className="stroke-safety-600" strokeWidth="1.5" />
      <line x1={stop} y1={top - 6} x2={stop} y2={top + height + 6} className="stroke-safety-600" strokeWidth="3" />
    </g>
  );
}

export function StoppstrackaDiagram() {
  // Sträckornas längder, gemensamma för huvudfigur och ruta
  const LOW = { react: 70, brake: 60 };
  const HIGH = { react: 126, brake: 190 };
  const START = 80; // bilens front
  const HAZARD = 334; // farans läge i rutan, mellan de två stoppunkterna

  return (
    <svg
      viewBox="0 0 480 740"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="ss-title ss-desc"
    >
      <title id="ss-title">Stoppsträckans två delar</title>
      <desc id="ss-desc">
        Två vägremsor sedda uppifrån, en för lägre fart och en för högre fart. På varje remsa
        står din bil, ritad med prickmönster, till vänster och kör åt höger; fartstreck bakom
        bilen är fler och längre på raden för högre fart. Från den punkt där du ser faran löper
        stoppsträckan i två delar efter varandra, numrerade ett och två: först
        reaktionssträckan, ritad med diagonala ränder, som är vägen bilen hinner rulla från att
        du ser faran tills du trycker på bromsen, och sedan bromssträckan, ritad med rutmönster
        på röd botten, som är vägen från att du bromsar tills bilen står still. Ett lodrätt
        streck märkt Stopp avslutar varje remsa. På raden för högre fart är båda delarna längre,
        men bromssträckan har vuxit betydligt mer än reaktionssträckan och utgör nu den klart
        största delen av stoppsträckan. Inga mått anges. En ruta längst ned visar samma två
        farter mot ett och samma avstånd till en fara: vid den lägre farten slutar stoppsträckan
        före faran, markerat med en bock, vid den högre räcker stoppsträckan förbi faran,
        markerat med ett kryss. Slutsatsen står under figuren: se stoppunkten tidigt, då hinner
        du bromsa mjukt.
      </desc>

      <defs>
        {/* Elevens bil: prickar */}
        <pattern id="ss-car-fill" patternUnits="userSpaceOnUse" width="8" height="8">
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
        {/* Din bil, fronten åt höger, centrerad i origo. Fronten ligger på x = 22. */}
        <g id="ss-car">
          <rect x="-16" y="-16" width="10" height="5" rx="1.5" className="fill-text-primary" />
          <rect x="6" y="-16" width="10" height="5" rx="1.5" className="fill-text-primary" />
          <rect x="-16" y="11" width="10" height="5" rx="1.5" className="fill-text-primary" />
          <rect x="6" y="11" width="10" height="5" rx="1.5" className="fill-text-primary" />
          <rect x="-22" y="-12" width="44" height="24" rx="4" fill="url(#ss-car-fill)" className="stroke-attention-600" strokeWidth="2" />
          <rect x="6" y="-8" width="8" height="16" rx="2" className="fill-diagram-marking stroke-attention-600" strokeWidth="1" />
          <rect x="-16" y="-7" width="5" height="14" rx="2" className="fill-diagram-marking stroke-attention-600" strokeWidth="1" />
        </g>
      </defs>

      {/* Rubrik */}
      <text x="20" y="32" className="fill-text-primary text-[16px] font-semibold">
        Stoppsträcka = reaktionssträcka + bromssträcka
      </text>
      <text x="20" y="52" className="fill-text-secondary text-[13px]">
        Sedd uppifrån, bilen kör åt höger. Figuren visar förhållandet, inte mått.
      </text>

      {/* Rad 1: lägre fart */}
      <g transform="translate(0 96)">
        <text x="20" y="0" className="fill-text-primary text-[14px] font-semibold">
          Lägre fart
        </text>
        <text x={START} y="22" className="fill-text-secondary text-[13px]" textAnchor="middle">
          Ser faran
        </text>
        <text x={START + LOW.react} y="22" className="fill-text-secondary text-[13px]" textAnchor="middle">
          Bromsar
        </text>
        <text x={START + LOW.react + LOW.brake} y="22" className="fill-text-primary text-[13px] font-semibold" textAnchor="middle">
          Stopp
        </text>
        <line x1={START} y1="26" x2={START} y2="32" className="stroke-text-tertiary" strokeWidth="1" />
        <line x1={START + LOW.react} y1="26" x2={START + LOW.react} y2="32" className="stroke-text-tertiary" strokeWidth="1" />

        <rect x="20" y="32" width="440" height="48" className="fill-diagram-road" />
        <line x1="20" y1="32" x2="460" y2="32" className="stroke-diagram-edge" strokeWidth="1.5" />
        <line x1="20" y1="80" x2="460" y2="80" className="stroke-diagram-edge" strokeWidth="1.5" />

        <Segments start={START} react={LOW.react} brake={LOW.brake} top={32} height={48} />
        <Badge cx={START + LOW.react / 2} cy={56} n="1" />
        <Badge cx={START + LOW.react + LOW.brake / 2} cy={56} n="2" />

        <SpeedLines x={34} y={56} high={false} />
        <use href="#ss-car" transform="translate(58 56)" />

        {/* Hela stoppsträckan */}
        <line x1={START} y1="96" x2={START + LOW.react + LOW.brake} y2="96" className="stroke-text-tertiary" strokeWidth="1" />
        <line x1={START} y1="91" x2={START} y2="101" className="stroke-text-tertiary" strokeWidth="1" />
        <line x1={START + LOW.react + LOW.brake} y1="91" x2={START + LOW.react + LOW.brake} y2="101" className="stroke-text-tertiary" strokeWidth="1" />
        <text x={START + (LOW.react + LOW.brake) / 2} y="114" className="fill-text-secondary text-[13px] font-medium" textAnchor="middle">
          Stoppsträcka
        </text>
      </g>

      {/* Rad 2: högre fart */}
      <g transform="translate(0 236)">
        <text x="20" y="0" className="fill-text-primary text-[14px] font-semibold">
          Högre fart
        </text>
        <text x={START} y="22" className="fill-text-secondary text-[13px]" textAnchor="middle">
          Ser faran
        </text>
        <text x={START + HIGH.react} y="22" className="fill-text-secondary text-[13px]" textAnchor="middle">
          Bromsar
        </text>
        <text x={START + HIGH.react + HIGH.brake} y="22" className="fill-text-primary text-[13px] font-semibold" textAnchor="middle">
          Stopp
        </text>
        <line x1={START} y1="26" x2={START} y2="32" className="stroke-text-tertiary" strokeWidth="1" />
        <line x1={START + HIGH.react} y1="26" x2={START + HIGH.react} y2="32" className="stroke-text-tertiary" strokeWidth="1" />

        <rect x="20" y="32" width="440" height="48" className="fill-diagram-road" />
        <line x1="20" y1="32" x2="460" y2="32" className="stroke-diagram-edge" strokeWidth="1.5" />
        <line x1="20" y1="80" x2="460" y2="80" className="stroke-diagram-edge" strokeWidth="1.5" />

        <Segments start={START} react={HIGH.react} brake={HIGH.brake} top={32} height={48} />
        <Badge cx={START + HIGH.react / 2} cy={56} n="1" />
        <Badge cx={START + HIGH.react + HIGH.brake / 2} cy={56} n="2" />

        <SpeedLines x={34} y={56} high />
        <use href="#ss-car" transform="translate(58 56)" />

        <line x1={START} y1="96" x2={START + HIGH.react + HIGH.brake} y2="96" className="stroke-text-tertiary" strokeWidth="1" />
        <line x1={START} y1="91" x2={START} y2="101" className="stroke-text-tertiary" strokeWidth="1" />
        <line x1={START + HIGH.react + HIGH.brake} y1="91" x2={START + HIGH.react + HIGH.brake} y2="101" className="stroke-text-tertiary" strokeWidth="1" />
        <text x={START + (HIGH.react + HIGH.brake) / 2} y="114" className="fill-text-secondary text-[13px] font-medium" textAnchor="middle">
          Stoppsträcka
        </text>
      </g>

      <text x="240" y="382" className="fill-text-primary text-[13px] font-medium" textAnchor="middle">
        Båda delarna växer med farten — bromssträckan växer snabbast.
      </text>

      {/* Teckenförklaring: de två numrerade delarna */}
      <Badge cx={30} cy={414} n="1" />
      <rect x="46" y="407" width="22" height="14" fill="url(#ss-react)" className="stroke-primary-600" strokeWidth="1" />
      <text x="76" y="418" className="fill-text-primary text-[13px] font-semibold">
        Reaktionssträcka
      </text>
      <text x="76" y="436" className="fill-text-secondary text-[13px]">
        från att du ser faran tills du trycker på bromsen
      </text>

      <Badge cx={30} cy={458} n="2" />
      <rect x="46" y="451" width="22" height="14" fill="url(#ss-brake)" className="stroke-safety-600" strokeWidth="1" />
      <text x="76" y="462" className="fill-text-primary text-[13px] font-semibold">
        Bromssträcka
      </text>
      <text x="76" y="480" className="fill-text-secondary text-[13px]">
        från att du bromsar tills bilen står still
      </text>

      {/* Förklaringsruta: samma avstånd till faran, två farter */}
      <rect x="20" y="502" width="440" height="190" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="34" y="526" className="fill-text-primary text-[13px] font-semibold">
        Samma avstånd till faran:
      </text>

      {/* Lägre fart: stoppsträckan slutar före faran */}
      <g transform="translate(0 546)">
        <text x={HAZARD} y="-8" className="fill-text-primary text-[13px] font-semibold" textAnchor="middle">
          Fara
        </text>
        <rect x="40" y="0" width="400" height="32" className="fill-diagram-road" />
        <Segments start={START + 20} react={LOW.react} brake={LOW.brake} top={0} height={32} />
        <SpeedLines x={54} y={16} high={false} />
        <use href="#ss-car" transform="translate(78 16)" />
        <rect x={HAZARD - 4} y="-3" width="8" height="38" className="fill-text-primary" />
        <path d="M 42 52 l 5 5 l 9 -11" className="fill-none stroke-progress-600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="64" y="57" className="fill-text-primary text-[13px]">
          Lägre fart: du stannar före faran
        </text>
      </g>

      {/* Högre fart: stoppsträckan räcker förbi faran */}
      <g transform="translate(0 624)">
        <rect x="40" y="0" width="400" height="32" className="fill-diagram-road" />
        <Segments start={START + 20} react={HIGH.react} brake={HIGH.brake} top={0} height={32} />
        <SpeedLines x={54} y={16} high />
        <use href="#ss-car" transform="translate(78 16)" />
        <rect x={HAZARD - 4} y="-3" width="8" height="38" className="fill-text-primary" />
        <path d="M 42 47 L 54 59 M 54 47 L 42 59" className="stroke-safety-600" strokeWidth="3" strokeLinecap="round" />
        <text x="64" y="57" className="fill-text-primary text-[13px]">
          Högre fart: stoppsträckan räcker förbi faran
        </text>
      </g>

      <text x="240" y="722" className="fill-text-primary text-[13px] font-medium" textAnchor="middle">
        Se stoppunkten tidigt — då hinner du bromsa mjukt.
      </text>
    </svg>
  );
}
