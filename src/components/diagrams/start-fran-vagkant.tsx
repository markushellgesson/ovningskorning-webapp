/**
 * Start från vägkant (MAN-11) — ordningen spegel, tecken, axelblick innan
 * bilen rör sig, och cyklisten som kommer närmast kanten. Regeln i momentet
 * är att starten får ske endast utan fara eller onödigt hinder för andra;
 * väjningsplikten hör till utfart från parkeringsplats eller fastighet, och
 * den gränsen dras i förklaringsrutan.
 *
 * Skala 12 px = 1 m. Kaross 22 × 53 px. Scenen ligger i en grupp med
 * translate(0 56); koordinaterna nedan är gruppens lokala.
 *
 * Geometri (högertrafik, vy uppifrån). Gatan går lodrätt, körbana x 150–234,
 * mittlinje x 192, kantsten x 234, trottoar x 234–248.
 * - Du och all annan trafik i bilden kör uppåt (norrut). Kör man uppåt är
 *   den egna högra sidan bildens högra, så det högra körfältet är x 192–234
 *   och det mötande x 150–192, vilket lämnas tomt.
 * - Din bil står vid kantstenen med nosen uppåt: kaross x 208–230, alltså
 *   16 px innanför mittlinjen och 4 px från kantstenen. Förarplatsen ligger
 *   i (211, 262), vänster ytterspegel i (206, 263).
 * - Cyklisten kommer bakifrån närmast kanten och har svängt ut för att
 *   passera: kaross x 195–205, mitt x 200 — mellan din bil (x 208) och
 *   mittlinjen (x 192) finns bara 16 px, så cyklisten passerar med några
 *   px på varje sida. Trångt, och det är poängen.
 * - Fordonet bakifrån ligger i samma körfält: kaross x 200–222, y 403–457.
 * - Döda vinkeln ritas som en skrafferad kil med spetsen i förarplatsen
 *   (211, 262) och hörnen (160, 350) och (202, 384). Cyklistens mittpunkt
 *   (200, 352) ligger innanför kilen — efterräknat mot alla tre sidor.
 * - Din planerade väg går från nosen (219, 245) i en mjuk båge till
 *   körfältets mitt x 213 och sedan rakt fram. Den laterala förflyttningen
 *   är bara 6 px (0,5 m); den ritas som den är i stället för att överdrivas.
 *
 * Mönster: prickar = din bil, diagonala ränder = andra fordon, kryss =
 * cyklist, grå skraffering = det spegeln inte visar. Streckad linje = din
 * planerade väg, heldragen = rör sig nu, prickad = blicken.
 * Förklaringsrutan jämför två utfarter i skala 0,62 med samma körfält och
 * samma riktningar: från vägkanten respektive från en parkeringsplats.
 */

/** Bil ritad med fronten uppåt och sedan vriden. Kaross 22 × 53. */
function Bil({
  cx,
  cy,
  rot,
  fill,
  stroke,
  nose,
  blinkerLeft,
}: {
  cx: number;
  cy: number;
  rot: number;
  fill: string;
  stroke: string;
  nose: string;
  blinkerLeft?: boolean;
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
      {blinkerLeft && (
        <g className="stroke-attention-600" strokeWidth="2" strokeLinecap="round">
          <circle cx="-11" cy="-23" r="2.5" className="fill-attention-600" />
          <circle cx="-11" cy="23" r="2.5" className="fill-attention-600" />
          <line x1="-15" y1="-27" x2="-20" y2="-32" />
          <line x1="-16" y1="-23" x2="-23" y2="-23" />
          <line x1="-15" y1="-19" x2="-20" y2="-14" />
          <line x1="-16" y1="23" x2="-23" y2="23" />
          <line x1="-15" y1="27" x2="-20" y2="32" />
          <line x1="-15" y1="19" x2="-20" y2="14" />
        </g>
      )}
    </g>
  );
}

