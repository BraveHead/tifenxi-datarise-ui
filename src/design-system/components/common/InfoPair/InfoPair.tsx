import React from 'react';

export type InfoPairDirection = 'horizontal' | 'vertical';

export interface InfoPairProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 标签文本 */
  label: React.ReactNode;
  /** 数值文本 */
  value: React.ReactNode;
  /** 排列方向 */
  direction?: InfoPairDirection;
}

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(' ');
}

export function InfoPair({ label, value, direction = 'horizontal', className, ...rest }: InfoPairProps) {
  return (
    <div
      className={cx(
        'flex',
        direction === 'horizontal' ? 'items-baseline gap-sp-2' : 'flex-col gap-sp-1',
        className,
      )}
      {...rest}
    >
      <span className="text-fs-13 text-fg-secondary">{label}</span>
      <span className="text-fs-13 text-fg font-medium">{value}</span>
    </div>
  );
}

export default InfoPair;
