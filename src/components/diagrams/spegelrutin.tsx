/**
 * Spegelrutin (OBS-02) — spegeln hör till ett beslut, och görs innan beslutet.
 *
 * Bildens enda poäng: spegelkollen är knuten till en bestämd manöver —
 * fartändring, sväng eller körfältsbyte — och sker FÖRE den. Därför är varje
 * blick ritad som något som pågår nu (heldragen blicklinje med öga) medan
 * manövern är ritad som något som ännu inte hänt (streckad pil framför bilen).
 * Bilden slutar vid beslutet; själva sväng- eller filbytesförloppet visas inte,
 * och döda vinkelns fysiska förklaring hör till ett annat moment.
 *
 * Tre avgränsade vinjetter, inte en sammanhängande trafikscen. Den tredje är
 * störst eftersom den bär hela ordningen spegel → tecken → axelblick.
 *
 * Inga regelpåståenden: det här är körteknik, inte en paragraf. Inga mått,
 * inga sekunder, inga avstånd i siffror.
 *
 * ---- GEOMETRI (högertrafik, vy uppifrån, dukens egna koordinater) ----
 * Alla tre vinjetterna använder SAMMA vägavsnitt: körbanan x 250–362 med
 * körfältslinjen på x 306. ALL trafik i bilden kör UPPÅT (minskande y). För
 * den som kör uppåt ligger förarens högra sida mot bildens högra kant, alltså:
 *   vänster körfält x 250–306 (mitt 278), höger körfält x 306–362 (mitt 334).
 * Elevens bil ligger i höger körfält i alla tre vinjetterna: cx 334 > 306. ✔
 * Vänstermarginalen x 20–250 är fri och bär all text.
 *
 * VINJETT 1 — före fartändring (ruta y 144–330, väg y 152–322)
 *   Du:            (334, 216) kaross x 321–347, y 194–238   höger körfält ✔
 *   Bilen bakom:   (334, 296) kaross x 321–347, y 274–318   höger körfält ✔
 *   Innerspegeln tittar rakt bakåt: blicklinje x 334, y 252 → 270 med pilspets;
 *   bilen bakom börjar vid y 274, alltså NÅR blicken fram — spegeln visar den.
 *   Manövern (fartändringen) ligger framför bilen, y 190 → 164, streckad:
 *   den har inte hänt än. Blicken (y 252–270) ligger bakom, manövern framför.
 *
 * VINJETT 2 — före sväng (ruta y 340–548, väg y 348–540)
 *   Du:            (334, 468) kaross x 321–347, y 446–490   höger körfält ✔
 *   Cyklist:       (352, 522) kropp  x 345–359, y 512–532   höger körfält ✔
 *     Cyklisten ligger BAKOM dig (din bakkant y 490 < cyklistens framkant 512)
 *     och till höger inom samma körfält — precis det höger ytterspegel visar.
 *   Blicklinje från höger ytterspegel: (355, 460) → (353, 505), pilspets vid
 *   cyklistens framkant 512 → blicken når fram.
 *   Sidovägen går ut åt höger, x 362–420, y 360–424. Den planerade svängen
 *   (streckad) går från (334, 442) till (384, 392) — framför bilen, alltså
 *   efter blicken. Ingen konflikt ritas: bilden slutar vid beslutet.
 *
 * VINJETT 3 — före körfältsbyte (ruta y 558–876, väg y 566–868)
 *   Du:            (334, 690) kaross x 321–347, y 668–712   höger körfält ✔
 *   Cyklist:       (278, 756) kropp  x 271–285, y 746–766
 *     Största x = 285 < 306 → VÄNSTER körfält, alltså det körfält du ska in i,
 *     och snett BAKOM dig (din bakkant y 712 < cyklistens framkant 746). Det är
 *     där döda vinkeln ligger vid ett byte åt vänster.
 *   1 Spegel:  blicklinje (314, 668) → (303, 691), avslutad med tvärstreck.
 *     Cyklistens närmaste hörn är (285, 746); avståndet från linjens slut är
 *     √(18² + 55²) ≈ 58 px — spegeln tar slut långt innan cyklisten. ✔
 *   2 Tecken:  vänsterblinkers vid karossens bakre vänstra hörn, (318, 708),
 *     triangeln x 307–318 y 702–714, blinkstrecken x 295–302 vid y 703 och 713.
 *     Spegellinjen är slut redan vid y 691 och rör dem alltså inte.
 *   3 Axelblick: blicklinje (321, 722) → (287, 755) med pilspets. Cyklistens
 *     högerkant är x 285, y-bandet 746–766 → linjen NÅR fram. ✔
 *     Spegellinjen och axelblickslinjen korsar inte varandra: i det gemensamma
 *     y-intervallen alls: spegeln slutar y 691, axelblicken börjar y 722.
 *   Manövern (körfältsbytet) är streckad och ligger FRAMFÖR bilen,
 *   (334, 662) → (278, 606), i vänster körfält. Den har inte påbörjats.
 *
 * HÄNVISNINGSLINJER (kontrollerade parvis, inga korsningar)
 *   V1: (176,198)→(332,178)  och (192,256)→(330,258)   y-band 178–198 / 256–258
 *   V2: (168,396)→(344,393)  och (186,532)→(343,518)   y-band 393–396 / 518–532
 *   V3: (150,664)→(301,693), (150,734)→(305,708), (186,790)→(267,752)
 *       y-band 664–693 / 708–734 / 752–790 — parvis åtskilda. Nr 1 slutar på
 *       x 301 och nr 2 passerar x 303 först vid y 708, alltså under spegellinjens
 *       slut (y 691) — de korsar varken varandra eller spegellinjen. Ingen av dem
 *       skär ett fordon: nr 1 passerar y 685–687 där cyklisten börjar först
 *       y 746; nr 2 passerar y 712–714 vid cyklistens x-band; nr 3 stannar på
 *       x 267, alltså 4 px till vänster om cyklisten och når den utifrån.
 *
 * FÖRKLARINGSRUTAN (efterräknad, lokala koordinater, skala 0,45, uppåt)
 *   Samma väg: vänster körfält x −56–0, höger 0–56. Du (28, 20) → x 15–41,
 *   y −2–42, alltså höger körfält i BÅDA panelerna. Cyklisten (−28, 70) →
 *   x −35–−21, y 60–80, vänster körfält och bakom dig i båda panelerna.
 *   RÄTT: axelblickslinjen (15, 48) → (−19, 66) når cyklistens kant (−21) och
 *     ingen manöverpil ritas — du väntar. Spegellinjen slutar vid (0, 46),
 *     √(21² + 14²) ≈ 25 px från cyklistens hörn (−21, 60).
 *   FEL:  bara spegellinjen finns. Manöverpilen går ut i vänster körfält och
 *     ytan du svänger in i, x −56–0, y 10–54, är krysskrafferad. Cyklistens
 *     framkant är y 60 — konfliktytan ligger alltså precis framför cyklisten,
 *     inte bakom. Det är felets riktning, och den är kontrollerad.
 *
 * MÖNSTER (ett mönster, en enda betydelse)
 *   prickar = du, diagonala ränder = annan bil, kryss = cyklist,
 *   krysskraffering = yta du styr in i utan att ha sett.
 * LINJER
 *   öga + heldragen linje med pilspets = blicken når fram (sker nu)
 *   heldragen linje som slutar i tvärstreck = så långt spegeln når
 *   streckad pil = manövern, som kommer efter blicken
 *   heldragen mörk pil = annat fordon kör nu
 * Färg bär ingen betydelse ensam: varje roll har mönster, form eller etikett.
 */

