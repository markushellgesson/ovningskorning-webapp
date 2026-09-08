/**
 * Buss, skolskjuts och hållplats (VRU-04) — passagerare korsar körbanan både
 * framför och bakom en stillastående buss. Bilden visar situation och teknik.
 * Den namnger ingen paragraf: den säger att farten ska vara låg nog att kunna
 * stanna, inte att någon "har företräde". Skolskjutsens varningslyktor ritas
 * inte och nämns inte — regelstödet i projektet täcker dem inte.
 *
 * Skala 10 px = 1 m. Personbil 18 × 44 px (1,8 × 4,4 m), buss 26 × 120 px
 * (2,6 × 12 m), körfält 35 px (3,5 m).
 *
 * ---- Geometri (vy uppifrån, högertrafik) ----
 * Gatan går lodrätt. Både DIN BIL och BUSSEN är riktade UPPÅT i bilden, alltså
 * mot minskande y. Kör man uppåt ligger den egna högra sidan mot bildens högra
 * kant (hög x). Alltså är det HÖGRA körfältet ditt.
 *
 *   Vänster trottoar x 160…190. Körbana x 190…260. Mittlinje x 225.
 *   Mötande körfält x 190…225 (3,5 m). DITT körfält x 225…260 (3,5 m).
 *   Hållplatsficka x 260…291 (3,1 m), y 200…380. Höger trottoar x 291…316
 *   vid fickan, annars x 260…316. Körbanan går y 130…700.
 *
 *   DIN BIL kör uppåt, mitt x 242,5 → kaross x 233,5…251,5.
 *     233,5 > 225 (höger om mittlinjen) och 251,5 < 260 (innanför kantstenen)
 *     → hela karossen ligger i ditt eget körfält. Körfältets mitt är x 242,5,
 *     så bilen ligger mitt i det. Mötande körfält lämnas tomt.
 *     Bilen i y: 598…642.
 *   BUSSEN står still i fickan, mitt x 275 → kaross x 262…288.
 *     262 > 260 och 288 < 291 → bussen står helt i fickan och skjuter alltså
 *     inte ut i ditt körfält. Din bil (max x 251,5) och bussen (min x 262)
 *     överlappar inte: 10,5 px = 1,05 m mellan dem i sidled.
 *     Bussen i y: 230…350. Ingen överlappning med bilen (350 < 598).
 *
 * ---- De två korsningspunkterna ----
 * Båda ligger i DITT körfält, x 225…260, på var sin sida om bussen, och båda
 * är markerade med rutmönstrad konfliktyta med konturlinje:
 *   FRAMFÖR bussen: y 190…230, alltså direkt före bussens front (y 230).
 *     Passageraren är på väg åt vänster, huvud (240, 194), fötter y 228.
 *     Figuren upptar x 232…248 — helt i ditt körfält (225…260).
 *     Bussen (x 262…288) skymmer henne för dig ända tills hon är ute.
 *   BAKOM bussen:   y 350…396, alltså direkt efter bussens bakkant (y 350).
 *     Passageraren har just klivit ut förbi bussens vänstra sida, huvud
 *     (250, 356), fötter y 390. Figuren upptar x 242…258 — helt i ditt
 *     körfält: 242 > 225 och 258 < 260, alltså innanför kantstenen och
 *     utanför bussen (262).
 * Ingen figur överlappar bussen i x (258 < 262) och ingen överlappar din bil
 * i y (390 < 598). Avståndet från figuren bakom bussen till din bils front
 * är 598 − 390 = 208 px, alltså drygt 20 m: du hinner om farten är låg.
 *
 * ---- Hänvisningslinjer ----
 * 1 och 2 pekar från vänstermarginalen, (180, 190) → (231, 202) och
 * (180, 420) → (240, 374). Linjerna divergerar i y och kan inte skära
 * varandra. 3 pekar vågrätt från högermarginalen, (320, 620) → (253, 620).
 * Etiketten för hållplats pekar (320, 200) → (308, 214) på väderskyddet
 * (x 294…314, y 200…258), och etiketten för bussen (320, 320) → (289, 320)
 * på bussens sida. Den senare går under både väderskyddet (slut y 258) och
 * den väntande figuren (x 292…308, y 272…312) och skär alltså ingen av dem.
 * Ingen textrad ligger på körbanan: all text har x ≤ 155 eller x ≥ 322,
 * medan körbana + ficka + trottoarer upptar x 160…316.
 *
 * ---- Förklaringsrutan, efterräknad ----
 * Två miniscener i samma skala och med samma koordinater som huvudbilden:
 * körbana x 190…260, mittlinje 225, ficka 260…291. Bussen visas avskuren i
 * panelens överkant, markerat med brottsymbol tvärs karossen — hela bussen
 * ryms inte i panelen och trycks därför inte ihop.
 *   Bussens bakkant y 64. Passageraren bakom bussen: huvud (250, 76),
 *   fötter y 110. Din bil i BÅDA panelerna: mitt (242,5, 152), kaross
 *   y 130…174, x 233,5…251,5 → samma läge i båda, så skillnaden är farten,
 *   inte placeringen. Avståndet bilfront (130) till fotgängarens fötter (110)
 *   är 20 px i båda panelerna.
 *   Panel A: bromsljus tända, inga fartstreck → du står stilla före henne.
 *   Panel B: fartstreck y 118…128 i luckan och en träffmarkering vid figuren
 *   → du är kvar i fart när hon redan är ute.
 * Panelerna ligger på y 830…1010. Rityta: A x 45…201, B x 260…416.
 * Skiljelinje x 240, ram
 * x 20…460. Ingen panel skär skiljelinjen eller ramen.
 *
 * ---- Mönster och roller ----
 * Prickar = din bil. Diagonala ränder = buss (andra fordon). Rutmönster med
 * konturlinje = yta där passagerare korsar. Streckgubbe = passagerare.
 * Heldragen linje med pilspets = rör sig nu. Bock och kryss bär rätt och fel
 * parallellt med färgen. Inget mönster betyder två saker.
 */

