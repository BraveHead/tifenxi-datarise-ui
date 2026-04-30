import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Skeleton, SkeletonBlock } from './Skeleton';

describe('Skeleton', () => {
  // ─── 基础渲染 ───

  it('renders with default title and 3 paragraph rows', () => {
    const { container } = render(<Skeleton />);
    // title bar (h-5 w-2/5)
    const title = container.querySelector('.h-5');
    expect(title).toBeInTheDocument();
    // paragraph rows
    const rows = container.querySelectorAll('.h-3\\.5');
    expect(rows).toHaveLength(3);
  });

  // ─── title ───

  it('hides title when title=false', () => {
    const { container } = render(<Skeleton title={false} />);
    const title = container.querySelector('.h-5');
    expect(title).not.toBeInTheDocument();
  });

  it('shows title by default', () => {
    const { container } = render(<Skeleton />);
    const title = container.querySelector('.h-5');
    expect(title).toBeInTheDocument();
  });

  // ─── paragraph rows ───

  it('renders custom row count', () => {
    const { container } = render(<Skeleton paragraph={{ rows: 5 }} />);
    const rows = container.querySelectorAll('.h-3\\.5');
    expect(rows).toHaveLength(5);
  });

  it('last row has w-3/5 class', () => {
    const { container } = render(<Skeleton paragraph={{ rows: 3 }} />);
    const rows = container.querySelectorAll('.h-3\\.5');
    const lastRow = rows[rows.length - 1];
    expect(lastRow.className).toContain('w-3/5');
  });

  it('non-last rows have w-full class', () => {
    const { container } = render(<Skeleton paragraph={{ rows: 3 }} />);
    const rows = container.querySelectorAll('.h-3\\.5');
    expect(rows[0].className).toContain('w-full');
    expect(rows[1].className).toContain('w-full');
  });

  it('renders zero rows when paragraph.rows=0', () => {
    const { container } = render(<Skeleton paragraph={{ rows: 0 }} />);
    const rows = container.querySelectorAll('.h-3\\.5');
    expect(rows).toHaveLength(0);
  });

  // ─── active shimmer ───

  it('renders shimmer overlays when active (default)', () => {
    const { container } = render(<Skeleton />);
    // title + 3 rows = 4 shimmer overlays
    const shimmers = container.querySelectorAll('[aria-hidden="true"]');
    expect(shimmers.length).toBe(4);
  });

  it('does not render shimmer overlays when active=false', () => {
    const { container } = render(<Skeleton active={false} />);
    const shimmers = container.querySelectorAll('[aria-hidden="true"]');
    expect(shimmers).toHaveLength(0);
  });

  // ─── className 透传 ───

  it('appends custom className', () => {
    const { container } = render(<Skeleton className="my-skeleton" />);
    expect(container.firstElementChild?.className).toContain('my-skeleton');
  });

  // ─── HTML 属性透传 ───

  it('passes through data-* attributes', () => {
    render(<Skeleton data-testid="skel" />);
    expect(screen.getByTestId('skel')).toBeInTheDocument();
  });
});

describe('SkeletonBlock', () => {
  it('renders with given width and height as numbers', () => {
    const { container } = render(<SkeletonBlock width={100} height={50} />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.width).toBe('100px');
    expect(el.style.height).toBe('50px');
  });

  it('renders with string width and height', () => {
    const { container } = render(<SkeletonBlock width="80%" height="2rem" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.width).toBe('80%');
    expect(el.style.height).toBe('2rem');
  });

  it('applies rounded-full when rounded=true', () => {
    const { container } = render(<SkeletonBlock width={48} height={48} rounded />);
    expect(container.firstElementChild?.className).toContain('rounded-full');
  });

  it('applies rounded-radius-xs by default', () => {
    const { container } = render(<SkeletonBlock width={48} height={48} />);
    expect(container.firstElementChild?.className).toContain('rounded-radius-xs');
  });

  it('always renders shimmer overlay', () => {
    const { container } = render(<SkeletonBlock width={48} height={48} />);
    const shimmer = container.querySelector('[aria-hidden="true"]');
    expect(shimmer).toBeInTheDocument();
  });

  it('appends custom className', () => {
    const { container } = render(<SkeletonBlock width={48} height={48} className="my-block" />);
    expect(container.firstElementChild?.className).toContain('my-block');
  });

  it('passes through data-* attributes', () => {
    render(<SkeletonBlock width={48} height={48} data-testid="block" />);
    expect(screen.getByTestId('block')).toBeInTheDocument();
  });
});
