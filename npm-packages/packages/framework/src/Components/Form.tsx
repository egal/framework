import * as React from 'react';
import {
  Box,
  Button as GrommetButton,
  Form as GrommetFrom,
  FormField,
  FormProps as GrommetFormProps,
} from 'grommet';
import { InputFactory, InputFactoryProps } from './Factories';
import { FormFieldProps } from 'grommet/components/FormField';

export type FormFieldConfig = InputFactoryProps &
  Omit<FormFieldProps, 'name' & 'htmlFor'>;

type Props<EntityType> = GrommetFormProps<EntityType> & {
  fields: FormFieldConfig[];
};

export function Form<EntityType>({ fields, ...formProps }: Props<EntityType>) {
  return (
    <GrommetFrom {...formProps}>
      <Box gap={'small'} direction={'column'}>
        {fields.map((field, key) => {
          return (
            <FormField
              htmlFor={field.name}
              key={key}
              margin={'none'}
              {...field}
            >
              <InputFactory {...field} />
            </FormField>
          );
        })}
        {formProps.onSubmit && (
          <GrommetButton type="submit" label="Save" primary />
        )}
        {formProps.onReset && <GrommetButton type="reset" label="Reset" />}
      </Box>
    </GrommetFrom>
  );
}
