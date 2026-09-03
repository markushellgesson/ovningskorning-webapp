/**
 * Möte på smal väg — hindret, vem som stannar och var man stannar.
 * Trafikförordningen 3 kap 30 §. Den som har hindret på sin sida ska stanna,
 * om det behövs för att den mötande ska kunna passera (andra stycket) — det
 * är villkorat, inte en väjningsplikt. Formuleras därför som "stanna vid
 * behov" genomgående, aldrig "väja" eller "väjningsplikt".
 *
 * Geometrisk konvention i båda scenarierna: din bil kör nedåt i bilden. I en
 * vy uppifrån ligger då förarens högra sida åt vänster i bilden (låga x), och
 * den mötande — som kör uppåt — har sin körbanehalva åt höger i bilden.
 */

export function MoteSmalVagDiagram() {
  return (
    <svg
      viewBox="0 0 500 560"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="meet-title meet-desc"
    >
      <title id="meet-title">Möte på smal väg vid ett hinder</title>
      <desc id="meet-desc">
        Två scenarier för möte vid ett hinder på smal väg, sedda uppifrån. Din bil (prickmönster) kör
        nedåt i bilden och har därför sin körbanehalva åt vänster i bilden; den mötande bilen
        (diagonalt randmönster) kör uppåt i sin halva åt höger. Överst: Bra — hindret (kryssmönster)
        står i din körbanehalva, och du stannar i god tid på en rak sträcka med etiketten &quot;Stannar
        vid behov&quot;. Ett obrutet siktstreck visar att den mötande ser dig tidigt och hinner planera
        passagen. Underst: Mindre bra — hindret ligger i din halva inne i en kurva och du stannar
        först där, med etiketten &quot;Stannar sent, dolt läge&quot;. Siktstrecket är brutet med ett kryss:
        kurvan skymmer, och den mötande ser dig först på nära håll.
      </desc>

      <defs>
        <pattern id="meet-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
        </pattern>
        <pattern id="meet-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="2" />
        </pattern>
        <pattern id="meet-hatch" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M0,0 L8,8 M8,0 L0,8" className="stroke-safety-600" strokeWidth="1.5" />
        </pattern>
      </defs>

      {/* Scenario 1: Bra — stannar i god tid på rak sträcka */}
      <g>
        <text x="20" y="26" className="fill-text-primary text-[15px] font-semibold">
          Bra: stannar i god tid på rak sträcka
        </text>

        {/* Smal väg, rak. Körbanan är x 150–240; mitten går vid x 195. */}
        <rect x="150" y="40" width="90" height="210" className="fill-diagram-road" />
        <line x1="150" y1="40" x2="150" y2="250" className="stroke-diagram-edge" strokeWidth="2" />
        <line x1="240" y1="40" x2="240" y2="250" className="stroke-diagram-edge" strokeWidth="2" />

        {/* Hindret i din körbanehalva, x 150–195 — förarens högra sida när färdriktningen är nedåt */}
        <rect
          x="155"
          y="150"
          width="35"
          height="55"
          fill="url(#meet-hatch)"
          className="stroke-safety-600"
          strokeWidth="2"
        />
        <text x="250" y="182" className="fill-text-secondary text-[13px]">
          Hinder
        </text>

        {/* Din bil, stannad i god tid före hindret — samma körbanehalva som hindret */}
        <rect
          x="155"
          y="100"
          width="35"
          height="30"
          fill="url(#meet-dots)"
          className="stroke-attention-600"
          strokeWidth="2"
          rx="4"
        />
        <rect x="108" y="72" width="124" height="24" rx="5" className="fill-attention-100 stroke-attention-600" strokeWidth="1.5" />
        <text x="170" y="89" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
          Stannar vid behov
        </text>

        {/* Mötande bil i sin egen halva, x 195–240 — ser bilen tidigt */}
        <rect
          x="200"
          y="290"
          width="35"
          height="30"
          fill="url(#meet-stripes)"
          className="stroke-primary-600"
          strokeWidth="2"
          rx="4"
        />
        <text x="217" y="335" textAnchor="middle" className="fill-text-secondary text-[13px]">
          Mötande
        </text>

        {/* Siktlinje, obruten */}
        <line
          x1="217"
          y1="288"
          x2="190"
          y2="132"
          className="stroke-progress-600"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <text x="20" y="360" className="fill-text-secondary text-[13px]">
          Den mötande ser bilen tidigt och hinner planera passagen.
        </text>
      </g>

      {/* Scenario 2: Mindre bra — stannar i kurva, dolt läge. Samma konvention som scenario 1:
          du kör nedåt, alltså är din körbanehalva den vänstra (x 105–150) före kurvan. */}
      <g transform="translate(0, 390)">
        <text x="20" y="16" className="fill-text-primary text-[15px] font-semibold">
          Mindre bra: stannar i en kurva
        </text>

        {/* Smal väg med kurva */}
        <path
          d="M 150 30 L 150 90 Q 150 140 200 140 L 260 140"
          className="fill-none stroke-diagram-road"
          strokeWidth="90"
        />
        <path
          d="M 105 30 L 105 90 Q 105 185 200 185 L 260 185"
          className="stroke-diagram-edge"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 195 30 L 195 88 Q 195 95 202 95 L 260 95"
          className="stroke-diagram-edge"
          strokeWidth="2"
          fill="none"
        />

        {/* Hindret, precis i kurvan och i din körbanehalva */}
        <rect
          x="115"
          y="95"
          width="30"
          height="30"
          fill="url(#meet-hatch)"
          className="stroke-safety-600"
          strokeWidth="2"
          transform="rotate(20 130 110)"
        />

        {/* Din bil, stannad precis före kurvan i din halva (dolt läge) */}
        <rect
          x="112"
          y="58"
          width="30"
          height="28"
          fill="url(#meet-dots)"
          className="stroke-attention-600"
          strokeWidth="2"
          rx="4"
        />
        <rect x="108" y="30" width="132" height="24" rx="5" className="fill-safety-100 stroke-safety-600" strokeWidth="1.5" />
        <text x="174" y="47" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
          Stannar sent, dolt läge
        </text>

        {/* Mötande bil på andra sidan kurvan, i sin egen halva (y 95–140) */}
        <rect
          x="230"
          y="105"
          width="30"
          height="28"
          fill="url(#meet-stripes)"
          className="stroke-primary-600"
          strokeWidth="2"
          rx="4"
        />

        {/* Bruten siktlinje: skyms av kurvan */}
        <line
          x1="228"
          y1="116"
          x2="202"
          y2="105"
          className="stroke-safety-600"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <line
          x1="184"
          y1="98"
          x2="148"
          y2="84"
          className="stroke-safety-600"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <path
          d="M 190 96 L 202 108 M 190 108 L 202 96"
          className="stroke-safety-600"
          strokeWidth="2.5"
        />
        <text x="320" y="145" className="fill-text-secondary text-[13px]">
          Sikten skyms
        </text>
        <text x="320" y="163" className="fill-text-secondary text-[13px]">
          av kurvan
        </text>

        <text x="20" y="250" className="fill-text-secondary text-[13px]">
          Den mötande ser bilen först på nära håll — ingen tid att planera.
        </text>
      </g>
    </svg>
  );
}
