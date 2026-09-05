/**
 * Avfart från motorväg (HWY-02) — var farten tas ned.
 *
 * Bilden lär ut körteknik: farten sänks i retardationsfältet, inte i det
 * genomgående körfältet, och den är nere innan avfartskurvan börjar. Det är
 * körteknik, inte en regel — och accelerationsfältets förhållanden hör inte
 * hit. Ingenting i bilden handlar om påfart.
 *
 * GEOMETRI (högertrafik, vy uppifrån). Alla koordinater är dukens egna;
 * scenen ligger inte i någon förskjuten grupp.
 *
 * All trafik i bilden kör UPPÅT (minskande y). För den som kör uppåt är
 * förarens högra sida bildens högra (hög x). Alltså:
 * - Genomgående körbana x 140–244. Vänster körfält x 140–192 (mitt 166),
 *   höger körfält x 192–244 (mitt 218). Körfältslinjen ligger på x 192.
 * - Avfarten lämnar körbanan åt HÖGER, alltså mot hög x. Retardationsfältet
 *   ligger därför x 244–296 (mitt 270), med kilens spets i (244, 470) och
 *   full bredd från y 400 och uppåt.
 * - Elevens bil, läge 1: (218, 470) — i höger genomgående körfält, farten
 *   kvar, precis där retardationsfältet börjar.
 * - Elevens bil, läge 2: (270, 330) — inne i retardationsfältet, bromsljus.
 *   De två lägena överlappar inte: läge 1 upptar y 448–492, läge 2 y 308–352.
 * - Annan trafik: (166, 200) i vänster körfält och (218, 540) tätt bakom
 *   eleven i höger körfält. Båda kör uppåt, båda i sitt eget högra körfält
 *   sett från sin egen färdriktning.
 * - Avfartskurvan böjer av uppåt höger från y 300 och ut ur duken.
 *
 * MÖNSTER (varje mönster betyder en enda sak i den här bilden):
 * prickar = elevens bil, diagonala ränder = annan trafik,
 * krysskraffering = konflikt (bara i förklaringsrutan).
 * Heldragen pil = rör sig nu, streckad grön pil = elevens planerade väg,
 * korta parallella streck bakom ett fordon = hög fart,
 * röda klossar i fordonets bakkant = bromsljus.
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

/** Fartstreck bakom ett fordon som kör uppåt: tre korta streck, olika längd. */
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

/**
 * Samma avfart i skala 0,45 för förklaringsrutan. Origo mitt i scenen.
 * Genomgående körfält x −60–0, retardationsfält x 0–60 med kilens spets i
 * (0, 60): samma sida och samma riktning som i huvudbilden — trafiken kör
 * uppåt och avfarten ligger till höger.
 */
function MiniAvfart({ x, y, variant }: { x: number; y: number; variant: 'i-faltet' | 'i-korfaltet' }) {
  const inLane = variant === 'i-faltet';
  return (
    <g transform={`translate(${x} ${y}) scale(0.45)`}>
      <rect x="-60" y="-110" width="60" height="220" className="fill-diagram-road" />
      <polygon points="0,60 60,20 60,-110 0,-110" className="fill-diagram-road" />
      <g className="fill-none stroke-diagram-edge" strokeWidth="3">
        <line x1="-60" y1="-110" x2="-60" y2="110" />
        <line x1="0" y1="60" x2="0" y2="110" />
        <path d="M 0 60 L 60 20 L 60 -110" />
      </g>
      <line x1="0" y1="-110" x2="0" y2="60" className="stroke-diagram-marking" strokeWidth="3" strokeDasharray="14 10" />

      {inLane ? (
        <>
          {/* Eleven bromsar i retardationsfältet, trafiken bakom rullar på */}
          <Car cx={30} cy={-30} width={26} length={44} heading="up" fill="url(#exit-dots)" stroke="stroke-attention-600" brakeLights />
          <SpeedMarks cx={-30} y={48} className="stroke-primary-600" />
          <Car cx={-30} cy={20} width={26} length={44} heading="up" fill="url(#exit-stripes)" stroke="stroke-primary-600" />
        </>
      ) : (
        <>
          {/* Eleven bromsar kvar i körfältet: fordonet bakom måste bromsa */}
          <rect
            x="-60"
            y="-16"
            width="60"
            height="32"
            fill="url(#exit-hatch)"
            className="stroke-safety-600"
            strokeWidth="2"
          />
          <Car cx={-30} cy={-40} width={26} length={44} heading="up" fill="url(#exit-dots)" stroke="stroke-attention-600" brakeLights />
          <Car cx={-30} cy={40} width={26} length={44} heading="up" fill="url(#exit-stripes)" stroke="stroke-primary-600" brakeLights />
        </>
      )}
    </g>
  );
}

