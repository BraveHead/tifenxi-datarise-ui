import React from 'react';

export type DrawerSize = 'sm' | 'md' | 'lg';

export interface DrawerShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 宽度预设：sm=480px · md=640px · lg=800px */
  size?: DrawerSize;
  children: React.ReactNode;
}

export interface DrawerHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 主标题（支持 string 或 ReactNode） */
  title: React.ReactNode;
  /** 副标题（可选，支持 string 或 ReactNode） */
  subtitle?: React.ReactNode;
  /** 关闭回调 */
  onClose?: () => void;
}

export interface DrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(' ');
}

const sizeWidths: Record<DrawerSize, string> = {
  sm: 'w-[480px]',
  md: 'w-[640px]',
  lg: 'w-[800px]',
};

export function DrawerShell({ size = 'sm', className, children, ...rest }: DrawerShellProps) {
  return (
    <div
      className={cx(
        'bg-surface rounded-lg shadow-modal border border-line',
        'flex flex-col h-full overflow-hidden',
        sizeWidths[size],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function DrawerHeader({ title, subtitle, onClose, className, ...rest }: DrawerHeaderProps) {
  return (
    <div
      className={cx(
        'px-sp-6 pt-sp-5 pb-[18px] border-b border-line',
        'flex items-center justify-between flex-shrink-0',
        className,
      )}
      {...rest}
    >
      <div>
        <div className="text-fs-16 font-semibold text-fg">{title}</div>
        {subtitle && (
          <div className="text-fs-12 text-fg-secondary mt-0.5">{subtitle}</div>
        )}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
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
      )}
    </div>
  );
}

export function DrawerBody({ className, children, ...rest }: DrawerBodyProps) {
  return (
    <div
      className={cx(
        'flex-1 overflow-y-auto px-sp-6 py-sp-5',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function DrawerFooter({ className, children, ...rest }: DrawerFooterProps) {
  return (
    <div
      className={cx(
        'px-sp-6 py-[14px] border-t border-line',
        'flex items-center gap-sp-2 justify-end flex-shrink-0',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export default DrawerShell;
