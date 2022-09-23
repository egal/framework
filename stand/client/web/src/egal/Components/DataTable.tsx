import * as React from 'react';
import {
  ColumnConfig as GrommetColumnConfig,
  DataTable as GrommetDataTable,
  DataTableExtendedProps as GrommetDataTableProps
} from 'grommet/components/DataTable';
import { ActionGetItemsParams, DataProvider, ActionGetItemsResult, ActionError } from '../Providers/DataProvider';
import {
  Box,
  Button,
  Layer,
  Pagination,
  Form,
  FormField,
  TextInput,
  Spinner,
  Heading,
  Paragraph,
  List,
  Text,
  Menu,
  CheckBox
} from 'grommet';
import { Close, StatusWarning, MoreVertical, Edit, Trash } from 'grommet-icons';

import { Model as ModelMetadata, Field as FieldMetadata } from '../Utils/Metadata';
import { FieldConfig } from '../Types/FieldConfigType';
import { Form as CustomForm } from '../Components/Form';

interface Props<TRowType = any> {
  modelName: string;
  serviceName: string;
  perPage: number;
  fields: FieldConfig<TRowType>[];
  keyFieldName: string;
}

type State = {
  items: null | ActionGetItemsResult; // TODO: Make not nullable.
  edit: null | {
    attributes: any;
    originalAttributes: any;
  };
  create: null | {
    attributes: any;
  };
  modelMetadata: null | ModelMetadata; // TODO: Make not nullable.
  undefinedErrorDetected: boolean;

  // form state
  formApiError: string;
};

export class DataTable extends React.Component<Props, State> {
  static defaultProps: Props | any = {
    columns: []
  };

  state: State = {
    items: null, // TODO: Make without nullable, with await call in constructor.
    modelMetadata: null,
    edit: null,
    create: null,
    undefinedErrorDetected: false,

    // form state
    formApiError: ''
  };

  constructor(props: Props) {
    super(props);

    this.dataTableOnClickRowCallback = this.dataTableOnClickRowCallback.bind(this);
    this.paginationOnChangeCallback = this.paginationOnChangeCallback.bind(this);
    this.manipulateLayerOnCloseCallback = this.manipulateLayerOnCloseCallback.bind(this);
    this.editFormOnSubmitCallback = this.editFormOnSubmitCallback.bind(this);
    this.editFormOnResetCallback = this.editFormOnResetCallback.bind(this);
    this.editFormOnChangeCallback = this.editFormOnChangeCallback.bind(this);
    this.editFormOnDeleteCallback = this.editFormOnDeleteCallback.bind(this);
    this.createButtonOnClickCallback = this.createButtonOnClickCallback.bind(this);
    this.createFromOnChangeCallback = this.createFromOnChangeCallback.bind(this);
    this.createFromOnSubmitCallback = this.createFromOnSubmitCallback.bind(this);
  }

  componentDidMount(): void {
    this.actionGetItems({ pagination: { per_page: this.props.perPage, page: 1 } });
    this.actionGetModelMetadata();
  }

  action(): DataProvider {
    return new DataProvider(this.props.serviceName, this.props.modelName);
  }

  actionGetItems(params: ActionGetItemsParams): void {
    this.action()
      .getItems(params)
      .then((res) => this.setState({ items: res }))
      .catch((error: ActionError) => {
        if (error.code === 'ERR_UNDEFINED' || error.code === 'ERR_NETWORK') {
          this.setState({ undefinedErrorDetected: true });
        }
      });
  }

  actionGetModelMetadata() {
    this.action()
      .getModelMetadata()
      .then((metadata) => {
        this.setState({ modelMetadata: metadata });
      });
  }

  getFieldMetadata(name: string): FieldMetadata {
    if (this.state.modelMetadata === null) {
      throw new Error();
    }

    const result: FieldMetadata = [
      this.state.modelMetadata.primary_key,
      ...this.state.modelMetadata.fields,
      ...this.state.modelMetadata.fake_fields
    ].find((field: FieldMetadata): boolean => field.name === name);

    if (result === undefined) {
      throw new Error('Field not found!');
    }

    return result;
  }

  getFieldMetadataList(): FieldMetadata[] {
    if (this.state.modelMetadata === null) return [];

    return [
      this.state.modelMetadata.primary_key,
      ...this.state.modelMetadata.fields,
      ...this.state.modelMetadata.fake_fields
    ];
  }

