/**
 * Vänstersväng i korsning (INT-04), vy uppifrån, tätort. Bilden lär ut en
 * enda sak: vilket körfält svängen ska sluta i. Rätt sväng lämnar korsningen
 * i högra körfältet på den nya vägen, räknat från den vägens egen mittlinje.
 * En skuggad variant visar den sväng som skär hörnet och slutar i mötande
 * körfält.
 *
 * Regelläge: bilden påstår bara det uppdraget ger — placering nära körbanans
 * mitt, tecken i god tid före inbromsningen, och skyldigheten att förvissa
 * sig om att svängen kan ske utan hinder för mötande och för dem på körbanan
 * man kör in på. Ingen "företrädesrätt" nämns, och tecknet sägs inte ge någon
 * rätt att svänga.
 *
 * GEOMETRI (högertrafik, vy uppifrån), i scenens koordinater. Scenen ligger i
 * en grupp förskjuten 64 px nedåt; ingen koordinat inne i gruppen är flyttad.
 *
 * Vägarna:
 * - Storgatan går lodrätt. Körbanan är x 140–260 med mittlinjen på x 200.
 *   Körfältet norrut (uppåt i bilden) är x 200–260, körfältet söderut
 *   x 140–200.
 * - Tvärgatan går vågrätt. Körbanan är y 310–430 med mittlinjen på y 370.
 *   Den som kör västerut (minskande x) har sin högra sida uppåt i bilden,
 *   alltså är körfältet västerut y 310–370. Körfältet österut är y 370–430.
 * - Korsningsytan är x 140–260, y 310–430.
 *
 * Fordonen, kontrollerade mot mittlinjerna:
 * - Din bil före svängen kör uppåt (minskande y). Högra sidan är bildens
 *   högra, alltså körfältet x 200–260. Mitt på x 216, kaross x 202–230,
 *   y 498–542 — i eget körfält, intill mittlinjen på x 200, som en
 *   vänstersväng ska ligga.
 * - Din bil efter svängen kör västerut (minskande x). Högra sidan är bildens
 *   övre, alltså körfältet y 310–370. Mitt på y 340, kaross y 326–354,
 *   x 64–108 — inne i rätt körfält, med 16 px till kanten y 310 och 16 px
 *   till mittlinjen y 370.
 * - Den skuggade felvarianten kör också västerut men har mitt på y 400,
 *   kaross y 386–414 — helt inne i körfältet österut, alltså i mötande
 *   körfält. Markerad med kryss, streckad kontur och skraffering.
 * - Den mötande bilen på Storgatan kör nedåt (ökande y). Högra sidan är
 *   bildens vänstra, alltså körfältet x 140–200. Mitt på x 170, kaross
 *   x 156–184, y 168–212.
 *
 * Svängbanorna, samplade i 76 punkter var och kontrollerade mot båda
 * mittlinjerna (skript, inte uppskattning):
 * - RÄTT: rakt fram till y 416, därefter cirkelbåge med radie 76 kring
 *   (140, 416) till (140, 340), sedan rakt västerut till x 118. Noll punkter
 *   utanför rätt körfält. Banan korsar y 370 vid x 200,5 och x 200 vid
 *   y 369,4 — den passerar alltså korsningens mittpunkt (200, 370) på
 *   utsidan och har noll punkter i den sydvästra kvadranten (x < 200 och
 *   y > 370).
 * - FEL: rakt fram till y 470, därefter båge med radie 70 kring (146, 470)
 *   till (146, 400), sedan västerut. 25 punkter i den sydvästra kvadranten
 *   (den skär innanför korsningens mitt) och 13 punkter i fel körfält på
 *   Tvärgatan. Slutar på y 400, alltså 30 px söder om mittlinjen y 370.
 *
 * Mönster (inget mönster betyder två saker): prickar = din bil, snedränder =
 * andra fordon, korsskraffering = det körfält som är fel för dig.
 */

type Heading = 'up' | 'right' | 'down' | 'left';
const HEADING_DEG: Record<Heading, number> = { up: 0, right: 90, down: 180, left: -90 };

