import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { toast, _destroyToastContainer } from './Toast';

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    _destroyToastContainer();
  });

  afterEach(() => {
    _destroyToastContainer();
    vi.useRealTimers();
  });

  // ── Container creation ────────────────────────────────

  it('creates a toast container in document.body on first call', () => {
    toast.success('Hello');
    const container = document.querySelector('[data-toast-container]');
    expect(container).toBeInTheDocument();
  });

  it('reuses the same container for multiple toasts', () => {
    toast.success('First');
    toast.info('Second');
    const containers = document.querySelectorAll('[data-toast-container]');
    expect(containers.length).toBe(1);
  });

  // ── Toast types ───────────────────────────────────────

  it('renders success toast with role="status"', () => {
    toast.success('Success message');
    const status = document.querySelector('[role="status"]');
    expect(status).toBeInTheDocument();
    expect(status?.textContent).toContain('Success message');
  });

  it('renders error toast', () => {
    toast.error('Error message');
    const status = document.querySelector('[role="status"]');
    expect(status).toBeInTheDocument();
    expect(status?.textContent).toContain('Error message');
  });

  it('renders info toast', () => {
    toast.info('Info message');
    const status = document.querySelector('[role="status"]');
    expect(status?.textContent).toContain('Info message');
  });

  it('renders warning toast', () => {
    toast.warning('Warning message');
    const status = document.querySelector('[role="status"]');
    expect(status?.textContent).toContain('Warning message');
  });

  // ── Auto-dismiss ──────────────────────────────────────

  it('removes toast after default duration (3000ms)', () => {
    toast.success('Auto dismiss');
    expect(document.querySelector('[role="status"]')).toBeInTheDocument();

    // Advance past duration + exit animation
    vi.advanceTimersByTime(3200);
    expect(document.querySelector('[role="status"]')).not.toBeInTheDocument();
  });

  it('uses custom duration', () => {
    toast.info('Short', { duration: 500 });
    expect(document.querySelector('[role="status"]')).toBeInTheDocument();

    vi.advanceTimersByTime(700);
    expect(document.querySelector('[role="status"]')).not.toBeInTheDocument();
  });

  // ── Stacking ──────────────────────────────────────────

  it('stacks multiple toasts', () => {
    toast.success('First');
    toast.error('Second');
    toast.info('Third');
    const statuses = document.querySelectorAll('[role="status"]');
    expect(statuses.length).toBe(3);
  });

  it('removes toasts independently', () => {
    toast.success('Short', { duration: 500 });
    toast.info('Long', { duration: 5000 });

    vi.advanceTimersByTime(700);
    const remaining = document.querySelectorAll('[role="status"]');
    expect(remaining.length).toBe(1);
    expect(remaining[0].textContent).toContain('Long');
  });

  // ── Cleanup ───────────────────────────────────────────

  it('_destroyToastContainer removes the container', () => {
    toast.success('Test');
    expect(document.querySelector('[data-toast-container]')).toBeInTheDocument();

    _destroyToastContainer();
    expect(document.querySelector('[data-toast-container]')).not.toBeInTheDocument();
  });
});
