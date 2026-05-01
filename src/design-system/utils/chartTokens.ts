/**
 * Chart token utilities — read CSS custom properties at runtime
 * for use with G2 or other chart libraries.
 */

const SERIES_FALLBACKS = [
  '#FC5F3A', '#1F61E8', '#2770EF', '#F1683D', '#09B982', '#FDC002',
  '#2EABFA', '#7F39EE', '#E440A8', '#E33A3A', '#9FDB1D', '#0FC6C2',
];
const CHART_FALLBACKS = ['#E5484D', '#F5A623', '#C9CED6', '#5DB9A1', '#2BA471'];

export function getChartTokens() {
  const s = getComputedStyle(document.documentElement);
  return {
    series: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => s.getPropertyValue(`--series-${i}`).trim() || SERIES_FALLBACKS[i - 1]),
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

/** Get a single series color by index (0-based, wraps around 12 colors) */
export function getSeriesColor(index: number): string {
  const s = getComputedStyle(document.documentElement);
  const i = (index % 12) + 1;
  const value = s.getPropertyValue(`--series-${i}`).trim();
  return value || SERIES_FALLBACKS[index % 12];
}
