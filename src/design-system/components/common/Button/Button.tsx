import React from 'react';

export type ButtonVariant = 'primary' | 'default' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}

/* 所有视觉值来自 styles.css @theme inline 映射的 tokens.css 设计变量 */
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-500 text-neutral-0 hover:bg-brand-600 active:bg-brand-700 border-transparent',
  default:
    'bg-neutral-0 text-neutral-700 border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 active:bg-neutral-100',
  ghost:
    'bg-transparent text-brand-600 border-transparent hover:bg-brand-50 active:bg-brand-100',
  danger:
    'bg-danger-500 text-neutral-0 hover:bg-danger-700 border-transparent',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-7 text-fs-13 px-sp-3',
  md: 'h-8 text-fs-14 px-sp-4',
  lg: 'h-10 text-fs-14 px-sp-5',
};

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(' ');
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'default',
      size = 'md',
      block = false,
      disabled = false,
      loading = false,
      iconLeft,
      iconRight,
      className,
      children,
      type = 'button',
      ...rest
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={cx(
          // base
          'inline-flex items-center justify-center gap-1.5 font-medium leading-none whitespace-nowrap select-none',
          'rounded-md border transition-colors duration-fast',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
          loading && 'cursor-progress',
          block && 'w-full',
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...rest}
      >
        {loading ? <Spinner /> : iconLeft}
        {children != null && <span className="inline-flex items-center">{children}</span>}
        {!loading && iconRight}
      </button>
    );
  },
);

function Spinner() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" className="animate-spin flex-none" aria-hidden="true">
      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default Button;
