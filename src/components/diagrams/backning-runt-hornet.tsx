/**
 * Backning runt hörn (MAN-08) — bakhjulens täta kurva, framvagnens svep och
 * blickriktningen. Trafikförordningen 3 kap 46 § första stycket är den enda
 * regeln i momentet; resten är körteknik.
 *
 * Geometri (högertrafik, vy uppifrån, 12 px ≈ 1 m). Scenen ligger i en grupp
 * med translate(20 64); koordinaterna nedan är gruppens lokala.
 * - Huvudgatan går lodrätt, x 136–220, mittlinje x 178. Din bil har nosen
 *   uppåt och står därför i det östra (högra) körfältet, x 182–204.
 * - Sidogatan går ut åt höger (öster) från x 220, y 290–374. Innerhörnet
 *   ligger i (220, 290).
 * - Bilen backar först rakt (bakaxel från y 122 till y 262), sedan med
 *   fullt högerutslag: bakaxeln går en cirkel med radie 55 runt (248, 262).
 *   Inre bakhjulet (11 från bakaxelns mitt) går radie 44 runt samma punkt;
 *   hörnet ligger 39,6 från centrum, alltså innanför hjulets bana, så hjulet
 *   passerar hörnet med 4,4 px marginal. Yttre framhörnet (43 fram, 11 ut)
 *   går radie 79 och svänger ut till x 169 — över mittlinjen x 178.
 * - Efter svängen backar bilen rakt österut och slutar med nosen åt väster
 *   i sidogatans norra halva, som är höger körfält för den riktningen.
 *
 * Förklaringsrutan längst ned är fristående: samma bil i ett kort stycke
 * sidogata, rak (rotate -90) när ratten rätats upp i tid, respektive kvar i
 * sväng (rotate -110) när uppriktningen kommer för sent.
 */

