import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { PromiseWithReject } from '../../Utils';
import { useAppContext } from '../../Components';

export type ActionModel = {
  name: string;
  service: string;
};

export type ActionErrorCode = 'ERR_UNDEFINED' | 'ERR_NETWORK' | string | number;
type DefaultActionErrorDataType = null;
export type ActionError<DataType = DefaultActionErrorDataType> = {
  code: ActionErrorCode;
  internal_code: string | number | null;
  message: string;
  data: DataType | null;
};

export type ActionHook<
  ResultType,
  ParamsType,
  ErrorDataType = DefaultActionErrorDataType
> = {
  result?: ResultType;
  error?: ActionError<ErrorDataType>;
  call: (
    params: ParamsType
  ) => PromiseWithReject<ResultType, ActionError<ErrorDataType>>;
};

export function useAction<
  ResultType,
  ParamsType,
  ErrorDataType = DefaultActionErrorDataType
>(
  model: ActionModel,
  name: string
): ActionHook<ResultType, ParamsType, ErrorDataType> {
  const [result, setResult] = useState<ResultType>();
  const [error, setError] = useState<ActionError<ErrorDataType>>();

  const {
    config: {
      actions: { apiURL },
    },
  } = useAppContext();

  const call = (
    params: ParamsType
  ): PromiseWithReject<ResultType, ActionError<ErrorDataType>> => {
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
          const respectableError: ActionError<ErrorDataType> =
            // @ts-ignore
            caughtError.response?.data?.action_error ?? {};

          delete respectableError['type'];
          delete respectableError['uuid'];

          if (!respectableError.code || respectableError.code === 0) {
            if (caughtError.code && caughtError.message) {
              respectableError.code = caughtError.code;
              respectableError.internal_code = null;
              respectableError.message = caughtError.message;
              respectableError.data = null;
            } else {
              respectableError.code = 'ERR_UNDEFINED';
              respectableError.internal_code = null;
              respectableError.message = 'Undefined Error!';
              respectableError.data = null;
            }
          }

          setError(respectableError);
          reject(respectableError);
        });
    });
  };

  return { result, error, call };
}
