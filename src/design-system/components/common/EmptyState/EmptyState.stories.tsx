import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  decorators: [(Story: React.ComponentType) => (
    <div style={{ maxWidth: 480, border: '1px solid var(--neutral-100)', borderRadius: 8 }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoData: Story = {
  args: {
    variant: 'no-data',
    action: <Button variant="default" size="sm">调整筛选</Button>,
  },
};

export const NoResult: Story = {
  args: {
    variant: 'no-result',
    description: '「骨科·主任医师」没有符合条件的数据，请尝试放宽筛选范围',
    action: <Button variant="primary" size="sm">清空筛选</Button>,
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    action: <Button variant="default" size="sm">重试</Button>,
  },
};

export const CustomContent: Story = {
  args: {
    variant: 'no-data',
    title: '暂无满意度数据',
    description: '当前时间段内没有可供分析的样本',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      <div style={{ border: '1px solid var(--neutral-100)', borderRadius: 8 }}>
        <EmptyState variant="no-data" action={<Button variant="default" size="sm">调整筛选</Button>} />
      </div>
      <div style={{ border: '1px solid var(--neutral-100)', borderRadius: 8 }}>
        <EmptyState variant="no-result" action={<Button variant="primary" size="sm">清空筛选</Button>} />
      </div>
      <div style={{ border: '1px solid var(--neutral-100)', borderRadius: 8 }}>
        <EmptyState variant="error" action={<Button variant="default" size="sm">重试</Button>} />
      </div>
    </div>
  ),
};
