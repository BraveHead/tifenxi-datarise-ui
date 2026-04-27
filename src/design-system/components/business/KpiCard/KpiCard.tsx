import React from 'react';

export type IconBadgeVariant = 'mood' | 'pulse' | 'trend' | 'alert' | 'users' | 'default';

export interface KpiDelta {
  label: string;
  value: string;
  direction: 'up' | 'down';
  /** 越高越好 → up=good；越低越好 → up=bad */
  sentiment: 'good' | 'bad';
}

export interface KpiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 指标名称 */
  name: string;
  /** 指标值 */
  value: string | number;
  /** 值的单位 */
  unit?: string;
  /** 右上角图标 */
  icon?: React.ReactNode;
  /** 图标徽章变体 */
  iconVariant?: IconBadgeVariant;
  /** 同环比 delta 指标 */
  deltas?: KpiDelta[];
  /** 底部 sparkline SVG */
  sparkline?: React.ReactNode;
  /** 是否为危险卡 */
  danger?: boolean;
  /** 是否显示左侧强调边框 */
  highlight?: boolean;
  /** 指标名称额外类名（用于自定义颜色等） */
  nameClassName?: string;
}

const iconBadgeClasses: Record<IconBadgeVariant, string> = {
  mood:    'bg-[#eef2ff] text-[#4f46e5]',
  pulse:   'bg-[#ecfdf5] text-[#059669]',
  trend:   'bg-[#f5f3ff] text-[#7c3aed]',
  alert:   'bg-[#fff1ea] text-[#c2410c]',
  users:   'bg-[#fdf2f8] text-[#be185d]',
  default: 'bg-neutral-100 text-neutral-600',
};

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(' ');
}

export function KpiCard({
  name,
  value,
  unit,
  icon,
  iconVariant = 'default',
  deltas,
  sparkline,
  danger = false,
  highlight = false,
  nameClassName,
  className,
  ...rest
}: KpiCardProps) {
  return (
    <div
      className={cx(
        'relative flex flex-col gap-sp-2 rounded-lg border overflow-hidden min-h-[150px]',
        danger
          ? 'bg-gradient-to-b from-[#fff1ea] to-[#fff6f2] border-[#fcd9c6]'
          : 'bg-neutral-0 border-neutral-100',
        className,
      )}
      style={{ padding: '16px 18px 0' }}
      {...rest}
    >
      {/* 左侧强调条：危险=红，高亮=品牌色 */}
      {danger && (
        <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-danger-500" />
      )}
      {highlight && !danger && (
        <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-500" />
      )}

      {/* 头部：名称 + 图标 */}
      <div className="flex items-start justify-between gap-sp-3">
        <span className={cx('text-fs-13 leading-snug', nameClassName || 'text-neutral-500')}>{name}</span>
        {icon && (
          <span className={cx(
            'flex-none w-7 h-7 rounded-lg inline-flex items-center justify-center',
            iconBadgeClasses[iconVariant],
          )}>
            {icon}
          </span>
        )}
      </div>

      {/* 数值 */}
      <div className="flex items-baseline gap-1.5 mt-0.5">
        <span className="font-num text-[30px] font-semibold text-neutral-900 leading-none tracking-tight">
          {value}
        </span>
        {unit && (
          <span className="text-fs-13 text-neutral-500 font-normal font-sans">{unit}</span>
        )}
      </div>

      {/* 同环比 */}
      {deltas && deltas.length > 0 && (
        <div className="flex items-center gap-sp-4 flex-wrap text-[11px] font-num text-neutral-500">
          {deltas.map((d, i) => (
            <span
              key={i}
              className={cx(
                'inline-flex items-center gap-0.5 whitespace-nowrap',
                d.sentiment === 'good' ? 'text-success-500' : 'text-danger-500',
              )}
            >
              <span className="text-[10px] leading-none">{d.direction === 'up' ? '▲' : '▼'}</span>
              <span className="font-sans">{d.label}</span>
              <span>{d.value}</span>
            </span>
          ))}
        </div>
      )}

      {/* Sparkline */}
      {sparkline && (
        <div className="mt-auto mb-sp-4 w-full h-9">
          {sparkline}
        </div>
      )}
    </div>
  );
}

export default KpiCard;
