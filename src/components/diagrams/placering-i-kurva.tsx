/**
 * Placering i kurva — hur långt in i kurvan du ser (RUR-01, RUR-02).
 *
 * Vad bilden lär ut: siktlinjen tangerar kurvans insida, så hur långt du ser
 * beror på hur långt från insidan du befinner dig. Därför ser du kortast i
 * högerkurvan, där ditt körfält ligger på insidan.
 *
 * ---- Geometri (vy uppifrån, båda panelerna i samma lokala koordinater) ----
 * Samma väg och samma radier i båda panelerna, bara åt olika håll:
 *   inre kant r = 150, mittlinje r = 194, yttre kant r = 238, båge 0…70°.
 * Du kör UPPÅT i bilden (minskande y). Vid högertrafik ligger då din högra
 * sida mot bildens högra kant, alltså ska bilen ligga till höger om
 * mittlinjen. Det är den kontrollen som avgör vilket körfält som är ditt:
 *
 *   HÖGERKURVA, kurvcentrum C = (300, 230) till höger om vägen.
 *     Raka delen: yttre kant x = 62, mittlinje x = 106, inre kant x = 150.
 *     Ditt körfält är alltså x 106…150 — det är INRE körfältet.
 *     Bilen: kaross x 115…141, mitt i x = 128. Kontroll: 115 > 106, hela
 *     karossen ligger höger om mittlinjen, marginal 9 åt båda håll.
 *
 *   VÄNSTERKURVA, kurvcentrum C = (10.7, 230) till vänster om vägen.
 *     Raka delen: inre kant x = 160.7, mittlinje x = 204.7, yttre kant x = 248.7.
 *     Ditt körfält är alltså x 204.7…248.7 — det är YTTRE körfältet.
 *     Bilen: kaross x 213.7…239.7, mitt i x = 226.7. Kontroll: 213.7 > 204.7,
 *     hela karossen ligger höger om mittlinjen, marginal 9 åt båda håll.
 *
 * Det är hela poängen: samma förare i samma körfält ligger på kurvans insida i
 * en högerkurva och på dess utsida i en vänsterkurva.
 *
 * ---- Siktlinjerna, räknade som tangenter till inre kanten ----
 * Högerkurva, blickpunkt i bilens front (128, 270), avstånd till C = 176.6:
 *   tangeringspunkt T = (158.0, 181.8), lämnar vägen vid yttre kanten i
 *   (217.4, 6.8). Synlig del av eget körfält: bågen radie 172 fram till
 *   S = (185.2, 102.0), alltså 48.1° av kurvan.
 * Samma kurva men helt ute i kanten, front (137, 270), avstånd 167.8:
 *   T = (153.8, 196.6), och egen bana syns bara fram till (168.1, 134.3),
 *   alltså 36.0°. Skillnaden inom körfältet är verklig men liten — den är
 *   ritad i körfältets egen skala och är inte förstorad för tydlighetens skull.
 * Vänsterkurva, front (226.7, 270), avstånd till C = 219.7:
 *   T = (131.4, 140.9), siktlinjen lämnar den ritade vägen i (72.3, 60.8) på
 *   snittytan vid 70°. Egen bana (radie 216) syns förbi hela den ritade
 *   sträckan — 93.9° skulle behövas, bara 70° är ritade.
 * Dolt område = mellan siktlinjen och inre kanten bortom tangeringspunkten.
 *
 * Panelerna ritas med scale(0.86) och etiketterna ligger i marginalerna.
 *
 * Mönster: prickar = din bil, tunna diagonala ränder = kurvans insida
 * (marken som skymmer), rutmönster = dold vägsträcka, tjock heldragen linje =
 * synlig sträcka i eget körfält, tunn heldragen linje = siktlinje, streckad
 * linje = siktlinje från ett annat läge i körfältet. Inget mönster betyder
 * två saker, och varje yta har både mönster, kontur och etikett.
 */

