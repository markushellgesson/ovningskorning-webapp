import Link from 'next/link';
import type { ReactNode } from 'react';

interface RowLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/**
 * En rad i en lista som går att trycka på. Raden är själv affordansen —
 * ingen pil: i en lista där varje rad är en länk säger sjuttio pilar
 * ingenting som inte raden redan säger.
 *
 * Träffytan är minst 48 px och sträcker sig 8 px ut i marginalen på var
 * sida (-mx-2 / px-2), så att tryckåterkopplingen täcker hela raden utan
 * att texten flyttar sig. Tonen slår till på 0 ms och tonar ut på 150 ms —
 * se kommentaren om tryckåterkoppling i globals.css.
 */
export function RowLink({ href, children, className = '' }: RowLinkProps) {
  return (
    <Link
      href={href}
      className={`-mx-2 flex min-h-12 items-center rounded-[var(--radius-sm)] px-2 py-3 transition-colors duration-150 hover:bg-neutral-200 active:bg-neutral-300 active:duration-0 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none ${className}`}
    >
      {children}
    </Link>
  );
}
