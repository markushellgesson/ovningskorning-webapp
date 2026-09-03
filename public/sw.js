/**
 * Service worker — Stöd för privat övningskörning B (lokal variant).
 *
 * Måste ligga och köras från roten av basePath (`/ovningskorning-webapp/`)
 * för att `scope` ska täcka hela appen — se registreringen i
 * `src/components/pwa/service-worker-register.tsx`.
 *
 * Cachestrategi:
 * - Navigeringar (HTML-sidor): network-first, med cache och sist en
 *   dedikerad offline-sida som reserv. Färskt innehåll när nätet finns,
 *   fungerande app när det inte gör det.
 * - Statiska tillgångar (`_next/static/*`, ikoner, typsnitt): cache-first.
 *   De är innehållshashade och byter aldrig innehåll under samma namn, så
 *   det finns inget skäl att fråga nätet först.
 * - Allt annat GET: network-first mot en gemensam runtime-cache.
 * - POST och övriga metoder rörs aldrig — de passerar orört till nätet.
 *
 * BASE_PATH och CACHE_VERSION nedan hålls i synk med next.config.ts
 * respektive innehållet i `out/` av scripts/generate-sw-precache.mjs, som
 * körs på `out/sw.js` efter `next build`. `public/sw.js` (den här filen)
 * ändras aldrig av byggskriptet — det är källan med platshållarna intakta.
 */

const BASE_PATH = '/ovningskorning-webapp';

// Ersätts vid bygget med en hash av innehållet i `out/` — ändrat innehåll
// ger automatiskt ett nytt versionsnamn, vilket gör att `activate` städar
// bort den gamla cachen. Utan det växer gammal cache obegränsat.
const CACHE_VERSION = '__CACHE_VERSION__';

const PRECACHE_NAME = `ovningskorning-precache-${CACHE_VERSION}`;
const RUNTIME_NAME = `ovningskorning-runtime-${CACHE_VERSION}`;
const OFFLINE_URL = `${BASE_PATH}/offline.html`;

// Ersätts vid bygget med de faktiska, hashade filnamnen från `out/`. Rör
// inte formatet på arrayen — byggskriptet matchar den med en regex.
const PRECACHE_URLS = [
  // PRECACHE_URLS_PLACEHOLDER
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== PRECACHE_NAME && key !== RUNTIME_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Hantera bara GET — POST m.m. ska passera orört.
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Rör inte förfrågningar mot andra origin (typsnitt från CDN etc. finns
  // inte i den här appen, men principen är att aldrig anta att vi äger dem).
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(request));
    return;
  }

  if (isStaticAsset(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith(networkFirst(request));
});

function isStaticAsset(pathname) {
  return (
    pathname.startsWith(`${BASE_PATH}/_next/static/`) ||
    /\.(?:png|jpg|jpeg|svg|ico|webmanifest|woff2?|css)$/.test(pathname)
  );
}

async function handleNavigation(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(RUNTIME_NAME);
    cache.put(request, response.clone());
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;

    const offline = await caches.match(OFFLINE_URL);
    if (offline) return offline;

    return new Response('Offline och sidan är inte sparad sedan tidigare.', {
      status: 503,
      statusText: 'Offline',
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    const cache = await caches.open(RUNTIME_NAME);
    cache.put(request, response.clone());
    return response;
  } catch {
    return new Response('', { status: 504, statusText: 'Offline' });
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(RUNTIME_NAME);
    cache.put(request, response.clone());
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    return new Response('', { status: 504, statusText: 'Offline' });
  }
}
