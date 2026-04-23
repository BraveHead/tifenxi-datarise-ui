import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  args: { children: '标签' },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SeverityHigh: Story = { args: { variant: 'severity-high', children: '中影响' } };
export const SeverityMid: Story = { args: { variant: 'severity-mid', children: '低影响' } };
export const SeverityLow: Story = { args: { variant: 'severity-low', children: '可忽略' } };
export const Danger: Story = { args: { variant: 'danger', dot: 'danger', children: '风险' } };
export const Success: Story = { args: { variant: 'success', dot: 'success', children: '正向' } };
export const Info: Story = { args: { variant: 'info', children: '信息' } };
export const Neutral: Story = { args: { variant: 'neutral', children: '草稿' } };

export const WithDot: Story = {
  args: { variant: 'neutral', dot: 'warning', children: '待关注' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Tag variant="severity-high">中影响</Tag>
        <Tag variant="severity-mid">低影响</Tag>
        <Tag variant="severity-low">可忽略</Tag>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Tag variant="danger" dot="danger">风险</Tag>
        <Tag variant="success" dot="success">正向</Tag>
        <Tag variant="neutral" dot="warning">待关注</Tag>
        <Tag variant="info">信息</Tag>
        <Tag variant="neutral">草稿</Tag>
      </div>
    </div>
  ),
};
