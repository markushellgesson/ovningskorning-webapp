import rawContent from './content.json';
import type { ContentData } from './types';

/**
 * `content.json` importeras via `resolveJsonModule`, så TypeScript härleder
 * annars typen direkt ur filens faktiska innehåll — `types.ts` tillämpas
 * aldrig automatiskt. Det är precis så förra exportbuggen kunde publicera
 * 44 handledarfraser utan text: fälten saknades i JSON:en, den härledda
 * typen krympte tyst för att matcha, och inget varnade.
 *
 * Valet föll på körtidsvalidering, INTE `content satisfies ContentData`,
 * av ett konkret tekniskt skäl (provat, inte antaget): TypeScript breddar
 * strängvärden i JSON-moduler till `string` snarare än till deras literal —
 * `category` i content.json härleds som `string`, aldrig som `SkillCategory`.
 * `satisfies` jämför då `string` mot t.ex. `SkillCategory`, vilket ALLTID
 * fallerar, oavsett om värdet faktiskt är giltigt. Med sex samlingar fulla
 * av enum-fält (category, type, difficulty, relationType, minimumState,
 * authority ...) hade `satisfies` alltså gett permanenta falska fel, inte en
 * kontroll som bara slår till vid en verklig regression.
 *
 * `assertContentData` nedan är en `asserts`-typvakt: den kontrollerar att
 * varje post i varje samling faktiskt har alla obligatoriska fält (inte
 * `undefined`), och TypeScript litar sedan på den för att smalna av typen
 * till `ContentData` utan att göra samma breda strukturella jämförelse. Ett
 * fält som saknas i JSON:en (den ursprungliga buggens feltyp) kastar ett
 * tydligt fel vid modulladdning — allt som importerar `content` körs under
 * `next build` (statisk export), så bygget stannar i stället för att
 * publicera tysta tomma fält. Se index.test.ts för samma kontroll körd med
 * vitest, oberoende av ett fullt bygge.
 */

// Håll i synk med interfacen i types.ts — index.test.ts fallerar om de
// glider isär från varandra.
const REQUIRED_FIELDS = {
  skills: [
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
  theoryTopics: ['id', 'category', 'title', 'summary', 'sourceId', 'sourceVersion'],
  exercises: [
    'id',
    'skillId',
    'title',
    'description',
    'difficulty',
    'estimatedMinutes',
    'requiredEnvironments',
  ],
  trafficEnvironments: ['id', 'type', 'description'],
  supervisorPhrases: ['id', 'skillId', 'type', 'text', 'context', 'sourceVersion'],
  regulatorySources: ['id', 'authority', 'url', 'sourceVersion'],
} as const satisfies Record<keyof Omit<ContentData, 'exportedAt' | 'databaseVersion'>, readonly string[]>;

function assertFieldsPresent(
  items: readonly Record<string, unknown>[],
  requiredKeys: readonly string[],
  collectionName: string,
): void {
  for (const item of items) {
    for (const key of requiredKeys) {
      if (item[key] === undefined) {
        const id = typeof item.id === 'string' ? item.id : '(okänt id)';
        throw new Error(
          `content.json: "${collectionName}"-posten "${id}" saknar fältet "${key}". ` +
            'Troligt orsak: scripts/export-content.mts exporterar inte längre det fältet, ' +
            'eller så byggdes content.json om innan den bugg som skrev denna kontroll fanns.',
        );
      }
    }
  }
}

function assertContentData(data: unknown): asserts data is ContentData {
  if (typeof data !== 'object' || data === null) {
    throw new Error('content.json: förväntade ett objekt på toppnivå.');
  }
  const record = data as Record<string, unknown>;

  for (const [collectionName, requiredKeys] of Object.entries(REQUIRED_FIELDS)) {
    const items = record[collectionName];
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error(`content.json: "${collectionName}" saknas eller är tom.`);
    }
    assertFieldsPresent(items as Record<string, unknown>[], requiredKeys, collectionName);
  }

  if (typeof record.exportedAt !== 'string' || typeof record.databaseVersion !== 'string') {
    throw new Error('content.json: "exportedAt" eller "databaseVersion" saknas.');
  }
}

assertContentData(rawContent);
// Explicit typannotation, inte bara narrowing från assertContentData ovan:
// utan den bär den EXPORTERADE bindningen inte alltid den avsmalnade typen
// vidare in i andra filer när den där konsumeras av generiska funktioner
// (t.ex. Array.prototype.reduce) — TypeScript kan då räkna ut ett bredare
// typargument och tappa den avsmalnade typen igen. Verifierat: utan denna
// annotation gav `content.skills.reduce(...)` i sidfiler ett typfel, trots
// att `assertContentData` redan körts. Med annotationen är `content`s
// deklarerade typ `ContentData` rakt av, oavsett hur den senare konsumeras.
const content: ContentData = rawContent;

export default content;
