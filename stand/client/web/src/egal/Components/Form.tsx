import React from 'react';
import { Box, Button, FormField, Form as GrommetForm } from 'grommet';
import { UniversalInput } from './UniversalInput';
import { FieldConfig } from '../Types/FieldConfigType';
import { Field } from '../Utils/Metadata';
import { DataProvider } from '../Providers/DataProvider';

interface Props {
  modelFields: Field[];
  fieldConfigs: FieldConfig[];
  type: 'create' | 'edit';
  // editOriginal;
  onSubmit?: () => void;
  onError?: () => void;
  onSuccess?: () => void;
  modelName?: string;
  serviceName?: string;
}

interface State {
  attributes: Record<string, unknown>;
  originalAttributes: Record<string, unknown>;
}

export class Form extends React.Component<Props, State> {
  static defaultProps = {
    type: 'create'
  };

  state: State = {
    attributes: {},
    originalAttributes: {}
  };

  constructor(props: Props) {
    super(props);

    this.FormFields = this.FormFields.bind(this);
  }

  getMetadata(fieldName: string): Field {
    const result = this.props.modelFields.find((modelField) => modelField.name === fieldName);

    if (!result) throw new Error('Metadata not found');
    else return result;
  }

  FormFields() {
    // eslint-disable-next-line no-debugger
    const fields = this.props.fieldConfigs.filter((field) => this.getMetadata(field.name).fillable);

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
    const error = 'TEST_ERROR';

    return error ? (
      <Box direction={'row'} justify={'center'} pad={'xsmall'} background={'status-error'}>
        {error}
      </Box>
    ) : null;
  }

  onChangeCallback(newValue: Record<string, unknown>) {
    this.setState({ attributes: newValue });
  }
  createFromOnSubmitCallback() {
    this.action()
      .create(this.state.create.attributes)
      .then(() => {
        this.setState({ create: null, formApiError: '' });
        this.reloadData();
      })
      .catch((error) => {
        this.setState({ formApiError: this.getErrorByInternalCode(error) });
      });
  }

  render() {
    return (
      // <div></div>
      <GrommetForm onChange={this.onChangeCallback} onSubmit={this.props.onSubmit}>
        <this.FormFields />
        <this.FormApiError />
        <Box direction={'row'} justify={'center'} gap="small" pad={{ top: 'small' }}>
          <Button type="submit" primary label="Create" />
        </Box>
      </GrommetForm>
    );
  }
}
