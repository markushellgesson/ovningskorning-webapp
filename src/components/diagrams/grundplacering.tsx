/**
 * Grundplacering förbi parkerade bilar (POS-01) — sidoavståndet mäts till en
 * dörr som kan öppnas, inte till plåten, och marginalen läggs ut i god tid
 * före raden. Bilden visar teknik, inte någon regel: den säger ingenting om
 * väjningsplikt eller om vad föraren av den parkerade bilen är skyldig att
 * göra.
 *
 * Skala 10 px = 1 m. Kaross 18 × 44 px (1,8 × 4,4 m).
 *
 * ---- Geometri (vy uppifrån, högertrafik) ----
 * Gatan går lodrätt. Din bil — det enda fordon som rör sig i bilden — kör
 * UPPÅT, alltså mot minskande y. Kör man uppåt ligger den egna högra sidan mot
 * bildens högra kant. Alltså är det HÖGRA körfältet ditt, och det är det som
 * har höga x. Kontrollerat mot mittlinjen fordon för fordon:
 *
 *   Körbana x 200…292. Mittlinje x 235, mitt i körbanan: mötande körfält
 *   x 200…235 (3,5 m), ditt körfält x 235…270 (3,5 m). Kantsten x 292,
 *   trottoar 292…312. Parkeringsremsan x 270…292 (2,2 m).
 *
 *   DIN BIL kör uppåt, mitt x 248, kaross x 239…257.
 *     239 > 235 och 257 < 270 → hela karossen ligger i det högra körfältet,
 *     0,40 m från mittlinjen. Det mötande körfältet lämnas tomt; mötet är en
 *     annan situation och ritas inte.
 *
 *   PARKERADE BILAR står stilla vid högerkanten, mitt x 281,
 *     kaross x 272…290, alltså helt i parkeringsremsan 270…292.
 *     Fem stycken, c/c 56 px i y (200, 256, 312, 368, 424) — 1,2 m lucka
 *     mellan karosserna, alltså en tät rad.
 *
 * ---- Dörrzonen och sidoavståndet ----
 * En framdörr som öppnas når ungefär en meter ut från karossen. Zonen ritas
 * därför som x 262…272 (10 px = 1,0 m), y 174…450, alltså längs hela raden.
 *   Din högra sida ligger på x 257 → 5 px = 0,50 m utanför zonens kant, och
 *   15 px = 1,50 m från den parkerade plåten. Det är hela poängen: avståndet
 *   är mätt till dörren, inte till bilen.
 *   Körfältets mitt ligger på x 252,5. Ditt läge x 248 ligger alltså 4,5 px =
 *   0,45 m vänster om körfältsmitten. Förflyttningen är liten och ritas som
 *   den är i stället för att överdrivas.
 *
 * ---- I god tid ----
 * Du kör uppåt, så du möter den sydligaste parkerade bilen först; dess bakkant
 * ligger på y 446. Din väg är färdigt utlagd på x 248 redan vid y 740, alltså
 * 294 px = 29 m innan; den sträckan är utsatt med en mätklammer på x 182,
 * y 446…740. Bilen själv står med nosen på y 668, 22 m före raden, och
 * ligger redan ute.
 *
 * ---- Förklaringsrutan, efterräknad ----
 * Två miniscener i skala 1:1 med huvudbildens egna koordinater, så att inget
 * trycks ihop. Samma väg, samma riktningar, samma parkerade bil i båda.
 * Dörrbladets spets ligger på x 262 = dörrzonens kant.
 *   Panel A, rätt: din kaross x 239…257 → dörren når inte fram, 0,50 m kvar.
 *   Panel B, fel:  din kaross x 249…267 → dörren når 0,50 m in i karossen.
 *   I panel B ligger bilen fortfarande helt i det högra körfältet (249 > 235,
 *   267 < 270) — felet är marginalen, inte körfältet.
 * Panelernas ritytor: A x 72…184, B x 292…404, skiljelinje x 240, rutan
 * x 20…460. Ingen panel skär skiljelinjen eller ramen.
 *
 * ---- Mönster och roller ----
 * Prickar = din bil. Diagonala ränder = parkerade bilar. Rutmönster med
 * konturlinje = dörrzonen. Streckad linje med pilspets = din väg. Prickad
 * linje = din bils högra sida. Bock och kryss bär rätt och fel parallellt med
 * färgen, så att ingen betydelse hänger på kulören ensam. Inget mönster
 * betyder två saker.
 */

