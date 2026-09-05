/**
 * Hastighetsgränser — skyltad hastighet (C31) är ett tak, inte ett mål, och
 * bashastigheten gäller när skylt saknas. Trafikförordningen 3 kap 17 §.
 *
 * Vägmärkesbilden i public/signs/ är ett svenskt officiellt vägmärke
 * (allmän handling) och fri att återge.
 */

import { BASE_PATH } from '@/lib/base-path';

/** Fylld siffra för de tre delarna, som i hänvisningarna i vänstersvängsbilden. */
function Siffra({ n, x, y }: { n: number; x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="11" className="fill-text-primary" />
      <text x={x} y={y + 5} textAnchor="middle" className="fill-surface-base text-[13px] font-semibold">
        {n}
      </text>
    </g>
  );
}

/** Kort vägremsa till förklaringsrutan, 190 × 34, med vägmärket vid högra kanten. */
function Miniremsa() {
  return (
    <g>
      <rect x="0" y="0" width="190" height="34" className="fill-diagram-road" />
      <line x1="0" y1="0" x2="190" y2="0" className="stroke-diagram-edge" strokeWidth="2" />
      <line x1="0" y1="34" x2="190" y2="34" className="stroke-diagram-edge" strokeWidth="2" />
      <line x1="0" y1="17" x2="190" y2="17" className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="12 10" />
      {/* Din bil kör åt höger i det nedre körfältet */}
      <rect x="60" y="21" width="30" height="12" rx="3" fill="url(#speed-dots)" className="stroke-attention-600" strokeWidth="2" />
      {/* Vägmärke vid högra vägkanten i färdriktningen, alltså nedanför vägen */}
      <line x1="170" y1="36" x2="170" y2="42" className="stroke-text-tertiary" strokeWidth="2" />
      <image href={`${BASE_PATH}/signs/C31-5.svg`} x="160" y="40" width="20" height="20" />
    </g>
  );
}

