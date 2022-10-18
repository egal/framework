import { ActionHook, ActionModel, useAction } from './useAction';

type Result = {
  //
};

type Params = {
  key: string | number;
};

export type ActionDeleteHook = ActionHook<Result, Params>;

export function useActionDelete(model: ActionModel): ActionDeleteHook {
  return useAction<Result, Params>(model, 'delete');
}
