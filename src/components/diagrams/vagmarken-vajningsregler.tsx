/**
 * Vägmärken för väjningsplikt (B1) och stopplikt (B2), sida vid sida.
 * Adresserar det namngivna vanliga misstaget för INT-01: att blanda ihop dem.
 *
 * Vägmärkesbilderna i public/signs/ är svenska officiella vägmärken (allmänna
 * handlingar) och fria att återge.
 */

export function VagmarkenVajningsreglerDiagram() {
  return (
    <svg
      viewBox="0 0 500 380"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="signs-title signs-desc"
    >
      <title id="signs-title">Väjningsplikt och stopplikt — två olika skyltar</title>
      <desc id="signs-desc">
        Två vägmärken sida vid sida. Till vänster: B1, väjningsplikt — en nedåtpekande triangel.
        Väjningsplikt betyder att du ska ge fri väg; du behöver inte stanna om vägen redan är fri.
        Till höger: B2, stopplikt — en åttakantig skylt med texten STOP. Stopplikt kräver att du
        stannar helt, oavsett om vägen är fri eller inte. De två skyltarna blandas ofta ihop, men
        kravet är olika.
      </desc>

      {/* B1 — väjningsplikt */}
      <g>
        <rect
          x="30"
          y="20"
          width="180"
          height="180"
          className="fill-none stroke-border-default"
          strokeWidth="1.5"
          rx="8"
        />
        <image href="/signs/B1.svg" x="55" y="35" width="130" height="130" />
        <text x="120" y="225" textAnchor="middle" className="fill-text-primary text-[15px] font-semibold">
          B1 — Väjningsplikt
        </text>
        <text x="120" y="248" textAnchor="middle" className="fill-text-secondary text-[13px]">
          Ge fri väg. Stanna bara
        </text>
        <text x="120" y="266" textAnchor="middle" className="fill-text-secondary text-[13px]">
          om det behövs.
        </text>
      </g>

      {/* B2 — stopplikt */}
      <g>
        <rect
          x="290"
          y="20"
          width="180"
          height="180"
          className="fill-none stroke-border-default"
          strokeWidth="1.5"
          rx="8"
        />
        <image href="/signs/B2.svg" x="315" y="35" width="130" height="130" />
        <text x="380" y="225" textAnchor="middle" className="fill-text-primary text-[15px] font-semibold">
          B2 — Stopplikt
        </text>
        <text x="380" y="248" textAnchor="middle" className="fill-text-secondary text-[13px]">
          Stanna helt, alltid —
        </text>
        <text x="380" y="266" textAnchor="middle" className="fill-text-secondary text-[13px]">
          oavsett trafikläge.
        </text>
      </g>

      {/* Skiljelinje och gemensam varning mot att blanda ihop dem */}
      <line
        x1="250"
        y1="20"
        x2="250"
        y2="200"
        className="stroke-diagram-marking"
        strokeWidth="2"
        strokeDasharray="6 4"
      />
      <text x="250" y="300" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        Ett vanligt misstag: att blanda ihop dem.
      </text>
      <text x="250" y="322" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Väjningsplikt = ge fri väg. Stopplikt = stanna helt, alltid.
      </text>

      <text x="250" y="360" textAnchor="middle" className="fill-text-tertiary text-[13px]">
        Svenska vägmärken är officiella verk, fria att återge.
      </text>
    </svg>
  );
}
