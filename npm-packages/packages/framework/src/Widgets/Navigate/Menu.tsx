import * as React from 'react';
import { Nav } from 'grommet';
import { MenuItem, MenuItemConfig } from './MenuItem';

type Props = {
  items?: MenuItemConfig[];
};

export function Menu({ items }: Props) {
  return (
    <Nav responsive={false} gap="xsmall">
      {items?.map((item, key) =>
        React.createElement(MenuItem, { ...item, key: key })
      )}
    </Nav>
  );
}
