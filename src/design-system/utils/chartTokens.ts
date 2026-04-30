/**
 * Chart token utilities — read CSS custom properties at runtime
 * for use with G2 or other chart libraries.
 */

const SERIES_FALLBACKS = ['#3B82F6', '#2BA471', '#F5A623', '#8B5CF6', '#EC4899', '#14B8A6'];
const CHART_FALLBACKS = ['#3B82F6', '#2BA471', '#F5A623', '#E5484D', '#8B5CF6'];

export function getChartTokens() {
  const s = getComputedStyle(document.documentElement);
  return {
    series: [1, 2, 3, 4, 5, 6].map(i => s.getPropertyValue(`--series-${i}`).trim() || SERIES_FALLBACKS[i - 1]),
    chart: [1, 2, 3, 4, 5].map(i => s.getPropertyValue(`--chart-${i}`).trim() || CHART_FALLBACKS[i - 1]),
    axis: {
      label: s.getPropertyValue('--fg-secondary').trim() || '#6B7280',
      grid: s.getPropertyValue('--line').trim() || '#E5E7EB',
    },
    tooltip: {
      bg: s.getPropertyValue('--surface').trim() || '#FFFFFF',
      text: s.getPropertyValue('--fg-body').trim() || '#374151',
      border: s.getPropertyValue('--line').trim() || '#E5E7EB',
    },
  };
}

/** Get a single series color by index (0-based, wraps around) */
export function getSeriesColor(index: number): string {
  const s = getComputedStyle(document.documentElement);
  const i = (index % 6) + 1;
  const value = s.getPropertyValue(`--series-${i}`).trim();
  return value || SERIES_FALLBACKS[index % 6];
}
