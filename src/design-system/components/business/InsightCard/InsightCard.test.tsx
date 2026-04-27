import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InsightCard } from './InsightCard';

describe('InsightCard', () => {
  // ─── 基础渲染 ───

  it('renders title and description', () => {
    render(<InsightCard type="positive" title="标题" description="描述" />);
    expect(screen.getByText('标题')).toBeInTheDocument();
    expect(screen.getByText('描述')).toBeInTheDocument();
  });

  // ─── type → 左边框色 ───

  it('positive type has success border', () => {
    const { container } = render(<InsightCard type="positive" title="t" description="d" />);
    expect(container.firstElementChild?.className).toContain('border-l-success-500');
  });

  it('negative type has danger border', () => {
    const { container } = render(<InsightCard type="negative" title="t" description="d" />);
    expect(container.firstElementChild?.className).toContain('border-l-danger-500');
  });

  it('warning type has warning border', () => {
    const { container } = render(<InsightCard type="warning" title="t" description="d" />);
    expect(container.firstElementChild?.className).toContain('border-l-warning-500');
  });

  it('neutral type has brand border', () => {
    const { container } = render(<InsightCard type="neutral" title="t" description="d" />);
    expect(container.firstElementChild?.className).toContain('border-l-brand-500');
  });

  // ─── type → 图标背景色 ───

  it('positive type icon has success background', () => {
    const { container } = render(<InsightCard type="positive" title="t" description="d" />);
    const iconEl = container.querySelector('.rounded-lg.inline-flex');
    expect(iconEl?.className).toContain('bg-success-bg');
  });

  it('negative type icon has danger background', () => {
    const { container } = render(<InsightCard type="negative" title="t" description="d" />);
    const iconEl = container.querySelector('.rounded-lg.inline-flex');
    expect(iconEl?.className).toContain('bg-danger-bg');
  });

  // ─── 默认图标 ───

  it('renders default icon SVG per type', () => {
    const { container } = render(<InsightCard type="positive" title="t" description="d" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  // ─── 自定义 icon ───

  it('renders custom icon when provided', () => {
    render(<InsightCard type="positive" title="t" description="d" icon={<span data-testid="custom-icon">★</span>} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  // ─── footer 插槽 ───

  it('renders footer when provided', () => {
    render(<InsightCard type="positive" title="t" description="d" footer={<span>Footer</span>} />);
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('does not render footer area when omitted', () => {
    const { container } = render(<InsightCard type="positive" title="t" description="d" />);
    // footer 容器不应存在
    const footerArea = container.querySelector('.mt-sp-2.flex-wrap');
    expect(footerArea).not.toBeInTheDocument();
  });

  // ─── className 透传 ───

  it('appends custom className', () => {
    const { container } = render(<InsightCard type="positive" title="t" description="d" className="my-custom" />);
    expect(container.firstElementChild?.className).toContain('my-custom');
  });

  // ─── HTML 属性透传 ───

  it('passes through data-* attributes', () => {
    render(<InsightCard type="positive" title="t" description="d" data-testid="insight" />);
    expect(screen.getByTestId('insight')).toBeInTheDocument();
  });
});