function Badge({ cx, cy, n }: { cx: number; cy: number; n: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="11" className="fill-text-primary" />
      <text x={cx} y={cy + 5} textAnchor="middle" className="fill-surface-base text-[13px] font-semibold">
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

export function PlaceringIKurvaDiagram() {
  return (
    <svg
      viewBox="0 0 480 900"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="pk-title pk-desc"
    >
      <title id="pk-title">Placering i kurva och hur långt du ser</title>
      <desc id="pk-desc">
        Två landsvägskurvor sedda uppifrån, den ena under den andra, med samma bredd och samma
        radie. I båda kör din bil, fylld med prickmönster, uppåt i det högra körfältet med lika
        stor marginal till mittlinjen som till vägkanten. Marken innanför kurvan är fylld med
        tunna diagonala ränder: det är den som skymmer. Den övre panelen är en högerkurva, där
        ditt körfält ligger på kurvans insida. En tunn heldragen siktlinje går från bilens front,
        snuddar vid inre vägkanten och lämnar vägen vid yttre kanten. Bortom den snuddpunkten är
        ett stort område av vägbanan täckt med rutmönster: det ser du inte. En tjock linje med
        pilspets visar hur långt av ditt eget körfält du ser, och den slutar en bit in i kurvan.
        En streckad siktlinje från ett läge helt ute vid vägkanten slutar ännu tidigare. Den
        nedre panelen är en vänsterkurva med samma radie, där ditt körfält i stället ligger på
        kurvans utsida. Där går siktlinjen mycket längre: den tjocka linjen når förbi hela den
        ritade vägsträckan, och bara en smal remsa längst inne i kurvan är rutmönstrad. Numrerade
        hänvisningar i högermarginalen pekar i övre panelen på det dolda området, på hur långt du
        ser och på placeringen i körfältet, och i nedre panelen på den långa sikten, på den smala
        dolda remsan och på bilen. En ruta längst ned sammanfattar: i högerkurvan ligger ditt
        körfält på insidan och sikten tar slut tidigt, i vänsterkurvan ligger det på utsidan och
        du ser längre, skillnaden mellan de två är större än skillnaden inom körfältet, och farten
        sänks före kurvan eftersom du måste kunna stanna på den sträcka du ser.
      </desc>

      <defs>
        {/* Din bil: prickar */}
        <pattern id="pk-car-fill" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        {/* Kurvans insida — marken som skymmer: tunna diagonala ränder */}
        <pattern id="pk-inside" patternUnits="userSpaceOnUse" width="10" height="10">
          <path d="M-2,2 l4,-4 M0,10 l10,-10 M8,12 l4,-4" className="stroke-primary-400" strokeWidth="1" />
        </pattern>
        {/* Dold vägsträcka: rutmönster */}
        <pattern id="pk-hidden" patternUnits="userSpaceOnUse" width="12" height="12">
          <rect width="12" height="12" className="fill-safety-200" />
          <path d="M 0 0 L 12 12 M 12 0 L 0 12" className="stroke-safety-600" strokeWidth="1.2" />
        </pattern>
        <marker id="pk-arrow-ok" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-progress-600" />
        </marker>
        {/* Din bil, fronten uppåt, centrerad i origo: karossen 26 × 56 */}
        <g id="pk-car">
          <g className="fill-text-primary">
            <rect x="-17" y="-21" width="5" height="12" rx="1.5" />
            <rect x="12" y="-21" width="5" height="12" rx="1.5" />
            <rect x="-17" y="9" width="5" height="12" rx="1.5" />
            <rect x="12" y="9" width="5" height="12" rx="1.5" />
          </g>
          <rect x="-13" y="-28" width="26" height="56" rx="4" fill="url(#pk-car-fill)" className="stroke-attention-600" strokeWidth="2" />
          <rect x="-9" y="-19" width="18" height="9" rx="2" className="fill-diagram-marking stroke-attention-600" strokeWidth="1" />
          <rect x="-8" y="14" width="16" height="7" rx="2" className="fill-diagram-marking stroke-attention-600" strokeWidth="1" />
        </g>
      </defs>

      {/* Rubrik */}
      <text x="20" y="30" className="fill-text-primary text-[16px] font-semibold">
        Placering i kurva — hur långt in du ser
      </text>
      <text x="20" y="50" className="fill-text-secondary text-[13px]">
        Sedd uppifrån. Du kör uppåt i högra körfältet. Samma radie i båda.
      </text>

      {/* Teckenförklaring */}
      <g>
        <line x1="20" y1="76" x2="44" y2="76" className="stroke-progress-600" strokeWidth="5" />
        <text x="52" y="81" className="fill-text-secondary text-[13px]">
          Synlig sträcka i körfältet
        </text>
        <rect x="232" y="69" width="24" height="14" fill="url(#pk-hidden)" className="stroke-safety-600" strokeWidth="1" />
        <text x="264" y="81" className="fill-text-secondary text-[13px]">
          Dold vägsträcka
        </text>

        <line x1="20" y1="98" x2="44" y2="98" className="stroke-attention-600" strokeWidth="2.5" />
        <text x="52" y="103" className="fill-text-secondary text-[13px]">
          Siktlinje — tangerar insidan
        </text>
        <rect x="232" y="91" width="24" height="14" fill="url(#pk-inside)" className="stroke-primary-400" strokeWidth="1" />
        <text x="264" y="103" className="fill-text-secondary text-[13px]">
          Kurvans insida
        </text>
      </g>

      {/* ================= Panel 1: högerkurva ================= */}
      <text x="20" y="128" className="fill-text-primary text-[14px] font-semibold">
        Högerkurva — ditt körfält ligger på insidan
      </text>

      <g transform="translate(12 138) scale(0.86)">
        {/* Vägbana */}
        <path
          d="M 62 330 L 62 230 A 238 238 0 0 1 218.6 6.4 L 248.7 89.1 A 150 150 0 0 0 150 230 L 150 330 Z"
          className="fill-diagram-road"
        />
        {/* Kurvans insida: marken som skymmer */}
        <path
          d="M 150 330 L 150 230 A 150 150 0 0 1 248.7 89.1 L 258 89.1 L 258 330 Z"
          fill="url(#pk-inside)"
          className="stroke-primary-400"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        {/* Kantlinjer och mittlinje */}
        <path d="M 62 330 L 62 230 A 238 238 0 0 1 218.6 6.4" className="fill-none stroke-diagram-edge" strokeWidth="2" />
        <path d="M 150 330 L 150 230 A 150 150 0 0 1 248.7 89.1" className="fill-none stroke-diagram-edge" strokeWidth="2" />
        <path
          d="M 106 330 L 106 230 A 194 194 0 0 1 233.65 47.7"
          className="fill-none stroke-diagram-marking"
          strokeWidth="2"
          strokeDasharray="10 8"
        />

        {/* Dold vägsträcka: bortom tangeringspunkten, mellan siktlinjen och inre kanten */}
        <path
          d="M 158 181.8 A 150 150 0 0 1 248.7 89.1 L 218.6 6.4 Z"
          fill="url(#pk-hidden)"
          className="stroke-safety-600"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />

        {/* Synlig del av eget körfält */}
        <path
          d="M 128 270 L 128 230 A 172 172 0 0 1 185.2 102"
          className="fill-none stroke-progress-600"
          strokeWidth="5"
          markerEnd="url(#pk-arrow-ok)"
        />

        {/* Siktlinje från mitt i körfältet */}
        <line x1="128" y1="270" x2="217.4" y2="6.8" className="stroke-attention-600" strokeWidth="2.5" />
        {/* Siktlinje från ett läge helt ute i kanten */}
        <line
          x1="137"
          y1="270"
          x2="194.9"
          y2="16.5"
          className="stroke-attention-600"
          strokeWidth="2"
          strokeDasharray="7 5"
        />
        <circle cx="137" cy="270" r="5" className="fill-surface-base stroke-attention-600" strokeWidth="2" />
        <circle cx="168.1" cy="134.3" r="5" className="fill-surface-base stroke-attention-600" strokeWidth="2" />

        <use href="#pk-car" transform="translate(128 298)" />
      </g>

      {/* Etiketter panel 1 */}
      <Badge cx={256} cy={206} n="1" />
      <text x="272" y="210" className="fill-text-primary text-[13px] font-semibold">
        Ser du inte
      </text>
      <text x="248" y="228" className="fill-text-secondary text-[13px]">
        kurvans insida skymmer
      </text>
      <Pointer x1={244} y1={208} x2={200} y2={214} />

      <Badge cx={256} cy={268} n="2" />
      <text x="272" y="272" className="fill-text-primary text-[13px] font-semibold">
        Så långt ser du
      </text>
      <text x="248" y="290" className="fill-text-secondary text-[13px]">
        av ditt eget körfält
      </text>
      <Pointer x1={244} y1={272} x2={178} y2={232} />

      <Badge cx={256} cy={340} n="3" />
      <text x="272" y="344" className="fill-text-primary text-[13px] font-semibold">
        Placeringen
      </text>
      <text x="248" y="362" className="fill-text-secondary text-[13px]">
        heldragen linje: mitt i
      </text>
      <text x="248" y="378" className="fill-text-secondary text-[13px]">
        filen. Streckad: helt ute
      </text>
      <text x="248" y="394" className="fill-text-secondary text-[13px]">
        i kanten — kortare sikt
      </text>
      <Pointer x1={244} y1={346} x2={136} y2={368} />

      <text x="20" y="400" className="fill-text-primary text-[13px] font-semibold">
        Du
      </text>
      <line x1="42" y1="396" x2="106" y2="396" className="stroke-text-tertiary" strokeWidth="1.5" />
      <circle cx="106" cy="396" r="3" className="fill-text-tertiary" />

      {/* ================= Panel 2: vänsterkurva ================= */}
      <text x="20" y="454" className="fill-text-primary text-[14px] font-semibold">
        Vänsterkurva — ditt körfält ligger på utsidan
      </text>

      <g transform="translate(12 466) scale(0.86)">
        <path
          d="M 248.7 330 L 248.7 230 A 238 238 0 0 0 92.1 6.4 L 62 89.1 A 150 150 0 0 1 160.7 230 L 160.7 330 Z"
          className="fill-diagram-road"
        />
        <path
          d="M 160.7 330 L 160.7 230 A 150 150 0 0 0 62 89.1 L 54 89.1 L 54 330 Z"
          fill="url(#pk-inside)"
          className="stroke-primary-400"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <path d="M 248.7 330 L 248.7 230 A 238 238 0 0 0 92.1 6.4" className="fill-none stroke-diagram-edge" strokeWidth="2" />
        <path d="M 160.7 330 L 160.7 230 A 150 150 0 0 0 62 89.1" className="fill-none stroke-diagram-edge" strokeWidth="2" />
        <path
          d="M 204.7 330 L 204.7 230 A 194 194 0 0 0 77.1 47.7"
          className="fill-none stroke-diagram-marking"
          strokeWidth="2"
          strokeDasharray="10 8"
        />

        {/* Dold remsa: smal, längst inne i kurvan */}
        <path
          d="M 131.4 140.9 A 150 150 0 0 0 62 89.1 L 72.3 60.8 Z"
          fill="url(#pk-hidden)"
          className="stroke-safety-600"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />

        {/* Synlig del av eget körfält: når förbi hela den ritade sträckan */}
        <path
          d="M 226.7 270 L 226.7 230 A 216 216 0 0 0 84.6 27"
          className="fill-none stroke-progress-600"
          strokeWidth="5"
          markerEnd="url(#pk-arrow-ok)"
        />

        <line x1="226.7" y1="270" x2="72.3" y2="60.8" className="stroke-attention-600" strokeWidth="2.5" />

        <use href="#pk-car" transform="translate(226.7 298)" />
      </g>

      {/* Etiketter panel 2 */}
      <Badge cx={256} cy={506} n="1" />
      <text x="272" y="510" className="fill-text-primary text-[13px] font-semibold">
        Sikten räcker
      </text>
      <text x="248" y="528" className="fill-text-secondary text-[13px]">
        förbi hela den ritade
      </text>
      <text x="248" y="544" className="fill-text-secondary text-[13px]">
        sträckan
      </text>
      <Pointer x1={244} y1={512} x2={160} y2={528} />

      <Badge cx={256} cy={574} n="2" />
      <text x="272" y="578" className="fill-text-primary text-[13px] font-semibold">
        Bara en smal remsa
      </text>
      <text x="248" y="596" className="fill-text-secondary text-[13px]">
        är dold här
      </text>
      <Pointer x1={244} y1={580} x2={122} y2={582} />

      <Badge cx={256} cy={706} n="3" />
      <text x="272" y="710" className="fill-text-primary text-[13px] font-semibold">
        Du
      </text>
      <text x="248" y="728" className="fill-text-secondary text-[13px]">
        samma körfält som ovan,
      </text>
      <text x="248" y="744" className="fill-text-secondary text-[13px]">
        men nu på kurvans utsida
      </text>
      <Pointer x1={244} y1={710} x2={222} y2={714} />

      {/* Slutsats */}
      <rect x="20" y="770" width="440" height="114" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="240" y="792" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Ju längre från insidan du är, desto längre ser du.
      </text>
      <text x="240" y="814" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Skillnaden mellan höger- och vänsterkurva är stor,
      </text>
      <text x="240" y="830" textAnchor="middle" className="fill-text-secondary text-[13px]">
        skillnaden inom det egna körfältet liten men verklig.
      </text>
      <text x="240" y="854" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        Sänk farten före kurvan.
      </text>
      <text x="240" y="872" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Du måste kunna stanna på den sträcka du ser.
      </text>
    </svg>
  );
}
