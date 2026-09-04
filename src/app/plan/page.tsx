import Link from 'next/link';
import { CATEGORY_LABELS } from '@/content/category-labels';
import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/badge';
import {
  skills,
  progressionMap,
  continuousByCategory,
  countSkillsInLevel,
  stepTitle,
} from './plan-data';

export const metadata = {
  title: 'Träningskarta',
};

export default function PlanPage() {
  return (
    <main className="min-h-dvh bg-surface-overlay p-6 pb-24">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="space-y-4">
          <Link href="/" className="text-primary-600 hover:underline">
            ← Tillbaka
          </Link>
          <h1 className="text-4xl font-bold text-text-primary">Träningskarta</h1>
          <p className="text-xl text-text-secondary">
            En möjlig ordning genom de {skills.length} momenten
          </p>
        </header>

        <Card padding="lg" className="space-y-3">
          <p className="text-lg leading-relaxed text-text-primary">
            Varje steg bygger vidare på det föregående. Moment i samma ruta hör ihop och passar att
            öva under samma pass.
          </p>
          <p className="text-base leading-relaxed text-text-secondary">
            Ordningen är pedagogisk, inte en regel — den visar vad som är rimligt att kunna innan
            man går vidare. Vissa moment, märkta{' '}
            <StatusBadge variant="progress" size="sm">
              tränas löpande
            </StatusBadge>
            , introduceras här men övas sedan vidare genom hela utbildningen i stället för att
            checkas av och lämnas bakom.
          </p>
        </Card>

        <Link
          href="/upplagg"
          className="block min-h-12 rounded-[var(--radius-md)] border border-primary-200 bg-primary-50 p-5 transition-colors duration-150 hover:bg-primary-100"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-primary-800">Upplägg</h2>
              <p className="text-sm text-primary-700">
                Hur ni lägger upp ett pass, i vilken ordning ni går vidare, och vad ni gör före
                varje körning
              </p>
            </div>
            <span aria-hidden="true" className="mt-0.5 shrink-0 text-xl text-primary-600">
              →
            </span>
          </div>
        </Link>

        <ol className="space-y-3">
          {progressionMap.levels.map((level, index) => {
            const stepNumber = index + 1;
            const momentCount = countSkillsInLevel(level);
            return (
              <li key={level.id}>
                <Link
                  href={`/plan/${stepNumber}`}
                  className="flex min-h-12 items-center gap-4 rounded-[var(--radius-md)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  <Card
                    padding="md"
                    className="flex w-full items-center gap-4 transition-colors duration-150 hover:border-primary-400"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-pill)] bg-primary-600 text-lg font-semibold text-white"
                    >
                      {stepNumber}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg font-semibold text-text-primary">
                        {stepTitle(level)}
                      </h2>
                      <p className="text-sm text-text-secondary">{momentCount} moment</p>
                    </div>
                    <span aria-hidden="true" className="shrink-0 text-xl text-text-tertiary">
                      →
                    </span>
                  </Card>
                </Link>
              </li>
            );
          })}
        </ol>

        <section className="space-y-4 border-t border-border-default pt-8">
          <h2 className="text-2xl font-semibold text-text-primary">Påminnelse — tränas löpande</h2>
          <p className="text-base leading-relaxed text-text-secondary">
            De här momenten har redan sin plats i ordningen ovan, märkta{' '}
            <StatusBadge variant="progress" size="sm">
              tränas löpande
            </StatusBadge>
            . De introduceras vid sin nivå precis som andra moment, men slutar inte där — de vävs in
            i övningen genomgående, från första passet till sista.
          </p>

          <div className="space-y-6">
            {[...continuousByCategory.entries()].map(([category, categorySkills]) => (
              <div key={category} className="space-y-2">
                <h3 className="text-lg font-semibold text-text-primary">
                  {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] ?? category}
                </h3>
                <ul className="space-y-2">
                  {categorySkills.map((skill) => (
                    <li key={skill.id}>
                      <Link
                        href={`/skills/${skill.id}`}
                        className="flex min-h-12 items-center justify-between gap-3 rounded-[var(--radius-sm)] border border-border-subtle p-3 transition-colors hover:border-primary-500 hover:bg-primary-50"
                      >
                        <span className="text-base font-medium text-text-primary">
                          {skill.name}
                        </span>
                        {skill.safetyCritical && (
                          <StatusBadge variant="safety">Säkerhetskritiskt</StatusBadge>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
