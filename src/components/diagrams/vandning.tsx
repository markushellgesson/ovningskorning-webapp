/**
 * Vändning (MAN-09) — trepunktsvändning i tre steg. Själva tekniken är
 * körteknik, inte regel; regeln är 3 kap 46 § första stycket (endast utan
 * fara eller hinder) samt tecken enligt 3 kap 65 och 66 §§.
 *
 * Geometri (högertrafik, vy uppifrån, 12 px ≈ 1 m, bakaxelradie 45 vid fullt
 * rattutslag, hjulbas 32, bil 22 × 53). Varje steg är ett block med
 * translate, och scenen i blocket ligger i en grupp med translate(0 22);
 * koordinaterna nedan är scenens lokala:
 * - Vägen går vågrätt, y 40–140, mittlinje y 90. Din bil kör åt höger (öster)
 *   och står därför i det södra körfältet, y 90–140.
 * - Steg 1, framåt med fullt vänsterutslag: bakaxeln (111, 115) går runt
 *   (111, 70). Stopp vid kurs 58° från öster: bakaxel (149.2, 93.8), nos
 *   (171.5, 58.2), yttre framhörn (162.2, 52.4), 12 px från norra kanten.
 * - Steg 2, backning med fullt högerutslag (motsatt): bakaxeln går runt
 *   (187.4, 117.7). Stopp när bilen står tvärs vägen, kurs 90°: bakaxel
 *   (142.4, 117.7), bakkant y 128.7, 11 px från södra kanten. Ratten hålls
 *   åt höger hela backningen; ingen uppriktning här.
 * - Steg 3, framåt med fullt vänsterutslag: bakaxeln går runt (97.4, 117.7)
 *   till kurs 180°, bakaxel (97.4, 72.7). Yttre framhörnet når som högst
 *   y 47.7 och håller sig inne på vägen. Vid nos (55.4, 72.7) pekar bilen
 *   åt väster och ratten rätas upp; bilen ligger då i norra körfältet, som
 *   är höger körfält för den riktningen.
 *
 * Förklaringsrutan längst ned är fristående: samma bil på ett kort stycke
 * väg, tvärs (rotate 0) när utslaget hållits hela backningen, respektive
 * kvar snett (rotate 20) när ratten rätats upp mitt i.
 */

