import { Asfaltband } from '@/components/ui/asfaltband';
import { PageShell } from '@/components/ui/page-shell';
import { Skylt } from '@/components/ui/skylt';
import { Pass } from '@/components/pass/pass';
import { passSteg } from './plan/plan-data';

export const metadata = {
  title: 'Nästa pass',
};

/**
 * Startsidan — läget "Nästa pass".
 *
 * Sidan hade tre vägvisare till 75 moment, ordningens steg och en sida på tusen ord
 * om upplägg. Ingen av dem sa "gör det här nu", och det var det som gjorde
 * appen till ett uppslagsverk i stället för ett verktyg. Nu öppnar appen på
 * det steg paret faktiskt är på, med en knapp som för dem vidare.
 *
 * Hero-bandet är kvar men krympt till skylt och namn: ingen display-rubrik
 * och ingen ingress. Det som ska dra blicken är steget under bandet, inte
 * bandet självt. Ingen "Vad är detta?", ingen onboarding — den som öppnar
 * appen vet vad den är, och behöver veta vad de ska öva.
 */
export default function Home() {
  return (
    <PageShell>
      <Asfaltband bleed edge className="-mt-6 pt-6 sm:-mt-10 sm:pt-10">
        <div className="flex items-center gap-3 pb-1">
          <Skylt />
          <span
            className="text-lg font-bold text-marking"
            // Text på asfalt är en vägmarkering och lyser statiskt i
            // nattläge (--glow-text är none i dagsljus).
            style={{ textShadow: 'var(--glow-text)' }}
          >
            Övningskörning B
          </span>
        </div>
      </Asfaltband>

      <div className="mt-8">
        <h1 className="sr-only">Nästa pass</h1>
        <Pass steg={passSteg} />
      </div>
    </PageShell>
  );
}
