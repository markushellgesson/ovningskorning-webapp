/**
 * Blicken långt fram — styrningen följer blicken (MAN-02, OBS-01).
 * Två vägar sedda uppifrån, bilen kör uppåt i högra körfältet.
 * Överst: blicken långt fram, bilens väg blir rak och jämn.
 * Underst: blicken strax framför bilen, bilens väg slingrar.
 *
 * Geometri: vägen ligger x 150–270, mittlinje x = 210, höger körfält x 210–270.
 * Bilen kör uppåt, så dess högra sida är bildens högra: bilen står i x 225–255.
 *
 * Båda panelerna ritas i dessa koordinater inuti varsin grupp med
 * translate(−70 …), så att marginalen till höger rymmer numrerade
 * hänvisningar. Geometrin är oförändrad.
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

export function BlickenLangtFramDiagram() {
  return (
    <svg
      viewBox="0 0 460 756"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="bl-title bl-desc"
    >
      <title id="bl-title">Blicken långt fram styr bilen</title>
      <desc id="bl-desc">
        Två likadana raka vägar sedda uppifrån, den ena ovanför den andra. På båda kör din bil,
        ritad med prickmönster, uppåt i högra körfältet. Den övre vägen är märkt Rätt med en
        bock: en cirkel långt fram på vägen markerar var blicken ligger, dit bilen ska vara om
        några sekunder, och bilens väg dit är en rak, jämn linje med pil. Det ger jämn körning
        och tid att planera. Den nedre vägen är märkt Fel med ett kryss: cirkeln ligger
        alldeles framför bilens front, blicken har fastnat nära, och bilens väg framåt är en
        vågig linje som slingrar fram och tillbaka över körfältet. Det ger ryckig styrning och
        sena reaktioner. I båda panelerna pekar numrerade hänvisningar på blickpunkten, bilens
        väg och bilen. Slutsatsen står i en ruta under figuren: titta dit du vill att bilen ska
        åka, blicken drar styrningen med sig.
      </desc>

      <defs>
        {/* Elevens bil: prickar */}
        <pattern id="bl-car-fill" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
        </pattern>
        <marker
          id="bl-arrow-ok"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="4"
          markerHeight="4"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-progress-600" />
        </marker>
        <marker
          id="bl-arrow-bad"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="4"
          markerHeight="4"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-safety-600" />
        </marker>
        <marker
          id="bl-arrow-key"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="4"
          markerHeight="4"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-text-primary" />
        </marker>
        {/* Din bil, fronten uppåt, centrerad i origo: karossen är 30 × 44 */}
        <g id="bl-car">
          <rect x="-17" y="-18" width="4" height="10" rx="1" className="fill-text-primary" />
          <rect x="13" y="-18" width="4" height="10" rx="1" className="fill-text-primary" />
          <rect x="-17" y="8" width="4" height="10" rx="1" className="fill-text-primary" />
          <rect x="13" y="8" width="4" height="10" rx="1" className="fill-text-primary" />
          <rect x="-15" y="-22" width="30" height="44" rx="4" fill="url(#bl-car-fill)" className="stroke-attention-600" strokeWidth="2" />
          <rect x="-10" y="-16" width="20" height="8" rx="2" className="fill-diagram-marking stroke-attention-600" strokeWidth="1" />
          <rect x="-10" y="11" width="20" height="5" rx="2" className="fill-diagram-marking stroke-attention-600" strokeWidth="1" />
        </g>
      </defs>

      {/* Rubrik */}
      <text x="20" y="32" className="fill-text-primary text-[16px] font-semibold">
        Blicken långt fram styr bilen
      </text>
      <text x="20" y="52" className="fill-text-secondary text-[13px]">
        Sett uppifrån — du kör uppåt.
      </text>

      {/* Teckenförklaring */}
      <g>
        <path d="M 300 28 L 326 28" className="stroke-text-primary" strokeWidth="3" markerEnd="url(#bl-arrow-key)" />
        <text x="340" y="32" className="fill-text-secondary text-[13px]">
          Bilens väg
        </text>
        <circle cx="313" cy="52" r="7" className="fill-none stroke-text-primary" strokeWidth="2" />
        <circle cx="313" cy="52" r="2.5" className="fill-text-primary" />
        <text x="340" y="56" className="fill-text-secondary text-[13px]">
          Blickpunkt
        </text>
      </g>

      {/* Rätt: blicken långt fram */}
      <path d="M 20 86 l 5 5 l 9 -11" className="fill-none stroke-progress-600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="42" y="91" className="fill-text-primary text-[14px] font-semibold">
        Rätt: blicken långt fram
      </text>

      <g transform="translate(-70 70)">
        {/* Väg */}
        <rect
          x="150"
          y="34"
          width="120"
          height="220"
          className="fill-diagram-road stroke-diagram-edge"
          strokeWidth="2"
        />
        <line
          x1="210"
          y1="34"
          x2="210"
          y2="254"
          className="stroke-diagram-marking"
          strokeWidth="2"
          strokeDasharray="10 8"
        />

        {/* Bilens väg: rak och jämn */}
        <path
          d="M 240 206 L 240 66"
          className="stroke-progress-600"
          strokeWidth="3"
          fill="none"
          markerEnd="url(#bl-arrow-ok)"
        />

        {/* Blickpunkt långt fram */}
        <circle
          cx="240"
          cy="52"
          r="10"
          className="fill-progress-200 stroke-progress-600"
          strokeWidth="2"
        />
        <circle cx="240" cy="52" r="3" className="fill-progress-600" />

        {/* Bilen: kaross x 225–255, y 206–250 */}
        <use href="#bl-car" transform="translate(240 228)" />
      </g>

      <g className="stroke-text-tertiary" strokeWidth="1.5">
        <line x1="229" y1="122" x2="184" y2="122" />
        <line x1="229" y1="212" x2="174" y2="212" />
        <line x1="229" y1="300" x2="190" y2="300" />
      </g>
      <g className="fill-text-tertiary">
        <circle cx="184" cy="122" r="3" />
        <circle cx="174" cy="212" r="3" />
        <circle cx="190" cy="300" r="3" />
      </g>

      <Badge cx={242} cy={122} n="1" />
      <text x="258" y="126" className="fill-text-primary text-[13px] font-semibold">
        Blicken hit
      </text>
      <text x="231" y="144" className="fill-text-secondary text-[13px]">
        dit bilen ska vara
      </text>
      <text x="231" y="160" className="fill-text-secondary text-[13px]">
        om några sekunder
      </text>

      <Badge cx={242} cy={212} n="2" />
      <text x="258" y="216" className="fill-text-primary text-[13px] font-semibold">
        Bilens väg: jämn
      </text>
      <text x="231" y="234" className="fill-text-secondary text-[13px]">
        tid att planera
      </text>

      <Badge cx={242} cy={300} n="3" />
      <text x="258" y="304" className="fill-text-primary text-[13px] font-semibold">
        Du
      </text>
      <text x="231" y="322" className="fill-text-secondary text-[13px]">
        i högra körfältet
      </text>

      {/* Fel: blicken strax framför bilen */}
      <path d="M 20 408 L 34 422 M 34 408 L 20 422" className="stroke-safety-600" strokeWidth="3" strokeLinecap="round" />
      <text x="42" y="421" className="fill-text-primary text-[14px] font-semibold">
        Fel: blicken strax framför bilen
      </text>

      <g transform="translate(-70 400)">
        <rect
          x="150"
          y="34"
          width="120"
          height="220"
          className="fill-diagram-road stroke-diagram-edge"
          strokeWidth="2"
        />
        <line
          x1="210"
          y1="34"
          x2="210"
          y2="254"
          className="stroke-diagram-marking"
          strokeWidth="2"
          strokeDasharray="10 8"
        />

        {/* Bilens väg: slingrar */}
        <path
          d="M 240 206 Q 220 180 240 154 Q 260 128 240 102 Q 220 76 240 56"
          className="stroke-safety-600"
          strokeWidth="3"
          fill="none"
          markerEnd="url(#bl-arrow-bad)"
        />

        {/* Blickpunkt strax framför bilen */}
        <circle
          cx="240"
          cy="188"
          r="10"
          className="fill-safety-200 stroke-safety-600"
          strokeWidth="2"
        />
        <circle cx="240" cy="188" r="3" className="fill-safety-600" />

        <use href="#bl-car" transform="translate(240 228)" />
      </g>

      <g className="stroke-text-tertiary" strokeWidth="1.5">
        <line x1="229" y1="588" x2="184" y2="588" />
        <line x1="229" y1="520" x2="183" y2="527" />
        <line x1="229" y1="630" x2="190" y2="630" />
      </g>
      <g className="fill-text-tertiary">
        <circle cx="184" cy="588" r="3" />
        <circle cx="183" cy="527" r="3" />
        <circle cx="190" cy="630" r="3" />
      </g>

      <Badge cx={242} cy={520} n="2" />
      <text x="258" y="524" className="fill-text-primary text-[13px] font-semibold">
        Bilens väg: slingrar
      </text>
      <text x="231" y="542" className="fill-text-secondary text-[13px]">
        ryckig styrning,
      </text>
      <text x="231" y="558" className="fill-text-secondary text-[13px]">
        sena reaktioner
      </text>

      <Badge cx={242} cy={588} n="1" />
      <text x="258" y="592" className="fill-text-primary text-[13px] font-semibold">
        Blicken fastnar
      </text>
      <text x="231" y="610" className="fill-text-secondary text-[13px]">
        strax framför bilen
      </text>

      <Badge cx={242} cy={630} n="3" />
      <text x="258" y="634" className="fill-text-primary text-[13px] font-semibold">
        Du
      </text>
      <text x="231" y="652" className="fill-text-secondary text-[13px]">
        i högra körfältet
      </text>

      {/* Slutsats */}
      <rect x="20" y="680" width="420" height="60" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="230" y="705" className="fill-text-primary text-[13px] font-semibold" textAnchor="middle">
        Titta dit du vill att bilen ska åka —
      </text>
      <text x="230" y="725" className="fill-text-primary text-[13px]" textAnchor="middle">
        blicken drar styrningen med sig.
      </text>
    </svg>
  );
}
