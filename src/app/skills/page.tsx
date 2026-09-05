import Link from 'next/link';
import content from '@/content';
import type { Skill } from '@/content/types';

const skills = content.skills;

// Gruppera skills per kategori
const skillsByCategory = skills.reduce(
  (acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  },
  {} as Record<string, Skill[]>,
);

const categoryNames: Record<string, string> = {
  VEHICLE_CONTROL: 'Fordonskännedom',
  MANEUVERING: 'Grundmanövrering',
  OBSERVATION: 'Observation och blick',
  SPEED_DISTANCE: 'Hastighet och avstånd',
  POSITIONING: 'Placering',
  INTERSECTIONS: 'Korsningar',
  ROUNDABOUTS: 'Cirkulationsplatser',
  LANE_CHANGE: 'Körfältsbyten',
  VULNERABLE_ROAD_USERS: 'Oskyddade trafikanter',
  URBAN: 'Stadstrafik',
  RURAL: 'Landsväg',
  HIGHWAY: 'Motorväg',
  SPECIAL_CONDITIONS: 'Särskilda förhållanden',
  ECO_DRIVING: 'Sparsam körning',
  NAVIGATION: 'Navigation',
  TRIP_PLANNING: 'Färdplanering',
  RISK_AWARENESS: 'Riskmedvetenhet',
  SELF_ASSESSMENT: 'Självbedömning',
  EMERGENCY: 'Nödsituationer',
};

export const metadata = {
  title: 'Träningsmoment',
};

export default function SkillsPage() {
  return (
    <main className="min-h-dvh bg-surface-overlay">
      <div className="mx-auto w-full max-w-3xl px-5 pt-6 pb-28 sm:px-8 sm:pt-10">
        <header className="space-y-3">
          <Link
            href="/"
            className="-ml-3 inline-flex min-h-12 items-center rounded-[var(--radius-sm)] px-3 text-base font-medium text-primary-600 transition-colors duration-150 hover:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            ← Tillbaka
          </Link>
          <h1 className="text-3xl font-semibold text-text-primary">Träningsmoment</h1>
          <p className="max-w-[var(--measure)] text-xl text-text-secondary">
            {skills.length} moment ordnade efter område. Tryck på ett moment för att läsa om det.
          </p>
        </header>

        <div className="mt-10 space-y-8">
          {Object.entries(skillsByCategory)
            .sort((a, b) => {
              const aFirst = a[1][0];
              const bFirst = b[1][0];
              return aFirst.sortOrder - bFirst.sortOrder;
            })
            .map(([category, categorySkills]) => (
              <section key={category}>
                {/* Klistrad rubrik: i en lista på {skills.length} rader ska man alltid
                    kunna se vilket område man skrollat till. */}
                <h2 className="sticky top-0 z-10 -mx-1 border-b border-border-default bg-surface-overlay px-1 py-3 text-xl font-semibold text-text-primary">
                  {categoryNames[category] || category}
                  <span className="ml-2 text-base font-normal text-text-tertiary">
                    {categorySkills.length}
                  </span>
                </h2>
                {/* Inget säkerhetsmärke i listan: 61 av 72 moment är märkta
                    säkerhetskritiska, och ett märke på 85 procent av raderna är
                    brus snarare än signal. Det står kvar på momentets egen sida,
                    där det har sammanhang. */}
                <ul className="divide-y divide-border-subtle">
                  {categorySkills
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map((skill) => (
                      <li key={skill.id}>
                        <Link
                          href={`/skills/${skill.id}`}
                          className="flex min-h-12 items-center justify-between gap-3 py-3 transition-colors duration-150 hover:text-primary-700 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none"
                        >
                          <span className="min-w-0 flex-1 text-base font-medium text-text-primary">
                            {skill.name}
                          </span>
                          <span aria-hidden="true" className="shrink-0 text-text-tertiary">
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </section>
            ))}
        </div>
      </div>
    </main>
  );
}
