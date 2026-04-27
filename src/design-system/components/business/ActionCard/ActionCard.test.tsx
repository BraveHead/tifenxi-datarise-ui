import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ActionCard } from './ActionCard';

describe('ActionCard', () => {
  // ─── 基础渲染 ───

  it('renders title', () => {
    render(<ActionCard priority="high" title="优化候诊流程" />);
    expect(screen.getByText('优化候诊流程')).toBeInTheDocument();
  });

  // ─── priority → 徽章文字 ───

  it('high priority shows 高优先 badge', () => {
    render(<ActionCard priority="high" title="t" />);
    expect(screen.getByText('高优先')).toBeInTheDocument();
  });

  it('medium priority shows 中优先 badge', () => {
    render(<ActionCard priority="medium" title="t" />);
    expect(screen.getByText('中优先')).toBeInTheDocument();
  });

  it('low priority shows 低优先 badge', () => {
    render(<ActionCard priority="low" title="t" />);
    expect(screen.getByText('低优先')).toBeInTheDocument();
  });

  // ─── priority → 徽章色 ───

  it('high priority badge uses danger colors', () => {
    render(<ActionCard priority="high" title="t" />);
    const badge = screen.getByText('高优先');
    expect(badge.className).toContain('text-danger-500');
  });

  it('low priority badge uses neutral colors', () => {
    render(<ActionCard priority="low" title="t" />);
    const badge = screen.getByText('低优先');
    expect(badge.className).toContain('text-neutral-500');
  });

  // ─── description ───

  it('renders description when provided', () => {
    render(<ActionCard priority="high" title="t" description="描述文字" />);
    expect(screen.getByText('描述文字')).toBeInTheDocument();
  });

  it('does not render description when omitted', () => {
    const { container } = render(<ActionCard priority="high" title="t" />);
    const descEl = container.querySelector('.text-fs-13.text-neutral-500');
    expect(descEl).not.toBeInTheDocument();
  });

  // ─── steps ───

  it('renders steps list', () => {
    render(<ActionCard priority="high" title="t" steps={['步骤一', '步骤二']} />);
    expect(screen.getByText('步骤一')).toBeInTheDocument();
    expect(screen.getByText('步骤二')).toBeInTheDocument();
  });

  it('renders correct number of step items', () => {
    const { container } = render(<ActionCard priority="high" title="t" steps={['a', 'b', 'c']} />);
    const items = container.querySelectorAll('li');
    expect(items.length).toBe(3);
  });

  it('does not render steps area when omitted', () => {
    const { container } = render(<ActionCard priority="high" title="t" />);
    const list = container.querySelector('ul');
    expect(list).not.toBeInTheDocument();
  });

  it('does not render steps area when empty array', () => {
    const { container } = render(<ActionCard priority="high" title="t" steps={[]} />);
    const list = container.querySelector('ul');
    expect(list).not.toBeInTheDocument();
  });

  // ─── verification ───

  it('renders verification text', () => {
    render(<ActionCard priority="high" title="t" verification="验证：差评下降50%" />);
    expect(screen.getByText('验证：差评下降50%')).toBeInTheDocument();
  });

  it('verification area has secondary background', () => {
    render(<ActionCard priority="high" title="t" verification="验证" />);
    const verEl = screen.getByText('验证');
    expect(verEl.className).toContain('bg-neutral-50');
  });

  // ─── actions 插槽 ───

  it('renders action buttons', () => {
    render(<ActionCard priority="high" title="t" actions={<button>创建任务</button>} />);
    expect(screen.getByText('创建任务')).toBeInTheDocument();
  });

  it('does not render actions area when omitted', () => {
    const { container } = render(<ActionCard priority="high" title="t" />);
    const actionArea = container.querySelector('.justify-end');
    expect(actionArea).not.toBeInTheDocument();
  });

  // ─── 自定义 icon ───

  it('renders custom icon when provided', () => {
    render(<ActionCard priority="high" title="t" icon={<span data-testid="custom">★</span>} />);
    expect(screen.getByTestId('custom')).toBeInTheDocument();
  });

  it('renders default icon when icon not provided', () => {
    const { container } = render(<ActionCard priority="high" title="t" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  // ─── className 透传 ───

  it('appends custom className', () => {
    const { container } = render(<ActionCard priority="high" title="t" className="my-custom" />);
    expect(container.firstElementChild?.className).toContain('my-custom');
  });

  // ─── HTML 属性透传 ───

  it('passes through data-* attributes', () => {
    render(<ActionCard priority="high" title="t" data-testid="action" />);
    expect(screen.getByTestId('action')).toBeInTheDocument();
  });
});
