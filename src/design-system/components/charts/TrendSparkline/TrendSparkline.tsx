import { Chart } from '@antv/g2';
import { useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { getSeriesColor } from '../../../utils/chartTokens';

export interface TrendDataPoint {
  date: string | number;
  value: number;
}

export interface TrendSparklineProps {
  data: TrendDataPoint[];
  title?: string;
  valueType?: 'PERCENTAGE' | 'NUMBER';
  height?: number;
}

const parseTrendDate = (rawDate: string | number): dayjs.Dayjs | null => {
  if (typeof rawDate === 'number' && Number.isFinite(rawDate)) {
    const abs = Math.abs(rawDate);
    if (abs < 1e9) return null;
    const timestampMs = abs < 1e12 ? rawDate * 1000 : rawDate;
    const parsed = dayjs(timestampMs);
    return parsed.isValid() ? parsed : null;
  }

  if (typeof rawDate === 'string' && rawDate.trim() !== '') {
    const numericValue = Number(rawDate);
    if (Number.isFinite(numericValue)) {
      const numericDate = parseTrendDate(numericValue);
      if (numericDate) return numericDate;
    }
    const parsed = dayjs(rawDate);
    return parsed.isValid() ? parsed : null;
  }

  return null;
};

const formatTrendTooltipTitle = (rawDate: string | number): string => {
  const parsed = parseTrendDate(rawDate);
  if (parsed) return parsed.format('YYYY-MM-DD');
  if (typeof rawDate === 'string' && rawDate.trim() !== '') return rawDate;
  if (typeof rawDate === 'number' && Number.isFinite(rawDate)) return `序列 ${rawDate + 1}`;
  return '趋势数据';
};

export function TrendSparkline({
  data,
  title = '',
  valueType = 'NUMBER',
  height = 60,
}: TrendSparklineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    // Read series-1 color from design tokens (fallback to brand blue)
    const lineColor = getSeriesColor(0) || 'var(--series-1, #3B82F6)';

    const chart = new Chart({
      container: containerRef.current,
      autoFit: true,
      height,
      padding: 0,
    });

    chart
      .line()
      .data(data)
      .encode('x', 'date')
      .encode('y', 'value')
      .style('stroke', lineColor)
      .style('lineWidth', 1)
      .style('smooth', true)
      .animate('enter', { type: 'scaleInX', duration: 800 })
      .tooltip({
        title: (d: TrendDataPoint) => formatTrendTooltipTitle(d.date),
        items: [
          {
            name: title,
            channel: 'y',
            valueFormatter: (d: number) => {
              if (valueType === 'PERCENTAGE') return `${(d * 100).toFixed(2)}%`;
              return String(d);
            },
          },
        ],
      });

    chart.axis(false);
    chart.scale('x', { padding: 0, range: [0, 1] });
    chart.scale('y', { padding: 0, range: [1, 0] });
    chart.render();
    chartRef.current = chart;

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [data, valueType, title, height]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: `${height}px`,
        background: 'transparent',
      }}
    />
  );
}

export default TrendSparkline;
