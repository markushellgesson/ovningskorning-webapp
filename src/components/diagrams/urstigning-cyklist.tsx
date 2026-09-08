/**
 * Urstigning mot cykelfält (VEH-03) — blicken bakåt innan dörren öppnas.
 *
 * Vad bilden lär ut: innan dörren öppnas ska föraren titta bakåt genom rutan
 * och i spegeln efter cyklister och mopeder. Bilen står lagligt parkerad i en
 * ficka innanför cykelfältet — faran finns kvar ändå, eftersom dörren svänger
 * rakt ut i cykelfältet. Bilden handlar bara om dörren, inte om bältet och
 * inte om passagerarnas eget ansvar, och den säger ingenting om var man får
 * eller inte får stanna.
 *
 * Regelstöd i momentet (prisma/seed/skills.ts, VEH-03): TrF 3 kap 50 §
 * tredje stycket om dörröppning, målet "öppna dem så att ingen kommer till
 * skada" och övningssteget "innan du öppnar dörren: titta bakåt genom rutan
 * och i spegeln efter cyklister och mopeder". Inga andra regelpåståenden.
 *
 * Skala 12 px = 1 m, samma som övriga diagram. Kaross 22 × 53 px. Scenen
 * ligger i en grupp med translate(0 56); koordinaterna nedan är gruppens
 * lokala. Alla värden är efterräknade i skript, inte uppskattade.
 *
 * ---- Geometri (högertrafik, vy uppifrån) ----
 * Gatan går lodrätt. Tvärsnitt från vänster till höger:
 *   mötande körfält x 132–168 | mittlinje x 168 | ditt körfält x 168–210 |
 *   cykelfältslinje x 210 | cykelfält x 210–238 | parkeringsficka x 238–264 |
 *   kantsten x 264 | trottoar x 264–278.
 *
 * - Din bil och cyklisten färdas båda UPPÅT i bilden (minskande y). Kör man
 *   uppåt ligger den egna högra sidan mot bildens höga x. Därför ligger ditt
 *   körfält i x 168–210, cykelfältet ytterligare till höger i x 210–238, och
 *   det mötande körfältet i x 132–168 lämnas tomt.
 * - Din bil står i parkeringsfickan: kaross x 240–262, y 145,5–198,5 (mitt
 *   251, 172). 240 ≥ 238, alltså helt utanför cykelfältet, med 2 px marginal
 *   till fickans linje och 2 px till kantstenen.
 * - Föraren sitter till vänster, mot låga x: öga (245, 164), vänster
 *   ytterspegel x 234–240 — den sticker ut över cykelfältet.
 * - Förardörren är hängd fram, gångjärn (240, 160), dörrblad 22 px. Öppnad
 *   60° från karossen når spetsen (220,95, 171). Svepytan spänner x 218–240,
 *   y 160–182. Kontrollerat: 218 < 238, så dörren når 20 px in i det 28 px
 *   breda cykelfältet — nästan hela fältets bredd. 218 > 210, så den når inte
 *   ut i körfältet, och 218 > mittlinjen 168.
 * - Cyklisten kör i cykelfältet: kropp x 217–227, y 291–313, mitt i fältet
 *   210–238. Korridoren 217–227 skär svepytan 218–240 i x 218–227. Det är
 *   konflikten bilden bygger på — och den uppstår trots att bilen står rätt.
 * - I huvudscenen är cyklistens front y 291 och svepytan slutar y 182: gott
 *   avstånd kvar. Faran är förebyggd, inte pågående.
 * - Blicken bakåt går från ögat (245, 164) till (232, 262). Vid y 182 ligger
 *   den i x 246,6, alltså utanför svepytan (max x 240), och som närmast 10 px
 *   från cyklistens rörelselinje i x 222.
 *
 * ---- Förklaringsrutan ----
 * Samma lokala koordinater i skala 0,7, samma körfält, samma ficka och samma
 * färdriktningar som huvudscenen. Bilen och dörrgeometrin är identiska,
 * flyttade till mitt (251, 45) med gångjärn (240, 33) och svepyta y 33–55;
 * bara blicken och cyklistens läge skiljer. Rätt: cyklisten y 89–111, utanför
 * svepytan, dörren stängd. Fel: cyklisten y 36–58, inuti svepytan, dörren
 * öppen. Överlappen är räknade, inte antagna.
 *
 * ---- Kodning ----
 * Mönster: prickar = din bil, kryss = cyklist, diagonala ränder = dörrens
 * svepyta. Inget mönster används till två saker. Bock och kryss i rutan är
 * fristående symboler, inte fyllningsmönster. Färg bär ingen betydelse
 * ensam — varje element har mönster eller form och en etikett.
 * Linjer: heldragen = rör sig nu, prickad = blicken bakåt.
 */

