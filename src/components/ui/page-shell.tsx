import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * Sidskalet — samma yttre mått på alla sidor.
 *
 * Måtten är momentsidans: 20 px sidmarginal på telefon, 32 px från
 * surfplatta, 24/40 px ovanför, och 112 px under så att sista raden aldrig
 * hamnar bakom bottennavigeringen. Bredden är låst till 42 rem för ALLA
 * sidor — även listor. En lista behöver inte mer, och när bredden varierar
 * mellan sidorna hoppar tillbakalänken i sidled vid varje navigering.
 *
 * Bakgrunden är --surface-overlay, inte --surface-base: ett steg mörkare
 * än vitt ger mindre bländning i solljus, och det är tonen alla kort och
 * markörer i appen är ritade mot.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-dvh bg-surface-overlay">
      <div className="mx-auto w-full max-w-2xl px-5 pt-6 pb-28 sm:px-8 sm:pt-10">{children}</div>
    </main>
  );
}

/**
 * Innehållet under sidhuvudet. 32 px luft mellan varje block — samma mått
 * som avsnitten på momentsidan (se section.tsx), så att en sida som blandar
 * fri text, listor och avsnitt ändå har en enda rytm.
 */
export function PageBody({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mt-8 space-y-8 ${className}`}>{children}</div>;
}

interface BackLinkProps {
  href: string;
  children: ReactNode;
}

/**
 * Tillbakalänk med 48 px träffyta. Den negativa vänstermarginalen gör att
 * pilen står i linje med rubriken under, medan träffytan sträcker sig
 * 12 px ut i marginalen.
 */
export function BackLink({ href, children }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="-ml-3 inline-flex min-h-12 items-center rounded-[var(--radius-sm)] px-3 text-base font-medium text-primary-600 transition-colors duration-150 hover:bg-neutral-200 active:bg-surface-sunken active:duration-0 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      ← {children}
    </Link>
  );
}

interface PageHeaderProps {
  /** Utelämnas bara på startsidan, som inte har någon nivå ovanför sig. */
  back?: { href: string; label: string };
  /** Kort etikett ovanför rubriken, t.ex. "Steg 3 av 15". */
  /** ReactNode, inte string: stegsidan sätter en stolpe här. */
  eyebrow?: ReactNode;
  /** Mastodon ovanför rubriken — startsidans skylt. */
  mast?: ReactNode;
  title: string;
  /** Ingressen — en rad eller två, aldrig löpande text. */
  lead?: ReactNode;
  /**
   * Startsidans rubrik är ett steg större (--text-4xl) enligt typskalan i
   * globals.css. Alla undersidor använder --text-3xl.
   */
  display?: boolean;
  /** Metadata som hör till rubriken, t.ex. märken på momentsidan. */
  children?: ReactNode;
}

/**
 * Sidhuvudet — samma rubriknivåer och samma vikt (semibold, aldrig bold)
 * överallt. Vikten är medveten: Inter i bold på 26 px läser som ett
 * nyhetsbrev; semibold räcker för hierarkin när storleken redan skiljer.
 *
 * Utan tillbakalänk får huvudet själv den luft länken annars tar upp, så
 * att startsidans rubrik inte kläms mot webbläsarens adressfält.
 */
export function PageHeader({
  back,
  eyebrow,
  mast,
  title,
  lead,
  display = false,
  children,
}: PageHeaderProps) {
  return (
    <header className={`space-y-3 ${back ? '' : 'pt-6 sm:pt-10'}`}>
      {back && <BackLink href={back.href}>{back.label}</BackLink>}
      {mast && <div className="pb-1">{mast}</div>}
      {eyebrow && (
        <p className="text-sm font-semibold tracking-wide text-text-tertiary uppercase">
          {eyebrow}
        </p>
      )}
      <h1 className={`${display ? 'text-4xl' : 'text-3xl'} font-bold text-text-primary`}>
        {title}
      </h1>
      {lead && <p className="max-w-[var(--measure)] text-xl text-text-secondary">{lead}</p>}
      {children}
    </header>
  );
}
