/**
 * Skriver in den faktiska precache-listan och en innehållsbaserad
 * cacheversion i `out/sw.js`, efter att `next build` har kört.
 *
 * `public/sw.js` innehåller platshållare (se filen) eftersom den statiska
 * exporten hashar filnamn per bygge — de går inte att veta i förväg. Det
 * här skriptet läser den redan byggda `out/`, listar alla filer som ska
 * fungera offline och skriver in dem i kopian som redan ligger i `out/sw.js`
 * (Next har kopierat `public/sw.js` dit som en del av `next build`).
 * `public/sw.js` självt rörs aldrig — annars skulle nästa bygge bygga
 * vidare på en redan ifylld fil i stället för de rena platshållarna.
 *
 * Körs via `npm run build` (se package.json), aldrig fristående, så att
 * det inte går att glömma bort.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { createHash } from 'node:crypto';

const BASE_PATH = '/ovningskorning-webapp';
const OUT_DIR = 'out';
const SW_PATH = join(OUT_DIR, 'sw.js');

// Filer som inte ska precachas: sw.js självt (ingen anledning att cacha
// servicensworkerskriptet som ett fetch-svar) samt 404-sidan, som inte är
// en del av appskalet och aldrig länkas till från appen.
const EXCLUDE = new Set(['sw.js', '404.html']);
const EXCLUDE_DIRS = new Set(['404']);

function walk(dir, base = dir) {
  const entries = readdirSync(dir);
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const rel = relative(base, fullPath).split(sep).join('/');

    if (statSync(fullPath).isDirectory()) {
      if (EXCLUDE_DIRS.has(entry)) continue;
      files.push(...walk(fullPath, base));
      continue;
    }

    if (EXCLUDE.has(rel)) continue;
    files.push(rel);
  }

  return files;
}

function toPrecacheUrls(relativeFiles) {
  const urls = new Set();

  for (const rel of relativeFiles) {
    urls.add(`${BASE_PATH}/${rel}`);

    // `trailingSlash: true` (next.config.ts) gör att appens egna länkar
    // pekar på katalog-URL:er ("/skills/"), inte på "index.html" rakt av.
    // En navigering till "/skills/" måste träffa exakt den cachenyckeln,
    // så vi lägger till kataloglänken som ett eget precache-mål utöver
    // filens riktiga sökväg.
    if (rel === 'index.html') {
      urls.add(`${BASE_PATH}/`);
    } else if (rel.endsWith('/index.html')) {
      urls.add(`${BASE_PATH}/${rel.slice(0, -'index.html'.length)}`);
    }
  }

  return [...urls].sort();
}

function main() {
  const files = walk(OUT_DIR);
  if (files.length === 0) {
    throw new Error(`Hittade inga filer i ${OUT_DIR}/ — kör "next build" innan detta skript.`);
  }

  const precacheUrls = toPrecacheUrls(files);

  // Cacheversionen härleds ur den faktiska precache-listan (som redan
  // innehåller alla hashade filnamn). Ändrat byggresultat ⇒ ny hash ⇒ ny
  // cache ⇒ `activate` städar bort den gamla. Oförändrat innehåll ⇒ samma
  // hash ⇒ ingen onödig omcachning.
  const cacheVersion = createHash('sha1').update(precacheUrls.join('\n')).digest('hex').slice(0, 10);

  let sw = readFileSync(SW_PATH, 'utf8');

  if (!sw.includes('__CACHE_VERSION__')) {
    throw new Error('Hittade inte __CACHE_VERSION__-platshållaren i out/sw.js.');
  }
  sw = sw.replace('__CACHE_VERSION__', cacheVersion);

  const placeholderPattern = /const PRECACHE_URLS = \[[\s\S]*?\];/;
  if (!placeholderPattern.test(sw)) {
    throw new Error('Hittade inte PRECACHE_URLS-arrayen i out/sw.js.');
  }
  const precacheArrayLiteral = `const PRECACHE_URLS = ${JSON.stringify(precacheUrls, null, 2)};`;
  sw = sw.replace(placeholderPattern, precacheArrayLiteral);

  writeFileSync(SW_PATH, sw);

  console.log(`sw.js: cacheversion ${cacheVersion}, ${precacheUrls.length} precachade URL:er.`);
}

main();
