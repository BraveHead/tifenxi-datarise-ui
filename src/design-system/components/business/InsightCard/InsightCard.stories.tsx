import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InsightCard } from './InsightCard';
import { Tag } from '../../common/Tag/Tag';

const meta = {
  title: 'Components/InsightCard',
  component: InsightCard,
  decorators: [(Story: React.ComponentType) => (
    <div style={{ maxWidth: 640 }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof InsightCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Positive: Story = {
  args: {
    type: 'positive',
    title: '满意度稳步提升',
    description: '近 3 个月连续改善，内分泌科为主要贡献科室，推荐率提升 4.2pp。',
    footer: (
      <>
        <Tag variant="success">优秀</Tag>
        <span style={{ fontSize: 12, color: 'var(--neutral-500)' }}>影响指标：推荐率 +4.2pp</span>
      </>
    ),
  },
};

export const Negative: Story = {
  args: {
    type: 'negative',
    title: '骨科中差评率持续上升',
    description: '连续 4 周环比上升，「解释不清」类差评占比达 63%，需优先介入。',
    footer: (
      <>
        <Tag variant="danger">风险</Tag>
        <span style={{ fontSize: 12, color: 'var(--neutral-500)' }}>影响科室：骨科、外科</span>
      </>
    ),
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    title: '处方转化率低于行业基准',
    description: '当前 68.3%，低于同类医院均值 74.1%，可能存在流程断点。',
    footer: (
      <>
        <Tag variant="warning">关注</Tag>
        <span style={{ fontSize: 12, color: 'var(--neutral-500)' }}>差距 5.8pp</span>
      </>
    ),
  },
};

export const Neutral: Story = {
  args: {
    type: 'neutral',
    title: '节假日就诊量呈现规律性峰值',
    description: '春节、国庆前后 3 天为就诊高峰，建议提前调配排班资源。',
    footer: <Tag variant="neutral">观察</Tag>,
  },
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <InsightCard
        type="positive"
        title="满意度稳步提升"
        description="近 3 个月连续改善，内分泌科为主要贡献科室。"
        footer={<><Tag variant="success">优秀</Tag><span style={{ fontSize: 12, color: 'var(--neutral-500)' }}>推荐率 +4.2pp</span></>}
      />
      <InsightCard
        type="negative"
        title="骨科中差评率持续上升"
        description="连续 4 周环比上升，「解释不清」类差评占比达 63%。"
        footer={<><Tag variant="danger">风险</Tag><span style={{ fontSize: 12, color: 'var(--neutral-500)' }}>影响科室：骨科</span></>}
      />
      <InsightCard
        type="warning"
        title="处方转化率低于行业基准"
        description="当前 68.3%，低于同类医院均值 74.1%。"
        footer={<><Tag variant="warning">关注</Tag><span style={{ fontSize: 12, color: 'var(--neutral-500)' }}>差距 5.8pp</span></>}
      />
      <InsightCard
        type="neutral"
        title="节假日就诊量呈现规律性峰值"
        description="春节、国庆前后 3 天为就诊高峰。"
        footer={<Tag variant="neutral">观察</Tag>}
      />
    </div>
  ),
};
