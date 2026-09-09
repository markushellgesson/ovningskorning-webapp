/**
 * Förarställning (VEH-01) — sidovy av kroppen i stolen.
 *
 * Bildens enda poäng: rätt avstånd till pedal och ratt ger en tydlig böj i
 * både knä och armbåge. Sitter du för långt bak sträcks lederna raka, och då
 * blir ratten tung att vrida. Nackstödet är den tredje kontrollpunkten: dess
 * mitt ska ligga i höjd med örat.
 *
 * Det här är körteknik och ergonomi, inte en regel. Bilden påstår ingenting
 * om vad lagen kräver, och den innehåller INGA MÅTT — inga grader, inga
 * centimeter. "Lätt böjd" är ritad som en form att jämföra med "rak", inte
 * som ett tal att mäta.
 *
 * Bilden tar medvetet inte upp bältet, bilbarnstol eller speglarnas
 * inställning. Bältet hör till VEH-03; speglarna syns inte i en sidovy av
 * kroppen.
 *
 * ---- VY OCH RIKTNING ----
 * Sidovy (profil), inte vy uppifrån. Ingen väg, inga körfält, inga andra
 * trafikanter — därför finns ingen körfältsgeometri att kontrollera.
 * Bilen är sedd rakt från sin VÄNSTRA sida, alltså genom förardörren: bilens
 * front pekar åt VÄNSTER i bilden (låga x) och bakvagnen åt höger. Föraren
 * sitter till vänster i bilen och är därför den som är närmast betraktaren.
 * Därav följer allt annat i bilden:
 *   pedal och instrumentbräda ligger längst till vänster (låga x),
 *   ratten till höger om pedalen, stolen till höger om ratten,
 *   nackstödet längst till höger (höga x), bakom förarens huvud.
 * Att flytta stolen BAKÅT betyder alltså ökande x. Det är enda "riktningen"
 * i bilden och den kontrolleras nedan.
 *
 * ---- FASTA PUNKTER (scenens lokala koordinater, front åt vänster) ----
 * Rattens mitt (139, 268), radie 39 → kransens överkant y = 229.
 * Handleden på kransen (154, 232). |handled − rattmitt| = 39,0, alltså
 *   ligger handen på kransen, och y 232 mot kransens överkant 229: handleden
 *   är i höjd med rattens överkant, som innehållet säger.
 * Fotleden vid pedalen (112, 347). Golvet y = 362, hälen (126, 360).
 * Pedalplattan går (87, 340) → (100, 362); trampytan (96,5 | 356) ligger på
 *   den linjen, kontrollräknat.
 * Ratt, pedal, instrumentbräda och golv står STILLA mellan de två
 * ställningarna. Det enda som flyttar sig är stolen — och därmed höften.
 *
 * ---- LEDVINKLARNA (räknade, inte uppskattade) ----
 * Överarm 45, underarm+hand 50 (max räckvidd 95). Lår 66, underben+fot 67
 * (max 133). Bål höft→axel 82; axeln ligger 9 px BAKOM höften (höga x),
 * eftersom ryggstödet lutar bakåt.
 *
 * RÄTT — höft (232, 320), axel (241 | 238,5):
 *   armens räckvidd till handleden 87,2 av 95 → armbåge (198,8 | 254,2),
 *   ARMBÅGSVINKEL 133,3° (rak = 180°). Tydlig böj.
 *   benets räckvidd till fotleden 123,0 av 133 → knä (167,0 | 308,7),
 *   KNÄVINKEL 135,3°. Tydlig böj.
 *   Örat (246 | 202,5), nackstödet x 268–288 och y 178–227 → nackstödets
 *   mitt y = 202,5, alltså exakt örats höjd.
 *
 * FEL, stolen står för långt bak — höft (239,5 | 320), axel (248,5 | 238,5):
 *   armens räckvidd 94,7 av 95 → ARMBÅGSVINKEL 171,2°. Så gott som rak.
 *   benets räckvidd 130,3 av 133 → KNÄVINKEL 157,0°. Nästan rak.
 *
 * Stolen har alltså flyttats 7,5 px bakåt (232 → 239,5) och det räcker för
 * att båda lederna ska rätas ut. Förskjutningen är LITEN med flit: så ser
 * geometrin faktiskt ut nära full sträckning, där längden ändras långsamt
 * medan vinkeln ändras snabbt. Bilden överdriver inte stolens läge för
 * tydlighetens skull — det är armvinkeln som skiljer panelerna åt, precis
 * som det ska vara. Ratt, pedal och golv står på samma plats i båda
 * panelerna och är den gemensamma referensen.
 *
 * Armbåge och knä räknas ut i koden (funktionen `led`) ur just dessa
 * anslutningspunkter, så vinklarna kan inte glida isär från kommentaren.
 *
 * ---- FRIYTOR OCH HÄNVISNINGAR (dukens koordinater) ----
 * Scenen ligger i translate(82 −94): duk-x = lokal-x + 82, duk-y = lokal-y −
 * 94. Scenen upptar då x 144–372 och y 84–271. Kvar blir x 0–144 till
 * vänster och x 372–500 till höger — där ligger alla etiketter.
 *   Ratten på duken: mitt (179, 174), radie 39 → x 140–218, y 135–213.
 *   1 knä (207, 215) — pekare (108, 236) → (203, 216), y 216–236, alltså
 *     helt under rattens underkant 213.
 *   2 armbåge (238,8 | 160,2) — pekare (172, 120) → (234, 158). Närmaste
 *     avstånd till rattens mitt är 46,8 vid x 218, alltså utanför radien 39.
 *   3 nackstödet (322, 111) — pekare (350, 134) → (322, 111), enda pekaren i
 *     höger marginal.
 *   Pekare 1 (y 216–236) och pekare 2 (y 120–158) överlappar inte i y.
 *   Pekare 3 (x 322–350) och pekare 2 (x 172–234) överlappar inte i x.
 *   Ingen pekare korsar någon annan, och ingen etikett ligger på scenen.
 *
 * ---- FÖRKLARINGSRUTAN (efterräknad) ----
 * Två paneler i scale(0,78) med samma lokala koordinater som huvudscenen och
 * samma fasta ratt, pedal och golv. Panel A translate(32 520), panel B
 * translate(244 520); innehållet är 178 × 146 → A x 32–210, B x 244–422.
 * Avdelaren står på x 228: 210 < 228 < 244, alltså rör ingen panel den.
 * Enda skillnaden mellan panelerna är höftens x (232 mot 239,5) — allt annat
 * ritas av samma kod.
 *
 * ---- KODNING (ett uttryck, en betydelse) ----
 * Båge vid leden = ledvinkel; en böjd båge är en böjd led, en nästan platt
 * båge en rak. Streckad linje med ändmarkeringar = "samma höjd" (örat mot
 * nackstödets mitt) och används inte till något annat. Bock och kryss är
 * ritade som grafik, inte som tecken i text. Färg bär ingen betydelse ensam:
 * varje panel har bock eller kryss, en bågform och en bildtext.
 */

