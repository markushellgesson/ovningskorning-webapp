import localFont from 'next/font/local';

/**
 * Inter Variable — självhostat typsnitt (ADR 0007 uppdaterad: `system-ui`
 * ersatt av ett eget typsnitt).
 *
 * Varför Inter och inte systemtypsnittet:
 * appen läses i bil, ofta i motljus, av en handledare som mycket väl kan
 * vara 55+. Inter är ritat för skärm med hög x-höjd, öppna punsar och
 * tydligt åtskilda tecken (I/l/1 skiljer sig, ö och ä har generösa prickar)
 * — det är läsbarhet, inte smak. `system-ui` ger dessutom olika
 * bokstavsbredder på iOS, Android och Windows, vilket gör att radlängd och
 * radbrytningar i långa listor inte går att designa för.
 *
 * Varför självhostat och inte `next/font/google`:
 * appen ska fungera offline och får inte göra tredjepartsanrop.
 * `next/font/google` hämtar filen vid bygget, men källan här är i stället
 * paketet `@fontsource-variable/inter` i node_modules — inget nätanrop alls,
 * varken vid bygge eller i webbläsaren. `next/font/local` hashar filen in i
 * `_next/static/media/`, vilket gör att service workern precachar den
 * automatiskt tillsammans med resten av `out/`.
 *
 * En enda fil (latin, viktaxel 100–900, ~48 kB woff2) täcker alla vikter
 * appen använder. Svenskans å, ä och ö ligger i latin-subsetet — latin-ext
 * behövs inte.
 */
export const inter = localFont({
  src: '../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
  // Viktaxelns hela spann, så att en enda fil täcker regular till bold.
  weight: '100 900',
  style: 'normal',
  // `swap`: texten ritas direkt med fallbacken och byts när Inter är laddad.
  // Aldrig osynlig text i en app som ska kunna läsas i en stillastående bil
  // med dålig täckning.
  display: 'swap',
  variable: '--font-inter',
  // Next genererar en storleksjusterad fallback-face ur Arials metrik, så
  // att bytet vid `swap` inte flyttar texten.
  adjustFontFallback: 'Arial',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
});
