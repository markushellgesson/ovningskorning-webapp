import Link from 'next/link';
import content from '@/content';
import type { Skill } from '@/content/types';
import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/badge';

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
            {skills.length} moment ordnade efter område och i den ordning ni bör ta dem
          </p>
        </header>

        <div className="mt-12 space-y-14">
          {Object.entries(skillsByCategory)
            .sort((a, b) => {
              const aFirst = a[1][0];
              const bFirst = b[1][0];
              return aFirst.sortOrder - bFirst.sortOrder;
            })
            .map(([category, categorySkills]) => (
              <section key={category}>
                <h2 className="border-b border-border-default pb-3 text-2xl font-semibold text-text-primary">
                  {categoryNames[category] || category}
                </h2>
                <ul className="mt-5 space-y-3">
                  {categorySkills
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map((skill) => (
                      <li key={skill.id}>
                        <Link
                          href={`/skills/${skill.id}`}
                          className="block rounded-[var(--radius-md)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none"
                        >
                          <Card
                            padding="md"
                            className="min-h-12 transition-colors duration-150 hover:border-primary-400"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0 flex-1 space-y-1">
                                <h3 className="text-lg font-semibold text-text-primary">
                                  {skill.name}
                                </h3>
                                <p className="text-base text-text-secondary">{skill.description}</p>
                              </div>
                              {skill.safetyCritical && (
                                <StatusBadge variant="safety">Säkerhetskritiskt</StatusBadge>
                              )}
                            </div>
                          </Card>
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
