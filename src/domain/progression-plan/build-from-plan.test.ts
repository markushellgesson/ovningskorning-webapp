import { describe, expect, it } from 'vitest';
import { buildMapFromPlan, validatePlan, type SkillMapInput } from './build-from-plan';
import type { PlanSteg } from './plan';

const skill = (id: string, kräver: string[] = [], continuous = false): SkillMapInput => ({
  id,
  category: id.split('-')[0],
  continuous,
  sortOrder: 0,
  prerequisites: kräver.map((k) => ({ prerequisiteSkillId: k, minimumState: 'PRACTICING' })),
});

const SKILLS = [skill('A-1'), skill('A-2', ['A-1']), skill('B-1', ['A-2'], true)];

const plan = (...pass: string[][]): PlanSteg[] => [
  {
    id: 's1',
    titel: 'Steg',
    fas: 'Fas',
    pass: pass.map((momentIds, i) => ({ id: `s1p${i + 1}`, typ: 'kor' as const, momentIds })),
  },
];

describe('validatePlan', () => {
  it('godkänner en plan där varje förkunskap kommer före', () => {
    expect(validatePlan(plan(['A-1'], ['A-2', 'B-1']), SKILLS)).toEqual([]);
  });

  it('godkänner förkunskap tidigare i samma pass — momenten övas i ordning', () => {
    expect(validatePlan(plan(['A-1', 'A-2', 'B-1']), SKILLS)).toEqual([]);
  });

  it('underkänner förkunskap senare i samma pass', () => {
    expect(validatePlan(plan(['A-2', 'A-1', 'B-1']), SKILLS)).toEqual([
      'A-2 bygger på A-1, som kommer efter',
    ]);
  });

  it('underkänner förkunskap i ett senare pass', () => {
    const fel = validatePlan(plan(['A-2'], ['A-1'], ['B-1']), SKILLS);
    expect(fel).toContain('A-2 bygger på A-1, som kommer efter');
  });

  it('underkänner ett moment som saknas', () => {
    expect(validatePlan(plan(['A-1', 'A-2']), SKILLS)).toEqual(['B-1 saknas i planen']);
  });

  it('underkänner ett moment som ligger två gånger', () => {
    const fel = validatePlan(plan(['A-1', 'A-2'], ['A-1', 'B-1']), SKILLS);
    expect(fel).toContain('A-1 ligger två gånger (s1p2)');
  });

  it('underkänner okända id:n och tomma pass', () => {
    const fel = validatePlan(plan(['A-1', 'A-2', 'B-1', 'X-9'], []), SKILLS);
    expect(fel).toContain('s1p1: okänt moment X-9');
    expect(fel).toContain('s1p2: tomt pass');
  });
});

describe('buildMapFromPlan', () => {
  it('ger kartans form: ett steg per plansteg, ett pass per grupp, passets id som gruppens', () => {
    const map = buildMapFromPlan(plan(['A-1'], ['A-2', 'B-1']), SKILLS);
    expect(map.levels).toHaveLength(1);
    expect(map.levels[0].id).toBe('s1');
    expect(map.levels[0].groups.map((g) => g.id)).toEqual(['s1p1', 's1p2']);
    expect(map.levels[0].groups[1].skillIds).toEqual(['A-2', 'B-1']);
  });

  it('sätter gruppens förkunskaper till dem utanför passet, och kategorierna sorterade', () => {
    const map = buildMapFromPlan(plan(['A-1'], ['A-2', 'B-1']), SKILLS);
    // B-1 bygger på A-2 som ligger i samma pass — det är inte en förkunskap utifrån.
    expect(map.levels[0].groups[1].prerequisiteIds).toEqual(['A-1']);
    expect(map.levels[0].groups[1].categories).toEqual(['A', 'B']);
  });

  it('listar de löpande momenten', () => {
    const map = buildMapFromPlan(plan(['A-1'], ['A-2', 'B-1']), SKILLS);
    expect(map.continuousSkillIds).toEqual(['B-1']);
  });

  it('vägrar bygga en plan som inte håller, med felen i meddelandet', () => {
    expect(() => buildMapFromPlan(plan(['A-2', 'A-1', 'B-1']), SKILLS)).toThrow(
      'A-2 bygger på A-1, som kommer efter',
    );
  });
});
