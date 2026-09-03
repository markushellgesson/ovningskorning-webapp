import type { InputHTMLAttributes } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  showLabel?: boolean;
  errorMessage?: string;
}

/**
 * TextField (ux-spec 11.4).
 * Minst 16px teckenstorlek på mobil (förhindrar iOS auto-zoom), korrekt inputMode.
 */
export function TextField({
  label,
  showLabel = true,
  errorMessage,
  id,
  className = '',
  ...props
}: TextFieldProps) {
  const fieldId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${fieldId}-error`;

  return (
    <div>
      <label
        htmlFor={fieldId}
        className={showLabel ? 'block text-sm font-medium text-text-primary' : 'sr-only'}
      >
        {label}
      </label>
      <input
        id={fieldId}
        aria-describedby={errorMessage ? errorId : undefined}
        aria-invalid={errorMessage ? 'true' : undefined}
        className={`
          mt-1
          appearance-none
          block w-full min-h-12
          px-3 py-3
          border ${errorMessage ? 'border-safety-600' : 'border-border-default'}
          placeholder-text-tertiary
          bg-surface-base text-text-primary text-base
          rounded-[--radius-sm]
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          transition-colors duration-150
          ${className}
        `
          .trim()
          .replace(/\s+/g, ' ')}
        {...props}
      />
      {errorMessage && (
        <p id={errorId} className="mt-2 text-sm text-safety-700" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
