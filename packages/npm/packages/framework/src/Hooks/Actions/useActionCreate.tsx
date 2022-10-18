import { ActionHook, ActionModel, useAction } from './useAction';

type Result<ItemType> = {
  current_page: number;
  total_count: number;
  per_page: number;
  items: ItemType[];
};

type Params<ItemType> = {
  attributes?: ItemType; // TODO: Not undefinable.
};

export type ActionCreateHook<ItemType> = ActionHook<Result<ItemType>, Params<ItemType>>;

export function useActionCreate<ItemType>(
  model: ActionModel
): ActionCreateHook<ItemType> {
  return useAction<Result<ItemType>, Params<ItemType>>(model, 'create');
}
