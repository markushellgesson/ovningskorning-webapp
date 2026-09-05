/**
 * Högerregeln — oreglerad korsning sedd uppifrån (INT-01, INT-02).
 * Trafikförordningen 3 kap 18 §: du har väjningsplikt mot fordon som
 * närmar sig från höger där ingen skylt eller signal anger annat.
 *
 * Geometri (högertrafik, vy uppifrån), i scenens koordinater. Scenen ritas
 * i en grupp förskjuten 44 px nedåt så att rubriken får luft; inget i
 * scenen har flyttats.
 * - Din bil kör uppåt i bilden. Dess högra sida är då bildens högra,
 *   så den ligger i den högra halvan av den lodräta vägen (x 200–240).
 * - Det andra fordonet kör åt vänster i bilden (västerut). Dess högra sida
 *   är då bildens övre, så det ligger i den övre halvan av den vågräta
 *   vägen (y 160–200). Det befinner sig till höger om dig — östra armen.
 *
 * Mönster: prickar = du, diagonala ränder = annat fordon. Samma mönster
 * betyder aldrig två saker i samma bild. Heldragen pil = rör sig nu,
 * streckad pil = din planerade väg, prickad linje = blick.
 * Förklaringsrutan längst ned ritar samma korsning i halv skala med
 * samma körfält och riktningar.
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
      d={`M ${x - 7} ${y - 7} L ${x + 7} ${y + 7} M ${x + 7} ${y - 7} L ${x - 7} ${y + 7}`}
      className="stroke-safety-600"
      strokeWidth="3"
      strokeLinecap="round"
    />
  );
}

/**
 * Samma korsning i halv skala för förklaringsrutan. Origo i korsningens mitt.
 * Din bil ligger i högra körfältet och kör uppåt, det andra fordonet i övre
 * körfältet och kör åt vänster — precis som i huvudbilden.
 */
function MiniKorsning({ x, y, variant }: { x: number; y: number; variant: 'vantar' | 'kor-ut' }) {
  const waits = variant === 'vantar';
  return (
    <g transform={`translate(${x} ${y}) scale(0.5)`}>
      <rect x="-40" y="-90" width="80" height="190" className="fill-diagram-road" />
      <rect x="-110" y="-40" width="220" height="80" className="fill-diagram-road" />
      <g className="stroke-diagram-edge" strokeWidth="3">
        <line x1="-40" y1="-90" x2="-40" y2="-40" />
        <line x1="40" y1="-90" x2="40" y2="-40" />
        <line x1="-40" y1="40" x2="-40" y2="100" />
        <line x1="40" y1="40" x2="40" y2="100" />
        <line x1="-110" y1="-40" x2="-40" y2="-40" />
        <line x1="-110" y1="40" x2="-40" y2="40" />
        <line x1="40" y1="-40" x2="110" y2="-40" />
        <line x1="40" y1="40" x2="110" y2="40" />
      </g>
      <g className="stroke-diagram-marking" strokeWidth="3" strokeDasharray="12 10">
        <line x1="0" y1="-90" x2="0" y2="-40" />
        <line x1="0" y1="40" x2="0" y2="100" />
        <line x1="-110" y1="0" x2="-40" y2="0" />
        <line x1="40" y1="0" x2="110" y2="0" />
      </g>
      {/* Annat fordon från höger: övre körfältet, kör åt vänster */}
      <Car cx={70} cy={-20} width={28} length={44} heading="left" fill="url(#hr-stripes)" stroke="stroke-primary-600" />
      <path
        d={waits ? 'M 42 -20 L -60 -20' : 'M 42 -20 L -20 -20'}
        className="stroke-primary-600"
        strokeWidth="5"
        markerEnd="url(#hr-arrow-other)"
      />
      {/* Du: högra körfältet, kör uppåt */}
      <Car cx={20} cy={80} width={28} length={44} heading="up" fill="url(#hr-dots)" stroke="stroke-attention-600" brakeLights={waits} />
      {!waits && (
        <path d="M 20 52 L 20 -20" className="stroke-attention-600" strokeWidth="5" markerEnd="url(#hr-arrow-you)" />
      )}
    </g>
  );
}

