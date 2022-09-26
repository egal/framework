import React from 'react';
import { FieldConfig } from '../Types/FieldConfigType';
import { Field } from '../Utils/Metadata';
import { CheckBox, TextInput } from 'grommet';

interface Props {
  modelField: Field;
  fieldConfig: FieldConfig;
}

export class UniversalInput extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const renderType = this.props.fieldConfig.renderType ?? this.props.modelField.type;
    const enabled =
      (this.props.fieldConfig.formInputEnabled === undefined || this.props.fieldConfig.formInputEnabled) &&
      !this.props.modelField.guarded;

    switch (renderType) {
      case 'checkbox':
      case 'boolean':
      case 'toggle':
        return <CheckBox name={this.props.fieldConfig.name} toggle={renderType === 'toggle'} disabled={!enabled} />;
      default:
        return <TextInput id={this.props.fieldConfig.name} name={this.props.fieldConfig.name} disabled={!enabled} />;
    }
  }
}
