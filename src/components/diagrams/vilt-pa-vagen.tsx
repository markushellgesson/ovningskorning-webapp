/**
 * Vilt och djur på vägen (SPEC-06), vy uppifrån. Bilden lär ut EN sak:
 * bromsa hårt och RAKT ger bäst kontroll — en undanmanöver med vridna hjul i
 * hög fart för ut bilen i diket eller i mötande körfält. Farten är redan sänkt
 * eftersom sikten mot vägkanten är kort.
 *
 * REGELLÄGE: det finns INGEN väjningsplikt mot djur. Bilden säger det rakt ut
 * och antyder ingenting annat — ingen bock/kryss, pil eller etikett får läsas
 * som att bilen "har väjningsplikt" mot djuret eller att djuret "har
 * företräde". Det som gäller är den allmänna aktsamhetsregeln: låg fart där
 * sikten är kort. Att bromsa rakt är körteknik, inte en paragraf. Inga siffror
 * på avstånd, fart eller hur ofta viltolyckor sker.
 *
 * ---- Geometri (vy uppifrån, högertrafik), scenens koordinater ----
 * Scenen ligger i en grupp förskjuten 70 px nedåt så rubriken får luft.
 * Landsvägen går lodrätt. Vägbanan inkl. vägrenar x 140–260, körbanan
 * x 150–250 mellan kantlinjerna, mittlinjen på x 200. Vägrenar x 140–150 och
 * x 250–260. Skog/åkerkant tätt intill: mark x 0–140 och x 260–400.
 *
 *   DIN BIL kör UPPÅT i bilden (minskande y). Kör man uppåt ligger den egna
 *   högra sidan mot bildens högra kant → alltså det HÖGRA körfältet, x 200–250.
 *     mitt x 225, kaross x 211…239, cy 540 (kaross y 518…562).
 *     211 > 200 ✔ (höger om mittlinjen) och 239 < 250 ✔ (innanför kantlinjen)
 *     → hela karossen i eget körfält, mitt i fältet. Mötande körfält x 150–200
 *     lämnas TOMT: ett möte är en annan situation, och att lämna det tomt gör
 *     poängen i förklaringsrutan (att hamna där är fel) entydig.
 *
 *   DJURET (rådjur) är på väg ut på vägbanan framför dig, mitt x 222, cy 250,
 *     rör sig åt vänster (minskande x, in mot mötande sida). Det är i din väg.
 *     Ett ANDRA djur står kvar i skogskanten till höger, mitt x 288, cy 330,
 *     helt inom marken x 260–400 — "ser du ett, räkna med fler".
 *
 * ---- Förklaringsrutan, efterräknad ----
 * Två miniscener i skala 0,6 med gemensam uppbyggnad: körbana x -60…60,
 * mittlinje x 0, ditt körfält x 0…60, mötande x -60…0, grön dikeskant utanför.
 * Din bil mitt x 16 (kaross x 2…30) med fronten uppåt → samma körfält, höger om
 * mitten, som i huvudbilden (2 > 0 ✔, 30 < 60 ✔). Samma djur framför i båda.
 *   Panel A (rätt):  hjulen raka, kort rak pil framåt → bilen bromsar och
 *                    knuffas rakt fram, stannar i EGET körfält. Grön bock.
 *   Panel B (fel):   framhjulen vridna, pil svänger upp-vänster förbi
 *                    mittlinjen (slutar x -40 < 0) → ut i MÖTANDE körfält.
 *                    Rött kryss. Ingen text påstår väjningsplikt.
 *
 * ---- Mönster och roller (inget mönster betyder två saker) ----
 *   prickar             = din bil
 *   mörk siluett + horn = djur (form bär betydelsen, inte färg)
 *   heldragen pil       = rör sig nu (du, djuret)
 *   röda tvärstreck bak = bromsljus, farten sänks
 *   bock / kryss (form) = utfallet
 * Ingen betydelse bärs av färg ensam: varje roll har form, mönster eller
 * etikett vid sidan av kulören.
 */

type Heading = 'up' | 'right' | 'down' | 'left';
const HEADING_DEG: Record<Heading, number> = { up: 0, right: 90, down: 180, left: -90 };

