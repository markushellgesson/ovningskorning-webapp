/**
 * Vägarbete och anvisningar (SPEC-01) — en vakts tecken går före vägmärke,
 * markering och signal.
 *
 * Bilden lär ut EN sak: vid vägarbetet är det vaktens tecken som styr, och de
 * två tecknen betyder motsatt sak — V1 Stopp (utsträckt arm mot dig) = stanna,
 * V2 Kör fram (vinkande arm i färdriktningen) = du får köra. Poseringen hålls
 * schematisk med flit: en utsträckt respektive vinkande arm räcker och är
 * säkrare att läsa än ett naturalistiskt försök.
 *
 * ORDVAL: bilden säger aldrig att någon "har företräde"; det öppna körfältet
 * leder växelvis trafik och det är vaktens tecken som avgör vem som kör.
 * Inga mått till avspärrningen, inga sekunder, inga avstånd i siffror. Ingen
 * regel om hur nära vägarbetare man får köra. Ingen polismansanvisning och
 * ingen ljussignal — de är egna situationer och är medvetet utelämnade.
 *
 * GEOMETRI (högertrafik, vy uppifrån). Dukens egna koordinater, 480 × 1010.
 *
 *   Lodrät tvåfältsväg: x 190–290, mittlinjen ligger på x = 240.
 *     Eleven kör UPPÅT (minskande y). För den som kör uppåt är förarens högra
 *     sida bildens högra, alltså är elevens körfält east x 240–290 (mitt 265).
 *       elevens bil (väntar på tecken)  cx = 265, cy = 545 (front y = 523)
 *     Mötande kör NEDÅT (ökande y). Förarens högra sida är då bildens vänstra,
 *     alltså mötande körfält west x 190–240 (mitt 215).
 *       mötande bil (kör genom passagen) cx = 215, cy = 270 (front y = 292)
 *
 *   Vägarbetet stänger ELEVENS körfält (east x 240–290) på sträckan y 250–400,
 *     markerat med skraffering och koner. Det enda öppna körfältet i
 *     arbetszonen är då west (x 190–240) = den delade passagen. Eleven måste
 *     därför förskjutas åt vänster, över mittlinjen x = 240, för att passera —
 *     det är filförskjutningen den streckade planerade vägen visar.
 *
 *   POÄNGEN, EFTERRÄKNAD:
 *     Planerad väg går från elevens front (265,523) och slutar med pilspets vid
 *     (216,395): den korsar mittlinjen x = 240 (filförskjutning bekräftad) och
 *     mynnar i west-körfältet vid arbetets sydkant. Mötande bil har front
 *     y = 292; planerade vägens pilspets ligger 103 px söder om den — inget
 *     aktivt fordon överlappar det andra i huvudscenen. Eleven väntar (stilla,
 *     bromsljus) 123 px söder om arbetszonen och rör inte konerna. Vakten
 *     (252,415) står vid passagens södra mynning, vid mittlinjen, och styr.
 *
 * MÖNSTER (varje mönster betyder en enda sak i den här bilden):
 *   prickar       = elevens bil
 *   diagonala ränder = andra fordon (mötande)
 *   45° skraffering = avstängt vägarbetsområde
 *   figur med arm  = vägarbetsvakt
 * Heldragen pil = rör sig nu. Blå streckad pil = elevens planerade väg förbi
 * arbetet. Röd arm/bar + "Stopp" = tecken V1. Grön arm/chevron + "Kör fram" =
 * tecken V2. Bock/kryss = rätt/fel utfall. Färg bär ingen betydelse ensam:
 * varje roll har också mönster, form, pil eller etikett.
 *
 * FÖRKLARINGSRUTAN jämför samma passage: väntar på V2 (eleven stilla, mötande
 * kör igenom, fritt) mot kör på eget bevåg (eleven och mötande i samma smala
 * körfält samtidigt — nästan-kollision). Geometrin är densamma som huvudscenen
 * i halv skala: eleven i east-fältet, mötande i west-fältet.
 */

