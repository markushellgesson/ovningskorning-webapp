'use client';

/**
 * Mobil bottom navigation — lokal variant (ADR 0013).
 *
 * Huvudappens nav har fem flikar (Hem, Kör, Träning, Framsteg, Profil) och
 * ett inloggningsberoende. Den lokala varianten saknar konto och har bara
 * tre sidor i navigationen — startsida, träningsmoment och ordning — så
 * navigationen begränsas till det som faktiskt finns. Råden till
 * handledaren nås som extern länk från Ordning.
 *
 * "Ordning" är sidans namn överallt: här, i sidhuvudet och på startsidan.
 * Den hette en tid "Träningskarta" i sidhuvudet men "Ordning" här, och ett
 * namn som byter mellan flik och rubrik ser ut som två olika sidor. Ordning
 * vann därför att det är frågan sidan svarar på — i vilken ordning tar vi
 * momenten? — medan "karta" lovar geografi som sidan inte har.
 *
 * Form (docs/designsprak.md 6.1): ett asfaltband i BÅDA färglägena, med
 * flikarna i --marking-dim och den aktiva fliken i --marking 700 med ett
 * 3 px heldraget streck ovanför — en vägmarkering, inte en färgad flik. I
 * mörkt läge lyser streck och etikett statiskt, som en markering i
 * strålkastarljus.
 *
 * Grönt används inte här: på asfalt är det vita som syns, och navigeringen
 * ska inte konkurrera med skylten ovanför. Blått inte heller — blått är
 * riktning ut i innehållet, och en flik som lyser blå skulle läsa som en
 * vägvisare i stället för som en markering i vägbanan.
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { href: '/', label: 'Nästa pass' },
  { href: '/skills', label: 'Träningsmoment' },
  { href: '/plan', label: 'Ordning' },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Huvudnavigation"
      // pb-[env(safe-area-inset-bottom)] håller flikarna ovanför iPhones
      // hemindikator — layouten använder viewport-fit=cover. Ingen ram mot
      // sidan: kontrasten mellan asfalt och botten är kanten i ljust läge,
      // och i mörkt läge är det markeringarna som visar var bandet går.
      className="sticky bottom-0 z-10 bg-asphalt pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="mx-auto flex max-w-md">
        {TABS.map((tab) => {
          const active =
            pathname === tab.href || (tab.href !== '/' && pathname.startsWith(`${tab.href}/`));
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                aria-current={active ? 'page' : undefined}
                // Träffytan är 56 px. Trycket tonas med en slöja i stället
                // för med en ljusare bakgrund: asfalten är nästan botten i
                // mörkt läge, och en ton därifrån syns inte.
                className={`flex min-h-14 items-center justify-center border-t-[3px] px-2 text-base transition-colors duration-150 active:bg-[var(--press-veil)] active:duration-0 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none ${
                  active
                    ? // Aktiv flik markeras med vikt OCH ett heldraget
                      // streck, aldrig med enbart färg (WCAG 2.2 AA).
                      'border-t-marking font-bold text-marking'
                    : 'border-t-transparent text-marking-dim'
                }`}
                // Glöden sitter på etiketten, som är markeringen. Inte på
                // fliken som helhet — då hade hela rutan lyst, och det är
                // inte en vägmarkering utan en lampa.
                style={active ? { textShadow: 'var(--glow-text)' } : undefined}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
