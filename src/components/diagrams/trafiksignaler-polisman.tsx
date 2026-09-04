/**
 * Trafiksignaler och polismans tecken — signalbilderna, rangordningen mellan
 * polisman, signal, vägmärke och trafikregel, och framför allt polismans tecken P1 stopp:
 * samma tecken betyder stopp för den som kommer framifrån eller bakifrån men
 * fri väg för den som kommer från sidan.
 * Trafikförordningen 2 kap 2–3 §§, vägmärkesförordningen 3 kap 6 § och 7 kap 2 §.
 *
 * Geometri i korsningen: varje bil ligger i sitt högra körfält. Bilen som kör
 * nedåt har sin högra sida åt väster (bildens vänstra); bilen som kör åt höger
 * har sin högra sida åt söder (bildens nedre); bilen som kör åt vänster har sin
 * högra sida åt norr (bildens övre).
 */

function Lamp({
  x,
  lit,
  blinking,
  label,
}: {
  x: number;
  lit: Array<'red' | 'yellow' | 'green'>;
  blinking?: boolean;
  label: string[];
}) {
  const lenses: Array<{ key: 'red' | 'yellow' | 'green'; cy: number; fill: string }> = [
    { key: 'red', cy: 60, fill: 'fill-safety-600' },
    { key: 'yellow', cy: 92, fill: 'fill-attention-600' },
    { key: 'green', cy: 124, fill: 'fill-progress-600' },
  ];
  const allowed = lit.length === 1 && lit[0] === 'green';
  return (
    <g>
      <rect x={x - 20} y="42" width="40" height="100" rx="6" className="fill-neutral-200 stroke-diagram-edge" strokeWidth="1.5" />
      {lenses.map((l) => {
        const on = lit.includes(l.key);
        return (
          <circle
            key={l.key}
            cx={x}
            cy={l.cy}
            r="13"
            className={on ? `${l.fill} stroke-text-primary` : 'fill-none stroke-border-default'}
            strokeWidth="1.5"
            strokeDasharray={on && blinking ? '4 3' : undefined}
          />
        );
      })}
      {blinking && (
        <g className="stroke-attention-600" strokeWidth="2" strokeLinecap="round">
          <line x1={x - 22} y1="78" x2={x - 17} y2="83" />
          <line x1={x + 22} y1="78" x2={x + 17} y2="83" />
          <line x1={x - 22} y1="106" x2={x - 17} y2="101" />
          <line x1={x + 22} y1="106" x2={x + 17} y2="101" />
        </g>
      )}
      {/* Symbol under lyktan: bock = får köra, kryss = får inte köra,
          utropstecken = särskild försiktighet. Bär betydelsen utan färg. */}
      {blinking ? (
        <g>
          <path d={`M ${x} 150 L ${x - 11} 170 L ${x + 11} 170 Z`} className="fill-none stroke-attention-600" strokeWidth="2" strokeLinejoin="round" />
          <text x={x} y="168" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
            !
          </text>
        </g>
      ) : allowed ? (
        <path d={`M ${x - 9} 160 l 6 6 l 12 -13`} className="fill-none stroke-progress-600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d={`M ${x - 8} 152 L ${x + 8} 168 M ${x + 8} 152 L ${x - 8} 168`} className="stroke-safety-600" strokeWidth="3" strokeLinecap="round" />
      )}
      {label.map((line, i) => (
        <text
          key={line}
          x={x}
          y={186 + i * 16}
          textAnchor="middle"
          className={i === 0 ? 'fill-text-primary text-[13px] font-semibold' : 'fill-text-secondary text-[13px]'}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export function TrafiksignalerPolismanDiagram() {
  return (
    <svg
      viewBox="0 0 500 878"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="signals-title signals-desc"
    >
      <title id="signals-title">Trafiksignaler och polismans tecken P1</title>
      <desc id="signals-desc">
        Tre delar. Överst fem trafiksignaler sida vid sida. Tänd lykta anges av läget i lyktan:
        översta lyktan är rött, mellersta gult, nedersta grönt. Under varje signal står en symbol och
        en text. Rött: kryss, stopp före stopplinjen. Rött och gult samtidigt: kryss, vänta, det är
        ingen startsignal. Gult: kryss, stanna, kör bara om du inte kan stanna utan fara. Grönt:
        bock, kör om korsningen är fri. Blinkande gult, ritat med streckad lykta och blinkstreck:
        utropstecken, särskild försiktighet. I mitten rangordningen i fyra numrerade rutor ovanpå
        varandra: polismans tecken, trafiksignal med fast sken, vägmärke och vägmarkering, och sist
        trafikregel. Bredvid rutorna står förbehållen: polismans anvisning gäller framför
        trafikreglerna och framför märken och signaler; fast sken gäller framför stopp- eller
        väjningsplikt som meddelas genom vägmärke, men inte framför andra vägmärken; och en anvisning
        som avviker från en trafikregel gäller framför regeln. Nederst en korsning sedd uppifrån med
        en polisman i mitten som ger tecken P1 stopp, vänd mot norr. Bilen som kommer uppifrån,
        alltså framifrån, och bilen som kommer
        nedifrån, alltså bakifrån, har båda ett kryss och en stopplinje: stopp. Bilarna som kommer
        från vänster och höger, alltså från sidan, har båda en bock och en pil framåt: vägen är fri.
        Samma tecken betyder alltså olika saker beroende på varifrån du kommer.
      </desc>

      <defs>
        <pattern id="signals-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="2" />
        </pattern>
        <marker id="signals-arrow-go" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-progress-600" />
        </marker>
        <marker id="signals-arrow-neutral" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary-600" />
        </marker>
        <marker id="signals-arrow-rank" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-text-secondary" />
        </marker>
      </defs>

      {/* Del 1: signalbilderna */}
      <text x="20" y="28" className="fill-text-primary text-[14px] font-semibold">
        Signalbilder (vägmärkesförordningen 3 kap 6 §)
      </text>
      <Lamp x={58} lit={['red']} label={['Rött: stopp', 'före stopplinjen']} />
      <Lamp x={154} lit={['red', 'yellow']} label={['Rött + gult:', 'vänta, ingen', 'startsignal']} />
      <Lamp x={250} lit={['yellow']} label={['Gult: stanna,', 'kör bara om du inte', 'kan stanna utan fara']} />
      <Lamp x={346} lit={['green']} label={['Grönt: kör,', 'om korsningen', 'är fri']} />
      <Lamp x={442} lit={['yellow']} blinking label={['Blinkande gult:', 'särskild', 'försiktighet']} />

      <text x="20" y="246" className="fill-text-secondary text-[13px]">
        Grönt säger när du får köra, inte att vägen är fri.
      </text>
      <text x="20" y="262" className="fill-text-secondary text-[13px]">
        Sök av korsningen, och lämna gående som gått ut på
      </text>
      <text x="20" y="278" className="fill-text-secondary text-[13px]">
        övergångsstället möjlighet att passera (3 kap 60 §).
      </text>

      {/* Del 2: rangordning */}
      <text x="20" y="306" className="fill-text-primary text-[14px] font-semibold">
        Rangordning
      </text>
      <text x="20" y="322" className="fill-text-secondary text-[13px]">
        Det överst gäller framför det under (2 kap 2 och 3 §§)
      </text>
      <g>
        <rect x="20" y="332" width="210" height="28" rx="6" className="fill-attention-100 stroke-attention-600" strokeWidth="1.5" />
        <text x="32" y="351" className="fill-text-primary text-[13px] font-semibold">
          1. Polismans tecken
        </text>
        <path d="M 125 361 L 125 371" className="stroke-text-secondary" strokeWidth="2" markerEnd="url(#signals-arrow-rank)" />

        <rect x="20" y="364" width="210" height="28" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
        <text x="32" y="383" className="fill-text-primary text-[13px] font-semibold">
          2. Trafiksignal, fast sken
        </text>
        <path d="M 125 393 L 125 403" className="stroke-text-secondary" strokeWidth="2" markerEnd="url(#signals-arrow-rank)" />

        <rect x="20" y="396" width="210" height="28" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
        <text x="32" y="415" className="fill-text-primary text-[13px] font-semibold">
          3. Vägmärke och vägmarkering
        </text>
        <path d="M 125 425 L 125 435" className="stroke-text-secondary" strokeWidth="2" markerEnd="url(#signals-arrow-rank)" />

        <rect x="20" y="428" width="210" height="28" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
        <text x="32" y="447" className="fill-text-primary text-[13px] font-semibold">
          4. Trafikregel
        </text>

        <text x="244" y="344" className="fill-text-secondary text-[11px]">
          Polismans anvisning gäller framför
        </text>
        <text x="244" y="357" className="fill-text-secondary text-[11px]">
          trafikreglerna och framför märken
        </text>
        <text x="244" y="370" className="fill-text-secondary text-[11px]">
          och signaler (2 kap 3 §).
        </text>
        <text x="244" y="390" className="fill-text-secondary text-[11px]">
          Fast sken gäller framför stopp- eller
        </text>
        <text x="244" y="403" className="fill-text-secondary text-[11px]">
          väjningsplikt som meddelas genom
        </text>
        <text x="244" y="416" className="fill-text-secondary text-[11px]">
          vägmärke, men inte framför andra
        </text>
        <text x="244" y="429" className="fill-text-secondary text-[11px]">
          vägmärken (2 kap 2 § andra stycket).
        </text>
        <text x="244" y="449" className="fill-text-secondary text-[11px]">
          En anvisning som avviker från en
        </text>
        <text x="244" y="462" className="fill-text-secondary text-[11px]">
          trafikregel gäller framför regeln
        </text>
        <text x="244" y="475" className="fill-text-secondary text-[11px]">
          (2 kap 2 § första stycket).
        </text>
      </g>

      <g transform="translate(0, 98)">
      {/* Del 3: P1 stopp beror på varifrån du kommer */}
      <text x="20" y="408" className="fill-text-primary text-[14px] font-semibold">
        Polismans tecken P1 stopp: samma tecken, olika betydelse
      </text>
      <text x="20" y="424" className="fill-text-secondary text-[13px]">
        Det beror på varifrån du kommer (vägmärkesförordningen 7 kap 2 §)
      </text>

      {/* Korsningen */}
      <rect x="200" y="436" width="100" height="344" className="fill-diagram-road" />
      <rect x="40" y="560" width="420" height="100" className="fill-diagram-road" />
      <line x1="250" y1="436" x2="250" y2="560" className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="10 8" />
      <line x1="250" y1="660" x2="250" y2="780" className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="10 8" />
      <line x1="40" y1="610" x2="200" y2="610" className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="10 8" />
      <line x1="300" y1="610" x2="460" y2="610" className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="10 8" />

      {/* Polisman i mitten, vänd mot norr. Utförandet av P1 beskrivs inte i
          vägmärkesförordningens text, bara tecknets innebörd (7 kap 2 §) —
          därför ritas ingen armställning och påstås ingen. */}
      <g>
        <line x1="238" y1="610" x2="262" y2="610" className="stroke-attention-600" strokeWidth="6" strokeLinecap="round" />
        <circle cx="250" cy="610" r="9" className="fill-attention-600" />
        <path d="M 250 589 L 243 600 L 257 600 Z" className="fill-attention-600" />
        <text x="308" y="632" className="fill-text-primary text-[13px] font-semibold">
          Polisman ger P1 stopp,
        </text>
        <text x="308" y="648" className="fill-text-primary text-[13px] font-semibold">
          vänd uppåt i bilden
        </text>
      </g>

      {/* Framifrån (norr): kör nedåt i västra körfältet. Stopp. */}
      <g>
        <rect x="210" y="445" width="30" height="40" rx="3" fill="url(#signals-stripes)" className="stroke-primary-600" strokeWidth="2" />
        <path d="M 225 490 L 225 508" className="stroke-primary-600" strokeWidth="2" markerEnd="url(#signals-arrow-neutral)" />
        <path d="M 217 514 L 233 530 M 233 514 L 217 530" className="stroke-safety-600" strokeWidth="3" strokeLinecap="round" />
        <line x1="202" y1="538" x2="248" y2="538" className="stroke-safety-600" strokeWidth="4" />
        <text x="310" y="465" className="fill-text-primary text-[13px] font-semibold">
          Framifrån:
        </text>
        <text x="310" y="481" className="fill-text-primary text-[13px] font-semibold">
          stopp
        </text>
      </g>

      {/* Bakifrån (söder): kör uppåt i östra körfältet. Stopp. */}
      <g>
        <rect x="260" y="725" width="30" height="40" rx="3" fill="url(#signals-stripes)" className="stroke-primary-600" strokeWidth="2" />
        <path d="M 275 720 L 275 702" className="stroke-primary-600" strokeWidth="2" markerEnd="url(#signals-arrow-neutral)" />
        <path d="M 267 680 L 283 696 M 283 680 L 267 696" className="stroke-safety-600" strokeWidth="3" strokeLinecap="round" />
        <line x1="252" y1="672" x2="298" y2="672" className="stroke-safety-600" strokeWidth="4" />
        <text x="190" y="745" textAnchor="end" className="fill-text-primary text-[13px] font-semibold">
          Bakifrån:
        </text>
        <text x="190" y="761" textAnchor="end" className="fill-text-primary text-[13px] font-semibold">
          stopp
        </text>
      </g>

      {/* Från sidan (väster): kör åt höger i södra körfältet. Fri väg. */}
      <g>
        <rect x="60" y="620" width="40" height="30" rx="3" fill="url(#signals-stripes)" className="stroke-primary-600" strokeWidth="2" />
        <path d="M 105 635 L 160 635" className="stroke-progress-600" strokeWidth="3" markerEnd="url(#signals-arrow-go)" />
        <path d="M 172 636 l 5 5 l 10 -11" className="fill-none stroke-progress-600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="40" y="530" className="fill-text-primary text-[13px] font-semibold">
          Från sidan:
        </text>
        <text x="40" y="546" className="fill-text-primary text-[13px] font-semibold">
          vägen är fri
        </text>
      </g>

      {/* Från sidan (öster): kör åt vänster i norra körfältet. Fri väg. */}
      <g>
        <rect x="400" y="570" width="40" height="30" rx="3" fill="url(#signals-stripes)" className="stroke-primary-600" strokeWidth="2" />
        <path d="M 395 585 L 340 585" className="stroke-progress-600" strokeWidth="3" markerEnd="url(#signals-arrow-go)" />
        <path d="M 312 586 l 5 5 l 10 -11" className="fill-none stroke-progress-600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="460" y="684" textAnchor="end" className="fill-text-primary text-[13px] font-semibold">
          Från sidan:
        </text>
        <text x="460" y="700" textAnchor="end" className="fill-text-primary text-[13px] font-semibold">
          vägen är fri
        </text>
      </g>
      </g>
    </svg>
  );
}