interface CarProps {
  cx: number;
  cy: number;
  width: number;
  length: number;
  fill: string;
  stroke: string;
}

/** Bil med fronten uppåt; karossen upptar exakt (cx ± width/2, cy ± length/2). */
function Car({ cx, cy, width, length, fill, stroke }: CarProps) {
  const hw = width / 2;
  const hl = length / 2;
  const glass = `fill-diagram-marking ${stroke}`;
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <g className="fill-text-primary">
        <rect x={-hw - 3} y={-hl + 5} width="5" height="9" rx="1.5" />
        <rect x={hw - 2} y={-hl + 5} width="5" height="9" rx="1.5" />
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
    </g>
  );
}

/** Cyklist sedd uppifrån, fronten uppåt: kropp 14 × 20, styre 16 brett. */
function Cyclist({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <g className="fill-text-primary">
        <rect x="-2" y="-13" width="4" height="8" rx="1.5" />
        <rect x="-2" y="5" width="4" height="8" rx="1.5" />
      </g>
      <rect
        x="-7"
        y="-10"
        width="14"
        height="20"
        rx="5"
        fill="url(#sr-cross)"
        className="stroke-safety-600"
        strokeWidth="2"
      />
      <line
        x1="-8"
        y1="-6"
        x2="8"
        y2="-6"
        className="stroke-text-primary"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle
        cx="0"
        cy="-1"
        r="3.6"
        className="fill-diagram-marking stroke-text-primary"
        strokeWidth="1.5"
      />
    </g>
  );
}

