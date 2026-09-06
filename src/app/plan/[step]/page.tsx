import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageBody, PageHeader, PageShell } from '@/components/ui/page-shell';
import { RowLink } from '@/components/ui/list-row';
import { Meta, Section, Subheading } from '@/components/ui/section';
import { Stolpe } from '@/components/ui/stolpe';
import { Vagvisare } from '@/components/ui/vagvisare';
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

/**
 * Sträckindikatorn (docs/designsprak.md 7.4) — vägsträckan sedd uppifrån.
 *
 * Femton korta streck i rad, 4 px höga med radius 2, där det aktuella är
 * --sign-blue och de andra --line-strong. Den säger var i följden man är
 * utan att räkna, och den är det enda stället på sidan där stegets nummer
 * finns som form i stället för som siffra.
 *
 * Dekorativ: stolpen och "av 15" ovanför säger redan samma sak i text, och
 * femton likadana streck i en skärmläsare är brus.
 */
function Strackindikator({ step, total }: { step: number; total: number }) {
  return (
    <span aria-hidden="true" className="flex max-w-[var(--measure)] gap-1">
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className={`h-1 flex-1 rounded-[2px] ${
            index + 1 === step ? 'bg-sign-blue' : 'bg-line-strong'
          }`}
        />
      ))}
    </span>
  );
}

/**
 * Stegsidan (docs/designsprak.md 7.4) — en sträcka.
 *
 * Eyebrow är en STOLPE med stegnumret följt av "av 15" i label-grad: samma
 * stolpe som står på vägen på Ordning, för det är samma slags steg, och
 * siffran står aldrig naken i rubriktext. Stolpen är dekorativ i
 * uppmärkningen, så hela strängen "Steg 3 av 15" ligger kvar för
 * skärmläsare i etiketten bredvid.
 *
 * Sidan i övrigt är lugn — grupperna, momentraderna, förkunskaperna. Det
 * livfulla sitter nederst: Föregående och Nästa som två vägvisare, spetsade
 * åt var sitt håll. Därför bär de inga typografiska pilar längre; riktningen
 * är vägvisarens form, och en pil intill spetsen hade sagt samma sak två
 * gånger. På steg 1 och 15 står den saknade riktningen tom.
 */
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
        mast={
          <p className="flex items-center gap-3">
            <Stolpe number={stepNumber} />
            <span className="text-sm font-semibold tracking-wide text-ink-3 uppercase">
              <span className="sr-only">{`Steg ${stepNumber} `}</span>av {totalSteps}
            </span>
          </p>
        }
        title={stepTitle(level)}
      >
        <Strackindikator step={stepNumber} total={totalSteps} />
      </PageHeader>

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

              <ul className={`divide-y divide-line ${group.skillIds.length > 1 ? 'mt-2' : ''}`}>
                {group.skillIds.map((skillId) => {
                  const skill = skillsById.get(skillId);
                  if (!skill) return null;
                  return (
                    <li key={skillId}>
                      <RowLink href={`/skills/${skill.id}`}>
                        <span className="min-w-0 flex-1">
                          <span className="block text-base font-semibold text-ink">
                            {skill.name}
                          </span>
                          <span className="mt-0.5 block max-w-[var(--measure)] text-base text-ink-2">
                            {skill.description}
                          </span>
                          {/* Bara "Tränas löpande". Säkerhetskritiskt satt på
                              64 av 75 moment märkte normalfallet, inte
                              undantaget — märkningen står nu ensam på
                              momentets egen sida, där den har sammanhang. */}
                          {skill.continuous && <Meta>Tränas löpande</Meta>}
                        </span>
                      </RowLink>
                    </li>
                  );
                })}
              </ul>

              {/* Förkunskaperna gäller gruppen, inte ett enskilt moment, och
                  står därför utanför listan. Raden hålls tätt mot listan
                  (8 px) i stället för mitt i luckan: nästa avsnitts pt-7 ger
                  avståndet nedåt, och raden läses uppåt dit den hör. */}
              {prerequisiteNames.length > 0 && (
                <p className="mt-2 max-w-[var(--measure)] text-sm text-ink-3">
                  Bygger på {prerequisiteNames.join(', ')}
                </p>
              )}
            </Section>
          );
        })}

        <nav aria-label="Steg" className="flex gap-3 border-t border-line pt-8">
          {previousStepNumber ? (
            <Vagvisare
              href={`/plan/${previousStepNumber}`}
              title="Föregående"
              direction="left"
              className="flex-1"
            />
          ) : (
            <span className="flex-1" />
          )}
          {nextStepNumber ? (
            <Vagvisare href={`/plan/${nextStepNumber}`} title="Nästa" className="flex-1" />
          ) : (
            <span className="flex-1" />
          )}
        </nav>
      </PageBody>
    </PageShell>
  );
}
