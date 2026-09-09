/**
 * Grundläggande reglage (VEH-04) — hitta dem med handen, inte med blicken.
 *
 * Bildens enda poäng: handen söker reglaget medan blicken ligger kvar på vägen
 * framför bilen. De två sker samtidigt, inte efter varandra. Bilden namnger var
 * reglagen sitter — den säger ingenting om när de ska användas, och ingenting
 * om vad en regel kräver. Inga siffror, inga mått, ingen paragraf.
 *
 * ---- VY OCH RIKTNINGAR ----
 * Vy från förarplatsen, inifrån bilen och framåt. Det här är alltså INTE en vy
 * uppifrån, men högertrafiken styr ändå två saker i bilden, och båda är
 * efterräknade:
 *
 * 1. Förarplatsen ligger till VÄNSTER i bilen. Ratten ritas därför med centrum
 *    i x = 158 på en duk som är 440 bred och en kupé som spänner x 18–422
 *    (kupémitt x = 220). 158 < 220, alltså sitter föraren till vänster om
 *    mitten — rätt för svensk högertrafik. Mittkonsolen ligger till förarens
 *    höger, x 286–404, alltså på andra sidan om kupémitten.
 * 2. Vägen genom vindrutan. Bilen kör i sitt eget körfält, och i högertrafik
 *    ligger mötande trafik till VÄNSTER. Vägen är ritad i perspektiv mot en
 *    försvinnandepunkt vid (227, 123):
 *      mittlinje (streckad, vit):    (56, 204) → (222, 124)
 *      höger kantlinje (heldragen):  (330, 204) → (232, 124)
 *      vänster vägkant (mötandes sida): (50, 166) → (218, 124)
 *    Det egna körfältet är alltså ytan MELLAN mittlinjen och höger kantlinje,
 *    och den mötande sidan ligger till vänster om mittlinjen — som sig bör.
 *    Kontroll av blickpunkten: vid y = 140 är t = (204 − 140)/80 = 0,8, alltså
 *    mittlinjen x = 56 + 166·0,8 = 188,8 och kantlinjen x = 330 − 98·0,8 =
 *    251,6. Körfältets mitt är (188,8 + 251,6)/2 = 220,2. Blickringen ligger i
 *    (220, 140) med radie 9, alltså x 211–229 — helt inom 188,8–251,6, i det
 *    EGNA körfältet. Den ligger inte i mötandes fält, vilket hade lärt ut fel
 *    sak om var blicken hör hemma.
 *
 * ---- REGLAGENS PLACERING (dukens koordinater, kupé x 18–422, y 0–474) ----
 *   1 Blinkers          vänster spak, x 44–110,  y 364–377
 *   2 Torkare           höger spak,   x 206–272, y 364–377
 *   3 Ljus              vred på panelen, centrum (60, 288), r 22
 *   4 Varningsblinkers  knapp x 292–336, y 258–298, i mittkonsolen
 *   5 Signalhorn        rattens nav, centrum (158, 380), r 22
 *   6 Defroster         knapp x 356–400, y 258–298, i mittkonsolen
 * Rattkransen har centrum (158, 380) och radie 62 med linjebredd 9, alltså
 * ytterkant 66,5 och innerkant 57,5. Vänster spak slutar i x 110 och höger
 * börjar i x 206 — båda alltså under kransen (96–220 vid navhöjd), så de läses
 * som spakar bakom ratten och inte som lösa streck.
 *
 * Kontroll att inget överlappar oavsiktligt: sifferbrickorna (r 11) ligger i
 * (30, 370), (240, 342), (60, 250), (314, 232), (130, 352) och (378, 232).
 * Bricka 2 (x 229–251) ligger till vänster om konsolen (x ≥ 286) och till höger
 * om kransens ytterkant vid y 342 (x ≤ 207). Brickorna 4 och 6 (y 221–243)
 * ligger mellan vindrutans underkant (y 206) och konsolens överkant (y 246).
 * Bricka 5 ligger i den fria ringen mellan navet och kransen: avståndet från
 * rattens centrum till (130, 352) är √(28² + 28²) = 39,6, alltså sträcker sig
 * brickan mellan radie 28,6 och 50,6 — utanför navet (22) och innanför kransens
 * innerkant (57,5). Ekrarna ligger rakt vänster, rakt höger och rakt ned, så
 * den snedställda placeringen träffar ingen av dem.
 * Handens etikett (baslinjer y 448 och 466, x 20–121) ligger under kransen: vid
 * y 437, alltså glyfernas överkant, sträcker sig kransens ytterkant mellan
 * x 129 och x 187. 121 < 129, alltså ingen beröring.
 *
 * ---- HANDEN OCH BLICKEN, SAMTIDIGT ----
 * Handen ligger UNDER vänster spak (handflata x 52–94, y 386–416) med tre
 * fingertoppar upp till spakens underkant y 377, så att spaken förblir synlig.
 * Blickmärket (ögat) ligger i (158, 224), mellan vindrutans underkant 206 och
 * instrumenthusets överkant 242. Blicklinjen går (160, 209) → (211, 151) och
 * stannar strax före blickringen (avstånd till ringens centrum 14,2 mot radien
 * 9), ut genom vindrutan. De två är ritade som två pågående saker i
 * samma ögonblick — ingen pil går från den ena till den andra.
 *
 * ---- FÖRKLARINGSRUTAN (efterräknad, inte antagen) ----
 * Två miniatyrer av samma kupé, i egna lokala koordinater 0–170 × 0–120,
 * placerade i (26, 874) och (226, 874). Vägen i miniatyren har samma ordning
 * som huvudbilden: mittlinje (14, 62) → (86, 36), höger kantlinje (140, 62) →
 * (94, 36), eget körfält däremellan. Handen ligger på vänster spak i BÅDA
 * panelerna — det är enda sättet att visa att skillnaden inte är handen.
 *   Rätt: blicklinjen (58, 67) → (86, 50) går ut genom vindrutan, och
 *   blickringen ligger i (86, 44). Kontroll: vid y = 44 är t = (62 − 44)/26 =
 *   0,692, mittlinjen x = 14 + 72·0,692 = 63,8 och kantlinjen x = 140 −
 *   46·0,692 = 108,2. Ringen (radie 6, alltså x 80–92) ligger inom 63,8–108,2:
 *   i det egna körfältet.
 *   Fel: blicklinjen (50, 79) → (32, 94) går ned till handen, och det egna
 *   körfältet mellan y 40 och y 56 täcks av en skrafferad yta med röd kontur:
 *   (74,9 | 40) (101,1 | 40) (129,4 | 56) (30,6 | 56) — hörnen är körfältets
 *   egna kanter på de två höjderna, uträknade med samma t-formel.
 *
 * ---- KODNING (ett mönster, en betydelse) ----
 * prickmönster = din hand. skraffering = vägsträcka ingen tittar på (bara i
 * fel-panelen). prickad linje med pilspets = blicken (grön ut mot vägen, röd
 * ned mot handen — riktningen och bock/kryss bär skillnaden, inte kulören).
 * ring med kärna = blickpunkt. Sifferbricka = ett reglage, inte en fara.
 * Varje betydelse bärs av form, mönster eller etikett vid sidan av kulören.
 */

