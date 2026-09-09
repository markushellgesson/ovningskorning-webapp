/**
 * Effektiv bromsning (MAN-07), vy uppifrån.
 *
 * Bildens enda poäng: när pedalen börjar pulsera har ABS gripit in — då håller
 * du kvar trycket och fortsätter styra. Full bromskraft och styrförmåga finns
 * samtidigt; du behöver inte välja mellan att bromsa hårt och att styra undan.
 *
 * REGELLÄGE: ingen väjningsplikt och ingen annan paragraf är inblandad. Det här
 * är körteknik på en avstängd, trafikfri yta. Inga andra trafikanter finns i
 * bilden och ingen text antyder hur någon annan borde agera. INGA MÅTT: ingen
 * bromssträcka i meter, ingen hastighet, ingen sekund och ingen skala. De två
 * förloppen i förklaringsrutan ska läsas mot varandra, inte mätas.
 *
 * ---- GEOMETRI (vy uppifrån, dukens egna koordinater) ----
 * Övningsytan är en rektangel x 160–360, y 96–636. Den är avstängd och har
 * därför INGA körfältslinjer och ingen mittlinje — det finns ingen mötande
 * riktning att placera något i, och inget fordon utom elevens bil i bilden.
 *
 *   DIN BIL kör UPPÅT i bilden (minskande y). Den kommer in på ytan längs
 *   x = 280, alltså i den högra halvan av ytan (280 > ytans mitt 260), och det
 *   är i den banan hindret står. Bilen bromsar och styr åt VÄNSTER förbi
 *   hindret, in mot den tomma delen av ytan (låga x) — inte ut över någon
 *   kant: banans lägsta punkt är x 205,4 och ytans vänsterkant är x 160.
 *
 *   HINDRET (kon) står i bilens egen bana: mitt (280, 340), bas x 268–292,
 *   alltså i den högra halvan av ytan, rakt framför bilens ingångsriktning.
 *   Konen ligger INTE i någon annans väg — det finns ingen annan.
 *
 *   BROMSSPÅREN är hjulbanorna, centrumbanan förskjuten ±11 px:
 *     höger spår x 291,0 → 226,6   (y 588 → 297)
 *     vänster spår x 269,0 → 205,4 (y 588 → 303)
 *   Båda ligger inom ytan x 160–360 hela vägen (min 205,4 / max 291,0).
 *   Spåren KRÖKER — de är inte en rak sträcka följd av en sväng. Det är hela
 *   poängen: bromsning och styrning sker i samma manöver.
 *
 *   MARGINALEN till konen, efterräknad: minsta avstånd centrumbana → konens
 *   mitt är 48,5 px vid (234,7, 357,3). Bilens halva bredd är 13 och konens
 *   halva bredd 12, alltså 48,5 − 13 − 12 = 23,5 px fri marginal. Vid bildens
 *   skala (bil 26 × 44 px ≈ 1,8 × 3,5 m, dvs ~14 px/m) är det knappt två meter.
 *   Ingen siffra om detta står i bilden; kontrollen finns här, inte där.
 *
 *   BILENS SLUTLÄGE: centrum (210,3, 278,8), riktning −15,1° (uppåt-vänster,
 *   banans tangent). Karossens hörn (192,261) (217,254) (229,297) (203,303) —
 *   samtliga inom ytan x 160–360, y 96–636, och norr om konen (y < 328), alltså
 *   har bilen passerat hindret. Framhjulen är vridna −20° och bromsljusen lyser:
 *   den bromsar och styr i samma ögonblick.
 *
 *   FART: tre tvärstreck vid ingången (y 600, 614, 628) = mycket fart in i
 *   manövern. En KORT pil framför bilen (203,252 → 197,229) = det lilla som är
 *   kvar av farten. Skillnaden i pillängd är kvalitativ, inte ett mått.
 *
 * ---- VAD BILDEN AVSTÅR FRÅN: pedalen i sidovy ----
 * Uppdraget bad om en liten sidovy av bromspedalen med foten på. Den är
 * struken. En pedal med en fot på i profil visar ingenting rumsligt som orden
 * inte säger bättre — "pedalen pulserar, håll kvar trycket" är en mening, inte
 * en bild. Det som BARA går att visa är det rumsliga: att bromsspåren kröker
 * hela vägen, att hjulen är vridna medan bromsljusen lyser, och att manövern
 * tar slut på olika ställen beroende på om trycket ligger kvar. Pulseringen
 * bärs därför av bildtexten och av förklaringsrutans två utfall.
 *
 * ---- FÖRKLARINGSRUTAN (efterräknad, inte antagen) ----
 * Två miniscener i scale(0,45) av EXAKT samma lokala geometri som huvudscenen
 * (samma yta, samma kon på (280,340), samma spår), translate(−280, −385) före
 * skalningen. Panelerna har mitt i x 164 och x 384, cy 995; deras ytor upptar
 * x 110–200 och x 330–420 på duken (ytans referenspunkt är x 280, alltså
 * −120·0,45 till vänster och +80·0,45 till höger), alltså ingen kontakt med etiketterna i
 * rutans vänsterkant (som slutar vid x 100) och inte med skiljelinjen x 265.
 * Gemensam referenslinje = bromspunkten, lokal y 588 →
 * 995 + 0,45·(588 − 385) = 1086 på duken, samma i båda panelerna.
 *   Panel A (rätt): trycket kvar. Spåren är kraftiga hela vägen, bilen står i
 *     (210,3, 278,8) — samma läge som i huvudbilden — och den korta pilen visar
 *     att farten nästan är borta. Grön bock.
 *   Panel B (fel): foten lättar vid y ≈ 469. Spåren är kraftiga till dit och
 *     tunna/streckade därefter (svagare bromsverkan), banan förlängs rakt fram
 *     i samma riktning till (208,4, 229,5) / (187,2, 235,3) och bilen står
 *     längre fram, i (192,1, 211,2), med en betydligt längre rörelsepil: farten
 *     är kvar. Karossens hörn (174,193) (199,187) (210,229) (185,236) ligger
 *     inom panelens yta (lokalt x 160–360, y 150–620). Rött kryss.
 *   Ingen kollision ritas och ingen sträcka anges — skillnaden mellan panelerna
 *   är att bromsverkan avtar, ingenting annat påstås.
 *
 * ---- MÖNSTER OCH ROLLER (inget mönster betyder två saker) ----
 *   prickar               = du (elevens bil)
 *   grovt grått band      = bromsspår, däckens väg
 *   tunn röd streckad     = svagare bromsverkan (bara i förklaringsrutan)
 *   heldragen ambergul pil = bilen rör sig nu; längden = hur mycket fart
 *   tre tvärstreck        = fart
 *   triangel med vitt band = hindret (konen) — formen bär betydelsen
 *   röda lampor vid bakkanten = bromsljus
 *   bock / kryss (form)   = utfallet
 * Ingen betydelse bärs av färg ensam: varje roll har form, mönster eller
 * etikett vid sidan av kulören.
 */

