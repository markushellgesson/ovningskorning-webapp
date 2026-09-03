import { describe, it, expect } from 'vitest';
import { buildProgressionMap, MAX_GROUP_SIZE, MAX_STEP_SIZE } from './build-map';
import type { SkillMapInput } from './build-map';

function skill(
  id: string,
  overrides: Partial<Omit<SkillMapInput, 'id'>> = {},
): SkillMapInput {
  return {
    id,
    category: 'VEHICLE_CONTROL',
    continuous: false,
    sortOrder: 0,
    prerequisites: [],
    ...overrides,
  };
}

describe('buildProgressionMap', () => {
  it('ger tomt resultat för en tom lista', () => {
    expect(buildProgressionMap([])).toEqual({ levels: [], continuousSkillIds: [] });
  });

  it('placerar moment utan förkunskapskrav på nivå 0', () => {
    const skills = [skill('A'), skill('B'), skill('C')];
    const map = buildProgressionMap(skills);

    expect(map.levels).toHaveLength(1);
    expect(map.levels[0].level).toBe(0);
  });

  describe('nivåberäkning i flera led', () => {
    it('härleder djupet genom en kedja av flera moment', () => {
      const skills = [
        skill('A', { sortOrder: 10 }),
        skill('B', { sortOrder: 20, prerequisites: [{ prerequisiteSkillId: 'A', minimumState: 'PRACTICING' }] }),
        skill('C', { sortOrder: 30, prerequisites: [{ prerequisiteSkillId: 'B', minimumState: 'PRACTICING' }] }),
        skill('D', { sortOrder: 40, prerequisites: [{ prerequisiteSkillId: 'C', minimumState: 'PRACTICING' }] }),
      ];
      const map = buildProgressionMap(skills);

      expect(map.levels.map((l) => l.level)).toEqual([0, 1, 2, 3]);
      expect(map.levels[0].groups[0].skillIds).toEqual(['A']);
      expect(map.levels[3].groups[0].skillIds).toEqual(['D']);
    });

    it('tar nivån efter det DJUPASTE av flera förkunskapskrav', () => {
      const skills = [
        skill('A', { sortOrder: 10 }),
        skill('B', { sortOrder: 20, prerequisites: [{ prerequisiteSkillId: 'A', minimumState: 'PRACTICING' }] }),
        skill('C', {
          sortOrder: 30,
          category: 'OTHER',
          // Kräver både A (nivå 0) och B (nivå 1) — ska hamna på nivå 2, inte 1.
          prerequisites: [
            { prerequisiteSkillId: 'A', minimumState: 'PRACTICING' },
            { prerequisiteSkillId: 'B', minimumState: 'PRACTICING' },
          ],
        }),
      ];
      const map = buildProgressionMap(skills);
      const levelOfC = map.levels.find((l) => l.groups.some((g) => g.skillIds.includes('C')))?.level;

      expect(levelOfC).toBe(2);
    });

    it('räknar med kontinuerliga moment i djupet, och de blir ett eget steg precis som andra', () => {
      // A (icke-kontinuerlig) -> K (kontinuerlig) -> B (icke-kontinuerlig)
      // B ska hamna två steg efter A, inte direkt efter, eftersom kedjan
      // går via det kontinuerliga momentet. K själv syns på sin egen nivå.
      const skills = [
        skill('A', { sortOrder: 10 }),
        skill('K', {
          sortOrder: 20,
          continuous: true,
          prerequisites: [{ prerequisiteSkillId: 'A', minimumState: 'PRACTICING' }],
        }),
        skill('B', {
          sortOrder: 30,
          prerequisites: [{ prerequisiteSkillId: 'K', minimumState: 'PRACTICING' }],
        }),
      ];
      const map = buildProgressionMap(skills);

      // Tre synliga steg (nivå 0, 1 och 2) — K:s introduktionsnivå (1) syns
      // precis som alla andra nivåer.
      expect(map.levels.map((l) => l.level)).toEqual([0, 1, 2]);
      expect(map.levels[1].groups[0].skillIds).toEqual(['K']);
      expect(map.continuousSkillIds).toEqual(['K']);
    });
  });

  describe('gruppstorlek', () => {
    it('bundlar moment i samma kategori på samma nivå till en grupp', () => {
      const skills = [
        skill('A', { category: 'MANEUVERING', sortOrder: 10 }),
        skill('B', { category: 'MANEUVERING', sortOrder: 20 }),
        skill('C', { category: 'MANEUVERING', sortOrder: 30 }),
      ];
      const map = buildProgressionMap(skills);

      expect(map.levels[0].groups).toHaveLength(1);
      expect(map.levels[0].groups[0].skillIds).toEqual(['A', 'B', 'C']);
      expect(map.levels[0].groups[0].categories).toEqual(['MANEUVERING']);
    });

    it('bundlar moment med EXAKT samma förkunskapskrav trots olika kategori', () => {
      const skills = [
        skill('ROOT', { sortOrder: 10 }),
        skill('X', {
          category: 'INTERSECTIONS',
          sortOrder: 20,
          prerequisites: [{ prerequisiteSkillId: 'ROOT', minimumState: 'PRACTICING' }],
        }),
        skill('Y', {
          category: 'ROUNDABOUTS',
          sortOrder: 30,
          prerequisites: [{ prerequisiteSkillId: 'ROOT', minimumState: 'PRACTICING' }],
        }),
      ];
      const map = buildProgressionMap(skills);
      const level1 = map.levels.find((l) => l.level === 1)!;

      expect(level1.groups).toHaveLength(1);
      expect(level1.groups[0].skillIds).toEqual(['X', 'Y']);
    });

    it('länkar INTE bara för att moment delar ett AVLÄGSET, gemensamt förkunskapskrav', () => {
      // X kräver bara HUB. Y kräver HUB + något eget. Olika kategorier,
      // olika (icke-identiska) uppsättningar krav — ska INTE grupperas ihop.
      const skills = [
        skill('HUB', { sortOrder: 10 }),
        skill('OTHER_ROOT', { sortOrder: 15, category: 'OTHER' }),
        skill('X', {
          category: 'INTERSECTIONS',
          sortOrder: 20,
          prerequisites: [{ prerequisiteSkillId: 'HUB', minimumState: 'PRACTICING' }],
        }),
        skill('Y', {
          category: 'ROUNDABOUTS',
          sortOrder: 30,
          prerequisites: [
            { prerequisiteSkillId: 'HUB', minimumState: 'PRACTICING' },
            { prerequisiteSkillId: 'OTHER_ROOT', minimumState: 'PRACTICING' },
          ],
        }),
      ];
      const map = buildProgressionMap(skills);
      const level1 = map.levels.find((l) => l.level === 1)!;
      const groupIds = level1.groups.map((g) => g.skillIds);

      expect(groupIds).toContainEqual(['X']);
      expect(groupIds).toContainEqual(['Y']);
    });

    it('respekterar maxstorleken och delar en stor kategori i flera grupper', () => {
      const skills = Array.from({ length: MAX_GROUP_SIZE * 2 + 1 }, (_, i) =>
        skill(`S${i}`, { category: 'MANEUVERING', sortOrder: i * 10 }),
      );
      const map = buildProgressionMap(skills);
      // Nivå 0 kan ha delats i flera steg (se stegstorlek nedan) — samla
      // ihop alla grupper som hör till nivå 0 oavsett hur många steg det blev.
      const level0Groups = map.levels.filter((l) => l.level === 0).flatMap((l) => l.groups);

      expect(level0Groups.length).toBeGreaterThan(1);
      for (const group of level0Groups) {
        expect(group.skillIds.length).toBeLessThanOrEqual(MAX_GROUP_SIZE);
      }
      // Alla moment ska vara med, ingen tappad eller dubblerad.
      const allIds = level0Groups.flatMap((g) => g.skillIds);
      expect(allIds.sort()).toEqual(skills.map((s) => s.id).sort());
    });

    it('sätter gruppens prerequisiteIds till unionen av medlemmarnas krav', () => {
      const skills = [
        skill('A', { sortOrder: 10 }),
        skill('B', { sortOrder: 20 }),
        skill('C', {
          category: 'A',
          sortOrder: 30,
          prerequisites: [{ prerequisiteSkillId: 'A', minimumState: 'PRACTICING' }],
        }),
        skill('D', {
          category: 'A',
          sortOrder: 40,
          prerequisites: [{ prerequisiteSkillId: 'B', minimumState: 'PRACTICING' }],
        }),
      ];
      const map = buildProgressionMap(skills);
      const level1 = map.levels.find((l) => l.level === 1)!;

      expect(level1.groups).toHaveLength(1);
      expect(level1.groups[0].prerequisiteIds).toEqual(['A', 'B']);
    });
  });

  describe('stegstorlek', () => {
    it('delar en nivå med fler moment än MAX_STEP_SIZE i flera steg, utan att bryta grupper', () => {
      // Fyra fristående kategorier på nivå 0, 3 moment vardera (12 totalt) —
      // fler än MAX_STEP_SIZE (8) men varje grupp ligger under MAX_GROUP_SIZE.
      const categories = ['A', 'B', 'C', 'D'];
      const skills = categories.flatMap((category, ci) =>
        Array.from({ length: 3 }, (_, i) => skill(`${category}${i}`, { category, sortOrder: ci * 10 + i })),
      );
      const map = buildProgressionMap(skills);
      const level0Steps = map.levels.filter((l) => l.level === 0);

      expect(level0Steps.length).toBeGreaterThan(1);
      for (const step of level0Steps) {
        const stepSize = step.groups.reduce((n, g) => n + g.skillIds.length, 0);
        expect(stepSize).toBeLessThanOrEqual(MAX_STEP_SIZE);
      }
      // Alla moment finns kvar, ingen grupp delades mitt itu.
      const allIds = level0Steps.flatMap((s) => s.groups.flatMap((g) => g.skillIds));
      expect(allIds.sort()).toEqual(skills.map((s) => s.id).sort());
      // Stegen har unika id:n så React-nycklar inte krockar.
      expect(new Set(level0Steps.map((s) => s.id)).size).toBe(level0Steps.length);
    });

    it('delar INTE en nivå som ryms inom MAX_STEP_SIZE', () => {
      const skills = [skill('A', { category: 'X' }), skill('B', { category: 'Y' })];
      const map = buildProgressionMap(skills);

      expect(map.levels).toHaveLength(1);
      expect(map.levels[0].id).toBe('level-0');
    });
  });

  describe('kontinuerliga moment', () => {
    it('placeras på sin nivå i ordningen OCH listas i continuousSkillIds som en påminnelse', () => {
      const skills = [
        skill('A', { sortOrder: 10 }),
        skill('B', {
          sortOrder: 20,
          continuous: true,
          prerequisites: [{ prerequisiteSkillId: 'A', minimumState: 'PRACTICING' }],
        }),
      ];
      const map = buildProgressionMap(skills);

      // Rätt nivå (1, efter sitt förkunskapskrav A) — precis som ett
      // icke-kontinuerligt moment med samma krav skulle hamna.
      const levelOfB = map.levels.find((l) => l.groups.some((g) => g.skillIds.includes('B')))?.level;
      expect(levelOfB).toBe(1);
      // Och samtidigt markerad som kontinuerlig via den samlade listan.
      expect(map.continuousSkillIds).toEqual(['B']);
    });

    it('utan förkunskapskrav hamnar ett kontinuerligt moment på nivå 0, precis som andra', () => {
      const skills = [skill('A', { continuous: true }), skill('B', { continuous: true })];
      const map = buildProgressionMap(skills);

      expect(map.levels).toHaveLength(1);
      expect(map.levels[0].level).toBe(0);
      expect(map.levels[0].groups.flatMap((g) => g.skillIds).sort()).toEqual(['A', 'B']);
      expect(map.continuousSkillIds).toEqual(['A', 'B']);
    });
  });

  describe('determinism', () => {
    it('ger samma resultat oavsett i vilken ordning momenten skickas in', () => {
      const skills: SkillMapInput[] = [
        skill('A', { sortOrder: 10 }),
        skill('B', { sortOrder: 20, category: 'MANEUVERING' }),
        skill('C', { sortOrder: 30, category: 'MANEUVERING' }),
        skill('D', {
          sortOrder: 40,
          prerequisites: [{ prerequisiteSkillId: 'A', minimumState: 'PRACTICING' }],
        }),
      ];
      const shuffled = [skills[3], skills[1], skills[0], skills[2]];

      expect(buildProgressionMap(skills)).toEqual(buildProgressionMap(shuffled));
    });

    it('ger samma resultat vid upprepade anrop med identisk input', () => {
      const skills = [skill('A'), skill('B', { category: 'MANEUVERING' })];

      expect(buildProgressionMap(skills)).toEqual(buildProgressionMap(skills));
    });
  });

  it('kastar ett tydligt fel om ett förkunskapskrav pekar på ett okänt moment', () => {
    const skills = [
      skill('A', { prerequisites: [{ prerequisiteSkillId: 'SAKNAS', minimumState: 'PRACTICING' }] }),
    ];

    expect(() => buildProgressionMap(skills)).toThrow(/SAKNAS/);
  });
});
