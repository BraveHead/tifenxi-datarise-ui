import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 展示数字，0 时隐藏 */
  count?: number;
  /** 小圆点模式（无数字） */
  dot?: boolean;
  /** 超过此数显示 {overflowCount}+, 默认 99 */
  overflowCount?: number;
  /** 偏移 [right, top] px */
  offset?: [number, number];
  children?: React.ReactNode;
}

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(' ');
}

export function Badge({
  count,
  dot = false,
  overflowCount = 99,
  offset,
  className,
  children,
  ...rest
}: BadgeProps) {
  const showBadge = dot || (count != null && count > 0);

  const displayText = count != null
    ? count > overflowCount ? `${overflowCount}+` : `${count}`
    : '';

  const offsetStyle = offset
    ? { right: `${-offset[0]}px`, top: `${offset[1]}px` }
    : undefined;

  return (
    <span className={cx('relative inline-flex', className)} {...rest}>
      {children}
      {showBadge && (
        <span
          className={cx(
            'absolute flex items-center justify-center bg-danger-500 text-fg-on-accent',
            dot
              ? 'w-2 h-2 rounded-full -top-1 -right-1'
              : 'min-w-[18px] h-[18px] px-1 rounded-full text-[11px] font-medium leading-none -top-2 -right-2',
          )}
          style={offsetStyle}
          role="status"
          aria-label={dot ? '有新通知' : `${displayText} 条通知`}
          data-badge
        >
          {!dot && displayText}
        </span>
      )}
    </span>
  );
}

export default Badge;
