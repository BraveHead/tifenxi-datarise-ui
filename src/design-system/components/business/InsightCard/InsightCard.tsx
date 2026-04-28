import React from 'react';

export type InsightType = 'positive' | 'negative' | 'warning' | 'neutral';

export interface InsightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 洞察类型 */
  type: InsightType;
  /** 自定义图标插槽 */
  icon?: React.ReactNode;
  /** 洞察标题 */
  title: string;
  /** 描述文字 */
  description: string;
  /** 底部区域（如 Badge + 影响指标） */
  footer?: React.ReactNode;
}

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(' ');
}

const typeConfig: Record<InsightType, {
  borderColor: string;
  iconBg: string;
  iconColor: string;
}> = {
  positive: {
    borderColor: 'border-l-success-500',
    iconBg: 'bg-success-bg',
    iconColor: 'text-success-500',
  },
  negative: {
    borderColor: 'border-l-danger-500',
    iconBg: 'bg-danger-bg',
    iconColor: 'text-danger-500',
  },
  warning: {
    borderColor: 'border-l-warning-500',
    iconBg: 'bg-warning-bg',
    iconColor: 'text-warning-500',
  },
  neutral: {
    borderColor: 'border-l-brand-500',
    iconBg: 'bg-brand-50',
    iconColor: 'text-brand-500',
  },
};

function DefaultIcon({ type }: { type: InsightType }) {
  if (type === 'positive') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    );
  }
  if (type === 'negative') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
        <polyline points="16 17 22 17 22 11" />
      </svg>
    );
  }
  if (type === 'warning') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export function InsightCard({
  type,
  icon,
  title,
  description,
  footer,
  className,
  ...rest
}: InsightCardProps) {
  const config = typeConfig[type];

  return (
    <div
      className={cx(
        'bg-surface border border-line rounded-lg shadow-card',
        'px-sp-5 py-sp-4 border-l-4 flex gap-sp-4',
        config.borderColor,
        className,
      )}
      {...rest}
    >
      <span
        className={cx(
          'w-9 h-9 rounded-lg inline-flex items-center justify-center flex-shrink-0',
          config.iconBg,
          config.iconColor,
        )}
      >
        {icon || <DefaultIcon type={type} />}
      </span>

      <div className="flex-1 min-w-0">
        <div className="text-fs-14 font-semibold text-fg mb-1">{title}</div>
        <div className="text-fs-13 text-fg-secondary leading-relaxed">{description}</div>
        {footer && (
          <div className="flex items-center gap-sp-2 mt-sp-2 flex-wrap">{footer}</div>
        )}
      </div>
    </div>
  );
}

export default InsightCard;
