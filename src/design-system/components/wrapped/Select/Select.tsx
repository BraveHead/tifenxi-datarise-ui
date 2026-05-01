import React from 'react';
import { Select as AntdSelect } from 'antd';
import type { RefSelectProps, SelectProps as AntdSelectProps } from 'antd';
import { EmptyState } from '../../common/EmptyState/EmptyState';

export interface SelectProps extends AntdSelectProps {
}

const defaultNotFoundContent = <EmptyState variant="compact" message="无匹配数据" />;

export const Select = React.forwardRef<RefSelectProps, SelectProps>(
  function Select({ notFoundContent, ...rest }, ref) {
    return (
      <AntdSelect
        ref={ref}
        notFoundContent={notFoundContent ?? defaultNotFoundContent}
        {...rest}
      />
    );
  },
);

export default Select;
