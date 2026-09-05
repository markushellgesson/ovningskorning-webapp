/**
 * Döda vinkeln — bilen sedd uppifrån (VEH-02).
 *
 * Vad bilden lär ut: var döda vinkeln ligger, och varför den finns kvar
 * även när speglarna är rätt inställda. Döda vinkeln är definierad som det
 * område som varken direktsikten eller någon spegel når — den är alltså
 * uträknad ur de andra två zonerna, inte ritad på känsla.
 *
 * ---- Geometri (scenkoordinater, bilen centrerad i origo, fronten uppåt) ----
 * Bilen kör uppåt i bilden (minskande y). Föraren sitter till vänster, alltså
 * mot bildens låga x. Karossen: x −28…28, y −70…70. Ritfönster: x −170…180,
 * y −135…205 (clipPath dv-window).
 *
 * Förarens öga E = (−13, −18).
 *
 * 1. DIREKTSIKT (utan att vrida huvudet) begränsas bakåt av B-stolparna
 *    (±28, 2). Strålen E→(−28, 2) lämnar fönstret i (−170, 191.3);
 *    strålen E→(28, 2) lämnar det i (180, 76.1). Den blockerade bakre
 *    sektorn spänner riktningarna 26.0°…126.9° räknat från +x med y nedåt.
 *
 * 2. SPEGLARNAS SYNFÄLT är räknade som plana speglar: apex ligger i ögats
 *    spegelbild i glasets plan, och kilen begränsas av glasets två kanter.
 *    Spegelvinklarna är lösta så att inställningen i momentets övningssteg
 *    uppfylls — "en liten del av bilen ska synas":
 *      vänster ytterspegel  glas (−30.3, −46.0)…(−43.7, −42.0), apex (−30.9, −78.9)
 *      höger ytterspegel    glas (30.9, −47.4)…(43.1, −40.6),   apex (32.2, −100.1)
 *    Den inre randstrålen går i båda fallen genom bilens bakre hörn (∓28, 70).
 *    Innerspegeln: apex (−13, −82), aperturen är bakrutans kanter (±20, 58) —
 *    övningsstegets "hela bakrutan ska synas".
 *
 * 3. DÖDA VINKELN = mellan direktsiktens gränsstråle och ytterspegelns yttre
 *    randstråle. Skärningspunkterna är räknade, inte gissade:
 *      vänster: apex (−85.7, 78.9)  — börjar först bakom bakaxeln
 *      höger:   apex (53.3, 14.3)   — börjar redan bredvid föraren
 *    Vid y = 205 är vänstra fältet 40.6 breda enheter (x −170…−129.4) och det
 *    högra minst 91.6 (x 88.4…180, avskuret av bildkanten). Det högra är
 *    större därför att föraren sitter längre från den sidan — det följer av
 *    geometrin, det är inte påhittat för poängens skull.
 *
 * 4. CYKLISTEN i (120, 150) är kontrollerad mot alla fyra zonerna:
 *      riktning från ögat = 51.6° → inne i den blockerade bakre sektorn
 *      utanför vänster ytterspegels kil, utanför höger ytterspegels kil,
 *      utanför innerspegelns kil → syns ingenstans.
 *    Huvudvridning över höger axel genom bakre sidorutan (B-stolpe (28, 2)
 *    till C-stolpe (28, 48)) täcker riktningarna 26.0°…58.2° och alltså
 *    cyklisten. Det är det som förklaringsrutan visar.
 *
 * Scenen ritas med translate(257.8 257.9) scale(0.74), så att marginalerna
 * (0…132 till vänster, 391…540 till höger) rymmer etiketterna. Ingen etikett
 * ligger inne i scenen.
 *
 * Mönster: prickar = din bil, tunna vågräta linjer = direktsikt, diagonala
 * ränder = spegelsynfält, rutmönster = döda vinkeln, öppen ring = cyklist.
 * Inget mönster betyder två saker. Färgen bär ingen betydelse ensam — varje
 * zon har både mönster, kontur och etikett.
 */

function Badge({ cx, cy, n }: { cx: number; cy: number; n: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="11" className="fill-text-primary" />
      <text x={cx} y={cy + 5} textAnchor="middle" className="fill-surface-base text-[13px] font-semibold">
        {n}
      </text>
    </g>
  );
}

function Pointer({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-text-tertiary" strokeWidth="1.5" />
      <circle cx={x2} cy={y2} r="3" className="fill-text-tertiary" />
    </g>
  );
}

