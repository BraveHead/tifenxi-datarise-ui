import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Dropdown } from './Dropdown';
import type { MenuProps } from './Dropdown';

const menuItems: MenuProps['items'] = [
  { key: '1', label: '选项一' },
  { key: '2', label: '选项二' },
];

describe('Dropdown', () => {
  // ── 基础渲染 ──────────────────────────────────────────

  it('renders trigger element', () => {
    render(
      <Dropdown menu={{ items: menuItems }}>
        <button>打开菜单</button>
      </Dropdown>,
    );
    expect(screen.getByText('打开菜单')).toBeInTheDocument();
  });

  // ── Props 透传 ────────────────────────────────────────

  it('renders with disabled prop', () => {
    render(
      <Dropdown menu={{ items: menuItems }} disabled>
        <button>不可用</button>
      </Dropdown>,
    );
    expect(screen.getByText('不可用')).toBeInTheDocument();
  });

  // ── 类型兼容 ──────────────────────────────────────────

  it('MenuProps type is exported and usable', () => {
    const items: MenuProps['items'] = [
      { key: 'a', label: 'A' },
      { key: 'b', label: 'B', danger: true },
    ];
    render(
      <Dropdown menu={{ items }}>
        <button>菜单</button>
      </Dropdown>,
    );
    expect(screen.getByText('菜单')).toBeInTheDocument();
  });
});
