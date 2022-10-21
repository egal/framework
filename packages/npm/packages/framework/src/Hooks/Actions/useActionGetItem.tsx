import { ActionHook, ActionModel, useAction } from './useAction';

type Result<ItemType> = {
  data: ItemType;
};

type Params = {
  key: string | number;
  relations?: string[];
};

export type ActionGetItemHook<ItemType> = ActionHook<Result<ItemType>, Params>;

export function useActionGetItem<ItemType>(
  model: ActionModel
): ActionGetItemHook<ItemType> {
  return useAction<Result<ItemType>, Params>(model, 'getItem');
}