  paginationOnChangeCallback({ page }: { page: number }): void {
    this.actionGetItems({ pagination: { per_page: this.props.perPage, page: page } });
  }

  reloadData(): void {
    this.actionGetItems({
      pagination: {
        per_page: this.props.perPage,
        page: this.state.items === null ? 1 : this.state.items.current_page
      }
    });
  }

  manipulateLayerOnCloseCallback() {
    this.setState({
      edit: null,
      create: null,
      formApiError: ''
    });
  }

  renderUndefinedError() {
    return (
      <Layer full animation="fadeIn">
        <Box fill background="light-1" align="center" justify="center">
          <StatusWarning size={'xlarge'} color={'dark-1'} />
          <Heading color={'dark-1'}>Что-то пошло не так...</Heading>
          <Paragraph size="large">Обратитесь в тех поддержку!</Paragraph>
        </Box>
      </Layer>
    );
  }

  renderLoader() {
    return (
      <Box height={'100%'} width={'100%'} align={'center'} justify={'center'}>
        <Spinner size={'large'} />
      </Box>
    );
  }

  dataTableOnClickRowCallback({ datum }: { datum: any }) {
    this.setState({
      edit: {
        attributes: datum,
        originalAttributes: datum
      }
    });
  }

  createButtonOnClickCallback() {
    this.setState({
      create: {
        attributes: null
      }
    });
  }

  renderDataTable() {
    // TODO: How to get rid of next `if`?
    if (this.state.items === null) {
      throw new Error();
    }

    const columns: GrommetColumnConfig<any>[] = this.props.fields.map((field): GrommetColumnConfig<any> => {
      const render = (() => {
        const fieldMetadata = this.getFieldMetadata(field.name);
        const renderType = field.renderType ?? fieldMetadata.type;

        switch (renderType) {
          case 'boolean':
          case 'checkbox':
          case 'toggle':
            // TODO: Disabled выглядит не круто, а без него при наведение подсветка срабатывает.
            return (datum: any): React.ReactElement => (
              <CheckBox checked={datum[field.name]} toggle={renderType === 'toggle'} />
            );
          default:
            return undefined;
        }
      })();

      return {
        property: field.name,
        header: field.header,
        render: field.renderDataTable ?? render,
        ...field.dataTableColumnAdditionalProps
      };
    });

    return React.createElement(GrommetDataTable, {
      fill: true,
      pin: true,
      data: this.state.items.items,
      onClickRow: this.dataTableOnClickRowCallback,
      resizeable: true,
      key: Date.now(), // TODO: Crutch.
      columns: columns
    });
  }

  renderPagination() {
    if (this.state.items === null) {
      throw new Error();
    }

    return (
      <Pagination
        onChange={this.paginationOnChangeCallback}
        page={this.state.items.current_page}
        step={this.state.items.per_page}
        numberItems={this.state.items.total_count}
      />
    );
  }

  renderFormInput(field: FieldConfig) {
    const fieldMetadata = this.getFieldMetadata(field.name);
    const renderType = field.renderType ?? fieldMetadata.type;
    const enabled =
      (field.formInputEnabled === undefined || field.formInputEnabled) &&
      fieldMetadata.fillable &&
      !fieldMetadata.guarded;
    switch (renderType) {
      case 'checkbox':
      case 'boolean':
      case 'toggle':
        return <CheckBox name={field.name} toggle={renderType === 'toggle'} disabled={!enabled} />;
      default:
        return <TextInput id={field.name} name={field.name} disabled={!enabled} />;
    }
  }

  renderFormFields(fields: FieldConfig[]) {
    return (
      <>
        {fields.map((field, key) => {
          return (
            <FormField name={field.name} htmlFor={field.name} label={`${field.header}`} key={key}>
              {field.renderFormInput ? field.renderFormInput() : this.renderFormInput(field)}
            </FormField>
          );
        })}
      </>
    );
  }

  editFormOnChangeCallback(newValue: any) {
    if (this.state.edit === null) {
      throw new Error();
    }

    console.log(newValue);
    this.setState({ edit: { attributes: newValue, originalAttributes: this.state.edit.originalAttributes } });
  }

  editFormOnResetCallback() {
    if (this.state.edit === null) {
      throw new Error();
    }

    this.setState({
      edit: {
        attributes: this.state.edit.originalAttributes,
        originalAttributes: this.state.edit.originalAttributes
      },
      formApiError: ''
    });
  }

