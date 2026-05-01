import React from 'react';
import { Popover as AntdPopover } from 'antd';
import type { PopoverProps as AntdPopoverProps } from 'antd';

export interface PopoverProps extends AntdPopoverProps {
  children: React.ReactElement;
}

export function Popover({ children, ...rest }: PopoverProps) {
  return (
    <AntdPopover {...rest}>
      {children}
    </AntdPopover>
  );
}

export default Popover;
