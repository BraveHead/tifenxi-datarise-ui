import React from 'react';

/* ── 下划线 Tabs ─────────────────────────────────── */

export interface TabItem {
  key: string;
  label: React.ReactNode;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
}

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(' ');
}

export function Tabs({ items, activeKey, onChange, className, ...rest }: TabsProps) {
  return (
    <div className={cx('flex gap-sp-6 border-b border-line mb-sp-4', className)} role="tablist" {...rest}>
      {items.map((item) => {
        const active = item.key === activeKey;
        return (
          <button
            key={item.key}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(item.key)}
            className={cx(
              'relative pb-2.5 pt-2 text-fs-14 cursor-pointer transition-colors duration-fast',
              'inline-flex items-center gap-1.5',
              active
                ? 'text-brand-600 font-medium'
                : 'text-fg-secondary hover:text-fg',
            )}
          >
            {item.label}
            {active && (
              <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-brand-500 rounded-t-sm" />
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ── 胶囊 SegTabs ────────────────────────────────── */

export interface SegTabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
}

export function SegTabs({ items, activeKey, onChange, className, ...rest }: SegTabsProps) {
  return (
    <div
      className={cx(
        'inline-flex bg-surface-muted border border-line rounded-md p-[3px] gap-0.5',
        className,
      )}
      role="tablist"
      {...rest}
    >
      {items.map((item) => {
        const active = item.key === activeKey;
        return (
          <button
            key={item.key}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(item.key)}
            className={cx(
              'px-sp-4 py-1 rounded-sm text-fs-13 cursor-pointer inline-flex items-center gap-1.5 transition-all duration-fast',
              active
                ? 'bg-surface text-fg font-medium shadow-card'
                : 'text-fg-secondary hover:text-fg-body',
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
