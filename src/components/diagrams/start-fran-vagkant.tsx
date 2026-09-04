/**
 * Start från vägkant (MAN-11) — kontrollerna före utfart och att lägga sig
 * i körfältet. Trafikförordningen 3 kap 43 § första stycket (endast utan
 * fara eller onödigt hinder), 65 och 66 §§ (tecken), 16 § (hindra inte).
 *
 * Geometri (högertrafik, vy uppifrån, 12 px ≈ 1 m):
 * - Gatan går lodrätt, x 120–280, mittlinje x 200, kantsten x 280. Din bil
 *   står vid högra kanten med nosen uppåt, x 254–276, y 300–353. Förarplatsen
 *   är bilens vänstra framdel, (260, 314).
 * - Kontrollerna sker på bilens vänstra sida: spegeln (249, 313) ser bakåt,
 *   tecknet blinkar på vänster fram- och bakhörn, axelblicken går från
 *   förarplatsen snett bakåt åt vänster mot (222, 400), där spegeln inte ser.
 * - Cyklisten kommer bakifrån närmast kanten, x 258–268, y 396–420.
 *   Bakomvarande bil kommer i samma körfält, x 218–240, y 470–523.
 * - Utfarten: nosens väg från (265, 296) i en båge åt vänster till körfältets
 *   mitt x 240 och sedan rakt uppåt. Bilen ligger sedan i högra körfältet,
 *   x 229–251, y 123–177.
 */

