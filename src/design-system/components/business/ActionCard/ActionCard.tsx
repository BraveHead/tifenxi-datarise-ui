import React from 'react';

export type ActionPriority = 'high' | 'medium' | 'low';

export interface ActionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 优先级 */
  priority: ActionPriority;
  /** 自定义图标插槽 */
  icon?: React.ReactNode;
  /** 行动标题 */
  title: string;
  /** 描述说明 */
  description?: string;
  /** 步骤列表 */
  steps?: string[];
  /** 验证指标说明 */
  verification?: string;
  /** 底部操作区插槽 */
  actions?: React.ReactNode;
}

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(' ');
}

const priorityConfig: Record<ActionPriority, {
  badgeClass: string;
  badgeText: string;
  iconBg: string;
  iconColor: string;
}> = {
  high: {
    badgeClass: 'bg-danger-bg text-danger-500 border-danger-border',
    badgeText: '高优先',
    iconBg: 'bg-danger-bg',
    iconColor: 'text-danger-500',
  },
  medium: {
    badgeClass: 'bg-warning-bg text-warning-700 border-warning-border',
    badgeText: '中优先',
    iconBg: 'bg-brand-50',
    iconColor: 'text-brand-500',
  },
  low: {
    badgeClass: 'bg-surface-muted text-fg-secondary border-line-strong',
    badgeText: '低优先',
    iconBg: 'bg-surface-muted',
    iconColor: 'text-fg-secondary',
  },
};

function DefaultIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

export function ActionCard({
  priority,
  icon,
  title,
  description,
  steps,
  verification,
  actions,
  className,
  ...rest
}: ActionCardProps) {
  const config = priorityConfig[priority];

  return (
    <div
      className={cx(
        'bg-surface border border-line rounded-lg shadow-card p-sp-4',
        className,
      )}
      {...rest}
    >
      {/* Header: icon + priority badge + title */}
      <div className="flex gap-sp-3 items-start mb-sp-3">
        <span
          className={cx(
            'w-9 h-9 rounded-lg inline-flex items-center justify-center flex-shrink-0',
            config.iconBg,
            config.iconColor,
          )}
        >
          {icon || <DefaultIcon />}
        </span>
        <div className="flex-1 min-w-0">
          <span
            className={cx(
              'inline-flex items-center text-[11px] font-medium px-sp-2 py-px rounded-sm border mb-1',
              config.badgeClass,
            )}
          >
            {config.badgeText}
          </span>
          <div className="text-fs-14 font-semibold text-fg leading-snug">{title}</div>
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="text-fs-13 text-fg-secondary leading-relaxed mb-sp-3">{description}</div>
      )}

      {/* Steps */}
      {steps && steps.length > 0 && (
        <ul className="flex flex-col gap-1 mb-sp-3 list-none">
          {steps.map((step, i) => (
            <li key={i} className="text-fs-12 text-fg-secondary flex gap-1.5 items-start pl-0.5">
              <span className="text-brand-500 font-bold leading-relaxed flex-shrink-0">›</span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Verification */}
      {verification && (
        <div className="text-[11px] text-fg-secondary leading-relaxed mb-sp-2 px-sp-2 py-1.5 bg-surface-muted rounded-sm">
          {verification}
        </div>
      )}

      {/* Actions */}
      {actions && (
        <div className="flex items-center gap-sp-2 justify-end">{actions}</div>
      )}
    </div>
  );
}

export default ActionCard;
