/**
 * Säkerhetsavstånd framåt och bakåt (SPD-03) — press bakifrån.
 *
 * Bildens enda poäng: ligger någon tätt bakom dig är det avståndet FRAMÅT du
 * ökar, inte farten. Luckan framför bilen är din egen tid att reagera, och den
 * är det enda av de två avstånden du styr över.
 *
 * INGA MÅTT. Ingen meter, ingen sekund, ingen multipel och ingen skala står i
 * bilden. De två mellanrummen är ritade som "tätt" respektive "rymligt" och
 * ska läsas mot varandra, inte mätas. Underrubriken säger det uttryckligen.
 *
 * ---- GEOMETRI (högertrafik, vy uppifrån, dukens egna koordinater) ----
 * Vägbanan är x 160–280 och mittlinjen ligger på x 220. Vänster halva
 * (x 160–220) är mötande riktning och står tom hela bilden igenom — inget
 * fordon får hamna där.
 *
 * Alla tre fordonen kör UPPÅT (minskande y). För den som kör uppåt ligger
 * förarens högra sida mot bildens högra kant, alltså är deras körfält
 * x 220–280 med mitten på x 250. Alla tre har därför cx = 250 > 220:
 *   Bilen framför:  (250, 180)  kaross y 158–202
 *   Du:             (250, 400)  kaross y 378–422
 *   Bakomvarande:   (250, 460)  kaross y 438–482
 * Karossbredd 26 ger x 237–263 för var och en — helt inom x 220–280.
 *
 * De två mellanrummen, som är hela bilden:
 *   framåt:  y 202 → 378, alltså 176 enheter (rymligt)
 *   bakåt:   y 422 → 438, alltså 16 enheter (tätt), krysskrafferat
 * Förhållandet är valt för att gå att se, inte för att gå att mäta. Inget
 * mellanrum är översatt till tid eller sträcka någonstans i bilden.
 *
 * Rörelsepilarna ligger vid x 229, alltså i fordonens eget körfält men vid
 * sidan av karosserna (x 237–263), så att ingen pil skär ett fordon:
 *   framförvarande 202→158, du 420→376, bakomvarande 482→440.
 *
 * ---- FÖRKLARINGSRUTAN (efterräknad, inte antagen) ----
 * Två miniscener i scale(0.5) kring cyBase 880, lokala koordinater:
 * Bilen framför står på lokal cy −82 (bakkant −60) i BÅDA panelerna, och den
 * bakkanten är den gemensamma referenslinjen på duken: 880 + 0.5·(−60) = 850.
 *   Panel A (rätt): du på lokal cy 40 → front 18 → lucka framåt 78 lokalt.
 *   Panel B (fel):  du på lokal cy −10 → front −32 → lucka framåt 28 lokalt.
 * Den bakomvarande ligger lika tätt i båda panelerna, 14 lokala enheter bakom
 * din bakkant (A: 62→76, B: 12→26) — pressen bakifrån är oförändrad, det är
 * bara luckan framåt som skiljer. Det är exakt det jämförelsen ska visa.
 *
 * ---- MÖNSTER (ett mönster, en betydelse) ----
 * prickar = din bil, diagonala ränder = andra fordon, krysskraffering = ett
 * avstånd som blivit för kort, grön måttmarkering = luckan du styr över.
 * Varje betydelse bärs av mönster och etikett, aldrig av färg ensam.
 */

type Heading = 'up' | 'down';
const HEADING_DEG: Record<Heading, number> = { up: 0, down: 180 };

interface CarProps {
  cx: number;
  cy: number;
  width: number;
  length: number;
  heading: Heading;
  fill: string;
  stroke: string;
}

