/**
 * Körfältsbyte (LANE-02) — spegel, tecken, axelblick, byte.
 *
 * Vad bilden lär ut: axelblicken är den enda kontrollen som når döda vinkeln,
 * och den görs sist — precis före bytet. Bilden visar handlingen som ett
 * förlopp längs vägen, inte döda vinkelns zoner (det gör VEH-02/OBS-03).
 * Inga regelpåståenden utöver det uppdraget ger: bytet får ske bara när det
 * kan ske utan fara eller onödigt hinder för andra.
 *
 * ---- GEOMETRI (högertrafik, vy uppifrån, dukens egna koordinater) ----
 * ALL trafik i bilden kör UPPÅT (minskande y). För den som kör uppåt är
 * förarens högra sida bildens högra (hög x). Alltså:
 *   Körbanan x 150–262, y 78–638. Körfältslinjen ligger på x 206.
 *   Vänster körfält x 150–206 (mitt 178). Höger körfält x 206–262 (mitt 234).
 *
 * Elevens bil kör i HÖGER körfält och ska byta till VÄNSTER. Den ritas i tre
 * lägen längs vägen, nedifrån och upp (kaross 26 × 44):
 *   1 Spegel     (234, 566) → x 221–247, y 544–588   höger körfält
 *   2 Tecken     (234, 446) → x 221–247, y 424–468   höger körfält
 *   3 Axelblick  (234, 326) → x 221–247, y 304–348   höger körfält
 * Inga två lägen överlappar (minsta lucka mellan karosserna 76 px).
 *
 * Motorcykeln ligger snett bakom till VÄNSTER om läge 3 — alltså på den sida
 * eleven ska byta till, i det körfält eleven ska in i:
 *   MC (178, 362) → kaross x 171–185, y 345–379, styre x 169–187.
 *   Bakkanten på elevens bil är y 348; MC:s framkant är y 345 → fordonen
 *   överlappar bara 3 px i längdled: MC är i stort sett helt bakom, vid sidan.
 *   Kontroll mot mittlinjen: MC:s högsta x = 187 < 206 → vänster körfält.
 * Ledande bil i vänster körfält (178, 170) → x 165–191, y 148–192.
 *
 * SYNLINJERNA (räknade, inte uppskattade):
 *   Spegellinjen M3 går (215, 318) → (205, 350) och slutar med ett tvärstreck.
 *   MC:s högerkant är x 185, alltså slutar spegellinjen 20 px innan den når
 *   motorcykeln — spegeln visar den inte.
 *   Axelblickslinjen A går (221, 350) → (186, 360) och når MC:s högerkant
 *   (185) — axelblicken ser den. M3 och A korsar inte varandra (kontrollerat
 *   som segmentskärning; deras y-intervall 318–350 och 350–360 möts bara i en
 *   ändpunkt, x 205 mot x 221).
 *   Spegellinjen M1 vid läge 1 (215, 558) → (205, 590) betyder samma sak.
 *
 * FÖRKLARINGSRUTAN (lokala koordinater, skala 0,45, samma riktning uppåt):
 *   Vänster körfält x −56–0, höger x 0–56, elevens bil (28, 60) i båda.
 *   RÄTT: MC (−28, −20) har passerat; planerad väg slutar (−28, 34), alltså
 *         bakom MC:s bakkant y −3 → luckan är fri.
 *   FEL:  MC (−28, 88) ligger snett bakom (längsgående överlapp 11 px);
 *         konfliktytan y 36–68 ligger framför MC:s framkant y 71 — precis
 *         den plats eleven styr in i. Båda panelerna har MC i VÄNSTER fält.
 *
 * MÖNSTER (ett mönster = en enda betydelse i den här bilden):
 *   prickar = elevens bil, diagonala ränder = annan bil, kryss = motorcykeln,
 *   krysskraffering = konfliktyta.
 * LINJER: heldragen pil = rör sig nu; streckad grön pil = planerad väg;
 *   streckad linje med tvärstreck i änden = spegelns räckvidd, som tar slut;
 *   tunn heldragen linje med öga = axelblicken; korta parallella streck = fart.
 * Färgen bär ingen betydelse ensam — varje roll har mönster, form eller
 * etikett parallellt.
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
}

/** Bil med fronten uppåt; karossen upptar exakt (cx ± width/2, cy ± length/2). */
function Car({ cx, cy, width, length, heading, fill, stroke }: CarProps) {
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
    </g>
  );
}

