import React, { useState, useRef, useCallback, useEffect, useId } from 'react';
import { createPortal } from 'react-dom';

export type TooltipPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';

export interface TooltipProps {
  /** Tooltip content */
  title: React.ReactNode;
  /** Preferred placement */
  placement?: TooltipPlacement;
  /** Trigger element (must accept ref) */
  children: React.ReactElement;
  /** Controlled open state */
  open?: boolean;
  /** Extra class on tooltip container */
  className?: string;
}

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(' ');
}

const ARROW_SIZE = 6;
const GAP = 4;

type Coords = { top: number; left: number };

function getOpposite(p: TooltipPlacement): TooltipPlacement {
  const map: Record<string, TooltipPlacement> = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
    topLeft: 'bottomLeft',
    topRight: 'bottomRight',
    bottomLeft: 'topLeft',
    bottomRight: 'topRight',
  };
  return map[p] ?? 'bottom';
}

function calcPosition(
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  placement: TooltipPlacement,
): Coords {
  const offset = ARROW_SIZE + GAP;
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  switch (placement) {
    case 'top':
      return {
        top: triggerRect.top + scrollY - tooltipRect.height - offset,
        left: triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2,
      };
    case 'bottom':
      return {
        top: triggerRect.bottom + scrollY + offset,
        left: triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2,
      };
    case 'left':
      return {
        top: triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2,
        left: triggerRect.left + scrollX - tooltipRect.width - offset,
      };
    case 'right':
      return {
        top: triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2,
        left: triggerRect.right + scrollX + offset,
      };
    case 'topLeft':
      return {
        top: triggerRect.top + scrollY - tooltipRect.height - offset,
        left: triggerRect.left + scrollX,
      };
    case 'topRight':
      return {
        top: triggerRect.top + scrollY - tooltipRect.height - offset,
        left: triggerRect.right + scrollX - tooltipRect.width,
      };
    case 'bottomLeft':
      return {
        top: triggerRect.bottom + scrollY + offset,
        left: triggerRect.left + scrollX,
      };
    case 'bottomRight':
      return {
        top: triggerRect.bottom + scrollY + offset,
        left: triggerRect.right + scrollX - tooltipRect.width,
      };
  }
}

function wouldOverflow(coords: Coords, tooltipRect: DOMRect): boolean {
  const { top, left } = coords;
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  return (
    top - scrollY < 0 ||
    left - scrollX < 0 ||
    top - scrollY + tooltipRect.height > window.innerHeight ||
    left - scrollX + tooltipRect.width > window.innerWidth
  );
}

/** CSS for the arrow — AntD-style rotated square with shadow */
function arrowStyle(placement: TooltipPlacement): React.CSSProperties {
  const size = 8;
  const half = size / 2;
  const base: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    background: 'var(--surface, #FFFFFF)',
    transform: 'rotate(45deg)',
    boxShadow: '3px 3px 7px rgba(0,0,0,0.07)',
  };

  switch (placement) {
    case 'top':
      return { ...base, bottom: -half, left: '50%', marginLeft: -half };
    case 'topLeft':
      return { ...base, bottom: -half, left: 12 };
    case 'topRight':
      return { ...base, bottom: -half, right: 12 };
    case 'bottom':
      return { ...base, top: -half, left: '50%', marginLeft: -half, boxShadow: '-3px -3px 7px rgba(0,0,0,0.07)' };
    case 'bottomLeft':
      return { ...base, top: -half, left: 12, boxShadow: '-3px -3px 7px rgba(0,0,0,0.07)' };
    case 'bottomRight':
      return { ...base, top: -half, right: 12, boxShadow: '-3px -3px 7px rgba(0,0,0,0.07)' };
    case 'left':
      return { ...base, top: '50%', right: -half, marginTop: -half, boxShadow: '3px -3px 7px rgba(0,0,0,0.07)' };
    case 'right':
      return { ...base, top: '50%', left: -half, marginTop: -half, boxShadow: '-3px 3px 7px rgba(0,0,0,0.07)' };
  }
}

