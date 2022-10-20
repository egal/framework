import * as React from 'react';
import { Buttons } from './Buttons/Buttons';
import { Box } from 'grommet';
import { useResourceContext } from '../Resource';
import { useEffect } from 'react';
import { useResourceActionsContext } from './Actions';

type Props = {};

export function Delete(props: Props) {
  const {
    extensions: { deleting },
  } = useResourceContext();

  useResourceActionsContext();

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
