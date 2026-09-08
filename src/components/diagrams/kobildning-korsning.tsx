/**
 * Köbildning och tät trafik (SPD-04) — kör inte in i korsningen utan plats
 * på andra sidan.
 *
 * Bilden lär ut EN sak: att kontrollen görs innan man kör in, genom att titta
 * bortom korsningen. Bilden säger inget om körfältsbyte i kö och inget om
 * passage av kö förbi ett övergångsställe — det är egna situationer.
 *
 * ORDVAL: bilden formulerar aldrig något som väjningsplikt och säger aldrig
 * att någon "har företräde". Den korsande trafiken hindras eller hindras
 * inte; det är elevens eget körsätt som avgör, och det är så texten är
 * skriven. Inga mått, inga sekunder, inga köllängder anges i siffror.
 *
 * GEOMETRI (högertrafik, vy uppifrån). Dukens egna koordinater, 480 × 980.
 * Ingen förskjuten grupp — alla tal nedan är direkt läsbara i markup.
 *
 *   Lodrät väg (elevens väg): x 196–284, y 100–560. Mittlinjen ligger på x = 240.
 *     Elevens körriktning är UPPÅT (minskande y). För den som kör uppåt är
 *     förarens högra sida bildens högra, alltså är elevens halva x 240–284.
 *     Alla fordon som kör uppåt har därför kaross x 248–276 (mitt x = 262):
 *       kö bortom korsningen  cy = 152, 208, 264
 *       elevens bil (väntar)  cy = 420   (front y = 398)
 *       fordon bakom eleven   cy = 486
 *       spökbilen i korsningen mitt x = 260 (kaross 246–274), cy = 344
 *     Mötande kör NEDÅT (ökande y) och ligger därför i halvan x 196–240:
 *       mötande bil mitt x = 218 (kaross 204–232), cy = 170.
 *
 *   Vågrät väg (korsande väg): y 300–388. Mittlinjen ligger på y = 344.
 *     Den korsande bilen kör ÅT HÖGER (ökande x). För den som kör åt höger är
 *     förarens högra sida bildens nedre, alltså ligger den i halvan y 344–388:
 *       korsande bil mitt y = 366 (kaross 352–380), cx = 110.
 *
 *   Korsningsytan: x 196–284, y 300–388.
 *
 *   POÄNGEN, EFTERRÄKNAD:
 *     Sista kön-bilen bortom korsningen slutar vid y = 286. Korsningens norra
 *     kant ligger på y = 300. Luckan bortom korsningen är alltså 14 px, medan
 *     en bil är 44 px lång — platsen räcker inte, och det är just det bilden
 *     ska visa. Den streckade platsrutan (x 248–276, y 254–298) är exakt en
 *     bils yta lagd där elevens bil skulle behöva stå. Den överlappar kön-
 *     bilen med 32 px av dess längd: platsen är upptagen.
 *     Spökbilen (kaross y 322–366) skär både det korsande vägens övre körfält
 *     (y 300–344) och dess nedre (y 344–388) — den står tvärs över båda.
 *     Elevens bil i det rätta läget har front y = 398, alltså 10 px före
 *     korsningens södra kant y = 388, och spökbilen (322–366) överlappar
 *     varken den (398–442) eller kön (242–286).
 *
 * MÖNSTER (varje mönster betyder en enda sak i den här bilden):
 *   prickar        = elevens bil (även spökbilen — samma bil, annat utfall)
 *   diagonala ränder = andra fordon
 *   45° kraffering = korsningsytan, den yta som inte ska blockeras
 * Heldragen pil = rör sig nu. Streckad röd pil och streckad röd kontur = det
 * som hade hänt om eleven kört in ändå. Prickad linje = elevens blick.
 * Rött tvärstreck = trafik som hindras. Bock/kryss = rätt/fel utfall.
 * Färg bär ingen betydelse ensam: varje roll har också mönster, streckning,
 * symbol eller etikett.
 *
 * FÖRKLARINGSRUTAN har samma geometri i halv skala: eleven kör uppåt i högra
 * halvan (lokal x 0–44, mitt 22), den korsande kör åt höger i nedre halvan
 * (lokal y 0–44, mitt 22), kön står norr om korsningen (lokal y < −44).
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
  ghost?: boolean;
}

/**
 * Bil ritad med fronten uppåt och sedan vriden efter färdriktningen.
 * Karossen upptar exakt (cx ± 14, cy ± 22); hjulen sticker ut 3 px åt sidorna.
 */
