import * as React from 'react';
import { Box, FormField, Text } from 'grommet';
import { FormFieldExtendedProps } from 'grommet/components/FormField';
import {
  FilterFormFieldConfig,
  useFilterFormFieldConfig,
} from './useFilterFormFieldConfig';

type Props = Omit<FormFieldExtendedProps, 'name' | 'label'> &
  FilterFormFieldConfig & {
    label?: string;
  };

export function FilterFormField({
  combiner,
  group,
  groupCombiner,
  fieldName,
  operator,
  label,
  ...props
}: Props) {
  return (
    <Box align={'center'} direction={'row'}>
      {label && <Text>{label}:</Text>}
      <FormField
        name={useFilterFormFieldConfig({
          combiner,
          group,
          groupCombiner,
          fieldName,
          operator,
        })}
        {...props}
      />
    </Box>
  );
}
