import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { KpiCard } from './KpiCard';

describe('KpiCard', () => {
  // ─── 基础渲染 ───

  it('renders name and value', () => {
    render(<KpiCard name="总样本量" value="2,090" />);
    expect(screen.getByText('总样本量')).toBeInTheDocument();
    expect(screen.getByText('2,090')).toBeInTheDocument();
  });

  it('renders numeric value', () => {
    render(<KpiCard name="test" value={42} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders without optional props', () => {
    render(<KpiCard name="简单指标" value="100" />);
    expect(screen.getByText('简单指标')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  // ─── unit ───

  it('renders unit', () => {
    render(<KpiCard name="test" value="100" unit="份" />);
    expect(screen.getByText('份')).toBeInTheDocument();
  });

  it('does not render unit element when unit is omitted', () => {
    const { container } = render(<KpiCard name="test" value="100" />);
    const unitEl = container.querySelector('.font-sans.text-neutral-500');
    // value 区域的 unit span 不应存在
    expect(unitEl).not.toBeInTheDocument();
  });

  // ─── name 样式 ───

  it('uses default name color when nameClassName is not provided', () => {
    render(<KpiCard name="默认名称" value="100" />);
    const nameEl = screen.getByText('默认名称');
    expect(nameEl.className).toContain('text-neutral-500');
  });

  it('applies nameClassName and replaces default color', () => {
    render(<KpiCard name="自定义名称" value="100" nameClassName="text-brand-500 font-semibold" />);
    const nameEl = screen.getByText('自定义名称');
    expect(nameEl.className).toContain('text-brand-500');
    expect(nameEl.className).toContain('font-semibold');
    expect(nameEl.className).not.toContain('text-neutral-500');
  });

  // ─── icon badge ───

  it('renders icon badge', () => {
    render(<KpiCard name="test" value="100" icon={<span data-testid="icon">★</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('does not render icon badge when icon is omitted', () => {
    const { container } = render(<KpiCard name="test" value="100" />);
    const badge = container.querySelector('.rounded-lg.inline-flex');
    expect(badge).not.toBeInTheDocument();
  });

  it.each([
    ['mood', 'bg-[#eef2ff]'],
    ['pulse', 'bg-[#ecfdf5]'],
    ['trend', 'bg-[#f5f3ff]'],
    ['alert', 'bg-[#fff1ea]'],
    ['users', 'bg-[#fdf2f8]'],
    ['default', 'bg-neutral-100'],
  ] as const)('applies %s icon variant class', (variant, expectedClass) => {
    const { container } = render(
      <KpiCard name="test" value="1" icon={<span>★</span>} iconVariant={variant} />,
    );
    const badge = container.querySelector('.inline-flex.items-center.justify-center');
    expect(badge?.className).toContain(expectedClass);
  });

  it('uses default icon variant when iconVariant is omitted', () => {
    const { container } = render(
      <KpiCard name="test" value="1" icon={<span>★</span>} />,
    );
    const badge = container.querySelector('.inline-flex.items-center.justify-center');
    expect(badge?.className).toContain('bg-neutral-100');
  });

  // ─── delta 渲染 ───

  it('renders deltas with label before value (arrow → label → value)', () => {
    render(
      <KpiCard name="test" value="100" deltas={[
        { label: '同比', value: '12.4%', direction: 'up', sentiment: 'good' },
      ]} />,
    );
    const deltaRow = screen.getByText('同比').closest('span[class*="inline-flex"]')!;
    const children = Array.from(deltaRow.children).map(c => c.textContent);
    expect(children).toEqual(['▲', '同比', '12.4%']);
  });

  it('renders up arrow for direction=up', () => {
    render(
      <KpiCard name="test" value="1" deltas={[
        { label: 'l', value: 'v', direction: 'up', sentiment: 'good' },
      ]} />,
    );
    expect(screen.getByText('▲')).toBeInTheDocument();
  });

  it('renders down arrow for direction=down', () => {
    render(
      <KpiCard name="test" value="1" deltas={[
        { label: 'l', value: 'v', direction: 'down', sentiment: 'good' },
      ]} />,
    );
    expect(screen.getByText('▼')).toBeInTheDocument();
  });

  it('renders good sentiment with success color', () => {
    render(
      <KpiCard name="test" value="100" deltas={[
        { label: '同比', value: '12.4%', direction: 'up', sentiment: 'good' },
      ]} />,
    );
    const delta = screen.getByText('12.4%');
    expect(delta.parentElement?.className).toContain('text-success-500');
  });

  it('renders bad sentiment with danger color', () => {
    render(
      <KpiCard name="test" value="100" deltas={[
        { label: '环比', value: '0.3%', direction: 'up', sentiment: 'bad' },
      ]} />,
    );
    const delta = screen.getByText('0.3%');
    expect(delta.parentElement?.className).toContain('text-danger-500');
  });

  it('renders multiple deltas', () => {
    render(
      <KpiCard name="test" value="1" deltas={[
        { label: '同比', value: '1.0%', direction: 'up', sentiment: 'good' },
        { label: '环比', value: '2.0%', direction: 'down', sentiment: 'bad' },
      ]} />,
    );
    expect(screen.getByText('同比')).toBeInTheDocument();
    expect(screen.getByText('环比')).toBeInTheDocument();
    expect(screen.getByText('1.0%')).toBeInTheDocument();
    expect(screen.getByText('2.0%')).toBeInTheDocument();
    expect(screen.getByText('▲')).toBeInTheDocument();
    expect(screen.getByText('▼')).toBeInTheDocument();
  });

  it('does not render delta section when deltas is empty', () => {
    const { container } = render(<KpiCard name="test" value="1" deltas={[]} />);
    const deltaRow = container.querySelector('.gap-sp-4');
    expect(deltaRow).not.toBeInTheDocument();
  });

  it('does not render delta section when deltas is omitted', () => {
    const { container } = render(<KpiCard name="test" value="1" />);
    const deltaRow = container.querySelector('.gap-sp-4');
    expect(deltaRow).not.toBeInTheDocument();
  });

  // ─── sparkline ───

  it('renders sparkline slot', () => {
    render(<KpiCard name="test" value="100" sparkline={<svg data-testid="spark" />} />);
    expect(screen.getByTestId('spark')).toBeInTheDocument();
  });

  it('does not render sparkline container when sparkline is omitted', () => {
    const { container } = render(<KpiCard name="test" value="1" />);
    const sparkContainer = container.querySelector('.mb-sp-4.h-9');
    expect(sparkContainer).not.toBeInTheDocument();
  });

  // ─── danger 变体 ───

  it('renders danger variant with red bar', () => {
    const { container } = render(<KpiCard name="低分占比" value="3.0" danger />);
    const redBar = container.querySelector('.bg-danger-500');
    expect(redBar).toBeInTheDocument();
  });

  it('renders danger variant with gradient background', () => {
    const { container } = render(<KpiCard name="test" value="1" danger />);
    const root = container.firstElementChild!;
    expect(root.className).toContain('from-[#fff1ea]');
    expect(root.className).toContain('border-[#fcd9c6]');
  });

  // ─── highlight 变体 ───

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

  it('no accent bar when neither danger nor highlight', () => {
    const { container } = render(<KpiCard name="test" value="1" />);
    expect(container.querySelector('.bg-danger-500')).not.toBeInTheDocument();
    expect(container.querySelector('.bg-brand-500')).not.toBeInTheDocument();
  });

  // ─── 默认样式 ───

  it('renders normal card with default background and border', () => {
    const { container } = render(<KpiCard name="test" value="1" />);
    const root = container.firstElementChild!;
    expect(root.className).toContain('bg-neutral-0');
    expect(root.className).toContain('border-neutral-100');
  });

  // ─── className & HTML 属性透传 ───

  it('passes custom className to root element', () => {
    const { container } = render(<KpiCard name="test" value="1" className="my-custom-class" />);
    const root = container.firstElementChild!;
    expect(root.className).toContain('my-custom-class');
  });

  it('passes HTML attributes through rest props', () => {
    render(<KpiCard name="test" value="1" data-testid="kpi-root" aria-label="KPI card" />);
    const root = screen.getByTestId('kpi-root');
    expect(root).toBeInTheDocument();
    expect(root).toHaveAttribute('aria-label', 'KPI card');
  });
});
