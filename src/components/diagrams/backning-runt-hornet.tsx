/**
 * Backning runt hörn (MAN-08) — bakhjulen går den tätare kurvan och skär
 * hörnet, medan framvagnen samtidigt sveper ut åt motsatt håll. Blicken
 * går bakåt över axeln.
 *
 * Skala 12 px = 1 m. Kaross 22 × 53 px, hjulbas 31 px, bakaxeln 11 px fram
 * om bakre kanten, nosen 42 px fram om bakaxeln. Bakaxelns radie vid fullt
 * rattutslag 55 px (4,6 m), vilket svarar mot styrvinkeln 29,4°.
 *
 * Geometri (högertrafik, vy uppifrån). Scenen ligger i en grupp med
 * translate(20 64); koordinaterna nedan är gruppens lokala.
 * - Huvudgatan går lodrätt, x 136–220, mittlinje x 178. Din bil har nosen
 *   uppåt (norrut). Kör man uppåt i bilden är den egna högra sidan bildens
 *   högra, så du ligger i det östra körfältet x 178–220: kaross x 182–204,
 *   y 80–133. Det västra körfältet x 136–178 är mötande.
 * - Sidogatan går ut åt öster från x 220, y 290–374, mittlinje y 332.
 *   Innerhörnet ligger i (220, 290).
 * - Du backar först rakt: bakaxeln från y 122 till y 262. Sedan fullt
 *   utslag; bakaxeln går radie 55 kring (248, 262) medan kursen vrids från
 *   norr till väster.
 * - Inre bakhjulet går 11 px innanför bakaxelns mitt, alltså radie 44 kring
 *   samma punkt. Hörnet ligger 39,60 px från centrum. Hjulbanan passerar
 *   därför 4,40 px (0,37 m) utanför hörnet — den skär tätt.
 * - Yttre främre hörnet ligger 42 px fram och 11 px ut från bakaxeln, på
 *   svängens ytterkant, alltså radie √(66² + 42²) = 78,23 kring samma
 *   centrum. Det når som längst väster x 169,77 vid kursen 122,5° — alltså
 *   8,23 px (0,69 m) förbi mittlinjen x 178, in i det mötande körfältet.
 *   Effekten är liten i bild men det är den sanna storleksordningen.
 * - Efter bågen backar bilen rakt österut och slutar med nosen åt väster,
 *   kaross x 252–305, y 306–328. Kör man åt väster är den egna högra sidan
 *   bildens övre, så sidogatans norra halva y 290–332 är rätt körfält.
 *
 * Mönster: prickar = din bil, diagonala ränder = mötande fordon,
 * skraffering = konfliktyta. Heldragen linje = bakhjulets väg, streckad =
 * framvagnens svep, prickad = blicken. Förklaringsrutan använder samma
 * lokala koordinater i skala 0,75: det mötande fordonet kör nedåt i bilden
 * och ligger därför i det västra körfältet x 136–178 — samma körfält som
 * framvagnens svep tränger in i.
 */

/** Bil ritad med fronten uppåt och sedan vriden. Kaross 22 × 53, hjulen sticker ut 3 px. */
function Bil({
  cx,
  cy,
  rot,
  fill,
  stroke,
  nose,
}: {
  cx: number;
  cy: number;
  rot: number;
  fill: string;
  stroke: string;
  nose: string;
}) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rot})`}>
      <g className="fill-text-primary">
        <rect x="-14" y="-20" width="4" height="9" rx="1" />
        <rect x="10" y="-20" width="4" height="9" rx="1" />
        <rect x="-14" y="11" width="4" height="9" rx="1" />
        <rect x="10" y="11" width="4" height="9" rx="1" />
      </g>
      <rect x="-11" y="-26.5" width="22" height="53" rx="3" className="fill-surface-base" />
      <rect x="-11" y="-26.5" width="22" height="53" rx="3" fill={fill} className={stroke} strokeWidth="2" />
      <polygon points="-7,-17 0,-24 7,-17" className={nose} />
    </g>
  );
}

/** Numrerad hänvisning: mörk cirkel med siffra. */
function Callout({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="11" className="fill-text-primary" />
      <text x={x} y={y + 5} textAnchor="middle" className="fill-surface-base text-[13px] font-semibold">
        {n}
      </text>
    </g>
  );
}

/** Tunn pekarlinje som slutar i en punkt på det den syftar på. */
function Pekare({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-text-tertiary" strokeWidth="1.5" />
      <circle cx={x2} cy={y2} r="3" className="fill-text-tertiary" />
    </g>
  );
}

function Check({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M ${x - 9} ${y} l 6 6 l 12 -13`}
      className="fill-none stroke-progress-600"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

