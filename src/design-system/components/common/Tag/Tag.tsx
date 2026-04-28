import React from 'react';

export type TagVariant =
  | 'severity-high'
  | 'severity-mid'
  | 'severity-low'
  | 'danger'
  | 'success'
  | 'info'
  | 'neutral';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  /** 左侧圆点颜色，传入后在文字前显示 8px 实心圆 */
  dot?: 'danger' | 'success' | 'warning' | 'info';
  children: React.ReactNode;
}

const variantClasses: Record<TagVariant, string> = {
  'severity-high': 'bg-[var(--severity-high-bg)] text-[var(--severity-high-text)] border-[var(--severity-high-border)]',
  'severity-mid': 'bg-warning-bg text-warning-700 border-warning-border',
  'severity-low': 'bg-surface-muted text-fg-secondary border-line-strong',
  danger: 'bg-danger-bg text-danger-700 border-danger-border',
  success: 'bg-success-bg text-success-700 border-success-border',
  info: 'bg-info-bg text-info-700 border-info-border',
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

export function Tag({ variant = 'neutral', dot, className, children, ...rest }: TagProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 h-[22px] px-sp-2 rounded-sm border text-fs-12 font-medium leading-none whitespace-nowrap',
        variantClasses[variant],
        className,
      )}
      {...rest}
    >
      {dot && <span className={cx('w-2 h-2 rounded-full flex-none', dotClasses[dot])} />}
      {children}
    </span>
  );
}

export default Tag;
