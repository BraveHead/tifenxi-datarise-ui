import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta = {
  title: 'Components/Divider',
  component: Divider,
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
  args: { direction: 'horizontal' },
};

export const Vertical: Story = {
  decorators: [(Story) => <div style={{ height: 80, display: 'flex' }}><Story /></div>],
  args: { direction: 'vertical' },
};

export const CustomColor: Story = {
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
  args: { direction: 'horizontal', className: 'bg-brand-200' },
};

export const InContext: Story = {
  render: () => (
    <div className="flex flex-col gap-sp-4" style={{ width: 320 }}>
      <div className="text-fs-14 text-neutral-900">上方内容</div>
      <Divider />
      <div className="text-fs-14 text-neutral-900">下方内容</div>
    </div>
  ),
};

export const VerticalInline: Story = {
  render: () => (
    <div className="flex items-center gap-sp-3" style={{ height: 24 }}>
      <span className="text-fs-13 text-neutral-700">左侧</span>
      <Divider direction="vertical" />
      <span className="text-fs-13 text-neutral-700">右侧</span>
    </div>
  ),
};
