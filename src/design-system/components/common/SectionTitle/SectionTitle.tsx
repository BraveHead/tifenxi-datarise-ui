import React from 'react';

export interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 编号数字（如 1、2、3），显示为圆形徽章 */
  number?: number;
  /** 标题文字 */
  title: string;
  /** 副标题 / 描述 */
  description?: string;
  /** 编号徽章颜色 Tailwind class，默认 bg-brand-500 */
  numberColor?: string;
  /** 标题右侧附加内容（如 Badge） */
  extra?: React.ReactNode;
  /** 右侧操作区（如按钮） */
  action?: React.ReactNode;
}

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(' ');
}

export function SectionTitle({
  number,
  title,
  description,
  numberColor,
  extra,
  action,
  className,
  ...rest
}: SectionTitleProps) {
  return (
    <div className={cx('mb-sp-4', className)} {...rest}>
      <div className="flex items-center gap-sp-3">
        {number != null && (
          <span
            className={cx(
              'w-[22px] h-[22px] rounded-full text-fg-on-accent text-[11px] font-bold',
              'inline-flex items-center justify-center flex-shrink-0',
              numberColor || 'bg-brand-500',
            )}
          >
            {number}
          </span>
        )}
        <span className="text-[15px] font-semibold text-fg">{title}</span>
        {extra}
        {action && <div className="ml-auto">{action}</div>}
      </div>
      {description && (
        <div
          className="text-fs-13 text-fg-secondary mt-sp-1"
          style={{ marginLeft: number != null ? 32 : 0 }}
        >
          {description}
        </div>
      )}
    </div>
  );
}

export default SectionTitle;
