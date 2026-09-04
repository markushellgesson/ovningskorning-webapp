/**
 * Hastighetsgränser — skyltad hastighet (C31) är ett tak, inte ett mål, och
 * bashastigheten gäller när skylt saknas. Trafikförordningen 3 kap 17 §.
 *
 * Vägmärkesbilden i public/signs/ är ett svenskt officiellt vägmärke
 * (allmän handling) och fri att återge.
 */

export function HastighetsbegransningDiagram() {
  return (
    <svg
      viewBox="0 0 500 560"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="speed-title speed-desc"
    >
      <title id="speed-title">Hastighetsgränser: skyltat tak och bashastighet</title>
      <desc id="speed-desc">
        Tre delar. Överst vägmärket C31, hastighetsbegränsning, bredvid en liggande mätare från noll
        upp till det skyltade värdet. Spannet upp till skylten är tillåtet och markerat med en bock;
        allt över skylten är förbjudet och markerat med ett kryss. En pil inne i det tillåtna spannet
        visar att lämplig fart ofta ligger lägre än skylten, till exempel vid dålig sikt eller
        halt väglag. I mitten två rutor för bashastigheten när skylt saknas: en ruta med hus för
        tättbebyggt område, högst 50 km/h, och en ruta med träd för utanför tättbebyggt område,
        högst 70 km/h. Nederst en vägremsa där din bil passerar ett vägmärke, med påminnelsen att
        varje ny skylt betyder ny gräns och att du ska fråga dig vilken hastighet som gäller här.
      </desc>

      <defs>
        <pattern id="speed-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
        </pattern>
        <marker id="speed-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-attention-600" />
        </marker>
      </defs>

      {/* Del 1: skylten är ett tak */}
      <text x="20" y="30" className="fill-text-primary text-[14px] font-semibold">
        Skyltad hastighet är ett tak, inte ett mål
      </text>

      <g>
        <rect x="20" y="45" width="130" height="130" rx="8" className="fill-none stroke-border-default" strokeWidth="1.5" />
        <image href="/signs/C31-5.svg" x="32" y="57" width="106" height="106" />
        <text x="85" y="195" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
          C31
        </text>
        <text x="85" y="211" textAnchor="middle" className="fill-text-secondary text-[13px]">
          Hastighetsbegränsning
        </text>
      </g>

      {/* Mätare: 0 till skyltat värde tillåtet, över förbjudet */}
      <g>
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
      <text x="20" y="258" className="fill-text-primary text-[14px] font-semibold">
        Saknas skylt gäller bashastigheten
      </text>
      <text x="20" y="276" className="fill-text-secondary text-[13px]">
        Trafikförordningen 3 kap 17 §
      </text>

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

      {/* Del 3: ny skylt, ny gräns */}
      <text x="20" y="446" className="fill-text-primary text-[14px] font-semibold">
        Varje ny skylt är en ny gräns
      </text>
      <g>
        <rect x="20" y="460" width="460" height="44" className="fill-diagram-road" />
        <line x1="20" y1="460" x2="480" y2="460" className="stroke-diagram-edge" strokeWidth="2" />
        <line x1="20" y1="504" x2="480" y2="504" className="stroke-diagram-edge" strokeWidth="2" />
        <line x1="20" y1="482" x2="480" y2="482" className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="12 10" />
        {/* Din bil kör åt höger i det nedre körfältet, alltså sitt högra */}
        <rect x="50" y="486" width="36" height="14" rx="3" fill="url(#speed-dots)" className="stroke-attention-600" strokeWidth="2" />
        <path d="M 92 493 L 112 493" className="stroke-attention-600" strokeWidth="2" markerEnd="url(#speed-arrow)" />
        {/* Vägmärke vid högra vägkanten i färdriktningen, alltså nedanför vägen */}
        <line x1="300" y1="506" x2="300" y2="518" className="stroke-text-tertiary" strokeWidth="2" />
        <image href="/signs/C31-5.svg" x="288" y="512" width="24" height="24" />
        <text x="330" y="530" className="fill-text-primary text-[13px] font-medium">
          Ny skylt här: ny gräns
        </text>
      </g>
      <text x="20" y="552" className="fill-text-secondary text-[13px]">
        Fråga dig: vilken hastighet gäller här? Saknas skylt gäller bashastigheten.
      </text>
    </svg>
  );
}
