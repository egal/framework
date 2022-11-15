import * as React from 'react';
import { Create } from './Create';
import { Update } from './Update';
import { Delete } from './Delete';
import { Box } from 'grommet';
import { Show } from './Show';
import { useContext } from 'react';
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
  children?: React.ReactNode;
};

export const Actions = ({ children }: Props) => {
  useResourceContext();

  // TODO: Check children.

  return (
    <>
      <ResourceActionsContext.Provider value={{}}>
        <Box gap={'small'} direction={'row'} justify={'end'}>
          {children ?? <Create />}
          {children ?? <Show />}
          {children ?? <Update />}
          {children ?? <Delete />}
        </Box>
      </ResourceActionsContext.Provider>
    </>
  );
};

Actions.Show = Show;
Actions.Create = Create;
Actions.Update = Update;
Actions.Delete = Delete;