/** Bil med fronten uppåt. Karossen upptar exakt (cx ± width/2, cy ± length/2). */
function Car({ cx, cy, width, length, heading, fill, stroke }: CarProps) {
  const hw = width / 2;
  const hl = length / 2;
  const glass = `fill-diagram-marking ${stroke}`;
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${HEADING_DEG[heading]})`}>
      <g className="fill-text-primary">
        <rect x={-hw - 3} y={-hl + 5} width="5" height="9" rx="1.5" />
        <rect x={hw - 2} y={-hl + 5} width="5" height="9" rx="1.5" />
        <rect x={-hw - 3} y={hl - 14} width="5" height="9" rx="1.5" />
        <rect x={hw - 2} y={hl - 14} width="5" height="9" rx="1.5" />
      </g>
      <rect x={-hw} y={-hl} width={width} height={length} rx="4" fill={fill} className={stroke} strokeWidth="2" />
      <rect x={-hw + 5} y={-hl + 6} width={width - 10} height="7" rx="2" className={glass} strokeWidth="1" />
      <rect x={-hw + 5} y={hl - 10} width={width - 10} height="5" rx="2" className={glass} strokeWidth="1" />
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

/** Tunn pekarlinje från etikett till motiv, med punkt i målet. */
function Pointer({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-text-tertiary" strokeWidth="1.5" />
      <circle cx={x2} cy={y2} r="3" className="fill-text-tertiary" />
    </g>
  );
}

/** Lodrät måttmarkering utan tal: luckan du styr över. */
function GapBar({ x, y1, y2, w = 6, sw = 2.5 }: { x: number; y1: number; y2: number; w?: number; sw?: number }) {
  return (
    <g className="stroke-progress-600" strokeWidth={sw} strokeLinecap="round">
      <line x1={x} y1={y1} x2={x} y2={y2} />
      <line x1={x - w} y1={y1} x2={x + w} y2={y1} />
      <line x1={x - w} y1={y2} x2={x + w} y2={y2} />
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
 * Miniscen till förklaringsrutan. Ett körfält sett uppifrån, alla tre bilarna
 * kör uppåt. Bilen framför står på samma lokala plats i båda panelerna, så
 * skillnaden mellan panelerna är enbart luckan framåt.
 */
function MiniScen({ x, y, variant }: { x: number; y: number; variant: 'okar-luckan' | 'okar-farten' }) {
  const roomy = variant === 'okar-luckan';
  const you = roomy ? 40 : -10;
  const youFront = you - 22;
  const youRear = you + 22;
  const follower = youRear + 14 + 22;
  return (
    <g transform={`translate(${x} ${y}) scale(0.45)`}>
      <rect x="-34" y="-140" width="68" height="280" className="fill-diagram-road" />
      <g className="stroke-diagram-edge" strokeWidth="3">
        <line x1="-34" y1="-140" x2="-34" y2="140" />
        <line x1="34" y1="-140" x2="34" y2="140" />
      </g>

      {/* Luckan framåt: rymlig med måttmarkering, eller för kort och krafferad */}
      {roomy ? (
        <GapBar x={48} y1={-60} y2={youFront} w={11} sw={5} />
      ) : (
        <rect x="-22" y="-60" width="44" height={youFront + 60} fill="url(#sav-hatch)" className="stroke-safety-600" strokeWidth="3" />
      )}

      {/* Luckan bakåt: lika tät i båda panelerna */}
      <rect x="-22" y={youRear} width="44" height="14" fill="url(#sav-hatch)" className="stroke-safety-600" strokeWidth="3" />

      {/* Bilen framför — samma läge i båda panelerna */}
      <Car cx={0} cy={-82} width={26} length={44} heading="up" fill="url(#sav-stripes)" stroke="stroke-primary-600" />
      {/* Du */}
      <Car cx={0} cy={you} width={26} length={44} heading="up" fill="url(#sav-dots)" stroke="stroke-attention-600" />
      {/* Den som ligger tätt bakom */}
      <Car cx={0} cy={follower} width={26} length={44} heading="up" fill="url(#sav-stripes)" stroke="stroke-primary-600" />
    </g>
  );
}

export function SakerhetsavstandDiagram() {
  return (
    <svg viewBox="0 0 440 1080" className="w-full max-w-md mx-auto" role="img" aria-labelledby="sav-title sav-desc">
      <title id="sav-title">Säkerhetsavstånd framåt och bakåt</title>
      <desc id="sav-desc">
        Tvåfältig väg sedd uppifrån med streckad mittlinje. Tre bilar kör åt samma håll, uppåt i
        bilden, alla i höger körfält; det vänstra körfältet är tomt. Överst en bil med diagonala
        ränder, bilen framför dig. I mitten din bil, fylld med prickmönster. Direkt bakom din bil
        en tredje bil med diagonala ränder som ligger mycket tätt: mellanrummet mellan er är bara
        en smal remsa, markerad med krysskraffering för att visa att avståndet är för kort.
        Mellanrummet framför din bil är däremot stort och markeras i högermarginalen med en grön
        måttmarkering utan tal. Korta pilar vid sidan av varje bil visar att alla tre rör sig
        framåt. Markering ett pekar på bilen bakom: hur nära den ligger väljer inte du. Markering
        två pekar på måttmarkeringen framåt: luckan framåt är din tid att reagera, och det är den
        du kan öka. Markering tre pekar på din egen bil: farten väljer du, inte den bakomvarande.
        Inga mått anges — inga meter, inga sekunder, inga multiplar; de två mellanrummen ska
        jämföras med varandra, inte mätas. En ruta längst ned visar samma vägsträcka två gånger
        med bilen framför på exakt samma plats i båda panelerna, markerad med en gemensam streckad
        referenslinje. I vänstra panelen håller du farten och låter luckan framåt växa, markerat
        med en grön måttmarkering och en bock. I högra panelen ökar du farten i stället, luckan
        framåt krymper till en krysskrafferad remsa, markerat med ett kryss. I båda panelerna
        ligger bilen bakom exakt lika tätt: att öka farten flyttar inte den som ligger bakom, det
        tar bara bort ditt eget utrymme framåt.
      </desc>

      <defs>
        <pattern id="sav-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="sav-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="2" />
        </pattern>
        <pattern id="sav-hatch" patternUnits="userSpaceOnUse" width="10" height="10">
          <path d="M0,10 l10,-10 M0,0 l10,10" className="stroke-safety-600" strokeWidth="1.3" />
        </pattern>
        <marker id="sav-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary-600" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Någon ligger tätt bakom dig
      </text>
      <text x="20" y="48" className="fill-text-secondary text-[14px]">
        Mellanrummen ska jämföras med varandra — inga mått anges
      </text>

      {/* Vägbanan: x 160–280, mittlinje x 220, vänster halva tom */}
      <rect x="160" y="92" width="120" height="448" className="fill-diagram-road" />
      <g className="stroke-diagram-edge" strokeWidth="2">
        <line x1="160" y1="92" x2="160" y2="540" />
        <line x1="280" y1="92" x2="280" y2="540" />
      </g>
      <line x1="220" y1="92" x2="220" y2="540" className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="16 12" />

      {/* Teckenförklaring för linjespråket, i vänstermarginalen */}
      <line x1="20" y1="116" x2="44" y2="116" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#sav-arrow)" />
      <text x="56" y="121" className="fill-text-secondary text-[14px]">
        Rör sig nu
      </text>

      {/* Rörelsepilar vid x 229 — i eget körfält, vid sidan av karosserna */}
      <g className="stroke-primary-600" strokeWidth="3">
        <line x1="229" y1="202" x2="229" y2="158" markerEnd="url(#sav-arrow)" />
        <line x1="229" y1="420" x2="229" y2="376" markerEnd="url(#sav-arrow)" />
        <line x1="229" y1="482" x2="229" y2="440" markerEnd="url(#sav-arrow)" />
      </g>

      {/* Luckan bakåt: för kort */}
      <rect x="228" y="422" width="44" height="16" fill="url(#sav-hatch)" className="stroke-safety-600" strokeWidth="1.5" />

      {/* Luckan framåt: måttmarkering utan tal, i högermarginalen */}
      <GapBar x={292} y1={202} y2={378} />

      {/* Fordonen */}
      <Car cx={250} cy={180} width={26} length={44} heading="up" fill="url(#sav-stripes)" stroke="stroke-primary-600" />
      <Car cx={250} cy={400} width={26} length={44} heading="up" fill="url(#sav-dots)" stroke="stroke-attention-600" />
      <Car cx={250} cy={460} width={26} length={44} heading="up" fill="url(#sav-stripes)" stroke="stroke-primary-600" />

      {/* Etikett: bilen framför */}
      <text x="296" y="150" className="fill-text-primary text-[14px] font-semibold">
        Bilen framför
      </text>
      <text x="296" y="168" className="fill-text-secondary text-[14px]">
        kör åt samma håll
      </text>
      <Pointer x1={292} y1={162} x2={266} y2={172} />

      {/* Etikett: din bil */}
      <text x="122" y="414" className="fill-text-primary text-[14px] font-semibold">
        Du
      </text>
      <Pointer x1={146} y1={410} x2={236} y2={414} />

      {/* 2. Luckan framåt */}
      <Callout x={320} y={250} n={2} />
      <text x="336" y="255" className="fill-text-primary text-[14px] font-semibold">
        Luckan
      </text>
      <text x="300" y="275" className="fill-text-secondary text-[14px]">
        framåt är din tid
      </text>
      <text x="300" y="293" className="fill-text-secondary text-[14px]">
        att reagera — och
      </text>
      <text x="300" y="311" className="fill-text-secondary text-[14px]">
        det du kan öka
      </text>
      <Pointer x1={309} y1={250} x2={294} y2={250} />

      {/* 3. Din fart */}
      <Callout x={26} y={330} n={3} />
      <text x="42" y="335" className="fill-text-primary text-[14px] font-semibold">
        Din fart
      </text>
      <text x="16" y="355" className="fill-text-secondary text-[14px]">
        väljer du — inte
      </text>
      <text x="16" y="373" className="fill-text-secondary text-[14px]">
        den bakomvarande
      </text>
      <Pointer x1={150} y1={360} x2={236} y2={386} />

      {/* 1. Den som ligger tätt bakom */}
      <Callout x={26} y={470} n={1} />
      <text x="42" y="475" className="fill-text-primary text-[14px] font-semibold">
        Tätt bakom
      </text>
      <text x="16" y="495" className="fill-text-secondary text-[14px]">
        hur nära de ligger
      </text>
      <text x="16" y="513" className="fill-text-secondary text-[14px]">
        väljer inte du
      </text>
      <Pointer x1={150} y1={500} x2={234} y2={466} />

      {/* Vad bilden lär ut */}
      <text x="220" y="580" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        Ligger någon tätt bakom: öka avståndet framåt,
      </text>
      <text x="220" y="598" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        inte farten.
      </text>
      <text x="220" y="624" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Avståndet framför bilen är din egen tid att reagera, oavsett vad
      </text>
      <text x="220" y="642" textAnchor="middle" className="fill-text-secondary text-[13px]">
        som händer bakom. Med större lucka framåt kan du bromsa mjukt
      </text>
      <text x="220" y="660" textAnchor="middle" className="fill-text-secondary text-[13px]">
        i stället för hårt — och då får även den bakom mer tid.
      </text>

      {/* Mönsterförklaring, två rader */}
      <rect x="30" y="686" width="22" height="14" rx="2" fill="url(#sav-dots)" className="stroke-attention-600" strokeWidth="1.5" />
      <text x="58" y="698" className="fill-text-tertiary text-[13px]">
        Du
      </text>
      <rect x="120" y="686" width="22" height="14" rx="2" fill="url(#sav-stripes)" className="stroke-primary-600" strokeWidth="1.5" />
      <text x="148" y="698" className="fill-text-tertiary text-[13px]">
        Annat fordon
      </text>
      <rect x="30" y="710" width="22" height="14" rx="2" fill="url(#sav-hatch)" className="stroke-safety-600" strokeWidth="1.5" />
      <text x="58" y="722" className="fill-text-tertiary text-[13px]">
        För kort avstånd
      </text>
      <GapBar x={186} y1={710} y2={724} w={5} sw={2} />
      <text x="200" y="722" className="fill-text-tertiary text-[13px]">
        Luckan du styr över
      </text>

      {/* ---- Förklaringsruta ---- */}
      <rect x="20" y="748" width="400" height="312" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="34" y="772" className="fill-text-primary text-[14px] font-semibold">
        Två sätt att svara på pressen bakifrån:
      </text>
      <line x1="220" y1="788" x2="220" y2="1044" className="stroke-border-default" strokeWidth="1.5" strokeDasharray="6 4" />

      {/* Gemensam referenslinje: bilen framför står lika i båda panelerna */}
      <text x="26" y="842" className="fill-text-secondary text-[14px]">
        Bilen
      </text>
      <text x="26" y="858" className="fill-text-secondary text-[14px]">
        framför
      </text>
      <line
        x1="84"
        y1="850"
        x2="406"
        y2="850"
        className="stroke-text-tertiary"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="0.5 5"
      />

      <MiniScen x={118} y={880} variant="okar-luckan" />
      <MiniScen x={322} y={880} variant="okar-farten" />

      <text x="118" y="968" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Du håller farten
      </text>
      <text x="118" y="986" textAnchor="middle" className="fill-text-secondary text-[14px]">
        luckan framåt växer
      </text>
      <text x="118" y="1004" textAnchor="middle" className="fill-text-secondary text-[14px]">
        du kan bromsa mjukt
      </text>
      <Check x={118} y={1030} />

      <text x="322" y="968" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Du ökar farten
      </text>
      <text x="322" y="986" textAnchor="middle" className="fill-text-secondary text-[14px]">
        luckan framåt krymper
      </text>
      <text x="322" y="1004" textAnchor="middle" className="fill-text-secondary text-[14px]">
        den bakom följer med
      </text>
      <Cross x={322} y={1030} />
    </svg>
  );
}
