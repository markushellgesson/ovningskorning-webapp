'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Stolpe } from '@/components/ui/stolpe';
import { Vag, Vagstation } from '@/components/ui/asfaltband';
import { Meta } from '@/components/ui/section';
import { getCurrentPass, getPasslogg } from '@/storage/storage';

export interface OrdningSteg {
  nummer: number;
  titel: string;
  antalMoment: number;
}

/**
 * Vägen på Ordning, med framsteget inritat.
 *
 * Stolparna säger var paret är: passerade steg är gröna med en bock, nästa
 * steg har grön bård, resten är blå. Det var ett beslut som en gång valdes
 * bort med motiveringen att det inte fanns någon status att visa — nu finns
 * det en, och den är sann, för "Hur gick det?" sätter den och "Ta om" finns.
 *
 * Ovanför vägen står hur många pass paret kört och sedan när. Inte "är vi
 * i tid" — det kan appen inte veta — men en känsla för tid, som femton
 * steg inte ger.
 *
 * Klientkomponent av samma skäl som passvyn: appen är statiskt exporterad
 * och framsteget bor i webbläsaren. Under första renderingen är alla stolpar
 * blå, vilket är exakt vad som gäller för den som inte börjat — ingen
 * blinkning, bara en stolpe som grönas när lagringen svarat.
 */
export function OrdningLista({ steg }: { steg: OrdningSteg[] }) {
  const [aktuellt, setAktuellt] = useState<number | null>(null);
  const [räkning, setRäkning] = useState<{ antal: number; sedan: string } | null>(null);

  useEffect(() => {
    setAktuellt(getCurrentPass()?.steg ?? null);
    const logg = getPasslogg();
    if (logg.length > 0) {
      const första = new Date(logg[0].datum);
      setRäkning({
        antal: logg.length,
        sedan: första.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long' }),
      });
    }
  }, []);

  return (
    <>
      {räkning && (
        <p className="mt-3 text-base text-ink-2">
          {räkning.antal} {räkning.antal === 1 ? 'pass' : 'pass'} sedan {räkning.sedan}
        </p>
      )}
      <Vag className="mt-6">
        <ol>
          {steg.map((s) => {
            const status =
              aktuellt === null
                ? undefined
                : s.nummer < aktuellt
                  ? ('passerat' as const)
                  : s.nummer === aktuellt
                    ? ('nasta' as const)
                    : undefined;
            const läge = status === 'passerat' ? ', passerat' : status === 'nasta' ? ', nästa' : '';

            return (
              <Vagstation key={s.nummer}>
                <Link
                  href={`/plan/${s.nummer}`}
                  className="group relative flex min-h-[72px] items-center gap-[18px] rounded-[var(--radius-sm)] py-2.5 pr-2 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  {/* Tryckslöjan börjar där stolpen slutar, så att den aldrig
                      lägger sig över asfaltbandet. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 -right-2 left-10 rounded-[var(--radius-sm)] bg-surface-sunken opacity-0 transition-opacity duration-150 group-active:opacity-100 group-active:duration-0"
                  />
                  <Stolpe number={s.nummer} status={status} />
                  <span className="relative min-w-0 flex-1">
                    {/* Stolpen är dekor, så steget och dess läge sägs här. */}
                    <span className="sr-only">{`Steg ${s.nummer}${läge}. `}</span>
                    <span className="block text-lg leading-[1.3] font-semibold text-ink">
                      {s.titel}
                    </span>
                    <Meta>{s.antalMoment} moment</Meta>
                  </span>
                </Link>
              </Vagstation>
            );
          })}
        </ol>
      </Vag>
    </>
  );
}
