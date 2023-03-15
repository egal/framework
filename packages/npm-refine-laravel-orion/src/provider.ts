import { AxiosInstance } from 'axios';
import { stringify } from 'query-string';
import { DataProvider, HttpError } from '@pankod/refine-core';
import { generateSort, generateFilter } from './utils';
import { SearchBody, SearchQuery, Sort, SortCondition } from './types';

export const dataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance
): Omit<Required<DataProvider>, 'createMany' | 'updateMany' | 'deleteMany'> => {
  // TODO: How it's works with other data providers?
  httpClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const customError: HttpError = {
        ...error,
        message: error.response?.data?.message,
        statusCode: error.response?.status,
      };

      return Promise.reject(customError);
    }
  );

  return {
    getList: async ({
      //
      resource,
      hasPagination = true,
      pagination,
      metaData,
      sort,
    }) => {
      const url = `${apiUrl}/${resource}/search`;

      const { current = 1, pageSize = 10 } = pagination ?? {};

      const query: SearchQuery = {};

      if (hasPagination) {
        query.page = current;
        query.limit = pageSize;
      }

      const body: SearchBody = {};

      body.includes = metaData?.includes ?? [];
      body.sort = generateSort(sort);
      const headers = metaData?.headers ?? {};

      const { data } = await httpClient.post(
        `${url}?${stringify(query)}`,
        body,
        { headers }
      );

      return {
        data: data.data,
        total: data.meta.total,
      };
    },

    getMany: async ({}) => {
      throw new Error('Not implemented!');
    },

    create: async ({
      //
      resource,
      variables,
      metaData,
    }) => {
      const url = `${apiUrl}/${resource}`;

      const headers = metaData?.headers ?? {};

      const { data } = await httpClient.post(url, variables, { headers });

      return {
        data,
      };
    },

    update: async ({
      //
      resource,
      id,
      variables,
      metaData,
    }) => {
      const url = `${apiUrl}/${resource}/${id}`;

      const headers = metaData?.headers ?? {};

      const { data } = await httpClient.patch(url, variables, { headers });

      return {
        data,
      };
    },

    getOne: async ({
      //
      resource,
      id,
      metaData,
    }) => {
      const url = `${apiUrl}/${resource}/${id}`;

      const headers = metaData?.headers ?? {};

      const { data } = await httpClient.get(url, { headers });

      return {
        data: data.data,
      };
    },

    deleteOne: async ({
      //
      resource,
      id,
      variables,
      metaData,
    }) => {
      const url = `${apiUrl}/${resource}/${id}`;

      const headers = metaData?.headers ?? {};

      const { data } = await httpClient.delete(url, {
        data: variables,
        headers,
      });

      return {
        data,
      };
    },

    getApiUrl: () => {
      return apiUrl;
    },

    custom: async ({
      //
      url,
      method,
      filters,
      payload,
      query,
      headers,
    }) => {
      let requestUrl = `${url}?`;

      if (filters) {
        const filterQuery = generateFilter(filters);
        requestUrl = `${requestUrl}&${stringify(filterQuery)}`;
      }

      if (query) {
        requestUrl = `${requestUrl}&${stringify(query)}`;
      }

      if (headers) {
        httpClient.defaults.headers = {
          ...httpClient.defaults.headers,
          ...headers,
        };
      }

      let axiosResponse;
      switch (method) {
        case 'put':
        case 'post':
        case 'patch':
          axiosResponse = await httpClient[method](url, payload);
          break;
        case 'delete':
          axiosResponse = await httpClient.delete(url, {
            data: payload,
          });
          break;
        default:
          axiosResponse = await httpClient.get(requestUrl);
          break;
      }

      const { data } = axiosResponse;

      return Promise.resolve({ data });
    },
  };
};
