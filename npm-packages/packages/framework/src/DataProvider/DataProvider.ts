import axios, { AxiosError } from 'axios';
import {
  ActionCreatePromise,
  ActionDeletePromise,
  ActionError,
  ActionGetItemsParams,
  ActionGetItemsPromise,
  ActionGetModelMetadataPromise,
  ActionUpdatePromise,
} from './Types';

export class DataProvider {
  serverUrl: string = 'http://localhost:8080'; // TODO: From env variable.
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
        .post(
          `${this.serverUrl}/${this.serviceName}/${this.modelName}/getItems`,
          params,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((res) => resolve(res.data.action_result.data))
        .catch((error: AxiosError) => {
          if (error.code === undefined) {
            reject({
              code: 'ERR_UNDEFINED',
              message: 'Undefined Error',
            } as ActionError);
          } else if (error.code === 'ERR_NETWORK') {
            reject({
              code: error.code,
              message: error.message,
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
        .post(
          `${this.serverUrl}/${this.serviceName}/${this.modelName}/update`,
          { attributes: attributes }
        )
        .then((res) => resolve(res.data.action_result.data))
        .catch((err) => reject(err.response.data.action_error));
    });
  }

  create(attributes: any): ActionCreatePromise {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.serverUrl}/${this.serviceName}/${this.modelName}/create`,
          { attributes: attributes }
        )
        .then((res) => resolve(res.data.action_result.data))
        .catch((err) => reject(err.response.data.action_error));
    });
  }

  delete(key: any): ActionDeletePromise {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.serverUrl}/${this.serviceName}/${this.modelName}/delete`,
          { id: key }
        )
        .then((res) => resolve(res.data.action_result.data))
        .catch((err) => reject(err.response.data.action_error));
    });
  }

  getModelMetadata(): ActionGetModelMetadataPromise {
    return new Promise((resolve) => {
      axios
        .post(
          `${this.serverUrl}/${this.serviceName}/${this.modelName}/getMetadata`
        )
        .then((res) => resolve(res.data.action_result.data));
    });
  }
}
