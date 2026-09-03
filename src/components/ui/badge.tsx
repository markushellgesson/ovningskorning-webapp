import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'neutral' | 'attention' | 'safety' | 'progress';
  size?: 'sm' | 'md';
}

/**
 * StatusBadge (ux-spec 11.4, kap. 1).
 * Aldrig färg ensamt — alltid text + ikon/mönster (WCAG 2.2 AA).
 */
export function StatusBadge({ children, variant = 'neutral', size = 'sm' }: BadgeProps) {
  const variants = {
    neutral: 'bg-neutral-100 text-neutral-700 border-neutral-200',
    attention: 'bg-attention-100 text-attention-800 border-attention-200',
    safety: 'bg-safety-100 text-safety-800 border-safety-200',
    progress: 'bg-progress-100 text-progress-800 border-progress-200',
  };

  const sizes = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center font-medium border rounded-[var(--radius-pill)] whitespace-nowrap ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </span>
  );
}
