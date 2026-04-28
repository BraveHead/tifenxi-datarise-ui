import React from 'react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'role'> {
  /** 语义变体 */
  variant?: AlertVariant;
  /** 左侧图标插槽 */
  icon?: React.ReactNode;
  /** 是否可关闭 */
  closable?: boolean;
  /** 关闭回调（closable 为 true 时必传） */
  onClose?: () => void;
  children: React.ReactNode;
}

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(' ');
}

const variantClasses: Record<AlertVariant, { bg: string; border: string; iconColor: string }> = {
  info:    { bg: 'bg-info-bg',    border: 'border-info-border',    iconColor: 'text-info-500' },
  success: { bg: 'bg-success-bg', border: 'border-success-border', iconColor: 'text-success-500' },
  warning: { bg: 'bg-warning-bg', border: 'border-warning-border', iconColor: 'text-warning-500' },
  danger:  { bg: 'bg-danger-bg',  border: 'border-danger-border',  iconColor: 'text-danger-500' },
};

/** info/success 使用 status（不打断读屏）；warning/danger 使用 alert（打断读屏） */
const variantRole: Record<AlertVariant, 'status' | 'alert'> = {
  info: 'status',
  success: 'status',
  warning: 'alert',
  danger: 'alert',
};

export function Alert({
  variant = 'info',
  icon,
  closable = false,
  onClose,
  className,
  children,
  ...rest
}: AlertProps) {
  const v = variantClasses[variant];

  return (
    <div
      className={cx(
        'flex items-start gap-sp-3 px-sp-4 py-sp-3 rounded-lg border',
        v.bg,
        v.border,
        'text-fs-14 text-fg-body',
        className,
      )}
      role={variantRole[variant]}
      {...rest}
    >
      {icon && (
        <span className={cx('flex-none w-4 h-4 mt-0.5', v.iconColor)} aria-hidden="true">
          {icon}
        </span>
      )}
      <div className="flex-1 min-w-0">{children}</div>
      {closable && onClose && (
        <button
          type="button"
          onClick={onClose}
          className="flex-none text-fg-tertiary hover:text-fg-body transition-colors duration-fast cursor-pointer leading-none text-fs-16"
          aria-label="关闭"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default Alert;
