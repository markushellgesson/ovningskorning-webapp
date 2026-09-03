import { describe, it, expect } from 'vitest';
import content from './index';

/**
 * `assertContentData` i index.ts fångar redan ett tappat fält vid
 * modulladdning (alltså redan under `next build`, se kommentaren där). Det
 * här testet är ett andra, oberoende skyddsnät som körs med `vitest` utan
 * att kräva ett fullt bygge, och pekar ut exakt vilken post och vilket fält
 * som saknas.
 *
 * Ett test som bara kontrollerar att content.json går att parsa (JSON.parse)
 * hade INTE fångat den ursprungliga buggen: filen var giltig JSON hela
 * tiden, bara tom på rätt fält, eftersom felaktiga Prisma-fältnamn gjorde
 * att exporten skrev `undefined`-värden som sedan försvann tyst i
 * JSON.stringify. Testet nedan kontrollerar därför fältnärvaro direkt på det
 * inlästa objektet — inte bara att filen kan tolkas.
 */

function assertFieldsPresent<T extends { id: string }>(
  items: readonly T[],
  requiredKeys: readonly (keyof T)[],
  collectionName: string,
) {
  expect(items.length, `${collectionName}: samlingen är tom`).toBeGreaterThan(0);
  for (const item of items) {
    for (const key of requiredKeys) {
      expect(
        item[key],
        `${collectionName} "${item.id}" saknar fältet "${String(key)}"`,
      ).not.toBeUndefined();
    }
  }
}

describe('content.json — fältnärvaro', () => {
  it('varje moment har alla obligatoriska fält', () => {
    assertFieldsPresent(
      content.skills,
      [
        'id',
        'parentId',
        'category',
        'name',
        'description',
        'goals',
        'practiceSteps',
        'commonErrors',
        'supervisorObservations',
        'continuous',
        'safetyCritical',
        'applicableTransmissions',
        'sortOrder',
        'sourceVersion',
        'prerequisites',
        'theoryRelations',
      ],
      'skill',
    );
  });

  it('varje teoriämne har alla obligatoriska fält', () => {
    assertFieldsPresent(
      content.theoryTopics,
      ['id', 'category', 'title', 'summary', 'sourceId', 'sourceVersion'],
      'theoryTopic',
    );
  });

  it('varje övning har alla obligatoriska fält', () => {
    assertFieldsPresent(
      content.exercises,
      [
        'id',
        'skillId',
        'title',
        'description',
        'difficulty',
        'estimatedMinutes',
        'requiredEnvironments',
      ],
      'exercise',
    );
  });

  it('varje trafikmiljö har alla obligatoriska fält', () => {
    assertFieldsPresent(
      content.trafficEnvironments,
      ['id', 'type', 'description'],
      'trafficEnvironment',
    );
  });

  it('varje handledarfras har alla obligatoriska fält — detta är exakt fältet den ursprungliga exportbuggen tappade', () => {
    assertFieldsPresent(
      content.supervisorPhrases,
      ['id', 'skillId', 'type', 'text', 'context', 'sourceVersion'],
      'supervisorPhrase',
    );
    // Historiken: alla 44 handledarfraser publicerades med `text` som
    // `undefined`. Kontrollera explicit att fältet inte bara finns utan
    // också har ett faktiskt innehåll.
    for (const phrase of content.supervisorPhrases) {
      expect(
        phrase.text.length,
        `handledarfras "${phrase.id}" har tom text`,
      ).toBeGreaterThan(0);
    }
  });

  it('varje regelkälla har alla obligatoriska fält', () => {
    assertFieldsPresent(
      content.regulatorySources,
      ['id', 'authority', 'url', 'sourceVersion'],
      'regulatorySource',
    );
  });

  it('exportmetadata finns', () => {
    expect(content.exportedAt).not.toBeUndefined();
    expect(content.databaseVersion).not.toBeUndefined();
  });
});