interface CarProps {
  cx: number;
  cy: number;
  width: number;
  length: number;
  heading: Heading;
  fill: string;
  stroke: string;
  leftBlinker?: boolean;
  /** Streckad kontur: fordonet visar ett felaktigt alternativ, inte ett verkligt läge. */
  dashed?: boolean;
}

/**
 * Bil ritad med fronten uppåt och sedan vriden efter färdriktningen.
 * Karossen upptar exakt (cx ± width/2, cy ± length/2); hjulen sticker ut 3 px.
 */
function Car({ cx, cy, width, length, heading, fill, stroke, leftBlinker, dashed }: CarProps) {
  const hw = width / 2;
  const hl = length / 2;
  const glass = `fill-diagram-marking ${stroke}`;
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${HEADING_DEG[heading]})`}>
      <g className="fill-text-primary">
        <rect x={-hw - 3} y={-hl + 5} width="5" height="10" rx="1.5" />
        <rect x={hw - 2} y={-hl + 5} width="5" height="10" rx="1.5" />
        <rect x={-hw - 3} y={hl - 15} width="5" height="10" rx="1.5" />
        <rect x={hw - 2} y={hl - 15} width="5" height="10" rx="1.5" />
      </g>
      <rect x={-hw} y={-hl} width={width} height={length} rx="4" className="fill-diagram-marking" />
      <rect
        x={-hw}
        y={-hl}
        width={width}
        height={length}
        rx="4"
        fill={fill}
        className={stroke}
        strokeWidth="2"
        strokeDasharray={dashed ? '6 4' : undefined}
      />
      <rect
        x={-hw + 5}
        y={-hl + 7}
        width={width - 10}
        height="8"
        rx="2"
        className={glass}
        strokeWidth="1"
      />
      <rect
        x={-hw + 5}
        y={hl - 11}
        width={width - 10}
        height="5"
        rx="2"
        className={glass}
        strokeWidth="1"
      />
      {/* Blinkers vänster: gula hörn på bilens vänstra sida, ritade innanför
          karossen så att bilen inte ser ut att ligga över mittlinjen. */}
      {leftBlinker && (
        <g className="fill-attention-600 stroke-text-primary" strokeWidth="0.8">
          <polygon points={`${-hw + 1},${-hl + 1} ${-hw + 9},${-hl + 1} ${-hw + 1},${-hl + 9}`} />
          <polygon points={`${-hw + 1},${hl - 1} ${-hw + 9},${hl - 1} ${-hw + 1},${hl - 9}`} />
        </g>
      )}
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

/** Tunn pekarlinje från en etikett till det den syftar på, med en punkt i målet. */
function Pointer({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-text-tertiary" strokeWidth="1.5" />
      <circle cx={x2} cy={y2} r="3" className="fill-text-tertiary" />
    </g>
  );
}

/** Bock på vit botten, så att den syns även ovanpå vägbanan. */
function Check({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r="13"
        className="fill-surface-base stroke-progress-600"
        strokeWidth="1.5"
      />
      <path
        d={`M ${x - 6} ${y} l 4 5 l 9 -10`}
        className="fill-none stroke-progress-600"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/** Kryss på vit botten. */
function Cross({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r="13"
        className="fill-surface-base stroke-safety-600"
        strokeWidth="1.5"
      />
      <path
        d={`M ${x - 6} ${y - 6} L ${x + 6} ${y + 6} M ${x + 6} ${y - 6} L ${x - 6} ${y + 6}`}
        className="stroke-safety-600"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </g>
  );
}

/**
 * Miniscen till förklaringsrutan: Tvärgatan sedd uppifrån, i skala 0,6.
 * Origo mitt på körbanan. Mittlinjen ligger på y 0, körfältet västerut på
 * y -50–0 (uppåt i bilden är höger sida för den som kör västerut) och
 * körfältet österut på y 0–50.
 * - variant 'ratt': din bil kör västerut med mitt på y -25, alltså i sitt
 *   eget körfält; den andra bilen kör österut med mitt på y 25.
 * - variant 'fel': din bil kör västerut med mitt på y 25 — i körfältet
 *   österut — och möter samma bil framifrån.
 */
function MiniUtfart({ x, y, variant }: { x: number; y: number; variant: 'ratt' | 'fel' }) {
  const ratt = variant === 'ratt';
  return (
    <g transform={`translate(${x} ${y}) scale(0.6)`}>
      <rect x="-85" y="-50" width="170" height="100" className="fill-diagram-road" />
      <g className="stroke-diagram-edge" strokeWidth="3">
        <line x1="-85" y1="-50" x2="85" y2="-50" />
        <line x1="-85" y1="50" x2="85" y2="50" />
      </g>
      <line
        x1="-85"
        y1="0"
        x2="85"
        y2="0"
        className="stroke-diagram-marking"
        strokeWidth="3"
        strokeDasharray="14 12"
      />

      {/* Den andra bilen kör österut i körfältet y 0–50 */}
      <Car
        cx={-45}
        cy={25}
        width={28}
        length={44}
        heading="right"
        fill="url(#int04-stripes)"
        stroke="stroke-primary-600"
      />
      <line
        x1="-20"
        y1="25"
        x2="4"
        y2="25"
        className="stroke-primary-600"
        strokeWidth="4"
        markerEnd="url(#int04-arrow-other)"
      />

      {/* Din bil kör västerut */}
      <Car
        cx={ratt ? 30 : 46}
        cy={ratt ? -25 : 25}
        width={28}
        length={44}
        heading="left"
        fill="url(#int04-dots)"
        stroke={ratt ? 'stroke-attention-600' : 'stroke-safety-600'}
        dashed={!ratt}
      />
      <line
        x1={ratt ? 5 : 22}
        y1={ratt ? -25 : 25}
        x2={ratt ? -30 : 14}
        y2={ratt ? -25 : 25}
        className={ratt ? 'stroke-attention-600' : 'stroke-safety-600'}
        strokeWidth="4"
        markerEnd={ratt ? 'url(#int04-arrow-plan)' : 'url(#int04-arrow-wrong)'}
      />
    </g>
  );
}

export function SvangIKorsningDiagram() {
  return (
    <svg
      viewBox="0 0 400 1092"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="int04-title int04-desc"
    >
      <title id="int04-title">
        Vänstersväng i korsning: lämna korsningen i högra körfältet på den nya vägen
      </title>
      <desc id="int04-desc">
        Vy uppifrån över en fyrvägskorsning i tätort med ett körfält i vardera riktningen på båda
        vägarna. Storgatan går lodrätt genom bilden, Tvärgatan vågrätt, båda med streckad vit
        mittlinje. Din bil, fylld med prickmönster och blå kontur, kör uppåt i bilden i sitt eget
        körfält till höger om Storgatans mittlinje, ligger nära körbanans mitt och blinkar vänster
        med gula trianglar på vänster sida. En streckad blå pil visar svängen: den går fram i
        korsningen, runt korsningens mittpunkt, och slutar i den övre halvan av Tvärgatan, alltså i
        högra körfältet för den som kör västerut. Där står din bil igen efter svängen, i samma
        prickmönster, märkt med en grön bock. Under den visar en skuggad bil med streckad röd kontur
        och en streckad röd pil det felaktiga alternativet: en sväng som skär hörnet och slutar i
        den nedre halvan av Tvärgatan, som är körfältet för mötande trafik. Det körfältet är
        markerat med korsskraffering och den skuggade bilen är märkt med ett rött kryss. Markering 1
        pekar på din bil före svängen: tecknet ges i god tid, före inbromsningen, inte samtidigt som
        ratten vrids. Markering 2 pekar på en mötande bil, fylld med snedränder, som kör nedåt i
        bilden i sitt eget körfält på Storgatan: du måste förvissa dig om att svängen kan ske utan
        hinder för den. Markering 3 pekar på bilen efter svängen: rätt körfält är det som ligger
        höger om Tvärgatans mittlinje sett åt väster. En teckenförklaring skiljer på heldragen pil,
        rör sig nu, streckad blå pil, din väg, och streckad röd pil, fel väg. Längst ned en ruta med
        två miniscener av Tvärgatan sedd uppifrån: i den vänstra kör din bil västerut i övre
        körfältet och den mötande bilen österut i det nedre, så att de möts på var sin sida av
        mittlinjen, markerat med en bock; i den högra kör din bil västerut i det nedre körfältet och
        möter samma bil framifrån i dess körfält, markerat med ett kryss.
      </desc>

      <defs>
        <pattern id="int04-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="int04-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path
            d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4"
            className="stroke-primary-600"
            strokeWidth="2"
          />
        </pattern>
        {/* Korsskraffering: det körfält som är fel för dig. Skild från de enkla
            snedränder som betyder "annat fordon". */}
        <pattern id="int04-conflict" patternUnits="userSpaceOnUse" width="14" height="14">
          <path d="M 0 0 L 14 14 M 14 0 L 0 14" className="stroke-safety-600" strokeWidth="1.2" />
        </pattern>
        <marker
          id="int04-arrow-other"
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
          id="int04-arrow-plan"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-attention-600" />
        </marker>
        <marker
          id="int04-arrow-wrong"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-safety-600" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Vänstersväng i korsning
      </text>
      <text x="20" y="48" className="fill-text-secondary text-[14px]">
        Vy uppifrån. Du kör uppåt i bilden och svänger vänster.
      </text>

      <g transform="translate(0 64)">
        {/* Vägbanor */}
        <rect x="140" y="0" width="120" height="620" className="fill-diagram-road" />
        <rect x="0" y="310" width="400" height="120" className="fill-diagram-road" />

        {/* Vägbanans ytterkanter */}
        <g className="stroke-diagram-edge" strokeWidth="1.5">
          <line x1="140" y1="0" x2="140" y2="310" />
          <line x1="140" y1="430" x2="140" y2="620" />
          <line x1="260" y1="0" x2="260" y2="310" />
          <line x1="260" y1="430" x2="260" y2="620" />
          <line x1="0" y1="310" x2="140" y2="310" />
          <line x1="260" y1="310" x2="400" y2="310" />
          <line x1="0" y1="430" x2="140" y2="430" />
          <line x1="260" y1="430" x2="400" y2="430" />
        </g>

        {/* Mittlinjer. Storgatan x=200, Tvärgatan y=370. */}
        <g className="stroke-diagram-marking" strokeWidth="3" strokeDasharray="16 12">
          <line x1="200" y1="0" x2="200" y2="306" />
          <line x1="200" y1="434" x2="200" y2="620" />
          <line x1="0" y1="370" x2="136" y2="370" />
          <line x1="264" y1="370" x2="400" y2="370" />
        </g>

        {/* Vägnamn — det enda som får ligga på vägbanan */}
        <text
          x="170"
          y="600"
          textAnchor="middle"
          className="fill-diagram-marking text-[14px] font-semibold"
        >
          Storgatan
        </text>
        <text
          x="330"
          y="332"
          textAnchor="middle"
          className="fill-diagram-marking text-[14px] font-semibold"
        >
          Tvärgatan
        </text>

        {/* Fel körfält för dig: Tvärgatans körfält österut, y 372–428 */}
        <rect
          x="0"
          y="372"
          width="138"
          height="56"
          fill="url(#int04-conflict)"
          className="stroke-safety-600"
          strokeWidth="1.5"
        />

        {/* Teckenförklaring, i den fria marginalen uppe till höger */}
        <g>
          <line
            x1="268"
            y1="20"
            x2="294"
            y2="20"
            className="stroke-primary-600"
            strokeWidth="3"
            markerEnd="url(#int04-arrow-other)"
          />
          <text x="300" y="25" className="fill-text-secondary text-[14px]">
            Rör sig nu
          </text>
          <line
            x1="268"
            y1="46"
            x2="294"
            y2="46"
            className="stroke-attention-600"
            strokeWidth="3"
            strokeDasharray="8 6"
            markerEnd="url(#int04-arrow-plan)"
          />
          <text x="300" y="51" className="fill-text-secondary text-[14px]">
            Din väg
          </text>
          <line
            x1="268"
            y1="72"
            x2="294"
            y2="72"
            className="stroke-safety-600"
            strokeWidth="3"
            strokeDasharray="8 6"
            markerEnd="url(#int04-arrow-wrong)"
          />
          <text x="300" y="77" className="fill-text-secondary text-[14px]">
            Fel väg
          </text>
        </g>

        {/* 2. Mötande bil på Storgatan: kör nedåt i körfältet x 140–200 */}
        <Car
          cx={170}
          cy={190}
          width={28}
          length={44}
          heading="down"
          fill="url(#int04-stripes)"
          stroke="stroke-primary-600"
        />
        <line
          x1="170"
          y1="218"
          x2="170"
          y2="272"
          className="stroke-primary-600"
          strokeWidth="3"
          markerEnd="url(#int04-arrow-other)"
        />

        <Callout x={20} y={118} n={2} />
        <text x="36" y="123" className="fill-text-primary text-[14px] font-semibold">
          Mötande
        </text>
        <text x="8" y="142" className="fill-text-secondary text-[14px]">
          du måste förvissa
        </text>
        <text x="8" y="158" className="fill-text-secondary text-[14px]">
          dig om att svängen
        </text>
        <text x="8" y="174" className="fill-text-secondary text-[14px]">
          går utan hinder
        </text>
        <Pointer x1={126} y1={182} x2={154} y2={196} />

        {/* Fel sväng: skär hörnet, slutar i mötande körfält på Tvärgatan */}
        <path
          d="M 216 500 L 216 470 A 70 70 0 0 0 146 400 L 118 400"
          className="fill-none stroke-safety-600"
          strokeWidth="3"
          strokeDasharray="10 8"
          markerEnd="url(#int04-arrow-wrong)"
        />

        {/* Rätt sväng: fram i korsningen, runt mittpunkten, ut i körfältet y 310–370 */}
        <path
          d="M 216 500 L 216 416 A 76 76 0 0 0 140 340 L 118 340"
          className="fill-none stroke-attention-600"
          strokeWidth="3"
          strokeDasharray="10 8"
          markerEnd="url(#int04-arrow-plan)"
        />

        {/* Din bil före svängen: eget körfält, nära körbanans mitt, blinkar vänster */}
        <Car
          cx={216}
          cy={520}
          width={28}
          length={44}
          heading="up"
          fill="url(#int04-dots)"
          stroke="stroke-attention-600"
          leftBlinker
        />

        {/* Din bil efter svängen: rätt körfält, y 326–354 */}
        <Car
          cx={86}
          cy={340}
          width={28}
          length={44}
          heading="left"
          fill="url(#int04-dots)"
          stroke="stroke-attention-600"
        />
        <Check x={30} y={340} />

        {/* Felvarianten: svängen skär hörnet, kaross y 386–414 */}
        <Car
          cx={86}
          cy={400}
          width={28}
          length={44}
          heading="left"
          fill="url(#int04-dots)"
          stroke="stroke-safety-600"
          dashed
        />
        <Cross x={30} y={400} />

        {/* 3. Rätt körfält vid utfarten */}
        <Callout x={20} y={240} n={3} />
        <text x="36" y="245" className="fill-text-primary text-[14px] font-semibold">
          Rätt körfält
        </text>
        <text x="8" y="264" className="fill-text-secondary text-[14px]">
          höger om
        </text>
        <text x="8" y="280" className="fill-text-secondary text-[14px]">
          mittlinjen,
        </text>
        <text x="8" y="296" className="fill-text-secondary text-[14px]">
          sett västerut
        </text>
        <Pointer x1={124} y1={282} x2={100} y2={324} />

        {/* Felet, i marginalen under Tvärgatan */}
        <text x="8" y="462" className="fill-text-primary text-[14px] font-semibold">
          Fel: svängen skär
        </text>
        <text x="8" y="478" className="fill-text-secondary text-[14px]">
          hörnet och slutar
        </text>
        <text x="8" y="494" className="fill-text-secondary text-[14px]">
          i mötande körfält
        </text>
        <Pointer x1={70} y1={450} x2={80} y2={416} />

        {/* Placeringen före svängen */}
        <text x="8" y="546" className="fill-text-primary text-[14px] font-semibold">
          Nära körbanans
        </text>
        <text x="8" y="562" className="fill-text-primary text-[14px] font-semibold">
          mitt före svängen
        </text>
        <Pointer x1={126} y1={554} x2={198} y2={532} />

        {/* 1. Tecknet */}
        <Callout x={276} y={478} n={1} />
        <text x="292" y="483" className="fill-text-primary text-[14px] font-semibold">
          Tecken
        </text>
        <text x="266" y="502" className="fill-text-secondary text-[14px]">
          i god tid, före
        </text>
        <text x="266" y="518" className="fill-text-secondary text-[14px]">
          inbromsningen —
        </text>
        <text x="266" y="534" className="fill-text-secondary text-[14px]">
          inte samtidigt
        </text>
        <text x="266" y="550" className="fill-text-secondary text-[14px]">
          som du vrider
        </text>
        <text x="266" y="566" className="fill-text-secondary text-[14px]">
          ratten
        </text>
        <Pointer x1={264} y1={490} x2={232} y2={506} />
      </g>

      {/* Mönsterförklaring */}
      <g>
        <rect
          x="20"
          y="700"
          width="22"
          height="14"
          rx="2"
          fill="url(#int04-dots)"
          className="stroke-attention-600"
          strokeWidth="1.5"
        />
        <text x="48" y="712" className="fill-text-tertiary text-[14px]">
          Du
        </text>
        <rect
          x="86"
          y="700"
          width="22"
          height="14"
          rx="2"
          fill="url(#int04-stripes)"
          className="stroke-primary-600"
          strokeWidth="1.5"
        />
        <text x="114" y="712" className="fill-text-tertiary text-[14px]">
          Andra fordon
        </text>
        <rect
          x="216"
          y="700"
          width="22"
          height="14"
          rx="2"
          fill="url(#int04-conflict)"
          className="stroke-safety-600"
          strokeWidth="1.5"
        />
        <text x="244" y="712" className="fill-text-tertiary text-[14px]">
          Fel körfält för dig
        </text>
      </g>

      {/* Vad bilden lär ut, i ord */}
      <text x="20" y="748" className="fill-text-primary text-[14px] font-semibold">
        Nära körbanans mitt före svängen, tecken i god tid.
      </text>
      <text x="20" y="770" className="fill-text-secondary text-[14px]">
        Du måste förvissa dig om att svängen kan ske utan hinder
      </text>
      <text x="20" y="786" className="fill-text-secondary text-[14px]">
        för mötande och för dem på körbanan du kör in på.
      </text>
      <text x="20" y="802" className="fill-text-secondary text-[14px]">
        Tecknet ger dig ingen rätt att svänga.
      </text>
      <text x="20" y="830" className="fill-text-primary text-[14px] font-semibold">
        Lämna korsningen i högra körfältet på den nya vägen,
      </text>
      <text x="20" y="846" className="fill-text-primary text-[14px] font-semibold">
        räknat från den vägens egen mittlinje.
      </text>

      {/* Förklaringsruta: vad fel körfält efter svängen betyder */}
      <rect
        x="20"
        y="864"
        width="360"
        height="212"
        rx="6"
        className="fill-none stroke-border-default"
        strokeWidth="1.5"
      />
      <text x="34" y="888" className="fill-text-primary text-[14px] font-semibold">
        Om svängen slutar i fel körfält:
      </text>
      <line
        x1="200"
        y1="900"
        x2="200"
        y2="1066"
        className="stroke-border-default"
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />

      <text x="104" y="914" textAnchor="middle" className="fill-text-tertiary text-[14px]">
        Tvärgatan
      </text>
      <MiniUtfart x={104} y={952} variant="ratt" />
      <text
        x="104"
        y="1002"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-semibold"
      >
        Rätt körfält
      </text>
      <text x="104" y="1020" textAnchor="middle" className="fill-text-secondary text-[14px]">
        ni möts på var sin
      </text>
      <text x="104" y="1036" textAnchor="middle" className="fill-text-secondary text-[14px]">
        sida av mittlinjen
      </text>
      <Check x={104} y={1058} />

      <text x="290" y="914" textAnchor="middle" className="fill-text-tertiary text-[14px]">
        Tvärgatan
      </text>
      <MiniUtfart x={290} y={952} variant="fel" />
      <text
        x="290"
        y="1002"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-semibold"
      >
        Fel körfält
      </text>
      <text x="290" y="1020" textAnchor="middle" className="fill-text-secondary text-[14px]">
        du möter trafiken
      </text>
      <text x="290" y="1036" textAnchor="middle" className="fill-text-secondary text-[14px]">
        framifrån
      </text>
      <Cross x={290} y={1058} />
    </svg>
  );
}
