import { CrudSorting } from '@pankod/refine-core';
import { Sort, SortCondition } from '../types';

export const generateSort = (sort?: CrudSorting): Sort => {
  return (sort ?? []).map(({ field, order: direction }): SortCondition => {
    return { field, direction };
  });
};
