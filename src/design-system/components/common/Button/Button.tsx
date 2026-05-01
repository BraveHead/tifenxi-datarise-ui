import React from 'react';

export type ButtonVariant = 'primary' | 'default' | 'ghost' | 'danger' | 'link' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'small' | 'middle' | 'large';
type NativeButtonType = 'button' | 'submit' | 'reset';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'type'> {
  variant?: ButtonVariant;
  /** AntD 兼容：type 用于视觉样式，htmlType 用于原生 button type */
  type?: ButtonVariant | NativeButtonType;
  htmlType?: NativeButtonType;
  size?: ButtonSize;
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  danger?: boolean;
  ghost?: boolean;
  icon?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}

/* 所有视觉值来自 styles.css @theme inline 映射的 tokens.css 设计变量 */
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-500 text-fg-on-accent hover:bg-brand-600 active:bg-brand-700 border-transparent',
  default:
    'bg-surface text-fg-body border-line-strong hover:bg-surface-muted hover:border-neutral-300 active:bg-neutral-100',
  ghost:
    'bg-transparent text-brand-600 border-transparent hover:bg-brand-50 active:bg-brand-100',
  danger:
    'bg-danger-500 text-fg-on-accent hover:bg-danger-700 border-transparent',
  link:
    'bg-transparent text-brand-600 border-transparent hover:underline p-0 h-auto',
  text:
    'bg-transparent text-fg-body border-transparent hover:bg-surface-muted active:bg-neutral-100',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-7 text-fs-13 px-sp-3',
  md: 'h-8 text-fs-14 px-sp-4',
  lg: 'h-10 text-fs-14 px-sp-5',
  small: 'h-7 text-fs-13 px-sp-3',
  middle: 'h-8 text-fs-14 px-sp-4',
  large: 'h-10 text-fs-14 px-sp-5',
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
      danger = false,
      ghost = false,
      icon,
      iconLeft,
      iconRight,
      className,
      children,
      type = 'button',
      htmlType,
      ...rest
    },
    ref,
  ) {
    const isNativeType = type === 'button' || type === 'submit' || type === 'reset';
    const mappedVariant = variant ?? (danger ? 'danger' : ghost ? 'ghost' : isNativeType ? 'default' : type);
    const nativeType = htmlType ?? (isNativeType ? type : 'button');

    return (
      <button
        ref={ref}
        type={nativeType}
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
          variantClasses[mappedVariant],
          sizeClasses[size],
          className,
        )}
        {...rest}
      >
        {loading ? <Spinner /> : iconLeft ?? icon}
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
