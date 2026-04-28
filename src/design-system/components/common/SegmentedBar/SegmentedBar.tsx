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
  /** 是否在段内显示标签（宽度 >= 8% 时） */
  showInnerLabel?: boolean;
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
  className,
  ...rest
}: SegmentedBarProps) {
  const total = items.reduce((sum, item) => sum + item.value, 0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const widths = useMemo(() => computeSegmentWidths(items, total), [items, total]);

  if (total === 0) return null;

  return (
    <div
      className={cx('w-full', className)}
      role="img"
      aria-label={items.map((item) => {
        const pct = ((item.value / total) * 100).toFixed(1);
        return `${item.label}: ${item.value} (${pct}%)`;
      }).join(', ')}
      {...rest}
    >
      <div
        className={cx('flex w-full overflow-hidden', rounded && 'rounded-full')}
        style={{ height }}
      >
        {items.map((item, index) => {
          const width = widths[index];
          if (item.value === 0) return null;

          const percentage = ((item.value / total) * 100).toFixed(1);
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
              {showInnerLabel && width >= 8 && (
                <span className="px-1 truncate">{item.label}</span>
              )}
              {isHovered && (
                <div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-dropdown bg-surface rounded-md shadow-pop px-sp-3 py-sp-2 text-fs-12 text-fg-body whitespace-nowrap pointer-events-none"
                >
                  {item.renderTooltip ? (
                    item.renderTooltip(item, percentage, total)
                  ) : (
                    <span>{item.label}: {item.value} ({percentage}%)</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SegmentedBar;
