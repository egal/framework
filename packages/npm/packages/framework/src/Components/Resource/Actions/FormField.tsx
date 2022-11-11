import * as React from 'react';
import {
  CheckBox,
  FormField as GFormField,
  Spinner,
  TextArea,
  TextInput,
} from 'grommet';
import { FormFieldExtendedProps as GFormFieldProps } from 'grommet/components/FormField';
import { useResourceContext } from '../Resource';
import { DateTimeInput } from '../../Inputs';
import { DateInput } from 'grommet/components/DateInput';

export type FormFieldProps = Omit<GFormFieldProps, 'name'> & {
  name: string;
};

export function FormField({ ...sourceProps }: FormFieldProps) {
  const props = sourceProps;

  const {
    resource: { metadata },
    translation: { t },
  } = useResourceContext();

  if (!metadata.result) return <Spinner />;

  if (!props.label) props.label = t(`fields.${props.name}`);

  const field = metadata.findField(props.name);

  if (!props.component && !props.children) {
    switch (field.type) {
      case 'text':
        props.component = TextArea;
        break;
      case 'boolean':
        props.component = CheckBox;
        break;
      case 'date':
        props.component = DateInput;
        break;
      case 'datetime':
        props.component = DateTimeInput;
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
