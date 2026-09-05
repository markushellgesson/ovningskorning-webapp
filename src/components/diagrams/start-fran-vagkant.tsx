/**
 * Start från vägkant (MAN-11) — kontrollerna före utfart och att lägga sig
 * i körfältet. Trafikförordningen 3 kap 43 § första stycket (endast utan
 * fara eller onödigt hinder), 65 och 66 §§ (tecken), 16 § (hindra inte).
 *
 * Geometri (högertrafik, vy uppifrån, 12 px ≈ 1 m). Scenen ligger i en grupp
 * med translate(20 50); koordinaterna nedan är gruppens lokala.
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
 *
 * Förklaringsrutan längst ned är fristående och schematisk (skala 0,6): din
 * bil vid kanten med den planerade vägen, och bilen bakom antingen långt bak
 * eller tätt inpå med bromsljusen tända.
 */

/** Fylld siffra, som i hänvisningarna i vänstersvängsbilden. */
function Siffra({ n, x, y }: { n: number; x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="11" className="fill-text-primary" />
      <text x={x} y={y + 5} textAnchor="middle" className="fill-surface-base text-[13px] font-semibold">
        {n}
      </text>
    </g>
  );
}

/** Tunn hänvisningslinje som slutar i en punkt på det den pekar på. */
function Pekare({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-text-tertiary" strokeWidth="1.5" />
      <circle cx={x2} cy={y2} r="3" className="fill-text-tertiary" />
    </g>
  );
}

/** Kort stycke gata till förklaringsrutan: 84 × 240 med kantsten till höger. */
function Minigata() {
  return (
    <g>
      <rect x="0" y="0" width="84" height="240" className="fill-diagram-road" />
      <rect x="84" y="0" width="12" height="240" className="fill-diagram-edge" opacity="0.35" />
      <line x1="0" y1="0" x2="0" y2="240" className="stroke-diagram-edge" strokeWidth="2" />
      <line x1="84" y1="0" x2="84" y2="240" className="stroke-diagram-edge" strokeWidth="3" />
      <line x1="42" y1="0" x2="42" y2="240" className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="10 8" />
      {/* Din bil vid kanten, med den planerade vägen ut */}
      <rect x="58" y="50" width="22" height="53" rx="3" fill="url(#sv-dots)" className="stroke-attention-600" strokeWidth="2" />
      <polygon points="62,58 69,52 76,58" className="fill-attention-600" />
      <path
        d="M 69 46 Q 69 16 48 6"
        className="fill-none stroke-progress-600"
        strokeWidth="2.5"
        strokeDasharray="7 5"
        markerEnd="url(#sv-arrow-out)"
      />
    </g>
  );
}

