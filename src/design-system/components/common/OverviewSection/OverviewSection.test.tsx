import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OverviewSection } from './OverviewSection';

describe('OverviewSection', () => {
  it('renders title as h2', () => {
    render(<OverviewSection title="模块概览" />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('模块概览');
  });

  it('renders as section with aria-labelledby', () => {
    render(<OverviewSection title="概览" />);
    const section = document.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section!.getAttribute('aria-labelledby')).toBeTruthy();
  });

  it('renders description when provided', () => {
    render(<OverviewSection title="概览" description="全局数据总览" />);
    expect(screen.getByText('全局数据总览')).toBeInTheDocument();
  });

  it('does not render description when omitted', () => {
    const { container } = render(<OverviewSection title="概览" />);
    expect(container.querySelectorAll('p')).toHaveLength(0);
  });

  it('renders extra slot', () => {
    render(<OverviewSection title="概览" extra="更新于 10 分钟前" />);
    expect(screen.getByText('更新于 10 分钟前')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <OverviewSection title="概览">
        <div data-testid="content">内容区域</div>
      </OverviewSection>
    );
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('appends custom className', () => {
    const { container } = render(<OverviewSection title="概览" className="my-section" />);
    expect(container.querySelector('section')!.className).toContain('my-section');
  });

  it('passes through data-* attributes', () => {
    const { container } = render(<OverviewSection title="概览" data-testid="section" />);
    expect(container.querySelector('[data-testid="section"]')).toBeInTheDocument();
  });
});
