import * as React from 'react';
import { Box, Button, Collapsible } from 'grommet';
import { useState } from 'react';
import { FormDown, FormNext } from 'grommet-icons';
import { MenuItemConfig } from './index';
import { MenuItem } from './MenuItem';

type Props = {
  header: string;
  items: MenuItemConfig[];
};

export function MenuItemGroup({ header, items }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const switchIsOpen = () => setIsOpen(!isOpen);

  const ArrowIcon = isOpen ? FormDown : FormNext;

  return (
    <>
      <Box pad="xsmall">
        <Button onClick={switchIsOpen}>
          <Box direction="row" justify="between">
            <div>{header}</div>
            <ArrowIcon />
          </Box>
        </Button>
      </Box>
      <Collapsible open={isOpen}>
        <Box margin={{ left: 'small' }}>
          {items.map((item, key) =>
            React.createElement(MenuItem, { ...item, key: key })
          )}
        </Box>
      </Collapsible>
    </>
  );
}
