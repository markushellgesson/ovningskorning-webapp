/**
 * Infart på landsväg (RUR-01) — väjningsplikten, luckan och fartuppbyggnaden.
 *
 * Bilden lär ut en sak: luckan ska räcka för att du ska hinna upp i
 * landsvägens fart innan du är ute i den. Väjningsplikten formuleras
 * genomgående som en plikt som åligger föraren ("du ska vänta tills det är
 * säkert"); bilden säger aldrig att någon annan "har företräde", och den
 * innehåller inga mått, sekunder eller hastigheter.
 *
 * Det här är INTE en påfart med accelerationsfält (HWY-01). Här finns inget
 * fält att bygga fart i vid sidan av trafiken: fartuppbyggnaden sker i
 * landsvägens eget körfält, efter att luckan är vald. Därför saknas kil,
 * fältslut och vävning helt i den här bilden.
 *
 * GEOMETRI (högertrafik, vy uppifrån). Alla koordinater är dukens egna;
 * scenen ligger inte i någon förskjuten grupp.
 *
 *   Landsvägen är lodrät, körbana x 176–284 med mittlinje på x 230.
 *   - Körfältet x 176–230 (mitt 203) trafikeras NEDÅT (ökande y). För den som
 *     kör nedåt är förarens högra sida bildens vänstra (låga x) — därför är
 *     det västra körfältet det nedåtgående.
 *   - Körfältet x 230–284 (mitt 257) trafikeras UPPÅT (minskande y). För den
 *     som kör uppåt är förarens högra sida bildens högra (höga x).
 *
 *   Utfartsvägen ansluter från VÄSTER, körbana x 24–176, y 262–338, med
 *   mitten på y 300. Den som kör österut (ökande x) har sin högra sida i
 *   bildens nedre del (höga y), alltså är elevens halva y 300–338.
 *
 *   FORDONEN, vart och ett kontrollerat mot mittlinjen x 230 respektive
 *   mitten y 300:
 *   - Elevens bil, läge 1 (väntar): (130, 319), riktning höger. Karossen
 *     x 108–152, y 306–332 — helt i halvan y 300–338. Rätt sida.
 *   - Elevens bil, läge 2 (ute på landsvägen, kör nedåt): (203, 470).
 *     Karossen x 190–216, y 448–492 — helt väster om x 230, alltså i det
 *     nedåtgående körfältet. Rätt körfält för sin färdriktning.
 *     Lägena överlappar inte: läge 1 slutar på x 152, läge 2 börjar på
 *     x 190, och deras y-intervall (306–332 mot 448–492) är åtskilda.
 *   - Annan trafik A, kör NEDÅT: (203, 148), kaross x 190–216 — väster om
 *     x 230. Den kommer norrifrån, alltså från elevens vänstra sida, och det
 *     är i den strömmen luckan ska bedömas.
 *   - Annan trafik B, kör NEDÅT: (203, 648), kaross x 190–216 — väster om
 *     x 230. Den har redan passerat anslutningen.
 *   - Annan trafik C, kör UPPÅT: (257, 250), kaross x 244–270 — öster om
 *     x 230. Trafik i motsatt riktning, som visar att vägen bär trafik åt
 *     båda håll.
 *
 *   HÖGERSVÄNGEN: eleven svänger höger, från östlig till sydlig färdriktning,
 *   och ansluter därmed till det närmaste körfältet (x 176–230) utan att
 *   korsa något körfält. Den trafik som ska bedömas kommer följaktligen från
 *   vänster, uppifrån i bilden — samma håll som fordon A.
 *
 *   LUCKAN: mellanrummet i det nedåtgående körfältet mellan fordon A:s
 *   framkant (y 170) och fordon B:s bakkant (y 626). Måttmarkeringen ligger
 *   på x 222 med tvärstreck x 214–230 vid y 174 och y 624 — den lodräta
 *   linjen ligger öster om fordonens kaross (som slutar på x 216) och
 *   tvärstrecken ligger där ingen kaross finns.
 *
 *   VÄJNINGSMÄRKET B1 står vid anslutningen på x 142–172, y 344–370, alltså
 *   söder om utfartsvägen — på höger sida för den som kör österut ut mot
 *   landsvägen, vilket är den sida märket ska stå på för att gälla eleven.
 *
 *   FÖRKLARINGSRUTAN, efterräknad på samma sätt: båda miniscenerna har
 *   körbana x −54…54 kring origo med mittlinje på x 0. Elevens bil och
 *   landsvägsfordonet ligger båda på x −27, alltså i den västra halvan, och
 *   båda kör nedåt — samma körfält och samma riktning som i huvudbilden.
 *   Landsvägsfordonet ligger i båda fallen OVANFÖR eleven (lägre y), det vill
 *   säga kommer bakifrån norrifrån, precis som fordon A i huvudscenen. Rutan
 *   vänder alltså inte på situationen.
 *
 * MÖNSTER (varje mönster betyder en enda sak i den här bilden):
 * prickar = elevens bil, diagonala ränder = annan trafik, krysskraffering =
 * ytan där landsvägstrafiken tvingas bromsa. Heldragen pil = rör sig nu,
 * streckad pil = elevens väg ut, tre korta parallella streck framför ett
 * fordon = hög fart, röda klossar i bakkanten = bromsljus, grön
 * måttmarkering = luckan. Ingen betydelse bärs av färgen ensam: bock och
 * kryss, bromsljusens placering, skrafferingen och etiketterna bär den
 * parallellt.
 */

