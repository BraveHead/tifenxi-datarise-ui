import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DeltaBadge } from './DeltaBadge';

describe('DeltaBadge', () => {
  // ─── 基础渲染 ───

  it('renders positive value with up arrow', () => {
    render(<DeltaBadge value={2.4} />);
    expect(screen.getByText('2.4%')).toBeInTheDocument();
  });

  it('renders negative value with down arrow', () => {
    render(<DeltaBadge value={-1.2} />);
    expect(screen.getByText('1.2%')).toBeInTheDocument();
  });

  it('renders zero value as flat', () => {
    render(<DeltaBadge value={0} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('displays absolute value (no negative sign)', () => {
    render(<DeltaBadge value={-5.5} />);
    expect(screen.getByText('5.5%')).toBeInTheDocument();
    expect(screen.queryByText('-5.5%')).not.toBeInTheDocument();
  });

  // ─── label ───

  it('renders label when provided', () => {
    render(<DeltaBadge value={2.4} label="同比" />);
    expect(screen.getByText('同比')).toBeInTheDocument();
  });

  it('does not render label when omitted', () => {
    const { container } = render(<DeltaBadge value={2.4} />);
    const fontSansSpans = container.querySelectorAll('.font-sans');
    expect(fontSansSpans.length).toBe(0);
  });

  // ─── unit ───

  it('uses % as default unit', () => {
    render(<DeltaBadge value={3} />);
    expect(screen.getByText('3%')).toBeInTheDocument();
  });

  it('supports custom unit', () => {
    render(<DeltaBadge value={4.2} unit="pp" />);
    expect(screen.getByText('4.2pp')).toBeInTheDocument();
  });

  // ─── direction → SVG icon ───

  it('renders up chevron SVG for positive value', () => {
    const { container } = render(<DeltaBadge value={1} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg?.querySelector('path')?.getAttribute('d')).toContain('M18 15');
  });

  it('renders down chevron SVG for negative value', () => {
    const { container } = render(<DeltaBadge value={-1} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg?.querySelector('path')?.getAttribute('d')).toContain('M6 9');
  });

  it('renders flat line SVG for zero value', () => {
    const { container } = render(<DeltaBadge value={0} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg?.querySelector('path')?.getAttribute('d')).toContain('M5 12h14');
  });

  // ─── 默认语义色：涨=danger, 跌=success（医疗场景） ───

  it('default: positive value uses danger color (问题增多=警示)', () => {
    const { container } = render(<DeltaBadge value={2} />);
    expect(container.firstElementChild?.className).toContain('text-danger-500');
  });

  it('default: negative value uses success color', () => {
    const { container } = render(<DeltaBadge value={-2} />);
    expect(container.firstElementChild?.className).toContain('text-success-500');
  });

  it('flat value uses neutral color', () => {
    const { container } = render(<DeltaBadge value={0} />);
    expect(container.firstElementChild?.className).toContain('text-neutral-500');
  });

  // ─── inverse 模式：涨=success, 跌=danger（满意度等正向指标） ───

  it('inverse: positive value uses success color', () => {
    const { container } = render(<DeltaBadge value={2} inverse />);
    expect(container.firstElementChild?.className).toContain('text-success-500');
  });

  it('inverse: negative value uses danger color', () => {
    const { container } = render(<DeltaBadge value={-2} inverse />);
    expect(container.firstElementChild?.className).toContain('text-danger-500');
  });

  // ─── size ───

  it('defaults to sm size', () => {
    const { container } = render(<DeltaBadge value={1} />);
    expect(container.firstElementChild?.className).toContain('text-[11px]');
  });

  it('applies md size classes', () => {
    const { container } = render(<DeltaBadge value={1} size="md" />);
    expect(container.firstElementChild?.className).toContain('text-fs-12');
  });

  // ─── className 透传 ───

  it('appends custom className', () => {
    const { container } = render(<DeltaBadge value={1} className="my-custom" />);
    expect(container.firstElementChild?.className).toContain('my-custom');
  });

  // ─── HTML 属性透传 ───

  it('passes through data-* attributes', () => {
    render(<DeltaBadge value={1} data-testid="delta" />);
    expect(screen.getByTestId('delta')).toBeInTheDocument();
  });
});
