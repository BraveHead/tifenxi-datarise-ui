import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'default', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    block: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  args: {
    children: '按钮',
    variant: 'default',
    size: 'md',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Variants ──────────────────────────────────────────

export const Primary: Story = {
  args: { variant: 'primary', children: '保存', onClick: fn() },
  play: async ({ canvasElement, args }) => {
    const btn = within(canvasElement).getByRole('button');
    await expect(btn).toHaveTextContent('保存');
    await userEvent.click(btn);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Default: Story = {
  args: { variant: 'default', children: '取消' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: '编辑' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: '删除' },
};

// ── Sizes ─────────────────────────────────────────────

export const Small: Story = {
  args: { variant: 'primary', size: 'sm', children: '行内操作' },
};

export const Large: Story = {
  args: { variant: 'primary', size: 'lg', children: '下一步' },
};

// ── States ────────────────────────────────────────────

export const Loading: Story = {
  args: { variant: 'primary', loading: true, children: '提交中', onClick: fn() },
  play: async ({ canvasElement, args }) => {
    const btn = within(canvasElement).getByRole('button');
    await expect(btn).toBeDisabled();
    await expect(btn).toHaveAttribute('aria-busy', 'true');
    const svg = btn.querySelector('svg');
    await expect(svg).toBeTruthy();
    await userEvent.click(btn);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true, children: '不可用', onClick: fn() },
  play: async ({ canvasElement, args }) => {
    const btn = within(canvasElement).getByRole('button');
    await expect(btn).toBeDisabled();
    await userEvent.click(btn);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const Block: Story = {
  args: { variant: 'primary', block: true, size: 'lg', children: '全宽按钮' },
  play: async ({ canvasElement }) => {
    const btn = within(canvasElement).getByRole('button');
    await expect(btn.className).toContain('w-full');
  },
};

// ── Icons ─────────────────────────────────────────────

export const WithIconLeft: Story = {
  args: {
    variant: 'primary',
    children: '编辑',
    iconLeft: <span data-testid="icon-left">✎</span>,
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('icon-left')).toBeTruthy();
  },
};

export const WithIconRight: Story = {
  args: {
    variant: 'default',
    children: '下一步',
    iconRight: <span data-testid="icon-right">→</span>,
  },
};

/** icon-only 按钮必须提供 aria-label */
export const IconOnly: Story = {
  args: {
    variant: 'ghost',
    iconLeft: <span aria-hidden="true">✎</span>,
    'aria-label': '编辑',
    children: undefined,
  },
  play: async ({ canvasElement }) => {
    const btn = within(canvasElement).getByRole('button', { name: '编辑' });
    await expect(btn).toBeInTheDocument();
  },
};

// ── Combinations ──────────────────────────────────────

/** 同区域内 primary 最多一个，其余用 default / ghost */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="primary">主操作</Button>
      <Button variant="default">次要</Button>
      <Button variant="ghost">文字</Button>
      <Button variant="danger">危险</Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const btns = within(canvasElement).getAllByRole('button');
    await expect(btns).toHaveLength(4);
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="primary" size="sm">sm · 28px</Button>
      <Button variant="primary" size="md">md · 32px</Button>
      <Button variant="primary" size="lg">lg · 40px</Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const btns = within(canvasElement).getAllByRole('button');
    await expect(btns).toHaveLength(3);
    await expect(btns[0].className).toContain('h-7');
    await expect(btns[1].className).toContain('h-8');
    await expect(btns[2].className).toContain('h-10');
  },
};
