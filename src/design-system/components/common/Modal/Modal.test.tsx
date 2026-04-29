import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from './Modal';

describe('Modal', () => {
  // ── Basic rendering ───────────────────────────────────

  it('renders dialog when open=true', () => {
    render(
      <Modal open={true} onCancel={vi.fn()} title="Test Modal">
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('does not render dialog when open=false', () => {
    render(
      <Modal open={false} onCancel={vi.fn()} title="Hidden">
        <p>Content</p>
      </Modal>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  // ── Title ─────────────────────────────────────────────

  it('renders title text', () => {
    render(
      <Modal open={true} onCancel={vi.fn()} title="Modal Title">
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByText('Modal Title')).toBeInTheDocument();
  });

  it('renders without title when not provided', () => {
    render(
      <Modal open={true} onCancel={vi.fn()}>
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  // ── Default footer ───────────────────────────────────

  it('renders default OK and Cancel buttons', () => {
    render(
      <Modal open={true} onCancel={vi.fn()} onOk={vi.fn()}>
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByRole('button', { name: '确定' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '取消' })).toBeInTheDocument();
  });

  it('uses custom okText and cancelText', () => {
    render(
      <Modal open={true} onCancel={vi.fn()} okText="Submit" cancelText="Dismiss">
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
  });

  // ── Footer variations ────────────────────────────────

  it('hides footer when footer={null}', () => {
    render(
      <Modal open={true} onCancel={vi.fn()} footer={null}>
        <p>Content</p>
      </Modal>,
    );
    expect(screen.queryByRole('button', { name: '确定' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '取消' })).not.toBeInTheDocument();
    // Only close button should exist
    expect(screen.queryByLabelText('关闭')).not.toBeInTheDocument(); // no title = no close button in header
  });

  it('renders custom footer', () => {
    render(
      <Modal open={true} onCancel={vi.fn()} title="Custom" footer={<button>Custom Action</button>}>
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByRole('button', { name: 'Custom Action' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '确定' })).not.toBeInTheDocument();
  });

  // ── Close triggers ────────────────────────────────────

  it('calls onCancel when close button is clicked', async () => {
    const onCancel = vi.fn();
    render(
      <Modal open={true} onCancel={onCancel} title="Closable">
        <p>Content</p>
      </Modal>,
    );
    await userEvent.click(screen.getByLabelText('关闭'));
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it('calls onCancel when Cancel button is clicked', async () => {
    const onCancel = vi.fn();
    render(
      <Modal open={true} onCancel={onCancel}>
        <p>Content</p>
      </Modal>,
    );
    await userEvent.click(screen.getByRole('button', { name: '取消' }));
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it('calls onOk when OK button is clicked', async () => {
    const onOk = vi.fn();
    render(
      <Modal open={true} onCancel={vi.fn()} onOk={onOk}>
        <p>Content</p>
      </Modal>,
    );
    await userEvent.click(screen.getByRole('button', { name: '确定' }));
    expect(onOk).toHaveBeenCalledOnce();
  });

  it('calls onCancel when Escape is pressed', async () => {
    const onCancel = vi.fn();
    render(
      <Modal open={true} onCancel={onCancel} title="Escape">
        <p>Content</p>
      </Modal>,
    );
    await userEvent.keyboard('{Escape}');
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it('calls onCancel on backdrop click when maskClosable=true', async () => {
    const onCancel = vi.fn();
    render(
      <Modal open={true} onCancel={onCancel} title="Mask" maskClosable={true}>
        <p>Content</p>
      </Modal>,
    );
    const backdrop = document.querySelector('[aria-hidden="true"]') as HTMLElement;
    await userEvent.click(backdrop);
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it('does not call onCancel on backdrop click when maskClosable=false', async () => {
    const onCancel = vi.fn();
    render(
      <Modal open={true} onCancel={onCancel} title="No Mask" maskClosable={false}>
        <p>Content</p>
      </Modal>,
    );
    const backdrop = document.querySelector('[aria-hidden="true"]') as HTMLElement;
    await userEvent.click(backdrop);
    expect(onCancel).not.toHaveBeenCalled();
  });

  // ── Loading state ─────────────────────────────────────

  it('shows loading state on OK button', () => {
    render(
      <Modal open={true} onCancel={vi.fn()} loading={true}>
        <p>Content</p>
      </Modal>,
    );
    const okBtn = screen.getByRole('button', { name: '确定' });
    expect(okBtn).toBeDisabled();
    expect(okBtn).toHaveAttribute('aria-busy', 'true');
  });

  // ── Accessibility ─────────────────────────────────────

  it('has aria-modal="true"', () => {
    render(
      <Modal open={true} onCancel={vi.fn()} title="A11y">
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('sets aria-label from string title', () => {
    render(
      <Modal open={true} onCancel={vi.fn()} title="My Modal">
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'My Modal');
  });

  // ── Body scroll lock ──────────────────────────────────

  it('locks body scroll when open', () => {
    const { unmount } = render(
      <Modal open={true} onCancel={vi.fn()} title="Lock">
        <p>Content</p>
      </Modal>,
    );
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
  });

  // ── Width ─────────────────────────────────────────────

  it('applies custom width', () => {
    render(
      <Modal open={true} onCancel={vi.fn()} title="Width" width={600}>
        <p>Content</p>
      </Modal>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog.style.width).toBe('600px');
  });

  // ── className ─────────────────────────────────────────

  it('applies custom className to panel', () => {
    render(
      <Modal open={true} onCancel={vi.fn()} title="Cls" className="my-modal">
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByRole('dialog').className).toContain('my-modal');
  });
});
