/**
 * Barn och skolor (VRU-03) — förvarningen kommer före barnet.
 *
 * Bilden lär ut EN sak: det som avslöjar barnet är något annat än barnet — en
 * boll som rullar ut, en vält cykel vid en lucka i bilraden — och farten går
 * ned redan då, medan trottoaren fortfarande är skymd. Inget barn syns i
 * huvudscenen; det är hela poängen.
 *
 * ORDVAL: bilden säger ingenting om regler. Den nämner ingen paragraf, ingen
 * skolskjuts, inga klockslag och inga siffror om hastighet, avstånd eller hur
 * ofta något inträffar. Allt formuleras som teknik och observation.
 *
 * SKALA 10 px = 1 m. Kaross 18 × 44 px (1,8 × 4,4 m). Boll och cykel är
 * ritade större än skalan för att alls synas — det står utskrivet i bilden.
 *
 * ---- Geometri (vy uppifrån, högertrafik) ----
 * Gatan går lodrätt, körbana x 200–292, y 140–770.
 *   Mittlinje x 235. Mötande körfält x 200–235 (3,5 m), DITT körfält
 *   x 235–270 (3,5 m), parkeringsremsa x 270–292 (2,2 m), kantsten x 292,
 *   trottoar 292–316, staket x 316, skolgård 316–344.
 *
 *   DIN BIL är det enda fordon som rör sig i gatan och kör UPPÅT (minskande
 *   y). Kör man uppåt ligger den egna högra sidan mot bildens högra kant —
 *   alltså är det högra körfältet (höga x) ditt.
 *     mitt x 252, kaross x 243…261, cy 640 (kaross y 618…662).
 *     243 > 235 ✔ och 261 < 270 ✔ → hela karossen i ditt eget körfält,
 *     0,8 m från mittlinjen och 0,9 m från parkeringsremsan.
 *     Det mötande körfältet lämnas tomt; ett möte är en annan situation.
 *
 *   PARKERADE BILAR står stilla vid högerkanten, mitt x 281, kaross
 *     x 272…290 — helt inom remsan 270…292. Fyra stycken, cy 200, 256, 368,
 *     480, alltså karosser y 178–222, 234–278, 346–390, 458–502.
 *     Luckor: 1,2 m (tät), 6,8 m, 6,8 m. Inga två karosser överlappar.
 *
 * ---- Siktskuggan, efterräknad (inte uppskattad) ----
 * Förarens öga sätts till (248, 620), vänstra framdelen av din bil.
 * Ett rutnät med 1 px steg över trottoaren x 292…316, y 178…428 — 6 275
 * provpunkter — testades mot de fyra parkerade karosserna: INGEN av dem är
 * synlig från ögat. Därför ritas skraffering över exakt den rektangeln.
 * Trottoaren närmast dig, y 470…502, är däremot delvis synlig (siktgränsen
 * vid trottoarens ytterkant x 316 ligger vid y 470). Skrafferingen slutar
 * vid y 428 så att den inte påstår mer skugga än det finns.
 *
 * BOLLEN (264, 312, radie 6) är däremot synlig: 264 + 6 = 270 < 272, alltså
 * har den kommit ut förbi bilraden och ingen kaross skymmer siktlinjen.
 * Den välta cykeln ligger på trottoaren vid nästa lucka, (304, 444), och är
 * alltså nedanför skuggbandets slut — den syns, till skillnad från det som
 * ligger bakom raden. Blicklinjen
 * (243, 614) → (261, 318) passerar ingen parkerad bil. Det är den
 * pedagogiska kärnan: du ser inte barnet, men du ser vad barnet skickade ut.
 *
 * ---- Förklaringsrutan, efterräknad ----
 * Två miniscener i skala 1:1 med huvudbildens egna x-koordinater
 * (translate A = −128, B = +92), så att inget trycks ihop. Samma gata, samma
 * riktning, samma boll, samma barn på samma plats i båda panelerna — det enda
 * som skiljer är var din bil hinner vara.
 *   Parkerade bilar cy 40 och 130 → lucka y 62…108. Bollen (266, 72) och
 *   barnet (256) kommer båda ur den luckan. Barnfiguren upptar y 79,5…100
 *   (huvud r 4,5 kring cy 84, bål cy+4…cy+16).
 *   Barnet x 256 ligger inom din kaross x 243…261, alltså i din väg.
 *   Panel A (rätt): din bil cy 150, nos y 128 → 28 px kvar till barnets
 *                   underkant y 100. Klammern i vänsterkanten mäter den
 *                   marginalen.
 *   Panel B (fel):  din bil cy 124, nos y 102 → 2 px kvar; bilen är framme.
 *                   Nosen får inte täcka barnfiguren — barnet ska synas i
 *                   båda panelerna, annars går jämförelsen förlorad. Därför
 *                   ligger konfliktmarkeringen på nosen (y 103…113), inte
 *                   ovanpå barnet.
 *   Båda bilarna ligger i högra körfältet (243 > 235, 261 < 270) och ingen
 *   av dem överlappar en parkerad bil. Bakkanterna y 172 respektive 146
 *   ryms inom miniscenens höjd 190.
 *
 * ---- Mönster och roller (varje mönster betyder en enda sak) ----
 *   prickar             = din bil
 *   diagonala ränder    = parkerade bilar
 *   45° skraffering     = skymd sikt
 *   heldragen pil       = rör sig nu (du, bollen)
 *   prickad linje       = din blick
 *   röda tvärstreck bak = bromsljus, farten sänks
 *   tre korta streck    = hög fart (finns bara i panel B)
 *   bock / kryss        = utfallet
 * Ingen betydelse bärs av färg ensam: varje roll har också mönster, form,
 * streckning eller etikett.
 */

