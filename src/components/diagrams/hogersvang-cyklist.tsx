/**
 * Högersväng över cyklist (VRU-02) — cyklisten som fortsätter rakt fram.
 *
 * Vad bilden lär ut: en cyklist i cykelfältet till höger om dig fortsätter
 * rakt fram när du ska svänga av. Ligger hen vid bilens högra sida syns hen
 * inte i spegeln — och att hen inte syns betyder inte att hen är borta. Du
 * väntar tills cyklisten har passerat innan svängen påbörjas.
 *
 * Avgränsning: bilden handlar om själva svängögonblicket, inte om axelblick
 * vid körfältsbyte (LANE-02) och inte om döda vinkelns zoner (VEH-02/OBS-03).
 * Inga regelpåståenden utöver uppdragets: cykelfältet är cyklistens körbana
 * rakt fram, och väntandet är förarens skyldighet — ingenstans står det att
 * någon "har företräde".
 *
 * Skala 12 px = 1 m, samma som övriga diagram. Kaross 22 × 53 px (1,8 × 4,4 m).
 * Scenen ligger i en grupp med translate(0 56); alla koordinater nedan är
 * gruppens lokala. Varje värde är efterräknat i skript, inte uppskattat.
 *
 * ---- GEOMETRI (högertrafik, vy uppifrån) ----
 * Huvudgatan går lodrätt. Tvärsnitt från vänster till höger:
 *   mötande körfält x 120–162 | mittlinje x 162 | ditt körfält x 162–204 |
 *   cykelfältslinje x 204 | cykelfält x 204–232 | kantsten x 232 |
 *   trottoar x 232–246.
 * Sidogatan går åt höger: körbana y 70–154, mittlinje y 112, x 232–400.
 *
 * - Elevens bil och cyklisten kör båda UPPÅT i bilden (minskande y). Kör man
 *   uppåt ligger den egna högra sidan mot bildens höga x. Alltså är det egna
 *   körfältet x 162–204 och det mötande x 120–162, och cykelfältet x 204–232
 *   ligger till HÖGER om eleven — den sida svängen går åt. Det mötande
 *   körfältet lämnas tomt; det har ingen roll i en högersväng.
 * - Elevens bil väntar: kaross x 172–194, y 181,5–234,5 (mitt 183, 208).
 *   Kontroll mot mittlinjen: 172 > 162 och 194 < 204 → helt inom eget
 *   körfält, inte en centimeter i cykelfältet.
 * - Cyklisten: kropp x 213–223, y 217–239 (mitt 218, 228). 213 > 204 och
 *   223 < 232 → i cykelfältet, samma riktning som bilen. Sidoluckan till
 *   karossen är 19 px och längdmässigt ligger hen utmed bilens bakre halva —
 *   just det läge bilden handlar om.
 * - Svängen: cirkelbåge, centrum (231, 181), radie 48. Start (183, 181), som
 *   är exakt bilens framkant i eget körfält; slut (231, 133), som är mitten
 *   av sidogatans HÖGRA körfält (y 112–154) sett från färdriktningen åt
 *   höger — för den som kör åt höger ligger den egna högra sidan mot höga y.
 *   Kontrollerat: båda punkterna ligger på cirkeln, och båge sweep=0.
 * - Bågen skär cykelfältslinjen x = 204 vid y = 141,3, alltså mitt i
 *   konfliktytan. Konfliktytan är därför cykelfältet x 204–232, y 120–154.
 *   Den väntande bilens framkant y 181,5 ligger 27 px nedanför ytan: bilen
 *   har inte börjat svänga.
 * - Spegelgränsen: linje från höger ytterspegel (197, 194) med lutning
 *   dx/dy = 1,75 till kantstenen (246, 222). Vid cyklistens främre högra
 *   hörn (223, 217) ligger gränsen på x = 237,2, och vid det bakre hörnet
 *   (223, 239) på x = 246. Cyklisten ligger alltså med hela sin bredd
 *   innanför gränsen → utanför spegelbilden. Området ritas som en streckad
 *   fyrhörning (194,194) (246,222) (246,244) (194,244), utan fyllning.
 * - Blicken åt höger går från förarplatsen (177, 204) till cyklisten
 *   (211, 228) — den kontroll som når dit spegeln inte når.
 * - Pekarlinjerna: P1 (110,320)→(211,238), P2 (258,278)→(234,238),
 *   P3 (110,150)→(204,137), P4 (248,36)→(210,80). Inga två av dem skär
 *   varandra (kontrollerat som segmentskärning). P1 passerar under bilen:
 *   vid x = 194 ligger den på y = 251, alltså 16 px bakom karossen.
 *
 * ---- FÖRKLARINGSRUTAN ----
 * Samma koordinater, samma körfält och samma färdriktningar som huvudscenen,
 * i skala 0,62. Bilen och cykelfältet är identiska; bara tidpunkten skiljer.
 *   RÄTT: bilen står kvar (mitt 183, 208), cyklisten (218, 90) → y 79–101,
 *         alltså ovanför konfliktytan som börjar y 120: hen har passerat.
 *         Svängen kan påbörjas.
 *   FEL:  bilen har börjat svänga och står på bågen vid θ = 210°, mitt
 *         (189,4, 157,0), vriden 30° medurs; dess högra hörn når x = 212,2,
 *         alltså 8 px in i cykelfältet. Cyklisten (218, 166) → y 155–177
 *         kommer rakt fram. Minsta avstånd mellan kaross och cyklist är
 *         8,4 px — konflikten är omedelbar, och fordonen överlappar inte i
 *         ritningen. Båda panelerna har cyklisten i cykelfältet x 204–232.
 *
 * ---- KODNING ----
 * Mönster: prickar = elevens bil, kryss = cyklist, snedskraffering =
 * konfliktyta. Inget mönster betyder två saker. Området spegeln inte visar
 * har ingen fyllning alls utan en streckad kontur — den skiljer sig i form,
 * inte bara i färg. Bock och kryss i rutan är fristående symboler.
 * Linjer: heldragen pil = rör sig nu, streckad pil = planerad sväng,
 * prickad linje = blicken åt höger. Färg bär ingen betydelse ensam: varje
 * element har mönster eller form och en etikett parallellt.
 */

