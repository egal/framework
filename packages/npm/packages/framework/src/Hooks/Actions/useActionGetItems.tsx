import {
  ActionHook,
  ActionError,
  ActionResultPromise,
  ActionModel,
  RecursivePartial,
  useAction,
} from './useAction';
import { deepMerge } from 'grommet/utils';
import { useState } from 'react';

type Result<ItemType> = {
  current_page: number;
  total_count: number;
  per_page: number;
  items: ItemType[];
};

type Params = {
  pagination?: {
    per_page?: number;
    page?: number;
  };
  filter?: any; // TODO: Normalize.
};

export type ActionGetItemsHook<ItemType> = Omit<
  ActionHook<Result<ItemType>, Params>,
  'call'
> & {
  call: () => ActionResultPromise<Result<ItemType>, ActionError>;
  params: Params;
  setParams: (value: Params) => void;
  mergeParams: (value: Partial<Params>) => void;
  deepMergeParams: (value: RecursivePartial<Params>) => void;
};

export function useActionGetItems<ItemType>(
  model: ActionModel,
  initParams: Params
): ActionGetItemsHook<ItemType> {
  const {
    result,
    error,
    call: baseCall,
  } = useAction<Result<ItemType>, Params>(model, 'getItems');

  const [params, setParams] = useState<Params>(initParams);

  const call = () => baseCall(params);

  const mergeParams = (value: Partial<Params>) => {
    setParams({ ...params, ...value });
  };

  const deepMergeParams = (value: RecursivePartial<Params>) => {
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
