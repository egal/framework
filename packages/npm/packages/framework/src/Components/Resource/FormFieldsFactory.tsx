import * as React from 'react';
import { useResourceContext } from './Resource';
import { Spinner } from 'grommet';
import { FormField, FormFieldProps } from './FormField';

type Props = Omit<FormFieldProps, 'name'> & {
  include?: string[];
  exclude?: string[];
  excludeGuarded?: boolean;
};

export function FormFieldsFactory({
  include = [],
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
        .filter((field) => include.includes(field.name))
        .filter((field) => !exclude.includes(field.name))
        .filter((field) => !excludeGuarded || !field.guarded)
        .filter((field) => !field.hidden)
        .map((field, key) => (
          <FormField key={key} name={field.name} {...props} />
        ))}
    </>
  );
}
