import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { PromiseWithReject } from '../../Utils';
import { useAppContext } from '../../Components';

export type ActionModel = {
  name: string;
  service: string;
};

export type ActionErrorCode = 'ERR_UNDEFINED' | 'ERR_NETWORK' | string;
export type ActionError = {
  message: string;
  code: ActionErrorCode;
};

export type ActionHook<ResultType, ParamsType> = {
  result?: ResultType;
  error?: ActionError;
  call: (params: ParamsType) => PromiseWithReject<ResultType, ActionError>;
};

export function useAction<ResultType, ParamsType>(
  model: ActionModel,
  name: string
): ActionHook<ResultType, ParamsType> {
  const [result, setResult] = useState<ResultType>();
  const [error, setError] = useState<ActionError>();

  const {
    config: {
      actions: { apiURL },
    },
  } = useAppContext();

  const call = (
    params: ParamsType
  ): PromiseWithReject<ResultType, ActionError> => {
    return new Promise((resolve, reject) => {
      axios
        .request({
          method: 'POST',
          url: `${apiURL}/${model.service}/${model.name}/${name}`,
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