function Cross({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M ${x - 7} ${y - 7} L ${x + 7} ${y + 7} M ${x + 7} ${y - 7} L ${x - 7} ${y + 7}`}
      className="stroke-safety-600"
      strokeWidth="3"
      strokeLinecap="round"
    />
  );
}

/**
 * Samma hörn i skala 0,75 för förklaringsrutan, i huvudbildens lokala
 * koordinater (utsnitt x 130–262, y 195–350). Din bil står i svepets
 * ytterläge, kurs 122,5°. Det mötande fordonet kör nedåt i bilden och
 * ligger därför i västra körfältet x 136–178.
 */
function MiniHorn({ x, y, motande }: { x: number; y: number; motande: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(0.75) translate(-130 -195)`}>
      <rect x="136" y="195" width="84" height="155" className="fill-diagram-road" />
      <rect x="220" y="290" width="42" height="60" className="fill-diagram-road" />
      <g className="stroke-diagram-edge" strokeWidth="2">
        <line x1="136" y1="195" x2="136" y2="350" />
        <line x1="220" y1="195" x2="220" y2="290" />
        <line x1="220" y1="290" x2="262" y2="290" />
      </g>
      <line
        x1="178"
        y1="195"
        x2="178"
        y2="350"
        className="stroke-diagram-marking"
        strokeWidth="2.5"
        strokeDasharray="10 8"
      />
      {/* Framvagnens svep över mittlinjen */}
      <path
        d="M 178 227.1 A 78.23 78.23 0 0 0 178 296.9 Z"
        fill={motande ? 'url(#bh-hatch)' : 'none'}
        className="stroke-safety-600"
        strokeWidth="2"
        strokeDasharray="6 4"
      />
      {motande && (
        <g>
          <Bil cx={157} cy={228} rot={180} fill="url(#bh-stripes)" stroke="stroke-primary-600" nose="fill-primary-600" />
          <path
            d="M 157 257 L 157 286"
            className="stroke-primary-600"
            strokeWidth="4"
            markerEnd="url(#bh-arrow-other)"
          />
        </g>
      )}
      <Bil cx={193.3} cy={278.5} rot={-32.5} fill="url(#bh-dots)" stroke="stroke-attention-600" nose="fill-attention-600" />
    </g>
  );
}

