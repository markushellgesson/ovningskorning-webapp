import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import content from '@/content';
import type { DifficultyLevel, PhraseType, Skill, TheoryRelationType } from '@/content/types';
import { StatusBadge } from '@/components/ui/badge';
import { getDiagramForSkill } from '@/components/diagrams/registry';
import { getPhotosForSkill } from '@/content/photo-credits';
import { SkillPhoto } from '@/components/skill-photo';

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

const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  INTRODUCTION: 'Introduktion',
  BASIC: 'Grundnivå',
  INTERMEDIATE: 'Mellannivå',
  ADVANCED: 'Avancerad',
};

const THEORY_RELATION_LABELS: Record<TheoryRelationType, string> = {
  PREREQUISITE: 'Bra att kunna innan',
  INTEGRATED: 'Hör ihop med momentet',
  DEEP_DIVE: 'För den som vill fördjupa sig',
};

// Ordningen sektionerna grupperas i under "Teoriämnen" — förkunskap före
// fördjupning, så läsordningen följer var man befinner sig i inlärningen.
const THEORY_RELATION_ORDER: TheoryRelationType[] = ['PREREQUISITE', 'INTEGRATED', 'DEEP_DIVE'];

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
 * Momentsidan är den mest lästa vyn i appen, och den enda med riktigt långa
 * listor. Rytmen bärs därför av tre saker i stället för av inramning:
 *
 * 1. En hårfin linje och 32 px luft mellan varje avsnitt, i stället för att
 *    varje avsnitt ligger i ett eget kort. Sex identiska kort i rad läser
 *    som en formulärsida; linje plus luft läser som ett dokument.
 * 2. Textbredden är kapad till --measure (66 tecken). Utan tak blir raderna
 *    på en surfplatta dubbelt så långa som ögat klarar utan att tappa raden.
 * 3. Radavstånd 1.65 på 17 px i listorna (--text-lg), med 12 px mellan
 *    punkterna, så att varje punkt läses som en egen enhet.
 *
 * Markörerna (punkt, siffra, utropstecken, pil) ligger i en egen kolumn med
 * fast bredd så att texten radbryts mot en rak vänsterkant.
 */