/** Bil ritad med fronten uppåt. Kaross 18 × 44. */
function Bil({
  cx,
  cy,
  fill,
  stroke,
}: {
  cx: number;
  cy: number;
  fill: string;
  stroke: string;
}) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <g className="fill-text-primary">
        <rect x="-11.5" y="-16" width="3.5" height="8" rx="1" />
        <rect x="8" y="-16" width="3.5" height="8" rx="1" />
        <rect x="-11.5" y="8" width="3.5" height="8" rx="1" />
        <rect x="8" y="8" width="3.5" height="8" rx="1" />
      </g>
      <rect x="-9" y="-22" width="18" height="44" rx="3" className="fill-surface-base" />
      <rect
        x="-9"
        y="-22"
        width="18"
        height="44"
        rx="3"
        fill={fill}
        className={stroke}
        strokeWidth="2"
      />
      <rect x="-6.5" y="-11" width="13" height="6" rx="1.5" className="fill-surface-base" />
      <rect x="-6" y="11" width="12" height="5" rx="1.5" className="fill-surface-base" />
      <polygon points="-6,-14 0,-20 6,-14" className={stroke} fill="none" strokeWidth="1.6" />
    </g>
  );
}

/** Numrerad hänvisning: mörk cirkel med siffra. */
function Callout({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="11" className="fill-text-primary" />
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        className="fill-surface-base text-[14px] font-semibold"
      >
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

function Check({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M ${x - 9} ${y} l 6 6 l 12 -13`}
      className="fill-none stroke-progress-600"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

function Cross({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M ${x - 7} ${y - 7} L ${x + 7} ${y + 7} M ${x + 7} ${y - 7} L ${x - 7} ${y + 7}`}
      className="stroke-safety-600"
      strokeWidth="3"
      strokeLinecap="round"
    />
  );
}

/**
 * Miniscen i skala 1:1 med huvudbildens koordinater. Samma gata, samma
 * riktningar. Dörren på den parkerade bilen är öppnad: gångjärn (272, 32),
 * spets (262, 44) — spetsen ligger på dörrzonens kant.
 * variant 'ute'  → din kaross x 239…257, dörren når inte fram.
 * variant 'inne' → din kaross x 249…267, dörren når in i karossen.
 */
function MiniPassage({ x, y, variant }: { x: number; y: number; variant: 'ute' | 'inne' }) {
  const ute = variant === 'ute';
  const dinMitt = ute ? 248 : 258;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="200" y="0" width="92" height="130" className="fill-diagram-road" />
      <rect x="292" y="0" width="20" height="130" className="fill-diagram-edge" opacity="0.3" />
      <g className="stroke-diagram-edge" strokeWidth="2">
        <line x1="200" y1="0" x2="200" y2="130" />
        <line x1="292" y1="0" x2="292" y2="130" />
      </g>
      <line
        x1="235"
        y1="0"
        x2="235"
        y2="130"
        className="stroke-diagram-marking"
        strokeWidth="2"
        strokeDasharray="12 10"
      />

      {/* Dörrzonen, samma rutmönster som i huvudbilden */}
      <rect
        x="262"
        y="18"
        width="10"
        height="64"
        fill="url(#gp-zon)"
        className="stroke-safety-600"
        strokeWidth="1.2"
      />

      <Bil cx={281} cy={50} fill="url(#gp-strip)" stroke="stroke-primary-600" />
      <Bil cx={dinMitt} cy={60} fill="url(#gp-dots)" stroke="stroke-attention-600" />

      {/* Öppnad dörr: gångjärn i karossens framkant, spetsen ut i körbanan */}
      <line
        x1="272"
        y1="32"
        x2="262"
        y2="44"
        className="stroke-text-primary"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="272" cy="32" r="2" className="fill-text-primary" />

      {!ute && (
        <g className="stroke-safety-600" strokeWidth="2" strokeLinecap="round">
          <line x1="264" y1="46" x2="258" y2="52" />
          <line x1="264" y1="46" x2="257" y2="44" />
          <line x1="264" y1="46" x2="262" y2="53" />
        </g>
      )}
    </g>
  );
}

