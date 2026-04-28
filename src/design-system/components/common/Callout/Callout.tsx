import React from 'react';

export type CalloutVariant = 'info' | 'warning' | 'danger' | 'success';

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CalloutVariant;
  /** 左侧图标插槽 */
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const variantClasses: Record<CalloutVariant, { bg: string; iconColor: string }> = {
  info:    { bg: 'bg-info-bg',    iconColor: 'text-info-500' },
  warning: { bg: 'bg-warning-bg', iconColor: 'text-warning-500' },
  danger:  { bg: 'bg-danger-bg',  iconColor: 'text-danger-500' },
  success: { bg: 'bg-success-bg', iconColor: 'text-success-500' },
};

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(' ');
}

export function Callout({ variant = 'info', icon, className, children, ...rest }: CalloutProps) {
  const v = variantClasses[variant];

  return (
    <div
      className={cx(
        'flex items-start gap-sp-3 px-sp-4 py-sp-3 rounded-md text-fs-13 text-fg-body',
        v.bg,
        className,
      )}
      role="status"
      {...rest}
    >
      {icon && (
        <span className={cx('flex-none w-4 h-4 mt-0.5', v.iconColor)}>
          {icon}
        </span>
      )}
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

/** Callout 内的 KV 行 */
export function CalloutKV({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="text-fg-secondary">{label}</span>
      <span className="text-fg font-medium">{value}</span>
    </span>
  );
}

export default Callout;
