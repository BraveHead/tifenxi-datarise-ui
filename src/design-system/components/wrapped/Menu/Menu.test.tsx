import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Menu } from './Menu';

describe('Menu', () => {
  it('renders menu items', () => {
    render(
      <Menu
        items={[
          { key: '1', label: '首页' },
          { key: '2', label: '设置' },
        ]}
      />,
    );
    expect(screen.getByText('首页')).toBeInTheDocument();
    expect(screen.getByText('设置')).toBeInTheDocument();
  });

  it('supports inline mode', () => {
    const { container } = render(
      <Menu
        mode="inline"
        items={[{ key: '1', label: '菜单项' }]}
      />,
    );
    expect(container.querySelector('.ant-menu-inline')).toBeInTheDocument();
  });
});
