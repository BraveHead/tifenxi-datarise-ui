import React from 'react';
import { Table as AntdTable } from 'antd';
import type { TableProps as AntdTableProps, TablePaginationConfig } from 'antd';
import { EmptyState } from '../../common/EmptyState/EmptyState';

export type { TablePaginationConfig };
export type { ColumnsType } from 'antd/es/table';

export interface TableProps<T = any> extends AntdTableProps<T> {}

const defaultLocale = {
  emptyText: <EmptyState variant="compact" message="暂无数据" />,
};

export function Table<T extends Record<string, any>>(props: TableProps<T>) {
  const { locale, size = 'middle', ...rest } = props;

  return (
    <AntdTable<T>
      size={size}
      locale={{ ...defaultLocale, ...locale }}
      {...rest}
    />
  );
}

export default Table;
