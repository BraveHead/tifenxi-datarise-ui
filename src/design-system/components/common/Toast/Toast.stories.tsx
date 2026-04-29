import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { toast } from './Toast';

const meta = {
  title: 'Components/Toast',
  parameters: {
    docs: {
      description: {
        component: 'Toast is a utility function (not a React component). Call `toast.success/error/info/warning` to show messages.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ── All types ───────────────────────────────────────────

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button variant="primary" onClick={() => toast.success('操作成功')}>
        Success
      </Button>
      <Button variant="danger" onClick={() => toast.error('操作失败，请重试')}>
        Error
      </Button>
      <Button variant="default" onClick={() => toast.info('这是一条提示信息')}>
        Info
      </Button>
      <Button variant="default" onClick={() => toast.warning('请注意检查数据')}>
        Warning
      </Button>
    </div>
  ),
};

// ── Custom Duration ─────────────────────────────────────

export const CustomDuration: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button variant="default" onClick={() => toast.info('1 秒后消失', { duration: 1000 })}>
        1s
      </Button>
      <Button variant="default" onClick={() => toast.info('5 秒后消失', { duration: 5000 })}>
        5s
      </Button>
      <Button variant="default" onClick={() => toast.info('10 秒后消失', { duration: 10000 })}>
        10s
      </Button>
    </div>
  ),
};

// ── Stacked ─────────────────────────────────────────────

export const Stacked: Story = {
  render: () => (
    <Button
      variant="primary"
      onClick={() => {
        toast.success('第 1 条消息');
        setTimeout(() => toast.info('第 2 条消息'), 300);
        setTimeout(() => toast.warning('第 3 条消息'), 600);
        setTimeout(() => toast.error('第 4 条消息'), 900);
      }}
    >
      连续触发 4 条
    </Button>
  ),
};
