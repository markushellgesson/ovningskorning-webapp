/**
 * Spårvagn i blandtrafik (URB-01) — en spårvagn som går i körbanan körs om
 * till HÖGER, aldrig till vänster.
 *
 * Bilden lär ut EN sak: sidan man kör om på. Skälet den bygger på är att
 * spårvagnen inte kan väja åt sidan — den följer spåret — så till vänster
 * hamnar bilen antingen mot spåret från fel sida eller ute i mötande
 * trafikens utrymme, och spårvagnen kan inte flytta sig undan.
 *
 * ORDVAL: fri väg för spårvagn formuleras som en skyldighet ("du ska lämna
 * fri väg", "du håller till höger"), aldrig som att spårvagnen "har
 * företräde". Inga avstånd i meter eller sekunder anges. Bilden tar inte upp
 * hållplats, passagerare eller blött väglag — egna situationer.
 *
 * GEOMETRI (högertrafik, vy uppifrån). Dukens egna koordinater, 480 × 980.
 * Alla fordon kör längs en lodrät gata.
 *
 *   Gata: x 125–345, y 90–630. Mittlinjen (streckad vit) ligger på x = 235.
 *     Mötande halva (kör NEDÅT, ökande y):  x 125–235.
 *     Elevens halva (kör UPPÅT, minskande y): x 235–345.
 *
 *   Spårvagnsspåret ligger på elevens halva, strax till höger om mitten:
 *     rälerna på x = 246 och x = 270 (spårmitt x = 258). Spårvagnen är 40 px
 *     bred, kaross x 238–278, och står grensle över rälerna. Den kör UPPÅT.
 *     Kaross y 210–420 (mitt y = 315). Betydligt längre än en bil.
 *
 *   POÄNGEN, EFTERRÄKNAD — finns det plats till höger om spåret?
 *     Spårvagnens högra kant: x = 278. Gatans högra kant: x = 345. Kvar till
 *     höger: 67 px. En bil är 28 px bred; i omkörningsläget ligger elevens
 *     bil på mitt x = 318 (kaross 304–332). Mellanrum till spårvagnen:
 *     304 − 278 = 26 px; marginal till vägkanten: 345 − 332 = 13 px. Det
 *     RYMS till höger utan att korsa mittlinjen (x = 235). Att i stället köra
 *     om till vänster kräver x < 235 — över spåret och in i mötande halvan.
 *
 *   Fordonens körfältskontroll mot mittlinjen x = 235:
 *     Elevens bil (kör uppåt → förarens högra sida = bildens högra, hög x):
 *       start bakom spårvagnen  mitt x = 300 (286–314), cy = 520 — halva > 235 ✓
 *       omkörningsläge (planerat) mitt x = 318 (304–332), cy = 300 — > 235 ✓
 *     Spårvagn mitt x = 258 (238–278) — hela karossen > 235, elevens halva ✓
 *     Mötande bil (kör nedåt → förarens högra sida = bildens vänstra, låg x):
 *       mitt x = 180 (166–194), cy = 260 — halva < 235 ✓
 *     Inga två lägen av elevens bil överlappar: (y 498–542) mot (y 278–322).
 *     Elevens bil (286–314) och spårvagn (238–278) överlappar inte i x, och
 *     omkörningsläget (304–332) mot spårvagn (238–278) inte heller.
 *
 * RÄLSEN får inte förväxlas med en körfältslinje: den ritas som TVÅ tunna
 * linjer med tvärslipers (syllar) med jämna mellanrum, i grått — inte vit,
 * inte heldragen enkel linje. Formen (dubbel linje + syllar) bär betydelsen
 * "spår", inte färgen.
 *
 * MÖNSTER (varje betyder en enda sak i bilden):
 *   prickar          = elevens bil
 *   diagonala ränder = annat fordon (mötande bil)
 *   ljus kaross med fönsterband + står på räls = spårvagn (egen form)
 *   45° röd kraffering = konfliktyta (mötande utrymme man tar om man kör vänster)
 * Heldragen pil = rör sig nu. Streckad blå pil = elevens planerade omkörning.
 * Bock/kryss = rätt/fel val av sida. Färg bär ingen betydelse ensam.
 *
 * FÖRKLARINGSRUTAN jämför de två sidorna med samma gatuavsnitt två gånger:
 * till höger om spårvagnen (rätt, bock) och till vänster (fel, kryss, in i
 * mötande utrymme som spårvagnen inte kan väja undan från).
 */

