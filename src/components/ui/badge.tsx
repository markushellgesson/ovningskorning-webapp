import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'neutral' | 'continuous' | 'attention' | 'safety' | 'progress';
  size?: 'sm' | 'md';
}

const SIZES = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
} as const;

/**
 * Varningsmärket (docs/designsprak.md 5.2, 6).
 *
 * Vägmärkets grammatik är fält + bård. Här: gult fält, 2 px röd bård direkt
 * i kanten, mörk text — radius 6, för skyltar är hårdare i hörnen än kort.
 * Kulörerna är skyltkulörer och vänder inte med färgläget; märket ser
 * likadant ut i mörker, och det är bården som gör att det syns.
 *
 * Texten kan inte vara --ink: --ink vänder med färgläget och skulle bli
 * nästan vit mot gult i nattläge. --sign-ink är den konstanta mörka, 10:1
 * mot --sign-yellow.
 *
 * Rött är bård och kontur, aldrig fyllnadsyta: 61 av 72 moment är
 * säkerhetskritiska, och en röd yta per moment vore brus.
 */
export function Varningsmarke({
  children,
  size = 'md',
}: {
  children: ReactNode;
  size?: 'sm' | 'md';
}) {
  return (
    <span
      className={`inline-flex items-center rounded-[var(--radius-sign)] border-2 border-sign-red bg-sign-yellow font-semibold whitespace-nowrap text-sign-ink ${SIZES[size]}`}
    >
      {children}
    </span>
  );
}

/**
 * Markören "!" i en liten gul triangel med röd kant — punktmarkören i
 * "Vanliga misstag". Samma grammatik som varningsmärket, minsta möjliga
 * format. Dekorativ: raden bredvid säger redan vad det är.
 */
export function Varningstriangel({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 18"
      width="20"
      height="18"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M10 1.5 L18.8 16.5 H1.2 Z"
        fill="var(--sign-yellow)"
        stroke="var(--sign-red)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <text
        x="10"
        y="14.6"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="11"
        fontWeight="700"
        fill="var(--sign-ink)"
      >
        !
      </text>
    </svg>
  );
}

/**
 * "Tränas löpande" — neutral chip med en 3 px HELDRAGEN blå linje till
 * vänster (docs/designsprak.md 7.3, 7.5).
 *
 * Heldragen linje betyder att man inte lämnar den. Det är samma grammatik
 * som vägens streckade mittlinje, bara i motsats — och därför är det just
 * den formen momenten som tränas genom hela utbildningen får, i stället för
 * en andra färgad etikett bredvid varningsmärket.
 */
export function Lopandemarke({
  children,
  size = 'md',
}: {
  children: ReactNode;
  size?: 'sm' | 'md';
}) {
  return (
    <span
      className={`inline-flex items-center rounded-[var(--radius-sign)] border border-line-strong border-l-[3px] border-l-blue-text bg-surface font-semibold whitespace-nowrap text-ink-2 ${SIZES[size]}`}
    >
      {children}
    </span>
  );
}

/**
 * StatusBadge — den etikett sidorna redan anropar.
 *
 * Bär de nya utseendena så att befintliga anrop fortsätter fungera:
 * `safety` är varningsmärket, `continuous` är den heldragna linjen, och
 * `neutral` är den lugna chippen som fraskortens typ och övningarnas
 * svårighetsgrad använder — ett piller i nedsänkt ton, inget föremål.
 * Aldrig färg ensamt: varje variant bär sin betydelse i text.
 */
export function StatusBadge({ children, variant = 'neutral', size = 'sm' }: BadgeProps) {
  if (variant === 'safety') return <Varningsmarke size={size}>{children}</Varningsmarke>;
  if (variant === 'continuous') return <Lopandemarke size={size}>{children}</Lopandemarke>;

  const variants = {
    neutral: 'bg-surface-sunken text-ink-2 border-line',
    attention: 'bg-yellow-tint text-attention-800 border-attention-200',
    progress: 'bg-green-tint text-progress-800 border-progress-200',
  } as const;

  return (
    <span
      className={`inline-flex items-center rounded-[var(--radius-sm)] border font-medium whitespace-nowrap ${variants[variant]} ${SIZES[size]}`}
    >
      {children}
    </span>
  );
}
