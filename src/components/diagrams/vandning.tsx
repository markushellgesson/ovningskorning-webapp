/**
 * Vändning (MAN-09) — trepunktsvändning i tre steg. Själva tekniken är
 * körteknik, inte regel; regeln är 3 kap 46 § första stycket (endast utan
 * fara eller hinder) samt tecken enligt 3 kap 65 och 66 §§.
 *
 * Geometri (högertrafik, vy uppifrån, 12 px ≈ 1 m, bakaxelradie 45 vid fullt
 * rattutslag, hjulbas 32, bil 22 × 53):
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

export function VandningDiagram() {
  return (
    <svg
      viewBox="0 0 400 770"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="vd-title vd-desc"
    >
      <title id="vd-title">Trepunktsvändning i tre steg</title>
      <desc id="vd-desc">
        Tre bilder av samma väg sedd uppifrån, numrerade 1 till 3 uppifrån och ned. Vägen går
        vågrätt med en streckad mittlinje. Din bil är ritad med prickmönster och en fylld nos som
        visar vart den pekar. Steg 1: bilen står i nedre körfältet med nosen åt höger, blinkar
        vänster i god tid och kör fram i krypfart med ratten fullt åt vänster. En streckad grön
        pil visar nosens väg i en båge upp mot den övre kanten. Bilen stannar snett, med nosen
        uppåt höger och tydlig marginal kvar till kanten. Steg 2: föraren vrider sig om och tittar
        bakåt, en prickad linje pekar från förarplatsen bakåt. Ratten vrids fullt åt höger, alltså
        åt motsatt håll, och bilen backar i krypfart. En streckad röd pil visar bakkantens väg ned
        mot den nedre kanten. Bilen stannar när den står tvärs över vägen med nosen uppåt, med
        marginal kvar till kanten. Ratten hålls åt höger under hela backningen och rätas inte upp
        här. Steg 3: två pilar vid vägens ändar visar att du kollar åt båda håll och väntar tills
        körbanan är fri. Sedan kör bilen fram i krypfart med ratten fullt åt vänster igen, i en
        båge mot vänster. Vid en grön markering pekar bilen åt vänster längs vägen, och först här
        rätas ratten upp. Bilen ligger då i det övre körfältet, som är höger körfält i den nya
        riktningen. Under bilderna står regeln: vänd endast om det kan ske utan fara eller hinder
        för andra vägtrafikanter, och skyldigheten ligger på dig som vänder. Tecknet befriar
        inte från att försäkra sig.
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
        <marker
          id="vd-arrow-note"
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

      <text x="200" y="20" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Trepunktsvändning: fram, back, fram — ratten byter håll varje gång
      </text>

      {/* Steg 1: fram med fullt vänsterutslag */}
      <g transform="translate(0 30)">
        <circle cx="16" cy="14" r="10" className="fill-none stroke-text-tertiary" strokeWidth="1.5" />
        <text x="16" y="19" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
          1
        </text>
        <text x="34" y="19" className="fill-text-primary text-[13px] font-semibold">
          Blinka vänster, kör fram i krypfart med ratten fullt åt vänster
        </text>

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

        <text x="390" y="128" textAnchor="end" className="fill-text-secondary text-[13px]">
          Ratt: fullt vänster
        </text>
        <text x="10" y="164" className="fill-text-secondary text-[13px]">
          Tecken i god tid (3 kap 65 §) — men tecknet befriar inte (3 kap 66 §).
        </text>
      </g>

      {/* Steg 2: backa med motsatt rattutslag, titta bakåt */}
      <g transform="translate(0 250)">
        <circle cx="16" cy="14" r="10" className="fill-none stroke-text-tertiary" strokeWidth="1.5" />
        <text x="16" y="19" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
          2
        </text>
        <text x="34" y="19" className="fill-text-primary text-[13px] font-semibold">
          Titta bakåt, backa i krypfart med ratten fullt åt höger
        </text>

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
        <text x="60" y="160" className="fill-text-primary text-[13px] font-medium">
          Vrid dig om, titta bakåt
        </text>

        {/* Marginal till kanten: bakkant y 128.7 mot kanten y 140 */}
        <line x1="200" y1="129" x2="200" y2="140" className="stroke-text-tertiary" strokeWidth="1.5" />
        <line x1="196" y1="129" x2="204" y2="129" className="stroke-text-tertiary" strokeWidth="1.5" />
        <text x="210" y="134" className="fill-text-primary text-[13px] font-medium">
          Hellre ett tag till än att skrapa kanten
        </text>

        <text x="390" y="62" textAnchor="end" className="fill-text-secondary text-[13px]">
          Ratt: fullt höger — motsatt håll
        </text>
        <text x="390" y="80" textAnchor="end" className="fill-text-secondary text-[13px]">
          Håll utslaget hela backningen
        </text>
      </g>

      {/* Steg 3: fritt åt båda håll, kör ut, räta upp när bilen pekar rätt */}
      <g transform="translate(0 470)">
        <circle cx="16" cy="14" r="10" className="fill-none stroke-text-tertiary" strokeWidth="1.5" />
        <text x="16" y="19" textAnchor="middle" className="fill-text-primary text-[13px] font-semibold">
          3
        </text>
        <text x="34" y="19" className="fill-text-primary text-[13px] font-semibold">
          Fritt åt båda håll? Kör ut med ratten åt vänster, räta upp
        </text>

        <Vag />

        {/* Kolla åt båda håll */}
        <path d="M 40 104 L 8 104 M 16 97 L 8 104 L 16 111" className="fill-none stroke-text-primary" strokeWidth="2" />
        <text x="50" y="109" className="fill-text-primary text-[13px] font-medium">
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
        <line
          x1="44"
          y1="160"
          x2="51"
          y2="80"
          className="stroke-text-tertiary"
          strokeWidth="1.5"
          markerEnd="url(#vd-arrow-note)"
        />
        <text x="50" y="168" className="fill-text-primary text-[13px] font-medium">
          Räta upp först här, när bilen pekar åt rätt håll
        </text>

        <text x="390" y="128" textAnchor="end" className="fill-text-secondary text-[13px]">
          Ratt: fullt vänster, sedan rakt
        </text>
      </g>

      {/* Regeln */}
      <text x="200" y="700" textAnchor="middle" className="fill-text-primary text-[13px] font-medium">
        Vänd endast om det kan ske utan fara eller hinder för andra
      </text>
      <text x="200" y="718" textAnchor="middle" className="fill-text-primary text-[13px] font-medium">
        vägtrafikanter (3 kap 46 §). Skyldigheten ligger på dig som vänder.
      </text>
      <text x="200" y="742" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Välj en plats med fri sikt åt båda håll. Krypfart hela vägen.
      </text>
      <text x="200" y="760" textAnchor="middle" className="fill-text-secondary text-[13px]">
        Antalet tag är inte poängen — avbryt hellre än att skrapa.
      </text>
    </svg>
  );
}
