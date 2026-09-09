import type { PassSteg } from '@/components/pass/typer';
import content from '@/content';
import type { Skill } from '@/content/types';
import { buildMapFromPlan, type SkillMapLevel } from '@/domain/progression-plan/build-from-plan';
import { PLAN } from '@/domain/progression-plan/plan';

export const skills = content.skills;
export const skillsById = new Map(skills.map((skill) => [skill.id, skill]));

// Byggs och valideras vid exporten, så att samma plan ligger bakom varje vy.
export const progressionMap = buildMapFromPlan(PLAN, skills);

// Kontinuerliga moment grupperade per kategori, i innehållets ordning.
export const continuousByCategory = new Map<string, Skill[]>();
for (const id of progressionMap.continuousSkillIds) {
  const skill = skillsById.get(id);
  if (!skill) continue;
  if (!continuousByCategory.has(skill.category)) continuousByCategory.set(skill.category, []);
  continuousByCategory.get(skill.category)!.push(skill);
}

/** Antal moment ett steg innehåller, oavsett hur de delas upp i pass. */
export function countSkillsInLevel(level: SkillMapLevel): number {
  return level.groups.reduce((sum, group) => sum + group.skillIds.length, 0);
}

/** Planens titel är den enda rubrikkällan för steget. */
export function stepTitle(level: SkillMapLevel): string {
  return PLAN.find((steg) => steg.id === level.id)?.titel ?? 'Steg';
}

/** Datan passvyn behöver, byggd från den validerade planen. */
export const passSteg: PassSteg[] = progressionMap.levels.map((level, index) => {
  const planSteg = PLAN.find((steg) => steg.id === level.id)!;
  return {
    nummer: index + 1,
    titel: planSteg.titel,
    fas: planSteg.fas,
    notering: planSteg.notering,
    grupper: level.groups.map((group) => {
      const planPass = planSteg.pass.find((pass) => pass.id === group.id)!;
      return {
        id: group.id,
        typ: planPass.typ,
        notering: planPass.notering,
        moment: group.skillIds
          .map((id) => skillsById.get(id))
          .filter((skill): skill is Skill => skill !== undefined)
          .map((skill) => ({
            id: skill.id,
            namn: skill.name,
            continuous: skill.continuous,
            fragor: skill.supervisorObservations,
          })),
      };
    }),
  };
});
