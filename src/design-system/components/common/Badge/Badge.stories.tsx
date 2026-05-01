import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const IconPlaceholder = () => (
  <div className="w-8 h-8 rounded-md bg-surface-muted flex items-center justify-center text-fg-secondary">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  </div>
);

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 5,
    children: <IconPlaceholder />,
  },
};

export const Overflow: Story = {
  args: {
    count: 100,
    children: <IconPlaceholder />,
  },
};

export const Dot: Story = {
  args: {
    dot: true,
    children: <IconPlaceholder />,
  },
};

export const Zero: Story = {
  args: {
    count: 0,
    children: <IconPlaceholder />,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <Badge count={5}><IconPlaceholder /></Badge>
      <Badge count={100}><IconPlaceholder /></Badge>
      <Badge dot><IconPlaceholder /></Badge>
      <Badge count={0}><IconPlaceholder /></Badge>
    </div>
  ),
};
