import * as React from 'react';
import { FormField } from 'grommet';
import {
  InputConfig,
  FormFieldInputFactoryWidget,
} from './FormFieldInputFactoryWidget';

type Props<EntityType = any> = {
  fields: InputConfig[];
  entity: EntityType;
};

export function FormFieldsFactory<EntityType = any>({
  fields,
  entity,
}: Props<EntityType>) {
  return (
    <>
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
    </>
  );
}
