import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: {
    src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=datarise',
    alt: '用户头像',
    size: 'lg',
  },
};

export const WithInitials: Story = {
  args: {
    children: '张',
    size: 'md',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar size="sm">S</Avatar>
      <Avatar size="md">M</Avatar>
      <Avatar size="lg">L</Avatar>
    </div>
  ),
};
