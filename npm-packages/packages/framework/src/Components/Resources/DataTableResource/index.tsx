import * as React from 'react';
import {
  ColumnConfig as GrommetColumnConfig,
  DataTable as GrommetDataTable,
} from 'grommet/components/DataTable';
import {
  ActionError,
  ActionGetItemsParams,
  ActionGetItemsResult,
  DataProvider,
} from '../../../DataProvider';
import {
  Box as GrommetBox,
  Button as GrommetButton,
  CheckBox as GrommetCheckBox,
  Heading as GrommetHeading,
  Layer as GrommetLayer,
  Pagination as GrommetPagination,
  Paragraph as GrommetParagraph,
  Spinner as GrommetSpinner,
} from 'grommet';
import {
  Close as GrommetCloseIcon,
  StatusWarning as GrommetStatusWarningIcon,
  Filter as GrommetFilterIcon,
} from 'grommet-icons';
import {
  ServerFieldMetadata as FieldMetadata,
  ServerModelMetadata as ModelMetadata,
} from '../../../Metadata';
import { InputConfig } from '../../../Widgets';
import { Form } from '../../../Widgets/Form/Form';

// TODO: Implementation of primary and secondary filters.
type FilterConfig = {
  primary?: boolean;
  secondary?: boolean;
};

interface FieldConfig {
  name: string;
  header: string;
  renderType?: 'boolean' | 'checkbox' | 'toggle';
  renderDataTable?: (datum: any) => React.ReactNode;
  formInputEnabled?: boolean;
  renderFormInput?: (entity: any) => React.ReactElement; // TODO: Нормальные параметры.
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
    originalAttributes: any;
  };
  create: null | {
    attributes: any;
  };
  modelMetadata: null | ModelMetadata; // TODO: Make not nullable.
  undefinedErrorDetected: boolean;
  filterEdit: boolean;
  filterValue: any;
};

