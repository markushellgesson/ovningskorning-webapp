/**
 * Vändning (MAN-09) — trepunktsvändning i tre steg. Tekniken är körteknik;
 * regeln i momentet är att vändningen får ske endast utan fara eller hinder
 * för andra vägtrafikanter, och att tecken ges innan manövern börjar.
 *
 * Skala 12 px = 1 m. Kaross 22 × 53 px, hjulbas 31 px, bakaxeln 11 px fram
 * om bakre kanten, nosen 42 px fram om bakaxeln. Bakaxelns radie vid fullt
 * rattutslag 48 px (4,0 m), styrvinkel 32,9°.
 *
 * Geometri (högertrafik, vy uppifrån). Varje steg ligger i en grupp med
 * translate(92 …); koordinaterna nedan är gruppens lokala. Vägen går
 * vågrätt, körbana y 36–140 (8,67 m), mittlinje y 88, kantstenar y 36 och
 * y 140.
 * - Utgångsläge: du kör åt öster. Kör man åt höger i bilden är den egna
 *   högra sidan bildens nedre, så du ligger i det södra körfältet y 88–140:
 *   kaross y 105–127.
 * - Steg 1, framåt med fullt vänsterutslag: bakaxeln går radie 48 kring
 *   (100, 68) och stannar vid kursen 58,01°, bakaxel (140,71 , 93,43).
 *   Främre vänstra hörnet ligger då i (153,6 , 52,0) — 16,0 px från den
 *   norra kantstenen.
 * - Steg 2, backning med fullt utslag åt motsatt håll: bakaxeln går radie 48
 *   kring (181,42 , 118,87) från kursen 58,01° till 90,00°. Utslaget hålls
 *   hela backningen; ingen uppriktning sker här. Stoppläge: bakaxel
 *   (133,42 , 118,87), bilen står tvärs vägen och bakre hörnet ligger i
 *   y 129,9 — 10,1 px från den södra kantstenen, och det är också den
 *   minsta marginalen någonstans i bågen.
 * - Steg 3, framåt med utslag åt första hållet igen: bakaxeln går radie 48
 *   kring (85,42 , 118,87) från kursen 90° till 180°. Karossen kommer som
 *   närmast y 46,44 vid kursen 144,6° — 10,44 px från den norra kantstenen.
 *   Slutläge: bakaxel (85,42 , 70,87), kaross y 59,9–81,9. Kör man åt väster
 *   är den egna högra sidan bildens övre, så norra körfältet y 36–88 är rätt
 *   körfält. Ratten rätas upp först här, när bilen körs ut.
 *
 * Mönster: prickar = din bil. Heldragen linje = nosens väg i steget,
 * vridna framhjul = rattutslaget. Varje panel visar ett enda fordonsläge —
 * resultatet av steget — så att inga två lägen överlappar. Förklaringsrutan
 * använder samma lokala koordinater i skala 0,7 och jämför stoppläget när
 * utslaget hålls (kurs 90°, tvärs) med läget när ratten rätas upp mitt i
 * backningen (kurs 74°, bakre hörnet vid kantstenen efter 21,6 px rak
 * backning).
 */

/**
 * Bil ritad med fronten uppåt och sedan vriden. Hjulen är egna rektanglar,
 * så att framhjulen kan vridas kring sin egen mitt och visa rattutslaget.
 */
