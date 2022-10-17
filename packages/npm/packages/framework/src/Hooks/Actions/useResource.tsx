import { ActionModel } from './useAction';
import {
  ActionGetItemsHook,
  Params,
  useActionGetItems,
} from './useActionGetItems';
import { ActionCreateHook, useActionCreate } from './useActionCreate';
import { ActionUpdateHook, useActionUpdate } from './useActionUpdate';
import {
  ActionGetMetadataHook,
  useActionGetMetadata,
} from './useActionGetMetadata';
import { ActionDeleteHook, useActionDelete } from './useActionDelete';

export type ResourceHook<ItemType> = {
  metadata: ActionGetMetadataHook;
  getItems: ActionGetItemsHook<ItemType>;
  create: ActionCreateHook<ItemType>;
  update: ActionUpdateHook<ItemType>;
  delete: ActionDeleteHook;
};

export interface ActionConfig {
  getItems?: {
    initParams?: Params;
  };
}

export function useResource<ItemType>(
  model: ActionModel,
  config?: ActionConfig
): ResourceHook<ItemType> {
  return {
    metadata: useActionGetMetadata(model),
    getItems: useActionGetItems<ItemType>(
      model,
      config?.getItems?.initParams ?? {}
    ),
    create: useActionCreate<ItemType>(model),
    update: useActionUpdate<ItemType>(model),
    delete: useActionDelete(model),
  };
}