/** Öga: markerar var en blick utgår ifrån. */
function Eye({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path
        d={`M ${x - 5} ${y} q 5 -4.5 10 0 q -5 4.5 -10 0 z`}
        className="fill-diagram-marking stroke-progress-600"
        strokeWidth="1.6"
      />
      <circle cx={x} cy={y} r="1.6" className="fill-progress-600" />
    </g>
  );
}

/**
 * Blicklinje. Med `stop` avslutas linjen med ett tvärstreck (så långt spegeln
 * når) i stället för pilspets (blicken når fram). Tvärstrecket räknas ut ur
 * linjens egen riktning, inte uppskattat.
 */
function LookLine({
  x1,
  y1,
  x2,
  y2,
  stop,
  w = 2.5,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stop?: boolean;
  w?: number;
}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const px = (-dy / len) * 6.5;
  const py = (dx / len) * 6.5;
  return (
    <g className="stroke-progress-600" strokeWidth={w}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} markerEnd={stop ? undefined : 'url(#sr-arrow-look)'} />
      {stop && <line x1={x2 - px} y1={y2 - py} x2={x2 + px} y2={y2 + py} />}
    </g>
  );
}

/**
 * Vänsterblinkers: triangel som pekar ut åt vänster från karossens vänstra
 * sida, med två blinkstreck. `k` skalar hela markören — vinjett 3 använder en
 * större, eftersom tecknet är ett eget steg i ordningen och måste gå att se.
 */
function LeftBlinker({ x, y, k = 1 }: { x: number; y: number; k?: number }) {
  return (
    <g>
      <path
        d={`M ${x} ${y - 5 * k} L ${x} ${y + 5 * k} L ${x - 9 * k} ${y} z`}
        className="fill-attention-600 stroke-attention-600"
        strokeWidth="1"
      />
      <g className="stroke-attention-600" strokeWidth={2 * k} strokeLinecap="round">
        <line x1={x - 13 * k} y1={y - 4 * k} x2={x - 18 * k} y2={y - 6 * k} />
        <line x1={x - 13 * k} y1={y + 4 * k} x2={x - 18 * k} y2={y + 6 * k} />
      </g>
    </g>
  );
}

