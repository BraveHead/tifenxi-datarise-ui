import { useState, useMemo, useCallback, type ReactNode } from 'react';
import { Tooltip } from '../../common/Tooltip/Tooltip';
import { generateNiceTicks, calculateDomain } from '../../../utils/chartUtils';

/**
 * 散点数据项
 */
export interface QuadrantScatterItem {
  /** 唯一标识 */
  id: string;
  /** 名称 */
  name: string;
  /** X 轴值 */
  x: number;
  /** Y 轴值 */
  y: number;
  /** 类别（用于颜色映射） */
  category: string;
  /** 散点大小 (px)，不传则使用默认值 */
  size?: number;
  /** 是否可交互（可点击选中），默认 false */
  interactive?: boolean;
}

/**
 * 参考线配置
 */
export interface ReferenceLine {
  /** 值 */
  value: number;
  /** 线颜色 */
  color?: string;
  /** 是否虚线 */
  dashed?: boolean;
}

/**
 * 图例项
 */
export interface LegendItem {
  label: string;
  color: string;
}

export interface QuadrantScatterChartProps {
  /** 散点数据 */
  data: QuadrantScatterItem[];
  /** X 轴参考线（四象限的垂直分界线），不传则不显示 */
  xReferenceLine?: ReferenceLine;
  /** Y 轴参考线（四象限的水平分界线），不传则不显示 */
  yReferenceLine?: ReferenceLine;
  /** 图表高度，默认 300 */
  height?: number;
  /** 默认散点大小 (px)，默认 8 */
  defaultPointSize?: number;
  /** 类别 → 颜色映射 */
  colorMap?: Record<string, string>;
  /** 默认颜色（类别不在 colorMap 中时使用） */
  defaultColor?: string;
  /** 当前选中 ID */
  selectedId?: string | null;
  /** 选中回调 */
  onSelect?: (item: QuadrantScatterItem | null) => void;
  /** 自定义 tooltip 内容（覆盖默认渲染） */
  tooltipRender?: (item: QuadrantScatterItem, color: string) => ReactNode;
  /** X 轴标签（用于 tooltip 显示，如 "接诊量"） */
  xLabel?: string;
  /** Y 轴标签（用于 tooltip 显示，如 "差评数"） */
  yLabel?: string;
  /** 图例项（不传则不显示图例） */
  legendItems?: LegendItem[];
  /** X 轴刻度数量，默认 5 */
  xTickCount?: number;
  /** Y 轴刻度数量，默认 5 */
  yTickCount?: number;
}

const Y_AXIS_WIDTH = 40;
const X_AXIS_HEIGHT = 24;

