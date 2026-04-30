import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Modal } from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    width: { control: 'number' },
    maskClosable: { control: 'boolean' },
    centered: { control: 'boolean' },
    destroyOnClose: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  args: {
    title: '确认操作',
    width: 480,
    okText: '确定',
    cancelText: '取消',
    maskClosable: true,
    centered: true,
    destroyOnClose: false,
    loading: false,
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default ─────────────────────────────────────────────

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>
          打开弹窗
        </Button>
        <Modal
          {...args}
          open={open}
          onCancel={() => setOpen(false)}
          onOk={() => {
            alert('OK clicked');
            setOpen(false);
          }}
        >
          <p>确定要执行此操作吗？此操作不可撤销。</p>
        </Modal>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const btn = within(canvasElement).getByRole('button', { name: '打开弹窗' });
    await expect(btn).toBeInTheDocument();
  },
};

// ── Custom Footer ───────────────────────────────────────

export const CustomFooter: Story = {
  args: {
    title: '自定义底部',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="default" onClick={() => setOpen(true)}>
          自定义 Footer
        </Button>
        <Modal
          {...args}
          open={open}
          onCancel={() => setOpen(false)}
          footer={
            <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between', width: '100%' }}>
              <Button variant="ghost" onClick={() => setOpen(false)}>跳过</Button>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="default" onClick={() => setOpen(false)}>上一步</Button>
                <Button variant="primary" onClick={() => setOpen(false)}>下一步</Button>
              </div>
            </div>
          }
        >
          <p>使用自定义 footer 渲染，支持任意按钮组合。</p>
        </Modal>
      </>
    );
  },
};

// ── No Footer ───────────────────────────────────────────

export const NoFooter: Story = {
  args: {
    title: '无底部',
    footer: null,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="default" onClick={() => setOpen(true)}>
          无 Footer
        </Button>
        <Modal {...args} open={open} onCancel={() => setOpen(false)}>
          <p>此弹窗没有底部按钮区域（footer=null）。</p>
          <p>适用于纯展示型弹窗。</p>
        </Modal>
      </>
    );
  },
};

// ── Loading ─────────────────────────────────────────────

export const Loading: Story = {
  args: {
    title: '提交中',
    loading: true,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>
          加载状态
        </Button>
        <Modal {...args} open={open} onCancel={() => setOpen(false)}>
          <p>OK 按钮处于加载状态，不可点击。</p>
        </Modal>
      </>
    );
  },
};

// ── Custom Width ────────────────────────────────────────

export const CustomWidth: Story = {
  args: {
    title: '宽弹窗',
    width: 720,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="default" onClick={() => setOpen(true)}>
          720px 宽度
        </Button>
        <Modal {...args} open={open} onCancel={() => setOpen(false)}>
          <p>这是一个 720px 宽的弹窗。</p>
          <div style={{ height: 200, background: 'var(--surface-muted)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg-secondary)' }}>
            内容占位区
          </div>
        </Modal>
      </>
    );
  },
};