/** Sifferbricka för ett reglage. */
function Bricka({ cx, cy, n }: { cx: number; cy: number; n: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="11" className="fill-text-primary" />
      <text
        x={cx}
        y={cy + 5}
        textAnchor="middle"
        className="fill-surface-base text-[14px] font-semibold"
      >
        {n}
      </text>
    </g>
  );
}

/** Rad i reglageförteckningen. */
function Nyckelrad({ x, y, n, text }: { x: number; y: number; n: number; text: string }) {
  return (
    <g>
      <circle cx={x + 10} cy={y - 5} r="10" className="fill-text-primary" />
      <text
        x={x + 10}
        y={y}
        textAnchor="middle"
        className="fill-surface-base text-[14px] font-semibold"
      >
        {n}
      </text>
      <text x={x + 28} y={y} className="fill-text-primary text-[14px]">
        {text}
      </text>
    </g>
  );
}

/** Handen som känner efter: handflata med prickmönster och tre fingertoppar. */
function Hand({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="stroke-attention-600" strokeWidth="2">
        <rect x="6" y="-12" width="11" height="16" rx="5" className="fill-surface-base" />
        <rect x="19" y="-12" width="11" height="16" rx="5" className="fill-surface-base" />
        <rect x="32" y="-12" width="11" height="16" rx="5" className="fill-surface-base" />
      </g>
      <rect x="0" y="0" width="42" height="30" rx="12" className="fill-surface-base" />
      <rect
        x="0"
        y="0"
        width="42"
        height="30"
        rx="12"
        fill="url(#gr-dots)"
        className="stroke-attention-600"
        strokeWidth="2.5"
      />
    </g>
  );
}

