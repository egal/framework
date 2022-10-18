import * as React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Text } from 'grommet';

type Props = {
  header: string;
  path: string;
};

export function MenuItemLink({ header, path }: Props) {
  const location = useLocation();

  const navigate = useNavigate();

  return (
    <Box onClick={() => navigate(path)} focusIndicator={false}>
      <Text color={path === location.pathname ? 'brand' : undefined}>
        {header}
      </Text>
    </Box>
  );
}
