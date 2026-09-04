/**
 * Väjningsplikt (B1) mot stopplikt (B2), sida vid sida (INT-01, INT-03).
 * Varje märke visas ovanför en liten korsning som visar vad föraren gör:
 * B1 — ge fri väg, stanna bara om det behövs; B2 — stanna helt vid
 * stopplinjen, inte rullande.
 *
 * Geometri (högertrafik, vy uppifrån), lika i båda panelerna:
 * - Din bil kör uppåt. Dess högra sida är bildens högra, så den ligger i
 *   den högra halvan av den lodräta vägen.
 * - Annan trafik på den korsande vägen kör åt höger i bilden (österut).
 *   Dess högra sida är då bildens nedre, så den ligger i den nedre halvan
 *   av den vågräta vägen — det körfält som ligger närmast dig.
 *
 * Mönster: prickar = du, diagonala ränder = annan trafik.
 *
 * Vägmärkesbilderna B1 och B2 i public/signs/ är svenska officiella
 * vägmärken (allmänna handlingar) och fria att återge.
 */

import { BASE_PATH } from '@/lib/base-path';

interface PanelProps {
  /** Panelens mittlinje i x-led. */
  cx: number;
  /** Prefix för id:n så att mönster inte krockar mellan panelerna. */
  idPrefix: string;
  variant: 'vajningsplikt' | 'stopplikt';
}

function Panel({ cx, idPrefix, variant }: PanelProps) {
  const isStop = variant === 'stopplikt';
  const laneCenter = cx + 15;

  return (
    <g>
      {/* Vägmärke */}
      <image
        href={isStop ? `${BASE_PATH}/signs/B2.svg` : `${BASE_PATH}/signs/B1.svg`}
        x={cx - 50}
        y="14"
        width="100"
        height="100"
      />
      <text
        x={cx}
        y="140"
        textAnchor="middle"
        className="fill-text-primary text-[15px] font-semibold"
      >
        {isStop ? 'B2 — Stopplikt' : 'B1 — Väjningsplikt'}
      </text>

      {/* Korsande väg (vågrät) och din väg (lodrät) */}
      <rect x={cx - 120} y="160" width="240" height="60" className="fill-diagram-road" />
      <rect x={cx - 30} y="220" width="60" height="116" className="fill-diagram-road" />
      <g className="stroke-diagram-edge" strokeWidth="1.5">
        <line x1={cx - 120} y1="160" x2={cx + 120} y2="160" />
        <line x1={cx - 120} y1="220" x2={cx - 30} y2="220" />
        <line x1={cx + 30} y1="220" x2={cx + 120} y2="220" />
        <line x1={cx - 30} y1="220" x2={cx - 30} y2="336" />
        <line x1={cx + 30} y1="220" x2={cx + 30} y2="336" />
      </g>
      <g className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="10 8">
        <line x1={cx - 120} y1="190" x2={cx - 30} y2="190" />
        <line x1={cx + 30} y1="190" x2={cx + 120} y2="190" />
        <line x1={cx} y1="240" x2={cx} y2="336" />
      </g>

      {/* Vägmarkering tvärs ditt körfält */}
      {isStop ? (
        <line
          x1={cx + 2}
          y1="228"
          x2={cx + 30}
          y2="228"
          className="stroke-diagram-marking"
          strokeWidth="6"
        />
      ) : (
        <g className="fill-diagram-marking">
          <path d={`M ${cx + 2} 224 L ${cx + 11} 224 L ${cx + 6.5} 234 Z`} />
          <path d={`M ${cx + 13} 224 L ${cx + 22} 224 L ${cx + 17.5} 234 Z`} />
          <path d={`M ${cx + 24} 224 L ${cx + 30} 224 L ${cx + 27} 234 Z`} />
        </g>
      )}

      {/* Annan trafik på korsande väg: kör åt höger, nedre körfältet */}
      <rect
        x={cx - 112}
        y="178"
        width="40"
        height="24"
        rx="3"
        fill={`url(#${idPrefix}-stripes)`}
        className="stroke-primary-600"
        strokeWidth="2"
      />
      <line
        x1={cx - 66}
        y1="190"
        x2={cx - 40}
        y2="190"
        className="stroke-primary-600"
        strokeWidth="2.5"
        markerEnd={`url(#${idPrefix}-arrow-other)`}
      />

      {/* Din bil: kör uppåt, högra körfältet */}
      {isStop ? (
        <g>
          {/* Stannad precis vid stopplinjen */}
          <rect
            x={laneCenter - 12}
            y="238"
            width="24"
            height="40"
            rx="3"
            fill={`url(#${idPrefix}-dots)`}
            className="stroke-attention-600"
            strokeWidth="2"
          />
          {/* Stoppsymbol: fylld kvadrat, och vad du gör */}
          <rect x={cx - 52} y="346" width="14" height="14" rx="2" className="fill-safety-600" />
          <text x={cx + 6} y="358" textAnchor="middle" className="fill-text-primary text-[13px] font-medium">
            Stanna helt
          </text>
        </g>
      ) : (
        <g>
          {/* På väg fram, kör vidare om det är fritt */}
          <rect
            x={laneCenter - 12}
            y="262"
            width="24"
            height="40"
            rx="3"
            fill={`url(#${idPrefix}-dots)`}
            className="stroke-attention-600"
            strokeWidth="2"
          />
          <line
            x1={laneCenter}
            y1="256"
            x2={laneCenter}
            y2="238"
            className="stroke-progress-600"
            strokeWidth="2.5"
            strokeDasharray="4 3"
            markerEnd={`url(#${idPrefix}-arrow-go)`}
          />
          {/* Pilsymbol, och vad du gör */}
          <line
            x1={cx - 64}
            y1="353"
            x2={cx - 48}
            y2="353"
            className="stroke-progress-600"
            strokeWidth="2.5"
            strokeDasharray="4 3"
            markerEnd={`url(#${idPrefix}-arrow-go)`}
          />
          <text x={cx + 10} y="358" textAnchor="middle" className="fill-text-primary text-[13px] font-medium">
            Vidare om fritt
          </text>
        </g>
      )}
      <text
        x={cx - 15}
        y={isStop ? 263 : 287}
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-semibold"
      >
        Du
      </text>

      {/* Vad märket kräver */}
      <text x={cx} y="386" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        {isStop ? 'Stanna helt vid stopplinjen.' : 'Ge fri väg.'}
      </text>
      <text x={cx} y="406" textAnchor="middle" className="fill-text-secondary text-[13px]">
        {isStop ? 'Inte rullande. Sök trafik,' : 'Stanna bara om det behövs.'}
      </text>
      <text x={cx} y="424" textAnchor="middle" className="fill-text-secondary text-[13px]">
        {isStop ? 'fortsätt när det är säkert.' : 'Sök trafik, fortsätt när det är fritt.'}
      </text>
    </g>
  );
}

