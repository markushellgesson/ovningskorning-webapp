/**
 * Vänstersväng på landsväg (RUR-04), vy uppifrån. Bilden lär ut väntan:
 * du står nära körbanans mitt, med hjulen raka, tills du förvissat dig om
 * att svängen kan ske utan hinder. Tre faror pekas ut: mötande i
 * landsvägsfart, bakomvarande som inte väntar sig en inbromsning, och
 * hjulen som ska stå raka medan du väntar.
 *
 * Regelläge: det finns ingen uttrycklig väjningsplikt mot mötande vid
 * vänstersväng. Skyldigheten är att förvissa sig om att svängen kan ske
 * utan hinder för mötande och för dem på körbanan du kör in på. Bilden
 * påstår inget utöver det.
 *
 * Geometri (högertrafik, vy uppifrån), i scenens koordinater. Scenen ligger
 * i en grupp förskjuten 64 px nedåt så att rubriken får luft; ingen koordinat
 * inne i gruppen har flyttats.
 * - Landsvägen går lodrätt. Vägbanan inklusive vägrenar är x 140–260,
 *   körbanan x 150–250 mellan kantlinjerna, mittlinjen på x 200. Vägrenarna
 *   är x 140–150 och x 250–260.
 * - Din bil kör uppåt i bilden (minskande y). Dess högra sida är då bildens
 *   högra, alltså ligger den i det högra körfältet x 200–250. Den står
 *   stilla med mitten på x 216, kaross x 202–230 — inne i sitt eget körfält
 *   men alldeles intill mittlinjen på x 200, vilket är hela poängen.
 * - Den mötande bilen kör nedåt (ökande y). Dess högra sida är bildens
 *   vänstra, alltså ligger den i det vänstra körfältet x 150–200, med
 *   mitten på x 175, kaross x 161–189.
 * - Den bakomvarande kör uppåt, alltså samma körfält som du: mitten på
 *   x 225, kaross x 211–239.
 * - Den mindre vägen går ut åt vänster. Körbanan är y 246–306 med
 *   mittlinjen på y 276. Den som kör västerut (minskande x) har sin högra
 *   sida uppåt i bilden, så det körfältet är y 246–276. Svängen slutar
 *   därför på y 262 — i rätt körfält på den väg du kör in på.
 * - Konfliktytan, alltså den del av mötande körfält som svängen korsar, är
 *   x 152–198, y 246–306.
 * - Förklaringsrutans miniscener: körbanan x -60–60 med mittlinjen på x 0,
 *   din bil med mitten på x 16 (kaross x 2–30) och fronten uppåt — alltså
 *   samma körfält, intill mitten, som i huvudbilden. Det mötande körfältet
 *   är x -60–0.
 *
 * Mönster (inget mönster betyder två saker): prickar = din bil, snedränder =
 * andra fordon, korsskraffering = konfliktyta.
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
  leftBlinker?: boolean;
  /** Framhjulen vridna åt vänster. Används bara i förklaringsrutan. */
  turnedWheels?: boolean;
}

/**
 * Bil ritad med fronten uppåt och sedan vriden efter färdriktningen.
 * Karossen upptar exakt (cx ± width/2, cy ± length/2); hjulen sticker ut 3 px.
 * Hjulen ritas som egna rektanglar utanför karossen — det är det som gör att
 * framhjulen kan vridas kring sin egen mitt i förklaringsrutan.
 */