export function Tooltip({
  title,
  placement: preferredPlacement = 'top',
  children,
  open: controlledOpen,
  className,
}: TooltipProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const visible = isControlled ? controlledOpen : internalOpen;

  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const showTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const mountedRef = useRef(true);
  const tooltipId = useId();

  const [coords, setCoords] = useState<Coords>({ top: 0, left: 0 });
  const [actualPlacement, setActualPlacement] = useState(preferredPlacement);
  const [positioned, setPositioned] = useState(false);

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip) return;

    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let placement = preferredPlacement;
    let pos = calcPosition(triggerRect, tooltipRect, placement);

    // Auto-flip if overflowing
    if (wouldOverflow(pos, tooltipRect)) {
      const flipped = getOpposite(placement);
      const flippedPos = calcPosition(triggerRect, tooltipRect, flipped);
      if (!wouldOverflow(flippedPos, tooltipRect)) {
        placement = flipped;
        pos = flippedPos;
      }
    }

    setActualPlacement(placement);
    setCoords(pos);
    setPositioned(true);
  }, [preferredPlacement]);

  const show = useCallback(() => {
    if (isControlled) return;
    clearTimeout(hideTimerRef.current);
    showTimerRef.current = setTimeout(() => setInternalOpen(true), 100);
  }, [isControlled]);

  const hide = useCallback(() => {
    if (isControlled) return;
    clearTimeout(showTimerRef.current);
    hideTimerRef.current = setTimeout(() => setInternalOpen(false), 100);
  }, [isControlled]);

  useEffect(() => {
    if (visible) {
      // Use rAF to let the tooltip render before measuring
      const raf = requestAnimationFrame(() => {
        if (mountedRef.current) {
          updatePosition();
        }
      });
      return () => cancelAnimationFrame(raf);
    } else {
      setPositioned(false);
    }
  }, [visible, updatePosition]);

  // Clean up timers on unmount and track mounted state
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      clearTimeout(showTimerRef.current);
      clearTimeout(hideTimerRef.current);
    };
  }, []);

  // Clone children to attach event handlers and ref
  const childProps = children.props as Record<string, unknown>;
  const trigger = React.cloneElement(
    children as React.ReactElement<Record<string, unknown>>,
    {
      ref: triggerRef,
      onMouseEnter: (e: React.MouseEvent) => {
        show();
        (childProps.onMouseEnter as ((e: React.MouseEvent) => void) | undefined)?.(e);
      },
      onMouseLeave: (e: React.MouseEvent) => {
        hide();
        (childProps.onMouseLeave as ((e: React.MouseEvent) => void) | undefined)?.(e);
      },
      onFocus: (e: React.FocusEvent) => {
        show();
        (childProps.onFocus as ((e: React.FocusEvent) => void) | undefined)?.(e);
      },
      onBlur: (e: React.FocusEvent) => {
        hide();
        (childProps.onBlur as ((e: React.FocusEvent) => void) | undefined)?.(e);
      },
      'aria-describedby': visible ? tooltipId : undefined,
    },
  );

  const tooltip = visible
    ? createPortal(
        <div
          ref={tooltipRef}
          id={tooltipId}
          role="tooltip"
          onMouseEnter={show}
          onMouseLeave={hide}
          className={cx(
            'absolute px-sp-2 py-sp-1',
            'bg-surface text-fg text-fs-12 leading-tight rounded-[2px]',
            'shadow-[0_6px_16px_0_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)]',
            'transition-opacity duration-fast pointer-events-auto',
            'max-w-[280px] break-words',
            positioned ? 'opacity-100' : 'opacity-0',
            className,
          )}
          style={{
            top: coords.top,
            left: coords.left,
            zIndex: 'var(--z-tooltip, 550)' as unknown as number,
            overflow: 'visible',
          }}
        >
          <div className="relative" style={{ zIndex: 1 }}>{title}</div>
          <span style={arrowStyle(actualPlacement)} aria-hidden="true" />
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      {trigger}
      {tooltip}
    </>
  );
}

export default Tooltip;
