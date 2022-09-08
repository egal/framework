import axios from 'axios';

export type GetItemsResult = {
  current_page: number;
  total_count: number;
  per_page: number;
  items: [];
};

export type Error = {
  message: string;
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

export type ActionGetItemsPromise = ActionResultPromise<GetItemsResult, Error>;

export class DataProvider {
  serverUrl: string = 'http://localhost:8080';
  modelName!: string;
  serviceName!: string;

  constructor(serviceName: string, modelName: string) {
    this.serviceName = serviceName;
    this.modelName = modelName;
  }

  getItems(params: ActionGetItemsParams): ActionGetItemsPromise {
    return new Promise((resolve, reject) => {
      axios.post(`${this.serverUrl}/${this.serviceName}/${this.modelName}/getItems`, params).then((res) => {
        resolve(res.data.action_result.data);
      });
    });
  }
}
