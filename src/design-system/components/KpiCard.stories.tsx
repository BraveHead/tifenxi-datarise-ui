import type { Meta, StoryObj } from '@storybook/react';
import { KpiCard } from './KpiCard';

const meta = {
  title: 'Components/KpiCard',
  component: KpiCard,
} satisfies Meta<typeof KpiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: '总样本量',
    value: '2,090',
    unit: '份',
    deltas: [
      { label: 'vs 上月', value: '12.4%', direction: 'up', sentiment: 'good' },
    ],
  },
};

export const WithSparkline: Story = {
  args: {
    name: '整体满意度',
    value: '96.8',
    unit: '分',
    deltas: [
      { label: 'vs 上月', value: '0.82%', direction: 'down', sentiment: 'bad' },
    ],
    sparkline: (
      <svg viewBox="0 0 200 36" className="w-full h-full">
        <polyline
          points="0,30 30,28 60,25 90,20 120,22 150,18 180,15 200,12"
          fill="none"
          stroke="var(--brand-500)"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
};

export const DangerCard: Story = {
  args: {
    name: '低分占比',
    value: '3.0',
    unit: '%',
    danger: true,
    deltas: [
      { label: 'vs 上月', value: '0.3%', direction: 'up', sentiment: 'bad' },
    ],
  },
};

export const MultiDelta: Story = {
  args: {
    name: '主动评价率',
    value: '57',
    unit: '%',
    deltas: [
      { label: 'vs 上月', value: '4.1%', direction: 'up', sentiment: 'good' },
      { label: 'vs 上周', value: '1.2%', direction: 'down', sentiment: 'bad' },
    ],
  },
};

export const KpiRow: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
      <KpiCard name="总样本量" value="2,090" unit="份"
        deltas={[{ label: 'vs 上月', value: '12.4%', direction: 'up', sentiment: 'good' }]} />
      <KpiCard name="整体满意度" value="96.8" unit="分"
        deltas={[{ label: 'vs 上月', value: '0.82%', direction: 'down', sentiment: 'bad' }]} />
      <KpiCard name="低分占比" value="3.0" unit="%" danger
        deltas={[{ label: 'vs 上月', value: '0.3%', direction: 'up', sentiment: 'bad' }]} />
      <KpiCard name="主动评价率" value="57" unit="%"
        deltas={[{ label: 'vs 上月', value: '4.1%', direction: 'up', sentiment: 'good' }]} />
    </div>
  ),
};
