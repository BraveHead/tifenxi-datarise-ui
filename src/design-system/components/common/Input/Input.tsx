import React from 'react';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** 标签文案 */
  label?: string;
  /** 帮助/错误提示 */
  help?: string;
  /** 是否为错误状态 */
  error?: boolean;
  /** 是否占满容器宽度（默认 true） */
  block?: boolean;
}

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(' ');
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { label, help, error = false, block = true, className, disabled, id, ...rest },
    ref,
  ) {
    const inputId = id ?? (label ? `input-${label}` : undefined);

    return (
      <div className={cx(block && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-fs-13 text-fg-body font-medium mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={cx(
            'h-8 px-sp-3 rounded-md border text-fs-14 text-fg outline-none transition-colors duration-fast',
            'placeholder:text-fg-tertiary',
            block && 'w-full',
            !error && !disabled && 'border-line-strong hover:border-neutral-300 focus:border-brand-500 focus:ring-3 focus:ring-brand-500/12',
            error && 'border-danger-500 focus:ring-3 focus:ring-danger-500/12',
            disabled && 'bg-surface-muted text-fg-tertiary cursor-not-allowed',
            className,
          )}
          {...rest}
        />
        {help && (
          <p className={cx(
            'mt-1 text-fs-12',
            error ? 'text-danger-500' : 'text-fg-tertiary',
          )}>
            {help}
          </p>
        )}
      </div>
    );
  },
);

export default Input;
