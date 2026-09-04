/**
 * Döda vinkeln — bilen sedd uppifrån (VEH-02).
 * Tre siktzoner: det föraren ser direkt, det som syns i speglarna,
 * och det som inte syns någonstans — döda vinkeln.
 *
 * Geometri (bilen kör uppåt, föraren sitter till vänster):
 * - Förarens öga: (182, 254). Direkt sikt slutar vid B-stolparna (160, 262) och (240, 262).
 *   Vänster gräns: y = 254 + 0,364·(182 − x)  → når x = 0 vid y = 320.
 *   Höger gräns:   y = 254 + 0,138·(x − 182)  → når x = 400 vid y = 284.
 * - Ytterspeglar: apex (154, 246) resp. (246, 246). Inre kant längs bilens sida
 *   (en liten del av bilen syns), yttre kant 20° utåt → (43, 520) resp. (357, 520).
 * - Innerspegel: apex (200, 228), begränsad av bakrutans bredd → (76, 520) och (324, 520).
 * - Döda vinkeln = området mellan direktsiktens gräns och ytterspegelns yttre kant.
 *   Cyklisten på (92, 352) ligger under direktsiktlinjen (y = 287 vid x = 92) och ovanför
 *   spegelkanten (y = 404 vid x = 92) — alltså osynlig från förarplatsen.
 */

