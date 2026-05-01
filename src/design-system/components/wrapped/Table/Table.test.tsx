import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Table } from './Table';
import type { ColumnsType } from './Table';

interface TestRecord {
  key: string;
  name: string;
  age: number;
}

const columns: ColumnsType<TestRecord> = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
];

const dataSource: TestRecord[] = [
  { key: '1', name: '张三', age: 28 },
  { key: '2', name: '李四', age: 32 },
];

describe('Table', () => {
  // ── 基础渲染 ──────────────────────────────────────────

  it('renders table with data', () => {
    render(<Table columns={columns} dataSource={dataSource} />);
    expect(screen.getByText('张三')).toBeInTheDocument();
    expect(screen.getByText('李四')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(<Table columns={columns} dataSource={dataSource} />);
    expect(screen.getByText('姓名')).toBeInTheDocument();
    expect(screen.getByText('年龄')).toBeInTheDocument();
  });

  // ── 默认空态 ──────────────────────────────────────────

  it('shows tifenxi EmptyState when dataSource is empty', () => {
    render(<Table columns={columns} dataSource={[]} />);
    expect(screen.getByText('暂无数据')).toBeInTheDocument();
  });

  // ── 类型兼容 ──────────────────────────────────────────

  it('ColumnsType generic works with custom record type', () => {
    const typedColumns: ColumnsType<TestRecord> = [
      { title: '姓名', dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
    ];
    render(<Table columns={typedColumns} dataSource={dataSource} />);
    expect(screen.getByText('张三')).toBeInTheDocument();
  });
});
