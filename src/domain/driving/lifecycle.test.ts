/**
 * Tester för DrivingSession lifecycle enligt ADR 0004.
 */

import { describe, it, expect } from 'vitest';
import {
  validateTransition,
  isTerminalState,
  isActive,
  calculateDrivingMinutes,
  isForgottenSession,
  type SessionLifecycleData,
} from './lifecycle';

describe('validateTransition - giltiga övergångar', () => {
  it('PLANNED → READY är giltig', () => {
    const session: SessionLifecycleData = { status: 'PLANNED' };
    const result = validateTransition(session, 'READY');
    expect(result.allowed).toBe(true);
  });

  it('PLANNED → CANCELLED är giltig', () => {
    const session: SessionLifecycleData = { status: 'PLANNED' };
    const result = validateTransition(session, 'CANCELLED');
    expect(result.allowed).toBe(true);
  });

  it('READY → IN_PROGRESS är giltig', () => {
    const session: SessionLifecycleData = { status: 'READY' };
    const result = validateTransition(session, 'IN_PROGRESS');
    expect(result.allowed).toBe(true);
  });

  it('READY → CANCELLED är giltig', () => {
    const session: SessionLifecycleData = { status: 'READY' };
    const result = validateTransition(session, 'CANCELLED');
    expect(result.allowed).toBe(true);
  });

  it('IN_PROGRESS → COMPLETED är giltig när startedAt finns', () => {
    const session: SessionLifecycleData = {
      status: 'IN_PROGRESS',
      startedAt: new Date('2026-09-02T12:00:00Z'),
    };
    const result = validateTransition(session, 'COMPLETED');
    expect(result.allowed).toBe(true);
  });

  it('COMPLETED → REFLECTED är giltig', () => {
    const session: SessionLifecycleData = {
      status: 'COMPLETED',
      startedAt: new Date('2026-09-02T12:00:00Z'),
      endedAt: new Date('2026-09-02T12:45:00Z'),
    };
    const result = validateTransition(session, 'REFLECTED');
    expect(result.allowed).toBe(true);
  });

  it('COMPLETED → CANCELLED är giltig (undantagsfall)', () => {
    const session: SessionLifecycleData = {
      status: 'COMPLETED',
      startedAt: new Date('2026-09-02T12:00:00Z'),
      endedAt: new Date('2026-09-02T12:45:00Z'),
    };
    const result = validateTransition(session, 'CANCELLED');
    expect(result.allowed).toBe(true);
  });
});

describe('validateTransition - ogiltiga övergångar', () => {
  it('PLANNED → IN_PROGRESS är ogiltig (måste gå via READY)', () => {
    const session: SessionLifecycleData = { status: 'PLANNED' };
    const result = validateTransition(session, 'IN_PROGRESS');
    expect(result.allowed).toBe(false);
    expect(result.reason).toContain('inte tillåten');
  });

  it('PLANNED → COMPLETED är ogiltig', () => {
    const session: SessionLifecycleData = { status: 'PLANNED' };
    const result = validateTransition(session, 'COMPLETED');
    expect(result.allowed).toBe(false);
  });

  it('PLANNED → REFLECTED är ogiltig', () => {
    const session: SessionLifecycleData = { status: 'PLANNED' };
    const result = validateTransition(session, 'REFLECTED');
    expect(result.allowed).toBe(false);
  });

  it('IN_PROGRESS → READY är ogiltig (backning)', () => {
    const session: SessionLifecycleData = {
      status: 'IN_PROGRESS',
      startedAt: new Date(),
    };
    const result = validateTransition(session, 'READY');
    expect(result.allowed).toBe(false);
  });

  it('IN_PROGRESS → REFLECTED är ogiltig (hoppar över COMPLETED)', () => {
    const session: SessionLifecycleData = {
      status: 'IN_PROGRESS',
      startedAt: new Date(),
    };
    const result = validateTransition(session, 'REFLECTED');
    expect(result.allowed).toBe(false);
  });

  it('COMPLETED → IN_PROGRESS är ogiltig (backning)', () => {
    const session: SessionLifecycleData = {
      status: 'COMPLETED',
      startedAt: new Date(),
      endedAt: new Date(),
    };
    const result = validateTransition(session, 'IN_PROGRESS');
    expect(result.allowed).toBe(false);
  });

  it('REFLECTED → COMPLETED är ogiltig (backning)', () => {
    const session: SessionLifecycleData = {
      status: 'REFLECTED',
      startedAt: new Date(),
      endedAt: new Date(),
    };
    const result = validateTransition(session, 'COMPLETED');
    expect(result.allowed).toBe(false);
  });

  it('CANCELLED → PLANNED är ogiltig (från terminal state)', () => {
    const session: SessionLifecycleData = { status: 'CANCELLED' };
    const result = validateTransition(session, 'PLANNED');
    expect(result.allowed).toBe(false);
  });

  it('övergång till samma state är ogiltig', () => {
    const session: SessionLifecycleData = { status: 'IN_PROGRESS' };
    const result = validateTransition(session, 'IN_PROGRESS');
    expect(result.allowed).toBe(false);
    expect(result.reason).toContain('redan i tillstånd');
  });
});

