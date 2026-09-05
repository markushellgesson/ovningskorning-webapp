/**
 * Omkörning på tvåfältig landsväg (LANE-03) — sikt, mötande och marginal.
 *
 * Bilden lär ut tre saker: omkörningen ska vara helt avslutad med marginal
 * innan mötet, sikten måste räcka för hela förloppet, och två fordon som
 * närmar sig varandra minskar avståndet med båda farterna. Vad lagen kräver
 * står i momentets text, inte i bilden.
 *
 * SKALA: förloppet utspelar sig över sträcka och går inte att rita
 * skalenligt. Vägen är därför bruten på tvären mellan y 424 och y 448
 * (brottsymbol), och notisen intill säger att avstånden är förkortade. Inga
 * mått, sekunder eller multiplar anges någonstans i bilden.
 *
 * GEOMETRI (högertrafik, vy uppifrån). Alla koordinater är dukens egna;
 * scenen ligger inte i någon förskjuten grupp.
 *
 * Vägbanan är x 160–280 och mittlinjen ligger på x 220.
 * - Elevens bil kör UPPÅT (minskande y). För den som kör uppåt är förarens
 *   högra sida bildens högra, alltså ligger elevens körfält på x 220–280
 *   (mitt 250). Läge 1: (250, 628). Läge 3: (250, 350). Båda på x 250.
 * - Omkörningen sker till vänster, alltså över mittlinjen till x 160–220.
 *   Läge 2: (190, 510) — bredvid det långsammare fordonet.
 * - Det långsammare fordonet kör också uppåt och ligger därför på x 250:
 *   (250, 530), längre än en personbil.
 * - Den mötande bilen kör NEDÅT (ökande y). För den som kör nedåt är
 *   förarens högra sida bildens vänstra, alltså ligger den på x 160–220:
 *   (190, 190). Den ligger alltså i samma vägbanehalva som elevens
 *   omkörningsläge — det är precis det som är risken.
 * - Elevens tre lägen överlappar inte varandra: läge 1 upptar y 606–650,
 *   läge 2 y 488–532, läge 3 y 328–372.
 * - Marginalen mäts mellan läge 3:s framkant (y 328) och den mötandes
 *   framkant (y 212) och markeras i högermarginalen på x 292.
 *
 * MÖNSTER (varje mönster betyder en enda sak i den här bilden):
 * prickar = elevens bil, streckad kontur = elevens kommande läge,
 * diagonala ränder = annat fordon, krysskraffering = konflikt (bara i
 * förklaringsrutan). Heldragen pil = rör sig nu, streckad grön pil =
 * elevens planerade väg, prickad linje = sikt, korta parallella streck =
 * hög fart, grön måttmarkering = marginalen före mötet.
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
  /** Kommande läge för samma bil: streckad kontur. */
  ghost?: boolean;
}

/**
 * Bil ritad med fronten uppåt och sedan vriden efter färdriktningen.
 * Karossen upptar exakt (cx ± width/2, cy ± length/2); hjulen sticker ut 3 px.
 */
