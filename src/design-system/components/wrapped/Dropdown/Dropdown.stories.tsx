import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';
import type { MenuProps } from './Dropdown';
import { Button } from '../../common/Button/Button';

const menuItems: MenuProps['items'] = [
  { key: '1', label: '查看详情' },
  { key: '2', label: '编辑' },
  { type: 'divider' },
  { key: '3', label: '删除', danger: true },
];

const meta = {
  title: 'Wrapped/Dropdown',
  component: Dropdown,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    menu: { items: menuItems },
    children: <Button>打开菜单</Button>,
  },
};

export const ClickTrigger: Story = {
  args: {
    menu: { items: menuItems },
    trigger: ['click'],
    children: <Button>点击打开</Button>,
  },
};

export const Disabled: Story = {
  args: {
    menu: { items: menuItems },
    disabled: true,
    children: <Button disabled>不可用</Button>,
  },
};
