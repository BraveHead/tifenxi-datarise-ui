import type { Meta, StoryObj } from '@storybook/react';
import { KpiCardGrid } from './KpiCardGrid';
import { KpiCard } from '../../business/KpiCard/KpiCard';

const meta = {
  title: 'Components/KpiCardGrid',
  component: KpiCardGrid,
} satisfies Meta<typeof KpiCardGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const PlaceholderCard = ({ label }: { label: string }) => (
  <div className="h-32 rounded-lg border border-neutral-200 bg-neutral-0 flex items-center justify-center text-fs-14 text-neutral-500 shadow-card">
    {label}
  </div>
);

export const FourColumns: Story = {
  args: {
    columns: 4,
    children: (
      <>
        <PlaceholderCard label="满意度" />
        <PlaceholderCard label="NPS 指数" />
        <PlaceholderCard label="回收率" />
        <PlaceholderCard label="投诉率" />
      </>
    ),
  },
};

export const ThreeColumns: Story = {
  args: {
    columns: 3,
    children: (
      <>
        <PlaceholderCard label="满意度" />
        <PlaceholderCard label="NPS 指数" />
        <PlaceholderCard label="回收率" />
      </>
    ),
  },
};

export const TwoColumns: Story = {
  args: {
    columns: 2,
    children: (
      <>
        <PlaceholderCard label="满意度" />
        <PlaceholderCard label="NPS 指数" />
      </>
    ),
  },
};

export const SingleColumn: Story = {
  args: {
    columns: 1,
    children: (
      <>
        <PlaceholderCard label="满意度" />
        <PlaceholderCard label="NPS 指数" />
      </>
    ),
  },
};

export const WithKpiCards: Story = {
  args: { columns: 4, children: null },
  render: () => (
    <KpiCardGrid columns={4}>
      <KpiCard name="整体满意度" value="92.3" unit="%" deltas={[{ label: '同比', value: '+3.2%', direction: 'up', sentiment: 'good' }]} />
      <KpiCard name="NPS 指数" value="68.5" unit="分" deltas={[{ label: '环比', value: '+1.8%', direction: 'up', sentiment: 'good' }]} />
      <KpiCard name="主动评价率" value="57" unit="%" deltas={[{ label: '同比', value: '-2.1%', direction: 'down', sentiment: 'bad' }]} />
      <KpiCard name="投诉率" value="0.8" unit="%" deltas={[{ label: '环比', value: '-0.3%', direction: 'down', sentiment: 'good' }]} />
    </KpiCardGrid>
  ),
};