/** Ögonmärke: blicken. */
function Oga({ cx, cy, s = 1 }: { cx: number; cy: number; s?: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s})`}>
      <path
        d="M -18 0 Q 0 -12 18 0 Q 0 12 -18 0 Z"
        className="fill-surface-base stroke-text-primary"
        strokeWidth="2"
      />
      <circle cx="0" cy="0" r="4.5" className="fill-text-primary" />
    </g>
  );
}

/** Blickpunkt på vägen: ring med kärna. */
function Blickpunkt({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} className="fill-none stroke-progress-600" strokeWidth="3" />
      <circle cx={cx} cy={cy} r={r / 3} className="fill-progress-600" />
    </g>
  );
}

/**
 * Miniatyr av samma kupé till förklaringsrutan. Lokala koordinater 0–170 × 0–120.
 * Samma vägordning som huvudbilden: mittlinjen ligger till vänster om det egna
 * körfältet. Handen ligger på vänster spak i båda varianterna; bara blicken skiljer.
 */
function MiniKupe({ x, y, variant }: { x: number; y: number; variant: 'ratt' | 'fel' }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <clipPath id={`gr-mini-glas-${variant}`}>
        <rect x="6" y="0" width="158" height="62" rx="6" />
      </clipPath>
      <g clipPath={`url(#gr-mini-glas-${variant})`}>
        <rect x="6" y="0" width="158" height="36" className="fill-surface-base" />
        <rect x="6" y="34" width="158" height="28" className="fill-diagram-road" />
        <polygon points="140,62 164,62 164,36 94,36" className="fill-neutral-200" />
        <line
          x1="14"
          y1="62"
          x2="86"
          y2="36"
          className="stroke-diagram-marking"
          strokeWidth="2"
          strokeDasharray="7 6"
        />
        <line x1="140" y1="62" x2="94" y2="36" className="stroke-diagram-marking" strokeWidth="2" />
        {variant === 'fel' && (
          <polygon
            points="74.9,40 101.1,40 129.4,56 30.6,56"
            fill="url(#gr-hatch)"
            className="stroke-safety-600"
            strokeWidth="2"
          />
        )}
        {variant === 'ratt' && <Blickpunkt cx={86} cy={44} r={6} />}
      </g>
      <rect
        x="6"
        y="0"
        width="158"
        height="62"
        rx="6"
        className="fill-none stroke-text-primary"
        strokeWidth="2"
      />

      {/* Instrumentbräda */}
      <rect x="0" y="62" width="170" height="58" className="fill-neutral-200" />
      <line x1="0" y1="62" x2="170" y2="62" className="stroke-text-primary" strokeWidth="2" />

      {/* Vänster spak och ratt */}
      <rect
        x="8"
        y="96"
        width="34"
        height="7"
        rx="3.5"
        className="fill-surface-base stroke-text-primary"
        strokeWidth="2"
      />
      <path
        d="M 26 112 A 30 30 0 0 1 86 112"
        className="fill-none stroke-text-primary"
        strokeWidth="6"
      />

      {/* Handen ligger på spaken i båda fallen */}
      <g transform="translate(10 100)">
        <rect x="0" y="0" width="28" height="18" rx="8" className="fill-surface-base" />
        <rect
          x="0"
          y="0"
          width="28"
          height="18"
          rx="8"
          fill="url(#gr-dots)"
          className="stroke-attention-600"
          strokeWidth="2"
        />
      </g>

      <Oga cx={56} cy={73} s={0.6} />
      {variant === 'ratt' ? (
        <line
          x1="58"
          y1="67"
          x2="86"
          y2="50"
          className="stroke-progress-600"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="0.5 7"
          markerEnd="url(#gr-arrow-look)"
        />
      ) : (
        <line
          x1="50"
          y1="79"
          x2="32"
          y2="94"
          className="stroke-safety-600"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="0.5 7"
          markerEnd="url(#gr-arrow-away)"
        />
      )}
    </g>
  );
}

