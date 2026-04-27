import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ActionCard } from './ActionCard';
import { Button } from '../../common/Button/Button';

/** 单卡预览宽度，模拟实际布局中的单列（≈400px） */
const singleCardDecorator = (Story: React.ComponentType) => (
  <div style={{ maxWidth: 400 }}>
    <Story />
  </div>
);

const meta = {
  title: 'Components/ActionCard',
  component: ActionCard,
} satisfies Meta<typeof ActionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HighPriority: Story = {
  decorators: [singleCardDecorator],
  args: {
    priority: 'high',
    title: '优化骨科候诊流程减少等待投诉',
    description: '「等待时间过长」占差评 38%，通过叫号系统优化可快速见效。',
    steps: [
      '接入实时叫号系统，推送候诊进度',
      '设置 30 分钟候诊超时预警',
      '调配弹性诊室应对峰时',
    ],
    verification: '验证：骨科「等待」类差评下降 ≥50%',
    actions: (
      <>
        <Button variant="default" size="sm">查看详情</Button>
        <Button variant="primary" size="sm">创建任务</Button>
      </>
    ),
  },
};

export const MediumPriority: Story = {
  decorators: [singleCardDecorator],
  args: {
    priority: 'medium',
    title: '推进处方在线审核覆盖率提升',
    description: '处方审核覆盖仅 52%，未覆盖部分转化率低 18pp。',
    steps: [
      '扩大电子处方试点科室范围',
      '优化药师在线审核响应时效',
    ],
    verification: '验证：处方转化率提升至 ≥74%',
    actions: (
      <>
        <Button variant="ghost" size="sm">采纳</Button>
        <Button variant="default" size="sm">创建任务</Button>
      </>
    ),
  },
};

export const LowPriority: Story = {
  decorators: [singleCardDecorator],
  args: {
    priority: 'low',
    title: '完善医生沟通培训体系',
    description: '「解释不清」类差评持续存在，系统性培训可从根源改善。',
    steps: ['针对高差评医生开展沟通技巧培训'],
    verification: '验证：「解释不清」类差评下降 60%',
    actions: <Button variant="ghost" size="sm">查看详情</Button>,
  },
};

export const AllPriorities: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 1200 }}>
      <ActionCard
        priority="high"
        title="优化骨科候诊流程减少等待投诉"
        description="「等待时间过长」占差评 38%。"
        steps={['接入实时叫号系统', '设置超时预警', '调配弹性诊室']}
        verification="验证：骨科差评下降 ≥50%"
        actions={<><Button variant="default" size="sm">查看</Button><Button variant="primary" size="sm">创建</Button></>}
      />
      <ActionCard
        priority="medium"
        title="推进处方在线审核覆盖率提升"
        description="处方审核覆盖仅 52%。"
        steps={['扩大电子处方试点', '优化审核响应时效']}
        verification="验证：转化率提升至 ≥74%"
        actions={<><Button variant="ghost" size="sm">采纳</Button><Button variant="default" size="sm">创建</Button></>}
      />
      <ActionCard
        priority="low"
        title="完善医生沟通培训体系"
        description="「解释不清」类差评持续存在。"
        steps={['开展沟通技巧培训']}
        verification="验证：差评下降 60%"
        actions={<Button variant="ghost" size="sm">查看</Button>}
      />
    </div>
  ),
};
