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
  Menu
} from 'grommet';
import { Close, StatusWarning, MoreVertical, Edit, Trash } from 'grommet-icons';

interface ColumnConfig<TRowType = any> extends GrommetColumnConfig<TRowType> {
  someone?: undefined;
}

interface Props<TRowType = any> {
  modelName: string;
  serviceName: string;
  perPage: number;
  columns: ColumnConfig<TRowType>[];
  keyFieldName: string;
}

type State = {
  items: null | ActionGetItemsResult;
  edit: null | {
    attributes: any;
    originalAttributes: any;
  };
  create: null | {
    attributes: any;
  };
  undefinedErrorDetected: boolean;
  chooseActionContextMenu:
    | false
    | {
        datum: any;
        clickXPosition: number;
        clickYPosition: number;
      };
};

export class DataTable extends React.Component<Props, State> {
  static defaultProps: Props | any = {
    columns: []
  };

  state: State = {
    items: null, // TODO: Make without nullable, with await call in constructor.
    edit: null,
    create: null,
    undefinedErrorDetected: false,
    chooseActionContextMenu: false
  };

  constructor(props: Props) {
    super(props);

    this.reloadData = this.reloadData.bind(this);
    this.openEditForm = this.openEditForm.bind(this);
    this.paginationOnChangeCallback = this.paginationOnChangeCallback.bind(this);
    this.manipulateLayerOnCloseCallback = this.manipulateLayerOnCloseCallback.bind(this);
    this.editFormOnSubmitCallback = this.editFormOnSubmitCallback.bind(this);
    this.editFormOnResetCallback = this.editFormOnResetCallback.bind(this);
    this.editFormOnChangeCallback = this.editFormOnChangeCallback.bind(this);
    this.editFormOnDeleteCallback = this.editFormOnDeleteCallback.bind(this);
  }

  componentDidMount(): void {
    this.actionGetItems({ pagination: { per_page: this.props.perPage, page: 1 } });
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

  openEditForm({ datum }: { datum: any }) {
    this.setState({
      edit: {
        attributes: datum,
        originalAttributes: datum
      }
    });
  }

  manipulateLayerOnCloseCallback() {
    this.setState({
      edit: null,
      create: null
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

  renderDataTable() {
    // TODO: How to get rid of next `if`?
    if (this.state.items === null) {
      throw new Error();
    }

    return React.createElement(GrommetDataTable, {
      fill: true,
      pin: true,
      data: this.state.items.items,
      onClickRow: this.openEditForm,
      resizeable: true,
      key: Date.now(), // TODO: Crutch.
      columns: this.props.columns
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

  renderFormFields() {
    return (
      <>
        {this.props.columns.map((colum: ColumnConfig, key: number) => {
          return (
            <FormField name={colum.property} htmlFor={colum.property} label={`${colum.header}`} key={key}>
              <TextInput id={colum.property} name={colum.property} />
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
      }
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
        value={this.state.edit.attributes}
        onChange={this.editFormOnChangeCallback}
        onReset={this.editFormOnResetCallback}
        onSubmit={this.editFormOnSubmitCallback}>
        {this.renderFormFields()}
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
      <Box pad={'small'} height={'100%'} width={'100%'} justify={'between'}>
        <Box height={'100%'} width={'100%'} overflow="auto">
          {this.renderDataTable()}
        </Box>
        <Box justify={'between'} pad={{ top: 'small' }} direction={'row'}>
          <Box />
          {this.renderPagination()}
          <Box>Total: {this.state.items.total_count}</Box>
        </Box>
        {this.state.edit !== null && this.renderManipulateLayer(this.renderEditForm())}
      </Box>
    );
  }
}
