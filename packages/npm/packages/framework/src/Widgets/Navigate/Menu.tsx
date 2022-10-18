import * as React from 'react';
import { Box, Nav } from 'grommet';
import { MenuItem, MenuItemConfig } from './MenuItem';

type Props = {
  items?: MenuItemConfig[];
};

export function Menu({ items }: Props) {
  return (
    <Nav responsive={false} gap="small">
      {items?.map((item, key) =>
        React.createElement(MenuItem, { ...item, key: key })
      )}
    </Nav>
  );
}
