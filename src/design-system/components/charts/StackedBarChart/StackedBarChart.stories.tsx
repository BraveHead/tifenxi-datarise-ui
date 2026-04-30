import type { Meta, StoryObj } from '@storybook/react';
import { StackedBarChart } from './StackedBarChart';
import type { BarColumn } from './StackedBarChart';

const meta: Meta<typeof StackedBarChart> = {
  title: 'Charts/StackedBarChart',
  component: StackedBarChart,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    height: { control: { type: 'number', min: 100, max: 400, step: 20 } },
    minSegmentPercent: { control: { type: 'number', min: 0, max: 20, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof StackedBarChart>;

const sampleData: BarColumn[] = [
  {
    label: '2025-W1',
    axisLabel: 'W1',
    segments: [
      { value: 45, color: 'var(--chart-5, #2BA471)', label: '满意' },
      { value: 30, color: 'var(--chart-4, #5DB9A1)', label: '较满意' },
      { value: 15, color: 'var(--chart-2, #F5A623)', label: '一般' },
      { value: 10, color: 'var(--chart-1, #E5484D)', label: '不满意' },
    ],
  },
  {
    label: '2025-W2',
    axisLabel: 'W2',
    segments: [
      { value: 50, color: 'var(--chart-5, #2BA471)', label: '满意' },
      { value: 25, color: 'var(--chart-4, #5DB9A1)', label: '较满意' },
      { value: 15, color: 'var(--chart-2, #F5A623)', label: '一般' },
      { value: 10, color: 'var(--chart-1, #E5484D)', label: '不满意' },
    ],
  },
  {
    label: '2025-W3',
    axisLabel: 'W3',
    segments: [
      { value: 55, color: 'var(--chart-5, #2BA471)', label: '满意' },
      { value: 22, color: 'var(--chart-4, #5DB9A1)', label: '较满意' },
      { value: 13, color: 'var(--chart-2, #F5A623)', label: '一般' },
      { value: 10, color: 'var(--chart-1, #E5484D)', label: '不满意' },
    ],
  },
  {
    label: '2025-W4',
    axisLabel: 'W4',
    segments: [
      { value: 60, color: 'var(--chart-5, #2BA471)', label: '满意' },
      { value: 20, color: 'var(--chart-4, #5DB9A1)', label: '较满意' },
      { value: 12, color: 'var(--chart-2, #F5A623)', label: '一般' },
      { value: 8, color: 'var(--chart-1, #E5484D)', label: '不满意' },
    ],
  },
  {
    label: '2025-W5',
    axisLabel: 'W5',
    segments: [
      { value: 62, color: 'var(--chart-5, #2BA471)', label: '满意' },
      { value: 18, color: 'var(--chart-4, #5DB9A1)', label: '较满意' },
      { value: 12, color: 'var(--chart-2, #F5A623)', label: '一般' },
      { value: 8, color: 'var(--chart-1, #E5484D)', label: '不满意' },
    ],
  },
];

export const Default: Story = {
  args: {
    data: sampleData,
    height: 160,
  },
};

export const TallChart: Story = {
  args: {
    data: sampleData,
    height: 280,
  },
};

export const CustomHighlight: Story = {
  args: {
    data: sampleData,
    height: 160,
    highlightIndex: 2,
    highlightRingColor: 'var(--series-4, #8B5CF6)',
  },
};

export const ManyColumns: Story = {
  args: {
    data: Array.from({ length: 12 }, (_, i) => ({
      label: `2025-M${i + 1}`,
      axisLabel: `${i + 1}月`,
      segments: [
        { value: 40 + Math.round(Math.random() * 20), color: 'var(--chart-5, #2BA471)', label: '满意' },
        { value: 20 + Math.round(Math.random() * 10), color: 'var(--chart-4, #5DB9A1)', label: '较满意' },
        { value: 10 + Math.round(Math.random() * 10), color: 'var(--chart-2, #F5A623)', label: '一般' },
        { value: 5 + Math.round(Math.random() * 10), color: 'var(--chart-1, #E5484D)', label: '不满意' },
      ],
    })),
    height: 200,
  },
};

export const MinSegmentBoost: Story = {
  args: {
    data: [
      {
        label: '本月',
        segments: [
          { value: 95, color: 'var(--chart-5, #2BA471)', label: '满意' },
          { value: 1, color: 'var(--chart-2, #F5A623)', label: '一般' },
          { value: 4, color: 'var(--chart-1, #E5484D)', label: '不满意' },
        ],
      },
      {
        label: '上月',
        segments: [
          { value: 90, color: 'var(--chart-5, #2BA471)', label: '满意' },
          { value: 2, color: 'var(--chart-2, #F5A623)', label: '一般' },
          { value: 8, color: 'var(--chart-1, #E5484D)', label: '不满意' },
        ],
      },
    ],
    height: 160,
    minSegmentPercent: 6,
  },
};