type Heading = 'up' | 'right' | 'down' | 'left';
const HEADING_DEG: Record<Heading, number> = { up: 0, right: 90, down: 180, left: -90 };

interface CarProps {
  cx: number;
  cy: number;
  heading: Heading;
  fill: string;
  stroke: string;
  ghost?: boolean;
}

/** Bil ritad med fronten uppåt, sedan vriden. Kaross exakt (cx ± 14, cy ± 22). */
function Car({ cx, cy, heading, fill, stroke, ghost }: CarProps) {
  const hw = 14;
  const hl = 22;
  const glass = `fill-diagram-marking ${stroke}`;
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${HEADING_DEG[heading]})`}>
      {ghost && (
        <rect
          x={-hw - 4}
          y={-hl - 2}
          width={2 * hw + 8}
          height={2 * hl + 4}
          rx="5"
          className="fill-surface-base"
        />
      )}
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
        strokeWidth={ghost ? 2.5 : 2}
        strokeDasharray={ghost ? '7 5' : undefined}
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
    </g>
  );
}

/**
 * Spårvagn: lång ljus kaross med fönsterband, står grensle över rälerna.
 * Fronten uppåt. Kaross (cx ± hw, y0..y1). Egen form skiljer den från bilarna.
 */
function Tram({ cx, y0, y1 }: { cx: number; y0: number; y1: number }) {
  const hw = 20;
  const h = y1 - y0;
  return (
    <g>
      <rect
        x={cx - hw}
        y={y0}
        width={2 * hw}
        height={h}
        rx="8"
        className="fill-neutral-200 stroke-primary-600"
        strokeWidth="2.5"
      />
      {/* fönsterband på båda sidor */}
      <rect
        x={cx - hw + 4}
        y={y0 + 12}
        width="6"
        height={h - 40}
        rx="2"
        className="fill-diagram-marking stroke-primary-600"
        strokeWidth="1"
      />
      <rect
        x={cx + hw - 10}
        y={y0 + 12}
        width="6"
        height={h - 40}
        rx="2"
        className="fill-diagram-marking stroke-primary-600"
        strokeWidth="1"
      />
      {/* ledade sektioner */}
      <line
        x1={cx - hw}
        y1={y0 + h / 3}
        x2={cx + hw}
        y2={y0 + h / 3}
        className="stroke-primary-600"
        strokeWidth="1.5"
      />
      <line
        x1={cx - hw}
        y1={y0 + (2 * h) / 3}
        x2={cx + hw}
        y2={y0 + (2 * h) / 3}
        className="stroke-primary-600"
        strokeWidth="1.5"
      />
      {/* front (uppåt) */}
      <rect
        x={cx - hw + 5}
        y={y0 + 4}
        width={2 * hw - 10}
        height="7"
        rx="2"
        className="fill-diagram-marking stroke-primary-600"
        strokeWidth="1"
      />
    </g>
  );
}

/**
 * Räls: två tunna linjer med tvärslipers. Formen — dubbel linje + syllar —
 * gör att den läses som spår, inte som en körfältsmarkering.
 */
function Rail({ x0, x1, y0, y1 }: { x0: number; x1: number; y0: number; y1: number }) {
  const ties = [];
  for (let y = y0 + 8; y <= y1 - 8; y += 22) {
    ties.push(
      <line
        key={y}
        x1={x0 - 4}
        y1={y}
        x2={x1 + 4}
        y2={y}
        className="stroke-text-tertiary"
        strokeWidth="2"
      />,
    );
  }
  return (
    <g>
      {ties}
      <line x1={x0} y1={y0} x2={x0} y2={y1} className="stroke-text-tertiary" strokeWidth="2" />
      <line x1={x1} y1={y0} x2={x1} y2={y1} className="stroke-text-tertiary" strokeWidth="2" />
    </g>
  );
}

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

/**
 * Samma gata i halv skala. Origo i gatans mitt. Mittlinje lokal x = 0.
 * Spårmitt lokal x = 24 (räls 16 och 32), spårvagn kör uppåt. Elevens omkörning:
 *   höger  → lokal x = 60 (till höger om spåret, kvar på egen halva)
 *   vänster → lokal x = −30 (över mittlinjen, in i mötande halvan)
 */
function MiniGata({ x, y, sida }: { x: number; y: number; sida: 'hoger' | 'vanster' }) {
  const hoger = sida === 'hoger';
  return (
    <g transform={`translate(${x} ${y}) scale(0.55)`}>
      <rect x="-80" y="-150" width="160" height="300" className="fill-diagram-road" />
      <g className="stroke-diagram-edge" strokeWidth="3">
        <line x1="-80" y1="-150" x2="-80" y2="150" />
        <line x1="80" y1="-150" x2="80" y2="150" />
      </g>
      {/* mittlinje */}
      <line
        x1="0"
        y1="-150"
        x2="0"
        y2="150"
        className="stroke-diagram-marking"
        strokeWidth="3"
        strokeDasharray="12 10"
      />
      {/* konfliktyta i vänsterfallet: mötande halvan tas i anspråk */}
      {!hoger && <rect x="-80" y="-150" width="80" height="300" fill="url(#sv-hatch)" />}
      {/* räls med syllar */}
      <g className="stroke-text-tertiary" strokeWidth="3">
        <line x1="16" y1="-150" x2="16" y2="150" />
        <line x1="32" y1="-150" x2="32" y2="150" />
        <line x1="8" y1="-120" x2="40" y2="-120" />
        <line x1="8" y1="-80" x2="40" y2="-80" />
        <line x1="8" y1="-40" x2="40" y2="-40" />
        <line x1="8" y1="0" x2="40" y2="0" />
        <line x1="8" y1="40" x2="40" y2="40" />
        <line x1="8" y1="80" x2="40" y2="80" />
        <line x1="8" y1="120" x2="40" y2="120" />
      </g>
      {/* spårvagn */}
      <g>
        <rect
          x="0"
          y="-110"
          width="48"
          height="150"
          rx="10"
          className="fill-neutral-200 stroke-primary-600"
          strokeWidth="3"
        />
        <rect
          x="6"
          y="-96"
          width="8"
          height="118"
          rx="2"
          className="fill-diagram-marking stroke-primary-600"
          strokeWidth="1"
        />
        <rect
          x="34"
          y="-96"
          width="8"
          height="118"
          rx="2"
          className="fill-diagram-marking stroke-primary-600"
          strokeWidth="1"
        />
      </g>
      {/* spårvagnen följer spåret — pil rakt fram, kan inte väja */}
      <line
        x1="24"
        y1="-118"
        x2="24"
        y2="-150"
        className="stroke-primary-600"
        strokeWidth="4"
        markerEnd="url(#sv-arrow-move)"
      />
      {/* elevens bil */}
      <g transform={`translate(${hoger ? 60 : -30} 70)`}>
        <g className="fill-text-primary">
          <rect x="-17" y="-17" width="5" height="10" rx="1.5" />
          <rect x="12" y="-17" width="5" height="10" rx="1.5" />
          <rect x="-17" y="7" width="5" height="10" rx="1.5" />
          <rect x="12" y="7" width="5" height="10" rx="1.5" />
        </g>
        <rect
          x="-14"
          y="-22"
          width="28"
          height="44"
          rx="4"
          fill="url(#sv-dots)"
          className="stroke-attention-600"
          strokeWidth="2.5"
        />
        <rect
          x="-9"
          y="-15"
          width="18"
          height="8"
          rx="2"
          className="fill-diagram-marking stroke-attention-600"
          strokeWidth="1"
        />
      </g>
      {/* elevens väg upp förbi spårvagnen */}
      <path
        d={hoger ? 'M 60 48 L 60 -70' : 'M -30 48 L -30 -70'}
        className="stroke-attention-600"
        strokeWidth="4"
        strokeDasharray="10 8"
        markerEnd="url(#sv-arrow-plan)"
      />
      {hoger ? <Check x={0} y={200} /> : <Cross x={0} y={200} size={11} />}
    </g>
  );
}

export function SparvagnBlandtrafikDiagram() {
  return (
    <svg
      viewBox="0 0 480 980"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="sparvagn-title sparvagn-desc"
    >
      <title id="sparvagn-title">Köra om en spårvagn i blandtrafik</title>
      <desc id="sparvagn-desc">
        En gata sedd uppifrån där en spårvagn går i körbanan. Spåret ritas som två tunna grå linjer
        med tvärslipers och löper strax till höger om gatans mittlinje, så att det tydligt läses som
        ett spår och inte som en körfältslinje. Spårvagnen är en lång, ljus vagn med fönsterband som
        står grensle över spåret och kör uppåt i bilden med en heldragen pil. Din bil, fylld med
        prickmönster och blå kontur, kör uppåt bakom spårvagnen i samma halva av gatan, till höger
        om spåret. En streckad blå pil visar din planerade omkörning: du svänger ut åt höger, förbi
        spårvagnen på höger sida, och håller dig kvar på din egen halva utan att korsa mittlinjen.
        Ett blekt läge av din bil visar omkörningsläget i jämnhöjd med spårvagnen. I den vänstra
        halvan kör ett mötande fordon med randmönster nedåt i bilden. Tre numrerade hänvisningar: 1
        vid spårvagnen, den följer spåret och kan inte väja åt sidan; 2 vid omkörningsläget, du kör
        om till höger i utrymmet vid sidan av spåret; 3 vid det mötande fordonet, till vänster om
        spårvagnen skulle du hamna i mötande trafikens utrymme. Längst ned jämför en ruta de två
        sidorna: omkörning till höger, där spårvagnen blir kvar till vänster, markerad med en grön
        bock, och omkörning till vänster, där din bil tar sig över spåret in i mötande halvan som är
        röd­markerad och som spårvagnen inte kan väja undan från, markerad med ett rött kryss.
      </desc>

      <defs>
        <pattern id="sv-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="sv-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path
            d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4"
            className="stroke-primary-600"
            strokeWidth="2"
          />
        </pattern>
        <pattern id="sv-hatch" patternUnits="userSpaceOnUse" width="12" height="12">
          <rect width="12" height="12" className="fill-safety-200" />
          <path
            d="M-2,2 l4,-4 M0,12 l12,-12 M10,14 l4,-4"
            className="stroke-safety-600"
            strokeWidth="1.2"
            opacity="0.6"
          />
        </pattern>
        <marker
          id="sv-arrow-move"
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
          id="sv-arrow-plan"
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
        Köra om en spårvagn
      </text>
      <text x="20" y="52" className="fill-text-secondary text-[14px]">
        Spårvagn i körbanan — kör om till höger
      </text>

      {/* ---------- Gata ---------- */}
      <rect x="125" y="90" width="220" height="540" className="fill-diagram-road" />
      <g className="stroke-diagram-edge" strokeWidth="1.5">
        <line x1="125" y1="90" x2="125" y2="630" />
        <line x1="345" y1="90" x2="345" y2="630" />
      </g>
      {/* mittlinje x = 235 */}
      <line
        x1="235"
        y1="90"
        x2="235"
        y2="630"
        className="stroke-diagram-marking"
        strokeWidth="2"
        strokeDasharray="12 10"
      />

      {/* Spår: räls x 246 och 270 med syllar */}
      <Rail x0={246} x1={270} y0={90} y1={630} />

      {/* ---------- Teckenförklaring (fri vänstermarginal) ---------- */}
      <g>
        <path
          d="M 14 118 L 44 118"
          className="stroke-primary-600"
          strokeWidth="3"
          markerEnd="url(#sv-arrow-move)"
        />
        <text x="52" y="123" className="fill-text-secondary text-[14px]">
          Rör sig nu
        </text>
        <path
          d="M 14 142 L 44 142"
          className="stroke-attention-600"
          strokeWidth="3"
          strokeDasharray="7 5"
          markerEnd="url(#sv-arrow-plan)"
        />
        <text x="52" y="147" className="fill-text-secondary text-[14px]">
          Din omkörning
        </text>
        <g className="stroke-text-tertiary" strokeWidth="2">
          <line x1="20" y1="160" x2="20" y2="176" />
          <line x1="30" y1="160" x2="30" y2="176" />
          <line x1="16" y1="164" x2="34" y2="164" />
          <line x1="16" y1="172" x2="34" y2="172" />
        </g>
        <text x="52" y="171" className="fill-text-secondary text-[14px]">
          Spår (räls)
        </text>
      </g>

      {/* ---------- Spårvagn: kör uppåt, grensle över spåret ---------- */}
      <Tram cx={258} y0={210} y1={420} />
      <path
        d="M 258 205 L 258 150"
        className="stroke-primary-600"
        strokeWidth="3.5"
        markerEnd="url(#sv-arrow-move)"
      />

      {/* 1. Spårvagnen kan inte väja */}
      <Callout x={40} y={330} n={1} />
      <text x="14" y="360" className="fill-text-primary text-[15px] font-semibold">
        Spårvagnen följer
      </text>
      <text x="14" y="379" className="fill-text-secondary text-[14px]">
        spåret och kan inte
      </text>
      <text x="14" y="398" className="fill-text-secondary text-[14px]">
        väja åt sidan
      </text>
      <Pointer x1={66} y1={330} x2={238} y2={315} />

      {/* ---------- Mötande fordon: vänster halva, kör nedåt ---------- */}
      <Car cx={180} cy={260} heading="down" fill="url(#sv-stripes)" stroke="stroke-primary-600" />
      <path
        d="M 180 286 L 180 346"
        className="stroke-primary-600"
        strokeWidth="3"
        markerEnd="url(#sv-arrow-move)"
      />
      <Callout x={40} y={240} n={3} />
      <text x="14" y="210" className="fill-text-primary text-[15px] font-semibold">
        Mötande trafik
      </text>
      <text x="14" y="446" className="fill-text-secondary text-[14px]">
        Till vänster om
      </text>
      <text x="14" y="465" className="fill-text-secondary text-[14px]">
        spårvagnen hamnar
      </text>
      <text x="14" y="484" className="fill-text-secondary text-[14px]">
        du i deras utrymme
      </text>
      <Pointer x1={66} y1={244} x2={166} y2={260} />

      {/* ---------- Elevens omkörning till höger ---------- */}
      {/* planerad väg: ut åt höger, förbi spårvagnen, tillbaka */}
      <path
        d="M 300 500 C 320 450, 318 400, 318 322"
        className="fill-none stroke-attention-600"
        strokeWidth="4"
        strokeDasharray="12 9"
        markerEnd="url(#sv-arrow-plan)"
      />
      {/* omkörningsläge (blekt) i jämnhöjd med spårvagnen */}
      <Car
        cx={318}
        cy={300}
        heading="up"
        fill="url(#sv-dots)"
        stroke="stroke-attention-600"
        ghost
      />
      {/* elevens bil nu, bakom spårvagnen */}
      <Car cx={300} cy={520} heading="up" fill="url(#sv-dots)" stroke="stroke-attention-600" />

      <Callout x={430} y={300} n={2} />
      <text x="352" y="360" className="fill-text-primary text-[15px] font-semibold">
        Kör om till
      </text>
      <text x="352" y="379" className="fill-text-primary text-[15px] font-semibold">
        höger
      </text>
      <text x="352" y="400" className="fill-text-secondary text-[14px]">
        i utrymmet vid
      </text>
      <text x="352" y="419" className="fill-text-secondary text-[14px]">
        sidan av spåret
      </text>
      <Pointer x1={420} y1={306} x2={334} y2={300} />

      <text x="352" y="530" className="fill-text-secondary text-[14px]">
        Din bil
      </text>
      <Pointer x1={350} y1={525} x2={315} y2={520} />

      {/* ---------- Sammanfattning ---------- */}
      <text
        x="240"
        y="666"
        textAnchor="middle"
        className="fill-text-primary text-[15px] font-medium"
      >
        En spårvagn som går i körbanan kör du om till höger.
      </text>
      <text x="240" y="686" textAnchor="middle" className="fill-text-secondary text-[15px]">
        Vid möte håller du till höger, precis som mot annan trafik.
      </text>

      {/* ---------- Mönsterförklaring ---------- */}
      <g>
        <rect
          x="34"
          y="702"
          width="22"
          height="14"
          rx="2"
          fill="url(#sv-dots)"
          className="stroke-attention-600"
          strokeWidth="1.5"
        />
        <text x="64" y="714" className="fill-text-tertiary text-[14px]">
          Du (prickar)
        </text>
        <rect
          x="200"
          y="702"
          width="22"
          height="14"
          rx="2"
          fill="url(#sv-stripes)"
          className="stroke-primary-600"
          strokeWidth="1.5"
        />
        <text x="230" y="714" className="fill-text-tertiary text-[14px]">
          Annat fordon (ränder)
        </text>
      </g>

      {/* ---------- Förklaringsruta ---------- */}
      <rect
        x="20"
        y="732"
        width="440"
        height="228"
        rx="6"
        className="fill-none stroke-border-default"
        strokeWidth="1.5"
      />
      <text x="34" y="758" className="fill-text-primary text-[15px] font-semibold">
        Vilken sida du väljer:
      </text>
      <line
        x1="240"
        y1="768"
        x2="240"
        y2="948"
        className="stroke-border-default"
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />

      <MiniGata x={130} y={850} sida="hoger" />
      <text
        x="130"
        y="922"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-semibold"
      >
        Till höger
      </text>
      <text x="130" y="941" textAnchor="middle" className="fill-text-secondary text-[14px]">
        spårvagnen kvar till vänster
      </text>

      <MiniGata x={350} y={850} sida="vanster" />
      <text
        x="350"
        y="922"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-semibold"
      >
        Till vänster
      </text>
      <text x="350" y="941" textAnchor="middle" className="fill-text-secondary text-[14px]">
        in i mötande utrymme
      </text>
    </svg>
  );
}
