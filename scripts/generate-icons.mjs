/**
 * Rastrerar assets/icon.svg till de PNG-storlekar en installerbar app kräver.
 *
 * PNG:erna committas, så `sharp` behövs bara när ikonen faktiskt ändras:
 *
 *   npm i -D sharp && node scripts/generate-icons.mjs && npm un sharp
 *
 * Skälet att inte behålla beroendet är att sharp är ett tungt native-paket
 * som annars skulle installeras vid varje CI-bygge, för en fil som ändras
 * kanske en gång om året.
 *
 * Maskable-varianten får extra marginal. Android beskär ikoner till cirkel
 * eller squircle beroende på tillverkare, och utan säkerhetszon kapas
 * vägbanans kanter bort.
 */

import sharp from 'sharp';
import { readFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SVG = readFileSync('assets/icon.svg');
const OUT = 'public';
mkdirSync(OUT, { recursive: true });

/** Storlekar: manifest kräver 192 och 512; iOS använder 180. */
const SIZES = [
  { file: 'icon-192.png', size: 192 },
  { file: 'icon-512.png', size: 512 },
  { file: 'apple-touch-icon.png', size: 180 },
];

for (const { file, size } of SIZES) {
  await sharp(SVG, { density: 400 })
    .resize(size, size)
    .png()
    .toFile(join(OUT, file));
  console.log(`${file} (${size}×${size})`);
}

// Maskable: samma motiv nedskalat till 80 %, centrerat på full bakgrund.
// Då överlever motivet varje beskärningsform plattformen väljer.
//
// Bakgrunden MÅSTE vara samma kulör som ikonens egen botten. Är den en
// annan färg syns den som en ram runt ikonen, vilket ser ut som ett fel —
// det hände när ikonen byttes från mörk till ljus botten och den här
// konstanten låg kvar.
const ICON_BACKGROUND = '#faf5f6';

const inner = Math.round(512 * 0.8);
const pad = Math.round((512 - inner) / 2);

await sharp({
  create: {
    width: 512,
    height: 512,
    channels: 4,
    background: ICON_BACKGROUND,
  },
})
  .composite([
    {
      input: await sharp(SVG, { density: 400 }).resize(inner, inner).png().toBuffer(),
      top: pad,
      left: pad,
    },
  ])
  .png()
  .toFile(join(OUT, 'icon-maskable-512.png'));

console.log('icon-maskable-512.png (512×512, 80 % säkerhetszon)');