export function HogerregelnDiagram() {
  return (
    <svg
      viewBox="0 0 400 818"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="hogerregeln-title hogerregeln-desc"
    >
      <title id="hogerregeln-title">Högerregeln i en oreglerad korsning</title>
      <desc id="hogerregeln-desc">
        Fyrvägskorsning sedd uppifrån, utan vägmärken och utan signaler. Din bil, fylld med
        prickmönster, kör uppåt i bilden i det högra körfältet och närmar sig korsningen
        nedifrån med bromsljusen tända och en streckad pil framåt: din planerade väg. Ett annat
        fordon, fyllt med diagonala ränder och markerat 1, kommer från armen till höger om dig
        och kör åt vänster i bilden i sitt eget högra körfält, med fartstreck bakom sig och en
        heldragen pil framåt. Två prickade blicklinjer går från din bil åt vänster och åt höger:
        sök åt båda hållen. Markering 2 pekar på din bil: du väntar tills det är fritt. Markering
        3 markerar din väjningsplikt: du har väjningsplikt mot fordonet som närmar sig från
        höger. Plikten följer av regeln, inte av någon skylt — korsningen är oreglerad. En teckenförklaring skiljer på
        heldragen pil, rör sig nu, streckad pil, din planerade väg, och prickad linje, blick.
        Under bilden står: ingen skylt, ingen signal, högerregeln gäller. En ruta längst ned
        visar samma korsning två gånger: du väntar och fordonet från höger passerar först,
        markerat med en bock; du kör ut före det och bryter mot väjningsplikten, markerat med
        ett kryss.
      </desc>

      <defs>
        <pattern id="hr-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="hr-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path
            d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4"
            className="stroke-primary-600"
            strokeWidth="2"
          />
        </pattern>
        <marker
          id="hr-arrow-you"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-attention-600" />
        </marker>
        <marker
          id="hr-arrow-other"
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
          id="hr-arrow-note"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-text-tertiary" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Högerregeln
      </text>
      <text x="20" y="48" className="fill-text-secondary text-[13px]">
        Oreglerad korsning — ingen skylt, ingen signal
      </text>

      <g transform="translate(0 44)">
        {/* Vägbanor */}
        <rect x="160" y="40" width="80" height="350" className="fill-diagram-road" />
        <rect x="0" y="160" width="400" height="80" className="fill-diagram-road" />

        {/* Vägkanter (bara på armarna, inte genom korsningen) */}
        <g className="stroke-diagram-edge" strokeWidth="1.5">
          <line x1="160" y1="40" x2="160" y2="160" />
          <line x1="240" y1="40" x2="240" y2="160" />
          <line x1="160" y1="240" x2="160" y2="390" />
          <line x1="240" y1="240" x2="240" y2="390" />
          <line x1="0" y1="160" x2="160" y2="160" />
          <line x1="0" y1="240" x2="160" y2="240" />
          <line x1="240" y1="160" x2="400" y2="160" />
          <line x1="240" y1="240" x2="400" y2="240" />
        </g>

        {/* Mittlinjer, streckade, bryts i korsningen */}
        <g className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="10 8">
          <line x1="200" y1="40" x2="200" y2="160" />
          <line x1="200" y1="240" x2="200" y2="390" />
          <line x1="0" y1="200" x2="160" y2="200" />
          <line x1="240" y1="200" x2="400" y2="200" />
        </g>

        {/* Teckenförklaring, övre vänstra hörnet */}
        <g>
          <path d="M 14 66 L 40 66" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#hr-arrow-other)" />
          <text x="50" y="71" className="fill-text-secondary text-[13px]">
            Rör sig nu
          </text>
          <path
            d="M 14 88 L 40 88"
            className="stroke-attention-600"
            strokeWidth="3"
            strokeDasharray="8 6"
            markerEnd="url(#hr-arrow-you)"
          />
          <text x="50" y="93" className="fill-text-secondary text-[13px]">
            Din planerade väg
          </text>
          <line
            x1="14"
            y1="110"
            x2="40"
            y2="110"
            className="stroke-text-tertiary"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="0.5 6"
          />
          <text x="50" y="115" className="fill-text-secondary text-[13px]">
            Sök åt båda håll
          </text>
        </g>

        {/* 1. Annat fordon från höger: kör åt vänster i bilden, övre körfältet */}
        <g>
          <g className="stroke-primary-600" strokeWidth="2.5" strokeLinecap="round">
            <line x1="340" y1="172" x2="354" y2="172" />
            <line x1="340" y1="180" x2="364" y2="180" />
            <line x1="340" y1="188" x2="354" y2="188" />
          </g>
          <Car cx={310} cy={180} width={28} length={44} heading="left" fill="url(#hr-stripes)" stroke="stroke-primary-600" />
          <path d="M 282 180 L 250 180" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#hr-arrow-other)" />
          <Callout x={256} y={70} n={1} />
          <text x="272" y="75" className="fill-text-primary text-[13px] font-semibold">
            Kommer från höger
          </text>
          <text x="262" y="93" className="fill-text-secondary text-[13px]">
            i sitt högra körfält
          </text>
          <Pointer x1={300} y1={100} x2={322} y2={161} />
        </g>

        {/* Blicklinjer: sök åt vänster och åt höger */}
        <g
          className="stroke-text-tertiary"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="0.5 6"
          fill="none"
        >
          <line x1="206" y1="292" x2="110" y2="205" />
          <line x1="234" y1="292" x2="292" y2="200" />
        </g>

        {/* 2. Din bil: kör uppåt, högra körfältet, väntar */}
        <g>
          <Car cx={220} cy={314} width={28} length={44} heading="up" fill="url(#hr-dots)" stroke="stroke-attention-600" brakeLights />
          <path
            d="M 220 286 L 220 254"
            className="stroke-attention-600"
            strokeWidth="3"
            strokeDasharray="8 6"
            markerEnd="url(#hr-arrow-you)"
          />
          <Callout x={26} y={372} n={2} />
          <text x="42" y="377" className="fill-text-primary text-[14px] font-semibold">
            Du
          </text>
          <text x="15" y="396" className="fill-text-secondary text-[13px]">
            väntar tills det är fritt
          </text>
          <Pointer x1={62} y1={368} x2={203} y2={326} />
        </g>

        {/* Din vänster / din höger, sett från förarplatsen */}
        <g>
          <line
            x1="196"
            y1="316"
            x2="150"
            y2="316"
            className="stroke-text-tertiary"
            strokeWidth="1.5"
            markerEnd="url(#hr-arrow-note)"
          />
          <text x="140" y="321" textAnchor="end" className="fill-text-secondary text-[13px]">
            din vänster
          </text>
          <line
            x1="244"
            y1="316"
            x2="290"
            y2="316"
            className="stroke-text-tertiary"
            strokeWidth="1.5"
            markerEnd="url(#hr-arrow-note)"
          />
          <text x="300" y="321" className="fill-text-secondary text-[13px]">
            din höger
          </text>
        </g>

        {/* 3. Väjningsplikten. Ingen skylt ritas: högerregeln gäller just när
            ingen skylt finns, och bildens underrubrik säger det. En tidigare
            version hade en nedåtpekande triangel formad som B1 här, vilket
            motsade hela poängen. */}
        <g>
          <Callout x={258} y={394} n={3} />
          <text x="274" y="399" className="fill-text-primary text-[13px] font-semibold">
            Din väjningsplikt
          </text>
        </g>
      </g>

      {/* Regeltext */}
      <text
        x="200"
        y="476"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-medium"
      >
        Ingen skylt, ingen signal — högerregeln gäller.
      </text>
      <text x="200" y="498" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Du har väjningsplikt mot fordon som närmar sig
      </text>
      <text x="200" y="516" textAnchor="middle" className="fill-text-secondary text-[13px]">
        från höger. Sänk farten, sök åt båda hållen
      </text>
      <text x="200" y="534" textAnchor="middle" className="fill-text-secondary text-[13px]">
        och vänta tills det är fritt.
      </text>

      {/* Mönsterförklaring */}
      <g>
        <rect
          x="60"
          y="558"
          width="22"
          height="14"
          rx="2"
          fill="url(#hr-dots)"
          className="stroke-attention-600"
          strokeWidth="1.5"
        />
        <text x="90" y="570" className="fill-text-tertiary text-[13px]">
          Du (prickar)
        </text>
        <rect
          x="200"
          y="558"
          width="22"
          height="14"
          rx="2"
          fill="url(#hr-stripes)"
          className="stroke-primary-600"
          strokeWidth="1.5"
        />
        <text x="230" y="570" className="fill-text-tertiary text-[13px]">
          Annat fordon (ränder)
        </text>
      </g>

      {/* Förklaringsruta: vad väjningsplikten innebär i praktiken */}
      <rect x="20" y="590" width="360" height="212" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="34" y="614" className="fill-text-primary text-[13px] font-semibold">
        Om ett fordon närmar sig från höger:
      </text>
      <line x1="200" y1="632" x2="200" y2="796" className="stroke-border-default" strokeWidth="1.5" strokeDasharray="6 4" />

      <MiniKorsning x={100} y={690} variant="vantar" />
      <text x="100" y="758" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Du väntar
      </text>
      <text x="100" y="774" textAnchor="middle" className="fill-text-secondary text-[13px]">
        det passerar först
      </text>
      <Check x={100} y={790} />

      <MiniKorsning x={290} y={690} variant="kor-ut" />
      <text x="290" y="758" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Du kör ut före det
      </text>
      <text x="290" y="774" textAnchor="middle" className="fill-text-secondary text-[13px]">
        bryter mot väjningsplikten
      </text>
      <Cross x={290} y={790} />
    </svg>
  );
}
