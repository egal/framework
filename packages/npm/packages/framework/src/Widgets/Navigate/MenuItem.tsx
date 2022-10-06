import * as React from 'react';
import { MenuItemGroup } from './MenuItemGroup';
import { MenuItemLink } from './MenuItemLink';

export type MenuItemConfig = {
  header?: string;
  path?: string;
  items?: MenuItemConfig[];
  render?: React.ReactElement;
  element?: any;
};

export function MenuItem({ path, header, items, render }: MenuItemConfig) {
  if (render !== undefined) {
    return render;
  } else if (items !== undefined && header !== undefined) {
    return <MenuItemGroup header={header} items={items} />;
  } else if (path !== undefined && header !== undefined) {
    return <MenuItemLink path={path} header={header} />;
  } else {
    throw new Error('Unsupported menu item!');
  }
}
