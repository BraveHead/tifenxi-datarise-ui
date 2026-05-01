import { Menu as AntdMenu } from 'antd';
import type { MenuProps as AntdMenuProps } from 'antd';

export type { MenuProps as AntdMenuProps } from 'antd';
export type { ItemType as MenuItemType } from 'antd/es/menu/interface';

export interface MenuProps extends AntdMenuProps {}

export const Menu = AntdMenu;

export default Menu;
