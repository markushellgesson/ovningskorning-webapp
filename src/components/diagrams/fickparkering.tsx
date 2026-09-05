/**
 * Fickparkering (MAN-10) — backa in längs kant i tre steg, med referenspunkter.
 * Referenspunkterna är körteknik, inte regler. Reglerna i momentet är 3 kap
 * 50 § (säkra bilen) och 3 kap 21 § (väjningsplikt när du kör ut igen).
 *
 * Geometri (högertrafik, vy uppifrån, 12 px ≈ 1 m, bakaxelradie 45 vid fullt
 * rattutslag, hjulbas 32, bil 22 × 53). Tre paneler med samma lokala
 * koordinater: körbana x 10–116, kantsten x 116, färdriktning uppåt.
 * Parkerad bil framför (A) x 90–112, y 40–93; parkerad bil bakom (B)
 * x 90–112, y 180–233; luckan är 87 px ≈ 7,3 m.
 * - Steg 1: din bil jämsides, x 62–84 (0,5 m från A), bakaxel y 92, alltså
 *   i höjd med A:s bakkant y 93.
 * - Steg 2: backning med fullt högerutslag, bakaxeln går runt (118, 92).
 *   Vid 45°: bakaxel (86.2, 123.8), bakkant (94, 131.6), högra framhörnet
 *   (64.3, 86.3) — klart till vänster om A:s vänstra sida x 90.
 * - Steg 3: fullt vänsterutslag, bakaxeln går runt (54.4, 155.6). Högra
 *   framhörnet går radie 70 och passerar A:s bakre vänstra hörn (90, 93)
 *   med 3–5 px marginal. Bakre högra hörnet når som mest x 111.5, innanför
 *   kantstenen. Slutläge: bakaxel (99.4, 155.6), bil x 88–110, y 114–167,
 *   20 px till A och 13 px till B.
 *
 * Förklaringsrutan längst ned använder samma cirkel som steg 2. "För tidigt"
 * är läget vid 20° i stället för 45°: bakaxel (75.7, 107.4), bilens mitt
 * (70.4, 92.8), högra framhörnet (71.7, 64.2) — fortfarande jämsides med A.
 * Fullt vänsterutslag därifrån ger bakaxelcentrum (33.4, 122.8) och hörnet
 * går radie 70 in i A:s vänstra sida vid ungefär (90.7, 82.7). Från 45°-läget
 * går samma radie-70-båge runt (54.4, 155.6) och förbi A:s hörn.
 *
 * Panelerna ligger i grupper med translate; alla koordinater ovan är lokala.
 */