export function GrundlaggandeReglageDiagram() {
  return (
    <svg
      viewBox="0 0 440 1060"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="gr-title gr-desc"
    >
      <title id="gr-title">Grundläggande reglage — hitta dem med handen, inte med blicken</title>
      <desc id="gr-desc">
        Vy från förarplatsen i en bil med ratten till vänster. Överst syns vägen genom vindrutan:
        himmel över horisonten, grå vägbana under, en streckad vit mittlinje som löper ned åt
        vänster och en heldragen vit kantlinje åt höger. Det egna körfältet är ytan mellan dem; den
        mötande sidan ligger till vänster om mittlinjen. En grön ring med kärna långt fram i det
        egna körfältet är blickpunkten, och en grön prickad linje med pilspets går från ett
        ögonmärke på instrumentbrädan upp och ut genom vindrutan till ringen. Nedanför vindrutan
        ligger instrumentbrädan med en ratt vars nav bär ett signalhornsmärke, ett instrumenthus
        bakom ratten, en spak på var sin sida om ratten, ett runt vred till vänster på panelen och
        en mittkonsol till höger med två knappar. Sex mörka sifferbrickor med vit siffra pekar ut
        reglagen och räknas upp i en förteckning under bilden: 1 blinkers på vänster spak, 2 torkare
        på höger spak, 3 ljusvredet, 4 varningsblinkers, 5 signalhornet i rattens mitt och 6
        defrostern. Under vänster spak ligger en hand, ritad med prickmönster, med tre fingertoppar
        uppe mot spaken: handen känner efter reglaget medan blicken samtidigt ligger kvar på vägen.
        Ingen pil går mellan handen och ögat — de sker samtidigt, inte efter varandra. Längst ned en
        ruta med två miniatyrer av samma kupé, samma väg och samma hand på samma spak. Till vänster,
        märkt med en grön bock: den prickade blicklinjen går ut genom vindrutan till en ring i det
        egna körfältet. Till höger, märkt med ett rött kryss: blicklinjen är röd och pekar i stället
        nedåt mot handen, och vägen framför är täckt av en skrafferad yta med röd kontur — sträckan
        ingen tittar på.
      </desc>

      <defs>
        <pattern id="gr-dots" patternUnits="userSpaceOnUse" width="7" height="7">
          <circle cx="3.5" cy="3.5" r="1.5" className="fill-attention-600" />
        </pattern>
        <pattern id="gr-hatch" patternUnits="userSpaceOnUse" width="7" height="7">
          <path
            d="M-2,2 l4,-4 M0,7 l7,-7 M5,9 l4,-4"
            className="stroke-safety-600"
            strokeWidth="1.8"
          />
        </pattern>
        <marker
          id="gr-arrow-look"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-progress-600" />
        </marker>
        <marker
          id="gr-arrow-away"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-safety-600" />
        </marker>
        <clipPath id="gr-glas">
          <polygon points="44,14 396,14 386,206 54,206" />
        </clipPath>
      </defs>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Grundläggande reglage
      </text>
      <text x="20" y="48" className="fill-text-secondary text-[14px]">
        Hitta dem med handen — blicken stannar på vägen
      </text>

      <g transform="translate(0 62)">
        {/* Kupé: instrumentbräda och stolpar */}
        <rect x="18" y="0" width="404" height="474" rx="10" className="fill-neutral-200" />

        {/* Vindrutan med vägen framför */}
        <g clipPath="url(#gr-glas)">
          <rect x="40" y="10" width="362" height="113" className="fill-surface-base" />
          <rect x="40" y="123" width="362" height="90" className="fill-diagram-road" />
          <polygon points="330,204 392,204 392,122 232,124" className="fill-neutral-200" />
          <polygon points="50,166 218,124 44,124" className="fill-neutral-200" />
          {/* Horisonten, så att himlen skiljs från vägrenen */}
          <line
            x1="40"
            y1="123"
            x2="402"
            y2="123"
            className="stroke-text-tertiary"
            strokeWidth="1.5"
          />
          {/* Mittlinje: mötande sida ligger till vänster om den */}
          <line
            x1="56"
            y1="204"
            x2="222"
            y2="124"
            className="stroke-diagram-marking"
            strokeWidth="3"
            strokeDasharray="14 12"
          />
          {/* Höger kantlinje */}
          <line
            x1="330"
            y1="204"
            x2="232"
            y2="124"
            className="stroke-diagram-marking"
            strokeWidth="3"
          />
          {/* Vänster vägkant på mötandes sida */}
          <line
            x1="50"
            y1="166"
            x2="218"
            y2="124"
            className="stroke-diagram-edge"
            strokeWidth="2"
          />
          {/* Blickpunkt i det egna körfältet */}
          <Blickpunkt cx={220} cy={140} r={9} />
        </g>
        <polygon
          points="44,14 396,14 386,206 54,206"
          className="fill-none stroke-text-primary"
          strokeWidth="3"
        />
        {/* Innerbackspegel */}
        <rect
          x="204"
          y="14"
          width="32"
          height="11"
          rx="4"
          className="fill-surface-base stroke-text-primary"
          strokeWidth="2"
        />

        {/* Blicken: ut genom vindrutan, samtidigt som handen känner efter */}
        <Oga cx={158} cy={224} />
        <line
          x1="160"
          y1="209"
          x2="211"
          y2="151"
          className="stroke-progress-600"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="0.5 7"
          markerEnd="url(#gr-arrow-look)"
        />
        <text x="248" y="52" className="fill-text-primary text-[14px] font-semibold">
          Blicken stannar
        </text>
        <text x="248" y="70" className="fill-text-primary text-[14px] font-semibold">
          på vägen
        </text>
        <line
          x1="252"
          y1="80"
          x2="229"
          y2="134"
          className="stroke-text-tertiary"
          strokeWidth="1.5"
        />
        <circle cx="229" cy="134" r="3" className="fill-text-tertiary" />

        {/* Instrumenthus bakom ratten */}
        <rect
          x="100"
          y="242"
          width="116"
          height="66"
          rx="10"
          className="fill-surface-base stroke-text-primary"
          strokeWidth="2"
        />
        <circle
          cx="130"
          cy="275"
          r="19"
          className="fill-none stroke-text-tertiary"
          strokeWidth="2"
        />
        <circle
          cx="186"
          cy="275"
          r="19"
          className="fill-none stroke-text-tertiary"
          strokeWidth="2"
        />

        {/* 3 Ljusvred på panelen, vänster om ratten */}
        <circle
          cx="60"
          cy="288"
          r="22"
          className="fill-surface-base stroke-text-primary"
          strokeWidth="2.5"
        />
        <path d="M 58 280 A 8 8 0 0 1 58 296 Z" className="fill-text-primary" />
        <g className="stroke-text-primary" strokeWidth="2" strokeLinecap="round">
          <line x1="53" y1="283" x2="46" y2="283" />
          <line x1="53" y1="288" x2="46" y2="288" />
          <line x1="53" y1="293" x2="46" y2="293" />
        </g>

        {/* Spakarna: en på var sin sida om ratten, ritade under kransen */}
        <rect
          x="44"
          y="364"
          width="66"
          height="13"
          rx="6.5"
          className="fill-surface-base stroke-text-primary"
          strokeWidth="2"
        />
        <rect
          x="206"
          y="364"
          width="66"
          height="13"
          rx="6.5"
          className="fill-surface-base stroke-text-primary"
          strokeWidth="2"
        />

        {/* Generiska märken: blinkerspilar vid vänster spak, torkarblad vid höger */}
        <g className="fill-text-tertiary">
          <polygon points="30,340 42,330 42,350" />
          <polygon points="50,330 62,340 50,350" />
        </g>
        <g className="stroke-text-tertiary" strokeLinecap="round">
          <line x1="232" y1="414" x2="248" y2="394" strokeWidth="3" />
          <path
            d="M 224 408 Q 244 384 262 402"
            className="fill-none"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        </g>

        {/* Ratten */}
        <circle
          cx="158"
          cy="380"
          r="62"
          className="fill-none stroke-text-primary"
          strokeWidth="9"
        />
        <g className="stroke-text-primary" strokeWidth="8" strokeLinecap="round">
          <line x1="136" y1="380" x2="100" y2="380" />
          <line x1="180" y1="380" x2="216" y2="380" />
          <line x1="158" y1="402" x2="158" y2="438" />
        </g>
        {/* 5 Signalhorn i navet */}
        <circle
          cx="158"
          cy="380"
          r="22"
          className="fill-surface-base stroke-text-primary"
          strokeWidth="2.5"
        />
        <path d="M 149 374 L 157 368 L 157 392 L 149 386 Z" className="fill-text-primary" />
        <g className="fill-none stroke-text-primary" strokeWidth="2" strokeLinecap="round">
          <path d="M 162 372 Q 168 380 162 388" />
          <path d="M 168 368 Q 176 380 168 392" />
        </g>

        {/* Handen känner efter vänster spak — spaken förblir synlig ovanför */}
        <Hand x={52} y={386} />

        {/* Mittkonsol till förarens höger */}
        <rect
          x="286"
          y="246"
          width="118"
          height="140"
          rx="10"
          className="fill-surface-base stroke-text-primary"
          strokeWidth="2"
        />
        {/* 4 Varningsblinkers */}
        <rect
          x="292"
          y="258"
          width="44"
          height="40"
          rx="6"
          className="fill-none stroke-text-primary"
          strokeWidth="2"
        />
        <polygon
          points="314,264 328,290 300,290"
          className="fill-none stroke-safety-600"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <polygon
          points="314,274 322,288 306,288"
          className="fill-none stroke-safety-600"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* 6 Defroster */}
        <rect
          x="356"
          y="258"
          width="44"
          height="40"
          rx="6"
          className="fill-none stroke-text-primary"
          strokeWidth="2"
        />
        <path
          d="M 366 292 C 366 272, 372 264, 378 264 C 384 264, 390 272, 390 292 Z"
          className="fill-none stroke-text-primary"
          strokeWidth="2"
        />
        <g className="fill-none stroke-text-primary" strokeWidth="2" strokeLinecap="round">
          <path d="M 371 288 q 3 -4 0 -8 q -3 -4 0 -6" />
          <path d="M 378 288 q 3 -4 0 -8 q -3 -4 0 -6" />
          <path d="M 385 288 q 3 -4 0 -8 q -3 -4 0 -6" />
        </g>
        {/* Övriga reglage på konsolen, utan anspråk */}
        <g className="fill-none stroke-text-tertiary" strokeWidth="2">
          <rect x="300" y="326" width="90" height="9" rx="4.5" />
          <rect x="300" y="344" width="90" height="9" rx="4.5" />
          <rect x="300" y="362" width="90" height="9" rx="4.5" />
        </g>

        {/* Sifferbrickor */}
        <Bricka cx={30} cy={370} n={1} />
        <Bricka cx={240} cy={342} n={2} />
        <Bricka cx={60} cy={250} n={3} />
        <Bricka cx={314} cy={232} n={4} />
        <Bricka cx={130} cy={352} n={5} />
        <Bricka cx={378} cy={232} n={6} />
        <line
          x1="137"
          y1="359"
          x2="143"
          y2="365"
          className="stroke-text-tertiary"
          strokeWidth="1.5"
        />
        <circle cx="143" cy="365" r="3" className="fill-text-tertiary" />

        {/* Handens etikett, under ratten */}
        <line
          x1="72"
          y1="430"
          x2="72"
          y2="417"
          className="stroke-text-tertiary"
          strokeWidth="1.5"
        />
        <text x="20" y="448" className="fill-text-primary text-[14px] font-semibold">
          Handen känner
        </text>
        <text x="20" y="466" className="fill-text-primary text-[14px] font-semibold">
          efter spaken
        </text>
      </g>

      {/* Teckenförklaring */}
      <g>
        <line
          x1="24"
          y1="556"
          x2="56"
          y2="556"
          className="stroke-progress-600"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="0.5 7"
          markerEnd="url(#gr-arrow-look)"
        />
        <text x="66" y="561" className="fill-text-secondary text-[14px]">
          Blicken
        </text>
        <rect
          x="150"
          y="548"
          width="28"
          height="16"
          rx="6"
          fill="url(#gr-dots)"
          className="stroke-attention-600"
          strokeWidth="2"
        />
        <text x="186" y="561" className="fill-text-secondary text-[14px]">
          Din hand
        </text>
        <circle cx="292" cy="556" r="8" className="fill-none stroke-progress-600" strokeWidth="3" />
        <circle cx="292" cy="556" r="2.6" className="fill-progress-600" />
        <text x="306" y="561" className="fill-text-secondary text-[14px]">
          Blickpunkt
        </text>
      </g>

      {/* Reglageförteckning */}
      <Nyckelrad x={22} y={596} n={1} text="Blinkers — vänster spak" />
      <Nyckelrad x={22} y={626} n={2} text="Torkare — höger spak" />
      <Nyckelrad x={22} y={656} n={3} text="Ljus — vred på panelen" />
      <Nyckelrad x={230} y={596} n={4} text="Varningsblinkers" />
      <Nyckelrad x={230} y={626} n={5} text="Signalhorn — i navet" />
      <Nyckelrad x={230} y={656} n={6} text="Defroster — panelknapp" />

      <text x="220" y="688" textAnchor="middle" className="fill-text-tertiary text-[14px]">
        Reglagens placering skiljer mellan bilar. Känn efter i
      </text>
      <text x="220" y="706" textAnchor="middle" className="fill-text-tertiary text-[14px]">
        just din bil medan den står still.
      </text>

      <text
        x="220"
        y="738"
        textAnchor="middle"
        className="fill-text-primary text-[15px] font-semibold"
      >
        Leta reglaget med handen, inte med blicken.
      </text>
      <text x="220" y="760" textAnchor="middle" className="fill-text-secondary text-[14px]">
        Blinkers och torkare sitter på var sin sida om ratten
      </text>
      <text x="220" y="778" textAnchor="middle" className="fill-text-secondary text-[14px]">
        och förväxlas lätt. Har handen lärt sig var de sitter
      </text>
      <text x="220" y="796" textAnchor="middle" className="fill-text-secondary text-[14px]">
        kan blicken stanna kvar på vägen framför bilen.
      </text>

      {/* Förklaringsruta: samma kupé, samma hand — bara blicken skiljer */}
      <rect
        x="20"
        y="812"
        width="400"
        height="240"
        rx="6"
        className="fill-none stroke-border-default"
        strokeWidth="1.5"
      />
      <text x="34" y="836" className="fill-text-primary text-[14px] font-semibold">
        Vad blicken gör medan handen söker:
      </text>
      <line
        x1="220"
        y1="848"
        x2="220"
        y2="1040"
        className="stroke-border-default"
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />

      {/* Rätt */}
      <path
        d="M 40 858 L 46 865 L 58 850"
        className="fill-none stroke-progress-600"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="66" y="864" className="fill-text-primary text-[14px] font-semibold">
        Rätt
      </text>
      <MiniKupe x={26} y={874} variant="ratt" />
      <text
        x="111"
        y="1014"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-semibold"
      >
        Blicken går ut mot vägen
      </text>
      <text x="111" y="1032" textAnchor="middle" className="fill-text-secondary text-[14px]">
        Handen söker på känn
      </text>

      {/* Fel */}
      <g className="stroke-safety-600" strokeWidth="4" strokeLinecap="round">
        <line x1="240" y1="851" x2="254" y2="865" />
        <line x1="254" y1="851" x2="240" y2="865" />
      </g>
      <text x="262" y="864" className="fill-text-primary text-[14px] font-semibold">
        Fel
      </text>
      <MiniKupe x={226} y={874} variant="fel" />
      <text
        x="311"
        y="1014"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-semibold"
      >
        Blicken följer handen ned
      </text>
      <text x="311" y="1032" textAnchor="middle" className="fill-text-secondary text-[14px]">
        Vägen framför är obevakad
      </text>
    </svg>
  );
}