interface CarProps {
  cx: number;
  cy: number;
  width: number;
  length: number;
  /** Grader medurs, 0 = fronten uppåt. */
  rot: number;
  /** Framhjulens vridning i grader kring sin egen mitt. */
  turn?: number;
  brakeLights?: boolean;
  fill: string;
  stroke: string;
}

/** Bil med fronten uppåt före rotation. Karossen upptar (cx ± width/2, cy ± length/2). */
function Car({
  cx,
  cy,
  width,
  length,
  rot,
  turn = 0,
  brakeLights = false,
  fill,
  stroke,
}: CarProps) {
  const hw = width / 2;
  const hl = length / 2;
  const glass = `fill-diagram-marking ${stroke}`;
  const fwY = -hl + 5;
  const fwCy = fwY + 4.5;
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rot})`}>
      <g className="fill-text-primary">
        <rect
          x={-hw - 3}
          y={fwY}
          width="5"
          height="9"
          rx="1.5"
          transform={`rotate(${turn} ${-hw - 0.5} ${fwCy})`}
        />
        <rect
          x={hw - 2}
          y={fwY}
          width="5"
          height="9"
          rx="1.5"
          transform={`rotate(${turn} ${hw + 0.5} ${fwCy})`}
        />
        <rect x={-hw - 3} y={hl - 14} width="5" height="9" rx="1.5" />
        <rect x={hw - 2} y={hl - 14} width="5" height="9" rx="1.5" />
      </g>
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
        y={-hl + 6}
        width={width - 10}
        height="7"
        rx="2"
        className={glass}
        strokeWidth="1"
      />
      <rect
        x={-hw + 5}
        y={hl - 10}
        width={width - 10}
        height="5"
        rx="2"
        className={glass}
        strokeWidth="1"
      />
      {brakeLights && (
        <g className="fill-safety-600">
          <rect x={-hw + 2} y={hl - 4} width="7" height="3.5" rx="1.2" />
          <rect x={hw - 9} y={hl - 4} width="7" height="3.5" rx="1.2" />
        </g>
      )}
    </g>
  );
}

/** Trafikkon: triangel med vitt reflexband — formen bär betydelsen. */
function Cone({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-12" y="10" width="24" height="5" rx="1.5" className="fill-primary-600" />
      <path d="M 0 -14 L 10 11 L -10 11 Z" className="fill-primary-600" />
      <rect x="-6" y="-1" width="12" height="4" className="fill-diagram-marking" />
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

/** Tunn pekarlinje från etikett till motiv, med punkt i målet. */
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

/* Hjulbanorna, framräknade ur samma centrumkurva (offset ±11 px). */
const SPAR_H =
  'M 291.0 588.0 L 291.0 578.0 L 291.0 568.4 L 290.9 559.2 L 290.8 550.5 L 290.6 542.1 L 290.5 534.1 L 290.2 526.4 L 290.0 519.1 L 289.6 512.0 L 289.2 505.3 L 288.7 498.8 L 288.2 492.5 L 287.6 486.4 L 286.9 480.5 L 286.1 474.8 L 285.2 469.3 L 284.2 463.9 L 283.2 458.6 L 282.0 453.4 L 280.7 448.2 L 279.3 443.2 L 277.7 438.2 L 276.1 433.2 L 274.3 428.2 L 272.9 424.3 L 271.0 419.4 L 269.1 414.5 L 267.2 409.6 L 265.2 404.6 L 263.2 399.6 L 261.1 394.5 L 259.1 389.4 L 257.0 384.2 L 254.9 379.0 L 252.8 373.7 L 250.7 368.3 L 248.6 362.9 L 246.5 357.4 L 244.4 351.9 L 242.3 346.3 L 240.3 340.6 L 238.2 334.8 L 236.3 329.0 L 234.3 323.0 L 232.4 317.0 L 230.5 310.9 L 228.7 304.7 L 227.0 298.4 L 226.6 297.1';
const SPAR_V =
  'M 269.0 588.0 L 269.0 578.0 L 269.0 568.5 L 268.9 559.4 L 268.8 550.8 L 268.7 542.5 L 268.5 534.7 L 268.2 527.2 L 268.0 520.0 L 267.6 513.2 L 267.3 506.7 L 266.8 500.5 L 266.3 494.5 L 265.7 488.8 L 265.1 483.3 L 264.3 478.0 L 263.5 472.9 L 262.6 468.0 L 261.7 463.2 L 260.6 458.5 L 259.4 453.9 L 258.1 449.3 L 256.8 444.8 L 255.3 440.3 L 253.7 435.8 L 252.3 432.1 L 250.5 427.3 L 248.6 422.5 L 246.7 417.7 L 244.8 412.8 L 242.8 407.8 L 240.7 402.7 L 238.7 397.6 L 236.6 392.4 L 234.5 387.1 L 232.3 381.8 L 230.2 376.3 L 228.0 370.8 L 225.9 365.2 L 223.8 359.6 L 221.6 353.8 L 219.5 347.9 L 217.4 342.0 L 215.4 335.9 L 213.4 329.8 L 211.4 323.5 L 209.5 317.2 L 207.6 310.7 L 205.7 304.2 L 205.4 302.9';
/* Panel B: kraftigt spår till dit foten lättar (y ≈ 469), tunt/streckat därefter. */
const B_STARK_H =
  'M 291.0 588.0 L 291.0 578.0 L 291.0 568.4 L 290.9 559.2 L 290.8 550.5 L 290.6 542.1 L 290.5 534.1 L 290.2 526.4 L 290.0 519.1 L 289.6 512.0 L 289.2 505.3 L 288.7 498.8 L 288.2 492.5 L 287.6 486.4 L 286.9 480.5 L 286.1 474.8 L 285.2 469.3 L 284.8 467.1';
const B_STARK_V =
  'M 269.0 588.0 L 269.0 578.0 L 269.0 568.5 L 268.9 559.4 L 268.8 550.8 L 268.7 542.5 L 268.5 534.7 L 268.2 527.2 L 268.0 520.0 L 267.6 513.2 L 267.3 506.7 L 266.8 500.5 L 266.3 494.5 L 265.7 488.8 L 265.1 483.3 L 264.3 478.0 L 263.5 472.9 L 263.2 471.0';
const B_SVAG_H =
  'M 284.8 467.1 L 283.8 461.7 L 282.7 456.5 L 281.5 451.3 L 280.1 446.2 L 278.7 441.2 L 277.1 436.2 L 275.4 431.2 L 274.0 427.2 L 272.1 422.4 L 270.3 417.5 L 268.3 412.6 L 266.4 407.6 L 264.4 402.6 L 262.4 397.5 L 260.3 392.4 L 258.2 387.3 L 256.1 382.1 L 254.0 376.8 L 251.9 371.5 L 249.8 366.2 L 247.7 360.7 L 245.6 355.2 L 243.5 349.7 L 241.5 344.0 L 239.5 338.3 L 237.4 332.5 L 235.5 326.6 L 233.5 320.6 L 231.6 314.6 L 229.8 308.4 L 228.0 302.2 L 226.6 297.1 L 208.4 229.5';
const B_SVAG_V =
  'M 263.2 471.0 L 262.3 466.1 L 261.2 461.3 L 260.1 456.6 L 258.9 452.1 L 257.6 447.5 L 256.2 443.0 L 254.7 438.5 L 253.3 434.9 L 251.6 430.2 L 249.7 425.4 L 247.9 420.6 L 245.9 415.7 L 244.0 410.8 L 242.0 405.8 L 239.9 400.7 L 237.8 395.5 L 235.7 390.3 L 233.6 385.0 L 231.5 379.6 L 229.3 374.2 L 227.2 368.6 L 225.0 363.0 L 222.9 357.3 L 220.8 351.5 L 218.7 345.6 L 216.6 339.6 L 214.6 333.5 L 212.6 327.3 L 210.6 321.0 L 208.7 314.6 L 206.8 308.1 L 205.4 302.9 L 187.2 235.3';

/**
 * Miniscen till förklaringsrutan: samma yta, samma kon och samma spår som i
 * huvudbilden, i skala 0,45. Skillnaden mellan panelerna är enbart om trycket
 * på pedalen finns kvar genom hela manövern.
 */
function MiniScen({ x, y, variant }: { x: number; y: number; variant: 'kvar' | 'lattar' }) {
  const kvar = variant === 'kvar';
  return (
    <g transform={`translate(${x} ${y}) scale(0.45) translate(-280 -385)`}>
      <rect x="160" y="150" width="200" height="470" className="fill-diagram-road" />
      <rect
        x="160"
        y="150"
        width="200"
        height="470"
        className="fill-none stroke-diagram-edge"
        strokeWidth="4"
      />

      {kvar ? (
        <g
          className="fill-none stroke-text-tertiary"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={SPAR_H} />
          <path d={SPAR_V} />
        </g>
      ) : (
        <>
          <g
            className="fill-none stroke-text-tertiary"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={B_STARK_H} />
            <path d={B_STARK_V} />
          </g>
          <g
            className="fill-none stroke-safety-600"
            strokeWidth="6"
            strokeDasharray="16 14"
            strokeLinecap="round"
          >
            <path d={B_SVAG_H} />
            <path d={B_SVAG_V} />
          </g>
        </>
      )}

      <Cone x={280} y={340} />

      {kvar ? (
        <>
          <Car
            cx={210.3}
            cy={278.8}
            width={26}
            length={44}
            rot={-15.1}
            turn={-20}
            brakeLights
            fill="url(#eb-dots)"
            stroke="stroke-attention-600"
          />
          <line
            x1="203.0"
            y1="251.7"
            x2="198.3"
            y2="234.3"
            className="stroke-attention-600"
            strokeWidth="5"
            markerEnd="url(#eb-arrow)"
          />
        </>
      ) : (
        <>
          <Car
            cx={192.1}
            cy={211.2}
            width={26}
            length={44}
            rot={-15.1}
            turn={-20}
            fill="url(#eb-dots)"
            stroke="stroke-attention-600"
          />
          <line
            x1="184.8"
            y1="184.1"
            x2="177.0"
            y2="155.2"
            className="stroke-attention-600"
            strokeWidth="5"
            markerEnd="url(#eb-arrow)"
          />
        </>
      )}
    </g>
  );
}

export function EffektivBromsningDiagram() {
  return (
    <svg
      viewBox="0 0 500 1200"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="eb-title eb-desc"
    >
      <title id="eb-title">Effektiv bromsning med ABS</title>
      <desc id="eb-desc">
        En avstängd, trafikfri övningsyta sedd uppifrån, ritad som en grå rektangel utan
        körfältslinjer. Inga andra fordon finns i bilden. Nedifrån kommer din bil, fylld med
        prickmönster, i hög fart — tre tvärstreck vid ytans nedre kant visar farten in i manövern.
        Rakt i bilens bana står ett hinder, en kon ritad som en triangel med vitt band. Från
        bromspunkten löper två grova grå band uppåt: bromsspåren efter däcken. De är krökta hela
        vägen och går i en mjuk båge förbi konen på vänster sida, vilket visar att bilen bromsar och
        styr i samma manöver i stället för att först bromsa rakt och sedan svänga. Din bil står
        förbi hindret med framhjulen tydligt vridna och röda bromsljus vid bakkanten, och framför
        den finns bara en kort ambergul pil: farten är nästan borta men styrningen finns kvar. En
        teckenförklaring uppe i högermarginalen namnger de tre linjetyperna: grovt grått band för
        bromsspår, ambergul pil för att bilen rör sig, och tre tvärstreck för fart. Markering ett
        pekar på konen, hindret du både bromsar och styr förbi. Markering två pekar på bilens vridna
        framhjul medan bromsljusen lyser: full broms och full styrning i samma ögonblick. Markering
        tre pekar på de krökta bromsspåren, som kröker under hela bromssträckan i stället för att gå
        rakt först och svänga sedan. Inga mått anges — ingen bromssträcka, ingen hastighet och ingen
        tid. Längst ned jämför en ruta samma manöver två gånger, med en gemensam streckad
        referenslinje vid bromspunkten. I vänstra panelen ligger trycket kvar: spåren är kraftiga
        hela vägen, bilen har nästan stannat strax förbi konen, markerat med en grön bock. I högra
        panelen lättar foten när pedalen börjar pulsera: spåren blir tunna och streckade efter den
        punkten, manövern fortsätter längre fram och bilen är kvar i klar rörelse med en lång pil,
        markerat med ett rött kryss. Ingen kollision visas — det enda som skiljer panelerna är att
        bromsverkan avtar.
      </desc>

      <defs>
        <pattern id="eb-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <marker
          id="eb-arrow"
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
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Bromsa hårt — och styr samtidigt
      </text>
      <text x="20" y="48" className="fill-text-secondary text-[14px]">
        Avstängd, trafikfri yta.
      </text>

      {/* ---- Övningsytan: x 160–360, y 96–636, inga körfältslinjer ---- */}
      <rect x="160" y="96" width="200" height="540" className="fill-diagram-road" />
      <rect
        x="160"
        y="96"
        width="200"
        height="540"
        className="fill-none stroke-diagram-edge"
        strokeWidth="2.5"
      />
      <text x="172" y="122" className="fill-diagram-marking text-[14px] font-semibold">
        Avstängd övningsyta
      </text>

      {/* Fart in i manövern: tre tvärstreck, olika längd */}
      <g className="stroke-text-primary" strokeWidth="4" strokeLinecap="round">
        <line x1="265" y1="600" x2="295" y2="600" />
        <line x1="269" y1="614" x2="291" y2="614" />
        <line x1="273" y1="628" x2="287" y2="628" />
      </g>

      {/* Bromspunkten */}
      <line
        x1="256"
        y1="588"
        x2="304"
        y2="588"
        className="stroke-text-primary"
        strokeWidth="1.5"
        strokeDasharray="5 4"
      />

      {/* Bromsspåren — krökta hela vägen */}
      <g
        className="fill-none stroke-text-tertiary"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={SPAR_H} />
        <path d={SPAR_V} />
      </g>

      <Cone x={280} y={340} />

      {/* Din bil: bromsar och styr samtidigt */}
      <Car
        cx={210.3}
        cy={278.8}
        width={26}
        length={44}
        rot={-15.1}
        turn={-20}
        brakeLights
        fill="url(#eb-dots)"
        stroke="stroke-attention-600"
      />
      <line
        x1="203.0"
        y1="251.7"
        x2="196.8"
        y2="228.5"
        className="stroke-attention-600"
        strokeWidth="4"
        markerEnd="url(#eb-arrow)"
      />

      {/* ---- Teckenförklaring, uppe i den fria högermarginalen ---- */}
      <line
        x1="368"
        y1="126"
        x2="396"
        y2="126"
        className="stroke-text-tertiary"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <text x="404" y="131" className="fill-text-tertiary text-[14px]">
        Bromsspår
      </text>
      <line
        x1="368"
        y1="156"
        x2="394"
        y2="156"
        className="stroke-attention-600"
        strokeWidth="4"
        markerEnd="url(#eb-arrow)"
      />
      <text x="404" y="161" className="fill-text-tertiary text-[14px]">
        Bilen rör sig
      </text>
      <g className="stroke-text-primary" strokeWidth="3" strokeLinecap="round">
        <line x1="368" y1="180" x2="392" y2="180" />
        <line x1="371" y1="186" x2="389" y2="186" />
        <line x1="374" y1="192" x2="386" y2="192" />
      </g>
      <text x="404" y="191" className="fill-text-tertiary text-[14px]">
        Fart
      </text>

      {/* ---- Etiketter i marginalerna ---- */}
      <text x="20" y="214" className="fill-text-primary text-[14px] font-semibold">
        Din bil
      </text>
      <text x="20" y="232" className="fill-text-secondary text-[14px]">
        farten nästan borta,
      </text>
      <text x="20" y="250" className="fill-text-secondary text-[14px]">
        styrningen kvar
      </text>
      <Pointer x1={152} y1={240} x2={194} y2={266} />

      {/* 2. Hjulen vridna medan bromsljusen lyser */}
      <Callout x={382} y={227} n={2} />
      <text x="398" y="232" className="fill-text-primary text-[14px] font-semibold">
        Hjulen vridna
      </text>
      <text x="368" y="252" className="fill-text-secondary text-[14px]">
        medan bromsljusen
      </text>
      <text x="368" y="270" className="fill-text-secondary text-[14px]">
        lyser — full broms
      </text>
      <text x="368" y="288" className="fill-text-secondary text-[14px]">
        och full styrning
      </text>
      <text x="368" y="306" className="fill-text-secondary text-[14px]">
        i samma ögonblick
      </text>
      <Pointer x1={366} y1={242} x2={224} y2={259} />

      {/* 1. Hindret */}
      <Callout x={382} y={352} n={1} />
      <text x="398" y="357" className="fill-text-primary text-[14px] font-semibold">
        Hindret
      </text>
      <text x="368" y="377" className="fill-text-secondary text-[14px]">
        en kon i din bana —
      </text>
      <text x="368" y="395" className="fill-text-secondary text-[14px]">
        du bromsar och
      </text>
      <text x="368" y="413" className="fill-text-secondary text-[14px]">
        styr förbi den
      </text>
      <Pointer x1={369} y1={350} x2={293} y2={342} />

      {/* 3. Spåren kröker */}
      <Callout x={30} y={432} n={3} />
      <text x="46" y="437" className="fill-text-primary text-[14px] font-semibold">
        Spåren kröker
      </text>
      <text x="20" y="457" className="fill-text-secondary text-[14px]">
        bromskraft och styr-
      </text>
      <text x="20" y="475" className="fill-text-secondary text-[14px]">
        ning finns samtidigt
      </text>
      <Pointer x1={152} y1={462} x2={247} y2={425} />

      {/* Bromspunkten */}
      <text x="20" y="560" className="fill-text-primary text-[14px] font-semibold">
        Här börjar du
      </text>
      <text x="20" y="578" className="fill-text-secondary text-[14px]">
        bromsa — med fart
      </text>
      <text x="20" y="596" className="fill-text-secondary text-[14px]">
        in i manövern
      </text>
      <Pointer x1={152} y1={585} x2={255} y2={589} />

      {/* ---- Vad bilden lär ut ---- */}
      <text
        x="250"
        y="668"
        textAnchor="middle"
        className="fill-text-primary text-[15px] font-semibold"
      >
        Pulserar pedalen har ABS gripit in. Håll kvar
      </text>
      <text
        x="250"
        y="688"
        textAnchor="middle"
        className="fill-text-primary text-[15px] font-semibold"
      >
        trycket och fortsätt styra.
      </text>
      <text x="250" y="712" textAnchor="middle" className="fill-text-secondary text-[14px]">
        Pulseringen är signalen om att systemet arbetar, inte ett tecken
      </text>
      <text x="250" y="730" textAnchor="middle" className="fill-text-secondary text-[14px]">
        på att släppa upp. Bromskraft och styrförmåga finns samtidigt —
      </text>
      <text x="250" y="748" textAnchor="middle" className="fill-text-secondary text-[14px]">
        du behöver inte välja mellan att bromsa hårt och att styra undan.
      </text>

      {/* ---- Mönsterförklaring ---- */}
      <g>
        <rect
          x="24"
          y="774"
          width="28"
          height="14"
          rx="2"
          fill="url(#eb-dots)"
          className="stroke-attention-600"
          strokeWidth="1.5"
        />
        <text x="60" y="786" className="fill-text-tertiary text-[14px]">
          Din bil
        </text>
        <line
          x1="160"
          y1="781"
          x2="186"
          y2="781"
          className="stroke-safety-600"
          strokeWidth="4"
          strokeDasharray="7 6"
        />
        <text x="196" y="786" className="fill-text-tertiary text-[14px]">
          Svagare broms
        </text>
        <g className="fill-safety-600">
          <rect x="330" y="776" width="9" height="5" rx="1.5" />
          <rect x="343" y="776" width="9" height="5" rx="1.5" />
        </g>
        <text x="362" y="786" className="fill-text-tertiary text-[14px]">
          Bromsljus
        </text>
      </g>

      {/* ---- Förklaringsruta ---- */}
      <rect
        x="20"
        y="820"
        width="460"
        height="360"
        rx="6"
        className="fill-none stroke-border-default"
        strokeWidth="1.5"
      />
      <text x="34" y="846" className="fill-text-primary text-[14px] font-semibold">
        När pedalen börjar pulsera:
      </text>
      <line
        x1="265"
        y1="858"
        x2="265"
        y2="1168"
        className="stroke-border-default"
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />

      <text
        x="164"
        y="874"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-semibold"
      >
        Trycket ligger kvar
      </text>
      <text
        x="384"
        y="874"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-semibold"
      >
        Foten lättar
      </text>

      <MiniScen x={164} y={995} variant="kvar" />
      <MiniScen x={384} y={995} variant="lattar" />

      {/* Gemensam referenslinje: bromspunkten, lokal y 588 → duk y 1076 */}
      <text x="26" y="1082" className="fill-text-secondary text-[14px]">
        Bromspunkt
      </text>
      <line
        x1="112"
        y1="1086"
        x2="446"
        y2="1086"
        className="stroke-text-tertiary"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="0.5 5"
      />

      <text x="164" y="1124" textAnchor="middle" className="fill-text-secondary text-[14px]">
        Bromsen arbetar hela
      </text>
      <text x="164" y="1142" textAnchor="middle" className="fill-text-secondary text-[14px]">
        vägen, du styr förbi
      </text>
      <Check x={164} y={1166} />

      <text x="384" y="1124" textAnchor="middle" className="fill-text-secondary text-[14px]">
        Bromsverkan avtar mitt
      </text>
      <text x="384" y="1142" textAnchor="middle" className="fill-text-secondary text-[14px]">
        i manövern — fart kvar
      </text>
      <Cross x={384} y={1166} />
    </svg>
  );
}
