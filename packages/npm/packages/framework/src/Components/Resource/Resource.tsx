import * as React from 'react';
import { DataTable } from './DataTable';
import { Actions } from './Actions/Actions';
import { Box, Keyboard, Spinner } from 'grommet';
import { ResourceHook, useResource } from '../../Hooks';
import { useContext, useEffect, useState } from 'react';
import { Pagination } from './Pagination';
import { EntityManipulate, useEntityManipulate } from '../../Hooks';
import { Filters } from './Filters/Filters';
import { Extensions, useExtensions } from './useExtensions';
import type { ResourceHookConfig } from '../../Hooks';

type Model = {
  name: string;
  service: string;
};

type ContextType = {
  resource: ResourceHook<any>; // TODO: Not any.
  selectedKeys: {
    value: (string | number)[];
    set: (value: (string | number)[]) => void;
    getSelectedEntity: () => any;
    reset: () => void;
  };
  extensions: Extensions;
  manipulates: {
    showing: EntityManipulate<any>;
    creating: EntityManipulate<any>;
    updating: EntityManipulate<any>;
    filtering: {
      primary: EntityManipulate<any>;
      secondary: EntityManipulate<any>;
    };
  };
};

export const ResourceContext = React.createContext<ContextType | undefined>(
  undefined
);

export function useResourceContext(): ContextType {
  const context = useContext(ResourceContext);

  if (context === undefined)
    throw new Error('Element must be used in Resource context!');

  return context;
}

type Props = {
  model: Model;
  config?: ResourceHookConfig;
  children: React.ReactNode;
};

export function Resource<ItemType>({ children, model, config }: Props) {
  // TODO: Get items init params.
  // Like useResource<ItemType>(model, {gitItems: { intiParams: {...} }})
  // Intuit params stores in as prop of Resource { config: {...} }.
  const resource = useResource<ItemType>(model, config);

  type SelectedKey = string | number;
  type SelectedKeys = SelectedKey[];
  const selectedKeysInitState: SelectedKeys = [];
  const [selectedKeys, setSelectedKeys] = useState<SelectedKeys>(
    selectedKeysInitState
  );
  const resetSelectedKeys = () => setSelectedKeys(selectedKeysInitState);

  const getSelectedEntity = (): ItemType => {
    if (!resource.getItems.result) throw new Error();
    if (selectedKeys.length > 1) throw new Error();

    const entity = resource.getItems.result.items.find((item) => {
      if (!resource.metadata.result) throw new Error();
      return (
        item[resource.metadata.result.primary_key.name] === selectedKeys[0]
      );
    });

    if (entity === undefined) throw new Error();

    return entity;
  };

  const extensions = useExtensions();

  const showing = useEntityManipulate();
  const creating = useEntityManipulate();
  const updating = useEntityManipulate();
  const primary = useEntityManipulate();
  const secondary = useEntityManipulate();

  React.Children.map(children, (child) => {
    // TODO: Check extensions is valid.
    if (!React.isValidElement(child)) return;
  });

  useEffect(() => {
    if (extensions.ready) resource.getItems.call();
  }, [extensions.ready]);

  useEffect(() => {
    resource.getItems.call();
  }, [resource.getItems.params]);

  const contextValue = {
    resource,
    selectedKeys: {
      value: selectedKeys,
      set: setSelectedKeys,
      getSelectedEntity,
      reset: resetSelectedKeys,
    },
    extensions,
    manipulates: {
      showing,
      creating,
      updating,
      filtering: {
        primary,
        secondary,
      },
    },
  };

  return (
    <ResourceContext.Provider value={contextValue}>
      <Keyboard onEsc={() => setSelectedKeys([])}>
        <Box fill gap={'small'} justify={'between'} pad={'small'}>
          {children}
        </Box>
      </Keyboard>
    </ResourceContext.Provider>
  );
}

Resource.DataTable = DataTable;
Resource.Actions = Actions;
Resource.Pagination = Pagination;
Resource.Filters = Filters;
