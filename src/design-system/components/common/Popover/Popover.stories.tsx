import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '提示标题',
    content: '这是弹出内容，可以包含任何 ReactNode',
    children: <Button>悬停我</Button>,
  },
};

export const ClickTrigger: Story = {
  args: {
    title: '详情',
    content: '点击触发的弹出气泡',
    trigger: 'click',
    children: <Button>点击</Button>,
  },
};
