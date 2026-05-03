import React from 'react';

export interface SkeletonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 是否显示微光动画，默认 true */
  active?: boolean;
  /** 段落行数配置，默认 3 行 */
  paragraph?: { rows?: number };
  /** 是否显示标题占位条，默认 true */
  title?: boolean;
}

export interface SkeletonBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 宽度，支持数字(px)或字符串 */
  width?: string | number;
  /** 高度，支持数字(px)或字符串 */
  height?: string | number;
  /** 是否圆形（rounded-full） */
  rounded?: boolean;
}

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(' ');
}

const shimmerStyle: React.CSSProperties = {
  background: 'linear-gradient(90deg, transparent 25%, var(--neutral-0, rgba(255,255,255,0.5)) 50%, transparent 75%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.5s infinite linear',
};

function ShimmerOverlay({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div
      className="absolute inset-0 rounded-[inherit]"
      style={shimmerStyle}
      aria-hidden="true"
    />
  );
}

export function Skeleton({
  active = true,
  paragraph = { rows: 3 },
  title: showTitle = true,
  className,
  ...rest
}: SkeletonProps) {
  const rows = paragraph?.rows ?? 3;

  return (
    <div className={cx('space-y-3', className)} {...rest}>
      {showTitle && (
        <div className="relative h-5 w-2/5 rounded-radius-xs bg-neutral-100 overflow-hidden">
          <ShimmerOverlay active={active} />
        </div>
      )}
      {rows > 0 && (
        <div className="space-y-2">
          {Array.from({ length: rows }, (_, i) => (
            <div
              key={i}
              className={cx(
                'relative h-3.5 rounded-radius-xs bg-neutral-100 overflow-hidden',
                i === rows - 1 ? 'w-3/5' : 'w-full',
              )}
            >
              <ShimmerOverlay active={active} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function SkeletonBlock({
  width,
  height,
  rounded = false,
  className,
  style: styleProp,
  ...rest
}: SkeletonBlockProps) {
  const resolvedWidth = typeof width === 'number' ? `${width}px` : width;
  const resolvedHeight = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={cx(
        'relative bg-neutral-100 overflow-hidden',
        rounded ? 'rounded-full' : 'rounded-radius-xs',
        className,
      )}
      style={{
        width: resolvedWidth,
        height: resolvedHeight,
        ...styleProp,
      }}
      {...rest}
    >
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={shimmerStyle}
        aria-hidden="true"
      />
    </div>
  );
}

export default Skeleton;