type P = [number, number];

/** Leden mellan A och B: |A−J| = a, |B−J| = b. sida 'ned' tar största y. */
function led(A: P, B: P, a: number, b: number, sida: 'ned' | 'upp'): P {
  const d = Math.hypot(B[0] - A[0], B[1] - A[1]);
  const x = (d * d + a * a - b * b) / (2 * d);
  const h = Math.sqrt(Math.max(a * a - x * x, 0));
  const ux = (B[0] - A[0]) / d;
  const uy = (B[1] - A[1]) / d;
  const px = A[0] + x * ux;
  const py = A[1] + x * uy;
  const s1: P = [px - h * uy, py + h * ux];
  const s2: P = [px + h * uy, py - h * ux];
  if (sida === 'ned') return s1[1] > s2[1] ? s1 : s2;
  return s1[1] < s2[1] ? s1 : s2;
}

/** Bågen som visar ledvinkeln i J, mellan riktningarna J→A och J→B. */
function bage(J: P, A: P, B: P, r: number): string {
  const a1 = Math.atan2(A[1] - J[1], A[0] - J[0]);
  const a2 = Math.atan2(B[1] - J[1], B[0] - J[0]);
  let d = a2 - a1;
  while (d > Math.PI) d -= 2 * Math.PI;
  while (d < -Math.PI) d += 2 * Math.PI;
  const sweep = d > 0 ? 1 : 0;
  const p1: P = [J[0] + r * Math.cos(a1), J[1] + r * Math.sin(a1)];
  const p2: P = [J[0] + r * Math.cos(a2), J[1] + r * Math.sin(a2)];
  return `M ${p1[0].toFixed(1)} ${p1[1].toFixed(1)} A ${r} ${r} 0 0 ${sweep} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
}

/* Fasta punkter i bilen — flyttas aldrig mellan de två ställningarna. */
const RATT_C: P = [139, 268];
const RATT_R = 39;
const HANDLED: P = [154, 232];
const FOTLED: P = [112, 347];
const GOLV = 362;

const OVERARM = 45;
const UNDERARM = 50;
const LAR = 66;
const UNDERBEN = 67;

/** Bilens fasta inredning i profil: golv, instrumentbräda, ratt, pedal. */
function Inredning() {
  return (
    <g>
      {/* Golv */}
      <line
        x1="62"
        y1={GOLV}
        x2="300"
        y2={GOLV}
        className="stroke-text-tertiary"
        strokeWidth="3"
      />
      {/* Torpedvägg framför fötterna */}
      <line x1="62" y1={GOLV} x2="62" y2="248" className="stroke-text-tertiary" strokeWidth="3" />
      {/* Instrumentbräda */}
      <polygon
        points="62,246 126,266 126,288 62,300"
        className="fill-neutral-200 stroke-text-tertiary"
        strokeWidth="2"
      />
      {/* Rattstång */}
      <line x1="126" y1="278" x2="139" y2="268" className="stroke-text-primary" strokeWidth="6" />
      {/* Ratten i profil: kransen som cirkel, navet i mitten */}
      <circle
        cx={RATT_C[0]}
        cy={RATT_C[1]}
        r={RATT_R}
        className="fill-none stroke-text-primary"
        strokeWidth="7"
      />
      <circle cx={RATT_C[0]} cy={RATT_C[1]} r="7" className="fill-text-primary" />
      {/* Pedalen: platta (87,340)–(100,362) med trampytan i (96,5 | 356) */}
      <line x1="87" y1="340" x2="100" y2="362" className="stroke-text-primary" strokeWidth="7" strokeLinecap="round" />
      <line x1="87" y1="340" x2="70" y2="332" className="stroke-text-tertiary" strokeWidth="3" />
    </g>
  );
}

/** Stolen. Följer höften: hela stolen förskjuts lika mycket som höften. */
function Stol({ dx }: { dx: number }) {
  return (
    <g transform={`translate(${dx} 0)`} className="fill-neutral-200 stroke-text-tertiary" strokeWidth="2">
      {/* Stolsdyna */}
      <polygon points="174,314 262,320 264,342 176,338" />
      {/* Stolsfot ned till golvet */}
      <polygon points="204,340 250,342 250,362 204,362" />
      {/* Ryggstöd, lutat bakåt */}
      <polygon points="250,324 262,230 290,233 278,327" />
      {/* Nackstöd: x 268–288, y 178–227, alltså mitten på y 202,5 */}
      <rect x="268" y="178" width="20" height="49" rx="5" />
    </g>
  );
}

/**
 * Föraren i profil. Höftens x avgör allt: axel, armbåge och knä räknas ut ur
 * de fasta punkterna, så vinklarna kan inte bli fel av misstag.
 */
function Forare({ hoftX, visaBagar }: { hoftX: number; visaBagar: 'ratt' | 'fel' | 'ingen' }) {
  const hoft: P = [hoftX, 320];
  const axel: P = [hoftX + 9, 238.5];
  const huvud: P = [axel[0] + 2, axel[1] - 39];
  const ora: P = [axel[0] + 10, axel[1] - 36];
  const armbage = led(axel, HANDLED, OVERARM, UNDERARM, 'ned');
  const kna = led(hoft, FOTLED, LAR, UNDERBEN, 'upp');
  const hal: P = [FOTLED[0] + 14, GOLV - 2];
  const trampyta: P = [96.5, 356];
  const bagKlass = visaBagar === 'fel' ? 'stroke-safety-600' : 'stroke-progress-600';

  return (
    <g>
      {/* Bål */}
      <line
        x1={hoft[0]}
        y1={hoft[1]}
        x2={axel[0]}
        y2={axel[1]}
        className="stroke-attention-600"
        strokeWidth="22"
        strokeLinecap="round"
      />
      {/* Ben: lår och underben */}
      <polyline
        points={`${hoft[0]},${hoft[1]} ${kna[0].toFixed(1)},${kna[1].toFixed(1)} ${FOTLED[0]},${FOTLED[1]}`}
        className="fill-none stroke-attention-600"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Foten: fotled → häl på golvet, fotled → trampytan på pedalen */}
      <polyline
        points={`${hal[0]},${hal[1]} ${FOTLED[0]},${FOTLED[1]} ${trampyta[0]},${trampyta[1]}`}
        className="fill-none stroke-attention-600"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Arm: överarm och underarm fram till handleden på rattens krans */}
      <polyline
        points={`${axel[0]},${axel[1]} ${armbage[0].toFixed(1)},${armbage[1].toFixed(1)} ${HANDLED[0]},${HANDLED[1]}`}
        className="fill-none stroke-attention-600"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Handen om kransen */}
      <circle cx={HANDLED[0]} cy={HANDLED[1]} r="7" className="fill-surface-base stroke-attention-600" strokeWidth="3" />
      {/* Halsen — binder ihop axeln med huvudet */}
      <line
        x1={axel[0]}
        y1={axel[1] - 2}
        x2={huvud[0]}
        y2={huvud[1] + 12}
        className="stroke-attention-600"
        strokeWidth="14"
        strokeLinecap="round"
      />
      {/* Huvudet, med örat markerat */}
      <circle cx={huvud[0]} cy={huvud[1]} r="22" className="fill-surface-base stroke-attention-600" strokeWidth="4" />
      <circle cx={ora[0]} cy={ora[1]} r="4.5" className="fill-none stroke-attention-600" strokeWidth="2.5" />

      {visaBagar !== 'ingen' && (
        <g className={`fill-none ${bagKlass}`} strokeWidth="4" strokeLinecap="round">
          <path d={bage(armbage, axel, HANDLED, 21)} />
          <path d={bage(kna, hoft, FOTLED, 21)} />
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

/** Tunn pekarlinje som slutar i en punkt på det den syftar på. */
function Pekare({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-text-tertiary" strokeWidth="1.5" />
      <circle cx={x2} cy={y2} r="3" className="fill-text-tertiary" />
    </g>
  );
}

/** Miniscen i förklaringsrutan. Samma kod, samma fasta punkter, bara höften skiljer. */
function MiniStallning({ x, y, hoftX, variant }: { x: number; y: number; hoftX: number; variant: 'ratt' | 'fel' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(0.78) translate(-62 -177.5)`}>
      <Inredning />
      <Stol dx={hoftX - 232} />
      <Forare hoftX={hoftX} visaBagar={variant} />
    </g>
  );
}

