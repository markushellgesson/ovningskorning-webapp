import Link from 'next/link';
import { CATEGORY_LABELS } from '@/content/category-labels';
import { Vag, Vagstation } from '@/components/ui/asfaltband';
import { PageBody, PageHeader, PageShell } from '@/components/ui/page-shell';
import { RowLink } from '@/components/ui/list-row';
import { Meta, Section, SectionTitle } from '@/components/ui/section';
import { Stolpe } from '@/components/ui/stolpe';
import { Vagvisare } from '@/components/ui/vagvisare';
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
 * Ordning (docs/designsprak.md 7.3) — resan.
 *
 * Det livfulla är VÄGEN: ett lodrätt asfaltband 28 px brett, 20 px in från
 * vänsterkanten, med streckad mittlinje, som börjar under ingressen och
 * slutar efter steg 15 med rundad ände. På bandet står femton stolpar.
 * Ordningen är en resa, inte en lista — och en räls av hårfina linjer sa
 * "katalog" där bandet säger "sträcka".
 *
 * Bandet och mittlinjen ritas av `Vag` som två absolut placerade lager under
 * innehållet; stationerna ligger i eget lager ovanpå (`Vagstation`). Därför
 * behöver bandet aldrig känna till hur höga stationerna är: det tar sin
 * längd ur listan, inte tvärtom, och vägen kan inte gå av mellan två steg.
 *
 * Stolpen är 40 px bred och står med vänsterkanten i noll — bandet ligger
 * 6 px in och är 28 px brett, så båda har sin mitt på 20 px. Stolpen står
 * alltså PÅ bandet, inte bredvid det, och täcker asfalten bakom sig.
 *
 * Tryckåterkopplingen kan inte vara en bakgrund på hela raden: raden ligger
 * ovanför bandet och en ton över hela bredden hade målat över vägen vid
 * varje tryck. Tonen ritas därför som ett eget lager som börjar 40 px in —
 * exakt där stolpen slutar — så att asfalten aldrig skyms. Stationen är
 * 72 px hög över hela bredden, alltså långt över 48 px träffyta: det går
 * att träffa med tummen utan att sikta.
 *
 * Det lugna: allt utanför bandet. Ingressen, Upplägg som vägvisare (vägen
 * leder vidare dit) och "Tränas löpande" med en 3 px HELDRAGEN blå linje
 * till vänster — heldragen linje betyder att man inte lämnar den. Det är
 * samma grammatik som vägens streckade mittlinje, bara i motsats.
 *
 * Ingen progress ritas: den lokala appen har ingen status att visa, och ett
 * påhittat "du är här" hade varit ljug (designsprak.md 10).
 */
export default function PlanPage() {
  return (
    <PageShell>
      <PageHeader
        back={{ href: '/', label: 'Tillbaka' }}
        title="Ordning"
        lead={`En möjlig ordning genom de ${skills.length} momenten`}
      />

      <PageBody>
        <div>
          <div className="max-w-[var(--measure)] space-y-3">
            <p className="text-lg text-ink">
              Varje steg bygger vidare på det föregående. Moment i samma grupp hör ihop och passar
              att öva under samma pass.
            </p>
            <p className="text-base text-ink-2">
              Ordningen är pedagogisk, inte en regel — den visar vad som är rimligt att kunna innan
              man går vidare. Vissa moment, märkta ”tränas löpande”, introduceras här men övas sedan
              vidare genom hela utbildningen i stället för att checkas av och lämnas bakom.
            </p>
          </div>

          <Vag className="mt-6">
            <ol>
              {progressionMap.levels.map((level, index) => {
                const stepNumber = index + 1;
                const momentCount = countSkillsInLevel(level);
                return (
                  <Vagstation key={level.id}>
                    <Link
                      href={`/plan/${stepNumber}`}
                      className="group relative flex min-h-[72px] items-center gap-[18px] rounded-[var(--radius-sm)] py-2.5 pr-2 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      {/* Tryckslöjan börjar där stolpen slutar, så att den
                          aldrig lägger sig över asfaltbandet. */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 -right-2 left-10 rounded-[var(--radius-sm)] bg-surface-sunken opacity-0 transition-opacity duration-150 group-active:opacity-100 group-active:duration-0"
                      />
                      <Stolpe number={stepNumber} />
                      <span className="relative min-w-0 flex-1">
                        <span className="block text-lg leading-[1.3] font-semibold text-ink">
                          {stepTitle(level)}
                        </span>
                        <Meta>{momentCount} moment</Meta>
                      </span>
                    </Link>
                  </Vagstation>
                );
              })}
            </ol>
          </Vag>

          {/* Vägen leder vidare till Upplägg, och därför är raden en
              vägvisare i stället för en listrad. */}
          <div className="mt-5">
            <Vagvisare
              href="/upplagg"
              title="Upplägg"
              description="Hur ni lägger upp ett pass, och vad ni gör före varje körning"
            />
          </div>
        </div>

        <Section>
          {/* Blått streck, som den heldragna linjen i listorna under. */}
          <SectionTitle accent="var(--blue-text)">Tränas löpande</SectionTitle>
          <p className="mt-3.5 max-w-[var(--measure)] text-base text-ink-2">
            De här momenten har redan sin plats i ordningen ovan. De introduceras vid sitt steg
            precis som andra moment, men slutar inte där — de vävs in i övningen genomgående, från
            första passet till sista.
          </p>

          <div className="mt-6 space-y-6">
            {[...continuousByCategory.entries()].map(([category, categorySkills]) => (
              <div key={category}>
                <h3 className="text-lg leading-[1.35] font-semibold text-ink">
                  {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] ?? category}
                </h3>
                {/* Den heldragna blå linjen: momenten här checkas inte av
                    och lämnas bakom, och linjen bryts därför inte. */}
                <ul className="mt-1.5 divide-y divide-line border-l-[3px] border-blue-text pl-3">
                  {categorySkills.map((skill) => (
                    <li key={skill.id}>
                      <RowLink href={`/skills/${skill.id}`}>
                        <span className="min-w-0 flex-1">
                          <span className="block text-base font-semibold text-ink">
                            {skill.name}
                          </span>
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
