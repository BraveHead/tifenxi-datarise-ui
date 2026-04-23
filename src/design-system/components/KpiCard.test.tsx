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

  it('renders deltas with correct sentiment colors', () => {
    render(
      <KpiCard name="test" value="100" deltas={[
        { label: 'vs 上月', value: '12.4%', direction: 'up', sentiment: 'good' },
      ]} />,
    );
    const delta = screen.getByText('12.4%');
    expect(delta.parentElement?.className).toContain('text-success-500');
  });

  it('renders bad sentiment delta', () => {
    render(
      <KpiCard name="test" value="100" deltas={[
        { label: 'vs 上月', value: '0.3%', direction: 'up', sentiment: 'bad' },
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
});
