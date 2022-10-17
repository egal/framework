type Combiner = 'AND' | 'OR';

export type FilterFormFieldConfig = {
  groupCombiner?: Combiner;
  group?: string;
  combiner: Combiner;
  fieldName: string;
  operator: string | 'eq';
};

function useFromStringToFilterFormFieldName(
  value: string
): FilterFormFieldConfig {
  const split = value.split(':');

  if (!(split.length === 3 || split.length === 5))
    throw new Error(`Form name '${value}' is not a form field name!`);

  const validateCombiner = (value: string): Combiner => {
    if (!(value === 'AND' || value === 'OR'))
      throw new Error(`'${value}' is not a filter combiner!`);

    return value;
  };

  if (split.length === 5) {
    return {
      groupCombiner: validateCombiner(split[0]),
      group: split[1],
      combiner: validateCombiner(split[2]),
      fieldName: split[3],
      operator: split[4],
    };
  } else {
    return {
      combiner: validateCombiner(split[0]),
      fieldName: split[1],
      operator: split[2],
    };
  }
}

function useFromFilterFormFieldNameToString(
  value: FilterFormFieldConfig
): string {
  const { combiner, group, groupCombiner, fieldName, operator } = value;
  let result: string = '';

  if (
    (group !== undefined && groupCombiner === undefined) ||
    (groupCombiner !== undefined && group === undefined)
  ) {
    throw new Error('Props `group` and `groupCombiner` required together!');
  }

  if (group && groupCombiner) result += `${groupCombiner}:${group}:`;

  result += `${combiner}:${fieldName}:${operator}`;

  return result;
}

export function useFilterFormFieldConfig(value: FilterFormFieldConfig): string;
export function useFilterFormFieldConfig(value: string): FilterFormFieldConfig;
export function useFilterFormFieldConfig(
  value: string | FilterFormFieldConfig
): FilterFormFieldConfig | string {
  if (typeof value === 'string') {
    return useFromStringToFilterFormFieldName(value);
  } else {
    return useFromFilterFormFieldNameToString(value);
  }
}
