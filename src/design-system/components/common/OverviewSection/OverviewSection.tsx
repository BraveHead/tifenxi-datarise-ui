import React, { useId } from 'react';

export interface OverviewSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** 区段标题 */
  title: React.ReactNode;
  /** 描述文案 */
  description?: React.ReactNode;
  /** 右侧附加内容（如"数据截至..."） */
  extra?: React.ReactNode;
  children?: React.ReactNode;
}

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(' ');
}

export function OverviewSection({
  title,
  description,
  extra,
  children,
  className,
  ...rest
}: OverviewSectionProps) {
  const titleId = useId();

  return (
    <section className={cx('w-full', className)} aria-labelledby={titleId} {...rest}>
      <div className="flex items-start justify-between gap-sp-4 mb-sp-5">
        <div className="flex-1 min-w-0 space-y-1.5">
          <h2 id={titleId} className="text-fs-18 font-semibold text-fg leading-tight m-0">
            {title}
          </h2>
          {description && (
            <p className="text-fs-14 text-fg-secondary leading-relaxed m-0">{description}</p>
          )}
        </div>
        {extra && (
          <div className="flex-shrink-0 text-fs-12 text-fg-tertiary mt-0.5">{extra}</div>
        )}
      </div>
      {children && <div>{children}</div>}
    </section>
  );
}

export default OverviewSection;
