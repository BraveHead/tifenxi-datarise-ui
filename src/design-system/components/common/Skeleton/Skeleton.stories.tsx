import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { Skeleton, SkeletonBlock } from './Skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  argTypes: {
    active: { control: 'boolean' },
    title: { control: 'boolean' },
  },
  args: {
    active: true,
    title: true,
  },
  decorators: [(Story: React.ComponentType) => (
    <div style={{ maxWidth: 480 }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default ──────────────────────────────────────────

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector('.space-y-3');
    await expect(el).toBeTruthy();
  },
};

// ── NoTitle ──────────────────────────────────────────

export const NoTitle: Story = {
  args: {
    title: false,
  },
};

// ── CustomRows ───────────────────────────────────────

export const CustomRows: Story = {
  args: {
    paragraph: { rows: 5 },
  },
};

// ── SingleRow ────────────────────────────────────────

export const SingleRow: Story = {
  args: {
    title: false,
    paragraph: { rows: 1 },
  },
};

// ── Inactive ─────────────────────────────────────────

export const Inactive: Story = {
  args: {
    active: false,
  },
};

// ── Block ────────────────────────────────────────────

export const Block: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <SkeletonBlock width={48} height={48} rounded />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SkeletonBlock width="60%" height={16} />
        <SkeletonBlock width="100%" height={12} />
        <SkeletonBlock width="80%" height={12} />
      </div>
    </div>
  ),
};

// ── CardSkeleton ─────────────────────────────────────

export const CardSkeleton: StoryObj = {
  render: () => (
    <div style={{ border: '1px solid var(--line)', borderRadius: 8, padding: 20 }}>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <SkeletonBlock width={40} height={40} rounded />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'center' }}>
          <SkeletonBlock width="40%" height={14} />
          <SkeletonBlock width="25%" height={10} />
        </div>
      </div>
      <Skeleton title={false} paragraph={{ rows: 3 }} />
    </div>
  ),
};