function Car({ cx, cy, width, length, heading, fill, stroke, brakeLights, ghost }: CarProps) {
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
      <rect
        x={-hw}
        y={-hl}
        width={width}
        height={length}
        rx="4"
        fill={fill}
        className={stroke}
        strokeWidth="2"
        strokeDasharray={ghost ? '7 5' : undefined}
      />
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

/** Fartstreck bakom ett fordon: tre korta streck, olika längd. */
function SpeedMarks({ cx, y, className }: { cx: number; y: number; className: string }) {
  return (
    <g className={className} strokeWidth="2.5" strokeLinecap="round">
      <line x1={cx - 12} y1={y} x2={cx - 12} y2={y + 16} />
      <line x1={cx} y1={y} x2={cx} y2={y + 24} />
      <line x1={cx + 12} y1={y} x2={cx + 12} y2={y + 16} />
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

/** Brottsymbol tvärs vägen: bilden är avbruten, avstånden är förkortade. */
function BreakMark({ y }: { y: number }) {
  return (
    <path
      d={`M 150 ${y} L 176 ${y} L 190 ${y - 9} L 214 ${y + 9} L 238 ${y - 9} L 262 ${y + 9} L 274 ${y} L 290 ${y}`}
      className="fill-none stroke-text-tertiary"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  );
}

/**
 * Samma landsväg i skala 0,45 för förklaringsrutan. Origo mitt i scenen.
 * Vägbanan är x −60–60 med mittlinjen på x 0. Eleven kör uppåt och ligger
 * därför i höger halva (x 0–60), den mötande kör nedåt och ligger i vänster
 * halva (x −60–0) — samma riktningar och samma halvor som i huvudbilden.
 */
function MiniOmkorning({ x, y, variant }: { x: number; y: number; variant: 'ligger-kvar' | 'gar-ut' }) {
  const stays = variant === 'ligger-kvar';
  return (
    <g transform={`translate(${x} ${y}) scale(0.45)`}>
      <rect x="-60" y="-110" width="120" height="220" className="fill-diagram-road" />
      <g className="stroke-diagram-edge" strokeWidth="3">
        <line x1="-60" y1="-110" x2="-60" y2="110" />
        <line x1="60" y1="-110" x2="60" y2="110" />
      </g>
      <line x1="0" y1="-110" x2="0" y2="110" className="stroke-diagram-marking" strokeWidth="3" strokeDasharray="14 10" />

      {!stays && (
        <rect
          x="-60"
          y="-46"
          width="60"
          height="42"
          fill="url(#ovt-hatch)"
          className="stroke-safety-600"
          strokeWidth="2"
        />
      )}

      {/* Långsammare fordon: kör uppåt, alltså i höger halva */}
      <Car cx={30} cy={20} width={28} length={60} heading="up" fill="url(#ovt-stripes)" stroke="stroke-primary-600" />

      {/* Mötande: kör nedåt, alltså i vänster halva */}
      <Car
        cx={-30}
        cy={stays ? -60 : -70}
        width={26}
        length={44}
        heading="down"
        fill="url(#ovt-stripes)"
        stroke="stroke-primary-600"
        brakeLights={!stays}
      />

      {/* Eleven: bakom i sitt eget körfält, eller ute i den mötandes halva */}
      <Car
        cx={stays ? 30 : -30}
        cy={stays ? 85 : 20}
        width={26}
        length={44}
        heading="up"
        fill="url(#ovt-dots)"
        stroke="stroke-attention-600"
      />
    </g>
  );
}

export function OmkorningLandsvagDiagram() {
  return (
    <svg
      viewBox="0 0 440 1080"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="ovt-title ovt-desc"
    >
      <title id="ovt-title">Omkörning på tvåfältig landsväg</title>
      <desc id="ovt-desc">
        Tvåfältig landsväg sedd uppifrån, med en mittlinje och ett fordon i vardera riktningen.
        Elevens bil, fylld med prickmönster, visas i tre lägen: nederst bakom ett längre, randigt
        fordon i sitt eget körfält, sedan ute i den mötandes körfält bredvid det, och överst
        tillbaka i sitt eget körfält. De två kommande lägena har streckad kontur. En streckad grön
        pil binder ihop lägena och visar den planerade vägen. Högst upp kommer en mötande bil med
        diagonala ränder emot i sitt eget körfält, med korta parallella fartstreck bakom sig.
        Vägen är avbruten på tvären med en sicksacklinje, och en notis intill säger att avstånden
        är kraftigt förkortade — förloppet ryms inte skalenligt på duken. En prickad linje från
        elevens bil och framåt visar sikten. Markering 1 pekar på den prickade siktlinjen: sikten
        måste räcka för hela förloppet. Markering 2 pekar på den mötande bilen: ni närmar er med
        era båda farter. Markering 3 pekar på en grön måttmarkering mellan elevens sista läge och
        den mötande: omkörningen ska vara klar med marginal före mötet. En ruta längst ned visar
        samma väg två gånger: eleven ligger kvar bakom det långsammare fordonet och den mötande
        passerar utan konflikt, markerat med en bock, och eleven går ut i den mötandes körfält med
        mötet nära, med ytan mellan dem krysskrafferad och markerat med ett kryss.
      </desc>

      <defs>
        <pattern id="ovt-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="ovt-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="2" />
        </pattern>
        <pattern id="ovt-hatch" patternUnits="userSpaceOnUse" width="10" height="10">
          <path d="M0,10 l10,-10 M0,0 l10,10" className="stroke-safety-600" strokeWidth="1.3" />
        </pattern>
        <marker id="ovt-arrow-other" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary-600" />
        </marker>
        <marker id="ovt-arrow-plan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-progress-600" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Omkörning på landsväg
      </text>
      <text x="20" y="48" className="fill-text-secondary text-[13px]">
        Sikten, mötet och marginalen
      </text>

      {/* Vägbanan, avbruten mellan y 424 och y 448 */}
      <rect x="160" y="92" width="120" height="332" className="fill-diagram-road" />
      <rect x="160" y="448" width="120" height="232" className="fill-diagram-road" />
      <g className="stroke-diagram-edge" strokeWidth="2">
        <line x1="160" y1="92" x2="160" y2="424" />
        <line x1="280" y1="92" x2="280" y2="424" />
        <line x1="160" y1="448" x2="160" y2="680" />
        <line x1="280" y1="448" x2="280" y2="680" />
      </g>
      <g className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="16 12">
        <line x1="220" y1="92" x2="220" y2="424" />
        <line x1="220" y1="448" x2="220" y2="680" />
      </g>
      <BreakMark y={424} />
      <BreakMark y={448} />

      {/* Teckenförklaring i högermarginalen, ovanför mätmarkeringen */}
      <g>
        <path d="M 300 104 L 326 104" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#ovt-arrow-other)" />
        <text x="334" y="109" className="fill-text-secondary text-[13px]">
          Rör sig nu
        </text>
        <path
          d="M 300 126 L 326 126"
          className="stroke-progress-600"
          strokeWidth="3"
          strokeDasharray="8 6"
          markerEnd="url(#ovt-arrow-plan)"
        />
        <text x="334" y="131" className="fill-text-secondary text-[13px]">
          Din väg
        </text>
        <line
          x1="300"
          y1="148"
          x2="326"
          y2="148"
          className="stroke-text-tertiary"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="0.5 6"
        />
        <text x="334" y="153" className="fill-text-secondary text-[13px]">
          Sikt
        </text>
        <g className="stroke-primary-600" strokeWidth="2.5" strokeLinecap="round">
          <line x1="302" y1="166" x2="302" y2="178" />
          <line x1="311" y1="164" x2="311" y2="180" />
          <line x1="320" y1="166" x2="320" y2="178" />
        </g>
        <text x="334" y="177" className="fill-text-secondary text-[13px]">
          Hög fart
        </text>
      </g>

      {/* Mötande bil: kör nedåt, alltså i vänster halva */}
      <SpeedMarks cx={190} y={140} className="stroke-primary-600" />
      <Car cx={190} cy={190} width={26} length={44} heading="down" fill="url(#ovt-stripes)" stroke="stroke-primary-600" />

      {/* Sikten: prickad linje framåt, bruten där bilden är bruten */}
      <g
        className="fill-none stroke-text-tertiary"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="0.5 7"
      >
        <line x1="238" y1="602" x2="206" y2="440" />
        <line x1="206" y1="424" x2="196" y2="216" />
      </g>

      {/* Marginalen mellan elevens sista läge och den mötande */}
      <g className="stroke-progress-600" strokeWidth="2.5">
        <line x1="292" y1="212" x2="292" y2="328" />
        <line x1="286" y1="212" x2="300" y2="212" />
        <line x1="286" y1="328" x2="300" y2="328" />
      </g>

      {/* Elevens läge 3: tillbaka i eget körfält, omkörningen klar */}
      <Car cx={250} cy={350} width={26} length={44} heading="up" fill="url(#ovt-dots)" stroke="stroke-attention-600" ghost />

      {/* Elevens läge 2: ute i den mötandes körfält, bredvid det långsammare fordonet */}
      <Car cx={190} cy={510} width={26} length={44} heading="up" fill="url(#ovt-dots)" stroke="stroke-attention-600" ghost />

      {/* Långsammare fordon: kör uppåt, alltså i höger halva */}
      <Car cx={250} cy={530} width={28} length={60} heading="up" fill="url(#ovt-stripes)" stroke="stroke-primary-600" />

      {/* Elevens läge 1: bakom, i eget körfält */}
      <Car cx={250} cy={628} width={26} length={44} heading="up" fill="url(#ovt-dots)" stroke="stroke-attention-600" />

      {/* Elevens planerade väg, i tre steg — bruten där bilden är bruten */}
      <path
        d="M 250 604 C 250 578 190 574 190 536"
        className="fill-none stroke-progress-600"
        strokeWidth="3"
        strokeDasharray="8 6"
        markerEnd="url(#ovt-arrow-plan)"
      />
      <line x1="190" y1="488" x2="190" y2="452" className="stroke-progress-600" strokeWidth="3" strokeDasharray="8 6" />
      <path
        d="M 190 420 C 190 396 250 400 250 376"
        className="fill-none stroke-progress-600"
        strokeWidth="3"
        strokeDasharray="8 6"
        markerEnd="url(#ovt-arrow-plan)"
      />

      {/* 1. Sikten */}
      <g>
        <Callout x={26} y={458} n={1} />
        <text x="42" y="463" className="fill-text-primary text-[13px] font-semibold">
          Sikten
        </text>
        <text x="16" y="483" className="fill-text-secondary text-[13px]">
          måste räcka för
        </text>
        <text x="16" y="501" className="fill-text-secondary text-[13px]">
          hela förloppet
        </text>
        <Pointer x1={116} y1={480} x2={210} y2={473} />
      </g>

      {/* 2. Den mötande */}
      <g>
        <Callout x={26} y={140} n={2} />
        <text x="42" y="145" className="fill-text-primary text-[13px] font-semibold">
          Mötande bil
        </text>
        <text x="16" y="165" className="fill-text-secondary text-[13px]">
          ni närmar er med
        </text>
        <text x="16" y="183" className="fill-text-secondary text-[13px]">
          era båda farter
        </text>
        <Pointer x1={112} y1={172} x2={175} y2={188} />
      </g>

      {/* 3. Marginalen före mötet */}
      <g>
        <Callout x={318} y={250} n={3} />
        <text x="334" y="255" className="fill-text-primary text-[13px] font-semibold">
          Marginal
        </text>
        <text x="306" y="275" className="fill-text-secondary text-[13px]">
          omkörningen klar
        </text>
        <text x="306" y="293" className="fill-text-secondary text-[13px]">
          före mötet
        </text>
        <Pointer x1={304} y1={286} x2={293} y2={306} />
      </g>

      {/* Notis om den brutna skalan */}
      <g>
        <text x="296" y="430" className="fill-text-primary text-[13px] font-semibold">
          Bruten skala
        </text>
        <text x="296" y="448" className="fill-text-secondary text-[13px]">
          avstånden är
        </text>
        <text x="296" y="466" className="fill-text-secondary text-[13px]">
          kraftigt förkortade
        </text>
        <Pointer x1={292} y1={440} x2={278} y2={436} />
      </g>

      {/* Etikett: det långsammare fordonet */}
      <g>
        <text x="296" y="524" className="fill-text-primary text-[13px] font-semibold">
          Långsammare
        </text>
        <text x="296" y="542" className="fill-text-secondary text-[13px]">
          fordon
        </text>
        <Pointer x1={292} y1={534} x2={266} y2={532} />
      </g>

      {/* Etikett: elevens nuvarande läge */}
      <g>
        <text x="296" y="624" className="fill-text-primary text-[13px] font-semibold">
          Du, nu
        </text>
        <text x="296" y="642" className="fill-text-secondary text-[13px]">
          bakom fordonet
        </text>
        <Pointer x1={292} y1={634} x2={266} y2={630} />
      </g>

      {/* Vad bilden lär ut */}
      <text x="220" y="724" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        Omkörningen ska vara helt avslutad
      </text>
      <text x="220" y="742" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        med marginal innan mötet.
      </text>
      <text x="220" y="766" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Sikten måste räcka för ut, förbi och tillbaka — inte bara för
      </text>
      <text x="220" y="784" textAnchor="middle" className="fill-text-secondary text-[13px]">
        början. Ni närmar er med era båda farter, så avståndet till den
      </text>
      <text x="220" y="802" textAnchor="middle" className="fill-text-secondary text-[13px]">
        mötande krymper fortare än din egen fart känns. Tveka: ligg kvar.
      </text>

      {/* Mönsterförklaring */}
      <g>
        <rect x="30" y="826" width="22" height="14" rx="2" fill="url(#ovt-dots)" className="stroke-attention-600" strokeWidth="1.5" />
        <text x="58" y="838" className="fill-text-tertiary text-[13px]">
          Du
        </text>
        <rect
          x="100"
          y="826"
          width="22"
          height="14"
          rx="2"
          fill="url(#ovt-dots)"
          className="stroke-attention-600"
          strokeWidth="1.5"
          strokeDasharray="5 4"
        />
        <text x="128" y="838" className="fill-text-tertiary text-[13px]">
          Kommande läge
        </text>
        <rect x="232" y="826" width="22" height="14" rx="2" fill="url(#ovt-stripes)" className="stroke-primary-600" strokeWidth="1.5" />
        <text x="260" y="838" className="fill-text-tertiary text-[13px]">
          Annat fordon
        </text>
        <rect x="352" y="826" width="22" height="14" rx="2" fill="url(#ovt-hatch)" className="stroke-safety-600" strokeWidth="1.5" />
        <text x="380" y="838" className="fill-text-tertiary text-[13px]">
          Konflikt
        </text>
      </g>

      {/* Förklaringsruta: vad beslutet leder till */}
      <rect x="20" y="856" width="400" height="204" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="34" y="880" className="fill-text-primary text-[13px] font-semibold">
        När sikten inte räcker hela vägen:
      </text>
      <line x1="220" y1="896" x2="220" y2="1048" className="stroke-border-default" strokeWidth="1.5" strokeDasharray="6 4" />

      <MiniOmkorning x={118} y={950} variant="ligger-kvar" />
      <text x="118" y="1010" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Du ligger kvar
      </text>
      <text x="118" y="1026" textAnchor="middle" className="fill-text-secondary text-[13px]">
        mötet passerar lugnt
      </text>
      <Check x={118} y={1046} />

      <MiniOmkorning x={322} y={950} variant="gar-ut" />
      <text x="322" y="1010" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Du går ut ändå
      </text>
      <text x="322" y="1026" textAnchor="middle" className="fill-text-secondary text-[13px]">
        mötet kommer emot dig
      </text>
      <Cross x={322} y={1046} />
    </svg>
  );
}
