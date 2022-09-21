import axios, { AxiosError } from 'axios';
import { Model as ModelMetadata } from '../Utils/Metadata';

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
    per_page: number;
    page: number;
  };
};

export type ActionResultPromise<T, F = any> = {
  catch<TResult = never>(
    onrejected?: ((reason: F) => TResult | PromiseLike<TResult>) | undefined | null
  ): Promise<T | TResult>;
} & Promise<T>;

export type ActionGetModelMetadataPromise = ActionResultPromise<ModelMetadata, ActionError>;
export type ActionGetItemsPromise = ActionResultPromise<ActionGetItemsResult, ActionError>;
export type ActionUpdatePromise = ActionResultPromise<ActionUpdateResult, ActionError>;
export type ActionCreatePromise = ActionResultPromise<ActionCreateResult, ActionError>;
export type ActionDeletePromise = ActionResultPromise<ActionDeleteResult, ActionError>;

export class DataProvider {
  serverUrl: string = 'http://localhost:8080';
  modelName!: string;
  serviceName!: string;

  constructor(serviceName: string, modelName: string) {
    this.serviceName = serviceName;
    this.modelName = modelName;
  }

  // TODO: Base axios query.
  getItems(params: ActionGetItemsParams): ActionGetItemsPromise {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.serverUrl}/${this.serviceName}/${this.modelName}/getItems`, params)
        .then((res) => resolve(res.data.action_result.data))
        .catch((error: AxiosError) => {
          if (error.code === undefined) {
            reject({
              code: 'ERR_UNDEFINED',
              message: 'Undefined Error'
            } as ActionError);
          } else if (error.code === 'ERR_NETWORK') {
            reject({
              code: error.code,
              message: error.message
            } as ActionError);
          } else {
            throw new Error('Unsupported type of error');
          }
        });
    });
  }

  update(attributes: any): ActionUpdatePromise {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.serverUrl}/${this.serviceName}/${this.modelName}/update`, { attributes: attributes })
        .then((res) => resolve(res.data.action_result.data));
    });
  }

  create(attributes: any): ActionCreatePromise {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.serverUrl}/${this.serviceName}/${this.modelName}/create`, { attributes: attributes })
        .then((res) => resolve(res.data.action_result.data));
    });
  }

  delete(key: any): ActionDeletePromise {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.serverUrl}/${this.serviceName}/${this.modelName}/delete`, { id: key })
        .then((res) => resolve(res.data.action_result.data));
    });
  }

  getModelMetadata(): ActionGetModelMetadataPromise {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.serverUrl}/${this.serviceName}/${this.modelName}/getMetadata`)
        .then((res) => resolve(res.data.action_result.data));
    });
  }
}
