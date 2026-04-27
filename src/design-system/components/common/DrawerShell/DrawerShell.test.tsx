import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DrawerShell, DrawerHeader, DrawerBody, DrawerFooter } from './DrawerShell';

describe('DrawerShell', () => {
  // ─── 基础渲染 ───

  it('renders children', () => {
    render(<DrawerShell><div>内容</div></DrawerShell>);
    expect(screen.getByText('内容')).toBeInTheDocument();
  });

  // ─── size ───

  it('defaults to sm width (480px)', () => {
    const { container } = render(<DrawerShell><div /></DrawerShell>);
    expect(container.firstElementChild?.className).toContain('w-[480px]');
  });

  it('applies md width (640px)', () => {
    const { container } = render(<DrawerShell size="md"><div /></DrawerShell>);
    expect(container.firstElementChild?.className).toContain('w-[640px]');
  });

  it('applies lg width (800px)', () => {
    const { container } = render(<DrawerShell size="lg"><div /></DrawerShell>);
    expect(container.firstElementChild?.className).toContain('w-[800px]');
  });

  // ─── className 透传 ───

  it('appends custom className', () => {
    const { container } = render(<DrawerShell className="my-custom"><div /></DrawerShell>);
    expect(container.firstElementChild?.className).toContain('my-custom');
  });
});

describe('DrawerHeader', () => {
  it('renders title', () => {
    render(<DrawerHeader title="标题" />);
    expect(screen.getByText('标题')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<DrawerHeader title="标题" subtitle="副标题" />);
    expect(screen.getByText('副标题')).toBeInTheDocument();
  });

  it('does not render subtitle when omitted', () => {
    const { container } = render(<DrawerHeader title="标题" />);
    const subtitleEl = container.querySelector('.text-fs-12.text-neutral-500');
    expect(subtitleEl).not.toBeInTheDocument();
  });

  it('renders close button when onClose provided', () => {
    render(<DrawerHeader title="标题" onClose={() => {}} />);
    expect(screen.getByRole('button', { name: '关闭' })).toBeInTheDocument();
  });

  it('does not render close button when onClose omitted', () => {
    render(<DrawerHeader title="标题" />);
    expect(screen.queryByRole('button', { name: '关闭' })).not.toBeInTheDocument();
  });

  it('calls onClose when close button clicked', async () => {
    const onClose = vi.fn();
    render(<DrawerHeader title="标题" onClose={onClose} />);
    await userEvent.click(screen.getByRole('button', { name: '关闭' }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});

describe('DrawerBody', () => {
  it('renders children', () => {
    render(<DrawerBody><div>内容区</div></DrawerBody>);
    expect(screen.getByText('内容区')).toBeInTheDocument();
  });

  it('has overflow-y-auto for scrolling', () => {
    const { container } = render(<DrawerBody><div /></DrawerBody>);
    expect(container.firstElementChild?.className).toContain('overflow-y-auto');
  });
});

describe('DrawerFooter', () => {
  it('renders children', () => {
    render(<DrawerFooter><button>操作</button></DrawerFooter>);
    expect(screen.getByText('操作')).toBeInTheDocument();
  });

  it('has flex justify-end for right alignment', () => {
    const { container } = render(<DrawerFooter><button>操作</button></DrawerFooter>);
    expect(container.firstElementChild?.className).toContain('justify-end');
  });
});
