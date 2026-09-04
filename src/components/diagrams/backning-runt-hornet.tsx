/**
 * Backning runt hörn (MAN-08) — bakhjulens täta kurva, framvagnens svep och
 * blickriktningen. Trafikförordningen 3 kap 46 § första stycket är den enda
 * regeln i momentet; resten är körteknik.
 *
 * Geometri (högertrafik, vy uppifrån, 12 px ≈ 1 m):
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

export function BackningRuntHornetDiagram() {
  return (
    <svg
      viewBox="0 0 400 620"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="bh-title bh-desc"
    >
      <title id="bh-title">Backning runt hörn: bakhjulen går tätt, framvagnen svänger ut</title>
      <desc id="bh-desc">
        Vy uppifrån av en lodrät gata med en sidogata som går ut åt höger. Din bil, ritad med
        prickmönster och en fylld nos, står i högra körfältet med nosen uppåt och backar nedåt i
        bilden och runt hörnet in i sidogatan, där den slutar med nosen åt vänster i sidogatans
        övre halva. Bilen visas i tre lägen: start, mitt i svängen och slut. Tre numrerade steg: 1,
        rakt bakåt först. 2, ratten vrids åt höger, det håll bakvagnen ska; framvagnen svänger då
        ut åt vänster, motsatt håll. 3, ratten rätas upp innan bilen är framme. En heldragen linje
        visar det inre bakhjulets väg: den går tätt intill hörnet i en snäv kurva. En streckad
        linje visar det yttre framhörnets svep: en vidare kurva som svänger ut åt vänster över
        gatans mittlinje. En prickad linje från förarplatsen pekar bakåt över axeln dit bilen ska,
        och en kort pil pekar på framvagnen som svänger ut. Under bilden står regeln: backa endast
        om det kan ske utan fara eller hinder för andra vägtrafikanter, och skyldigheten ligger på
        dig som backar.
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

      <text x="200" y="22" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Backning runt hörn: bakhjulen går tätt, framvagnen svänger ut
      </text>

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
      <text x="232" y="394" className="fill-text-primary text-[13px] font-medium">
        Blicken bakåt över axeln, dit bilen ska
      </text>

      {/* Framvagnen svänger ut åt motsatt håll */}
      <text x="10" y="238" className="fill-text-primary text-[13px] font-medium">
        Framvagnen
      </text>
      <text x="10" y="254" className="fill-text-primary text-[13px] font-medium">
        svänger ut åt
      </text>
      <text x="10" y="270" className="fill-text-primary text-[13px] font-medium">
        motsatt håll
      </text>
      <line
        x1="104"
        y1="262"
        x2="166"
        y2="276"
        className="stroke-safety-600"
        strokeWidth="2"
        markerEnd="url(#bh-arrow-front)"
      />

      {/* Stegnummer */}
      <circle cx="160" cy="192" r="10" className="fill-none stroke-text-tertiary" strokeWidth="1.5" />
      <text x="160" y="197" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        1
      </text>
      <circle cx="152" cy="318" r="10" className="fill-none stroke-text-tertiary" strokeWidth="1.5" />
      <text x="152" y="323" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        2
      </text>
      <circle cx="360" cy="317" r="10" className="fill-none stroke-text-tertiary" strokeWidth="1.5" />
      <text x="360" y="322" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
        3
      </text>

      {/* Teckenförklaring */}
      <g transform="translate(20, 446)">
        <line x1="0" y1="0" x2="30" y2="0" className="stroke-progress-600" strokeWidth="2.5" />
        <text x="38" y="4" className="fill-text-secondary text-[13px]">
          Bakhjulens väg: snäv kurva, tätt intill hörnet
        </text>
        <line
          x1="0"
          y1="22"
          x2="30"
          y2="22"
          className="stroke-safety-600"
          strokeWidth="2.5"
          strokeDasharray="7 5"
        />
        <text x="38" y="26" className="fill-text-secondary text-[13px]">
          Framvagnens svep: vidare kurva, ut åt motsatt håll
        </text>
        <line
          x1="0"
          y1="44"
          x2="30"
          y2="44"
          className="stroke-primary-600"
          strokeWidth="2"
          strokeDasharray="2 4"
        />
        <text x="38" y="48" className="fill-text-secondary text-[13px]">
          Blicken
        </text>
      </g>

      {/* Stegen */}
      <text x="20" y="522" className="fill-text-primary text-[13px] font-medium">
        1. Backa rakt en bit först. 2. Vrid ratten åt det håll bakvagnen ska,
      </text>
      <text x="20" y="540" className="fill-text-primary text-[13px] font-medium">
        och håll koll på framvagnen. 3. Räta upp innan du är framme, inte efter.
      </text>

      {/* Regeln */}
      <text x="20" y="570" className="fill-text-primary text-[13px] font-medium">
        Backa endast om det kan ske utan fara eller hinder för andra
      </text>
      <text x="20" y="588" className="fill-text-primary text-[13px] font-medium">
        vägtrafikanter (3 kap 46 §). Skyldigheten ligger på dig som backar.
      </text>
      <text x="20" y="608" className="fill-text-secondary text-[13px]">
        Krypfart. Tappar du överblicken: stanna helt och titta om.
      </text>
    </svg>
  );
}
