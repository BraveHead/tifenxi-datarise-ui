import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { flushSync } from 'react-dom';

export interface ToastOptions {
  /** Auto-dismiss delay in ms (default 3000) */
  duration?: number;
}

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastItem {
  id: number;
  type: ToastType;
  content: string;
  exiting: boolean;
}

const ICON_MAP: Record<ToastType, { color: string; path: string }> = {
  success: {
    color: 'var(--success-500, #2BA471)',
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  },
  error: {
    color: 'var(--danger-500, #E5484D)',
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
  },
  info: {
    color: 'var(--info-500, #3B82F6)',
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
  },
  warning: {
    color: 'var(--warning-500, #F5A623)',
    path: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
  },
};

function ToastIcon({ type }: { type: ToastType }) {
  const { color, path } = ICON_MAP[type];
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d={path} />
    </svg>
  );
}

function ToastBar({ item }: { item: ToastItem }) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--sp-2, 8px)',
        padding: 'var(--sp-3, 12px) var(--sp-4, 16px)',
        background: 'var(--surface, #fff)',
        border: '1px solid var(--line, #EEF0F2)',
        borderRadius: 'var(--radius-lg, 8px)',
        boxShadow: 'var(--shadow-pop)',
        fontSize: 'var(--fs-14, 14px)',
        color: 'var(--fg-body, #374151)',
        pointerEvents: 'auto',
        animation: item.exiting
          ? 'toast-slide-out 200ms ease forwards'
          : 'toast-slide-in 200ms ease forwards',
        maxWidth: 400,
        lineHeight: 1.5,
      }}
    >
      <ToastIcon type={item.type} />
      <span>{item.content}</span>
    </div>
  );
}

function ToastContainer({ items }: { items: ToastItem[] }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 'var(--sp-6, 24px)',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 'var(--z-toast, 600)' as unknown as number,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--sp-2, 8px)',
        pointerEvents: 'none',
      }}
    >
      {items.map((item) => (
        <ToastBar key={item.id} item={item} />
      ))}
    </div>
  );
}

// ── Singleton toast manager ─────────────────────────────

let container: HTMLDivElement | null = null;
let root: Root | null = null;
let items: ToastItem[] = [];
let nextId = 0;
const activeTimers = new Set<ReturnType<typeof setTimeout>>();

function ensureContainer() {
  if (container && root) return;
  container = document.createElement('div');
  container.setAttribute('data-toast-container', '');
  document.body.appendChild(container);
  root = createRoot(container);
}

function renderToasts() {
  if (!root) return;
  flushSync(() => {
    root!.render(<ToastContainer items={[...items]} />);
  });
}

function addToast(type: ToastType, content: string, options?: ToastOptions) {
  ensureContainer();
  const duration = options?.duration ?? 3000;
  const id = nextId++;
  const item: ToastItem = { id, type, content, exiting: false };
  items = [...items, item];
  renderToasts();

  // Auto-dismiss
  const dismissTimer = setTimeout(() => {
    activeTimers.delete(dismissTimer);
    // Start exit animation
    items = items.map((i) => (i.id === id ? { ...i, exiting: true } : i));
    renderToasts();

    // Remove after exit animation
    const removeTimer = setTimeout(() => {
      activeTimers.delete(removeTimer);
      items = items.filter((i) => i.id !== id);
      renderToasts();
    }, 200);
    activeTimers.add(removeTimer);
  }, duration);
  activeTimers.add(dismissTimer);
}

export const toast = {
  success: (content: string, options?: ToastOptions) => addToast('success', content, options),
  error: (content: string, options?: ToastOptions) => addToast('error', content, options),
  info: (content: string, options?: ToastOptions) => addToast('info', content, options),
  warning: (content: string, options?: ToastOptions) => addToast('warning', content, options),
};

/** For testing: cleanup the singleton container */
export function _destroyToastContainer() {
  // Clear all pending timers to prevent firing on dead state
  for (const timer of activeTimers) {
    clearTimeout(timer);
  }
  activeTimers.clear();
  if (root) {
    root.unmount();
    root = null;
  }
  if (container) {
    container.remove();
    container = null;
  }
  items = [];
  nextId = 0;
}

export default toast;
