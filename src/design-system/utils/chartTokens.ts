/**
 * Chart token utilities — read CSS custom properties at runtime
 * for use with G2 or other chart libraries.
 */

const SERIES_FALLBACKS_LIGHT = [
  '#FC5F3A', '#1F61E8', '#2770EF', '#F1683D', '#09B982', '#FDC002',
  '#2EABFA', '#7F39EE', '#E440A8', '#E33A3A', '#9FDB1D', '#0FC6C2',
];
const SERIES_FALLBACKS_DARK = [
  '#FD8260', '#4382ED', '#4C8EF2', '#F48962', '#31C793', '#FDCF28',
  '#54C0FB', '#9B5EF1', '#E964B4', '#E9635E', '#B8E24B', '#3AD1C9',
];

const CHART_FALLBACKS_LIGHT = ['#E5484D', '#F5A623', '#C9CED6', '#5DB9A1', '#2BA471'];
const CHART_FALLBACKS_DARK = ['#E9635E', '#FDCF28', '#656B75', '#6ECAB0', '#3DB981'];

/** Detect dark mode from document root class */
function isDarkMode(): boolean {
  return document.documentElement.classList.contains('dark');
}

function getSeriesFallbacks(): string[] {
  return isDarkMode() ? SERIES_FALLBACKS_DARK : SERIES_FALLBACKS_LIGHT;
}

function getChartFallbacks(): string[] {
  return isDarkMode() ? CHART_FALLBACKS_DARK : CHART_FALLBACKS_LIGHT;
}

export function getChartTokens() {
  const s = getComputedStyle(document.documentElement);
  const dark = isDarkMode();
  const seriesFallbacks = getSeriesFallbacks();
  const chartFallbacks = getChartFallbacks();
  return {
    series: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => s.getPropertyValue(`--series-${i}`).trim() || seriesFallbacks[i - 1]),
    chart: [1, 2, 3, 4, 5].map(i => s.getPropertyValue(`--chart-${i}`).trim() || chartFallbacks[i - 1]),
    axis: {
      label: s.getPropertyValue('--fg-secondary').trim() || (dark ? '#9AA1AD' : '#6B7280'),
      grid: s.getPropertyValue('--line').trim() || (dark ? '#2A2F38' : '#E5E7EB'),
    },
    tooltip: {
      bg: s.getPropertyValue('--surface').trim() || (dark ? '#1A1D23' : '#FFFFFF'),
      text: s.getPropertyValue('--fg-body').trim() || (dark ? '#C9CED6' : '#374151'),
      border: s.getPropertyValue('--line').trim() || (dark ? '#2A2F38' : '#E5E7EB'),
    },
  };
}

/** Get a single series color by index (0-based, wraps around 12 colors) */
export function getSeriesColor(index: number): string {
  const s = getComputedStyle(document.documentElement);
  const i = (index % 12) + 1;
  const value = s.getPropertyValue(`--series-${i}`).trim();
  return value || getSeriesFallbacks()[index % 12];
}
