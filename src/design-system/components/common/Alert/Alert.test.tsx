import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders children', () => {
    render(<Alert>提示信息</Alert>);
    expect(screen.getByText('提示信息')).toBeInTheDocument();
  });

  it('defaults to info variant with role="status"', () => {
    render(<Alert>msg</Alert>);
    const el = screen.getByRole('status');
    expect(el).toBeInTheDocument();
    expect(el.className).toContain('bg-info-bg');
    expect(el.className).toContain('border-info-border');
  });

  it.each([
    ['info', 'bg-info-bg', 'status'],
    ['success', 'bg-success-bg', 'status'],
    ['warning', 'bg-warning-bg', 'alert'],
    ['danger', 'bg-danger-bg', 'alert'],
  ] as const)('applies %s variant with correct role', (variant, expectedClass, expectedRole) => {
    render(<Alert variant={variant}>msg</Alert>);
    const el = screen.getByRole(expectedRole);
    expect(el.className).toContain(expectedClass);
  });

  it('renders icon slot with aria-hidden', () => {
    render(<Alert icon={<span data-testid="icon">i</span>}>msg</Alert>);
    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
    expect(icon.parentElement!.getAttribute('aria-hidden')).toBe('true');
  });

  it('renders without icon', () => {
    const { container } = render(<Alert>msg</Alert>);
    expect(container.querySelector('[aria-hidden]')).not.toBeInTheDocument();
  });

  it('renders close button when closable + onClose', () => {
    const onClose = vi.fn();
    render(<Alert closable onClose={onClose}>msg</Alert>);
    const btn = screen.getByLabelText('关闭');
    expect(btn).toBeInTheDocument();
  });

  it('does not render close button when closable without onClose', () => {
    render(<Alert closable>msg</Alert>);
    expect(screen.queryByLabelText('关闭')).not.toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn();
    render(<Alert closable onClose={onClose}>msg</Alert>);
    fireEvent.click(screen.getByLabelText('关闭'));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('appends custom className', () => {
    render(<Alert className="my-alert">msg</Alert>);
    expect(screen.getByRole('status').className).toContain('my-alert');
  });
});
