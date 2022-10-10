import { ServerModelMetadata as ModelMetadata } from '../Metadata';

export type ActionGetItemsResult = {
  current_page: number;
  total_count: number;
  per_page: number;
  items: any[];
};

export type ActionUpdateResult = any; // TODO: Make normal type.
export type ActionDeleteResult = any; // TODO: Make normal type.
export type ActionCreateResult = any; // TODO: Make normal type.

export type ActionErrorCode = 'ERR_UNDEFINED' | 'ERR_NETWORK' | string;

export type ActionError = {
  message: string;
  code: ActionErrorCode;
};

export type ActionGetItemsParams = {
  pagination?: {
    per_page?: number;
    page?: number;
  };
  filter?: any; // TODO: Normalize.
};

export type ActionResultPromise<T, F = any> = {
  catch<TResult = never>(
    onrejected?:
      | ((reason: F) => TResult | PromiseLike<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
} & Promise<T>;

export type ActionGetModelMetadataPromise = ActionResultPromise<
  ModelMetadata,
  ActionError
>;
export type ActionGetItemsPromise = ActionResultPromise<
  ActionGetItemsResult,
  ActionError
>;
export type ActionUpdatePromise = ActionResultPromise<
  ActionUpdateResult,
  ActionError
>;
export type ActionCreatePromise = ActionResultPromise<
  ActionCreateResult,
  ActionError
>;
export type ActionDeletePromise = ActionResultPromise<
  ActionDeleteResult,
  ActionError
>;
