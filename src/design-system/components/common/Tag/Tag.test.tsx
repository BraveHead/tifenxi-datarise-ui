import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Tag } from './Tag';

describe('Tag', () => {
  // ── 基础渲染 ──────────────────────────────────────────

  it('renders children', () => {
    render(<Tag>风险</Tag>);
    expect(screen.getByText('风险')).toBeInTheDocument();
  });

  it('defaults to neutral variant', () => {
    render(<Tag>标签</Tag>);
    expect(screen.getByText('标签').closest('span')!.className).toContain('bg-surface-muted');
  });

  // ── Variant classes ───────────────────────────────────

  it.each([
    ['severity-high', 'severity-high-bg'],
    ['severity-mid', 'bg-warning-bg'],
    ['danger', 'bg-danger-bg'],
    ['success', 'bg-success-bg'],
    ['warning', 'bg-warning-bg'],
    ['info', 'bg-info-bg'],
    ['brand', 'bg-brand-50'],
  ] as const)('applies %s variant class', (variant, expectedClass) => {
    render(<Tag variant={variant}>tag</Tag>);
    expect(screen.getByText('tag').closest('span')!.className).toContain(expectedClass);
  });

  // ── Dot ───────────────────────────────────────────────

  it('renders dot when provided', () => {
    const { container } = render(<Tag dot="danger">风险</Tag>);
    const dot = container.querySelector('.rounded-full');
    expect(dot).toBeInTheDocument();
    expect(dot?.className).toContain('bg-danger-500');
  });

  it('does not render dot by default', () => {
    const { container } = render(<Tag>标签</Tag>);
    expect(container.querySelector('.rounded-full')).not.toBeInTheDocument();
  });

  // ── Closable ──────────────────────────────────────────

  it('renders close button when closable=true', () => {
    render(<Tag closable>可关闭</Tag>);
    expect(screen.getByRole('button', { name: '关闭' })).toBeInTheDocument();
  });

  it('does not render close button by default', () => {
    render(<Tag>标签</Tag>);
    expect(screen.queryByRole('button', { name: '关闭' })).not.toBeInTheDocument();
  });

  it('fires onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    render(<Tag closable onClose={onClose}>可关闭</Tag>);
    await userEvent.click(screen.getByRole('button', { name: '关闭' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('stops propagation on close button click', async () => {
    const outerClick = vi.fn();
    const onClose = vi.fn();
    render(
      <div onClick={outerClick}>
        <Tag closable onClose={onClose}>tag</Tag>
      </div>,
    );
    await userEvent.click(screen.getByRole('button', { name: '关闭' }));
    expect(onClose).toHaveBeenCalledOnce();
    expect(outerClick).not.toHaveBeenCalled();
  });

  // ── className ─────────────────────────────────────────

  it('passes through className', () => {
    render(<Tag className="my-tag">tag</Tag>);
    expect(screen.getByText('tag').closest('span')!.className).toContain('my-tag');
  });
});
