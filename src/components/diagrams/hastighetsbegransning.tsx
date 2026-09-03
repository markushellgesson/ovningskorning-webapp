/**
 * Hastighetsbegränsning (C31) och bashastigheten när skylt saknas.
 * Trafikförordningen 3 kap 17 §.
 *
 * Vägmärkesbilden i public/signs/ är ett svenskt officiellt vägmärke
 * (allmän handling) och fri att återge.
 */

export function HastighetsbegransningDiagram() {
  return (
    <svg
      viewBox="0 0 500 340"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="speed-title speed-desc"
    >
      <title id="speed-title">Hastighetsbegränsning och bashastighet</title>
      <desc id="speed-desc">
        Vägmärket C31, hastighetsbegränsning, visas till vänster med ett exempel på skyltat
        gränsvärde. Skylten anger det högsta tillåtna värdet, inte ett mål att alltid hålla. Till
        höger förklaras bashastigheten: saknas skylt gäller högst 50 km/h inom tättbebyggt område
        och högst 70 km/h utanför, enligt trafikförordningen 3 kap 17 §.
      </desc>

      {/* Skylt */}
      <g>
        <rect
          x="20"
          y="20"
          width="180"
          height="180"
          className="fill-none stroke-border-default"
          strokeWidth="1.5"
          rx="8"
        />
        <image href="/signs/C31-5.svg" x="45" y="35" width="130" height="130" />
        <text x="110" y="225" textAnchor="middle" className="fill-text-primary text-[15px] font-semibold">
          C31 — Hastighetsbegränsning
        </text>
        <text x="110" y="248" textAnchor="middle" className="fill-text-secondary text-[13px]">
          Högsta tillåtna hastighet —
        </text>
        <text x="110" y="266" textAnchor="middle" className="fill-text-secondary text-[13px]">
          inte alltid lämplig fart.
        </text>
      </g>

      {/* Bashastighet när skylt saknas */}
      <g>
        <line
          x1="240"
          y1="20"
          x2="240"
          y2="200"
          className="stroke-diagram-marking"
          strokeWidth="2"
          strokeDasharray="6 4"
        />

        <text x="260" y="45" className="fill-text-primary text-[14px] font-semibold">
          Saknas skylt: bashastighet
        </text>

        <rect x="260" y="65" width="210" height="55" className="fill-attention-100 stroke-attention-600" strokeWidth="1.5" rx="6" />
        <text x="275" y="88" className="fill-text-primary text-[13px] font-medium">
          Inom tättbebyggt område
        </text>
        <text x="275" y="108" className="fill-text-primary text-[13px] font-semibold">
          högst 50 km/h
        </text>

        <rect x="260" y="130" width="210" height="55" className="fill-progress-100 stroke-progress-600" strokeWidth="1.5" rx="6" />
        <text x="275" y="153" className="fill-text-primary text-[13px] font-medium">
          Utanför tättbebyggt område
        </text>
        <text x="275" y="173" className="fill-text-primary text-[13px] font-semibold">
          högst 70 km/h
        </text>

        <text x="260" y="215" className="fill-text-secondary text-[13px]">
          Trafikförordningen 3 kap 17 §
        </text>
      </g>

      <text x="250" y="300" textAnchor="middle" className="fill-text-tertiary text-[13px]">
        Svenska vägmärken är officiella verk, fria att återge.
      </text>
    </svg>
  );
}
