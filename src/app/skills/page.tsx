import Link from 'next/link';
import content from '@/content/content.json';
import type { Skill } from '@/content/types';
import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/badge';

const skills = content.skills as Skill[];

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
  VEHICLE_CONTROL: 'Fordonshantering',
  MANEUVERING: 'Manövrer',
  OBSERVATION: 'Observation',
  SPEED_DISTANCE: 'Hastighet och avstånd',
  POSITIONING: 'Positionering',
  INTERSECTIONS: 'Korsningar',
  ROUNDABOUTS: 'Rondeller',
  LANE_CHANGE: 'Körfältsbyten',
  VULNERABLE_ROAD_USERS: 'Oskyddade trafikanter',
  URBAN: 'Tätortskörning',
  RURAL: 'Landsvägskörning',
  HIGHWAY: 'Motorvägskörning',
  SPECIAL_CONDITIONS: 'Särskilda förhållanden',
  ECO_DRIVING: 'Sparsam körning',
  NAVIGATION: 'Navigation',
  TRIP_PLANNING: 'Reseplanering',
  RISK_AWARENESS: 'Riskmedvetenhet',
  SELF_ASSESSMENT: 'Självbedömning',
  EMERGENCY: 'Nödsituationer',
};

export const metadata = {
  title: 'Träningsmoment',
};

export default function SkillsPage() {
  return (
    <main className="min-h-dvh bg-surface-overlay p-6 pb-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-4">
          <Link href="/" className="text-primary-600 hover:underline">
            ← Tillbaka
          </Link>
          <h1 className="text-4xl font-bold text-text-primary">Kompetensbibliotek</h1>
          <p className="text-xl text-text-secondary">
            {skills.length} moment strukturerade efter typ och sekvens
          </p>
        </header>

        <div className="space-y-12">
          {Object.entries(skillsByCategory)
            .sort((a, b) => {
              const aFirst = a[1][0];
              const bFirst = b[1][0];
              return aFirst.sortOrder - bFirst.sortOrder;
            })
            .map(([category, categorySkills]) => (
              <section key={category} className="space-y-4">
                <h2 className="text-2xl font-semibold text-text-primary border-b border-border-default pb-2">
                  {categoryNames[category] || category}
                </h2>
                <ul className="space-y-3">
                  {categorySkills
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map((skill) => (
                      <li key={skill.id}>
                        <Link href={`/skills/${skill.id}`}>
                          <Card
                            padding="md"
                            className="hover:border-primary-500 transition-all duration-150 min-h-12 cursor-pointer"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-text-primary">
                                  {skill.name}
                                </h3>
                                <p className="text-text-secondary mt-1">{skill.description}</p>
                              </div>
                              {skill.safetyCritical && (
                                <StatusBadge variant="safety">Säkerhetskritisk</StatusBadge>
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