interface CarProps {
  cx: number;
  cy: number;
  width: number;
  length: number;
  heading: Heading;
  fill: string;
  stroke: string;
  brakeLights?: boolean;
  /** Framhjulen vridna. Används bara i felpanelen i förklaringsrutan. */
  turnedWheels?: boolean;
}

/**
 * Bil ritad med fronten uppåt och sedan vriden efter färdriktningen. Hjulen
 * ritas som egna rektanglar utanför karossen — det är det som gör att
 * framhjulen kan vridas kring sin egen mitt i förklaringsrutan.
 */
function Car({
  cx,
  cy,
  width,
  length,
  heading,
  fill,
  stroke,
  brakeLights,
  turnedWheels,
}: CarProps) {
  const hw = width / 2;
  const hl = length / 2;
  const glass = `fill-diagram-marking ${stroke}`;
  const frontLeftX = -hw - 3;
  const frontRightX = hw - 2;
  const frontY = -hl + 5;
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${HEADING_DEG[heading]})`}>
      <g className="fill-text-primary">
        <rect
          x={frontLeftX}
          y={frontY}
          width="5"
          height="10"
          rx="1.5"
          transform={turnedWheels ? `rotate(-30 ${frontLeftX + 2.5} ${frontY + 5})` : undefined}
        />
        <rect
          x={frontRightX}
          y={frontY}
          width="5"
          height="10"
          rx="1.5"
          transform={turnedWheels ? `rotate(-30 ${frontRightX + 2.5} ${frontY + 5})` : undefined}
        />
        <rect x={-hw - 3} y={hl - 15} width="5" height="10" rx="1.5" />
        <rect x={hw - 2} y={hl - 15} width="5" height="10" rx="1.5" />
      </g>
      <rect x={-hw} y={-hl} width={width} height={length} rx="4" className="fill-diagram-marking" />
      <rect
        x={-hw}
        y={-hl}
        width={width}
        height={length}
        rx="4"
        fill={fill}
        className={stroke}
        strokeWidth="2"
      />
      <rect
        x={-hw + 5}
        y={-hl + 7}
        width={width - 10}
        height="8"
        rx="2"
        className={glass}
        strokeWidth="1"
      />
      <rect
        x={-hw + 5}
        y={hl - 11}
        width={width - 10}
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
 * Djur (rådjur) i mörk siluett med horn, sett i profil så att det går att
 * känna igen oavsett vy. Vänt åt vänster (rör sig in mot vägmitten). Formen
 * bär betydelsen — färgen gör det inte ensam.
 */
function Djur({ cx, cy, scale = 1 }: { cx: number; cy: number; scale?: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
      <ellipse cx="0" cy="0" rx="14" ry="7" className="fill-text-primary" />
      <path
        d="M -8 -3 L -16 -13"
        className="stroke-primary-600"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <ellipse
        cx="-18"
        cy="-15"
        rx="5"
        ry="3.5"
        transform="rotate(-35 -18 -15)"
        className="fill-text-primary"
      />
      <path
        d="M -21 -17 L -26 -20"
        className="stroke-primary-600"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <g className="fill-none stroke-primary-600" strokeWidth="1.6" strokeLinecap="round">
        <path d="M -18 -18 L -20 -27 M -20 -27 L -24 -30 M -20 -27 L -18 -31" />
        <path d="M -15 -18 L -13 -27 M -13 -27 L -10 -31 M -13 -27 L -15 -31" />
      </g>
      <g className="stroke-primary-600" strokeWidth="3" strokeLinecap="round">
        <line x1="-9" y1="5" x2="-11" y2="17" />
        <line x1="-4" y1="6" x2="-5" y2="18" />
        <line x1="7" y1="6" x2="8" y2="18" />
        <line x1="11" y1="5" x2="13" y2="17" />
      </g>
      <path
        d="M 14 -2 L 19 -6"
        className="stroke-primary-600"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </g>
  );
}

/** Litet träd: grön krona, grå stam. Signalerar skog/åkerkant tätt intill. */
function Trad({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-1.5" y="4" width="3" height="8" className="fill-text-tertiary" />
      <polygon points="0,-13 8,5 -8,5" className="fill-progress-600" />
      <polygon points="0,-7 6,7 -6,7" className="fill-progress-600" />
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
 * Miniscen i skala 0,6 för förklaringsrutan. Körbana x -60…60, mittlinje x 0,
 * ditt körfält x 0…60, mötande x -60…0, grön dikeskant utanför. Samma djur
 * framför i båda panelerna; det enda som skiljer är hjulens läge och var bilen
 * hamnar.
 */
function MiniScen({ x, y, variant }: { x: number; y: number; variant: 'raka' | 'vridna' }) {
  const straight = variant === 'raka';
  return (
    <g transform={`translate(${x} ${y}) scale(0.6)`}>
      {/* Dikeskant/mark utanför vägbanan */}
      <rect x="-92" y="-100" width="32" height="200" className="fill-progress-100" />
      <rect x="60" y="-100" width="32" height="200" className="fill-progress-100" />
      {/* Vägbana */}
      <rect x="-60" y="-100" width="120" height="200" className="fill-diagram-road" />
      <g className="stroke-diagram-edge" strokeWidth="3">
        <line x1="-60" y1="-100" x2="-60" y2="100" />
        <line x1="60" y1="-100" x2="60" y2="100" />
      </g>
      <line
        x1="0"
        y1="-100"
        x2="0"
        y2="100"
        className="stroke-diagram-marking"
        strokeWidth="3"
        strokeDasharray="14 12"
      />

      {/* Djuret framför, i din väg */}
      <Djur cx={8} cy={-58} scale={0.7} />

      <Car
        cx={16}
        cy={28}
        width={28}
        length={44}
        heading="up"
        fill="url(#vp-dots)"
        stroke="stroke-attention-600"
        brakeLights
        turnedWheels={!straight}
      />

      {/* Resultatet */}
      {straight ? (
        <path
          d="M 16 4 L 16 -30"
          className="stroke-primary-600"
          strokeWidth="4"
          markerEnd="url(#vp-arrow-move)"
        />
      ) : (
        <path
          d="M 12 4 L -40 -58"
          className="stroke-primary-600"
          strokeWidth="4"
          markerEnd="url(#vp-arrow-move)"
        />
      )}
    </g>
  );
}

export function ViltPaVagenDiagram() {
  return (
    <svg
      viewBox="0 0 400 1112"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="vp-title vp-desc"
    >
      <title id="vp-title">
        Vilt på vägen: bromsa rakt, väj inte ut i diket eller mötande körfält
      </title>
      <desc id="vp-desc">
        Vy uppifrån. En landsväg går lodrätt genom bilden med skog och åkerkant tätt intill på båda
        sidor, markerad med små träd. Din bil, fylld med prickmönster, kör uppåt i det högra
        körfältet med tända röda bromsljus och en kort heldragen pil framåt — farten är redan sänkt.
        Framför dig är ett rådjur, ritat som en mörk siluett i profil med horn, på väg ut på
        vägbanan åt vänster, markerat med en heldragen pil. Vid skogskanten till höger står ännu ett
        djur kvar. Tre numrerade hänvisningar i marginalerna: 1 pekar på djuret i vägen och säger
        att du ska bromsa, och att det inte finns någon väjningsplikt mot djur — den allmänna
        aktsamhetsregeln gäller; 2 pekar på det andra djuret i skogskanten — ser du ett djur ska du
        räkna med fler, de rör sig i flock eller med unge; 3 pekar på skogskanten tätt intill vägen
        — kort sikt, håll farten låg. Det mötande körfältet till vänster är tomt. En
        teckenförklaring skiljer på heldragen pil, rör sig nu, och röda bromsljus, farten ned.
        Längst ned en ruta med två miniscener av samma väg med samma djur framför. Till vänster
        hålls hjulen raka: bilen bromsar och knuffas rakt fram och stannar i eget körfält, markerat
        med en grön bock. Till höger är framhjulen vridna i en undanmanöver: bilen förs över
        mittlinjen ut i mötande körfält, markerat med ett rött kryss.
      </desc>

      <defs>
        <pattern id="vp-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <marker
          id="vp-arrow-move"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-text-primary" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Vilt och djur på vägen
      </text>
      <text x="20" y="48" className="fill-text-secondary text-[14px]">
        Vy uppifrån. Du kör uppåt i högra körfältet.
      </text>

      <g transform="translate(0 70)">
        {/* Mark: skog/åkerkant tätt intill vägen */}
        <rect x="0" y="0" width="140" height="620" className="fill-progress-100" />
        <rect x="260" y="0" width="140" height="620" className="fill-progress-100" />

        {/* Vägbana inkl. vägrenar */}
        <rect x="140" y="0" width="120" height="620" className="fill-diagram-road" />

        {/* Vägbanans ytterkanter */}
        <g className="stroke-diagram-edge" strokeWidth="1.5">
          <line x1="140" y1="0" x2="140" y2="620" />
          <line x1="260" y1="0" x2="260" y2="620" />
        </g>
        {/* Kantlinjer, heldragna: gränsen mellan körbana och vägren */}
        <g className="stroke-diagram-marking" strokeWidth="3">
          <line x1="150" y1="0" x2="150" y2="620" />
          <line x1="250" y1="0" x2="250" y2="620" />
        </g>
        {/* Mittlinje */}
        <line
          x1="200"
          y1="0"
          x2="200"
          y2="620"
          className="stroke-diagram-marking"
          strokeWidth="3"
          strokeDasharray="16 12"
        />

        {/* Vägnamn — det enda som får ligga på vägbanan */}
        <text
          x="175"
          y="600"
          textAnchor="middle"
          className="fill-diagram-marking text-[14px] font-semibold"
        >
          Landsväg
        </text>

        {/* Träd som markerar skogskanten */}
        <Trad x={126} y={70} s={0.9} />
        <Trad x={122} y={150} s={1.1} />
        <Trad x={128} y={430} s={1} />
        <Trad x={124} y={520} s={0.9} />
        <Trad x={274} y={80} s={1} />
        <Trad x={276} y={180} s={1.1} />
        <Trad x={272} y={440} s={0.9} />
        <Trad x={278} y={520} s={1} />

        {/* Teckenförklaring, i den fria marginalen till höger */}
        <g>
          <line
            x1="300"
            y1="20"
            x2="326"
            y2="20"
            className="stroke-primary-600"
            strokeWidth="3"
            markerEnd="url(#vp-arrow-move)"
          />
          <text x="332" y="25" className="fill-text-secondary text-[14px]">
            Rör sig nu
          </text>
          <g className="fill-safety-600">
            <rect x="300" y="40" width="5" height="4" />
            <rect x="311" y="40" width="5" height="4" />
          </g>
          <text x="322" y="46" className="fill-text-secondary text-[14px]">
            Bromsljus
          </text>
        </g>

        {/* Djuret på väg ut på vägbanan framför dig */}
        <Djur cx={222} cy={250} scale={0.9} />
        {/* Djurets rörelse: heldragen pil in mot vägmitten */}
        <path
          d="M 205 250 L 178 250"
          className="stroke-primary-600"
          strokeWidth="3"
          markerEnd="url(#vp-arrow-move)"
        />

        {/* Andra djuret, kvar i skogskanten till höger */}
        <Djur cx={288} cy={330} scale={0.6} />

        {/* Din bil: farten redan sänkt, bromsljusen tända, hjulen raka */}
        <Car
          cx={225}
          cy={540}
          width={28}
          length={44}
          heading="up"
          fill="url(#vp-dots)"
          stroke="stroke-attention-600"
          brakeLights
        />
        <path
          d="M 225 516 L 225 466"
          className="stroke-primary-600"
          strokeWidth="3"
          markerEnd="url(#vp-arrow-move)"
        />

        {/* 1. Djuret i vägen */}
        <Callout x={24} y={168} n={1} />
        <text x="40" y="173" className="fill-text-primary text-[14px] font-semibold">
          Djuret
        </text>
        <text x="14" y="192" className="fill-text-secondary text-[14px]">
          Bromsa. Det finns
        </text>
        <text x="14" y="208" className="fill-text-secondary text-[14px]">
          ingen väjningsplikt
        </text>
        <text x="14" y="224" className="fill-text-secondary text-[14px]">
          mot djur — men
        </text>
        <text x="14" y="240" className="fill-text-secondary text-[14px]">
          aktsamhet gäller.
        </text>
        <Pointer x1={100} y1={198} x2={206} y2={248} />

        {/* 2. Fler djur */}
        <Callout x={318} y={300} n={2} />
        <text x="334" y="305" className="fill-text-primary text-[14px] font-semibold">
          Fler djur
        </text>
        <text x="300" y="326" className="fill-text-secondary text-[14px]">
          Ser du ett,
        </text>
        <text x="300" y="342" className="fill-text-secondary text-[14px]">
          räkna med fler —
        </text>
        <text x="300" y="358" className="fill-text-secondary text-[14px]">
          flock eller unge.
        </text>
        <Pointer x1={316} y1={318} x2={300} y2={330} />

        {/* 3. Kort sikt vid skogskanten */}
        <Callout x={318} y={130} n={3} />
        <text x="334" y="135" className="fill-text-primary text-[14px] font-semibold">
          Kort sikt
        </text>
        <text x="300" y="156" className="fill-text-secondary text-[14px]">
          Skog tätt intill
        </text>
        <text x="300" y="172" className="fill-text-secondary text-[14px]">
          skymmer sikten.
        </text>
        <text x="300" y="188" className="fill-text-secondary text-[14px]">
          Håll farten låg.
        </text>
        <Pointer x1={316} y1={148} x2={280} y2={185} />

        {/* Din bil, etikett i vänstermarginalen */}
        <text x="14" y="520" className="fill-text-primary text-[15px] font-semibold">
          Du
        </text>
        <text x="14" y="538" className="fill-text-secondary text-[14px]">
          Farten redan sänkt.
        </text>
        <text x="14" y="554" className="fill-text-secondary text-[14px]">
          Bromsljusen lyser.
        </text>
        <Pointer x1={120} y1={540} x2={210} y2={540} />
      </g>

      {/* Bildens poäng */}
      <text x="20" y="726" className="fill-text-primary text-[14px] font-semibold">
        Bromsa hårt och rakt ger bäst kontroll.
      </text>
      <text x="20" y="748" className="fill-text-secondary text-[14px]">
        En kraftig undanmanöver i hög fart kan sluta i diket
      </text>
      <text x="20" y="764" className="fill-text-secondary text-[14px]">
        eller i mötande körfält.
      </text>

      {/* Mönsterförklaring */}
      <g>
        <rect
          x="30"
          y="786"
          width="22"
          height="14"
          rx="2"
          fill="url(#vp-dots)"
          className="stroke-attention-600"
          strokeWidth="1.5"
        />
        <text x="58" y="798" className="fill-text-tertiary text-[14px]">
          Du
        </text>
        <g transform="translate(150 793) scale(0.5)">
          <Djur cx={0} cy={0} scale={1} />
        </g>
        <text x="176" y="798" className="fill-text-tertiary text-[14px]">
          Djur
        </text>
      </g>

      {/* Förklaringsruta: raka hjul mot vridna hjul */}
      <rect
        x="20"
        y="826"
        width="360"
        height="266"
        rx="6"
        className="fill-none stroke-border-default"
        strokeWidth="1.5"
      />
      <text x="34" y="850" className="fill-text-primary text-[14px] font-semibold">
        Om ett djur står i din väg:
      </text>
      <line
        x1="200"
        y1="862"
        x2="200"
        y2="1082"
        className="stroke-border-default"
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />

      <MiniScen x={104} y={946} variant="raka" />
      <text
        x="104"
        y="1020"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-semibold"
      >
        Hjulen raka
      </text>
      <text x="104" y="1036" textAnchor="middle" className="fill-text-secondary text-[14px]">
        bilen bromsar rakt,
      </text>
      <text x="104" y="1052" textAnchor="middle" className="fill-text-secondary text-[14px]">
        stannar i eget körfält
      </text>
      <Check x={104} y={1074} />

      <MiniScen x={290} y={946} variant="vridna" />
      <text
        x="290"
        y="1020"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-semibold"
      >
        Hjulen vridna
      </text>
      <text x="290" y="1036" textAnchor="middle" className="fill-text-secondary text-[14px]">
        undanmanövern för ut
      </text>
      <text x="290" y="1052" textAnchor="middle" className="fill-text-secondary text-[14px]">
        i mötande körfält
      </text>
      <Cross x={290} y={1074} />
    </svg>
  );
}
