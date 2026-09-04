/**
 * Obevakat övergångsställe sett uppifrån (VRU-01) och vad föraren gör.
 * Trafikförordningen 3 kap 61 §: väjningsplikt mot gående som gått ut på
 * eller just ska gå ut på övergångsstället.
 *
 * Geometri (högertrafik, vy uppifrån):
 * - Din bil kör uppåt i bilden. Dess högra sida är bildens högra, så den
 *   ligger i den högra halvan av vägen (x 200–260).
 * - Vägmärket A13, varning för gående, står på höger sida av vägen i din
 *   färdriktning, före övergångsstället.
 * - En gående har gått ut på övergångsstället från vänster och går åt höger.
 *   En annan gående står på högra trottoaren och just ska gå ut.
 *
 * Mönster: prickar = du, streckgubbar = gående.
 *
 * Vägmärkesbilden A13 i public/signs/ är ett svenskt officiellt vägmärke
 * (allmän handling) och fri att återge.
 */

import { BASE_PATH } from '@/lib/base-path';

interface PedestrianProps {
  x: number;
  y: number;
}

/** Streckgubbe, huvudet vid (x, y). Cirka 34 px hög. */
function Pedestrian({ x, y }: PedestrianProps) {
  return (
    <g className="stroke-safety-600" strokeWidth="2.5" strokeLinecap="round">
      <circle cx={x} cy={y} r="6" className="fill-safety-600" />
      <line x1={x} y1={y + 6} x2={x} y2={y + 22} />
      <line x1={x - 8} y1={y + 12} x2={x + 8} y2={y + 12} />
      <line x1={x} y1={y + 22} x2={x - 6} y2={y + 34} />
      <line x1={x} y1={y + 22} x2={x + 6} y2={y + 34} />
    </g>
  );
}

export function OvergangsstalleVarningDiagram() {
  return (
    <svg
      viewBox="0 0 400 546"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="ovg-title ovg-desc"
    >
      <title id="ovg-title">Obevakat övergångsställe — sänk farten, var beredd att stanna</title>
      <desc id="ovg-desc">
        Gata sedd uppifrån med trottoar på båda sidor. Tvärs över gatan ligger ett
        övergångsställe, markerat med breda vita band i vägbanan. Din bil, fylld med prickar,
        kör uppåt i det högra körfältet mot övergångsstället, med en pil framåt och texten sänk
        farten, var beredd att stanna. På höger sida före övergångsstället står vägmärket A13,
        varning för gående, en triangel med röd kant och en gående figur. Två gående är ritade
        som streckgubbar: en har gått ut på övergångsstället från vänster och går åt höger, en
        annan står på den högra trottoaren och just ska gå ut, markerad med en streckad pil in
        mot vägen. Du har väjningsplikt mot båda: mot den som gått ut och mot den som just ska
        gå ut. Under bilden: sänk farten, ge marginal, var beredd att stanna.
      </desc>

      <defs>
        <pattern id="ovg-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <marker
          id="ovg-arrow-you"
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
          id="ovg-arrow-ped"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-safety-600" />
        </marker>
      </defs>

      <text x="20" y="24" className="fill-text-primary text-[15px] font-semibold">
        Obevakat övergångsställe
      </text>

      {/* Trottoarer (ramade ytor) och vägbana */}
      <rect
        x="90"
        y="40"
        width="220"
        height="400"
        className="fill-none stroke-border-default"
        strokeWidth="1.5"
      />
      <rect x="140" y="40" width="120" height="400" className="fill-diagram-road" />
      <g className="stroke-diagram-edge" strokeWidth="2">
        <line x1="140" y1="40" x2="140" y2="440" />
        <line x1="260" y1="40" x2="260" y2="440" />
      </g>
      {/* Mittlinje, bryts vid övergångsstället */}
      <g className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="10 8">
        <line x1="200" y1="40" x2="200" y2="160" />
        <line x1="200" y1="222" x2="200" y2="440" />
      </g>

      {/* Övergångsställe: breda band längs färdriktningen */}
      <g className="fill-diagram-marking">
        <rect x="146" y="170" width="14" height="42" />
        <rect x="172" y="170" width="14" height="42" />
        <rect x="198" y="170" width="14" height="42" />
        <rect x="224" y="170" width="14" height="42" />
        <rect x="248" y="170" width="10" height="42" />
      </g>

      {/* Gående som gått ut, går åt höger */}
      <Pedestrian x={168} y={176} />
      <line
        x1="180"
        y1="190"
        x2="196"
        y2="190"
        className="stroke-safety-600"
        strokeWidth="2"
        markerEnd="url(#ovg-arrow-ped)"
      />
      <text x="168" y="152" textAnchor="middle" className="fill-text-primary text-[13px] font-medium">
        Har gått ut
      </text>

      {/* Gående på högra trottoaren, just ska gå ut */}
      <Pedestrian x={286} y={176} />
      <line
        x1="274"
        y1="190"
        x2="256"
        y2="190"
        className="stroke-safety-600"
        strokeWidth="2"
        strokeDasharray="3 3"
        markerEnd="url(#ovg-arrow-ped)"
      />
      <text x="300" y="152" textAnchor="middle" className="fill-text-primary text-[13px] font-medium">
        Just ska gå ut
      </text>

      {/* A13 på höger sida, före övergångsstället */}
      <image href={`${BASE_PATH}/signs/A13.svg`} x="282" y="290" width="48" height="43" />
      <text x="306" y="352" textAnchor="middle" className="fill-text-secondary text-[13px]">
        A13
      </text>

      {/* Din bil: kör uppåt, högra körfältet */}
      <g>
        <rect
          x="215"
          y="380"
          width="30"
          height="48"
          rx="3"
          fill="url(#ovg-dots)"
          className="stroke-attention-600"
          strokeWidth="2"
        />
        <line
          x1="230"
          y1="374"
          x2="230"
          y2="240"
          className="stroke-attention-600"
          strokeWidth="2.5"
          strokeDasharray="6 5"
          markerEnd="url(#ovg-arrow-you)"
        />
        <text x="196" y="410" textAnchor="end" className="fill-text-primary text-[14px] font-semibold">
          Du
        </text>
      </g>

      {/* Vad du gör på väg fram */}
      <g className="fill-text-secondary text-[13px]">
        <text x="130" y="296" textAnchor="end">
          Sänk farten,
        </text>
        <text x="130" y="314" textAnchor="end">
          var beredd
        </text>
        <text x="130" y="332" textAnchor="end">
          att stanna
        </text>
      </g>

      {/* Regeltext */}
      <text
        x="200"
        y="466"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-medium"
      >
        Du har väjningsplikt mot gående som gått ut på
      </text>
      <text
        x="200"
        y="484"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-medium"
      >
        eller just ska gå ut på övergångsstället.
      </text>
      <text x="200" y="508" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Sänk farten, ge marginal, var beredd att stanna.
      </text>
      <text x="200" y="526" textAnchor="middle" className="fill-text-secondary text-[13px]">
        A13 varnar i förväg för platsen.
      </text>
    </svg>
  );
}