/** Personbil, fronten uppåt. Kaross 18 × 44. */
function Bil({
  cx,
  cy,
  fill,
  stroke,
  bromsljus,
}: {
  cx: number;
  cy: number;
  fill: string;
  stroke: string;
  bromsljus?: boolean;
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
      {bromsljus && (
        <g className="fill-safety-600">
          <rect x="-8" y="19.5" width="5" height="3" rx="1" />
          <rect x="3" y="19.5" width="5" height="3" rx="1" />
        </g>
      )}
    </g>
  );
}

/**
 * Buss, fronten uppåt. Kaross 26 × längd, centrerad i (cx, cy).
 * `avskuren` ritar en brottsymbol tvärs karossen: bussen fortsätter utanför
 * bilden i stället för att tryckas ihop.
 */
function Buss({
  cx,
  cy,
  langd,
  avskuren,
}: {
  cx: number;
  cy: number;
  langd: number;
  avskuren?: boolean;
}) {
  const hl = langd / 2;
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <g className="fill-text-primary">
        <rect x="-16" y={-hl + 12} width="3" height="12" rx="1" />
        <rect x="13" y={-hl + 12} width="3" height="12" rx="1" />
        <rect x="-16" y={hl - 26} width="3" height="12" rx="1" />
        <rect x="13" y={hl - 26} width="3" height="12" rx="1" />
      </g>
      <rect x="-13" y={-hl} width="26" height={langd} rx="3" className="fill-surface-base" />
      <rect
        x="-13"
        y={-hl}
        width="26"
        height={langd}
        rx="3"
        fill="url(#bh-strip)"
        className="stroke-primary-600"
        strokeWidth="2"
      />
      {/* Vindruta */}
      <rect x="-9" y={-hl + 4} width="18" height="6" rx="1.5" className="fill-surface-base" />
      {/* Dörrar mot trottoarsidan (höger sida, x = +13) */}
      <g className="stroke-primary-600" strokeWidth="2.5" strokeLinecap="round">
        <line x1="13" y1={-hl + 20} x2="13" y2={-hl + 32} />
        <line x1="13" y1={-hl + 62} x2="13" y2={-hl + 74} />
      </g>
      {avskuren && (
        <path
          d={`M -13 ${-hl + 8} l 6.5 -5 l 6.5 5 l 6.5 -5 l 6.5 5`}
          className="fill-none stroke-primary-600"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      )}
    </g>
  );
}

