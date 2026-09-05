/**
 * Fickparkering (MAN-10) — inparkering mellan två stillastående bilar i tre
 * steg, med de referenspunkter man styr efter, samt väjningsplikten när
 * bilen sedan lämnar platsen.
 *
 * Skala 12 px = 1 m. Kaross 22 × 53 px (1,8 × 4,4 m), hjulbas 31 px,
 * bakaxeln 11 px fram om bakre kanten, nosen 42 px fram om bakaxeln.
 * Bakaxelns radie vid fullt rattutslag 48 px (4,0 m), vilket svarar mot
 * styrvinkeln 32,9°.
 *
 * Geometri (högertrafik, vy uppifrån). Gatan går vågrätt i varje panel,
 * lokal koordinat: körbana y 0–132, mittlinje y 66, kantsten y 132.
 * Färdriktningen är åt höger (öster).
 * - Du kör åt höger i bilden. Din högra sida är då bildens nedre, så du
 *   och de parkerade bilarna ligger i den södra halvan y 66–132. Samtliga
 *   fordon i bilden kör eller står med nosen åt öster och ligger i den
 *   halvan; det norra körfältet y 0–66 är mötande och lämnas tomt.
 * - Bilen framför luckan x 210–263, bilen bakom x 61–114, båda y 104–126,
 *   alltså 6 px från kantstenen. Luckan är 96 px lång mot bilens 53.
 * - Steg 1: du står jämsides, kaross x 200,6–253,6, y 72–94. Din bakaxel
 *   ligger i x 211,6 och den framförvarande bilens bakre kant i x 210 —
 *   1,55 px isär, alltså i praktiken mitt för varandra. Det är
 *   referenspunkten.
 * - Steg 2: fullt utslag mot kanten. Bakaxeln går en cirkel med radie 48
 *   kring (211,6 , 131) och stannar vid 48,19°, bakaxel (175,8 , 99).
 *   Vänster ytterspegel ligger då i (185,6 , 71,5) och den bakre bilens
 *   främre vänstra hörn i (114, 104) — siktlinjen mellan dem är den andra
 *   referenspunkten.
 * - Steg 3: fullt motsatt utslag, bakaxeln går kring (140, 67) till
 *   (140, 115). Slutläge: kaross x 129–182, y 104–126; 15 px till bilen
 *   bakom, 28 px till bilen framför, 6 px till kantstenen.
 * - Efterräknat längs hela banan: minsta avstånd till bilen framför
 *   6,75 px (0,56 m, inträffar i andra bågen vid 26,7°), till bilen bakom
 *   15 px, och bakvagnen kommer aldrig närmare kantstenen än 4,98 px.
 *   Framvagnen sveper som mest 7,42 px norr om mittlinjen — den
 *   utsvängningen ritas som den är, liten men verklig.
 *
 * Mönster: prickar = din bil, diagonala ränder = andra fordon. Heldragen
 * linje = bakaxelns väg i steget, streckad = framvagnens svep, prickad =
 * referenspunkt. Förklaringsrutan ritar samma gata i halv skala: du står
 * kvar i luckan y 104–126 och fordonet bakifrån kör åt öster i den södra
 * halvan, väster om dig — samma körfält och samma riktning som i
 * huvudbilden.
 */

/** Bil ritad med fronten uppåt och sedan vriden. Kaross 22 × 53, hjulen sticker ut 3 px. */
function Bil({
  cx,
  cy,
  rot,
  fill,
  stroke,
  nose,
  brakeLights,
}: {
  cx: number;
  cy: number;
  rot: number;
  fill: string;
  stroke: string;
  nose: string;
  brakeLights?: boolean;
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
      {/* Nosen: fylld spets som visar vart bilen pekar */}
      <polygon points="-7,-17 0,-24 7,-17" className={nose} />
      {brakeLights && (
        <g className="fill-safety-600">
          <rect x="-9" y="25" width="6" height="3" />
          <rect x="3" y="25" width="6" height="3" />
        </g>
      )}
    </g>
  );
}

