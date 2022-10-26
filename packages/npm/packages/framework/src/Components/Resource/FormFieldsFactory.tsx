import * as React from 'react';
import { useResourceContext } from './Resource';
import { Spinner } from 'grommet';
import { FormField, FormFieldProps } from './FormField';

type Props = Omit<FormFieldProps, 'name'> & {
  exclude?: string[];
  excludeGuarded?: boolean;
};

export function FormFieldsFactory({
  exclude = [],
  excludeGuarded = false,
  ...props
}: Props) {
  const {
    resource: { metadata },
  } = useResourceContext();

  if (!metadata.result) return <Spinner />;

  return (
    <>
      {metadata
        .getAllFields()
        .filter((field) => !exclude.includes(field.name))
        .filter((field) => !excludeGuarded || !field.guarded)
        .filter((field) => !field.hidden)
        .map((field, key) => (
          <FormField key={key} name={field.name} {...props} />
        ))}
    </>
  );
}