function Bil({
  cx,
  cy,
  rot,
  steer = 0,
  blinkerLeft,
}: {
  cx: number;
  cy: number;
  rot: number;
  steer?: number;
  blinkerLeft?: boolean;
}) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rot})`}>
      <g className="fill-text-primary">
        <rect x="-14" y="-20" width="4" height="9" rx="1" transform={`rotate(${steer} -12 -15.5)`} />
        <rect x="10" y="-20" width="4" height="9" rx="1" transform={`rotate(${steer} 12 -15.5)`} />
        <rect x="-14" y="11" width="4" height="9" rx="1" />
        <rect x="10" y="11" width="4" height="9" rx="1" />
      </g>
      <rect x="-11" y="-26.5" width="22" height="53" rx="3" className="fill-surface-base" />
      <rect
        x="-11"
        y="-26.5"
        width="22"
        height="53"
        rx="3"
        fill="url(#vd-dots)"
        className="stroke-attention-600"
        strokeWidth="2"
      />
      <polygon points="-7,-17 0,-24 7,-17" className="fill-attention-600" />
      {blinkerLeft && (
        <g className="stroke-attention-600" strokeWidth="2" strokeLinecap="round">
          <circle cx="-11" cy="-23" r="2.5" className="fill-attention-600" />
          <circle cx="-11" cy="23" r="2.5" className="fill-attention-600" />
          <line x1="-15" y1="-27" x2="-20" y2="-32" />
          <line x1="-16" y1="-23" x2="-22" y2="-23" />
          <line x1="-15" y1="-19" x2="-20" y2="-14" />
          <line x1="-16" y1="23" x2="-22" y2="23" />
        </g>
      )}
    </g>
  );
}

/** Vägstycke: körbana 360 × 104 med kantsten upptill och nedtill. */
function Vag() {
  return (
    <g>
      <rect x="-72" y="36" width="360" height="104" className="fill-diagram-road" />
      <line x1="-72" y1="36" x2="288" y2="36" className="stroke-diagram-edge" strokeWidth="3" />
      <line x1="-72" y1="140" x2="288" y2="140" className="stroke-diagram-edge" strokeWidth="3" />
      <line
        x1="-72"
        y1="88"
        x2="288"
        y2="88"
        className="stroke-diagram-marking"
        strokeWidth="2"
        strokeDasharray="10 8"
      />
    </g>
  );
}

/** Numrerat steg: mörk cirkel med siffra. */
function Steg({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="11" className="fill-text-primary" />
      <text x={x} y={y + 5} textAnchor="middle" className="fill-surface-base text-[13px] font-semibold">
        {n}
      </text>
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
 * Samma väg i skala 0,7 för förklaringsrutan, i huvudbildens lokala
 * koordinater (utsnitt x 60–260, y 36–140). Vänster: utslaget hållet hela
 * backningen, kurs 90°. Höger: ratten uppriktad mitt i backningen, kurs 74°
 * och bakre hörnet redan vid kantstenen.
 */
function MiniVag({ x, y, variant }: { x: number; y: number; variant: 'hallet' | 'uppriktat' }) {
  const held = variant === 'hallet';
  return (
    <g transform={`translate(${x} ${y}) scale(0.7) translate(-60 -36)`}>
      <rect x="60" y="36" width="200" height="104" className="fill-diagram-road" />
      <line x1="60" y1="36" x2="260" y2="36" className="stroke-diagram-edge" strokeWidth="4" />
      <line x1="60" y1="140" x2="260" y2="140" className="stroke-diagram-edge" strokeWidth="4" />
      <line x1="60" y1="88" x2="260" y2="88" className="stroke-diagram-marking" strokeWidth="3" strokeDasharray="12 10" />
      {held ? (
        <Bil cx={133.42} cy={103.37} rot={0} steer={28} />
      ) : (
        <Bil cx={133.59} cy={111.5} rot={16} steer={0} />
      )}
    </g>
  );
}

export function VandningDiagram() {
  return (
    <svg
      viewBox="0 0 400 996"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="vd-title vd-desc"
    >
      <title id="vd-title">Trepunktsvändning i tre steg</title>
      <desc id="vd-desc">
        Tre panelbilder ovanför varandra, alla sedda uppifrån. I varje panel går vägen vågrätt med
        kantsten upptill och nedtill och en streckad mittlinje. Din bil är fylld med prickmönster
        och har en fylld nosspets; framhjulen är ritade som egna rektanglar och står vridna åt det
        håll ratten är vriden. En heldragen linje med pil visar nosens väg genom steget. Panel 1:
        bilen står i sitt högra körfält med blinkande tecken markerat som strålar vid vänster fram-
        och bakhörn — tecknet ges innan bilen rör sig. Sedan kör den fram med framhjulen vridna åt
        vänster tills framvagnen närmar sig den motsatta kantstenen. Panel 2: bilen backar med
        framhjulen vridna åt motsatt håll. Hjulen står kvar vridna åt det hållet under hela
        backningen, och bilen slutar stå tvärs över vägen. Panel 3: bilen kör fram med hjulen
        vridna åt första hållet igen och slutar med nosen åt vänster i det körfält som är höger
        körfält för den riktningen. Först här rätas ratten upp. Under panelerna står regeln: du får
        vända endast om det kan ske utan fara eller hinder för andra vägtrafikanter, och
        skyldigheten ligger på dig som vänder. Längst ned en ruta med två små bilder av samma väg:
        till vänster hålls utslaget hela backningen och bilen står tvärs, markerat med en bock;
        till höger har ratten rätats upp mitt i backningen, bilen har backat rakt mot kantstenen
        och står kvar snett, markerat med ett kryss.
      </desc>

      <defs>
        <pattern id="vd-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <marker id="vd-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-attention-600" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Trepunktsvändning i tre steg
      </text>
      <text x="20" y="48" className="fill-text-secondary text-[13px]">
        Tecken först — och utslaget hålls hela backningen
      </text>

      {/* Teckenförklaring */}
      <g>
        <path d="M 20 76 L 48 76" className="stroke-attention-600" strokeWidth="3" markerEnd="url(#vd-arrow)" />
        <text x="56" y="81" className="fill-text-secondary text-[13px]">
          Nosens väg
        </text>
        <g transform="translate(176 76)">
          <rect x="-6" y="-9" width="12" height="18" rx="2" fill="url(#vd-dots)" className="stroke-attention-600" strokeWidth="1.5" />
          <rect x="-9" y="-9" width="3" height="6" rx="1" className="fill-text-primary" transform="rotate(-28 -7.5 -6)" />
          <rect x="6" y="-9" width="3" height="6" rx="1" className="fill-text-primary" transform="rotate(-28 7.5 -6)" />
        </g>
        <text x="192" y="81" className="fill-text-secondary text-[13px]">
          Framhjulen visar utslaget
        </text>
      </g>

      {/* ------- Steg 1 ------- */}
      <Steg x={31} y={104} n={1} />
      <text x="50" y="109" className="fill-text-primary text-[14px] font-semibold">
        Tecken först — sedan fram åt vänster
      </text>
      <text x="20" y="128" className="fill-text-secondary text-[13px]">
        Fullt vänsterutslag. Titta runt hela bilen innan
      </text>
      <text x="20" y="146" className="fill-text-secondary text-[13px]">
        den rör sig, och kör i krypfart tills framvagnen
      </text>
      <text x="20" y="164" className="fill-text-secondary text-[13px]">
        närmar sig den motsatta kanten.
      </text>
      <g transform="translate(92 140)">
        <Vag />
        <Bil cx={85} cy={116} rot={90} steer={0} blinkerLeft />
        <Bil cx={148.92} cy={80.29} rot={31.99} steer={-28} />
        <path
          d="M 111.5 116 L 142 116 A 63.78 63.78 0 0 0 162.97 57.81"
          className="fill-none stroke-attention-600"
          strokeWidth="2.5"
          markerEnd="url(#vd-arrow)"
        />
      </g>

      {/* ------- Steg 2 ------- */}
      <Steg x={31} y={306} n={2} />
      <text x="50" y="311" className="fill-text-primary text-[14px] font-semibold">
        Backa med fullt utslag åt motsatt håll
      </text>
      <text x="20" y="330" className="fill-text-secondary text-[13px]">
        Ratten hålls kvar åt det hållet hela backningen.
      </text>
      <text x="20" y="348" className="fill-text-secondary text-[13px]">
        Ingenting rätas upp här. Vrid dig om och titta.
      </text>
      <g transform="translate(92 322)">
        <Vag />
        <Bil cx={133.42} cy={103.37} rot={0} steer={28} />
        <circle cx="162.97" cy="57.81" r="3.5" className="fill-none stroke-attention-600" strokeWidth="2" />
        <path
          d="M 162.97 57.81 A 63.78 63.78 0 0 0 133.42 76.87"
          className="fill-none stroke-attention-600"
          strokeWidth="2.5"
          markerEnd="url(#vd-arrow)"
        />
      </g>

      {/* ------- Steg 3 ------- */}
      <Steg x={31} y={488} n={3} />
      <text x="50" y="493" className="fill-text-primary text-[14px] font-semibold">
        Fram med utslag åt första hållet igen
      </text>
      <text x="20" y="512" className="fill-text-secondary text-[13px]">
        Ratten rätas upp först nu, när bilen körs ut.
      </text>
      <text x="20" y="530" className="fill-text-secondary text-[13px]">
        Vänta tills körbanan är fri åt båda håll.
      </text>
      <g transform="translate(92 504)">
        <Vag />
        <Bil cx={69.92} cy={70.87} rot={-90} steer={-28} />
        <circle cx="133.42" cy="76.87" r="3.5" className="fill-none stroke-attention-600" strokeWidth="2" />
        <path
          d="M 133.42 76.87 A 63.78 63.78 0 0 0 43.42 70.87"
          className="fill-none stroke-attention-600"
          strokeWidth="2.5"
          markerEnd="url(#vd-arrow)"
        />
      </g>

      {/* Regeltext */}
      <text x="200" y="676" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        Du får vända endast om det kan ske utan fara
      </text>
      <text x="200" y="696" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        eller hinder för andra vägtrafikanter.
      </text>
      <text x="200" y="720" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Skyldigheten ligger på dig som vänder.
      </text>
      <text x="200" y="738" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Tecknet befriar dig inte från att försäkra dig.
      </text>
      <text x="200" y="756" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Välj plats med fri sikt och håll krypfart.
      </text>

      {/* Förklaringsruta: utslaget under backningen */}
      <rect x="20" y="780" width="360" height="196" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="34" y="804" className="fill-text-primary text-[13px] font-semibold">
        Under backningen i steg 2:
      </text>
      <line x1="200" y1="818" x2="200" y2="968" className="stroke-border-default" strokeWidth="1.5" strokeDasharray="6 4" />

      <MiniVag x={40} y={824} variant="hallet" />
      <text x="110" y="916" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Utslaget hålls kvar
      </text>
      <text x="110" y="932" textAnchor="middle" className="fill-text-secondary text-[13px]">
        bilen kommer tvärs
      </text>
      <Check x={110} y={954} />

      <MiniVag x={220} y={824} variant="uppriktat" />
      <text x="290" y="916" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Ratten rätas upp här
      </text>
      <text x="290" y="932" textAnchor="middle" className="fill-text-secondary text-[13px]">
        bilen backar mot kanten
      </text>
      <Cross x={290} y={954} />
    </svg>
  );
}
