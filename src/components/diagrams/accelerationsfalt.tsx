/**
 * Påfart med accelerationsfält (HWY-01) — fart, lucka och infogning.
 *
 * Bilden lär ut körteknik: farten anpassas till trafiken i körfältet redan i
 * accelerationsfältet, luckan väljs innan fältet tar slut, och infogningen
 * sker mjukt. Inga regelpåståenden utöver det: vad lagen säger om påfart står
 * i momentets text.
 *
 * GEOMETRI (högertrafik, vy uppifrån). Alla koordinater nedan är dukens egna
 * — scenen ligger inte i någon förskjuten grupp.
 *
 * All trafik i bilden kör UPPÅT (minskande y). För den som kör uppåt är
 * förarens högra sida bildens högra (hög x). Alltså:
 * - Genomgående körbana x 140–244. Vänster körfält x 140–192 (mitt 166),
 *   höger körfält x 192–244 (mitt 218). Körfältslinjen ligger på x 192.
 * - Accelerationsfältet ligger till HÖGER om höger körfält, x 244–296
 *   (mitt 270), eftersom en påfart ansluter från förarens högra sida.
 *   Det är därför elevens bil ligger på x 270 och inte på x 166.
 * - Elevens bil: (270, 440) — i accelerationsfältet.
 * - Annan trafik: (166, 170) i vänster körfält, (218, 250) och (218, 470) i
 *   höger körfält. Alla tre i den genomgående körbanan, alla på väg uppåt.
 * - Luckan är mellanrummet i höger körfält mellan fordonet på (218, 250),
 *   vars bakkant ligger på y 272, och fordonet på (218, 470), vars framkant
 *   ligger på y 448. Luckan markeras mellan y 306 och y 450.
 * - Fältets slut: accelerationsfältets yttre kant går från (296, 282) till
 *   (244, 212) — kilen där fältet tar slut. Konfliktytan ligger över kilen.
 *
 * MÖNSTER (varje mönster betyder en enda sak i den här bilden):
 * prickar = elevens bil, diagonala ränder = annan trafik,
 * krysskraffering = fältets slut, grön måttmarkering = luckan.
 * Heldragen pil = rör sig nu, streckad grön pil = elevens väg in,
 * korta parallella streck bakom ett fordon = hög fart.
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
 * Samma påfart i skala 0,45 för förklaringsrutan. Origo mitt i scenen.
 * Höger körfält x −60–0, accelerationsfält x 0–60 med kilen mellan
 * (60, −30) och (0, −90): samma sida och samma riktning som i huvudbilden —
 * all trafik kör uppåt, accelerationsfältet ligger till höger om körfältet.
 */
function MiniPafart({ x, y, variant }: { x: number; y: number; variant: 'vaver-in' | 'star-kvar' }) {
  const merges = variant === 'vaver-in';
  return (
    <g transform={`translate(${x} ${y}) scale(0.45)`}>
      <rect x="-60" y="-110" width="60" height="220" className="fill-diagram-road" />
      <polygon points="0,110 60,110 60,-30 0,-90" className="fill-diagram-road" />
      <polygon
        points="0,-90 60,-30 60,10 0,10"
        fill="url(#acc-hatch)"
        className="stroke-safety-600"
        strokeWidth="2"
      />
      <g className="fill-none stroke-diagram-edge" strokeWidth="3">
        <line x1="-60" y1="-110" x2="-60" y2="110" />
        <path d="M 0 -90 L 60 -30 L 60 110" />
      </g>
      <line x1="0" y1="-110" x2="0" y2="-90" className="stroke-diagram-edge" strokeWidth="3" />
      <line x1="0" y1="-90" x2="0" y2="110" className="stroke-diagram-marking" strokeWidth="3" strokeDasharray="14 10" />

      {/* Annan trafik i höger körfält, kör uppåt */}
      <Car
        cx={-30}
        cy={-40}
        width={26}
        length={44}
        heading="up"
        fill="url(#acc-stripes)"
        stroke="stroke-primary-600"
        brakeLights={!merges}
      />

      {merges ? (
        <>
          <Car cx={30} cy={60} width={26} length={44} heading="up" fill="url(#acc-dots)" stroke="stroke-attention-600" />
          <path
            d="M 30 36 C 30 8 -30 20 -30 -4"
            className="fill-none stroke-progress-600"
            strokeWidth="5"
            strokeDasharray="12 9"
            markerEnd="url(#acc-arrow-plan)"
          />
        </>
      ) : (
        <Car
          cx={20}
          cy={-48}
          width={26}
          length={44}
          heading="up"
          fill="url(#acc-dots)"
          stroke="stroke-attention-600"
          brakeLights
        />
      )}
    </g>
  );
}

