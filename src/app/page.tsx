import Link from 'next/link';
import { Card } from '@/components/ui/card';

export const metadata = {
  title: 'Hem',
};

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-surface-overlay">
      <div className="mx-auto w-full max-w-2xl px-5 pt-12 pb-28 sm:px-8 sm:pt-20">
        <div className="space-y-12">
          <header className="space-y-3">
            <h1 className="text-4xl font-semibold text-text-primary">Övningskörning B</h1>
            <p className="max-w-[var(--measure)] text-xl text-text-secondary">
              Strukturerat stöd för privat övningskörning till B-körkort
            </p>
          </header>

          <Card padding="lg" className="space-y-5">
            <h2 className="text-2xl font-semibold text-text-primary">Vad är detta?</h2>
            <p className="max-w-[var(--measure)] text-lg text-text-primary">
              Ett verktyg för elev och handledare som strukturerar övningskörningen utifrån de
              kompetenser som krävs för B-körkort. Byggt på Transportstyrelsens kursplan och
              forskning om hur motoriska färdigheter utvecklas.
            </p>
            <p className="max-w-[var(--measure)] text-lg text-text-secondary">
              Den här versionen är en demo som klarar sig utan server och körs direkt i webbläsaren.
              All data lagras lokalt på din enhet — ingen server, inget konto, ingen inloggning. Data
              stannar kvar tills du rensar webbläsardata.
            </p>
          </Card>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-text-primary">Utforska</h2>
            <Link
              href="/skills"
              className="block min-h-12 rounded-[var(--radius-md)] border border-primary-200 bg-primary-50 p-6 transition-colors duration-150 hover:bg-primary-100"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-primary-800">Träningsmoment</h3>
                  <p className="text-base text-primary-700">
                    De 47 momenten du ska träna, ordnade efter område och i den ordning ni bör ta dem
                  </p>
                </div>
                <span aria-hidden="true" className="mt-0.5 shrink-0 text-xl text-primary-600">
                  →
                </span>
              </div>
            </Link>
          </section>

          <footer className="border-t border-border-subtle pt-8">
            <p className="max-w-[var(--measure)] text-sm text-text-tertiary">
              Detta är en lokal variant som körs utan server. All data finns bara i din webbläsare.
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}
