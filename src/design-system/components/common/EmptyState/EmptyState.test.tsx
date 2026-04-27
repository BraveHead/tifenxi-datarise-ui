import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  // ─── 基础渲染 ───

  it('renders default no-data variant', () => {
    render(<EmptyState />);
    expect(screen.getByText('暂无数据')).toBeInTheDocument();
    expect(screen.getByText('当前时间段内没有相关记录，请调整筛选条件')).toBeInTheDocument();
  });

  // ─── variant ───

  it('renders no-data default text', () => {
    render(<EmptyState variant="no-data" />);
    expect(screen.getByText('暂无数据')).toBeInTheDocument();
  });

  it('renders no-result default text', () => {
    render(<EmptyState variant="no-result" />);
    expect(screen.getByText('未找到匹配结果')).toBeInTheDocument();
  });

  it('renders error default text', () => {
    render(<EmptyState variant="error" />);
    expect(screen.getByText('数据加载失败')).toBeInTheDocument();
  });

  // ─── 自定义 title / description ───

  it('uses custom title when provided', () => {
    render(<EmptyState title="自定义标题" />);
    expect(screen.getByText('自定义标题')).toBeInTheDocument();
  });

  it('uses custom description when provided', () => {
    render(<EmptyState description="自定义描述" />);
    expect(screen.getByText('自定义描述')).toBeInTheDocument();
  });

  it('custom title overrides default', () => {
    render(<EmptyState variant="error" title="网络异常" />);
    expect(screen.getByText('网络异常')).toBeInTheDocument();
    expect(screen.queryByText('数据加载失败')).not.toBeInTheDocument();
  });

  // ─── action 插槽 ───

  it('renders action slot when provided', () => {
    render(<EmptyState action={<button>重试</button>} />);
    expect(screen.getByText('重试')).toBeInTheDocument();
  });

  it('does not render action area when not provided', () => {
    const { container } = render(<EmptyState />);
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(0);
  });

  // ─── icon 插槽 ───

  it('renders custom icon when provided', () => {
    render(<EmptyState icon={<span data-testid="custom-icon">🔍</span>} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders default icon when icon not provided', () => {
    const { container } = render(<EmptyState variant="no-data" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  // ─── 各 variant 的默认图标不同 ───

  it('no-data variant renders rect icon', () => {
    const { container } = render(<EmptyState variant="no-data" />);
    const svg = container.querySelector('svg');
    expect(svg?.querySelector('rect')).toBeInTheDocument();
  });

  it('no-result variant renders circle (search) icon', () => {
    const { container } = render(<EmptyState variant="no-result" />);
    const svg = container.querySelector('svg');
    expect(svg?.querySelector('circle')).toBeInTheDocument();
  });

  it('error variant renders triangle (warning) icon', () => {
    const { container } = render(<EmptyState variant="error" />);
    const svg = container.querySelector('svg');
    expect(svg?.querySelector('path')).toBeInTheDocument();
  });

  // ─── className 透传 ───

  it('appends custom className', () => {
    const { container } = render(<EmptyState className="my-custom" />);
    expect(container.firstElementChild?.className).toContain('my-custom');
  });

  // ─── HTML 属性透传 ───

  it('passes through data-* attributes', () => {
    render(<EmptyState data-testid="empty" />);
    expect(screen.getByTestId('empty')).toBeInTheDocument();
  });
});
