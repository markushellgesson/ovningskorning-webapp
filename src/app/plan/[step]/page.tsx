import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/badge';
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
    <main className="min-h-dvh bg-surface-overlay p-6 pb-24">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="space-y-4">
          <Link href="/plan" className="text-primary-600 hover:underline">
            ← Alla steg
          </Link>
          <p className="text-base font-medium text-text-tertiary">
            Steg {stepNumber} av {totalSteps}
          </p>
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-pill)] bg-primary-600 text-lg font-semibold text-white"
            >
              {stepNumber}
            </span>
            <h1 className="text-3xl font-bold text-text-primary">{stepTitle(level)}</h1>
          </div>
        </header>

        <div className="space-y-4">
          {level.groups.map((group) => {
            const prerequisiteNames = group.prerequisiteIds
              .map((id) => skillsById.get(id)?.name)
              .filter((name): name is string => Boolean(name));

            return (
              <Card key={group.id} padding="md" className="space-y-3">
                {group.skillIds.length > 1 && (
                  <StatusBadge variant="progress">Hör ihop — kan tränas i samma pass</StatusBadge>
                )}

                <ul className="space-y-3">
                  {group.skillIds.map((skillId) => {
                    const skill = skillsById.get(skillId);
                    if (!skill) return null;
                    return (
                      <li key={skillId}>
                        <Link
                          href={`/skills/${skill.id}`}
                          className="block min-h-12 rounded-[var(--radius-sm)] border border-border-subtle p-3 transition-colors hover:border-primary-500 hover:bg-primary-50"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-text-primary">{skill.name}</h3>
                              <p className="mt-1 text-sm text-text-secondary">
                                {skill.description}
                              </p>
                            </div>
                            <div className="flex shrink-0 flex-col items-end gap-1">
                              {skill.continuous && (
                                <StatusBadge variant="progress">Tränas löpande</StatusBadge>
                              )}
                              {skill.safetyCritical && (
                                <StatusBadge variant="safety">Säkerhetskritiskt</StatusBadge>
                              )}
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {prerequisiteNames.length > 0 && (
                  <p className="border-t border-border-subtle pt-3 text-sm text-text-tertiary">
                    Bygger på {prerequisiteNames.join(', ')}
                  </p>
                )}
              </Card>
            );
          })}
        </div>

        <nav aria-label="Steg" className="flex gap-3 border-t border-border-default pt-6">
          {previousStepNumber ? (
            <Link
              href={`/plan/${previousStepNumber}`}
              className="flex min-h-12 flex-1 items-center justify-center rounded-[var(--radius-sm)] border border-border-control px-4 text-base font-medium text-text-primary transition-colors duration-150 hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              ← Föregående steg
            </Link>
          ) : (
            <span className="flex-1" />
          )}
          {nextStepNumber ? (
            <Link
              href={`/plan/${nextStepNumber}`}
              className="flex min-h-12 flex-1 items-center justify-center rounded-[var(--radius-sm)] border border-border-control px-4 text-base font-medium text-text-primary transition-colors duration-150 hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Nästa steg →
            </Link>
          ) : (
            <span className="flex-1" />
          )}
        </nav>
      </div>
    </main>
  );
}