export function VagmarkenVajningsreglerDiagram() {
  return (
    <svg
      viewBox="0 0 520 510"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="signs-title signs-desc"
    >
      <title id="signs-title">Väjningsplikt och stopplikt — två olika krav</title>
      <desc id="signs-desc">
        Två paneler sida vid sida, var och en med ett vägmärke ovanför en liten korsning sedd
        uppifrån. Till vänster B1 väjningsplikt, en nedåtpekande triangel med röd kant. Under
        märket ligger en väjningslinje av små vita trianglar tvärs ditt körfält, och din bil,
        fylld med prickar, kör uppåt mot linjen med en streckad pil framåt och texten vidare om
        fritt. Väjningsplikt betyder att du ger fri väg och stannar bara om det behövs. Till
        höger B2 stopplikt, en åttakantig röd skylt med texten STOP. Under märket ligger en
        bred vit stopplinje tvärs ditt körfält, och din bil står stilla precis vid linjen med en
        fylld röd kvadrat och texten stanna helt. Stopplikt kräver att du stannar helt, inte
        rullande. I båda panelerna kör ett randigt fordon på den korsande vägen i körfältet
        närmast dig. Längst ned: ett vanligt misstag är att blanda ihop de två märkena.
      </desc>

      <defs>
        <pattern id="vs-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="vs-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path
            d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4"
            className="stroke-primary-600"
            strokeWidth="2"
          />
        </pattern>
        <marker
          id="vs-arrow-other"
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
          id="vs-arrow-go"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-progress-600" />
        </marker>
      </defs>

      <Panel cx={130} idPrefix="vs" variant="vajningsplikt" />

      {/* Skiljelinje */}
      <line
        x1="260"
        y1="14"
        x2="260"
        y2="430"
        className="stroke-border-default"
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />

      <Panel cx={390} idPrefix="vs" variant="stopplikt" />

      {/* Gemensam poäng */}
      <text
        x="260"
        y="458"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-medium"
      >
        Vanligt misstag: att blanda ihop dem.
      </text>
      <text x="260" y="478" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Väjningsplikt = ge fri väg. Stopplikt = stanna helt.
      </text>
      <text x="260" y="496" textAnchor="middle" className="fill-text-tertiary text-[13px]">
        Prickar = du. Ränder = annan trafik.
      </text>
    </svg>
  );
}
