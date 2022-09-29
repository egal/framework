import * as React from 'react';
import {
  FormFieldInputFactoryWidget,
  InputConfig,
} from './FormFieldInputFactoryWidget';
import {
  Box,
  Button,
  Form as GrommetFrom,
  FormField,
  FormProps as GrommetFormProps,
} from 'grommet';
import { BoxProps } from 'grommet/components/Box';

type Props<EntityType = any> = {
  entity: EntityType;
  fields: InputConfig[];
  submittable?: boolean;
  resettable?: boolean;
  formBoxProps?: BoxProps;
  formFieldsBoxProps?: BoxProps;
  buttonsBoxProps?: BoxProps;
} & GrommetFormProps<EntityType>;

export function FormWidget({
  entity,
  fields,
  submittable = false,
  resettable = false,
  formBoxProps = {
    justify: 'center',
    gap: 'small',
  },
  formFieldsBoxProps = {
    justify: 'center',
    gap: 'small',
  },
  buttonsBoxProps = {
    direction: 'row',
    justify: 'center',
    gap: 'small',
  },
  ...grommetFormProps
}: Props) {
  return (
    <GrommetFrom value={entity} {...grommetFormProps}>
      <Box {...formBoxProps}>
        <Box {...formFieldsBoxProps}>
          {fields.map((field, key) => {
            return (
              <FormField
                name={field.name}
                htmlFor={field.name}
                label={`${field.header}`}
                key={key}
              >
                <FormFieldInputFactoryWidget input={field} entity={entity} />
              </FormField>
            );
          })}
        </Box>
        <Box {...buttonsBoxProps}>
          {submittable && <Button type="submit" primary label="Save" />}
          {resettable && <Button type="reset" label="Reset" />}
        </Box>
      </Box>
    </GrommetFrom>
  );
}