  editFormOnSubmitCallback() {
    if (this.state.edit === null) {
      throw new Error();
    }

    this.action()
      .update(this.state.edit.attributes)
      .then(() => {
        this.reloadData();
        this.manipulateLayerOnCloseCallback();
        this.setState({ formApiError: '' });
      })
      .catch((error) => {
        this.setState({ formApiError: this.getErrorByInternalCode(error) });
      });
  }

  editFormOnDeleteCallback() {
    if (this.state.edit === null) {
      throw new Error();
    }

    this.action()
      .delete(this.state.edit.attributes[this.props.keyFieldName])
      .then(() => {
        this.reloadData();
        this.manipulateLayerOnCloseCallback();
        this.setState({ formApiError: '' });
      })
      .catch((error) => {
        this.setState({ formApiError: this.getErrorByInternalCode(error) });
      });
  }

  renderEditForm() {
    if (this.state.edit === null) {
      throw new Error();
    }

    return (
      <Form
        value={this.state.edit.attributes}
        onChange={this.editFormOnChangeCallback}
        onReset={this.editFormOnResetCallback}
        onSubmit={this.editFormOnSubmitCallback}>
        {this.renderFormFields(this.props.fields)}
        {this.renderFormApiError(this.state.formApiError)}
        <Box direction={'row'} justify={'center'} gap="small" pad={{ top: 'small' }}>
          <Button type="submit" primary label="Update" />
          <Button type="reset" label="Reset" />
        </Box>
        <Box direction={'row'} justify={'center'} gap="small" pad={{ top: 'small' }}>
          <Button label="Delete" color="status-error" onClick={this.editFormOnDeleteCallback} />
        </Box>
      </Form>
    );
  }

  createFromOnChangeCallback(newValue: any) {
    this.setState({ create: { attributes: newValue } });
  }
  createFromOnSubmitCallback() {
    if (this.state.create === null) {
      throw new Error();
    }

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

  renderCreateForm() {
    if (this.state.create === null) {
      throw new Error();
    }

    return (
      <Form onChange={this.createFromOnChangeCallback} onSubmit={this.createFromOnSubmitCallback}>
        {this.renderFormFields(this.props.fields.filter((field) => this.getFieldMetadata(field.name).fillable))}
        {this.renderFormApiError(this.state.formApiError)}
        <Box direction={'row'} justify={'center'} gap="small" pad={{ top: 'small' }}>
          <Button type="submit" primary label="Create" />
        </Box>
      </Form>
    );
  }

  renderFormApiError(error: string) {
    return error ? (
      <Box direction={'row'} justify={'center'} pad={'xsmall'} background={'status-error'}>
        {error}
      </Box>
    ) : null;
  }

  getErrorByInternalCode(error: any): string {
    switch (error.internal_code) {
      default:
        return error.message;
    }
  }

  renderManipulateLayer(child: React.ReactElement) {
    return (
      <Layer
        onEsc={this.manipulateLayerOnCloseCallback}
        onClickOutside={this.manipulateLayerOnCloseCallback}
        margin={'small'}>
        <Box pad={'medium'} width={'30vw'} overflow="auto">
          <Box align={'end'}>
            <Button icon={<Close />} hoverIndicator onClick={this.manipulateLayerOnCloseCallback} />
          </Box>
          {child}
        </Box>
      </Layer>
    );
  }

  render() {
    // TODO: Crutch, may be.
    if (this.state.undefinedErrorDetected) {
      return this.renderUndefinedError();
    }

    // TODO: Crutch. DataTable placeholder prop.
    if (this.state.items === null) {
      return this.renderLoader();
    }

    return (
      <>
        {this.state.edit !== null && this.renderManipulateLayer(this.renderEditForm())}
        {this.state.create !== null &&
          this.renderManipulateLayer(
            <CustomForm
              onSubmit={() => console.log('submit callback')}
              modelFields={this.getFieldMetadataList()}
              fieldConfigs={this.props.fields}
            />
          )}
        <Box pad={'small'} height={'100%'} width={'100%'} justify={'between'} gap={'small'}>
          <Box width={'100%'} direction={'row'} justify={'between'}>
            <Button label={'Create'} onClick={this.createButtonOnClickCallback} />
          </Box>
          <Box height={'100%'} width={'100%'} overflow="auto">
            {this.renderDataTable()}
          </Box>
          <Box justify={'between'} direction={'row'}>
            <Box />
            {this.renderPagination()}
            <Box>Total: {this.state.items.total_count}</Box>
          </Box>
        </Box>
      </>
    );
  }
}
