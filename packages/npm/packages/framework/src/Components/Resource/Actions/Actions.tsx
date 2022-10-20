import * as React from 'react';
import { Create } from './Create';
import { Update } from './Update';
import { Delete } from './Delete';
import { Box, Form } from 'grommet';
import { DataTable } from '../DataTable';
import { Pagination } from '../Pagination';
import { Show } from './Show';
import { Buttons } from './Buttons/Buttons';
import { EntityManipulate, ResourceHook } from '../../../Hooks';
import { Extensions } from '../useExtensions';
import { useContext } from 'react';
import { FullLayerModal } from '../FullLayerModal';
import { useResourceContext } from '../Resource';

type ContextType = {};

export const ResourceActionsContext = React.createContext<
  ContextType | undefined
>(undefined);

export function useResourceActionsContext(): ContextType {
  const context = useContext(ResourceActionsContext);

  if (context === undefined)
    throw new Error('Element must be used in Resource.Actions context!');

  return context;
}

type Props = {
  children: React.ReactNode;
};

export const Actions = ({ children }: Props) => {
  const {
    manipulates: { showing, creating, updating },
  } = useResourceContext();
  // TODO: Check children.

  return (
    <>
      <ResourceActionsContext.Provider value={{}}>
        <Box gap={'small'} direction={'row'} justify={'end'}>
          {children}
        </Box>
      </ResourceActionsContext.Provider>
    </>
  );
};

Actions.Show = Show;
Actions.Create = Create;
Actions.Update = Update;
Actions.Delete = Delete;
// Actions.Buttons = Buttons;
