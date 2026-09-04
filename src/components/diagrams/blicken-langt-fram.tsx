/**
 * Blicken långt fram — styrningen följer blicken (MAN-02, OBS-01).
 * Två vägar sedda uppifrån, bilen kör uppåt i högra körfältet.
 * Överst: blicken långt fram, bilens väg blir rak och jämn.
 * Underst: blicken strax framför bilen, bilens väg slingrar.
 *
 * Geometri: vägen ligger x 150–270, mittlinje x = 210, höger körfält x 210–270.
 * Bilen kör uppåt, så dess högra sida är bildens högra: bilen står i x 225–255.
 */

export function BlickenLangtFramDiagram() {
  return (
    <svg
      viewBox="0 0 400 570"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="bl-title bl-desc"
    >
      <title id="bl-title">Blicken långt fram styr bilen</title>
      <desc id="bl-desc">
        Två likadana raka vägar sedda uppifrån, den ena ovanför den andra. På båda kör din bil,
        ritad med prickmönster, uppåt i högra körfältet. Den övre vägen är märkt Rätt: en
        cirkel långt fram på vägen markerar var blicken ligger, dit bilen ska vara om några
        sekunder, och bilens väg dit är en rak, jämn linje med pil. Det ger jämn körning och
        tid att planera. Den nedre vägen är märkt Fel: cirkeln ligger alldeles framför bilens
        front, blicken har fastnat nära, och bilens väg framåt är en vågig linje som slingrar
        fram och tillbaka över körfältet. Det ger ryckig styrning och sena reaktioner.
        Slutsatsen står under figuren: titta dit du vill att bilen ska åka, blicken drar
        styrningen med sig.
      </desc>

      <defs>
        {/* Elevens bil: prickar */}
        <pattern id="bl-car" patternUnits="userSpaceOnUse" width="8" height="8">
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
      </defs>

      {/* Rätt: blicken långt fram */}
      <g>
        <text x="20" y="22" className="fill-text-primary text-[14px] font-semibold">
          Rätt: blicken långt fram
        </text>

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

        {/* Bilen */}
        <rect
          x="225"
          y="206"
          width="30"
          height="44"
          rx="3"
          fill="url(#bl-car)"
          className="stroke-attention-600"
          strokeWidth="2"
        />

        {/* Etiketter */}
        <text x="282" y="50" className="fill-text-primary text-[13px] font-medium">
          Blicken hit —
        </text>
        <text x="282" y="66" className="fill-text-secondary text-[13px]">
          dit bilen ska vara
        </text>
        <text x="282" y="82" className="fill-text-secondary text-[13px]">
          om några sekunder
        </text>

        <line
          x1="244"
          y1="140"
          x2="276"
          y2="140"
          className="stroke-text-tertiary"
          strokeWidth="1"
        />
        <text x="282" y="136" className="fill-text-primary text-[13px] font-medium">
          Bilens väg: jämn
        </text>
        <text x="282" y="152" className="fill-text-secondary text-[13px]">
          tid att planera
        </text>

        <text x="20" y="232" className="fill-text-primary text-[13px] font-semibold">
          Du
        </text>
        <line
          x1="42"
          y1="228"
          x2="222"
          y2="228"
          className="stroke-text-tertiary"
          strokeWidth="1"
        />
      </g>

      {/* Fel: blicken strax framför bilen */}
      <g transform="translate(0, 270)">
        <text x="20" y="22" className="fill-text-primary text-[14px] font-semibold">
          Fel: blicken strax framför bilen
        </text>

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

        <rect
          x="225"
          y="206"
          width="30"
          height="44"
          rx="3"
          fill="url(#bl-car)"
          className="stroke-attention-600"
          strokeWidth="2"
        />

        <text x="282" y="184" className="fill-text-primary text-[13px] font-medium">
          Blicken fastnar
        </text>
        <text x="282" y="200" className="fill-text-secondary text-[13px]">
          strax framför bilen
        </text>

        <line
          x1="252"
          y1="118"
          x2="276"
          y2="118"
          className="stroke-text-tertiary"
          strokeWidth="1"
        />
        <text x="282" y="114" className="fill-text-primary text-[13px] font-medium">
          Bilens väg: slingrar
        </text>
        <text x="282" y="130" className="fill-text-secondary text-[13px]">
          ryckig styrning,
        </text>
        <text x="282" y="146" className="fill-text-secondary text-[13px]">
          sena reaktioner
        </text>

        <text x="20" y="232" className="fill-text-primary text-[13px] font-semibold">
          Du
        </text>
        <line
          x1="42"
          y1="228"
          x2="222"
          y2="228"
          className="stroke-text-tertiary"
          strokeWidth="1"
        />
      </g>

      {/* Slutsats */}
      <text
        x="200"
        y="540"
        className="fill-text-primary text-[13px] font-medium"
        textAnchor="middle"
      >
        Titta dit du vill att bilen ska åka —
      </text>
      <text
        x="200"
        y="558"
        className="fill-text-primary text-[13px] font-medium"
        textAnchor="middle"
      >
        blicken drar styrningen med sig.
      </text>
    </svg>
  );
}
