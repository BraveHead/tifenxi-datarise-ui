import type { Meta, StoryObj } from '@storybook/react';
import { Segmented } from './Segmented';

const meta = {
  title: 'Wrapped/Segmented',
  component: Segmented,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Segmented>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: ['日', '周', '月', '年'],
  },
};

export const Block: Story = {
  args: {
    options: ['全部', '活跃', '不活跃'],
    block: true,
    style: { width: 300 },
  },
};
