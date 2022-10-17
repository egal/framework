import * as React from 'react';
import { Box, Button, Collapsible, Text } from 'grommet';
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
      <Button onClick={switchIsOpen}>
        <Box direction="row" justify="between">
          <Text>{header}</Text>
          <ArrowIcon />
        </Box>
      </Button>
      <Collapsible open={isOpen}>
        <Box pad={{ left: 'small', top: 'small' }} gap={'small'}>
          {items.map((item, key) =>
            React.createElement(MenuItem, { ...item, key: key })
          )}
        </Box>
      </Collapsible>
    </>
  );
}
