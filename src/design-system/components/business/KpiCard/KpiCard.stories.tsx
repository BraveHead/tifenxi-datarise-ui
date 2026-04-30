import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KpiCard } from './KpiCard';

const singleCardDecorator = (Story: React.ComponentType) => (
  <div style={{ maxWidth: 320 }}>
    <Story />
  </div>
);

const meta = {
  title: 'Components/KpiCard',
  component: KpiCard,
} satisfies Meta<typeof KpiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [singleCardDecorator],
  args: {
    title: '总样本量',
    value: '2,090',
    unit: '份',
    comparison: { yoy: 12.4, mom: -3.2 },
  },
};

export const WithSparkline: Story = {
  decorators: [singleCardDecorator],
  args: {
    title: '整体满意度',
    value: '96.8',
    unit: '分',
    icon: <span>😊</span>,
    iconBgColor: 'bg-blue-100',
    comparison: { yoy: 0.8, mom: -0.5 },
    sparkline: (
      <svg viewBox="0 0 200 36" preserveAspectRatio="none" className="w-full h-full">
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
  decorators: [singleCardDecorator],
  args: {
    title: '低分占比',
    value: '3.0',
    unit: '%',
    danger: true,
    comparison: { yoy: 0.3, mom: null },
  },
};

export const HighlightCard: Story = {
  decorators: [singleCardDecorator],
  args: {
    title: '门诊患者满意度',
    value: '97.2',
    highlight: true,
    icon: <span>😊</span>,
    iconBgColor: 'bg-blue-100',
    comparison: { yoy: 0.8, mom: -0.5 },
    sparkline: (
      <svg viewBox="0 0 200 36" preserveAspectRatio="none" className="w-full h-full">
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

export const FlatTrend: Story = {
  decorators: [singleCardDecorator],
  args: {
    title: '发起预约人数',
    value: '0',
    icon: <span>📅</span>,
    iconBgColor: 'bg-blue-50',
    comparison: { yoy: 0, mom: 0 },
    sparkline: (
      <svg viewBox="0 0 200 36" preserveAspectRatio="none" className="w-full h-full">
        <line x1="0" y1="18" x2="200" y2="18" stroke="var(--brand-500)" strokeWidth="1.5" />
      </svg>
    ),
  },
};

/** 深色主题预览 */
export const DarkTheme: Story = {
  decorators: [(Story: React.ComponentType) => (
    <div className="dark" style={{ maxWidth: 320, padding: 24, backgroundColor: 'var(--surface-page)' }}>
      <Story />
    </div>
  )],
  args: {
    title: '门诊患者满意度',
    value: '97.2',
    highlight: true,
    icon: <span>😊</span>,
    iconBgColor: 'bg-blue-900',
    comparison: { yoy: 0.8, mom: -0.5 },
    sparkline: (
      <svg viewBox="0 0 200 36" preserveAspectRatio="none" className="w-full h-full">
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

/** 使用 trends 自定义趋势项 */
export const WithTrends: Story = {
  decorators: [singleCardDecorator],
  args: {
    title: '整体满意度',
    value: '96.8',
    unit: '分',
    icon: <span>😊</span>,
    iconBgColor: 'bg-blue-100',
    trends: [
      { label: '较上月', value: 1.2 },
      { label: '较上季', value: -0.8 },
      { label: '较去年', value: 3.5 },
    ],
  },
};

/** trends 优先级高于 comparison */
export const TrendsOverComparison: Story = {
  decorators: [singleCardDecorator],
  args: {
    title: '好评率',
    value: '91.42',
    unit: '%',
    comparison: { yoy: 12.4, mom: -3.2 },
    trends: [
      { label: '较上周', value: 0.5 },
      { label: '较上月', value: -2.1 },
    ],
  },
};

/** 模拟 KPI 行（全宽 4 列） */
export const KpiRow: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
      <KpiCard
        title="门诊患者满意度"
        value="97.2"
        highlight
        icon={<span>😊</span>}
        iconBgColor="bg-blue-100"
        comparison={{ yoy: 0.8, mom: -0.5 }}
        sparkline={
          <svg viewBox="0 0 200 36" preserveAspectRatio="none" className="w-full h-full">
            <polyline points="0,30 25,28 50,32 75,26 100,24 125,28 150,20 175,18 200,16" fill="none" stroke="var(--brand-500)" strokeWidth="1.5" />
          </svg>
        }
      />
      <KpiCard
        title="好评率"
        value="91.42"
        unit="%"
        icon={<span>📈</span>}
        iconBgColor="bg-green-100"
        comparison={{ yoy: 1.4, mom: -1.9 }}
        sparkline={
          <svg viewBox="0 0 200 36" preserveAspectRatio="none" className="w-full h-full">
            <polyline points="0,28 30,26 60,30 90,22 120,20 150,24 180,16 200,14" fill="none" stroke="var(--brand-500)" strokeWidth="1.5" />
          </svg>
        }
      />
      <KpiCard
        title="差评率"
        value="2.46"
        unit="%"
        icon={<span>📉</span>}
        iconBgColor="bg-orange-100"
        comparison={{ yoy: -29.5, mom: 7.4 }}
        sparkline={
          <svg viewBox="0 0 200 36" preserveAspectRatio="none" className="w-full h-full">
            <polyline points="0,20 30,22 60,18 90,24 120,22 150,26 180,28 200,30" fill="none" stroke="var(--brand-500)" strokeWidth="1.5" />
          </svg>
        }
      />
      <KpiCard
        title="评分人次"
        value="1,177"
        icon={<span>👥</span>}
        iconBgColor="bg-pink-100"
        comparison={{ yoy: -26.7, mom: -3.8 }}
        sparkline={
          <svg viewBox="0 0 200 36" preserveAspectRatio="none" className="w-full h-full">
            <polyline points="0,16 30,18 60,14 90,20 120,22 150,18 180,24 200,26" fill="none" stroke="var(--brand-500)" strokeWidth="1.5" />
          </svg>
        }
      />
    </div>
  ),
};
