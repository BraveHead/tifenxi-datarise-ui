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
      { label: '同比', value: '12.4%', direction: 'up', sentiment: 'good' },
      { label: '环比', value: '3.2%', direction: 'down', sentiment: 'bad' },
    ],
  },
};

export const WithSparkline: Story = {
  args: {
    name: '整体满意度',
    value: '96.8',
    unit: '分',
    icon: <span>😊</span>,
    iconVariant: 'mood',
    deltas: [
      { label: '同比', value: '0.8%', direction: 'up', sentiment: 'good' },
      { label: '环比', value: '0.5%', direction: 'down', sentiment: 'bad' },
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
      { label: '同比', value: '0.3%', direction: 'up', sentiment: 'bad' },
    ],
  },
};

export const HighlightCard: Story = {
  args: {
    name: '门诊患者满意度',
    value: '97.2',
    highlight: true,
    icon: <span>😊</span>,
    iconVariant: 'mood',
    deltas: [
      { label: '同比', value: '0.8%', direction: 'up', sentiment: 'good' },
      { label: '环比', value: '0.5%', direction: 'down', sentiment: 'bad' },
    ],
    sparkline: (
      <svg viewBox="0 0 200 36" className="w-full h-full">
        <polyline
          points="0,30 25,28 50,32 75,26 100,24 125,28 150,20 175,18 200,16"
          fill="none"
          stroke="var(--brand-500)"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
};

export const MultiDelta: Story = {
  args: {
    name: '主动评价率',
    value: '57',
    unit: '%',
    deltas: [
      { label: '同比', value: '4.1%', direction: 'up', sentiment: 'good' },
      { label: '环比', value: '1.2%', direction: 'down', sentiment: 'bad' },
    ],
  },
};

/** 模拟满意度分析 KPI 行 */
export const KpiRow: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
      <KpiCard
        name="门诊患者满意度"
        value="97.2"
        highlight
        icon={<span>😊</span>}
        iconVariant="mood"
        deltas={[
          { label: '同比', value: '0.8%', direction: 'up', sentiment: 'good' },
          { label: '环比', value: '0.5%', direction: 'down', sentiment: 'bad' },
        ]}
        sparkline={
          <svg viewBox="0 0 200 36" className="w-full h-full">
            <polyline points="0,30 25,28 50,32 75,26 100,24 125,28 150,20 175,18 200,16" fill="none" stroke="var(--brand-500)" strokeWidth="1.5" />
          </svg>
        }
      />
      <KpiCard
        name="好评率"
        value="91.42"
        unit="%"
        icon={<span>📈</span>}
        iconVariant="pulse"
        deltas={[
          { label: '同比', value: '1.4%', direction: 'up', sentiment: 'good' },
          { label: '环比', value: '1.9%', direction: 'down', sentiment: 'bad' },
        ]}
        sparkline={
          <svg viewBox="0 0 200 36" className="w-full h-full">
            <polyline points="0,28 30,26 60,30 90,22 120,20 150,24 180,16 200,14" fill="none" stroke="var(--brand-500)" strokeWidth="1.5" />
          </svg>
        }
      />
      <KpiCard
        name="差评率"
        value="2.46"
        unit="%"
        icon={<span>📉</span>}
        iconVariant="alert"
        deltas={[
          { label: '同比', value: '29.5%', direction: 'down', sentiment: 'good' },
          { label: '环比', value: '7.4%', direction: 'up', sentiment: 'bad' },
        ]}
        sparkline={
          <svg viewBox="0 0 200 36" className="w-full h-full">
            <polyline points="0,20 30,22 60,18 90,24 120,22 150,26 180,28 200,30" fill="none" stroke="var(--brand-500)" strokeWidth="1.5" />
          </svg>
        }
      />
      <KpiCard
        name="评分人次"
        value="1,177"
        icon={<span>👥</span>}
        iconVariant="users"
        deltas={[
          { label: '同比', value: '26.7%', direction: 'down', sentiment: 'bad' },
          { label: '环比', value: '3.8%', direction: 'down', sentiment: 'bad' },
        ]}
        sparkline={
          <svg viewBox="0 0 200 36" className="w-full h-full">
            <polyline points="0,16 30,18 60,14 90,20 120,22 150,18 180,24 200,26" fill="none" stroke="var(--brand-500)" strokeWidth="1.5" />
          </svg>
        }
      />
    </div>
  ),
};
