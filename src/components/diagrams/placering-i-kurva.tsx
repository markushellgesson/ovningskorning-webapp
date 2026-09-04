/**
 * Placering i kurva — sikt genom kurvan (RUR-01, RUR-02).
 * Högerkurva sedd uppifrån. Bilen kör uppåt i högra körfältet, till höger men med
 * marginal till kanten. Kurvans insida skymmer vägen längre fram: siktlinjen tangerar
 * innerkanten, och vägen bortom den är dold. Du måste kunna stanna på den sträcka du ser,
 * därför sänks farten före kurvan.
 *
 * Geometri (kurvans centrum C = (270, 300), vägbredd 120):
 * - Mittlinje: rakt x = 110 upp till y = 300, sedan cirkelbåge r = 160 till (270, 140), sedan rakt åt höger.
 * - Innerkant r = 100 → (170, y) rakt, bågen slutar i (270, 200). Ytterkant r = 220 → (50, y), slutar i (270, 80).
 * - Bilen står i x 134–160 i höger körfält (x 110–170): 10 px marginal till innerkanten, 24 px till mittlinjen.
 * - Siktlinje från bilens front E = (147, 400): |EC| = 158,5, tangent till innerkanten (r = 100)
 *   har riktning (0,2045, −0,9789), tangeringspunkt T = (172, 280), och lämnar vägen vid
 *   ytterkanten i P = (212, 88). Linjen skär höger körfälts mitt (r = 130) i S = (189, 198):
 *   så långt ser föraren av sitt eget körfält.
 * - Dold väg = den del av vägbanan som ligger bortom T på siktlinjens bortre sida, urklippt med vägformen.
 */

