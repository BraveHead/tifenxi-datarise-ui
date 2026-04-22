import React from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'default' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  /** 视觉变体：主色 / 次级 / 文字 / 危险。默认 default */
  variant?: ButtonVariant;
  /** 尺寸：32px / 40px 高。默认 md */
  size?: ButtonSize;
  /** 占满父容器宽度 */
  block?: boolean;
  /** 禁用态 */
  disabled?: boolean;
  /** 加载态：自动禁用交互并替换左侧为 spinner */
  loading?: boolean;
  /** 左侧图标节点 */
  iconLeft?: React.ReactNode;
  /** 右侧图标节点 */
  iconRight?: React.ReactNode;
  /** 子节点 / 文案 */
  children?: React.ReactNode;
}

/**
 * Button
 * 基于 Make 设计系统：`--brand-*` / `--neutral-*` / `--radius-md` / `--fs-14`。
 * CSS 类对应 components.css 中的 `.btn` 族，兼容规范原生样式。
 */
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
      className = '',
      children,
      type = 'button',
      ...rest
    },
    ref,
  ) {
    const classes = [
      'btn',
      `btn--${variant}`,
      size !== 'md' && `btn--${size}`,
      block && 'btn--block',
      loading && 'btn--loading',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...rest}
      >
        {loading ? <Spinner /> : iconLeft}
        {children != null && <span className="btn__label">{children}</span>}
        {!loading && iconRight}
      </button>
    );
  },
);

function Spinner() {
  return (
    <svg
      className="btn__spinner"
      viewBox="0 0 16 16"
      width="14"
      height="14"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <path
        d="M14 8a6 6 0 0 0-6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default Button;
