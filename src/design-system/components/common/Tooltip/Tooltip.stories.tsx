import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Tooltip } from './Tooltip';
import type { TooltipPlacement } from './Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
    },
  },
  args: {
    title: '提示信息',
    placement: 'top',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 80, display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Placements ──────────────────────────────────────────

export const Placements: Story = {
  render: () => {
    const placements: TooltipPlacement[] = [
      'top', 'topLeft', 'topRight',
      'bottom', 'bottomLeft', 'bottomRight',
      'left', 'right',
    ];
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {placements.map((p) => (
          <Tooltip key={p} title={`Placement: ${p}`} placement={p}>
            <Button variant="default">{p}</Button>
          </Tooltip>
        ))}
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const btns = within(canvasElement).getAllByRole('button');
    await expect(btns.length).toBe(8);
  },
};

// ── Rich content ────────────────────────────────────────

export const ReactNodeContent: Story = {
  args: {
    title: (
      <div>
        <strong>标题</strong>
        <p style={{ margin: '4px 0 0' }}>这是一段说明文字</p>
      </div>
    ),
    placement: 'bottom',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="primary">富文本提示</Button>
    </Tooltip>
  ),
};

// ── Controlled ──────────────────────────────────────────

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Button variant="default" onClick={() => setOpen(!open)}>
          {open ? '隐藏' : '显示'} Tooltip
        </Button>
        <Tooltip title="受控模式下的提示" open={open} placement="right">
          <Button variant="primary">目标</Button>
        </Tooltip>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const btns = within(canvasElement).getAllByRole('button');
    await expect(btns.length).toBe(2);
  },
};
