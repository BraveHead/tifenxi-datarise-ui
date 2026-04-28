import type { Meta, StoryObj } from '@storybook/react';
import { InfoPair } from './InfoPair';

const meta = {
  title: 'Components/InfoPair',
  component: InfoPair,
} satisfies Meta<typeof InfoPair>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: { label: '满意度', value: '92.3%' },
};

export const Vertical: Story = {
  args: { label: '满意度', value: '92.3%', direction: 'vertical' },
};

export const WithReactNode: Story = {
  args: {
    label: '总量',
    value: <span className="text-brand-500 font-semibold">2,090</span>,
  },
};

export const MetricRow: Story = {
  args: { label: '样本量', value: '2,090 份' },
  render: () => (
    <div className="flex gap-sp-6">
      <InfoPair label="样本量" value="2,090 份" />
      <InfoPair label="覆盖率" value="78.5%" />
      <InfoPair label="环比" value="+3.2%" />
    </div>
  ),
};

export const VerticalList: Story = {
  args: { label: '科室', value: '内科' },
  render: () => (
    <div className="flex flex-col gap-sp-3">
      <InfoPair label="科室" value="内科" direction="vertical" />
      <InfoPair label="评价数" value="1,234" direction="vertical" />
      <InfoPair label="满意度" value="95.6%" direction="vertical" />
    </div>
  ),
};

export const LongText: Story = {
  args: {
    label: '这是一个非常长的标签名称用于测试溢出',
    value: '这是一个非常长的数值描述用于验证换行行为是否正确',
  },
  decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
};
