'use client';

/**
 * Mobil bottom navigation — lokal variant (ADR 0013).
 *
 * Huvudappens nav har fem flikar (Hem, Kör, Träning, Framsteg, Profil) och
 * ett inloggningsberoende. Den lokala varianten saknar konto och har bara
 * två sidor byggda — startsida och kompetensbibliotek — så navigationen
 * begränsas till det som faktiskt finns.
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { href: '/', label: 'Hem' },
  { href: '/skills', label: 'Träningsmoment' },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Huvudnavigation"
      // pb-[env(safe-area-inset-bottom)] håller flikarna ovanför iPhones
      // hemindikator — layouten använder viewport-fit=cover.
      className="sticky bottom-0 z-10 border-t border-border-default bg-surface-base pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="mx-auto flex max-w-md">
        {TABS.map((tab) => {
          const active = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(`${tab.href}/`));
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                aria-current={active ? 'page' : undefined}
                className={`flex min-h-14 items-center justify-center px-2 text-base transition-colors duration-150 ${
                  active
                    ? // Aktiv flik markeras med både vikt och en linje, aldrig
                      // med enbart färg (WCAG 2.2 AA, ux-spec kap. 9).
                      'border-t-2 border-primary-600 font-semibold text-text-primary'
                    : 'border-t-2 border-transparent text-text-secondary hover:text-text-primary'
                }`}
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
