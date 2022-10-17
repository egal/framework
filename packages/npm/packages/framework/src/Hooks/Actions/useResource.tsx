import { ActionModel } from './useAction';
import {
  ActionGetItemsHook,
  ActionGetItemsParams,
  useActionGetItems,
} from './useActionGetItems';
import { ActionCreateHook, useActionCreate } from './useActionCreate';
import { ActionUpdateHook, useActionUpdate } from './useActionUpdate';
import {
  ActionGetMetadataHook,
  useActionGetMetadata,
} from './useActionGetMetadata';
import { ActionDeleteHook, useActionDelete } from './useActionDelete';
import { deepMerge } from 'grommet/utils';
import { RecursivePartial } from '../../Utils';

export type ResourceHook<ItemType> = {
  metadata: ActionGetMetadataHook;
  getItems: ActionGetItemsHook<ItemType>;
  create: ActionCreateHook<ItemType>;
  update: ActionUpdateHook<ItemType>;
  delete: ActionDeleteHook;
};

export interface ResourceHookConfig {
  actionGetItems: {
    initParams: ActionGetItemsParams;
  };
}

export function useResource<ItemType>(
  model: ActionModel,
  config: RecursivePartial<ResourceHookConfig> = {}
): ResourceHook<ItemType> {
  const defaultConfig: ResourceHookConfig = {
    actionGetItems: {
      initParams: {},
    },
  };

  const mergedConfig = deepMerge(defaultConfig, config);

  return {
    metadata: useActionGetMetadata(model),
    getItems: useActionGetItems<ItemType>(
      model,
      mergedConfig.actionGetItems.initParams
    ),
    create: useActionCreate<ItemType>(model),
    update: useActionUpdate<ItemType>(model),
    delete: useActionDelete(model),
  };
}
