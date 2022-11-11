import * as React from 'react';
import { Box } from 'grommet';
import { useResourceContext } from '../Resource';
import { useEffect } from 'react';
import { useResourceActionsContext } from './Actions';
import { DeleteSelectedButton } from './Buttons/Delete';

export function Delete() {
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
      <DeleteSelectedButton />
    </Box>
  );
}
