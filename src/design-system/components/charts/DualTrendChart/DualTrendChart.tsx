import { useEffect, useRef } from 'react';
import { Chart } from '@antv/g2';
import { getSeriesColor, getChartTokens } from '../../../utils/chartTokens';

export interface DualTrendDataItem {
  label: string;
  value: number;
}

export interface DualTrendChartProps {
  /** Line chart data */
  lineData: DualTrendDataItem[];
  /** Bar chart data */
  barData: DualTrendDataItem[];
  /** Line chart section title */
  lineTitle: string;
  /** Bar chart section title */
  barTitle: string;
  /** Line stroke color (defaults to series warning/orange) */
  lineColor?: string;
  /** Bar fill color (defaults to semantic danger/red) */
  barColor?: string;
  /** Suffix for the last-value annotation on the line, e.g. '%' */
  lineValueSuffix?: string;
  /** Line chart height in px (default 120) */
  lineHeight?: number;
  /** Bar chart height in px (default 132) */
  barHeight?: number;
  /** Line tooltip name (defaults to lineTitle) */
  lineTooltipName?: string;
  /** Bar tooltip name (defaults to barTitle) */
  barTooltipName?: string;
  /**
   * Pass a changing value (e.g. 'light' | 'dark') to force chart re-creation
   * when the theme switches. If omitted, the chart reads CSS vars at mount time only.
   */
  themeKey?: string;
}

/** Read a single CSS custom property from :root, or return fallback. */
function cssVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

/** Read a semantic color token, e.g. 'danger-500'. */
function semanticColor(name: string, fallback: string): string {
  return cssVar(`--${name}`, fallback);
}

export function DualTrendChart({
  lineData,
  barData,
  lineTitle,
  barTitle,
  lineColor,
  barColor,
  lineValueSuffix = '',
  lineHeight = 120,
  barHeight = 132,
  lineTooltipName,
  barTooltipName,
  themeKey,
}: DualTrendChartProps) {
  const lineChartRef = useRef<HTMLDivElement>(null);
  const barChartRef = useRef<HTMLDivElement>(null);
  const lineInstance = useRef<Chart | null>(null);
  const barInstance = useRef<Chart | null>(null);

  const resolvedLineColor = lineColor || semanticColor('warning-500', '#d97706');
  const resolvedBarColor = barColor || semanticColor('danger-500', '#ef4444');

  // Line chart
  useEffect(() => {
    if (!lineChartRef.current || lineData.length === 0) return;

    if (lineInstance.current) lineInstance.current.destroy();

    const tokens = getChartTokens();

    const chart = new Chart({
      container: lineChartRef.current,
      autoFit: true,
      height: lineHeight,
      paddingTop: 20,
      paddingRight: 28,
      paddingBottom: 8,
      paddingLeft: 40,
    });

    chart
      .line()
      .data(lineData)
      .encode('x', 'label')
      .encode('y', 'value')
      .style('stroke', resolvedLineColor)
      .style('lineWidth', 2)
      .tooltip({
        title: (d: DualTrendDataItem) => d.label,
        items: [
          {
            channel: 'y',
            name: lineTooltipName || lineTitle,
            valueFormatter: lineValueSuffix
              ? (v: number) => `${v}${lineValueSuffix}`
              : undefined,
          },
        ],
      });

    chart
      .point()
      .data(lineData)
      .encode('x', 'label')
      .encode('y', 'value')
      .style('fill', cssVar('--color-bg-white', tokens.tooltip.bg))
      .style('stroke', resolvedLineColor)
      .style('lineWidth', 2)
      .style('r', 4)
      .tooltip(false);

    // Last-value annotation
    chart
      .text()
      .data(lineData.slice(-1))
      .encode('x', 'label')
      .encode('y', 'value')
      .encode('text', (d: DualTrendDataItem) => `${d.value}${lineValueSuffix}`)
      .style('fill', resolvedLineColor)
      .style('fontSize', 12)
      .style('fontWeight', 600)
      .style('textAlign', 'center')
      .style('dy', -12)
      .tooltip(false);

    chart.axis('x', false);
    chart.axis('y', {
      title: false,
      tickCount: 3,
      labelFormatter: (v: number) => `${v}`,
      line: false,
      tick: false,
      style: {
        labelFontSize: 11,
        labelFill: tokens.axis.label,
      },
    });

    chart.render();
    lineInstance.current = chart;

    return () => {
      chart.destroy();
      lineInstance.current = null;
    };
  }, [lineData, resolvedLineColor, lineValueSuffix, lineHeight, lineTitle, lineTooltipName, themeKey]);

  // Bar chart
  useEffect(() => {
    if (!barChartRef.current || barData.length === 0) return;

    if (barInstance.current) barInstance.current.destroy();

    const tokens = getChartTokens();

    const chart = new Chart({
      container: barChartRef.current,
      autoFit: true,
      height: barHeight,
      paddingTop: 20,
      paddingRight: 28,
      paddingBottom: 25,
      paddingLeft: 40,
    });

    chart
      .interval()
      .data(barData)
      .encode('x', 'label')
      .encode('y', 'value')
      .style('fill', resolvedBarColor)
      .style('radiusTopLeft', 3)
      .style('radiusTopRight', 3)
      .style('maxWidth', 32)
      .tooltip({
        title: (d: DualTrendDataItem) => d.label,
        items: [{ channel: 'y', name: barTooltipName || barTitle }],
      });

    // Last-value annotation
    chart
      .text()
      .data(barData.slice(-1))
      .encode('x', 'label')
      .encode('y', 'value')
      .encode('text', (d: DualTrendDataItem) => `${d.value}`)
      .style('fill', resolvedBarColor)
      .style('fontSize', 12)
      .style('fontWeight', 600)
      .style('textAlign', 'center')
      .style('dy', -12)
      .tooltip(false);

    chart.axis('x', {
      title: false,
      tick: false,
      style: {
        labelFontSize: 11,
        labelFill: tokens.axis.label,
        lineStroke: tokens.axis.grid,
        lineLineWidth: 1,
        lineOpacity: 0.5,
      },
    });
    chart.axis('y', {
      title: false,
      tickCount: 3,
      line: false,
      tick: false,
      style: {
        labelFontSize: 11,
        labelFill: tokens.axis.label,
      },
    });

    chart.render();
    barInstance.current = chart;

    return () => {
      chart.destroy();
      barInstance.current = null;
    };
  }, [barData, resolvedBarColor, barHeight, barTitle, barTooltipName, themeKey]);

  return (
    <div>
      <div style={{ padding: '16px 16px 4px' }}>
        <span style={{ fontSize: 13, fontWeight: 500 }} className="text-text-1">{lineTitle}</span>
      </div>
      <div ref={lineChartRef} style={{ width: '100%', height: lineHeight }} />

      <div style={{ height: 8 }} />

      <div style={{ padding: '0 16px 4px' }}>
        <span style={{ fontSize: 13, fontWeight: 500 }} className="text-text-1">{barTitle}</span>
      </div>
      <div ref={barChartRef} style={{ width: '100%', height: barHeight }} />
    </div>
  );
}

export default DualTrendChart;