// Klassnamn som återkommer i varje avsnitt. Samlade här för att avsnitten
// ska vara garanterat identiska — rytmen faller om ett av dem glider.
const SECTION = 'border-t border-border-subtle pt-8';
const SECTION_HEADING = 'text-2xl font-semibold text-text-primary';
const LIST = 'mt-5 space-y-3 max-w-[var(--measure)]';
const LIST_ITEM = 'flex gap-3 text-lg text-text-primary';
const MARKER = 'w-5 shrink-0 select-none';

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
  const photos = getPhotosForSkill(skillId);

  // Fraser med skillId: null är allmänna mönster, inte knutna till just
  // detta moment — de visas inte här (se content/types.ts).
  const supervisorPhrases = content.supervisorPhrases.filter((p) => p.skillId === skill.id);
  const exercises = content.exercises.filter((e) => e.skillId === skill.id);

  const theoryTopicsById = new Map(content.theoryTopics.map((t) => [t.id, t]));
  const theoryGroups = THEORY_RELATION_ORDER.map((relationType) => ({
    relationType,
    topics: skill.theoryRelations
      .filter((r) => r.relationType === relationType)
      .map((r) => theoryTopicsById.get(r.theoryTopicId))
      .filter((t): t is (typeof content.theoryTopics)[number] => t !== undefined),
  })).filter((group) => group.topics.length > 0);

  return (
    <main className="min-h-dvh bg-surface-overlay">
      <div className="mx-auto w-full max-w-2xl px-5 pt-6 pb-28 sm:px-8 sm:pt-10">
        <header className="space-y-3">
          <Link
            href="/skills"
            className="-ml-3 inline-flex min-h-12 items-center rounded-[var(--radius-sm)] px-3 text-base font-medium text-primary-600 transition-colors duration-150 hover:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            ← Alla moment
          </Link>
          <h1 className="text-3xl font-semibold text-text-primary">{skill.name}</h1>
          <p className="max-w-[var(--measure)] text-xl text-text-secondary">{skill.description}</p>
          {(skill.safetyCritical || skill.continuous) && (
            <div className="flex flex-wrap gap-2 pt-1">
              {skill.safetyCritical && (
                <StatusBadge variant="safety" size="md">
                  Säkerhetskritiskt
                </StatusBadge>
              )}
              {skill.continuous && (
                <StatusBadge variant="neutral" size="md">
                  Kontinuerligt moment
                </StatusBadge>
              )}
            </div>
          )}
        </header>

        <div className="mt-8 space-y-8">
          {/* Diagram om det finns för detta moment */}
          {diagram && (
            <figure className="rounded-[var(--radius-md)] border border-border-subtle bg-surface-raised px-4 py-6 sm:px-6">
              {diagram}
            </figure>
          )}

          {/* Foto av trafikmiljön, om ett finns för detta moment. Diagrammet
              ovan är fortfarande huvudillustrationen — fotot kompletterar. */}
          {photos.length > 0 && (
            <div className="space-y-4">
              {photos.map((photo) => (
                <SkillPhoto key={photo.filename} photo={photo} />
              ))}
            </div>
          )}

          {prerequisites.length > 0 && (
            <section className={SECTION}>
              <h2 className={SECTION_HEADING}>Förkunskaper</h2>
              <ul className="mt-5 space-y-2">
                {prerequisites.map((prereq) => (
                  <li key={prereq.id}>
                    <Link
                      href={`/skills/${prereq.id}`}
                      className="flex min-h-12 items-center rounded-[var(--radius-sm)] border border-border-subtle bg-surface-raised px-4 py-3 text-base font-medium text-text-primary transition-colors duration-150 hover:border-primary-400 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      {prereq.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {skill.goals.length > 0 && (
            <section className={SECTION}>
              <h2 className={SECTION_HEADING}>Mål</h2>
              <ul className={LIST}>
                {skill.goals.map((goal, i) => (
                  <li key={i} className={LIST_ITEM}>
                    <span aria-hidden="true" className={`${MARKER} text-text-tertiary`}>
                      •
                    </span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {skill.practiceSteps.length > 0 && (
            <section className={SECTION}>
              <h2 className={SECTION_HEADING}>Hur ni övar</h2>
              <ol className={LIST}>
                {skill.practiceSteps.map((step, i) => (
                  <li key={i} className={LIST_ITEM}>
                    {/* tabular-nums håller siffrorna i lod när listan går
                        förbi tio steg. */}
                    <span
                      aria-hidden="true"
                      className={`${MARKER} font-medium text-text-tertiary tabular-nums`}
                    >
                      {i + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {skill.commonErrors.length > 0 && (
            <section className={SECTION}>
              <h2 className={SECTION_HEADING}>Vanliga misstag</h2>
              <ul className={LIST}>
                {skill.commonErrors.map((error, i) => (
                  <li key={i} className={LIST_ITEM}>
                    <span
                      aria-hidden="true"
                      className={`${MARKER} font-semibold text-attention-700`}
                    >
                      !
                    </span>
                    <span>{error}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {skill.supervisorObservations.length > 0 && (
            <section className={SECTION}>
              <h2 className={SECTION_HEADING}>Vad handledaren tittar efter</h2>
              <ul className={LIST}>
                {skill.supervisorObservations.map((obs, i) => (
                  <li key={i} className={LIST_ITEM}>
                    <span aria-hidden="true" className={`${MARKER} text-primary-600`}>
                      →
                    </span>
                    <span>{obs}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {supervisorPhrases.length > 0 && (
            <section className={SECTION}>
              <h2 className={SECTION_HEADING}>Handledarfraser</h2>
              <ul className="mt-5 space-y-3 max-w-[var(--measure)]">
                {supervisorPhrases.map((phrase) => (
                  <li
                    key={phrase.id}
                    className="rounded-[var(--radius-sm)] border border-border-subtle bg-surface-raised p-4"
                  >
                    <StatusBadge
                      variant={phrase.type === 'SAFETY_INTERVENTION' ? 'safety' : 'neutral'}
                      size="sm"
                    >
                      {PHRASE_TYPE_LABELS[phrase.type]}
                    </StatusBadge>
                    <p className="mt-2 text-lg text-text-primary">{phrase.text}</p>
                    {phrase.context && (
                      <p className="mt-2 text-sm text-text-tertiary">{phrase.context}</p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {exercises.length > 0 && (
            <section className={SECTION}>
              <h2 className={SECTION_HEADING}>Övningar</h2>
              <ul className="mt-5 space-y-3 max-w-[var(--measure)]">
                {exercises.map((exercise) => (
                  <li
                    key={exercise.id}
                    className="rounded-[var(--radius-sm)] border border-border-subtle bg-surface-raised p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg font-semibold text-text-primary">{exercise.title}</h3>
                      <StatusBadge variant="neutral" size="sm">
                        {DIFFICULTY_LABELS[exercise.difficulty]}
                      </StatusBadge>
                    </div>
                    <p className="mt-1 text-base text-text-secondary">{exercise.description}</p>
                    {exercise.estimatedMinutes !== null && (
                      <p className="mt-2 text-sm text-text-tertiary">
                        Cirka {exercise.estimatedMinutes} minuter
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {theoryGroups.length > 0 && (
            <section className={SECTION}>
              <h2 className={SECTION_HEADING}>Teori kopplad till momentet</h2>
              <div className="mt-5 space-y-6">
                {theoryGroups.map((group) => (
                  <div key={group.relationType} className="space-y-3">
                    <h3 className="text-sm font-semibold tracking-wide text-text-tertiary uppercase">
                      {THEORY_RELATION_LABELS[group.relationType]}
                    </h3>
                    <ul className="space-y-3 max-w-[var(--measure)]">
                      {group.topics.map((topic) => (
                        <li
                          key={topic.id}
                          className="rounded-[var(--radius-sm)] border border-border-subtle bg-surface-raised p-4"
                        >
                          <h4 className="text-base font-semibold text-text-primary">
                            {topic.title}
                          </h4>
                          {topic.summary && (
                            <p className="mt-1 text-sm text-text-secondary">{topic.summary}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {children.length > 0 && (
            <section className={SECTION}>
              <h2 className={SECTION_HEADING}>Delmoment</h2>
              <ul className="mt-5 space-y-3">
                {children.map((child) => (
                  <li key={child.id}>
                    <Link
                      href={`/skills/${child.id}`}
                      className="block min-h-12 rounded-[var(--radius-md)] border border-border-subtle bg-surface-raised p-5 transition-colors duration-150 hover:border-primary-400 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      <h3 className="text-lg font-semibold text-text-primary">{child.name}</h3>
                      <p className="mt-1 text-base text-text-secondary">{child.description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <footer className="border-t border-border-subtle pt-8">
            <p className="text-sm text-text-tertiary">Version: {skill.sourceVersion}</p>
          </footer>
        </div>
      </div>
    </main>
  );
}
