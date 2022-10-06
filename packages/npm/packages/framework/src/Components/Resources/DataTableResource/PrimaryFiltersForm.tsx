import * as React from 'react';
import { Box, Form, FormField, Text } from 'grommet';
import { Form as GrommetForm, FormProps } from 'grommet/components/Form';
import { InputFactory, InputFactoryProps } from '../../Factories';
import { Box as GrommetBox } from 'grommet/components/Box';
import { Button as GrommetButton } from 'grommet/components/Button';

type Props<FilteringEntityType> = {
  onSecondaryFiltersRequests: () => void;
  fields: InputFactoryProps[];
} & FormProps<FilteringEntityType>;

export function PrimaryFiltersForm({
  fields,
  onSecondaryFiltersRequests,
  ...formProps
}: Props<any>) {
  return (
    <GrommetForm {...formProps}>
      <GrommetBox direction={'row'} align={'end'} justify={'end'} gap={'small'}>
        {fields.map((field, key) => (
          <FormField htmlFor={field.name} key={key} margin={'none'} {...field}>
            <InputFactory {...field} />
          </FormField>
        ))}
        <Box>
          <GrommetButton
            size={'large'}
            onClick={onSecondaryFiltersRequests}
            label="More filters"
            primary
          />
        </Box>
        <Box>
          <GrommetButton size={'large'} type="submit" label="Filter" primary />
        </Box>
        <Box>
          <GrommetButton size={'large'} type="reset" label="Reset filters" />
        </Box>
      </GrommetBox>
    </GrommetForm>
  );
}
