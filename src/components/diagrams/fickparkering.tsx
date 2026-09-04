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

function Stegnummer({ n, x, y }: { n: number; x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="10" className="fill-none stroke-text-tertiary" strokeWidth="1.5" />
      <text x={x} y={y + 5} textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        {n}
      </text>
    </g>
  );
}

export function FickparkeringDiagram() {
  return (
    <svg
      viewBox="0 0 400 520"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="fp-title fp-desc"
    >
      <title id="fp-title">Fickparkering i tre steg</title>
      <desc id="fp-desc">
        Tre smala bilder sida vid sida, numrerade 1 till 3 från vänster, av samma gata sedd
        uppifrån. Färdriktningen är uppåt och kantstenen ligger till höger. Två parkerade bilar med
        diagonalt randmönster står längs kanten: A överst och B nederst, med en lucka emellan. Din
        bil har prickmönster och en fylld nos som visar vart den pekar. Steg 1: din bil står
        jämsides med A, ungefär en halvmeter ut, och en streckad linje visar referenspunkten: din
        bakaxel i höjd med A:s bakkant. Steg 2: ratten fullt åt höger och bilen backar i krypfart
        tills den står i ungefär 45 grader med nosen snett ut i gatan; en streckad röd pil visar
        bakkantens väg in mot luckan. Ditt högra framhörn ligger fortfarande klart till vänster om
        A. Steg 3: när framhörnet går fritt från A vrids ratten fullt åt vänster och bilen backar
        in tills den står parallellt med kanten; en streckad grön pil visar bakkantens väg. Bilen
        slutar rakt i luckan med avstånd både till A och B. Under bilderna står de tre stegen med
        referenspunkter, att de är körteknik, samt regeln att du har väjningsplikt när du sedan
        kör ut från platsen.
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

      <text x="200" y="20" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Fickparkering: jämsides, fullt höger, fullt vänster
      </text>

      {/* Steg 1: jämsides med A, bakaxel i höjd med A:s bakkant */}
      <g transform="translate(0 40)">
        <Gata />
        <Stegnummer n={1} x={24} y={14} />
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
        <text x="12" y="112" className="fill-text-primary text-[13px] font-medium">
          Bakaxel
        </text>
        <text x="12" y="128" className="fill-text-primary text-[13px] font-medium">
          i höjd med
        </text>
        <text x="12" y="144" className="fill-text-primary text-[13px] font-medium">
          A:s bakkant
        </text>
        <text x="65" y="262" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
          Jämsides, ½ m ut
        </text>
      </g>

      {/* Steg 2: fullt höger, backa till ungefär 45 grader */}
      <g transform="translate(135 40)">
        <Gata />
        <Stegnummer n={2} x={24} y={14} />
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
        <text x="12" y="160" className="fill-text-primary text-[13px] font-medium">
          ≈ 45°
        </text>
        <text x="12" y="176" className="fill-text-primary text-[13px] font-medium">
          Koll på
        </text>
        <text x="12" y="192" className="fill-text-primary text-[13px] font-medium">
          framhörnet
        </text>
        <text x="65" y="262" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
          Ratt fullt höger
        </text>
      </g>

      {/* Steg 3: framhörnet fritt, fullt vänster, backa in parallellt */}
      <g transform="translate(270 40)">
        <Gata />
        <Stegnummer n={3} x={24} y={14} />
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
        <text x="12" y="184" className="fill-text-primary text-[13px] font-medium">
          Parallell,
        </text>
        <text x="12" y="200" className="fill-text-primary text-[13px] font-medium">
          räta upp,
        </text>
        <text x="12" y="216" className="fill-text-primary text-[13px] font-medium">
          justera
        </text>
        <text x="65" y="262" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
          Ratt fullt vänster
        </text>
      </g>

      {/* Stegen med referenspunkter */}
      <text x="20" y="330" className="fill-text-primary text-[13px] font-medium">
        1. Stanna jämsides med bilen framför, ungefär en halvmeter ut,
      </text>
      <text x="20" y="348" className="fill-text-primary text-[13px] font-medium">
        med din bakaxel i höjd med dess bakkant.
      </text>
      <text x="20" y="372" className="fill-text-primary text-[13px] font-medium">
        2. Ratten fullt åt höger, backa i krypfart till ungefär 45 grader.
      </text>
      <text x="20" y="390" className="fill-text-primary text-[13px] font-medium">
        Håll koll på ditt högra framhörn mot bilen framför.
      </text>
      <text x="20" y="414" className="fill-text-primary text-[13px] font-medium">
        3. När framhörnet går fritt: ratten fullt åt vänster, backa in tills
      </text>
      <text x="20" y="432" className="fill-text-primary text-[13px] font-medium">
        bilen är parallell. Räta upp och justera fram.
      </text>
      <text x="20" y="458" className="fill-text-secondary text-[13px]">
        Referenspunkterna är körteknik. Stanna, titta runt och gör en plan
      </text>
      <text x="20" y="476" className="fill-text-secondary text-[13px]">
        först. Krypfart och koll runt hela manövern. När du sedan kör ut
      </text>
      <text x="20" y="494" className="fill-text-secondary text-[13px]">
        från platsen har du väjningsplikt (3 kap 21 §).
      </text>

      {/* Teckenförklaring */}
      <g transform="translate(20 504)">
        <rect width="16" height="12" fill="url(#fp-dots)" className="stroke-attention-600" strokeWidth="1.5" />
        <text x="22" y="10" className="fill-text-tertiary text-[13px]">
          Din bil (prickar)
        </text>
        <rect x="150" width="16" height="12" fill="url(#fp-stripes)" className="stroke-primary-600" strokeWidth="1.5" />
        <text x="172" y="10" className="fill-text-tertiary text-[13px]">
          Parkerade bilar (ränder)
        </text>
      </g>
    </svg>
  );
}