/** Motorcykel med förare, fronten uppåt. Kaross 14 × 34, styre 18 brett. */
function Motorcycle({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <g className="fill-text-primary">
        <rect x="-2.5" y="-17" width="5" height="9" rx="1.5" />
        <rect x="-2.5" y="8" width="5" height="9" rx="1.5" />
      </g>
      <rect x="-7" y="-13" width="14" height="26" rx="5" fill="url(#kfb-cross)" className="stroke-safety-600" strokeWidth="2" />
      <line x1="-9" y1="-8" x2="9" y2="-8" className="stroke-text-primary" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="0" cy="1" r="4" className="fill-diagram-marking stroke-text-primary" strokeWidth="1.5" />
    </g>
  );
}

/** Vänsterblinkers: triangel som pekar ut åt vänster, med blinkstreck. */
function LeftBlinker({ x, y, flash }: { x: number; y: number; flash?: boolean }) {
  return (
    <g>
      <path
        d={`M ${x} ${y - 4} L ${x} ${y + 4} L ${x - 6} ${y} z`}
        className="fill-attention-600 stroke-attention-600"
        strokeWidth="1"
      />
      {flash && (
        <g className="stroke-attention-600" strokeWidth="2" strokeLinecap="round">
          <line x1={x - 9} y1={y - 3} x2={x - 13} y2={y - 5} />
          <line x1={x - 9} y1={y + 3} x2={x - 13} y2={y + 5} />
        </g>
      )}
    </g>
  );
}

/** Öga: markerar var en blick utgår ifrån. */
function Eye({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path
        d={`M ${x - 5} ${y} q 5 -4.5 10 0 q -5 4.5 -10 0 z`}
        className="fill-diagram-marking stroke-progress-600"
        strokeWidth="1.6"
      />
      <circle cx={x} cy={y} r="1.6" className="fill-progress-600" />
    </g>
  );
}

/** Fartstreck bakom ett fordon som kör uppåt. */
function SpeedMarks({ cx, y, className }: { cx: number; y: number; className: string }) {
  return (
    <g className={className} strokeWidth="2.5" strokeLinecap="round">
      <line x1={cx - 7} y1={y} x2={cx - 7} y2={y + 14} />
      <line x1={cx} y1={y} x2={cx} y2={y + 22} />
      <line x1={cx + 7} y1={y} x2={cx + 7} y2={y + 14} />
    </g>
  );
}

/** Numrerat steg i förloppet. */
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

/** Faromarkering: fyrkantig bricka med utropstecken — annan form än stegen. */
function Hazard({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width="22" height="22" rx="4" className="fill-diagram-marking stroke-safety-600" strokeWidth="2.5" />
      <text x={x + 11} y={y + 17} textAnchor="middle" className="fill-safety-600 text-[15px] font-semibold">
        !
      </text>
    </g>
  );
}

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
 * Samma väg i skala 0,45 för förklaringsrutan: vänster körfält x −56–0,
 * höger körfält x 0–56, all trafik uppåt — samma riktning som huvudbilden.
 */
function MiniByte({ x, y, variant }: { x: number; y: number; variant: 'axelblick' | 'utan-axelblick' }) {
  const ok = variant === 'axelblick';
  return (
    <g transform={`translate(${x} ${y}) scale(0.45)`}>
      <rect x="-56" y="-110" width="112" height="220" className="fill-diagram-road" />
      {!ok && (
        <rect x="-56" y="36" width="56" height="32" fill="url(#kfb-hatch)" className="stroke-safety-600" strokeWidth="2" />
      )}
      <g className="fill-none stroke-diagram-edge" strokeWidth="3">
        <line x1="-56" y1="-110" x2="-56" y2="110" />
        <line x1="56" y1="-110" x2="56" y2="110" />
      </g>
      <line x1="0" y1="-110" x2="0" y2="110" className="stroke-diagram-marking" strokeWidth="3" strokeDasharray="14 10" />

      <Motorcycle cx={-28} cy={ok ? -20 : 88} />
      <Car cx={28} cy={60} width={26} length={44} heading="up" fill="url(#kfb-dots)" stroke="stroke-attention-600" />
      <path
        d={ok ? 'M 28 36 C 28 18 -28 26 -28 34' : 'M 28 36 C 28 24 -28 30 -28 50'}
        className="fill-none stroke-progress-600"
        strokeWidth="5"
        strokeDasharray="12 9"
        markerEnd="url(#kfb-arrow-plan)"
      />
    </g>
  );
}