/** Numrerat steg i ordningen — bara vinjett 3 använder siffror. */
function Step({ x, y, n }: { x: number; y: number; n: number }) {
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

/** Vägavsnittet som alla tre vinjetterna delar: två körfält, all trafik uppåt. */
function Road({ y, height }: { y: number; height: number }) {
  return (
    <g>
      <rect x="250" y={y} width="112" height={height} className="fill-diagram-road" />
      <g className="fill-none stroke-diagram-edge" strokeWidth="2">
        <line x1="250" y1={y} x2="250" y2={y + height} />
        <line x1="362" y1={y} x2="362" y2={y + height} />
      </g>
      <line
        x1="306"
        y1={y}
        x2="306"
        y2={y + height}
        className="stroke-diagram-marking"
        strokeWidth="2"
        strokeDasharray="14 10"
      />
    </g>
  );
}

/**
 * Miniscen i förklaringsrutan: samma väg i skala 0,45, samma riktning uppåt.
 * Vänster körfält x −56–0, höger körfält x 0–56. Du alltid i höger, cyklisten
 * alltid i vänster och bakom dig.
 */
function MiniByte({ x, y, variant }: { x: number; y: number; variant: 'axelblick' | 'utan' }) {
  const ok = variant === 'axelblick';
  return (
    <g transform={`translate(${x} ${y}) scale(0.45)`}>
      <rect x="-56" y="-110" width="112" height="220" className="fill-diagram-road" />
      {!ok && (
        <rect
          x="-56"
          y="10"
          width="56"
          height="44"
          fill="url(#sr-hatch)"
          className="stroke-safety-600"
          strokeWidth="2"
        />
      )}
      <g className="fill-none stroke-diagram-edge" strokeWidth="3">
        <line x1="-56" y1="-110" x2="-56" y2="110" />
        <line x1="56" y1="-110" x2="56" y2="110" />
      </g>
      <line
        x1="0"
        y1="-110"
        x2="0"
        y2="110"
        className="stroke-diagram-marking"
        strokeWidth="3"
        strokeDasharray="14 10"
      />

      <Cyclist cx={-28} cy={70} />
      <Car
        cx={28}
        cy={20}
        width={26}
        length={44}
        fill="url(#sr-dots)"
        stroke="stroke-attention-600"
      />

      {/* Spegeln räcker inte hela vägen — i båda panelerna */}
      <LookLine x1={9} y1={12} x2={0} y2={46} stop w={5} />

      {ok ? (
        <>
          <LookLine x1={15} y1={48} x2={-19} y2={66} w={5} />
          <Eye x={20} y={50} />
        </>
      ) : (
        <path
          d="M 28 -4 C 28 -24 -28 -18 -28 -38"
          className="fill-none stroke-attention-600"
          strokeWidth="5"
          strokeDasharray="12 9"
          markerEnd="url(#sr-arrow-plan)"
        />
      )}
    </g>
  );
}

export function SpegelrutinDiagram() {
  return (
    <svg
      viewBox="0 0 440 1174"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="sr-title sr-desc"
    >
      <title id="sr-title">Spegelrutin — spegeln hör till beslutet</title>
      <desc id="sr-desc">
        Tre avskilda rutor, var och en med samma vägavsnitt sett uppifrån: två körfält i samma
        riktning, all trafik uppåt i bilden. Elevens bil, fylld med prickmönster, ligger i det högra
        körfältet i alla tre rutorna. I varje ruta går en blick bakåt eller åt sidan innan en
        manöver, och manövern är ritad som en streckad pil framför bilen — den har inte hänt än.
        Första rutan, före fartändring: en tunn heldragen linje med ett öga går rakt bakåt från
        bilen och slutar med en pilspets vid en bil bakom, fylld med diagonala ränder. Andra rutan,
        före sväng: samma slags blicklinje går bakåt längs bilens högra sida till en cyklist, fylld
        med krysmönster, som ligger bakom och till höger i samma körfält; en streckad pil svänger av
        in i en sidoväg åt höger. Tredje och största rutan, före körfältsbyte, med tre numrerade
        steg: siffran ett vid en blicklinje som går snett bakåt vänsterut och slutar med ett
        tvärstreck, så långt spegeln når; siffran två vid två triangelformade vänsterblinkers på
        bilens vänstra sida, varav den främre blinkar; siffran tre vid en blicklinje som utgår från
        ett öga vid bilens bakre vänstra hörn och når ända fram till en cyklist med krysmönster som
        ligger snett bakom i det vänstra körfältet, långt utanför spegellinjens slut. En streckad
        pil framför bilen visar det planerade bytet in i vänster körfält. Längst ned en ruta med
        samma väg två gånger: till vänster görs axelblicken, blicklinjen når cyklisten, ingen
        manöver påbörjas, markerat med en bock; till höger finns bara spegellinjen som tar slut, den
        streckade pilen går ut i vänster körfält och ytan bilen styr in i, rakt framför cyklisten,
        är krysskrafferad, markerat med ett kryss.
      </desc>

      <defs>
        <pattern id="sr-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="sr-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path
            d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4"
            className="stroke-primary-600"
            strokeWidth="2"
          />
        </pattern>
        <pattern id="sr-cross" patternUnits="userSpaceOnUse" width="7" height="7">
          <path d="M1.5,1.5 l4,4 M5.5,1.5 l-4,4" className="stroke-safety-600" strokeWidth="1.4" />
        </pattern>
        <pattern id="sr-hatch" patternUnits="userSpaceOnUse" width="10" height="10">
          <path d="M0,10 l10,-10 M0,0 l10,10" className="stroke-safety-600" strokeWidth="1.3" />
        </pattern>
        <marker
          id="sr-arrow-move"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="12"
          markerHeight="12"
          markerUnits="userSpaceOnUse"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary-600" />
        </marker>
        <marker
          id="sr-arrow-plan"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="13"
          markerHeight="13"
          markerUnits="userSpaceOnUse"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-attention-600" />
        </marker>
        <marker
          id="sr-arrow-look"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="11"
          markerHeight="11"
          markerUnits="userSpaceOnUse"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-progress-600" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="30" className="fill-text-primary text-[17px] font-semibold">
        Spegelrutin
      </text>
      <text x="20" y="52" className="fill-text-secondary text-[14px]">
        Spegeln hör till ett beslut — och görs innan du utför det
      </text>

      {/* Teckenförklaring */}
      <g>
        <rect
          x="20"
          y="71"
          width="22"
          height="14"
          rx="2"
          fill="url(#sr-dots)"
          className="stroke-attention-600"
          strokeWidth="1.5"
        />
        <text x="50" y="83" className="fill-text-secondary text-[14px]">
          Du
        </text>
        <rect
          x="232"
          y="71"
          width="22"
          height="14"
          rx="2"
          fill="url(#sr-cross)"
          className="stroke-safety-600"
          strokeWidth="1.5"
        />
        <text x="262" y="83" className="fill-text-secondary text-[14px]">
          Cyklist
        </text>
        <rect
          x="330"
          y="71"
          width="22"
          height="14"
          rx="2"
          fill="url(#sr-stripes)"
          className="stroke-primary-600"
          strokeWidth="1.5"
        />
        <text x="360" y="83" className="fill-text-secondary text-[14px]">
          Annan bil
        </text>

        <line
          x1="32"
          y1="106"
          x2="48"
          y2="106"
          className="stroke-progress-600"
          strokeWidth="2.5"
          markerEnd="url(#sr-arrow-look)"
        />
        <Eye x={26} y={106} />
        <text x="60" y="111" className="fill-text-secondary text-[14px]">
          Blicken når fram
        </text>
        <g className="stroke-progress-600" strokeWidth="2.5">
          <line x1="232" y1="106" x2="250" y2="106" />
          <line x1="250" y1="100" x2="250" y2="112" />
        </g>
        <text x="262" y="111" className="fill-text-secondary text-[14px]">
          Så långt spegeln når
        </text>

        <path
          d="M 20 130 L 46 130"
          className="stroke-attention-600"
          strokeWidth="3"
          strokeDasharray="8 6"
          markerEnd="url(#sr-arrow-plan)"
        />
        <text x="60" y="135" className="fill-text-secondary text-[14px]">
          Manövern — efter blicken
        </text>
        <path
          d="M 232 130 L 254 130"
          className="stroke-primary-600"
          strokeWidth="3"
          markerEnd="url(#sr-arrow-move)"
        />
        <text x="262" y="135" className="fill-text-secondary text-[14px]">
          Kör nu
        </text>
      </g>

      {/* ---------- VINJETT 1: före fartändring ---------- */}
      <rect
        x="20"
        y="144"
        width="400"
        height="186"
        rx="6"
        className="fill-none stroke-border-default"
        strokeWidth="1.5"
      />
      <Road y={152} height={170} />
      <text x="20" y="176" className="fill-text-primary text-[15px] font-semibold">
        Före fartändring
      </text>

      <path
        d="M 334 190 L 334 164"
        className="stroke-attention-600"
        strokeWidth="4"
        strokeDasharray="10 8"
        markerEnd="url(#sr-arrow-plan)"
      />
      <Car
        cx={334}
        cy={216}
        width={26}
        length={44}
        fill="url(#sr-dots)"
        stroke="stroke-attention-600"
      />
      <Eye x={334} y={246} />
      <LookLine x1={334} y1={252} x2={334} y2={270} />
      <line
        x1="352"
        y1="272"
        x2="352"
        y2="254"
        className="stroke-primary-600"
        strokeWidth="3"
        markerEnd="url(#sr-arrow-move)"
      />
      <Car
        cx={334}
        cy={296}
        width={26}
        length={44}
        fill="url(#sr-stripes)"
        stroke="stroke-primary-600"
      />

      <text x="20" y="204" className="fill-text-secondary text-[14px]">
        Sedan: ändra farten
      </text>
      <Pointer x1={176} y1={198} x2={332} y2={178} />
      <text x="20" y="252" className="fill-text-primary text-[14px] font-semibold">
        Innerspegeln
      </text>
      <text x="20" y="270" className="fill-text-secondary text-[14px]">
        vad finns rakt bakom?
      </text>
      <Pointer x1={192} y1={256} x2={330} y2={258} />

      {/* ---------- VINJETT 2: före sväng ---------- */}
      <rect
        x="20"
        y="340"
        width="400"
        height="208"
        rx="6"
        className="fill-none stroke-border-default"
        strokeWidth="1.5"
      />
      <Road y={348} height={192} />
      {/* Sidoväg åt höger */}
      <rect x="362" y="360" width="58" height="64" className="fill-diagram-road" />
      <g className="fill-none stroke-diagram-edge" strokeWidth="2">
        <line x1="362" y1="360" x2="420" y2="360" />
        <line x1="362" y1="424" x2="420" y2="424" />
      </g>
      <text x="20" y="372" className="fill-text-primary text-[15px] font-semibold">
        Före sväng
      </text>

      <path
        d="M 334 442 C 334 412 348 392 384 392"
        className="fill-none stroke-attention-600"
        strokeWidth="4"
        strokeDasharray="10 8"
        markerEnd="url(#sr-arrow-plan)"
      />
      <Car
        cx={334}
        cy={468}
        width={26}
        length={44}
        fill="url(#sr-dots)"
        stroke="stroke-attention-600"
      />
      <Eye x={356} y={452} />
      <LookLine x1={355} y1={460} x2={353} y2={505} />
      <line
        x1="341"
        y1="508"
        x2="341"
        y2="497"
        className="stroke-primary-600"
        strokeWidth="3"
        markerEnd="url(#sr-arrow-move)"
      />
      <Cyclist cx={352} cy={522} />

      <text x="20" y="400" className="fill-text-secondary text-[14px]">
        Sedan: du svänger
      </text>
      <Pointer x1={168} y1={396} x2={344} y2={393} />
      <text x="20" y="510" className="fill-text-primary text-[14px] font-semibold">
        Höger ytterspegel
      </text>
      <text x="20" y="528" className="fill-text-secondary text-[14px]">
        cyklist vid sidan?
      </text>
      <Pointer x1={186} y1={532} x2={343} y2={518} />

      {/* ---------- VINJETT 3: före körfältsbyte ---------- */}
      <rect
        x="20"
        y="558"
        width="400"
        height="318"
        rx="6"
        className="fill-none stroke-border-default"
        strokeWidth="1.5"
      />
      <Road y={566} height={302} />
      <text x="20" y="592" className="fill-text-primary text-[15px] font-semibold">
        Före körfältsbyte
      </text>
      <text x="20" y="614" className="fill-text-secondary text-[14px]">
        hela ordningen — och den
      </text>
      <text x="20" y="632" className="fill-text-secondary text-[14px]">
        sista blicken är ingen spegel
      </text>

      <path
        d="M 334 662 C 334 636 278 642 278 606"
        className="fill-none stroke-attention-600"
        strokeWidth="4"
        strokeDasharray="10 8"
        markerEnd="url(#sr-arrow-plan)"
      />
      <Car
        cx={334}
        cy={690}
        width={26}
        length={44}
        fill="url(#sr-dots)"
        stroke="stroke-attention-600"
      />
      <LookLine x1={314} y1={668} x2={303} y2={691} stop w={3} />
      <LeftBlinker x={318} y={708} k={1.25} />
      <LookLine x1={321} y1={722} x2={287} y2={755} />
      <Eye x={326} y={724} />
      <line
        x1="278"
        y1="742"
        x2="278"
        y2="724"
        className="stroke-primary-600"
        strokeWidth="3"
        markerEnd="url(#sr-arrow-move)"
      />
      <Cyclist cx={278} cy={756} />

      <Step x={32} y={662} n={1} />
      <text x="50" y="667" className="fill-text-primary text-[14px] font-semibold">
        Spegel
      </text>
      <text x="20" y="688" className="fill-text-secondary text-[14px]">
        vad finns bakom
      </text>
      <text x="20" y="706" className="fill-text-secondary text-[14px]">
        och bredvid dig?
      </text>
      <Pointer x1={150} y1={664} x2={301} y2={693} />

      <Step x={32} y={724} n={2} />
      <text x="50" y="729" className="fill-text-primary text-[14px] font-semibold">
        Tecken
      </text>
      <text x="20" y="750" className="fill-text-secondary text-[14px]">
        blinkers innan
      </text>
      <text x="20" y="768" className="fill-text-secondary text-[14px]">
        du styr
      </text>
      <Pointer x1={150} y1={734} x2={305} y2={708} />

      <Step x={32} y={792} n={3} />
      <text x="50" y="797" className="fill-text-primary text-[14px] font-semibold">
        Axelblick
      </text>
      <text x="20" y="818" className="fill-text-secondary text-[14px]">
        vrid huvudet — sist
      </text>
      <text x="20" y="836" className="fill-text-secondary text-[14px]">
        cyklisten i döda vinkeln
      </text>
      <text x="20" y="854" className="fill-text-secondary text-[14px]">
        syns inte i spegeln
      </text>
      <Pointer x1={186} y1={790} x2={267} y2={752} />

      {/* Vad bilden lär ut */}
      <text
        x="220"
        y="902"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-medium"
      >
        Spegeln hör ihop med en manöver — och kommer före den.
      </text>
      <text
        x="220"
        y="920"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-medium"
      >
        Vid körfältsbyte: spegel, tecken, axelblick, i den ordningen.
      </text>

      {/* Förklaringsruta */}
      <rect
        x="20"
        y="936"
        width="400"
        height="222"
        rx="6"
        className="fill-none stroke-border-default"
        strokeWidth="1.5"
      />
      <text x="34" y="960" className="fill-text-primary text-[14px] font-semibold">
        Vad axelblicken avgör:
      </text>
      <line
        x1="220"
        y1="974"
        x2="220"
        y2="1146"
        className="stroke-border-default"
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />

      <MiniByte x={118} y={1030} variant="axelblick" />
      <text
        x="118"
        y="1098"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-semibold"
      >
        Axelblicken görs
      </text>
      <text x="118" y="1116" textAnchor="middle" className="fill-text-secondary text-[14px]">
        du ser cyklisten, du väntar
      </text>
      <Check x={118} y={1138} />

      <MiniByte x={322} y={1030} variant="utan" />
      <text
        x="322"
        y="1098"
        textAnchor="middle"
        className="fill-text-primary text-[14px] font-semibold"
      >
        Axelblicken hoppas över
      </text>
      <text x="322" y="1116" textAnchor="middle" className="fill-text-secondary text-[14px]">
        du styr ut framför cyklisten
      </text>
      <Cross x={322} y={1138} />
    </svg>
  );
}