export function PlaceringIKurvaDiagram() {
  return (
    <svg
      viewBox="0 0 420 600"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="pk-title pk-desc"
    >
      <title id="pk-title">Sikt genom kurvan</title>
      <desc id="pk-desc">
        Landsväg sedd uppifrån som går rakt uppåt och sedan svänger höger. Din bil, ritad med
        prickmönster, kör uppåt i högra körfältet: den ligger till höger i fältet men med en
        liten marginal till vägkanten, markerad med en dubbelpil. Området innanför kurvan är
        fyllt med tunna diagonala ränder och märkt Kurvans insida skymmer. En streckad
        siktlinje går från bilens front snett upp åt höger, snuddar vid innerkanten och lämnar
        vägen vid ytterkanten. Den tjocka gröna linjen från bilen och fram till en punkt i
        kurvan är den synliga vägsträckan i det egna körfältet. Vägen bortom siktlinjen är
        täckt med rutmönster på röd botten: den ser du inte. Slutsatsen står under figuren:
        sänk farten före kurvan, du måste kunna stanna på den sträcka du ser, och håll höger
        men inte helt i kanten, ge marginal till diken och cyklister.
      </desc>

      <defs>
        {/* Elevens bil: prickar */}
        <pattern id="pk-car" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
        </pattern>
        {/* Kurvans insida (det som skymmer): tunna diagonala ränder */}
        <pattern id="pk-inside" patternUnits="userSpaceOnUse" width="10" height="10">
          <path d="M-2,2 l4,-4 M0,10 l10,-10 M8,12 l4,-4" className="stroke-primary-400" strokeWidth="1" />
        </pattern>
        {/* Dold vägsträcka: rutmönster på röd botten */}
        <pattern id="pk-hidden" patternUnits="userSpaceOnUse" width="12" height="12">
          <rect width="12" height="12" className="fill-safety-200" />
          <path d="M 0 0 L 12 12 M 12 0 L 0 12" className="stroke-safety-600" strokeWidth="1.2" />
        </pattern>
        {/* Vägbanan som urklipp för den dolda delen */}
        <clipPath id="pk-road-clip">
          <path d="M 50 460 L 50 300 A 220 220 0 0 1 270 80 L 400 80 L 400 200 L 270 200 A 100 100 0 0 0 170 300 L 170 460 Z" />
        </clipPath>
        <marker
          id="pk-arrow-ok"
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
          id="pk-arrow-dim"
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

      <text
        x="210"
        y="24"
        className="fill-text-primary text-[15px] font-semibold"
        textAnchor="middle"
      >
        Högerkurva sedd uppifrån — du kör uppåt
      </text>

      {/* Vägbana */}
      <path
        d="M 50 460 L 50 300 A 220 220 0 0 1 270 80 L 400 80 L 400 200 L 270 200 A 100 100 0 0 0 170 300 L 170 460 Z"
        className="fill-diagram-road"
      />
      {/* Kantlinjer */}
      <path
        d="M 50 460 L 50 300 A 220 220 0 0 1 270 80 L 400 80"
        className="stroke-diagram-edge"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M 170 460 L 170 300 A 100 100 0 0 1 270 200 L 400 200"
        className="stroke-diagram-edge"
        strokeWidth="2"
        fill="none"
      />
      {/* Mittlinje */}
      <path
        d="M 110 460 L 110 300 A 160 160 0 0 1 270 140 L 400 140"
        className="stroke-diagram-marking"
        strokeWidth="2"
        strokeDasharray="10 8"
        fill="none"
      />

      {/* Kurvans insida: det som skymmer */}
      <path
        d="M 180 460 L 180 300 A 90 90 0 0 1 270 210 L 400 210 L 400 460 Z"
        fill="url(#pk-inside)"
        className="stroke-primary-400"
        strokeWidth="1"
      />
      <text x="292" y="340" className="fill-text-primary text-[13px] font-medium">
        Kurvans insida
      </text>
      <text x="292" y="356" className="fill-text-primary text-[13px] font-medium">
        skymmer
      </text>

      {/* Dold vägsträcka: bortom tangeringspunkten T, på siktlinjens bortre sida */}
      <polygon
        points="172.2,279.6 228.8,8.4 420,8 420,300 270,300"
        fill="url(#pk-hidden)"
        clipPath="url(#pk-road-clip)"
      />
      <text x="335" y="175" className="fill-text-primary text-[13px] font-semibold" textAnchor="middle">
        Ser du inte
      </text>

      {/* Synlig vägsträcka i eget körfält: från bilen till S */}
      <path
        d="M 147 400 L 140 300 A 130 130 0 0 1 189.2 198.2"
        className="stroke-progress-600"
        strokeWidth="5"
        fill="none"
        markerEnd="url(#pk-arrow-ok)"
      />
      <circle cx="189.2" cy="198.2" r="6" className="fill-progress-600" />

      {/* Siktlinje: från bilens front, tangerar innerkanten i T, ut genom ytterkanten i P */}
      <line
        x1="147"
        y1="400"
        x2="212.2"
        y2="87.7"
        className="stroke-attention-600"
        strokeWidth="2"
        strokeDasharray="6 4"
      />

      {/* Bilen: höger i körfältet, med marginal till kanten */}
      <rect
        x="134"
        y="400"
        width="26"
        height="44"
        rx="3"
        fill="url(#pk-car)"
        className="stroke-attention-600"
        strokeWidth="2"
      />
      <text x="20" y="427" className="fill-text-primary text-[13px] font-semibold">
        Du
      </text>
      <line x1="42" y1="422" x2="130" y2="422" className="stroke-text-tertiary" strokeWidth="1" />

      {/* Marginal till kanten */}
      <path
        d="M 161 452 L 169 452"
        className="stroke-text-secondary"
        strokeWidth="1.5"
        fill="none"
        markerStart="url(#pk-arrow-dim)"
        markerEnd="url(#pk-arrow-dim)"
      />
      <line x1="165" y1="456" x2="200" y2="478" className="stroke-text-tertiary" strokeWidth="1" />
      <text x="204" y="482" className="fill-text-secondary text-[13px]">
        marginal till kanten
      </text>

      {/* Etiketter för sikten */}
      <text x="14" y="180" className="fill-text-primary text-[13px] font-medium">
        Så långt
      </text>
      <text x="14" y="196" className="fill-text-primary text-[13px] font-medium">
        ser du
      </text>
      <line x1="66" y1="190" x2="182" y2="198" className="stroke-text-tertiary" strokeWidth="1" />

      <text x="14" y="300" className="fill-text-secondary text-[13px]">
        Siktlinje
      </text>
      <line x1="70" y1="296" x2="164" y2="318" className="stroke-text-tertiary" strokeWidth="1" />

      {/* Teckenförklaring */}
      <g transform="translate(20, 510)">
        <line x1="0" y1="0" x2="22" y2="0" className="stroke-progress-600" strokeWidth="5" />
        <text x="30" y="4" className="fill-text-primary text-[13px]">
          Synlig vägsträcka
        </text>
        <rect
          x="190"
          y="-7"
          width="22"
          height="14"
          fill="url(#pk-hidden)"
          className="stroke-safety-600"
          strokeWidth="1"
        />
        <text x="220" y="4" className="fill-text-primary text-[13px]">
          Dold vägsträcka
        </text>
      </g>

      {/* Slutsatser */}
      <text
        x="210"
        y="550"
        className="fill-text-primary text-[13px] font-medium"
        textAnchor="middle"
      >
        Sänk farten före kurvan — du måste kunna stanna på den sträcka du ser.
      </text>
      <text x="210" y="570" className="fill-text-secondary text-[13px]" textAnchor="middle">
        Håll höger, men inte helt i kanten: marginal till diken och cyklister.
      </text>
    </svg>
  );
}
