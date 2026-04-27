import React from 'react';

export type EmptyStateVariant = 'no-data' | 'no-result' | 'error';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 场景变体 */
  variant?: EmptyStateVariant;
  /** 自定义图标插槽，覆盖默认图标 */
  icon?: React.ReactNode;
  /** 标题 */
  title?: string;
  /** 描述文字 */
  description?: string;
  /** 操作按钮插槽 */
  action?: React.ReactNode;
}

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(' ');
}

const defaultConfig: Record<EmptyStateVariant, { title: string; description: string; illusBg: string }> = {
  'no-data': {
    title: '暂无数据',
    description: '当前时间段内没有相关记录，请调整筛选条件',
    illusBg: 'bg-neutral-50',
  },
  'no-result': {
    title: '未找到匹配结果',
    description: '没有符合条件的数据，请尝试放宽筛选范围',
    illusBg: 'bg-brand-50/60',
  },
  error: {
    title: '数据加载失败',
    description: '请检查网络连接后重试，如持续出现请联系技术支持',
    illusBg: 'bg-danger-bg',
  },
};

function DefaultIcon({ variant }: { variant: EmptyStateVariant }) {
  const strokeColor = variant === 'error' ? '#DC2626' : variant === 'no-result' ? 'var(--brand-500)' : 'currentColor';
  if (variant === 'no-data') {
    return (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9h6M9 13h4" />
      </svg>
    );
  }
  if (variant === 'no-result') {
    return (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    );
  }
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.5">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export function EmptyState({
  variant = 'no-data',
  icon,
  title,
  description,
  action,
  className,
  ...rest
}: EmptyStateProps) {
  const config = defaultConfig[variant];

  return (
    <div
      className={cx(
        'flex flex-col items-center justify-center py-sp-12 px-sp-8 text-center',
        className,
      )}
      {...rest}
    >
      <div
        className={cx(
          'w-20 h-20 rounded-full flex items-center justify-center mb-sp-5 text-neutral-400',
          config.illusBg,
        )}
      >
        {icon || <DefaultIcon variant={variant} />}
      </div>
      <div className="text-[15px] font-semibold text-neutral-900 mb-sp-2">
        {title || config.title}
      </div>
      <div className="text-fs-13 text-neutral-500 max-w-[280px] leading-relaxed mb-sp-5">
        {description || config.description}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export default EmptyState;
