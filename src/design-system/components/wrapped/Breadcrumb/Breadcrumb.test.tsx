import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb', () => {
  it('renders breadcrumb items', () => {
    render(
      <Breadcrumb
        items={[
          { title: '首页' },
          { title: '管理后台' },
          { title: '角色管理' },
        ]}
      />,
    );
    expect(screen.getByText('首页')).toBeInTheDocument();
    expect(screen.getByText('管理后台')).toBeInTheDocument();
    expect(screen.getByText('角色管理')).toBeInTheDocument();
  });

  it('renders separator', () => {
    const { container } = render(
      <Breadcrumb items={[{ title: 'A' }, { title: 'B' }]} />,
    );
    expect(container.querySelector('.ant-breadcrumb-separator')).toBeInTheDocument();
  });
});
