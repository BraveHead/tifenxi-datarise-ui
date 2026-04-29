import type { Meta, StoryObj } from '@storybook/react';
import { TrendSparkline } from './TrendSparkline';

const meta: Meta<typeof TrendSparkline> = {
  title: 'Charts/TrendSparkline',
  component: TrendSparkline,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    height: { control: { type: 'number', min: 30, max: 200, step: 10 } },
    valueType: { control: 'radio', options: ['NUMBER', 'PERCENTAGE'] },
  },
};

export default meta;
type Story = StoryObj<typeof TrendSparkline>;

const generateTrendData = (count: number, base: number, variance: number) =>
  Array.from({ length: count }, (_, i) => ({
    date: Date.now() - (count - i) * 86400000,
    value: base + Math.sin(i * 0.5) * variance + Math.random() * variance * 0.3,
  }));

export const Default: Story = {
  args: {
    data: generateTrendData(30, 100, 20),
    title: '接诊量',
    height: 60,
  },
};

export const Percentage: Story = {
  args: {
    data: generateTrendData(20, 0.85, 0.1),
    title: '满意率',
    valueType: 'PERCENTAGE',
    height: 60,
  },
};

export const Tall: Story = {
  args: {
    data: generateTrendData(30, 500, 100),
    title: '收入',
    height: 120,
  },
};

export const StringDates: Story = {
  args: {
    data: [
      { date: '2025-01-01', value: 10 },
      { date: '2025-01-02', value: 15 },
      { date: '2025-01-03', value: 12 },
      { date: '2025-01-04', value: 18 },
      { date: '2025-01-05', value: 14 },
      { date: '2025-01-06', value: 22 },
      { date: '2025-01-07', value: 19 },
    ],
    title: '日访问量',
    height: 80,
  },
};