/** Bil ritad med fronten uppåt. Kaross 18 × 44. */
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
          <rect x="-7.5" y="19.5" width="5.5" height="3.5" rx="1" />
          <rect x="2" y="19.5" width="5.5" height="3.5" rx="1" />
        </g>
      )}
    </g>
  );
}

/** Boll: cirkel med två streck, så att den inte kan förväxlas med ett huvud. */
function Boll({ cx, cy, r = 6 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        className="fill-surface-base stroke-text-primary"
        strokeWidth="1.8"
      />
      <path
        d={`M ${cx - r} ${cy} Q ${cx} ${cy - r * 0.75} ${cx + r} ${cy} M ${cx - r} ${cy} Q ${cx} ${cy + r * 0.75} ${cx + r} ${cy}`}
        className="fill-none stroke-text-primary"
        strokeWidth="1.3"
      />
    </g>
  );
}

/** Vält cykel: två hjul och en ram, liggande längs trottoaren. */
function ValtCykel({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <rect
        x={cx - 9}
        y={cy - 16}
        width="18"
        height="32"
        rx="4"
        className="fill-surface-base"
        opacity="0.9"
      />
      <g className="fill-none stroke-text-primary" strokeWidth="1.8">
        <circle cx={cx} cy={cy - 10} r="5" />
        <circle cx={cx} cy={cy + 10} r="5" />
        <path d={`M ${cx} ${cy - 10} L ${cx + 4} ${cy} L ${cx} ${cy + 10}`} />
        <path d={`M ${cx - 5} ${cy - 12} L ${cx + 3} ${cy - 8}`} />
      </g>
    </g>
  );
}

/** Barn: huvud och bål, tydligt mindre än en bil och aldrig format som en boll. */
function Barn({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="4.5" className="fill-text-primary" />
      <rect x={cx - 4.5} y={cy + 4} width="9" height="12" rx="3" className="fill-text-primary" />
      <line
        x1={cx - 7}
        y1={cy + 8}
        x2={cx + 7}
        y2={cy + 8}
        className="stroke-text-primary"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
  );
}

