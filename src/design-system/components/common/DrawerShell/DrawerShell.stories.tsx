import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DrawerShell, DrawerHeader, DrawerBody, DrawerFooter } from './DrawerShell';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/DrawerShell',
  component: DrawerShell,
} satisfies Meta<typeof DrawerShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ height: 480 }}>
      <DrawerShell size="sm">
        <DrawerHeader
          title="内分泌科 · 满意度详情"
          subtitle="近30天 · 汇总口径"
          onClose={() => {}}
        />
        <DrawerBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ padding: 16, background: 'var(--neutral-50)', borderRadius: 8, fontSize: 13, color: 'var(--neutral-500)' }}>
              科室整体表现稳定，「等待时间」维度略有下滑，建议重点关注周一上午就诊峰时的排班安排。
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>差评分布</div>
              <div style={{ fontSize: 13, color: 'var(--neutral-500)' }}>等待时间 62% · 解释不清 24% · 态度问题 14%</div>
            </div>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="default" size="sm">导出报告</Button>
          <Button variant="primary" size="sm">创建跟进任务</Button>
        </DrawerFooter>
      </DrawerShell>
    </div>
  ),
};

export const Medium: Story = {
  render: () => (
    <div style={{ height: 400 }}>
      <DrawerShell size="md">
        <DrawerHeader
          title="满意度趋势分析"
          onClose={() => {}}
        />
        <DrawerBody>
          <div style={{ fontSize: 13, color: 'var(--neutral-500)', lineHeight: 1.8 }}>
            <p>这是一个中等宽度的 Drawer，适用于需要更多展示空间的详情页面。</p>
            <p style={{ marginTop: 12 }}>内容区域支持滚动，可承载图表、表格等复杂内容。</p>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="default" size="sm">关闭</Button>
        </DrawerFooter>
      </DrawerShell>
    </div>
  ),
};

export const Large: Story = {
  render: () => (
    <div style={{ height: 400 }}>
      <DrawerShell size="lg">
        <DrawerHeader
          title="科室转化率详细报告"
          subtitle="2026年Q1 · 全院汇总"
          onClose={() => {}}
        />
        <DrawerBody>
          <div style={{ fontSize: 13, color: 'var(--neutral-500)', lineHeight: 1.8 }}>
            大宽度 Drawer（800px），适用于复杂数据分析和报表展示。
          </div>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="default" size="sm">导出 PDF</Button>
          <Button variant="primary" size="sm">确认并保存</Button>
        </DrawerFooter>
      </DrawerShell>
    </div>
  ),
};

export const ReactNodeTitle: Story = {
  render: () => (
    <div style={{ height: 400 }}>
      <DrawerShell size="lg">
        <DrawerHeader
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>内分泌科</span>
              <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 4, backgroundColor: '#FEF2F2', color: '#DC2626' }}>高风险</span>
            </div>
          }
          subtitle={
            <span>覆盖率 85% · 出诊日 18/22</span>
          }
          onClose={() => {}}
        />
        <DrawerBody>
          <div style={{ fontSize: 13, color: 'var(--neutral-500)' }}>
            支持 ReactNode 类型的标题，可以包含 badge、tag、icon 等复杂内容。
          </div>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="default" size="sm">关闭</Button>
        </DrawerFooter>
      </DrawerShell>
    </div>
  ),
};

export const HeaderOnly: Story = {
  render: () => (
    <div style={{ height: 300 }}>
      <DrawerShell>
        <DrawerHeader title="简洁标题" onClose={() => {}} />
        <DrawerBody>
          <div style={{ fontSize: 13, color: 'var(--neutral-500)' }}>
            没有 Footer 的抽屉示例。
          </div>
        </DrawerBody>
      </DrawerShell>
    </div>
  ),
};
