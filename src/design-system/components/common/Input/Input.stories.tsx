import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  args: { placeholder: '请输入科室名称' },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: '科室名称', placeholder: '请输入科室名称' },
};

export const Focus: Story = {
  args: { label: '科室名称', defaultValue: '内分泌科', autoFocus: true },
};

export const Error: Story = {
  args: { label: '科室名称', defaultValue: 'abc123', error: true, help: '仅支持中文与数字组合' },
};

export const Disabled: Story = {
  args: { label: '科室名称', placeholder: '系统自动填充', disabled: true },
};

export const WithHelp: Story = {
  args: { label: '科室名称', placeholder: '请输入', help: '最多 20 个字符' },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
      <Input label="默认态" placeholder="请输入科室名称" />
      <Input label="聚焦态" defaultValue="内分泌科" autoFocus />
      <Input label="错误态" defaultValue="abc123" error help="仅支持中文与数字组合" />
      <Input label="禁用态" placeholder="系统自动填充" disabled />
    </div>
  ),
};
