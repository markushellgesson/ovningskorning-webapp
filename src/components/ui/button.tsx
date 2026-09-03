import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
}

/**
 * PrimaryButton (ux-spec 11.4).
 * Min-höjd 48px, full bredd mobil i kritiska flöden, behåller bredd i loading-state.
 */
export function PrimaryButton({
  children,
  isLoading = false,
  loadingText,
  disabled,
  className = '',
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      className={`
        relative w-full min-h-12
        flex items-center justify-center
        px-4
        border border-transparent
        text-base font-semibold
        rounded-[var(--radius-sm)]
        bg-primary-600 text-on-primary
        hover:bg-primary-700
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--focus-ring)]
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-150
        ${className}
      `
        .trim()
        .replace(/\s+/g, ' ')}
      {...props}
    >
      {isLoading ? loadingText || children : children}
    </button>
  );
}

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/**
 * SecondaryButton (ux-spec 11.4).
 * Min-höjd 48px, visuellt underordnad primärknappen.
 */
export function SecondaryButton({
  children,
  disabled,
  className = '',
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`
        w-full min-h-12
        flex items-center justify-center
        px-4
        border border-border-control
        text-base font-medium
        rounded-[var(--radius-sm)]
        bg-surface-base text-text-primary
        hover:bg-neutral-100
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--focus-ring)]
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-150
        ${className}
      `
        .trim()
        .replace(/\s+/g, ' ')}
      {...props}
    >
      {children}
    </button>
  );
}

interface TertiaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/**
 * TertiaryButton (ux-spec 11.4).
 * Ingen bakgrund eller ram, endast text och hover-state.
 */
export function TertiaryButton({
  children,
  disabled,
  className = '',
  ...props
}: TertiaryButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`
        w-full min-h-12
        flex items-center justify-center
        px-4
        text-base font-medium
        rounded-[var(--radius-sm)]
        text-primary-600
        hover:bg-neutral-100
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--focus-ring)]
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-150
        ${className}
      `
        .trim()
        .replace(/\s+/g, ' ')}
      {...props}
    >
      {children}
    </button>
  );
}

interface DestructiveButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/**
 * DestructiveButton (ux-spec 11.4).
 * Aldrig placerad bredvid primär spara/avsluta-knapp.
 */
export function DestructiveButton({
  children,
  disabled,
  className = '',
  ...props
}: DestructiveButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`
        w-full min-h-12
        flex items-center justify-center
        px-4
        border border-transparent
        text-base font-semibold
        rounded-[var(--radius-sm)]
        bg-safety-600 text-on-safety
        hover:bg-safety-700
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--focus-ring)]
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-150
        ${className}
      `
        .trim()
        .replace(/\s+/g, ' ')}
      {...props}
    >
      {children}
    </button>
  );
}

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  label: string;
}

/**
 * IconButton (ux-spec 11.4).
 * Minst 48px träffyta, skärmläsarnamn obligatoriskt via label.
 */
export function IconButton({
  children,
  label,
  disabled,
  className = '',
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={label}
      className={`
        min-h-12 min-w-12
        inline-flex items-center justify-center
        border border-transparent
        text-base
        rounded-[var(--radius-sm)]
        text-text-primary
        hover:bg-neutral-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--focus-ring)]
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-150
        ${className}
      `
        .trim()
        .replace(/\s+/g, ' ')}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * PrimaryButton som länk.
 *
 * Serverkomponenter kan inte skicka `onClick` till en klientkomponent — det
 * kastar i App Router. Navigering från en serverrenderad sida ska vara en
 * riktig länk ändå: den fungerar utan JavaScript, går att öppna i ny flik,
 * och läses upp som länk av skärmläsare.
 */
export function PrimaryLinkButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="relative flex min-h-12 w-full items-center justify-center rounded-[var(--radius-sm)] border border-transparent bg-primary-600 px-4 text-base font-semibold text-on-primary hover:bg-primary-700 focus:ring-2 focus:ring-[var(--focus-ring)] focus:ring-offset-2 focus:outline-none transition-colors duration-150"
    >
      {children}
    </Link>
  );
}
