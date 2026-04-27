import React from 'react';

export type DividerDirection = 'horizontal' | 'vertical';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 分隔线方向 */
  direction?: DividerDirection;
  /** 是否为装饰性分隔线（默认 true），装饰性分隔线对辅助技术隐藏 */
  decorative?: boolean;
}

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(' ');
}

/**
 * 分隔线组件。竖向模式需要父容器有明确高度，否则 h-full 不可见。
 */
export function Divider({ direction = 'horizontal', decorative = true, className, ...rest }: DividerProps) {
  return (
    <div
      className={cx(
        direction === 'horizontal' ? 'w-full h-px' : 'h-full w-px',
        'bg-neutral-100',
        className,
      )}
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative ? undefined : direction}
      aria-hidden={decorative ? true : undefined}
      {...rest}
    />
  );
}

export default Divider;
