import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { PHOTO_CREDITS } from '@/content/photo-credits';
import { BASE_PATH } from '@/lib/base-path';

export const metadata = {
  title: 'Bildkällor',
};

export default function BilderPage() {
  return (
    <main className="min-h-dvh bg-surface-overlay p-6 pb-24">
      <div className="mx-auto max-w-2xl space-y-8">
        <header className="space-y-4">
          <Link href="/" className="text-primary-600 hover:underline">
            ← Tillbaka
          </Link>
          <h1 className="text-4xl font-bold text-text-primary">Bildkällor</h1>
          <p className="text-xl text-text-secondary">
            Foton av svenska trafikmiljöer som förekommer i appen, med källa och licens för var och
            en.
          </p>
        </header>

        <Card padding="lg" className="space-y-3">
          <p className="text-base leading-relaxed text-text-primary">
            Samtliga bilder kommer från Wikimedia Commons och är fritt licensierade under CC0, CC BY
            eller CC BY-SA. Licenserna kräver att titel, upphovsperson, källa och licens anges — det
            görs här, per bild. Bilderna är oredigerade.
          </p>
        </Card>

        <ul className="space-y-6">
          {PHOTO_CREDITS.map((photo) => (
            <li key={photo.filename}>
              <Card padding="none" className="overflow-hidden">
                <div className="relative aspect-[4/3] w-full bg-neutral-100">
                  <Image
                    src={`${BASE_PATH}/photos/${photo.filename}`}
                    alt={photo.altText}
                    fill
                    sizes="(min-width: 672px) 640px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2 p-5">
                  <p className="text-sm font-medium text-primary-700">{photo.environment}</p>
                  <p className="text-base text-text-primary">{photo.altText}</p>
                  <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 pt-2 text-sm text-text-secondary">
                    <dt className="text-text-tertiary">Titel</dt>
                    <dd>
                      <a
                        href={photo.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline"
                      >
                        {photo.title}
                      </a>
                    </dd>
                    <dt className="text-text-tertiary">Fotograf</dt>
                    <dd>{photo.photographer}</dd>
                    <dt className="text-text-tertiary">Källa</dt>
                    <dd>Wikimedia Commons</dd>
                    <dt className="text-text-tertiary">Licens</dt>
                    <dd>
                      {photo.licenseUrl ? (
                        <a
                          href={photo.licenseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:underline"
                        >
                          {photo.license}
                        </a>
                      ) : (
                        photo.license
                      )}
                    </dd>
                  </dl>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