export function ForarstallningDiagram() {
  return (
    <svg viewBox="0 0 500 845" className="w-full max-w-md mx-auto" role="img" aria-labelledby="fs-title fs-desc">
      <title id="fs-title">Förarställning: lätt böjda leder vid pedal och ratt, nackstödet i öronhöjd</title>
      <desc id="fs-desc">
        Sidovy av en förare i förarsätet, sedd rakt genom förardörren. Bilens front pekar åt vänster:
        längst till vänster syns golvet, torpedväggen, instrumentbrädan som en grå kil och pedalen som
        ett kraftigt streck; i mitten ratten, ritad som en ring sedd i profil med ett nav; till höger
        stolen med dyna, lutat ryggstöd och nackstöd, allt i ljusgrått med mörk kontur. Föraren är
        ritad med kraftiga blå streck för bål, ben och arm, med vita cirklar med blå kontur för
        huvudet och för handen om rattens krans. En liten ring i huvudet markerar örat. Vid armbågen
        och vid knäet ligger var sin grön båge som visar ledvinkeln; båda bågarna är tydligt krökta,
        alltså är leden böjd och inte rak. Handen ligger på kransen så att handleden hamnar i höjd med
        rattens överkant. En streckad linje med ett lodrätt ändstreck i var ände går vågrätt från örat
        bakåt till nackstödet och visar att nackstödets mitt ligger på samma höjd som örat; samma
        streckade linje med ändstreck används inte till något annat i bilden. Tre numrerade
        hänvisningar med tunna linjer och en punkt i målet: 1 pekar på knäet, 2 på armbågen, 3 på
        nackstödet. Längst ned en ruta med två paneler sida vid sida, i samma skala och med ratt,
        pedal och golv på exakt samma plats. Till vänster, märkt med en grön bock och ordet Rätt:
        stolen står så att både armbågens och knäets bågar är krökta. Till höger, märkt med ett rött
        kryss och ordet Fel: stolen står en bit längre bak, och då är båda bågarna nästan platta —
        armen och benet är utsträckta. Skillnaden mellan panelerna syns i bågarnas form, inte i
        stolens läge, som bara flyttats en liten bit.
      </desc>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Förarställning
      </text>
      <text x="20" y="48" className="fill-text-secondary text-[14px]">
        Lätt böjda leder — och nackstödet i öronhöjd
      </text>

      {/* Scenen: duk-x = lokal-x + 82, duk-y = lokal-y − 94 */}
      <g transform="translate(82 -94)">
        <Inredning />
        <Stol dx={0} />
        <Forare hoftX={232} visaBagar="ratt" />

        {/* Höjdmarkering örat → nackstödets mitt, båda på lokal y 202,5 */}
        <g className="stroke-text-primary" strokeWidth="2">
          <line x1="251" y1="202.5" x2="288" y2="202.5" strokeDasharray="5 4" />
          <line x1="251" y1="194" x2="251" y2="211" />
          <line x1="288" y1="194" x2="288" y2="211" />
        </g>
      </g>

      {/* 1. Knäet */}
      <Callout x={24} y={238} n={1} />
      <text x="42" y="243" className="fill-text-primary text-[14px] font-semibold">
        Lätt böjt knä
      </text>
      <text x="12" y="266" className="fill-text-secondary text-[14px]">
        Foten når pedalen
      </text>
      <text x="12" y="284" className="fill-text-secondary text-[14px]">
        utan att benet
      </text>
      <text x="12" y="302" className="fill-text-secondary text-[14px]">
        sträcks rakt
      </text>
      <Pekare x1={108} y1={236} x2={203} y2={216} />

      {/* 2. Armen */}
      <Callout x={24} y={96} n={2} />
      <text x="42" y="101" className="fill-text-primary text-[14px] font-semibold">
        Lätt böjd arm
      </text>
      <text x="12" y="124" className="fill-text-secondary text-[14px]">
        Handleden ungefär
      </text>
      <text x="12" y="142" className="fill-text-secondary text-[14px]">
        i höjd med rattens
      </text>
      <text x="12" y="160" className="fill-text-secondary text-[14px]">
        överkant
      </text>
      <Pekare x1={172} y1={120} x2={234} y2={158} />

      {/* 3. Nackstödet */}
      <Callout x={346} y={74} n={3} />
      <text x="364" y="79" className="fill-text-primary text-[14px] font-semibold">
        Nackstödet
      </text>
      <text x="334" y="102" className="fill-text-secondary text-[14px]">
        med mitten i
      </text>
      <text x="334" y="120" className="fill-text-secondary text-[14px]">
        höjd med örat
      </text>
      <Pekare x1={350} y1={140} x2={322} y2={113} />

      {/* Teckenförklaring */}
      <g>
        <path
          d="M 26 344 A 20 20 0 0 1 50 326"
          className="fill-none stroke-progress-600"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <text x="62" y="340" className="fill-text-secondary text-[14px]">
          Båge vid leden = så böjd är den
        </text>
        <g className="stroke-text-primary" strokeWidth="2">
          <line x1="26" y1="366" x2="50" y2="366" strokeDasharray="5 4" />
          <line x1="26" y1="359" x2="26" y2="373" />
          <line x1="50" y1="359" x2="50" y2="373" />
        </g>
        <text x="62" y="371" className="fill-text-secondary text-[14px]">
          Samma höjd
        </text>
      </g>

      {/* Vad du gör */}
      <text x="230" y="400" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        Ställ in stolen så att både knäet och armbågen
      </text>
      <text x="230" y="420" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        har en tydlig böj när du når pedalen och ratten.
      </text>
      <text x="230" y="440" textAnchor="middle" className="fill-text-secondary text-[14px]">
        Höj sedan nackstödet tills mitten är i höjd med öronen.
      </text>

      {/* Förklaringsruta: samma ratt, samma pedal, samma golv — bara stolen flyttas */}
      <rect x="18" y="458" width="424" height="344" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="32" y="484" className="fill-text-primary text-[14px] font-semibold">
        Vad stolens läge gör med armen och benet:
      </text>
      <line x1="228" y1="496" x2="228" y2="790" className="stroke-border-default" strokeWidth="1.5" strokeDasharray="6 4" />

      {/* Rätt */}
      <path
        d="M 40 508 L 46 515 L 58 500"
        className="fill-none stroke-progress-600"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="66" y="514" className="fill-text-primary text-[14px] font-semibold">
        Rätt
      </text>
      <MiniStallning x={32} y={526} hoftX={232} variant="ratt" />
      <text x="121" y="694" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Armen har en böj
      </text>
      <text x="121" y="714" textAnchor="middle" className="fill-text-secondary text-[14px]">
        Ratten går lätt att
      </text>
      <text x="121" y="732" textAnchor="middle" className="fill-text-secondary text-[14px]">
        vrida, och du når
      </text>
      <text x="121" y="750" textAnchor="middle" className="fill-text-secondary text-[14px]">
        hela vägen runt
      </text>

      {/* Fel */}
      <g className="stroke-safety-600" strokeWidth="4" strokeLinecap="round">
        <line x1="252" y1="501" x2="266" y2="515" />
        <line x1="266" y1="501" x2="252" y2="515" />
      </g>
      <text x="278" y="514" className="fill-text-primary text-[14px] font-semibold">
        Fel — stolen för långt bak
      </text>
      <MiniStallning x={244} y={526} hoftX={239.5} variant="fel" />
      <text x="333" y="694" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Armen är rak
      </text>
      <text x="333" y="714" textAnchor="middle" className="fill-text-secondary text-[14px]">
        Ratten blir tung att
      </text>
      <text x="333" y="732" textAnchor="middle" className="fill-text-secondary text-[14px]">
        vrida, och benet
      </text>
      <text x="333" y="750" textAnchor="middle" className="fill-text-secondary text-[14px]">
        sträcks ut mot pedalen
      </text>

      <text x="230" y="782" textAnchor="middle" className="fill-text-tertiary text-[14px]">
        Stolen har bara flyttats en liten bit — det räcker.
      </text>
    </svg>
  );
}
