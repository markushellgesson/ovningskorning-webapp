import Link from 'next/link';
import { Card } from '@/components/ui/card';

export const metadata = {
  title: 'Hem',
};

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-surface-overlay flex flex-col items-center justify-center p-6 pb-24">
      <div className="max-w-2xl w-full space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-text-primary">Övningskörning B</h1>
          <p className="text-xl text-text-secondary">
            Strukturerat stöd för privat övningskörning till B-körkort
          </p>
        </header>

        <Card padding="lg" className="space-y-4">
          <h2 className="text-2xl font-semibold text-text-primary">Vad är detta?</h2>
          <p className="text-lg leading-relaxed text-text-primary">
            Ett verktyg för elev och handledare som strukturerar övningskörningen utifrån de
            kompetenser som krävs för B-körkort. Byggt på Transportstyrelsens kursplan och
            forskning om hur motoriska färdigheter utvecklas.
          </p>
          <p className="text-lg leading-relaxed text-text-primary">
            Den här versionen är en serverlös demo som körs direkt i webbläsaren. All data lagras
            lokalt på din enhet — ingen server, inget konto, ingen inloggning. Data stannar kvar
            tills du rensar webbläsardata.
          </p>
        </Card>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text-primary">Utforska</h2>
          <Link
            href="/skills"
            className="block bg-primary-50 border-2 border-primary-200 rounded-[--radius-md] p-6 hover:bg-primary-100 transition-colors duration-150 min-h-12"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold text-primary-800">Kompetensbibliotek</h3>
                <p className="text-base text-primary-700 mt-1">
                  De 47 momenten du ska träna, strukturerade efter typ och sekvens
                </p>
              </div>
              <span className="text-primary-600 text-xl">→</span>
            </div>
          </Link>
        </section>

        <footer className="text-center text-sm text-text-tertiary pt-8">
          <p>
            Detta är en lokal variant som körs utan server. All data lever bara i din webbläsare.
          </p>
        </footer>
      </div>
    </main>
  );
}
