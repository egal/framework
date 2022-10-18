import { ActionHook, ActionError, ActionModel, useAction } from './useAction';
import { deepMerge } from 'grommet/utils';
import { useState } from 'react';
import { PromiseWithReject, RecursivePartial } from '../../Utils';

type Result<ItemType> = {
  current_page: number;
  total_count: number;
  per_page: number;
  items: ItemType[];
};

export type ActionGetItemsParams = {
  pagination?: {
    per_page?: number;
    page?: number;
  };
  relations?: string[];
  filter?: any; // TODO: Normalize.
};

export type ActionGetItemsHook<ItemType> = Omit<
  ActionHook<Result<ItemType>, ActionGetItemsParams>,
  'call'
> & {
  call: () => PromiseWithReject<Result<ItemType>, ActionError>;
  params: ActionGetItemsParams;
  setParams: (value: ActionGetItemsParams) => void;
  mergeParams: (value: Partial<ActionGetItemsParams>) => void;
  deepMergeParams: (value: RecursivePartial<ActionGetItemsParams>) => void;
};

export function useActionGetItems<ItemType>(
  model: ActionModel,
  initParams: ActionGetItemsParams
): ActionGetItemsHook<ItemType> {
  const {
    result,
    error,
    call: baseCall,
  } = useAction<Result<ItemType>, ActionGetItemsParams>(model, 'getItems');

  const [params, setParams] = useState<ActionGetItemsParams>(initParams);

  const call = () => baseCall(params);

  const mergeParams = (value: Partial<ActionGetItemsParams>) => {
    setParams({ ...params, ...value });
  };

  const deepMergeParams = (value: RecursivePartial<ActionGetItemsParams>) => {
    setParams(deepMerge(params as any, value as any)); // TODO: Remove any.
  };

  return {
    result,
    error,
    call,
    params,
    setParams,
    mergeParams,
    deepMergeParams,
  };
}