/** Streckgubbe, huvudet vid (x, y). Cirka 34 px hög, 16 px bred. */
function Passagerare({ x, y }: { x: number; y: number }) {
  return (
    <g className="stroke-safety-600" strokeWidth="2.5" strokeLinecap="round">
      <circle cx={x} cy={y} r="6" className="fill-safety-600" />
      <line x1={x} y1={y + 6} x2={x} y2={y + 22} />
      <line x1={x - 8} y1={y + 12} x2={x + 8} y2={y + 12} />
      <line x1={x} y1={y + 22} x2={x - 6} y2={y + 34} />
      <line x1={x} y1={y + 22} x2={x + 6} y2={y + 34} />
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
 * Miniscen i samma skala och koordinater som huvudbilden: körbana x 190…260,
 * mittlinje 225, hållplatsficka 260…291. Bussen är avskuren i överkanten.
 * Din bil står på samma plats i båda panelerna — det som skiljer är farten.
 */
function MiniHallplats({
  x,
  y,
  variant,
}: {
  x: number;
  y: number;
  variant: 'sanker' | 'oforandrad';
}) {
  const sanker = variant === 'sanker';
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="160" y="0" width="30" height="180" className="fill-diagram-edge" opacity="0.3" />
      <rect x="260" y="0" width="56" height="180" className="fill-diagram-edge" opacity="0.3" />
      <rect x="190" y="0" width="70" height="180" className="fill-diagram-road" />
      <rect x="260" y="0" width="31" height="180" className="fill-diagram-road" />
      <g className="stroke-diagram-edge" strokeWidth="2">
        <line x1="190" y1="0" x2="190" y2="180" />
        <line x1="291" y1="0" x2="291" y2="180" />
      </g>
      <line
        x1="225"
        y1="0"
        x2="225"
        y2="180"
        className="stroke-diagram-marking"
        strokeWidth="2"
        strokeDasharray="12 10"
      />

      {/* Konfliktytan bakom bussen: ditt körfält, x 225…260, y 64…112 */}
      <rect
        x="225"
        y="64"
        width="35"
        height="48"
        fill="url(#bh-zon)"
        className="stroke-safety-600"
        strokeWidth="1.2"
      />

      <Buss cx={275} cy={34} langd={60} avskuren />
      <Passagerare x={250} y={76} />
      <Bil
        cx={242.5}
        cy={152}
        fill="url(#bh-dots)"
        stroke="stroke-attention-600"
        bromsljus={sanker}
      />

      {!sanker && (
        <>
          {/* Fartstreck i luckan mellan bilfronten (130) och fötterna (110) */}
          <g className="stroke-attention-600" strokeWidth="2.5" strokeLinecap="round">
            <line x1="234" y1="126" x2="234" y2="118" />
            <line x1="242.5" y1="126" x2="242.5" y2="114" />
            <line x1="251" y1="126" x2="251" y2="118" />
          </g>
          {/* Träffmarkering vid figuren */}
          <g className="stroke-safety-600" strokeWidth="2" strokeLinecap="round">
            <line x1="250" y1="112" x2="244" y2="120" />
            <line x1="250" y1="112" x2="252" y2="122" />
            <line x1="250" y1="112" x2="258" y2="118" />
          </g>
        </>
      )}
    </g>
  );
}

export function BussHallplatsDiagram() {
  return (
    <svg
      viewBox="0 0 480 1100"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="bh-title bh-desc"
    >
      <title id="bh-title">
        Buss vid hållplats: passagerare korsar körbanan både framför och bakom bussen
      </title>
      <desc id="bh-desc">
        Vy uppifrån av en lodrät gata med streckad vit mittlinje och trottoar på båda sidor. Till
        höger finns en hållplatsficka där en buss står stilla, fylld med diagonala ränder och med
        dörrarna mot trottoaren; på trottoaren står ett väderskydd. Din bil, fylld med prickmönster
        och med tända bromsljus, kommer bakifrån i det högra körfältet med låg fart och har en kort
        heldragen pil framför sig. Två passagerare, ritade som streckgubbar, korsar körbanan åt
        vänster: en strax framför bussens front och en som just klivit ut bakom bussens bakre ände.
        Varje korsningspunkt ligger i ditt körfält och är markerad med en rutmönstrad yta med
        konturlinje, och varje passagerare har en heldragen pil som visar gångriktningen. Tre
        numrerade hänvisningar i marginalerna: 1 pekar på passageraren framför bussen, som bussen
        skymmer, 2 pekar på passageraren bakom bussen, som den som bara bevakar framsidan missar,
        och 3 pekar på din bil och farten som ska vara låg nog att kunna stanna för båda. Längst ned
        en ruta med två miniscener av samma gata i samma skala, där bussen är avskuren i överkanten
        med en brottsymbol. Till vänster har din bil sänkt farten, står stilla med tända bromsljus
        före passageraren bakom bussen, och en grön bock står under. Till höger har din bil
        oförändrad fart, markerad med tre korta fartstreck framför bilen, når fram till passageraren
        som just klivit ut, träffpunkten är markerad, och ett rött kryss står under.
      </desc>

      <defs>
        <pattern id="bh-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="bh-strip" patternUnits="userSpaceOnUse" width="8" height="8">
          <path
            d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4"
            className="stroke-primary-600"
            strokeWidth="2"
          />
        </pattern>
        <pattern id="bh-zon" patternUnits="userSpaceOnUse" width="10" height="10">
          <rect width="10" height="10" className="fill-safety-200" />
          <path d="M 0 0 L 10 10 M 10 0 L 0 10" className="stroke-safety-600" strokeWidth="1.1" />
        </pattern>
        <marker
          id="bh-arrow-you"
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
        <marker
          id="bh-arrow-ped"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="10"
          markerHeight="10"
          markerUnits="userSpaceOnUse"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-safety-600" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Buss som står still vid hållplats
      </text>
      <text x="20" y="48" className="fill-text-secondary text-[14px]">
        Vy uppifrån. Du kör uppåt i högra körfältet.
      </text>

      {/* Teckenförklaring */}
      <g>
        <line
          x1="20"
          y1="74"
          x2="48"
          y2="74"
          className="stroke-attention-600"
          strokeWidth="3"
          markerEnd="url(#bh-arrow-you)"
        />
        <text x="58" y="79" className="fill-text-secondary text-[14px]">
          Din färd
        </text>
        <line
          x1="150"
          y1="74"
          x2="178"
          y2="74"
          className="stroke-safety-600"
          strokeWidth="3"
          markerEnd="url(#bh-arrow-ped)"
        />
        <text x="188" y="79" className="fill-text-secondary text-[14px]">
          Passagerarens väg
        </text>

        <rect
          x="20"
          y="91"
          width="26"
          height="15"
          rx="2"
          fill="url(#bh-dots)"
          className="stroke-attention-600"
          strokeWidth="1.5"
        />
        <text x="54" y="103" className="fill-text-secondary text-[14px]">
          Du
        </text>
        <rect
          x="100"
          y="91"
          width="26"
          height="15"
          rx="2"
          fill="url(#bh-strip)"
          className="stroke-primary-600"
          strokeWidth="1.5"
        />
        <text x="134" y="103" className="fill-text-secondary text-[14px]">
          Buss
        </text>
        <rect
          x="200"
          y="91"
          width="26"
          height="15"
          fill="url(#bh-zon)"
          className="stroke-safety-600"
          strokeWidth="1.2"
        />
        <text x="234" y="103" className="fill-text-secondary text-[14px]">
          Där de korsar
        </text>
      </g>

      {/* ================= Scenen ================= */}
      {/* Trottoarer, körbana och hållplatsficka */}
      <rect x="160" y="130" width="30" height="570" className="fill-diagram-edge" opacity="0.3" />
      <rect x="260" y="130" width="56" height="570" className="fill-diagram-edge" opacity="0.3" />
      <rect x="190" y="130" width="70" height="570" className="fill-diagram-road" />
      <rect x="260" y="200" width="31" height="180" className="fill-diagram-road" />
      {/* Kantstenar: vänster rak, höger buktar ut kring fickan */}
      <g className="stroke-diagram-edge fill-none" strokeWidth="2">
        <line x1="190" y1="130" x2="190" y2="700" />
        <path d="M 260 130 L 260 200 L 291 200 L 291 380 L 260 380 L 260 700" />
      </g>
      {/* Mittlinje x 225 */}
      <line
        x1="225"
        y1="130"
        x2="225"
        y2="700"
        className="stroke-diagram-marking"
        strokeWidth="2"
        strokeDasharray="14 12"
      />

      {/* Väderskydd på trottoaren vid fickan */}
      <rect
        x="294"
        y="200"
        width="20"
        height="58"
        rx="2"
        className="fill-surface-base stroke-primary-600"
        strokeWidth="1.8"
      />
      <line x1="294" y1="258" x2="314" y2="258" className="stroke-primary-600" strokeWidth="3" />
      {/* Någon som väntar vid skyddet */}
      <Passagerare x={300} y={278} />

      {/* Konfliktytor i DITT körfält (x 225…260), en på var sida om bussen */}
      <rect
        x="225"
        y="190"
        width="35"
        height="40"
        fill="url(#bh-zon)"
        className="stroke-safety-600"
        strokeWidth="1.4"
      />
      <rect
        x="225"
        y="350"
        width="35"
        height="46"
        fill="url(#bh-zon)"
        className="stroke-safety-600"
        strokeWidth="1.4"
      />

      {/* Bussen: står helt i fickan, x 262…288, y 300…420 */}
      <Buss cx={275} cy={290} langd={120} />

      {/* Passagerare framför bussen, på väg åt vänster */}
      <Passagerare x={240} y={194} />
      <line
        x1="226"
        y1="211"
        x2="196"
        y2="211"
        className="stroke-safety-600"
        strokeWidth="3"
        markerEnd="url(#bh-arrow-ped)"
      />

      {/* Passagerare bakom bussen, just utkliven, på väg åt vänster */}
      <Passagerare x={250} y={356} />
      <line
        x1="236"
        y1="373"
        x2="196"
        y2="373"
        className="stroke-safety-600"
        strokeWidth="3"
        markerEnd="url(#bh-arrow-ped)"
      />

      {/* Din bil med låg fart och tända bromsljus */}
      <Bil cx={242.5} cy={620} fill="url(#bh-dots)" stroke="stroke-attention-600" bromsljus />
      <line
        x1="242.5"
        y1="592"
        x2="242.5"
        y2="440"
        className="stroke-attention-600"
        strokeWidth="3"
        markerEnd="url(#bh-arrow-you)"
      />

      {/* 1. Framför bussen */}
      <Callout x={30} y={190} n={1} />
      <text x="48" y="195" className="fill-text-primary text-[15px] font-semibold">
        Framför bussen
      </text>
      <text x="14" y="218" className="fill-text-secondary text-[14px]">
        Någon korsar strax
      </text>
      <text x="14" y="234" className="fill-text-secondary text-[14px]">
        före bussens front.
      </text>
      <text x="14" y="250" className="fill-text-secondary text-[14px]">
        Bussen skymmer henne.
      </text>
      <Pekare x1={180} y1={190} x2={231} y2={202} />

      {/* 2. Bakom bussen */}
      <Callout x={30} y={420} n={2} />
      <text x="48" y="425" className="fill-text-primary text-[15px] font-semibold">
        Bakom bussen
      </text>
      <text x="14" y="448" className="fill-text-secondary text-[14px]">
        Den som bara ser
      </text>
      <text x="14" y="464" className="fill-text-secondary text-[14px]">
        framsidan missar
      </text>
      <text x="14" y="480" className="fill-text-secondary text-[14px]">
        den som går bakom.
      </text>
      <Pekare x1={180} y1={420} x2={240} y2={374} />

      {/* Hållplatsen */}
      <text x="322" y="206" className="fill-text-primary text-[15px] font-semibold">
        Hållplats
      </text>
      <text x="322" y="226" className="fill-text-secondary text-[14px]">
        Folk stiger av och på.
      </text>
      <Pekare x1={320} y1={200} x2={308} y2={214} />

      {/* Bussen */}
      <text x="322" y="276" className="fill-text-primary text-[15px] font-semibold">
        Bussen står still
      </text>
      <text x="322" y="296" className="fill-text-secondary text-[14px]">
        Samma vaksamhet mot
      </text>
      <text x="322" y="312" className="fill-text-secondary text-[14px]">
        en stannad skolskjuts.
      </text>
      <Pekare x1={320} y1={320} x2={289} y2={320} />

      {/* 3. Din fart */}
      <Callout x={338} y={620} n={3} />
      <text x="356" y="625" className="fill-text-primary text-[15px] font-semibold">
        Din fart
      </text>
      <text x="322" y="648" className="fill-text-secondary text-[14px]">
        Låg nog att du hinner
      </text>
      <text x="322" y="664" className="fill-text-secondary text-[14px]">
        stanna för båda —
      </text>
      <text x="322" y="680" className="fill-text-secondary text-[14px]">
        fram och bak.
      </text>
      <Pekare x1={320} y1={620} x2={253} y2={620} />

      {/* Bildens poäng */}
      <text
        x="240"
        y="728"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-medium"
      >
        Passagerare korsar både framför och bakom bussen.
      </text>
      <text x="240" y="746" textAnchor="middle" className="fill-text-secondary text-[14px]">
        Farten ska vara låg nog att du kan stanna för båda.
      </text>

      {/* ================= Förklaringsruta ================= */}
      <rect
        x="20"
        y="764"
        width="440"
        height="316"
        rx="6"
        className="fill-none stroke-border-default"
        strokeWidth="1.5"
      />
      <text x="34" y="788" className="fill-text-primary text-[15px] font-semibold">
        Om någon kliver ut bakom bussen:
      </text>
      <line
        x1="240"
        y1="802"
        x2="240"
        y2="1070"
        className="stroke-border-default"
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />

      <text
        x="128"
        y="822"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-semibold"
      >
        Sänkt fart i god tid
      </text>
      <MiniHallplats x={-115} y={830} variant="sanker" />
      <text
        x="128"
        y="1034"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-semibold"
      >
        Du hinner stanna
      </text>
      <text x="128" y="1052" textAnchor="middle" className="fill-text-secondary text-[14px]">
        för den som går ut
      </text>
      <text x="128" y="1068" textAnchor="middle" className="fill-text-secondary text-[14px]">
        bakom bussen.
      </text>
      <Check x={196} y={1060} />

      <text
        x="348"
        y="822"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-semibold"
      >
        Blicken bara framför
      </text>
      <MiniHallplats x={100} y={830} variant="oforandrad" />
      <text
        x="348"
        y="1034"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-semibold"
      >
        Du ser henne sent
      </text>
      <text x="348" y="1052" textAnchor="middle" className="fill-text-secondary text-[14px]">
        och är kvar i fart när
      </text>
      <text x="348" y="1068" textAnchor="middle" className="fill-text-secondary text-[14px]">
        hon redan är ute.
      </text>
      <Cross x={416} y={1060} />
    </svg>
  );
}
