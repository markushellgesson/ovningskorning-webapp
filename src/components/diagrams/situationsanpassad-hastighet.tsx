/**
 * Situationsanpassad hastighet — stoppsträckan mot siktsträckan (SPD-02).
 *
 * Vad bilden lär ut: en kurva (eller ett krön) kortar sikten utan att skylten
 * ändras. Farten måste vara sådan att stoppsträckan ryms inom den sträcka du
 * faktiskt ser — inte inom den sträcka skylten tillåter.
 *
 * INGA MÅTT. Ingen meter, sekund, km/h eller multipel står i bilden. Två fall
 * jämförs enbart proportionerligt: en kort stoppsträcka mot en lång, och orden
 * "ryms inom det synliga" mot "sträcker sig förbi det synliga". En notis säger
 * att sträckorna är schematiska (avsnitt 16).
 *
 * ---- Geometri (vy uppifrån, högertrafik) ----
 * Samma väg i båda panelerna: en rak del nedtill som övergår i en vänsterkurva.
 * Ditt eget körfält ritas ensamt (ingen mötande bana), så inget fordon kan
 * hamna i fel körfält. Din bil kör UPPÅT (minskande y) i sitt körfält; hindret
 * står stilla i samma körfält bortom kurvan.
 *   Kurvans centrum Ac = (100,150), centrumradie R = 140, körfältsbredd 44
 *   (inre kant Ri = 118, yttre Ro = 162). Rak del: körfältsmitt x = 240,
 *   kanter x = 218 och 262, från y = 330 (nära) upp till y = 150 (kurvstart).
 *   Bågen svänger vänster, 0…60° moturs.
 * Din bils front ligger på (240,250), karossmitt (240,278) — hela karossen på
 * x 227…253, alltså mellan körfältskanterna 218…262. Kontroll klar.
 *
 * ---- Sikt, hinder och stoppsträckor (efterräknat i spd02_gen.py) ----
 * Siktlinjen från förarens öga (240,250) tangerar inre kanten (Ri) i (215.8,
 * 127.2); bortom den punkten skyms vägen. Siktgränsen läggs tvärs vägen vid
 * bågvinkel 13° (centrumpunkt (236.4,118.5)). Dolt fordon vid bågvinkel 40°,
 * centrum (207.2,60.0) — klart bortom siktgränsen.
 *   Fall RÄTT (anpassad fart): stoppsträckan är rak, från (240,250) till
 *     (240,178) — den slutar FÖRE kurvstarten och därmed före siktgränsen.
 *     Ryms inom det synliga. Bilen stannar i tid.
 *   Fall FEL (skylthastighet): stoppsträckan går rakt till (240,150) och sedan
 *     runt bågen till 50° (190,42.8) — förbi hindret vid 40°. Sträcker sig
 *     förbi siktgränsen in i det dolda och når fram till hindret.
 * Längdförhållandet (bildenheter, inga meter): 72 mot 222, ca 3×. Formen är
 * riktig: högre fart ger klart längre stoppsträcka. Talen är bildenheter.
 *
 * Mönster: prickar = din bil, vågräta ränder = stillastående hinder, rutmönster
 * = dold vägsträcka, diagonal grå skraffering = skymmande terräng på insidan.
 * Inget mönster betyder två saker. Grön kort pil = stoppsträcka som ryms, röd
 * lång pil = stoppsträcka som räcker förbi; båda bär dessutom form (kort/lång),
 * bock/kryss och etikett, så färgen bär ingenting ensam.
 */

const Ac = { x: 100, y: 150 };
const R = 140;
const W = 22;
const Ri = R - W;
const Ro = R + W;
const LX = 240;
const YB = 330;
const YC = 150;
const END = 60;
const SIKT = 13;
const HID = 40;
const STOPB = 50;

const P = (r: number, deg: number): [number, number] => {
  const a = (deg * Math.PI) / 180;
  return [Ac.x + r * Math.cos(a), Ac.y - r * Math.sin(a)];
};
const f = ([x, y]: [number, number]) => `${x.toFixed(1)} ${y.toFixed(1)}`;
const arcPts = (r: number, d0: number, d1: number): [number, number][] => {
  const n = Math.max(2, Math.round(Math.abs(d1 - d0) / 2));
  return Array.from({ length: n + 1 }, (_, i) => P(r, d0 + ((d1 - d0) * i) / n));
};
const poly = (pts: [number, number][]) => pts.map((p) => `L ${f(p)}`).join(' ');

const ROAD =
  `M 218 ${YB} L 218 ${YC} ` +
  poly(arcPts(Ri, 0, END)) +
  ` L ${f(P(Ro, END))} ` +
  poly(arcPts(Ro, END, 0)) +
  ` L 262 ${YB} Z`;
