import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  // ── 基础渲染 ──────────────────────────────────────────

  it('renders children', () => {
    render(<Card>内容</Card>);
    expect(screen.getByText('内容')).toBeInTheDocument();
  });

  it('renders title in header', () => {
    render(<Card title="标题">内容</Card>);
    expect(screen.getByText('标题')).toBeInTheDocument();
  });

  it('renders extra in header', () => {
    render(<Card title="标题" extra={<button>操作</button>}>内容</Card>);
    expect(screen.getByText('操作')).toBeInTheDocument();
  });

  it('does not render header when no title or extra', () => {
    const { container } = render(<Card>内容</Card>);
    expect(container.querySelector('.border-b')).not.toBeInTheDocument();
  });

  // ── bordered ──────────────────────────────────────────

  it('has border by default', () => {
    const { container } = render(<Card>内容</Card>);
    expect(container.firstElementChild?.className).toContain('border');
  });

  it('removes border when bordered=false', () => {
    const { container } = render(<Card bordered={false}>内容</Card>);
    expect(container.firstElementChild?.className).not.toContain('border-line');
  });

  // ── hoverable ─────────────────────────────────────────

  it('adds hover shadow when hoverable', () => {
    const { container } = render(<Card hoverable>内容</Card>);
    expect(container.firstElementChild?.className).toContain('hover:shadow-card');
  });

  it('no hover shadow by default', () => {
    const { container } = render(<Card>内容</Card>);
    expect(container.firstElementChild?.className).not.toContain('hover:shadow-card');
  });

  // ── size ──────────────────────────────────────────────

  it('uses small padding when size="small"', () => {
    const { container } = render(<Card size="small" title="小标题">内容</Card>);
    const body = container.querySelector('.p-sp-3');
    expect(body).toBeInTheDocument();
  });

  // ── className 透传 ────────────────────────────────────

  it('appends custom className', () => {
    const { container } = render(<Card className="my-card">内容</Card>);
    expect(container.firstElementChild?.className).toContain('my-card');
  });

  it('passes through data-* attributes', () => {
    render(<Card data-testid="card">内容</Card>);
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });
});
