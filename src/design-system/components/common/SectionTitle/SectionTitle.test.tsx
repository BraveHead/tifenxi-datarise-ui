import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SectionTitle } from './SectionTitle';

describe('SectionTitle', () => {
  // ─── 基础渲染 ───

  it('renders title text', () => {
    render(<SectionTitle title="科室排名" />);
    expect(screen.getByText('科室排名')).toBeInTheDocument();
  });

  // ─── number 编号徽章 ───

  it('renders number badge when provided', () => {
    render(<SectionTitle number={1} title="标题" />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('does not render number badge when omitted', () => {
    const { container } = render(<SectionTitle title="标题" />);
    const badge = container.querySelector('.rounded-full');
    expect(badge).not.toBeInTheDocument();
  });

  it('applies default brand color to number badge', () => {
    const { container } = render(<SectionTitle number={1} title="标题" />);
    const badge = container.querySelector('.rounded-full');
    expect(badge?.className).toContain('bg-brand-500');
  });

  it('applies custom numberColor', () => {
    const { container } = render(<SectionTitle number={2} title="标题" numberColor="bg-success-500" />);
    const badge = container.querySelector('.rounded-full');
    expect(badge?.className).toContain('bg-success-500');
    expect(badge?.className).not.toContain('bg-brand-500');
  });

  // ─── description ───

  it('renders description when provided', () => {
    render(<SectionTitle title="标题" description="描述文字" />);
    expect(screen.getByText('描述文字')).toBeInTheDocument();
  });

  it('does not render description when omitted', () => {
    const { container } = render(<SectionTitle title="标题" />);
    const descEl = container.querySelector('.text-neutral-500');
    expect(descEl).not.toBeInTheDocument();
  });

  it('description indent aligns with title when number is present', () => {
    const { container } = render(<SectionTitle number={1} title="标题" description="描述" />);
    const descEl = screen.getByText('描述');
    expect(descEl.style.marginLeft).toBe('32px');
  });

  it('description has no indent when number is absent', () => {
    const { container } = render(<SectionTitle title="标题" description="描述" />);
    const descEl = screen.getByText('描述');
    expect(descEl.style.marginLeft).toBe('0px');
  });

  // ─── extra 插槽 ───

  it('renders extra slot after title', () => {
    render(<SectionTitle title="标题" extra={<span data-testid="extra">附加</span>} />);
    expect(screen.getByTestId('extra')).toBeInTheDocument();
  });

  // ─── action 插槽 ───

  it('renders action slot on the right', () => {
    render(<SectionTitle title="标题" action={<button>导出</button>} />);
    expect(screen.getByText('导出')).toBeInTheDocument();
  });

  it('action slot has ml-auto for right alignment', () => {
    const { container } = render(<SectionTitle title="标题" action={<button>导出</button>} />);
    const actionWrapper = container.querySelector('.ml-auto');
    expect(actionWrapper).toBeInTheDocument();
  });

  // ─── className 透传 ───

  it('appends custom className', () => {
    const { container } = render(<SectionTitle title="标题" className="my-custom" />);
    expect(container.firstElementChild?.className).toContain('my-custom');
  });

  // ─── HTML 属性透传 ───

  it('passes through data-* attributes', () => {
    render(<SectionTitle title="标题" data-testid="section" />);
    expect(screen.getByTestId('section')).toBeInTheDocument();
  });
});