export class DataTableResource extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    fields: [],
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
        page: 1,
      },
    },
  };

  constructor(props: Props) {
    super(props);

    this.dataTableOnClickRowCallback =
      this.dataTableOnClickRowCallback.bind(this);
    this.paginationOnChangeCallback =
      this.paginationOnChangeCallback.bind(this);
    this.manipulateLayerOnCloseCallback =
      this.manipulateLayerOnCloseCallback.bind(this);
    this.editFormOnSubmitCallback = this.editFormOnSubmitCallback.bind(this);
    this.editFormOnResetCallback = this.editFormOnResetCallback.bind(this);
    this.editFormOnChangeCallback = this.editFormOnChangeCallback.bind(this);
    this.editFormOnDeleteCallback = this.editFormOnDeleteCallback.bind(this);
    this.createButtonOnClickCallback =
      this.createButtonOnClickCallback.bind(this);
    this.createFromOnChangeCallback =
      this.createFromOnChangeCallback.bind(this);
    this.createFromOnSubmitCallback =
      this.createFromOnSubmitCallback.bind(this);
    this.transformFieldConfigToInputConfig =
      this.transformFieldConfigToInputConfig.bind(this);
    this.closeEditFilterLayerCallback =
      this.closeEditFilterLayerCallback.bind(this);
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
      ...this.state.modelMetadata.fake_fields,
    ].find((field: FieldMetadata): boolean => field.name === name);

    if (result === undefined) {
      throw new Error('Field not found!');
    }

    return result;
  }

  paginationOnChangeCallback({ page }: { page: number }): void {
    this.actionGetItems({
      pagination: { per_page: this.props.perPage, page: page },
    });
  }

  reloadData(): void {
    this.actionGetItems(this.state.actionGetItemsParams);
  }

  manipulateLayerOnCloseCallback() {
    this.setState({
      edit: null,
      create: null,
    });
  }

  renderUndefinedError() {
    return (
      <GrommetLayer full animation="fadeIn">
        <GrommetBox fill background="light-1" align="center" justify="center">
          <GrommetStatusWarningIcon size={'xlarge'} color={'dark-1'} />
          <GrommetHeading color={'dark-1'}>
            Что-то пошло не так...
          </GrommetHeading>
          <GrommetParagraph size="large">
            Обратитесь в тех поддержку!
          </GrommetParagraph>
        </GrommetBox>
      </GrommetLayer>
    );
  }

  renderLoader() {
    return (
      <GrommetBox
        height={'100%'}
        width={'100%'}
        align={'center'}
        justify={'center'}
      >
        <GrommetSpinner size={'large'} />
      </GrommetBox>
    );
  }

  dataTableOnClickRowCallback({ datum }: { datum: any }) {
    this.setState({
      edit: {
        attributes: datum,
        originalAttributes: datum,
      },
    });
  }

  createButtonOnClickCallback() {
    this.setState({
      create: {
        attributes: null,
      },
    });
  }

  renderDataTable() {
    // TODO: How to get rid of next `if`?
    if (this.state.items === null) {
      throw new Error();
    }

    const columns: GrommetColumnConfig<any>[] = this.props.fields.map(
      (field): GrommetColumnConfig<any> => {
        const render = (() => {
          const fieldMetadata = this.getFieldMetadata(field.name);
          const renderType = field.renderType ?? fieldMetadata.type;

          switch (renderType) {
            case 'boolean':
            case 'checkbox':
            case 'toggle':
              // TODO: Disabled выглядит не круто, а без него при наведение подсветка срабатывает.
              return (datum: any): React.ReactElement => (
                <GrommetCheckBox
                  checked={datum[field.name]}
                  toggle={renderType === 'toggle'}
                />
              );
            default:
              return undefined;
          }
        })();

        return {
          property: field.name,
          header: field.header,
          render: field.renderDataTable ?? render,
          ...field.dataTableColumnAdditionalProps,
        };
      }
    );

    return React.createElement(GrommetDataTable, {
      fill: true,
      pin: true,
      data: this.state.items.items,
      onClickRow: this.dataTableOnClickRowCallback,
      resizeable: true,
      key: Date.now(), // TODO: Crutch.
      columns: columns,
    });
  }

  renderPagination() {
    if (this.state.items === null) {
      throw new Error();
    }

    return (
      <GrommetPagination
        onChange={this.paginationOnChangeCallback}
        page={this.state.items.current_page}
        step={this.state.items.per_page}
        numberItems={this.state.items.total_count}
      />
    );
  }

  editFormOnChangeCallback(newValue: any) {
    if (this.state.edit === null) {
      throw new Error();
    }

    this.setState({
      edit: {
        attributes: newValue,
        originalAttributes: this.state.edit.originalAttributes,
      },
    });
  }

  editFormOnResetCallback() {
    if (this.state.edit === null) {
      throw new Error();
    }

    this.setState({
      edit: {
        attributes: this.state.edit.originalAttributes,
        originalAttributes: this.state.edit.originalAttributes,
      },
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
      });
  }

  renderEditForm() {
    if (this.state.edit === null) {
      throw new Error();
    }

    return (
      <Form
        resettable
        submittable
        entity={this.state.edit.attributes}
        fields={this.props.fields.map(this.transformFieldConfigToInputConfig)}
        onChange={this.editFormOnChangeCallback}
        onReset={this.editFormOnResetCallback}
      />
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
        this.setState({ create: null });
        this.reloadData();
      });
  }

  transformFieldConfigToInputConfig(field: FieldConfig): InputConfig {
    const fieldMetadata = this.getFieldMetadata(field.name);
    return {
      name: field.name,
      header: field.header,
      renderType: field.renderType ?? fieldMetadata.type,
      render: field.renderFormInput ?? undefined,
      enabled:
        field.formInputEnabled ??
        ((field.formInputEnabled === undefined || field.formInputEnabled) &&
          !fieldMetadata.guarded),
    };
  }

  renderCreateForm() {
    if (this.state.create === null) {
      throw new Error();
    }

    return (
      <Form
        resettable
        submittable
        entity={{}}
        fields={this.props.fields
          .filter((field) => !this.getFieldMetadata(field.name).guarded)
          .map(this.transformFieldConfigToInputConfig)}
        onChange={this.createFromOnChangeCallback}
        onReset={this.createFromOnSubmitCallback}
      />
    );
  }

  renderManipulateLayer(child: React.ReactElement) {
    return (
      <GrommetLayer
        onEsc={this.manipulateLayerOnCloseCallback}
        onClickOutside={this.manipulateLayerOnCloseCallback}
        margin={'small'}
      >
        <GrommetBox pad={'medium'} width={'30vw'} overflow="auto">
          <GrommetBox align={'end'}>
            <GrommetButton
              icon={<GrommetCloseIcon />}
              hoverIndicator
              onClick={this.manipulateLayerOnCloseCallback}
            />
          </GrommetBox>
          {child}
        </GrommetBox>
      </GrommetLayer>
    );
  }

  closeEditFilterLayerCallback() {
    this.setState({ filterEdit: false });
  }

  renderSecondaryFiltersLayer() {
    return (
      <GrommetLayer
        onEsc={this.closeEditFilterLayerCallback}
        onClickOutside={this.closeEditFilterLayerCallback}
        full="vertical"
        position="right"
      >
        <GrommetBox
          direction={'column'}
          pad={'medium'}
          width={'30vw'}
          overflow="auto"
          gap={'medium'}
        >
          <GrommetBox width={'100%'} justify={'between'} direction={'row'}>
            <GrommetHeading level={2}>Filters</GrommetHeading>
            <GrommetButton
              icon={<GrommetCloseIcon />}
              hoverIndicator
              onClick={this.closeEditFilterLayerCallback}
            />
          </GrommetBox>
          <GrommetBox overflow={'auto'}>
            <Form
              entity={this.state.filterValue}
              fields={this.props.fields
                .filter((field) => {
                  return field.filter !== undefined && field.filter !== false;
                })
                .map(this.transformFieldConfigToInputConfig)}
              value={this.state.filterValue}
              onChange={(newValue) => {
                const fieldsNames = Object.keys(newValue);

                const res = fieldsNames.flatMap((key, index) => {
                  const condition = [key, 'co', newValue[key]];

                  return index + 1 === fieldsNames.length
                    ? [condition]
                    : [condition, 'AND'];
                });

                const actionGetItemsParams = this.state.actionGetItemsParams;
                actionGetItemsParams.filter = res;

                this.setState({
                  filterValue: newValue,
                  actionGetItemsParams: actionGetItemsParams,
                });
                this.reloadData();
              }}
            ></Form>
          </GrommetBox>
        </GrommetBox>
      </GrommetLayer>
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
        {this.state.edit !== null &&
          this.renderManipulateLayer(this.renderEditForm())}
        {this.state.create !== null &&
          this.renderManipulateLayer(this.renderCreateForm())}
        {this.state.filterEdit && this.renderSecondaryFiltersLayer()}
        <GrommetBox
          pad={'small'}
          height={'100%'}
          width={'100%'}
          justify={'between'}
          gap={'small'}
        >
          <GrommetBox width={'100%'} direction={'row'} justify={'between'}>
            <GrommetButton
              icon={<GrommetFilterIcon />}
              onClick={() => {
                this.setState({ filterEdit: true });
              }}
            />
            <GrommetButton
              label={'Create'}
              onClick={this.createButtonOnClickCallback}
            />
          </GrommetBox>
          <GrommetBox height={'100%'} width={'100%'} overflow="auto">
            {this.renderDataTable()}
          </GrommetBox>
          <GrommetBox justify={'between'} direction={'row'}>
            <GrommetBox />
            {this.renderPagination()}
            <GrommetBox>Total: {this.state.items.total_count}</GrommetBox>
          </GrommetBox>
        </GrommetBox>
      </>
    );
  }
}