/** Bil ritad med fronten uppåt. Kaross 22 × 53. Höger ytterspegel och höger blinkers. */
function Bil({ cx, cy, rot = 0 }: { cx: number; cy: number; rot?: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rot})`}>
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
        fill="url(#hc-dots)"
        className="stroke-attention-600"
        strokeWidth="2"
      />
      {/* Höger blinkers, fram och bak */}
      <rect x="4" y="-25" width="6" height="5" rx="1" className="fill-attention-600" />
      <rect x="4" y="20" width="6" height="5" rx="1" className="fill-attention-600" />
      {/* Höger ytterspegel, mot cykelfältet */}
      <rect x="11" y="-17" width="6" height="4" rx="1" className="fill-text-primary" />
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
        fill="url(#hc-cross)"
        className="stroke-primary-600"
        strokeWidth="2"
      />
    </g>
  );
}

/** Cykelsymbol målad i cykelfältet. */
function Cykelsymbol({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g
      className="stroke-diagram-marking fill-none"
      strokeWidth="2"
      transform={`translate(${cx} ${cy})`}
    >
      <circle cx="0" cy="-9" r="5" />
      <circle cx="0" cy="9" r="5" />
      <path d="M 0 9 L 4 0 L -4 0 L 0 -9" />
      <path d="M -4 -12 L 4 -12" />
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
 * Miniscen till förklaringsrutan. Samma lokala koordinater som huvudscenen,
 * i skala 0,62: eget körfält x 162–204, cykelfält x 204–232, kantsten 232,
 * sidogata y 70–154 med mittlinje y 112. Båda fordonen kör uppåt, precis som
 * i huvudscenen. Bara tidpunkten skiljer panelerna åt.
 */
function MiniSvang({ x, y, variant }: { x: number; y: number; variant: 'ratt' | 'fel' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(0.62) translate(-162 -60)`}>
      {/* Huvudgatans körbana: eget körfält + cykelfält */}
      <rect x="162" y="60" width="70" height="200" className="fill-diagram-road" />
      {/* Sidogatan */}
      <rect x="232" y="70" width="58" height="84" className="fill-diagram-road" />
      <rect x="232" y="60" width="14" height="10" className="fill-diagram-edge" opacity="0.3" />
      <rect x="232" y="154" width="14" height="106" className="fill-diagram-edge" opacity="0.3" />
      <line x1="162" y1="60" x2="162" y2="260" className="stroke-diagram-marking" strokeWidth="2.5" strokeDasharray="10 8" />
      <line x1="204" y1="60" x2="204" y2="120" className="stroke-diagram-marking" strokeWidth="3" />
      <line x1="204" y1="120" x2="204" y2="154" className="stroke-diagram-marking" strokeWidth="3" strokeDasharray="8 8" />
      <line x1="204" y1="154" x2="204" y2="260" className="stroke-diagram-marking" strokeWidth="3" />
      <line x1="232" y1="60" x2="232" y2="70" className="stroke-diagram-edge" strokeWidth="2.5" />
      <line x1="232" y1="154" x2="232" y2="260" className="stroke-diagram-edge" strokeWidth="2.5" />
      <line x1="246" y1="112" x2="290" y2="112" className="stroke-diagram-marking" strokeWidth="2.5" strokeDasharray="10 8" />

      {/* Konfliktytan: där svängen korsar cykelfältet */}
      <rect
        x="204"
        y="120"
        width="28"
        height="34"
        fill="url(#hc-hatch)"
        className="stroke-safety-600"
        strokeWidth="2"
      />

      {variant === 'ratt' ? (
        <g>
          {/* Cyklisten har passerat konfliktytan (y 79–101, ytan börjar 120) */}
          <Cyklist cx={218} cy={90} />
          <line x1="218" y1="75" x2="218" y2="66" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#hc-arrow-cyclist)" />
          <Bil cx={183} cy={208} />
          {/* Planerad sväng: bågen från framkanten, nu fri */}
          <path
            d="M 183 181 A 48 48 0 0 0 231 133 L 288 133"
            className="fill-none stroke-progress-600"
            strokeWidth="3.5"
            strokeDasharray="9 7"
            markerEnd="url(#hc-arrow-plan)"
          />
        </g>
      ) : (
        <g>
          {/* Bilen har börjat svänga: på bågen vid θ=210°, vriden 30° */}
          <path
            d="M 183 181 A 48 48 0 0 0 218 140"
            className="fill-none stroke-attention-600"
            strokeWidth="3.5"
            markerEnd="url(#hc-arrow-car)"
          />
          <Bil cx={189.4} cy={157} rot={30} />
          {/* Cyklisten kommer rakt fram, in i bilens väg */}
          <Cyklist cx={218} cy={166} />
          <line x1="218" y1="151" x2="218" y2="128" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#hc-arrow-cyclist)" />
        </g>
      )}
    </g>
  );
}

