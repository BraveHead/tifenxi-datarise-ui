import { useRef, useState } from 'react';

/**
 * 堆叠柱状图 — 数据段
 */
export interface BarSegment {
  value: number;
  color: string;
  label?: string;
}

/**
 * 堆叠柱状图 — 每列
 */
export interface BarColumn {
  label: string;
  axisLabel?: string;
  segments: BarSegment[];
}

export interface StackedBarChartProps {
  data: BarColumn[];
  height?: number;
  /** 高亮列索引，默认最后一列 */
  highlightIndex?: number;
  highlightRingColor?: string;
  /** segment 最小高度百分比，默认 4 */
  minSegmentPercent?: number;
}

export function StackedBarChart({
  data,
  height = 160,
  highlightIndex,
  highlightRingColor = 'var(--brand-500, #3B82F6)',
  minSegmentPercent = 4,
}: StackedBarChartProps) {
  const activeIndex = highlightIndex ?? data.length - 1;
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{ colIdx: number; x: number; y: number } | null>(null);
  const trackMinWidth = Math.max(data.length * 20 + Math.max(data.length - 1, 0) * 4, 0);

  /** 给过小的 segment 保底显示高度，同时按比例压缩其余 segment */
  const getDisplayPercents = (segments: { value: number }[]) => {
    const total = segments.reduce((sum, s) => sum + s.value, 0);
    if (total === 0) return segments.map(() => 0);

    const raw = segments.map((s) => (s.value / total) * 100);
    const needsBoost = raw.map((p) => p > 0 && p < minSegmentPercent);
    const boostCount = needsBoost.filter(Boolean).length;

    if (boostCount === 0) return raw;

    const boosted = minSegmentPercent * boostCount;
    const remaining = 100 - boosted;
    const originalRemaining = raw.reduce((sum, p, i) => sum + (needsBoost[i] ? 0 : p), 0);

    return raw.map((p, i) => {
      if (needsBoost[i]) return minSegmentPercent;
      return originalRemaining > 0 ? (p / originalRemaining) * remaining : p;
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-lg, 8px)',
        backgroundColor: 'var(--surface-muted, #F3F3F5)',
        padding: 20,
      }}
    >
      <div style={{ overflowX: 'auto', paddingBottom: 8, scrollbarGutter: 'stable' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, height, minWidth: `${trackMinWidth}px` }}>
          {data.map((column, colIdx) => {
            const isHighlighted = colIdx === activeIndex;
            const displayPercents = getDisplayPercents(column.segments);
            const axisLabel = column.axisLabel ?? column.label;

            return (
              <div key={colIdx} style={{ display: 'flex', height: '100%', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    width: '100%',
                    maxWidth: 56,
                    cursor: 'pointer',
                    flexDirection: 'column-reverse',
                    overflow: 'hidden',
                    borderRadius: 5,
                    height: '85%',
                    margin: '0 auto',
                    ...(isHighlighted ? {
                      boxShadow: `0 0 0 2px color-mix(in srgb, ${highlightRingColor} 20%, transparent)`,
                    } : {}),
                  }}
                  onMouseMove={(e) => {
                    const rect = containerRef.current?.getBoundingClientRect();
                    if (rect) {
                      setTooltip({
                        colIdx,
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top - 12,
                      });
                    }
                  }}
                  onMouseLeave={() => setTooltip(null)}
                >
                  {column.segments.map((seg, segIdx) => (
                    <div
                      key={segIdx}
                      style={{
                        height: `${displayPercents[segIdx]}%`,
                        minHeight: seg.value > 0 ? 2 : 0,
                        background: seg.color,
                      }}
                    />
                  ))}
                </div>
                {axisLabel && (
                  <span
                    style={{
                      fontSize: 10,
                      color: isHighlighted ? highlightRingColor : 'var(--fg-secondary, #6B7280)',
                      fontWeight: isHighlighted ? 500 : undefined,
                    }}
                  >
                    {axisLabel}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && data[tooltip.colIdx] && (
        <div
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            zIndex: 10,
            whiteSpace: 'nowrap',
            borderRadius: 'var(--radius-lg, 8px)',
            border: '1px solid var(--line, #F0F0F5)',
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 8,
            paddingBottom: 8,
            boxShadow: 'var(--shadow-pop)',
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -100%)',
            backgroundColor: 'var(--surface, #FFFFFF)',
          }}
        >
          <p style={{ marginBottom: 4, fontSize: 'var(--fs-12, 12px)', fontWeight: 500, color: 'var(--fg, #191C22)' }}>
            {data[tooltip.colIdx].label}
          </p>
          {[...data[tooltip.colIdx].segments].reverse().map((seg, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, lineHeight: '20px', color: 'var(--fg-secondary, #6B7280)' }}>
              <span style={{ display: 'inline-block', height: 8, width: 8, borderRadius: '50%', background: seg.color }} />
              <span>{seg.label ?? `类别${i + 1}`}</span>
              <span style={{ marginLeft: 'auto', fontWeight: 500, color: 'var(--fg, #191C22)' }}>{seg.value}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StackedBarChart;
