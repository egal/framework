import { ActionModel } from './useAction';
import { ActionGetItemsHook, useActionGetItems } from './useActionGetItems';
import { ActionCreateHook, useActionCreate } from './useActionCreate';
import { ActionUpdateHook, useActionUpdate } from './useActionUpdate';
import {
  ActionGetMetadataHook,
  useActionGetMetadata,
} from './useActionGetMetadata';
import { ActionDeleteHook, useActionDelete } from './useActionDelete';
import { useEffect, useState } from 'react';

export type ResourceHook<ItemType> = {
  metadata: ActionGetMetadataHook;
  getItems: ActionGetItemsHook<ItemType>;
  create: ActionCreateHook<ItemType>;
  update: ActionUpdateHook<ItemType>;
  delete: ActionDeleteHook;
};

export function useResource<ItemType>(
  model: ActionModel
): ResourceHook<ItemType> {
  return {
    metadata: useActionGetMetadata(model),
    getItems: useActionGetItems<ItemType>(model, {}),
    create: useActionCreate<ItemType>(model),
    update: useActionUpdate<ItemType>(model),
    delete: useActionDelete(model),
  };
}
