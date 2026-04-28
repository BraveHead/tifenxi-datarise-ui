import type { Meta, StoryObj } from '@storybook/react';
import { OverviewSection } from './OverviewSection';

const meta = {
  title: 'Components/OverviewSection',
  component: OverviewSection,
} satisfies Meta<typeof OverviewSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '模块整体情况',
    description: '全局数据总览，一目了然掌握核心业务指标',
    extra: '数据截至 2024-03-15',
    children: (
      <div className="grid grid-cols-3 gap-sp-4">
        <div className="h-24 rounded-lg bg-neutral-50 flex items-center justify-center text-fs-13 text-neutral-400">
          卡片占位
        </div>
        <div className="h-24 rounded-lg bg-neutral-50 flex items-center justify-center text-fs-13 text-neutral-400">
          卡片占位
        </div>
        <div className="h-24 rounded-lg bg-neutral-50 flex items-center justify-center text-fs-13 text-neutral-400">
          卡片占位
        </div>
      </div>
    ),
  },
};

export const TitleOnly: Story = {
  args: {
    title: '趋势分析',
    children: (
      <div className="h-48 rounded-lg bg-neutral-50 flex items-center justify-center text-fs-13 text-neutral-400">
        图表占位
      </div>
    ),
  },
};

export const WithDescription: Story = {
  args: {
    title: '科室对比',
    description: '各科室满意度横向对比，识别薄弱环节',
  },
};

export const WithExtra: Story = {
  args: {
    title: '满意度概览',
    extra: '更新于 10 分钟前',
    children: (
      <div className="h-32 rounded-lg bg-neutral-50 flex items-center justify-center text-fs-13 text-neutral-400">
        内容区域
      </div>
    ),
  },
};
