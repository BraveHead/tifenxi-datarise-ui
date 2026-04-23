import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { KpiCard } from './KpiCard';

describe('KpiCard', () => {
  it('renders name and value', () => {
    render(<KpiCard name="总样本量" value="2,090" />);
    expect(screen.getByText('总样本量')).toBeInTheDocument();
    expect(screen.getByText('2,090')).toBeInTheDocument();
  });

  it('renders unit', () => {
    render(<KpiCard name="test" value="100" unit="份" />);
    expect(screen.getByText('份')).toBeInTheDocument();
  });

  it('renders deltas with label before value', () => {
    render(
      <KpiCard name="test" value="100" deltas={[
        { label: '同比', value: '12.4%', direction: 'up', sentiment: 'good' },
      ]} />,
    );
    const deltaRow = screen.getByText('同比').closest('span[class*="inline-flex"]')!;
    const children = Array.from(deltaRow.children).map(c => c.textContent);
    // Order should be: arrow, label, value
    expect(children).toEqual(['▲', '同比', '12.4%']);
  });

  it('renders deltas with correct sentiment colors', () => {
    render(
      <KpiCard name="test" value="100" deltas={[
        { label: '同比', value: '12.4%', direction: 'up', sentiment: 'good' },
      ]} />,
    );
    const delta = screen.getByText('12.4%');
    expect(delta.parentElement?.className).toContain('text-success-500');
  });

  it('renders bad sentiment delta', () => {
    render(
      <KpiCard name="test" value="100" deltas={[
        { label: '环比', value: '0.3%', direction: 'up', sentiment: 'bad' },
      ]} />,
    );
    const delta = screen.getByText('0.3%');
    expect(delta.parentElement?.className).toContain('text-danger-500');
  });

  it('renders danger variant with red bar', () => {
    const { container } = render(<KpiCard name="低分占比" value="3.0" danger />);
    const redBar = container.querySelector('.bg-danger-500');
    expect(redBar).toBeInTheDocument();
  });

  it('renders highlight variant with brand bar', () => {
    const { container } = render(<KpiCard name="满意度" value="97.2" highlight />);
    const brandBar = container.querySelector('.bg-brand-500');
    expect(brandBar).toBeInTheDocument();
  });

  it('danger takes precedence over highlight', () => {
    const { container } = render(<KpiCard name="test" value="1" danger highlight />);
    expect(container.querySelector('.bg-danger-500')).toBeInTheDocument();
    expect(container.querySelector('.bg-brand-500')).not.toBeInTheDocument();
  });

  it('renders icon badge', () => {
    render(<KpiCard name="test" value="100" icon={<span data-testid="icon">★</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders sparkline slot', () => {
    render(<KpiCard name="test" value="100" sparkline={<svg data-testid="spark" />} />);
    expect(screen.getByTestId('spark')).toBeInTheDocument();
  });

  it('renders without optional props', () => {
    render(<KpiCard name="简单指标" value="42" />);
    expect(screen.getByText('简单指标')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('applies nameClassName to name element', () => {
    render(<KpiCard name="自定义名称" value="100" nameClassName="text-brand-500 font-semibold" />);
    const nameEl = screen.getByText('自定义名称');
    expect(nameEl.className).toContain('text-brand-500');
    expect(nameEl.className).toContain('font-semibold');
    expect(nameEl.className).not.toContain('text-neutral-500');
  });

  it('uses default name color when nameClassName is not provided', () => {
    render(<KpiCard name="默认名称" value="100" />);
    const nameEl = screen.getByText('默认名称');
    expect(nameEl.className).toContain('text-neutral-500');
  });
});