const INNER = `M 218 ${YB} L 218 ${YC} ` + poly(arcPts(Ri, 0, END));
const OUTER = `M 262 ${YB} L 262 ${YC} ` + poly(arcPts(Ro, 0, END));
const GROUND =
  `M 218 ${YB} L 218 ${YC} ` +
  poly(arcPts(Ri, 0, END)) +
  ` L ${Ac.x} ${P(Ri, END)[1].toFixed(1)} L ${Ac.x} ${YB} Z`;
const HIDDEN =
  `M ${f(P(Ri, SIKT))} ` +
  poly(arcPts(Ri, SIKT, END)) +
  ` L ${f(P(Ro, END))} ` +
  poly(arcPts(Ro, END, SIKT)) +
  ' Z';
const SIKTLINE = `M ${f(P(Ri, SIKT))} L ${f(P(Ro, SIKT))}`;
const SIGHTRAY = `M ${LX} 250 L 194.3 18.3`;
const STOPA = `M ${LX} 250 L ${LX} 178`;
const STOPB_PATH = `M ${LX} 250 L ${LX} ${YC} ` + poly(arcPts(R, 0, STOPB));
const HVEH = P(R, HID);

function Badge({ cx, cy, n }: { cx: number; cy: number; n: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="11" className="fill-text-primary" />
      <text
        x={cx}
        y={cy + 5}
        textAnchor="middle"
        className="fill-surface-base text-[14px] font-semibold"
      >
        {n}
      </text>
    </g>
  );
}

/** Fartstreck framför bilen: fler och längre ju högre fart. Säger tempo utan siffror. */
function SpeedLines({ high }: { high: boolean }) {
  const marks = high
    ? [
        [-9, 26],
        [0, 34],
        [9, 26],
      ]
    : [
        [-6, 15],
        [6, 15],
      ];
  return (
    <g className="stroke-attention-600" strokeWidth="3" strokeLinecap="round">
      {marks.map(([off, len], i) => (
        <line key={i} x1={LX + off} y1={244} x2={LX + off} y2={244 - len} />
      ))}
    </g>
  );
}

/** En kurvscen: väg, skymmande insida, siktgräns, dolt hinder. Delas av båda fallen. */
function Scene({ children }: { children?: React.ReactNode }) {
  return (
    <g>
      <path
        d={GROUND}
        fill="url(#sh-ground)"
        className="stroke-text-tertiary"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <path d={ROAD} className="fill-diagram-road" />
      <path
        d={HIDDEN}
        fill="url(#sh-hidden)"
        className="stroke-safety-600"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <path d={INNER} className="fill-none stroke-diagram-edge" strokeWidth="2" />
      <path d={OUTER} className="fill-none stroke-diagram-edge" strokeWidth="2" />

      {/* Siktlinje: tangerar insidan och visar var sikten tar slut */}
      <path
        d={SIGHTRAY}
        className="fill-none stroke-text-tertiary"
        strokeWidth="2"
        strokeDasharray="7 5"
      />
      {/* Siktgräns tvärs vägen */}
      <path d={SIKTLINE} className="stroke-primary-600" strokeWidth="4" strokeLinecap="round" />

      {children}

      {/* Dolt, stillastående fordon bortom kurvan */}
      <g transform={`translate(${HVEH[0].toFixed(1)} ${HVEH[1].toFixed(1)}) rotate(-40)`}>
        <rect
          x="-13"
          y="-24"
          width="26"
          height="48"
          rx="4"
          fill="url(#sh-other)"
          className="stroke-primary-600"
          strokeWidth="2"
        />
        <rect
          x="-9"
          y="-16"
          width="18"
          height="9"
          rx="2"
          className="fill-diagram-marking stroke-primary-600"
          strokeWidth="1"
        />
        <rect
          x="-8"
          y="11"
          width="16"
          height="6"
          rx="2"
          className="fill-diagram-marking stroke-primary-600"
          strokeWidth="1"
        />
      </g>
    </g>
  );
}

