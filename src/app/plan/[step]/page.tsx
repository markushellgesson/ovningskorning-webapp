import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BackLink, PageBody, PageShell } from '@/components/ui/page-shell';
import { Vagvisare } from '@/components/ui/vagvisare';
import { Pass } from '@/components/pass/pass';
import { passSteg, progressionMap, stepTitle } from '../plan-data';

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
 * Stegsidan — samma vy som startsidan, fast på ett bestämt steg.
 *
 * Den delar komponent med "Nästa pass" i stället för att ha en egen
 * uppställning: det är samma slags skärm, och två varianter hade drivit isär
 * dem. Här syns alla stegets pass och de kan markeras som gjorda, medan
 * startsidan visar ett enda härlett nästa pass. Sträckindikatorn syns bara här.
 *
 * Momentbeskrivningarna och "Bygger på"-raderna är borta. De renderades här
 * utöver på momentsidan och i listan; nu står de på ett ställe, där man är
 * när man vill veta vad ett moment är.
 *
 * Föregående och Nästa är två vägvisare spetsade åt var sitt håll. Därför
 * bär de inga typografiska pilar: riktningen är vägvisarens form, och en pil
 * intill spetsen hade sagt samma sak två gånger.
 */
export default async function PlanStepPage({ params }: PlanStepPageProps) {
  const { step } = await params;
  const found = levelForParam(step);

  if (!found) {
    notFound();
  }

  const { stepNumber } = found;
  const totalSteps = progressionMap.levels.length;
  const previousStepNumber = stepNumber > 1 ? stepNumber - 1 : null;
  const nextStepNumber = stepNumber < totalSteps ? stepNumber + 1 : null;

  return (
    <PageShell>
      <BackLink href="/plan">Ordning</BackLink>

      <PageBody>
        <Pass
          steg={passSteg}
          fastSteg={stepNumber}
          rubrikNivå="h1"
          underRubrik={<Strackindikator step={stepNumber} total={totalSteps} />}
        />

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
