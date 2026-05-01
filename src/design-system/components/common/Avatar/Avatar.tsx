import React from 'react';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 图片 URL */
  src?: string;
  /** 图片 alt 文本 */
  alt?: string;
  /** 尺寸: sm=24px, md=32px, lg=40px */
  size?: AvatarSize;
  /** 无 src 时显示的内容（如首字母） */
  children?: React.ReactNode;
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'w-6 h-6 text-[11px]',
  md: 'w-8 h-8 text-fs-13',
  lg: 'w-10 h-10 text-fs-14',
};

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(' ');
}

export function Avatar({
  src,
  alt,
  size = 'md',
  className,
  children,
  ...rest
}: AvatarProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center justify-center rounded-full overflow-hidden flex-none',
        'bg-brand-100 text-brand-700 font-medium select-none',
        sizeClasses[size],
        className,
      )}
      {...rest}
    >
      {src ? (
        <img
          src={src}
          alt={alt || ''}
          className="w-full h-full object-cover"
        />
      ) : (
        children
      )}
    </span>
  );
}

export default Avatar;
