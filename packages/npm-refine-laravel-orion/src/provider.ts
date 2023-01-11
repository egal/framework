import { AxiosInstance } from 'axios';
import { stringify } from 'query-string';
import { DataProvider } from '@pankod/refine-core';
import { axiosInstance, generateSort, generateFilter } from './utils';
import { SearchBody, SearchQuery } from './types';

export const dataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance
): Omit<
  Required<DataProvider>,
  'createMany' | 'updateMany' | 'deleteMany'
> => ({
  getList: async ({
    resource,
    hasPagination = true,
    pagination,
    filters,
    sort,
    metaData,
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

    const { data } = await httpClient.post(`${url}?${stringify(query)}`, body);

    return {
      data: data.data,
      total: data.meta.total,
    };
  },

  getMany: async ({ resource, ids }) => {
    throw new Error('Not implemented!');
  },

  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`;

    const { data } = await httpClient.post(url, variables);

    return {
      data,
    };
  },

  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await httpClient.patch(url, variables);

    return {
      data,
    };
  },

  getOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await httpClient.get(url);

    return {
      data,
    };
  },

  deleteOne: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await httpClient.delete(url, {
      data: variables,
    });

    return {
      data,
    };
  },

  getApiUrl: () => {
    return apiUrl;
  },

  custom: async ({ url, method, filters, sort, payload, query, headers }) => {
    let requestUrl = `${url}?`;

    if (sort) {
      const generatedSort = generateSort(sort);
      if (generatedSort) {
        const { _sort, _order } = generatedSort;
        const sortQuery = {
          _sort: _sort.join(','),
          _order: _order.join(','),
        };
        requestUrl = `${requestUrl}&${stringify(sortQuery)}`;
      }
    }

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
});
