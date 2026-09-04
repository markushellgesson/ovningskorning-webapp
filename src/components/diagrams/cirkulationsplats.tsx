/**
 * Cirkulationsplats sedd uppifrån (RAB-01): infart, placering, utfart.
 * Trafikförordningen 3 kap 22 §: väjningsplikt mot fordon som redan är i
 * cirkulationen.
 *
 * Geometri (högertrafik, vy uppifrån): trafiken i cirkulationen går moturs.
 * - Din bil kör uppåt i bilden på den södra armen. Dess högra sida är
 *   bildens högra, så den ligger i den högra halvan (x 200–240).
 * - Fordonet i cirkulationen ligger i sydväst och kör åt sydost, alltså
 *   moturs mot den södra infarten. Det kommer från din vänster — som
 *   cirkulerande trafik alltid gör.
 * - Din planerade väg går in vid den södra armen, moturs runt östra sidan
 *   och ut på den norra armen i dess högra halva (x 200–240), eftersom
 *   du även där kör uppåt.
 * - En cyklist kör uppåt i högerkant vid den norra utfarten.
 *
 * Mönster: prickar = du, diagonala ränder = fordon i cirkulationen,
 * ring = cyklist. Grön streckad linje = din planerade väg.
 *
 * Vägmärkena B1 och D3 i public/signs/ är svenska officiella vägmärken
 * (allmänna handlingar) och fria att återge.
 */

