import Link from 'next/link';
import type { ReactNode } from 'react';

import { Antalschip } from './antalschip';

interface VagvisareProps {
  href: string;
  /** Destinationens namn — vägvisarens stora text, 700. */
  title: string;
  /** Underraden. Utelämnas på korta vägvisare (Föregående/Nästa). */
  description?: ReactNode;
  /** Stolpsiffra i vit chip till höger, t.ex. antalet moment. Utan värde ritas ingen chip. */
  count?: number;
  /** Spetsens riktning. Höger = vidare, vänster = tillbaka. */
  direction?: 'right' | 'left';
  className?: string;
}

/** Spetsens bredd i px. Samma i båda riktningarna. */
const TIP = 26;

/**
 * Vägvisaren — appens riktningsföremål (docs/designsprak.md 6).
 *
 * Blått fält med vit bård och den ena kortsidan spetsad till en pil. Grönt
 * betyder "vi" (skylten); blått betyder "riktning", och därför är alla
 * vägvisare blå — även när de pekar mot tre olika destinationer. Tre olika
 * skyltkulörer för de tre destinationerna prövades och valdes bort: det gör
 * kulörerna till dekor, och Ordning är inte mer "grön" än Moment.
 *
 * Spetsen är en egen SVG med `preserveAspectRatio="none"`, absolut placerad
 * utanför fältets kortsida och sträckt till 100 % höjd. Det är det som gör
 * att den fungerar för valfri höjd: en `clip-path` eller en CSS-triangel av
 * borders hade behövt känna till höjden i förväg, och en vägvisare med två
 * rader beskrivning är högre än en med noll. Bårdens snedställda del ritas
 * i samma SVG med `vector-effect="non-scaling-stroke"`, så att den behåller
 * sina 2 px oavsett hur mycket sträckningen skalar y-axeln.
 *
 * Bården är inte dekoration: den är det som gör att skylten syns mot mörkret
 * i nattläget. Därför är både fält och bård konstanta kulörer — de vänder
 * inte med färgläget.
 *
 * Tryck mörknar fältet ett steg med --press-veil. Aldrig storlek: en skylt
 * som krymper när man rör vid den läser som en knapp, inte som ett föremål.
 */
export function Vagvisare({
  href,
  title,
  description,
  count,
  direction = 'right',
  className = '',
}: VagvisareProps) {
  const left = direction === 'left';

  return (
    <Link
      href={href}
      className={`group relative flex min-h-[72px] items-center gap-3 bg-sign-blue py-3.5 text-sign-white transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none ${
        left
          ? 'ml-[26px] flex-row-reverse rounded-r-[var(--radius-sm)] pr-[18px] pl-3'
          : 'mr-[26px] rounded-l-[var(--radius-sm)] pr-3 pl-[18px]'
      } ${className}`}
    >
      {/* Bården: 2 px vit, 5 px innanför kanten, öppen mot spetsen så att
       * den fortsätter i SVG:n utan skarv. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-[5px] bottom-[5px] border-2 border-sign-white ${
          left
            ? 'right-[5px] left-0 rounded-r-[4px] border-l-0'
            : 'right-0 left-[5px] rounded-l-[4px] border-r-0'
        }`}
      />

      <span className="relative min-w-0 flex-1">
        <span className="block text-xl leading-tight font-bold tracking-[-0.01em]">{title}</span>
        {description && (
          <span className="mt-1 block text-sm leading-snug text-sign-white/90">{description}</span>
        )}
      </span>

      {/* Antalet, som talet på en kilometertavla. Chip och inte stolpe:
          chippet är ett antal, stolpen ett ordningstal. */}
      {count != null && <Antalschip>{count}</Antalschip>}

      {/* Spetsen. Ligger utanför fältet och tar sin höjd från det. */}
      <span
        aria-hidden="true"
        className={`absolute top-0 block h-full ${left ? 'right-full -scale-x-100' : 'left-full'}`}
        style={{ width: TIP }}
      >
        <svg
          viewBox={`0 0 ${TIP} 100`}
          preserveAspectRatio="none"
          className="block h-full"
          style={{ width: TIP }}
        >
          <path d={`M0 0 L${TIP} 50 L0 100 Z`} fill="var(--sign-blue)" />
          <path
            d={`M0 5 L${TIP} 50 L0 95`}
            fill="none"
            stroke="var(--sign-white)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </span>

      {/* Tryckslöjan. Täcker fältet men inte spetsen — spetsen är en egen
       * SVG och skulle behöva en egen slöja; att fältet mörknar räcker som
       * kvitto på att trycket tog. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[var(--press-veil)] opacity-0 transition-opacity duration-150 group-active:opacity-100 group-active:duration-0"
      />
    </Link>
  );
}
