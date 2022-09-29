import { useEffect, useState } from 'react';

import axios, { AxiosError } from 'axios';
import { deepMerge } from 'grommet/utils';
import { ActionResultPromise } from '../DataProvider';
import { ServerFieldMetadata, ServerModelMetadata } from '../Metadata';

// type ActionGetItemsResult<EntityType = any> = {
//   current_page: number;
//   total_count: number;
//   per_page: number;
//   items: EntityType[];
// };
//
// type ActionErrorCode = 'ERR_UNDEFINED' | 'ERR_NETWORK' | string;
//
// type ActionError = {
//   message: string;
//   code: ActionErrorCode;
// };

// type ActionGetItemsFilterParam = any;
//
// export type ActionGetItemsParams = {
//   pagination?: {
//     per_page: number;
//     page: number;
//   };
//   filter?: ActionGetItemsFilterParam; // TODO: Normalize.
// };

// type ActionResultPromise<T, F = any> = {
//   catch<TResult = never>(
//     onrejected?:
//       | ((reason: F) => TResult | PromiseLike<TResult>)
//       | undefined
//       | null
//   ): Promise<T | TResult>;
// } & Promise<T>;

// type ActionGetItemsPromise = ActionResultPromise<
//   ActionGetItemsResult,
//   ActionError
// >;
// type ActionGetModelMetadataPromise = ActionResultPromise<
//   ModelMetadata,
//   ActionError
// >;

function getFromActionNameHTTPMethod(actionName: string): string {
  switch (actionName) {
    default:
      return 'post';
  }
}

export function useAction<ResultType = any, ErrorType = any, ParamsType = any>(
  serverUrl: string,
  serviceName: string,
  modelName: string,
  actionName: string,
  params: ParamsType
): ActionResultPromise<ResultType, ErrorType> {
  return new Promise((resolve, reject) => {
    axios
      .request({
        method: getFromActionNameHTTPMethod(actionName),
        url: `${serverUrl}/${serviceName}/${modelName}/${actionName}`,
        data: params,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        resolve(res.data.action_result.data);
      })
      .catch((caughtError: AxiosError) => {
        const respectableError: any = {}; // TODO: ErrorType

        if (caughtError.code === undefined) {
          respectableError.code = 'ERR_UNDEFINED';
          respectableError.message = 'Undefined Error';
        } else if (caughtError.code === 'ERR_NETWORK') {
          respectableError.code = caughtError.code;
          respectableError.message = caughtError.message;
        } else {
          throw new Error('Unsupported type of axios error!');
        }

        reject(respectableError);
      });
  });
}

export function useResource<
  GetResultType = any,
  ErrorType = any,
  GetParamsType = any
>(
  serviceName: string,
  modelName: string,
  initGetParams: GetParamsType | any = {},
  getActionName: string | 'getItems' | 'getItem' = 'getItems'
) {
  const serverUrl: string = 'http://localhost:8080';
  const [getResult, setGetResult] = useState<GetResultType>();
  const [error, setError] = useState<ErrorType>();
  const [getParams, setGetParams] = useState<GetParamsType>(initGetParams);

  const constructGetParams = (
    newParams?: GetParamsType,
    paramsUpdateMethod: 'set' | 'merge' | 'deepMerge' = 'set'
  ): GetParamsType => {
    if (newParams === undefined) {
      return getParams;
    }

    switch (paramsUpdateMethod) {
      case 'set':
        return newParams;
      case 'merge':
        return { ...getParams, ...newParams };
      case 'deepMerge':
        return deepMerge<any, any>(getParams, newParams);
    }
  };

  const action = (getActionName: any, params: any) =>
    useAction(serverUrl, serviceName, modelName, getActionName, params).catch(
      (error: ErrorType) => setError(error)
    );

  const actionGet = (
    newParams?: GetParamsType,
    paramsUpdateMethod: 'set' | 'merge' | 'deepMerge' = 'set'
  ) => {
    const readyParams = constructGetParams(newParams, paramsUpdateMethod);

    setGetParams(readyParams);

    return action(getActionName, readyParams).then((result: GetResultType) =>
      setGetResult(result)
    );
  };

  const actionCreate = (entity: any) => {
    return action('create', { attributes: entity }).then(() => actionGet());
  };

  const actionUpdate = (key: string | number, entity: any) => {
    return action('update', { key: key, attributes: entity }).then(() =>
      actionGet()
    );
  };

  const actionDelete = (key: string | number) => {
    return action('delete', { key: key }).then(() => actionGet());
  };

  const [metadata, setMetadata] = useState<ServerModelMetadata>();

  const actionGetMetadata = () => {
    return action('getMetadata', null).then((res) => {
      setMetadata(res);
    });
  };

  const fieldMetadata = (name: string): ServerFieldMetadata => {
    if (metadata === undefined) {
      throw new Error();
    }

    const result: ServerFieldMetadata = [
      metadata.primary_key,
      ...metadata.fields,
      ...metadata.fake_fields,
    ].find((field: ServerFieldMetadata): boolean => field.name === name);

    if (result === undefined) {
      throw new Error('Field not found!');
    }

    return result;
  };

  useEffect(() => {
    actionGetMetadata();
    actionGet();
  }, []);

  return [
    getResult,
    getParams,
    error,
    actionGet,
    actionCreate,
    actionUpdate,
    actionDelete,
    actionGetMetadata,
    metadata,
    fieldMetadata,
  ];
}
