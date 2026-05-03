import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ maxWidth: 400 }}><Story /></div>],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '卡片标题',
    children: '这是卡片内容',
  },
};

export const WithExtra: Story = {
  args: {
    title: '数据概览',
    extra: <Button variant="link" size="sm">查看全部</Button>,
    children: '卡片内容区域',
  },
};

export const NoHeader: Story = {
  args: {
    children: '无标题卡片，仅有内容区域',
  },
};

export const Hoverable: Story = {
  args: {
    title: '可悬停卡片',
    hoverable: true,
    children: '鼠标悬停显示阴影',
  },
};

export const Small: Story = {
  args: {
    title: '紧凑卡片',
    size: 'small',
    children: '紧凑 padding',
  },
};

export const NoBorder: Story = {
  args: {
    title: '无边框',
    bordered: false,
    children: '无边框卡片',
  },
};
