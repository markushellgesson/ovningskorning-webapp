/**
 * Stoppsträckan — reaktionssträcka plus bromssträcka (MAN-06).
 *
 * Vad bilden lär ut: stoppsträckan består av två delar efter varandra, och de
 * växer inte lika fort när farten stiger. Bilden är kvalitativ.
 *
 * INGA MÅTT. Det står ingen meter, ingen sekund och ingen multipel i bilden,
 * varken i text eller som avläsbar skala. Det finns ingen axel, inga
 * gradmarkeringar och ingen siffra vid någon stapel. Underrubriken säger
 * uttryckligen att figuren visar förhållandet mellan delarna, inte mått.
 *
 * ---- Geometri (vy uppifrån) ----
 * Huvudfiguren: två vägremsor under varandra, bilen kör åt HÖGER (ökande x).
 * Vid högertrafik och färdriktning åt höger ligger fordonets högra sida mot
 * bildens nedre kant; remsan visar bara det egna körfältet, så ingen mittlinje
 * ritas och inget fordon kan hamna i fel körfält. Båda remsorna har samma
 * startlinje x = 96 ("ser faran"), så längderna är jämförbara rakt av.
 *   Lägre fart: reaktion 66, broms 48, stopp vid x = 210
 *   Högre fart: reaktion 119, broms 156, stopp vid x = 371
 * Formen är fysikaliskt riktig: reaktionssträckan skalar linjärt med farten
 * (66 → 119) medan bromssträckan skalar med kvadraten (48 → 156). Talen är
 * bildenheter valda för att ge den formen och representerar inga meter.
 *
 * Förklaringsrutan: samma två farter i skala 0.45, nu som två lodräta remsor
 * sida vid sida där bilarna kör UPPÅT. Panelerna delar två vågräta
 * referenslinjer, vilket är hela poängen med att ställa dem bredvid varandra:
 *   y = 708  gemensam startlinje "ser faran" (båda bilarnas front)
 *   y = 628  faran, samma avstånd i båda panelerna
 * Efterräknat: lägre fart stannar vid y = 656.7, alltså 28.7 enheter FÖRE
 * faran; högre fart stannar vid y = 584.2, alltså 43.8 enheter EFTER den.
 *
 * Mönster: prickar = din bil, diagonala ränder = reaktionssträcka,
 * rutmönster = bromssträcka. Inget mönster betyder två saker. Varje del bär
 * dessutom siffra och etikett, så färgen bär ingenting ensam.
 */

function Badge({ cx, cy, n }: { cx: number; cy: number; n: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="11" className="fill-text-primary" />
      <text x={cx} y={cy + 5} textAnchor="middle" className="fill-surface-base text-[13px] font-semibold">
        {n}
      </text>
    </g>
  );
}

/** Fartstreck bakom bilen: fler och längre ju högre fart. Säger tempo utan siffror. */
function SpeedLines({ x, y, high }: { x: number; y: number; high: boolean }) {
  const marks = high
    ? [
        [-8, 14],
        [0, 22],
        [8, 14],
      ]
    : [
        [-6, 9],
        [6, 9],
      ];
  return (
    <g className="stroke-attention-600" strokeWidth="2.5" strokeLinecap="round">
      {marks.map(([off, len], i) => (
        <line key={i} x1={x} y1={y + off} x2={x - len} y2={y + off} />
      ))}
    </g>
  );
}

/** Vågrät stoppsträcka: reaktionsdel, bromsdel och en stopplinje. */
function SegmentsH({
  start,
  react,
  brake,
  top,
  height,
}: {
  start: number;
  react: number;
  brake: number;
  top: number;
  height: number;
}) {
  const stop = start + react + brake;
  return (
    <g>
      <rect x={start} y={top} width={react} height={height} fill="url(#ss-react)" className="stroke-primary-600" strokeWidth="1.5" />
      <rect x={start + react} y={top} width={brake} height={height} fill="url(#ss-brake)" className="stroke-safety-600" strokeWidth="1.5" />
      <line x1={stop} y1={top - 7} x2={stop} y2={top + height + 7} className="stroke-safety-600" strokeWidth="3" />
    </g>
  );
}

