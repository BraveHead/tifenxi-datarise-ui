import React from 'react';
import { motion } from 'framer-motion';

/**
 * 同比/环比数据
 */
export interface ComparisonData {
  /** 同比（Year-over-Year）百分比，如 20.1 表示 20.1% */
  yoy: number | null;
  /** 环比（Month-over-Month）百分比，如 -5.7 表示 -5.7% */
  mom: number | null;
}

/**
 * 通用趋势项，用于替代固定的同比/环比展示
 */
export interface TrendItem {
  /** 趋势标签，如"较上月""较去年" */
  label: string;
  /** 趋势百分比值，null 表示无数据 */
  value: number | null;
}

export interface KpiCardProps {
  /** 指标标题 */
  title: string;
  /** 主指标值 */
  value: string | number;
  /** 值的单位 */
  unit?: string;
  /** 右上角图标 */
  icon?: React.ReactNode;
  /** 图标背景色（Tailwind 类名，如 bg-blue-100） */
  iconBgColor?: string;
  /** 同比/环比数据 */
  comparison?: ComparisonData;
  /** 通用趋势数组，优先级高于 comparison（提供时替代同比/环比展示） */
  trends?: TrendItem[];
  /** 底部趋势图（ReactNode 插槽） */
  sparkline?: React.ReactNode;
  /** 是否显示左侧红色边框高亮 */
  highlight?: boolean;
  /** 是否为危险状态 */
  danger?: boolean;
  /** 额外操作区（如"智能归因"按钮），显示在同比/环比右侧 */
  extra?: React.ReactNode;
  /** 卡片在列表中的索引，用于入场动画错开延迟 */
  index?: number;
  /** 自定义 className */
  className?: string;
  /** 自定义 style */
  style?: React.CSSProperties;
}

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(' ');
}

/** 根据数值正负返回 CSS 变量颜色 */
function getTrendColor(value: number | null): string {
  if (value === null || value === 0) return 'var(--fg-secondary, #6B7280)';
  return value > 0 ? 'var(--success-500, #16A76A)' : 'var(--warning-500, #E8651B)';
}

/** 格式化百分比显示 */
function formatPercent(value: number | null): string {
  if (value === null) return '-';
  return `${Math.abs(value).toFixed(1)}%`;
}

const ArrowUp = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="inline-block">
    <path d="M2 8.5L5 5.5L7 7.5L10 4.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.5 4.5H10V7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="inline-block">
    <path d="M2 4.5L5 7.5L7 5.5L10 8.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.5 8.5H10V6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function ComparisonItem({ label, value }: { label: string; value: number | null }) {
  const color = getTrendColor(value);
  return (
    <span className="inline-flex items-center gap-1 text-sm">
      <span className="inline-flex items-center gap-1" style={{ color }}>
        {value !== null && value > 0 && <ArrowUp />}
        {value !== null && value < 0 && <ArrowDown />}
        <span>{formatPercent(value)}</span>
      </span>
      <span style={{ color: 'var(--fg-secondary, #6B7280)' }}>{label}</span>
    </span>
  );
}

const HOVER_SHADOW = '0 6px 16px -4px rgba(15,23,42,0.12), 0 2px 4px rgba(15,23,42,0.06)';

export function KpiCard({
  title,
  value,
  unit,
  icon,
  iconBgColor = 'bg-brand-100',
  comparison,
  trends,
  sparkline,
  highlight = false,
  danger = false,
  extra,
  index = 0,
  className,
  style: styleProp,
}: KpiCardProps) {
  const baseBorderColor = danger ? 'var(--danger-border, #FFCBC7)' : 'var(--line, #F0F0F5)';
  const leftBorderColor = highlight || danger ? 'var(--danger-500, #D63841)' : baseBorderColor;
  const restShadow = 'var(--shadow-card, 0 1px 2px rgba(15,23,42,0.04))';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.05,
        duration: 0.35,
        ease: 'easeOut',
      }}
      whileHover={{ boxShadow: HOVER_SHADOW }}
      className={cx(
        'h-full min-h-[156px] w-full rounded-md relative flex flex-col p-6',
        className,
      )}
      style={{
        borderStyle: 'solid',
        borderWidth: highlight || danger ? '1px 1px 1px 4px' : '1px',
        borderColor: baseBorderColor,
        borderLeftColor: leftBorderColor,
        backgroundColor: danger ? 'var(--danger-bg, #FFEBE8)' : 'var(--surface, #FFFFFF)',
        boxShadow: restShadow,
        ...styleProp,
      }}
    >
      {/* 标题 + 图标 */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold" style={{ color: 'var(--fg, #191C22)' }}>
          {title}
        </span>
        {icon && (
          <span className={cx('w-8 h-8 rounded flex items-center justify-center text-base', iconBgColor)}>
            {icon}
          </span>
        )}
      </div>

      {/* 主指标值 */}
      <div className="mt-1 mb-3">
        <span className="text-2xl font-bold" style={{ color: 'var(--fg, #191C22)' }}>
          {value}
        </span>
        {unit && (
          <span className="ml-1 text-sm" style={{ color: 'var(--fg-secondary, #6B7280)' }}>
            {unit}
          </span>
        )}
      </div>

      {/* 趋势（优先）或 同比/环比 + 额外操作 */}
      {trends && trends.length > 0 ? (
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            {trends.map((t) => (
              <ComparisonItem key={t.label} label={t.label} value={t.value} />
            ))}
          </div>
          {extra}
        </div>
      ) : comparison ? (
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <ComparisonItem label="同比" value={comparison.yoy} />
            <ComparisonItem label="环比" value={comparison.mom} />
          </div>
          {extra}
        </div>
      ) : null}

      {/* 趋势图插槽 */}
      {sparkline && (
        <div className="mt-auto w-full" style={{ height: 60 }}>
          {sparkline}
        </div>
      )}
    </motion.div>
  );
}

export default KpiCard;