export function AccelerationsfaltDiagram() {
  return (
    <svg
      viewBox="0 0 440 1048"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="acc-title acc-desc"
    >
      <title id="acc-title">Påfart med accelerationsfält</title>
      <desc id="acc-desc">
        Motorvägens ena körbana sedd uppifrån, med två genomgående körfält och ett
        accelerationsfält längst till höger. All trafik kör uppåt i bilden. Elevens bil, fylld
        med prickmönster, ligger i accelerationsfältet och har tre korta parallella streck bakom
        sig: farten är uppe. Tre andra fordon, fyllda med diagonala ränder, rullar i de
        genomgående körfälten med samma sorts fartstreck bakom sig. Markering 1 pekar på elevens
        bil: matcha farten med körfältet. I det högra körfältet, mellan två av de randiga
        fordonen, är luckan utmärkt med en grön linje mellan två gröna tvärstreck, och markering
        2 pekar på den: välj luckan innan fältet tar slut. En streckad grön pil visar elevens väg
        in i just den luckan. Där accelerationsfältet smalnar av mot körfältet ligger en yta med
        krysskraffering och röd kontur, och markering 3 pekar dit: fältets slut. Nedanför
        accelerationsfältet fortsätter påfartsrampen snett ned åt höger. En teckenförklaring
        skiljer på heldragen pil, rör sig nu, streckad grön pil, din väg in, korta parallella
        streck, hög fart, och grön måttmarkering, luckan. En rad under bilden säger att avstånden mellan fordonen är förkortade för att rymmas i bilden. En ruta längst ned visar samma påfart
        två gånger: eleven har farten uppe och väver in i luckan, markerat med en bock, och
        eleven har tvekat bort luckan och står i fältets slut medan fordonet i körfältet får
        bromsa, markerat med ett kryss.
      </desc>

      <defs>
        <pattern id="acc-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="acc-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="2" />
        </pattern>
        <pattern id="acc-hatch" patternUnits="userSpaceOnUse" width="10" height="10">
          <path d="M0,10 l10,-10 M0,0 l10,10" className="stroke-safety-600" strokeWidth="1.3" />
        </pattern>
        <marker id="acc-arrow-other" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary-600" />
        </marker>
        <marker id="acc-arrow-plan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-progress-600" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Påfart med accelerationsfält
      </text>
      <text x="20" y="48" className="fill-text-secondary text-[13px]">
        Farten, luckan och infogningen
      </text>

      {/* Genomgående körbana: två körfält, all trafik uppåt */}
      <rect x="140" y="92" width="104" height="448" className="fill-diagram-road" />

      {/* Accelerationsfältet, med kilen där det tar slut */}
      <polygon points="244,540 296,540 296,282 244,212" className="fill-diagram-road" />

      {/* Påfartsrampen fortsätter ned åt höger */}
      <polygon points="244,540 296,540 328,612 276,612" className="fill-diagram-road" />

      {/* Vägmarkeringar: kantlinjer heldragna, körfältslinjer streckade */}
      <g className="fill-none stroke-diagram-edge" strokeWidth="2">
        <line x1="140" y1="92" x2="140" y2="540" />
        <line x1="244" y1="92" x2="244" y2="212" />
        <path d="M 244 212 L 296 282 L 296 540 L 328 612" />
        <line x1="244" y1="540" x2="276" y2="612" />
      </g>
      <g className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="14 10">
        <line x1="192" y1="92" x2="192" y2="540" />
        <line x1="244" y1="218" x2="244" y2="540" />
      </g>

      {/* Konfliktyta: fältets slut */}
      <polygon
        points="244,212 296,282 296,322 244,322"
        fill="url(#acc-hatch)"
        className="stroke-safety-600"
        strokeWidth="2"
      />

      {/* Teckenförklaring i högermarginalen, ovanför scenen */}
      <g>
        <path d="M 300 104 L 326 104" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#acc-arrow-other)" />
        <text x="334" y="109" className="fill-text-secondary text-[13px]">
          Rör sig nu
        </text>
        <path
          d="M 300 126 L 326 126"
          className="stroke-progress-600"
          strokeWidth="3"
          strokeDasharray="8 6"
          markerEnd="url(#acc-arrow-plan)"
        />
        <text x="334" y="131" className="fill-text-secondary text-[13px]">
          Din väg in
        </text>
        <g className="stroke-primary-600" strokeWidth="2.5" strokeLinecap="round">
          <line x1="302" y1="146" x2="302" y2="158" />
          <line x1="311" y1="144" x2="311" y2="160" />
          <line x1="320" y1="146" x2="320" y2="158" />
        </g>
        <text x="334" y="157" className="fill-text-secondary text-[13px]">
          Hög fart
        </text>
        <g className="stroke-progress-600" strokeWidth="2.5">
          <line x1="311" y1="174" x2="311" y2="192" />
          <line x1="303" y1="174" x2="319" y2="174" />
          <line x1="303" y1="192" x2="319" y2="192" />
        </g>
        <text x="334" y="188" className="fill-text-secondary text-[13px]">
          Luckan
        </text>
      </g>

      {/* Etikett: de genomgående körfälten */}
      <g>
        <text x="16" y="112" className="fill-text-primary text-[13px] font-semibold">
          Genomgående
        </text>
        <text x="16" y="130" className="fill-text-secondary text-[13px]">
          körfält
        </text>
        <Pointer x1={100} y1={122} x2={166} y2={124} />
      </g>

      {/* Annan trafik i vänster körfält */}
      <SpeedMarks cx={166} y={196} className="stroke-primary-600" />
      <Car cx={166} cy={170} width={26} length={44} heading="up" fill="url(#acc-stripes)" stroke="stroke-primary-600" />

      {/* Annan trafik i höger körfält, framför luckan */}
      <SpeedMarks cx={218} y={276} className="stroke-primary-600" />
      <Car cx={218} cy={250} width={26} length={44} heading="up" fill="url(#acc-stripes)" stroke="stroke-primary-600" />

      {/* Annan trafik i höger körfält, bakom luckan */}
      <SpeedMarks cx={218} y={496} className="stroke-primary-600" />
      <Car cx={218} cy={470} width={26} length={44} heading="up" fill="url(#acc-stripes)" stroke="stroke-primary-600" />

      {/* Luckan i höger körfält: mellan y 306 och y 450 */}
      <g className="stroke-progress-600" strokeWidth="2.5">
        <line x1="206" y1="306" x2="206" y2="450" />
        <line x1="198" y1="306" x2="230" y2="306" />
        <line x1="198" y1="450" x2="230" y2="450" />
      </g>

      {/* Elevens bil i accelerationsfältet, farten uppe */}
      <SpeedMarks cx={270} y={466} className="stroke-attention-600" />
      <Car cx={270} cy={440} width={26} length={44} heading="up" fill="url(#acc-dots)" stroke="stroke-attention-600" />

      {/* Elevens väg in i luckan */}
      <path
        d="M 270 414 C 270 388 218 396 218 370"
        className="fill-none stroke-progress-600"
        strokeWidth="3"
        strokeDasharray="8 6"
        markerEnd="url(#acc-arrow-plan)"
      />

      {/* 1. Elevens bil: matcha farten */}
      <g>
        <Callout x={322} y={452} n={1} />
        <text x="338" y="457" className="fill-text-primary text-[14px] font-semibold">
          Du
        </text>
        <text x="306" y="477" className="fill-text-secondary text-[13px]">
          matcha farten
        </text>
        <text x="306" y="495" className="fill-text-secondary text-[13px]">
          med körfältet
        </text>
        <Pointer x1={312} y1={441} x2={288} y2={432} />
      </g>

      {/* 2. Luckan */}
      <g>
        <Callout x={26} y={372} n={2} />
        <text x="42" y="377" className="fill-text-primary text-[13px] font-semibold">
          Luckan
        </text>
        <text x="16" y="397" className="fill-text-secondary text-[13px]">
          välj den innan
        </text>
        <text x="16" y="415" className="fill-text-secondary text-[13px]">
          fältet tar slut
        </text>
        <Pointer x1={104} y1={386} x2={197} y2={378} />
      </g>

      {/* 3. Fältets slut */}
      <g>
        <Callout x={306} y={206} n={3} />
        <text x="322" y="211" className="fill-text-primary text-[13px] font-semibold">
          Fältets slut
        </text>
        <text x="298" y="231" className="fill-text-secondary text-[13px]">
          här finns ingen
        </text>
        <text x="298" y="249" className="fill-text-secondary text-[13px]">
          plats att vänta på
        </text>
        <Pointer x1={302} y1={262} x2={268} y2={298} />
      </g>

      {/* Etikett: påfartsrampen */}
      <g>
        <text x="16" y="586" className="fill-text-primary text-[13px] font-semibold">
          Påfartsrampen
        </text>
        <text x="16" y="604" className="fill-text-secondary text-[13px]">
          du kommer härifrån
        </text>
        <Pointer x1={152} y1={596} x2={284} y2={594} />
      </g>

      {/* Vad bilden lär ut */}
      <text x="220" y="654" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        Farten anpassas till trafiken i körfältet
      </text>
      <text x="220" y="672" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        redan i accelerationsfältet.
      </text>
      <text x="220" y="696" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Välj luckan i god tid: spegel, tecken, axelblick — och väv in
      </text>
      <text x="220" y="714" textAnchor="middle" className="fill-text-secondary text-[13px]">
        mjukt. Tvinga dig inte in, och bli inte stående i fältets slut.
      </text>

      {/* Notis: avstånden ryms inte skalenligt */}
      <text x="220" y="736" textAnchor="middle" className="fill-text-tertiary text-[13px]">
        Avstånden mellan fordonen är förkortade för att rymmas i bilden.
      </text>

      {/* Mönsterförklaring */}
      <g>
        <rect x="34" y="760" width="22" height="14" rx="2" fill="url(#acc-dots)" className="stroke-attention-600" strokeWidth="1.5" />
        <text x="62" y="772" className="fill-text-tertiary text-[13px]">
          Du
        </text>
        <rect x="106" y="760" width="22" height="14" rx="2" fill="url(#acc-stripes)" className="stroke-primary-600" strokeWidth="1.5" />
        <text x="134" y="772" className="fill-text-tertiary text-[13px]">
          Annan trafik
        </text>
        <rect x="236" y="760" width="22" height="14" rx="2" fill="url(#acc-hatch)" className="stroke-safety-600" strokeWidth="1.5" />
        <text x="264" y="772" className="fill-text-tertiary text-[13px]">
          Fältets slut
        </text>
      </g>

      {/* Förklaringsruta: vad valet i accelerationsfältet leder till */}
      <rect x="20" y="796" width="400" height="228" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="34" y="820" className="fill-text-primary text-[13px] font-semibold">
        När accelerationsfältet börjar ta slut:
      </text>
      <line x1="220" y1="836" x2="220" y2="1012" className="stroke-border-default" strokeWidth="1.5" strokeDasharray="6 4" />

      <MiniPafart x={118} y={898} variant="vaver-in" />
      <text x="118" y="964" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Farten är uppe
      </text>
      <text x="118" y="980" textAnchor="middle" className="fill-text-secondary text-[13px]">
        du väver in i luckan
      </text>
      <Check x={118} y={1002} />

      <MiniPafart x={322} y={898} variant="star-kvar" />
      <text x="322" y="964" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Du tvekar bort luckan
      </text>
      <text x="322" y="980" textAnchor="middle" className="fill-text-secondary text-[13px]">
        och står i fältets slut
      </text>
      <Cross x={322} y={1002} />
    </svg>
  );
}
