/**
 * Blicken långt fram — styrningen följer blicken (MAN-02, OBS-01).
 *
 * Vad bilden lär ut: var blicken ligger avgör hur bilens väg ser ut. Lång
 * blick ger en mjuk båge, kort blick ger ständiga korrigeringar.
 *
 * ---- Geometri (vy uppifrån, båda panelerna identiska) ----
 * Vägen går uppåt och böjer sedan svagt åt höger. Kurvcentrum ligger till
 * höger, i C = (480, 268). Radier: vänster vägkant 420 (rak del x = 60),
 * mittlinje 360 (x = 120), höger vägkant 300 (x = 180). Bågen sveper 16°.
 * Körfältsmitt i det egna, högra körfältet: radie 330, rak del x = 150.
 *
 * Din bil kör UPPÅT i bilden (minskande y). Vid högertrafik ligger då dess
 * högra sida mot bildens högra kant, alltså ska den ligga till höger om
 * mittlinjen: mittlinjen x = 120, bilen x 137…163 med karossmitt i x = 150.
 * Kontroll: 137 > 120, hela karossen ligger i det högra körfältet, och
 * marginalen till mittlinjen (17) är lika stor som till högra vägkanten
 * (180 − 163 = 17). Ingen mötande trafik ritas — bilden handlar om din egen
 * styrning, inte om möte.
 *
 * Panel A (rätt): blickpunkten ligger vid (158.5, 193.8), alltså långt fram i
 * kurvan, och bilens väg är exakt körfältsmittens båge. Den prickade
 * blicklinjen ritas ovanpå vägen och sammanfaller med den — det är hela
 * poängen: styrningen följer blicken.
 *
 * Panel B (fel): blickpunkten ligger vid (150, 278) i panelens lokala
 * koordinater, bara ett par billängder framför fronten. Blicklinjen är
 * därför kort och slutar direkt. Bilens väg svänger i stället mellan x ≈ 143
 * och x ≈ 163.5. Med halva karossbredden 13 ger det ytterlägen x 130 och
 * 176.5 — kontrollerat mot körfältet, som på den höjden är minst 128.9…182.4
 * brett. Bilen slingrar alltså inom sitt eget körfält utan att korsa
 * mittlinjen; den slingrar, den byter inte fil.
 *
 * Panel B ritas som panel A förskjuten 268 px nedåt; ingen geometri är ändrad.
 * Båda scenerna förskjuts dessutom 20 px åt vänster (translate(−20 …)) så att
 * högermarginalen rymmer etiketterna. Alla koordinater ovan är scenens egna;
 * pekarlinjernas mål är angivna i bildens koordinater, alltså 20 px mindre.
 *
 * Linjespråk: tjock linje med pilspets = bilens väg, prickad linje = din
 * blick, ring med kärna = blickpunkt. Prickmönster = din bil. Inget mönster
 * betyder två saker. Bock och kryss bär rätt och fel parallellt med färgen.
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

/** Blickpunkt: ring med kärna. Formen bär betydelsen, färgen skiljer bara panelerna åt. */
function GazePoint({ x, y, tone }: { x: number; y: number; tone: 'ok' | 'bad' }) {
  const stroke = tone === 'ok' ? 'stroke-progress-600' : 'stroke-safety-600';
  const fill = tone === 'ok' ? 'fill-progress-600' : 'fill-safety-600';
  return (
    <g>
      <circle cx={x} cy={y} r="9" className={`fill-surface-base ${stroke}`} strokeWidth="2.5" />
      <circle cx={x} cy={y} r="3" className={fill} />
    </g>
  );
}

/** Vägen: rak del uppåt som övergår i en svag högerkurva. Samma i båda panelerna. */
function Road() {
  return (
    <g>
      <path
        d="M 60 356 L 60 268 A 420 420 0 0 1 76.3 152.2 L 191.6 185.3 A 300 300 0 0 0 180 268 L 180 356 Z"
        className="fill-diagram-road"
      />
      <path d="M 60 356 L 60 268 A 420 420 0 0 1 76.3 152.2" className="fill-none stroke-diagram-edge" strokeWidth="2" />
      <path d="M 180 356 L 180 268 A 300 300 0 0 1 191.6 185.3" className="fill-none stroke-diagram-edge" strokeWidth="2" />
      <path
        d="M 120 356 L 120 268 A 360 360 0 0 1 133.9 168.8"
        className="fill-none stroke-diagram-marking"
        strokeWidth="2"
        strokeDasharray="10 8"
      />
    </g>
  );
}

