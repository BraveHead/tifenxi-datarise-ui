import React from 'react';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 尺寸：sm=16px, md=24px, lg=32px */
  size?: SpinnerSize;
  /** 提示文字，显示在旋转圆下方 */
  tip?: string;
  /** 包裹模式：提供 children 时渲染半透明遮罩 */
  children?: React.ReactNode;
}

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(' ');
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

function SpinnerCircle({ size = 'md' }: { size?: SpinnerSize }) {
  return (
    <div
      className={cx(
        'border-2 border-brand-500 border-t-transparent rounded-full animate-spin',
        sizeClasses[size],
      )}
    />
  );
}

export function Spinner({
  size = 'md',
  tip,
  children,
  className,
  ...rest
}: SpinnerProps) {
  const spinnerContent = (
    <div className="inline-flex flex-col items-center gap-sp-2">
      <SpinnerCircle size={size} />
      {tip && <span className="text-fs-12 text-fg-secondary">{tip}</span>}
      <span className="sr-only">Loading...</span>
    </div>
  );

  // Wrapper mode
  if (children) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cx('relative', className)}
        {...rest}
      >
        {children}
        <div className="absolute inset-0 flex items-center justify-center bg-surface/60 rounded-[inherit]">
          {spinnerContent}
        </div>
      </div>
    );
  }

  // Standalone mode
  return (
    <div
      role="status"
      aria-live="polite"
      className={cx('inline-flex items-center justify-center', className)}
      {...rest}
    >
      {spinnerContent}
    </div>
  );
}

export default Spinner;
