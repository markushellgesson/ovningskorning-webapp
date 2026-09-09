'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Stolpe } from '@/components/ui/stolpe';
import { Vag, Vagstation } from '@/components/ui/asfaltband';
import { Meta, Section, SectionTitle } from '@/components/ui/section';
import { ärAvslutat, getKördaPass, getPasslogg, härledPosition } from '@/storage/storage';
import type { Passpost } from '@/storage/types';
import type { PassSteg } from './typer';

export interface OrdningSteg {
  nummer: number;
  titel: string;
  antalPass: number;
}

/**
 * Vägen på Ordning, med framsteget inritat.
 *
 * Stolparna säger var paret är: passerade steg är gröna med en bock, nästa
 * steg har grön bård, resten är blå. Det var ett beslut som en gång valdes
 * bort med motiveringen att det inte fanns någon status att visa — nu finns
 * det en, och den är sann, eftersom nästa pass härleds ur avslutade poster
 * medan "Ta om" låter passet ligga kvar.
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
export function OrdningLista({ steg, passSteg }: { steg: OrdningSteg[]; passSteg: PassSteg[] }) {
  const [aktuellt, setAktuellt] = useState<number | null>(null);
  const [gjorda, setGjorda] = useState<Record<number, number>>({});
  const [räkning, setRäkning] = useState<{
    körda: number;
    gjorda: number;
    sedan: string;
    harRedan: boolean;
  } | null>(null);
  const [attTaOm, setAttTaOm] = useState<Passpost[]>([]);

  useEffect(() => {
    setAktuellt(härledPosition(passSteg).steg);
    setGjorda(
      Object.fromEntries(
        passSteg.map((ettSteg) => [
          ettSteg.nummer,
          ettSteg.grupper.filter((_, grupp) => ärAvslutat(ettSteg.nummer, grupp)).length,
        ]),
      ),
    );
    const logg = getPasslogg();
    const körda = getKördaPass();
    if (körda.length > 0) {
      const första = new Date(körda[0].datum);
      setRäkning({
        körda: körda.length,
        gjorda: new Set(
          logg
            .filter((post) => post.utfall !== 'taom')
            .map((post) => `${post.steg}:${post.grupp}`),
        ).size,
        sedan: första.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long' }),
        harRedan: logg.some((post) => post.utfall === 'redan'),
      });
    }
    const senasteKörda = new Map<string, Passpost>();
    körda.forEach((post) => senasteKörda.set(`${post.steg}:${post.grupp}`, post));
    setAttTaOm(
      [...senasteKörda.values()]
        .filter((post) => post.utfall === 'sadar' || post.utfall === 'taom')
        .sort((a, b) => a.steg - b.steg || a.grupp - b.grupp),
    );
  }, [passSteg]);

  return (
    <>
      {räkning && (
        <p className="mt-3 text-base text-ink-2">
          {räkning.harRedan
            ? `${räkning.gjorda} pass gjorda · ${räkning.körda} körda med appen sedan ${räkning.sedan}`
            : `${räkning.körda} pass sedan ${räkning.sedan}`}
        </p>
      )}
      <Vag className="mt-6">
        <ol>
          {steg.map((s) => {
            const antalGjorda = gjorda[s.nummer] ?? 0;
            const status =
              aktuellt === null
                ? undefined
                : antalGjorda === s.antalPass
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
                    <Meta>
                      {s.antalPass} pass
                      {antalGjorda > 0 && ` · ${antalGjorda} ${antalGjorda === 1 ? 'gjort' : 'gjorda'}`}
                    </Meta>
                  </span>
                </Link>
              </Vagstation>
            );
          })}
        </ol>
      </Vag>

      {attTaOm.length > 0 && (
        <Section>
          <SectionTitle accent="var(--sign-yellow)" accentBorder>
            Att ta om
          </SectionTitle>
          <ul className="mt-[18px] max-w-[var(--measure)] divide-y divide-line">
            {attTaOm.map((post) => {
              const grupp = passSteg.find((ettSteg) => ettSteg.nummer === post.steg)?.grupper[post.grupp];
              if (!grupp) return null;
              return (
                <li key={`${post.steg}:${post.grupp}`}>
                  <Link
                    href={`/plan/${post.steg}`}
                    className="flex min-h-14 items-center gap-3 py-2 text-base transition-colors duration-150 active:bg-surface-sunken active:duration-0 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    <Stolpe number={post.steg} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-ink">
                        {grupp.moment.map((moment) => moment.namn).join(', ')}
                      </span>
                      <span className="block text-sm text-ink-3">
                        {post.utfall === 'sadar' ? 'Sådär' : 'Ta om'} · {formatDatum(post.datum)}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Section>
      )}
    </>
  );
}

function formatDatum(datum: string) {
  return new Date(datum).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long' });
}
