/**
 * Omkörning på landsväg (LANE-03) — sikt framåt, mötande trafik och marginal
 * före och efter. Trafikförordningen 3 kap 32, 36 och 37 §§, som redan är
 * formulerade i momentet; figuren visar bara geometrin runt dem.
 *
 * Geometri: din trafik kör åt höger i bilden (ökande x). Förarens högra sida
 * är då bildens nedre kant, så ditt körfält är det nedre (y 150–230). Den
 * mötande kör åt vänster (minskande x); dess högra sida är bildens övre kant,
 * så den mötandes körfält är det övre (y 70–150).
 *
 * Koordinaterna ovan är scenens egna. Scenen ligger i en grupp med
 * translate(0 50) som bara ger plats för rubriken; inga koordinater inne i
 * gruppen har flyttats.
 */

type Heading = 'up' | 'down' | 'left' | 'right';

function nosePoints(x: number, y: number, w: number, h: number, heading: Heading): string {
  switch (heading) {
    case 'right':
      return `${x + w - 9},${y + 4} ${x + w - 2},${y + h / 2} ${x + w - 9},${y + h - 4}`;
    case 'left':
      return `${x + 9},${y + 4} ${x + 2},${y + h / 2} ${x + 9},${y + h - 4}`;
    case 'up':
      return `${x + 4},${y + 9} ${x + w / 2},${y + 2} ${x + w - 4},${y + 9}`;
    case 'down':
      return `${x + 4},${y + h - 9} ${x + w / 2},${y + h - 2} ${x + w - 4},${y + h - 9}`;
  }
}

/** Fordon sett uppifrån: mönstrad kropp och en fylld nos som visar färdriktningen. */
function Car({
  x,
  y,
  w,
  h,
  heading,
  fill,
  stroke,
  nose,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  heading: Heading;
  fill: string;
  stroke: string;
  nose: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="4" fill={fill} className={stroke} strokeWidth="2" />
      <polygon points={nosePoints(x, y, w, h, heading)} className={nose} />
    </g>
  );
}

/** Fartstreck bakom ett fordon som kör åt vänster: x är bakkanten (högerkanten), cy mittlinjen. */
function StreaksLeftward({ x, cy, stroke }: { x: number; cy: number; stroke: string }) {
  return (
    <g className={stroke} strokeWidth="2" strokeLinecap="round">
      <line x1={x + 6} y1={cy - 6} x2={x + 18} y2={cy - 6} />
      <line x1={x + 6} y1={cy} x2={x + 26} y2={cy} />
      <line x1={x + 6} y1={cy + 6} x2={x + 18} y2={cy + 6} />
    </g>
  );
}

/** Numrerad hänvisning: fylld cirkel med siffra. */
function Badge({ cx, cy, n }: { cx: number; cy: number; n: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="11" className="fill-text-primary" />
      <text x={cx} y={cy + 5} textAnchor="middle" className="fill-surface-base text-[13px] font-bold">
        {n}
      </text>
    </g>
  );
}

/** Tunn pekarlinje från etiketten till det den syftar på, med en punkt i änden. */
function Pointer({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-text-secondary" strokeWidth="1.5" />
      <circle cx={x2} cy={y2} r="3" className="fill-text-secondary" />
    </g>
  );
}

/** Liten tvåfältsväg för förklaringsrutan: mötande körfält överst, ditt underst. */
function MiniRoad({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width="300" height="36" className="fill-diagram-road" />
      <line x1={x} y1={y} x2={x + 300} y2={y} className="stroke-diagram-edge" strokeWidth="1.5" />
      <line x1={x} y1={y + 36} x2={x + 300} y2={y + 36} className="stroke-diagram-edge" strokeWidth="1.5" />
      <line
        x1={x}
        y1={y + 18}
        x2={x + 300}
        y2={y + 18}
        className="stroke-diagram-marking"
        strokeWidth="1.5"
        strokeDasharray="6 5"
      />
    </g>
  );
}