export function HastighetsbegransningDiagram() {
  return (
    <svg
      viewBox="0 0 500 842"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="speed-title speed-desc"
    >
      <title id="speed-title">Hastighetsgränser: skyltat tak och bashastighet</title>
      <desc id="speed-desc">
        Tre numrerade delar. 1, överst: vägmärket C31, hastighetsbegränsning, bredvid en liggande
        mätare från noll upp till det skyltade värdet. Spannet upp till skylten är tillåtet och
        markerat med en bock; allt över skylten är förbjudet och markerat med ett kryss. En pil
        inne i det tillåtna spannet visar att lämplig fart ofta ligger lägre än skylten, till
        exempel vid dålig sikt eller halt väglag. 2, i mitten: två rutor för bashastigheten när
        skylt saknas: en ruta med hus för tättbebyggt område, högst 50 km/h, och en ruta med träd
        för utanför tättbebyggt område, högst 70 km/h. 3, nederst: en vägremsa där din bil, med
        fartstreck bakom sig, passerar ett vägmärke, med påminnelsen att varje ny skylt betyder
        ny gräns och att du ska fråga dig vilken hastighet som gäller här. Längst ned en
        förklaringsruta om halt väglag med två små vägremsor med samma skylt: till vänster har
        bilen korta fartstreck och sänker farten under skylten, markerat med en bock; till höger
        har bilen långa fartstreck och håller skyltad fart trots halkan, markerat med ett kryss.
      </desc>

      <defs>
        <pattern id="speed-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
        </pattern>
        <marker id="speed-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-attention-600" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="34" className="fill-text-primary text-[20px] font-semibold">
        Hastighetsgränser
      </text>
      <text x="20" y="56" className="fill-text-secondary text-[13px]">
        Skyltat värde är ett tak, inte ett mål — och bashastighet när skylt saknas
      </text>

      {/* Del 1: skylten är ett tak */}
      <Siffra n={1} x={30} y={92} />
      <text x="48" y="97" className="fill-text-primary text-[15px] font-semibold">
        Skyltad hastighet är ett tak, inte ett mål
      </text>

      <g>
        <rect x="20" y="116" width="130" height="130" rx="8" className="fill-none stroke-border-default" strokeWidth="1.5" />
        <image href={`${BASE_PATH}/signs/C31-5.svg`} x="32" y="128" width="106" height="106" />
        <text x="85" y="266" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
          C31
        </text>
        <text x="85" y="282" textAnchor="middle" className="fill-text-secondary text-[13px]">
          Hastighetsbegränsning
        </text>
      </g>

      {/* Mätare: 0 till skyltat värde tillåtet, över förbjudet */}
      <g transform="translate(0 71)">
        <text x="400" y="62" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
          Skyltat värde = högsta tillåtna
        </text>
        <rect x="180" y="76" width="220" height="24" className="fill-progress-100 stroke-progress-600" strokeWidth="1.5" />
        <rect x="400" y="76" width="80" height="24" className="fill-safety-200 stroke-safety-600" strokeWidth="1.5" />
        <line x1="400" y1="68" x2="400" y2="108" className="stroke-safety-600" strokeWidth="4" />
        <text x="180" y="122" className="fill-text-secondary text-[13px]">
          0
        </text>

        {/* Bock i det tillåtna, kryss i det förbjudna */}
        <path d="M 196 88 l 5 5 l 10 -11" className="fill-none stroke-progress-600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="218" y="93" className="fill-text-primary text-[13px] font-medium">
          Tillåtet
        </text>
        <path d="M 432 82 L 444 94 M 444 82 L 432 94" className="stroke-safety-600" strokeWidth="3" strokeLinecap="round" />
        <text x="440" y="122" textAnchor="middle" className="fill-text-primary text-[13px] font-medium">
          Förbjudet
        </text>

        {/* Lämplig fart kan ligga lägre än skylten */}
        <path d="M 300 150 L 300 108" className="stroke-attention-600" strokeWidth="2" markerEnd="url(#speed-arrow)" />
        <text x="300" y="168" textAnchor="middle" className="fill-text-primary text-[13px] font-medium">
          Lämplig fart kan ligga lägre:
        </text>
        <text x="300" y="184" textAnchor="middle" className="fill-text-secondary text-[13px]">
          dålig sikt, väder, halt väglag
        </text>
      </g>

      {/* Del 2: bashastighet när skylt saknas */}
      <Siffra n={2} x={30} y={322} />
      <text x="48" y="327" className="fill-text-primary text-[15px] font-semibold">
        Saknas skylt gäller bashastigheten
      </text>
      <text x="48" y="345" className="fill-text-secondary text-[13px]">
        Trafikförordningen 3 kap 17 §
      </text>

      <g transform="translate(0 70)">
        {/* Inom tättbebyggt område: hus */}
        <g>
          <rect x="20" y="290" width="220" height="120" rx="6" className="fill-attention-100 stroke-attention-600" strokeWidth="1.5" />
          <g className="fill-text-secondary">
            <rect x="36" y="318" width="18" height="34" />
            <rect x="58" y="306" width="18" height="46" />
            <rect x="80" y="326" width="18" height="26" />
          </g>
          <line x1="32" y1="352" x2="104" y2="352" className="stroke-text-secondary" strokeWidth="2" />
          <text x="120" y="320" className="fill-text-primary text-[13px] font-medium">
            Inom tättbebyggt
          </text>
          <text x="120" y="336" className="fill-text-primary text-[13px] font-medium">
            område
          </text>
          <text x="120" y="366" className="fill-text-primary text-[18px] font-semibold">
            högst 50
          </text>
          <text x="120" y="386" className="fill-text-secondary text-[13px]">
            km/h
          </text>
        </g>

        {/* Utanför tättbebyggt område: träd */}
        <g>
          <rect x="260" y="290" width="220" height="120" rx="6" className="fill-progress-100 stroke-progress-600" strokeWidth="1.5" />
          <g className="fill-text-secondary">
            <path d="M 290 312 L 306 344 L 274 344 Z" />
            <path d="M 322 300 L 340 344 L 304 344 Z" />
            <rect x="287" y="344" width="6" height="8" />
            <rect x="319" y="344" width="6" height="8" />
          </g>
          <line x1="272" y1="352" x2="344" y2="352" className="stroke-text-secondary" strokeWidth="2" />
          <text x="360" y="320" className="fill-text-primary text-[13px] font-medium">
            Utanför tättbebyggt
          </text>
          <text x="360" y="336" className="fill-text-primary text-[13px] font-medium">
            område
          </text>
          <text x="360" y="366" className="fill-text-primary text-[18px] font-semibold">
            högst 70
          </text>
          <text x="360" y="386" className="fill-text-secondary text-[13px]">
            km/h
          </text>
        </g>
      </g>

      {/* Del 3: ny skylt, ny gräns */}
      <Siffra n={3} x={30} y={520} />
      <text x="48" y="525" className="fill-text-primary text-[15px] font-semibold">
        Varje ny skylt är en ny gräns
      </text>
      <g transform="translate(0 80)">
        <rect x="20" y="460" width="460" height="44" className="fill-diagram-road" />
        <line x1="20" y1="460" x2="480" y2="460" className="stroke-diagram-edge" strokeWidth="2" />
        <line x1="20" y1="504" x2="480" y2="504" className="stroke-diagram-edge" strokeWidth="2" />
        <line x1="20" y1="482" x2="480" y2="482" className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="12 10" />
        {/* Din bil kör åt höger i det nedre körfältet, alltså sitt högra, med fartstreck bakom */}
        <g className="stroke-attention-600" strokeWidth="2" strokeLinecap="round">
          <line x1="32" y1="489" x2="44" y2="489" />
          <line x1="26" y1="493" x2="44" y2="493" />
          <line x1="32" y1="497" x2="44" y2="497" />
        </g>
        <rect x="50" y="486" width="36" height="14" rx="3" fill="url(#speed-dots)" className="stroke-attention-600" strokeWidth="2" />
        <path d="M 92 493 L 112 493" className="stroke-attention-600" strokeWidth="2" markerEnd="url(#speed-arrow)" />
        {/* Vägmärke vid högra vägkanten i färdriktningen, alltså nedanför vägen */}
        <line x1="300" y1="506" x2="300" y2="518" className="stroke-text-tertiary" strokeWidth="2" />
        <image href={`${BASE_PATH}/signs/C31-5.svg`} x="288" y="512" width="24" height="24" />
        <text x="330" y="530" className="fill-text-primary text-[13px] font-medium">
          Ny skylt här: ny gräns
        </text>
      </g>
      <text x="20" y="632" className="fill-text-secondary text-[13px]">
        Fråga dig: vilken hastighet gäller här? Saknas skylt gäller bashastigheten.
      </text>

      {/* Förklaringsruta: samma skylt, olika lämplig fart */}
      <rect x="20" y="656" width="460" height="166" rx="6" className="fill-surface-raised stroke-border-default" strokeWidth="1.5" />
      <text x="36" y="682" className="fill-text-primary text-[14px] font-semibold">
        Samma skylt, olika lämplig fart — till exempel på halt väglag
      </text>
      <line x1="250" y1="696" x2="250" y2="810" className="stroke-text-tertiary" strokeWidth="2" strokeDasharray="6 5" />

      {/* A: sänker farten, korta fartstreck */}
      <g transform="translate(36 700)">
        <Miniremsa />
        <g className="stroke-attention-600" strokeWidth="2" strokeLinecap="round">
          <line x1="50" y1="24" x2="56" y2="24" />
          <line x1="46" y1="27" x2="56" y2="27" />
          <line x1="50" y1="30" x2="56" y2="30" />
        </g>
      </g>
      <path d="M 36 782 l 6 6 l 12 -13" className="fill-none stroke-progress-600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="60" y="786" className="fill-text-primary text-[13px] font-semibold">
        Sänker farten under skylten
      </text>
      <text x="60" y="804" className="fill-text-primary text-[13px]">
        skylten är taket, inte målet
      </text>

      {/* B: håller skyltad fart, långa fartstreck */}
      <g transform="translate(270 700)">
        <Miniremsa />
        <g className="stroke-attention-600" strokeWidth="2" strokeLinecap="round">
          <line x1="32" y1="24" x2="56" y2="24" />
          <line x1="22" y1="27" x2="56" y2="27" />
          <line x1="32" y1="30" x2="56" y2="30" />
        </g>
      </g>
      <path d="M 264 776 L 278 790 M 278 776 L 264 790" className="stroke-safety-600" strokeWidth="3" strokeLinecap="round" />
      <text x="288" y="786" className="fill-text-primary text-[13px] font-semibold">
        Håller skyltad fart
      </text>
      <text x="288" y="804" className="fill-text-primary text-[13px]">
        trots halkan — inte lämpligt
      </text>
    </svg>
  );
}