function Bil({ cx, cy, rotate }: { cx: number; cy: number; rotate: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate})`}>
      {/* Hjul: bakaxel vid lokal y 15.5, framaxel vid -15.5 */}
      <rect x="-14" y="11" width="4" height="9" rx="1" className="fill-attention-600" />
      <rect x="10" y="11" width="4" height="9" rx="1" className="fill-attention-600" />
      <rect x="-14" y="-20" width="4" height="9" rx="1" className="fill-attention-600" />
      <rect x="10" y="-20" width="4" height="9" rx="1" className="fill-attention-600" />
      <rect
        x="-11"
        y="-26.5"
        width="22"
        height="53"
        rx="3"
        fill="url(#bh-dots)"
        className="stroke-attention-600"
        strokeWidth="2"
      />
      {/* Nosen: fylld spets som visar vart bilen pekar */}
      <polygon points="-7,-18 0,-25 7,-18" className="fill-attention-600" />
    </g>
  );
}

/** Kort stycke sidogata till förklaringsrutan: två körfält, 160 × 84. */
function Minigata() {
  return (
    <g>
      <rect x="0" y="0" width="160" height="84" className="fill-diagram-road" />
      <line x1="0" y1="0" x2="160" y2="0" className="stroke-diagram-edge" strokeWidth="2" />
      <line x1="0" y1="84" x2="160" y2="84" className="stroke-diagram-edge" strokeWidth="2" />
      <line x1="0" y1="42" x2="160" y2="42" className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="10 8" />
    </g>
  );
}

/** Fylld siffra, som i hänvisningarna i vänstersvängsbilden. */
function Siffra({ n, x, y }: { n: number; x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="11" className="fill-text-primary" />
      <text x={x} y={y + 5} textAnchor="middle" className="fill-surface-base text-[13px] font-semibold">
        {n}
      </text>
    </g>
  );
}

/** Tunn hänvisningslinje som slutar i en punkt på det den pekar på. */
function Pekare({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-text-tertiary" strokeWidth="1.5" />
      <circle cx={x2} cy={y2} r="3" className="fill-text-tertiary" />
    </g>
  );
}

export function BackningRuntHornetDiagram() {
  return (
    <svg
      viewBox="0 0 440 936"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="bh-title bh-desc"
    >
      <title id="bh-title">Backning runt hörn: bakhjulen går tätt, framvagnen svänger ut</title>
      <desc id="bh-desc">
        Vy uppifrån av en lodrät gata med en sidogata som går ut åt höger. Din bil, ritad med
        prickmönster och en fylld nos, står i högra körfältet med nosen uppåt och backar nedåt i
        bilden och runt hörnet in i sidogatan, där den slutar med nosen åt vänster i sidogatans
        övre halva. Bilen visas i tre lägen: start, mitt i svängen och slut. Tre fyllda siffror
        med tunna linjer till det de syftar på: 1, till vänster om gatan, pekar på den raka
        backningen först. 2, också till vänster, pekar på framvagnens svep där det går ut över
        mittlinjen: ratten vrids åt höger, det håll bakvagnen ska, och framvagnen svänger då ut
        åt vänster, motsatt håll. 3, ovanför sidogatan, pekar på bilen i slutläget: ratten rätas
        upp innan bilen är framme. En heldragen linje visar det inre bakhjulets väg: den går tätt
        intill hörnet i en snäv kurva. En streckad linje visar det yttre framhörnets svep: en
        vidare kurva som svänger ut åt vänster över gatans mittlinje. En prickad linje från
        förarplatsen pekar bakåt över axeln dit bilen ska. En teckenförklaring i övre högra
        hörnet förklarar de tre linjerna. Under bilden står stegen och regeln: backa endast om
        det kan ske utan fara eller hinder för andra vägtrafikanter, och skyldigheten ligger på
        dig som backar. Längst ned en förklaringsruta med två små bilder av sidogatan: till
        vänster har ratten rätats upp i tid och bilen står rakt i körfältet, markerat med en
        bock; till höger kom uppriktningen för sent och bilen står snett med nosen mot
        mittlinjen, markerat med ett kryss.
      </desc>

      <defs>
        <pattern id="bh-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
        </pattern>
        <marker
          id="bh-arrow-rear"
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
          id="bh-arrow-front"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-safety-600" />
        </marker>
        <marker
          id="bh-arrow-look"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary-600" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="34" className="fill-text-primary text-[20px] font-semibold">
        Backning runt hörn
      </text>
      <text x="20" y="56" className="fill-text-secondary text-[13px]">
        Bakhjulen går tätt intill hörnet, framvagnen svänger ut
      </text>

      <g transform="translate(20 64)">
        {/* Vägbanor */}
        <rect x="136" y="40" width="84" height="380" className="fill-diagram-road" />
        <rect x="220" y="290" width="180" height="84" className="fill-diagram-road" />

        {/* Vägkanter */}
        <g className="stroke-diagram-edge" strokeWidth="2">
          <line x1="136" y1="40" x2="136" y2="420" />
          <line x1="220" y1="40" x2="220" y2="290" />
          <line x1="220" y1="374" x2="220" y2="420" />
          <line x1="220" y1="290" x2="400" y2="290" />
          <line x1="220" y1="374" x2="400" y2="374" />
        </g>

        {/* Mittlinjer */}
        <g className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="10 8">
          <line x1="178" y1="40" x2="178" y2="420" />
          <line x1="232" y1="332" x2="400" y2="332" />
        </g>

        {/* Teckenförklaring i övre högra hörnet */}
        <g>
          <line x1="240" y1="62" x2="270" y2="62" className="stroke-progress-600" strokeWidth="2.5" />
          <text x="278" y="66" className="fill-text-secondary text-[13px]">
            Bakhjulets väg
          </text>
          <line x1="240" y1="84" x2="270" y2="84" className="stroke-safety-600" strokeWidth="2.5" strokeDasharray="7 5" />
          <text x="278" y="88" className="fill-text-secondary text-[13px]">
            Framvagnens svep
          </text>
          <line x1="240" y1="106" x2="270" y2="106" className="stroke-primary-600" strokeWidth="2" strokeDasharray="2 4" />
          <text x="278" y="110" className="fill-text-secondary text-[13px]">
            Blicken
          </text>
        </g>

        {/* Hörnet */}
        <circle cx="220" cy="290" r="4" className="fill-safety-600" />
        <text x="230" y="282" className="fill-text-primary text-[13px] font-medium">
          Hörnet
        </text>

        {/* Bilen i tre lägen: start, mitt i svängen, slut */}
        <Bil cx={193} cy={106.5} rotate={0} />
        <Bil cx={198} cy={290} rotate={-45} />
        <Bil cx={284.5} cy={317} rotate={-90} />
        <text x="193" y="68" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
          Start
        </text>
        <text x="284" y="360" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
          Slut
        </text>

        {/* Inre bakhjulets väg: rakt ned, snäv kurva radie 44 runt (248,262), rakt österut */}
        <path
          d="M 204 122 L 204 262 A 44 44 0 0 0 248 306 L 300 306"
          className="fill-none stroke-progress-600"
          strokeWidth="2.5"
          markerEnd="url(#bh-arrow-rear)"
        />

        {/* Yttre framhörnets svep: rakt ned, vid kurva radie 79 runt samma centrum, rakt österut */}
        <path
          d="M 182 80 L 182 219 A 79 79 0 0 0 205 328 L 257 328"
          className="fill-none stroke-safety-600"
          strokeWidth="2.5"
          strokeDasharray="7 5"
          markerEnd="url(#bh-arrow-front)"
        />

        {/* Blicken: från förarplatsen bakåt över axeln, dit bilen ska */}
        <circle cx="186" cy="285" r="4" className="fill-primary-600" />
        <line
          x1="186"
          y1="285"
          x2="262"
          y2="352"
          className="stroke-primary-600"
          strokeWidth="2"
          strokeDasharray="2 4"
          markerEnd="url(#bh-arrow-look)"
        />
        <text x="232" y="396" className="fill-text-primary text-[13px] font-medium">
          Blicken bakåt över axeln,
        </text>
        <text x="232" y="412" className="fill-text-primary text-[13px] font-medium">
          dit bilen ska
        </text>

        {/* 1. Rakt bakåt först */}
        <Siffra n={1} x={22} y={150} />
        <text x="40" y="155" className="fill-text-primary text-[14px] font-semibold">
          Backa rakt
        </text>
        <text x="10" y="173" className="fill-text-secondary text-[13px]">
          en bit först
        </text>
        <Pekare x1={92} y1={169} x2={204} y2={170} />

        {/* 2. Ratten åt höger: bakvagnen in, framvagnen ut över mittlinjen (svepets apex x 169) */}
        <Siffra n={2} x={22} y={208} />
        <text x="40" y="213" className="fill-text-primary text-[14px] font-semibold">
          Ratt åt höger
        </text>
        <text x="10" y="231" className="fill-text-secondary text-[13px]">
          bakvagnen in mot
        </text>
        <text x="10" y="247" className="fill-text-secondary text-[13px]">
          hörnet, framvagnen
        </text>
        <text x="10" y="263" className="fill-text-secondary text-[13px]">
          ut över mittlinjen
        </text>
        <Pekare x1={128} y1={260} x2={169} y2={262} />

        {/* 3. Räta upp innan bilen är framme */}
        <Siffra n={3} x={252} y={190} />
        <text x="270" y="195" className="fill-text-primary text-[14px] font-semibold">
          Räta upp innan
        </text>
        <text x="240" y="213" className="fill-text-secondary text-[13px]">
          du är framme, inte efter
        </text>
        <Pekare x1={292} y1={222} x2={286} y2={305} />
      </g>

      {/* Stegen */}
      <Siffra n={1} x={30} y={522} />
      <text x="50" y="527" className="fill-text-primary text-[13px] font-medium">
        Backa rakt en bit först.
      </text>
      <Siffra n={2} x={30} y={552} />
      <text x="50" y="557" className="fill-text-primary text-[13px] font-medium">
        Vrid ratten åt det håll bakvagnen ska, och håll koll på
      </text>
      <text x="50" y="575" className="fill-text-primary text-[13px] font-medium">
        framvagnen — den svänger ut åt motsatt håll.
      </text>
      <Siffra n={3} x={30} y={604} />
      <text x="50" y="609" className="fill-text-primary text-[13px] font-medium">
        Räta upp innan du är framme, inte efter.
      </text>

      {/* Regeln */}
      <text x="20" y="642" className="fill-text-primary text-[13px] font-medium">
        Backa endast om det kan ske utan fara eller hinder för andra
      </text>
      <text x="20" y="660" className="fill-text-primary text-[13px] font-medium">
        vägtrafikanter (3 kap 46 §).
      </text>
      <text x="20" y="678" className="fill-text-primary text-[13px] font-medium">
        Skyldigheten ligger på dig som backar.
      </text>
      <text x="20" y="702" className="fill-text-secondary text-[13px]">
        Krypfart. Tappar du överblicken: stanna helt och titta om.
      </text>

      {/* Förklaringsruta: uppriktningen i tid eller för sent */}
      <rect x="20" y="726" width="400" height="190" rx="6" className="fill-surface-raised stroke-border-default" strokeWidth="1.5" />
      <text x="36" y="752" className="fill-text-primary text-[14px] font-semibold">
        Räta upp innan du är framme — inte efter
      </text>
      <line x1="210" y1="766" x2="210" y2="904" className="stroke-text-tertiary" strokeWidth="2" strokeDasharray="6 5" />

      {/* A: uppriktad i tid, bilen står rakt i körfältet */}
      <g transform="translate(36 766)">
        <Minigata />
        <Bil cx={80} cy={23} rotate={-90} />
      </g>
      <path d="M 36 874 l 6 6 l 12 -13" className="fill-none stroke-progress-600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="60" y="878" className="fill-text-primary text-[13px] font-semibold">
        Rätar upp i tid:
      </text>
      <text x="60" y="896" className="fill-text-primary text-[13px]">
        bilen slutar rakt
      </text>

      {/* B: uppriktad för sent, bilen fortsätter svänga och står snett */}
      <g transform="translate(224 766)">
        <Minigata />
        <Bil cx={80} cy={24} rotate={-110} />
      </g>
      <path d="M 224 868 L 238 882 M 238 868 L 224 882" className="stroke-safety-600" strokeWidth="3" strokeLinecap="round" />
      <text x="248" y="878" className="fill-text-primary text-[13px] font-semibold">
        Rätar upp för sent:
      </text>
      <text x="248" y="896" className="fill-text-primary text-[13px]">
        bilen fortsätter svänga
      </text>
    </svg>
  );
}