describe('validateTransition - villkor', () => {
  it('IN_PROGRESS → COMPLETED kräver startedAt', () => {
    const session: SessionLifecycleData = {
      status: 'IN_PROGRESS',
      startedAt: null,
    };
    const result = validateTransition(session, 'COMPLETED');
    expect(result.allowed).toBe(false);
    expect(result.reason).toContain('startedAt');
  });
});

describe('isTerminalState', () => {
  it('REFLECTED är terminal', () => {
    expect(isTerminalState('REFLECTED')).toBe(true);
  });

  it('CANCELLED är terminal', () => {
    expect(isTerminalState('CANCELLED')).toBe(true);
  });

  it('PLANNED är inte terminal', () => {
    expect(isTerminalState('PLANNED')).toBe(false);
  });

  it('IN_PROGRESS är inte terminal', () => {
    expect(isTerminalState('IN_PROGRESS')).toBe(false);
  });

  it('COMPLETED är inte terminal (väntar reflektion)', () => {
    expect(isTerminalState('COMPLETED')).toBe(false);
  });
});

describe('isActive', () => {
  it('IN_PROGRESS är aktiv', () => {
    expect(isActive('IN_PROGRESS')).toBe(true);
  });

  it('PLANNED är inte aktiv', () => {
    expect(isActive('PLANNED')).toBe(false);
  });

  it('COMPLETED är inte aktiv', () => {
    expect(isActive('COMPLETED')).toBe(false);
  });
});

describe('calculateDrivingMinutes', () => {
  it('beräknar minuter korrekt', () => {
    const startedAt = new Date('2026-09-02T12:00:00Z');
    const endedAt = new Date('2026-09-02T12:45:00Z');
    const minutes = calculateDrivingMinutes(startedAt, endedAt);
    expect(minutes).toBe(45);
  });

  it('avrundar till närmaste minut', () => {
    const startedAt = new Date('2026-09-02T12:00:00Z');
    const endedAt = new Date('2026-09-02T12:44:30Z');
    const minutes = calculateDrivingMinutes(startedAt, endedAt);
    expect(minutes).toBe(45); // 44,5 min → 45
  });

  it('returnerar null om startedAt saknas', () => {
    const endedAt = new Date('2026-09-02T12:45:00Z');
    const minutes = calculateDrivingMinutes(null, endedAt);
    expect(minutes).toBeNull();
  });

  it('returnerar null om endedAt saknas', () => {
    const startedAt = new Date('2026-09-02T12:00:00Z');
    const minutes = calculateDrivingMinutes(startedAt, null);
    expect(minutes).toBeNull();
  });

  it('returnerar null om båda saknas', () => {
    const minutes = calculateDrivingMinutes(null, null);
    expect(minutes).toBeNull();
  });
});

describe('isForgottenSession', () => {
  it('returnerar true om sessionen pågått mer än 4 timmar', () => {
    const startedAt = new Date('2026-09-02T08:00:00Z');
    const now = new Date('2026-09-02T12:30:00Z'); // 4,5 timmar senare
    const forgotten = isForgottenSession(startedAt, now);
    expect(forgotten).toBe(true);
  });

  it('returnerar false om sessionen pågått mindre än 4 timmar', () => {
    const startedAt = new Date('2026-09-02T08:00:00Z');
    const now = new Date('2026-09-02T11:30:00Z'); // 3,5 timmar senare
    const forgotten = isForgottenSession(startedAt, now);
    expect(forgotten).toBe(false);
  });

  it('returnerar false om startedAt saknas', () => {
    const now = new Date('2026-09-02T12:00:00Z');
    const forgotten = isForgottenSession(null, now);
    expect(forgotten).toBe(false);
  });

  it('använder anpassad tröskel för maxReasonableHours', () => {
    const startedAt = new Date('2026-09-02T08:00:00Z');
    const now = new Date('2026-09-02T10:30:00Z'); // 2,5 timmar senare
    const forgotten = isForgottenSession(startedAt, now, 2);
    expect(forgotten).toBe(true); // 2,5h > 2h
  });
});