/** Bil ritad med fronten uppåt. Kaross 22 × 53. */
function Bil({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <g className="fill-text-primary">
        <rect x="-14" y="-20" width="4" height="9" rx="1" />
        <rect x="10" y="-20" width="4" height="9" rx="1" />
        <rect x="-14" y="11" width="4" height="9" rx="1" />
        <rect x="10" y="11" width="4" height="9" rx="1" />
      </g>
      <rect x="-11" y="-26.5" width="22" height="53" rx="3" className="fill-surface-base" />
      <rect
        x="-11"
        y="-26.5"
        width="22"
        height="53"
        rx="3"
        fill="url(#uc-dots)"
        className="stroke-attention-600"
        strokeWidth="2"
      />
      <polygon points="-7,-17 0,-24 7,-17" className="fill-attention-600" />
      {/* Vänster ytterspegel, ut över cykelfältet */}
      <rect x="-17" y="-16" width="6" height="4" rx="1" className="fill-text-primary" />
    </g>
  );
}

/** Cyklist: smal kropp med kryssmönster. */
function Cyklist({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <rect x={cx - 5} y={cy - 11} width="10" height="22" rx="3" className="fill-surface-base" />
      <rect
        x={cx - 5}
        y={cy - 11}
        width="10"
        height="22"
        rx="3"
        fill="url(#uc-cross)"
        className="stroke-primary-600"
        strokeWidth="2"
      />
    </g>
  );
}

/** Cykelsymbol målad i cykelfältet. */
function Cykelsymbol({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g className="stroke-diagram-marking fill-none" strokeWidth="2" transform={`translate(${cx} ${cy})`}>
      <circle cx="0" cy="-9" r="5" />
      <circle cx="0" cy="9" r="5" />
      <path d="M 0 9 L 4 0 L -4 0 L 0 -9" />
    </g>
  );
}

/** Numrerad hänvisning: mörk cirkel med siffra. */
function Callout({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="11" className="fill-text-primary" />
      <text x={x} y={y + 5} textAnchor="middle" className="fill-surface-base text-[14px] font-semibold">
        {n}
      </text>
    </g>
  );
}

/** Tunn pekarlinje som slutar i en punkt på det den syftar på. */
function Pekare({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-text-tertiary" strokeWidth="1.5" />
      <circle cx={x2} cy={y2} r="3" className="fill-text-tertiary" />
    </g>
  );
}

/**
 * Miniscen till förklaringsrutan, i skala 0,7 och samma lokala koordinater
 * som huvudscenen: körfält x 168–210, cykelfält x 210–238, ficka x 238–264,
 * kantsten x 264. Bilen står i fickan och cyklisten kör uppåt i cykelfältet
 * i båda varianterna. Bara blicken och dörren skiljer.
 */
function MiniDorr({ x, y, variant }: { x: number; y: number; variant: 'ratt' | 'fel' }) {
  const open = variant === 'fel';
  return (
    <g transform={`translate(${x} ${y}) scale(0.7) translate(-168 0)`}>
      <rect x="168" y="0" width="96" height="130" className="fill-diagram-road" />
      <rect x="264" y="0" width="14" height="130" className="fill-diagram-edge" opacity="0.3" />
      <line x1="168" y1="0" x2="168" y2="130" className="stroke-diagram-marking" strokeWidth="2.5" strokeDasharray="10 8" />
      <line x1="210" y1="0" x2="210" y2="130" className="stroke-diagram-marking" strokeWidth="3" />
      <line x1="238" y1="0" x2="238" y2="130" className="stroke-diagram-marking" strokeWidth="2" />
      <line x1="264" y1="0" x2="264" y2="130" className="stroke-diagram-edge" strokeWidth="2.5" />

      {open && (
        <g>
          {/* Dörrens svepyta: gångjärn (240,33), dörrblad 22, öppen 60° */}
          <path
            d="M 240 33 L 240 55 A 22 22 0 0 1 220.95 44 Z"
            fill="url(#uc-hatch)"
            className="stroke-safety-600"
            strokeWidth="2"
          />
          <line x1="240" y1="33" x2="220.95" y2="44" className="stroke-safety-600" strokeWidth="4" strokeLinecap="round" />
        </g>
      )}

      <Bil cx={251} cy={45} />
      {!open && (
        <line x1="240" y1="33" x2="240" y2="55" className="stroke-progress-600" strokeWidth="4" strokeLinecap="round" />
      )}

      {variant === 'ratt' ? (
        <g>
          <Cyklist cx={222} cy={100} />
          <line
            x1="245"
            y1="37"
            x2="234"
            y2="84"
            className="stroke-text-primary"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="0.5 6"
            markerEnd="url(#uc-arrow-look)"
          />
        </g>
      ) : (
        <Cyklist cx={222} cy={47} />
      )}
    </g>
  );
}

