import * as React from 'react';
import { DataTable } from './DataTable';
import { Actions } from './Actions/Actions';
import { Box, Keyboard } from 'grommet';
import { ResourceHook, useResource } from '../../Hooks';
import { useContext, useEffect, useState } from 'react';
import { Pagination } from './Pagination';
import { EntityManipulate, useEntityManipulate } from '../../Hooks';
import { Filters } from './Filters/Filters';
import { Extensions, useExtensions } from './useExtensions';
import type { ResourceHookConfig } from '../../Hooks';
import { RecursivePartial } from '../../Utils';

type Model = {
  name: string;
  service: string;
};

type ContextType<ItemType> = {
  resource: ResourceHook<ItemType>;
  selectedKeys: {
    value: (string | number)[];
    set: (value: (string | number)[]) => void;
    getSelectedEntity: () => ItemType;
    reset: () => void;
  };
  extensions: Extensions;
  manipulates: {
    showing: EntityManipulate<ItemType>;
    creating: EntityManipulate<ItemType>;
    updating: EntityManipulate<ItemType>;
    filtering: {
      primary: EntityManipulate<any>; // TODO: Not any.
      secondary: EntityManipulate<any>; // TODO: Not any.
    };
  };
};

// TODO: Not any.
export const ResourceContext = React.createContext<
  ContextType<any> | undefined
>(undefined);

export function useResourceContext(): ContextType<any> {
  const context = useContext(ResourceContext);

  if (context === undefined)
    throw new Error('Element must be used in Resource context!');

  return context;
}

type Props = {
  model: Model;
  children: React.ReactNode;
} & RecursivePartial<ResourceHookConfig>;

// TODO: Save filter params in GET params of Browser URL.
export function Resource<ItemType>({ children, model, ...config }: Props) {
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
    if (extensions.ready) {
      resource.getItems.call();
      resetSelectedKeys();
    }
  }, [extensions.ready, resource.getItems.params]);

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
