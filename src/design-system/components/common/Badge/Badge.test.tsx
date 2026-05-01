import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  // ── 基础渲染 ──────────────────────────────────────────

  it('renders children', () => {
    render(<Badge count={5}><button>消息</button></Badge>);
    expect(screen.getByText('消息')).toBeInTheDocument();
  });

  it('shows count number', () => {
    render(<Badge count={5}><span>图标</span></Badge>);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  // ── count=0 隐藏 ──────────────────────────────────────

  it('hides badge when count=0', () => {
    const { container } = render(<Badge count={0}><span>图标</span></Badge>);
    expect(container.querySelector('[data-badge]')).not.toBeInTheDocument();
  });

  // ── overflowCount ─────────────────────────────────────

  it('shows 99+ when count exceeds overflowCount', () => {
    render(<Badge count={100}><span>图标</span></Badge>);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('shows exact count when equal to overflowCount', () => {
    render(<Badge count={99}><span>图标</span></Badge>);
    expect(screen.getByText('99')).toBeInTheDocument();
  });

  it('respects custom overflowCount', () => {
    render(<Badge count={11} overflowCount={10}><span>图标</span></Badge>);
    expect(screen.getByText('10+')).toBeInTheDocument();
  });

  // ── dot 模式 ──────────────────────────────────────────

  it('renders dot without number', () => {
    const { container } = render(<Badge dot><span>图标</span></Badge>);
    const badge = container.querySelector('[data-badge]');
    expect(badge).toBeInTheDocument();
    expect(badge?.textContent).toBe('');
  });

  it('dot has smaller size', () => {
    const { container } = render(<Badge dot><span>图标</span></Badge>);
    expect(container.querySelector('[data-badge]')?.className).toContain('w-2');
  });

  // ── className ─────────────────────────────────────────

  it('appends custom className', () => {
    const { container } = render(<Badge count={1} className="my-badge"><span>图标</span></Badge>);
    expect(container.firstElementChild?.className).toContain('my-badge');
  });
});