export function StartFranVagkantDiagram() {
  return (
    <svg
      viewBox="0 0 440 1090"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="sv-title sv-desc"
    >
      <title id="sv-title">Start från vägkant: spegel, tecken, axelblick — sedan ut bestämt</title>
      <desc id="sv-desc">
        Lodrät gata sedd uppifrån med streckad mittlinje och en kantsten till höger. Din bil, med
        prickmönster och en fylld nos som pekar uppåt, står stilla intill högra kanten. Till
        vänster om gatan tre fyllda siffror med tunna linjer till kontrollerna på bilens vänstra
        sida, i ordning: 1, spegeln, med en tunn streckad linje bakåt som visar vad spegeln ser.
        2, tecknet: två små blinkersmarkeringar på vänster fram- och bakhörn. 3, axelblicken: en
        prickad linje från förarplatsen snett bakåt åt vänster, till området som spegeln inte
        täcker. Bakom bilen, närmast kanten, kommer en cyklist ritad med kryssmönster: den som
        kommer närmast kanten och syns sämst. Längre bak i körfältet kommer en annan bil med
        diagonalt randmönster, en heldragen pil framåt och fartstreck bakom sig. En klammer i
        kantstenen visar luckan mellan den bilen och dig: den ska räcka till att komma upp i fart,
        inte bara till att komma in. En streckad grön pil visar utfarten: nosen går i en bestämd
        båge åt vänster in till körfältets mitt och sedan rakt fram. Högre upp visas din bil på
        plats i körfältet, där blinkersen släcks. En teckenförklaring i övre högra hörnet:
        heldragen pil är något som rör sig nu, streckad pil är planerad väg. Under bilden står
        de tre kontrollerna i ordning och regeln: starta från vägkanten endast om det kan ske
        utan fara eller onödigt hinder för andra vägtrafikanter, skyldigheten ligger på dig, och
        tecknet befriar inte från att försäkra sig. Här gäller 43 paragrafen, inte
        väjningsplikt; väjningsplikten gäller när du kör ut från en parkeringsplats eller en
        fastighet. Längst ned en förklaringsruta med två små bilder: till vänster är bilen bakom
        långt bak och luckan räcker till att komma upp i fart, markerat med en bock; till höger
        är bilen bakom tätt inpå med bromsljusen tända, den måste bromsa, markerat med ett kryss.
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
      </defs>

      {/* Rubrik */}
      <text x="20" y="34" className="fill-text-primary text-[20px] font-semibold">
        Start från vägkant
      </text>
      <text x="20" y="56" className="fill-text-secondary text-[13px]">
        Spegel, tecken, axelblick — sedan ut bestämt
      </text>

      <g transform="translate(20 50)">
        {/* Teckenförklaring i övre högra hörnet */}
        <g>
          <path d="M 300 24 L 332 24" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#sv-arrow-other)" />
          <text x="340" y="28" className="fill-text-secondary text-[13px]">
            Rör sig nu
          </text>
          <path d="M 300 46 L 332 46" className="stroke-progress-600" strokeWidth="3" strokeDasharray="7 5" markerEnd="url(#sv-arrow-out)" />
          <text x="340" y="50" className="fill-text-secondary text-[13px]">
            Planerad väg
          </text>
        </g>

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

        {/* Bakomvarande bil: samma körfält, kör uppåt i trafikens fart */}
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
          {/* Fartstreck */}
          <g className="stroke-primary-600" strokeWidth="3" strokeLinecap="round">
            <line x1="222" y1="531" x2="222" y2="545" />
            <line x1="229" y1="531" x2="229" y2="553" />
            <line x1="236" y1="531" x2="236" y2="545" />
          </g>
        </g>
        <text x="300" y="504" className="fill-text-primary text-[14px] font-semibold">
          Bakomvarande
        </text>
        <text x="300" y="521" className="fill-text-secondary text-[13px]">
          i trafikens fart
        </text>
        <Pekare x1={296} y1={508} x2={242} y2={500} />

        {/* Luckan: klammer i kantstenen, från din bakkant till bakomvarandes nos */}
        <line x1="288" y1="353" x2="288" y2="470" className="stroke-progress-600" strokeWidth="2" />
        <line x1="284" y1="353" x2="292" y2="353" className="stroke-progress-600" strokeWidth="2" />
        <line x1="284" y1="470" x2="292" y2="470" className="stroke-progress-600" strokeWidth="2" />
        <text x="300" y="430" className="fill-text-primary text-[14px] font-semibold">
          Luckan
        </text>
        <text x="300" y="447" className="fill-text-primary text-[13px] font-medium">
          ska räcka till att
        </text>
        <text x="300" y="463" className="fill-text-primary text-[13px] font-medium">
          komma upp i fart
        </text>
        <text x="300" y="481" className="fill-text-secondary text-[13px]">
          Bestäm dig i tid
        </text>

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
        </g>
        <text x="300" y="374" className="fill-text-primary text-[14px] font-semibold">
          Cyklist
        </text>
        <text x="300" y="391" className="fill-text-secondary text-[13px]">
          närmast kanten,
        </text>
        <text x="300" y="407" className="fill-text-secondary text-[13px]">
          syns sämst
        </text>
        <Pekare x1={296} y1={388} x2={270} y2={404} />

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
        <Pekare x1={116} y1={244} x2={252} y2={228} />

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
        </g>
        <text x="300" y="146" className="fill-text-primary text-[13px] font-medium">
          Blinkers av när
        </text>
        <text x="300" y="162" className="fill-text-primary text-[13px] font-medium">
          bilen är på plats
        </text>
        <Pekare x1={296} y1={150} x2={253} y2={150} />

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
          <text x="300" y="328" className="fill-text-primary text-[14px] font-semibold">
            Du, stilla
          </text>

          {/* Spegeln: liten spegel på vänster sida, streckad linje bakåt */}
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

          {/* Tecknet: blinkers på vänster fram- och bakhörn */}
          <polygon points="253,301 245,305 253,309" className="fill-attention-600" />
          <polygon points="253,344 245,348 253,352" className="fill-attention-600" />

          {/* Axelblicken: från förarplatsen snett bakåt åt vänster */}
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
        </g>

        {/* Hänvisningar 1–3 till vänster om gatan */}
        <Siffra n={1} x={18} y={300} />
        <text x="36" y="305" className="fill-text-primary text-[14px] font-semibold">
          Spegel
        </text>
        <text x="10" y="322" className="fill-text-secondary text-[13px]">
          vad syns bakåt?
        </text>
        <Pekare x1={92} y1={302} x2={244} y2={313} />

        <Siffra n={2} x={18} y={344} />
        <text x="36" y="349" className="fill-text-primary text-[14px] font-semibold">
          Tecken
        </text>
        <text x="10" y="366" className="fill-text-secondary text-[13px]">
          blinkers vänster
        </text>
        <Pekare x1={92} y1={346} x2={243} y2={348} />

        <Siffra n={3} x={18} y={388} />
        <text x="36" y="393" className="fill-text-primary text-[14px] font-semibold">
          Axelblick
        </text>
        <text x="10" y="410" className="fill-text-secondary text-[13px]">
          dit spegeln
        </text>
        <text x="10" y="426" className="fill-text-secondary text-[13px]">
          inte når
        </text>
        <Pekare x1={108} y1={391} x2={239} y2={362} />
      </g>

      {/* Ordningen */}
      <Siffra n={1} x={30} y={652} />
      <text x="46" y="657" className="fill-text-primary text-[13px] font-medium">
        Spegel
      </text>
      <Siffra n={2} x={120} y={652} />
      <text x="136" y="657" className="fill-text-primary text-[13px] font-medium">
        Tecken
      </text>
      <Siffra n={3} x={210} y={652} />
      <text x="226" y="657" className="fill-text-primary text-[13px] font-medium">
        Axelblick åt vänster
      </text>
      <text x="20" y="682" className="fill-text-secondary text-[13px]">
        I den ordningen, innan bilen rör sig.
      </text>

      {/* Regeln */}
      <text x="20" y="712" className="fill-text-primary text-[13px] font-medium">
        Starta från vägkanten endast om det kan ske utan fara eller
      </text>
      <text x="20" y="730" className="fill-text-primary text-[13px] font-medium">
        onödigt hinder för andra (3 kap 43 §). Tecknet befriar dig inte
      </text>
      <text x="20" y="748" className="fill-text-primary text-[13px] font-medium">
        från att försäkra dig (3 kap 66 §).
      </text>
      <text x="20" y="774" className="fill-text-secondary text-[13px]">
        Här gäller 43 §, inte väjningsplikt. Väjningsplikten gäller när
      </text>
      <text x="20" y="792" className="fill-text-secondary text-[13px]">
        du kör ut från en parkeringsplats eller en fastighet (3 kap 21 §).
      </text>

      {/* Teckenförklaring för mönstren */}
      <g transform="translate(20 806)">
        <rect width="16" height="12" fill="url(#sv-dots)" className="stroke-attention-600" strokeWidth="1.5" />
        <text x="22" y="10" className="fill-text-secondary text-[13px]">
          Du
        </text>
        <rect x="70" width="16" height="12" fill="url(#sv-stripes)" className="stroke-primary-600" strokeWidth="1.5" />
        <text x="92" y="10" className="fill-text-secondary text-[13px]">
          Annan bil
        </text>
        <rect x="180" width="16" height="12" fill="url(#sv-cross)" className="stroke-safety-600" strokeWidth="1.5" />
        <text x="202" y="10" className="fill-text-secondary text-[13px]">
          Cyklist
        </text>
      </g>

      {/* Förklaringsruta: luckan ska räcka till att komma upp i fart */}
      <rect x="20" y="834" width="400" height="236" rx="6" className="fill-surface-raised stroke-border-default" strokeWidth="1.5" />
      <text x="36" y="860" className="fill-text-primary text-[14px] font-semibold">
        Luckan ska räcka till att komma upp i fart
      </text>
      <line x1="210" y1="874" x2="210" y2="1058" className="stroke-text-tertiary" strokeWidth="2" strokeDasharray="6 5" />

      {/* A: bilen bakom är långt bak, du hinner upp i fart */}
      <g transform="translate(60 874) scale(0.6)">
        <Minigata />
        <rect x="56" y="176" width="22" height="53" rx="3" fill="url(#sv-stripes)" className="stroke-primary-600" strokeWidth="2" />
        <polygon points="60,184 67,178 74,184" className="fill-primary-600" />
        <line x1="67" y1="170" x2="67" y2="150" className="stroke-primary-600" strokeWidth="2.5" markerEnd="url(#sv-arrow-other)" />
      </g>
      <path d="M 36 1034 l 6 6 l 12 -13" className="fill-none stroke-progress-600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="60" y="1038" className="fill-text-primary text-[13px] font-semibold">
        Luckan räcker:
      </text>
      <text x="60" y="1056" className="fill-text-primary text-[13px]">
        du hinner upp i fart
      </text>

      {/* B: bilen bakom är tätt inpå och måste bromsa: onödigt hinder */}
      <g transform="translate(250 874) scale(0.6)">
        <Minigata />
        <rect x="56" y="112" width="22" height="53" rx="3" fill="url(#sv-stripes)" className="stroke-primary-600" strokeWidth="2" />
        <polygon points="60,120 67,114 74,120" className="fill-primary-600" />
        {/* Bromsljus */}
        <rect x="58" y="161" width="6" height="4" className="fill-safety-600" />
        <rect x="70" y="161" width="6" height="4" className="fill-safety-600" />
      </g>
      <path d="M 224 1028 L 238 1042 M 238 1028 L 224 1042" className="stroke-safety-600" strokeWidth="3" strokeLinecap="round" />
      <text x="248" y="1038" className="fill-text-primary text-[13px] font-semibold">
        För liten lucka:
      </text>
      <text x="248" y="1056" className="fill-text-primary text-[13px]">
        bilen bakom måste bromsa
      </text>
    </svg>
  );
}
