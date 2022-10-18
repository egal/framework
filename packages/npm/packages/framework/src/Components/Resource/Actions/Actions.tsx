import * as React from 'react';
import { Create } from './Create';
import { Update } from './Update';
import { Delete } from './Delete';
import { Box } from 'grommet';
import { DataTable } from '../DataTable';
import { Pagination } from '../Pagination';
import { Show } from './Show';
import { Buttons } from './Buttons/Buttons';

type Props = {
  children: React.ReactNode;
};

export const Actions = ({ children }: Props) => {
  // TODO: Check children.

  return (
    <Box gap={'small'} direction={'row'} justify={'end'}>
      {children}
    </Box>
  );
};

Actions.Show = Show;
Actions.Create = Create;
Actions.Update = Update;
Actions.Delete = Delete;
Actions.Buttons = Buttons;
