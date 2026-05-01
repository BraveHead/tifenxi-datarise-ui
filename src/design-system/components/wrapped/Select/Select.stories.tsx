import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const options = [
  { label: '内科', value: 'internal' },
  { label: '外科', value: 'surgery' },
  { label: '儿科', value: 'pediatrics' },
  { label: '妇科', value: 'gynecology' },
];

const meta = {
  title: 'Wrapped/Select',
  component: Select,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options,
    placeholder: '请选择科室',
    style: { width: 200 },
  },
};

export const WithSearch: Story = {
  args: {
    options,
    showSearch: true,
    placeholder: '搜索科室',
    style: { width: 200 },
    filterOption: (input, option) =>
      (option?.label as string)?.includes(input),
  },
};

export const Multiple: Story = {
  args: {
    options,
    mode: 'multiple',
    placeholder: '请选择科室',
    style: { width: 300 },
  },
};

export const Disabled: Story = {
  args: {
    options,
    disabled: true,
    value: 'internal',
    style: { width: 200 },
  },
};
