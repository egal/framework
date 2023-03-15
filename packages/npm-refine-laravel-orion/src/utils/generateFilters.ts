import { CrudFilters } from '@pankod/refine-core';
import { Filter, Filters } from '../types';
import { CrudFilter } from '@pankod/refine-core/dist/contexts/data/IDataContext';

export const generateFilters = (filters?: CrudFilters): Filters => {
  return filters
    ? filters.flatMap((filter): Filter[] => generateFilter(filter))
    : [];
};

const generateFilter = (filter: CrudFilter): Filter[] => {
  if (!('field' in filter)) {
    if (filter.operator in ['and', 'or']) {
      throw new Error(
        `[@egal/refine-laravel-orion]: Operator: ${filter.operator} is not supported for conditional filter.`
      );
    }

    return [
      {
        type: filter.operator,
        nested: generateFilters(filter.value),
      },
    ];
  }

  switch (filter.operator) {
    case 'eq':
      return [{ ...filter, operator: '=' }];
    case 'ne':
      return [{ ...filter, operator: '!=' }];
    case 'lt':
      return [{ ...filter, operator: '<' }];
    case 'gt':
      return [{ ...filter, operator: '>' }];
    case 'lte':
      return [{ ...filter, operator: '<=' }];
    case 'gte':
      return [{ ...filter, operator: '>=' }];
    case 'in':
      return [{ ...filter, operator: 'in' }];
    case 'nin':
      return [{ ...filter, operator: 'not in' }];
    case 'contains':
      return [{ ...filter, operator: 'ilike', value: `%${filter.value}%` }];
    case 'ncontains':
      return [{ ...filter, operator: 'not ilike', value: `%${filter.value}%` }];
    case 'containss':
      return [{ ...filter, operator: 'like', value: `%${filter.value}%` }];
    case 'ncontainss':
      return [{ ...filter, operator: 'not like', value: `%${filter.value}%` }];
    case 'between':
      return [
        { field: filter.field, operator: '>=', value: filter.value[0] },
        { field: filter.field, operator: '<=', value: filter.value[1] },
      ];
    case 'nbetween':
      return [
        { field: filter.field, operator: '<', value: filter.value[0] },
        { field: filter.field, operator: '>', value: filter.value[1] },
      ];
    case 'null':
      return [{ ...filter, value: null, operator: '=' }];
    case 'nnull':
      return [{ ...filter, value: null, operator: '!=' }];
    case 'startswith':
      return [{ ...filter, operator: 'ilike', value: `${filter.value}%` }];
    case 'nstartswith':
      return [{ ...filter, operator: 'not ilike', value: `${filter.value}%` }];
    case 'startswiths':
      return [{ ...filter, operator: 'like', value: `${filter.value}%` }];
    case 'nstartswiths':
      return [{ ...filter, operator: 'not like', value: `${filter.value}%` }];
    case 'endswith':
      return [{ ...filter, operator: 'ilike', value: `%${filter.value}` }];
    case 'nendswith':
      return [{ ...filter, operator: 'not ilike', value: `%${filter.value}` }];
    case 'endswiths':
      return [{ ...filter, operator: 'like', value: `%${filter.value}` }];
    case 'nendswiths':
      return [{ ...filter, operator: 'not like', value: `%${filter.value}` }];
    default:
      throw new Error(
        // @ts-ignore
        `[@egal/refine-laravel-orion]: Operator: ${filter.operator} is not supported.`
      );
  }
};
