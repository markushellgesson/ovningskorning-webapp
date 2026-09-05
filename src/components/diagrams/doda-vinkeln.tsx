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
 *
 * Scenen ritas i sina egna koordinater (ovan) inuti en grupp med
 * translate(130 82) scale(0.7), så att marginalerna runt om rymmer numrerade
 * hänvisningar. px/py räknar om scenkoordinater till bildkoordinater för
 * pekarlinjerna. Geometrin är oförändrad; bara ramen runt den är ny.
 *
 * Rutan längst ned återanvänder samma geometri i halv skala, relativt bilens
 * mittpunkt (200, 260): ytterspegelns kil, cyklisten och en huvudvridning
 * från ögat (182, 254) som täcker cyklisten.
 */

const S = 0.7;
const TX = 130;
const TY = 82;
const px = (x: number) => TX + S * x;
const py = (y: number) => TY + S * y;

function Badge({ cx, cy, n }: { cx: number; cy: number; n: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="11" className="fill-text-primary" />
      <text
        x={cx}
        y={cy + 5}
        textAnchor="middle"
        className="fill-surface-base text-[13px] font-semibold"
      >
        {n}
      </text>
    </g>
  );
}

export function DodaVinkelnDiagram() {
  return (
    <svg
      viewBox="0 0 540 770"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="dv-title dv-desc"
    >
      <title id="dv-title">Döda vinkeln sedd uppifrån</title>
      <desc id="dv-desc">
        Din bil sedd uppifrån, den kör uppåt i bilden och föraren sitter till vänster. Tre zoner
        visar var du ser, och numrerade hänvisningar i marginalerna pekar på dem. Ett: framåt och
        åt sidorna, fram till ungefär dina axlar, ligger det du ser direkt genom rutorna, ett
        område med tunna vågräta linjer. Två: bakåt ligger tre smala kilar med diagonala ränder,
        det speglarna visar. Innerspegelns kil går rakt bakåt och är begränsad av bakrutans
        bredd. Ytterspeglarnas kilar börjar vid bilens sidor och pekar snett bakåt och utåt. Tre:
        mellan direktsikten och ytterspeglarnas kilar, snett bakom dig på båda sidor, finns två
        rutmönstrade fält, döda vinkeln. Där syns ingenting, vare sig direkt eller i någon spegel.
        Fältet på höger sida är större, eftersom du sitter längre från den sidan. Fyra: en
        cyklist, ritad som en fylld cirkel med pil framåt, ligger i vänster döda vinkel. En ruta
        längst ned visar två fall i liten skala. Tittar du bara i ytterspegeln ligger cyklisten
        utanför spegelns kil och syns inte, markerat med ett kryss. Vrider du huvudet täcker
        blicken snett bakåt cyklisten, markerat med en bock. Poängen: speglarna räcker inte hit,
        du måste vrida huvudet för att se.
      </desc>

      <defs>
        {/* Elevens bil: prickar */}
        <pattern id="dv-car-fill" patternUnits="userSpaceOnUse" width="8" height="8">
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
        <marker
          id="dv-arrow-car"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-attention-600" />
        </marker>
        {/* Din bil, fronten uppåt, centrerad i (200, 260) i scenens koordinater.
            Ögat (182, 254) ligger på (−18, −6), ytterspeglarna på x = ±52. */}
        <g id="dv-car">
          <rect x="-46" y="-48" width="10" height="22" rx="2" className="fill-text-primary" />
          <rect x="36" y="-48" width="10" height="22" rx="2" className="fill-text-primary" />
          <rect x="-46" y="26" width="10" height="22" rx="2" className="fill-text-primary" />
          <rect x="36" y="26" width="10" height="22" rx="2" className="fill-text-primary" />
          <rect
            x="-40"
            y="-70"
            width="80"
            height="140"
            rx="10"
            fill="url(#dv-car-fill)"
            className="stroke-attention-600"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <rect x="-32" y="-46" width="64" height="16" rx="3" className="fill-diagram-marking stroke-attention-600" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <rect x="-32" y="34" width="64" height="12" rx="3" className="fill-diagram-marking stroke-attention-600" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <rect x="-52" y="-22" width="12" height="8" className="fill-attention-600" />
          <rect x="40" y="-22" width="12" height="8" className="fill-attention-600" />
          <rect x="-8" y="-34" width="16" height="4" className="fill-attention-600" />
          <circle cx="-18" cy="-6" r="5" className="fill-attention-600" />
        </g>
      </defs>

      {/* Rubrik */}
      <text x="20" y="32" className="fill-text-primary text-[16px] font-semibold">
        Döda vinkeln — bilen sedd uppifrån
      </text>
      <text x="20" y="52" className="fill-text-secondary text-[13px]">
        Du kör uppåt i bilden och sitter till vänster.
      </text>

      {/* Teckenförklaring */}
      <g>
        <rect x="20" y="67" width="22" height="14" fill="url(#dv-direct)" className="stroke-primary-400" strokeWidth="1" />
        <text x="50" y="79" className="fill-text-secondary text-[13px]">
          Ser du direkt — framåt och åt sidorna
        </text>
        <rect x="20" y="89" width="22" height="14" fill="url(#dv-mirror)" className="stroke-primary-600" strokeWidth="1" />
        <text x="50" y="101" className="fill-text-secondary text-[13px]">
          Ser du i speglarna
        </text>
        <rect x="20" y="111" width="22" height="14" fill="url(#dv-dead)" className="stroke-safety-600" strokeWidth="1" />
        <text x="50" y="123" className="fill-text-secondary text-[13px]">
          Döda vinkeln — syns varken direkt eller i spegel
        </text>
      </g>

      {/* Scenen, i sina egna koordinater */}
      <g transform={`translate(${TX} ${TY}) scale(${S})`}>
        {/* Direkt sikt: framåt och åt sidorna, begränsad av B-stolparna */}
        <polygon
          points="0,112 400,112 400,284 240,262 182,254 160,262 0,320"
          fill="url(#dv-direct)"
          className="stroke-primary-400"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />

        {/* Speglarnas synfält: innerspegel + två ytterspeglar, en enda form så överlapp blir sömlöst */}
        <path
          d="M 200 228 L 76 520 L 324 520 Z M 154 246 L 43 520 L 164 520 Z M 246 246 L 236 520 L 357 520 Z"
          fill="url(#dv-mirror)"
          className="stroke-primary-600"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />

        {/* Döda vinkeln vänster: mellan direktsiktens gräns och ytterspegelns yttre kant */}
        <polygon
          points="160,262 0,320 0,520 43,520 154,246"
          fill="url(#dv-dead)"
          className="stroke-safety-600"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        {/* Döda vinkeln höger: större, eftersom föraren sitter längre bort */}
        <polygon
          points="240,262 400,284 400,520 357,520 246,246"
          fill="url(#dv-dead)"
          className="stroke-safety-600"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />

        {/* Cyklist i vänster döda vinkel */}
        <circle cx="92" cy="352" r="12" className="fill-primary-600" />
        <path
          d="M 92 336 L 92 316"
          className="stroke-primary-600"
          strokeWidth="3"
          fill="none"
          markerEnd="url(#dv-arrow)"
        />

        {/* Bilen och färdriktningen */}
        <use href="#dv-car" transform="translate(200 260)" />
        <path
          d="M 200 178 L 200 158"
          className="stroke-attention-600"
          strokeWidth="3"
          fill="none"
          markerEnd="url(#dv-arrow-car)"
        />
      </g>

      {/* Du: text i bildkoordinater så den inte krymper */}
      <text x={px(182) + 9} y={py(254) + 4} className="fill-text-primary text-[13px] font-semibold">
        Du
      </text>

      {/* Hänvisningslinjer */}
      <g className="stroke-text-tertiary" strokeWidth="1.5">
        <line x1="413" y1="214" x2={px(350)} y2={py(190)} />
        <line x1="413" y1="356" x2={px(380)} y2={py(390)} />
        <line x1="92" y1="298" x2={px(92) - 8} y2={py(352) - 5} />
        <line x1="104" y1="402" x2="142" y2="420" />
      </g>
      <g className="fill-text-tertiary">
        <circle cx={px(350)} cy={py(190)} r="3" />
        <circle cx={px(380)} cy={py(390)} r="3" />
        <circle cx={px(92) - 8} cy={py(352) - 5} r="3" />
        <circle cx="142" cy="420" r="3" />
      </g>

      {/* 1. Direkt sikt, höger marginal */}
      <Badge cx={426} cy={214} n="1" />
      <text x="442" y="218" className="fill-text-primary text-[13px] font-semibold">
        Direkt sikt
      </text>
      <text x="415" y="236" className="fill-text-secondary text-[13px]">
        genom rutorna
      </text>

      {/* Höger döda vinkel: större */}
      <text x="415" y="352" className="fill-text-primary text-[13px] font-semibold">
        Större på
      </text>
      <text x="415" y="370" className="fill-text-primary text-[13px] font-semibold">
        höger sida
      </text>
      <text x="415" y="388" className="fill-text-secondary text-[13px]">
        du sitter längre
      </text>
      <text x="415" y="404" className="fill-text-secondary text-[13px]">
        från den sidan
      </text>

      {/* 4. Cyklist, vänster marginal */}
      <Badge cx={22} cy={296} n="4" />
      <text x="38" y="300" className="fill-text-primary text-[13px] font-semibold">
        Cyklist
      </text>
      <text x="11" y="318" className="fill-text-secondary text-[13px]">
        syns varken direkt
      </text>
      <text x="11" y="334" className="fill-text-secondary text-[13px]">
        eller i spegel
      </text>

      {/* 3. Döda vinkeln, vänster marginal */}
      <Badge cx={22} cy={396} n="3" />
      <text x="38" y="400" className="fill-text-primary text-[13px] font-semibold">
        Döda vinkeln
      </text>
      <text x="11" y="418" className="fill-text-secondary text-[13px]">
        på båda sidor
      </text>

      {/* 2. Speglarna, under scenen */}
      <Badge cx={146} cy={464} n="2" />
      <text x="202" y="468" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Ytterspegel
      </text>
      <text x="340" y="468" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Ytterspegel
      </text>
      <line x1="270" y1="450" x2="270" y2="474" className="stroke-text-tertiary" strokeWidth="1.5" />
      <text x="270" y="488" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Innerspegel
      </text>

      {/* Förklaringsruta: spegel räcker inte, huvudvridning gör det */}
      <rect x="20" y="516" width="500" height="200" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="34" y="540" className="fill-text-primary text-[13px] font-semibold">
        Speglarna räcker inte hit:
      </text>

      {/* Panel A: bara ytterspegeln, cyklisten ligger utanför kilen */}
      <g transform="translate(96 648) scale(0.5)">
        <polygon
          points="-46,-14 -100.3,120 -41.1,120"
          fill="url(#dv-mirror)"
          className="stroke-primary-600"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <use href="#dv-car" />
        <circle cx="-108" cy="92" r="9" className="fill-primary-600" />
        <path d="M -108 78 L -108 60" className="stroke-primary-600" strokeWidth="3" fill="none" markerEnd="url(#dv-arrow)" />
      </g>
      <text x="140" y="632" className="fill-text-primary text-[13px] font-semibold">
        Bara spegeln:
      </text>
      <text x="140" y="650" className="fill-text-primary text-[13px]">
        cyklisten syns inte
      </text>
      <path d="M 141 665 L 155 679 M 155 665 L 141 679" className="stroke-safety-600" strokeWidth="3" strokeLinecap="round" />

      {/* Panel B: huvudet vridet, blicken snett bakåt täcker cyklisten */}
      <g transform="translate(330 648) scale(0.5)">
        <polygon
          points="-18,-6 -150,41.9 -150,120 -51.9,120"
          fill="url(#dv-direct)"
          className="stroke-primary-400"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <use href="#dv-car" />
        <circle cx="-108" cy="92" r="9" className="fill-primary-600" />
        <path d="M -108 78 L -108 60" className="stroke-primary-600" strokeWidth="3" fill="none" markerEnd="url(#dv-arrow)" />
        {/* Huvudvridning: båge från ögat bakåt åt vänster */}
        <path d="M -6 -24 A 18 18 0 0 0 -36 -6" className="stroke-attention-600" strokeWidth="4" fill="none" markerEnd="url(#dv-arrow-car)" />
      </g>
      <text x="366" y="632" className="fill-text-primary text-[13px] font-semibold">
        Vrid huvudet också:
      </text>
      <text x="366" y="650" className="fill-text-primary text-[13px]">
        cyklisten syns
      </text>
      <path d="M 367 671 l 6 6 l 12 -13" className="fill-none stroke-progress-600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      <text x="270" y="746" className="fill-text-secondary text-[13px]" textAnchor="middle">
        Testa: låt någon gå runt bilen och se var hen försvinner.
      </text>
    </svg>
  );
}
