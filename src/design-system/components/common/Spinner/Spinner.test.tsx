import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  // ─── 基础渲染 ───

  it('renders with role="status" and aria-live="polite"', () => {
    render(<Spinner />);
    const el = screen.getByRole('status');
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute('aria-live', 'polite');
  });

  it('renders screen reader text', () => {
    render(<Spinner />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toHaveClass('sr-only');
  });

  // ─── Sizes ───

  it('defaults to md size', () => {
    const { container } = render(<Spinner />);
    const circle = container.querySelector('.animate-spin');
    expect(circle?.className).toContain('w-6');
    expect(circle?.className).toContain('h-6');
  });

  it('renders sm size', () => {
    const { container } = render(<Spinner size="sm" />);
    const circle = container.querySelector('.animate-spin');
    expect(circle?.className).toContain('w-4');
    expect(circle?.className).toContain('h-4');
  });

  it('renders lg size', () => {
    const { container } = render(<Spinner size="lg" />);
    const circle = container.querySelector('.animate-spin');
    expect(circle?.className).toContain('w-8');
    expect(circle?.className).toContain('h-8');
  });

  // ─── Tip ───

  it('renders tip text when provided', () => {
    render(<Spinner tip="加载中..." />);
    expect(screen.getByText('加载中...')).toBeInTheDocument();
  });

  it('does not render tip when omitted', () => {
    render(<Spinner />);
    expect(screen.queryByText('加载中...')).not.toBeInTheDocument();
  });

  // ─── Wrapper mode ───

  it('renders children in wrapper mode', () => {
    render(
      <Spinner>
        <div data-testid="content">Content</div>
      </Spinner>,
    );
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('wrapper mode has relative container', () => {
    render(
      <Spinner>
        <div>Content</div>
      </Spinner>,
    );
    const el = screen.getByRole('status');
    expect(el.className).toContain('relative');
  });

  it('wrapper mode renders overlay', () => {
    const { container } = render(
      <Spinner>
        <div>Content</div>
      </Spinner>,
    );
    const overlay = container.querySelector('.absolute.inset-0');
    expect(overlay).toBeInTheDocument();
  });

  // ─── standalone mode ───

  it('standalone mode does not have relative class', () => {
    render(<Spinner />);
    const el = screen.getByRole('status');
    expect(el.className).not.toContain('relative');
  });

  // ─── className 透传 ───

  it('appends custom className', () => {
    render(<Spinner className="my-spinner" />);
    expect(screen.getByRole('status').className).toContain('my-spinner');
  });

  // ─── HTML 属性透传 ───

  it('passes through data-* attributes', () => {
    render(<Spinner data-testid="spinner" />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