function Bil({
  cx,
  cy,
  rotate,
  fill,
  stroke,
  nose,
  opacity = 1,
}: {
  cx: number;
  cy: number;
  rotate: number;
  fill: string;
  stroke: string;
  nose: string;
  opacity?: number;
}) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate})`} opacity={opacity}>
      <rect x="-14" y="11" width="4" height="9" rx="1" className={nose} />
      <rect x="10" y="11" width="4" height="9" rx="1" className={nose} />
      <rect x="-14" y="-20" width="4" height="9" rx="1" className={nose} />
      <rect x="10" y="-20" width="4" height="9" rx="1" className={nose} />
      <rect x="-11" y="-26.5" width="22" height="53" rx="3" fill={fill} className={stroke} strokeWidth="2" />
      <polygon points="-7,-18 0,-25 7,-18" className={nose} />
    </g>
  );
}

const egen = { fill: 'url(#fp-dots)', stroke: 'stroke-attention-600', nose: 'fill-attention-600' };
const parkerad = { fill: 'url(#fp-stripes)', stroke: 'stroke-primary-600', nose: 'fill-primary-600' };

/** Körbana med kantsten till höger samt de två parkerade bilarna A och B. */
function Gata() {
  return (
    <g>
      <rect x="10" y="0" width="106" height="240" className="fill-diagram-road" />
      <rect x="116" y="0" width="14" height="240" className="fill-diagram-edge" opacity="0.35" />
      <line x1="10" y1="0" x2="10" y2="240" className="stroke-diagram-edge" strokeWidth="1.5" />
      <line x1="116" y1="0" x2="116" y2="240" className="stroke-diagram-edge" strokeWidth="3" />
      <Bil cx={101} cy={66.5} rotate={0} {...parkerad} />
      <Bil cx={101} cy={206.5} rotate={0} {...parkerad} />
      <text x="101" y="30" textAnchor="middle" className="fill-text-secondary text-[13px]">
        A
      </text>
      <text x="101" y="238" textAnchor="middle" className="fill-text-secondary text-[13px]">
        B
      </text>
    </g>
  );
}

/** Utsnitt av gatan kring A, till förklaringsrutan: samma lokala koordinater. */
function Utsnitt() {
  return (
    <g>
      <rect x="10" y="30" width="106" height="120" className="fill-diagram-road" />
      <rect x="116" y="30" width="14" height="120" className="fill-diagram-edge" opacity="0.35" />
      <line x1="10" y1="30" x2="10" y2="150" className="stroke-diagram-edge" strokeWidth="1.5" />
      <line x1="116" y1="30" x2="116" y2="150" className="stroke-diagram-edge" strokeWidth="3" />
      <Bil cx={101} cy={66.5} rotate={0} {...parkerad} />
      <text x="123" y="71" textAnchor="middle" className="fill-text-secondary text-[13px]">
        A
      </text>
    </g>
  );
}

/** Fylld siffra, som i hänvisningarna i vänstersvängsbilden. */
function Siffra({ n, x, y }: { n: number; x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="11" className="fill-text-primary" />
      <text x={x} y={y + 5} textAnchor="middle" className="fill-surface-base text-[13px] font-semibold">
        {n}
      </text>
    </g>
  );
}

/** Tunn hänvisningslinje som slutar i en punkt på det den pekar på. */
function Pekare({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-text-tertiary" strokeWidth="1.5" />
      <circle cx={x2} cy={y2} r="3" className="fill-text-tertiary" />
    </g>
  );
}

export function FickparkeringDiagram() {
  return (
    <svg
      viewBox="0 0 480 912"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="fp-title fp-desc"
    >
      <title id="fp-title">Fickparkering i tre steg</title>
      <desc id="fp-desc">
        Tre smala bilder sida vid sida, numrerade 1 till 3 från vänster, av samma gata sedd
        uppifrån. Färdriktningen är uppåt och kantstenen ligger till höger. Två parkerade bilar med
        diagonalt randmönster står längs kanten: A överst och B nederst, med en lucka emellan. Din
        bil har prickmönster och en fylld nos som visar vart den pekar. Varje steg har en fylld
        siffra till vänster om gatan med en tunn linje till det siffran syftar på. Steg 1: din bil
        står jämsides med A, ungefär en halvmeter ut, och siffran pekar på en streckad
        referenslinje: din bakaxel i höjd med A:s bakkant. Steg 2: ratten fullt åt höger och bilen
        backar i krypfart tills den står i ungefär 45 grader med nosen snett ut i gatan; en
        streckad röd pil visar bakkantens väg in mot luckan. Siffran pekar på ditt högra
        framhörn, som fortfarande ligger klart till vänster om A. Steg 3: när framhörnet går fritt
        från A vrids ratten fullt åt vänster och bilen backar in tills den står parallellt med
        kanten; en streckad grön pil visar bakkantens väg. Bilen slutar rakt i luckan med avstånd
        både till A och B. Under bilderna finns en teckenförklaring, de tre stegen med
        referenspunkter, att de är körteknik, samt regeln att du har väjningsplikt när du sedan
        kör ut från platsen. Längst ned en förklaringsruta med två små utsnitt kring A: till
        vänster har framhörnet gått fritt och en grön båge visar att det svänger förbi A:s hörn,
        markerat med en bock; till höger vrids ratten för tidigt, medan framhörnet ännu är
        jämsides med A, och en röd båge visar att hörnet svänger in i A:s sida, markerat med ett
        kryss.
      </desc>

      <defs>
        <pattern id="fp-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
        </pattern>
        <pattern id="fp-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="2" />
        </pattern>
        <marker
          id="fp-arrow-right"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-safety-600" />
        </marker>
        <marker
          id="fp-arrow-left"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-progress-600" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="36" className="fill-text-primary text-[20px] font-semibold">
        Fickparkering
      </text>
      <text x="20" y="58" className="fill-text-secondary text-[13px]">
        Backa in längs kanten: jämsides, fullt höger, fullt vänster
      </text>

      {/* Steg 1: jämsides med A, bakaxel i höjd med A:s bakkant */}
      <g transform="translate(24 96)">
        <Gata />
        {/* Referenslinje: A:s bakkant y 93, din bakaxel y 92 */}
        <line
          x1="40"
          y1="93"
          x2="114"
          y2="93"
          className="stroke-text-primary"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <Bil cx={73} cy={76.5} rotate={0} {...egen} />
        <Siffra n={1} x={-14} y={93} />
        <Pekare x1={-2} y1={93} x2={36} y2={93} />
        <text x="65" y="266" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
          Jämsides, ½ m ut
        </text>
        <text x="65" y="284" textAnchor="middle" className="fill-text-secondary text-[13px]">
          bakaxel i höjd med A
        </text>
      </g>

      {/* Steg 2: fullt höger, backa till ungefär 45 grader */}
      <g transform="translate(184 96)">
        <Gata />
        <Bil cx={73} cy={76.5} rotate={0} {...egen} opacity={0.35} />
        {/* Bakkantens väg: radie 46.3 runt (118, 92) */}
        <path
          d="M 73 103 A 46.3 46.3 0 0 0 94 131.6"
          className="fill-none stroke-safety-600"
          strokeWidth="2.5"
          strokeDasharray="7 5"
          markerEnd="url(#fp-arrow-right)"
        />
        <Bil cx={75.2} cy={112.8} rotate={-45} {...egen} />
        {/* Högra framhörnet (64.3, 86.3) mot A:s bakre vänstra hörn (90, 93) */}
        <circle cx="64.3" cy="86.3" r="4" className="fill-none stroke-safety-600" strokeWidth="2" />
        <Siffra n={2} x={-14} y={70} />
        <Pekare x1={-2} y1={72} x2={57} y2={83} />
        <text x="65" y="266" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
          Ratt fullt höger
        </text>
        <text x="65" y="284" textAnchor="middle" className="fill-text-secondary text-[13px]">
          backa till ≈ 45°
        </text>
      </g>

      {/* Steg 3: framhörnet fritt, fullt vänster, backa in parallellt */}
      <g transform="translate(344 96)">
        <Gata />
        <Bil cx={75.2} cy={112.8} rotate={-45} {...egen} opacity={0.35} />
        {/* Bakkantens väg: radie 46.3 runt (54.4, 155.6) */}
        <path
          d="M 94 131.6 A 46.3 46.3 0 0 1 99.4 166.6"
          className="fill-none stroke-progress-600"
          strokeWidth="2.5"
          strokeDasharray="7 5"
          markerEnd="url(#fp-arrow-left)"
        />
        <Bil cx={99.4} cy={140.1} rotate={0} {...egen} />
        <Siffra n={3} x={-14} y={142} />
        <Pekare x1={-2} y1={142} x2={84} y2={143} />
        <text x="65" y="266" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
          Ratt fullt vänster
        </text>
        <text x="65" y="284" textAnchor="middle" className="fill-text-secondary text-[13px]">
          backa in parallellt
        </text>
      </g>

      {/* Teckenförklaring */}
      <g transform="translate(24 404)">
        <rect width="16" height="12" fill="url(#fp-dots)" className="stroke-attention-600" strokeWidth="1.5" />
        <text x="22" y="10" className="fill-text-secondary text-[13px]">
          Din bil (prickar)
        </text>
        <rect x="140" width="16" height="12" fill="url(#fp-stripes)" className="stroke-primary-600" strokeWidth="1.5" />
        <text x="162" y="10" className="fill-text-secondary text-[13px]">
          Parkerade bilar (ränder)
        </text>
        <line x1="320" y1="6" x2="350" y2="6" className="stroke-text-secondary" strokeWidth="2.5" strokeDasharray="7 5" />
        <text x="358" y="10" className="fill-text-secondary text-[13px]">
          Bakkantens väg
        </text>
      </g>

      {/* Stegen med referenspunkter */}
      <Siffra n={1} x={30} y={448} />
      <text x="50" y="453" className="fill-text-primary text-[13px] font-medium">
        Stanna jämsides med bilen framför, ungefär en halvmeter ut,
      </text>
      <text x="50" y="471" className="fill-text-primary text-[13px] font-medium">
        med din bakaxel i höjd med dess bakkant.
      </text>

      <Siffra n={2} x={30} y={500} />
      <text x="50" y="505" className="fill-text-primary text-[13px] font-medium">
        Ratten fullt åt höger, backa i krypfart till ungefär 45 grader.
      </text>
      <text x="50" y="523" className="fill-text-primary text-[13px] font-medium">
        Håll koll på ditt högra framhörn mot bilen framför.
      </text>

      <Siffra n={3} x={30} y={552} />
      <text x="50" y="557" className="fill-text-primary text-[13px] font-medium">
        När framhörnet går fritt: ratten fullt åt vänster, backa in
      </text>
      <text x="50" y="575" className="fill-text-primary text-[13px] font-medium">
        tills bilen är parallell. Räta upp och justera fram.
      </text>

      <text x="24" y="606" className="fill-text-secondary text-[13px]">
        Referenspunkterna är körteknik. Stanna, titta runt och gör en plan
      </text>
      <text x="24" y="624" className="fill-text-secondary text-[13px]">
        först. Krypfart och koll runt hela manövern.
      </text>
      <text x="24" y="648" className="fill-text-primary text-[13px] font-medium">
        När du sedan kör ut från platsen har du väjningsplikt (3 kap 21 §).
      </text>

      {/* Förklaringsruta: varför vänsterutslaget väntar tills framhörnet går fritt */}
      <rect x="20" y="672" width="440" height="220" rx="6" className="fill-surface-raised stroke-border-default" strokeWidth="1.5" />
      <text x="36" y="698" className="fill-text-primary text-[14px] font-semibold">
        Vänta med vänsterutslaget tills framhörnet går fritt
      </text>
      <line x1="240" y1="712" x2="240" y2="880" className="stroke-text-tertiary" strokeWidth="2" strokeDasharray="6 5" />

      {/* Utsnitt A: vid 45° har hörnet gått fritt, bågen passerar A:s hörn */}
      <g transform="translate(66 682)">
        <Utsnitt />
        <Bil cx={75.2} cy={112.8} rotate={-45} {...egen} />
        {/* Högra framhörnets väg: radie 70 runt (54.4, 155.6), förbi (90, 93) */}
        <path
          d="M 64.3 86.3 A 70 70 0 0 1 99.4 102"
          className="fill-none stroke-progress-600"
          strokeWidth="2.5"
          markerEnd="url(#fp-arrow-left)"
        />
      </g>
      <path d="M 36 856 l 6 6 l 12 -13" className="fill-none stroke-progress-600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="60" y="860" className="fill-text-primary text-[13px] font-semibold">
        Framhörnet fritt från A:
      </text>
      <text x="60" y="878" className="fill-text-primary text-[13px]">
        sedan fullt vänster
      </text>

      {/* Utsnitt B: vid 20° är hörnet ännu jämsides med A, bågen går in i A */}
      <g transform="translate(286 682)">
        <Utsnitt />
        <Bil cx={70.4} cy={92.8} rotate={-20} {...egen} />
        {/* Högra framhörnets väg: radie 70 runt (33.4, 122.8), in i A vid (90.7, 82.7) */}
        <path
          d="M 71.7 64.2 A 70 70 0 0 1 90.7 82.7"
          className="fill-none stroke-safety-600"
          strokeWidth="2.5"
          markerEnd="url(#fp-arrow-right)"
        />
      </g>
      <path d="M 256 850 L 270 864 M 270 850 L 256 864" className="stroke-safety-600" strokeWidth="3" strokeLinecap="round" />
      <text x="280" y="860" className="fill-text-primary text-[13px] font-semibold">
        Vrider för tidigt:
      </text>
      <text x="280" y="878" className="fill-text-primary text-[13px]">
        framhörnet svänger in i A
      </text>
    </svg>
  );
}
