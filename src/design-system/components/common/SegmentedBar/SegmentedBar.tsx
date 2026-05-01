import React, { useMemo, useState } from 'react';

export interface SegmentedBarItem {
  /** 段标签 */
  label: string;
  /** 数值（用于计算宽度比例） */
  value: number;
  /** 背景色 — CSS 颜色值或 CSS 变量（如 var(--chart-1)、#3B82F6） */
  color: string;
  /** 自定义 tooltip 渲染 */
  renderTooltip?: (item: SegmentedBarItem, percentage: string, total: number) => React.ReactNode;
}

export interface SegmentedBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** 数据段列表 */
  items: SegmentedBarItem[];
  /** 条形高度(px) */
  height?: number;
  /** 是否圆角 */
  rounded?: boolean;
  /** 是否在段内显示标签（宽度 >= 8% 时）— 等同于 innerLabelType='label' */
  showInnerLabel?: boolean;
  /** 段内标签类型：label 显示标签文字，value 显示数值+单位。优先于 showInnerLabel */
  innerLabelType?: 'label' | 'value';
  /** 数值单位（innerLabelType='value' 时使用，如 "个"、"次"） */
  unit?: string;
  /** 是否显示 hover tooltip（默认 true） */
  showTooltip?: boolean;
}

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(' ');
}

/** 计算各段的显示宽度百分比，小比例（<3%）保底显示 */
export function computeSegmentWidths(items: SegmentedBarItem[], total: number): number[] {
  if (total === 0) return items.map(() => 0);

  const MIN_PERCENTAGE = 0.03;
  const rawPercentages = items.map((item) => item.value / total);

  const smallIndices: number[] = [];
  const largeIndices: number[] = [];

  rawPercentages.forEach((p, i) => {
    if (items[i].value > 0) {
      if (p < MIN_PERCENTAGE) {
        smallIndices.push(i);
      } else {
        largeIndices.push(i);
      }
    }
  });

  if (smallIndices.length === 0) {
    return rawPercentages.map((p) => p * 100);
  }

  const finalPercentages = [...rawPercentages];
  const smallTotal = smallIndices.length * MIN_PERCENTAGE;
  const remainingPercentage = 1 - smallTotal;
  const largeRawTotal = largeIndices.reduce((sum, i) => sum + rawPercentages[i], 0);

  smallIndices.forEach((i) => {
    finalPercentages[i] = MIN_PERCENTAGE;
  });

  if (largeRawTotal > 0) {
    largeIndices.forEach((i) => {
      finalPercentages[i] = (rawPercentages[i] / largeRawTotal) * remainingPercentage;
    });
  }

  return finalPercentages.map((p) => p * 100);
}

export function SegmentedBar({
  items,
  height = 24,
  rounded = false,
  showInnerLabel = false,
  innerLabelType,
  unit = '',
  showTooltip = true,
  className,
  ...rest
}: SegmentedBarProps) {
  const effectiveLabelType = innerLabelType ?? (showInnerLabel ? 'label' : undefined);
  const total = items.reduce((sum, item) => sum + item.value, 0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const widths = useMemo(() => computeSegmentWidths(items, total), [items, total]);

  if (total === 0) return null;

  // Calculate the center position of the hovered segment for tooltip placement
  const hoveredTooltipLeft = useMemo(() => {
    if (hoveredIndex === null) return 0;
    let offset = 0;
    for (let i = 0; i < hoveredIndex; i++) {
      offset += widths[i];
    }
    return offset + widths[hoveredIndex] / 2;
  }, [hoveredIndex, widths]);

  const hoveredItem = hoveredIndex !== null ? items[hoveredIndex] : null;
  const hoveredPercentage = hoveredItem
    ? ((hoveredItem.value / total) * 100).toFixed(1)
    : '';

  return (
    <div
      className={cx('w-full relative', className)}
      role="img"
      aria-label={items.map((item) => {
        const pct = ((item.value / total) * 100).toFixed(1);
        return `${item.label}: ${item.value} (${pct}%)`;
      }).join(', ')}
      {...rest}
    >
      {/* Tooltip rendered outside overflow-hidden */}
      {showTooltip && hoveredItem && (
        <div
          className="absolute bottom-full left-0 mb-1 z-dropdown pointer-events-none"
          style={{ left: `${hoveredTooltipLeft}%`, transform: 'translateX(-50%)' }}
        >
          <div
            className="rounded-md whitespace-nowrap"
            style={{
              background: 'var(--surface, #fff)',
              boxShadow: 'var(--shadow-pop, 0 4px 12px rgba(0,0,0,0.12))',
              padding: 'var(--sp-2, 8px) var(--sp-3, 12px)',
              fontSize: 'var(--fs-12, 12px)',
              color: 'var(--fg-body, #4E5357)',
              border: '1px solid var(--line, #F0F0F5)',
            }}
          >
            {hoveredItem.renderTooltip ? (
              hoveredItem.renderTooltip(hoveredItem, hoveredPercentage, total)
            ) : (
              <span>{hoveredItem.label}: {hoveredItem.value} ({hoveredPercentage}%)</span>
            )}
          </div>
          {/* Arrow — rotated square matching Tooltip component style */}
          <div className="mx-auto" style={{ marginTop: -1, width: 8, height: 8, overflow: 'hidden' }}>
            <div
              style={{
                width: 8,
                height: 8,
                background: 'var(--surface, #fff)',
                border: '1px solid var(--line, #F0F0F5)',
                transform: 'rotate(45deg)',
                transformOrigin: 'center center',
                marginTop: -4,
                boxShadow: '3px 3px 7px rgba(0,0,0,0.07)',
              }}
            />
          </div>
        </div>
      )}
      <div
        className={cx('flex w-full overflow-hidden', rounded && 'rounded-full')}
        style={{ height }}
      >
        {items.map((item, index) => {
          const width = widths[index];
          if (item.value === 0) return null;

          const isHovered = hoveredIndex === index;

          return (
            <div
              key={`${index}-${item.label}`}
              className="relative transition-opacity duration-fast h-full flex items-center justify-center overflow-hidden whitespace-nowrap text-fs-11 text-fg-on-accent font-medium"
              style={{
                backgroundColor: item.color,
                width: `${width}%`,
                opacity: hoveredIndex !== null && !isHovered ? 0.6 : 1,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {effectiveLabelType && width >= 8 && (
                <span className="px-1 truncate">
                  {effectiveLabelType === 'value' ? `${item.value}${unit}` : item.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SegmentedBar;
