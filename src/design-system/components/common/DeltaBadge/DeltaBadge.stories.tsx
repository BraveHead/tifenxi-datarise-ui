import type { Meta, StoryObj } from '@storybook/react';
import { DeltaBadge } from './DeltaBadge';

const meta = {
  title: 'Components/DeltaBadge',
  component: DeltaBadge,
} satisfies Meta<typeof DeltaBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 涨（默认=橙红，问题类指标语义） */
export const Up: Story = {
  args: { value: 2.4, label: '同比' },
};

/** 跌（默认=绿色） */
export const Down: Story = {
  args: { value: -1.2, label: '环比' },
};

/** 持平 */
export const Flat: Story = {
  args: { value: 0 },
};

/** 反转模式：涨=绿（满意度等正向指标） */
export const InverseUp: Story = {
  args: { value: 3.5, label: '同比', inverse: true },
};

/** 反转模式：跌=红 */
export const InverseDown: Story = {
  args: { value: -2.1, label: '环比', inverse: true },
};

/** md 尺寸 */
export const MediumSize: Story = {
  args: { value: 16.5, label: '同比', size: 'md' },
};

/** 自定义单位 */
export const CustomUnit: Story = {
  args: { value: 4.2, label: '对比', unit: 'pp' },
};

/** 多组合展示 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <DeltaBadge value={2.4} label="同比" />
      <DeltaBadge value={-1.2} label="环比" />
      <DeltaBadge value={0} />
      <DeltaBadge value={3.5} label="同比" inverse />
      <DeltaBadge value={-2.1} label="环比" inverse />
      <DeltaBadge value={16.5} label="同比" size="md" />
    </div>
  ),
};
