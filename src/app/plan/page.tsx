import { CATEGORY_LABELS } from '@/content/category-labels';
import { PageBody, PageHeader, PageShell } from '@/components/ui/page-shell';
import { RowLink } from '@/components/ui/list-row';
import { Meta, Section, SectionTitle } from '@/components/ui/section';
import { StepMarker } from '@/components/ui/step-marker';
import {
  skills,
  progressionMap,
  continuousByCategory,
  countSkillsInLevel,
  stepTitle,
} from './plan-data';

export const metadata = {
  title: 'Ordning',
};

/**
 * Ordningen visas som en karta: en lodrät räls med numrerade stationer.
 * En räls säger följd; en stapel kort säger katalog.
 *
 * Rälsen ritas av varje listpunkts ::before, 1 px bred, 20 px in från
 * vänsterkanten — mitt under den 40 px breda cirkeln. Första och sista
 * punkten kortar sin del av rälsen till cirkelns mitt (12 px radpadding +
 * 20 px halv cirkel = 32 px), så att linjen börjar och slutar i en station
 * i stället för att sticka ut i tomma luften. Cirkeln ligger ovanpå rälsen
 * (z-[2] i step-marker.tsx) och rälsen ovanpå tryckåterkopplingen (z-[1]),
 * så att linjen förblir obruten även på en nedtryckt rad.
 */
const RAIL_ITEM =
  'relative before:absolute before:top-0 before:bottom-0 before:left-5 before:z-[1] before:w-px before:bg-border-default first:before:top-8 last:before:bottom-8';

export default function PlanPage() {
  return (
    <PageShell>
      <PageHeader
        back={{ href: '/', label: 'Tillbaka' }}
        title="Ordning"
        lead={`En möjlig ordning genom de ${skills.length} momenten`}
      />

      <PageBody>
        <div className="max-w-[var(--measure)] space-y-4">
          <p className="text-lg text-text-primary">
            Varje steg bygger vidare på det föregående. Moment i samma grupp hör ihop och passar att
            öva under samma pass.
          </p>
          <p className="text-base text-text-secondary">
            Ordningen är pedagogisk, inte en regel — den visar vad som är rimligt att kunna innan
            man går vidare. Vissa moment, märkta ”tränas löpande”, introduceras här men övas sedan
            vidare genom hela utbildningen i stället för att checkas av och lämnas bakom.
          </p>
        </div>

        <ol>
          {progressionMap.levels.map((level, index) => {
            const stepNumber = index + 1;
            const momentCount = countSkillsInLevel(level);
            return (
              <li key={level.id} className={RAIL_ITEM}>
                <RowLink href={`/plan/${stepNumber}`} className="gap-4">
                  <StepMarker number={stepNumber} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-medium text-text-primary">
                      {stepTitle(level)}
                    </span>
                    <Meta>{momentCount} moment</Meta>
                  </span>
                </RowLink>
              </li>
            );
          })}
        </ol>

        <Section>
          <ul>
            <li>
              <RowLink href="/upplagg" className="py-4">
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-semibold text-text-primary">Upplägg</span>
                  <span className="mt-0.5 block max-w-[var(--measure)] text-base text-text-secondary">
                    Hur ni lägger upp ett pass, och vad ni gör före varje körning
                  </span>
                </span>
              </RowLink>
            </li>
          </ul>
        </Section>

        <Section>
          <SectionTitle>Tränas löpande</SectionTitle>
          <p className="mt-5 max-w-[var(--measure)] text-base text-text-secondary">
            De här momenten har redan sin plats i ordningen ovan. De introduceras vid sitt steg
            precis som andra moment, men slutar inte där — de vävs in i övningen genomgående, från
            första passet till sista.
          </p>

          <div className="mt-6 space-y-6">
            {[...continuousByCategory.entries()].map(([category, categorySkills]) => (
              <div key={category}>
                <h3 className="text-lg font-semibold text-text-primary">
                  {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] ?? category}
                </h3>
                <ul className="mt-1 divide-y divide-border-subtle">
                  {categorySkills.map((skill) => (
                    <li key={skill.id}>
                      <RowLink href={`/skills/${skill.id}`}>
                        <span className="min-w-0 flex-1">
                          <span className="block text-base font-medium text-text-primary">
                            {skill.name}
                          </span>
                          {skill.safetyCritical && <Meta>Säkerhetskritiskt</Meta>}
                        </span>
                      </RowLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      </PageBody>
    </PageShell>
  );
}
