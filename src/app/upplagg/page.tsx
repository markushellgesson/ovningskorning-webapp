import Link from 'next/link';
import { Card } from '@/components/ui/card';

export const metadata = {
  title: 'Upplägg',
};

/**
 * Stegringsföljden källorna tillsammans ger (ingen enskild källa formulerar
 * hela kedjan, men de pekar åt samma håll — se
 * docs/research/underlag-moment-och-metod.md avsnitt 5.6).
 */
const STEPS = [
  {
    title: 'Avstängd yta eller annan plats utan trafik',
    summary:
      'Säkerhetskontroll, förarplats, reglage och grundläggande manövrering — backning, vändning, parkering. Öva här längre än det känns nödvändigt.',
    why: 'Att arbeta mycket med grundläggande manövrering gör att eleven börjar automatisera kunskaperna och på så sätt får mer utrymme att koncentrera sig på trafiken senare. Broschyren rekommenderar uttryckligen att öva manövrering "lite längre än vad som är absolut nödvändigt".',
    source: 'Transportstyrelsen, broschyren "Råd till handledaren vid privat övningskörning" (TS201624, utgåva 3, augusti 2026)',
  },
  {
    title: 'Lugn plats med lite trafik',
    summary:
      'Enkla korsningar och låg hastighet, på en plats där inte mycket annat stör eleven.',
    why: '"I början är det viktigt att öva på lugna platser där det inte finns annan trafik som stör eleven. Vänta med att köra i trafik tills eleven kan hantera fordonet säkert."',
    source: 'Transportstyrelsen, "Planera övningskörningen" (uppdaterad 2026-08-01)',
  },
  {
    title: 'Öka svårighetsgraden i trafik, steg för steg',
    summary:
      'Gå igenom teorin för en ny miljö tillsammans innan ni kör där, och öka svårighetsgraden efter hand.',
    why: 'Broschyren rekommenderar att kombinera teori och praktik när ni börjar köra i trafik, och att gå igenom den teoretiska delen tillsammans innan ni kör i en ny miljö — med ökande svårighetsgrad efter hand.',
    source: 'Transportstyrelsen, broschyren "Råd till handledaren vid privat övningskörning" (TS201624, utgåva 3, augusti 2026)',
  },
  {
    title: 'Alla trafikmiljöer — och övergångarna mellan dem',
    summary:
      'Landsväg, tätort, motorväg, cirkulationsplats — och bytet mellan dem: från landsväg in i tätort, från motorväg ut på en lokalgata.',
    why: 'Körkortsdirektivets bilaga II säger att körtiden bör utnyttjas optimalt för att bedöma körningen i alla aktuella trafikmiljöer, "särskilt med hänsyn till övergången mellan sådana miljöer". Övergången är alltså en egen sak att kunna, inte bara summan av miljöerna var för sig.',
    source: 'Direktiv 2006/126/EG om körkort, bilaga II, punkt 11 (platsen för provet)',
  },
  {
    title: 'Besvärliga förhållanden — men först när grunderna sitter',
    summary: 'Halka, mörker och liknande. Vänta med de här förhållandena tills eleven klarar de vanliga kraven väl.',
    why: '"Öva inte i halka, mörker eller andra besvärliga förhållanden förrän du är säker på att din elev kan klara de speciella kraven vid sådan körning."',
    source: 'Transportstyrelsen, broschyren "Råd till handledaren vid privat övningskörning" (TS201624, utgåva 3, augusti 2026)',
  },
  {
    title: 'Självständig körning mot ett mål',
    summary:
      'Eleven kör mot ett mål hen känner till, eller ett mål utpekat med vägmärken, utan löpande instruktioner. Kör hen fel ska hen kunna upptäcka det och rätta till det själv.',
    why: 'Det här är slutmålet: "Eleven ska successivt kunna utföra övningarna självständigt utan stöd från handledaren", och "I slutet av utbildningen ska eleven kunna köra säkert, miljömedvetet och självständigt i alla slags trafikmiljöer." Trafikverket har det som en egen del av körprovet.',
    source: 'Transportstyrelsen, "Planera övningskörningen"; Trafikverkets beskrivning av körprov B ("Så går körprovet till")',
  },
];