import { BASE_PATH } from '@/lib/base-path';

type Heading = 'up' | 'right' | 'down' | 'left';
const HEADING_DEG: Record<Heading, number> = { up: 0, right: 90, down: 180, left: -90 };

interface CarProps {
  cx: number;
  cy: number;
  width: number;
  length: number;
  heading: Heading | number;
  fill: string;
  stroke: string;
  brakeLights?: boolean;
}

/**
 * Bil ritad med fronten uppåt och sedan vriden efter färdriktningen.
 * Karossen upptar exakt (cx ± width/2, cy ± length/2); hjulen sticker ut 3 px.
 */
function Car({ cx, cy, width, length, heading, fill, stroke, brakeLights }: CarProps) {
  const hw = width / 2;
  const hl = length / 2;
  const deg = typeof heading === 'number' ? heading : HEADING_DEG[heading];
  const glass = `fill-diagram-marking ${stroke}`;
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${deg})`}>
      <g className="fill-text-primary">
        <rect x={-hw - 3} y={-hl + 5} width="5" height="9" rx="1.5" />
        <rect x={hw - 2} y={-hl + 5} width="5" height="9" rx="1.5" />
        <rect x={-hw - 3} y={hl - 14} width="5" height="9" rx="1.5" />
        <rect x={hw - 2} y={hl - 14} width="5" height="9" rx="1.5" />
      </g>
      <rect x={-hw} y={-hl} width={width} height={length} rx="4" fill={fill} className={stroke} strokeWidth="2" />
      <rect x={-hw + 5} y={-hl + 6} width={width - 10} height="7" rx="2" className={glass} strokeWidth="1" />
      <rect x={-hw + 5} y={hl - 10} width={width - 10} height="5" rx="2" className={glass} strokeWidth="1" />
      {brakeLights && (
        <g className="fill-safety-600">
          <rect x={-hw + 2} y={hl - 1} width="6" height="3" />
          <rect x={hw - 8} y={hl - 1} width="6" height="3" />
        </g>
      )}
    </g>
  );
}

/**
 * Fartstreck FRAMFÖR ett fordon: tre korta streck med olika längd, roterade
 * så att de pekar i färdriktningen. (cx, cy) är punkten strax framför fronten.
 */
function SpeedMarks({
  cx,
  cy,
  heading,
  className,
}: {
  cx: number;
  cy: number;
  heading: Heading;
  className: string;
}) {
  // Strecken ritas mot lokalt −y, vilket ar fordonets front fore rotationen.
  // Darfor anvands fardriktningens vinkel rakt av: strecken hamnar FRAMFOR
  // fordonet, inte bakom det.
  const deg = HEADING_DEG[heading];
  return (
    <g
      transform={`translate(${cx} ${cy}) rotate(${deg})`}
      className={className}
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <line x1="-12" y1="0" x2="-12" y2="-14" />
      <line x1="0" y1="0" x2="0" y2="-22" />
      <line x1="12" y1="0" x2="12" y2="-14" />
    </g>
  );
}

/** Numrerad hänvisning: mörk cirkel med siffra. */
function Callout({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="11" className="fill-text-primary" />
      <text x={x} y={y + 5} textAnchor="middle" className="fill-surface-base text-[14px] font-semibold">
        {n}
      </text>
    </g>
  );
}

/** Tunn pekarlinje från en etikett till det den syftar på, med en punkt i målet. */
function Pointer({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-text-tertiary" strokeWidth="1.5" />
      <circle cx={x2} cy={y2} r="3" className="fill-text-tertiary" />
    </g>
  );
}

function Check({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M ${x - 9} ${y} l 6 6 l 12 -13`}
      className="fill-none stroke-progress-600"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

