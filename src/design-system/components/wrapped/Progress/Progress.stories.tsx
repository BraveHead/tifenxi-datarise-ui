import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';

const meta = {
  title: 'Wrapped/Progress',
  component: Progress,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { percent: 65 },
};

export const Success: Story = {
  args: { percent: 100, status: 'success' },
};

export const Active: Story = {
  args: { percent: 45, status: 'active' },
};

export const Small: Story = {
  args: { percent: 80, size: 'small' },
};

export const Circle: Story = {
  args: { percent: 72, type: 'circle', size: 80 },
};
