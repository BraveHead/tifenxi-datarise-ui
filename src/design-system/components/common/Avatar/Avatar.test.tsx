import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  // ── 图片模式 ──────────────────────────────────────────

  it('renders image when src is provided', () => {
    render(<Avatar src="https://example.com/photo.jpg" alt="头像" />);
    const img = screen.getByAltText('头像');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg');
  });

  // ── 首字母模式 ────────────────────────────────────────

  it('renders children when no src', () => {
    render(<Avatar>张</Avatar>);
    expect(screen.getByText('张')).toBeInTheDocument();
  });

  it('does not render img when no src', () => {
    const { container } = render(<Avatar>张</Avatar>);
    expect(container.querySelector('img')).not.toBeInTheDocument();
  });

  // ── 尺寸 ──────────────────────────────────────────────

  it('applies sm size class', () => {
    const { container } = render(<Avatar size="sm">A</Avatar>);
    expect(container.firstElementChild?.className).toContain('w-6');
  });

  it('applies md size class by default', () => {
    const { container } = render(<Avatar>A</Avatar>);
    expect(container.firstElementChild?.className).toContain('w-8');
  });

  it('applies lg size class', () => {
    const { container } = render(<Avatar size="lg">A</Avatar>);
    expect(container.firstElementChild?.className).toContain('w-10');
  });

  // ── className ─────────────────────────────────────────

  it('appends custom className', () => {
    const { container } = render(<Avatar className="my-avatar">A</Avatar>);
    expect(container.firstElementChild?.className).toContain('my-avatar');
  });

  it('passes through data-* attributes', () => {
    render(<Avatar data-testid="avatar">A</Avatar>);
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });
});
