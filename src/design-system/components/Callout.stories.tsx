import type { Meta, StoryObj } from '@storybook/react';
import { Callout, CalloutKV } from './Callout';

const meta = {
  title: 'Components/Callout',
  component: Callout,
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: 'info',
    children: (
      <div className="flex flex-wrap gap-x-5 gap-y-1 items-center">
        <CalloutKV label="数据覆盖度" value="高" />
        <CalloutKV label="样本量" value="2,090 份" />
        <CalloutKV label="可利科室" value="49 / 206" />
        <CalloutKV label="主动评价率" value="57%" />
      </div>
    ),
  },
};

export const Warning: Story = {
  args: { variant: 'warning', children: '该时间段数据量较少，统计结果可能存在偏差。' },
};

export const DangerCallout: Story = {
  args: { variant: 'danger', children: '检测到 3 项指标异常下降，请及时关注。' },
};

export const Success: Story = {
  args: { variant: 'success', children: '本月满意度较上月提升 2.3%，持续向好。' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Callout variant="info">信息提示：用于承载上下文信息。</Callout>
      <Callout variant="warning">警告提示：该时间段数据量较少。</Callout>
      <Callout variant="danger">错误提示：检测到指标异常。</Callout>
      <Callout variant="success">成功提示：满意度持续向好。</Callout>
    </div>
  ),
};
