import axios, { AxiosError } from 'axios';
import { useState } from 'react';

export type ActionModel = {
  name: string;
  service: string;
};

export type ActionErrorCode = 'ERR_UNDEFINED' | 'ERR_NETWORK' | string;
export type ActionError = {
  message: string;
  code: ActionErrorCode;
};

export type ActionResultPromise<T, F = any> = {
  catch<TResult = never>(
    onrejected?:
      | ((reason: F) => TResult | PromiseLike<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
} & Promise<T>;

export type ActionHook<ResultType, ParamsType> = {
  result?: ResultType;
  error?: ActionError;
  call: (params: ParamsType) => ActionResultPromise<ResultType, ActionError>;
};

export function useAction<ResultType, ParamsType>(
  model: ActionModel,
  name: string
): ActionHook<ResultType, ParamsType> {
  const [result, setResult] = useState<ResultType>();
  const [error, setError] = useState<ActionError>();

  const call = (
    params: ParamsType
  ): ActionResultPromise<ResultType, ActionError> => {
    return new Promise((resolve, reject) => {
      axios
        .request({
          method: 'POST',
          url: `http://localhost:8080/${model.service}/${model.name}/${name}`,
          data: params,
          headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => {
          setResult(res.data.action_result.data);
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

          setError(respectableError);
          reject(respectableError);
        });
    });
  };

  return { result, error, call };
}