export function DodaVinkelnDiagram() {
  return (
    <svg
      viewBox="0 0 400 600"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="dv-title dv-desc"
    >
      <title id="dv-title">Döda vinkeln sedd uppifrån</title>
      <desc id="dv-desc">
        Din bil sedd uppifrån, den kör uppåt i bilden och föraren sitter till vänster. Tre zoner
        visar var du ser. Framåt och åt sidorna, fram till ungefär dina axlar, ligger det du ser
        direkt genom rutorna: ett område med tunna vågräta linjer. Bakåt ligger tre smala kilar
        med diagonala ränder: det speglarna visar. Innerspegelns kil går rakt bakåt och är
        begränsad av bakrutans bredd. Ytterspeglarnas kilar börjar vid bilens sidor och pekar
        snett bakåt och utåt. Mellan direktsikten och ytterspeglarnas kilar, snett bakom dig på
        båda sidor, finns två rutmönstrade fält: döda vinkeln. Där syns ingenting, vare sig direkt
        eller i någon spegel. En cyklist, ritad som en fylld cirkel med pil framåt, ligger i
        vänster döda vinkel. Fältet på höger sida är större, eftersom du sitter längre från den
        sidan. Poängen: speglarna räcker inte hit, du måste vrida huvudet för att se.
      </desc>

      <defs>
        {/* Elevens bil: prickar */}
        <pattern id="dv-car" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
        </pattern>
        {/* Direkt sikt: tunna vågräta linjer */}
        <pattern id="dv-direct" patternUnits="userSpaceOnUse" width="10" height="10">
          <line x1="0" y1="5" x2="10" y2="5" className="stroke-primary-400" strokeWidth="1" />
        </pattern>
        {/* Speglarnas synfält: diagonala ränder */}
        <pattern id="dv-mirror" patternUnits="userSpaceOnUse" width="8" height="8">
          <path
            d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4"
            className="stroke-primary-600"
            strokeWidth="1.5"
          />
        </pattern>
        {/* Döda vinkeln: rutmönster på röd botten */}
        <pattern id="dv-dead" patternUnits="userSpaceOnUse" width="12" height="12">
          <rect width="12" height="12" className="fill-safety-200" />
          <path d="M 0 0 L 12 12 M 12 0 L 0 12" className="stroke-safety-600" strokeWidth="1.2" />
        </pattern>
        <marker
          id="dv-arrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary-600" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text
        x="200"
        y="24"
        className="fill-text-primary text-[15px] font-semibold"
        textAnchor="middle"
      >
        Sett uppifrån — bilen kör uppåt
      </text>

      {/* Teckenförklaring */}
      <g>
        <rect
          x="16"
          y="38"
          width="22"
          height="14"
          fill="url(#dv-direct)"
          className="stroke-primary-400"
          strokeWidth="1"
        />
        <text x="46" y="50" className="fill-text-primary text-[13px]">
          Ser du direkt — framåt och åt sidorna
        </text>
        <rect
          x="16"
          y="58"
          width="22"
          height="14"
          fill="url(#dv-mirror)"
          className="stroke-primary-600"
          strokeWidth="1"
        />
        <text x="46" y="70" className="fill-text-primary text-[13px]">
          Ser du i speglarna
        </text>
        <rect
          x="16"
          y="78"
          width="22"
          height="14"
          fill="url(#dv-dead)"
          className="stroke-safety-600"
          strokeWidth="1"
        />
        <text x="46" y="90" className="fill-text-primary text-[13px]">
          Döda vinkeln — syns varken direkt eller i spegel
        </text>
      </g>

      {/* Direkt sikt: framåt och åt sidorna, begränsad av B-stolparna */}
      <polygon
        points="0,112 400,112 400,284 240,262 182,254 160,262 0,320"
        fill="url(#dv-direct)"
        className="stroke-primary-400"
        strokeWidth="1"
      />
      <text
        x="200"
        y="150"
        className="fill-text-secondary text-[13px] font-medium"
        textAnchor="middle"
      >
        Direkt sikt
      </text>

      {/* Speglarnas synfält: innerspegel + två ytterspeglar, en enda form så överlapp blir sömlöst */}
      <path
        d="M 200 228 L 76 520 L 324 520 Z M 154 246 L 43 520 L 164 520 Z M 246 246 L 236 520 L 357 520 Z"
        fill="url(#dv-mirror)"
        className="stroke-primary-600"
        strokeWidth="1"
      />
      <text
        x="200"
        y="474"
        className="fill-text-secondary text-[13px] font-medium"
        textAnchor="middle"
      >
        Innerspegel
      </text>
      <text
        x="105"
        y="508"
        className="fill-text-secondary text-[13px] font-medium"
        textAnchor="middle"
      >
        Ytterspegel
      </text>
      <text
        x="295"
        y="508"
        className="fill-text-secondary text-[13px] font-medium"
        textAnchor="middle"
      >
        Ytterspegel
      </text>

      {/* Döda vinkeln vänster: mellan direktsiktens gräns och ytterspegelns yttre kant */}
      <polygon
        points="160,262 0,320 0,520 43,520 154,246"
        fill="url(#dv-dead)"
        className="stroke-safety-600"
        strokeWidth="1.5"
      />
      {/* Döda vinkeln höger: större, eftersom föraren sitter längre bort */}
      <polygon
        points="240,262 400,284 400,520 357,520 246,246"
        fill="url(#dv-dead)"
        className="stroke-safety-600"
        strokeWidth="1.5"
      />
      <text x="8" y="420" className="fill-text-primary text-[13px] font-semibold">
        Döda
      </text>
      <text x="8" y="438" className="fill-text-primary text-[13px] font-semibold">
        vinkeln
      </text>
      <text x="350" y="420" className="fill-text-primary text-[13px] font-semibold">
        Döda
      </text>
      <text x="350" y="438" className="fill-text-primary text-[13px] font-semibold">
        vinkeln
      </text>

      {/* Cyklist i vänster döda vinkel */}
      <g>
        <circle cx="92" cy="352" r="9" className="fill-primary-600" />
        <path
          d="M 92 340 L 92 326"
          className="stroke-primary-600"
          strokeWidth="2"
          fill="none"
          markerEnd="url(#dv-arrow)"
        />
        <text x="58" y="380" className="fill-text-primary text-[13px]">
          Cyklist
        </text>
        <text x="40" y="396" className="fill-text-secondary text-[13px]">
          syns inte alls
        </text>
      </g>

      {/* Bilen */}
      <g>
        <rect
          x="160"
          y="190"
          width="80"
          height="140"
          rx="10"
          fill="url(#dv-car)"
          className="stroke-attention-600"
          strokeWidth="2"
        />
        {/* Vindruta och bakruta */}
        <line x1="168" y1="222" x2="232" y2="222" className="stroke-attention-600" strokeWidth="2" />
        <line x1="168" y1="300" x2="232" y2="300" className="stroke-attention-600" strokeWidth="2" />
        {/* Ytterspeglar */}
        <rect x="148" y="238" width="12" height="8" className="fill-attention-600" />
        <rect x="240" y="238" width="12" height="8" className="fill-attention-600" />
        {/* Innerspegel */}
        <rect x="192" y="226" width="16" height="4" className="fill-attention-600" />
        {/* Förarens position */}
        <circle cx="182" cy="254" r="5" className="fill-attention-600" />
        <text x="191" y="259" className="fill-text-primary text-[13px] font-semibold">
          Du
        </text>
        {/* Färdriktning */}
        <path
          d="M 200 178 L 200 160 M 194 166 L 200 160 L 206 166"
          className="stroke-attention-600"
          strokeWidth="2"
          fill="none"
        />
      </g>

      {/* Slutsats */}
      <text
        x="200"
        y="552"
        className="fill-text-primary text-[13px] font-medium"
        textAnchor="middle"
      >
        Speglarna räcker inte hit — vrid huvudet för att se.
      </text>
      <text x="200" y="572" className="fill-text-secondary text-[13px]" textAnchor="middle">
        Testa: låt någon gå runt bilen och se var hen försvinner.
      </text>
    </svg>
  );
}