type Heading = 'up' | 'right' | 'down' | 'left';
const HEADING_DEG: Record<Heading, number> = { up: 0, right: 90, down: 180, left: -90 };

interface CarProps {
  cx: number;
  cy: number;
  heading: Heading;
  fill: string;
  stroke: string;
  brakeLights?: boolean;
  scale?: number;
}

/** Bil ritad med fronten uppåt och sedan vriden efter färdriktningen. */
function Car({ cx, cy, heading, fill, stroke, brakeLights, scale = 1 }: CarProps) {
  const hw = 14;
  const hl = 22;
  const glass = `fill-diagram-marking ${stroke}`;
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${HEADING_DEG[heading]}) scale(${scale})`}>
      <g className="fill-text-primary">
        <rect x={-hw - 3} y={-hl + 5} width="5" height="10" rx="1.5" />
        <rect x={hw - 2} y={-hl + 5} width="5" height="10" rx="1.5" />
        <rect x={-hw - 3} y={hl - 15} width="5" height="10" rx="1.5" />
        <rect x={hw - 2} y={hl - 15} width="5" height="10" rx="1.5" />
      </g>
      <rect
        x={-hw}
        y={-hl}
        width={2 * hw}
        height={2 * hl}
        rx="4"
        fill={fill}
        className={stroke}
        strokeWidth="2"
      />
      <rect
        x={-hw + 5}
        y={-hl + 7}
        width={2 * hw - 10}
        height="8"
        rx="2"
        className={glass}
        strokeWidth="1"
      />
      <rect
        x={-hw + 5}
        y={hl - 11}
        width={2 * hw - 10}
        height="5"
        rx="2"
        className={glass}
        strokeWidth="1"
      />
      {brakeLights && (
        <g className="fill-safety-600">
          <rect x={-hw + 2} y={hl - 1} width="6" height="3" />
          <rect x={hw - 8} y={hl - 1} width="6" height="3" />
        </g>
      )}
    </g>
  );
}

/**
 * Vägarbetsvakt — schematisk figur (huvud, bål, hi-viz-band) med EN tydlig arm.
 * sign="stop": rak, utsträckt arm med en tvärställd handflata, röd.
 * sign="go":   arm med chevron-rörelse i färdriktningen, grön.
 * armDeg pekar armen dit den ska: 0 = uppåt, 180 = nedåt, 90 = höger, -90 = vänster.
 */
function Vakt({
  x,
  y,
  sign,
  armDeg,
  scale = 1,
}: {
  x: number;
  y: number;
  sign: 'stop' | 'go';
  armDeg: number;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {/* bål */}
      <rect x={-6} y={-3} width="12" height="22" rx="5" className="fill-text-secondary" />
      {/* hi-viz-band (vitt) — så att figuren inte läses som ett fordon */}
      <rect x={-6} y={5} width="12" height="4" className="fill-diagram-marking" />
      {/* huvud */}
      <circle cx={0} cy={-10} r="6.5" className="fill-text-secondary" />
      {/* signalarm, pekar armDeg (pivot vid axeln 0,-1) */}
      <g transform={`rotate(${armDeg} 0 -1)`}>
        {sign === 'stop' ? (
          <g className="stroke-safety-600 fill-none" strokeWidth="4" strokeLinecap="round">
            {/* rak arm + tvärställd handflata = STOPP */}
            <line x1="0" y1="-1" x2="0" y2="-26" />
            <line x1="-8" y1="-26" x2="8" y2="-26" />
          </g>
        ) : (
          <g
            className="stroke-progress-600 fill-none"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* arm + två chevroner i rörelseriktningen = KÖR FRAM */}
            <line x1="0" y1="-1" x2="0" y2="-22" />
            <path d="M -7 -18 L 0 -26 L 7 -18" strokeWidth="3.5" />
            <path d="M -7 -24 L 0 -32 L 7 -24" strokeWidth="3.5" />
          </g>
        )}
      </g>
    </g>
  );
}

/** Numrerad hänvisning: mörk cirkel med siffra. */
function Callout({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="11" className="fill-text-primary" />
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        className="fill-surface-base text-[14px] font-semibold"
      >
        {n}
      </text>
    </g>
  );
}

/** Tunn pekarlinje från etikett till motiv, med punkt i målet. */
function Pointer({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
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

function Cross({ x, y, size = 8 }: { x: number; y: number; size?: number }) {
  return (
    <path
      d={`M ${x - size} ${y - size} L ${x + size} ${y + size} M ${x + size} ${y - size} L ${x - size} ${y + size}`}
      className="stroke-safety-600"
      strokeWidth="3"
      strokeLinecap="round"
    />
  );
}

/** Kon — liten triangel med vitt band. Form (triangel) bär betydelsen, inte bara färg. */
function Cone({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path
        d={`M ${x} ${y - 7} L ${x + 5} ${y + 5} L ${x - 5} ${y + 5} Z`}
        className="fill-safety-600"
      />
      <line
        x1={x - 3.2}
        y1={y}
        x2={x + 3.2}
        y2={y}
        className="stroke-diagram-marking"
        strokeWidth="1.6"
      />
    </g>
  );
}

/**
 * Samma passage i halv skala. Origo i mitten av arbetszonen. Lodrät väg
 * x −50…50, mittlinje x = 0. Elevens fält east (x 0–50, kör uppåt), mötande
 * fält west (x −50–0, kör nedåt). Arbetet stänger east y −70…0.
 */
function MiniPassage({ x, y, variant }: { x: number; y: number; variant: 'vantar' | 'kor-in' }) {
  const waits = variant === 'vantar';
  return (
    <g transform={`translate(${x} ${y}) scale(0.55)`}>
      <rect x="-50" y="-110" width="100" height="220" className="fill-diagram-road" />
      <g className="stroke-diagram-edge" strokeWidth="3">
        <line x1="-50" y1="-110" x2="-50" y2="110" />
        <line x1="50" y1="-110" x2="50" y2="110" />
      </g>
      <line
        x1="0"
        y1="-110"
        x2="0"
        y2="110"
        className="stroke-diagram-marking"
        strokeWidth="2"
        strokeDasharray="10 8"
      />

      {/* Avstängt east-fält (arbetszon) */}
      <rect x="0" y="-70" width="50" height="70" fill="url(#vg-hatch)" />
      <rect
        x="0"
        y="-70"
        width="50"
        height="70"
        className="fill-none stroke-safety-600"
        strokeWidth="2"
        strokeDasharray="7 5"
      />
      <Cone x={4} y={-58} />
      <Cone x={4} y={-30} />
      <Cone x={4} y={-4} />

      {/* Vakt vid passagens mynning — ger V1 Stopp mot eleven i båda fallen;
          skillnaden är elevens val, inte vaktens tecken. */}
      <Vakt x={16} y={16} sign="stop" armDeg={180} scale={0.85} />

      {/* Mötande i west-fältet, kör nedåt */}
      <Car cx={-25} cy={-40} heading="down" fill="url(#vg-stripes)" stroke="stroke-primary-600" />
      <path
        d="M -25 -14 L -25 26"
        className="stroke-primary-600"
        strokeWidth="4"
        markerEnd="url(#vg-arrow-move)"
      />

      {waits ? (
        <>
          {/* Eleven väntar söder om arbetet, i sitt eget fält */}
          <Car
            cx={25}
            cy={75}
            heading="up"
            fill="url(#vg-dots)"
            stroke="stroke-attention-600"
            brakeLights
          />
          <Check x={0} y={135} />
        </>
      ) : (
        <>
          {/* Eleven har kört in i west-fältet — möter trafiken i samma passage */}
          <Car cx={-25} cy={55} heading="up" fill="url(#vg-dots)" stroke="stroke-attention-600" />
          <path
            d="M -25 29 L -25 8"
            className="stroke-attention-600"
            strokeWidth="4"
            markerEnd="url(#vg-arrow-plan)"
          />
          {/* konfliktburst mellan de mötande i samma körfält */}
          <g className="stroke-safety-600" strokeWidth="3" strokeLinecap="round">
            <line x1="-25" y1="-3" x2="-25" y2="12" />
            <line x1="-33" y1="4" x2="-17" y2="4" />
            <line x1="-31" y1="-2" x2="-19" y2="10" />
            <line x1="-31" y1="10" x2="-19" y2="-2" />
          </g>
          <Cross x={0} y={135} />
        </>
      )}
    </g>
  );
}

export function VagarbeteVaktDiagram() {
  return (
    <svg
      viewBox="0 0 480 1010"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="vagarbete-title vagarbete-desc"
    >
      <title id="vagarbete-title">Vägarbete med vakt — vaktens tecken styr</title>
      <desc id="vagarbete-desc">
        Tvåfältsväg sedd uppifrån vid ett vägarbete. Din bil, fylld med prickmönster, kör uppåt i
        bilden i det högra körfältet och står stilla med tända bromsljus. Framför dig är det högra
        körfältet avstängt av ett vägarbete, markerat med sned skraffering och en rad koner
        (triangelform), så att bara det vänstra körfältet är öppet genom arbetet — en smal passage
        som delas växelvis. En blå streckad pil visar din planerade väg: du förskjuts åt vänster
        över mittlinjen, förbi arbetet, in i den delade passagen. Vid passagens mynning står en
        vägarbetsvakt, ritad som en enkel figur med huvud, bål och en tydlig arm. Vakten håller
        armen rakt utsträckt mot dig med en tvärställd handflata — tecken V1 Stopp, du ska stanna. I
        det vänstra körfältet kör ett fordon med randmönster nedåt genom passagen med en heldragen
        pil — det är den mötande trafikens tur. Uppe till vänster förklaras vaktens två tecken var
        för sig: V1 Stopp, en rak utsträckt arm med röd handflata, betyder stanna; V2 Kör fram, en
        arm med gröna chevroner i färdriktningen, betyder att du får köra. Tre numrerade
        hänvisningar: 1 vid vakten, vaktens tecken gäller före vägmärke, markering och signal; 2 vid
        det avstängda körfältet, du leds åt vänster förbi arbetet; 3 vid passagen, mötande trafik
        använder samma körfält växelvis. Under bilden står att vaktens tecken gäller, och att
        tecknet på plats går före hur vägen brukar se ut. En ruta längst ned visar samma passage två
        gånger: du väntar på V2 medan den mötande kör igenom och passagen blir fri, markerat med en
        bock; du kör in på eget bevåg och möter trafiken i den smala passagen, markerat med ett
        kryss och en konfliktmarkering.
      </desc>

      <defs>
        <pattern id="vg-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="vg-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path
            d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4"
            className="stroke-primary-600"
            strokeWidth="2"
          />
        </pattern>
        <pattern id="vg-hatch" patternUnits="userSpaceOnUse" width="14" height="14">
          <path
            d="M-2,2 l4,-4 M0,14 l14,-14 M12,16 l4,-4"
            className="stroke-safety-600"
            strokeWidth="1.2"
            opacity="0.5"
          />
        </pattern>
        <marker
          id="vg-arrow-move"
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
          id="vg-arrow-plan"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-attention-600" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="30" className="fill-text-primary text-[18px] font-semibold">
        Vägarbete — vakten styr trafiken
      </text>
      <text x="20" y="52" className="fill-text-secondary text-[14px]">
        Ett körfält avstängt, passagen delas växelvis
      </text>

      {/* ---------- Vägbana ---------- */}
      <rect x="190" y="90" width="100" height="540" className="fill-diagram-road" />
      <g className="stroke-diagram-edge" strokeWidth="1.5">
        <line x1="190" y1="90" x2="190" y2="630" />
        <line x1="290" y1="90" x2="290" y2="630" />
      </g>
      {/* Mittlinje x = 240 */}
      <line
        x1="240"
        y1="90"
        x2="240"
        y2="630"
        className="stroke-diagram-marking"
        strokeWidth="2"
        strokeDasharray="10 8"
      />

      {/* ---------- Avstängt körfält (east): skraffering + kontur + koner ---------- */}
      <rect x="240" y="250" width="50" height="150" fill="url(#vg-hatch)" />
      <rect
        x="240"
        y="250"
        width="50"
        height="150"
        className="fill-none stroke-safety-600"
        strokeWidth="2"
        strokeDasharray="8 6"
      />
      <Cone x={244} y={262} />
      <Cone x={244} y={292} />
      <Cone x={244} y={322} />
      <Cone x={244} y={352} />
      <Cone x={244} y={382} />
      {/* taper som leder in mot passagen */}
      <Cone x={262} y={410} />
      <Cone x={276} y={420} />

      {/* ---------- Teckenförklaring (linjespråk), höger marginal ---------- */}
      <g>
        <path
          d="M 300 108 L 330 108"
          className="stroke-primary-600"
          strokeWidth="3"
          markerEnd="url(#vg-arrow-move)"
        />
        <text x="338" y="113" className="fill-text-secondary text-[14px]">
          Rör sig nu
        </text>
        <path
          d="M 300 132 L 330 132"
          className="stroke-attention-600"
          strokeWidth="3"
          strokeDasharray="9 7"
          markerEnd="url(#vg-arrow-plan)"
        />
        <text x="338" y="137" className="fill-text-secondary text-[14px]">
          Din planerade väg
        </text>
      </g>

      {/* ---------- Vaktens två tecken (gestik-förklaring), vänster marginal ---------- */}
      <rect
        x="14"
        y="96"
        width="162"
        height="150"
        rx="6"
        className="fill-none stroke-border-default"
        strokeWidth="1.5"
      />
      <text x="24" y="118" className="fill-text-primary text-[15px] font-semibold">
        Vaktens två tecken
      </text>
      <Vakt x={44} y={158} sign="stop" armDeg={-90} scale={1} />
      <text x="74" y="150" className="fill-text-primary text-[14px] font-semibold">
        V1 Stopp
      </text>
      <text x="74" y="168" className="fill-text-secondary text-[14px]">
        stanna
      </text>
      <Vakt x={44} y={218} sign="go" armDeg={90} scale={1} />
      <text x="74" y="210" className="fill-text-primary text-[14px] font-semibold">
        V2 Kör fram
      </text>
      <text x="74" y="228" className="fill-text-secondary text-[14px]">
        du får köra
      </text>

      {/* ---------- 3. Mötande i den delade passagen (west-fält, kör nedåt) ---------- */}
      <Car cx={215} cy={270} heading="down" fill="url(#vg-stripes)" stroke="stroke-primary-600" />
      <path
        d="M 215 296 L 215 356"
        className="stroke-primary-600"
        strokeWidth="3"
        markerEnd="url(#vg-arrow-move)"
      />
      <Callout x={150} y={272} n={3} />
      <text x="14" y="300" className="fill-text-primary text-[15px] font-semibold">
        Delad passage
      </text>
      <text x="14" y="318" className="fill-text-secondary text-[14px]">
        mötande i samma
      </text>
      <text x="14" y="336" className="fill-text-secondary text-[14px]">
        körfält, växelvis
      </text>
      <Pointer x1={138} y1={278} x2={201} y2={270} />

      {/* ---------- 2. Avstängt körfält ---------- */}
      <Callout x={340} y={300} n={2} />
      <text x="356" y="290" className="fill-text-primary text-[15px] font-semibold">
        Avstängt
      </text>
      <text x="356" y="308" className="fill-text-secondary text-[14px]">
        körfält — du
      </text>
      <text x="356" y="326" className="fill-text-secondary text-[14px]">
        leds åt vänster
      </text>
      <Pointer x1={354} y1={296} x2={288} y2={300} />

      {/* ---------- Planerad väg: filförskjutning runt arbetet ---------- */}
      <path
        d="M 265 523 C 258 470, 224 448, 216 400 L 216 396"
        className="fill-none stroke-attention-600"
        strokeWidth="4"
        strokeDasharray="12 9"
        markerEnd="url(#vg-arrow-plan)"
      />

      {/* ---------- Vakten vid passagen: ger V1 Stopp mot eleven ---------- */}
      <Vakt x={252} y={415} sign="stop" armDeg={180} scale={1} />
      <Callout x={150} y={430} n={1} />
      <text x="14" y="452" className="fill-text-primary text-[15px] font-semibold">
        Vaktens tecken
      </text>
      <text x="14" y="470" className="fill-text-secondary text-[14px]">
        gäller före märke,
      </text>
      <text x="14" y="488" className="fill-text-secondary text-[14px]">
        markering och signal
      </text>
      <Pointer x1={138} y1={436} x2={245} y2={420} />

      {/* ---------- Elevens bil: väntar på tecken ---------- */}
      <Car
        cx={265}
        cy={545}
        heading="up"
        fill="url(#vg-dots)"
        stroke="stroke-attention-600"
        brakeLights
      />
      <text x="300" y="540" className="fill-text-primary text-[15px] font-semibold">
        Du väntar
      </text>
      <text x="300" y="558" className="fill-text-secondary text-[14px]">
        på V2 innan
      </text>
      <text x="300" y="576" className="fill-text-secondary text-[14px]">
        du kör fram
      </text>
      <Pointer x1={298} y1={548} x2={280} y2={545} />

      {/* ---------- Sammanfattning ---------- */}
      <text
        x="240"
        y="668"
        textAnchor="middle"
        className="fill-text-primary text-[15px] font-medium"
      >
        Vaktens tecken gäller — framför vägmärke, markering
      </text>
      <text x="240" y="688" textAnchor="middle" className="fill-text-secondary text-[15px]">
        och signal. Läs tecknet på plats, inte minnet av hur
      </text>
      <text x="240" y="708" textAnchor="middle" className="fill-text-secondary text-[15px]">
        vägen brukar se ut.
      </text>

      {/* ---------- Mönsterförklaring ---------- */}
      <g>
        <rect
          x="24"
          y="722"
          width="22"
          height="14"
          rx="2"
          fill="url(#vg-dots)"
          className="stroke-attention-600"
          strokeWidth="1.5"
        />
        <text x="54" y="734" className="fill-text-tertiary text-[14px]">
          Du (prickar)
        </text>
        <rect
          x="160"
          y="722"
          width="22"
          height="14"
          rx="2"
          fill="url(#vg-stripes)"
          className="stroke-primary-600"
          strokeWidth="1.5"
        />
        <text x="190" y="734" className="fill-text-tertiary text-[14px]">
          Andra fordon (ränder)
        </text>
        <rect
          x="350"
          y="722"
          width="22"
          height="14"
          rx="2"
          fill="url(#vg-hatch)"
          className="stroke-safety-600"
          strokeWidth="1.5"
        />
        <text x="380" y="734" className="fill-text-tertiary text-[14px]">
          Avstängt
        </text>
      </g>

      {/* ---------- Förklaringsruta ---------- */}
      <rect
        x="20"
        y="752"
        width="440"
        height="240"
        rx="6"
        className="fill-none stroke-border-default"
        strokeWidth="1.5"
      />
      <text x="34" y="778" className="fill-text-primary text-[15px] font-semibold">
        Om du läser tecknet fel:
      </text>
      <line
        x1="240"
        y1="788"
        x2="240"
        y2="978"
        className="stroke-border-default"
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />

      <MiniPassage x={130} y={848} variant="vantar" />
      <text
        x="130"
        y="940"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-semibold"
      >
        Väntar på V2
      </text>
      <text x="130" y="958" textAnchor="middle" className="fill-text-secondary text-[14px]">
        mötande kör igenom, fritt
      </text>

      <MiniPassage x={350} y={848} variant="kor-in" />
      <text
        x="350"
        y="940"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-semibold"
      >
        Kör på eget bevåg
      </text>
      <text x="350" y="958" textAnchor="middle" className="fill-text-secondary text-[14px]">
        möter trafik i passagen
      </text>
    </svg>
  );
}
