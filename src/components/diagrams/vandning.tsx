/**
 * Vändning — trepunktsvändning i tre steg med kontrollpunkter.
 * Ren teknik/geometri; själva vändningen är inte reglerad i författning
 * (se momentbeskrivningen), bara förbudet mot att vända på motorväg.
 */

export function VandningDiagram() {
  return (
    <svg
      viewBox="0 0 500 720"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="turn-title turn-desc"
    >
      <title id="turn-title">Trepunktsvändning i tre steg</title>
      <desc id="turn-desc">
        Tre steg för att vända bilen på en begränsad väg. Din bil är markerad med prickmönster. Steg
        1: kör fram med fullt rattutslag mot motsatt kant och stanna vid en kontrollpunkt (markerad
        med en liten flagga) i god tid före kanten. Steg 2: lägg i backen, titta bakåt genom
        vridning över axeln, och backa med motsatt rattutslag till en andra kontrollpunkt nära den
        första kanten. Steg 3: räta upp ratten, kontrollera åt båda håll och kör rakt ut när
        körbanan är fri.
      </desc>

      <defs>
        <pattern id="turn-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
        </pattern>
        <marker
          id="turn-arrow"
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

      {/* Steg 1: Kör fram med fullt rattutslag till första kontrollpunkten */}
      <g>
        <text x="10" y="18" className="fill-text-primary text-[15px] font-semibold">
          1. Fram med fullt rattutslag, till kontrollpunkten
        </text>

        <rect x="0" y="30" width="500" height="140" className="fill-diagram-road" />
        <line x1="0" y1="30" x2="500" y2="30" className="stroke-diagram-edge" strokeWidth="3" />
        <line x1="0" y1="170" x2="500" y2="170" className="stroke-diagram-edge" strokeWidth="3" />

        {/* Bil, start längs nedre kanten */}
        <rect
          x="30"
          y="130"
          width="60"
          height="28"
          fill="url(#turn-dots)"
          className="stroke-attention-600"
          strokeWidth="2"
          rx="4"
        />
        <text x="60" y="122" textAnchor="middle" className="fill-text-secondary text-[13px]">
          Start
        </text>

        {/* Bana fram och vinklat mot övre kanten */}
        <path
          d="M 90 144 Q 220 144 290 60"
          className="stroke-progress-600"
          strokeWidth="2.5"
          fill="none"
          strokeDasharray="7 5"
          markerEnd="url(#turn-arrow)"
        />

        {/* Bil vinklad, stannad vid kontrollpunkten */}
        <rect
          x="270"
          y="42"
          width="60"
          height="28"
          fill="url(#turn-dots)"
          className="stroke-attention-600"
          strokeWidth="2"
          rx="4"
          transform="rotate(-30 300 56)"
        />

        {/* Kontrollpunkt: flagga */}
        <g transform="translate(345, 40)">
          <line x1="0" y1="0" x2="0" y2="30" className="stroke-progress-600" strokeWidth="2" />
          <path d="M 0 0 L 22 6 L 0 12 Z" className="fill-progress-600" />
          <text x="6" y="46" className="fill-text-primary text-[13px] font-medium">
            Kontrollpunkt 1
          </text>
        </g>

        <text x="10" y="200" className="fill-text-secondary text-[13px]">
          Stanna i god tid — inte vid kanten, utan med marginal kvar.
        </text>
      </g>

      {/* Steg 2: Backa med motsatt rattutslag, titta bakåt */}
      <g transform="translate(0, 240)">
        <text x="10" y="18" className="fill-text-primary text-[15px] font-semibold">
          2. Titta bakåt, backa med motsatt rattutslag
        </text>

        <rect x="0" y="30" width="500" height="140" className="fill-diagram-road" />
        <line x1="0" y1="30" x2="500" y2="30" className="stroke-diagram-edge" strokeWidth="3" />
        <line x1="0" y1="170" x2="500" y2="170" className="stroke-diagram-edge" strokeWidth="3" />

        {/* Bil vid kontrollpunkt 1, vinklad */}
        <rect
          x="270"
          y="42"
          width="60"
          height="28"
          fill="url(#turn-dots)"
          className="stroke-attention-600"
          strokeWidth="2"
          rx="4"
          transform="rotate(-30 300 56)"
        />

        {/* Bana bakåt och vinklat mot nedre kanten */}
        <path
          d="M 275 68 Q 180 90 130 150"
          className="stroke-safety-600"
          strokeWidth="2.5"
          fill="none"
          strokeDasharray="7 5"
          markerEnd="url(#turn-arrow)"
        />

        {/* Bil vinklad andra hållet, stannad vid kontrollpunkt 2 */}
        <rect
          x="90"
          y="128"
          width="60"
          height="28"
          fill="url(#turn-dots)"
          className="stroke-attention-600"
          strokeWidth="2"
          rx="4"
          transform="rotate(30 120 142)"
        />

        {/* Kontrollpunkt: flagga */}
        <g transform="translate(35, 130)">
          <line x1="0" y1="0" x2="0" y2="30" className="stroke-safety-600" strokeWidth="2" />
          <path d="M 0 0 L 22 6 L 0 12 Z" className="fill-safety-600" />
          <text x="6" y="46" className="fill-text-primary text-[13px] font-medium">
            Kontrollpunkt 2
          </text>
        </g>

        {/* Blickriktning: öga-symbol bakåt över axeln */}
        <circle cx="330" cy="100" r="10" className="fill-primary-100 stroke-primary-600" strokeWidth="2" />
        <path d="M 322 100 Q 330 94 338 100 Q 330 106 322 100 Z" className="fill-primary-600" />
        <line
          x1="300"
          y1="60"
          x2="322"
          y2="98"
          className="stroke-primary-600"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <text x="345" y="104" className="fill-text-primary text-[13px] font-medium">
          Blicken bakåt
        </text>

        <text x="10" y="200" className="fill-text-secondary text-[13px]">
          Krypfart. Hellre ett tag till än att skrapa kanten.
        </text>
      </g>

      {/* Steg 3: Räta upp, kolla åt båda håll, kör ut */}
      <g transform="translate(0, 500)">
        <text x="10" y="18" className="fill-text-primary text-[15px] font-semibold">
          3. Räta upp, kolla åt båda håll, kör ut
        </text>

        <rect x="0" y="30" width="500" height="140" className="fill-diagram-road" />
        <line x1="0" y1="30" x2="500" y2="30" className="stroke-diagram-edge" strokeWidth="3" />
        <line x1="0" y1="170" x2="500" y2="170" className="stroke-diagram-edge" strokeWidth="3" />

        {/* Bil rak, i färdriktning ut */}
        <rect
          x="90"
          y="128"
          width="60"
          height="28"
          fill="url(#turn-dots)"
          className="stroke-attention-600"
          strokeWidth="2"
          rx="4"
          transform="rotate(30 120 142)"
        />
        <rect
          x="190"
          y="90"
          width="60"
          height="28"
          fill="url(#turn-dots)"
          className="stroke-attention-600"
          strokeWidth="2"
          rx="4"
          opacity="0.35"
        />

        <path
          d="M 150 142 L 260 100"
          className="stroke-progress-600"
          strokeWidth="2.5"
          fill="none"
          strokeDasharray="7 5"
          markerEnd="url(#turn-arrow)"
        />

        {/* Kontroll åt båda håll: pilar vänster och höger */}
        <path
          d="M 60 60 L 20 60 M 30 52 L 20 60 L 30 68"
          className="stroke-text-secondary"
          strokeWidth="2"
          fill="none"
        />
        <text x="10" y="45" className="fill-text-secondary text-[13px]">
          Kolla vänster
        </text>
        <path
          d="M 440 60 L 480 60 M 470 52 L 480 60 L 470 68"
          className="stroke-text-secondary"
          strokeWidth="2"
          fill="none"
        />
        <text x="400" y="45" className="fill-text-secondary text-[13px]">
          Kolla höger
        </text>

        <text x="10" y="200" className="fill-text-secondary text-[13px]">
          Kör ut först när körbanan är fri åt båda håll.
        </text>
      </g>
    </svg>
  );
}
