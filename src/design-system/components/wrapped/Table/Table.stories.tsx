import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';
import type { ColumnsType } from './Table';

interface DemoRecord {
  key: string;
  name: string;
  department: string;
  score: number;
}

const columns: ColumnsType<DemoRecord> = [
  { title: '姓名', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
  { title: '科室', dataIndex: 'department', key: 'department' },
  { title: '评分', dataIndex: 'score', key: 'score', sorter: (a, b) => a.score - b.score },
];

const dataSource: DemoRecord[] = [
  { key: '1', name: '张三', department: '内科', score: 92 },
  { key: '2', name: '李四', department: '外科', score: 85 },
  { key: '3', name: '王五', department: '儿科', score: 88 },
  { key: '4', name: '赵六', department: '内科', score: 95 },
];

const meta = {
  title: 'Wrapped/Table',
  component: Table,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns,
    dataSource,
  },
};

export const Empty: Story = {
  args: {
    columns,
    dataSource: [],
  },
};

export const NoPagination: Story = {
  args: {
    columns,
    dataSource,
    pagination: false,
  },
};

export const WithBorder: Story = {
  args: {
    columns,
    dataSource,
    bordered: true,
  },
};

export const Loading: Story = {
  args: {
    columns,
    dataSource,
    loading: true,
  },
};
