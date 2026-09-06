import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageBody, PageHeader, PageShell } from '@/components/ui/page-shell';
import { RowLink } from '@/components/ui/list-row';
import { Meta, Section, Subheading } from '@/components/ui/section';
import { skillsById, progressionMap, stepTitle } from '../plan-data';

export async function generateStaticParams() {
  return progressionMap.levels.map((_, index) => ({
    step: String(index + 1),
  }));
}

interface PlanStepPageProps {
  params: Promise<{ step: string }>;
}

function levelForParam(step: string) {
  const stepNumber = Number(step);
  if (!Number.isInteger(stepNumber) || stepNumber < 1) return null;
  const level = progressionMap.levels[stepNumber - 1];
  return level ? { level, stepNumber } : null;
}

export async function generateMetadata(props: PlanStepPageProps): Promise<Metadata> {
  const { step } = await props.params;
  const found = levelForParam(step);
  if (!found) return { title: 'Steg' };
  return { title: `Steg ${found.stepNumber} — ${stepTitle(found.level)}` };
}

// Samma stil som stegknapparna hade innan sidskalet, men med samma linje
// och luft ovanför som avsnitten — så att navigeringen sitter i rytmen i
// stället för att bryta den.
const STEP_NAV_LINK =
  'flex min-h-12 flex-1 items-center justify-center rounded-[var(--radius-sm)] border border-border-control px-4 text-base font-medium text-text-primary transition-colors duration-150 hover:bg-neutral-100 active:bg-neutral-300 active:duration-0 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none';

export default async function PlanStepPage({ params }: PlanStepPageProps) {
  const { step } = await params;
  const found = levelForParam(step);

  if (!found) {
    notFound();
  }

  const { level, stepNumber } = found;
  const totalSteps = progressionMap.levels.length;
  const previousStepNumber = stepNumber > 1 ? stepNumber - 1 : null;
  const nextStepNumber = stepNumber < totalSteps ? stepNumber + 1 : null;

  return (
    <PageShell>
      <PageHeader
        back={{ href: '/plan', label: 'Alla steg' }}
        eyebrow={`Steg ${stepNumber} av ${totalSteps}`}
        title={stepTitle(level)}
      />

      <PageBody>
        {level.groups.map((group) => {
          const prerequisiteNames = group.prerequisiteIds
            .map((id) => skillsById.get(id)?.name)
            .filter((name): name is string => Boolean(name));

          return (
            <Section key={group.id}>
              {/* Gruppetiketten är en tyst underrubrik, inte ett piller:
                  den skiljer grupper åt men ska inte ropa högre än
                  momentnamnen under sig. */}
              {group.skillIds.length > 1 && (
                <Subheading as="h2">Hör ihop — kan tränas i samma pass</Subheading>
              )}

              <ul
                className={`divide-y divide-border-subtle ${group.skillIds.length > 1 ? 'mt-2' : ''}`}
              >
                {group.skillIds.map((skillId) => {
                  const skill = skillsById.get(skillId);
                  if (!skill) return null;
                  // Egenskaperna som metarad i tertiärfärg. Det fyllda
                  // pillret finns bara på momentsidan, där det har
                  // sammanhang.
                  const meta = [
                    skill.continuous ? 'Tränas löpande' : null,
                    skill.safetyCritical ? 'Säkerhetskritiskt' : null,
                  ].filter((label): label is string => label !== null);
                  return (
                    <li key={skillId}>
                      <RowLink href={`/skills/${skill.id}`}>
                        <span className="min-w-0 flex-1">
                          <span className="block text-base font-semibold text-text-primary">
                            {skill.name}
                          </span>
                          <span className="mt-0.5 block max-w-[var(--measure)] text-base text-text-secondary">
                            {skill.description}
                          </span>
                          {meta.length > 0 && <Meta>{meta.join(' · ')}</Meta>}
                        </span>
                      </RowLink>
                    </li>
                  );
                })}
              </ul>

              {prerequisiteNames.length > 0 && (
                <p className="mt-4 max-w-[var(--measure)] text-sm text-text-tertiary">
                  Bygger på {prerequisiteNames.join(', ')}
                </p>
              )}
            </Section>
          );
        })}

        <nav aria-label="Steg" className="flex gap-3 border-t border-border-subtle pt-8">
          {previousStepNumber ? (
            <Link href={`/plan/${previousStepNumber}`} className={STEP_NAV_LINK}>
              ← Föregående
            </Link>
          ) : (
            <span className="flex-1" />
          )}
          {nextStepNumber ? (
            <Link href={`/plan/${nextStepNumber}`} className={STEP_NAV_LINK}>
              Nästa →
            </Link>
          ) : (
            <span className="flex-1" />
          )}
        </nav>
      </PageBody>
    </PageShell>
  );
}