export function KorfaltsbyteDiagram() {
  return (
    <svg
      viewBox="0 0 440 1052"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="kfb-title kfb-desc"
    >
      <title id="kfb-title">Körfältsbyte till vänster</title>
      <desc id="kfb-desc">
        En väg med två körfält i samma riktning, sedd uppifrån. All trafik kör uppåt i bilden.
        Elevens bil, fylld med prickmönster, visas i tre lägen längs det högra körfältet, nedifrån
        och upp. I det nedersta läget, markerat med siffran 1, går en streckad linje bakåt från
        vänster ytterspegel och slutar med ett tvärstreck: så långt når spegeln. I mittenläget,
        markerat med siffran 2, lyser vänsterblinkers som två trianglar utanför bilens vänstra
        sida. I det översta läget, markerat med siffran 3, går dels samma streckade spegellinje
        bakåt och tar slut, dels en tunn heldragen linje som utgår från ett öga vid bilens bakre
        vänstra hörn och når ända fram till en motorcykel. Motorcykeln är fylld med krysmönster
        och ligger snett bakom elevens bil i det vänstra körfältet, med korta parallella
        fartstreck bakom sig. En fyrkantig faromarkering med utropstecken i vänstermarginalen
        pekar på motorcykeln: den ligger i döda vinkeln, spegeln visar den inte, axelblicken gör
        det. Längre fram i det vänstra körfältet kör en annan bil, fylld med diagonala ränder. En
        teckenförklaring skiljer på heldragen pil, rör sig nu, streckad linje med tvärstreck, så
        långt spegeln når, tunn linje med öga, axelblick, korta parallella streck, hög fart, och
        streckad grön pil, planerad väg. En rad under bilden säger att avstånden mellan fordonen
        är förkortade för att rymmas i bilden. En ruta längst ned visar samma väg två gånger:
        axelblicken görs, motorcykeln upptäcks, eleven väntar och byter först efter den, markerat
        med en bock, och axelblicken hoppas över, eleven styr ut i en yta med krysskraffering rakt
        framför motorcykeln, markerat med ett kryss.
      </desc>

      <defs>
        <pattern id="kfb-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="kfb-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="2" />
        </pattern>
        <pattern id="kfb-cross" patternUnits="userSpaceOnUse" width="7" height="7">
          <path d="M1.5,1.5 l4,4 M5.5,1.5 l-4,4" className="stroke-safety-600" strokeWidth="1.4" />
        </pattern>
        <pattern id="kfb-hatch" patternUnits="userSpaceOnUse" width="10" height="10">
          <path d="M0,10 l10,-10 M0,0 l10,10" className="stroke-safety-600" strokeWidth="1.3" />
        </pattern>
        <marker id="kfb-arrow-move" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary-600" />
        </marker>
        <marker id="kfb-arrow-mc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-safety-600" />
        </marker>
        <marker id="kfb-arrow-plan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-progress-600" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Körfältsbyte till vänster
      </text>
      <text x="20" y="48" className="fill-text-secondary text-[14px]">
        Spegel, tecken, axelblick — i den ordningen
      </text>

      {/* Körbana: två körfält, all trafik uppåt */}
      <rect x="150" y="78" width="112" height="560" className="fill-diagram-road" />
      <g className="fill-none stroke-diagram-edge" strokeWidth="2">
        <line x1="150" y1="78" x2="150" y2="638" />
        <line x1="262" y1="78" x2="262" y2="638" />
      </g>
      <line x1="206" y1="78" x2="206" y2="638" className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="14 10" />

      {/* Teckenförklaring i högermarginalen, ovanför stegen */}
      <g>
        <path d="M 272 100 L 296 100" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#kfb-arrow-move)" />
        <text x="306" y="105" className="fill-text-secondary text-[14px]">
          Rör sig nu
        </text>
        <g className="stroke-primary-600" strokeWidth="2.5">
          <line x1="272" y1="126" x2="292" y2="126" strokeDasharray="6 4" />
          <line x1="292" y1="121" x2="292" y2="131" />
        </g>
        <text x="306" y="131" className="fill-text-secondary text-[14px]">
          Spegeln når hit
        </text>
        <line x1="278" y1="152" x2="298" y2="152" className="stroke-progress-600" strokeWidth="2.5" />
        <Eye x={272} y={152} />
        <text x="306" y="157" className="fill-text-secondary text-[14px]">
          Axelblick
        </text>
        <g className="stroke-safety-600" strokeWidth="2.5" strokeLinecap="round">
          <line x1="276" y1="172" x2="276" y2="184" />
          <line x1="284" y1="170" x2="284" y2="186" />
          <line x1="292" y1="172" x2="292" y2="184" />
        </g>
        <text x="306" y="183" className="fill-text-secondary text-[14px]">
          Hög fart
        </text>
        <path
          d="M 272 206 L 296 206"
          className="stroke-progress-600"
          strokeWidth="3"
          strokeDasharray="8 6"
          markerEnd="url(#kfb-arrow-plan)"
        />
        <text x="306" y="211" className="fill-text-secondary text-[14px]">
          Planerad väg
        </text>
      </g>

      {/* Ledande bil i vänster körfält */}
      <line x1="178" y1="146" x2="178" y2="116" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#kfb-arrow-move)" />
      <Car cx={178} cy={170} width={26} length={44} heading="up" fill="url(#kfb-stripes)" stroke="stroke-primary-600" />
      <g>
        <text x="14" y="156" className="fill-text-primary text-[14px] font-semibold">
          Vänster körfält
        </text>
        <text x="14" y="174" className="fill-text-secondary text-[14px]">
          dit du ska
        </text>
        <Pointer x1={120} y1={166} x2={163} y2={168} />
      </g>

      {/* Motorcykeln i döda vinkeln: vänster körfält, snett bakom elevens bil */}
      <SpeedMarks cx={178} y={384} className="stroke-safety-600" />
      <line x1="178" y1="341" x2="178" y2="312" className="stroke-safety-600" strokeWidth="3" markerEnd="url(#kfb-arrow-mc)" />
      <Motorcycle cx={178} cy={362} />

      {/* Läge 3: axelblicken */}
      <line x1="234" y1="300" x2="234" y2="272" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#kfb-arrow-move)" />
      <Car cx={234} cy={326} width={26} length={44} heading="up" fill="url(#kfb-dots)" stroke="stroke-attention-600" />
      <LeftBlinker x={219} y={308} flash />
      <LeftBlinker x={219} y={344} />
      <g className="stroke-primary-600" strokeWidth="2.5">
        <line x1="215" y1="318" x2="205" y2="350" strokeDasharray="6 4" />
        <line x1="200.2" y1="348.5" x2="209.8" y2="351.5" />
      </g>
      <line x1="221" y1="350" x2="186" y2="360" className="stroke-progress-600" strokeWidth="2.5" />
      <Eye x={226} y={352} />

      {/* Läge 2: tecken */}
      <line x1="234" y1="420" x2="234" y2="396" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#kfb-arrow-move)" />
      <Car cx={234} cy={446} width={26} length={44} heading="up" fill="url(#kfb-dots)" stroke="stroke-attention-600" />
      <LeftBlinker x={219} y={428} flash />
      <LeftBlinker x={219} y={464} flash />

      {/* Läge 1: spegel */}
      <line x1="234" y1="540" x2="234" y2="516" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#kfb-arrow-move)" />
      <Car cx={234} cy={566} width={26} length={44} heading="up" fill="url(#kfb-dots)" stroke="stroke-attention-600" />
      <g className="stroke-primary-600" strokeWidth="2.5">
        <line x1="215" y1="558" x2="205" y2="590" strokeDasharray="6 4" />
        <line x1="200.2" y1="588.5" x2="209.8" y2="591.5" />
      </g>

      {/* Faromarkering: motorcykeln i döda vinkeln */}
      <g>
        <Hazard x={20} y={330} />
        <text x="50" y="347" className="fill-text-primary text-[14px] font-semibold">
          Döda vinkeln
        </text>
        <text x="14" y="374" className="fill-text-secondary text-[14px]">
          Spegeln visar den
        </text>
        <text x="14" y="392" className="fill-text-secondary text-[14px]">
          inte. Axelblicken
        </text>
        <text x="14" y="410" className="fill-text-secondary text-[14px]">
          gör det.
        </text>
        <Pointer x1={140} y1={362} x2={166} y2={362} />
      </g>

      {/* Steg 3 */}
      <g>
        <Callout x={300} y={300} n={3} />
        <text x="318" y="305" className="fill-text-primary text-[14px] font-semibold">
          Axelblick
        </text>
        <text x="284" y="325" className="fill-text-secondary text-[14px]">
          vrid huvudet, sist
        </text>
        <text x="284" y="343" className="fill-text-secondary text-[14px]">
          — precis före bytet
        </text>
        <Pointer x1={296} y1={314} x2={250} y2={320} />
      </g>

      {/* Steg 2 */}
      <g>
        <Callout x={300} y={430} n={2} />
        <text x="318" y="435" className="fill-text-primary text-[14px] font-semibold">
          Tecken
        </text>
        <text x="284" y="455" className="fill-text-secondary text-[14px]">
          blinkers i god tid,
        </text>
        <text x="284" y="473" className="fill-text-secondary text-[14px]">
          innan du styr
        </text>
        <Pointer x1={296} y1={444} x2={250} y2={442} />
      </g>

      {/* Steg 1 */}
      <g>
        <Callout x={300} y={556} n={1} />
        <text x="318" y="561" className="fill-text-primary text-[14px] font-semibold">
          Spegel
        </text>
        <text x="284" y="581" className="fill-text-secondary text-[14px]">
          vad finns bakom
        </text>
        <text x="284" y="599" className="fill-text-secondary text-[14px]">
          och bredvid dig?
        </text>
        <Pointer x1={296} y1={570} x2={250} y2={564} />
      </g>

      {/* Vad bilden lär ut */}
      <text x="220" y="664" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        Spegel, tecken, axelblick — i den ordningen.
      </text>
      <text x="220" y="682" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        Axelblicken är ingen eftertanke, den kommer sist.
      </text>
      <text x="220" y="706" textAnchor="middle" className="fill-text-secondary text-[14px]">
        Byt körfält först när det kan ske utan fara eller onödigt
      </text>
      <text x="220" y="724" textAnchor="middle" className="fill-text-secondary text-[14px]">
        hinder — luckan ska vara så stor att ingen behöver bromsa.
      </text>
      <text x="220" y="746" textAnchor="middle" className="fill-text-tertiary text-[14px]">
        Avstånden mellan fordonen är förkortade för att rymmas i bilden.
      </text>

      {/* Mönsterförklaring */}
      <g>
        <rect x="26" y="768" width="22" height="14" rx="2" fill="url(#kfb-dots)" className="stroke-attention-600" strokeWidth="1.5" />
        <text x="54" y="780" className="fill-text-tertiary text-[14px]">
          Du, i tre lägen
        </text>
        <rect x="164" y="768" width="22" height="14" rx="2" fill="url(#kfb-stripes)" className="stroke-primary-600" strokeWidth="1.5" />
        <text x="192" y="780" className="fill-text-tertiary text-[14px]">
          Annan bil
        </text>
        <rect x="272" y="768" width="22" height="14" rx="2" fill="url(#kfb-cross)" className="stroke-safety-600" strokeWidth="1.5" />
        <text x="300" y="780" className="fill-text-tertiary text-[14px]">
          Motorcykel
        </text>
      </g>

      {/* Förklaringsruta: vad axelblicken avgör */}
      <rect x="20" y="800" width="400" height="228" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="34" y="824" className="fill-text-primary text-[14px] font-semibold">
        Vad axelblicken avgör:
      </text>
      <line x1="220" y1="840" x2="220" y2="1016" className="stroke-border-default" strokeWidth="1.5" strokeDasharray="6 4" />

      <MiniByte x={118} y={900} variant="axelblick" />
      <text x="118" y="966" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Axelblicken görs
      </text>
      <text x="118" y="982" textAnchor="middle" className="fill-text-secondary text-[14px]">
        du väntar, byter efter den
      </text>
      <Check x={118} y={1004} />

      <MiniByte x={322} y={900} variant="utan-axelblick" />
      <text x="322" y="966" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Axelblicken hoppas över
      </text>
      <text x="322" y="982" textAnchor="middle" className="fill-text-secondary text-[14px]">
        du styr ut mot motorcykeln
      </text>
      <Cross x={322} y={1004} />
    </svg>
  );
}
