/**
 * Vänstersväng på landsväg — tre faror: mötande i hög fart, bakomvarande som
 * inte väntar sig en inbromsning, och hjulen som ska stå raka medan man
 * väntar. Trafikförordningen 3 kap 24, 26 och 65 §§.
 *
 * Geometri: landsvägen går lodrätt, x 150–350, mittlinje x 250. Din bil kör
 * uppåt och ligger därför i det östra (högra) körfältet, tätt intill mitten
 * på x 286. Mötande kör nedåt i det västra körfältet på x 200 (roterad 180°).
 * Bakomvarande kör uppåt i samma körfält som du, på x 300. Sidovägen går ut
 * åt väster; svängen korsar det västra körfältet och slutar i sidovägens
 * norra halva, som är höger körfält för den som kör västerut.
 *
 * Koordinaterna ovan är scenens egna. Hela scenen, med etiketter, ligger i
 * en grupp med translate(50 70) som bara ger plats för rubrik och luft runt
 * om; ingen koordinat inne i gruppen har flyttats.
 *
 * Hjulen raka är körteknik, inte en regel — se rutan längst ned.
 */

export function VanstersvangLandsvagDiagram() {
  return (
    <svg
      viewBox="0 0 600 1200"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="leftturn-title leftturn-desc"
    >
      <title id="leftturn-title">Vänstersväng på landsväg: vänta nära mitten med hjulen raka</title>
      <desc id="leftturn-desc">
        Vy uppifrån. En landsväg går lodrätt genom bilden och en mindre väg går ut åt vänster. Din
        bil, ritad med prickmönster, kör uppåt i högra körfältet, har lagt sig alldeles intill
        mittlinjen, blinkar vänster och står stilla med bromsljusen tända. Alla fyra hjulen pekar
        rakt fram. En streckad pil visar den planerade svängen: den korsar det mötande körfältet,
        som är rutmarkerat, och slutar i den bortre halvan av sidovägen. Uppifrån kommer en mötande
        bil i hög fart, markerad 1, med fartstreck och en heldragen pil. Bakifrån, i samma körfält
        som du, kommer en annan bil, markerad 2, som inte väntar sig att någon bromsar in där.
        Markering 3 pekar på dina hjul: de står raka. En teckenförklaring uppe till höger: heldragen
        pil betyder rör sig nu, streckad pil betyder planerad sväng. Under bilden förklaras de tre
        punkterna, och att det inte finns någon uttrycklig väjningsplikt mot mötande: du svänger
        först när du förvissat dig om att det går utan hinder. En ruta längst ned visar varför
        hjulen ska stå raka. Blir bilen påkörd bakifrån med raka hjul knuffas den rakt fram,
        markerat med en bock. Med hjulen vridna åt vänster knuffas den ut i mötande körfält,
        markerat med ett kryss.
      </desc>

      <defs>
        <pattern id="vs-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
        </pattern>
        <pattern id="vs-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="2" />
        </pattern>
        {/* Rutmönster åt båda hållen: skilt från de enkla snedränderna som
            betyder "annan bil". Betyder här "här korsar du mötande körfält". */}
        <pattern id="vs-cross" patternUnits="userSpaceOnUse" width="10" height="10">
          <path d="M 0 0 L 10 10 M 10 0 L 0 10" className="stroke-safety-600" strokeWidth="1.5" />
        </pattern>
        <marker id="vs-arrow-other" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="12" markerHeight="12" markerUnits="userSpaceOnUse" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary-600" />
        </marker>
        <marker id="vs-arrow-plan" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="12" markerHeight="12" markerUnits="userSpaceOnUse" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-attention-600" />
        </marker>
        <marker id="vs-arrow-push" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="12" markerHeight="12" markerUnits="userSpaceOnUse" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-text-primary" />
        </marker>
        {/* Annan bil, fronten uppåt, centrerad i origo */}
        <g id="vs-car-other">
          <rect x="-33" y="-45" width="10" height="22" rx="2" className="fill-text-primary" />
          <rect x="23" y="-45" width="10" height="22" rx="2" className="fill-text-primary" />
          <rect x="-33" y="23" width="10" height="22" rx="2" className="fill-text-primary" />
          <rect x="23" y="23" width="10" height="22" rx="2" className="fill-text-primary" />
          <rect x="-28" y="-55" width="56" height="110" rx="8" fill="url(#vs-stripes)" className="stroke-primary-600" strokeWidth="2" />
          <rect x="-20" y="-40" width="40" height="16" rx="3" className="fill-diagram-marking stroke-primary-400" strokeWidth="1" />
          <rect x="-20" y="28" width="40" height="10" rx="3" className="fill-diagram-marking stroke-primary-400" strokeWidth="1" />
        </g>
      </defs>

      {/* Rubrik */}
      <text x="20" y="38" className="fill-text-primary text-[22px] font-bold">
        Vänstersväng på landsväg
      </text>
      <text x="20" y="60" className="fill-text-secondary text-[14px]">
        Vy uppifrån. Du kör uppåt i bilden.
      </text>

      {/* Scenen. Koordinaterna här inne är de verifierade (se filhuvudet). */}
      <g transform="translate(50 70)">
        {/* Vägar. Sidovägen är ritad ut till bildkanten (x -50) så den inte tar
            slut mitt i luften; körbanan är densamma. */}
        <rect x="150" y="0" width="200" height="690" className="fill-diagram-road" />
        <rect x="-50" y="260" width="200" height="120" className="fill-diagram-road" />
        <line x1="150" y1="0" x2="150" y2="260" className="stroke-diagram-edge" strokeWidth="2" />
        <line x1="150" y1="380" x2="150" y2="690" className="stroke-diagram-edge" strokeWidth="2" />
        <line x1="350" y1="0" x2="350" y2="690" className="stroke-diagram-edge" strokeWidth="2" />
        <line x1="-50" y1="260" x2="150" y2="260" className="stroke-diagram-edge" strokeWidth="2" />
        <line x1="-50" y1="380" x2="150" y2="380" className="stroke-diagram-edge" strokeWidth="2" />
        <line x1="250" y1="0" x2="250" y2="690" className="stroke-diagram-marking" strokeWidth="3" strokeDasharray="16 12" />
        <line x1="-50" y1="320" x2="142" y2="320" className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="10 10" />

        {/* Vägnamn */}
        <text x="200" y="672" textAnchor="middle" className="fill-text-secondary text-[13px] font-medium">
          Landsväg
        </text>
        <text x="-40" y="362" className="fill-text-secondary text-[13px] font-medium">
          Mindre väg
        </text>

        {/* Där svängen korsar mötande körfält */}
        <rect x="152" y="262" width="96" height="116" fill="url(#vs-cross)" className="stroke-safety-600" strokeWidth="2" />

        {/* Teckenförklaring, i eget hörn */}
        <g>
          <path d="M 366 14 L 398 14" className="stroke-primary-600" strokeWidth="4" markerEnd="url(#vs-arrow-other)" />
          <text x="410" y="19" className="fill-text-secondary text-[13px]">
            Rör sig nu
          </text>
          <path d="M 366 40 L 398 40" className="stroke-attention-600" strokeWidth="4" strokeDasharray="8 6" markerEnd="url(#vs-arrow-plan)" />
          <text x="410" y="45" className="fill-text-secondary text-[13px]">
            Planerad sväng
          </text>
        </g>

        {/* 1. Mötande bil i hög fart: kör nedåt i västra körfältet, fartstreck bakom */}
        <g className="stroke-primary-600" strokeWidth="3" strokeLinecap="round">
          <line x1="186" y1="20" x2="186" y2="40" />
          <line x1="200" y1="10" x2="200" y2="40" />
          <line x1="214" y1="20" x2="214" y2="40" />
        </g>
        <use href="#vs-car-other" transform="translate(200 105) rotate(180)" />
        <path d="M 200 168 L 200 248" className="stroke-primary-600" strokeWidth="4" markerEnd="url(#vs-arrow-other)" />

        {/* 2. Bakomvarande bil: kör uppåt i samma körfält som du */}
        <use href="#vs-car-other" transform="translate(300 620)" />
        <path d="M 300 556 L 300 522" className="stroke-primary-600" strokeWidth="4" markerEnd="url(#vs-arrow-other)" />

        {/* Planerad sväng: korsar mötande körfält, slutar i sidovägens norra halva */}
        <path
          d="M 286 396 C 286 330, 262 291, 150 291"
          className="fill-none stroke-attention-600"
          strokeWidth="4"
          strokeDasharray="10 8"
          markerEnd="url(#vs-arrow-plan)"
        />

        {/* Din bil: står stilla intill mittlinjen, hjulen raka, blinkar vänster */}
        <g transform="translate(286 455)">
          <rect x="-33" y="-45" width="10" height="22" rx="2" className="fill-text-primary" />
          <rect x="23" y="-45" width="10" height="22" rx="2" className="fill-text-primary" />
          <rect x="-33" y="23" width="10" height="22" rx="2" className="fill-text-primary" />
          <rect x="23" y="23" width="10" height="22" rx="2" className="fill-text-primary" />
          <rect x="-28" y="-55" width="56" height="110" rx="8" fill="url(#vs-dots)" className="stroke-attention-600" strokeWidth="2" />
          <rect x="-20" y="-40" width="40" height="16" rx="3" className="fill-diagram-marking stroke-attention-600" strokeWidth="1" />
          <rect x="-20" y="28" width="40" height="10" rx="3" className="fill-diagram-marking stroke-attention-600" strokeWidth="1" />
          {/* Bromsljus bak */}
          <rect x="-22" y="52" width="12" height="5" className="fill-safety-600" />
          <rect x="10" y="52" width="12" height="5" className="fill-safety-600" />
          {/* Blinkers vänster: trianglar på vänster sida, med blinkstreck */}
          <polygon points="-28,-56 -28,-47 -37,-51.5" className="fill-attention-600 stroke-text-primary" strokeWidth="1" />
          <polygon points="-28,47 -28,56 -37,51.5" className="fill-attention-600 stroke-text-primary" strokeWidth="1" />
          <g className="stroke-attention-600" strokeWidth="2" strokeLinecap="round">
            <line x1="-41" y1="-57" x2="-48" y2="-63" />
            <line x1="-42" y1="-51.5" x2="-52" y2="-51.5" />
            <line x1="-41" y1="-46" x2="-48" y2="-40" />
            <line x1="-41" y1="46" x2="-48" y2="40" />
            <line x1="-42" y1="51.5" x2="-52" y2="51.5" />
            <line x1="-41" y1="57" x2="-48" y2="63" />
          </g>
        </g>

        {/* Hänvisningslinjer: från etiketten till det den syftar på, med en punkt i änden */}
        <g className="stroke-text-secondary" strokeWidth="1.5">
          <line x1="86" y1="109" x2="166" y2="110" />
          <line x1="78" y1="402" x2="186" y2="362" />
          <line x1="86" y1="458" x2="252" y2="462" />
          <line x1="86" y1="498" x2="232" y2="506" />
          <line x1="363" y1="420" x2="318" y2="402" />
          <line x1="363" y1="480" x2="321" y2="489" />
          <line x1="363" y1="610" x2="331" y2="610" />
        </g>
        <g className="fill-text-secondary">
          <circle cx="166" cy="110" r="3" />
          <circle cx="186" cy="362" r="3" />
          <circle cx="252" cy="462" r="3" />
          <circle cx="232" cy="506" r="3" />
          <circle cx="318" cy="402" r="3" />
          <circle cx="321" cy="489" r="3" />
          <circle cx="331" cy="610" r="3" />
        </g>

        {/* Etiketter vänster */}
        <circle cx="-28" cy="100" r="11" className="fill-text-primary" />
        <text x="-28" y="105" textAnchor="middle" className="fill-surface-base text-[13px] font-bold">
          1
        </text>
        <text x="-10" y="105" className="fill-text-primary text-[15px] font-semibold">
          Mötande bil
        </text>
        <text x="-40" y="124" className="fill-text-secondary text-[13px]">
          i landsvägsfart
        </text>

        <text x="-40" y="406" className="fill-text-primary text-[15px] font-semibold">
          Svängen korsar
        </text>
        <text x="-40" y="424" className="fill-text-primary text-[15px] font-semibold">
          mötande körfält
        </text>

        <text x="-40" y="462" className="fill-text-primary text-[15px] font-semibold">
          Nära vägmitten
        </text>

        <text x="-40" y="502" className="fill-text-primary text-[15px] font-semibold">
          Blinkar vänster
        </text>

        {/* Etiketter höger */}
        <text x="365" y="424" className="fill-text-primary text-[16px] font-semibold">
          Din bil
        </text>
        <text x="365" y="443" className="fill-text-secondary text-[13px]">
          står stilla, väntar
        </text>

        <circle cx="376" cy="476" r="11" className="fill-text-primary" />
        <text x="376" y="481" textAnchor="middle" className="fill-surface-base text-[13px] font-bold">
          3
        </text>
        <text x="394" y="481" className="fill-text-primary text-[15px] font-semibold">
          Hjulen raka
        </text>
        <text x="365" y="500" className="fill-text-secondary text-[13px]">
          inte vridna åt vänster
        </text>

        <circle cx="376" cy="612" r="11" className="fill-text-primary" />
        <text x="376" y="617" textAnchor="middle" className="fill-surface-base text-[13px] font-bold">
          2
        </text>
        <text x="394" y="617" className="fill-text-primary text-[15px] font-semibold">
          Bakomvarande bil
        </text>
        <text x="365" y="636" className="fill-text-secondary text-[13px]">
          väntar sig ingen
        </text>
        <text x="365" y="653" className="fill-text-secondary text-[13px]">
          inbromsning här
        </text>
      </g>

      {/* De tre punkterna */}
      <text x="20" y="806" className="fill-text-primary text-[16px] font-semibold">
        Tre saker som gör svängen svår
      </text>

      <circle cx="30" cy="834" r="11" className="fill-text-primary" />
      <text x="30" y="839" textAnchor="middle" className="fill-surface-base text-[13px] font-bold">
        1
      </text>
      <text x="48" y="839" className="fill-text-primary text-[15px] font-medium">
        Mötande i landsvägsfart: bedöm luckan på fart, inte bara på avstånd.
      </text>
      <text x="48" y="858" className="fill-text-secondary text-[13px]">
        Titta förbi den: bakom kan en motorcykel eller en omkörande ligga.
      </text>

      <circle cx="30" cy="886" r="11" className="fill-text-primary" />
      <text x="30" y="891" textAnchor="middle" className="fill-surface-base text-[13px] font-bold">
        2
      </text>
      <text x="48" y="891" className="fill-text-primary text-[15px] font-medium">
        Bakomvarande väntar sig ingen inbromsning här.
      </text>
      <text x="48" y="910" className="fill-text-secondary text-[13px]">
        Kolla bakåt, ge tecken, bromsa mjukt, i den ordningen (3 kap 65 §).
      </text>

      <circle cx="30" cy="938" r="11" className="fill-text-primary" />
      <text x="30" y="943" textAnchor="middle" className="fill-surface-base text-[13px] font-bold">
        3
      </text>
      <text x="48" y="943" className="fill-text-primary text-[15px] font-medium">
        Hjulen raka medan du väntar. Körteknik, inte en regel, se rutan nedan.
      </text>

      <text x="20" y="976" className="fill-text-secondary text-[13px]">
        Det finns ingen uttrycklig väjningsplikt mot mötande. Du svänger först
      </text>
      <text x="20" y="994" className="fill-text-secondary text-[13px]">
        när du förvissat dig om att svängen går utan hinder (3 kap 24 §).
      </text>

      {/* Förklaringsruta: varför hjulen ska stå raka */}
      <rect x="20" y="1012" width="560" height="176" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="36" y="1038" className="fill-text-primary text-[15px] font-semibold">
        Om du blir påkörd bakifrån medan du väntar:
      </text>
      <text x="36" y="1057" className="fill-text-secondary text-[13px]">
        Streckad linje = gräns mot mötande körfält, till vänster om bilen
      </text>

      {/* Panel A: hjulen raka, bilen knuffas rakt fram */}
      <text x="48" y="1074" textAnchor="middle" className="fill-text-tertiary text-[13px]">
        mötande
      </text>
      <line x1="48" y1="1082" x2="48" y2="1176" className="stroke-text-tertiary" strokeWidth="2" strokeDasharray="6 5" />
      <g transform="translate(88 1130) scale(0.6)">
        <rect x="-33" y="-45" width="10" height="22" rx="2" className="fill-text-primary" />
        <rect x="23" y="-45" width="10" height="22" rx="2" className="fill-text-primary" />
        <rect x="-33" y="23" width="10" height="22" rx="2" className="fill-text-primary" />
        <rect x="23" y="23" width="10" height="22" rx="2" className="fill-text-primary" />
        <rect x="-28" y="-55" width="56" height="110" rx="8" fill="url(#vs-dots)" className="stroke-attention-600" strokeWidth="2.5" />
        <rect x="-20" y="-40" width="40" height="16" rx="3" className="fill-diagram-marking stroke-attention-600" strokeWidth="1.5" />
      </g>
      <path d="M 88 1182 L 88 1170" className="stroke-text-primary" strokeWidth="5" markerEnd="url(#vs-arrow-push)" />
      <path d="M 88 1092 L 88 1078" className="stroke-text-primary" strokeWidth="3" markerEnd="url(#vs-arrow-push)" />
      <text x="122" y="1112" className="fill-text-primary text-[14px] font-semibold">
        Hjulen raka:
      </text>
      <text x="122" y="1130" className="fill-text-primary text-[13px]">
        bilen knuffas rakt fram
      </text>
      <path d="M 123 1148 l 6 6 l 12 -13" className="fill-none stroke-progress-600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      {/* Panel B: hjulen vridna åt vänster, bilen knuffas ut i mötande körfält */}
      <text x="338" y="1074" textAnchor="middle" className="fill-text-tertiary text-[13px]">
        mötande
      </text>
      <line x1="338" y1="1082" x2="338" y2="1176" className="stroke-text-tertiary" strokeWidth="2" strokeDasharray="6 5" />
      <g transform="translate(378 1130) scale(0.6)">
        <rect x="-33" y="-45" width="10" height="22" rx="2" className="fill-text-primary" transform="rotate(-28 -28 -34)" />
        <rect x="23" y="-45" width="10" height="22" rx="2" className="fill-text-primary" transform="rotate(-28 28 -34)" />
        <rect x="-33" y="23" width="10" height="22" rx="2" className="fill-text-primary" />
        <rect x="23" y="23" width="10" height="22" rx="2" className="fill-text-primary" />
        <rect x="-28" y="-55" width="56" height="110" rx="8" fill="url(#vs-dots)" className="stroke-attention-600" strokeWidth="2.5" />
        <rect x="-20" y="-40" width="40" height="16" rx="3" className="fill-diagram-marking stroke-attention-600" strokeWidth="1.5" />
      </g>
      <path d="M 378 1182 L 378 1170" className="stroke-text-primary" strokeWidth="5" markerEnd="url(#vs-arrow-push)" />
      <path d="M 376 1096 L 336 1080" className="stroke-text-primary" strokeWidth="3" markerEnd="url(#vs-arrow-push)" />
      <text x="412" y="1112" className="fill-text-primary text-[14px] font-semibold">
        Hjulen vridna:
      </text>
      <text x="412" y="1130" className="fill-text-primary text-[13px]">
        bilen knuffas ut i
      </text>
      <text x="412" y="1147" className="fill-text-primary text-[13px]">
        mötande körfält
      </text>
      <path d="M 414 1158 L 428 1172 M 428 1158 L 414 1172" className="stroke-safety-600" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