export function HogersvangCyklistDiagram() {
  return (
    <svg
      viewBox="0 0 400 1024"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="hc-title hc-desc"
    >
      <title id="hc-title">Högersväng: vänta tills cyklisten rakt fram har passerat</title>
      <desc id="hc-desc">
        Vy uppifrån av en lodrät gata med streckad mittlinje, ett mötande körfält som är tomt, ditt
        körfält och längst till höger ett cykelfält innanför en heldragen vit linje, markerat med
        cykelsymboler. Åt höger går en sidogata som du ska svänga in på; cykelfältets linje är
        streckad tvärs infarten, vilket visar att cykelfältet fortsätter förbi den. Elevens bil är
        fylld med prickmönster och har högerblinkers markerade som två små fyllda rutor på höger
        sida. Bilen står stilla i sitt eget körfält med nosen uppåt, strax före infarten. En streckad
        pil från bilens framkant visar den planerade svängen: den bågnar åt höger och går rakt över
        cykelfältet. Där svängen korsar cykelfältet ligger en yta med snedskraffering och kraftig
        kontur — konfliktytan. En cyklist, ritad med kryssmönster, kommer bakifrån i cykelfältet vid
        bilens högra sida; en heldragen pil framför cyklisten visar att hen fortsätter rakt fram, rakt
        genom konfliktytan. Runt cyklisten ligger en streckad fyrhörning utan fyllning som börjar vid
        bilens högra ytterspegel och vidgar sig bakåt: det är området som inte syns i spegeln.
        Cyklisten ligger helt inne i det området. En prickad linje från förarplatsen ut till cyklisten
        visar blicken åt höger, den kontroll som når dit spegeln inte når. Fyra hänvisningar i
        marginalerna: 1 pekar på cyklisten och gäller att hen kör rakt fram i sitt eget fält, 2 pekar
        på området utanför spegeln, 3 pekar på konfliktytan och gäller att du väntar, och en
        onumrerad etikett pekar på den streckade cykelfältslinjen tvärs infarten. Längst ned en ruta
        som jämför två tidpunkter med samma gata, samma bil och samma färdriktningar. Till vänster,
        märkt med en grön bock: cyklisten har passerat konfliktytan, bilen står kvar och den planerade
        svängen är fri. Till höger, märkt med ett rött kryss: bilen har börjat svänga och ligger snett
        över cykelfältet medan cyklisten kommer rakt fram in i konfliktytan.
      </desc>

      <defs>
        <pattern id="hc-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="hc-cross" patternUnits="userSpaceOnUse" width="7" height="7">
          <path d="M0,0 l7,7 M7,0 l-7,7" className="stroke-primary-600" strokeWidth="1.6" />
        </pattern>
        <pattern id="hc-hatch" patternUnits="userSpaceOnUse" width="7" height="7">
          <path d="M-2,2 l4,-4 M0,7 l7,-7 M5,9 l4,-4" className="stroke-safety-600" strokeWidth="1.8" />
        </pattern>
        <marker id="hc-arrow-cyclist" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary-600" />
        </marker>
        <marker id="hc-arrow-plan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-progress-600" />
        </marker>
        <marker id="hc-arrow-car" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-attention-600" />
        </marker>
        <marker id="hc-arrow-look" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-text-primary" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Högersväng över cyklist
      </text>
      <text x="20" y="48" className="fill-text-secondary text-[14px]">
        Vänta tills cyklisten har passerat
      </text>

      <g transform="translate(0 56)">
        {/* Huvudgatan: mötande körfält, eget körfält, cykelfält */}
        <rect x="120" y="0" width="112" height="420" className="fill-diagram-road" />
        {/* Sidogatan åt höger */}
        <rect x="232" y="70" width="168" height="84" className="fill-diagram-road" />
        {/* Trottoar/kantsten på höger sida, avbruten av infarten */}
        <rect x="232" y="0" width="14" height="70" className="fill-diagram-edge" opacity="0.3" />
        <rect x="232" y="154" width="14" height="266" className="fill-diagram-edge" opacity="0.3" />

        <line x1="120" y1="0" x2="120" y2="420" className="stroke-diagram-edge" strokeWidth="2.5" />
        <line x1="162" y1="0" x2="162" y2="420" className="stroke-diagram-marking" strokeWidth="2.5" strokeDasharray="10 8" />
        {/* Cykelfältslinjen: heldragen längs gatan, streckad tvärs infarten */}
        <line x1="204" y1="0" x2="204" y2="120" className="stroke-diagram-marking" strokeWidth="3" />
        <line x1="204" y1="120" x2="204" y2="154" className="stroke-diagram-marking" strokeWidth="3" strokeDasharray="8 8" />
        <line x1="204" y1="154" x2="204" y2="420" className="stroke-diagram-marking" strokeWidth="3" />
        <line x1="232" y1="0" x2="232" y2="70" className="stroke-diagram-edge" strokeWidth="3" />
        <line x1="232" y1="154" x2="232" y2="420" className="stroke-diagram-edge" strokeWidth="3" />
        {/* Sidogatans kanter och mittlinje */}
        <line x1="246" y1="70" x2="400" y2="70" className="stroke-diagram-edge" strokeWidth="2.5" />
        <line x1="246" y1="154" x2="400" y2="154" className="stroke-diagram-edge" strokeWidth="2.5" />
        <line x1="252" y1="112" x2="400" y2="112" className="stroke-diagram-marking" strokeWidth="2.5" strokeDasharray="10 8" />

        <Cykelsymbol cx={218} cy={30} />
        <Cykelsymbol cx={218} cy={320} />
        <Cykelsymbol cx={218} cy={395} />

        {/* 3. Konfliktytan: svängen korsar cykelfältet vid x 204, y 141 */}
        <rect
          x="204"
          y="120"
          width="28"
          height="34"
          fill="url(#hc-hatch)"
          className="stroke-safety-600"
          strokeWidth="2"
        />

        {/* Planerad sväng: båge, centrum (231,181), radie 48, in i sidogatans högra körfält */}
        <path
          d="M 183 181 A 48 48 0 0 0 231 133 L 366 133"
          className="fill-none stroke-progress-600"
          strokeWidth="4"
          strokeDasharray="11 8"
          markerEnd="url(#hc-arrow-plan)"
        />

        {/* 2. Området spegeln inte visar: från ytterspegeln (197,194) och bakåt */}
        <polygon
          points="194,194 246,222 246,244 194,244"
          className="fill-none stroke-safety-600"
          strokeWidth="2"
          strokeDasharray="6 5"
        />

        {/* Elevens bil väntar i eget körfält */}
        <Bil cx={183} cy={208} />

        {/* Blicken åt höger — dit spegeln inte når */}
        <line
          x1="177"
          y1="204"
          x2="211"
          y2="228"
          className="stroke-text-primary"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="0.5 6"
          markerEnd="url(#hc-arrow-look)"
        />

        {/* 1. Cyklisten rakt fram, vid bilens högra sida */}
        <Cyklist cx={218} cy={228} />
        <line x1="218" y1="213" x2="218" y2="98" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#hc-arrow-cyclist)" />

        {/* Etikett: cykelfältet fortsätter förbi infarten */}
        <text x="252" y="26" className="fill-text-primary text-[14px] font-semibold">
          Cykelfältet
        </text>
        <text x="252" y="44" className="fill-text-secondary text-[14px]">
          fortsätter förbi
        </text>
        <text x="252" y="62" className="fill-text-secondary text-[14px]">
          infarten
        </text>
        <Pekare x1={248} y1={36} x2={210} y2={80} />

        {/* 3. Vänta */}
        <Callout x={16} y={96} n={3} />
        <text x="32" y="101" className="fill-text-primary text-[14px] font-semibold">
          Vänta
        </text>
        <text x="6" y="119" className="fill-text-secondary text-[14px]">
          Din sväng går
        </text>
        <text x="6" y="137" className="fill-text-secondary text-[14px]">
          rakt över
        </text>
        <text x="6" y="155" className="fill-text-secondary text-[14px]">
          cykelfältet.
        </text>
        <text x="6" y="173" className="fill-text-secondary text-[14px]">
          Sväng först när
        </text>
        <text x="6" y="191" className="fill-text-secondary text-[14px]">
          cyklisten har
        </text>
        <text x="6" y="209" className="fill-text-secondary text-[14px]">
          passerat
        </text>
        <Pekare x1={110} y1={150} x2={204} y2={137} />

        {/* 1. Cyklisten */}
        <Callout x={16} y={268} n={1} />
        <text x="32" y="273" className="fill-text-primary text-[14px] font-semibold">
          Cyklisten
        </text>
        <text x="6" y="291" className="fill-text-secondary text-[14px]">
          kör rakt fram i
        </text>
        <text x="6" y="309" className="fill-text-secondary text-[14px]">
          sitt eget fält.
        </text>
        <text x="6" y="327" className="fill-text-secondary text-[14px]">
          Hen svänger
        </text>
        <text x="6" y="345" className="fill-text-secondary text-[14px]">
          inte med dig
        </text>
        <Pekare x1={110} y1={320} x2={211} y2={238} />

        {/* 2. Spegeln */}
        <Callout x={258} y={262} n={2} />
        <text x="274" y="267" className="fill-text-primary text-[14px] font-semibold">
          Spegeln
        </text>
        <text x="252" y="285" className="fill-text-secondary text-[14px]">
          når inte hit.
        </text>
        <text x="252" y="303" className="fill-text-secondary text-[14px]">
          Att du inte ser
        </text>
        <text x="252" y="321" className="fill-text-secondary text-[14px]">
          cyklisten
        </text>
        <text x="252" y="339" className="fill-text-secondary text-[14px]">
          betyder inte att
        </text>
        <text x="252" y="357" className="fill-text-secondary text-[14px]">
          hen är borta —
        </text>
        <text x="252" y="375" className="fill-text-secondary text-[14px]">
          vrid huvudet
        </text>
        <Pekare x1={258} y1={278} x2={234} y2={238} />
      </g>

      {/* Teckenförklaring */}
      <g>
        <line x1="24" y1="512" x2="52" y2="512" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#hc-arrow-cyclist)" />
        <text x="60" y="517" className="fill-text-secondary text-[14px]">
          Rör sig nu
        </text>
        <line
          x1="206"
          y1="512"
          x2="234"
          y2="512"
          className="stroke-progress-600"
          strokeWidth="3.5"
          strokeDasharray="9 7"
          markerEnd="url(#hc-arrow-plan)"
        />
        <text x="242" y="517" className="fill-text-secondary text-[14px]">
          Planerad sväng
        </text>
        <line
          x1="24"
          y1="538"
          x2="52"
          y2="538"
          className="stroke-text-primary"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="0.5 6"
        />
        <text x="60" y="543" className="fill-text-secondary text-[14px]">
          Blicken åt höger
        </text>
        <rect x="206" y="531" width="28" height="14" fill="url(#hc-hatch)" className="stroke-safety-600" strokeWidth="1.5" />
        <text x="242" y="543" className="fill-text-secondary text-[14px]">
          Vägarna korsas
        </text>
        <rect
          x="24"
          y="557"
          width="28"
          height="14"
          className="fill-none stroke-safety-600"
          strokeWidth="1.5"
          strokeDasharray="5 4"
        />
        <text x="60" y="569" className="fill-text-secondary text-[14px]">
          Det spegeln inte visar
        </text>
      </g>

      {/* Vad du gör */}
      <text x="200" y="606" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        Innan du svänger höger: titta åt höger
      </text>
      <text x="200" y="626" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        och bakåt efter cyklister, och vänta
      </text>
      <text x="200" y="646" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        tills cyklisten har passerat.
      </text>
      <text x="200" y="670" textAnchor="middle" className="fill-text-secondary text-[14px]">
        Sväng inte i förlitan på att cyklisten bromsar.
      </text>
      <text x="200" y="688" textAnchor="middle" className="fill-text-secondary text-[14px]">
        Cykelfältet är cyklistens körbana rakt fram,
      </text>
      <text x="200" y="706" textAnchor="middle" className="fill-text-secondary text-[14px]">
        också när du ska svänga av.
      </text>

      {/* Mönsterförklaring */}
      <g>
        <rect x="86" y="726" width="22" height="14" rx="2" fill="url(#hc-dots)" className="stroke-attention-600" strokeWidth="1.5" />
        <text x="114" y="738" className="fill-text-tertiary text-[14px]">
          Du
        </text>
        <rect x="190" y="726" width="22" height="14" rx="2" fill="url(#hc-cross)" className="stroke-primary-600" strokeWidth="1.5" />
        <text x="218" y="738" className="fill-text-tertiary text-[14px]">
          Cyklist
        </text>
      </g>

      {/* Förklaringsruta: samma gata, samma bil — bara tidpunkten skiljer */}
      <rect x="20" y="754" width="360" height="256" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="34" y="778" className="fill-text-primary text-[14px] font-semibold">
        Vad tidpunkten avgör:
      </text>
      <line x1="200" y1="790" x2="200" y2="998" className="stroke-border-default" strokeWidth="1.5" strokeDasharray="6 4" />

      {/* Rätt: bock, cyklisten har passerat, svängen fri */}
      <path
        d="M 50 804 L 56 811 L 68 796"
        className="fill-none stroke-progress-600"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="76" y="810" className="fill-text-primary text-[14px] font-semibold">
        Rätt
      </text>
      <MiniSvang x={44} y={820} variant="ratt" />
      <text x="84" y="962" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Du väntar in cyklisten
      </text>
      <text x="84" y="980" textAnchor="middle" className="fill-text-secondary text-[14px]">
        Först när hen har
      </text>
      <text x="84" y="998" textAnchor="middle" className="fill-text-secondary text-[14px]">
        passerat svänger du
      </text>

      {/* Fel: kryss, svängen påbörjad medan cyklisten kommer */}
      <g className="stroke-safety-600" strokeWidth="4" strokeLinecap="round">
        <line x1="232" y1="797" x2="246" y2="811" />
        <line x1="246" y1="797" x2="232" y2="811" />
      </g>
      <text x="254" y="810" className="fill-text-primary text-[14px] font-semibold">
        Fel
      </text>
      <MiniSvang x={226} y={820} variant="fel" />
      <text x="266" y="962" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Du svänger ändå
      </text>
      <text x="266" y="980" textAnchor="middle" className="fill-text-secondary text-[14px]">
        Bilen går rakt över
      </text>
      <text x="266" y="998" textAnchor="middle" className="fill-text-secondary text-[14px]">
        cyklistens väg
      </text>
    </svg>
  );
}
