/**
 * Järnvägs- och spårvägskorsning — stopplats på betryggande avstånd före
 * signal och bom, siktlinje längs spåret åt båda håll, och kontrollen att det
 * finns plats på andra sidan. Trafikförordningen 2 kap 7 §.
 *
 * Geometri: vägen går lodrätt, din bil kör uppåt och ligger därför i det
 * östra (högra) körfältet. Vägmärket och ljussignalen står på höger sida i
 * färdriktningen, alltså till höger i bilden.
 *
 * Vägmärkesbilden A35 i public/signs/ är ett svenskt officiellt vägmärke
 * (allmän handling) och fri att återge.
 */

export function JarnvagskorsningDiagram() {
  return (
    <svg
      viewBox="0 0 500 600"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-labelledby="crossing-title crossing-desc"
    >
      <title id="crossing-title">Järnvägskorsning: stopplats, siktlinje och bommar</title>
      <desc id="crossing-desc">
        Vy uppifrån av en väg med två körfält som korsar ett spår. Din bil, ritad med prickmönster,
        kör uppåt i det högra körfältet och står stannad vid en stopplats som ligger på betryggande
        avstånd före både ljussignalen och bommen. En bit bakom bilen, på höger sida i
        färdriktningen, står vägmärket A35 som varnar för korsning med bommar. Vid vägkanten före
        bommen står en ljussignal med rött sken, markerad med ett kryss: kör inte in. Två
        rödvitrandiga bommar ligger fällda tvärs över hela körbanan, en på var sida om spåret.
        Streckade pilar längs spåret åt båda håll visar att du själv ska titta längs spåret, även
        när ingen signal lyser. Långt bort till höger på spåret syns ett tåg, ritat med liggande
        streck så att det inte förväxlas med bilar. På andra sidan spåret står en annan bil (randigt
        mönster) i kö, och en streckad ruta mellan spåret och kön ställer frågan om hela din bil får
        plats där. Får den inte det ska du inte köra in.
      </desc>

      <defs>
        <pattern id="rail-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
        </pattern>
        <pattern id="rail-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="2" />
        </pattern>
        {/* Tåget får ett eget mönster: prickar är din bil och snedränder är
            andra bilar. Tåget ska inte gå att ta för något av dem. */}
        <pattern id="rail-train-bars" patternUnits="userSpaceOnUse" width="8" height="8">
          <rect width="8" height="3.5" className="fill-safety-600" />
        </pattern>
        <pattern
          id="rail-barrier"
          patternUnits="userSpaceOnUse"
          width="14"
          height="14"
          patternTransform="rotate(45)"
        >
          <rect width="7" height="14" className="fill-safety-600" />
          <rect x="7" width="7" height="14" className="fill-diagram-marking" />
        </pattern>
        <marker
          id="rail-arrow"
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-text-secondary" />
        </marker>
      </defs>

      {/* Vägen, lodrät, två körfält */}
      <rect x="140" y="0" width="140" height="600" className="fill-diagram-road" />
      <line x1="140" y1="0" x2="140" y2="600" className="stroke-diagram-edge" strokeWidth="2" />
      <line x1="280" y1="0" x2="280" y2="600" className="stroke-diagram-edge" strokeWidth="2" />
      <line
        x1="210"
        y1="0"
        x2="210"
        y2="222"
        className="stroke-diagram-marking"
        strokeWidth="2"
        strokeDasharray="12 10"
      />
      <line
        x1="210"
        y1="318"
        x2="210"
        y2="600"
        className="stroke-diagram-marking"
        strokeWidth="2"
        strokeDasharray="12 10"
      />

      {/* Spåret, vågrätt, med sliprar och två räler */}
      <rect x="0" y="250" width="500" height="40" className="fill-diagram-edge" opacity="0.25" />
      {Array.from({ length: 14 }).map((_, i) => (
        <rect key={i} x={i * 36 + 4} y="250" width="10" height="40" className="fill-diagram-edge" />
      ))}
      <line x1="0" y1="260" x2="500" y2="260" className="stroke-primary-600" strokeWidth="3" />
      <line x1="0" y1="280" x2="500" y2="280" className="stroke-primary-600" strokeWidth="3" />

      {/* Siktlinjer längs spåret, åt båda håll */}
      <path
        d="M 200 270 L 60 270"
        className="stroke-text-secondary"
        strokeWidth="2"
        strokeDasharray="6 5"
        markerEnd="url(#rail-arrow)"
      />
      <path
        d="M 220 270 L 420 270"
        className="stroke-text-secondary"
        strokeWidth="2"
        strokeDasharray="6 5"
        markerEnd="url(#rail-arrow)"
      />
      <text x="10" y="198" className="fill-text-primary text-[13px] font-semibold">
        Titta längs spåret
      </text>
      <text x="10" y="214" className="fill-text-primary text-[13px] font-semibold">
        åt båda håll, även
      </text>
      <text x="10" y="230" className="fill-text-primary text-[13px] font-semibold">
        när ingen signal lyser
      </text>

      {/* Tåg långt bort längs spåret */}
      <g transform="translate(440, 262)">
        <rect width="46" height="16" rx="3" fill="url(#rail-train-bars)" className="stroke-safety-600" strokeWidth="2" />
        <text x="23" y="38" textAnchor="middle" className="fill-text-secondary text-[13px]">
          Tåg
        </text>
      </g>

      {/* Bommar, fällda tvärs över körbanan, en på var sida om spåret */}
      <rect x="140" y="224" width="140" height="14" fill="url(#rail-barrier)" className="stroke-safety-700" strokeWidth="1.5" />
      <rect x="140" y="302" width="140" height="14" fill="url(#rail-barrier)" className="stroke-safety-700" strokeWidth="1.5" />
      <text x="288" y="236" className="fill-text-secondary text-[13px]">
        Bom, fälld
      </text>

      {/* Ljussignal vid högra vägkanten, före bommen */}
      <g>
        <line x1="304" y1="204" x2="304" y2="218" className="stroke-text-tertiary" strokeWidth="3" />
        <rect x="290" y="160" width="28" height="44" rx="4" className="fill-neutral-200 stroke-diagram-edge" strokeWidth="1.5" />
        <circle cx="304" cy="182" r="10" className="fill-safety-600 stroke-text-primary" strokeWidth="1" />
        {/* Kryss: rött sken betyder kör inte in, oavsett färgseende */}
        <path d="M 328 174 L 344 190 M 344 174 L 328 190" className="stroke-safety-600" strokeWidth="3" strokeLinecap="round" />
        <text x="354" y="180" className="fill-text-primary text-[13px] font-semibold">
          Rött sken:
        </text>
        <text x="354" y="196" className="fill-text-primary text-[13px] font-semibold">
          kör inte in
        </text>
      </g>

      {/* Betryggande avstånd: mått från bommen ned till stopplatsen */}
      <line x1="292" y1="240" x2="292" y2="348" className="stroke-text-tertiary" strokeWidth="1" />
      <line x1="288" y1="240" x2="296" y2="240" className="stroke-text-tertiary" strokeWidth="1" />
      <line x1="288" y1="348" x2="296" y2="348" className="stroke-text-tertiary" strokeWidth="1" />
      <text x="300" y="324" className="fill-text-secondary text-[13px]">
        Betryggande
      </text>
      <text x="300" y="340" className="fill-text-secondary text-[13px]">
        avstånd
      </text>

      {/* Stopplats: heldragen linje i ditt körfält, före signal och bom */}
      <line x1="212" y1="350" x2="278" y2="350" className="stroke-progress-600" strokeWidth="4" />
      <text x="288" y="360" className="fill-text-primary text-[14px] font-semibold">
        Stopplats
      </text>
      <text x="288" y="376" className="fill-text-secondary text-[13px]">
        före signal och bom
      </text>

      {/* Din bil, stannad vid stopplatsen, kör uppåt i högra körfältet */}
      <g>
        <rect x="225" y="386" width="40" height="42" rx="4" fill="url(#rail-dots)" className="stroke-attention-600" strokeWidth="2" />
        <rect x="231" y="391" width="28" height="7" rx="2" className="fill-diagram-marking" />
        <text x="245" y="448" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
          Du
        </text>
      </g>

      {/* Kö på andra sidan: plats för hela bilen? */}
      <g>
        <rect x="225" y="120" width="40" height="42" rx="4" fill="url(#rail-stripes)" className="stroke-primary-600" strokeWidth="2" />
        <rect x="231" y="125" width="28" height="7" rx="2" className="fill-diagram-marking" />
        <text x="245" y="110" textAnchor="middle" className="fill-text-secondary text-[13px]">
          Kö
        </text>
        <rect
          x="216"
          y="168"
          width="58"
          height="50"
          rx="4"
          className="fill-none stroke-text-tertiary"
          strokeWidth="2"
          strokeDasharray="5 4"
        />
        <text x="245" y="199" textAnchor="middle" className="fill-text-primary text-[16px] font-semibold">
          ?
        </text>
        <line x1="134" y1="160" x2="214" y2="180" className="stroke-text-tertiary" strokeWidth="1.5" />
        <text x="10" y="132" className="fill-text-primary text-[13px] font-semibold">
          Får hela bilen plats
        </text>
        <text x="10" y="148" className="fill-text-primary text-[13px] font-semibold">
          på andra sidan?
        </text>
        <text x="10" y="164" className="fill-text-secondary text-[13px]">
          Annars: kör inte in
        </text>
      </g>

      {/* A35, varning för korsning med bommar, en bit före stopplatsen */}
      <g>
        <rect x="330" y="430" width="110" height="90" rx="8" className="fill-none stroke-border-default" strokeWidth="1.5" />
        <image href="/signs/A35.svg" x="348" y="442" width="74" height="65" />
        <text x="385" y="545" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
          A35
        </text>
        <text x="385" y="561" textAnchor="middle" className="fill-text-tertiary text-[13px]">
          Varnar för bommar
        </text>
      </g>
    </svg>
  );
}
