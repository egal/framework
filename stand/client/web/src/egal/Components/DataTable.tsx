import * as React from 'react';
import { ColumnConfig as GrommetColumnConfig, DataTable as GrommetDataTable } from 'grommet/components/DataTable';
import { ActionError, ActionGetItemsParams, ActionGetItemsResult, DataProvider } from '../Providers/DataProvider';
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Heading,
  Layer,
  Pagination,
  Paragraph,
  Spinner,
  TextInput
} from 'grommet';
import { Close, StatusWarning, Filter } from 'grommet-icons';
import { deepMerge } from 'grommet/utils';
import { Model as ModelMetadata, Field as FieldMetadata } from '../Utils/Metadata';
import { FieldConfig } from '../Types/FieldConfigType';
import { Form as CustomForm } from '../Components/Form';

// TODO: Implementation of primary and secondary filters.
// eslint-disable-next-line @typescript-eslint/ban-types
type FilterConfig = {};

// Новый fieldConfig
interface FieldConfig {
  name: string;
  header: string;
  renderType?: 'boolean' | 'checkbox' | 'toggle';
  renderDataTable?: (datum: any) => React.ReactNode;
  formInputEnabled?: boolean;
  renderFormInput?: () => React.ReactNode; // TODO: Нормальные параметры.
  dataTableColumnAdditionalProps?: any | GrommetColumnConfig<any>;
  filter?: boolean | FilterConfig;
}


interface Props {
  modelName: string;
  serviceName: string;
  perPage: number;
  fields: FieldConfig[];
  keyFieldName: string;
}

type State = {
  items: null | ActionGetItemsResult; // TODO: Make not nullable.
  actionGetItemsParams: ActionGetItemsParams;
  edit: null | {
    attributes: any;
  };
  create: null | {
    attributes: any;
  };
  modelMetadata: null | ModelMetadata; // TODO: Make not nullable.
  undefinedErrorDetected: boolean;
  filterEdit: boolean;
  filterValue: any;

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
    filterEdit: false,
    filterValue: {},
    actionGetItemsParams: {
      pagination: {
        per_page: this.props.perPage,
        page: 1
      }
    },

    // form state
    formApiError: ''
  };

  constructor(props: Props) {
    super(props);

    this.dataTableOnClickRowCallback = this.dataTableOnClickRowCallback.bind(this);
    this.paginationOnChangeCallback = this.paginationOnChangeCallback.bind(this);
    this.manipulateLayerOnCloseCallback = this.manipulateLayerOnCloseCallback.bind(this);
    this.editFormOnSubmitCallback = this.editFormOnSubmitCallback.bind(this);
    this.editFormOnDeleteCallback = this.editFormOnDeleteCallback.bind(this);
    this.createButtonOnClickCallback = this.createButtonOnClickCallback.bind(this);
    this.createFromOnSubmitCallback = this.createFromOnSubmitCallback.bind(this);
  }

  componentDidMount(): void {
    this.actionGetModelMetadata();
    this.actionGetItems(this.state.actionGetItemsParams);
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
    this.actionGetItems(this.state.actionGetItemsParams);
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
        attributes: datum
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

  // TODO: REnderFormINput. Убрать fillable

  editFormOnSubmitCallback(attributes: Record<string, unknown>) {
    this.action()
      .update(attributes)
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
      <CustomForm
        onSubmit={this.editFormOnSubmitCallback}
        error={this.state.formApiError}
        modelFields={this.getFieldMetadataList()}
        fieldConfigs={this.props.fields}
        value={this.state.edit.attributes}
        controlPanel={
          <>
            <Box direction={'row'} justify={'center'} gap="small" pad={{ top: 'small' }}>
              <Button type="submit" primary label="Update" />
              <Button type="reset" label="Reset" />
            </Box>
            <Box direction={'row'} justify={'center'} gap="small" pad={{ top: 'small' }}>
              <Button label="Delete" color="status-error" onClick={this.editFormOnDeleteCallback} />
            </Box>
          </>
        }
      />

      // </Form>
    );
  }

  createFromOnSubmitCallback(attributes: Record<string, unknown>) {
    this.action()
      .create(attributes)
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

    // TODO: Поменять fillable на !guarded

    return (
      <CustomForm
        onSubmit={this.createFromOnSubmitCallback}
        error={this.state.formApiError}
        modelFields={this.getFieldMetadataList()}
        fieldConfigs={this.props.fields}
        onlyFillable
        controlPanel={
          <Box direction={'row'} justify={'center'} gap="small" pad={{ top: 'small' }}>
            <Button type="submit" primary label="Create" />
          </Box>
        }
      />
    );
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

  renderSecondaryFiltersLayer() {
    return (
      <Layer
        onEsc={() => this.setState({ filterEdit: false })}
        onClickOutside={() => this.setState({ filterEdit: false })}
        full="vertical"
        position="right">
        <Box direction={'column'} pad={'medium'} width={'30vw'} overflow="auto" gap={'medium'}>
          <Box width={'100%'} justify={'between'} direction={'row'}>
            <Heading level={2}>Filters</Heading>
            <Button icon={<Close />} hoverIndicator onClick={() => this.setState({ filterEdit: false })} />
          </Box>
          <Box overflow={'auto'}>
            <Form
              value={this.state.filterValue}
              onChange={(newValue) => {
                const fieldsNames = Object.keys(newValue);

                const res = fieldsNames.flatMap((key, index) => {
                  const condition = [key, 'co', newValue[key]];

                  return index + 1 === fieldsNames.length ? [condition] : [condition, 'AND'];
                });

                const actionGetItemsParams = this.state.actionGetItemsParams;
                actionGetItemsParams.filter = res;

                this.setState({
                  filterValue: newValue,
                  actionGetItemsParams: actionGetItemsParams
                });
                this.reloadData();
              }}>
              {this.renderFormFields(
                this.props.fields.filter((field) => {
                  return field.filter !== undefined && field.filter !== false;
                })
              )}
            </Form>
          </Box>
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
        {this.state.create !== null && this.renderManipulateLayer(this.renderCreateForm())}
        {this.state.filterEdit && this.renderSecondaryFiltersLayer()}
        <Box pad={'small'} height={'100%'} width={'100%'} justify={'between'} gap={'small'}>
          <Box width={'100%'} direction={'row'} justify={'between'}>
            <Button
              icon={<Filter />}
              onClick={() => {
                this.setState({ filterEdit: true });
              }}
            />
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
