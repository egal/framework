import * as React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button } from 'grommet';

type Props = {
  header: string;
  path: string;
};

export function MenuItemLink({ header, path }: Props) {
  return (
    <Box pad="xsmall">
      <Link to={path}>
        <Button gap="xsmall" alignSelf="start" plain label={header} />
      </Link>
    </Box>
  );
}
