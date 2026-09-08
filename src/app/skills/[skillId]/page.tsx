import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageBody, PageHeader, PageShell } from '@/components/ui/page-shell';
import { Hopfallbart, Section, SectionTitle } from '@/components/ui/section';
import content from '@/content';
import type { PhraseType, Skill } from '@/content/types';
import { StatusBadge, Varningstriangel } from '@/components/ui/badge';
import { Stolpe } from '@/components/ui/stolpe';
import { getDiagramForSkill } from '@/components/diagrams/registry';

const skills = content.skills;

// Duplicerad avsiktligt i stället för delad med t.ex. category-labels.ts —
// samma princip som där: sidorna hör till separata delar av appen och ska
// kunna ändras oberoende av varandra (ADR 0013).
const PHRASE_TYPE_LABELS: Record<PhraseType, string> = {
  INSTRUCTION: 'Instruktion',
  QUESTION: 'Fråga',
  CUE: 'Påminnelse',
  FEEDBACK: 'Återkoppling',
  REFLECTION: 'Reflektion',
  SAFETY_INTERVENTION: 'Säkerhetsingripande',
};

export async function generateStaticParams() {
  return skills.map((skill) => ({
    skillId: skill.id,
  }));
}

interface SkillPageProps {
  params: Promise<{ skillId: string }>;
}

export async function generateMetadata(props: SkillPageProps): Promise<Metadata> {
  const { skillId } = await props.params;
  const skill = skills.find((s) => s.id === skillId);
  return {
    title: skill?.name || 'Träningsmoment',
  };
}

/**
 * Momentsidan — läsning med skyltar i marginalen (docs/designsprak.md 7.5).
 *
 * Den mest lästa sidan i appen, och den enda med riktigt långa listor. Det
 * livfulla är DIAGRAMMET i sitt figurkort; ingenting annat får konkurrera
 * med det. Etiketterna och avsnittsstrecken är accenter, inte attraktioner.
 *
 * Rytmen bärs av tre saker i stället för av inramning:
 *
 * 1. En hårfin linje och 32 px luft mellan varje avsnitt, i stället för att
 *    varje avsnitt ligger i ett eget kort. Sex identiska kort i rad läser
 *    som en formulärsida; linje plus luft läser som ett dokument.
 * 2. Textbredden är kapad till --measure (66 tecken). Utan tak blir raderna
 *    på en surfplatta dubbelt så långa som ögat klarar utan att tappa raden.
 * 3. Radavstånd 1.65 på 17 px i listorna (--text-lg), med 12 px mellan
 *    punkterna, så att varje punkt läses som en egen enhet.
 *
 * Markörerna (grön punkt, stolpe, varningstriangel, blå pil) ligger i en
 * egen 26 px-kolumn så att texten radbryts mot en rak vänsterkant. Kulören
 * sitter på strecket och markören — aldrig på rubriktexten, aldrig på
 * brödtexten.
 *
 * När diagrammet finns hör övningsstegen till bilden: de blir dess
 * figcaption i stället för ett eget avsnitt. Utan diagram ligger de kvar som
 * det första synliga avsnittet, så att ingen momentsida tappar sin väg in i
 * övningen.
 */

// Avsnittens linje, luft och rubrik kommer från components/ui/section.tsx,
// som alla sidor delar. Klassnamnen för listorna återkommer i varje avsnitt
// och är samlade här för att avsnitten ska vara garanterat identiska —
// rytmen faller om ett av dem glider.
const LIST = 'mt-[18px] space-y-3 max-w-[var(--measure)]';
const LIST_ITEM = 'flex gap-3 text-lg text-ink';
const MARKER = 'flex w-[26px] shrink-0 justify-center pt-0.5 select-none';
// Kort är inte skyltar: ram och ton, radius 12, ingen bård och ingen skugga.
const CARD = 'rounded-[var(--radius-md)] border border-line-strong bg-surface p-4';
const CARD_LIST = 'mt-[18px] space-y-3 max-w-[var(--measure)]';