function Car({
  cx,
  cy,
  width,
  length,
  heading,
  fill,
  stroke,
  brakeLights,
  leftBlinker,
  turnedWheels,
}: CarProps) {
  const hw = width / 2;
  const hl = length / 2;
  const glass = `fill-diagram-marking ${stroke}`;
  const frontLeftX = -hw - 3;
  const frontRightX = hw - 2;
  const frontY = -hl + 5;
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${HEADING_DEG[heading]})`}>
      <g className="fill-text-primary">
        <rect
          x={frontLeftX}
          y={frontY}
          width="5"
          height="10"
          rx="1.5"
          transform={turnedWheels ? `rotate(-30 ${frontLeftX + 2.5} ${frontY + 5})` : undefined}
        />
        <rect
          x={frontRightX}
          y={frontY}
          width="5"
          height="10"
          rx="1.5"
          transform={turnedWheels ? `rotate(-30 ${frontRightX + 2.5} ${frontY + 5})` : undefined}
        />
        <rect x={-hw - 3} y={hl - 15} width="5" height="10" rx="1.5" />
        <rect x={hw - 2} y={hl - 15} width="5" height="10" rx="1.5" />
      </g>
      <rect x={-hw} y={-hl} width={width} height={length} rx="4" className="fill-diagram-marking" />
      <rect x={-hw} y={-hl} width={width} height={length} rx="4" fill={fill} className={stroke} strokeWidth="2" />
      <rect x={-hw + 5} y={-hl + 7} width={width - 10} height="8" rx="2" className={glass} strokeWidth="1" />
      <rect x={-hw + 5} y={hl - 11} width={width - 10} height="5" rx="2" className={glass} strokeWidth="1" />
      {brakeLights && (
        <g className="fill-safety-600">
          <rect x={-hw + 2} y={hl - 1} width="6" height="3" />
          <rect x={hw - 8} y={hl - 1} width="6" height="3" />
        </g>
      )}
      {/* Blinkers vänster: gula hörn på bilens vänstra sida. Ritas innanför
          karossen, så att bilen inte ser ut att ligga över mittlinjen. */}
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

/**
 * Samma väntläge i skala 0,6 för förklaringsrutan. Origo mitt på körbanan:
 * mittlinjen ligger på x 0, ditt körfält på x 0–60 och det mötande på
 * x -60–0. Din bil står med mitten på x 16, alltså intill mitten i sitt eget
 * körfält — samma placering som i huvudbilden.
 */
function MiniVantan({ x, y, variant }: { x: number; y: number; variant: 'raka' | 'vridna' }) {
  const straight = variant === 'raka';
  return (
    <g transform={`translate(${x} ${y}) scale(0.6)`}>
      <rect x="-60" y="-100" width="120" height="200" className="fill-diagram-road" />
      <g className="stroke-diagram-edge" strokeWidth="3">
        <line x1="-60" y1="-100" x2="-60" y2="100" />
        <line x1="60" y1="-100" x2="60" y2="100" />
      </g>
      <line x1="0" y1="-100" x2="0" y2="100" className="stroke-diagram-marking" strokeWidth="3" strokeDasharray="14 12" />

      {/* Kraften bakifrån */}
      <path d="M 16 94 L 16 52" className="stroke-text-primary" strokeWidth="6" markerEnd="url(#vsv-arrow-push)" />

      <Car
        cx={16}
        cy={20}
        width={28}
        length={44}
        heading="up"
        fill="url(#vsv-dots)"
        stroke="stroke-attention-600"
        turnedWheels={!straight}
      />

      {/* Resultatet */}
      {straight ? (
        <path d="M 16 -10 L 16 -74" className="stroke-text-primary" strokeWidth="4" markerEnd="url(#vsv-arrow-push)" />
      ) : (
        <path d="M 12 -10 L -38 -68" className="stroke-text-primary" strokeWidth="4" markerEnd="url(#vsv-arrow-push)" />
      )}
    </g>
  );
}

export function VanstersvangLandsvagDiagram() {
  return (
    <svg
      viewBox="0 0 400 1094"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="vsv-title vsv-desc"
    >
      <title id="vsv-title">Vänstersväng på landsväg: vänta nära körbanans mitt med hjulen raka</title>
      <desc id="vsv-desc">
        Vy uppifrån. En landsväg går lodrätt genom bilden och en mindre väg går ut åt vänster. Din
        bil, fylld med prickmönster, kör uppåt i bilden i det högra körfältet, har lagt sig
        alldeles intill mittlinjen, blinkar vänster med gula trianglar på vänster sida och står
        stilla med bromsljusen tända. Alla fyra hjulen pekar rakt fram. En streckad pil visar den
        planerade svängen: den korsar det mötande körfältet, som är markerat med korsskraffering,
        och slutar i den övre halvan av den mindre vägen, alltså i rätt körfält för den som kör
        västerut. Markering 1: en mötande bil, fylld med snedränder, kör nedåt i bilden i sitt
        eget körfält med fartstreck bakom sig och en heldragen pil framåt — bedöm dess fart, inte
        bara avståndet, och titta förbi den, för bakom den kan en motorcykel ligga. Markering 2:
        en bakomvarande bil, också fylld med snedränder, kör uppåt i samma körfält som du och
        väntar sig ingen inbromsning här. Markering 3 pekar på dina framhjul: de står raka.
        Vägrenen längs högra kanten är utmärkt. En teckenförklaring skiljer på heldragen pil, rör
        sig nu, och streckad pil, planerad sväng. Under bilden står att det inte finns någon
        uttrycklig väjningsplikt mot mötande: du ska förvissa dig om att svängen kan ske utan
        hinder. Där står också att avtömning på vägrenen kan släppa förbi bakomvarande, men att
        svängen sedan görs från körbanans mitt. Längst ned en ruta som visar samma väntläge två
        gånger, med en pil för kraften bakifrån och en pil för resultatet: med raka hjul knuffas
        bilen rakt fram och stannar i sitt eget körfält, markerat med en bock; med hjulen vridna
        åt vänster knuffas den ut över mittlinjen i mötande körfält, markerat med ett kryss.
      </desc>

      <defs>
        <pattern id="vsv-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="vsv-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="2" />
        </pattern>
        {/* Korsskraffering: konfliktyta. Skild från de enkla snedränder som
            betyder "annat fordon". */}
        <pattern id="vsv-conflict" patternUnits="userSpaceOnUse" width="14" height="14">
          <path d="M 0 0 L 14 14 M 14 0 L 0 14" className="stroke-safety-600" strokeWidth="1.2" />
        </pattern>
        <marker
          id="vsv-arrow-other"
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
          id="vsv-arrow-plan"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="4.5"
          markerHeight="4.5"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-attention-600" />
        </marker>
        <marker
          id="vsv-arrow-push"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-text-primary" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Vänstersväng på landsväg
      </text>
      <text x="20" y="48" className="fill-text-secondary text-[13px]">
        Vy uppifrån. Du kör uppåt i bilden och väntar.
      </text>

      <g transform="translate(0 64)">
        {/* Vägbanor. Landsvägen inklusive vägrenar, och den mindre vägen. */}
        <rect x="140" y="0" width="120" height="560" className="fill-diagram-road" />
        <rect x="0" y="236" width="150" height="80" className="fill-diagram-road" />

        {/* Vägbanans ytterkanter */}
        <g className="stroke-diagram-edge" strokeWidth="1.5">
          <line x1="140" y1="0" x2="140" y2="236" />
          <line x1="140" y1="316" x2="140" y2="560" />
          <line x1="260" y1="0" x2="260" y2="560" />
          <line x1="0" y1="236" x2="140" y2="236" />
          <line x1="0" y1="316" x2="140" y2="316" />
        </g>

        {/* Kantlinjer, heldragna: gränsen mellan körbana och vägren */}
        <g className="stroke-diagram-marking" strokeWidth="3">
          <line x1="150" y1="0" x2="150" y2="236" />
          <line x1="150" y1="316" x2="150" y2="560" />
          <line x1="250" y1="0" x2="250" y2="560" />
          <line x1="0" y1="246" x2="142" y2="246" />
          <line x1="0" y1="306" x2="142" y2="306" />
        </g>

        {/* Mittlinjer */}
        <line x1="200" y1="0" x2="200" y2="560" className="stroke-diagram-marking" strokeWidth="3" strokeDasharray="16 12" />
        <line x1="0" y1="276" x2="138" y2="276" className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="10 10" />

        {/* Vägnamn — det enda som får ligga på vägbanan */}
        <text x="175" y="548" textAnchor="middle" className="fill-diagram-marking text-[13px] font-semibold">
          Landsväg
        </text>
        <text x="12" y="300" className="fill-diagram-marking text-[13px] font-semibold">
          Mindre väg
        </text>

        {/* Konfliktytan: den del av mötande körfält som svängen korsar */}
        <rect
          x="152"
          y="246"
          width="46"
          height="60"
          fill="url(#vsv-conflict)"
          className="stroke-safety-600"
          strokeWidth="1.5"
        />

        {/* Teckenförklaring */}
        <g>
          <line x1="266" y1="18" x2="292" y2="18" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#vsv-arrow-other)" />
          <text x="298" y="23" className="fill-text-secondary text-[13px]">
            Rör sig nu
          </text>
          <line
            x1="266"
            y1="42"
            x2="292"
            y2="42"
            className="stroke-attention-600"
            strokeWidth="3"
            strokeDasharray="8 6"
            markerEnd="url(#vsv-arrow-plan)"
          />
          <text x="298" y="47" className="fill-text-secondary text-[13px]">
            Planerad sväng
          </text>
        </g>

        {/* 1. Mötande bil i landsvägsfart: kör nedåt i vänstra körfältet */}
        <g className="stroke-primary-600" strokeWidth="3" strokeLinecap="round">
          <line x1="165" y1="28" x2="165" y2="46" />
          <line x1="175" y1="18" x2="175" y2="46" />
          <line x1="185" y1="28" x2="185" y2="46" />
        </g>
        <Car cx={175} cy={76} width={28} length={44} heading="down" fill="url(#vsv-stripes)" stroke="stroke-primary-600" />
        <line x1="175" y1="104" x2="175" y2="176" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#vsv-arrow-other)" />

        <Callout x={24} y={64} n={1} />
        <text x="40" y="69" className="fill-text-primary text-[13px] font-semibold">
          Mötande bil
        </text>
        <text x="14" y="88" className="fill-text-secondary text-[13px]">
          i landsvägsfart
        </text>
        <text x="14" y="104" className="fill-text-secondary text-[13px]">
          bedöm farten,
        </text>
        <text x="14" y="120" className="fill-text-secondary text-[13px]">
          inte bara avståndet
        </text>
        <Pointer x1={100} y1={76} x2={158} y2={72} />

        {/* Titta förbi den mötande */}
        <text x="264" y="196" className="fill-text-primary text-[13px] font-semibold">
          Titta förbi den:
        </text>
        <text x="264" y="214" className="fill-text-secondary text-[13px]">
          bakom kan en
        </text>
        <text x="264" y="230" className="fill-text-secondary text-[13px]">
          motorcykel ligga
        </text>
        <Pointer x1={262} y1={190} x2={198} y2={40} />

        {/* Svängen korsar mötande körfält */}
        <text x="14" y="192" className="fill-text-primary text-[13px] font-semibold">
          Svängen korsar
        </text>
        <text x="14" y="208" className="fill-text-primary text-[13px] font-semibold">
          mötande körfält
        </text>
        <Pointer x1={114} y1={202} x2={166} y2={250} />

        {/* Planerad sväng: korsar mötande körfält, slutar i rätt körfält
            på den mindre vägen (y 246–276 för den som kör västerut) */}
        <path
          d="M 216 350 C 216 300, 200 262, 136 262"
          className="fill-none stroke-attention-600"
          strokeWidth="3"
          strokeDasharray="10 8"
          markerEnd="url(#vsv-arrow-plan)"
        />

        {/* Din bil: står stilla intill mittlinjen, hjulen raka, blinkar vänster */}
        <Car
          cx={216}
          cy={376}
          width={28}
          length={44}
          heading="up"
          fill="url(#vsv-dots)"
          stroke="stroke-attention-600"
          brakeLights
          leftBlinker
        />

        <text x="14" y="338" className="fill-text-primary text-[15px] font-semibold">
          Du
        </text>
        <text x="14" y="356" className="fill-text-secondary text-[13px]">
          står stilla, väntar
        </text>
        <Pointer x1={114} y1={342} x2={202} y2={358} />

        <text x="14" y="388" className="fill-text-primary text-[13px] font-semibold">
          Nära vägmitten
        </text>
        <Pointer x1={108} y1={384} x2={198} y2={378} />

        <text x="14" y="424" className="fill-text-primary text-[13px] font-semibold">
          Blinkar vänster
        </text>
        <Pointer x1={114} y1={420} x2={204} y2={394} />

        {/* 3. Hjulen raka */}
        <Callout x={274} y={396} n={3} />
        <text x="290" y="401" className="fill-text-primary text-[13px] font-semibold">
          Hjulen raka
        </text>
        <text x="264" y="420" className="fill-text-secondary text-[13px]">
          inte vridna åt vänster
        </text>
        <Pointer x1={262} y1={404} x2={236} y2={366} />

        {/* Vägrenen */}
        <text x="272" y="550" className="fill-text-tertiary text-[13px]">
          vägren
        </text>
        <Pointer x1={270} y1={546} x2={255} y2={546} />

        {/* 2. Bakomvarande bil: kör uppåt i samma körfält som du */}
        <Car cx={225} cy={496} width={28} length={44} heading="up" fill="url(#vsv-stripes)" stroke="stroke-primary-600" />
        <line x1="225" y1="470" x2="225" y2="436" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#vsv-arrow-other)" />

        <Callout x={274} y={486} n={2} />
        <text x="290" y="491" className="fill-text-primary text-[13px] font-semibold">
          Bakom dig
        </text>
        <text x="264" y="510" className="fill-text-secondary text-[13px]">
          väntar sig ingen
        </text>
        <text x="264" y="526" className="fill-text-secondary text-[13px]">
          inbromsning här
        </text>
        <Pointer x1={262} y1={496} x2={242} y2={496} />
      </g>

      {/* Regelläget, ordagrant så långt bilden får gå */}
      <text x="20" y="652" className="fill-text-primary text-[14px] font-semibold">
        Ingen uttrycklig väjningsplikt mot mötande.
      </text>
      <text x="20" y="674" className="fill-text-secondary text-[13px]">
        Du ska förvissa dig om att svängen kan ske utan hinder
      </text>
      <text x="20" y="690" className="fill-text-secondary text-[13px]">
        för mötande och för dem på körbanan du kör in på.
      </text>

      <text x="20" y="720" className="fill-text-primary text-[13px] font-semibold">
        Avtömning
      </text>
      <text x="20" y="738" className="fill-text-secondary text-[13px]">
        Ligger många bakom dig kan du dra ut på vägrenen och
      </text>
      <text x="20" y="754" className="fill-text-secondary text-[13px]">
        släppa förbi dem. Svängen görs sedan från körbanans
      </text>
      <text x="20" y="770" className="fill-text-secondary text-[13px]">
        mitt — aldrig från vägrenen.
      </text>

      {/* Mönsterförklaring */}
      <g>
        <rect x="30" y="792" width="22" height="14" rx="2" fill="url(#vsv-dots)" className="stroke-attention-600" strokeWidth="1.5" />
        <text x="58" y="804" className="fill-text-tertiary text-[13px]">
          Du
        </text>
        <rect x="120" y="792" width="22" height="14" rx="2" fill="url(#vsv-stripes)" className="stroke-primary-600" strokeWidth="1.5" />
        <text x="148" y="804" className="fill-text-tertiary text-[13px]">
          Andra fordon
        </text>
        <rect x="252" y="792" width="22" height="14" rx="2" fill="url(#vsv-conflict)" className="stroke-safety-600" strokeWidth="1.5" />
        <text x="280" y="804" className="fill-text-tertiary text-[13px]">
          Konfliktyta
        </text>
      </g>

      {/* Förklaringsruta: varför hjulen ska stå raka medan du väntar */}
      <rect x="20" y="826" width="360" height="252" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="34" y="850" className="fill-text-primary text-[13px] font-semibold">
        Om du blir påkörd bakifrån medan du väntar:
      </text>
      <line x1="200" y1="862" x2="200" y2="1068" className="stroke-border-default" strokeWidth="1.5" strokeDasharray="6 4" />

      <text x="86" y="866" textAnchor="middle" className="fill-text-tertiary text-[13px]">
        mötande
      </text>
      <MiniVantan x={104} y={938} variant="raka" />
      <text x="104" y="1006" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Hjulen raka
      </text>
      <text x="104" y="1022" textAnchor="middle" className="fill-text-secondary text-[13px]">
        bilen knuffas
      </text>
      <text x="104" y="1038" textAnchor="middle" className="fill-text-secondary text-[13px]">
        rakt fram
      </text>
      <Check x={104} y={1060} />

      <text x="272" y="866" textAnchor="middle" className="fill-text-tertiary text-[13px]">
        mötande
      </text>
      <MiniVantan x={290} y={938} variant="vridna" />
      <text x="290" y="1006" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Hjulen vridna
      </text>
      <text x="290" y="1022" textAnchor="middle" className="fill-text-secondary text-[13px]">
        bilen knuffas ut i
      </text>
      <text x="290" y="1038" textAnchor="middle" className="fill-text-secondary text-[13px]">
        mötande körfält
      </text>
      <Cross x={290} y={1060} />
    </svg>
  );
}