export function BlickenLangtFramDiagram() {
  return (
    <svg
      viewBox="0 0 460 770"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="bl-title bl-desc"
    >
      <title id="bl-title">Blicken långt fram styr bilen</title>
      <desc id="bl-desc">
        Två likadana vägar sedda uppifrån, den ena under den andra. Vägen går uppåt och böjer
        sedan svagt åt höger. På båda kör din bil, fylld med prickmönster, uppåt i det högra
        körfältet med lika stor marginal till mittlinjen som till högra vägkanten. Den övre
        panelen är märkt Rätt med en bock. Där ligger blickpunkten, ritad som en ring med en
        kärna, långt fram i kurvan, och bilens väg är en enda mjuk båge som följer körfältets
        mitt. Den prickade blicklinjen löper ovanpå bilens väg och sammanfaller med den: bilen går
        dit blicken går. Numrerade hänvisningar i högermarginalen pekar på blickpunkten, på den
        mjuka vägen och på bilen. Den nedre panelen är märkt Fel med ett kryss. Där ligger
        blickpunkten alldeles framför bilens front och den prickade blicklinjen är bara en kort
        stump. Bilens väg är i stället en slingrande linje som svänger fram och tillbaka inom det
        egna körfältet, utan att korsa mittlinjen, med tre tydliga utslag. Numrerade hänvisningar
        pekar på den korta blicken, på den slingrande vägen och på bilen. En ruta längst ned
        sammanfattar: titta dit du vill att bilen ska åka, blicken drar styrningen med sig, och
        små justeringar räcker när blicken ligger långt fram.
      </desc>

      <defs>
        {/* Din bil: prickar */}
        <pattern id="bl-car-fill" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <marker id="bl-arrow-ok" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-progress-600" />
        </marker>
        <marker id="bl-arrow-bad" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-safety-600" />
        </marker>
        <marker id="bl-arrow-key" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-text-primary" />
        </marker>
        {/* Din bil, fronten uppåt, centrerad i origo: karossen 26 × 46 */}
        <g id="bl-car">
          <g className="fill-text-primary">
            <rect x="-17" y="-17" width="5" height="10" rx="1.5" />
            <rect x="12" y="-17" width="5" height="10" rx="1.5" />
            <rect x="-17" y="7" width="5" height="10" rx="1.5" />
            <rect x="12" y="7" width="5" height="10" rx="1.5" />
          </g>
          <rect x="-13" y="-23" width="26" height="46" rx="4" fill="url(#bl-car-fill)" className="stroke-attention-600" strokeWidth="2" />
          <rect x="-9" y="-15" width="18" height="8" rx="2" className="fill-diagram-marking stroke-attention-600" strokeWidth="1" />
          <rect x="-8" y="11" width="16" height="6" rx="2" className="fill-diagram-marking stroke-attention-600" strokeWidth="1" />
        </g>
      </defs>

      {/* Rubrik */}
      <text x="20" y="30" className="fill-text-primary text-[16px] font-semibold">
        Blicken långt fram styr bilen
      </text>
      <text x="20" y="50" className="fill-text-secondary text-[13px]">
        Sedd uppifrån. Du kör uppåt i högra körfältet.
      </text>

      {/* Teckenförklaring */}
      <g>
        <path d="M 20 74 L 44 74" className="stroke-text-primary" strokeWidth="4" markerEnd="url(#bl-arrow-key)" />
        <text x="56" y="79" className="fill-text-secondary text-[13px]">
          Bilens väg
        </text>
        <line
          x1="150"
          y1="74"
          x2="176"
          y2="74"
          className="stroke-text-primary"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="0.5 6"
        />
        <text x="186" y="79" className="fill-text-secondary text-[13px]">
          Din blick
        </text>
        <circle cx="278" cy="74" r="8" className="fill-surface-base stroke-text-primary" strokeWidth="2.5" />
        <circle cx="278" cy="74" r="3" className="fill-text-primary" />
        <text x="292" y="79" className="fill-text-secondary text-[13px]">
          Blickpunkt
        </text>
      </g>

      {/* ---- Panel A: blicken långt fram ---- */}
      <path d="M 20 114 l 5 5 l 10 -11" className="fill-none stroke-progress-600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="44" y="120" className="fill-text-primary text-[14px] font-semibold">
        Rätt: blicken långt fram
      </text>

      <g transform="translate(-20 0)">
        <Road />
        {/* Bilens väg: körfältsmittens båge, en enda mjuk rörelse */}
        <path
          d="M 150 297 L 150 268 A 330 330 0 0 1 158.5 193.8"
          className="fill-none stroke-progress-600"
          strokeWidth="5"
          markerEnd="url(#bl-arrow-ok)"
        />
        {/* Blicken: prickad, ligger ovanpå vägen — den sammanfaller med den */}
        <path
          d="M 150 297 L 150 268 A 330 330 0 0 1 158.5 193.8"
          className="fill-none stroke-text-primary"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="0.5 7"
        />
        <GazePoint x={158.5} y={193.8} tone="ok" />
        <use href="#bl-car" transform="translate(150 320)" />
      </g>

      <Badge cx={222} cy={196} n="1" />
      <text x="238" y="200" className="fill-text-primary text-[13px] font-semibold">
        Blicken hit
      </text>
      <text x="214" y="218" className="fill-text-secondary text-[13px]">
        dit bilen ska vara
      </text>
      <text x="214" y="234" className="fill-text-secondary text-[13px]">
        om en stund
      </text>
      <Pointer x1={210} y1={196} x2={150} y2={194} />

      <Badge cx={222} cy={268} n="2" />
      <text x="238" y="272" className="fill-text-primary text-[13px] font-semibold">
        Bilens väg
      </text>
      <text x="214" y="290" className="fill-text-secondary text-[13px]">
        en enda mjuk båge —
      </text>
      <text x="214" y="306" className="fill-text-secondary text-[13px]">
        små rattrörelser räcker
      </text>
      <Pointer x1={210} y1={270} x2={134} y2={262} />

      <Badge cx={222} cy={330} n="3" />
      <text x="238" y="334" className="fill-text-primary text-[13px] font-semibold">
        Du
      </text>
      <text x="214" y="352" className="fill-text-secondary text-[13px]">
        i högra körfältet
      </text>
      <Pointer x1={210} y1={332} x2={146} y2={326} />

      {/* ---- Panel B: blicken strax framför bilen ---- */}
      <path d="M 20 380 L 32 392 M 32 380 L 20 392" className="stroke-safety-600" strokeWidth="3" strokeLinecap="round" />
      <text x="44" y="392" className="fill-text-primary text-[14px] font-semibold">
        Fel: blicken fastnar strax framför bilen
      </text>

      <g transform="translate(-20 268)">
        <Road />
        {/* Bilens väg: slingrar mellan x ≈ 143 och x ≈ 163.5, alltid inom eget körfält */}
        <path
          d="M 150 297 L 150 278 Q 168 262 152 244 Q 133 226 154 208 Q 172 194 156 184"
          className="fill-none stroke-safety-600"
          strokeWidth="5"
          markerEnd="url(#bl-arrow-bad)"
        />
        {/* Blicken: kort stump, slutar vid blickpunkten */}
        <line
          x1="150"
          y1="297"
          x2="150"
          y2="289"
          className="stroke-text-primary"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="0.5 7"
        />
        <GazePoint x={150} y={278} tone="bad" />
        <use href="#bl-car" transform="translate(150 320)" />
      </g>

      <Badge cx={222} cy={470} n="2" />
      <text x="238" y="474" className="fill-text-primary text-[13px] font-semibold">
        Bilens väg
      </text>
      <text x="214" y="492" className="fill-text-secondary text-[13px]">
        slingrar i filen —
      </text>
      <text x="214" y="508" className="fill-text-secondary text-[13px]">
        ratten korrigerar
      </text>
      <text x="214" y="524" className="fill-text-secondary text-[13px]">
        hela tiden
      </text>
      <Pointer x1={210} y1={470} x2={146} y2={464} />

      <Badge cx={222} cy={546} n="1" />
      <text x="238" y="550" className="fill-text-primary text-[13px] font-semibold">
        Blicken fastnar
      </text>
      <text x="214" y="568" className="fill-text-secondary text-[13px]">
        strax framför bilen
      </text>
      <Pointer x1={210} y1={548} x2={142} y2={546} />

      <Badge cx={222} cy={600} n="3" />
      <text x="238" y="604" className="fill-text-primary text-[13px] font-semibold">
        Du
      </text>
      <text x="214" y="622" className="fill-text-secondary text-[13px]">
        i högra körfältet
      </text>
      <Pointer x1={210} y1={600} x2={146} y2={596} />

      {/* Slutsats */}
      <rect x="20" y="664" width="420" height="82" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="230" y="692" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Titta dit du vill att bilen ska åka —
      </text>
      <text x="230" y="712" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        blicken drar styrningen med sig.
      </text>
      <text x="230" y="733" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Ligger blicken långt fram räcker små justeringar i ratten.
      </text>
    </svg>
  );
}
