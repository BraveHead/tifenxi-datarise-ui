import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  // ── 基础渲染 ──────────────────────────────────────────

  it('renders children text', () => {
    render(<Button>保存</Button>);
    expect(screen.getByRole('button', { name: '保存' })).toBeInTheDocument();
  });

  it('defaults to type="button"', () => {
    render(<Button>btn</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('allows type="submit" override', () => {
    render(<Button type="submit">提交</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  // ── Variant classes ───────────────────────────────────

  it.each([
    ['primary', 'bg-brand-500'],
    ['default', 'bg-neutral-0'],
    ['ghost', 'bg-transparent'],
    ['danger', 'bg-danger-500'],
  ] as const)('applies %s variant class', (variant, expectedClass) => {
    render(<Button variant={variant}>btn</Button>);
    expect(screen.getByRole('button').className).toContain(expectedClass);
  });

  it('uses token color text-neutral-0 for primary instead of text-white', () => {
    render(<Button variant="primary">btn</Button>);
    expect(screen.getByRole('button').className).toContain('text-neutral-0');
  });

  it('defaults to "default" variant when no variant prop', () => {
    render(<Button>btn</Button>);
    expect(screen.getByRole('button').className).toContain('border-neutral-200');
  });

  // ── Size classes (token-based) ────────────────────────

  it.each([
    ['sm', 'h-7', 'text-fs-13'],
    ['md', 'h-8', 'text-fs-14'],
    ['lg', 'h-10', 'text-fs-14'],
  ] as const)('applies %s size class with token font size', (size, heightClass, fontClass) => {
    render(<Button size={size}>btn</Button>);
    const cls = screen.getByRole('button').className;
    expect(cls).toContain(heightClass);
    expect(cls).toContain(fontClass);
  });

  it('defaults to "md" size', () => {
    render(<Button>btn</Button>);
    expect(screen.getByRole('button').className).toContain('h-8');
  });

  it('uses token spacing for padding (px-sp-*)', () => {
    render(<Button size="sm">btn</Button>);
    expect(screen.getByRole('button').className).toContain('px-sp-3');
  });

  // ── Token-based transition duration ───────────────────

  it('uses duration-fast token instead of hardcoded duration', () => {
    render(<Button>btn</Button>);
    expect(screen.getByRole('button').className).toContain('duration-fast');
  });

  // ── Block ─────────────────────────────────────────────

  it('applies w-full when block=true', () => {
    render(<Button block>btn</Button>);
    expect(screen.getByRole('button').className).toContain('w-full');
  });

  it('does not apply w-full by default', () => {
    render(<Button>btn</Button>);
    expect(screen.getByRole('button').className).not.toContain('w-full');
  });

  // ── Disabled ──────────────────────────────────────────

  it('is disabled when disabled=true', () => {
    render(<Button disabled>btn</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not fire onClick when disabled', async () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>btn</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  // ── Loading ───────────────────────────────────────────

  it('disables button when loading=true', () => {
    render(<Button loading>btn</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('sets aria-busy when loading', () => {
    render(<Button loading>btn</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('does not set aria-busy when not loading', () => {
    render(<Button>btn</Button>);
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-busy');
  });

  it('shows spinner SVG when loading', () => {
    render(<Button loading>btn</Button>);
    const svg = screen.getByRole('button').querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies cursor-progress class when loading', () => {
    render(<Button loading>btn</Button>);
    expect(screen.getByRole('button').className).toContain('cursor-progress');
  });

  it('does not fire onClick when loading', async () => {
    const onClick = vi.fn();
    render(<Button loading onClick={onClick}>btn</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  // ── Icons ─────────────────────────────────────────────

  it('renders iconLeft', () => {
    render(<Button iconLeft={<span data-testid="icon-left">←</span>}>btn</Button>);
    expect(screen.getByTestId('icon-left')).toBeInTheDocument();
  });

  it('renders iconRight', () => {
    render(<Button iconRight={<span data-testid="icon-right">→</span>}>btn</Button>);
    expect(screen.getByTestId('icon-right')).toBeInTheDocument();
  });

  it('replaces iconLeft with spinner when loading', () => {
    render(
      <Button loading iconLeft={<span data-testid="icon-left">←</span>}>btn</Button>,
    );
    expect(screen.queryByTestId('icon-left')).not.toBeInTheDocument();
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
  });

  it('hides iconRight when loading', () => {
    render(
      <Button loading iconRight={<span data-testid="icon-right">→</span>}>btn</Button>,
    );
    expect(screen.queryByTestId('icon-right')).not.toBeInTheDocument();
  });

  it('renders both iconLeft and iconRight simultaneously', () => {
    render(
      <Button
        iconLeft={<span data-testid="icon-l">←</span>}
        iconRight={<span data-testid="icon-r">→</span>}
      >
        btn
      </Button>,
    );
    expect(screen.getByTestId('icon-l')).toBeInTheDocument();
    expect(screen.getByTestId('icon-r')).toBeInTheDocument();
  });

  it('hides both icons when loading, shows only spinner', () => {
    render(
      <Button
        loading
        iconLeft={<span data-testid="icon-l">←</span>}
        iconRight={<span data-testid="icon-r">→</span>}
      >
        btn
      </Button>,
    );
    expect(screen.queryByTestId('icon-l')).not.toBeInTheDocument();
    expect(screen.queryByTestId('icon-r')).not.toBeInTheDocument();
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
  });

  // ── Events ────────────────────────────────────────────

  it('fires onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>btn</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  // ── Ref forwarding ────────────────────────────────────

  it('forwards ref to the button element', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>btn</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toBe(screen.getByRole('button'));
  });

  // ── className merging ─────────────────────────────────

  it('appends custom className', () => {
    render(<Button className="my-custom">btn</Button>);
    expect(screen.getByRole('button').className).toContain('my-custom');
  });

  it('preserves base classes when custom className is added', () => {
    render(<Button className="my-custom">btn</Button>);
    const cls = screen.getByRole('button').className;
    expect(cls).toContain('inline-flex');
    expect(cls).toContain('rounded-md');
    expect(cls).toContain('my-custom');
  });

  it('custom className is appended after variant classes (last wins in Tailwind)', () => {
    render(<Button variant="primary" className="bg-red-500">btn</Button>);
    const cls = screen.getByRole('button').className;
    const bgBrandIdx = cls.indexOf('bg-brand-500');
    const bgRedIdx = cls.indexOf('bg-red-500');
    expect(bgRedIdx).toBeGreaterThan(bgBrandIdx);
  });

  // ── Icon-only (无 children) ───────────────────────────

  it('renders icon-only button without label span', () => {
    render(<Button iconLeft={<span data-testid="solo-icon">★</span>} />);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(screen.getByTestId('solo-icon')).toBeInTheDocument();
    expect(btn.querySelector('span.inline-flex.items-center')).not.toBeInTheDocument();
  });

  it('icon-only button with aria-label is accessible', () => {
    render(
      <Button aria-label="收藏" iconLeft={<span aria-hidden="true">★</span>} />,
    );
    expect(screen.getByRole('button', { name: '收藏' })).toBeInTheDocument();
  });

  // ── HTML attribute passthrough ────────────────────────

  it('passes through data-* and aria-* attributes', () => {
    render(<Button data-testid="my-btn" aria-label="确认">btn</Button>);
    expect(screen.getByTestId('my-btn')).toBeInTheDocument();
    expect(screen.getByLabelText('确认')).toBeInTheDocument();
  });

  it('passes through id attribute', () => {
    render(<Button id="submit-btn">btn</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('id', 'submit-btn');
  });

  it('passes through name attribute', () => {
    render(<Button name="action">btn</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('name', 'action');
  });
});
