/**
 * Trafiksignaler och polismans tecken — signalbilderna, rangordningen mellan
 * polisman, signal, vägmärke och trafikregel, och framför allt polismans tecken P1 stopp:
 * samma tecken betyder stopp för den som kommer framifrån eller bakifrån men
 * fri väg för den som kommer från sidan.
 * Trafikförordningen 2 kap 2–3 §§, vägmärkesförordningen 3 kap 6 § och 7 kap 2 §.
 *
 * Geometri i korsningen: varje bil ligger i sitt högra körfält. Bilen som kör
 * nedåt har sin högra sida åt väster (bildens vänstra); bilen som kör åt höger
 * har sin högra sida åt söder (bildens nedre); bilen som kör åt vänster har sin
 * högra sida åt norr (bildens övre). Korsningen ritas i en grupp förskjuten
 * 214 px nedåt; koordinaterna i scenen är oförändrade.
 *
 * Mönster: diagonala ränder = andra fordon (du är inte med i bilden). Kryss =
 * stopp, bock = vägen är fri. Heldragen pil = rör sig nu. Bilar som ska stanna
 * har bromsljusen tända.
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
  brakeLights?: boolean;
}

/**
 * Bil ritad med fronten uppåt och sedan vriden efter färdriktningen.
 * Karossen upptar exakt (cx ± width/2, cy ± length/2); hjulen sticker ut 3 px.
 */
function Car({ cx, cy, width, length, heading, fill, stroke, brakeLights }: CarProps) {
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
      <rect x={-hw} y={-hl} width={width} height={length} rx="4" fill={fill} className={stroke} strokeWidth="2" />
      <rect x={-hw + 5} y={-hl + 7} width={width - 10} height="8" rx="2" className={glass} strokeWidth="1" />
      <rect x={-hw + 5} y={hl - 11} width={width - 10} height="5" rx="2" className={glass} strokeWidth="1" />
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
      d={`M ${x - 8} ${y - 8} L ${x + 8} ${y + 8} M ${x + 8} ${y - 8} L ${x - 8} ${y + 8}`}
      className="stroke-safety-600"
      strokeWidth="3"
      strokeLinecap="round"
    />
  );
}

