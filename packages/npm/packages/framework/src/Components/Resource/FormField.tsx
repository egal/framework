import * as React from 'react';
import { CheckBox, FormField as GFormField, Spinner, TextInput } from 'grommet';
import { FormFieldExtendedProps as GFormFieldProps } from 'grommet/components/FormField';
import { useResourceContext } from './Resource';
import { sentenceCase } from 'change-case';

export type FormFieldProps = Omit<GFormFieldProps, 'name'> & {
  name: string;
};

export function FormField({ ...sourceProps }: FormFieldProps) {
  const props = sourceProps;

  const {
    resource: { metadata },
  } = useResourceContext();

  if (!metadata.result) return <Spinner />;

  if (!props.label) props.label = sentenceCase(props.name);

  const field = metadata.findField(props.name);

  if (!props.component && !props.children) {
    switch (field.type) {
      case 'boolean':
        props.component = CheckBox;
        break;
      default:
        props.component = TextInput;
        break;
    }
  }

  if (props.disabled === undefined) props.disabled = field.guarded;
  if (props.required === undefined) props.required = field.required;

  return <GFormField {...props} />;
}
