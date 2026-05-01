import React from 'react';

export type TagVariant =
  | 'severity-high'
  | 'severity-mid'
  | 'severity-low'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info'
  | 'brand'
  | 'neutral';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  /** AntD 兼容：常见 color 值映射到 tifenxi variant */
  color?: string;
  bordered?: boolean;
  /** 左侧圆点颜色，传入后在文字前显示 8px 实心圆 */
  dot?: 'danger' | 'success' | 'warning' | 'info';
  /** 是否显示关闭按钮 */
  closable?: boolean;
  /** 关闭回调 */
  onClose?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}

const variantClasses: Record<TagVariant, string> = {
  'severity-high': 'bg-[var(--severity-high-bg)] text-[var(--severity-high-text)] border-[var(--severity-high-border)]',
  'severity-mid': 'bg-warning-bg text-warning-700 border-warning-border',
  'severity-low': 'bg-surface-muted text-fg-secondary border-line-strong',
  danger: 'bg-danger-bg text-danger-700 border-danger-border',
  success: 'bg-success-bg text-success-700 border-success-border',
  warning: 'bg-warning-bg text-warning-700 border-warning-border',
  info: 'bg-info-bg text-info-700 border-info-border',
  brand: 'bg-brand-50 text-brand-700 border-brand-200',
  neutral: 'bg-surface-muted text-fg-body border-line-strong',
};

const dotClasses: Record<NonNullable<TagProps['dot']>, string> = {
  danger: 'bg-danger-500',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  info: 'bg-info-500',
};

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(' ');
}

const colorVariantMap: Record<string, TagVariant> = {
  blue: 'brand',
  processing: 'brand',
  green: 'success',
  success: 'success',
  red: 'danger',
  error: 'danger',
  orange: 'warning',
  warning: 'warning',
  purple: 'info',
  default: 'neutral',
};

export function Tag({
  variant,
  color,
  bordered = true,
  dot,
  closable,
  onClose,
  className,
  children,
  ...rest
}: TagProps) {
  const mappedVariant = variant ?? (color ? colorVariantMap[color] : undefined) ?? 'neutral';

  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 h-[22px] px-sp-2 rounded-sm border text-fs-12 font-medium leading-none whitespace-nowrap',
        variantClasses[mappedVariant],
        !bordered && 'border-transparent',
        className,
      )}
      {...rest}
    >
      {dot && <span className={cx('w-2 h-2 rounded-full flex-none', dotClasses[dot])} />}
      {children}
      {closable && (
        <button
          type="button"
          className="ml-0.5 flex-none inline-flex items-center justify-center w-3.5 h-3.5 rounded-sm hover:bg-black/10 transition-colors cursor-pointer border-none bg-transparent p-0"
          onClick={(e) => {
            e.stopPropagation();
            onClose?.(e);
          }}
          aria-label="关闭"
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M1 1l6 6M7 1L1 7" />
          </svg>
        </button>
      )}
    </span>
  );
}

export default Tag;
