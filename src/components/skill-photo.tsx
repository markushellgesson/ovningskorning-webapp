import Image from 'next/image';
import Link from 'next/link';
import type { PhotoCredit } from '@/content/photo-credits';
import { BASE_PATH } from '@/lib/base-path';

/**
 * Visar ett miljöfoto vid det moment det illustrerar.
 *
 * Fotot är en miljöbild, inte ett facit — bildtexten beskriver bara vad
 * miljön är, inte hur man ska köra eller vad förarna på bilden gör rätt
 * eller fel. Regler och teknik står i momentets egen text och i eventuella
 * diagram; fotot kompletterar dem, det ersätter dem inte.
 *
 * next/image lazy-laddar som standard (ingen `priority`), så fotot
 * blockerar inte sidans första rendering och cachas först när det faktiskt
 * visas — samma princip som service workerns precache-lista, som medvetet
 * inte innehåller foton.
 */
export function SkillPhoto({ photo }: { photo: PhotoCredit }) {
  return (
    <figure className="overflow-hidden rounded-[var(--radius-md)] border border-border-subtle bg-surface-raised">
      <div className="relative aspect-[4/3] w-full bg-neutral-100">
        {/* alt="" är avsiktligt: bildtexten nedan innehåller exakt samma
            beskrivning och står i samma <figure>. Med en alt-text skulle en
            skärmläsare läsa upp meningen två gånger i rad. Beskrivningen
            försvinner inte — den bärs av <figcaption>. */}
        <Image
          src={`${BASE_PATH}/photos/${photo.filename}`}
          alt=""
          fill
          sizes="(min-width: 672px) 640px, 100vw"
          className="object-cover"
        />
      </div>
      <figcaption className="space-y-1.5 px-4 py-3 sm:px-6">
        <p className="text-sm text-text-secondary">{photo.altText}</p>
        <p className="text-xs text-text-tertiary">
          Foto: {photo.photographer},{' '}
          {photo.licenseUrl ? (
            <a
              href={photo.licenseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-text-secondary"
            >
              {photo.license}
            </a>
          ) : (
            photo.license
          )}{' '}
          ·{' '}
          <Link href="/bilder" className="underline hover:text-text-secondary">
            Fler bildkällor
          </Link>
        </p>
      </figcaption>
    </figure>
  );
}
