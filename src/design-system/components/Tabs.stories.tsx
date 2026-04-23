import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs, SegTabs } from './Tabs';
import type { TabItem } from './Tabs';

const items: TabItem[] = [
  { key: 'risk', label: '风险清单' },
  { key: 'praise', label: '荣誉清单' },
  { key: 'pending', label: '待处理' },
];

/* ── Underline Tabs ──────────────────────────── */

const tabsMeta = {
  title: 'Components/Tabs',
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default tabsMeta;
type TabsStory = StoryObj<typeof tabsMeta>;

export const Default: TabsStory = {
  render: () => {
    const [active, setActive] = useState('risk');
    return <Tabs items={items} activeKey={active} onChange={setActive} />;
  },
};

/* ── Capsule SegTabs ─────────────────────────── */

export const Capsule: TabsStory = {
  render: () => {
    const [active, setActive] = useState('risk');
    return <SegTabs items={items} activeKey={active} onChange={setActive} />;
  },
};

export const Both: TabsStory = {
  render: () => {
    const [t1, setT1] = useState('risk');
    const [t2, setT2] = useState('risk');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div>
          <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 8 }}>下划线式（模块内切换）</p>
          <Tabs items={items} activeKey={t1} onChange={setT1} />
        </div>
        <div>
          <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 8 }}>胶囊式（页面级切换）</p>
          <SegTabs items={items} activeKey={t2} onChange={setT2} />
        </div>
      </div>
    );
  },
};
