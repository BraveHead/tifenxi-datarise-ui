import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { Spinner } from './Spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    tip: { control: 'text' },
  },
  args: {
    size: 'md',
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default ──────────────────────────────────────────

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const el = within(canvasElement).getByRole('status');
    await expect(el).toBeInTheDocument();
    await expect(el).toHaveAttribute('aria-live', 'polite');
  },
};

// ── Sizes ────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const spinners = within(canvasElement).getAllByRole('status');
    await expect(spinners).toHaveLength(3);
  },
};

// ── WithTip ──────────────────────────────────────────

export const WithTip: Story = {
  args: {
    size: 'lg',
    tip: '加载中...',
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('加载中...')).toBeInTheDocument();
  },
};

// ── WrapperMode ──────────────────────────────────────

export const WrapperMode: Story = {
  render: () => (
    <Spinner tip="加载中..." size="lg">
      <div style={{ padding: 32, border: '1px solid var(--line)', borderRadius: 8, minHeight: 200 }}>
        <p style={{ color: 'var(--fg-body)' }}>这是被包裹的内容区域</p>
        <p style={{ color: 'var(--fg-secondary)', fontSize: 13 }}>Spinner 遮罩覆盖在上方</p>
      </div>
    </Spinner>
  ),
  play: async ({ canvasElement }) => {
    const status = within(canvasElement).getByRole('status');
    await expect(status.className).toContain('relative');
    await expect(within(canvasElement).getByText('加载中...')).toBeInTheDocument();
  },
};
