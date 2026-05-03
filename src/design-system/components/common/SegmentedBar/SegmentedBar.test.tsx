import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SegmentedBar, computeSegmentWidths } from './SegmentedBar';
import type { SegmentedBarItem } from './SegmentedBar';

const sampleItems: SegmentedBarItem[] = [
  { label: '满意', value: 70, color: 'var(--chart-5)' },
  { label: '一般', value: 20, color: 'var(--chart-3)' },
  { label: '不满意', value: 10, color: 'var(--chart-1)' },
];

describe('SegmentedBar', () => {
  it('renders segments for each non-zero item', () => {
    const { container } = render(<SegmentedBar items={sampleItems} />);
    const segments = container.querySelectorAll('[style*="background-color"]');
    expect(segments.length).toBe(3);
  });

  it('returns null when total is 0', () => {
    const { container } = render(
      <SegmentedBar items={[{ label: 'a', value: 0, color: 'red' }]} />
    );
    expect(container.firstElementChild).toBeNull();
  });

  it('returns null for empty items', () => {
    const { container } = render(<SegmentedBar items={[]} />);
    expect(container.firstElementChild).toBeNull();
  });

  it('does not render zero-value segments', () => {
    const items: SegmentedBarItem[] = [
      { label: 'a', value: 100, color: 'red' },
      { label: 'b', value: 0, color: 'blue' },
    ];
    const { container } = render(<SegmentedBar items={items} />);
    const segments = container.querySelectorAll('[style*="background-color"]');
    expect(segments.length).toBe(1);
  });

  it('applies rounded-full when rounded=true', () => {
    const { container } = render(<SegmentedBar items={sampleItems} rounded />);
    const bar = container.querySelector('.rounded-full');
    expect(bar).toBeInTheDocument();
  });

  it('applies custom height', () => {
    const { container } = render(<SegmentedBar items={sampleItems} height={32} />);
    const bar = container.querySelector('[style*="height: 32px"]');
    expect(bar).toBeInTheDocument();
  });

  it('has role="img" with aria-label', () => {
    render(<SegmentedBar items={sampleItems} data-testid="bar" />);
    const el = screen.getByTestId('bar');
    expect(el.getAttribute('role')).toBe('img');
    expect(el.getAttribute('aria-label')).toContain('满意');
    expect(el.getAttribute('aria-label')).toContain('一般');
    expect(el.getAttribute('aria-label')).toContain('不满意');
  });

  it('shows tooltip on hover', () => {
    const { container } = render(<SegmentedBar items={sampleItems} />);
    const firstSegment = container.querySelector('[style*="background-color"]')!;
    fireEvent.mouseEnter(firstSegment);
    expect(screen.getByText(/满意: 70/)).toBeInTheDocument();
  });

  it('hides tooltip on mouse leave', () => {
    const { container } = render(<SegmentedBar items={sampleItems} />);
    const firstSegment = container.querySelector('[style*="background-color"]')!;
    fireEvent.mouseEnter(firstSegment);
    fireEvent.mouseLeave(firstSegment);
    expect(screen.queryByText(/满意: 70/)).not.toBeInTheDocument();
  });

  it('appends custom className', () => {
    render(<SegmentedBar items={sampleItems} className="my-bar" data-testid="bar" />);
    expect(screen.getByTestId('bar').className).toContain('my-bar');
  });
});

describe('computeSegmentWidths', () => {
  it('returns proportional widths', () => {
    const items: SegmentedBarItem[] = [
      { label: 'a', value: 50, color: '' },
      { label: 'b', value: 50, color: '' },
    ];
    const widths = computeSegmentWidths(items, 100);
    expect(widths[0]).toBeCloseTo(50);
    expect(widths[1]).toBeCloseTo(50);
  });

  it('guarantees minimum 3% for small values', () => {
    const items: SegmentedBarItem[] = [
      { label: 'big', value: 990, color: '' },
      { label: 'tiny', value: 1, color: '' },
    ];
    const widths = computeSegmentWidths(items, 991);
    expect(widths[1]).toBeGreaterThanOrEqual(3);
  });

  it('returns zeros when total is 0', () => {
    const items: SegmentedBarItem[] = [
      { label: 'a', value: 0, color: '' },
    ];
    const widths = computeSegmentWidths(items, 0);
    expect(widths[0]).toBe(0);
  });
});
