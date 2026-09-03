/**
 * Omkörning på landsväg — sikt framåt, mötande trafik och marginalen när
 * omkörningen avslutas. Trafikförordningen 3 kap 31-40 §§.
 * Ren teknik/geometri kring det redan formulerade regelinnehållet i momentet.
 */

export function OmkorningLandsvagDiagram() {
  return (
    <svg
      viewBox="0 0 700 420"
      className="w-full max-w-2xl mx-auto"
      role="img"
      aria-labelledby="overtake-title overtake-desc"
    >
      <title id="overtake-title">Omkörning på landsväg</title>
      <desc id="overtake-desc">
        Landsväg sedd uppifrån. Din bil (prickmönster) kör om en långsammare bil (diagonalt
        randmönster): ut i det mötande körfältet, förbi, och tillbaka till höger igen. En streckad
        linje märkt sikt visar hur långt fritt avstånd som krävs framåt — hela vägen ut till ett
        mötande fordon (rutmönster) som syns långt bort i sitt eget körfält. En markerad marginal
        visar avståndet till den omkörda bilen när du lagt dig till höger igen och omkörningen är
        avslutad.
      </desc>

      <defs>
        <pattern id="ok-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
        </pattern>
        <pattern id="ok-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="2" />
        </pattern>
        <pattern id="ok-grid" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M0,0 L8,8 M8,0 L0,8" className="stroke-safety-600" strokeWidth="1.5" />
        </pattern>
        <marker
          id="ok-arrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-progress-600" />
        </marker>
      </defs>

      {/* Vägbana: mötande körfält överst, eget körfält underst */}
      <rect x="20" y="80" width="660" height="160" className="fill-diagram-road" />
      <line
        x1="20"
        y1="160"
        x2="680"
        y2="160"
        className="stroke-diagram-marking"
        strokeWidth="3"
        strokeDasharray="10 8"
      />
      <line x1="20" y1="80" x2="680" y2="80" className="stroke-diagram-edge" strokeWidth="2" />
      <line x1="20" y1="240" x2="680" y2="240" className="stroke-diagram-edge" strokeWidth="2" />

      <text x="30" y="70" className="fill-text-secondary text-[13px]">
        Mötande körfält
      </text>
      <text x="30" y="258" className="fill-text-secondary text-[13px]">
        Eget körfält
      </text>

      {/* Den omkörda bilen, i eget körfält hela tiden */}
      <rect
        x="230"
        y="195"
        width="55"
        height="30"
        fill="url(#ok-stripes)"
        className="stroke-primary-600"
        strokeWidth="2"
        rx="4"
      />
      <text x="257" y="270" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Omkörd bil
      </text>

      {/* Din bil: tre positioner längs vägen ut, förbi och tillbaka */}
      <rect
        x="70"
        y="200"
        width="50"
        height="26"
        fill="url(#ok-dots)"
        className="stroke-attention-600"
        strokeWidth="2"
        rx="4"
      />
      <rect
        x="330"
        y="95"
        width="50"
        height="26"
        fill="url(#ok-dots)"
        className="stroke-attention-600"
        strokeWidth="2"
        rx="4"
      />
      <rect
        x="470"
        y="200"
        width="50"
        height="26"
        fill="url(#ok-dots)"
        className="stroke-attention-600"
        strokeWidth="2"
        rx="4"
      />

      {/* Väg (bana) för din bil: ut, förbi, tillbaka */}
      <path
        d="M 120 213 Q 200 213 240 155 L 330 108 Q 420 108 470 155 Q 500 190 495 213"
        className="stroke-progress-600"
        strokeWidth="2.5"
        fill="none"
        strokeDasharray="7 5"
        markerEnd="url(#ok-arrow)"
      />

      {/* Mötande bil, långt bort i sitt eget körfält */}
      <rect
        x="600"
        y="95"
        width="50"
        height="26"
        fill="url(#ok-grid)"
        className="stroke-safety-600"
        strokeWidth="2"
        rx="4"
      />
      <path
        d="M 615 108 L 595 108 M 600 100 L 595 108 L 600 116"
        className="stroke-safety-600"
        strokeWidth="2"
        fill="none"
      />
      <text x="625" y="270" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Mötande
      </text>

      {/* Siktlinje: hur långt fritt avstånd som krävs */}
      <line
        x1="355"
        y1="95"
        x2="600"
        y2="95"
        className="stroke-text-tertiary"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      <circle cx="355" cy="95" r="4" className="fill-text-tertiary" />
      <circle cx="600" cy="95" r="4" className="fill-text-tertiary" />
      <text x="480" y="45" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Sikt: hela sträckan ut, förbi och tillbaka måste vara fri
      </text>

      {/* Marginal när bilen lagt sig till höger igen */}
      <line x1="380" y1="213" x2="470" y2="213" className="stroke-progress-600" strokeWidth="2" />
      <line x1="380" y1="207" x2="380" y2="219" className="stroke-progress-600" strokeWidth="2" />
      <line x1="470" y1="207" x2="470" y2="219" className="stroke-progress-600" strokeWidth="2" />
      <text x="425" y="335" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        Marginal när du lagt dig till höger igen
      </text>
      <text x="425" y="357" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Omkörningen ska vara avslutad — inte bara påbörjad — innan mötet
      </text>

      {/* Legend */}
      <g transform="translate(30, 385)">
        <rect width="16" height="16" fill="url(#ok-dots)" className="stroke-attention-600" strokeWidth="1.5" />
        <text x="22" y="12" className="fill-text-secondary text-[13px]">
          Din bil
        </text>
        <rect x="130" width="16" height="16" fill="url(#ok-stripes)" className="stroke-primary-600" strokeWidth="1.5" />
        <text x="152" y="12" className="fill-text-secondary text-[13px]">
          Omkörd bil
        </text>
        <rect x="280" width="16" height="16" fill="url(#ok-grid)" className="stroke-safety-600" strokeWidth="1.5" />
        <text x="302" y="12" className="fill-text-secondary text-[13px]">
          Mötande bil
        </text>
      </g>
    </svg>
  );
}