export function SituationsanpassadHastighetDiagram() {
  return (
    <svg
      viewBox="0 0 480 952"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="sh-title sh-desc"
    >
      <title id="sh-title">Situationsanpassad hastighet — stoppsträcka mot siktsträcka</title>
      <desc id="sh-desc">
        Två landsvägskurvor sedda uppifrån, den ena under den andra, med exakt samma väg: en rak del
        nedtill som svänger vänster upptill. I båda kör din bil, fylld med prickmönster, uppåt i
        sitt körfält, och bortom kurvan står ett stillastående fordon, fyllt med vågräta ränder, i
        samma körfält. En kraftig mörk linje tvärs vägen är siktgränsen — bortom den skymmer kurvans
        insida, som är fylld med diagonal grå skraffering, vad som finns på vägen. En tunn streckad
        siktlinje från förarens plats snuddar vid insidans kant och visar var sikten tar slut. Vägen
        bortom siktgränsen är täckt med rutmönster: den sträckan ser föraren inte. I den övre
        panelen har bilen anpassad fart, markerad med korta fartstreck, och stoppsträckan ritas som
        en kort grön pil som slutar långt före siktgränsen, med en grön bock: bilen stannar på den
        sträcka den ser, i god tid före det dolda fordonet. I den nedre panelen håller bilen
        skylthastigheten, markerad med längre fartstreck, och stoppsträckan ritas som en lång röd
        pil som fortsätter förbi siktgränsen, in i det dolda rutmönstrade området och ända fram till
        det stillastående fordonet, med ett rött kryss: bilen hinner inte stanna på den sträcka den
        ser. Numrerade hänvisningar pekar på siktgränsen, på det dolda fordonet och, i nedre
        panelen, på platsen där stoppsträckan når förbi det synliga. Inga mått anges, varken i
        meter, sekunder eller km i timmen; sträckorna är schematiska och jämförs bara till storlek.
        En ruta längst ned sammanfattar i ord: anpassa farten så att du kan stanna på den sträcka du
        ser, inte på den sträcka skylten tillåter, och detsamma gäller när sikten är kort av annan
        orsak, till exempel bländning.
      </desc>

      <defs>
        <pattern id="sh-car-fill" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="sh-other" patternUnits="userSpaceOnUse" width="8" height="8">
          <rect width="8" height="8" className="fill-neutral-200" />
          <path d="M0,2 H8 M0,6 H8" className="stroke-primary-600" strokeWidth="1.4" />
        </pattern>
        <pattern id="sh-hidden" patternUnits="userSpaceOnUse" width="12" height="12">
          <rect width="12" height="12" className="fill-safety-200" />
          <path d="M 0 0 L 12 12 M 12 0 L 0 12" className="stroke-safety-600" strokeWidth="1.2" />
        </pattern>
        <pattern id="sh-ground" patternUnits="userSpaceOnUse" width="10" height="10">
          <path
            d="M-2,2 l4,-4 M0,10 l10,-10 M8,12 l4,-4"
            className="stroke-text-tertiary"
            strokeWidth="1"
          />
        </pattern>
        <marker
          id="sh-arrow-ok"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5.5"
          markerHeight="5.5"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-progress-600" />
        </marker>
        <marker
          id="sh-arrow-bad"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5.5"
          markerHeight="5.5"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-safety-600" />
        </marker>
        {/* Din bil, fronten uppåt, centrerad i origo */}
        <g id="sh-car">
          <g className="fill-text-primary">
            <rect x="-17" y="-21" width="5" height="12" rx="1.5" />
            <rect x="12" y="-21" width="5" height="12" rx="1.5" />
            <rect x="-17" y="9" width="5" height="12" rx="1.5" />
            <rect x="12" y="9" width="5" height="12" rx="1.5" />
          </g>
          <rect
            x="-13"
            y="-28"
            width="26"
            height="56"
            rx="4"
            fill="url(#sh-car-fill)"
            className="stroke-attention-600"
            strokeWidth="2"
          />
          <rect
            x="-9"
            y="-19"
            width="18"
            height="9"
            rx="2"
            className="fill-diagram-marking stroke-attention-600"
            strokeWidth="1"
          />
          <rect
            x="-8"
            y="14"
            width="16"
            height="7"
            rx="2"
            className="fill-diagram-marking stroke-attention-600"
            strokeWidth="1"
          />
        </g>
      </defs>

      {/* Rubrik */}
      <text x="20" y="30" className="fill-text-primary text-[16px] font-semibold">
        Anpassa farten efter sikten, inte efter skylten
      </text>
      <text x="20" y="50" className="fill-text-secondary text-[14px]">
        Sedd uppifrån. Du kör uppåt mot en kurva som skymmer sikten.
      </text>
      <text x="20" y="66" className="fill-text-secondary text-[14px]">
        Samma väg båda gångerna — schematiskt, inga mått anges.
      </text>

      {/* Teckenförklaring */}
      <g>
        <line
          x1="20"
          y1="92"
          x2="46"
          y2="92"
          className="stroke-primary-600"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <text x="54" y="97" className="fill-text-secondary text-[14px]">
          Siktgräns
        </text>
        <rect
          x="150"
          y="85"
          width="24"
          height="14"
          fill="url(#sh-hidden)"
          className="stroke-safety-600"
          strokeWidth="1"
        />
        <text x="182" y="97" className="fill-text-secondary text-[14px]">
          Dold vägsträcka
        </text>
        <line
          x1="316"
          y1="92"
          x2="342"
          y2="92"
          className="stroke-text-tertiary"
          strokeWidth="2"
          strokeDasharray="7 5"
        />
        <text x="350" y="97" className="fill-text-secondary text-[14px]">
          Siktlinje
        </text>
      </g>

      {/* ================= Panel 1: anpassad fart ================= */}
      <text x="20" y="128" className="fill-text-primary text-[14px] font-semibold">
        Anpassad fart — stoppsträckan ryms inom det du ser
      </text>
      <g transform="translate(64 150) scale(0.6)">
        <Scene>
          <path
            d={STOPA}
            className="fill-none stroke-progress-600"
            strokeWidth="6"
            strokeLinecap="round"
            markerEnd="url(#sh-arrow-ok)"
          />
          <SpeedLines high={false} />
          <use href="#sh-car" transform={`translate(${LX} 278)`} />
        </Scene>
      </g>
      {/* Etiketter panel 1 */}
      <Badge cx={220} cy={222} n="1" />
      <text x="236" y="219" className="fill-text-primary text-[14px] font-semibold">
        Siktgräns
      </text>
      <text x="236" y="237" className="fill-text-secondary text-[14px]">
        bortom den ser du inte
      </text>
      <Badge cx={210} cy={172} n="2" />
      <text x="226" y="176" className="fill-text-secondary text-[14px]">
        Dolt, stillastående fordon
      </text>
      <path
        d="M 300 285 l 6 6 l 12 -13"
        className="fill-none stroke-progress-600"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="326" y="290" className="fill-text-primary text-[14px] font-semibold">
        Stannar i tid
      </text>

      {/* ================= Panel 2: skylthastighet ================= */}
      <text x="20" y="410" className="fill-text-primary text-[14px] font-semibold">
        Skylthastighet — stoppsträckan räcker förbi det du ser
      </text>
      <g transform="translate(64 432) scale(0.6)">
        <Scene>
          <path
            d={STOPB_PATH}
            className="fill-none stroke-safety-600"
            strokeWidth="6"
            strokeLinecap="round"
            markerEnd="url(#sh-arrow-bad)"
          />
          <SpeedLines high />
          <use href="#sh-car" transform={`translate(${LX} 278)`} />
        </Scene>
      </g>
      {/* Etiketter panel 2 */}
      <Badge cx={220} cy={504} n="1" />
      <text x="236" y="501" className="fill-text-primary text-[14px] font-semibold">
        Siktgräns
      </text>
      <text x="236" y="519" className="fill-text-secondary text-[14px]">
        stoppsträckan passerar den
      </text>
      <Badge cx={196} cy={462} n="3" />
      <text x="212" y="466" className="fill-text-secondary text-[14px]">
        Når fram till det dolda hindret
      </text>
      <path
        d="M 300 566 L 314 580 M 314 566 L 300 580"
        className="stroke-safety-600"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <text x="322" y="577" className="fill-text-primary text-[14px] font-semibold">
        Hinner inte stanna
      </text>

      {/* ================= Regelruta i ord ================= */}
      <rect
        x="20"
        y="636"
        width="440"
        height="296"
        rx="6"
        className="fill-none stroke-border-default"
        strokeWidth="1.5"
      />
      <text x="34" y="664" className="fill-text-primary text-[15px] font-semibold">
        Regeln, i ord:
      </text>
      <text x="34" y="690" className="fill-text-secondary text-[14px]">
        Håll en fart där du kan stanna på den sträcka du
      </text>
      <text x="34" y="710" className="fill-text-secondary text-[14px]">
        faktiskt ser — inte på hela den sträcka skylten
      </text>
      <text x="34" y="730" className="fill-text-secondary text-[14px]">
        tillåter.
      </text>

      <path
        d="M 34 758 l 6 6 l 12 -13"
        className="fill-none stroke-progress-600"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="60" y="764" className="fill-text-secondary text-[14px]">
        Stoppsträckan ryms inom det synliga.
      </text>
      <path
        d="M 34 784 L 48 798 M 48 784 L 34 798"
        className="stroke-safety-600"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <text x="60" y="796" className="fill-text-secondary text-[14px]">
        Stoppsträckan sträcker sig förbi det synliga.
      </text>

      <text x="34" y="834" className="fill-text-secondary text-[14px]">
        En kurva eller ett krön kortar sikten utan att
      </text>
      <text x="34" y="854" className="fill-text-secondary text-[14px]">
        skylten ändras — då sänker du farten själv.
      </text>
      <text x="34" y="882" className="fill-text-secondary text-[14px]">
        Detsamma gäller när sikten är kort av annan
      </text>
      <text x="34" y="902" className="fill-text-secondary text-[14px]">
        orsak, till exempel bländning: farten följer den
      </text>
      <text x="34" y="922" className="fill-text-secondary text-[14px]">
        sikt du har, oavsett orsaken.
      </text>
    </svg>
  );
}
