import React from 'react';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 卡片标题 */
  title?: React.ReactNode;
  /** 标题栏右侧操作区 */
  extra?: React.ReactNode;
  /** 是否显示边框 */
  bordered?: boolean;
  /** hover 时显示阴影效果 */
  hoverable?: boolean;
  /** 紧凑模式 (减少 padding) */
  size?: 'default' | 'small';
  /** 卡片内容区自定义 class */
  bodyClassName?: string;
  children?: React.ReactNode;
}

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(' ');
}

export function Card({
  title,
  extra,
  bordered = true,
  hoverable = false,
  size = 'default',
  bodyClassName,
  className,
  children,
  ...rest
}: CardProps) {
  const hasHeader = title != null || extra != null;

  return (
    <div
      className={cx(
        'bg-surface rounded-radius-md',
        bordered && 'border border-line',
        hoverable && 'transition-shadow duration-fast hover:shadow-card',
        className,
      )}
      {...rest}
    >
      {hasHeader && (
        <div
          className={cx(
            'flex items-center justify-between border-b border-line',
            size === 'small' ? 'px-sp-3 py-sp-2' : 'px-sp-5 py-sp-4',
          )}
        >
          {title && (
            <div className="text-fs-14 font-semibold text-fg">{title}</div>
          )}
          {extra && <div className="ml-auto">{extra}</div>}
        </div>
      )}
      <div
        className={cx(
          size === 'small' ? 'p-sp-3' : 'p-sp-5',
          bodyClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default Card;