export function AvfartMotorvagDiagram() {
  return (
    <svg
      viewBox="0 0 440 1030"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="exit-title exit-desc"
    >
      <title id="exit-title">Avfart från motorväg — var farten tas ned</title>
      <desc id="exit-desc">
        Motorvägens ena körbana sedd uppifrån, med två genomgående körfält och ett
        retardationsfält som viker av åt höger. All trafik kör uppåt i bilden. Elevens bil, fylld
        med prickmönster, visas i två lägen förbundna med en streckad grön pil. I läge 1 ligger
        den kvar i det högra genomgående körfältet med tre korta parallella streck bakom sig:
        farten är kvar. Markering 1 pekar dit: behåll farten fram till fältet. I läge 2 ligger den
        inne i retardationsfältet med röda bromsljus i bakkanten, och markering 2 pekar dit:
        bromsa först när hela bilen är i fältet. Markering 3 pekar på avfartskurvan längst upp
        till höger: ha farten nere innan kurvan börjar. Ett fordon med diagonala ränder ligger tätt
        bakom eleven i samma körfält, ett annat rullar i det vänstra körfältet, båda med fartstreck
        bakom sig. En teckenförklaring skiljer på heldragen pil, rör sig nu, streckad grön pil,
        din planerade väg, korta parallella streck, hög fart, och röda klossar i bakkanten,
        bromsljus. En rad under bilden säger att avstånden mellan fordonen är förkortade för att rymmas i bilden. En ruta längst ned visar samma avfart två gånger: eleven bromsar i
        retardationsfältet och fordonet bakom rullar på, markerat med en bock, och eleven bromsar
        kvar i det genomgående körfältet så att fordonet bakom måste bromsa, med ytan mellan dem
        krysskrafferad och markerat med ett kryss.
      </desc>

      <defs>
        <pattern id="exit-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="exit-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="2" />
        </pattern>
        <pattern id="exit-hatch" patternUnits="userSpaceOnUse" width="10" height="10">
          <path d="M0,10 l10,-10 M0,0 l10,10" className="stroke-safety-600" strokeWidth="1.3" />
        </pattern>
        <marker id="exit-arrow-other" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary-600" />
        </marker>
        <marker id="exit-arrow-plan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-progress-600" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Avfart från motorväg
      </text>
      <text x="20" y="48" className="fill-text-secondary text-[13px]">
        Farten tas ned i retardationsfältet
      </text>

      {/* Genomgående körbana: två körfält, all trafik uppåt */}
      <rect x="140" y="92" width="104" height="508" className="fill-diagram-road" />

      {/* Retardationsfält och avfartskurva: kilen börjar i (244, 470) */}
      <path
        d="M 244 470 L 296 400 L 296 300 C 296 240 340 214 440 206 L 440 152 C 350 160 262 190 244 260 Z"
        className="fill-diagram-road"
      />

      {/* Vägmarkeringar */}
      <g className="fill-none stroke-diagram-edge" strokeWidth="2">
        <line x1="140" y1="92" x2="140" y2="600" />
        <line x1="244" y1="92" x2="244" y2="258" />
        <line x1="244" y1="472" x2="244" y2="600" />
        <path d="M 244 470 L 296 400 L 296 300 C 296 240 340 214 440 206" />
        <path d="M 440 152 C 350 160 262 190 244 260" />
      </g>
      <g className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="14 10">
        <line x1="192" y1="92" x2="192" y2="600" />
        <line x1="244" y1="262" x2="244" y2="468" />
      </g>

      {/* Teckenförklaring i vänstermarginalen */}
      <g>
        <path d="M 14 104 L 40 104" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#exit-arrow-other)" />
        <text x="48" y="109" className="fill-text-secondary text-[13px]">
          Rör sig nu
        </text>
        <path
          d="M 14 126 L 40 126"
          className="stroke-progress-600"
          strokeWidth="3"
          strokeDasharray="8 6"
          markerEnd="url(#exit-arrow-plan)"
        />
        <text x="48" y="131" className="fill-text-secondary text-[13px]">
          Din väg
        </text>
        <g className="stroke-primary-600" strokeWidth="2.5" strokeLinecap="round">
          <line x1="16" y1="146" x2="16" y2="158" />
          <line x1="25" y1="144" x2="25" y2="160" />
          <line x1="34" y1="146" x2="34" y2="158" />
        </g>
        <text x="48" y="157" className="fill-text-secondary text-[13px]">
          Hög fart
        </text>
        <g className="fill-safety-600">
          <rect x="16" y="176" width="8" height="4" />
          <rect x="30" y="176" width="8" height="4" />
        </g>
        <text x="48" y="183" className="fill-text-secondary text-[13px]">
          Bromsljus
        </text>
      </g>

      {/* Annan trafik i vänster körfält */}
      <SpeedMarks cx={166} y={226} className="stroke-primary-600" />
      <Car cx={166} cy={200} width={26} length={44} heading="up" fill="url(#exit-stripes)" stroke="stroke-primary-600" />

      {/* Elevens bil, läge 2: inne i retardationsfältet, bromsar */}
      <Car cx={270} cy={330} width={26} length={44} heading="up" fill="url(#exit-dots)" stroke="stroke-attention-600" brakeLights />

      {/* Elevens bil, läge 1: kvar i körfältet med farten uppe */}
      <SpeedMarks cx={218} y={496} className="stroke-attention-600" />
      <Car cx={218} cy={470} width={26} length={44} heading="up" fill="url(#exit-dots)" stroke="stroke-attention-600" />

      {/* Elevens planerade väg: över i fältet, sedan ut i avfartskurvan */}
      <path
        d="M 218 444 C 218 412 270 404 270 358"
        className="fill-none stroke-progress-600"
        strokeWidth="3"
        strokeDasharray="8 6"
        markerEnd="url(#exit-arrow-plan)"
      />
      <path
        d="M 270 300 C 282 246 320 210 388 191"
        className="fill-none stroke-progress-600"
        strokeWidth="3"
        strokeDasharray="8 6"
        markerEnd="url(#exit-arrow-plan)"
      />

      {/* Fordonet bakom eleven, i samma körfält */}
      <SpeedMarks cx={218} y={566} className="stroke-primary-600" />
      <Car cx={218} cy={540} width={26} length={44} heading="up" fill="url(#exit-stripes)" stroke="stroke-primary-600" />

      {/* 1. Behåll farten fram till fältet */}
      <g>
        <Callout x={26} y={452} n={1} />
        <text x="42" y="457" className="fill-text-primary text-[13px] font-semibold">
          Behåll farten
        </text>
        <text x="16" y="477" className="fill-text-secondary text-[13px]">
          fram till fältet
        </text>
        <Pointer x1={104} y1={466} x2={202} y2={470} />
      </g>

      {/* 2. Bromsa i retardationsfältet */}
      <g>
        <Callout x={318} y={400} n={2} />
        <text x="334" y="405" className="fill-text-primary text-[13px] font-semibold">
          Bromsa här
        </text>
        <text x="302" y="425" className="fill-text-secondary text-[13px]">
          först när hela bilen
        </text>
        <text x="302" y="443" className="fill-text-secondary text-[13px]">
          är i fältet
        </text>
        <Pointer x1={310} y1={389} x2={285} y2={350} />
      </g>

      {/* 3. Avfartskurvan */}
      <g>
        <Callout x={306} y={104} n={3} />
        <text x="322" y="109" className="fill-text-primary text-[13px] font-semibold">
          Avfartskurvan
        </text>
        <text x="298" y="129" className="fill-text-secondary text-[13px]">
          farten nere innan
        </text>
        <text x="298" y="147" className="fill-text-secondary text-[13px]">
          kurvan börjar
        </text>
        <Pointer x1={330} y1={158} x2={352} y2={193} />
      </g>

      {/* Etikett: retardationsfältet börjar vid kilen */}
      <g>
        <text x="302" y="490" className="fill-text-primary text-[13px] font-semibold">
          Retardationsfältet
        </text>
        <text x="302" y="508" className="fill-text-secondary text-[13px]">
          börjar vid kilen
        </text>
        <Pointer x1={300} y1={498} x2={253} y2={459} />
      </g>

      {/* Etikett: trafiken bakom */}
      <g>
        <text x="16" y="536" className="fill-text-primary text-[13px] font-semibold">
          Trafiken bakom
        </text>
        <text x="16" y="554" className="fill-text-secondary text-[13px]">
          ligger tätt
        </text>
        <Pointer x1={110} y1={546} x2={202} y2={542} />
      </g>

      {/* Vad bilden lär ut */}
      <text x="220" y="654" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        Farten tas ned i retardationsfältet,
      </text>
      <text x="220" y="672" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        inte i det genomgående körfältet.
      </text>
      <text x="220" y="696" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Det är körteknik, inte en regel: trafiken bakom ligger tätt och
      </text>
      <text x="220" y="714" textAnchor="middle" className="fill-text-secondary text-[13px]">
        räknar med att du håller farten fram till fältet. Ha farten nere
      </text>
      <text x="220" y="732" textAnchor="middle" className="fill-text-secondary text-[13px]">
        innan avfartskurvan börjar.
      </text>

      {/* Notis: avstånden ryms inte skalenligt */}
      <text x="220" y="756" textAnchor="middle" className="fill-text-tertiary text-[13px]">
        Avstånden mellan fordonen är förkortade för att rymmas i bilden.
      </text>

      {/* Mönsterförklaring */}
      <g>
        <rect x="46" y="778" width="22" height="14" rx="2" fill="url(#exit-dots)" className="stroke-attention-600" strokeWidth="1.5" />
        <text x="74" y="790" className="fill-text-tertiary text-[13px]">
          Du
        </text>
        <rect x="118" y="778" width="22" height="14" rx="2" fill="url(#exit-stripes)" className="stroke-primary-600" strokeWidth="1.5" />
        <text x="146" y="790" className="fill-text-tertiary text-[13px]">
          Annan trafik
        </text>
        <rect x="248" y="778" width="22" height="14" rx="2" fill="url(#exit-hatch)" className="stroke-safety-600" strokeWidth="1.5" />
        <text x="276" y="790" className="fill-text-tertiary text-[13px]">
          Konflikt
        </text>
      </g>

      {/* Förklaringsruta: var farten tas ned */}
      <rect x="20" y="812" width="400" height="200" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="34" y="836" className="fill-text-primary text-[13px] font-semibold">
        Var du bromsar ned:
      </text>
      <line x1="220" y1="852" x2="220" y2="1000" className="stroke-border-default" strokeWidth="1.5" strokeDasharray="6 4" />

      <MiniAvfart x={118} y={908} variant="i-faltet" />
      <text x="118" y="962" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        I retardationsfältet
      </text>
      <text x="118" y="978" textAnchor="middle" className="fill-text-secondary text-[13px]">
        trafiken bakom rullar på
      </text>
      <Check x={118} y={996} />

      <MiniAvfart x={322} y={908} variant="i-korfaltet" />
      <text x="322" y="962" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        I körfältet
      </text>
      <text x="322" y="978" textAnchor="middle" className="fill-text-secondary text-[13px]">
        trafiken bakom måste bromsa
      </text>
      <Cross x={322} y={996} />
    </svg>
  );
}
