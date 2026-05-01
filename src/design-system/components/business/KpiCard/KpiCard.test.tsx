import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { KpiCard } from './KpiCard';

describe('KpiCard', () => {
  // ─── 基础渲染 ───

  it('renders title and value', () => {
    render(<KpiCard title="总样本量" value="2,090" />);
    expect(screen.getByText('总样本量')).toBeInTheDocument();
    expect(screen.getByText('2,090')).toBeInTheDocument();
  });

  it('renders numeric value', () => {
    render(<KpiCard title="test" value={42} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders without optional props', () => {
    render(<KpiCard title="简单指标" value="100" />);
    expect(screen.getByText('简单指标')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  // ─── unit ───

  it('renders unit', () => {
    render(<KpiCard title="test" value="100" unit="份" />);
    expect(screen.getByText('份')).toBeInTheDocument();
  });

  // ─── icon ───

  it('renders icon with background', () => {
    render(<KpiCard title="test" value="100" icon={<span data-testid="icon">★</span>} iconBgColor="bg-blue-100" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('does not render icon when omitted', () => {
    const { container } = render(<KpiCard title="test" value="100" />);
    const badges = container.querySelectorAll('.w-8.h-8');
    expect(badges).toHaveLength(0);
  });

  // ─── comparison ───

  it('renders yoy and mom labels', () => {
    render(
      <KpiCard title="test" value="100" comparison={{ yoy: 12.4, mom: -3.2 }} />,
    );
    expect(screen.getByText('同比')).toBeInTheDocument();
    expect(screen.getByText('环比')).toBeInTheDocument();
    expect(screen.getByText('12.4%')).toBeInTheDocument();
    expect(screen.getByText('3.2%')).toBeInTheDocument();
  });

  it('renders up arrow for positive yoy', () => {
    const { container } = render(
      <KpiCard title="test" value="100" comparison={{ yoy: 5.0, mom: 0 }} />,
    );
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(1);
  });

  it('renders down arrow for negative mom', () => {
    const { container } = render(
      <KpiCard title="test" value="100" comparison={{ yoy: 0, mom: -2.5 }} />,
    );
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(1);
  });

  it('renders dash for null comparison value', () => {
    render(
      <KpiCard title="test" value="100" comparison={{ yoy: null, mom: null }} />,
    );
    const dashes = screen.getAllByText('-');
    expect(dashes).toHaveLength(2);
  });

  it('does not render comparison section when omitted', () => {
    render(<KpiCard title="test" value="1" />);
    expect(screen.queryByText('同比')).not.toBeInTheDocument();
  });

  // ─── sparkline ───

  it('renders sparkline slot', () => {
    render(<KpiCard title="test" value="100" sparkline={<svg data-testid="spark" />} />);
    expect(screen.getByTestId('spark')).toBeInTheDocument();
  });

  // ─── highlight ───

  it('renders highlight with left border emphasis', () => {
    const { container } = render(<KpiCard title="满意度" value="97.2" highlight />);
    const root = container.firstElementChild! as HTMLElement;
    expect(root.style.borderWidth).toBe('1px 1px 1px 4px');
    expect(root.style.borderLeftColor).toContain('var(--danger-500');
  });

  // ─── danger ───

  it('renders danger card with danger bg', () => {
    const { container } = render(<KpiCard title="低分占比" value="3.0" danger />);
    const root = container.firstElementChild! as HTMLElement;
    expect(root.style.backgroundColor).toContain('var(--danger-bg');
    expect(root.style.borderWidth).toBe('1px 1px 1px 4px');
  });

  it('danger takes precedence over highlight', () => {
    const { container } = render(<KpiCard title="test" value="1" danger highlight />);
    const root = container.firstElementChild! as HTMLElement;
    expect(root.style.backgroundColor).toContain('var(--danger-bg');
  });

  // ─── extra ───

  it('renders extra slot next to comparison', () => {
    render(
      <KpiCard
        title="test"
        value="100"
        comparison={{ yoy: 1.0, mom: 0 }}
        extra={<button data-testid="attr-btn">智能归因</button>}
      />,
    );
    expect(screen.getByTestId('attr-btn')).toBeInTheDocument();
  });

  // ─── className & HTML 属性透传 ───

  it('passes custom className', () => {
    const { container } = render(<KpiCard title="test" value="1" className="my-custom" />);
    expect(container.firstElementChild!.className).toContain('my-custom');
  });

  it('passes custom className through props', () => {
    const { container } = render(<KpiCard title="test" value="1" className="test-class" />);
    expect(container.firstElementChild!.className).toContain('test-class');
  });
});