export function GrundplaceringDiagram() {
  return (
    <svg
      viewBox="0 0 480 1190"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="gp-title gp-desc"
    >
      <title id="gp-title">
        Grundplacering förbi parkerade bilar: sidoavstånd till en dörr, utlagt i god tid
      </title>
      <desc id="gp-desc">
        Vy uppifrån av en lodrät gata i tätort med streckad mittlinje, kantsten och trottoar till
        höger. Din bil, fylld med prickmönster, kör uppåt i det högra körfältet; det mötande
        körfältet till vänster är tomt. Längs högerkanten står fem parkerade bilar tätt efter
        varandra, fyllda med diagonala ränder. Utanför de parkerade bilarna ligger ett smalt
        rutmönstrat band med konturlinje längs hela raden: så långt når en dörr som öppnas. En
        streckad linje med pilspets visar din väg. Den svänger ut redan långt innan den första
        parkerade bilen och går sedan rakt fram, och en prickad linje bredvid den visar var din
        bils högra sida hamnar — utanför det rutmönstrade bandet, med en tydlig men lugn marginal.
        Fyra numrerade hänvisningar i marginalerna: 1 pekar på det rutmönstrade bandet och
        förklarar att det är dörrens räckvidd, 2 pekar på en fot som sticker fram under en av de
        parkerade bilarna, 3 pekar på en mätklammer i vänstermarginalen som spänner över hela
        sträckan mellan den punkt där du är färdigt utlagd och den första parkerade bilen — där
        läggs marginalen, inte bil för bil — och 4 pekar på ett huvud som syns i en sidoruta. Ingen person syns hel; det är just det som är
        faran. Längst ned en ruta med två miniscener av samma gata i samma skala. Till vänster
        ligger din bil ute med marginal, den öppnade dörren når inte fram, och en grön bock står
        under. Till höger håller din bil samma smala avstånd som till en tom vägkant, den öppnade
        dörren når in i karossen, träffpunkten är markerad, och ett rött kryss står under.
      </desc>

      <defs>
        <pattern id="gp-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="gp-strip" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="2" />
        </pattern>
        <pattern id="gp-zon" patternUnits="userSpaceOnUse" width="10" height="10">
          <rect width="10" height="10" className="fill-safety-200" />
          <path d="M 0 0 L 10 10 M 10 0 L 0 10" className="stroke-safety-600" strokeWidth="1.1" />
        </pattern>
        <marker
          id="gp-arrow-you"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="11"
          markerHeight="11"
          markerUnits="userSpaceOnUse"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-attention-600" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Grundplacering förbi parkerade bilar
      </text>
      <text x="20" y="48" className="fill-text-secondary text-[14px]">
        Vy uppifrån. Du kör uppåt i högra körfältet.
      </text>

      {/* Teckenförklaring */}
      <g>
        <path
          d="M 20 74 L 48 74"
          className="stroke-attention-600"
          strokeWidth="3"
          strokeDasharray="8 6"
          markerEnd="url(#gp-arrow-you)"
        />
        <text x="56" y="79" className="fill-text-secondary text-[14px]">
          Din väg
        </text>
        <rect
          x="220"
          y="67"
          width="26"
          height="15"
          fill="url(#gp-zon)"
          className="stroke-safety-600"
          strokeWidth="1.2"
        />
        <text x="254" y="79" className="fill-text-secondary text-[14px]">
          Dörrzon
        </text>

        <line
          x1="20"
          y1="98"
          x2="48"
          y2="98"
          className="stroke-attention-600"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="0.5 4.5"
        />
        <text x="56" y="103" className="fill-text-secondary text-[14px]">
          Bilens högra sida
        </text>
        <rect
          x="220"
          y="91"
          width="26"
          height="15"
          rx="2"
          fill="url(#gp-dots)"
          className="stroke-attention-600"
          strokeWidth="1.5"
        />
        <text x="254" y="103" className="fill-text-secondary text-[14px]">
          Du
        </text>
        <rect
          x="300"
          y="91"
          width="26"
          height="15"
          rx="2"
          fill="url(#gp-strip)"
          className="stroke-primary-600"
          strokeWidth="1.5"
        />
        <text x="334" y="103" className="fill-text-secondary text-[14px]">
          Parkerad bil
        </text>
      </g>

      {/* ================= Scenen ================= */}
      {/* Gata: körbana x 200–292, trottoar 292–312 */}
      <rect x="200" y="118" width="92" height="688" className="fill-diagram-road" />
      <rect x="292" y="118" width="20" height="688" className="fill-diagram-edge" opacity="0.3" />
      <g className="stroke-diagram-edge" strokeWidth="2">
        <line x1="200" y1="118" x2="200" y2="806" />
        <line x1="292" y1="118" x2="292" y2="806" />
      </g>
      {/* Mittlinje x 235 */}
      <line
        x1="235"
        y1="118"
        x2="235"
        y2="806"
        className="stroke-diagram-marking"
        strokeWidth="2"
        strokeDasharray="14 12"
      />

      {/* Dörrzonen: x 262–272 längs hela raden */}
      <rect
        x="262"
        y="174"
        width="10"
        height="276"
        fill="url(#gp-zon)"
        className="stroke-safety-600"
        strokeWidth="1.4"
      />

      {/* Din väg: färdigt utlagd redan vid y 740, långt före raden */}
      <path
        d="M 252.5 800 C 252.5 776 248 766 248 740"
        className="fill-none stroke-attention-600"
        strokeWidth="3"
        strokeDasharray="8 6"
      />
      <path
        d="M 248 664 L 248 190"
        className="fill-none stroke-attention-600"
        strokeWidth="3"
        strokeDasharray="8 6"
        markerEnd="url(#gp-arrow-you)"
      />
      {/* Bilens högra sida på den vägen: x 257 */}
      <line
        x1="257"
        y1="664"
        x2="257"
        y2="190"
        className="stroke-attention-600"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="0.5 4.5"
      />

      {/* Parkerade bilar, mitt x 281 */}
      <Bil cx={281} cy={200} fill="url(#gp-strip)" stroke="stroke-primary-600" />
      <Bil cx={281} cy={256} fill="url(#gp-strip)" stroke="stroke-primary-600" />
      <Bil cx={281} cy={312} fill="url(#gp-strip)" stroke="stroke-primary-600" />
      <Bil cx={281} cy={368} fill="url(#gp-strip)" stroke="stroke-primary-600" />
      <Bil cx={281} cy={424} fill="url(#gp-strip)" stroke="stroke-primary-600" />

      {/* Ett huvud som anas i sidorutan på bilen vid y 256 */}
      <circle cx="277.5" cy="248" r="3.4" className="fill-text-primary" />
      {/* En fot som sticker fram under bilen vid y 368 */}
      <g className="fill-text-primary">
        <ellipse cx="269.5" cy="374" rx="3.2" ry="2.2" />
        <ellipse cx="269.5" cy="381" rx="3.2" ry="2.2" />
      </g>

      {/* Din bil */}
      <Bil cx={248} cy={690} fill="url(#gp-dots)" stroke="stroke-attention-600" />

      {/* 1. Dörrzonen */}
      <Callout x={34} y={180} n={1} />
      <text x="52" y="185" className="fill-text-primary text-[14px] font-semibold">
        Dörrzonen
      </text>
      <text x="14" y="206" className="fill-text-secondary text-[14px]">
        Så långt når en dörr
      </text>
      <text x="14" y="222" className="fill-text-secondary text-[14px]">
        som öppnas. Håll
      </text>
      <text x="14" y="238" className="fill-text-secondary text-[14px]">
        hela raden utanför.
      </text>
      <Pekare x1={168} y1={180} x2={266} y2={194} />

      {/* 2. Foten under bilen */}
      <Callout x={34} y={360} n={2} />
      <text x="52" y="365" className="fill-text-primary text-[14px] font-semibold">
        Fot under bilen
      </text>
      <text x="14" y="386" className="fill-text-secondary text-[14px]">
        Någon står mellan
      </text>
      <text x="14" y="402" className="fill-text-secondary text-[14px]">
        bilarna. Det syns
      </text>
      <text x="14" y="418" className="fill-text-secondary text-[14px]">
        innan dörren öppnas.
      </text>
      <Pekare x1={168} y1={360} x2={267} y2={374} />

      {/* 3. Marginalen läggs ut i god tid.
          Mätklammer y 446-740: från den första parkerade bilens bakkant
          tillbaka till den punkt där sidoförflyttningen är klar. */}
      <g className="stroke-text-tertiary" strokeWidth="1.5">
        <line x1="182" y1="446" x2="182" y2="740" />
        <line x1="176" y1="446" x2="188" y2="446" />
        <line x1="176" y1="740" x2="188" y2="740" />
      </g>
      <text x="14" y="546" className="fill-text-secondary text-[14px]">
        Marginalen är lagd
      </text>
      <text x="14" y="562" className="fill-text-secondary text-[14px]">
        på den här sträckan,
      </text>
      <text x="14" y="578" className="fill-text-secondary text-[14px]">
        före den första bilen,
      </text>
      <text x="14" y="594" className="fill-text-secondary text-[14px]">
        inte bil för bil.
      </text>
      <Callout x={34} y={616} n={3} />
      <text x="52" y="621" className="fill-text-primary text-[14px] font-semibold">
        Ut i god tid
      </text>
      <Pekare x1={168} y1={616} x2={182} y2={628} />

      {/* 4. Huvudet i rutan */}
      <Callout x={338} y={260} n={4} />
      <text x="356" y="265" className="fill-text-primary text-[14px] font-semibold">
        Huvud i rutan
      </text>
      <text x="326" y="286" className="fill-text-secondary text-[14px]">
        Någon sitter kvar
      </text>
      <text x="326" y="302" className="fill-text-secondary text-[14px]">
        i bilen du passerar.
      </text>
      <Pekare x1={326} y1={260} x2={280} y2={251} />

      {/* Din bil, etikett i högermarginalen */}
      <text x="330" y="694" className="fill-text-primary text-[14px] font-semibold">
        Du
      </text>
      <Pekare x1={326} y1={690} x2={258} y2={690} />

      {/* Bildens poäng */}
      <text x="240" y="836" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        Sidoavståndet mäts till dörren som kan öppnas,
      </text>
      <text x="240" y="854" textAnchor="middle" className="fill-text-secondary text-[14px]">
        inte till plåten — och det läggs ut före raden.
      </text>

      {/* ================= Förklaringsruta ================= */}
      <rect
        x="20"
        y="874"
        width="440"
        height="292"
        rx="6"
        className="fill-none stroke-border-default"
        strokeWidth="1.5"
      />
      <text x="34" y="898" className="fill-text-primary text-[14px] font-semibold">
        Om en dörr öppnas när du passerar:
      </text>
      <line
        x1="240"
        y1="912"
        x2="240"
        y2="1156"
        className="stroke-border-default"
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />

      <text x="128" y="930" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Marginal för en dörr
      </text>
      <MiniPassage x={-128} y={940} variant="ute" />
      <text x="128" y="1092" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Dörren når inte fram
      </text>
      <text x="128" y="1110" textAnchor="middle" className="fill-text-secondary text-[14px]">
        till dig. Du behöver inte
      </text>
      <text x="128" y="1126" textAnchor="middle" className="fill-text-secondary text-[14px]">
        väja tvärt.
      </text>
      <Check x={128} y={1148} />

      <text x="348" y="930" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Marginal för en tom kant
      </text>
      <MiniPassage x={92} y={940} variant="inne" />
      <text x="348" y="1092" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Dörren når fram
      </text>
      <text x="348" y="1110" textAnchor="middle" className="fill-text-secondary text-[14px]">
        till dig. Du träffas eller
      </text>
      <text x="348" y="1126" textAnchor="middle" className="fill-text-secondary text-[14px]">
        måste väja tvärt ut.
      </text>
      <Cross x={348} y={1148} />
    </svg>
  );
}
