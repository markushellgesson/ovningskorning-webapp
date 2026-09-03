import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Card (ux-spec 11.4).
 * Informationsgrupp med diskret elevation och radius 12px.
 */
export function Card({ children, className = '', padding = 'md' }: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  return (
    <div
      className={`bg-surface-raised border border-border-subtle rounded-[--radius-md] ${paddingClasses[padding]} ${className}`}
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
  const sizeClass = level === 'h2' ? 'text-lg' : 'text-base';

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
    <div className="text-center py-12 px-4">
      <p className="text-base text-text-secondary mb-4">{message}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
