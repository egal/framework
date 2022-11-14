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

type FilterCombiner = 'AND' | 'OR';

type FilterOperator =
  | 'eq'
  | 'eqi'
  | 'ne'
  | 'nei'
  | 'gt'
  | 'ge'
  | 'lt'
  | 'le'
  | 'co'
  | 'coi'
  | 'nc'
  | 'nci'
  | 'sw'
  | 'swi'
  | 'ew'
  | 'ewi'
  | string;

type FilterValue = string | number | boolean | bigint;

type FilterField = string;

type FilterCondition = [FilterField, FilterOperator, FilterValue];

type Filter = {
  [index: number]: FilterCombiner | FilterCondition | Filter; // TODO: Strict sequence.
};

type OrderCondition = {
  column: string;
  direction: 'asc' | 'desc';
};

type Order = OrderCondition[];

type Pagination = {
  per_page?: number;
  page?: number;
};

type Relations = string[];

export type ActionGetItemsParams = {
  pagination?: Pagination;
  relations?: Relations;
  filter?: Filter;
  order?: Order;
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