/** Fartstreck bakom ett fordon som kör uppåt: tre korta streck, olika längd. */
function Fartstreck({ cx, y, className }: { cx: number; y: number; className: string }) {
  return (
    <g className={className} strokeWidth="2.5" strokeLinecap="round">
      <line x1={cx - 7} y1={y} x2={cx - 7} y2={y + 11} />
      <line x1={cx} y1={y} x2={cx} y2={y + 17} />
      <line x1={cx + 7} y1={y} x2={cx + 7} y2={y + 11} />
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
 * Miniscen i skala 1:1 med huvudbildens x-koordinater. Samma gata, samma
 * riktning, samma boll och samma barn i båda panelerna.
 * variant 'nere' → din bil cy 150, nos y 128, stannar före barnet.
 * variant 'kvar' → din bil cy 118, nos y 96, når fram till barnet.
 */
function MiniGata({ x, y, variant }: { x: number; y: number; variant: 'nere' | 'kvar' }) {
  const nere = variant === 'nere';
  const dinCy = nere ? 150 : 124;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="200" y="0" width="92" height="190" className="fill-diagram-road" />
      <rect x="292" y="0" width="24" height="190" className="fill-diagram-edge" opacity="0.3" />
      <g className="stroke-diagram-edge" strokeWidth="2">
        <line x1="200" y1="0" x2="200" y2="190" />
        <line x1="292" y1="0" x2="292" y2="190" />
      </g>
      <line
        x1="235"
        y1="0"
        x2="235"
        y2="190"
        className="stroke-diagram-marking"
        strokeWidth="2"
        strokeDasharray="12 10"
      />

      {/* Parkerade bilar med en lucka mellan sig, y 62–108 */}
      <Bil cx={281} cy={40} fill="url(#bs-strip)" stroke="stroke-primary-600" />
      <Bil cx={281} cy={130} fill="url(#bs-strip)" stroke="stroke-primary-600" />

      {/* Samma förvarning i båda panelerna */}
      <Boll cx={266} cy={72} r={4.5} />
      <Barn cx={256} cy={84} />

      {!nere && <Fartstreck cx={252} y={150} className="stroke-text-primary" />}

      <Bil
        cx={252}
        cy={dinCy}
        fill="url(#bs-dots)"
        stroke="stroke-attention-600"
        bromsljus={nere}
      />

      {nere ? (
        /* Marginalen som blir kvar: klammer mellan barnets fot och din nos */
        <g className="stroke-progress-600" strokeWidth="2">
          <line x1="196" y1="100" x2="196" y2="128" />
          <line x1="192" y1="100" x2="200" y2="100" />
          <line x1="192" y1="128" x2="200" y2="128" />
        </g>
      ) : (
        <g className="stroke-safety-600" strokeWidth="2" strokeLinecap="round">
          <line x1="245" y1="103" x2="267" y2="103" />
          <line x1="256" y1="105" x2="249" y2="111" />
          <line x1="256" y1="105" x2="263" y2="111" />
          <line x1="256" y1="105" x2="256" y2="113" />
        </g>
      )}
    </g>
  );
}

export function BarnSkolaDiagram() {
  return (
    <svg
      viewBox="0 0 480 1232"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="bs-title bs-desc"
    >
      <title id="bs-title">
        Barn vid skola: förvarningen — en boll och en vält cykel — kommer före barnet
      </title>
      <desc id="bs-desc">
        Vy uppifrån av en lodrät gata utanför en skola, med streckad mittlinje, trottoar och
        skolgård till höger. Din bil, fylld med prickmönster, kör uppåt i det högra körfältet och
        har röda bromsljus tända; en heldragen pil visar att den rör sig och en prickad linje visar
        blicken snett framåt. Längs högerkanten står fyra parkerade bilar, fyllda med diagonala
        ränder, med två luckor mellan sig. Hela trottoarremsan bakom bilraden är täckt av 45-graders
        skraffering: därifrån syns ingenting. Inget barn syns någonstans i gatan. Tre numrerade
        hänvisningar i marginalerna: 1 pekar på en liten boll med kors, som med en heldragen pil
        rullar ut i körbanan ur en lucka i bilraden — den är det som avslöjar barnet; 2 pekar på den
        skrafferade ytan bakom bilraden — den skymda sikten; 3 pekar på en vält cykel som ligger på
        trottoaren vid den andra luckan. En rad under bilden säger att boll och cykel är ritade
        större än skalan för att synas. Längst ned en ruta med två miniscener av samma gata i samma
        skala, med samma boll och samma barn på samma plats. Till vänster har din bil bromsljus
        tända, farten är redan nere, och en grön klammer visar marginalen som blir kvar framför
        barnet, med en grön bock under. Till höger har din bil tre korta fartstreck bakom sig, ingen
        inbromsning, och når fram till barnet, markerat med rött och ett rött kryss under.
      </desc>

      <defs>
        <pattern id="bs-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="bs-strip" patternUnits="userSpaceOnUse" width="8" height="8">
          <path
            d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4"
            className="stroke-primary-600"
            strokeWidth="2"
          />
        </pattern>
        <pattern id="bs-skugga" patternUnits="userSpaceOnUse" width="9" height="9">
          <rect width="9" height="9" className="fill-safety-200" />
          <path d="M 0 9 L 9 0" className="stroke-safety-600" strokeWidth="1.3" />
        </pattern>
        <marker
          id="bs-arrow"
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
          id="bs-arrow-dark"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="10"
          markerHeight="10"
          markerUnits="userSpaceOnUse"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-text-primary" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Barn vid skola — förvarningen syns först
      </text>
      <text x="20" y="48" className="fill-text-secondary text-[14px]">
        Vy uppifrån. Du kör uppåt i högra körfältet.
      </text>

      {/* Teckenförklaring */}
      <g>
        <path
          d="M 20 74 L 48 74"
          className="stroke-text-primary"
          strokeWidth="3"
          markerEnd="url(#bs-arrow-dark)"
        />
        <text x="60" y="79" className="fill-text-secondary text-[14px]">
          Rör sig nu
        </text>
        <rect
          x="220"
          y="67"
          width="26"
          height="15"
          fill="url(#bs-skugga)"
          className="stroke-safety-600"
          strokeWidth="1.2"
        />
        <text x="254" y="79" className="fill-text-secondary text-[14px]">
          Skymd sikt
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
        <text x="60" y="103" className="fill-text-secondary text-[14px]">
          Din blick
        </text>
        <rect
          x="220"
          y="91"
          width="26"
          height="15"
          rx="2"
          fill="url(#bs-dots)"
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
          fill="url(#bs-strip)"
          className="stroke-primary-600"
          strokeWidth="1.5"
        />
        <text x="334" y="103" className="fill-text-secondary text-[14px]">
          Parkerad bil
        </text>

        <g>
          <rect
            x="20"
            y="113"
            width="26"
            height="14"
            rx="2"
            className="fill-surface-base stroke-primary-600"
            strokeWidth="1.5"
          />
          <g className="fill-safety-600">
            <rect x="22.5" y="123" width="6" height="3.5" rx="1" />
            <rect x="37.5" y="123" width="6" height="3.5" rx="1" />
          </g>
        </g>
        <text x="60" y="125" className="fill-text-secondary text-[14px]">
          Bromsljus: farten ned
        </text>
        <Fartstreck cx={247} y={113} className="stroke-text-primary" />
        <text x="268" y="125" className="fill-text-secondary text-[14px]">
          Hög fart
        </text>
      </g>

      {/* ================= Scenen ================= */}
      {/* Gata: körbana x 200–292, trottoar 292–316, staket x 316, skolgård 316–344 */}
      <rect x="200" y="140" width="92" height="630" className="fill-diagram-road" />
      <rect x="292" y="140" width="24" height="630" className="fill-diagram-edge" opacity="0.3" />
      <rect x="316" y="140" width="28" height="630" className="fill-neutral-200" />
      <line
        x1="316"
        y1="140"
        x2="316"
        y2="770"
        className="stroke-text-tertiary"
        strokeWidth="1.5"
        strokeDasharray="5 4"
      />
      <text
        x="330"
        y="620"
        textAnchor="middle"
        transform="rotate(-90 330 620)"
        className="fill-text-secondary text-[14px] font-semibold"
      >
        Skolgård
      </text>
      <g className="stroke-diagram-edge" strokeWidth="2">
        <line x1="200" y1="140" x2="200" y2="770" />
        <line x1="292" y1="140" x2="292" y2="770" />
      </g>
      {/* Mittlinje x 235 */}
      <line
        x1="235"
        y1="140"
        x2="235"
        y2="770"
        className="stroke-diagram-marking"
        strokeWidth="2"
        strokeDasharray="14 12"
      />

      {/* Siktskuggan: efterräknad rektangel över trottoaren, x 292–316, y 178–428 */}
      <rect
        x="292"
        y="178"
        width="24"
        height="250"
        fill="url(#bs-skugga)"
        className="stroke-safety-600"
        strokeWidth="1.4"
      />

      {/* Parkerade bilar, mitt x 281 */}
      <Bil cx={281} cy={200} fill="url(#bs-strip)" stroke="stroke-primary-600" />
      <Bil cx={281} cy={256} fill="url(#bs-strip)" stroke="stroke-primary-600" />
      <Bil cx={281} cy={368} fill="url(#bs-strip)" stroke="stroke-primary-600" />
      <Bil cx={281} cy={480} fill="url(#bs-strip)" stroke="stroke-primary-600" />

      {/* Bollen rullar ut ur luckan y 278–346, mot körbanan */}
      <path
        d="M 284 312 L 273 312"
        className="stroke-text-primary"
        strokeWidth="3"
        markerEnd="url(#bs-arrow-dark)"
      />
      <Boll cx={264} cy={312} />

      {/* Vält cykel på trottoaren vid luckan y 390–458 */}
      <ValtCykel cx={304} cy={444} />

      {/* Din blick: fri sikt till bollen, ingen parkerad bil i vägen */}
      <line
        x1="243"
        y1="614"
        x2="261"
        y2="318"
        className="stroke-attention-600"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="0.5 4.5"
      />

      {/* Din bil: bromsljusen lyser, farten är på väg ned */}
      <Bil cx={252} cy={640} fill="url(#bs-dots)" stroke="stroke-attention-600" bromsljus />
      <path
        d="M 252 612 L 252 574"
        className="stroke-attention-600"
        strokeWidth="3"
        markerEnd="url(#bs-arrow)"
      />

      {/* 1. Bollen */}
      <Callout x={34} y={284} n={1} />
      <text x="52" y="289" className="fill-text-primary text-[15px] font-semibold">
        Bollen
      </text>
      <text x="14" y="310" className="fill-text-secondary text-[14px]">
        En boll som rullar ut
      </text>
      <text x="14" y="326" className="fill-text-secondary text-[14px]">
        betyder ett barn strax
      </text>
      <text x="14" y="342" className="fill-text-secondary text-[14px]">
        efter. Ta ned farten nu,
      </text>
      <text x="14" y="358" className="fill-text-secondary text-[14px]">
        innan barnet syns.
      </text>
      <Pekare x1={170} y1={292} x2={261} y2={310} />

      {/* 2. Den skymda sikten */}
      <Callout x={366} y={190} n={2} />
      <text x="384" y="195" className="fill-text-primary text-[15px] font-semibold">
        Skymd sikt
      </text>
      <text x="348" y="216" className="fill-text-secondary text-[14px]">
        Bakom raden ser
      </text>
      <text x="348" y="232" className="fill-text-secondary text-[14px]">
        du ingenting. Ett
      </text>
      <text x="348" y="248" className="fill-text-secondary text-[14px]">
        barn syns först
      </text>
      <text x="348" y="264" className="fill-text-secondary text-[14px]">
        ute i gatan.
      </text>
      <Pekare x1={344} y1={200} x2={306} y2={214} />

      {/* 3. Den välta cykeln */}
      <Callout x={366} y={420} n={3} />
      <text x="384" y="425" className="fill-text-primary text-[15px] font-semibold">
        Vält cykel
      </text>
      <text x="348" y="446" className="fill-text-secondary text-[14px]">
        Vält cykel vid en
      </text>
      <text x="348" y="462" className="fill-text-secondary text-[14px]">
        lucka i raden.
      </text>
      <text x="348" y="478" className="fill-text-secondary text-[14px]">
        Här kan ett barn
      </text>
      <text x="348" y="494" className="fill-text-secondary text-[14px]">
        kliva ut i gatan,
      </text>
      <text x="348" y="510" className="fill-text-secondary text-[14px]">
        på sidan mot dig.
      </text>
      <Pekare x1={344} y1={436} x2={311} y2={444} />

      {/* Din bil, etikett i vänstermarginalen */}
      <text x="14" y="600" className="fill-text-primary text-[15px] font-semibold">
        Du
      </text>
      <text x="14" y="620" className="fill-text-secondary text-[14px]">
        Farten är redan nere.
      </text>
      <text x="14" y="636" className="fill-text-secondary text-[14px]">
        Bromsljusen lyser.
      </text>
      <Pekare x1={170} y1={622} x2={242} y2={638} />

      {/* Bildens poäng */}
      <text
        x="240"
        y="802"
        textAnchor="middle"
        className="fill-text-primary text-[15px] font-medium"
      >
        Det är bollen som säger till, inte barnet.
      </text>
      <text x="240" y="820" textAnchor="middle" className="fill-text-secondary text-[14px]">
        Farten går ned här — barnet syns inte än.
      </text>
      <text x="240" y="842" textAnchor="middle" className="fill-text-tertiary text-[14px]">
        Boll och cykel är ritade större än skalan för att synas.
      </text>

      {/* ================= Förklaringsruta ================= */}
      <rect
        x="20"
        y="858"
        width="440"
        height="354"
        rx="6"
        className="fill-none stroke-border-default"
        strokeWidth="1.5"
      />
      <text x="34" y="882" className="fill-text-primary text-[15px] font-semibold">
        Om ett barn följer efter bollen:
      </text>
      <line
        x1="240"
        y1="896"
        x2="240"
        y2="1200"
        className="stroke-border-default"
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />

      <text
        x="128"
        y="912"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-semibold"
      >
        Farten nere vid bollen
      </text>
      <MiniGata x={-128} y={924} variant="nere" />
      <text
        x="128"
        y="1138"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-semibold"
      >
        Du hinner stanna
      </text>
      <text x="128" y="1156" textAnchor="middle" className="fill-text-secondary text-[14px]">
        Marginalen finns kvar
      </text>
      <text x="128" y="1172" textAnchor="middle" className="fill-text-secondary text-[14px]">
        framför barnet.
      </text>
      <Check x={128} y={1194} />

      <text
        x="348"
        y="912"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-semibold"
      >
        Farten kvar tills barnet syns
      </text>
      <MiniGata x={92} y={924} variant="kvar" />
      <text
        x="348"
        y="1138"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-semibold"
      >
        Du hinner inte
      </text>
      <text x="348" y="1156" textAnchor="middle" className="fill-text-secondary text-[14px]">
        Barnet är framme innan
      </text>
      <text x="348" y="1172" textAnchor="middle" className="fill-text-secondary text-[14px]">
        bilen har saktat in.
      </text>
      <Cross x={348} y={1194} />
    </svg>
  );
}
