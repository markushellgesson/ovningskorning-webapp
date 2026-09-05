/**
 * Möte vid hinder på smal väg (RUR-03) — vem som ska stanna, och när.
 *
 * Bilden lär ut en sak: den som har hindret på sin sida ska stanna, om det
 * behövs för att den mötande ska kunna passera. Plikten är villkorad — den
 * gäller när utrymmet inte räcker — och den formuleras genomgående som en
 * plikt som åligger föraren.
 *
 * ORDVAL: ordet "väja" och dess sammansättningar används inte i den här
 * filen (utom i den här meningen, som förklarar varför). Situationen handlar
 * om att stanna vid behov, och att låna ett annat ord för det skulle lära ut
 * fel regel. Bilden säger heller aldrig att någon "har företräde": den som
 * tror sig ha företräde slutar titta.
 *
 * GEOMETRI (högertrafik, vy uppifrån). Alla koordinater är dukens egna;
 * scenerna ligger inte i någon förskjuten grupp. Två fall staplade på
 * varandra, båda med samma vägbana:
 *
 *   Vägbanan är x 178–262. Vägens mitt ligger på x 220.
 *   - Elevens bil kör UPPÅT (minskande y). För den som kör uppåt är förarens
 *     högra sida bildens högra, alltså är elevens halva x 220–262 och bilen
 *     ligger på x 242 i båda fallen (fall 1: y 320, fall 2: y 676).
 *   - Den mötande kör NEDÅT (ökande y). För den som kör nedåt är förarens
 *     högra sida bildens vänstra, alltså är dess halva x 178–220 och bilen
 *     ligger på x 198 i båda fallen (fall 1: y 124, fall 2: y 476).
 *
 *   FALL 1 — hindret på DIN sida: hindret ligger på x 246, alltså i elevens
 *   egen halva (x 220–262). Därför är det eleven som ska stanna vid behov.
 *   Den krysskrafferade ytan x 178–220, y 168–212 ligger rakt bredvid
 *   hindret, i den mötandes halva: det utrymme eleven skulle behöva låna för
 *   att komma förbi. Den mötandes pil och elevens streckade väg pekar mot
 *   samma yta från var sitt håll.
 *
 *   FALL 2 — hindret på DEN MÖTANDES sida: hindret ligger på x 194, alltså i
 *   den mötandes halva (x 178–220). Därför är det den mötande som ska stanna
 *   vid behov. Här ritas ingen krysskrafferad yta: eleven kör lagligt i sin
 *   egen halva, och en röd yta under den egna vägen skulle läsas som en
 *   varning för det eleven faktiskt ska göra.
 *
 *   Kontrollen mot mitten (x 220): hindret ligger på x 246 i fall 1 och
 *   x 194 i fall 2. Etiketten om att stanna sitter i fall 1 på elevens bil
 *   (x 242, samma sida som hindret) och i fall 2 på den mötande (x 198,
 *   samma sida som hindret). Fordonet med hindret på sin sida och etiketten
 *   om att stanna hör alltid ihop.
 *
 * MÖNSTER (varje mönster betyder en enda sak i den här bilden):
 * prickar = elevens bil, diagonala ränder = den mötande, vågräta streck =
 * hindret, krysskraffering = utrymmet i den mötandes halva som eleven skulle
 * behöva låna för att passera hindret.
 * Heldragen pil = rör sig nu, streckad grön pil = vägen förbi hindret,
 * röda klossar i bakkanten = bromsljus.
 */

type Heading = 'up' | 'right' | 'down' | 'left';
const HEADING_DEG: Record<Heading, number> = { up: 0, right: 90, down: 180, left: -90 };

interface CarProps {
  cx: number;
  cy: number;
  width: number;
  length: number;
  heading: Heading | number;
  fill: string;
  stroke: string;
  brakeLights?: boolean;
}

/**
 * Bil ritad med fronten uppåt och sedan vriden efter färdriktningen.
 * Karossen upptar exakt (cx ± width/2, cy ± length/2); hjulen sticker ut 3 px.
 */