function Bil({
  cx,
  cy,
  rotate,
  opacity = 1,
}: {
  cx: number;
  cy: number;
  rotate: number;
  opacity?: number;
}) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate})`} opacity={opacity}>
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
        fill="url(#vd-dots)"
        className="stroke-attention-600"
        strokeWidth="2"
      />
      <polygon points="-7,-18 0,-25 7,-18" className="fill-attention-600" />
    </g>
  );
}

function Vag() {
  return (
    <g>
      <rect x="0" y="40" width="400" height="100" className="fill-diagram-road" />
      <line x1="0" y1="40" x2="400" y2="40" className="stroke-diagram-edge" strokeWidth="3" />
      <line x1="0" y1="140" x2="400" y2="140" className="stroke-diagram-edge" strokeWidth="3" />
      <line
        x1="0"
        y1="90"
        x2="400"
        y2="90"
        className="stroke-diagram-marking"
        strokeWidth="2"
        strokeDasharray="10 8"
      />
    </g>
  );
}

/** Kort stycke väg till förklaringsrutan: två körfält, 150 × 80. */
function Minivag() {
  return (
    <g>
      <rect x="0" y="0" width="150" height="80" className="fill-diagram-road" />
      <line x1="0" y1="0" x2="150" y2="0" className="stroke-diagram-edge" strokeWidth="2" />
      <line x1="0" y1="80" x2="150" y2="80" className="stroke-diagram-edge" strokeWidth="2" />
      <line x1="0" y1="40" x2="150" y2="40" className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="10 8" />
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

export function VandningDiagram() {
  return (
    <svg
      viewBox="0 0 400 1150"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="vd-title vd-desc"
    >
      <title id="vd-title">Trepunktsvändning i tre steg</title>
      <desc id="vd-desc">
        Tre bilder av samma väg sedd uppifrån, numrerade 1 till 3 uppifrån och ned med en fylld
        siffra, en rubrik och en rad om rattläget över varje bild. Vägen går vågrätt med en
        streckad mittlinje. Din bil är ritad med prickmönster och en fylld nos som visar vart den
        pekar. Steg 1: bilen står i nedre körfältet med nosen åt höger, blinkar vänster i god tid
        och kör fram i krypfart med ratten fullt åt vänster. En streckad grön pil visar nosens väg
        i en båge upp mot den övre kanten. Bilen stannar snett, med nosen uppåt höger och tydlig
        marginal kvar till kanten. Steg 2: föraren vrider sig om och tittar bakåt, en prickad
        linje pekar från förarplatsen bakåt. Ratten vrids fullt åt höger, alltså åt motsatt håll,
        och bilen backar i krypfart. En streckad röd pil visar bakkantens väg ned mot den nedre
        kanten. Bilen stannar när den står tvärs över vägen med nosen uppåt, med marginal kvar
        till kanten. Ratten hålls åt höger under hela backningen och rätas inte upp här. Steg 3:
        två pilar vid vägens ändar visar att du kollar åt båda håll och väntar tills körbanan är
        fri. Sedan kör bilen fram i krypfart med ratten fullt åt vänster igen, i en båge mot
        vänster. En grön markering med en tunn hänvisningslinje visar var bilen pekar åt vänster
        längs vägen, och först här rätas ratten upp. Bilen ligger då i det övre körfältet, som är
        höger körfält i den nya riktningen. Under bilderna står regeln: vänd endast om det kan
        ske utan fara eller hinder för andra vägtrafikanter, och skyldigheten ligger på dig som
        vänder. Tecknet befriar inte från att försäkra sig. Längst ned en förklaringsruta med två
        små bilder av vägen: till vänster har utslaget hållits hela backningen och bilen står
        tvärs vägen, markerat med en bock; till höger rätades ratten upp mitt i backningen och
        bilen står kvar snett, markerat med ett kryss.
      </desc>

      <defs>
        <pattern id="vd-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.5" className="fill-attention-600" />
        </pattern>
        <marker
          id="vd-arrow-fwd"
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
          id="vd-arrow-back"
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
          id="vd-arrow-look"
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
        Trepunktsvändning
      </text>
      <text x="20" y="56" className="fill-text-secondary text-[13px]">
        Fram, back, fram — ratten byter håll varje gång
      </text>

      {/* Steg 1: fram med fullt vänsterutslag */}
      <g transform="translate(0 76)">
        <Siffra n={1} x={16} y={12} />
        <text x="34" y="17" className="fill-text-primary text-[15px] font-semibold">
          Fram, ratten fullt åt vänster
        </text>
        <text x="34" y="36" className="fill-text-secondary text-[13px]">
          Blinka vänster i god tid, kör fram i krypfart
        </text>

        <g transform="translate(0 22)">
          <Vag />

          {/* Startläge: nosen åt höger, södra körfältet */}
          <Bil cx={126.5} cy={115} rotate={90} opacity={0.35} />

          {/* Nosens väg: båge radie 61.6 runt (111,70) */}
          <path
            d="M 153 115 A 61.6 61.6 0 0 0 171.5 58.2"
            className="fill-none stroke-progress-600"
            strokeWidth="2.5"
            strokeDasharray="7 5"
            markerEnd="url(#vd-arrow-fwd)"
          />

          {/* Stoppläge: kurs 58° från öster */}
          <Bil cx={157.4} cy={80.7} rotate={32} />

          {/* Marginal till kanten: yttre framhörnet (162.2, 52.4) mot kanten y 40 */}
          <line x1="200" y1="40" x2="200" y2="52" className="stroke-text-tertiary" strokeWidth="1.5" />
          <line x1="196" y1="52" x2="204" y2="52" className="stroke-text-tertiary" strokeWidth="1.5" />
          <text x="210" y="60" className="fill-text-primary text-[13px] font-medium">
            Stanna i god tid före kanten
          </text>
        </g>

        <text x="10" y="186" className="fill-text-secondary text-[13px]">
          Tecken i god tid (3 kap 65 §), men tecknet befriar inte från
        </text>
        <text x="10" y="204" className="fill-text-secondary text-[13px]">
          att försäkra sig (3 kap 66 §).
        </text>
      </g>

      {/* Steg 2: backa med motsatt rattutslag, titta bakåt */}
      <g transform="translate(0 322)">
        <Siffra n={2} x={16} y={12} />
        <text x="34" y="17" className="fill-text-primary text-[15px] font-semibold">
          Backa, ratten fullt åt höger — motsatt håll
        </text>
        <text x="34" y="36" className="fill-text-secondary text-[13px]">
          Vrid dig om, titta bakåt. Håll utslaget hela backningen
        </text>

        <g transform="translate(0 22)">
          <Vag />

          {/* Läget från steg 1, tonat */}
          <Bil cx={157.4} cy={80.7} rotate={32} opacity={0.35} />

          {/* Bakkantens väg: båge radie 46.3 runt (187.4,117.7) */}
          <path
            d="M 143.4 103.1 A 46.3 46.3 0 0 0 142.4 128.7"
            className="fill-none stroke-safety-600"
            strokeWidth="2.5"
            strokeDasharray="7 5"
            markerEnd="url(#vd-arrow-back)"
          />

          {/* Stoppläge: tvärs vägen, nosen uppåt */}
          <Bil cx={142.4} cy={102.2} rotate={0} />

          {/* Blicken: från förarplatsen bakåt */}
          <circle cx="137.4" cy="90.2" r="4" className="fill-primary-600" />
          <line
            x1="137.4"
            y1="90.2"
            x2="137.4"
            y2="150"
            className="stroke-primary-600"
            strokeWidth="2"
            strokeDasharray="2 4"
            markerEnd="url(#vd-arrow-look)"
          />

          {/* Marginal till kanten: bakkant y 128.7 mot kanten y 140 */}
          <line x1="200" y1="129" x2="200" y2="140" className="stroke-text-tertiary" strokeWidth="1.5" />
          <line x1="196" y1="129" x2="204" y2="129" className="stroke-text-tertiary" strokeWidth="1.5" />
          <text x="210" y="121" className="fill-text-primary text-[13px] font-medium">
            Hellre ett tag till
          </text>
          <text x="210" y="136" className="fill-text-primary text-[13px] font-medium">
            än att skrapa kanten
          </text>

          {/* Rattläget: hålls hela backningen, ingen uppriktning här */}
          <text x="390" y="62" textAnchor="end" className="fill-text-primary text-[13px] font-medium">
            Ratt: fullt höger, motsatt håll
          </text>
          <text x="390" y="80" textAnchor="end" className="fill-text-primary text-[13px] font-medium">
            hålls hela backningen
          </text>
        </g>

        <text x="60" y="184" className="fill-text-primary text-[13px] font-medium">
          Vrid dig om, titta bakåt
        </text>
      </g>

      {/* Steg 3: fritt åt båda håll, kör ut, räta upp när bilen pekar rätt */}
      <g transform="translate(0 568)">
        <Siffra n={3} x={16} y={12} />
        <text x="34" y="17" className="fill-text-primary text-[15px] font-semibold">
          Fritt åt båda håll? Fram, ratten åt vänster
        </text>
        <text x="34" y="36" className="fill-text-secondary text-[13px]">
          Räta upp först när bilen pekar åt rätt håll
        </text>

        <g transform="translate(0 22)">
          <Vag />

          {/* Kolla åt båda håll */}
          <path d="M 40 124 L 8 124 M 16 117 L 8 124 L 16 131" className="fill-none stroke-text-primary" strokeWidth="2" />
          <text x="56" y="129" className="fill-text-primary text-[13px] font-medium">
            Kolla vänster
          </text>
          <path d="M 360 62 L 392 62 M 384 55 L 392 62 L 384 69" className="fill-none stroke-text-primary" strokeWidth="2" />
          <text x="354" y="67" textAnchor="end" className="fill-text-primary text-[13px] font-medium">
            Kolla höger
          </text>

          {/* Läget från steg 2, tonat */}
          <Bil cx={142.4} cy={102.2} rotate={0} opacity={0.35} />

          {/* Nosens väg: båge radie 61.6 runt (97.4,117.7), sedan rakt åt vänster */}
          <path
            d="M 142.4 75.7 A 61.6 61.6 0 0 0 55.4 72.7 L 22 72.7"
            className="fill-none stroke-progress-600"
            strokeWidth="2.5"
            strokeDasharray="7 5"
            markerEnd="url(#vd-arrow-fwd)"
          />

          {/* Slutläge: nosen åt vänster, norra körfältet */}
          <Bil cx={81.9} cy={72.7} rotate={-90} />

          {/* Här rätas ratten upp: bilen pekar rätt */}
          <circle cx="55.4" cy="72.7" r="5" className="fill-none stroke-progress-600" strokeWidth="2" />
          <Pekare x1={46} y1={150} x2={54} y2={82} />
          <text x="10" y="182" className="fill-text-primary text-[13px] font-medium">
            Räta upp först här — när bilen pekar åt rätt håll
          </text>
        </g>
      </g>

      {/* Regeln */}
      <text x="200" y="846" textAnchor="middle" className="fill-text-primary text-[13px] font-medium">
        Vänd endast om det kan ske utan fara eller hinder för andra
      </text>
      <text x="200" y="864" textAnchor="middle" className="fill-text-primary text-[13px] font-medium">
        vägtrafikanter (3 kap 46 §).
      </text>
      <text x="200" y="882" textAnchor="middle" className="fill-text-primary text-[13px] font-medium">
        Skyldigheten ligger på dig som vänder.
      </text>
      <text x="200" y="906" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Välj en plats med fri sikt åt båda håll. Krypfart hela vägen.
      </text>
      <text x="200" y="924" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Antalet tag är inte poängen — avbryt hellre än att skrapa.
      </text>

      {/* Förklaringsruta: varför utslaget hålls hela backningen */}
      <rect x="20" y="946" width="360" height="190" rx="6" className="fill-surface-raised stroke-border-default" strokeWidth="1.5" />
      <text x="36" y="972" className="fill-text-primary text-[14px] font-semibold">
        Håll utslaget hela backningen
      </text>
      <line x1="200" y1="986" x2="200" y2="1124" className="stroke-text-tertiary" strokeWidth="2" strokeDasharray="6 5" />

      {/* A: utslaget hålls, bilen vrider sig tills den står tvärs */}
      <g transform="translate(36 986)">
        <Minivag />
        <Bil cx={75} cy={40} rotate={0} />
      </g>
      <path d="M 36 1094 l 6 6 l 12 -13" className="fill-none stroke-progress-600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="60" y="1098" className="fill-text-primary text-[13px] font-semibold">
        Håller utslaget:
      </text>
      <text x="60" y="1116" className="fill-text-primary text-[13px]">
        kommer tvärs vägen
      </text>

      {/* B: ratten rätas upp mitt i, bilen slutar vrida sig och står kvar snett */}
      <g transform="translate(214 986)">
        <Minivag />
        <Bil cx={75} cy={40} rotate={20} />
      </g>
      <path d="M 214 1088 L 228 1102 M 228 1088 L 214 1102" className="stroke-safety-600" strokeWidth="3" strokeLinecap="round" />
      <text x="238" y="1098" className="fill-text-primary text-[13px] font-semibold">
        Rätar upp för tidigt:
      </text>
      <text x="238" y="1116" className="fill-text-primary text-[13px]">
        står kvar snett
      </text>
    </svg>
  );
}
