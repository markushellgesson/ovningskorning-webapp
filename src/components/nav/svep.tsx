'use client';

import { useRef, type ReactNode, type TouchEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const FLIKAR = ['/plan', '/', '/skills'] as const;
const KANT = 24;
const HORISONTELL_TRÖSKEL = 70;
const VERTIKAL_TRÖSKEL = 40;

/** Svep hör bara hemma mellan de tre jämställda flikarna, aldrig i deras detaljsidor. */
export function Svep({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const start = useRef<{ x: number; y: number; tillåten: boolean } | null>(null);

  function börja(e: TouchEvent<HTMLDivElement>) {
    const touch = e.touches[0];
    if (!touch) return;
    start.current = {
      x: touch.clientX,
      y: touch.clientY,
      tillåten: touch.clientX >= KANT && touch.clientX <= window.innerWidth - KANT,
    };
  }

  function avsluta(e: TouchEvent<HTMLDivElement>) {
    const första = start.current;
    start.current = null;
    const touch = e.changedTouches[0];
    // Exporten har trailingSlash, så usePathname ger "/plan/" — inte "/plan".
    // Utan normaliseringen blev index −1 på Ordning och Moment, och svepet
    // gjorde tyst ingenting där. Hittat med syntetiska touch-händelser i
    // den byggda exporten; en statisk kontroll av markup hade inte sett det.
    const utanSnedstreck = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
    const index = FLIKAR.indexOf(utanSnedstreck as (typeof FLIKAR)[number]);
    if (!första || !touch || !första.tillåten || index === -1) return;

    const horisontellt = touch.clientX - första.x;
    const vertikalt = touch.clientY - första.y;
    if (Math.abs(horisontellt) < HORISONTELL_TRÖSKEL || Math.abs(vertikalt) > VERTIKAL_TRÖSKEL)
      return;

    const nästa = horisontellt < 0 ? index + 1 : index - 1;
    if (nästa >= 0 && nästa < FLIKAR.length) router.push(FLIKAR[nästa]);
  }

  return (
    <div className="flex flex-1 flex-col touch-pan-y" onTouchStart={börja} onTouchEnd={avsluta}>
      {children}
    </div>
  );
}
