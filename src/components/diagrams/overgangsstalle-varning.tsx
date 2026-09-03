/**
 * Vägmärke A13 — varning för gående, som ofta sätts upp före ett
 * övergångsställe eller en plats där gående brukar korsa vägen.
 *
 * Vägmärkesbilden i public/signs/ är ett svenskt officiellt vägmärke
 * (allmän handling) och fri att återge.
 */

export function OvergangsstalleVarningDiagram() {
  return (
    <svg
      viewBox="0 0 500 300"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="a13-title a13-desc"
    >
      <title id="a13-title">A13 — Varning för gående</title>
      <desc id="a13-desc">
        En gul triangel med röd bård och en gående figur, uppsatt före ett övergångsställe eller
        en plats där gående ofta korsar vägen. Märket är en förvarning — väjningsplikten mot
        gående gäller vid själva övergångsstället, oavsett om märket satts upp eller inte.
      </desc>

      {/* A13 — varning för gående */}
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
        <image href="/signs/A13.svg" x="48" y="42" width="124" height="110" />
        <text x="110" y="222" textAnchor="middle" className="fill-text-primary text-[15px] font-semibold">
          A13
        </text>
        <text x="110" y="244" textAnchor="middle" className="fill-text-secondary text-[13px]">
          Varning för gående
        </text>
      </g>

      {/* Förklaring */}
      <g>
        <text x="240" y="55" className="fill-text-primary text-[15px] font-semibold">
          Sätts upp före ett övergångsställe
        </text>
        <text x="240" y="78" className="fill-text-secondary text-[13px]">
          eller en plats där gående ofta
        </text>
        <text x="240" y="100" className="fill-text-secondary text-[13px]">
          korsar vägen.
        </text>

        <text x="240" y="132" className="fill-text-secondary text-[13px]">
          Väjningsplikten mot gående gäller
        </text>
        <text x="240" y="154" className="fill-text-secondary text-[13px]">
          vid själva övergångsstället — oavsett
        </text>
        <text x="240" y="176" className="fill-text-secondary text-[13px]">
          om märket satts upp eller inte.
        </text>
      </g>

      <text x="250" y="280" textAnchor="middle" className="fill-text-tertiary text-[13px]">
        Svenska vägmärken är officiella verk, fria att återge.
      </text>
    </svg>
  );
}
