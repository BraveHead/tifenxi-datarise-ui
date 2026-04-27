import React from 'react';

export type DeltaDirection = 'up' | 'down' | 'flat';
export type DeltaSize = 'sm' | 'md';

export interface DeltaBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 正数=涨，负数=跌，0=持平 */
  value: number;
  /** 前缀标签，如"同比""环比" */
  label?: string;
  /** 单位，默认 '%' */
  unit?: string;
  /** true=涨为绿（正向指标：满意度等），false=涨为橙红（问题类指标：差评率等） */
  inverse?: boolean;
  /** sm 用于 KPI 卡内，md 用于独立展示 */
  size?: DeltaSize;
}

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(' ');
}

function getDirection(value: number): DeltaDirection {
  if (value > 0) return 'up';
  if (value < 0) return 'down';
  return 'flat';
}

/**
 * 涨跌徽章：统一全项目涨跌显示逻辑。
 *
 * 业务约定（医疗场景）：
 * - 默认：涨=橙红(chart-2)，跌=绿(chart-3) —— 问题增多=警示
 * - inverse=true：涨=绿，跌=橙红 —— 满意度等正向指标
 */
export function DeltaBadge({
  value,
  label,
  unit = '%',
  inverse = false,
  size = 'sm',
  className,
  ...rest
}: DeltaBadgeProps) {
  const direction = getDirection(value);

  // 颜色逻辑：direction + inverse → 视觉语义
  const isGood =
    (direction === 'up' && inverse) || (direction === 'down' && !inverse);
  const isBad =
    (direction === 'up' && !inverse) || (direction === 'down' && inverse);

  const colorClass = direction === 'flat'
    ? 'text-neutral-500 bg-neutral-50 border-neutral-200'
    : isGood
      ? 'text-success-500 bg-success-bg border-success-border'
      : 'text-danger-500 bg-danger-bg border-danger-border';

  const sizeClass = size === 'sm'
    ? 'text-[11px] px-1.5 py-px gap-0.5'
    : 'text-fs-12 px-[7px] py-0.5 gap-[3px]';

  const iconSize = size === 'sm' ? 10 : 11;

  return (
    <span
      className={cx(
        'inline-flex items-center font-medium rounded-sm border whitespace-nowrap font-num',
        colorClass,
        sizeClass,
        className,
      )}
      {...rest}
    >
      {direction === 'up' && (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="flex-shrink-0">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      )}
      {direction === 'down' && (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="flex-shrink-0">
          <path d="M6 9l6 6 6-6" />
        </svg>
      )}
      {direction === 'flat' && (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
          <path d="M5 12h14" />
        </svg>
      )}
      {label && <span className="font-sans">{label}</span>}
      <span>{Math.abs(value)}{unit}</span>
    </span>
  );
}

export default DeltaBadge;
