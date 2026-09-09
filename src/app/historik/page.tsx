'use client';

import { useEffect, useState } from 'react';
import content from '@/content';
import { PageBody, PageHeader, PageShell } from '@/components/ui/page-shell';
import { getKördaPass, uppdateraUtfall } from '@/storage/storage';
import type { Passpost, Passutfall } from '@/storage/types';

const namnPerMoment = new Map(content.skills.map((skill) => [skill.id, skill.name]));

export default function HistorikPage() {
  const [pass, setPass] = useState<Passpost[] | null>(null);

  useEffect(() => {
    setPass([...getKördaPass()].reverse());
  }, []);

  function ändraUtfall(utfall: Passutfall) {
    if (uppdateraUtfall(utfall)) setPass([...getKördaPass()].reverse());
  }

  return (
    <PageShell>
      <PageHeader back={{ href: '/plan', label: 'Ordning' }} title="Historik" />
      <PageBody>
        {pass !== null &&
          (pass.length === 0 ? (
            <p className="text-lg text-ink">Inga körda pass än.</p>
          ) : (
            <ul className="divide-y divide-line border-y border-line">
              {pass.map((post, index) => (
                <li key={`${post.datum}-${index}`} className="py-4">
                  <p className="text-base text-ink-2">
                    {formatDatum(post.datum)} · {utfallEtikett(post.utfall)}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-ink">
                    {post.momentIds
                      .map((momentId) => namnPerMoment.get(momentId))
                      .filter((namn): namn is string => namn !== undefined)
                      .join(', ')}
                  </p>
                  {post.nastaGang && (
                    <p className="mt-1 text-base text-ink-2">Nästa gång: {post.nastaGang}</p>
                  )}
                  {index === 0 && <ÄndraUtfall valt={post.utfall} onÄndra={ändraUtfall} />}
                </li>
              ))}
            </ul>
          ))}
      </PageBody>
    </PageShell>
  );
}

function formatDatum(datum: string) {
  return new Date(datum).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long' });
}

function utfallEtikett(utfall: Passpost['utfall']) {
  return utfall === 'bra' ? 'Gick bra' : utfall === 'sadar' ? 'Sådär' : 'Ta om';
}

function ÄndraUtfall({
  valt,
  onÄndra,
}: {
  valt: Passutfall;
  onÄndra: (utfall: Passutfall) => void;
}) {
  const utfall: Passutfall[] = ['bra', 'sadar', 'taom'];

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      <span className="text-sm text-ink-3">Ändra till:</span>
      {utfall
        .filter((alternativ) => alternativ !== valt)
        .map((alternativ) => (
          <button
            key={alternativ}
            type="button"
            onClick={() => onÄndra(alternativ)}
            className="min-h-12 shrink-0 rounded-[var(--radius-sm)] border border-line-strong bg-surface px-3 text-base font-semibold text-ink transition-colors duration-150 active:bg-surface-sunken active:duration-0 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {utfallEtikett(alternativ)}
          </button>
        ))}
    </div>
  );
}
