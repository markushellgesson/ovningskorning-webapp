import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Appen serveras under `basePath` (/ovningskorning-webapp), och Next.js
 * prefixar bara `next/link` och `next/image` automatiskt. En handskriven
 * sökväg till `public/` — som `<image href="/signs/B1.svg">` i ett diagram —
 * pekar därför på roten av domänen och ger 404 i produktion.
 *
 * Det hände: alla sju diagram med vägmärken visade trasiga bilder i den
 * publicerade appen, medan de såg rätt ut i utvecklingsläge eftersom
 * `next dev` kör utan basePath-prefix på samma sätt. Felet syns alltså
 * inte förrän efter publicering, vilket är precis varför det behöver ett
 * test.
 */

const DIAGRAM_DIR = join(__dirname);

/** Kataloger under `public/` som diagrammen refererar till. */
const PUBLIC_DIRS = ['signs', 'photos'];

function diagramSources(): { file: string; source: string }[] {
  return readdirSync(DIAGRAM_DIR)
    .filter((file) => file.endsWith('.tsx'))
    .map((file) => ({ file, source: readFileSync(join(DIAGRAM_DIR, file), 'utf8') }));
}

describe('diagrammens sökvägar till public/', () => {
  it('prefixar varje referens med BASE_PATH', () => {
    const offenders: string[] = [];

    for (const { file, source } of diagramSources()) {
      for (const dir of PUBLIC_DIRS) {
        // Sökvägar som inleds med / direkt följt av katalognamnet, i en
        // sträng — alltså utan ${BASE_PATH} före.
        const bare = new RegExp(`["']/${dir}/`, 'g');
        const matches = source.match(bare);
        if (matches) {
          offenders.push(`${file}: ${matches.length} × "/${dir}/..." utan BASE_PATH`);
        }
      }
    }

    expect(offenders).toEqual([]);
  });

  it('importerar BASE_PATH i de filer som använder det', () => {
    const offenders: string[] = [];

    for (const { file, source } of diagramSources()) {
      const usesBasePath = source.includes('BASE_PATH');
      const importsBasePath = source.includes("from '@/lib/base-path'");
      if (usesBasePath && !importsBasePath) {
        offenders.push(`${file}: använder BASE_PATH utan att importera den`);
      }
    }

    expect(offenders).toEqual([]);
  });
});
