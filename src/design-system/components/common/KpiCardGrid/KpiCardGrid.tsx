import React from 'react';

export type KpiCardGridColumns = 1 | 2 | 3 | 4;

export interface KpiCardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 最大列数 */
  columns?: KpiCardGridColumns;
  children: React.ReactNode;
}

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(' ');
}

const columnClasses: Record<KpiCardGridColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

export function KpiCardGrid({ columns = 4, children, className, ...rest }: KpiCardGridProps) {
  return (
    <div
      className={cx('grid gap-4 items-stretch', columnClasses[columns], className)}
      {...rest}
    >
      {children}
    </div>
  );
}

export default KpiCardGrid;
