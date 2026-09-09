'use client';

import { useEffect, useState } from 'react';
import content from '@/content';
import { PageBody, PageHeader, PageShell } from '@/components/ui/page-shell';
import { getKördaPass } from '@/storage/storage';
import type { Passpost } from '@/storage/types';

const namnPerMoment = new Map(content.skills.map((skill) => [skill.id, skill.name]));

export default function HistorikPage() {
  const [pass, setPass] = useState<Passpost[] | null>(null);

  useEffect(() => {
    setPass([...getKördaPass()].reverse());
  }, []);

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
