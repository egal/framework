import React from 'react';
import { Box, FormField, Form as GrommetForm } from 'grommet';
import { UniversalInput } from './UniversalInput';
import { FieldConfig } from '../Types/FieldConfigType';
import { Field } from '../Utils/Metadata';

interface Props {
  modelFields: Field[];
  fieldConfigs: FieldConfig[];
  type: 'create' | 'edit';
  onlyFillable: boolean;
  controlPanel?: React.ReactElement;
  value?: Record<string, unknown>;
  error?: string;
  onSubmit?: (attributes: Record<string, unknown>) => void;
  onChange?: (attributes: Record<string, unknown>) => void;
}

interface State {
  attributes: Record<string, unknown>;
  originalAttributes: Record<string, unknown>;
}

export class Form extends React.Component<Props, State> {
  static defaultProps = {
    type: 'create',
    onlyFillable: false
  };

  state: State = {
    attributes: {},
    originalAttributes: {}
  };

  constructor(props: Props) {
    super(props);

    if (this.props.value) {
      this.state.attributes = this.props.value;
    }
    this.FormFields = this.FormFields.bind(this);
    this.FormApiError = this.FormApiError.bind(this);
    this.onChangeCallback = this.onChangeCallback.bind(this);
    this.onSubmitCallback = this.onSubmitCallback.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  getMetadata(fieldName: string): Field {
    const result = this.props.modelFields.find((modelField) => modelField.name === fieldName);

    if (!result) throw new Error('Metadata not found');
    else return result;
  }

  FormFields() {
    const fields = this.props.onlyFillable
      ? this.props.fieldConfigs.filter((field) => !this.getMetadata(field.name).guarded)
      : this.props.fieldConfigs;

    return (
      <>
        {fields.map((field, key) => {
          const metadata = this.getMetadata(field.name);

          return (
            <FormField name={field.name} htmlFor={field.name} label={`${field.header}`} key={key}>
              {field.renderFormInput ? (
                field.renderFormInput()
              ) : (
                <UniversalInput fieldConfig={field} modelField={metadata} />
              )}
            </FormField>
          );
        })}
      </>
    );
  }

  FormApiError() {
    return this.props.error ? (
      <Box direction={'row'} justify={'center'} pad={'xsmall'} background={'status-error'}>
        {this.props.error}
      </Box>
    ) : null;
  }

  onChangeCallback(newValue: Record<string, unknown>) {
    this.setState({ attributes: newValue });

    if (this.props.onChange) {
      this.props.onChange(this.state.attributes);
    }
  }

  onSubmitCallback() {
    if (!this.props.onSubmit) return;

    this.props.onSubmit(this.state.attributes);
  }

  resetState() {
    if (!this.props.value) return;

    this.setState({ attributes: this.props.value });
  }

  render() {
    return (
      <GrommetForm
        value={this.state.attributes}
        onReset={this.resetState}
        onChange={this.onChangeCallback}
        onSubmit={this.onSubmitCallback}>
        <this.FormFields />
        <this.FormApiError />
        {this.props.controlPanel}
      </GrommetForm>
    );
  }
}
