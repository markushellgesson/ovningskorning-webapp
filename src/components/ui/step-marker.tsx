interface StepMarkerProps {
  number: number;
  /**
   * Bakgrunden måste vara opak och matcha ytan bakom: på ordningssidan
   * täcker cirkeln rälsen, och i ett kort skulle sidbakgrundens ton synas
   * som en smutsig fläck. Därför en av två kända ytor, aldrig valfri klass.
   */
  tone?: 'overlay' | 'raised';
}

/**
 * Stegnummer i en cirkel. Konturerad, inte fylld: många fyllda mörka
 * cirklar i rad väger mer än rubrikerna de sitter bredvid. Konturen i
 * primärfärg klarar 3:1 mot båda ytorna i båda färglägena.
 */
export function StepMarker({ number, tone = 'overlay' }: StepMarkerProps) {
  const surface = tone === 'raised' ? 'bg-surface-raised' : 'bg-surface-overlay';
  return (
    <span
      aria-hidden="true"
      className={`relative z-[2] flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-pill)] border-2 border-primary-500 text-lg font-semibold text-text-primary tabular-nums ${surface}`}
    >
      {number}
    </span>
  );
}
