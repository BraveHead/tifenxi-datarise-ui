import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1zm0 3a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 0 1.5 0v-4.5A.75.75 0 0 0 8 4zm0 8a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z" />
  </svg>
);

const WarningIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M7.134 1.506a1 1 0 0 1 1.732 0l6.25 10.828A1 1 0 0 1 14.25 14H1.75a1 1 0 0 1-.866-1.5L7.134 1.506zM8 5a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 0 1.5 0v-3.5A.75.75 0 0 0 8 5zm0 7a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z" />
  </svg>
);

export const Info: Story = {
  args: {
    variant: 'info',
    icon: <InfoIcon />,
    children: '本月数据已更新，覆盖 49 个科室。',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    icon: <InfoIcon />,
    children: '满意度较上月提升 2.3%，持续向好。',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    icon: <WarningIcon />,
    children: '该时间段数据量较少，统计结果可能存在偏差。',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    icon: <WarningIcon />,
    children: '检测到 3 项指标异常下降，请及时关注。',
  },
};

export const NoIcon: Story = {
  args: {
    variant: 'info',
    children: '这是一条没有图标的提示信息。',
  },
};

/** 可关闭 Alert — 点击关闭按钮后消失 */
export const Closable: Story = {
  args: { variant: 'info', children: '' },
  render: () => {
    const ClosableDemo = () => {
      const [visible, setVisible] = useState(true);
      if (!visible) return <span className="text-fs-13 text-neutral-500">已关闭</span>;
      return (
        <Alert variant="info" icon={<InfoIcon />} closable onClose={() => setVisible(false)}>
          这是一条可关闭的提示信息，点击右侧按钮关闭。
        </Alert>
      );
    };
    return <ClosableDemo />;
  },
};

export const AllVariants: Story = {
  args: { children: '' },
  render: () => (
    <div className="flex flex-col gap-sp-3" style={{ maxWidth: 520 }}>
      <Alert variant="info" icon={<InfoIcon />}>信息提示：数据已更新完成。</Alert>
      <Alert variant="success" icon={<InfoIcon />}>成功提示：满意度持续提升。</Alert>
      <Alert variant="warning" icon={<WarningIcon />}>警告提示：数据量偏少。</Alert>
      <Alert variant="danger" icon={<WarningIcon />}>错误提示：指标异常下降。</Alert>
      <Alert variant="info" closable onClose={() => {}}>无图标 + 长文本 + 可关闭：当内容较长时验证布局不会挤压关闭按钮，确保各元素正确对齐。</Alert>
    </div>
  ),
};
