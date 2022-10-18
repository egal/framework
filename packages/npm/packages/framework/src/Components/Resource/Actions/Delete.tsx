import * as React from 'react';
import { Buttons } from './Buttons/Buttons';
import { Box } from 'grommet';
import { useResourceContext } from '../Resource';
import { useEffect } from 'react';

type Props = {};

export function Delete(props: Props) {
  const {
    extensions: { deleting },
  } = useResourceContext();

  useEffect(() => {
    deleting.makeExists();
    deleting.makeReady();
  }, []);

  return (
    <Box>
      <Buttons.DeleteSelected />
    </Box>
  );
}
