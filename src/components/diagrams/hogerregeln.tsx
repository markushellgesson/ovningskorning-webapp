/**
 * Högerregeln — oreglerad korsning sedd uppifrån (INT-01, INT-02).
 * Trafikförordningen 3 kap 18 §: du har väjningsplikt mot fordon som
 * närmar sig från höger där ingen skylt eller signal anger annat.
 *
 * Geometri (högertrafik, vy uppifrån):
 * - Din bil kör uppåt i bilden. Dess högra sida är då bildens högra,
 *   så den ligger i den högra halvan av den lodräta vägen (x 200–240).
 * - Det andra fordonet kör åt vänster i bilden (västerut). Dess högra sida
 *   är då bildens övre, så det ligger i den övre halvan av den vågräta
 *   vägen (y 160–200). Det befinner sig till höger om dig — östra armen.
 *
 * Mönster: prickar = du, diagonala ränder = annat fordon. Samma mönster
 * betyder aldrig två saker i samma bild.
 */

export function HogerregelnDiagram() {
  return (
    <svg
      viewBox="0 0 400 528"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="hogerregeln-title hogerregeln-desc"
    >
      <title id="hogerregeln-title">Högerregeln i en oreglerad korsning</title>
      <desc id="hogerregeln-desc">
        Fyrvägskorsning sedd uppifrån, utan vägmärken och utan signaler. Din bil, fylld med
        prickmönster, kör uppåt i bilden i det högra körfältet och närmar sig korsningen
        nedifrån. Ett annat fordon, fyllt med diagonala ränder, kommer från armen till höger om
        dig och kör åt vänster i bilden i sitt eget högra körfält. Två streckade blicklinjer går
        från din bil åt vänster och åt höger: sök åt båda hållen. En nedåtpekande triangel
        bredvid din bil markerar din väjningsplikt: du har väjningsplikt mot fordonet som
        närmar sig från höger och väntar tills det är fritt. Under bilden står: ingen skylt,
        ingen signal, högerregeln gäller.
      </desc>

      <defs>
        <pattern id="hr-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="hr-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path
            d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4"
            className="stroke-primary-600"
            strokeWidth="2"
          />
        </pattern>
        <marker
          id="hr-arrow-you"
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
          id="hr-arrow-other"
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
          id="hr-arrow-note"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-text-tertiary" />
        </marker>
      </defs>

      <text x="20" y="24" className="fill-text-primary text-[15px] font-semibold">
        Oreglerad korsning — ingen skylt, ingen signal
      </text>

      {/* Vägbanor */}
      <rect x="160" y="40" width="80" height="350" className="fill-diagram-road" />
      <rect x="0" y="160" width="400" height="80" className="fill-diagram-road" />

      {/* Vägkanter (bara på armarna, inte genom korsningen) */}
      <g className="stroke-diagram-edge" strokeWidth="1.5">
        <line x1="160" y1="40" x2="160" y2="160" />
        <line x1="240" y1="40" x2="240" y2="160" />
        <line x1="160" y1="240" x2="160" y2="390" />
        <line x1="240" y1="240" x2="240" y2="390" />
        <line x1="0" y1="160" x2="160" y2="160" />
        <line x1="0" y1="240" x2="160" y2="240" />
        <line x1="240" y1="160" x2="400" y2="160" />
        <line x1="240" y1="240" x2="400" y2="240" />
      </g>

      {/* Mittlinjer, streckade, bryts i korsningen */}
      <g className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="10 8">
        <line x1="200" y1="40" x2="200" y2="160" />
        <line x1="200" y1="240" x2="200" y2="390" />
        <line x1="0" y1="200" x2="160" y2="200" />
        <line x1="240" y1="200" x2="400" y2="200" />
      </g>

      {/* Blicklinjer: sök åt vänster och åt höger */}
      <g className="stroke-text-tertiary" strokeWidth="1.5" strokeDasharray="4 4" fill="none">
        <line x1="206" y1="292" x2="110" y2="205" />
        <line x1="234" y1="292" x2="292" y2="200" />
      </g>

      {/* Annat fordon från höger: kör åt vänster i bilden, övre körfältet */}
      <g>
        <rect
          x="290"
          y="166"
          width="40"
          height="28"
          rx="3"
          fill="url(#hr-stripes)"
          className="stroke-primary-600"
          strokeWidth="2"
        />
        <line
          x1="284"
          y1="180"
          x2="252"
          y2="180"
          className="stroke-primary-600"
          strokeWidth="2.5"
          markerEnd="url(#hr-arrow-other)"
        />
        <text
          x="310"
          y="150"
          textAnchor="middle"
          className="fill-text-primary text-[14px] font-semibold"
        >
          Kommer från höger
        </text>
      </g>

      {/* Din bil: kör uppåt, högra körfältet */}
      <g>
        <rect
          x="206"
          y="292"
          width="28"
          height="44"
          rx="3"
          fill="url(#hr-dots)"
          className="stroke-attention-600"
          strokeWidth="2"
        />
        <line
          x1="220"
          y1="286"
          x2="220"
          y2="254"
          className="stroke-attention-600"
          strokeWidth="2.5"
          markerEnd="url(#hr-arrow-you)"
        />
        <text
          x="220"
          y="358"
          textAnchor="middle"
          className="fill-text-primary text-[14px] font-semibold"
        >
          Du
        </text>
      </g>

      {/* Din vänster / din höger, sett från förarplatsen */}
      <g>
        <line
          x1="196"
          y1="316"
          x2="150"
          y2="316"
          className="stroke-text-tertiary"
          strokeWidth="1.5"
          markerEnd="url(#hr-arrow-note)"
        />
        <text x="140" y="321" textAnchor="end" className="fill-text-secondary text-[13px]">
          din vänster
        </text>
        <line
          x1="244"
          y1="316"
          x2="290"
          y2="316"
          className="stroke-text-tertiary"
          strokeWidth="1.5"
          markerEnd="url(#hr-arrow-note)"
        />
        <text x="300" y="321" className="fill-text-secondary text-[13px]">
          din höger
        </text>
      </g>

      {/* Väjningsplikt-markör: nedåtpekande triangel, som B1 */}
      <g>
        <path
          d="M 286 350 L 314 350 L 300 374 Z"
          className="fill-safety-200 stroke-safety-600"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <text
          x="300"
          y="394"
          textAnchor="middle"
          className="fill-text-primary text-[13px] font-medium"
        >
          Din väjningsplikt
        </text>
      </g>

      {/* Regeltext */}
      <text
        x="200"
        y="424"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-medium"
      >
        Ingen skylt, ingen signal — högerregeln gäller.
      </text>
      <text x="200" y="446" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Du har väjningsplikt mot fordon som närmar sig
      </text>
      <text x="200" y="464" textAnchor="middle" className="fill-text-secondary text-[13px]">
        från höger. Sänk farten, sök åt båda hållen
      </text>
      <text x="200" y="482" textAnchor="middle" className="fill-text-secondary text-[13px]">
        och vänta tills det är fritt.
      </text>

      {/* Teckenförklaring */}
      <g transform="translate(0, 18)">
        <rect
          x="60"
          y="482"
          width="22"
          height="14"
          rx="2"
          fill="url(#hr-dots)"
          className="stroke-attention-600"
          strokeWidth="1.5"
        />
        <text x="90" y="494" className="fill-text-tertiary text-[13px]">
          Du (prickar)
        </text>
        <rect
          x="200"
          y="482"
          width="22"
          height="14"
          rx="2"
          fill="url(#hr-stripes)"
          className="stroke-primary-600"
          strokeWidth="1.5"
        />
        <text x="230" y="494" className="fill-text-tertiary text-[13px]">
          Annat fordon (ränder)
        </text>
      </g>
    </svg>
  );
}
