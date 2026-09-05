/**
 * Hastighetsgränser (SPD-01): skylten är ett tak, inte ett mål — och när
 * skylt saknas gäller bashastigheten. Bilden lär ut en sak: vilken hastighet
 * som gäller här, och att du själv måste upptäcka när den ändras.
 *
 * Geometri (högertrafik, vy uppifrån). Båda vägavsnitten är sedda uppifrån
 * och körs åt höger i bilden (ökande x).
 * - Huvudscenen: körbanan y 120–184 med mittlinjen på y 152. Din bil kör åt
 *   höger, och dess högra sida är då bildens nedre. Alltså ligger den i det
 *   nedre körfältet y 152–184; karossen upptar y 154–182 med mitten på
 *   cy 168. Vägmärket står till höger i färdriktningen, alltså nedanför
 *   vägen (y > 184), på x 300.
 * - Förklaringsrutans miniscener: samma sak i halv skala. Körbanan y -34–34
 *   med mittlinjen på y 0, bilen på cy 17, alltså i det nedre körfältet, och
 *   vägmärket nedanför vägen. Samma färdriktning, samma körfält.
 *
 * Bashastigheterna 50 inom och 70 utanför tättbebyggt område är
 * författningsfästa (trafikförordningen 3 kap 17 §). Inga andra siffror
 * förekommer i bilden — mätaren är avsiktligt graderad utan tal, eftersom
 * det skyltade värdet varierar.
 *
 * Mönster: prickar = din bil. Inga andra fordon förekommer, så inget mönster
 * kan förväxlas.
 *
 * Vägmärkesbilden C31 i public/signs/ är ett svenskt officiellt vägmärke
 * (allmän handling) och fri att återge.
 */

import { BASE_PATH } from '@/lib/base-path';

interface CarProps {
  cx: number;
  cy: number;
  width: number;
  length: number;
  /** Grader medurs från fronten uppåt. 90 = kör åt höger i bilden. */
  deg: number;
  fill: string;
  stroke: string;
}

/**
 * Bil ritad med fronten uppåt och sedan vriden efter färdriktningen.
 * Ljus grundfyllning under mönstret, så att bilen lyfter från vägbanan.
 */