/** Cyklist: öppen ring med färdriktningspil. Ringen är cyklistens enda kod i bilden. */
function Cyclist({ x, y, r = 11 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} className="fill-surface-base stroke-safety-600" strokeWidth="3" />
      <line
        x1={x}
        y1={y - r - 2}
        x2={x}
        y2={y - r - 16}
        className="stroke-safety-600"
        strokeWidth="3"
        markerEnd="url(#dv-arrow-cyclist)"
      />
    </g>
  );
}

export function DodaVinkelnDiagram() {
  return (
    <svg
      viewBox="0 0 540 872"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="dv-title dv-desc"
    >
      <title id="dv-title">Döda vinkeln sedd uppifrån</title>
      <desc id="dv-desc">
        Din bil sedd uppifrån, fylld med prickmönster. Den kör uppåt i bilden och föraren sitter
        till vänster, markerad med en liten fylld punkt. Runt bilen ligger tre slags områden.
        Framåt och åt sidorna, markering ett, ligger ett stort fält med tunna vågräta linjer: det
        du ser direkt genom rutorna utan att vrida huvudet. Det slutar bakåt vid en rak gräns från
        förarens öga förbi B-stolparna. Bakom bilen ligger tre smala kilar med diagonala ränder,
        markering två: speglarnas synfält. Innerspegelns kil går rakt bakåt och är begränsad av
        bakrutans kanter. Ytterspeglarnas kilar börjar vid varsin spegel och pekar snett bakåt och
        utåt; deras inre kant snuddar vid bilens bakre hörn, precis som när spegeln är inställd så
        att en liten del av bilen syns. Mellan direktsikten och ytterspeglarnas kilar ligger två
        rutmönstrade fält, markering tre: döda vinkeln. Där syns ingenting, varken direkt eller i
        någon spegel. Det vänstra fältet är smalt och börjar först bakom bilen. Det högra är
        mycket större och börjar redan i höjd med föraren, eftersom föraren sitter längre från den
        sidan. I det högra fältet ligger en cyklist, ritad som en öppen ring med en pil framåt,
        markering fyra. En ruta längst ned visar samma bil två gånger i mindre skala. I den
        vänstra panelen är bara spegelkilarna ritade och cyklisten ligger utanför dem, markerat
        med ett kryss. I den högra panelen är blicken vriden över höger axel genom bakre
        sidorutan; den kilen täcker cyklisten, markerat med en bock. Under bilden står att
        speglarna inte når hela vägen och att döda vinkeln kontrolleras med en blick över axeln.
      </desc>

      <defs>
        <clipPath id="dv-window">
          <rect x="-170" y="-135" width="350" height="340" />
        </clipPath>
        {/* Din bil: prickar */}
        <pattern id="dv-car" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        {/* Direkt sikt: tunna vågräta linjer */}
        <pattern id="dv-direct" patternUnits="userSpaceOnUse" width="10" height="10">
          <line x1="0" y1="5" x2="10" y2="5" className="stroke-primary-400" strokeWidth="1" />
        </pattern>
        {/* Speglarnas synfält: diagonala ränder */}
        <pattern id="dv-mirror" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="1.6" />
        </pattern>
        {/* Döda vinkeln: rutmönster */}
        <pattern id="dv-dead" patternUnits="userSpaceOnUse" width="12" height="12">
          <rect width="12" height="12" className="fill-safety-200" />
          <path d="M 0 0 L 12 12 M 12 0 L 0 12" className="stroke-safety-600" strokeWidth="1.2" />
        </pattern>
        <marker id="dv-arrow-cyclist" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-safety-600" />
        </marker>
        <marker id="dv-arrow-car" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-attention-600" />
        </marker>
        {/* Bilen, fronten uppåt, centrerad i origo. Öga (−13, −18), speglar vid y ≈ −44. */}
        <g id="dv-body">
          <g className="fill-text-primary">
            <rect x="-33" y="-52" width="9" height="22" rx="2" />
            <rect x="24" y="-52" width="9" height="22" rx="2" />
            <rect x="-33" y="30" width="9" height="22" rx="2" />
            <rect x="24" y="30" width="9" height="22" rx="2" />
          </g>
          <rect
            x="-28"
            y="-70"
            width="56"
            height="140"
            rx="9"
            fill="url(#dv-car)"
            className="stroke-attention-600"
            strokeWidth="2"
          />
          <rect
            x="-20"
            y="-46"
            width="40"
            height="16"
            rx="3"
            className="fill-diagram-marking stroke-attention-600"
            strokeWidth="1"
          />
          <rect
            x="-20"
            y="46"
            width="40"
            height="12"
            rx="3"
            className="fill-diagram-marking stroke-attention-600"
            strokeWidth="1"
          />
          {/* Ytterspeglarnas glas, i de lägen geometrin är räknad ur */}
          <path d="M -30.3 -46 L -43.7 -42" className="stroke-attention-600" strokeWidth="4" strokeLinecap="round" />
          <path d="M 30.9 -47.4 L 43.1 -40.6" className="stroke-attention-600" strokeWidth="4" strokeLinecap="round" />
          {/* Förarens öga */}
          <circle cx="-13" cy="-18" r="5" className="fill-attention-600" />
        </g>
      </defs>

      {/* Rubrik */}
      <text x="20" y="30" className="fill-text-primary text-[16px] font-semibold">
        Döda vinkeln — och varför speglarna inte räcker
      </text>
      <text x="20" y="50" className="fill-text-secondary text-[13px]">
        Bilen sedd uppifrån. Du kör uppåt och sitter till vänster.
      </text>

      {/* Teckenförklaring */}
      <g>
        <rect x="20" y="66" width="24" height="14" fill="url(#dv-direct)" className="stroke-primary-400" strokeWidth="1" />
        <text x="52" y="78" className="fill-text-secondary text-[13px]">
          Ser du direkt genom rutorna
        </text>
        <rect x="20" y="88" width="24" height="14" fill="url(#dv-mirror)" className="stroke-primary-600" strokeWidth="1" />
        <text x="52" y="100" className="fill-text-secondary text-[13px]">
          Ser du i speglarna
        </text>
        <rect x="20" y="110" width="24" height="14" fill="url(#dv-dead)" className="stroke-safety-600" strokeWidth="1" />
        <text x="52" y="122" className="fill-text-secondary text-[13px]">
          Döda vinkeln — syns varken direkt eller i spegel
        </text>
      </g>

      {/* ---- Scenen ---- */}
      <g transform="translate(257.8 257.9) scale(0.74)" clipPath="url(#dv-window)">
        {/* 1. Direkt sikt: fönstret minus den bakre sektorn från ögat */}
        <polygon
          points="-170,-135 180,-135 180,76.1 -13,-18 -170,191.3"
          fill="url(#dv-direct)"
          className="stroke-primary-400"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />

        {/* 2. Speglarnas synfält: innerspegel och två ytterspeglar */}
        <g fill="url(#dv-mirror)" className="stroke-primary-600" strokeWidth="1" vectorEffect="non-scaling-stroke">
          <polygon points="-20,58 -27.3,205 54.6,205 20,58" />
          <polygon points="-30.3,-46 -25.3,205 -129.4,205 -43.7,-42" />
          <polygon points="30.9,-47.4 24.7,205 88.4,205 43.1,-40.6" />
        </g>

        {/* 3. Döda vinkeln, vänster och höger */}
        <g fill="url(#dv-dead)" className="stroke-safety-600" strokeWidth="1.5" vectorEffect="non-scaling-stroke">
          <polygon points="-85.7,78.9 -170,191.3 -170,205 -129.4,205" />
          <polygon points="53.3,14.3 180,76.1 180,205 88.4,205" />
        </g>

        {/* Bilen ovanpå zonerna, så att karossen skymmer det den skulle skymma */}
        <use href="#dv-body" />
        <path d="M 0 -84 L 0 -110" className="stroke-attention-600" strokeWidth="3" fill="none" markerEnd="url(#dv-arrow-car)" />

        {/* 4. Cyklist i högra döda vinkeln */}
        <Cyclist x={120} y={150} r={13} />
      </g>

      {/* ---- Numrerade hänvisningar, alla i marginalerna ---- */}
      <Badge cx={26} cy={186} n="1" />
      <text x="42" y="190" className="fill-text-primary text-[13px] font-semibold">
        Direkt sikt
      </text>
      <text x="14" y="208" className="fill-text-secondary text-[13px]">
        genom rutorna,
      </text>
      <text x="14" y="224" className="fill-text-secondary text-[13px]">
        utan att vrida
      </text>
      <text x="14" y="240" className="fill-text-secondary text-[13px]">
        på huvudet
      </text>
      <Pointer x1={100} y1={196} x2={161} y2={206} />

      <Badge cx={26} cy={318} n="2" />
      <text x="42" y="322" className="fill-text-primary text-[13px] font-semibold">
        Speglarna
      </text>
      <text x="14" y="340" className="fill-text-secondary text-[13px]">
        tre smala kilar
      </text>
      <text x="14" y="356" className="fill-text-secondary text-[13px]">
        rakt bakåt
      </text>
      <Pointer x1={100} y1={328} x2={200} y2={346} />

      {/* Vänstra fältet är mindre — samma geometri, kortare avstånd till spegeln */}
      <text x="14" y="398" className="fill-text-primary text-[13px] font-semibold">
        Smalare fält
      </text>
      <text x="14" y="414" className="fill-text-primary text-[13px] font-semibold">
        till vänster
      </text>
      <text x="14" y="432" className="fill-text-secondary text-[13px]">
        du sitter närmare
      </text>
      <text x="14" y="448" className="fill-text-secondary text-[13px]">
        den sidan
      </text>
      <Pointer x1={100} y1={396} x2={148} y2={388} />

      <Badge cx={408} cy={286} n="3" />
      <text x="424" y="290" className="fill-text-primary text-[13px] font-semibold">
        Döda vinkeln
      </text>
      <text x="396" y="308" className="fill-text-secondary text-[13px]">
        varken direkt
      </text>
      <text x="396" y="324" className="fill-text-secondary text-[13px]">
        eller i spegel
      </text>
      <text x="396" y="340" className="fill-text-secondary text-[13px]">
        Störst till höger
      </text>
      <Pointer x1={392} y1={296} x2={366} y2={306} />

      <Badge cx={408} cy={392} n="4" />
      <text x="424" y="396" className="fill-text-primary text-[13px] font-semibold">
        Cyklist
      </text>
      <text x="396" y="414" className="fill-text-secondary text-[13px]">
        du ser hen inte
      </text>
      <text x="396" y="430" className="fill-text-secondary text-[13px]">
        någonstans
      </text>
      <Pointer x1={392} y1={392} x2={356} y2={374} />

      {/* Mönsterförklaring */}
      <g>
        <rect x="132" y="452" width="24" height="14" rx="2" fill="url(#dv-car)" className="stroke-attention-600" strokeWidth="1.5" />
        <text x="164" y="464" className="fill-text-tertiary text-[13px]">
          Du (prickar)
        </text>
        <circle cx="272" cy="459" r="7" className="fill-surface-base stroke-safety-600" strokeWidth="2.5" />
        <text x="286" y="464" className="fill-text-tertiary text-[13px]">
          Cyklist (ring)
        </text>
      </g>

      {/* Slutsats */}
      <text x="270" y="502" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        Rätt inställda speglar gör kilarna så breda de kan bli.
      </text>
      <text x="270" y="522" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        De möter ändå inte direktsikten.
      </text>

      {/* ---- Förklaringsruta ---- */}
      <rect x="20" y="546" width="500" height="266" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="34" y="570" className="fill-text-primary text-[13px] font-semibold">
        Cyklisten ligger i högra döda vinkeln:
      </text>
      <line x1="270" y1="586" x2="270" y2="800" className="stroke-border-default" strokeWidth="1.5" strokeDasharray="6 4" />

      {/* Panel A: bara speglarna */}
      <g transform="translate(150 646) scale(0.36)">
        <g fill="url(#dv-mirror)" className="stroke-primary-600" strokeWidth="1" vectorEffect="non-scaling-stroke">
          <polygon points="-20,58 -26.6,190 51.1,190 20,58" />
          <polygon points="-30.3,-46 -25.7,190 -124.2,190 -43.7,-42" />
          <polygon points="30.9,-47.4 25.1,190 85.7,190 43.1,-40.6" />
        </g>
        <use href="#dv-body" />
        <Cyclist x={120} y={150} r={14} />
      </g>
      <text x="150" y="736" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Bara speglarna
      </text>
      <text x="150" y="754" textAnchor="middle" className="fill-text-secondary text-[13px]">
        cyklisten ligger utanför kilen
      </text>
      <path d="M 143 772 L 157 786 M 157 772 L 143 786" className="stroke-safety-600" strokeWidth="3" strokeLinecap="round" />

      {/* Panel B: blick över höger axel genom bakre sidorutan */}
      <g transform="translate(390 646) scale(0.36)">
        <polygon
          points="-13,-18 175,73.7 175,190 116.2,190"
          fill="url(#dv-direct)"
          className="stroke-primary-400"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <use href="#dv-body" />
        {/* Huvudvridning: båge vid förarens öga, bakåt åt höger */}
        <path
          d="M 4 -34 A 22 22 0 0 1 12 -6"
          className="fill-none stroke-attention-600"
          strokeWidth="5"
          markerEnd="url(#dv-arrow-car)"
        />
        <Cyclist x={120} y={150} r={14} />
      </g>
      <text x="390" y="736" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Blick över axeln
      </text>
      <text x="390" y="754" textAnchor="middle" className="fill-text-secondary text-[13px]">
        bakre sidorutan täcker fältet
      </text>
      <path
        d="M 383 780 l 6 6 l 12 -13"
        className="fill-none stroke-progress-600"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <text x="270" y="846" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Testa: låt någon gå runt bilen och säg till när hen försvinner.
      </text>
    </svg>
  );
}
