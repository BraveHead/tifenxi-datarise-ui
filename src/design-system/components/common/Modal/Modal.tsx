import React, { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Button } from '../Button/Button';

export interface ModalProps {
  /** Whether the modal is visible */
  open: boolean;
  /** Called when cancel / close is triggered */
  onCancel: () => void;
  /** Called when OK button is clicked */
  onOk?: () => void;
  /** Header title */
  title?: React.ReactNode;
  /** Modal width (number = px, string = any CSS value) */
  width?: number | string;
  /** Custom footer content; null = hide footer entirely */
  footer?: React.ReactNode | null;
  /** OK button text */
  okText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Loading state for OK button */
  loading?: boolean;
  /** Center the modal vertically */
  centered?: boolean;
  /** Whether clicking the backdrop closes the modal */
  maskClosable?: boolean;
  /** Unmount children when closed */
  destroyOnClose?: boolean;
  /** Extra class on the modal panel */
  className?: string;
  children: React.ReactNode;
}

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(' ');
}

const TRANSITION_DURATION = 200;
let openModalCount = 0;

/** Returns all focusable elements within a container */
function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
}

export function Modal({
  open,
  onCancel,
  onOk,
  title,
  width = 480,
  footer,
  okText = '确定',
  cancelText = '取消',
  loading = false,
  centered = true,
  maskClosable = true,
  destroyOnClose = false,
  className,
  children,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const savedOverflowRef = useRef<string>('');
  const [zIndex, setZIndex] = useState(500);

  // Track nested modal stacking z-index
  useEffect(() => {
    if (open) {
      openModalCount++;
      setZIndex(500 + openModalCount);
      return () => { openModalCount--; };
    }
  }, [open]);

  const shouldRender = open || animating;

  // Mount/unmount animation lifecycle
  useEffect(() => {
    if (open) {
      setMounted(true);
      setAnimating(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimating(false);
        });
      });
    } else if (mounted) {
      setAnimating(true);
      const timer = setTimeout(() => {
        setMounted(false);
        setAnimating(false);
      }, TRANSITION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Body scroll lock
  useEffect(() => {
    if (mounted) {
      savedOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = savedOverflowRef.current;
      };
    }
  }, [mounted]);

  // Focus management
  useEffect(() => {
    if (open && mounted) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      requestAnimationFrame(() => {
        const panel = panelRef.current;
        if (!panel) return;
        const focusable = getFocusable(panel);
        if (focusable.length > 0) {
          focusable[0].focus();
        } else {
          panel.focus();
        }
      });
    }
    if (!open && previousFocusRef.current) {
      if (document.body.contains(previousFocusRef.current)) {
        previousFocusRef.current.focus();
      }
      previousFocusRef.current = null;
    }
  }, [open, mounted]);

  // Escape key handler
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCancel();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onCancel]);

  // Focus trap
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = getFocusable(panel);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [],
  );

  if (!shouldRender && !mounted) return null;

  const widthValue = typeof width === 'number' ? `${width}px` : width;
  const isOpen = open && mounted;

  // Determine footer content
  const renderFooter = () => {
    // footer={null} means no footer
    if (footer === null) return null;

    // Custom footer
    if (footer !== undefined) {
      return (
        <div className="px-sp-6 py-sp-4 border-t border-line flex items-center justify-end gap-sp-2 flex-shrink-0">
          {footer}
        </div>
      );
    }

    // Default footer
    return (
      <div className="px-sp-6 py-sp-4 border-t border-line flex items-center justify-end gap-sp-2 flex-shrink-0">
        <Button variant="default" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button variant="primary" onClick={() => onOk?.()} loading={loading}>
          {okText}
        </Button>
      </div>
    );
  };

  const content = (
    <div
      className={cx(
        'fixed inset-0 flex',
        centered ? 'items-center justify-center' : 'items-start justify-center pt-[10vh]',
      )}
      style={{ zIndex: zIndex }}
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div
        className={cx(
          'absolute inset-0 bg-black/45 transition-opacity',
          isOpen ? 'opacity-100' : 'opacity-0',
        )}
        style={{ transitionDuration: `${TRANSITION_DURATION}ms` }}
        onClick={maskClosable ? onCancel : undefined}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
        tabIndex={-1}
        className={cx(
          'relative bg-surface rounded-radius-lg shadow-modal',
          'flex flex-col max-h-[80vh] outline-none',
          'transition-all',
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
          className,
        )}
        style={{
          width: widthValue,
          maxWidth: 'calc(100vw - 32px)',
          transitionDuration: `${TRANSITION_DURATION}ms`,
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Header */}
        {title != null && (
          <div className="px-sp-6 pt-sp-5 pb-sp-4 border-b border-line flex items-center justify-between flex-shrink-0">
            <div className="text-fs-16 font-semibold text-fg">{title}</div>
            <button
              type="button"
              onClick={onCancel}
              className={cx(
                'w-7 h-7 rounded-sm border-none flex items-center justify-center',
                'bg-surface-muted text-fg-secondary cursor-pointer',
                'hover:bg-line transition-colors duration-fast',
              )}
              aria-label="关闭"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-sp-6">
          {destroyOnClose && !open ? null : children}
        </div>

        {/* Footer */}
        {renderFooter()}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}

// ─── Modal.confirm static method ───

export interface ModalConfirmConfig {
  title: string;
  content?: React.ReactNode;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  /** 确定按钮使用危险色 */
  danger?: boolean;
}

function ConfirmModal({ config, afterClose }: { config: ModalConfirmConfig; afterClose: () => void }) {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleCancel = useCallback(() => {
    config.onCancel?.();
    setOpen(false);
    setTimeout(afterClose, TRANSITION_DURATION + 50);
  }, [config, afterClose]);

  const handleOk = useCallback(async () => {
    if (!config.onOk) {
      setOpen(false);
      setTimeout(afterClose, TRANSITION_DURATION + 50);
      return;
    }
    const result = config.onOk();
    if (result && typeof (result as Promise<void>).then === 'function') {
      setLoading(true);
      try {
        await result;
        setOpen(false);
        setTimeout(afterClose, TRANSITION_DURATION + 50);
      } finally {
        setLoading(false);
      }
    } else {
      setOpen(false);
      setTimeout(afterClose, TRANSITION_DURATION + 50);
    }
  }, [config, afterClose]);

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      title={config.title}
      width={420}
      footer={
        <>
          <Button variant="default" onClick={handleCancel}>{config.cancelText || '取消'}</Button>
          <Button variant={config.danger ? 'danger' : 'primary'} onClick={handleOk} loading={loading}>
            {config.okText || '确定'}
          </Button>
        </>
      }
    >
      {config.content}
    </Modal>
  );
}

Modal.confirm = function confirm(config: ModalConfirmConfig) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  const destroy = () => {
    root.unmount();
    container.remove();
  };

  root.render(<ConfirmModal config={config} afterClose={destroy} />);
};

export default Modal;
