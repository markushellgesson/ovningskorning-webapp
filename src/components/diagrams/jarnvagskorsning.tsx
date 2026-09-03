/**
 * Järnvägs- och spårvägskorsning — stopplats, siktlinje längs spåret och
 * bommar. Trafikförordningen 2 kap 7 §.
 *
 * Vägmärkesbilden A35 i public/signs/ är ett svenskt officiellt vägmärke
 * (allmän handling) och fri att återge.
 */

export function JarnvagskorsningDiagram() {
  return (
    <svg
      viewBox="0 0 500 520"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="crossing-title crossing-desc"
    >
      <title id="crossing-title">Järnvägskorsning: stopplats, siktlinje och bommar</title>
      <desc id="crossing-desc">
        Vy uppifrån av en väg som korsar ett spår. Spåret ritas med två räls och fyllda sliprar
        tvärs över. En bit före korsningen varnar vägmärket A35 för korsning med bommar. En stopplats
        markeras med en heldragen linje och etiketten &quot;Stopplats — betryggande avstånd&quot;, placerad
        före både bommarna och spåret; din bil (prickmönster) står stannad vid linjen. Två
        rödvitrandiga bommar ligger fällda tvärs över körbanan på var sin sida av spåret. Streckade
        pilar längs spåret åt båda håll visar att föraren måste titta längs spåret själv, även om
        ingen signal lyser. Långt bort åt höger står ett tåg på spåret, ritat med ett liggande
        streckmönster som skiljer det från bilen, för att visa vad siktlinjen ska upptäcka.
      </desc>

      <defs>
        <pattern id="rail-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
        </pattern>
        {/* Tåget får ett eget mönster: prickar betyder "din bil" i appens
            diagram, och tåg och bil får inte gå att förväxla i just det
            diagram som handlar om att upptäcka tåget. */}
        <pattern id="rail-train-bars" patternUnits="userSpaceOnUse" width="8" height="8">
          <rect width="8" height="3.5" className="fill-safety-600" />
        </pattern>
        <pattern id="barrier-stripes" patternUnits="userSpaceOnUse" width="14" height="14" patternTransform="rotate(45)">
          <rect width="7" height="14" className="fill-safety-600" />
          <rect x="7" width="7" height="14" className="fill-diagram-marking" />
        </pattern>
        <marker
          id="rail-arrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-text-secondary" />
        </marker>
      </defs>

      {/* Vägen, vertikal */}
      <rect x="170" y="0" width="140" height="520" className="fill-diagram-road" />
      <line x1="170" y1="0" x2="170" y2="520" className="stroke-diagram-edge" strokeWidth="2" />
      <line x1="310" y1="0" x2="310" y2="520" className="stroke-diagram-edge" strokeWidth="2" />

      {/* Spåret, horisontellt, med sliprar */}
      <rect x="0" y="215" width="500" height="50" className="fill-diagram-edge" opacity="0.25" />
      {Array.from({ length: 14 }).map((_, i) => (
        <rect key={i} x={i * 36 + 4} y="215" width="10" height="50" className="fill-diagram-edge" />
      ))}
      <line x1="0" y1="228" x2="500" y2="228" className="stroke-primary-600" strokeWidth="3" />
      <line x1="0" y1="252" x2="500" y2="252" className="stroke-primary-600" strokeWidth="3" />

      {/* Siktlinjer längs spåret, åt båda håll */}
      <path
        d="M 165 240 L 30 240"
        className="stroke-text-secondary"
        strokeWidth="2"
        strokeDasharray="6 5"
        markerEnd="url(#rail-arrow)"
      />
      <path
        d="M 315 240 L 460 240"
        className="stroke-text-secondary"
        strokeWidth="2"
        strokeDasharray="6 5"
        markerEnd="url(#rail-arrow)"
      />
      <text x="15" y="200" className="fill-text-primary text-[13px] font-medium">
        Titta längs
      </text>
      <text x="15" y="216" className="fill-text-primary text-[13px] font-medium">
        spåret
      </text>
      <text x="370" y="200" className="fill-text-primary text-[13px] font-medium" textAnchor="middle">
        och åt andra hållet
      </text>

      {/* Tåg långt bort längs spåret */}
      <g transform="translate(440, 232)">
        <rect width="46" height="18" rx="3" fill="url(#rail-train-bars)" className="stroke-safety-600" strokeWidth="2" />
        <text x="23" y="34" textAnchor="middle" className="fill-text-secondary text-[13px]">
          Tåg
        </text>
      </g>

      {/* Bommar, fällda tvärs över körbanan på var sin sida av spåret */}
      <rect
        x="170"
        y="195"
        width="140"
        height="14"
        fill="url(#barrier-stripes)"
        className="stroke-safety-700"
        strokeWidth="1.5"
      />
      <text x="320" y="205" className="fill-text-secondary text-[13px]">
        Bom, fälld
      </text>
      <rect
        x="170"
        y="271"
        width="140"
        height="14"
        fill="url(#barrier-stripes)"
        className="stroke-safety-700"
        strokeWidth="1.5"
      />

      {/* Stopplats: heldragen linje före bommen, på ankomstsidan */}
      <line x1="170" y1="340" x2="310" y2="340" className="stroke-progress-600" strokeWidth="3" />
      <text x="240" y="365" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Stopplats
      </text>
      <text x="240" y="385" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Betryggande avstånd, före bom och spår
      </text>

      {/* Bilen, stannad vid stopplatsen */}
      <rect
        x="215"
        y="400"
        width="50"
        height="30"
        fill="url(#rail-dots)"
        className="stroke-attention-600"
        strokeWidth="2"
        rx="4"
      />

      {/* A35 — varning för korsning med bommar, en bit före stopplatsen */}
      <g>
        <rect x="30" y="380" width="110" height="110" className="fill-none stroke-border-default" strokeWidth="1.5" rx="8" />
        <image href="/signs/A35.svg" x="48" y="392" width="74" height="65" />
        <text x="85" y="475" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
          A35
        </text>
        <text x="85" y="500" textAnchor="middle" className="fill-text-tertiary text-[13px]">
          Varnar för bommar
        </text>
      </g>
    </svg>
  );
}