export function CirkulationsplatsDiagram() {
  return (
    <svg
      viewBox="0 0 400 520"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="rab-title rab-desc"
    >
      <title id="rab-title">Cirkulationsplats — infart, placering och utfart</title>
      <desc id="rab-desc">
        Cirkulationsplats med fyra armar sedd uppifrån. Trafiken i cirkulationen kör moturs,
        markerat med vita pilar på vägbanan. Din bil, fylld med prickmönster, närmar sig nedifrån
        i det högra körfältet. Vid infarten står vägmärkena D3 cirkulationsplats och B1
        väjningsplikt, och i vägbanan ligger en väjningslinje av vita trianglar. Ett fordon
        fyllt med diagonala ränder är redan i cirkulationen, kommer från din vänster och är på
        väg att passera din infart. Du har väjningsplikt mot det. En grön streckad linje visar
        din planerade väg: in vid den södra armen, moturs runt östra sidan och ut på den norra
        armen. Vid utfarten står texten blinka höger, och en cyklist, ritad som en ring, kör i
        högerkanten av utfarten. Utfarten är bestämd redan vid infarten.
      </desc>

      <defs>
        <pattern id="rab-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="rab-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path
            d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4"
            className="stroke-primary-600"
            strokeWidth="2"
          />
        </pattern>
        <marker
          id="rab-arrow-plan"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-progress-600" />
        </marker>
        <marker
          id="rab-arrow-other"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary-600" />
        </marker>
        <marker
          id="rab-arrow-cyclist"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-safety-600" />
        </marker>
        <marker
          id="rab-arrow-marking"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-diagram-marking" />
        </marker>
      </defs>

      <text x="20" y="24" className="fill-text-primary text-[15px] font-semibold">
        Cirkulationsplats — trafiken kör moturs
      </text>

      {/* Fyra armar */}
      <rect x="160" y="34" width="80" height="80" className="fill-diagram-road" />
      <rect x="160" y="286" width="80" height="104" className="fill-diagram-road" />
      <rect x="20" y="160" width="80" height="80" className="fill-diagram-road" />
      <rect x="300" y="160" width="80" height="80" className="fill-diagram-road" />

      {/* Mittlinjer på armarna */}
      <g className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="10 8">
        <line x1="200" y1="34" x2="200" y2="90" />
        <line x1="200" y1="310" x2="200" y2="390" />
        <line x1="20" y1="200" x2="90" y2="200" />
        <line x1="310" y1="200" x2="380" y2="200" />
      </g>

      {/* Vägkanter på armarna */}
      <g className="stroke-diagram-edge" strokeWidth="1.5">
        <line x1="160" y1="34" x2="160" y2="92" />
        <line x1="240" y1="34" x2="240" y2="92" />
        <line x1="160" y1="308" x2="160" y2="390" />
        <line x1="240" y1="308" x2="240" y2="390" />
        <line x1="20" y1="160" x2="92" y2="160" />
        <line x1="20" y1="240" x2="92" y2="240" />
        <line x1="308" y1="160" x2="380" y2="160" />
        <line x1="308" y1="240" x2="380" y2="240" />
      </g>

      {/* Cirkulationen: ringformad vägbana, rondellön i mitten */}
      <circle
        cx="200"
        cy="200"
        r="92"
        className="fill-none stroke-diagram-road"
        strokeWidth="44"
      />
      <circle cx="200" cy="200" r="70" className="fill-none stroke-diagram-edge" strokeWidth="1.5" />

      {/* Riktningspilar på vägbanan: moturs */}
      <line
        x1="108"
        y1="186"
        x2="108"
        y2="214"
        className="stroke-diagram-marking"
        strokeWidth="3"
        markerEnd="url(#rab-arrow-marking)"
      />
      <line
        x1="214"
        y1="108"
        x2="186"
        y2="108"
        className="stroke-diagram-marking"
        strokeWidth="3"
        markerEnd="url(#rab-arrow-marking)"
      />

      {/* Väjningslinje vid din infart: trianglar med spetsen mot dig */}
      <g className="fill-diagram-marking">
        <path d="M 202 318 L 214 318 L 208 328 Z" />
        <path d="M 216 318 L 228 318 L 222 328 Z" />
        <path d="M 230 318 L 240 318 L 235 328 Z" />
      </g>

      {/* Din planerade väg: in söderifrån, moturs runt östra sidan, ut norrut */}
      <path
        d="M 220 334 L 220 290 A 92 92 0 0 0 292 200 A 92 92 0 0 0 220 110 L 220 50"
        className="fill-none stroke-progress-600"
        strokeWidth="3"
        strokeDasharray="8 6"
        markerEnd="url(#rab-arrow-plan)"
      />

      {/* Fordon i cirkulationen: sydväst, kör åt sydost (moturs) */}
      <g>
        <rect
          x="121"
          y="243"
          width="28"
          height="44"
          rx="3"
          fill="url(#rab-stripes)"
          className="stroke-primary-600"
          strokeWidth="2"
          transform="rotate(135 135 265)"
        />
        <path
          d="M 154 280 A 92 92 0 0 0 184 291"
          className="fill-none stroke-primary-600"
          strokeWidth="2.5"
          markerEnd="url(#rab-arrow-other)"
        />
        <text x="96" y="312" textAnchor="end" className="fill-text-primary text-[13px] font-medium">
          Redan i
        </text>
        <text x="96" y="329" textAnchor="end" className="fill-text-primary text-[13px] font-medium">
          cirkulationen
        </text>
      </g>

      {/* Din bil: kör uppåt, högra körfältet på södra armen */}
      <g>
        <rect
          x="206"
          y="338"
          width="28"
          height="44"
          rx="3"
          fill="url(#rab-dots)"
          className="stroke-attention-600"
          strokeWidth="2"
        />
        <text
          x="184"
          y="365"
          textAnchor="middle"
          className="fill-text-primary text-[14px] font-semibold"
        >
          Du
        </text>
      </g>

      {/* Vägmärken vid infarten: B1 väjningsplikt över D3 cirkulationsplats */}
      <image href="/signs/B1.svg" x="262" y="304" width="36" height="32" />
      <image href="/signs/D3.svg" x="262" y="342" width="36" height="36" />
      <text x="304" y="326" className="fill-text-secondary text-[13px]">
        B1
      </text>
      <text x="304" y="366" className="fill-text-secondary text-[13px]">
        D3
      </text>

      {/* Utfart: blinka höger, cyklist i högerkant */}
      <g>
        <text x="152" y="76" textAnchor="end" className="fill-text-primary text-[13px] font-medium">
          Blinka höger
        </text>
        <line
          x1="156"
          y1="72"
          x2="210"
          y2="72"
          className="stroke-text-tertiary"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
      </g>
      <g>
        <circle
          cx="252"
          cy="76"
          r="8"
          className="fill-none stroke-safety-600"
          strokeWidth="2.5"
        />
        <line
          x1="252"
          y1="66"
          x2="252"
          y2="52"
          className="stroke-safety-600"
          strokeWidth="2"
          markerEnd="url(#rab-arrow-cyclist)"
        />
        <text x="266" y="81" className="fill-text-primary text-[13px] font-medium">
          Cyklist
        </text>
      </g>

      {/* Regeltext */}
      <text
        x="200"
        y="416"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-medium"
      >
        Du har väjningsplikt mot alla fordon
      </text>
      <text
        x="200"
        y="434"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-medium"
      >
        som redan är i cirkulationen.
      </text>
      <text x="200" y="458" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Grön streckad linje: din planerade väg. Bestäm utfarten
      </text>
      <text x="200" y="476" textAnchor="middle" className="fill-text-secondary text-[13px]">
        redan vid infarten. Blinka höger vid utfart, sök cyklister.
      </text>

      {/* Teckenförklaring */}
      <g>
        <rect
          x="20"
          y="494"
          width="22"
          height="14"
          rx="2"
          fill="url(#rab-dots)"
          className="stroke-attention-600"
          strokeWidth="1.5"
        />
        <text x="48" y="506" className="fill-text-tertiary text-[13px]">
          Du
        </text>
        <rect
          x="90"
          y="494"
          width="22"
          height="14"
          rx="2"
          fill="url(#rab-stripes)"
          className="stroke-primary-600"
          strokeWidth="1.5"
        />
        <text x="118" y="506" className="fill-text-tertiary text-[13px]">
          I cirkulationen
        </text>
        <circle cx="240" cy="501" r="6" className="fill-none stroke-safety-600" strokeWidth="2" />
        <text x="252" y="506" className="fill-text-tertiary text-[13px]">
          Cyklist
        </text>
        <line
          x1="310"
          y1="501"
          x2="334"
          y2="501"
          className="stroke-progress-600"
          strokeWidth="3"
          strokeDasharray="6 4"
        />
        <text x="340" y="506" className="fill-text-tertiary text-[13px]">
          Din väg
        </text>
      </g>
    </svg>
  );
}
