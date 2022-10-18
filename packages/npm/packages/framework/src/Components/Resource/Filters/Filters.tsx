import * as React from 'react';
import { Primary } from './Primary';
import { Secondary } from './Secondary';
import { Box, Button, Text } from 'grommet';
import { Refresh } from 'grommet-icons';
import { useResourceContext } from '../Resource';
import { FilterFormField } from './FilterFormField';
import { useFilterFormFieldConfig } from './useFilterFormFieldConfig';

type Props = {
  children: React.ReactNode;
  skipValuesOnApply?: any[];
};

export function Filters({ children, skipValuesOnApply = [''] }: Props) {
  const {
    resource,
    manipulates: { filtering },
    selectedKeys,
  } = useResourceContext();

  const applyFilter = () => {
    const mergedFilteringEntity = {
      ...filtering.primary.entity,
      ...filtering.secondary.entity,
    };

    const filterParam: any = [];
    const groupIndexes: { [key: string]: number } = {};

    Object.keys(mergedFilteringEntity).map((name: string) => {
      const value = mergedFilteringEntity[name];
      if (skipValuesOnApply.includes(value)) return;

      const condition = useFilterFormFieldConfig(name);
      if (!(condition.group && condition.groupCombiner)) {
        // Adding simple condition
        if (filterParam.length !== 0) filterParam.push(condition.combiner);
        filterParam.push([condition.fieldName, condition.operator, value]);
      } else {
        // Adding group condition
        const groupIndex = groupIndexes[condition.group] ?? undefined;
        if (!groupIndex) {
          // Adding first elem in group condition
          if (filterParam.length !== 0)
            filterParam.push(condition.groupCombiner);
          filterParam.push([[condition.fieldName, condition.operator, value]]);
          groupIndexes[condition.group] = filterParam.length - 1;
        } else {
          // Adding additional elem in group condition
          filterParam[groupIndex].push(condition.combiner, [
            condition.fieldName,
            condition.operator,
            value,
          ]);
        }
      }
    });

    // TODO: Not working: No mergeParams if not changed filter.
    if (resource.getItems.params.filter !== filterParam) {
      resource.getItems.mergeParams({ filter: filterParam });
    }
  };

  return (
    <Box direction={'row'} justify={'end'} align={'center'} gap={'small'}>
      {children}
      <Button
        icon={<Refresh />}
        onClick={() => {
          selectedKeys.reset();
          filtering.primary.resetEntity();
          filtering.secondary.resetEntity();
        }}
      />
      <Button
        label={'Apply'}
        onClick={() => {
          selectedKeys.reset();
          applyFilter();
        }}
      />
    </Box>
  );
}

Filters.Primary = Primary;
Filters.Secondary = Secondary;
Filters.FormField = FilterFormField;
