import type { ReactNode } from 'react';

interface ErrorAlertProps {
  children: ReactNode;
}

/**
 * ErrorAlert (ux-spec 11.4).
 * Status aldrig enbart via färg — inkluderar ikon + text.
 */
export function ErrorAlert({ children }: ErrorAlertProps) {
  return (
    <div
      className="bg-safety-50 border border-safety-200 text-safety-800 px-4 py-3 rounded-[var(--radius-sm)] flex items-start gap-3"
      role="alert"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 flex-shrink-0 mt-0.5"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>
      <span className="block flex-1">{children}</span>
    </div>
  );
}
