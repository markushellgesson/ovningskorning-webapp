import { PageBody, PageHeader, PageShell } from '@/components/ui/page-shell';
import { RowLink } from '@/components/ui/list-row';
import { Section, SectionTitle } from '@/components/ui/section';
import { Skylt } from '@/components/ui/skylt';
import content from '@/content';
import { progressionMap } from './plan/plan-data';

export const metadata = {
  title: 'Hem',
};

/**
 * Startsidan: åtgärder före förklaring. Den som öppnar appen vill någonstans
 * — de tre destinationerna står först, som listrader, i samma ordning som
 * bottennavigeringen. "Vad är detta?" står kvar, men sist och utan kort.
 *
 * Antalen räknas ur innehållet i stället för att stå i klartext: sidan sa
 * en gång 47 moment när det var 57, och ingen märkte det.
 */
const DESTINATIONS = [
  {
    href: '/skills',
    title: 'Träningsmoment',
    description: `${content.skills.length} moment med mål, övningssteg och vanliga misstag, ordnade efter område`,
  },
  {
    href: '/plan',
    title: 'Ordning',
    description: `En möjlig väg genom momenten, i ${progressionMap.levels.length} steg som bygger på varandra`,
  },
  {
    href: '/upplagg',
    title: 'Upplägg',
    description:
      'Hur ni lägger upp ett pass, i vilken ordning ni går vidare, och vad ni gör före varje körning',
  },
] as const;

export default function HomePage() {
  return (
    <PageShell>
      <PageHeader
        display
        mast={<Skylt />}
        title="Övningskörning B"
        lead="Strukturerat stöd för privat övningskörning till B-körkort"
      />

      <PageBody>
        <nav aria-label="Innehåll">
          <ul className="divide-y divide-border-subtle border-t border-border-subtle">
            {DESTINATIONS.map((destination) => (
              <li key={destination.href}>
                <RowLink href={destination.href} className="py-4">
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-semibold text-text-primary">
                      {destination.title}
                    </span>
                    <span className="mt-0.5 block max-w-[var(--measure)] text-base text-text-secondary">
                      {destination.description}
                    </span>
                  </span>
                </RowLink>
              </li>
            ))}
          </ul>
        </nav>

        <Section>
          <SectionTitle>Vad är detta?</SectionTitle>
          <div className="mt-5 max-w-[var(--measure)] space-y-4">
            <p className="text-lg text-text-primary">
              Ett verktyg för elev och handledare som strukturerar övningskörningen utifrån de
              kompetenser som krävs för B-körkort. Byggt på Transportstyrelsens kursplan.
            </p>
            <p className="text-lg text-text-secondary">
              Den här versionen är en demo som klarar sig utan server och körs direkt i webbläsaren.
              All data lagras lokalt på din enhet — ingen server, inget konto, ingen inloggning.
              Data stannar kvar tills du rensar webbläsardata.
            </p>
          </div>
        </Section>
      </PageBody>
    </PageShell>
  );
}