function Car({ cx, cy, heading, fill, stroke, brakeLights, ghost }: CarProps) {
  const hw = 14;
  const hl = 22;
  const glass = `fill-diagram-marking ${stroke}`;
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${HEADING_DEG[heading]})`} opacity={ghost ? 0.95 : 1}>
      {/* Spokbilen star pa krafferingen. Utan en tackande botten forsvinner den
          i monstret — fordon ska ha ljus fyllning och mork kontur. */}
      {ghost && <rect x={-hw - 4} y={-hl - 2} width={2 * hw + 8} height={2 * hl + 4} rx="5" className="fill-surface-base" />}
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
      <rect x={-hw + 5} y={-hl + 7} width={2 * hw - 10} height="8" rx="2" className={glass} strokeWidth="1" />
      <rect x={-hw + 5} y={hl - 11} width={2 * hw - 10} height="5" rx="2" className={glass} strokeWidth="1" />
      {brakeLights && (
        <g className="fill-safety-600">
          <rect x={-hw + 2} y={hl - 1} width="6" height="3" />
          <rect x={hw - 8} y={hl - 1} width="6" height="3" />
        </g>
      )}
    </g>
  );
}

/** Numrerad hänvisning: mörk cirkel med siffra. */
function Callout({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="11" className="fill-text-primary" />
      <text x={x} y={y + 5} textAnchor="middle" className="fill-surface-base text-[14px] font-semibold">
        {n}
      </text>
    </g>
  );
}

/** Tunn pekarlinje från en etikett till det den syftar på, med en punkt i målet. */
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
 * Samma korsning i halv skala. Origo i korsningens mitt: lodrät väg
 * x −44…44, vågrät väg y −44…44. Elevens körfält är x 0–44 (kör uppåt), den
 * korsande trafikens är y 0–44 (kör åt höger) — samma geometri som ovan.
 */
function MiniKorsning({ x, y, variant }: { x: number; y: number; variant: 'vantar' | 'kor-in' }) {
  const waits = variant === 'vantar';
  return (
    <g transform={`translate(${x} ${y}) scale(0.5)`}>
      <rect x="-44" y="-145" width="88" height="290" className="fill-diagram-road" />
      <rect x="-150" y="-44" width="300" height="88" className="fill-diagram-road" />
      <g className="stroke-diagram-edge" strokeWidth="3">
        <line x1="-44" y1="-145" x2="-44" y2="-44" />
        <line x1="44" y1="-145" x2="44" y2="-44" />
        <line x1="-44" y1="44" x2="-44" y2="145" />
        <line x1="44" y1="44" x2="44" y2="145" />
        <line x1="-150" y1="-44" x2="-44" y2="-44" />
        <line x1="-150" y1="44" x2="-44" y2="44" />
        <line x1="44" y1="-44" x2="150" y2="-44" />
        <line x1="44" y1="44" x2="150" y2="44" />
      </g>
      <g className="stroke-diagram-marking" strokeWidth="3" strokeDasharray="12 10">
        <line x1="0" y1="-145" x2="0" y2="-44" />
        <line x1="0" y1="44" x2="0" y2="145" />
        <line x1="-150" y1="0" x2="-44" y2="0" />
        <line x1="44" y1="0" x2="150" y2="0" />
      </g>

      {/* Kön bortom korsningen står still i båda fallen */}
      <Car cx={22} cy={-70} heading="up" fill="url(#ko-stripes)" stroke="stroke-primary-600" brakeLights />
      <Car cx={22} cy={-118} heading="up" fill="url(#ko-stripes)" stroke="stroke-primary-600" brakeLights />

      {/* Korsande trafik: nedre körfältet, kör åt höger */}
      <Car cx={-60} cy={22} heading="right" fill="url(#ko-stripes)" stroke="stroke-primary-600" brakeLights={!waits} />
      <path
        d={waits ? 'M -34 22 L 60 22' : 'M -34 22 L -8 22'}
        className="stroke-primary-600"
        strokeWidth="5"
        markerEnd="url(#ko-arrow-other)"
      />
      {!waits && <line x1="0" y1="6" x2="0" y2="38" className="stroke-safety-600" strokeWidth="6" strokeLinecap="round" />}

      {/* Eleven: högra körfältet, kör uppåt */}
      <Car
        cx={22}
        cy={waits ? 70 : 0}
        heading="up"
        fill="url(#ko-dots)"
        stroke="stroke-attention-600"
        brakeLights
      />
    </g>
  );
}

export function KobildningKorsningDiagram() {
  return (
    <svg
      viewBox="0 0 480 980"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="kobildning-title kobildning-desc"
    >
      <title id="kobildning-title">Köbildning genom en korsning</title>
      <desc id="kobildning-desc">
        Korsning sedd uppifrån i tät, stillastående trafik. Din bil, fylld med prickmönster, kör
        uppåt i bilden i det högra körfältet och står stilla med tända bromsljus strax före
        korsningen; ett annat fordon med randmönster står tätt bakom dig. Bortom korsningen står
        tre fordon med randmönster kö i samma körfält, alla med tända bromsljus, och luckan mellan
        det bakersta av dem och korsningen är tydligt kortare än en bil. En streckad rektangel i
        din bils färg ligger i den luckan: den plats din bil skulle behöva. Rektangeln överlappar
        det bakersta köfordonet och är märkt med ett kryss — platsen är upptagen. Själva
        korsningsytan är markerad med sned kraffering och streckad kontur: den yta som inte ska
        blockeras. Inne i krafferingen står en blek, streckad kopia av din bil med samma
        prickmönster, tvärs över den korsande vägens båda körfält: så hade det sett ut om du kört
        in ändå. En streckad pil går från din bil till kopian. Från vänster kommer ett fordon med
        randmönster på den korsande vägen i sitt högra körfält, med heldragen pil framåt, och
        pilen tar slut vid ett rött tvärstreck vid korsningens kant — den trafiken hindras av
        kopian. En prickad linje går från din bil förbi kön framåt: din blick bortom korsningen
        innan du kör in. I det mötande körfältet kör ett fordon nedåt i bilden med heldragen pil.
        Tre numrerade hänvisningar: 1 vid din bil, du stannar före korsningen och tittar bortom
        den först; 2 vid den streckade platsrutan, ingen plats på andra sidan; 3 vid kopian i
        korsningen, hade du kört in blir du stående och hindrar korsande trafik. Under bilden
        står: kör in i korsningen först när du ser att du kommer ut på andra sidan. En ruta längst
        ned visar samma korsning två gånger: du står kvar före korsningen och den korsande
        trafiken kommer fram, markerat med en bock; du står i korsningen och den korsande
        trafiken stoppas, markerat med ett kryss.
      </desc>

      <defs>
        <pattern id="ko-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="ko-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="2" />
        </pattern>
        <pattern id="ko-hatch" patternUnits="userSpaceOnUse" width="14" height="14">
          <path d="M-2,2 l4,-4 M0,14 l14,-14 M12,16 l4,-4" className="stroke-safety-600" strokeWidth="1.2" opacity="0.45" />
        </pattern>
        <marker id="ko-arrow-other" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary-600" />
        </marker>
        <marker id="ko-arrow-bad" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-safety-600" />
        </marker>
        <marker id="ko-arrow-look" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-text-tertiary" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="30" className="fill-text-primary text-[18px] font-semibold">
        Köbildning genom en korsning
      </text>
      <text x="20" y="52" className="fill-text-secondary text-[14px]">
        Tät trafik — kön framför står still
      </text>

      {/* ---------- Vägbanor ---------- */}
      <rect x="196" y="100" width="88" height="460" className="fill-diagram-road" />
      <rect x="0" y="300" width="480" height="88" className="fill-diagram-road" />

      {/* Vägkanter, brutna genom korsningen */}
      <g className="stroke-diagram-edge" strokeWidth="1.5">
        <line x1="196" y1="100" x2="196" y2="300" />
        <line x1="284" y1="100" x2="284" y2="300" />
        <line x1="196" y1="388" x2="196" y2="560" />
        <line x1="284" y1="388" x2="284" y2="560" />
        <line x1="0" y1="300" x2="196" y2="300" />
        <line x1="0" y1="388" x2="196" y2="388" />
        <line x1="284" y1="300" x2="480" y2="300" />
        <line x1="284" y1="388" x2="480" y2="388" />
      </g>

      {/* Mittlinjer: x = 240 lodrätt, y = 344 vågrätt */}
      <g className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="10 8">
        <line x1="240" y1="100" x2="240" y2="300" />
        <line x1="240" y1="388" x2="240" y2="560" />
        <line x1="0" y1="344" x2="196" y2="344" />
        <line x1="284" y1="344" x2="480" y2="344" />
      </g>

      {/* Korsningsytan — konfliktyta: kraffering plus egen kontur */}
      <rect x="196" y="300" width="88" height="88" fill="url(#ko-hatch)" />
      <rect
        x="196"
        y="300"
        width="88"
        height="88"
        className="fill-none stroke-safety-600"
        strokeWidth="2"
        strokeDasharray="8 6"
      />

      {/* ---------- Teckenförklaring, fri vänstermarginal ---------- */}
      <g>
        <path d="M 14 124 L 44 124" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#ko-arrow-other)" />
        <text x="52" y="129" className="fill-text-secondary text-[14px]">
          Rör sig nu
        </text>
        <path
          d="M 14 148 L 44 148"
          className="stroke-safety-600"
          strokeWidth="3"
          strokeDasharray="7 5"
          markerEnd="url(#ko-arrow-bad)"
        />
        <text x="52" y="153" className="fill-text-secondary text-[14px]">
          Om du kör in ändå
        </text>
        <line
          x1="14"
          y1="172"
          x2="44"
          y2="172"
          className="stroke-text-tertiary"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="0.5 6"
        />
        <text x="52" y="177" className="fill-text-secondary text-[14px]">
          Din blick
        </text>
      </g>

      {/* ---------- Kön bortom korsningen: står still, elevens körfält ---------- */}
      <Car cx={262} cy={152} heading="up" fill="url(#ko-stripes)" stroke="stroke-primary-600" brakeLights />
      <Car cx={262} cy={208} heading="up" fill="url(#ko-stripes)" stroke="stroke-primary-600" brakeLights />
      <Car cx={262} cy={264} heading="up" fill="url(#ko-stripes)" stroke="stroke-primary-600" brakeLights />

      <text x="300" y="150" className="fill-text-secondary text-[14px]">
        Kön står still
      </text>
      <Pointer x1={298} y1={146} x2={281} y2={152} />

      {/* ---------- Mötande körfält: kör nedåt, x 196–240 ---------- */}
      <Car cx={218} cy={170} heading="down" fill="url(#ko-stripes)" stroke="stroke-primary-600" />
      <path d="M 218 196 L 218 256" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#ko-arrow-other)" />
      <text x="14" y="244" className="fill-text-secondary text-[14px]">
        Mötande körfält
      </text>
      <Pointer x1={100} y1={240} x2={200} y2={178} />

      {/* ---------- 2. Platsen du skulle behöva — upptagen ---------- */}
      <rect
        x="248"
        y="254"
        width="28"
        height="44"
        rx="4"
        className="fill-none stroke-attention-600"
        strokeWidth="2.5"
        strokeDasharray="7 5"
      />
      <Cross x={262} y={276} size={9} />
      <Callout x={312} y={244} n={2} />
      <text x="330" y="249" className="fill-text-primary text-[15px] font-semibold">
        Ingen plats
      </text>
      <text x="300" y="268" className="fill-text-secondary text-[14px]">
        på andra sidan —
      </text>
      <text x="300" y="286" className="fill-text-secondary text-[14px]">
        platsen är upptagen
      </text>
      <Pointer x1={302} y1={238} x2={277} y2={256} />

      {/* ---------- Korsande trafik: nedre körfältet, kör åt höger ---------- */}
      <Car cx={110} cy={366} heading="right" fill="url(#ko-stripes)" stroke="stroke-primary-600" />
      <path d="M 134 366 L 186 366" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#ko-arrow-other)" />
      <line x1="192" y1="350" x2="192" y2="382" className="stroke-safety-600" strokeWidth="5" strokeLinecap="round" />
      <text x="14" y="420" className="fill-text-secondary text-[14px]">
        Korsande trafik
      </text>
      <Pointer x1={66} y1={412} x2={104} y2={381} />

      {/* ---------- 3. Spökbilen: elevens bil om hon kört in ändå ---------- */}
      <Car cx={260} cy={344} heading="up" fill="url(#ko-dots)" stroke="stroke-safety-600" brakeLights ghost />
      <path
        d="M 261 394 L 261 372"
        className="stroke-safety-600"
        strokeWidth="3"
        strokeDasharray="7 5"
        markerEnd="url(#ko-arrow-bad)"
      />
      <Callout x={30} y={470} n={3} />
      <text x="48" y="475" className="fill-text-primary text-[15px] font-semibold">
        Hade du kört in:
      </text>
      <text x="14" y="494" className="fill-text-secondary text-[14px]">
        du blir stående i
      </text>
      <text x="14" y="512" className="fill-text-secondary text-[14px]">
        korsningen och hindrar
      </text>
      <text x="14" y="530" className="fill-text-secondary text-[14px]">
        korsande trafik
      </text>
      <Pointer x1={120} y1={486} x2={248} y2={362} />

      {/* ---------- Elevens bil och blicken bortom korsningen ---------- */}
      <line
        x1="282"
        y1="404"
        x2="292"
        y2="276"
        className="stroke-text-tertiary"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="0.5 6"
        markerEnd="url(#ko-arrow-look)"
      />
      <Car cx={262} cy={420} heading="up" fill="url(#ko-dots)" stroke="stroke-attention-600" brakeLights />
      <Car cx={262} cy={486} heading="up" fill="url(#ko-stripes)" stroke="stroke-primary-600" brakeLights />

      <Callout x={312} y={424} n={1} />
      <text x="330" y="429" className="fill-text-primary text-[15px] font-semibold">
        Du stannar före
      </text>
      <text x="300" y="448" className="fill-text-secondary text-[14px]">
        korsningen och tittar
      </text>
      <text x="300" y="466" className="fill-text-secondary text-[14px]">
        bortom den först
      </text>
      <Pointer x1={300} y1={428} x2={281} y2={420} />

      {/* ---------- Sammanfattning ---------- */}
      <text x="240" y="598" textAnchor="middle" className="fill-text-primary text-[15px] font-medium">
        Kör in i korsningen först när du ser att du kommer ut
      </text>
      <text x="240" y="618" textAnchor="middle" className="fill-text-secondary text-[15px]">
        på andra sidan. Att bli stående i korsningen hindrar
      </text>
      <text x="240" y="638" textAnchor="middle" className="fill-text-secondary text-[15px]">
        den korsande trafiken i onödan.
      </text>

      {/* ---------- Mönsterförklaring ---------- */}
      <g>
        <rect x="24" y="648" width="22" height="14" rx="2" fill="url(#ko-dots)" className="stroke-attention-600" strokeWidth="1.5" />
        <text x="54" y="660" className="fill-text-tertiary text-[14px]">
          Du (prickar)
        </text>
        <rect x="170" y="648" width="22" height="14" rx="2" fill="url(#ko-stripes)" className="stroke-primary-600" strokeWidth="1.5" />
        <text x="200" y="660" className="fill-text-tertiary text-[14px]">
          Andra fordon (ränder)
        </text>
        <rect x="24" y="674" width="22" height="14" rx="2" fill="url(#ko-hatch)" className="stroke-safety-600" strokeWidth="1.5" />
        <text x="54" y="686" className="fill-text-tertiary text-[14px]">
          Korsningsytan (kraffering)
        </text>
      </g>

      {/* ---------- Förklaringsruta ---------- */}
      <rect x="20" y="700" width="440" height="250" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="34" y="726" className="fill-text-primary text-[15px] font-semibold">
        Om kön framför inte rör sig:
      </text>
      <line x1="240" y1="736" x2="240" y2="938" className="stroke-border-default" strokeWidth="1.5" strokeDasharray="6 4" />

      <MiniKorsning x={130} y={810} variant="vantar" />
      <text x="130" y="896" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Du väntar före korsningen
      </text>
      <text x="130" y="914" textAnchor="middle" className="fill-text-secondary text-[14px]">
        korsande trafik kommer fram
      </text>
      <Check x={130} y={932} />

      <MiniKorsning x={350} y={810} variant="kor-in" />
      <text x="350" y="896" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Du står i korsningen
      </text>
      <text x="350" y="914" textAnchor="middle" className="fill-text-secondary text-[14px]">
        korsande trafik stoppas
      </text>
      <Cross x={350} y={932} />
    </svg>
  );
}