export function QuadrantScatterChart({
  data,
  xReferenceLine,
  yReferenceLine,
  height = 300,
  defaultPointSize = 8,
  colorMap = {},
  defaultColor = 'var(--neutral-400, #A5A9B1)',
  selectedId,
  onSelect,
  tooltipRender,
  xLabel = 'X',
  yLabel = 'Y',
  legendItems,
  xTickCount = 5,
  yTickCount = 5,
}: QuadrantScatterChartProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getColor = useCallback(
    (category: string) => colorMap[category] || defaultColor,
    [colorMap, defaultColor],
  );

  // 计算 domain 和 ticks
  const { xDomain, yDomain, xTicks, yTicks } = useMemo(() => {
    const xValues = data.map((d) => d.x);
    const yValues = data.map((d) => d.y);
    const xD = calculateDomain(xValues, xReferenceLine?.value);
    const yD = calculateDomain(yValues, yReferenceLine?.value);
    return {
      xDomain: xD,
      yDomain: yD,
      xTicks: generateNiceTicks(xD[0], xD[1], xTickCount),
      yTicks: generateNiceTicks(yD[0], yD[1], yTickCount),
    };
  }, [data, xReferenceLine?.value, yReferenceLine?.value, xTickCount, yTickCount]);

  // 数据值 → 百分比位置
  const toXPercent = useCallback(
    (value: number) => ((value - xDomain[0]) / (xDomain[1] - xDomain[0])) * 100,
    [xDomain],
  );
  const toYPercent = useCallback(
    (value: number) => (1 - (value - yDomain[0]) / (yDomain[1] - yDomain[0])) * 100,
    [yDomain],
  );

  const handlePlotClick = () => {
    if (onSelect) {
      onSelect(null);
    }
  };

  const handlePointClick = (item: QuadrantScatterItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item.interactive) return;
    if (onSelect) {
      onSelect(item.id === selectedId ? null : item);
    }
  };

  const refLineColor = 'var(--neutral-300, #D7D9DD)';

  return (
    <div>
      {/* 图表区域 */}
      <div style={{ height, display: 'flex' }}>
        {/* Y 轴刻度 */}
        <div
          style={{
            width: Y_AXIS_WIDTH,
            paddingBottom: X_AXIS_HEIGHT,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            textAlign: 'right',
            paddingRight: 8,
            flexShrink: 0,
            fontSize: 'var(--fs-12, 12px)',
            color: 'var(--fg-tertiary, #A5A9B1)',
          }}
        >
          {[...yTicks].reverse().map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>

        {/* 绘图区 + X 轴 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* 绘图区 */}
          <div
            style={{ position: 'relative', flex: 1 }}
            onClick={handlePlotClick}
          >
            {/* 水平网格线 */}
            {yTicks.map((tick) => (
              <div
                key={`grid-y-${tick}`}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: `${toYPercent(tick)}%`,
                  borderTop: '1px solid var(--line, #F0F0F5)',
                }}
              />
            ))}

            {/* 垂直参考线 */}
            {xReferenceLine && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: `${toXPercent(xReferenceLine.value)}%`,
                  borderLeft: `1px ${xReferenceLine.dashed !== false ? 'dashed' : 'solid'} ${xReferenceLine.color || refLineColor}`,
                }}
              />
            )}
            {/* 水平参考线 */}
            {yReferenceLine && (
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: `${toYPercent(yReferenceLine.value)}%`,
                  borderTop: `1px ${yReferenceLine.dashed !== false ? 'dashed' : 'solid'} ${yReferenceLine.color || refLineColor}`,
                }}
              />
            )}

            {/* 散点 */}
            {data.map((item) => {
              const isActive = item.id === selectedId || item.id === hoveredId;
              const baseSize = item.size ?? defaultPointSize;
              const pixelSize = isActive ? baseSize * 1.5 : baseSize;
              const color = getColor(item.category);

              const dot = (
                <button
                  style={{
                    position: 'absolute',
                    width: pixelSize,
                    height: pixelSize,
                    backgroundColor: color,
                    left: `${toXPercent(item.x)}%`,
                    top: `${toYPercent(item.y)}%`,
                    transform: 'translate(-50%, -50%)',
                    cursor: item.interactive ? 'pointer' : 'default',
                    borderRadius: '50%',
                    border: 'none',
                    padding: 0,
                    transition: 'all 150ms',
                    boxShadow:
                      item.id === selectedId
                        ? `0 0 0 2px var(--danger-500, #D63841), 0 0 0 4px rgba(229, 72, 77, 0.3)`
                        : isActive
                          ? '0 0 0 2px var(--surface, #FFFFFF)'
                          : 'none',
                    zIndex: isActive ? 10 : 1,
                  }}
                  onClick={(e) => handlePointClick(item, e)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                />
              );

              const tooltipContent = tooltipRender
                ? tooltipRender(item, color)
                : (
                  <div>
                    <div style={{ color: 'var(--fg-tertiary, #A5A9B1)', fontSize: 'var(--fs-12, 12px)', marginBottom: 6 }}>{item.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', backgroundColor: color, flexShrink: 0 }} />
                      <span style={{ color: 'var(--fg-body, #374151)', fontSize: 'var(--fs-12, 12px)' }}>{item.name}</span>
                      <span style={{ color: 'var(--fg-body, #374151)', fontSize: 'var(--fs-12, 12px)', marginLeft: 8 }}>{xLabel}: {item.x}, {yLabel}: {item.y}</span>
                    </div>
                  </div>
                );

              return (
                <Tooltip
                  key={item.id}
                  title={tooltipContent}
                >
                  {dot}
                </Tooltip>
              );
            })}
          </div>

          {/* X 轴刻度 */}
          <div
            style={{
              height: X_AXIS_HEIGHT,
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 'var(--fs-12, 12px)',
              color: 'var(--fg-tertiary, #A5A9B1)',
              paddingTop: 4,
            }}
          >
            {xTicks.map((tick) => (
              <span key={tick}>{tick}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 图例 */}
      {legendItems && legendItems.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 16, justifyContent: 'flex-start' }}>
          {legendItems.map((item, idx) => (
            <div key={`${item.label}-${idx}`} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: item.color,
                }}
              />
              <span style={{ fontSize: 'var(--fs-12, 12px)', color: 'var(--fg-secondary, #6B7280)' }}>{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuadrantScatterChart;
