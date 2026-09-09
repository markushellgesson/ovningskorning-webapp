import { Asfaltband } from '@/components/ui/asfaltband';
import { PageHeader, PageShell } from '@/components/ui/page-shell';
import { RowLink } from '@/components/ui/list-row';
import { Antalschip } from '@/components/ui/antalschip';
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
  title: 'Moment',
};

/**
 * Moment — skyltar man passerar (docs/designsprak.md 7.2, 8).
 *
 * Det livfulla på den här sidan är kategoribanden. Varje kategorirubrik är
 * ett smalt asfaltband som går kant i kant över sidskalets marginaler, med
 * kategorinamnet som vägmarkering (--marking 600, statisk glöd i nattläge)
 * och antalet moment som liten stolpsiffra till höger. Banden är klistrade
 * vid scroll som förut: i en lista på 75 rader ska man alltid kunna se
 * vilket område man skrollat till, och att skrolla blir då att passera
 * skyltar.
 *
 * Raderna under är lugna — momentnamn i 16/600 på sidans botten, hårfin
 * linje mellan, ingen kulör och inget märke per rad. Listan visar bara
 * namnen: sidan är byggd för att överblickas och skrollas igenom, och en
 * beskrivningsrad under varje av 75 moment gör den dubbelt så lång utan att
 * hjälpa den som letar efter ett moment han redan vet namnet på.
 */
export default function SkillsPage() {
  return (
    <PageShell>
      <PageHeader
        back={{ href: '/', label: 'Nästa pass' }}
        title="Moment"
        lead={`${skills.length} moment ordnade efter område. Tryck på ett moment för att läsa om det.`}
      />

      <div className="mt-8 space-y-6">
        {Object.entries(skillsByCategory)
          .sort((a, b) => {
            const aFirst = a[1][0];
            const bFirst = b[1][0];
            return aFirst.sortOrder - bFirst.sortOrder;
          })
          .map(([category, categorySkills]) => (
            <section key={category}>
              {/* Klistrad rubrik: i en lista på {skills.length} rader ska man alltid
                  kunna se vilket område man skrollat till. Sticky sitter på h2:n,
                  bandet ligger inuti och tar hand om utfallet mot sidkanterna. */}
              <h2 className="sticky top-0 z-10">
                <Asfaltband bleed className="flex min-h-11 items-center gap-3 py-2">
                  <span
                    className="min-w-0 flex-1 text-lg leading-snug font-semibold text-marking"
                    // Text på asfalt är en vägmarkering och lyser statiskt i
                    // nattläge (--glow-text är none i dagsljus).
                    style={{ textShadow: 'var(--glow-text)' }}
                  >
                    {categoryNames[category] || category}
                  </span>
                  {/* Antal, inte ordningstal — därför chip och inte stolpe.
                      Ordning numrerar sina steg med stolpar, och en stolpe
                      här hade lästs som "steg 6" i stället för "6 moment". */}
                  <Antalschip size="sm">{categorySkills.length}</Antalschip>
                </Asfaltband>
              </h2>
              {/* Inget säkerhetsmärke i listan: 61 av 72 moment är märkta
                  säkerhetskritiska, och ett märke på 85 procent av raderna är
                  brus snarare än signal. Det står kvar på momentets egen sida,
                  där det har sammanhang. Ingen pil heller — raden är själv
                  affordansen (se list-row.tsx). */}
              <ul className="divide-y divide-line">
                {categorySkills
                  .sort((a, b) => a.sortOrder - b.sortOrder)
                  .map((skill) => (
                    <li key={skill.id}>
                      <RowLink href={`/skills/${skill.id}`}>
                        <span className="min-w-0 flex-1 text-base font-semibold text-ink">
                          {skill.name}
                        </span>
                      </RowLink>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
      </div>
    </PageShell>
  );
}