export default function UpplaggPage() {
  return (
    <main className="min-h-dvh bg-surface-overlay p-6 pb-24">
      <div className="mx-auto max-w-2xl space-y-8">
        <header className="space-y-4">
          <Link href="/" className="text-primary-600 hover:underline">
            ← Tillbaka
          </Link>
          <h1 className="text-4xl font-bold text-text-primary">Upplägg</h1>
          <p className="text-xl text-text-secondary">
            Momenten säger vad ni ska öva. Den här sidan säger hur — i vilken ordning, och vad ni
            gör före varje körning.
          </p>
        </header>

        <Card padding="lg" className="space-y-3">
          <p className="text-base leading-relaxed text-text-primary">
            Allt på den här sidan är råd från Transportstyrelsen och Trafikverket — inte bindande
            regler. Fram till den 1 augusti 2026 fanns en föreskrift om hur handledare och elev
            skulle arbeta tillsammans, TSFS 2010:127. Den är upphävd genom TSFS 2026:57, och sedan
            dess finns ingen författning alls om hur privat övningskörning ska läggas upp. Det som
            återstår är myndigheternas råd, och det är vad sidan bygger på.
          </p>
        </Card>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text-primary">Två råd som gäller genomgående</h2>
          <div className="space-y-3">
            <Card padding="md" className="space-y-2">
              <h3 className="text-lg font-semibold text-text-primary">
                Öva klart innan ni går vidare
              </h3>
              <p className="text-base leading-relaxed text-text-primary">
                &quot;Öva på varje moment tills eleven kan genomföra det självständigt innan ni
                påbörjar nästa övning.&quot;
              </p>
              <p className="text-sm text-text-tertiary">
                Transportstyrelsen, &quot;Planera övningskörningen&quot; (uppdaterad 2026-08-01)
              </p>
            </Card>
            <Card padding="md" className="space-y-2">
              <h3 className="text-lg font-semibold text-text-primary">
                Kontrollera bilen före varje körning
              </h3>
              <p className="text-base leading-relaxed text-text-primary">
                &quot;Gör en säkerhetskontroll eller en del av den före varje körövning.&quot; Det
                behöver inte vara en fullständig kontroll varje gång — men gör alltid något, så
                blir det naturligt för eleven att göra likadant på egen hand senare.
              </p>
              <p className="text-sm text-text-tertiary">
                Transportstyrelsen, broschyren &quot;Råd till handledaren vid privat
                övningskörning&quot; (TS201624, utgåva 3, augusti 2026)
              </p>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text-primary">Stegringsföljd</h2>
          <p className="text-base leading-relaxed text-text-secondary">
            Ingen enskild källa skriver ut hela kedjan, men de pekar åt samma håll. Öppna ett steg
            för att se varför.
          </p>
          <ol className="space-y-3">
            {STEPS.map((step, index) => (
              <li key={step.title}>
                <Card padding="none" className="overflow-hidden">
                  <details className="group">
                    <summary className="flex min-h-12 cursor-pointer list-none items-center gap-4 p-4 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
                      <span
                        aria-hidden="true"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-pill)] bg-primary-600 text-lg font-semibold text-white"
                      >
                        {index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-lg font-semibold text-text-primary">{step.title}</p>
                        <p className="mt-1 text-sm text-text-secondary">{step.summary}</p>
                      </div>
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-xl text-text-tertiary transition-transform duration-150 group-open:rotate-180"
                      >
                        ↓
                      </span>
                    </summary>
                    <div className="space-y-2 border-t border-border-subtle p-4 pt-3">
                      <p className="text-base leading-relaxed text-text-primary">{step.why}</p>
                      <p className="text-sm text-text-tertiary">{step.source}</p>
                    </div>
                  </details>
                </Card>
              </li>
            ))}
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text-primary">Tveka inte för länge</h2>
          <Card padding="lg" className="space-y-3">
            <p className="text-base leading-relaxed text-text-primary">
              Källorna handlar lika mycket om att inte tveka som om att hålla marginaler.
              Trafikverket skriver, om körning i cirkulationsplats, att den som kör för sakta eller
              ligger kvar i en för låg växel visar dålig planering snarare än försiktighet.
              Obeslutsamheten blir då ett eget hinder: en förare får inte utan giltigt skäl köra med
              överdrivet låg hastighet, plötsligt bromsa eller på något annat sätt hindra andra
              förares körning (trafikförordningen 3 kap 16 §). Det kommande körkortsdirektivet byter
              också ut kravet på &quot;tydlig&quot; körning mot &quot;beslutsam&quot; körning (gäller
              från 2029, inte i dag).
            </p>
            <p className="text-base leading-relaxed text-text-primary">
              Det är inget skäl att chansa. Målet är fortfarande marginaler och säkerhet — men
              beslutsamt utförda. Att vänta för länge med att bestämma sig är i sig en risk, precis
              som att köra för nära eller för fort.
            </p>
            <p className="text-sm text-text-tertiary">
              Trafikverkets svar om cirkulationsplats i körprovet; Direktiv (EU) 2025/2205 om
              körkort, bilaga II punkt 9.2 (tillämpligt från 2029-11-26, inte i dag)
            </p>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text-primary">Ett pass, i tre delar</h2>
          <div className="space-y-3">
            <Card padding="none" className="overflow-hidden">
              <details className="group" open>
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 p-4 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
                  <span className="text-lg font-semibold text-text-primary">Före</span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-xl text-text-tertiary transition-transform duration-150 group-open:rotate-180"
                  >
                    ↓
                  </span>
                </summary>
                <div className="space-y-2 border-t border-border-subtle p-4 pt-3">
                  <p className="text-base leading-relaxed text-text-primary">
                    Bestäm i förväg vad ni ska öva på och var. Kontrollera innan ni kör:
                    körkortstillstånd och legitimation tillgängliga i bilen, giltigt
                    handledargodkännande tillgängligt i bilen, och att bilen är säker och har den
                    gröna ÖVNINGSKÖR-skylten.
                  </p>
                </div>
              </details>
            </Card>

            <Card padding="none" className="overflow-hidden">
              <details className="group" open>
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 p-4 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
                  <span className="text-lg font-semibold text-text-primary">Under</span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-xl text-text-tertiary transition-transform duration-150 group-open:rotate-180"
                  >
                    ↓
                  </span>
                </summary>
                <div className="border-t border-border-subtle p-4 pt-3">
                  <ol className="space-y-2">
                    {[
                      'Öva först på lugna platser utan annan trafik som stör. Vänta med att köra i trafik tills eleven kan hantera fordonet säkert.',
                      'Ge instruktioner i god tid, så eleven hinner uppfatta och genomföra dem.',
                      'Förklara gärna varför en övning ska göras på ett visst sätt — det hjälper eleven att förstå och utveckla sitt körsätt.',
                      'Öva på varje moment tills eleven kan göra det självständigt innan ni går vidare till nästa övning.',
                      'Ta regelbundna pauser, och låt eleven reflektera över hur övningen går.',
                    ].map((tip, i) => (
                      <li key={i} className="flex gap-3 text-base text-text-primary">
                        <span
                          aria-hidden="true"
                          className="w-5 shrink-0 select-none font-medium text-text-tertiary tabular-nums"
                        >
                          {i + 1}.
                        </span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </details>
            </Card>

            <Card padding="none" className="overflow-hidden">
              <details className="group" open>
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 p-4 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
                  <span className="text-lg font-semibold text-text-primary">Efter</span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-xl text-text-tertiary transition-transform duration-150 group-open:rotate-180"
                  >
                    ↓
                  </span>
                </summary>
                <div className="border-t border-border-subtle p-4 pt-3">
                  <ul className="space-y-2">
                    {[
                      'Låt eleven själv beskriva vad som gick bra och vilka moment som behöver övas mer.',
                      'Låt eleven göra en egen bedömning av sina körkunskaper.',
                      'Kom överens om vad ni ska öva nästa gång, och boka in tillfället.',
                    ].map((tip, i) => (
                      <li key={i} className="flex gap-3 text-base text-text-primary">
                        <span aria-hidden="true" className="w-5 shrink-0 select-none text-text-tertiary">
                          •
                        </span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </Card>
          </div>
          <p className="text-sm text-text-tertiary">
            Transportstyrelsen, &quot;Planera övningskörningen&quot; (uppdaterad 2026-08-01) och
            broschyren &quot;Råd till handledaren vid privat övningskörning&quot; (TS201624, utgåva
            3, augusti 2026)
          </p>
          <p className="max-w-[var(--measure)] text-base leading-relaxed text-text-primary">
            Målet med hela upplägget, i myndighetens egna ord: &quot;Målet är att utveckla säkra,
            självständiga och ansvarsfulla förare – inte bara att klara körprovet.&quot;
          </p>
        </section>

        <section className="space-y-3 border-t border-border-default pt-8">
          <h2 className="text-xl font-semibold text-text-primary">Källor</h2>
          <ul className="space-y-1.5 text-sm text-text-tertiary">
            <li>Transportstyrelsen, &quot;Planera övningskörningen&quot; (uppdaterad 2026-08-01)</li>
            <li>
              Transportstyrelsen, broschyren &quot;Råd till handledaren vid privat
              övningskörning&quot; (TS201624, utgåva 3, augusti 2026)
            </li>
            <li>Trafikverket, &quot;Så går körprovet till&quot; (behörighet B)</li>
            <li>TSFS 2026:57, om upphävande av TSFS 2010:127</li>
            <li>Direktiv 2006/126/EG om körkort, bilaga II (konsoliderad text, 2020-11-01)</li>
            <li>
              Direktiv (EU) 2025/2205 om körkort, bilaga II (tillämpligt först från 2029-11-26 —
              framåtblick, inte gällande krav)
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
