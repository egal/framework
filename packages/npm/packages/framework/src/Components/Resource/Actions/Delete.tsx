import * as React from 'react';
import { Box } from 'grommet';
import { useResourceContext } from '../Resource';
import { useEffect } from 'react';
import { useResourceActionsContext } from './Actions';
import {
  DeleteSelectedButton,
  DeleteSelectedButtonProps,
} from './Buttons/Delete';

type Props = {
  button?: DeleteSelectedButtonProps;
};

export function Delete({ button }: Props) {
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
      <DeleteSelectedButton {...button} />
    </Box>
  );
}