export function UrstigningCyklistDiagram() {
  return (
    <svg
      viewBox="0 0 400 1024"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="uc-title uc-desc"
    >
      <title id="uc-title">Urstigning: titta bakåt innan dörren öppnas mot cykelfältet</title>
      <desc id="uc-desc">
        Vy uppifrån av en lodrät gata. Från vänster: mötande körfält, streckad mittlinje, ditt
        körfält, en heldragen vit linje, ett cykelfält med målade cykelsymboler, en parkeringsficka
        markerad med vita linjer, kantsten och trottoar. Din bil, fylld med prickmönster, står
        parkerad i fickan med nosen uppåt, alltså utanför cykelfältet. Föraren sitter mot
        gatusidan; en liten mörk rektangel är vänster ytterspegel, som skjuter ut över cykelfältet.
        En prickad linje med pilspets går snett bakåt från förarplatsen: blicken genom rutan och i
        spegeln. En kilformad yta med diagonala ränder och röd kontur, utgående från dörrens
        gångjärn, visar hur långt förardörren når när den öppnas: nästan tvärs över cykelfältet,
        men inte ut i körfältet. En cyklist, ritad med kryssmönster, kommer bakifrån i cykelfältet;
        en heldragen linje med pilspets framför cyklisten visar färden uppåt. Avståndet fram till
        dörrens yta är stort: faran är förebyggd, inte pågående. Tre numrerade hänvisningar i
        marginalerna: 1 pekar på förarplatsen och blicken bakåt, 2 pekar på dörrens yta i
        cykelfältet, 3 pekar på cykelfältet som ligger precis utanför dörren. Längst ned en ruta
        som jämför två fall med samma gata, samma parkeringsficka och samma färdriktningar. Till
        vänster, märkt med en grön bock: dörren är stängd, markerad med ett grönt streck längs
        karossen, föraren tittar bakåt och cyklisten har gott om utrymme. Till höger, märkt med ett
        rött kryss: dörren är öppen, den röda ytan ligger tvärs över cykelfältet och cyklisten är
        redan inne i den.
      </desc>

      <defs>
        <pattern id="uc-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="uc-cross" patternUnits="userSpaceOnUse" width="7" height="7">
          <path d="M0,0 l7,7 M7,0 l-7,7" className="stroke-primary-600" strokeWidth="1.6" />
        </pattern>
        <pattern id="uc-hatch" patternUnits="userSpaceOnUse" width="7" height="7">
          <path d="M-2,2 l4,-4 M0,7 l7,-7 M5,9 l4,-4" className="stroke-safety-600" strokeWidth="1.8" />
        </pattern>
        <marker id="uc-arrow-cyclist" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary-600" />
        </marker>
        <marker id="uc-arrow-look" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-text-primary" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Urstigning mot cykelfält
      </text>
      <text x="20" y="48" className="fill-text-secondary text-[14px]">
        Titta bakåt innan dörren öppnas
      </text>

      <g transform="translate(0 56)">
        {/* Gata: mötande körfält, eget körfält, cykelfält, parkeringsficka, trottoar */}
        <rect x="132" y="0" width="132" height="412" className="fill-diagram-road" />
        <rect x="264" y="0" width="14" height="412" className="fill-diagram-edge" opacity="0.3" />
        <line x1="132" y1="0" x2="132" y2="412" className="stroke-diagram-edge" strokeWidth="2" />
        <line x1="168" y1="0" x2="168" y2="412" className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="10 8" />
        <line x1="210" y1="0" x2="210" y2="412" className="stroke-diagram-marking" strokeWidth="3" />
        <line x1="264" y1="0" x2="264" y2="412" className="stroke-diagram-edge" strokeWidth="3" />

        {/* Parkeringsfickans markering */}
        <g className="stroke-diagram-marking" strokeWidth="2">
          <line x1="238" y1="132" x2="238" y2="216" />
          <line x1="238" y1="132" x2="264" y2="132" />
          <line x1="238" y1="216" x2="264" y2="216" />
        </g>

        <Cykelsymbol cx={224} cy={44} />
        <Cykelsymbol cx={224} cy={376} />

        {/* 2. Dörrens svepyta: gångjärn (240,160), dörrblad 22, öppningsvinkel 60° */}
        <path
          d="M 240 160 L 240 182 A 22 22 0 0 1 220.95 171 Z"
          fill="url(#uc-hatch)"
          className="stroke-safety-600"
          strokeWidth="2"
        />

        {/* Din bil i parkeringsfickan, dörren fortfarande stängd */}
        <Bil cx={251} cy={172} />
        <line x1="240" y1="160" x2="240" y2="182" className="stroke-attention-600" strokeWidth="4" strokeLinecap="round" />

        {/* 1. Blicken bakåt: genom rutan och i spegeln, innan handtaget dras */}
        <line
          x1="245"
          y1="164"
          x2="232"
          y2="262"
          className="stroke-text-primary"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="0.5 6"
          markerEnd="url(#uc-arrow-look)"
        />

        {/* Cyklisten bakifrån i cykelfältet, med gott avstånd kvar */}
        <Cyklist cx={222} cy={302} />
        <line x1="222" y1="287" x2="222" y2="222" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#uc-arrow-cyclist)" />

        {/* 1. Titta bakåt */}
        <Callout x={22} y={120} n={1} />
        <text x="38" y="125" className="fill-text-primary text-[14px] font-semibold">
          Titta bakåt
        </text>
        <text x="10" y="143" className="fill-text-secondary text-[14px]">
          genom rutan
        </text>
        <text x="10" y="161" className="fill-text-secondary text-[14px]">
          och i spegeln,
        </text>
        <text x="10" y="179" className="fill-text-secondary text-[14px]">
          innan du drar
        </text>
        <text x="10" y="197" className="fill-text-secondary text-[14px]">
          i handtaget
        </text>
        <Pekare x1={124} y1={124} x2={243} y2={160} />

        {/* 2. Dörrens väg */}
        <Callout x={22} y={220} n={2} />
        <text x="38" y="225" className="fill-text-primary text-[14px] font-semibold">
          Dörrens väg
        </text>
        <text x="10" y="243" className="fill-text-secondary text-[14px]">
          tvärs över
        </text>
        <text x="10" y="261" className="fill-text-secondary text-[14px]">
          cykelfältet
        </text>
        <Pekare x1={124} y1={220} x2={222} y2={171} />

        {/* Cyklisten */}
        <text x="10" y="302" className="fill-text-primary text-[14px] font-semibold">
          Cyklist bakifrån
        </text>
        <text x="10" y="320" className="fill-text-secondary text-[14px]">
          i sitt eget fält
        </text>
        <Pekare x1={124} y1={298} x2={216} y2={302} />

        {/* 3. Cykelfältet */}
        <Callout x={292} y={126} n={3} />
        <text x="308" y="131" className="fill-text-primary text-[14px] font-semibold">
          Cykelfält
        </text>
        <text x="282" y="157" className="fill-text-secondary text-[14px]">
          ligger precis
        </text>
        <text x="282" y="175" className="fill-text-secondary text-[14px]">
          utanför dörren.
        </text>
        <text x="282" y="193" className="fill-text-secondary text-[14px]">
          Cyklisten kan
        </text>
        <text x="282" y="211" className="fill-text-secondary text-[14px]">
          vara där när
        </text>
        <text x="282" y="229" className="fill-text-secondary text-[14px]">
          du öppnar
        </text>
        <Pekare x1={280} y1={126} x2={228} y2={126} />
      </g>

      {/* Teckenförklaring */}
      <g>
        <line x1="24" y1="528" x2="52" y2="528" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#uc-arrow-cyclist)" />
        <text x="60" y="533" className="fill-text-secondary text-[14px]">
          Rör sig nu
        </text>
        <line
          x1="206"
          y1="528"
          x2="234"
          y2="528"
          className="stroke-text-primary"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="0.5 6"
        />
        <text x="242" y="533" className="fill-text-secondary text-[14px]">
          Blicken bakåt
        </text>
        <rect
          x="24"
          y="546"
          width="28"
          height="14"
          fill="url(#uc-hatch)"
          className="stroke-safety-600"
          strokeWidth="1.5"
        />
        <text x="60" y="558" className="fill-text-secondary text-[14px]">
          Dit dörren når när den öppnas
        </text>
      </g>

      {/* Vad du gör */}
      <text x="200" y="594" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        Innan du öppnar dörren: titta bakåt
      </text>
      <text x="200" y="614" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        genom rutan och i spegeln efter
      </text>
      <text x="200" y="634" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        cyklister och mopeder.
      </text>
      <text x="200" y="658" textAnchor="middle" className="fill-text-secondary text-[14px]">
        Bilen står rätt parkerad — dörren når ändå
      </text>
      <text x="200" y="676" textAnchor="middle" className="fill-text-secondary text-[14px]">
        tvärs över cykelfältet. Öppna lite i taget,
      </text>
      <text x="200" y="694" textAnchor="middle" className="fill-text-secondary text-[14px]">
        och stig ut vänd mot trafiken.
      </text>
      <text x="200" y="714" textAnchor="middle" className="fill-text-secondary text-[14px]">
        Detsamma gäller passagerarnas dörrar.
      </text>

      {/* Mönsterförklaring */}
      <g>
        <rect x="86" y="734" width="22" height="14" rx="2" fill="url(#uc-dots)" className="stroke-attention-600" strokeWidth="1.5" />
        <text x="114" y="746" className="fill-text-tertiary text-[14px]">
          Du
        </text>
        <rect x="190" y="734" width="22" height="14" rx="2" fill="url(#uc-cross)" className="stroke-primary-600" strokeWidth="1.5" />
        <text x="218" y="746" className="fill-text-tertiary text-[14px]">
          Cyklist
        </text>
      </g>

      {/* Förklaringsruta: samma gata och samma ficka — bara blicken skiljer */}
      <rect x="20" y="762" width="360" height="248" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="34" y="786" className="fill-text-primary text-[14px] font-semibold">
        Vad blicken bakåt avgör:
      </text>
      <line x1="200" y1="798" x2="200" y2="998" className="stroke-border-default" strokeWidth="1.5" strokeDasharray="6 4" />

      {/* Rätt: bock, blick bakåt, dörren stängd */}
      <path
        d="M 66 812 L 72 819 L 84 804"
        className="fill-none stroke-progress-600"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="92" y="818" className="fill-text-primary text-[14px] font-semibold">
        Rätt
      </text>
      <MiniDorr x={62} y={826} variant="ratt" />
      <text x="100" y="942" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Du tittar bakåt först
      </text>
      <text x="100" y="960" textAnchor="middle" className="fill-text-secondary text-[14px]">
        och väntar med att
      </text>
      <text x="100" y="978" textAnchor="middle" className="fill-text-secondary text-[14px]">
        öppna dörren
      </text>

      {/* Fel: kryss, ingen blick, dörren öppen i cyklistens väg */}
      <g className="stroke-safety-600" strokeWidth="4" strokeLinecap="round">
        <line x1="254" y1="805" x2="268" y2="819" />
        <line x1="268" y1="805" x2="254" y2="819" />
      </g>
      <text x="276" y="818" className="fill-text-primary text-[14px] font-semibold">
        Fel
      </text>
      <MiniDorr x={250} y={826} variant="fel" />
      <text x="288" y="942" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Ingen blick bakåt
      </text>
      <text x="288" y="960" textAnchor="middle" className="fill-text-secondary text-[14px]">
        Dörren öppnas rakt
      </text>
      <text x="288" y="978" textAnchor="middle" className="fill-text-secondary text-[14px]">
        ut i cyklistens väg
      </text>
    </svg>
  );
}
