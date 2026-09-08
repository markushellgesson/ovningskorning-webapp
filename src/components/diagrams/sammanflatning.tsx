/**
 * Körfältsbortfall och sammanflätning (LANE-04) — två körfält blir ett under
 * ömsesidigt hänsynstagande.
 *
 * Bilden lär ut EN sak: när ett körfält tar slut flätas trafiken samman genom
 * att båda parter anpassar sig samtidigt — den som ska in söker en lucka och
 * glider in mjukt, den som ligger kvar lättar på farten och lämnar plats.
 *
 * ABSOLUT CENTRALT: bilden får inte innehålla NÅGOT tecken på turordning. Inga
 * nummer på bilarna, inget alternerande mönster, ingen rad av fordon som
 * växelvis släpper in. De numrerade hänvisningarna pekar på HANDLINGAR och
 * ZONER, aldrig på "vilken bil som går först". Regeln (TrF 3 kap 44 §) kräver
 * ömsesidigt hänsynstagande, inte "varannan bil" — och det får inte synas som
 * en ordning. De två handlingarna visas som en enda samtidig scen.
 *
 * ORDVAL: ingen väjningsplikt gäller här och ingen "har företräde". Båda sidors
 * ansvar formuleras som en ömsesidig anpassningsskyldighet. Inga mått, inga
 * sekunder, inga hastigheter i siffror.
 *
 * GEOMETRI (högertrafik, vy uppifrån). Dukens egna koordinater, 480 × 980.
 * Båda körfälten går ÅT SAMMA HÅLL, UPPÅT i bilden (minskande y). Det finns
 * alltså ingen mötande trafik och ingen mittlinje mellan motriktade fält —
 * linjen mellan de två fälten är en streckad körfältslinje som får korsas.
 *
 *   Två körfält nedtill: x 168–312, y 400–590.
 *     Vänster (försvinnande) körfält: x 168–240, mitt x = 204.
 *     Höger (genomgående) körfält:    x 240–312, mitt x = 276.
 *     Körfältslinjen (streckad vit) ligger på x = 240.
 *   Avsmalning (taper): y 300–400, vänsterkanten går från (240,300) till
 *     (168,400). Ovanför y = 300 återstår ETT körfält: höger, x 240–312, y 90–300.
 *   Avstängd kil (vänster körfält tar slut): triangeln (168,400)(240,400)
 *     (240,300), skrafferad, med en röd avspärrningsbalk längs y = 400, x 168–240.
 *
 *   FORDONEN (alla kör uppåt, kaross cx±14 × cy±22):
 *     Elevens bil (blå, prickar) i VÄNSTER, försvinnande fält:
 *       cx = 204, cy = 500  (kaross x 190–218, y 478–522). Ligger mitt i sitt
 *       fält (fältmitt x = 204) — kontroll: 190 ≥ 168 och 218 ≤ 240, OK.
 *       Håller farten fram (fartstreck) och glider in mjukt via en streckad
 *       planerad väg upp-höger in i luckan i det genomgående fältet.
 *     Genomgående fordon (grått, ränder) i HÖGER fält:
 *       cx = 276, cy = 530  (kaross x 262–290, y 508–552). Fältmitt x = 276 —
 *       kontroll: 262 ≥ 240 och 290 ≤ 312, OK. Har lättat på farten (inga
 *       fartstreck) och lämnat en öppen lucka OVANFÖR sig (höger fält y 400–508).
 *     Fordon längre fram i det enda kvarvarande fältet (grått, ränder):
 *       cx = 276, cy = 180  (kaross x 262–290, y 158–202). Fältmitt x = 276, OK.
 *
 *   LUCKAN, EFTERRÄKNAD: det genomgående fältet är öppet från sammanflätnings-
 *     punkten (y ≈ 400) ned till det genomgående fordonets front (y = 508) —
 *     108 px, medan en bil är 44 px lång. Det finns alltså gott om plats för
 *     elevens bil att glida in i, och det är just poängen: en lucka söks och
 *     nyttjas, ingen turordning väntas ut. Elevens planerade väg slutar vid
 *     (276, 420), ovanför det genomgående fordonet (508) — de överlappar inte.
 *     Kaross-avstånd elev↔genomgående: x 218 vs 262 (44 px isär) — ingen krock.
 *
 * MÖNSTER (varje mönster betyder EN enda sak i bilden):
 *   prickar          = elevens bil
 *   diagonala ränder = andra fordon
 *   45° kraffering   = avstängd yta, det körfält som tar slut
 * Heldragen pil = rör sig nu. Streckad blå pil = elevens planerade väg in i
 * luckan. Tre korta streck = håller farten. Röd balk = avspärrning. Bock/kryss
 * = rätt/fel utfall i förklaringsrutan. Färg bär ingen betydelse ensam: varje
 * roll har också mönster, streckning, symbol eller etikett.
 *
 * FÖRKLARINGSRUTAN jämför det GENOMGÅENDE fordonets körsätt och följden för
 * inkörningen — inte vems tur det är:
 *   Rätt: fordonet lättar på farten, luckan står öppen, eleven glider in mjukt.
 *   Fel:  fordonet lägger sig tätt bakom bilen framför och stänger luckan —
 *         inkörningen tvingas bli en tvär inbromsning / ett stopp.
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
}

/** Bil ritad med fronten uppåt, sedan vriden efter färdriktning. Kaross cx±14 × cy±22. */
function Car({ cx, cy, heading, fill, stroke, brakeLights }: CarProps) {
  const hw = 14;
  const hl = 22;
  const glass = `fill-diagram-marking ${stroke}`;
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${HEADING_DEG[heading]})`}>
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

/** Numrerad hänvisning: mörk cirkel med siffra. Pekar på en handling/zon, aldrig en turordning. */
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

/** Tunn pekarlinje med punkt i målet. */
function Pointer({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-text-tertiary" strokeWidth="1.5" />
      <circle cx={x2} cy={y2} r="3" className="fill-text-tertiary" />
    </g>
  );
}

/** Tre korta streck framför ett fordon som kör uppåt — håller farten. */
function SpeedLines({ cx, y }: { cx: number; y: number }) {
  return (
    <g className="stroke-primary-600" strokeWidth="2.5" strokeLinecap="round">
      <line x1={cx - 9} y1={y} x2={cx + 9} y2={y} />
      <line x1={cx - 6} y1={y - 7} x2={cx + 6} y2={y - 7} />
      <line x1={cx - 4} y1={y - 14} x2={cx + 4} y2={y - 14} />
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

function Cross({ x, y, size = 7 }: { x: number; y: number; size?: number }) {
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
 * Samma sammanflätning i halv skala. Origo i sammanflätningspunkten.
 * Höger (genomgående) fält lokal x −10…50 (mitt 20). Vänster (försvinnande)
 * fält lokal x −70…−10 (mitt −40). Ett kvarvarande fält uppåt: höger.
 * variant 'ratt' : genomgående fordon lättar, luckan öppen, eleven glider in.
 * variant 'fel'  : genomgående fordon tätt bakom bilen framför, luckan stängd,
 *                  eleven tvingas till tvärstopp.
 */
function MiniMerge({ x, y, variant }: { x: number; y: number; variant: 'ratt' | 'fel' }) {
  const ratt = variant === 'ratt';
  return (
    <g transform={`translate(${x} ${y}) scale(0.5)`}>
      {/* Vägbana: ett fält upptill, två fält nedtill */}
      <rect x="-10" y="-150" width="60" height="110" className="fill-diagram-road" />
      <rect x="-70" y="20" width="120" height="130" className="fill-diagram-road" />
      <polygon points="-70,20 -10,20 -10,-40 50,-40 50,150 -70,150" className="fill-diagram-road" />
      {/* Kanter */}
      <g className="stroke-diagram-edge" strokeWidth="2.5" fill="none">
        <line x1="50" y1="-150" x2="50" y2="150" />
        <line x1="-10" y1="-150" x2="-10" y2="-40" />
        <path d="M -10 -40 L -70 20 L -70 150" />
      </g>
      {/* Körfältslinje mellan de två fälten (streckad, får korsas) */}
      <line
        x1="-10"
        y1="150"
        x2="-10"
        y2="20"
        className="stroke-diagram-marking"
        strokeWidth="2.5"
        strokeDasharray="10 8"
      />
      {/* Avstängd kil + avspärrning */}
      <polygon points="-70,20 -10,20 -10,-40" fill="url(#sf-hatch)" />
      <line x1="-70" y1="20" x2="-10" y2="20" className="stroke-safety-600" strokeWidth="4" />

      {ratt ? (
        <>
          {/* Genomgående fordon: håller sig kvar, lämnar öppen lucka ovanför */}
          <Car cx={20} cy={110} heading="up" fill="url(#sf-stripes)" stroke="stroke-primary-600" />
          {/* Eleven glider in mjukt i luckan */}
          <Car cx={-40} cy={80} heading="up" fill="url(#sf-dots)" stroke="stroke-attention-600" />
          <path
            d="M -40 58 Q -30 30 18 24"
            className="fill-none stroke-attention-600"
            strokeWidth="4"
            strokeDasharray="8 6"
            markerEnd="url(#sf-arrow-plan)"
          />
        </>
      ) : (
        <>
          {/* Bil framför i det kvarvarande fältet */}
          <Car
            cx={20}
            cy={20}
            heading="up"
            fill="url(#sf-stripes)"
            stroke="stroke-primary-600"
            brakeLights
          />
          {/* Genomgående fordon tätt bakom — stänger luckan */}
          <Car
            cx={20}
            cy={90}
            heading="up"
            fill="url(#sf-stripes)"
            stroke="stroke-primary-600"
            brakeLights
          />
          {/* Eleven blir stående — tvärstopp, ingen väg in */}
          <Car
            cx={-40}
            cy={100}
            heading="up"
            fill="url(#sf-dots)"
            stroke="stroke-safety-600"
            brakeLights
          />
          <line
            x1="-58"
            y1="70"
            x2="-22"
            y2="70"
            className="stroke-safety-600"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </>
      )}
    </g>
  );
}

export function SammanflatningDiagram() {
  return (
    <svg
      viewBox="0 0 480 980"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="sammanflatning-title sammanflatning-desc"
    >
      <title id="sammanflatning-title">Körfältsbortfall och sammanflätning</title>
      <desc id="sammanflatning-desc">
        En väg med två körfält åt samma håll sedd uppifrån, båda körfälten går uppåt i bilden och
        smalnar av till ett enda körfält längre fram, som vid ett vägarbete. Det vänstra körfältet
        tar slut: en skrafferad kil och en röd avspärrningsbalk visar var det stängs av. Din bil,
        fylld med prickmönster, kör uppåt i det vänstra, försvinnande körfältet och håller farten
        fram, visat med tre korta fartstreck framför bilen. En streckad blå pil visar din planerade
        väg: du söker en lucka och glider in mjukt upp åt höger in i det genomgående körfältet. I
        det genomgående högra körfältet kör ett annat fordon med randmönster; det har lättat på
        farten och saknar därför fartstreck, och lämnar en öppen lucka ovanför sig som är tydligt
        längre än en bil. Längre fram, i det enda kvarvarande körfältet, fortsätter ett fordon med
        randmönster uppåt. Ingenting i bilden visar en turordning: de två handlingarna sker
        samtidigt. Tre numrerade hänvisningar pekar på handlingar och zoner: 1 vid avspärrningen,
        det vänstra körfältet tar slut; 2 vid din bil, håll farten fram, sök en lucka och glid in
        mjukt; 3 vid det genomgående fordonet, lätta på farten och lämna plats, redan innan bilen är
        i din lucka. Under bilden står att två körfält blir ett under ömsesidigt hänsynstagande,
        utan turordning. En ruta längst ned jämför det genomgående fordonets körsätt: till vänster
        lättar det på farten så att luckan står öppen och du glider in mjukt, markerat med en grön
        bock; till höger lägger det sig tätt bakom bilen framför och stänger luckan så att din
        inkörning tvingas bli ett tvärstopp, markerat med ett rött kryss.
      </desc>

      <defs>
        <pattern id="sf-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="sf-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path
            d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4"
            className="stroke-primary-600"
            strokeWidth="2"
          />
        </pattern>
        <pattern id="sf-hatch" patternUnits="userSpaceOnUse" width="14" height="14">
          <path
            d="M-2,2 l4,-4 M0,14 l14,-14 M12,16 l4,-4"
            className="stroke-safety-600"
            strokeWidth="1.2"
            opacity="0.5"
          />
        </pattern>
        <marker
          id="sf-arrow"
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
          id="sf-arrow-plan"
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
        Körfältsbortfall och sammanflätning
      </text>
      <text x="20" y="52" className="fill-text-secondary text-[14px]">
        Två körfält blir ett — ömsesidigt hänsynstagande
      </text>

      {/* ---------- Vägbana ---------- */}
      {/* Ett kvarvarande fält upptill (höger), y 90–300 */}
      <rect x="240" y="90" width="72" height="210" className="fill-diagram-road" />
      {/* Två fält nedtill, y 400–590 */}
      <rect x="168" y="400" width="144" height="190" className="fill-diagram-road" />
      {/* Avsmalningszon som fyller mellan dem */}
      <polygon
        points="168,400 240,400 240,300 312,300 312,590 168,590"
        className="fill-diagram-road"
      />

      {/* Vägkanter */}
      <g className="stroke-diagram-edge" strokeWidth="1.5" fill="none">
        <line x1="312" y1="90" x2="312" y2="590" />
        <line x1="240" y1="90" x2="240" y2="300" />
        <path d="M 240 300 L 168 400 L 168 590" />
      </g>

      {/* Körfältslinje mellan de två samriktade fälten (streckad vit, får korsas), x = 240 */}
      <line
        x1="240"
        y1="400"
        x2="240"
        y2="590"
        className="stroke-diagram-marking"
        strokeWidth="2"
        strokeDasharray="12 10"
      />

      {/* Avstängd kil — det körfält som tar slut: kraffering + avspärrningsbalk */}
      <polygon points="168,400 240,400 240,300" fill="url(#sf-hatch)" />
      <polygon
        points="168,400 240,400 240,300"
        className="fill-none stroke-safety-600"
        strokeWidth="1.5"
        strokeDasharray="8 6"
      />
      <rect x="168" y="396" width="72" height="8" className="fill-safety-600" />

      {/* ---------- Teckenförklaring (fri vänstermarginal) ---------- */}
      <g>
        <path
          d="M 14 120 L 44 120"
          className="stroke-primary-600"
          strokeWidth="3"
          markerEnd="url(#sf-arrow)"
        />
        <text x="52" y="125" className="fill-text-secondary text-[14px]">
          Rör sig nu
        </text>
        <path
          d="M 14 144 L 44 144"
          className="stroke-attention-600"
          strokeWidth="3"
          strokeDasharray="8 6"
          markerEnd="url(#sf-arrow-plan)"
        />
        <text x="52" y="149" className="fill-text-secondary text-[14px]">
          Planerad väg in
        </text>
        <g className="stroke-primary-600" strokeWidth="2.5" strokeLinecap="round">
          <line x1="16" y1="168" x2="30" y2="168" />
          <line x1="19" y1="163" x2="31" y2="163" />
          <line x1="22" y1="173" x2="32" y2="173" />
        </g>
        <text x="52" y="173" className="fill-text-secondary text-[14px]">
          Håller farten
        </text>
      </g>

      {/* ---------- Fordon längre fram i det kvarvarande fältet ---------- */}
      <Car cx={276} cy={180} heading="up" fill="url(#sf-stripes)" stroke="stroke-primary-600" />

      {/* ---------- 1. Körfältet tar slut ---------- */}
      <Callout x={40} y={340} n={1} />
      <text x="14" y="308" className="fill-text-primary text-[15px] font-semibold">
        Vänster körfält
      </text>
      <text x="14" y="326" className="fill-text-secondary text-[14px]">
        tar slut framåt
      </text>
      <Pointer x1={58} y1={352} x2={196} y2={400} />

      {/* ---------- Elevens bil: håller farten, söker lucka, glider in ---------- */}
      <SpeedLines cx={204} y={464} />
      <Car cx={204} cy={500} heading="up" fill="url(#sf-dots)" stroke="stroke-attention-600" />
      {/* Planerad väg upp-höger in i luckan i det genomgående fältet */}
      <path
        d="M 210 478 Q 240 440 274 424"
        className="fill-none stroke-attention-600"
        strokeWidth="4.5"
        strokeDasharray="10 8"
        markerEnd="url(#sf-arrow-plan)"
      />

      <Callout x={36} y={520} n={2} />
      <text x="14" y="556" className="fill-text-primary text-[15px] font-semibold">
        Håll farten fram,
      </text>
      <text x="14" y="574" className="fill-text-secondary text-[14px]">
        sök en lucka och
      </text>
      <text x="14" y="592" className="fill-text-secondary text-[14px]">
        glid in mjukt
      </text>
      <Pointer x1={54} y1={512} x2={190} y2={500} />

      {/* ---------- Genomgående fordon: lättar på farten, lämnar plats ---------- */}
      <Car cx={276} cy={530} heading="up" fill="url(#sf-stripes)" stroke="stroke-primary-600" />

      <Callout x={332} y={446} n={3} />
      <text x="350" y="451" className="fill-text-primary text-[15px] font-semibold">
        Lätta på farten
      </text>
      <text x="330" y="474" className="fill-text-secondary text-[14px]">
        och lämna plats —
      </text>
      <text x="330" y="492" className="fill-text-secondary text-[14px]">
        redan innan bilen
      </text>
      <text x="330" y="510" className="fill-text-secondary text-[14px]">
        är i din lucka
      </text>
      <Pointer x1={334} y1={500} x2={292} y2={526} />

      {/* ---------- Sammanfattning ---------- */}
      <text
        x="240"
        y="628"
        textAnchor="middle"
        className="fill-text-primary text-[15px] font-medium"
      >
        Två körfält blir ett under ömsesidigt hänsynstagande.
      </text>
      <text x="240" y="648" textAnchor="middle" className="fill-text-secondary text-[15px]">
        Ingen turordning: den som ska in söker en lucka, den
      </text>
      <text x="240" y="668" textAnchor="middle" className="fill-text-secondary text-[15px]">
        som ligger kvar lättar på farten och släpper in.
      </text>

      {/* ---------- Mönsterförklaring ---------- */}
      <g>
        <rect
          x="40"
          y="686"
          width="22"
          height="14"
          rx="2"
          fill="url(#sf-dots)"
          className="stroke-attention-600"
          strokeWidth="1.5"
        />
        <text x="70" y="698" className="fill-text-tertiary text-[14px]">
          Du (prickar)
        </text>
        <rect
          x="188"
          y="686"
          width="22"
          height="14"
          rx="2"
          fill="url(#sf-stripes)"
          className="stroke-primary-600"
          strokeWidth="1.5"
        />
        <text x="218" y="698" className="fill-text-tertiary text-[14px]">
          Andra fordon (ränder)
        </text>
        <rect
          x="384"
          y="686"
          width="22"
          height="14"
          rx="2"
          fill="url(#sf-hatch)"
          className="stroke-safety-600"
          strokeWidth="1.5"
        />
        <text x="386" y="716" className="fill-text-tertiary text-[14px]">
          Avstängt
        </text>
      </g>

      {/* ---------- Förklaringsruta ---------- */}
      <rect
        x="20"
        y="726"
        width="440"
        height="234"
        rx="6"
        className="fill-none stroke-border-default"
        strokeWidth="1.5"
      />
      <text x="34" y="750" className="fill-text-primary text-[15px] font-semibold">
        Det genomgående fordonets körsätt avgör inkörningen:
      </text>
      <line
        x1="240"
        y1="760"
        x2="240"
        y2="948"
        className="stroke-border-default"
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />

      <MiniMerge x={130} y={838} variant="ratt" />
      <text
        x="130"
        y="912"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-semibold"
      >
        Lättar på farten
      </text>
      <text x="130" y="930" textAnchor="middle" className="fill-text-secondary text-[14px]">
        luckan öppen, du glider in
      </text>
      <Check x={130} y={948} />

      <MiniMerge x={350} y={838} variant="fel" />
      <text
        x="350"
        y="912"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-semibold"
      >
        Stänger luckan
      </text>
      <text x="350" y="930" textAnchor="middle" className="fill-text-secondary text-[14px]">
        du tvingas till tvärstopp
      </text>
      <Cross x={350} y={948} />
    </svg>
  );
}
