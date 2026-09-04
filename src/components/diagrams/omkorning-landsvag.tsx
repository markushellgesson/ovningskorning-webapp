/**
 * Omkörning på landsväg (LANE-03) — sikt framåt, mötande trafik och marginal
 * före och efter. Trafikförordningen 3 kap 32, 36 och 37 §§, som redan är
 * formulerade i momentet; figuren visar bara geometrin runt dem.
 *
 * Geometri: din trafik kör åt höger i bilden (ökande x). Förarens högra sida
 * är då bildens nedre kant, så ditt körfält är det nedre (y 150–230). Den
 * mötande kör åt vänster (minskande x); dess högra sida är bildens övre kant,
 * så den mötandes körfält är det övre (y 70–150).
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

export function OmkorningLandsvagDiagram() {
  return (
    <svg
      viewBox="0 0 720 420"
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
        åt vänster. Fyra numrerade markeringar: 1, en pil bakåt från din bil: kolla bakåt först. 2,
        en tunn prickad siktlinje från din bil snett förbi bilen framför ända fram till den mötande:
        ligg så att du ser förbi. 3, en klammer ovanför hela vägen från din bil till den mötande:
        den fria sträcka som krävs för att komma ut, förbi och tillbaka innan mötet. 4, en klammer
        under vägen mellan bilen du kört om och din bil när du är tillbaka till höger: marginalen
        efter, så att du inte tränger. Texten nederst upprepar grundvillkoret: du får köra om endast
        om det kan ske utan fara (3 kap 32 §), och blir det inte fritt ligger du kvar bakom.
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

      <text x="360" y="20" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Omkörning: fri sträcka ut, förbi och tillbaka — med marginal före och efter
      </text>

      {/* 3. Fri sträcka som krävs: klammer ovanför vägen från din bil till den mötande */}
      <line x1="100" y1="56" x2="620" y2="56" className="stroke-progress-600" strokeWidth="2" />
      <line x1="100" y1="50" x2="100" y2="62" className="stroke-progress-600" strokeWidth="2" />
      <line x1="620" y1="50" x2="620" y2="62" className="stroke-progress-600" strokeWidth="2" />
      <text x="360" y="46" textAnchor="middle" className="fill-text-primary text-[13px] font-medium">
        Fri sträcka som krävs: ut, förbi och tillbaka — innan mötet
      </text>
      <circle cx="78" cy="56" r="10" className="fill-none stroke-text-tertiary" strokeWidth="1.5" />
      <text x="78" y="61" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        3
      </text>

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
      <text x="28" y="86" className="fill-text-primary text-[13px] font-medium">
        Mötande körfält
      </text>
      <text x="28" y="222" className="fill-text-primary text-[13px] font-medium">
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
      <circle cx="215" cy="140" r="10" className="fill-none stroke-text-tertiary" strokeWidth="1.5" />
      <text x="215" y="145" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        2
      </text>

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
      <circle cx="75" cy="167" r="10" className="fill-none stroke-text-tertiary" strokeWidth="1.5" />
      <text x="75" y="172" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        1
      </text>

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
      <text x="277" y="222" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Omkörd
      </text>

      {/* Mötande, långt fram i sitt eget körfält, kör åt vänster */}
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
      <circle cx="402" cy="250" r="10" className="fill-none stroke-text-tertiary" strokeWidth="1.5" />
      <text x="402" y="255" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        4
      </text>

      {/* Steg */}
      <text x="20" y="286" className="fill-text-primary text-[13px] font-medium">
        1. Kolla bakåt först: har någon redan börjat köra om dig? Då får du inte köra om (3 kap 32 §)
      </text>
      <text x="20" y="306" className="fill-text-primary text-[13px] font-medium">
        2. Ligg så att du ser förbi bilen framför — då upptäcker du mötande tidigare
      </text>
      <text x="20" y="326" className="fill-text-primary text-[13px] font-medium">
        3. Körfältet ska vara fritt så långt att du hinner ut, förbi och tillbaka utan fara (3 kap 36 §)
      </text>
      <text x="20" y="346" className="fill-text-primary text-[13px] font-medium">
        4. Tillbaka till höger så snart det kan ske utan fara eller olägenhet — utan att tränga (3 kap 37 §)
      </text>
      <text x="20" y="372" className="fill-text-secondary text-[13px]">
        Grundvillkor: du får köra om endast om det kan ske utan fara (3 kap 32 §). Blir det inte fritt: ligg kvar bakom.
      </text>

      {/* Teckenförklaring */}
      <g transform="translate(20, 392)">
        <rect width="16" height="16" fill="url(#ok-dots)" className="stroke-attention-600" strokeWidth="1.5" />
        <text x="22" y="12" className="fill-text-secondary text-[13px]">
          Din bil
        </text>
        <rect x="120" width="16" height="16" fill="url(#ok-stripes)" className="stroke-primary-600" strokeWidth="1.5" />
        <text x="142" y="12" className="fill-text-secondary text-[13px]">
          Omkörd bil
        </text>
        <rect x="260" width="16" height="16" fill="url(#ok-cross)" className="stroke-safety-600" strokeWidth="1.5" />
        <text x="282" y="12" className="fill-text-secondary text-[13px]">
          Mötande bil
        </text>
      </g>
    </svg>
  );
}
