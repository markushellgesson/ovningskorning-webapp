import Link from 'next/link';
import content from '@/content';
import type { Skill } from '@/content/types';
import { CATEGORY_LABELS } from '@/content/category-labels';
import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/badge';
import { buildProgressionMap } from '@/domain/progression-map/build-map';

const skills = content.skills;
const skillsById = new Map(skills.map((skill) => [skill.id, skill]));

// Beräknas vid bygget — sidan är statiskt exporterad och har ingen server
// att räkna om kartan i efterhand (se ADR 0013 / output: 'export').
const progressionMap = buildProgressionMap(skills);

// Kontinuerliga moment grupperade per kategori, i den ordning kategorin
// först dyker upp bland de kontinuerliga momenten — samma sorterade
// ordning som resten av innehållet (sortOrder).
const continuousByCategory = new Map<string, Skill[]>();
for (const id of progressionMap.continuousSkillIds) {
  const skill = skillsById.get(id);
  if (!skill) continue;
  if (!continuousByCategory.has(skill.category)) {
    continuousByCategory.set(skill.category, []);
  }
  continuousByCategory.get(skill.category)!.push(skill);
}

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
            Varje steg bygger vidare på det föregående. Moment i samma ruta hör ihop och passar
            att öva under samma pass.
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

        <ol className="space-y-10">
          {progressionMap.levels.map((level, index) => {
            const stepNumber = index + 1;
            return (
              <li key={level.id} className="space-y-4">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-pill)] bg-primary-600 text-lg font-semibold text-white"
                  >
                    {stepNumber}
                  </span>
                  <h2 className="text-2xl font-semibold text-text-primary">
                    Steg {stepNumber}
                  </h2>
                </div>

                <div className="ml-5 space-y-4 border-l-2 border-border-default pl-6">
                  {level.groups.map((group) => {
                    const prerequisiteNames = group.prerequisiteIds
                      .map((id) => skillsById.get(id)?.name)
                      .filter((name): name is string => Boolean(name));

                    return (
                      <Card key={group.id} padding="md" className="space-y-3">
                        {group.skillIds.length > 1 && (
                          <StatusBadge variant="progress">
                            Hör ihop — kan tränas i samma pass
                          </StatusBadge>
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
                                      <h3 className="font-semibold text-text-primary">
                                        {skill.name}
                                      </h3>
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
            . De introduceras vid sin nivå precis som andra moment, men slutar inte där — de vävs
            in i övningen genomgående, från första passet till sista.
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