/** Gatustycke: körbana 360 × 132, kantsten och trottoar nedtill, mittlinje i y 66. */
function Gata() {
  return (
    <g>
      <rect x="0" y="0" width="360" height="132" className="fill-diagram-road" />
      <rect x="0" y="132" width="360" height="14" className="fill-diagram-edge" opacity="0.3" />
      <line x1="0" y1="0" x2="360" y2="0" className="stroke-diagram-edge" strokeWidth="2" />
      <line x1="0" y1="132" x2="360" y2="132" className="stroke-diagram-edge" strokeWidth="3" />
      <line
        x1="0"
        y1="66"
        x2="360"
        y2="66"
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
 * Samma gata i halv skala för förklaringsrutan: du står i luckan (y 104–126,
 * södra halvan) och ett fordon närmar sig bakifrån i samma körfält och
 * samma riktning, väster om dig.
 */
function MiniUtfart({ x, y, variant }: { x: number; y: number; variant: 'vantar' | 'kor-ut' }) {
  const waits = variant === 'vantar';
  return (
    <g transform={`translate(${x} ${y}) scale(0.5)`}>
      <rect x="0" y="40" width="300" height="92" className="fill-diagram-road" />
      <rect x="0" y="132" width="300" height="14" className="fill-diagram-edge" opacity="0.3" />
      <line x1="0" y1="132" x2="300" y2="132" className="stroke-diagram-edge" strokeWidth="3" />
      <line x1="0" y1="66" x2="300" y2="66" className="stroke-diagram-marking" strokeWidth="3" strokeDasharray="12 10" />
      {/* Parkerade bilar och du mellan dem */}
      <Bil cx={87.5} cy={115} rot={90} fill="url(#fp-stripes)" stroke="stroke-primary-600" nose="fill-primary-600" />
      <Bil cx={236.5} cy={115} rot={90} fill="url(#fp-stripes)" stroke="stroke-primary-600" nose="fill-primary-600" />
      <Bil cx={155.5} cy={115} rot={90} fill="url(#fp-dots)" stroke="stroke-attention-600" nose="fill-attention-600" brakeLights={waits} />
      {/* Fordon bakifrån: samma körfält, samma riktning, väster om dig */}
      <Bil cx={110} cy={83} rot={90} fill="url(#fp-stripes)" stroke="stroke-primary-600" nose="fill-primary-600" />
      <path
        d={waits ? 'M 138 83 L 262 83' : 'M 138 83 L 206 83'}
        className="stroke-primary-600"
        strokeWidth="5"
        markerEnd="url(#fp-arrow-other)"
      />
      {!waits && (
        <path
          d="M 184 112 C 220 108 226 96 232 84"
          className="fill-none stroke-attention-600"
          strokeWidth="5"
          strokeDasharray="10 8"
          markerEnd="url(#fp-arrow-you)"
        />
      )}
    </g>
  );
}

export function FickparkeringDiagram() {
  return (
    <svg
      viewBox="0 0 400 1168"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="fp-title fp-desc"
    >
      <title id="fp-title">Fickparkering i tre steg</title>
      <desc id="fp-desc">
        Tre panelbilder ovanför varandra, alla sedda uppifrån. I varje panel går gatan vågrätt med
        en streckad mittlinje och en kantsten med trottoar nedtill. Färdriktningen är åt höger.
        Två stillastående bilar, fyllda med diagonala ränder, står vid kantstenen med en lucka
        mellan sig som är tydligt längre än en bil. Din bil är fylld med prickmönster och har en
        fylld nosspets som visar vart den pekar. Panel 1: du står jämsides med bilen framför,
        med litet mellanrum, och en prickad lodrät referenslinje visar att ditt bakhjul står mitt
        för den bilens bakre hörn. Panel 2: du backar med fullt utslag mot kanten. En heldragen
        linje visar bakaxelns väg in mot luckan och en streckad linje visar hur framvagnen samtidigt
        sveper ut åt motsatt håll, en bit över mittlinjen. En prickad siktlinje går från din
        vänstra ytterspegel till den bakre bilens främre hörn: referenspunkten för att lägga om
        ratten. Panel 3: fullt motsatt utslag, en heldragen linje visar bakaxelns väg och bilen
        står till slut parallellt med kantstenen mellan de två bilarna. Under panelerna står
        regeln: när du sedan kör ut från platsen har du väjningsplikt. Längst ned en ruta med två
        små bilder av samma gata: till vänster väntar du kvar i luckan med bromsljusen tända medan
        ett randigt fordon passerar, markerat med en bock; till höger kör du ut framför fordonet
        och bryter mot väjningsplikten, markerat med ett kryss.
      </desc>

      <defs>
        <pattern id="fp-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="fp-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="2" />
        </pattern>
        <marker id="fp-arrow-you" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-attention-600" />
        </marker>
        <marker id="fp-arrow-other" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary-600" />
        </marker>
        <marker id="fp-arrow-note" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-text-tertiary" />
        </marker>
        <marker id="fp-arrow-sweep" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-safety-600" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Fickparkering i tre steg
      </text>
      <text x="20" y="48" className="fill-text-secondary text-[13px]">
        Teknik i tre steg — och regeln när du kör ut igen
      </text>

      {/* Teckenförklaring */}
      <g>
        <path d="M 20 76 L 48 76" className="stroke-attention-600" strokeWidth="3" markerEnd="url(#fp-arrow-you)" />
        <text x="56" y="81" className="fill-text-secondary text-[13px]">
          Bakaxelns väg
        </text>
        <path
          d="M 168 76 L 196 76"
          className="stroke-safety-600"
          strokeWidth="3"
          strokeDasharray="7 5"
          markerEnd="url(#fp-arrow-sweep)"
        />
        <text x="204" y="81" className="fill-text-secondary text-[13px]">
          Framvagnens svep
        </text>
        <line
          x1="20"
          y1="96"
          x2="48"
          y2="96"
          className="stroke-text-tertiary"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="0.5 6"
        />
        <text x="56" y="101" className="fill-text-secondary text-[13px]">
          Referenspunkt
        </text>
        <text x="272" y="101" className="fill-text-secondary text-[13px]">
          Färdriktning
        </text>
        <line
          x1="358"
          y1="96"
          x2="378"
          y2="96"
          className="stroke-text-tertiary"
          strokeWidth="2"
          markerEnd="url(#fp-arrow-note)"
        />
      </g>

      {/* ------- Steg 1: jämsides ------- */}
      <Steg x={31} y={128} n={1} />
      <text x="50" y="133" className="fill-text-primary text-[14px] font-semibold">
        Ställ dig jämsides med bilen framför
      </text>
      <text x="20" y="151" className="fill-text-secondary text-[13px]">
        Litet mellanrum. Referenspunkt: ditt bakhjul mitt
      </text>
      <text x="20" y="169" className="fill-text-secondary text-[13px]">
        för den framförvarande bilens bakre hörn.
      </text>
      <g transform="translate(20 180)">
        <Gata />
        <Bil cx={87.5} cy={115} rot={90} fill="url(#fp-stripes)" stroke="stroke-primary-600" nose="fill-primary-600" />
        <Bil cx={236.5} cy={115} rot={90} fill="url(#fp-stripes)" stroke="stroke-primary-600" nose="fill-primary-600" />
        <Bil cx={227} cy={83} rot={90} fill="url(#fp-dots)" stroke="stroke-attention-600" nose="fill-attention-600" brakeLights />
        {/* Referenslinjen: ditt bakhjul (x 211,6) mot den framförvarande bilens bakre kant (x 210) */}
        <line
          x1="210.8"
          y1="86"
          x2="210.8"
          y2="110"
          className="stroke-text-tertiary"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="0.5 6"
        />
        <circle cx="210.8" cy="92" r="2.5" className="fill-text-tertiary" />
        <circle cx="210.8" cy="104" r="2.5" className="fill-text-tertiary" />
      </g>

      {/* ------- Steg 2: fullt utslag mot kanten ------- */}
      <Steg x={31} y={366} n={2} />
      <text x="50" y="371" className="fill-text-primary text-[14px] font-semibold">
        Fullt utslag mot kanten och backa
      </text>
      <text x="20" y="389" className="fill-text-secondary text-[13px]">
        Referenspunkt: bilen bakom syns i vänster
      </text>
      <text x="20" y="407" className="fill-text-secondary text-[13px]">
        ytterspegel — då lägger du om ratten.
      </text>
      <text x="20" y="425" className="fill-text-secondary text-[13px]">
        Framvagnen sveper samtidigt ut åt motsatt håll.
      </text>
      <g transform="translate(20 436)">
        <Gata />
        <Bil cx={87.5} cy={115} rot={90} fill="url(#fp-stripes)" stroke="stroke-primary-600" nose="fill-primary-600" />
        <Bil cx={236.5} cy={115} rot={90} fill="url(#fp-stripes)" stroke="stroke-primary-600" nose="fill-primary-600" />
        {/* Bakaxelns väg, första bågen. Ihålig ring = där steget börjar */}
        <circle cx="211.55" cy="83" r="3.5" className="fill-none stroke-attention-600" strokeWidth="2" />
        <path
          d="M 211.55 83 A 48 48 0 0 0 175.78 99"
          className="fill-none stroke-attention-600"
          strokeWidth="3"
          markerEnd="url(#fp-arrow-you)"
        />
        {/* Framvagnens svep: yttre främre hörnet, radie 72,4 kring (211,55 , 131) */}
        <circle cx="253.55" cy="72" r="3" className="fill-none stroke-safety-600" strokeWidth="1.5" />
        <path
          d="M 253.55 72 A 72.42 72.42 0 0 0 195.58 60.36"
          className="fill-none stroke-safety-600"
          strokeWidth="2.5"
          strokeDasharray="7 5"
          markerEnd="url(#fp-arrow-sweep)"
        />
        {/* Siktlinje i vänster ytterspegel mot den bakre bilens främre hörn */}
        <line
          x1="185.6"
          y1="71.5"
          x2="115"
          y2="103"
          className="stroke-text-tertiary"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="0.5 6"
        />
        <circle cx="185.6" cy="71.5" r="3" className="fill-text-tertiary" />
        <Bil cx={186.11} cy={87.45} rot={41.81} fill="url(#fp-dots)" stroke="stroke-attention-600" nose="fill-attention-600" />
      </g>

      {/* ------- Steg 3: fullt motsatt utslag ------- */}
      <Steg x={31} y={622} n={3} />
      <text x="50" y="627" className="fill-text-primary text-[14px] font-semibold">
        Fullt motsatt utslag — räta upp
      </text>
      <text x="20" y="645" className="fill-text-secondary text-[13px]">
        Krypfart hela vägen. Stanna om du
      </text>
      <text x="20" y="663" className="fill-text-secondary text-[13px]">
        tappar överblicken.
      </text>
      <g transform="translate(20 674)">
        <Gata />
        <Bil cx={87.5} cy={115} rot={90} fill="url(#fp-stripes)" stroke="stroke-primary-600" nose="fill-primary-600" />
        <Bil cx={236.5} cy={115} rot={90} fill="url(#fp-stripes)" stroke="stroke-primary-600" nose="fill-primary-600" />
        <circle cx="175.78" cy="99" r="3.5" className="fill-none stroke-attention-600" strokeWidth="2" />
        <path
          d="M 175.78 99 A 48 48 0 0 0 140 115"
          className="fill-none stroke-attention-600"
          strokeWidth="3"
          markerEnd="url(#fp-arrow-you)"
        />
        <Bil cx={155.5} cy={115} rot={90} fill="url(#fp-dots)" stroke="stroke-attention-600" nose="fill-attention-600" />
      </g>

      {/* Regeltext */}
      <text x="200" y="854" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        När du sedan kör ut från platsen
      </text>
      <text x="200" y="874" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        har du väjningsplikt.
      </text>
      <text x="200" y="898" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Visa den genom att sänka farten eller stanna i tid.
      </text>
      <text x="200" y="916" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Sikten härifrån är sämre än när du körde in.
      </text>

      {/* Mönsterförklaring */}
      <g>
        <rect
          x="72"
          y="944"
          width="22"
          height="14"
          rx="2"
          fill="url(#fp-dots)"
          className="stroke-attention-600"
          strokeWidth="1.5"
        />
        <text x="102" y="956" className="fill-text-tertiary text-[13px]">
          Du (prickar)
        </text>
        <rect
          x="210"
          y="944"
          width="22"
          height="14"
          rx="2"
          fill="url(#fp-stripes)"
          className="stroke-primary-600"
          strokeWidth="1.5"
        />
        <text x="240" y="956" className="fill-text-tertiary text-[13px]">
          Andra fordon
        </text>
      </g>

      {/* Förklaringsruta: väjningsplikten när du lämnar platsen */}
      <rect x="20" y="968" width="360" height="180" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="34" y="992" className="fill-text-primary text-[13px] font-semibold">
        När ett fordon närmar sig medan du ska ut:
      </text>
      <line x1="200" y1="1006" x2="200" y2="1140" className="stroke-border-default" strokeWidth="1.5" strokeDasharray="6 4" />

      <MiniUtfart x={35} y={990} variant="vantar" />
      <text x="110" y="1086" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Du väntar
      </text>
      <text x="110" y="1102" textAnchor="middle" className="fill-text-secondary text-[13px]">
        det passerar först
      </text>
      <Check x={110} y={1122} />

      <MiniUtfart x={215} y={990} variant="kor-ut" />
      <text x="290" y="1086" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        Du kör ut framför det
      </text>
      <text x="290" y="1102" textAnchor="middle" className="fill-text-secondary text-[13px]">
        bryter mot väjningsplikten
      </text>
      <Cross x={290} y={1122} />
    </svg>
  );
}
