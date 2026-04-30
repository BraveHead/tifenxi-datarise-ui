import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedBar } from './SegmentedBar';

const meta = {
  title: 'Components/SegmentedBar',
  component: SegmentedBar,
} satisfies Meta<typeof SegmentedBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: '非常满意', value: 580, color: 'var(--chart-5)' },
      { label: '满意', value: 320, color: 'var(--chart-4)' },
      { label: '一般', value: 150, color: 'var(--chart-3)' },
      { label: '不满意', value: 80, color: 'var(--chart-2)' },
      { label: '非常不满意', value: 30, color: 'var(--chart-1)' },
    ],
  },
};

export const Rounded: Story = {
  args: {
    rounded: true,
    height: 20,
    items: [
      { label: '非常满意', value: 580, color: 'var(--chart-5)' },
      { label: '满意', value: 320, color: 'var(--chart-4)' },
      { label: '一般', value: 150, color: 'var(--chart-3)' },
      { label: '不满意', value: 80, color: 'var(--chart-2)' },
      { label: '非常不满意', value: 30, color: 'var(--chart-1)' },
    ],
  },
};

export const WithInnerLabels: Story = {
  args: {
    height: 32,
    showInnerLabel: true,
    items: [
      { label: '门诊', value: 65, color: 'var(--series-1)' },
      { label: '住院', value: 25, color: 'var(--series-2)' },
      { label: '急诊', value: 10, color: 'var(--series-3)' },
    ],
  },
};

export const SmallValues: Story = {
  args: {
    items: [
      { label: '大比例', value: 960, color: 'var(--series-1)' },
      { label: '小比例', value: 5, color: 'var(--series-2)' },
      { label: '极小比例', value: 2, color: 'var(--series-3)' },
    ],
  },
};

export const TwoSegments: Story = {
  args: {
    rounded: true,
    height: 16,
    items: [
      { label: '已完成', value: 73, color: 'var(--success-500)' },
      { label: '未完成', value: 27, color: 'var(--neutral-200)' },
    ],
  },
};

export const CustomTooltip: Story = {
  args: {
    height: 28,
    items: [
      {
        label: '满意',
        value: 850,
        color: 'var(--success-500)',
        renderTooltip: (item, pct) => (
          <div className="flex flex-col gap-1">
            <span className="font-medium">{item.label}</span>
            <span>{item.value} 人 · {pct}%</span>
          </div>
        ),
      },
      {
        label: '不满意',
        value: 150,
        color: 'var(--danger-500)',
        renderTooltip: (item, pct) => (
          <div className="flex flex-col gap-1">
            <span className="font-medium">{item.label}</span>
            <span>{item.value} 人 · {pct}%</span>
          </div>
        ),
      },
    ],
  },
};

export const EmptyItems: Story = {
  args: {
    items: [],
  },
};

export const InnerLabelValue: Story = {
  args: {
    height: 32,
    innerLabelType: 'value',
    unit: '个',
    items: [
      { label: '结构失衡', value: 0, color: 'var(--danger-500)' },
      { label: '未失衡', value: 345, color: 'var(--series-1)' },
    ],
  },
};

export const AllZeroValues: Story = {
  args: {
    items: [
      { label: '满意', value: 0, color: 'var(--success-500)' },
      { label: '不满意', value: 0, color: 'var(--danger-500)' },
    ],
  },
};
