import React, { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { DrawerShell, DrawerHeader, DrawerBody } from '../DrawerShell/DrawerShell';

export interface DrawerProps {
  /** Whether the drawer is visible */
  open: boolean;
  /** Called when the drawer should close */
  onClose: () => void;
  /** Header title */
  title?: React.ReactNode;
  /** Panel width (number = px, string = any CSS value) */
  width?: number | string;
  /** Which side the panel slides from */
  placement?: 'left' | 'right';
  /** Unmount children when closed */
  destroyOnClose?: boolean;
  /** Whether clicking the backdrop closes the drawer */
  maskClosable?: boolean;
  /** Fired after open/close transition completes */
  afterOpenChange?: (open: boolean) => void;
  /** Extra class on the panel */
  className?: string;
  children: React.ReactNode;
}

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(' ');
}

const TRANSITION_DURATION = 300;
let openDrawerCount = 0;

/** Returns all focusable elements within a container */
function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
}

export function Drawer({
  open,
  onClose,
  title,
  width = 640,
  placement = 'right',
  destroyOnClose = false,
  maskClosable = true,
  afterOpenChange,
  className,
  children,
}: DrawerProps) {
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const savedOverflowRef = useRef<string>('');
  const afterOpenChangeRef = useRef(afterOpenChange);
  afterOpenChangeRef.current = afterOpenChange;
  const [zIndex, setZIndex] = useState(400);

  // Track nested drawer stacking z-index
  useEffect(() => {
    if (open) {
      openDrawerCount++;
      setZIndex(400 + openDrawerCount);
      return () => { openDrawerCount--; };
    }
  }, [open]);

  // Track whether we should render content
  const shouldRender = open || animating;
  const showPanel = open && !(!mounted && !animating);

  // Mount/unmount animation lifecycle
  useEffect(() => {
    if (open) {
      setMounted(true);
      setAnimating(true);
      // Force a reflow then start the enter animation
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
        afterOpenChangeRef.current?.(false);
      }, TRANSITION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Fire afterOpenChange on open
  useEffect(() => {
    if (open && mounted && !animating) {
      afterOpenChangeRef.current?.(true);
    }
  }, [open, mounted, animating]);

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
      // Focus the panel or first focusable element
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
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

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
  const isRight = placement === 'right';

  const backdropClick = () => {
    if (maskClosable) onClose();
  };

  const content = (
    <div
      className="fixed inset-0"
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
        onClick={backdropClick}
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
          'absolute top-0 bottom-0 flex flex-col',
          'transition-transform',
          'outline-none',
          isRight ? 'right-0' : 'left-0',
        )}
        style={{
          width: widthValue,
          maxWidth: '100vw',
          transitionDuration: `${TRANSITION_DURATION}ms`,
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isOpen
            ? 'translateX(0)'
            : isRight
              ? 'translateX(100%)'
              : 'translateX(-100%)',
        }}
      >
        <DrawerShell className={cx('w-full h-full rounded-none border-0', className)}>
          {title != null && (
            <DrawerHeader
              title={typeof title === 'string' ? title : ''}
              onClose={onClose}
            >
              {typeof title !== 'string' ? title : undefined}
            </DrawerHeader>
          )}
          <DrawerBody>
            {destroyOnClose && !open ? null : children}
          </DrawerBody>
        </DrawerShell>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}

export default Drawer;
