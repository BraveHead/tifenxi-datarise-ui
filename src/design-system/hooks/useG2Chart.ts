import { useRef, useEffect } from 'react';
import { Chart } from '@antv/g2';

/**
 * Hook for managing a G2 chart lifecycle.
 *
 * Returns a ref to attach to the container div.
 * The `config` callback receives a fresh `Chart` instance —
 * call `.line()`, `.interval()`, etc. on it; the hook handles
 * `render()` and `destroy()` automatically.
 *
 * @param config - Function that configures the chart marks/scales/etc.
 * @param deps   - Dependency array; chart is re-created when deps change.
 */
export function useG2Chart(
  config: (chart: Chart) => void,
  deps: unknown[] = []
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Destroy previous chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const chart = new Chart({
      container: containerRef.current,
      autoFit: true,
    });

    config(chart);
    chart.render();
    chartRef.current = chart;

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}