function Cross({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M ${x - 7} ${y - 7} L ${x + 7} ${y + 7} M ${x + 7} ${y - 7} L ${x - 7} ${y + 7}`}
      className="stroke-safety-600"
      strokeWidth="3"
      strokeLinecap="round"
    />
  );
}

/**
 * Samma anslutning i skala 0,45 för förklaringsrutan. Origo mitt i vägbanan.
 * Nedåtgående körfält x −54…0, uppåtgående x 0…54, utfartsvägen från väster.
 * Både eleven och landsvägsfordonet kör nedåt i det västra körfältet (x −27),
 * och landsvägsfordonet kommer bakifrån (lägre y) — som fordon A i huvudbilden.
 */
function MiniInfart({ x, y, variant }: { x: number; y: number; variant: 'racker' | 'racker-inte' }) {
  const ok = variant === 'racker';
  const studentY = ok ? 34 : 30;
  const otherY = ok ? -70 : -34;
  return (
    <g transform={`translate(${x} ${y}) scale(0.45)`}>
      <rect x="-54" y="-110" width="108" height="220" className="fill-diagram-road" />
      <rect x="-110" y="-20" width="56" height="40" className="fill-diagram-road" />
      <g className="fill-none stroke-diagram-edge" strokeWidth="3">
        <path d="M -54 -110 L -54 -20 M -54 20 L -54 110" />
        <line x1="54" y1="-110" x2="54" y2="110" />
        <path d="M -110 -20 L -54 -20 M -110 20 L -54 20" />
      </g>
      <line x1="0" y1="-110" x2="0" y2="110" className="stroke-diagram-marking" strokeWidth="3" strokeDasharray="14 10" />

      {!ok && (
        <rect
          x="-54"
          y="-12"
          width="54"
          height="20"
          fill="url(#rur-hatch)"
          className="stroke-safety-600"
          strokeWidth="2"
        />
      )}

      {/* Landsvägsfordonet, kör nedåt, kommer bakifrån */}
      <Car
        cx={-27}
        cy={otherY}
        width={26}
        length={44}
        heading="down"
        fill="url(#rur-stripes)"
        stroke="stroke-primary-600"
        brakeLights={!ok}
      />

      {/* Elevens bil, ute i körfältet */}
      <Car
        cx={-27}
        cy={studentY}
        width={26}
        length={44}
        heading="down"
        fill="url(#rur-dots)"
        stroke="stroke-attention-600"
      />
      {ok && <SpeedMarks cx={-27} cy={62} heading="down" className="stroke-attention-600" />}

      {/* Vägen ut ur utfartsvägen — helt inne i utfartsvägens stump,
          så att pilen inte lägger sig över något fordon */}
      <path
        d="M -104 4 L -66 4"
        className={`fill-none ${ok ? 'stroke-progress-600' : 'stroke-safety-600'}`}
        strokeWidth="4"
        strokeDasharray="12 9"
        markerEnd={ok ? 'url(#rur-arrow-plan)' : 'url(#rur-arrow-bad)'}
      />
    </g>
  );
}

export function InfartLandsvagDiagram() {
  return (
    <svg
      viewBox="0 0 440 1146"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-labelledby="rur-title rur-desc"
    >
      <title id="rur-title">Infart på landsväg från utfartsväg</title>
      <desc id="rur-desc">
        En lodrät landsväg sedd uppifrån, med ett körfält åt vardera hållet. En smalare
        utfartsväg ansluter från vänster. Vid anslutningen står ett väjningspliktsmärke och en
        rad vita trianglar tvärs utfartsvägen. Elevens bil, fylld med prickmönster, visas i två
        lägen som inte överlappar: först stillastående i utfartsvägen, utan fartstreck, medan den
        bedömer trafiken, och sedan ute i det nedåtgående körfältet med tre korta parallella
        streck framför sig — farten har byggts upp. En streckad pil visar vägen ut ur
        utfartsvägen och ner i körfältet. Två fordon fyllda med diagonala ränder kör nedåt i
        samma körfält, ett långt ovanför och ett långt nedanför anslutningen, båda med
        fartstreck framför sig; mellan dem är luckan utmärkt med en grön linje mellan två gröna
        tvärstreck. Ett tredje randigt fordon kör uppåt i det andra körfältet. Markering 1 pekar
        på väjningspliktsmärket: du ska vänta tills det är säkert att köra ut. Markering 2 pekar
        på luckan: den ska räcka för att du ska hinna upp i farten. Markering 3 pekar på elevens
        bil ute i körfältet: accelerera bestämt upp i trafikens tempo. En teckenförklaring
        skiljer på heldragen pil, rör sig nu, streckad pil, din väg ut, korta parallella streck,
        hög fart, och grön måttmarkering, luckan. En ruta längst ned visar samma anslutning två
        gånger: luckan räckte, eleven är uppe i farten och har gott om utrymme bakåt, markerat
        med en bock, och luckan räckte inte, där landsvägsfordonet tätt bakom tänder bromsljus
        över en krysskrafferad yta, markerat med ett kryss.
      </desc>

      <defs>
        <pattern id="rur-dots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="4" cy="4" r="1.6" className="fill-attention-600" />
        </pattern>
        <pattern id="rur-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
          <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" className="stroke-primary-600" strokeWidth="2" />
        </pattern>
        <pattern id="rur-hatch" patternUnits="userSpaceOnUse" width="10" height="10">
          <path d="M0,10 l10,-10 M0,0 l10,10" className="stroke-safety-600" strokeWidth="1.3" />
        </pattern>
        <marker id="rur-arrow-other" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary-600" />
        </marker>
        <marker id="rur-arrow-plan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-progress-600" />
        </marker>
        <marker id="rur-arrow-bad" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-safety-600" />
        </marker>
      </defs>

      {/* Rubrik */}
      <text x="20" y="28" className="fill-text-primary text-[17px] font-semibold">
        Infart på landsväg
      </text>
      <text x="20" y="48" className="fill-text-secondary text-[14px]">
        Väjningsplikten, luckan och farten
      </text>

      {/* Landsvägen: ett körfält åt vardera hållet */}
      <rect x="176" y="86" width="108" height="656" className="fill-diagram-road" />

      {/* Utfartsvägen ansluter från väster */}
      <rect x="24" y="262" width="152" height="76" className="fill-diagram-road" />

      {/* Vägmarkeringar */}
      <g className="fill-none stroke-diagram-edge" strokeWidth="2">
        <path d="M 176 86 L 176 262 M 176 338 L 176 742" />
        <line x1="284" y1="86" x2="284" y2="742" />
        <path d="M 24 262 L 176 262 M 24 338 L 176 338" />
      </g>
      <line x1="230" y1="86" x2="230" y2="742" className="stroke-diagram-marking" strokeWidth="2" strokeDasharray="14 10" />

      {/* Väjningslinje tvärs utfartsvägen, spetsarna mot den som kör ut */}
      <g className="fill-diagram-marking">
        <polygon points="174,270 174,282 164,276" />
        <polygon points="174,286 174,298 164,292" />
        <polygon points="174,302 174,314 164,308" />
        <polygon points="174,318 174,330 164,324" />
      </g>

      {/* Vägnamn — det enda som får ligga på vägbanan */}
      <text x="230" y="108" textAnchor="middle" className="fill-diagram-marking text-[14px] font-semibold">
        Landsväg
      </text>
      <text x="86" y="286" textAnchor="middle" className="fill-diagram-marking text-[14px] font-semibold">
        Utfartsväg
      </text>

      {/* Väjningspliktsmärke vid anslutningen, på höger sida för den som kör ut */}
      <image href={`${BASE_PATH}/signs/B1.svg`} x="142" y="344" width="30" height="26" />

      {/* Teckenförklaring i högermarginalen */}
      <g>
        <path d="M 296 104 L 322 104" className="stroke-primary-600" strokeWidth="3" markerEnd="url(#rur-arrow-other)" />
        <text x="330" y="109" className="fill-text-secondary text-[14px]">
          Rör sig nu
        </text>
        <path
          d="M 296 126 L 322 126"
          className="stroke-progress-600"
          strokeWidth="3"
          strokeDasharray="8 6"
          markerEnd="url(#rur-arrow-plan)"
        />
        <text x="330" y="131" className="fill-text-secondary text-[14px]">
          Din väg ut
        </text>
        <g className="stroke-primary-600" strokeWidth="2.5" strokeLinecap="round">
          <line x1="298" y1="146" x2="298" y2="158" />
          <line x1="307" y1="144" x2="307" y2="160" />
          <line x1="316" y1="146" x2="316" y2="158" />
        </g>
        <text x="330" y="157" className="fill-text-secondary text-[14px]">
          Hög fart
        </text>
        <g className="stroke-progress-600" strokeWidth="2.5">
          <line x1="307" y1="174" x2="307" y2="192" />
          <line x1="299" y1="174" x2="315" y2="174" />
          <line x1="299" y1="192" x2="315" y2="192" />
        </g>
        <text x="330" y="188" className="fill-text-secondary text-[14px]">
          Luckan
        </text>
      </g>

      {/* Annan trafik A: kör nedåt, kommer norrifrån mot anslutningen */}
      <Car cx={203} cy={148} width={26} length={44} heading="down" fill="url(#rur-stripes)" stroke="stroke-primary-600" />
      <SpeedMarks cx={203} cy={176} heading="down" className="stroke-primary-600" />

      {/* Annan trafik B: kör nedåt, har redan passerat anslutningen */}
      <Car cx={203} cy={648} width={26} length={44} heading="down" fill="url(#rur-stripes)" stroke="stroke-primary-600" />
      <SpeedMarks cx={203} cy={676} heading="down" className="stroke-primary-600" />

      {/* Annan trafik C: kör uppåt i det andra körfältet */}
      <Car cx={257} cy={250} width={26} length={44} heading="up" fill="url(#rur-stripes)" stroke="stroke-primary-600" />
      <SpeedMarks cx={257} cy={222} heading="up" className="stroke-primary-600" />

      {/* Luckan i det nedåtgående körfältet: mellan A:s framkant och B:s bakkant */}
      <g className="stroke-progress-600" strokeWidth="2.5">
        <line x1="222" y1="174" x2="222" y2="624" />
        <line x1="214" y1="174" x2="230" y2="174" />
        <line x1="214" y1="624" x2="230" y2="624" />
      </g>

      {/* Elevens bil, läge 1: väntar i utfartsvägen och bedömer luckan */}
      <Car cx={130} cy={319} width={26} length={44} heading="right" fill="url(#rur-dots)" stroke="stroke-attention-600" />

      {/* Vägen ut: höger ut i det närmaste körfältet */}
      <path
        d="M 158 320 C 194 322 203 344 203 424"
        className="fill-none stroke-progress-600"
        strokeWidth="3"
        strokeDasharray="8 6"
        markerEnd="url(#rur-arrow-plan)"
      />

      {/* Elevens bil, läge 2: ute i körfältet, farten byggs upp */}
      <Car cx={203} cy={470} width={26} length={44} heading="down" fill="url(#rur-dots)" stroke="stroke-attention-600" />
      <SpeedMarks cx={203} cy={498} heading="down" className="stroke-attention-600" />

      {/* Etikett: landsvägstrafiken håller sin fart */}
      <g>
        <text x="14" y="140" className="fill-text-primary text-[14px] font-semibold">
          Landsvägstrafik
        </text>
        <text x="14" y="158" className="fill-text-secondary text-[14px]">
          håller sin fart
        </text>
        <Pointer x1={142} y1={150} x2={186} y2={150} />
      </g>

      {/* Etikett: trafik i motsatt riktning */}
      <g>
        <text x="300" y="246" className="fill-text-secondary text-[14px]">
          Trafik åt andra
        </text>
        <text x="300" y="264" className="fill-text-secondary text-[14px]">
          hållet
        </text>
        <Pointer x1={296} y1={252} x2={269} y2={252} />
      </g>

      {/* 1. Väjningsplikten */}
      <g>
        <Callout x={24} y={430} n={1} />
        <text x="40" y="435" className="fill-text-primary text-[14px] font-semibold">
          Väjningsplikt
        </text>
        <text x="14" y="457" className="fill-text-secondary text-[14px]">
          du ska vänta tills
        </text>
        <text x="14" y="475" className="fill-text-secondary text-[14px]">
          det är säkert
        </text>
        <text x="14" y="493" className="fill-text-secondary text-[14px]">
          att köra ut
        </text>
        <Pointer x1={150} y1={424} x2={157} y2={378} />
      </g>

      {/* 2. Luckan */}
      <g>
        <Callout x={24} y={560} n={2} />
        <text x="40" y="565" className="fill-text-primary text-[14px] font-semibold">
          Luckan
        </text>
        <text x="14" y="587" className="fill-text-secondary text-[14px]">
          ska räcka för att du
        </text>
        <text x="14" y="605" className="fill-text-secondary text-[14px]">
          ska hinna upp i
        </text>
        <text x="14" y="623" className="fill-text-secondary text-[14px]">
          landsvägens fart
        </text>
        <Pointer x1={150} y1={558} x2={218} y2={556} />
      </g>

      {/* 3. Fartuppbyggnaden */}
      <g>
        <Callout x={310} y={462} n={3} />
        <text x="326" y="467" className="fill-text-primary text-[14px] font-semibold">
          Accelerera
        </text>
        <text x="296" y="489" className="fill-text-secondary text-[14px]">
          bestämt upp i
        </text>
        <text x="296" y="507" className="fill-text-secondary text-[14px]">
          trafikens tempo
        </text>
        <Pointer x1={296} y1={456} x2={222} y2={468} />
      </g>

      {/* Vad bilden lär ut */}
      <text x="220" y="774" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        En utfartsväg ger dig väjningsplikt mot
      </text>
      <text x="220" y="792" textAnchor="middle" className="fill-text-primary text-[14px] font-medium">
        trafiken på landsvägen.
      </text>
      <text x="220" y="816" textAnchor="middle" className="fill-text-secondary text-[14px]">
        Rätt lucka räcker för att du ska komma upp i
      </text>
      <text x="220" y="834" textAnchor="middle" className="fill-text-secondary text-[14px]">
        landsvägens fart innan du är ute i den.
      </text>
      <text x="220" y="858" textAnchor="middle" className="fill-text-secondary text-[14px]">
        Bedöm luckan medan den är framför dig — att
      </text>
      <text x="220" y="876" textAnchor="middle" className="fill-text-secondary text-[14px]">
        vänta bort lucka efter lucka är också ett fel.
      </text>

      {/* Mönsterförklaring */}
      <g>
        <rect x="40" y="898" width="22" height="14" rx="2" fill="url(#rur-dots)" className="stroke-attention-600" strokeWidth="1.5" />
        <text x="68" y="910" className="fill-text-tertiary text-[14px]">
          Du
        </text>
        <rect x="108" y="898" width="22" height="14" rx="2" fill="url(#rur-stripes)" className="stroke-primary-600" strokeWidth="1.5" />
        <text x="136" y="910" className="fill-text-tertiary text-[14px]">
          Annan trafik
        </text>
        <rect x="236" y="898" width="22" height="14" rx="2" fill="url(#rur-hatch)" className="stroke-safety-600" strokeWidth="1.5" />
        <text x="264" y="910" className="fill-text-tertiary text-[14px]">
          Tvingas bromsa
        </text>
      </g>

      {/* Förklaringsruta: vad luckan och accelerationen leder till */}
      <rect x="20" y="930" width="400" height="200" rx="6" className="fill-none stroke-border-default" strokeWidth="1.5" />
      <text x="34" y="954" className="fill-text-primary text-[14px] font-semibold">
        När du väl har kört ut:
      </text>
      <line x1="220" y1="966" x2="220" y2="1118" className="stroke-border-default" strokeWidth="1.5" strokeDasharray="6 4" />

      <MiniInfart x={118} y={1016} variant="racker" />
      <text x="118" y="1078" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Luckan räckte
      </text>
      <text x="118" y="1094" textAnchor="middle" className="fill-text-secondary text-[14px]">
        ingen behöver bromsa
      </text>
      <Check x={118} y={1112} />

      <MiniInfart x={322} y={1016} variant="racker-inte" />
      <text x="322" y="1078" textAnchor="middle" className="fill-text-primary text-[14px] font-semibold">
        Luckan räckte inte
      </text>
      <text x="322" y="1094" textAnchor="middle" className="fill-text-secondary text-[14px]">
        trafiken måste bromsa
      </text>
      <Cross x={322} y={1112} />
    </svg>
  );
}
