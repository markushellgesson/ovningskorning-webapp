import localFont from 'next/font/local';

/**
 * Familjen Grotesk Variable — appens enda typsnitt (docs/designsprak.md 4.1).
 *
 * Ritad i Stockholm för skärm, med karaktär i de tunga vikterna: på 700 i
 * 36 px ser "Övningskörning B" ut som något, på 400 i 17 px läser den lika
 * lugnt som Inter gjorde. Bokstäverna har lite av vägskyltarnas robusthet
 * utan att vara ett skylttypsnitt. En familj räcker — hierarkin görs med
 * vikt, storlek och föremål, inte med typsnittsbyten.
 *
 * Varför självhostat och inte `next/font/google`:
 * appen ska fungera offline och får inte göra tredjepartsanrop. Källan är
 * paketet `@fontsource-variable/familjen-grotesk` i node_modules — inget
 * nätanrop alls, varken vid bygge eller i webbläsaren. `next/font/local`
 * hashar filen in i `_next/static/media/`, så service workern precachar
 * den automatiskt tillsammans med resten av `out/`.
 *
 * En enda fil (latin, viktaxel 400–700, ~19 kB woff2) täcker alla vikter
 * appen använder. Svenskans å, ä och ö ligger i latin-subsetet — latin-ext
 * behövs inte.
 */
export const familjenGrotesk = localFont({
  src: '../../node_modules/@fontsource-variable/familjen-grotesk/files/familjen-grotesk-latin-wght-normal.woff2',
  // Viktaxelns hela spann, så att en enda fil täcker regular till bold.
  weight: '400 700',
  style: 'normal',
  // `swap`: texten ritas direkt med fallbacken och byts när typsnittet är
  // laddat. Aldrig osynlig text i en app som ska kunna läsas i en
  // stillastående bil med dålig täckning.
  display: 'swap',
  variable: '--font-familjen-grotesk',
  // Next genererar en storleksjusterad fallback-face ur Arials metrik, så
  // att bytet vid `swap` inte flyttar texten.
  adjustFontFallback: 'Arial',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
});
