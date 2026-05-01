import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from './Menu';

const meta = {
  title: 'Wrapped/Menu',
  component: Menu,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inline: Story = {
  args: {
    mode: 'inline',
    items: [
      { key: '1', label: '系统概览' },
      { key: '2', label: '角色管理' },
      { key: '3', label: '成员管理' },
      { type: 'divider' },
      { key: '4', label: '日志查询' },
    ],
    defaultSelectedKeys: ['1'],
  },
};