/** Cyklist: smal kropp med kryssmönster. */
function Cyklist({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <rect x={cx - 5} y={cy - 11} width="10" height="22" rx="3" className="fill-surface-base" />
      <rect
        x={cx - 5}
        y={cy - 11}
        width="10"
        height="22"
        rx="3"
        fill="url(#sv-cross)"
        className="stroke-safety-600"
        strokeWidth="2"
      />
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

/**
 * Två utfarter i skala 0,62 för förklaringsrutan, i samma lokala
 * koordinater som huvudbilden: körbana x 150–234, mittlinje x 192,
 * kantsten x 234. Alla fordon kör uppåt och ligger i x 192–234.
 * I variant 'parkering' står du i en ficka öster om kantstenen.
 */
function MiniUtfart({ x, y, variant }: { x: number; y: number; variant: 'vagkant' | 'parkering' }) {
  const fromLot = variant === 'parkering';
  return (
    <g transform={`translate(${x} ${y}) scale(0.62) translate(-148 0)`}>
      <rect x="150" y="0" width="84" height="150" className="fill-diagram-road" />
      <rect x="234" y="0" width="14" height="150" className="fill-diagram-edge" opacity="0.3" />
      <line x1="150" y1="0" x2="150" y2="150" className="stroke-diagram-edge" strokeWidth="3" />
      <line x1="234" y1="0" x2="234" y2="150" className="stroke-diagram-edge" strokeWidth="3" />
      <line x1="192" y1="0" x2="192" y2="150" className="stroke-diagram-marking" strokeWidth="3" strokeDasharray="12 10" />
      {fromLot && (
        <g>
          <rect x="248" y="24" width="44" height="72" className="fill-diagram-road" />
          <g className="stroke-diagram-edge" strokeWidth="3">
            <line x1="248" y1="24" x2="292" y2="24" />
            <line x1="248" y1="96" x2="292" y2="96" />
          </g>
          <rect x="234" y="42" width="14" height="36" className="fill-diagram-road" />
        </g>
      )}
      {/* Fordon som närmar sig bakifrån i samma körfält */}
      <Bil cx={213} cy={128} rot={0} fill="url(#sv-stripes)" stroke="stroke-primary-600" nose="fill-primary-600" />
      <path d="M 213 100 L 213 74" className="stroke-primary-600" strokeWidth="5" markerEnd="url(#sv-arrow-other)" />
      {/* Du */}
      {fromLot ? (
        <g>
          <Bil cx={268} cy={60} rot={-90} fill="url(#sv-dots)" stroke="stroke-attention-600" nose="fill-attention-600" />
          <path
            d="M 240 60 C 222 60 213 52 213 34"
            className="fill-none stroke-attention-600"
            strokeWidth="5"
            strokeDasharray="10 8"
            markerEnd="url(#sv-arrow-you)"
          />
        </g>
      ) : (
        <g>
          <Bil cx={219} cy={64} rot={0} fill="url(#sv-dots)" stroke="stroke-attention-600" nose="fill-attention-600" />
          <path
            d="M 219 34 C 219 22 213 18 213 8"
            className="fill-none stroke-attention-600"
            strokeWidth="5"
            strokeDasharray="10 8"
            markerEnd="url(#sv-arrow-you)"
          />
        </g>
      )}
    </g>
  );
}

export function StartFranVagkantDiagram() {
  return (
    <svg
      viewBox="0 0 400 1032"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="sv-title sv-desc"
    >
      <title id="sv-title">Start från vägkant: spegel, tecken, axelblick — innan bilen rör sig</title>
      <desc id="sv-desc">
        Vy uppifrån av en lodrät gata med kantsten och trottoar till höger och en streckad
        mittlinje. All trafik i bilden kör uppåt och ligger i det högra körfältet. Din bil, fylld
        med prickmönster, står vid kantstenen med nosen uppåt. Tre numrerade hänvisningar i
        vänstermarginalen ger ordningen: 1 pekar på vänster ytterspegel, 2 pekar på tecknet som
        blinkar vid vänster fram- och bakhörn, 3 pekar på axelblicken, en prickad linje snett
        bakåt åt vänster från förarplatsen. Allt tre sker innan bilen rör sig. En grå skrafferad
        kil bakåt till vänster om bilen visar det som spegeln inte täcker. Inuti kilen kör en
        cyklist, ritad med kryssmönster, som kommit närmast kanten och svängt ut för att passera
        dig; utrymmet mellan din bil och mittlinjen är knappt. En heldragen linje visar cyklistens
        väg. Längre bak i samma körfält kommer ett fordon med diagonala ränder, också med en
        heldragen linje framför sig. En streckad linje visar din planerade väg ut i körfältet: en
        mjuk båge, eftersom förflyttningen i sidled är liten. Under bilden står regeln: du får
        starta från vägkanten endast om det kan ske utan fara eller onödigt hinder för andra.
        Längst ned en ruta som jämför två utfarter med samma körfält och samma riktningar: från
        vägkanten gäller utan fara eller onödigt hinder, från en parkeringsplats eller en
        fastighet gäller väjningsplikt.
      </desc>

      <defs>
        <pattern id="sv-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="sv-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="2" />
        </pattern>
        <pattern id="sv-cross" patternUnits="userSpaceOnUse" width="7" height="7">
          <path d="M0,0 l7,7 M7,0 l-7,7" className="stroke-safety-600" strokeWidth="1.6" />
        </pattern>
        <pattern id="sv-hatch" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-text-tertiary" strokeWidth="1.4" />
        </pattern>
        <marker id="sv-arrow-you" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-attention-600" />
        </marker>
        <marker id="sv-arrow-other" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary-600" />
        </marker>
        <marker id="sv-arrow-cyclist" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-safety-600" />
        </marker>
        <marker id="sv-arrow-look" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-text-tertiary" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Start från vägkant
      </text>
      <text x="20" y="48" className="fill-text-secondary text-[13px]">
        Spegel, tecken, axelblick — innan bilen rör sig
      </text>

      <g transform="translate(0 56)">
        {/* Gata */}
        <rect x="150" y="0" width="84" height="490" className="fill-diagram-road" />
        <rect x="234" y="0" width="14" height="490" className="fill-diagram-edge" opacity="0.3" />
        <line x1="150" y1="0" x2="150" y2="490" className="stroke-diagram-edge" strokeWidth="2" />
        <line x1="234" y1="0" x2="234" y2="490" className="stroke-diagram-edge" strokeWidth="3" />
        <line
          x1="192"
          y1="0"
          x2="192"
          y2="490"
          className="stroke-diagram-marking"
          strokeWidth="2"
          strokeDasharray="10 8"
        />

        {/* Döda vinkeln: kil bakåt till vänster från förarplatsen */}
        <polygon
          points="211,262 160,350 202,384"
          fill="url(#sv-hatch)"
          className="stroke-text-tertiary"
          strokeWidth="1.5"
          strokeDasharray="6 4"
        />

        {/* Din planerade väg ut i körfältet */}
        <path
          d="M 219 245 C 219 208 213 198 213 145"
          className="fill-none stroke-attention-600"
          strokeWidth="3"
          strokeDasharray="9 7"
          markerEnd="url(#sv-arrow-you)"
        />

        {/* Cyklistens väg: närmast kanten, svänger ut för att passera dig */}
        <path
          d="M 227 412 C 214 392 200 386 200 360 L 200 214"
          className="fill-none stroke-safety-600"
          strokeWidth="2.5"
          markerEnd="url(#sv-arrow-cyclist)"
        />

        {/* Fordon bakifrån i samma körfält */}
        <Bil cx={211} cy={430} rot={0} fill="url(#sv-stripes)" stroke="stroke-primary-600" nose="fill-primary-600" />
        <path d="M 211 402 L 211 376" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#sv-arrow-other)" />

        {/* Cyklisten, inne i den döda vinkeln */}
        <Cyklist cx={200} cy={352} />

        {/* Din bil vid kantstenen, med tecken */}
        <Bil cx={219} cy={276} rot={0} fill="url(#sv-dots)" stroke="stroke-attention-600" nose="fill-attention-600" blinkerLeft />
        {/* Vänster ytterspegel */}
        <rect x="203" y="261" width="6" height="4" rx="1" className="fill-text-primary" />

        {/* Axelblicken */}
        <line
          x1="211"
          y1="262"
          x2="172"
          y2="356"
          className="stroke-text-tertiary"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="0.5 6"
          markerEnd="url(#sv-arrow-look)"
        />

        {/* 1. Spegel */}
        <Callout x={22} y={252} n={1} />
        <text x="38" y="257" className="fill-text-primary text-[14px] font-semibold">
          Spegel
        </text>
        <text x="10" y="275" className="fill-text-secondary text-[13px]">
          först av allt
        </text>
        <Pekare x1={112} y1={252} x2={202} y2={263} />

        {/* 2. Tecken */}
        <Callout x={22} y={304} n={2} />
        <text x="38" y="309" className="fill-text-primary text-[14px] font-semibold">
          Tecken
        </text>
        <text x="10" y="327" className="fill-text-secondary text-[13px]">
          i god tid, före
        </text>
        <text x="10" y="345" className="fill-text-secondary text-[13px]">
          rörelsen
        </text>
        <Pekare x1={100} y1={310} x2={196} y2={299} />

        {/* 3. Axelblick */}
        <Callout x={22} y={392} n={3} />
        <text x="38" y="397" className="fill-text-primary text-[14px] font-semibold">
          Axelblick
        </text>
        <text x="10" y="415" className="fill-text-secondary text-[13px]">
          åt vänster — det
        </text>
        <text x="10" y="433" className="fill-text-secondary text-[13px]">
          spegeln missar
        </text>
        <Pekare x1={112} y1={408} x2={178} y2={342} />

        {/* Cyklisten */}
        <text x="252" y="340" className="fill-text-primary text-[13px] font-semibold">
          Cyklist närmast
        </text>
        <text x="252" y="358" className="fill-text-secondary text-[13px]">
          kanten, svänger
        </text>
        <text x="252" y="376" className="fill-text-secondary text-[13px]">
          ut för att passera
        </text>
        <Pekare x1={248} y1={346} x2={206} y2={352} />

        {/* Döda vinkeln */}
        <text x="252" y="424" className="fill-text-primary text-[13px] font-semibold">
          Döda vinkeln
        </text>
        <text x="252" y="442" className="fill-text-secondary text-[13px]">
          utanför spegeln
        </text>
        <Pekare x1={248} y1={430} x2={196} y2={370} />

        {/* Fordonet bakifrån */}
        <text x="252" y="480" className="fill-text-primary text-[13px] font-semibold">
          Fordon bakifrån
        </text>
        <Pekare x1={248} y1={476} x2={223} y2={440} />
      </g>

      {/* Teckenförklaring */}
      <g>
        <path
          d="M 24 574 L 52 574"
          className="stroke-attention-600"
          strokeWidth="3"
          strokeDasharray="8 6"
          markerEnd="url(#sv-arrow-you)"
        />
        <text x="60" y="579" className="fill-text-secondary text-[13px]">
          Din planerade väg
        </text>
        <path d="M 210 574 L 238 574" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#sv-arrow-other)" />
        <text x="246" y="579" className="fill-text-secondary text-[13px]">
          Rör sig nu
        </text>
        <line
          x1="24"
          y1="598"
          x2="52"
          y2="598"
          className="stroke-text-tertiary"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="0.5 6"
        />
        <text x="60" y="603" className="fill-text-secondary text-[13px]">
          Axelblick
        </text>
        <rect
          x="210"
          y="591"
          width="26"
          height="14"
          fill="url(#sv-hatch)"
          className="stroke-text-tertiary"
          strokeWidth="1.5"
        />
        <text x="246" y="603" className="fill-text-secondary text-[13px]">
          Syns inte i spegeln
        </text>
      </g>

      {/* Regeltext */}
      <text x="200" y="638" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        Du får starta från vägkanten endast
      </text>
      <text x="200" y="658" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        om det kan ske utan fara eller
      </text>
      <text x="200" y="678" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        onödigt hinder för andra.
      </text>
      <text x="200" y="702" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Tecknet befriar dig inte från att försäkra dig.
      </text>
      <text x="200" y="720" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Vänta in en lucka du kan använda hela,
      </text>
      <text x="200" y="738" textAnchor="middle" className="fill-text-secondary text-[13px]">
        och kör sedan ut bestämt.
      </text>

      {/* Mönsterförklaring */}
      <g>
        <rect
          x="42"
          y="766"
          width="22"
          height="14"
          rx="2"
          fill="url(#sv-dots)"
          className="stroke-attention-600"
          strokeWidth="1.5"
        />
        <text x="70" y="778" className="fill-text-tertiary text-[13px]">
          Du
        </text>
        <rect
          x="112"
          y="766"
          width="22"
          height="14"
          rx="2"
          fill="url(#sv-stripes)"
          className="stroke-primary-600"
          strokeWidth="1.5"
        />
        <text x="140" y="778" className="fill-text-tertiary text-[13px]">
          Andra fordon
        </text>
        <rect
          x="248"
          y="766"
          width="22"
          height="14"
          rx="2"
          fill="url(#sv-cross)"
          className="stroke-safety-600"
          strokeWidth="1.5"
        />
        <text x="276" y="778" className="fill-text-tertiary text-[13px]">
          Cyklist
        </text>
      </g>

      {/* Förklaringsruta: gränsen mot utfart från parkeringsplats */}
      <rect x="20" y="800" width="360" height="214" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="34" y="824" className="fill-text-primary text-[13px] font-semibold">
        Två utfarter — två olika regler:
      </text>
      <line x1="200" y1="838" x2="200" y2="1006" className="stroke-border-default" strokeWidth="1.5" strokeDasharray="6 4" />

      <MiniUtfart x={78} y={844} variant="vagkant" />
      <text x="110" y="958" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Från vägkanten
      </text>
      <text x="110" y="976" textAnchor="middle" className="fill-text-secondary text-[13px]">
        endast utan fara
      </text>
      <text x="110" y="994" textAnchor="middle" className="fill-text-secondary text-[13px]">
        eller onödigt hinder
      </text>

      <MiniUtfart x={245} y={844} variant="parkering" />
      <text x="290" y="958" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Från parkeringsplats
      </text>
      <text x="290" y="976" textAnchor="middle" className="fill-text-secondary text-[13px]">
        eller fastighet:
      </text>
      <text x="290" y="994" textAnchor="middle" className="fill-text-secondary text-[13px]">
        du har väjningsplikt
      </text>
    </svg>
  );
}
