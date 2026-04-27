import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SectionTitle } from './SectionTitle';
import { Button } from '../Button/Button';
import { Tag } from '../Tag/Tag';

const meta = {
  title: 'Components/SectionTitle',
  component: SectionTitle,
  decorators: [(Story: React.ComponentType) => (
    <div style={{ maxWidth: 640 }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof SectionTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    number: 1,
    title: '科室服务质量排名',
    description: '基于患者评价的科室综合排名，每周更新',
  },
};

export const WithAction: Story = {
  args: {
    number: 1,
    title: '科室服务质量排名',
    description: '基于患者评价的科室综合排名，每周更新',
    action: <Button variant="default" size="sm">导出</Button>,
  },
};

export const WithExtra: Story = {
  args: {
    number: 2,
    title: '差评原因分布',
    description: '按差评类型归因，帮助识别系统性问题',
    numberColor: 'bg-success-500',
    extra: <Tag variant="warning">需关注</Tag>,
  },
};

export const NoNumber: Story = {
  args: {
    title: '行动建议',
    description: '基于数据分析生成的改进建议',
  },
};

export const MultipleSections: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionTitle
        number={1}
        title="科室服务质量排名"
        description="基于患者评价的科室综合排名"
        action={<Button variant="default" size="sm">导出</Button>}
      />
      <SectionTitle
        number={2}
        title="差评原因分布"
        description="按差评类型归因，帮助识别系统性问题"
        numberColor="bg-success-500"
        extra={<Tag variant="warning">需关注</Tag>}
      />
      <SectionTitle
        number={3}
        title="行动建议"
        numberColor="bg-danger-500"
      />
    </div>
  ),
};
