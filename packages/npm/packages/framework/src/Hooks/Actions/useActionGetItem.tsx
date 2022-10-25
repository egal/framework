import { ActionHook, ActionModel, useAction } from './useAction';

type Params = {
  key: string | number;
  relations?: string[];
};

export type ActionGetItemHook<ItemType> = ActionHook<ItemType, Params>;

export function useActionGetItem<ItemType>(
  model: ActionModel
): ActionGetItemHook<ItemType> {
  return useAction<ItemType, Params>(model, 'getItem');
}
