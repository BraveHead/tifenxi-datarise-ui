import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker, RangePicker } from './DatePicker';

const meta = {
  title: 'Wrapped/DatePicker',
  component: DatePicker,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '选择日期',
  },
};

export const Range: Story = {
  render: () => <RangePicker />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '不可选择',
  },
};
