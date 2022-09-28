import * as React from 'react';
import { FormFieldsFactory } from './FormFieldsFactory';
import { InputConfig } from './InputFactory';
import {
  Box,
  Button,
  Form as GrommetFrom,
  FormProps as GrommetFormProps,
} from 'grommet';

type Props<EntityType = any> = {
  entity: EntityType;
  fields: InputConfig[];
  submittable?: boolean;
  resettable?: boolean;
} & GrommetFormProps<EntityType>;

export function Form({
  entity,
  fields,
  submittable = true,
  resettable = false,
  ...grommetFormProps
}: Props) {
  return (
    <GrommetFrom value={entity} {...grommetFormProps}>
      <FormFieldsFactory entity={entity} fields={fields} />
      <Box
        direction={'row'}
        justify={'center'}
        gap="small"
        pad={{ top: 'small' }}
      >
        {submittable && <Button type="submit" primary label="Save" />}
        {resettable && <Button type="reset" label="Reset" />}
      </Box>
    </GrommetFrom>
  );
}
