import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Drawer } from './Drawer';

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  argTypes: {
    placement: {
      control: 'select',
      options: ['left', 'right'],
    },
    width: { control: 'number' },
    maskClosable: { control: 'boolean' },
    destroyOnClose: { control: 'boolean' },
  },
  args: {
    title: '详情面板',
    width: 640,
    placement: 'right',
    maskClosable: true,
    destroyOnClose: false,
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default ─────────────────────────────────────────────

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>
          打开抽屉
        </Button>
        <Drawer {...args} open={open} onClose={() => setOpen(false)}>
          <p>这是抽屉内容区域。支持任意 React 内容。</p>
          <p>可以滚动查看更多内容。</p>
        </Drawer>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const btn = within(canvasElement).getByRole('button', { name: '打开抽屉' });
    await expect(btn).toBeInTheDocument();
  },
};

// ── Custom Width ────────────────────────────────────────

export const CustomWidth: Story = {
  args: {
    title: '窄面板',
    width: 400,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="default" onClick={() => setOpen(true)}>
          400px 宽度
        </Button>
        <Drawer {...args} open={open} onClose={() => setOpen(false)}>
          <p>这是一个 400px 宽的抽屉面板。</p>
        </Drawer>
      </>
    );
  },
};

// ── Left Placement ──────────────────────────────────────

export const LeftPlacement: Story = {
  args: {
    title: '左侧面板',
    placement: 'left',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="default" onClick={() => setOpen(true)}>
          左侧打开
        </Button>
        <Drawer {...args} open={open} onClose={() => setOpen(false)}>
          <p>从左侧滑入的抽屉面板。</p>
        </Drawer>
      </>
    );
  },
};

// ── Destroy on Close ────────────────────────────────────

export const DestroyOnClose: Story = {
  args: {
    title: '关闭时销毁',
    destroyOnClose: true,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>
          关闭时销毁内容
        </Button>
        <Drawer {...args} open={open} onClose={() => setOpen(false)}>
          <p>关闭后内容会被销毁（destroyOnClose=true）。</p>
          <input placeholder="输入内容后关闭再打开，会被重置" style={{ width: '100%', marginTop: 12 }} />
        </Drawer>
      </>
    );
  },
};