/** Lodrät stoppsträcka i förklaringsrutan: bilen kör uppåt, sträckorna växer uppåt. */
function SegmentsV({
  x,
  width,
  start,
  react,
  brake,
}: {
  x: number;
  width: number;
  start: number;
  react: number;
  brake: number;
}) {
  const stop = start - react - brake;
  return (
    <g>
      <rect x={x} y={start - react} width={width} height={react} fill="url(#ss-react)" className="stroke-primary-600" strokeWidth="1.5" />
      <rect x={x} y={stop} width={width} height={brake} fill="url(#ss-brake)" className="stroke-safety-600" strokeWidth="1.5" />
      <line x1={x - 7} y1={stop} x2={x + width + 7} y2={stop} className="stroke-safety-600" strokeWidth="3" />
    </g>
  );
}

const START = 96;
const LOW = { react: 66, brake: 48 };
const HIGH = { react: 119, brake: 156 };

/** Förklaringsrutans skala och gemensamma referenslinjer. */
const K = 0.45;
const V_START = 708;
const V_HAZARD = 628;

export function StoppstrackaDiagram() {
  const lowStop = START + LOW.react + LOW.brake;
  const highStop = START + HIGH.react + HIGH.brake;

  return (
    <svg
      viewBox="0 0 480 842"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="ss-title ss-desc"
    >
      <title id="ss-title">Stoppsträckans två delar</title>
      <desc id="ss-desc">
        Två vägremsor sedda uppifrån, den ena under den andra, en för lägre fart och en för högre.
        På båda står din bil, fylld med prickmönster, till vänster och kör åt höger, och båda
        remsorna har samma startlinje märkt Ser faran, så att längderna går att jämföra. Bakom
        bilen finns fartstreck: två korta på raden för lägre fart, tre längre på raden för högre.
        Från startlinjen löper stoppsträckan i två delar efter varandra. Först markering ett,
        reaktionssträckan, ritad med diagonala ränder: vägen bilen rullar från att du ser faran
        tills du trycker på bromsen. Sedan markering två, bromssträckan, ritad med rutmönster:
        vägen från att du börjar bromsa tills bilen står still. Ett lodrätt streck märkt Stopp
        avslutar varje remsa, och en måttlös hjälplinje under remsan visar hela stoppsträckan. På
        raden för högre fart är båda delarna längre, men bromssträckan har vuxit betydligt mer än
        reaktionssträckan och är där den klart största delen. Inga mått anges, varken i meter,
        sekunder eller multiplar; figuren visar bara förhållandet mellan delarna. En ruta längst
        ned visar samma två farter en gång till, nu som två lodräta vägremsor bredvid varandra
        där bilarna kör uppåt. Panelerna delar två vågräta linjer: en prickad startlinje märkt Ser
        faran vid bilarnas front, och ett kraftigt mörkt streck märkt Fara lika långt fram i båda
        panelerna. Vid lägre fart slutar stoppsträckan före faran, markerat med en bock. Vid högre
        fart räcker stoppsträckan förbi faran, markerat med ett kryss. Under rutan står att den
        som ser stoppunkten tidigt hinner bromsa mjukt hela vägen in.
      </desc>

      <defs>
        {/* Din bil: prickar */}
        <pattern id="ss-car-fill" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        {/* Reaktionssträcka: diagonala ränder */}
        <pattern id="ss-react" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="1.6" />
        </pattern>
        {/* Bromssträcka: rutmönster */}
        <pattern id="ss-brake" patternUnits="userSpaceOnUse" width="12" height="12">
          <rect width="12" height="12" className="fill-safety-200" />
          <path d="M 0 0 L 12 12 M 12 0 L 0 12" className="stroke-safety-600" strokeWidth="1.2" />
        </pattern>
        {/* Din bil, fronten åt höger, centrerad i origo. Fronten ligger på x = 24. */}
        <g id="ss-car-right">
          <g className="fill-text-primary">
            <rect x="-17" y="-17" width="10" height="5" rx="1.5" />
            <rect x="8" y="-17" width="10" height="5" rx="1.5" />
            <rect x="-17" y="12" width="10" height="5" rx="1.5" />
            <rect x="8" y="12" width="10" height="5" rx="1.5" />
          </g>
          <rect x="-24" y="-13" width="48" height="26" rx="4" fill="url(#ss-car-fill)" className="stroke-attention-600" strokeWidth="2" />
          <rect x="7" y="-9" width="9" height="18" rx="2" className="fill-diagram-marking stroke-attention-600" strokeWidth="1" />
          <rect x="-17" y="-8" width="6" height="16" rx="2" className="fill-diagram-marking stroke-attention-600" strokeWidth="1" />
        </g>
        {/* Samma bil, fronten uppåt, för förklaringsrutan. Fronten ligger på y = −24. */}
        <g id="ss-car-up">
          <g className="fill-text-primary">
            <rect x="-17" y="-17" width="5" height="10" rx="1.5" />
            <rect x="12" y="-17" width="5" height="10" rx="1.5" />
            <rect x="-17" y="8" width="5" height="10" rx="1.5" />
            <rect x="12" y="8" width="5" height="10" rx="1.5" />
          </g>
          <rect x="-13" y="-24" width="26" height="48" rx="4" fill="url(#ss-car-fill)" className="stroke-attention-600" strokeWidth="2" />
          <rect x="-9" y="-16" width="18" height="9" rx="2" className="fill-diagram-marking stroke-attention-600" strokeWidth="1" />
          <rect x="-8" y="11" width="16" height="6" rx="2" className="fill-diagram-marking stroke-attention-600" strokeWidth="1" />
        </g>
      </defs>

      {/* Rubrik */}
      <text x="20" y="30" className="fill-text-primary text-[16px] font-semibold">
        Stoppsträcka = reaktionssträcka + bromssträcka
      </text>
      <text x="20" y="50" className="fill-text-secondary text-[13px]">
        Sedd uppifrån, du kör åt höger. Figuren visar förhållandet mellan
      </text>
      <text x="20" y="66" className="fill-text-secondary text-[13px]">
        delarna — inga mått anges.
      </text>

      {/* ---- Rad 1: lägre fart ---- */}
      <g transform="translate(0 92)">
        <text x="20" y="8" className="fill-text-primary text-[14px] font-semibold">
          Lägre fart
        </text>
        <text x={START + LOW.react} y="8" textAnchor="middle" className="fill-text-secondary text-[13px]">
          Bromsar
        </text>
        <text x={START} y="28" textAnchor="middle" className="fill-text-secondary text-[13px]">
          Ser faran
        </text>
        <text x={lowStop} y="28" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
          Stopp
        </text>
        <g className="stroke-text-tertiary" strokeWidth="1">
          <line x1={START} y1="32" x2={START} y2="36" />
          <line x1={START + LOW.react} y1="12" x2={START + LOW.react} y2="36" />
        </g>

        <rect x="24" y="36" width="432" height="48" className="fill-diagram-road" />
        <line x1="24" y1="36" x2="456" y2="36" className="stroke-diagram-edge" strokeWidth="1.5" />
        <line x1="24" y1="84" x2="456" y2="84" className="stroke-diagram-edge" strokeWidth="1.5" />

        <SegmentsH start={START} react={LOW.react} brake={LOW.brake} top={36} height={48} />
        <Badge cx={START + LOW.react / 2} cy={60} n="1" />
        <Badge cx={START + LOW.react + LOW.brake / 2} cy={60} n="2" />

        <SpeedLines x={46} y={60} high={false} />
        <use href="#ss-car-right" transform="translate(72 60)" />

        <g className="stroke-text-tertiary" strokeWidth="1">
          <line x1={START} y1="100" x2={lowStop} y2="100" />
          <line x1={START} y1="95" x2={START} y2="105" />
          <line x1={lowStop} y1="95" x2={lowStop} y2="105" />
        </g>
        <text x={START + (LOW.react + LOW.brake) / 2} y="120" textAnchor="middle" className="fill-text-secondary text-[13px] font-medium">
          Stoppsträcka
        </text>
      </g>

      {/* ---- Rad 2: högre fart ---- */}
      <g transform="translate(0 232)">
        <text x="20" y="8" className="fill-text-primary text-[14px] font-semibold">
          Högre fart
        </text>
        <text x={START + HIGH.react} y="8" textAnchor="middle" className="fill-text-secondary text-[13px]">
          Bromsar
        </text>
        <text x={START} y="28" textAnchor="middle" className="fill-text-secondary text-[13px]">
          Ser faran
        </text>
        <text x={highStop} y="28" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
          Stopp
        </text>
        <g className="stroke-text-tertiary" strokeWidth="1">
          <line x1={START} y1="32" x2={START} y2="36" />
          <line x1={START + HIGH.react} y1="12" x2={START + HIGH.react} y2="36" />
        </g>

        <rect x="24" y="36" width="432" height="48" className="fill-diagram-road" />
        <line x1="24" y1="36" x2="456" y2="36" className="stroke-diagram-edge" strokeWidth="1.5" />
        <line x1="24" y1="84" x2="456" y2="84" className="stroke-diagram-edge" strokeWidth="1.5" />

        <SegmentsH start={START} react={HIGH.react} brake={HIGH.brake} top={36} height={48} />
        <Badge cx={START + HIGH.react / 2} cy={60} n="1" />
        <Badge cx={START + HIGH.react + HIGH.brake / 2} cy={60} n="2" />

        <SpeedLines x={46} y={60} high />
        <use href="#ss-car-right" transform="translate(72 60)" />

        <g className="stroke-text-tertiary" strokeWidth="1">
          <line x1={START} y1="100" x2={highStop} y2="100" />
          <line x1={START} y1="95" x2={START} y2="105" />
          <line x1={highStop} y1="95" x2={highStop} y2="105" />
        </g>
        <text x={START + (HIGH.react + HIGH.brake) / 2} y="120" textAnchor="middle" className="fill-text-secondary text-[13px] font-medium">
          Stoppsträcka
        </text>
      </g>

      {/* Slutsats om formen, utan tal */}
      <text x="240" y="386" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        Båda delarna växer med farten. Bromssträckan växer
      </text>
      <text x="240" y="406" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        snabbare och tar över vid högre fart.
      </text>

      {/* Teckenförklaring för de två numrerade delarna */}
      <Badge cx={32} cy={436} n="1" />
      <rect x="48" y="429" width="24" height="14" fill="url(#ss-react)" className="stroke-primary-600" strokeWidth="1" />
      <text x="80" y="441" className="fill-text-primary text-[13px] font-semibold">
        Reaktionssträcka
      </text>
      <text x="80" y="459" className="fill-text-secondary text-[13px]">
        från att du ser faran tills du trycker på bromsen
      </text>

      <Badge cx={32} cy={484} n="2" />
      <rect x="48" y="477" width="24" height="14" fill="url(#ss-brake)" className="stroke-safety-600" strokeWidth="1" />
      <text x="80" y="489" className="fill-text-primary text-[13px] font-semibold">
        Bromssträcka
      </text>
      <text x="80" y="507" className="fill-text-secondary text-[13px]">
        från att du börjar bromsa tills bilen står still
      </text>

      {/* ---- Förklaringsruta: samma avstånd till faran, två farter ---- */}
      <rect x="20" y="528" width="440" height="292" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="34" y="552" className="fill-text-primary text-[13px] font-semibold">
        Om en fara dyker upp på samma avstånd:
      </text>

      {/* Vägremsor, bilarna kör uppåt */}
      <rect x="118" y="570" width="60" height="190" className="fill-diagram-road" />
      <rect x="302" y="570" width="60" height="190" className="fill-diagram-road" />
      <g className="stroke-diagram-edge" strokeWidth="1.5">
        <line x1="118" y1="570" x2="118" y2="760" />
        <line x1="178" y1="570" x2="178" y2="760" />
        <line x1="302" y1="570" x2="302" y2="760" />
        <line x1="362" y1="570" x2="362" y2="760" />
      </g>

      <SegmentsV x={118} width={60} start={V_START} react={LOW.react * K} brake={LOW.brake * K} />
      <SegmentsV x={302} width={60} start={V_START} react={HIGH.react * K} brake={HIGH.brake * K} />

      {/* Gemensam startlinje: båda bilarnas front */}
      <text x="34" y="700" className="fill-text-secondary text-[13px]">
        Ser faran
      </text>
      <line
        x1="34"
        y1={V_START}
        x2="372"
        y2={V_START}
        className="stroke-text-tertiary"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="0.5 5"
      />

      {/* Gemensam fara: samma avstånd i båda panelerna */}
      <line x1="104" y1={V_HAZARD} x2="376" y2={V_HAZARD} className="stroke-text-primary" strokeWidth="4" />
      <text x="384" y={V_HAZARD + 5} className="fill-text-primary text-[13px] font-semibold">
        Fara
      </text>

      <use href="#ss-car-up" transform="translate(148 732)" />
      <use href="#ss-car-up" transform="translate(332 732)" />

      <text x="148" y="782" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Lägre fart
      </text>
      <text x="148" y="798" textAnchor="middle" className="fill-text-secondary text-[13px]">
        du stannar före faran
      </text>
      <path
        d="M 141 806 l 5 5 l 10 -11"
        className="fill-none stroke-progress-600"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <text x="332" y="782" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Högre fart
      </text>
      <text x="332" y="798" textAnchor="middle" className="fill-text-secondary text-[13px]">
        stoppsträckan räcker förbi
      </text>
      <path d="M 326 803 L 338 815 M 338 803 L 326 815" className="stroke-safety-600" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