export function OmkorningLandsvagDiagram() {
  return (
    <svg
      viewBox="0 0 720 790"
      className="w-full max-w-2xl mx-auto"
      role="img"
      aria-labelledby="overtake-title overtake-desc"
    >
      <title id="overtake-title">Omkörning på landsväg</title>
      <desc id="overtake-desc">
        Landsväg sedd uppifrån med två körfält. Ditt körfält är det nedre och trafiken där kör åt
        höger; det övre är det mötande körfältet där trafiken kör åt vänster. Din bil har
        prickmönster och en fylld nos som visar färdriktningen; den visas i tre lägen: bakom en
        långsammare bil med diagonalt randmönster, ute i det mötande körfältet mitt för den, och
        tillbaka i det egna körfältet framför den. En streckad grön pil med pilspets binder ihop de
        tre lägena. Långt fram i det mötande körfältet syns en mötande bil med kryssmönster som kör
        åt vänster, med fartstreck bakom sig. Fyra numrerade markeringar med tunna pekarlinjer: 1,
        en pil bakåt från din bil: kolla bakåt först. 2, en tunn prickad siktlinje från din bil
        snett förbi bilen framför ända fram till den mötande: ligg så att du ser förbi. 3, en
        klammer ovanför hela vägen från din bil till den mötande: den fria sträcka som krävs för
        att komma ut, förbi och tillbaka innan mötet. 4, en klammer under vägen mellan bilen du
        kört om och din bil när du är tillbaka till höger: marginalen efter, så att du inte
        tränger. En teckenförklaring under vägen förklarar mönstren, den streckade banan och
        siktlinjen. Texten under bilden upprepar grundvillkoret: du får köra om endast om det kan
        ske utan fara (3 kap 32 §), och blir det inte fritt ligger du kvar bakom. En ruta längst
        ned visar två små scenarier: fri sträcka så långt det behövs, där du är tillbaka till höger
        innan mötet, markerad med en bock, och inte fritt, där du inte kör om utan ligger kvar
        bakom, markerad med ett kryss.
      </desc>

      <defs>
        <pattern id="ok-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
        </pattern>
        <pattern id="ok-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="2" />
        </pattern>
        <pattern id="ok-cross" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M0,0 L8,8 M8,0 L0,8" className="stroke-safety-600" strokeWidth="1.5" />
        </pattern>
        <marker
          id="ok-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-progress-600" />
        </marker>
        <marker
          id="ok-arrow-back"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-text-tertiary" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="36" className="fill-text-primary text-[22px] font-bold">
        Omkörning på landsväg
      </text>
      <text x="20" y="58" className="fill-text-secondary text-[14px]">
        Fri sträcka ut, förbi och tillbaka — med marginal före och efter
      </text>

      {/* Scenen. Koordinaterna här inne är de verifierade (se filhuvudet). */}
      <g transform="translate(0 50)">
        {/* 3. Fri sträcka som krävs: klammer ovanför vägen från din bil till den mötande */}
        <line x1="100" y1="56" x2="620" y2="56" className="stroke-progress-600" strokeWidth="2" />
        <line x1="100" y1="50" x2="100" y2="62" className="stroke-progress-600" strokeWidth="2" />
        <line x1="620" y1="50" x2="620" y2="62" className="stroke-progress-600" strokeWidth="2" />
        <text x="360" y="46" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
          Fri sträcka som krävs: ut, förbi och tillbaka — innan mötet
        </text>
        <Badge cx={78} cy={56} n={3} />

        {/* Vägbanan: mötande körfält y 70–150, ditt körfält y 150–230 */}
        <rect x="20" y="70" width="680" height="160" className="fill-diagram-road" />
        <line x1="20" y1="70" x2="700" y2="70" className="stroke-diagram-edge" strokeWidth="2" />
        <line x1="20" y1="230" x2="700" y2="230" className="stroke-diagram-edge" strokeWidth="2" />
        <line
          x1="20"
          y1="150"
          x2="700"
          y2="150"
          className="stroke-diagram-marking"
          strokeWidth="3"
          strokeDasharray="10 8"
        />
        <text x="28" y="86" className="fill-text-secondary text-[13px] font-medium">
          Mötande körfält
        </text>
        <text x="28" y="222" className="fill-text-secondary text-[13px] font-medium">
          Ditt körfält
        </text>

        {/* 2. Siktlinje: från din bil, snett förbi bilen framför, ända fram till den mötande */}
        <line
          x1="150"
          y1="180"
          x2="620"
          y2="111"
          className="stroke-text-tertiary"
          strokeWidth="1.5"
          strokeDasharray="3 4"
        />
        <Badge cx={200} cy={128} n={2} />
        <Pointer x1={208} y1={137} x2={228} y2={166} />

        {/* Din bana: ut, förbi, tillbaka */}
        <path
          d="M 150 191 Q 215 191 245 150 L 330 111 L 400 111 Q 460 111 498 191"
          className="fill-none stroke-progress-600"
          strokeWidth="2.5"
          strokeDasharray="7 5"
          markerEnd="url(#ok-arrow)"
        />

        {/* 1. Kolla bakåt först: pil bakåt från din bil */}
        <line
          x1="96"
          y1="191"
          x2="62"
          y2="191"
          className="stroke-text-tertiary"
          strokeWidth="2"
          markerEnd="url(#ok-arrow-back)"
        />
        <Badge cx={75} cy={167} n={1} />

        {/* Bilen som körs om, i ditt körfält hela tiden */}
        <Car
          x={250}
          y={178}
          w={55}
          h={26}
          heading="right"
          fill="url(#ok-stripes)"
          stroke="stroke-primary-600"
          nose="fill-primary-600"
        />
        <text x="277" y="174" textAnchor="middle" className="fill-text-secondary text-[13px]">
          Omkörd
        </text>

        {/* Mötande, långt fram i sitt eget körfält, kör åt vänster i landsvägsfart */}
        <StreaksLeftward x={670} cy={111} stroke="stroke-safety-600" />
        <Car
          x={620}
          y={98}
          w={50}
          h={26}
          heading="left"
          fill="url(#ok-cross)"
          stroke="stroke-safety-600"
          nose="fill-safety-600"
        />
        <text x="645" y="142" textAnchor="middle" className="fill-text-secondary text-[13px]">
          Mötande
        </text>

        {/* Din bil, tre lägen */}
        <Car
          x={100}
          y={178}
          w={50}
          h={26}
          heading="right"
          fill="url(#ok-dots)"
          stroke="stroke-attention-600"
          nose="fill-attention-600"
        />
        <Car
          x={340}
          y={98}
          w={50}
          h={26}
          heading="right"
          fill="url(#ok-dots)"
          stroke="stroke-attention-600"
          nose="fill-attention-600"
        />
        <Car
          x={500}
          y={178}
          w={50}
          h={26}
          heading="right"
          fill="url(#ok-dots)"
          stroke="stroke-attention-600"
          nose="fill-attention-600"
        />

        {/* Marginal före: avståndet bakom bilen framför */}
        <line x1="150" y1="214" x2="250" y2="214" className="stroke-progress-600" strokeWidth="2" />
        <line x1="150" y1="208" x2="150" y2="220" className="stroke-progress-600" strokeWidth="2" />
        <line x1="250" y1="208" x2="250" y2="220" className="stroke-progress-600" strokeWidth="2" />
        <text x="200" y="226" textAnchor="middle" className="fill-text-secondary text-[13px]">
          Avstånd före
        </text>

        {/* 4. Marginal efter: klammer under vägen från den omkörda bilens front till din bil */}
        <line x1="305" y1="214" x2="500" y2="214" className="stroke-progress-600" strokeWidth="2" />
        <line x1="305" y1="208" x2="305" y2="220" className="stroke-progress-600" strokeWidth="2" />
        <line x1="500" y1="208" x2="500" y2="220" className="stroke-progress-600" strokeWidth="2" />
        <text x="402" y="226" textAnchor="middle" className="fill-text-secondary text-[13px]">
          Marginal efter
        </text>
        <Badge cx={402} cy={250} n={4} />

        {/* Teckenförklaring, på en rad under vägen */}
        <g>
          <rect x="20" y="266" width="14" height="14" fill="url(#ok-dots)" className="stroke-attention-600" strokeWidth="1.5" />
          <text x="40" y="277" className="fill-text-secondary text-[13px]">
            Din bil
          </text>
          <rect x="120" y="266" width="14" height="14" fill="url(#ok-stripes)" className="stroke-primary-600" strokeWidth="1.5" />
          <text x="140" y="277" className="fill-text-secondary text-[13px]">
            Omkörd bil
          </text>
          <rect x="250" y="266" width="14" height="14" fill="url(#ok-cross)" className="stroke-safety-600" strokeWidth="1.5" />
          <text x="270" y="277" className="fill-text-secondary text-[13px]">
            Mötande bil
          </text>
          <line
            x1="390"
            y1="273"
            x2="420"
            y2="273"
            className="stroke-progress-600"
            strokeWidth="2.5"
            strokeDasharray="7 5"
            markerEnd="url(#ok-arrow)"
          />
          <text x="430" y="277" className="fill-text-secondary text-[13px]">
            Din bana
          </text>
          <line x1="520" y1="273" x2="550" y2="273" className="stroke-text-tertiary" strokeWidth="1.5" strokeDasharray="3 4" />
          <text x="560" y="277" className="fill-text-secondary text-[13px]">
            Siktlinje
          </text>
        </g>
      </g>

      {/* Steg */}
      <text x="20" y="372" className="fill-text-primary text-[16px] font-semibold">
        Så gör du
      </text>
      <Badge cx={30} cy={400} n={1} />
      <text x="48" y="405" className="fill-text-primary text-[15px] font-medium">
        Kolla bakåt först: har någon redan börjat köra om dig?
      </text>
      <text x="48" y="424" className="fill-text-secondary text-[13px]">
        Då får du inte köra om (3 kap 32 §)
      </text>
      <Badge cx={30} cy={452} n={2} />
      <text x="48" y="457" className="fill-text-primary text-[15px] font-medium">
        Ligg så att du ser förbi bilen framför
      </text>
      <text x="48" y="476" className="fill-text-secondary text-[13px]">
        då upptäcker du mötande tidigare
      </text>
      <Badge cx={30} cy={504} n={3} />
      <text x="48" y="509" className="fill-text-primary text-[15px] font-medium">
        Körfältet ska vara fritt så långt att du hinner ut, förbi och tillbaka
      </text>
      <text x="48" y="528" className="fill-text-secondary text-[13px]">
        utan fara (3 kap 36 §)
      </text>
      <Badge cx={30} cy={556} n={4} />
      <text x="48" y="561" className="fill-text-primary text-[15px] font-medium">
        Tillbaka till höger så snart det kan ske utan fara eller olägenhet
      </text>
      <text x="48" y="580" className="fill-text-secondary text-[13px]">
        utan att tränga (3 kap 37 §)
      </text>
      <text x="20" y="612" className="fill-text-secondary text-[13px]">
        Grundvillkor: du får köra om endast om det kan ske utan fara (3 kap 32 §).
      </text>
      <text x="20" y="630" className="fill-text-secondary text-[13px]">
        Blir det inte fritt: ligg kvar bakom.
      </text>

      {/* Förklaringsruta: räcker den fria sträckan? */}
      <rect x="20" y="650" width="680" height="128" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="36" y="676" className="fill-text-primary text-[15px] font-semibold">
        Räcker den fria sträckan?
      </text>

      {/* Panel A: fritt så långt det behövs, tillbaka till höger innan mötet */}
      <MiniRoad x={36} y={690} />
      <Car x={110} y={711} w={30} h={12} heading="right" fill="url(#ok-stripes)" stroke="stroke-primary-600" nose="fill-primary-600" />
      <Car x={170} y={711} w={30} h={12} heading="right" fill="url(#ok-dots)" stroke="stroke-attention-600" nose="fill-attention-600" />
      <Car x={296} y={693} w={30} h={12} heading="left" fill="url(#ok-cross)" stroke="stroke-safety-600" nose="fill-safety-600" />
      <text x="36" y="746" className="fill-text-primary text-[14px] font-semibold">
        Fritt så långt det behövs:
      </text>
      <path d="M 240 744 l 6 6 l 12 -13" className="fill-none stroke-progress-600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="36" y="764" className="fill-text-primary text-[13px]">
        du är tillbaka till höger innan mötet
      </text>

      {/* Panel B: inte fritt, kör inte om */}
      <MiniRoad x={370} y={690} />
      <Car x={450} y={711} w={30} h={12} heading="right" fill="url(#ok-dots)" stroke="stroke-attention-600" nose="fill-attention-600" />
      <Car x={500} y={711} w={30} h={12} heading="right" fill="url(#ok-stripes)" stroke="stroke-primary-600" nose="fill-primary-600" />
      <Car x={590} y={693} w={30} h={12} heading="left" fill="url(#ok-cross)" stroke="stroke-safety-600" nose="fill-safety-600" />
      <text x="370" y="746" className="fill-text-primary text-[14px] font-semibold">
        Inte fritt: kör inte om
      </text>
      <path d="M 552 738 L 564 750 M 564 738 L 552 750" className="stroke-safety-600" strokeWidth="3" strokeLinecap="round" />
      <text x="370" y="764" className="fill-text-primary text-[13px]">
        ligg kvar bakom
      </text>
    </svg>
  );
}
