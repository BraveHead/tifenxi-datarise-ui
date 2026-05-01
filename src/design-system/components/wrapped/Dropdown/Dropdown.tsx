import React from 'react';
import { Dropdown as AntdDropdown } from 'antd';
import type { DropdownProps as AntdDropdownProps } from 'antd';

export type { MenuProps } from 'antd';
export type { ItemType as MenuItemType } from 'antd/es/menu/interface';

export interface DropdownProps extends AntdDropdownProps {
  children: React.ReactNode;
}

export function Dropdown({ children, dropdownRender, popupRender, ...rest }: DropdownProps) {
  return (
    <AntdDropdown
      popupRender={popupRender ?? dropdownRender}
      {...rest}
    >
      {children}
    </AntdDropdown>
  );
}

export default Dropdown;
