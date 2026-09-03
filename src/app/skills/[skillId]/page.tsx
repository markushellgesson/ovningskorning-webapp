import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import content from '@/content/content.json';
import type { Skill } from '@/content/types';
import { getDiagramForSkill } from '@/components/diagrams/registry';

const skills = content.skills as Skill[];

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

  return (
    <main className="min-h-dvh bg-surface-overlay p-6 pb-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-4">
          <Link href="/skills" className="text-primary-600 hover:underline">
            ← Tillbaka till biblioteket
          </Link>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-text-primary">{skill.name}</h1>
            <p className="text-xl text-text-secondary">{skill.description}</p>
            <div className="flex gap-2 flex-wrap">
              {skill.safetyCritical && (
                <span className="text-sm bg-safety-50 text-safety-700 px-3 py-1 rounded-[--radius-sm]">
                  Säkerhetskritisk
                </span>
              )}
              {skill.continuous && (
                <span className="text-sm bg-primary-50 text-primary-700 px-3 py-1 rounded-[--radius-sm]">
                  Kontinuerligt moment
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Diagram om det finns för detta moment */}
        {getDiagramForSkill(skillId) && (
          <section className="bg-surface-raised rounded-[--radius-md] border border-border-subtle p-6">
            {getDiagramForSkill(skillId)}
          </section>
        )}

        {prerequisites.length > 0 && (
          <section className="bg-surface-raised rounded-[--radius-md] border border-border-subtle p-6">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">Förkunskaper</h2>
            <ul className="space-y-2">
              {prerequisites.map((prereq) => (
                <li key={prereq.id}>
                  <Link
                    href={`/skills/${prereq.id}`}
                    className="block p-3 rounded-[--radius-sm] border border-border-subtle hover:border-primary-600 hover:bg-primary-50 transition-colors min-h-[48px] flex items-center"
                  >
                    <span className="text-base text-text-primary font-medium">{prereq.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {skill.goals.length > 0 && (
          <section className="bg-surface-raised rounded-[--radius-md] border border-border-subtle p-6">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">Mål</h2>
            <ul className="space-y-2">
              {skill.goals.map((goal, i) => (
                <li key={i} className="flex gap-3 text-lg text-text-primary">
                  <span className="text-neutral-400 shrink-0">•</span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {skill.practiceSteps.length > 0 && (
          <section className="bg-surface-raised rounded-[--radius-md] border border-border-subtle p-6">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">Övningssteg</h2>
            <ol className="space-y-2">
              {skill.practiceSteps.map((step, i) => (
                <li key={i} className="flex gap-3 text-lg text-text-primary">
                  <span className="shrink-0 font-medium text-text-tertiary">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {skill.commonErrors.length > 0 && (
          <section className="bg-surface-raised rounded-[--radius-md] border border-border-subtle p-6">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">Vanliga fel</h2>
            <ul className="space-y-2">
              {skill.commonErrors.map((error, i) => (
                <li key={i} className="flex gap-3 text-lg text-text-primary">
                  <span className="text-attention-600 shrink-0">!</span>
                  <span>{error}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {skill.supervisorObservations.length > 0 && (
          <section className="bg-surface-raised rounded-[--radius-md] border border-border-subtle p-6">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              Vad handledaren ska observera
            </h2>
            <ul className="space-y-2">
              {skill.supervisorObservations.map((obs, i) => (
                <li key={i} className="flex gap-3 text-lg text-text-primary">
                  <span className="text-primary-600 shrink-0">→</span>
                  <span>{obs}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {children.length > 0 && (
          <section className="bg-surface-raised rounded-[--radius-md] border border-border-subtle p-6">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">Delmoment</h2>
            <ul className="space-y-3">
              {children.map((child) => (
                <li key={child.id}>
                  <Link
                    href={`/skills/${child.id}`}
                    className="block p-4 rounded-[--radius-sm] border border-border-subtle hover:border-primary-500 transition-colors min-h-[48px]"
                  >
                    <h3 className="font-semibold text-text-primary">{child.name}</h3>
                    <p className="text-text-secondary mt-1">{child.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <footer className="text-sm text-text-tertiary pt-8 border-t border-border-subtle">
          <p>Version: {skill.sourceVersion}</p>
        </footer>
      </div>
    </main>
  );
}