export default async function SkillPage({ params }: SkillPageProps) {
  const { skillId } = await params;
  const skill = skills.find((s) => s.id === skillId);

  if (!skill) {
    notFound();
  }

  const prerequisites = skill.prerequisites
    .map((p) => skills.find((s) => s.id === p.prerequisiteSkillId))
    .filter((s): s is Skill => s !== undefined);

  const children = skills.filter((s) => s.parentId === skill.id);
  const diagram = getDiagramForSkill(skillId);

  const practiceList = (
    <ol className={LIST}>
      {skill.practiceSteps.map((step, i) => (
        <li key={i} className={LIST_ITEM}>
          {/* Stolpsiffra i den lilla stolpen (26 × 28): siffran står aldrig
              naken i löpande text, den är något man passerar.
              tabular-nums håller kolumnen i lod förbi tio steg. */}
          <span className={MARKER}>
            <Stolpe number={i + 1} size="sm" />
          </span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  );

  // Fraser med skillId: null är allmänna mönster, inte knutna till just
  // detta moment — de visas inte här (se content/types.ts).
  const supervisorPhrases = content.supervisorPhrases.filter((p) => p.skillId === skill.id);

  return (
    <PageShell>
      <PageHeader
        back={{ href: '/skills', label: 'Alla moment' }}
        title={skill.name}
        lead={skill.description}
      >
        {/* Bara "Tränas löpande". Varningsmärket "Säkerhetskritiskt" satt
            på 64 av 75 moment och märkte alltså normalfallet, inte
            undantaget — det säger ingenting och är borta ur appen. Flaggan
            finns kvar i innehållsdatan. */}
        {skill.continuous && (
          <div className="pt-1">
            <StatusBadge variant="continuous" size="md">
              Tränas löpande
            </StatusBadge>
          </div>
        )}
      </PageHeader>

      {/* Avsnittet direkt efter figuren tappar sin avdelare: figurkortets
          underkant är redan en linje, och två parallella hårlinjer 32 px
          isär läser som ett misstag. Syskonväljare och inte villkor på
          ett visst avsnitt — vilket avsnitt som kommer först beror på
          momentet, och saknas figuren gäller regeln inte alls. */}
      <PageBody className="[&>figure+section]:border-t-0 [&>figure+section]:pt-0">
        {/* En rad, inte ett avsnitt med sju kort. Namnen som blå länkar:
            blått som text betyder länk (designsprak.md 3.4), så raden bär
            sin affordans utan ram. Står före diagrammet: den säger vad man
            bör kunna innan man tittar. */}
        {prerequisites.length > 0 && (
          <p className="max-w-[var(--measure)] text-base text-ink-2">
            Bygger på:{' '}
            {prerequisites.map((prereq, i) => (
              <span key={prereq.id}>
                {i > 0 && ', '}
                <Link href={`/skills/${prereq.id}`} className="font-semibold text-blue-text">
                  {prereq.name}
                </Link>
              </span>
            ))}
          </p>
        )}

        {/* Figurkortet: --surface med 1 px --line-strong och radius 12. Ingen
            bård — ett diagram är inte en skylt — och ingen skugga.

            På telefon går figuren kant i kant: sidmarginalen (20 px) och
            kortets egen indragning gav diagrammet 316 av skärmens 390 px.
            Utan sidoramar och med 8 px indrag får det 374 — en sjättedel
            mer, och det är bredden som avgör om etiketterna går att läsa.
            Från surfplatta finns bredden ändå, så kortet får tillbaka sina
            hörn och ramar. Diagrammen ritas inte om: de sitter i formspråket
            genom att deras token har fått nya värden (designsprak.md 9). */}
        {diagram && (
          <figure className="-mx-5 rounded-none border border-x-0 border-line-strong bg-surface px-2 py-6 sm:mx-0 sm:rounded-[var(--radius-md)] sm:border-x sm:px-6">
            {diagram}
            {skill.practiceSteps.length > 0 && (
              <figcaption className="mt-5 px-3 sm:px-0">
                <p className="text-sm font-semibold tracking-wide text-ink-3 uppercase">
                  Hur ni övar
                </p>
                {practiceList}
              </figcaption>
            )}
          </figure>
        )}

        {!diagram && skill.practiceSteps.length > 0 && (
          <Section>
            <SectionTitle accent="var(--sign-blue)">Hur ni övar</SectionTitle>
            {practiceList}
          </Section>
        )}

        {skill.commonErrors.length > 0 && (
          <Section>
            <SectionTitle accent="var(--sign-yellow)" accentBorder>
              Vanliga misstag
            </SectionTitle>
            <ul className={LIST}>
              {skill.commonErrors.map((error, i) => (
                <li key={i} className={LIST_ITEM}>
                  <span className={MARKER}>
                    <Varningstriangel className="mt-1.5" />
                  </span>
                  <span>{error}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {skill.goals.length > 0 && (
          <Hopfallbart title="Mål" accent="var(--green-text)">
            <ul className={LIST}>
              {skill.goals.map((goal, i) => (
                <li key={i} className={LIST_ITEM}>
                  {/* Grön punkt: grönt betyder vi, och målet är dit vi ska. */}
                  <span aria-hidden="true" className={MARKER}>
                    <span className="mt-[9px] block size-[9px] rounded-full bg-green-text" />
                  </span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </Hopfallbart>
        )}

        {/* Två avsnitt blev ett: vad handledaren tittar efter och vad hen
            kan säga är samma sak sedd från två håll, och de lästes aldrig
            var för sig. Hopfällt eftersom det hör till samtalet efter
            passet, inte till förberedelsen före. */}
        {(skill.supervisorObservations.length > 0 || supervisorPhrases.length > 0) && (
          <Hopfallbart title="För handledaren" accent="var(--ink)">
            {skill.supervisorObservations.length > 0 && (
              <ul className={LIST}>
                {skill.supervisorObservations.map((obs, i) => (
                  <li key={i} className={LIST_ITEM}>
                    {/* Pilar är typografiska — appen har inga ikoner. */}
                    <span aria-hidden="true" className={`${MARKER} font-semibold text-blue-text`}>
                      →
                    </span>
                    <span>{obs}</span>
                  </li>
                ))}
              </ul>
            )}

            {supervisorPhrases.length > 0 && (
              <ul className={CARD_LIST}>
                {supervisorPhrases.map((phrase) => (
                  <li key={phrase.id} className={CARD}>
                    <StatusBadge
                      variant={phrase.type === 'SAFETY_INTERVENTION' ? 'safety' : 'neutral'}
                      size="sm"
                    >
                      {PHRASE_TYPE_LABELS[phrase.type]}
                    </StatusBadge>
                    <p className="mt-2 text-lg text-ink">{phrase.text}</p>
                    {phrase.context && (
                      <p className="mt-1.5 text-sm text-ink-3">{phrase.context}</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </Hopfallbart>
        )}

        {/* Samma lugna rader som Bygger på hade som avsnitt. Barnens
            beskrivningar ryker: de står på barnets egen sida. */}
        {children.length > 0 && (
          <Section>
            <SectionTitle accent="var(--line-strong)">Delmoment</SectionTitle>
            <ul className="mt-[18px] max-w-[var(--measure)] divide-y divide-line">
              {children.map((child) => (
                <li key={child.id}>
                  <Link
                    href={`/skills/${child.id}`}
                    className="flex min-h-14 items-center gap-3 text-base font-semibold text-blue-text transition-colors duration-150 active:bg-surface-sunken active:duration-0 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:outline-none"
                  >
                    <span className="min-w-0 flex-1">{child.name}</span>
                    <span aria-hidden="true" className="shrink-0 text-lg">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        )}
      </PageBody>
    </PageShell>
  );
}
