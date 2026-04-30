/**
 * Chart axis utilities
 * Provides "nice" tick generation and domain calculation.
 *
 * Migrated from ti-datarise-frontend/src/utils/chart.ts
 */

/**
 * Generate "nice" tick values using the 1-2-5 step rule (same approach as D3/echarts).
 *
 * Algorithm:
 * 1. Compute roughStep = range / (count - 1)
 * 2. Extract magnitude (e.g. roughStep=275 -> magnitude=100)
 * 3. Normalize roughStep to [1, 10) -> residual (275/100=2.75)
 * 4. Snap to 1/2/5 thresholds -> niceStep (2.75 <= 3.5 -> niceStep=200)
 * 5. Fill ticks from niceMin by niceStep
 *
 * Examples:
 *   domain [0, 1100], count=5 -> 0, 200, 400, 600, 800, 1000
 *   domain [0, 88],   count=5 -> 0, 20, 40, 60, 80
 */
export const generateNiceTicks = (min: number, max: number, count: number): number[] => {
  if (count <= 1) return [min];
  const range = max - min;
  if (range === 0) return Array(count).fill(min);
  const roughStep = range / (count - 1);
  if (roughStep === 0) return Array(count).fill(min);
  const absStep = Math.abs(roughStep);
  const logVal = Math.log10(absStep);
  if (!isFinite(logVal)) return [min, max];
  const magnitude = Math.pow(10, Math.floor(logVal));
  const residual = roughStep / magnitude;
  let niceStep: number;
  if (residual <= 1.5) niceStep = 1 * magnitude;
  else if (residual <= 3.5) niceStep = 2 * magnitude;
  else if (residual <= 7.5) niceStep = 5 * magnitude;
  else niceStep = 10 * magnitude;

  const niceMin = Math.floor(min / niceStep) * niceStep;
  const ticks: number[] = [];
  for (let v = niceMin; v <= max + niceStep * 0.01; v += niceStep) {
    ticks.push(Math.round(v * 1000) / 1000);
  }
  return ticks;
};

/**
 * Calculate axis domain (value range), lower bound fixed at 0.
 *
 * When a reference line is present, center it:
 *   upper = max(dataMax, refValue * 2) * 1.1
 *
 * Without reference line:
 *   upper = dataMax * 1.1
 */
export const calculateDomain = (values: number[], refValue?: number): [number, number] => {
  if (values.length === 0) {
    return refValue != null ? [0, Math.max(10, 2 * refValue)] : [0, 10];
  }
  const maxData = Math.max(...values);
  const upperBound =
    refValue != null ? Math.max(maxData, 2 * refValue) * 1.1 : maxData * 1.1;
  return [0, Math.max(upperBound, 1)];
};