export function StartFranVagkantDiagram() {
  return (
    <svg
      viewBox="0 0 400 700"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="sv-title sv-desc"
    >
      <title id="sv-title">Start från vägkant: spegel, tecken, axelblick — sedan ut bestämt</title>
      <desc id="sv-desc">
        Lodrät gata sedd uppifrån med streckad mittlinje och en kantsten till höger. Din bil, med
        prickmönster och en fylld nos som pekar uppåt, står stilla intill högra kanten. Tre
        numrerade kontroller på bilens vänstra sida, i ordning: 1, spegeln, med en tunn streckad
        linje bakåt som visar vad spegeln ser. 2, tecknet: två små blinkersmarkeringar på vänster
        fram- och bakhörn. 3, axelblicken: en prickad linje från förarplatsen snett bakåt åt
        vänster, till området som spegeln inte täcker. Bakom bilen, närmast kanten, kommer en
        cyklist ritad med kryssmönster: den som kommer närmast kanten och syns sämst. Längre bak i
        körfältet kommer en annan bil med diagonalt randmönster och en pil framåt. En klammer till
        vänster om gatan visar luckan mellan den bilen och dig: den ska räcka till att komma upp i
        fart, inte bara till att komma in. En streckad grön pil visar utfarten: nosen går i en
        bestämd båge åt vänster in till körfältets mitt och sedan rakt fram. Högre upp visas din
        bil på plats i körfältet, där blinkersen släcks. Under bilden står regeln: starta från
        vägkanten endast om det kan ske utan fara eller onödigt hinder för andra vägtrafikanter,
        skyldigheten ligger på dig, och tecknet befriar inte från att försäkra sig. Här gäller 43
        paragrafen, inte väjningsplikt; väjningsplikten gäller när du kör ut från en
        parkeringsplats eller en fastighet.
      </desc>

      <defs>
        <pattern id="sv-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
        </pattern>
        <pattern id="sv-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="2" />
        </pattern>
        <pattern id="sv-cross" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M0,0 L8,8 M8,0 L0,8" className="stroke-safety-600" strokeWidth="1.5" />
        </pattern>
        <marker
          id="sv-arrow-out"
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
          id="sv-arrow-other"
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
          id="sv-arrow-look"
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
          id="sv-arrow-note"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-text-tertiary" />
        </marker>
      </defs>

      <text x="200" y="22" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Start från vägkant: spegel, tecken, axelblick — sedan ut bestämt
      </text>

      {/* Gatan */}
      <rect x="120" y="40" width="160" height="530" className="fill-diagram-road" />
      <rect x="280" y="40" width="16" height="530" className="fill-diagram-edge" opacity="0.35" />
      <line x1="120" y1="40" x2="120" y2="570" className="stroke-diagram-edge" strokeWidth="2" />
      <line x1="280" y1="40" x2="280" y2="570" className="stroke-diagram-edge" strokeWidth="3" />
      <line
        x1="200"
        y1="40"
        x2="200"
        y2="570"
        className="stroke-diagram-marking"
        strokeWidth="2"
        strokeDasharray="10 8"
      />
      <text x="128" y="58" className="fill-text-secondary text-[13px]">
        Färdriktning uppåt
      </text>

      {/* Luckan: klammer till vänster om gatan, från bakomvarandes nos till din bakkant */}
      <line x1="108" y1="353" x2="108" y2="470" className="stroke-progress-600" strokeWidth="2" />
      <line x1="102" y1="353" x2="114" y2="353" className="stroke-progress-600" strokeWidth="2" />
      <line x1="102" y1="470" x2="114" y2="470" className="stroke-progress-600" strokeWidth="2" />
      <text x="98" y="398" textAnchor="end" className="fill-text-primary text-[13px] font-medium">
        Luckan ska räcka
      </text>
      <text x="98" y="414" textAnchor="end" className="fill-text-primary text-[13px] font-medium">
        till att komma
      </text>
      <text x="98" y="430" textAnchor="end" className="fill-text-primary text-[13px] font-medium">
        upp i fart
      </text>
      <text x="98" y="452" textAnchor="end" className="fill-text-secondary text-[13px]">
        Bestäm dig i tid
      </text>

      {/* Bakomvarande bil: samma körfält, kör uppåt */}
      <g>
        <rect
          x="218"
          y="470"
          width="22"
          height="53"
          rx="3"
          fill="url(#sv-stripes)"
          className="stroke-primary-600"
          strokeWidth="2"
        />
        <polygon points="222,478 229,472 236,478" className="fill-primary-600" />
        <line
          x1="229"
          y1="464"
          x2="229"
          y2="440"
          className="stroke-primary-600"
          strokeWidth="2.5"
          markerEnd="url(#sv-arrow-other)"
        />
        <text x="229" y="545" textAnchor="middle" className="fill-text-primary text-[13px] font-medium">
          Bakomvarande
        </text>
      </g>

      {/* Cyklist: närmast kanten, bakom dig */}
      <g>
        <rect
          x="258"
          y="396"
          width="10"
          height="24"
          rx="4"
          fill="url(#sv-cross)"
          className="stroke-safety-600"
          strokeWidth="1.5"
        />
        <polygon points="259,400 263,395 267,400" className="fill-safety-600" />
        <text x="300" y="404" className="fill-text-primary text-[13px] font-medium">
          Cyklist: närmast
        </text>
        <text x="300" y="420" className="fill-text-primary text-[13px] font-medium">
          kanten, syns sämst
        </text>
      </g>

      {/* Utfarten: nosens väg, båge in till körfältets mitt och sedan rakt fram */}
      <path
        d="M 265 296 Q 265 240 240 205 L 240 124"
        className="fill-none stroke-progress-600"
        strokeWidth="2.5"
        strokeDasharray="7 5"
        markerEnd="url(#sv-arrow-out)"
      />
      <text x="110" y="236" textAnchor="end" className="fill-text-primary text-[13px] font-medium">
        Kör ut bestämt,
      </text>
      <text x="110" y="252" textAnchor="end" className="fill-text-primary text-[13px] font-medium">
        upp i trafikens fart
      </text>
      <line
        x1="116"
        y1="244"
        x2="246"
        y2="232"
        className="stroke-text-tertiary"
        strokeWidth="1.5"
        markerEnd="url(#sv-arrow-note)"
      />

      {/* Din bil på plats i körfältet: blinkers av */}
      <g>
        <rect
          x="229"
          y="123.5"
          width="22"
          height="53"
          rx="3"
          fill="url(#sv-dots)"
          className="stroke-attention-600"
          strokeWidth="2"
        />
        <polygon points="233,131 240,125 247,131" className="fill-attention-600" />
        <text x="300" y="146" className="fill-text-primary text-[13px] font-medium">
          Blinkers av när
        </text>
        <text x="300" y="162" className="fill-text-primary text-[13px] font-medium">
          bilen är på plats
        </text>
      </g>

      {/* Din bil vid kanten, stilla */}
      <g>
        <rect
          x="254"
          y="300"
          width="22"
          height="53"
          rx="3"
          fill="url(#sv-dots)"
          className="stroke-attention-600"
          strokeWidth="2"
        />
        <polygon points="258,308 265,302 272,308" className="fill-attention-600" />
        <text x="300" y="332" className="fill-text-primary text-[13px] font-semibold">
          Du, stilla
        </text>

        {/* 1. Spegeln: liten spegel på vänster sida, streckad linje bakåt */}
        <rect x="247" y="310" width="6" height="7" rx="1" className="fill-text-primary" />
        <line
          x1="250"
          y1="317"
          x2="242"
          y2="440"
          className="stroke-text-tertiary"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <circle cx="230" cy="308" r="10" className="fill-none stroke-text-tertiary" strokeWidth="1.5" />
        <text x="230" y="313" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
          1
        </text>

        {/* 2. Tecknet: blinkers på vänster fram- och bakhörn */}
        <polygon points="253,301 245,305 253,309" className="fill-attention-600" />
        <polygon points="253,344 245,348 253,352" className="fill-attention-600" />
        <circle cx="230" cy="348" r="10" className="fill-none stroke-text-tertiary" strokeWidth="1.5" />
        <text x="230" y="353" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
          2
        </text>

        {/* 3. Axelblicken: från förarplatsen snett bakåt åt vänster */}
        <circle cx="260" cy="314" r="4" className="fill-primary-600" />
        <line
          x1="260"
          y1="314"
          x2="222"
          y2="400"
          className="stroke-primary-600"
          strokeWidth="2"
          strokeDasharray="2 4"
          markerEnd="url(#sv-arrow-look)"
        />
        <circle cx="206" cy="404" r="10" className="fill-none stroke-text-tertiary" strokeWidth="1.5" />
        <text x="206" y="409" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
          3
        </text>
      </g>

      {/* Stegen */}
      <text x="20" y="596" className="fill-text-primary text-[13px] font-medium">
        1. Spegel. 2. Tecken. 3. Axelblick åt vänster — i den ordningen, innan bilen rör sig.
      </text>
      <text x="20" y="620" className="fill-text-primary text-[13px] font-medium">
        Starta från vägkanten endast om det kan ske utan fara eller onödigt hinder
      </text>
      <text x="20" y="638" className="fill-text-primary text-[13px] font-medium">
        för andra (3 kap 43 §). Tecknet befriar dig inte från att försäkra dig (3 kap 66 §).
      </text>
      <text x="20" y="660" className="fill-text-secondary text-[13px]">
        Här gäller 43 § — inte väjningsplikt. Väjningsplikten gäller när du kör ut
      </text>
      <text x="20" y="678" className="fill-text-secondary text-[13px]">
        från en parkeringsplats eller en fastighet (3 kap 21 §).
      </text>

      {/* Teckenförklaring */}
      <g transform="translate(20 686)">
        <rect width="16" height="12" fill="url(#sv-dots)" className="stroke-attention-600" strokeWidth="1.5" />
        <text x="22" y="10" className="fill-text-tertiary text-[13px]">
          Du
        </text>
        <rect x="70" width="16" height="12" fill="url(#sv-stripes)" className="stroke-primary-600" strokeWidth="1.5" />
        <text x="92" y="10" className="fill-text-tertiary text-[13px]">
          Annan bil
        </text>
        <rect x="180" width="16" height="12" fill="url(#sv-cross)" className="stroke-safety-600" strokeWidth="1.5" />
        <text x="202" y="10" className="fill-text-tertiary text-[13px]">
          Cyklist
        </text>
      </g>
    </svg>
  );
}
