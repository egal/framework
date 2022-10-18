import { ActionHook, ActionModel, useAction } from './useAction';

type Result<ItemType> = {
  current_page: number;
  total_count: number;
  per_page: number;
  items: ItemType[];
};

type Params<ItemType> = {
  key: number | string;
  attributes: ItemType; // TODO: Not undefinable.
};

export type ActionUpdateHook<ItemType> = ActionHook<Result<ItemType>, Params<ItemType>>;

export function useActionUpdate<ItemType>(
  model: ActionModel
): ActionUpdateHook<ItemType> {
  return useAction<Result<ItemType>, Params<ItemType>>(model, 'update');
}