function Car({ cx, cy, width, length, deg, fill, stroke }: CarProps) {
  const hw = width / 2;
  const hl = length / 2;
  const glass = `fill-diagram-marking ${stroke}`;
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${deg})`}>
      <g className="fill-text-primary">
        <rect x={-hw - 3} y={-hl + 5} width="5" height="10" rx="1.5" />
        <rect x={hw - 2} y={-hl + 5} width="5" height="10" rx="1.5" />
        <rect x={-hw - 3} y={hl - 15} width="5" height="10" rx="1.5" />
        <rect x={hw - 2} y={hl - 15} width="5" height="10" rx="1.5" />
      </g>
      <rect x={-hw} y={-hl} width={width} height={length} rx="4" className="fill-diagram-marking" />
      <rect x={-hw} y={-hl} width={width} height={length} rx="4" fill={fill} className={stroke} strokeWidth="2" />
      <rect x={-hw + 5} y={-hl + 7} width={width - 10} height="8" rx="2" className={glass} strokeWidth="1" />
      <rect x={-hw + 5} y={hl - 11} width={width - 10} height="5" rx="2" className={glass} strokeWidth="1" />
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
 * Fartstreck bakom en bil som kör åt höger: tre streck av olika längd.
 * `w` anges större i miniscenerna, som ritas i skala 0,5.
 */
function Fartstreck({ x, y, len, w = 2.5 }: { x: number; y: number; len: number; w?: number }) {
  return (
    <g className="stroke-attention-600" strokeWidth={w} strokeLinecap="round">
      <line x1={x - len * 0.7} y1={y - 8} x2={x} y2={y - 8} />
      <line x1={x - len} y1={y} x2={x} y2={y} />
      <line x1={x - len * 0.7} y1={y + 8} x2={x} y2={y + 8} />
    </g>
  );
}

/**
 * Kort vägavsnitt i halv skala för förklaringsrutan. Origo mitt på vägen.
 * Bilen kör åt höger i det nedre körfältet (cy 17, körfältet y 0–34) och
 * vägmärket står nedanför vägen — samma geometri som i huvudscenen.
 */
function MiniRemsa({ x, y, variant }: { x: number; y: number; variant: 'i-tid' | 'for-sent' }) {
  const inTime = variant === 'i-tid';
  const carX = inTime ? -90 : 104;
  return (
    <g transform={`translate(${x} ${y}) scale(0.5)`}>
      <rect x="-160" y="-34" width="320" height="68" className="fill-diagram-road" />
      <g className="stroke-diagram-edge" strokeWidth="3">
        <line x1="-160" y1="-34" x2="160" y2="-34" />
        <line x1="-160" y1="34" x2="160" y2="34" />
      </g>
      <line x1="-160" y1="0" x2="160" y2="0" className="stroke-diagram-marking" strokeWidth="3" strokeDasharray="14 12" />

      {/* Vägmärket vid högra vägkanten i färdriktningen: nedanför vägen */}
      <line x1="60" y1="34" x2="60" y2="46" className="stroke-text-tertiary" strokeWidth="3" />
      <image href={`${BASE_PATH}/signs/C31-5.svg`} x="40" y="44" width="40" height="40" />

      <Fartstreck x={carX - 26} y={17} len={inTime ? 22 : 62} w={5} />
      <Car cx={carX} cy={17} width={28} length={44} deg={90} fill="url(#spd-dots)" stroke="stroke-attention-600" />
    </g>
  );
}

export function HastighetsbegransningDiagram() {
  return (
    <svg
      viewBox="0 0 400 872"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="spd-title spd-desc"
    >
      <title id="spd-title">Hastighetsgränser: skyltat tak och bashastighet</title>
      <desc id="spd-desc">
        Tre numrerade delar. Del 1, överst: ett vägavsnitt sett uppifrån där din bil, fylld med
        prickmönster och med fartstreck bakom sig, kör åt höger i det nedre körfältet. Vid högra
        vägkanten i färdriktningen, alltså nedanför vägen, står vägmärket C31
        hastighetsbegränsning, i bilden med värdet 50, och en streckad tvärlinje vid märket visar var gränsen ändras:
        gränsen gäller från skylten och framåt. Del 2, i mitten: en liggande stapel utan
        siffergradering som visar hastighet från noll och uppåt. Spannet upp till det skyltade
        värdet är tillåtet och markerat med en bock, allt över det skyltade värdet är förbjudet
        och markerat med ett kryss, och gränsen mellan dem är märkt med samma vägmärke. En pil
        nedifrån in i det tillåtna spannet visar att lämplig fart ofta ligger lägre än skylten vid
        dålig sikt, väder eller halt väglag. Del 3, nederst: två rutor för bashastigheten när
        skylt saknas. Rutan med hus står för inom tättbebyggt område, högst 50 kilometer i
        timmen, och rutan med träd för utanför tättbebyggt område, högst 70 kilometer i timmen.
        Längst ned en ruta med två lika vägavsnitt: till vänster ser du skylten i tid, bilen har
        korta fartstreck och farten är rätt redan vid skylten, markerat med en bock; till höger
        har bilen långa fartstreck och har redan passerat skylten innan du upptäckte den,
        markerat med ett kryss.
      </desc>

      <defs>
        <pattern id="spd-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <marker
          id="spd-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-attention-600" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Hastighetsgränser
      </text>
      <text x="20" y="48" className="fill-text-secondary text-[13px]">
        Skylten är ett tak. Saknas skylt gäller bashastigheten.
      </text>

      {/* Del 1: ny skylt, ny gräns */}
      <Callout x={30} y={84} n={1} />
      <text x="48" y="89" className="fill-text-primary text-[14px] font-semibold">
        Ny skylt betyder ny gräns
      </text>
      <text x="300" y="112" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Här ändras gränsen
      </text>

      <rect x="20" y="120" width="360" height="64" className="fill-diagram-road" />
      <g className="stroke-diagram-edge" strokeWidth="1.5">
        <line x1="20" y1="120" x2="380" y2="120" />
        <line x1="20" y1="184" x2="380" y2="184" />
      </g>
      <line x1="20" y1="152" x2="380" y2="152" className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="10 8" />

      {/* Din bil kör åt höger i det nedre körfältet, med fartstreck bakom */}
      <Fartstreck x={62} y={168} len={20} />
      <Car cx={88} cy={168} width={28} length={44} deg={90} fill="url(#spd-dots)" stroke="stroke-attention-600" />
      <line x1="114" y1="168" x2="156" y2="168" className="stroke-attention-600" strokeWidth="3" markerEnd="url(#spd-arrow)" />

      {/* Skylten och den tvärlinje där den nya gränsen börjar */}
      <line
        x1="300"
        y1="116"
        x2="300"
        y2="196"
        className="stroke-text-tertiary"
        strokeWidth="2"
        strokeDasharray="6 5"
      />
      <image href={`${BASE_PATH}/signs/C31-5.svg`} x="287" y="196" width="26" height="26" />
      <text x="300" y="238" textAnchor="middle" className="fill-text-secondary text-[13px]">
        C31
      </text>
      <text x="20" y="212" className="fill-text-secondary text-[13px]">
        Gränsen gäller från skylten
      </text>
      <text x="20" y="230" className="fill-text-secondary text-[13px]">
        och framåt.
      </text>

      {/* Del 2: skylten är ett tak */}
      <Callout x={30} y={268} n={2} />
      <text x="48" y="273" className="fill-text-primary text-[14px] font-semibold">
        Skylten är ett tak, inte ett mål
      </text>

      <image href={`${BASE_PATH}/signs/C31-5.svg`} x="287" y="286" width="26" height="26" />
      <text x="20" y="314" className="fill-text-tertiary text-[13px]">
        Hastighet
      </text>
      <rect x="20" y="320" width="280" height="28" className="fill-progress-100 stroke-progress-600" strokeWidth="1.5" />
      <rect x="300" y="320" width="80" height="28" className="fill-safety-200 stroke-safety-600" strokeWidth="1.5" />
      <line x1="300" y1="314" x2="300" y2="354" className="stroke-safety-600" strokeWidth="3" />
      <Check x={46} y={334} />
      <Cross x={340} y={334} />
      <text x="20" y="370" className="fill-text-tertiary text-[13px]">
        0
      </text>
      <text x="120" y="370" textAnchor="middle" className="fill-text-primary text-[13px] font-medium">
        Tillåtet
      </text>
      <text x="340" y="370" textAnchor="middle" className="fill-text-primary text-[13px] font-medium">
        Förbjudet
      </text>

      <line x1="200" y1="406" x2="200" y2="354" className="stroke-attention-600" strokeWidth="2.5" markerEnd="url(#spd-arrow)" />
      <text x="200" y="424" textAnchor="middle" className="fill-text-primary text-[13px] font-medium">
        Lämplig fart kan ligga lägre
      </text>
      <text x="200" y="440" textAnchor="middle" className="fill-text-secondary text-[13px]">
        vid dålig sikt, väder eller halt väglag
      </text>

      {/* Del 3: bashastighet när skylt saknas */}
      <Callout x={30} y={476} n={3} />
      <text x="48" y="481" className="fill-text-primary text-[14px] font-semibold">
        Saknas skylt gäller bashastigheten
      </text>

      {/* Inom tättbebyggt område: hus */}
      <g>
        <rect x="20" y="496" width="172" height="104" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
        <g className="fill-text-secondary">
          <rect x="76" y="522" width="14" height="24" />
          <rect x="94" y="512" width="14" height="34" />
          <rect x="112" y="528" width="14" height="18" />
        </g>
        <line x1="70" y1="546" x2="132" y2="546" className="stroke-text-secondary" strokeWidth="2" />
        <text x="106" y="568" textAnchor="middle" className="fill-text-primary text-[13px]">
          Inom tättbebyggt område
        </text>
        <text x="106" y="592" textAnchor="middle" className="fill-text-primary text-[16px] font-semibold">
          högst 50 km/h
        </text>
      </g>

      {/* Utanför tättbebyggt område: träd */}
      <g>
        <rect x="208" y="496" width="172" height="104" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
        <g className="fill-text-secondary">
          <path d="M 272 514 L 286 542 L 258 542 Z" />
          <path d="M 302 508 L 318 542 L 286 542 Z" />
          <rect x="269" y="542" width="6" height="6" />
          <rect x="299" y="542" width="6" height="6" />
        </g>
        <line x1="252" y1="548" x2="326" y2="548" className="stroke-text-secondary" strokeWidth="2" />
        <text x="294" y="568" textAnchor="middle" className="fill-text-primary text-[13px]">
          Utanför tättbebyggt område
        </text>
        <text x="294" y="592" textAnchor="middle" className="fill-text-primary text-[16px] font-semibold">
          högst 70 km/h
        </text>
      </g>

      <text x="200" y="624" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Fråga dig: vilken hastighet gäller här?
      </text>

      {/* Mönsterförklaring */}
      <g>
        <rect x="146" y="642" width="22" height="14" rx="2" fill="url(#spd-dots)" className="stroke-attention-600" strokeWidth="1.5" />
        <text x="174" y="654" className="fill-text-tertiary text-[13px]">
          Du (prickar)
        </text>
      </g>

      {/* Förklaringsruta: att upptäcka skylten i tid */}
      <rect x="20" y="672" width="360" height="184" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="34" y="696" className="fill-text-primary text-[13px] font-semibold">
        Om du upptäcker den nya skylten för sent:
      </text>
      <line x1="200" y1="708" x2="200" y2="846" className="stroke-border-default" strokeWidth="1.5" strokeDasharray="6 4" />

      <MiniRemsa x={104} y={734} variant="i-tid" />
      <text x="104" y="796" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Du ser skylten i tid
      </text>
      <text x="104" y="812" textAnchor="middle" className="fill-text-secondary text-[13px]">
        farten är rätt vid skylten
      </text>
      <Check x={104} y={834} />

      <MiniRemsa x={290} y={734} variant="for-sent" />
      <text x="290" y="796" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Du ser den för sent
      </text>
      <text x="290" y="812" textAnchor="middle" className="fill-text-secondary text-[13px]">
        för fort på sträckan efter
      </text>
      <Cross x={290} y={834} />
    </svg>
  );
}
