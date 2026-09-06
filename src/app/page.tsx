import { Asfaltband } from '@/components/ui/asfaltband';
import { PageShell } from '@/components/ui/page-shell';
import { Skylt } from '@/components/ui/skylt';
import { Pass, type PassSteg } from '@/components/pass/pass';
import { progressionMap, skillsById, stepTitle } from './plan/plan-data';

export const metadata = {
  title: 'Nästa pass',
};

/**
 * Stegen förberedda vid bygget. Sidan är statiskt exporterad, så vilket steg
 * som är aktuellt kan bara avgöras i webbläsaren — men VAD varje steg
 * innehåller är känt här, och skickas med som data.
 *
 * Bara namn och två flaggor per moment. Beskrivningarna ligger kvar på
 * momentsidan; att skriva ut dem här igen var en av de tre platser samma
 * text renderades.
 */
const steg: PassSteg[] = progressionMap.levels.map((level, index) => ({
  nummer: index + 1,
  titel: stepTitle(level),
  grupper: level.groups.map((group) => ({
    id: group.id,
    moment: group.skillIds
      .map((id) => skillsById.get(id))
      .filter((skill) => skill !== undefined)
      .map((skill) => ({ id: skill.id, namn: skill.name, continuous: skill.continuous })),
  })),
}));

/**
 * Startsidan — läget "Nästa pass".
 *
 * Sidan hade tre vägvisare till 75 moment, 15 steg och en sida på tusen ord
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
        <Pass steg={steg} />
      </div>
    </PageShell>
  );
}