export function BackningRuntHornetDiagram() {
  return (
    <svg
      viewBox="0 0 440 946"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="bh-title bh-desc"
    >
      <title id="bh-title">Backning runt hörn: bakhjulen skär hörnet, framvagnen sveper ut</title>
      <desc id="bh-desc">
        Vy uppifrån av en lodrät gata med en sidogata som går ut åt höger. Din bil, fylld med
        prickmönster och med en fylld nosspets, står med nosen uppåt i det högra körfältet och
        backar nedåt i bilden och sedan runt hörnet in i sidogatan, där den slutar med nosen åt
        vänster i sidogatans övre halva. Bilen visas i tre lägen som inte överlappar varandra:
        start, mitt i svängen och slut. En heldragen linje visar det inre bakhjulets väg: den går
        tätt intill hörnet i en snäv kurva, markering 1. En streckad linje visar det yttre främre
        hörnets svep: en betydligt vidare kurva åt motsatt håll, som går en bit över gatans
        mittlinje in i det mötande körfältet. Det övertrampet är markerat 2 och som en liten
        skrafferad yta med konturlinje. En prickad linje från förarplatsen pekar bakåt över axeln
        in i sidogatan, markering 3: speglarna täcker inte det här. En teckenförklaring skiljer
        på heldragen linje, bakhjulets väg, streckad linje, framvagnens svep, och prickad linje,
        blicken. Under bilden står regeln: du får backa endast om det kan ske utan fara eller
        hinder för andra vägtrafikanter, och skyldigheten ligger på dig som backar. Längst ned en
        ruta med två små bilder av samma hörn: till vänster är körbanan bakom och bredvid fri och
        svepet får plats, markerat med en bock; till höger kommer ett randigt fordon emot i det
        körfält som svepet går in i, ytan är skrafferad, och backningen får då inte göras,
        markerat med ett kryss.
      </desc>

      <defs>
        <pattern id="bh-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="bh-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="2" />
        </pattern>
        <pattern id="bh-hatch" patternUnits="userSpaceOnUse" width="7" height="7">
          <path d="M-1,1 l2,-2 M0,7 l7,-7 M6,8 l2,-2" className="stroke-safety-600" strokeWidth="1.6" />
        </pattern>
        <marker id="bh-arrow-rear" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-attention-600" />
        </marker>
        <marker id="bh-arrow-front" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-safety-600" />
        </marker>
        <marker id="bh-arrow-look" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-text-tertiary" />
        </marker>
        <marker id="bh-arrow-other" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary-600" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Backning runt hörn
      </text>
      <text x="20" y="48" className="fill-text-secondary text-[13px]">
        Bakhjulen skär hörnet, framvagnen sveper ut
      </text>

      <g transform="translate(20 64)">
        {/* Vägbanor */}
        <rect x="136" y="40" width="84" height="380" className="fill-diagram-road" />
        <rect x="220" y="290" width="180" height="84" className="fill-diagram-road" />

        {/* Vägkanter */}
        <g className="stroke-diagram-edge" strokeWidth="2">
          <line x1="136" y1="40" x2="136" y2="420" />
          <line x1="220" y1="40" x2="220" y2="290" />
          <line x1="220" y1="374" x2="220" y2="420" />
          <line x1="220" y1="290" x2="400" y2="290" />
          <line x1="220" y1="374" x2="400" y2="374" />
        </g>

        {/* Mittlinjer */}
        <g className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="10 8">
          <line x1="178" y1="40" x2="178" y2="420" />
          <line x1="236" y1="332" x2="400" y2="332" />
        </g>

        {/* Teckenförklaring i den fria ytan ovanför sidogatan */}
        <g>
          <line x1="238" y1="96" x2="266" y2="96" className="stroke-attention-600" strokeWidth="3" />
          <text x="274" y="101" className="fill-text-secondary text-[13px]">
            Bakhjulets väg
          </text>
          <line
            x1="238"
            y1="118"
            x2="266"
            y2="118"
            className="stroke-safety-600"
            strokeWidth="3"
            strokeDasharray="7 5"
          />
          <text x="274" y="123" className="fill-text-secondary text-[13px]">
            Framvagnens svep
          </text>
          <line
            x1="238"
            y1="140"
            x2="266"
            y2="140"
            className="stroke-text-tertiary"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="0.5 6"
          />
          <text x="274" y="145" className="fill-text-secondary text-[13px]">
            Blicken
          </text>
        </g>

        {/* Konfliktytan: den del av svepet som ligger väster om mittlinjen */}
        <path
          d="M 178 227.1 A 78.23 78.23 0 0 0 178 296.9 Z"
          fill="url(#bh-hatch)"
          className="stroke-safety-600"
          strokeWidth="1.5"
        />

        {/* Inre bakhjulets väg: rakt ned, snäv kurva radie 44, rakt österut */}
        <path
          d="M 204 122 L 204 262 A 44 44 0 0 0 248 306"
          className="fill-none stroke-attention-600"
          strokeWidth="3"
          markerEnd="url(#bh-arrow-rear)"
        />

        {/* Yttre främre hörnets svep: rakt ned, vid kurva radie 78,23, rakt österut */}
        <path
          d="M 182 80 L 182 220 A 78.23 78.23 0 0 0 206 328"
          className="fill-none stroke-safety-600"
          strokeWidth="2.5"
          strokeDasharray="7 5"
          markerEnd="url(#bh-arrow-front)"
        />

        {/* Bilen i tre lägen: start, svepets ytterläge, slut */}
        <Bil cx={193} cy={106.5} rot={0} fill="url(#bh-dots)" stroke="stroke-attention-600" nose="fill-attention-600" />
        <Bil cx={193.3} cy={278.5} rot={-32.5} fill="url(#bh-dots)" stroke="stroke-attention-600" nose="fill-attention-600" />
        <Bil cx={278.5} cy={317} rot={-90} fill="url(#bh-dots)" stroke="stroke-attention-600" nose="fill-attention-600" />

        {/* Blicken bakåt över axeln, dit bilen ska */}
        <circle cx="180.4" cy="273.1" r="3.5" className="fill-text-tertiary" />
        <line
          x1="180.4"
          y1="273.1"
          x2="245"
          y2="330"
          className="stroke-text-tertiary"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="0.5 6"
          markerEnd="url(#bh-arrow-look)"
        />

        {/* Slutläget i sidogatan */}
        <text x="308" y="256" className="fill-text-primary text-[13px] font-semibold">
          Slut
        </text>
        <text x="308" y="274" className="fill-text-secondary text-[13px]">
          höger körfält
        </text>
        <Pekare x1={322} y1={282} x2={292} y2={306} />

        {/* Hörnet */}
        <circle cx="220" cy="290" r="4" className="fill-text-primary" />
        <text x="228" y="284" className="fill-text-primary text-[13px] font-medium">
          Hörnet
        </text>

        {/* Startläget */}
        <text x="126" y="86" textAnchor="end" className="fill-text-primary text-[13px] font-semibold">
          Start
        </text>
        <text x="126" y="104" textAnchor="end" className="fill-text-secondary text-[13px]">
          i höger körfält.
        </text>
        <text x="126" y="122" textAnchor="end" className="fill-text-secondary text-[13px]">
          Backa rakt först
        </text>
        <Pekare x1={130} y1={116} x2={182} y2={110} />

        {/* 1. Bakhjulen skär hörnet */}
        <Callout x={244} y={218} n={1} />
        <text x="260" y="223" className="fill-text-primary text-[13px] font-semibold">
          Bakhjulen går tätt
        </text>
        <text x="234" y="241" className="fill-text-secondary text-[13px]">
          intill hörnet
        </text>
        <Pekare x1={268} y1={250} x2={219} y2={283} />

        {/* 2. Framvagnen sveper ut över mittlinjen */}
        <Callout x={22} y={228} n={2} />
        <text x="38" y="233" className="fill-text-primary text-[13px] font-semibold">
          Framvagnen
        </text>
        <text x="8" y="251" className="fill-text-secondary text-[13px]">
          sveper ut åt
        </text>
        <text x="8" y="269" className="fill-text-secondary text-[13px]">
          motsatt håll —
        </text>
        <text x="8" y="287" className="fill-text-secondary text-[13px]">
          över mittlinjen.
        </text>
        <text x="8" y="305" className="fill-text-secondary text-[13px]">
          Det överraskar
        </text>
        <Pekare x1={112} y1={282} x2={171} y2={262} />

        {/* 3. Blicken bakåt över axeln */}
        <Callout x={246} y={398} n={3} />
        <text x="262" y="403" className="fill-text-primary text-[13px] font-semibold">
          Blicken över axeln
        </text>
        <text x="236" y="421" className="fill-text-secondary text-[13px]">
          speglarna räcker inte
        </text>
        <Pekare x1={252} y1={386} x2={213} y2={303} />
      </g>

      {/* Regeltext */}
      <text x="220" y="524" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        Du får backa endast om det kan ske utan fara
      </text>
      <text x="220" y="544" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        eller hinder för andra vägtrafikanter.
      </text>
      <text x="220" y="568" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Skyldigheten ligger på dig som backar,
      </text>
      <text x="220" y="586" textAnchor="middle" className="fill-text-secondary text-[13px]">
        inte på dem som kommer.
      </text>
      <text x="220" y="610" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Krypfart. Tappar du överblicken:
      </text>
      <text x="220" y="628" textAnchor="middle" className="fill-text-secondary text-[13px]">
        stanna helt och titta om.
      </text>

      {/* Mönsterförklaring */}
      <g>
        <rect
          x="78"
          y="652"
          width="22"
          height="14"
          rx="2"
          fill="url(#bh-dots)"
          className="stroke-attention-600"
          strokeWidth="1.5"
        />
        <text x="108" y="664" className="fill-text-tertiary text-[13px]">
          Du (prickar)
        </text>
        <rect
          x="204"
          y="652"
          width="22"
          height="14"
          rx="2"
          fill="url(#bh-stripes)"
          className="stroke-primary-600"
          strokeWidth="1.5"
        />
        <text x="234" y="664" className="fill-text-tertiary text-[13px]">
          Mötande fordon
        </text>
      </g>

      {/* Förklaringsruta: svepet mot mötande körfält */}
      <rect x="20" y="684" width="400" height="242" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="34" y="708" className="fill-text-primary text-[13px] font-semibold">
        Framvagnen sveper in i det mötande körfältet:
      </text>
      <line x1="220" y1="722" x2="220" y2="918" className="stroke-border-default" strokeWidth="1.5" strokeDasharray="6 4" />

      <MiniHorn x={80} y={724} motande={false} />
      <text x="129" y="870" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Körbanan är fri
      </text>
      <text x="129" y="886" textAnchor="middle" className="fill-text-secondary text-[13px]">
        svepet får plats
      </text>
      <Check x={129} y={906} />

      <MiniHorn x={270} y={724} motande />
      <text x="319" y="870" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Ett fordon kommer emot
      </text>
      <text x="319" y="886" className="fill-text-secondary text-[13px]" textAnchor="middle">
        då får du inte backa
      </text>
      <Cross x={319} y={906} />
    </svg>
  );
}