function Car({ cx, cy, width, length, heading, fill, stroke, brakeLights }: CarProps) {
  const hw = width / 2;
  const hl = length / 2;
  const deg = typeof heading === 'number' ? heading : HEADING_DEG[heading];
  const glass = `fill-diagram-marking ${stroke}`;
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${deg})`}>
      <g className="fill-text-primary">
        <rect x={-hw - 3} y={-hl + 5} width="5" height="9" rx="1.5" />
        <rect x={hw - 2} y={-hl + 5} width="5" height="9" rx="1.5" />
        <rect x={-hw - 3} y={hl - 14} width="5" height="9" rx="1.5" />
        <rect x={hw - 2} y={hl - 14} width="5" height="9" rx="1.5" />
      </g>
      <rect x={-hw} y={-hl} width={width} height={length} rx="4" fill={fill} className={stroke} strokeWidth="2" />
      <rect x={-hw + 5} y={-hl + 6} width={width - 10} height="7" rx="2" className={glass} strokeWidth="1" />
      <rect x={-hw + 5} y={hl - 10} width={width - 10} height="5" rx="2" className={glass} strokeWidth="1" />
      {brakeLights && (
        <g className="fill-safety-600">
          <rect x={-hw + 2} y={hl - 1} width="6" height="3" />
          <rect x={hw - 8} y={hl - 1} width="6" height="3" />
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
      <text x={x} y={y + 5} textAnchor="middle" className="fill-surface-base text-[13px] font-semibold">
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

/** Hindret: stillastående föremål på vägbanan, vågrätt streckmönster. */
function Obstacle({ cx, cy, width, length }: { cx: number; cy: number; width: number; length: number }) {
  return (
    <rect
      x={cx - width / 2}
      y={cy - length / 2}
      width={width}
      height={length}
      rx="3"
      fill="url(#met-block)"
      className="stroke-text-secondary"
      strokeWidth="2"
    />
  );
}

/** Den smala vägen: vägbana x 178–262, vägens mitt på x 220. */
function NarrowRoad({ y1, y2 }: { y1: number; y2: number }) {
  return (
    <g>
      <rect x="178" y={y1} width="84" height={y2 - y1} className="fill-diagram-road" />
      <g className="stroke-diagram-edge" strokeWidth="2">
        <line x1="178" y1={y1} x2="178" y2={y2} />
        <line x1="262" y1={y1} x2="262" y2={y2} />
      </g>
      <line
        x1="220"
        y1={y1}
        x2="220"
        y2={y2}
        className="stroke-text-tertiary"
        strokeWidth="1.5"
        strokeDasharray="10 8"
      />
    </g>
  );
}

/**
 * Samma smala väg i skala 0,45 för förklaringsrutan. Origo mitt i scenen.
 * Vägbanan är x −42–42 med mitten på x 0. Eleven kör uppåt och ligger därför
 * i höger halva (x 0–42), den mötande kör nedåt och ligger i vänster halva
 * (x −42–0). Hindret står på x 26, alltså i elevens halva — samma fall som
 * fall 1 i huvudbilden.
 */
function MiniMote({ x, y, variant }: { x: number; y: number; variant: 'du-stannar' | 'ni-mots' }) {
  const stops = variant === 'du-stannar';
  return (
    <g transform={`translate(${x} ${y}) scale(0.45)`}>
      <rect x="-42" y="-130" width="84" height="260" className="fill-diagram-road" />
      <g className="stroke-diagram-edge" strokeWidth="3">
        <line x1="-42" y1="-130" x2="-42" y2="130" />
        <line x1="42" y1="-130" x2="42" y2="130" />
      </g>
      <line x1="0" y1="-130" x2="0" y2="130" className="stroke-text-tertiary" strokeWidth="3" strokeDasharray="14 10" />

      {!stops && (
        <rect
          x="-42"
          y="-78"
          width="42"
          height="26"
          fill="url(#met-hatch)"
          className="stroke-safety-600"
          strokeWidth="2"
        />
      )}

      {/* Hindret står i elevens halva i båda rutorna */}
      <Obstacle cx={26} cy={-30} width={26} length={44} />

      {/* Den mötande kör nedåt, alltså i vänster halva */}
      <Car
        cx={-22}
        cy={stops ? -30 : -100}
        width={26}
        length={44}
        heading="down"
        fill="url(#met-stripes)"
        stroke="stroke-primary-600"
        brakeLights={!stops}
      />

      {/* Eleven kör uppåt: stannad i sin egen halva, eller ute på den andra */}
      <Car
        cx={stops ? 22 : -20}
        cy={stops ? 85 : -30}
        width={26}
        length={44}
        heading="up"
        fill="url(#met-dots)"
        stroke="stroke-attention-600"
        brakeLights
      />
    </g>
  );
}

export function MoteSmalVagDiagram() {
  return (
    <svg
      viewBox="0 0 440 1130"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="met-title met-desc"
    >
      <title id="met-title">Möte vid hinder på smal väg</title>
      <desc id="met-desc">
        Två bilder av samma smala väg sedd uppifrån, staplade över varandra, med en tunn streckad
        hjälplinje som visar vägens mitt. Elevens bil är fylld med prickmönster och kör uppåt i
        bilden, alltså i den högra halvan. Den mötande bilen är fylld med diagonala ränder och kör
        nedåt, alltså i den vänstra halvan. Hindret är ritat med vågräta streck och står stilla.
        Fall 1: hindret står i elevens egen halva. Markering 1 pekar på hindret: det står på din
        sida. En streckad grön pil visar att vägen förbi hindret går ut på den mötandes halva, och
        just den ytan är krysskrafferad med röd kontur. Den mötande kommer emot med en heldragen
        pil. Markering 2 pekar på elevens bil, som står stilla med röda bromsljus: du stannar om
        det behövs för att den mötande ska komma förbi. Fall 2: hindret står i den mötandes halva
        i stället. Markering 3 pekar dit: då är det den mötande som stannar om det behövs, och den
        bilen står stilla med bromsljus. Elevens bil fortsätter i sin egen halva förbi hindret, och
        etiketten säger håll till höger och var beredd att stanna ändå. En ruta längst ned visar fall 1 två gånger: eleven stannar och
        släpper fram den mötande, markerat med en bock, och båda kommer fram till hindret
        samtidigt så att ingen kommer förbi, markerat med ett kryss.
      </desc>

      <defs>
        <pattern id="met-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="met-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="2" />
        </pattern>
        <pattern id="met-block" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M0,2 l8,0 M0,6 l8,0" className="stroke-text-secondary" strokeWidth="2" />
        </pattern>
        <pattern id="met-hatch" patternUnits="userSpaceOnUse" width="10" height="10">
          <path d="M0,10 l10,-10 M0,0 l10,10" className="stroke-safety-600" strokeWidth="1.3" />
        </pattern>
        <marker id="met-arrow-other" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary-600" />
        </marker>
        <marker id="met-arrow-plan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-progress-600" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Möte vid hinder på smal väg
      </text>
      <text x="20" y="48" className="fill-text-secondary text-[13px]">
        Vem som ska stanna — och att det är villkorat
      </text>

      {/* ---------- FALL 1: hindret på din sida ---------- */}
      <text x="20" y="80" className="fill-text-primary text-[14px] font-semibold">
        Fall 1 — hindret är på din sida
      </text>
      <NarrowRoad y1={96} y2={380} />

      {/* Utrymmet på andra sidan mitten: den mötandes halva */}
      <rect
        x="178"
        y="168"
        width="42"
        height="44"
        fill="url(#met-hatch)"
        className="stroke-safety-600"
        strokeWidth="2"
      />

      {/* Hindret i elevens halva */}
      <Obstacle cx={246} cy={190} width={26} length={44} />

      {/* Den mötande kommer emot i sin egen halva */}
      <Car cx={198} cy={124} width={26} length={44} heading="down" fill="url(#met-stripes)" stroke="stroke-primary-600" />
      <line x1="198" y1="150" x2="198" y2="160" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#met-arrow-other)" />

      {/* Elevens väg förbi hindret går ut på den mötandes halva */}
      <path
        d="M 242 296 C 242 268 198 264 198 240 L 198 222"
        className="fill-none stroke-progress-600"
        strokeWidth="3"
        strokeDasharray="8 6"
        markerEnd="url(#met-arrow-plan)"
      />

      {/* Elevens bil står stilla i sin egen halva */}
      <Car cx={242} cy={320} width={26} length={44} heading="up" fill="url(#met-dots)" stroke="stroke-attention-600" brakeLights />

      {/* 1. Hindret står på din sida */}
      <g>
        <Callout x={296} y={166} n={1} />
        <text x="312" y="171" className="fill-text-primary text-[13px] font-semibold">
          Hindret
        </text>
        <text x="284" y="191" className="fill-text-secondary text-[13px]">
          står på din sida
        </text>
        <Pointer x1={290} y1={182} x2={261} y2={190} />
      </g>

      {/* Etikett: den mötande */}
      <g>
        <text x="284" y="112" className="fill-text-primary text-[13px] font-semibold">
          Mötande
        </text>
        <text x="284" y="130" className="fill-text-secondary text-[13px]">
          kommer emot
        </text>
        <Pointer x1={280} y1={122} x2={212} y2={122} />
      </g>

      {/* Etikett: vägen förbi hindret */}
      <g>
        <text x="16" y="246" className="fill-text-primary text-[13px] font-semibold">
          Din väg förbi
        </text>
        <text x="16" y="264" className="fill-text-secondary text-[13px]">
          går ut på den
        </text>
        <text x="16" y="282" className="fill-text-secondary text-[13px]">
          mötandes halva
        </text>
        <Pointer x1={130} y1={264} x2={191} y2={258} />
      </g>

      {/* 2. Du stannar om det behövs */}
      <g>
        <Callout x={26} y={320} n={2} />
        <text x="42" y="325" className="fill-text-primary text-[13px] font-semibold">
          Du stannar
        </text>
        <text x="16" y="345" className="fill-text-secondary text-[13px]">
          om det behövs för
        </text>
        <text x="16" y="363" className="fill-text-secondary text-[13px]">
          att den mötande
        </text>
        <text x="16" y="381" className="fill-text-secondary text-[13px]">
          ska komma förbi
        </text>
        <Pointer x1={120} y1={330} x2={228} y2={324} />
      </g>

      {/* Teckenförklaring i högermarginalen, mellan fallen */}
      <g>
        <path d="M 284 244 L 310 244" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#met-arrow-other)" />
        <text x="318" y="249" className="fill-text-secondary text-[13px]">
          Rör sig nu
        </text>
        <path
          d="M 284 266 L 310 266"
          className="stroke-progress-600"
          strokeWidth="3"
          strokeDasharray="8 6"
          markerEnd="url(#met-arrow-plan)"
        />
        <text x="318" y="271" className="fill-text-secondary text-[13px]">
          Väg förbi
        </text>
        <g className="fill-safety-600">
          <rect x="286" y="284" width="8" height="4" />
          <rect x="300" y="284" width="8" height="4" />
        </g>
        <text x="318" y="291" className="fill-text-secondary text-[13px]">
          Bromsljus
        </text>
        <line
          x1="284"
          y1="312"
          x2="310"
          y2="312"
          className="stroke-text-tertiary"
          strokeWidth="1.5"
          strokeDasharray="10 8"
        />
        <text x="318" y="317" className="fill-text-secondary text-[13px]">
          Vägens mitt
        </text>
      </g>

      {/* ---------- FALL 2: hindret på den mötandes sida ---------- */}
      <text x="20" y="424" className="fill-text-primary text-[14px] font-semibold">
        Fall 2 — hindret är på den mötandes sida
      </text>
      <NarrowRoad y1={440} y2={724} />

      {/* Hindret i den mötandes halva */}
      <Obstacle cx={194} cy={550} width={26} length={44} />

      {/* Den mötande har stannat före sitt hinder */}
      <Car cx={198} cy={476} width={26} length={44} heading="down" fill="url(#met-stripes)" stroke="stroke-primary-600" brakeLights />

      {/* Eleven fortsätter i sin egen halva */}
      <path
        d="M 242 650 L 242 534"
        className="fill-none stroke-progress-600"
        strokeWidth="3"
        strokeDasharray="8 6"
        markerEnd="url(#met-arrow-plan)"
      />
      <Car cx={242} cy={676} width={26} length={44} heading="up" fill="url(#met-dots)" stroke="stroke-attention-600" />

      {/* Etikett: den mötande har stannat */}
      <g>
        <text x="16" y="458" className="fill-text-primary text-[13px] font-semibold">
          Den mötande
        </text>
        <text x="16" y="476" className="fill-text-secondary text-[13px]">
          har stannat
        </text>
        <Pointer x1={120} y1={470} x2={184} y2={476} />
      </g>

      {/* 3. Hindret på den mötandes sida */}
      <g>
        <Callout x={26} y={556} n={3} />
        <text x="42" y="561" className="fill-text-primary text-[13px] font-semibold">
          Hindret är på
        </text>
        <text x="16" y="581" className="fill-text-secondary text-[13px]">
          den mötandes sida
        </text>
        <text x="16" y="599" className="fill-text-secondary text-[13px]">
          då är det den som
        </text>
        <text x="16" y="617" className="fill-text-secondary text-[13px]">
          stannar om det behövs
        </text>
        <Pointer x1={134} y1={568} x2={180} y2={556} />
      </g>

      {/* Etikett: eleven i fall 2 */}
      <g>
        <text x="284" y="660" className="fill-text-primary text-[13px] font-semibold">
          Du
        </text>
        <text x="284" y="678" className="fill-text-secondary text-[13px]">
          håller till höger
        </text>
        <text x="284" y="696" className="fill-text-secondary text-[13px]">
          och är beredd att
        </text>
        <text x="284" y="714" className="fill-text-secondary text-[13px]">
          stanna ändå
        </text>
        <Pointer x1={280} y1={670} x2={256} y2={674} />
      </g>

      {/* Vad bilden lär ut */}
      <text x="220" y="764" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        Den som har hindret på sin sida ska stanna,
      </text>
      <text x="220" y="782" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        om det behövs för att den mötande ska komma förbi.
      </text>
      <text x="220" y="806" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Villkoret är avgörande: plikten att stanna gäller när utrymmet
      </text>
      <text x="220" y="824" textAnchor="middle" className="fill-text-secondary text-[13px]">
        inte räcker. Sänk farten i god tid, håll till höger och lämna
      </text>
      <text x="220" y="842" textAnchor="middle" className="fill-text-secondary text-[13px]">
        avstånd i sidled. Stanna där den mötande ser dig.
      </text>

      {/* Mönsterförklaring */}
      <g>
        <rect x="24" y="866" width="22" height="14" rx="2" fill="url(#met-dots)" className="stroke-attention-600" strokeWidth="1.5" />
        <text x="52" y="878" className="fill-text-tertiary text-[13px]">
          Du
        </text>
        <rect x="90" y="866" width="22" height="14" rx="2" fill="url(#met-stripes)" className="stroke-primary-600" strokeWidth="1.5" />
        <text x="118" y="878" className="fill-text-tertiary text-[13px]">
          Mötande
        </text>
        <rect x="192" y="866" width="22" height="14" rx="2" fill="url(#met-block)" className="stroke-text-secondary" strokeWidth="1.5" />
        <text x="220" y="878" className="fill-text-tertiary text-[13px]">
          Hinder
        </text>
        <rect x="266" y="866" width="22" height="14" rx="2" fill="url(#met-hatch)" className="stroke-safety-600" strokeWidth="1.5" />
        <text x="294" y="878" className="fill-text-tertiary text-[13px]">
          Den mötandes utrymme
        </text>
      </g>

      {/* Förklaringsruta: fall 1, med och utan stopp */}
      <rect x="20" y="898" width="400" height="212" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="34" y="922" className="fill-text-primary text-[13px] font-semibold">
        När hindret är på din sida:
      </text>
      <line x1="220" y1="938" x2="220" y2="1098" className="stroke-border-default" strokeWidth="1.5" strokeDasharray="6 4" />

      <MiniMote x={118} y={994} variant="du-stannar" />
      <text x="118" y="1060" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Du stannar först
      </text>
      <text x="118" y="1076" textAnchor="middle" className="fill-text-secondary text-[13px]">
        den mötande kommer förbi
      </text>
      <Check x={118} y={1096} />

      <MiniMote x={322} y={994} variant="ni-mots" />
      <text x="322" y="1060" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Ni möts vid hindret
      </text>
      <text x="322" y="1076" textAnchor="middle" className="fill-text-secondary text-[13px]">
        ingen kommer förbi
      </text>
      <Cross x={322} y={1096} />
    </svg>
  );
}
