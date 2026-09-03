/**
 * DrivingSession lifecycle-validering enligt ADR 0004.
 *
 * State machine:
 *   PLANNED → READY → IN_PROGRESS → COMPLETED → REFLECTED
 *              ↓              ↓
 *           CANCELLED ← CANCELLED (undantagsfall)
 *
 * Detta är en ren funktion som validerar tillåtna övergångar.
 * Ogiltiga övergångar ska avvisas i domänlagret, inte bara döljas i UI.
 */

export type SessionStatus =
  'PLANNED' | 'READY' | 'IN_PROGRESS' | 'COMPLETED' | 'REFLECTED' | 'CANCELLED';

export interface SessionLifecycleData {
  status: SessionStatus;
  startedAt?: Date | null;
  endedAt?: Date | null;
}

export interface LifecycleTransition {
  from: SessionStatus;
  to: SessionStatus;
}

export interface LifecycleValidationResult {
  allowed: boolean;
  reason?: string;
}

/**
 * Tillåtna övergångar enligt ADR 0004.
 */
const ALLOWED_TRANSITIONS: LifecycleTransition[] = [
  { from: 'PLANNED', to: 'READY' },
  { from: 'PLANNED', to: 'CANCELLED' },
  { from: 'READY', to: 'IN_PROGRESS' },
  { from: 'READY', to: 'CANCELLED' },
  { from: 'IN_PROGRESS', to: 'COMPLETED' },
  { from: 'COMPLETED', to: 'REFLECTED' },
  { from: 'COMPLETED', to: 'CANCELLED' }, // undantagsfall
];

/**
 * Kontrollera om en övergång är giltig.
 *
 * @param current - Nuvarande sessionstillstånd
 * @param targetStatus - Måltillstånd
 * @returns Valideringsresultat med skäl om ogiltigt
 */
export function validateTransition(
  current: SessionLifecycleData,
  targetStatus: SessionStatus,
): LifecycleValidationResult {
  // Ingen övergång om redan i måltillstånd
  if (current.status === targetStatus) {
    return {
      allowed: false,
      reason: `Sessionen är redan i tillstånd ${targetStatus}`,
    };
  }

  // Kontrollera om övergången finns i listan över tillåtna
  const transitionAllowed = ALLOWED_TRANSITIONS.some(
    (t) => t.from === current.status && t.to === targetStatus,
  );

  if (!transitionAllowed) {
    return {
      allowed: false,
      reason: `Övergång från ${current.status} till ${targetStatus} är inte tillåten`,
    };
  }

  // Ytterligare villkor för vissa övergångar
  if (targetStatus === 'IN_PROGRESS' && current.status === 'READY') {
    // IN_PROGRESS kräver ingen extra validering — startedAt sätts vid övergången
    return { allowed: true };
  }

  if (targetStatus === 'COMPLETED' && current.status === 'IN_PROGRESS') {
    // COMPLETED kräver att sessionen har en startedAt
    if (!current.startedAt) {
      return {
        allowed: false,
        reason: 'Kan inte avsluta session utan startedAt',
      };
    }
    return { allowed: true };
  }

  if (targetStatus === 'REFLECTED' && current.status === 'COMPLETED') {
    // REFLECTED kräver att sessionen är COMPLETED
    // Själva reflektionen valideras separat (minst elevreflektion krävs)
    return { allowed: true };
  }

  // Övriga giltiga övergångar tillåts
  return { allowed: true };
}

/**
 * Kontrollera om en session är i ett slutgiltigt tillstånd.
 */
export function isTerminalState(status: SessionStatus): boolean {
  return status === 'REFLECTED' || status === 'CANCELLED';
}

/**
 * Kontrollera om en session är aktiv (pågående körning).
 */
export function isActive(status: SessionStatus): boolean {
  return status === 'IN_PROGRESS';
}

/**
 * Beräkna körtidens längd i minuter från timestamps.
 * Returnerar null om startedAt eller endedAt saknas.
 */
export function calculateDrivingMinutes(
  startedAt: Date | null | undefined,
  endedAt: Date | null | undefined,
): number | null {
  if (!startedAt || !endedAt) {
    return null;
  }

  const durationMs = endedAt.getTime() - startedAt.getTime();
  return Math.round(durationMs / 60000);
}

/**
 * Detektera om en session verkar ha glömts öppen (edge case enligt ADR 0004).
 *
 * @param startedAt - När sessionen startade
 * @param now - Nuvarande tid
 * @param maxReasonableHours - Maximal rimlig körtid (default 4 timmar)
 * @returns true om sessionen verkar ha glömts öppen
 */
export function isForgottenSession(
  startedAt: Date | null | undefined,
  now: Date,
  maxReasonableHours = 4,
): boolean {
  if (!startedAt) {
    return false;
  }

  const elapsedHours = (now.getTime() - startedAt.getTime()) / (1000 * 60 * 60);
  return elapsedHours > maxReasonableHours;
}
