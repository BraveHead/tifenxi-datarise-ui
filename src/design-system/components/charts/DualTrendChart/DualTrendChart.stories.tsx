import type { Meta, StoryObj } from '@storybook/react';
import { DualTrendChart } from './DualTrendChart';

const meta: Meta<typeof DualTrendChart> = {
  title: 'Charts/DualTrendChart',
  component: DualTrendChart,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480, border: '1px solid var(--line, #e5e7eb)', borderRadius: 12, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DualTrendChart>;

export const Default: Story = {
  args: {
    lineData: [
      { label: '2026-01', value: 32 },
      { label: '2026-02', value: 28 },
      { label: '2026-03', value: 35 },
      { label: '2026-04', value: 47 },
    ],
    barData: [
      { label: '2026-01', value: 12 },
      { label: '2026-02', value: 8 },
      { label: '2026-03', value: 14 },
      { label: '2026-04', value: 19 },
    ],
    lineTitle: '主动评价覆盖率',
    barTitle: '主动评价数',
    lineValueSuffix: '%',
  },
};

export const Satisfaction: Story = {
  args: {
    lineData: [
      { label: '1月', value: 92 },
      { label: '2月', value: 89 },
      { label: '3月', value: 91 },
      { label: '4月', value: 95 },
    ],
    barData: [
      { label: '1月', value: 3 },
      { label: '2月', value: 5 },
      { label: '3月', value: 2 },
      { label: '4月', value: 1 },
    ],
    lineTitle: '满意度',
    barTitle: '差评数',
    lineColor: 'var(--series-1, #1F61E8)',
  },
};

export const CustomColors: Story = {
  args: {
    lineData: [
      { label: 'Q1', value: 150 },
      { label: 'Q2', value: 220 },
      { label: 'Q3', value: 180 },
      { label: 'Q4', value: 310 },
    ],
    barData: [
      { label: 'Q1', value: 45 },
      { label: 'Q2', value: 62 },
      { label: 'Q3', value: 38 },
      { label: 'Q4', value: 85 },
    ],
    lineTitle: '收入趋势',
    barTitle: '订单量',
    lineColor: '#2BA471',
    barColor: '#8B5CF6',
  },
};