function Lamp({
  x,
  lit,
  blinking,
  label,
}: {
  x: number;
  lit: Array<'red' | 'yellow' | 'green'>;
  blinking?: boolean;
  label: string[];
}) {
  const lenses: Array<{ key: 'red' | 'yellow' | 'green'; cy: number; fill: string }> = [
    { key: 'red', cy: 60, fill: 'fill-safety-600' },
    { key: 'yellow', cy: 92, fill: 'fill-attention-600' },
    { key: 'green', cy: 124, fill: 'fill-progress-600' },
  ];
  const allowed = lit.length === 1 && lit[0] === 'green';
  return (
    <g>
      <rect x={x - 20} y="42" width="40" height="100" rx="6" className="fill-neutral-200 stroke-diagram-edge" strokeWidth="1.5" />
      {lenses.map((l) => {
        const on = lit.includes(l.key);
        return (
          <circle
            key={l.key}
            cx={x}
            cy={l.cy}
            r="13"
            className={on ? `${l.fill} stroke-text-primary` : 'fill-none stroke-border-default'}
            strokeWidth="1.5"
            strokeDasharray={on && blinking ? '4 3' : undefined}
          />
        );
      })}
      {blinking && (
        <g className="stroke-attention-600" strokeWidth="2" strokeLinecap="round">
          <line x1={x - 22} y1="78" x2={x - 17} y2="83" />
          <line x1={x + 22} y1="78" x2={x + 17} y2="83" />
          <line x1={x - 22} y1="106" x2={x - 17} y2="101" />
          <line x1={x + 22} y1="106" x2={x + 17} y2="101" />
        </g>
      )}
      {/* Symbol under lyktan: bock = får köra, kryss = får inte köra,
          utropstecken = särskild försiktighet. Bär betydelsen utan färg. */}
      {blinking ? (
        <g>
          <path d={`M ${x} 150 L ${x - 11} 170 L ${x + 11} 170 Z`} className="fill-none stroke-attention-600" strokeWidth="2" strokeLinejoin="round" />
          <text x={x} y="168" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
            !
          </text>
        </g>
      ) : allowed ? (
        <Check x={x} y={160} />
      ) : (
        <Cross x={x} y={160} />
      )}
      {label.map((line, i) => (
        <text
          key={line}
          x={x}
          y={186 + i * 16}
          textAnchor="middle"
          className={i === 0 ? 'fill-text-primary text-[13px] font-semibold' : 'fill-text-secondary text-[13px]'}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export function TrafiksignalerPolismanDiagram() {
  return (
    <svg
      viewBox="0 0 500 1014"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="signals-title signals-desc"
    >
      <title id="signals-title">Trafiksignaler och polismans tecken P1</title>
      <desc id="signals-desc">
        Tre delar. Överst fem trafiksignaler sida vid sida. Tänd lykta anges av läget i lyktan:
        översta lyktan är rött, mellersta gult, nedersta grönt. Under varje signal står en symbol och
        en text. Rött: kryss, stopp före stopplinjen. Rött och gult samtidigt: kryss, vänta, det är
        ingen startsignal. Gult: kryss, stanna, kör bara om du inte kan stanna utan fara. Grönt:
        bock, kör om korsningen är fri. Blinkande gult, ritat med streckad lykta och blinkstreck:
        utropstecken, särskild försiktighet. I mitten rangordningen i fyra numrerade rutor ovanpå
        varandra: polismans tecken, trafiksignal med fast sken, vägmärke och vägmarkering, och sist
        trafikregel. Bredvid rutorna står förbehållen: polismans anvisning gäller framför
        trafikreglerna och framför märken och signaler; fast sken gäller framför stopp- eller
        väjningsplikt som meddelas genom vägmärke, men inte framför andra vägmärken; och en anvisning
        som avviker från en trafikregel gäller framför regeln. Nederst en korsning sedd uppifrån med
        en polisman i mitten som ger tecken P1 stopp, vänd mot norr. En teckenförklaring skiljer på
        heldragen pil, rör sig nu, kryss, stopp, och bock, vägen är fri. Bilen som kommer uppifrån,
        alltså framifrån, markerad 1, och bilen som kommer nedifrån, alltså bakifrån, markerad 2,
        har båda bromsljusen tända, ett kryss och en stopplinje: stopp. Bilarna som kommer från
        vänster, markerad 3, och från höger, markerad 4, alltså från sidan, har båda en bock och en
        heldragen pil framåt: vägen är fri. Samma tecken betyder alltså olika saker beroende på
        varifrån du kommer.
      </desc>

      <defs>
        <pattern id="signals-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="2" />
        </pattern>
        <marker id="signals-arrow-go" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-progress-600" />
        </marker>
        <marker id="signals-arrow-neutral" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary-600" />
        </marker>
        <marker id="signals-arrow-rank" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-text-secondary" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Trafiksignaler och polismans tecken
      </text>

      {/* Del 1: signalbilderna */}
      <text x="20" y="60" className="fill-text-primary text-[14px] font-semibold">
        Signalbilder (vägmärkesförordningen 3 kap 6 §)
      </text>
      <g transform="translate(0 40)">
        <Lamp x={58} lit={['red']} label={['Rött: stopp', 'före stopplinjen']} />
        <Lamp x={154} lit={['red', 'yellow']} label={['Rött + gult:', 'vänta, ingen', 'startsignal']} />
        <Lamp x={250} lit={['yellow']} label={['Gult: stanna,', 'kör bara om du', 'inte kan stanna', 'utan fara']} />
        <Lamp x={346} lit={['green']} label={['Grönt: kör,', 'om korsningen', 'är fri']} />
        <Lamp x={442} lit={['yellow']} blinking label={['Blinkande gult:', 'särskild', 'försiktighet']} />
      </g>

      <text x="20" y="300" className="fill-text-secondary text-[13px]">
        Grönt säger när du får köra, inte att vägen är fri.
      </text>
      <text x="20" y="316" className="fill-text-secondary text-[13px]">
        Sök av korsningen, och lämna gående som gått ut på
      </text>
      <text x="20" y="332" className="fill-text-secondary text-[13px]">
        övergångsstället möjlighet att passera (3 kap 60 §).
      </text>

      {/* Del 2: rangordning */}
      <text x="20" y="366" className="fill-text-primary text-[14px] font-semibold">
        Rangordning
      </text>
      <text x="20" y="384" className="fill-text-secondary text-[13px]">
        Det överst gäller framför det under (2 kap 2 och 3 §§)
      </text>
      <g>
        <rect x="20" y="396" width="210" height="28" rx="6" className="fill-attention-100 stroke-attention-600" strokeWidth="1.5" />
        <text x="32" y="415" className="fill-text-primary text-[13px] font-semibold">
          1. Polismans tecken
        </text>
        <path d="M 125 426 L 125 440" className="stroke-text-secondary" strokeWidth="2" markerEnd="url(#signals-arrow-rank)" />

        <rect x="20" y="446" width="210" height="28" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
        <text x="32" y="465" className="fill-text-primary text-[13px] font-semibold">
          2. Trafiksignal, fast sken
        </text>
        <path d="M 125 476 L 125 490" className="stroke-text-secondary" strokeWidth="2" markerEnd="url(#signals-arrow-rank)" />

        <rect x="20" y="496" width="210" height="28" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
        <text x="32" y="515" className="fill-text-primary text-[13px] font-semibold">
          3. Vägmärke och vägmarkering
        </text>
        <path d="M 125 526 L 125 540" className="stroke-text-secondary" strokeWidth="2" markerEnd="url(#signals-arrow-rank)" />

        <rect x="20" y="546" width="210" height="28" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
        <text x="32" y="565" className="fill-text-primary text-[13px] font-semibold">
          4. Trafikregel
        </text>

        {/* Förbehållen, i höjd med den ruta de hör till */}
        <text x="244" y="404" className="fill-text-secondary text-[13px]">
          Polismans anvisning gäller framför
        </text>
        <text x="244" y="420" className="fill-text-secondary text-[13px]">
          trafikreglerna och framför märken
        </text>
        <text x="244" y="436" className="fill-text-secondary text-[13px]">
          och signaler (2 kap 3 §).
        </text>
        <text x="244" y="454" className="fill-text-secondary text-[13px]">
          Fast sken gäller framför stopp- eller
        </text>
        <text x="244" y="470" className="fill-text-secondary text-[13px]">
          väjningsplikt som meddelas genom
        </text>
        <text x="244" y="486" className="fill-text-secondary text-[13px]">
          vägmärke, men inte framför andra
        </text>
        <text x="244" y="502" className="fill-text-secondary text-[13px]">
          vägmärken (2 kap 2 § andra stycket).
        </text>
        <text x="244" y="542" className="fill-text-secondary text-[13px]">
          En anvisning som avviker från en
        </text>
        <text x="244" y="558" className="fill-text-secondary text-[13px]">
          trafikregel gäller framför regeln
        </text>
        <text x="244" y="574" className="fill-text-secondary text-[13px]">
          (2 kap 2 § första stycket).
        </text>
      </g>

      {/* Del 3: P1 stopp beror på varifrån du kommer */}
      <text x="20" y="618" className="fill-text-primary text-[14px] font-semibold">
        Polismans tecken P1 stopp: samma tecken, olika betydelse
      </text>
      <text x="20" y="636" className="fill-text-secondary text-[13px]">
        Det beror på varifrån du kommer (vägmärkesförordningen 7 kap 2 §)
      </text>

      <g transform="translate(0 214)">
        {/* Korsningen */}
        <rect x="200" y="436" width="100" height="344" className="fill-diagram-road" />
        <rect x="40" y="560" width="420" height="100" className="fill-diagram-road" />
        <g className="stroke-diagram-edge" strokeWidth="1.5">
          <line x1="200" y1="436" x2="200" y2="560" />
          <line x1="300" y1="436" x2="300" y2="560" />
          <line x1="200" y1="660" x2="200" y2="780" />
          <line x1="300" y1="660" x2="300" y2="780" />
          <line x1="40" y1="560" x2="200" y2="560" />
          <line x1="40" y1="660" x2="200" y2="660" />
          <line x1="300" y1="560" x2="460" y2="560" />
          <line x1="300" y1="660" x2="460" y2="660" />
        </g>
        <g className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="10 8">
          <line x1="250" y1="436" x2="250" y2="560" />
          <line x1="250" y1="660" x2="250" y2="780" />
          <line x1="40" y1="610" x2="200" y2="610" />
          <line x1="300" y1="610" x2="460" y2="610" />
        </g>

        {/* Teckenförklaring, övre vänstra hörnet */}
        <g>
          <path d="M 40 452 L 66 452" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#signals-arrow-neutral)" />
          <text x="74" y="457" className="fill-text-secondary text-[13px]">
            Rör sig nu
          </text>
          <Cross x={53} y={474} />
          <text x="74" y="479" className="fill-text-secondary text-[13px]">
            Stopp
          </text>
          <Check x={53} y={496} />
          <text x="74" y="501" className="fill-text-secondary text-[13px]">
            Vägen är fri
          </text>
        </g>

        {/* Polisman i mitten, vänd mot norr. Utförandet av P1 beskrivs inte i
            vägmärkesförordningens text, bara tecknets innebörd (7 kap 2 §) —
            därför ritas ingen armställning och påstås ingen. */}
        <g>
          <line x1="238" y1="610" x2="262" y2="610" className="stroke-attention-600" strokeWidth="6" strokeLinecap="round" />
          <circle cx="250" cy="610" r="9" className="fill-attention-600" />
          <path d="M 250 589 L 243 600 L 257 600 Z" className="fill-attention-600" />
          <text x="322" y="520" className="fill-text-primary text-[13px] font-semibold">
            Polisman ger P1 stopp,
          </text>
          <text x="322" y="537" className="fill-text-secondary text-[13px]">
            vänd uppåt i bilden
          </text>
          <Pointer x1={318} y1={532} x2={262} y2={598} />
        </g>

        {/* 1. Framifrån (norr): kör nedåt i västra körfältet. Stopp. */}
        <g>
          <Car cx={225} cy={465} width={30} length={40} heading="down" fill="url(#signals-stripes)" stroke="stroke-primary-600" brakeLights />
          <path d="M 225 490 L 225 508" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#signals-arrow-neutral)" />
          <Cross x={225} y={522} />
          <line x1="202" y1="538" x2="248" y2="538" className="stroke-safety-600" strokeWidth="4" />
          <Callout x={322} y={452} n={1} />
          <text x="338" y="457" className="fill-text-primary text-[13px] font-semibold">
            Framifrån: stopp
          </text>
          <Pointer x1={318} y1={462} x2={243} y2={465} />
        </g>

        {/* 2. Bakifrån (söder): kör uppåt i östra körfältet. Stopp. */}
        <g>
          <Car cx={275} cy={745} width={30} length={40} heading="up" fill="url(#signals-stripes)" stroke="stroke-primary-600" brakeLights />
          <path d="M 275 720 L 275 702" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#signals-arrow-neutral)" />
          <Cross x={275} y={688} />
          <line x1="252" y1="672" x2="298" y2="672" className="stroke-safety-600" strokeWidth="4" />
          <Callout x={30} y={742} n={2} />
          <text x="46" y="747" className="fill-text-primary text-[13px] font-semibold">
            Bakifrån: stopp
          </text>
          <Pointer x1={150} y1={742} x2={257} y2={745} />
        </g>

        {/* 3. Från sidan (väster): kör åt höger i södra körfältet. Fri väg. */}
        <g>
          <Car cx={80} cy={635} width={30} length={40} heading="right" fill="url(#signals-stripes)" stroke="stroke-primary-600" />
          <path d="M 105 635 L 160 635" className="stroke-progress-600" strokeWidth="3" markerEnd="url(#signals-arrow-go)" />
          <Check x={181} y={636} />
          <Callout x={30} y={528} n={3} />
          <text x="46" y="533" className="fill-text-primary text-[13px] font-semibold">
            Från sidan:
          </text>
          <text x="46" y="550" className="fill-text-primary text-[13px] font-semibold">
            vägen är fri
          </text>
          <Pointer x1={60} y1={558} x2={80} y2={617} />
        </g>

        {/* 4. Från sidan (öster): kör åt vänster i norra körfältet. Fri väg. */}
        <g>
          <Car cx={420} cy={585} width={30} length={40} heading="left" fill="url(#signals-stripes)" stroke="stroke-primary-600" />
          <path d="M 395 585 L 340 585" className="stroke-progress-600" strokeWidth="3" markerEnd="url(#signals-arrow-go)" />
          <Check x={321} y={586} />
          <Callout x={330} y={712} n={4} />
          <text x="346" y="717" className="fill-text-primary text-[13px] font-semibold">
            Från sidan:
          </text>
          <text x="346" y="734" className="fill-text-primary text-[13px] font-semibold">
            vägen är fri
          </text>
          <Pointer x1={356} y1={702} x2={420} y2={603} />
        </g>
      </g>
    </svg>
  );
}
