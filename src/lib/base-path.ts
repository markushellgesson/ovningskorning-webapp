/**
 * Måste matcha `basePath` i next.config.ts.
 *
 * Vid statisk export prefixar Next.js bara `next/link` och `next/image`
 * automatiskt med basePath — manuella referenser till filer i `public/`
 * (manifest, service worker, ikon-hrefs i metadata) gör det inte. Den här
 * konstanten håller de manuella referenserna i synk med next.config.ts på
 * ett enda ställe i stället för att strössla strängen över flera filer.
 */
export const BASE_PATH = '/ovningskorning-webapp';
