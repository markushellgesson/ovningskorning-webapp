import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Card (ux-spec 11.4).
 *
 * Informationsgrupp med radius 12px. Elevationen bars av en tunn ram och en
 * svag ytskillnad mot sidbakgrunden, inte av en skugga: en skugga kostar en
 * omritning varje gång kortet rör sig i vyn, och en lista med 47 kort som
 * scrollar är precis det fallet.
 */
export function Card({ children, className = '', padding = 'md' }: CardProps) {
  // Mer luft än Tailwinds normalsteg. Mellanrum är det billigaste sättet
  // att få en yta att se genomtänkt ut — det kostar ingen rendering alls.
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6 sm:p-8',
  };

  return (
    <div
      className={`bg-surface-raised border border-border-subtle rounded-[var(--radius-md)] ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
}

interface SectionHeadingProps {
  children: ReactNode;
  level?: 'h2' | 'h3';
  className?: string;
}

/**
 * SectionHeading (ux-spec 11.4).
 * Semantiskt korrekt rubrik för sektioner.
 */
export function SectionHeading({ children, level = 'h2', className = '' }: SectionHeadingProps) {
  const Tag = level;
  const sizeClass = level === 'h2' ? 'text-2xl' : 'text-lg';

  return (
    <Tag className={`${sizeClass} font-semibold text-text-primary ${className}`}>{children}</Tag>
  );
}

interface EmptyStateProps {
  message: string;
  action?: ReactNode;
}

/**
 * EmptyState (ux-spec 11.4).
 * Visar ett tydligt meddelande när ingen data finns.
 */
export function EmptyState({ message, action }: EmptyStateProps) {
  return (
    <div className="px-4 py-16 text-center">
      <p className="mx-auto max-w-[var(--measure)] text-base text-text-secondary">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
