import * as React from 'react';
import {
  ColumnConfig as GrommetColumnConfig,
  DataTable as GrommetDataTable,
  DataTableExtendedProps as GrommetDataTableProps
} from 'grommet/components/DataTable';
import { ActionGetItemsParams, DataProvider, ActionGetItemsResult, ActionError } from '../../Providers/DataProvider';
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
import { strict } from 'assert';

interface ColumnConfig<TRowType = any> extends GrommetColumnConfig<TRowType> {
  someone?: undefined;
}

interface Props<TRowType = any> extends GrommetDataTableProps<TRowType> {
  modelName: string;
  serviceName: string;
  perPage: number;
  data?: undefined;
  columns: ColumnConfig<TRowType>[];
  primaryKey: string;
}

type State = {
  getItemsResult: ActionGetItemsResult | null;
  editRowEnabled: boolean;
  editableRowOriginal: null | any;
  editableRow: null | any;
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
    getItemsResult: null, // TODO: Make without nullable, with await call in constructor.
    editRowEnabled: false,
    editableRowOriginal: null,
    editableRow: null,
    undefinedErrorDetected: false,
    chooseActionContextMenu: false
  };

  constructor(props: Props) {
    super(props);

    this.changePage = this.changePage.bind(this);
    this.openEditRowForm = this.openEditRowForm.bind(this);
    this.closeEditRowForm = this.closeEditRowForm.bind(this);
    this.reloadData = this.reloadData.bind(this);
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
      .then((res) => this.setState({ getItemsResult: res }))
      .catch((error: ActionError) => {
        if (error.code === 'ERR_UNDEFINED' || error.code === 'ERR_NETWORK') {
          this.setState({ undefinedErrorDetected: true });
        }
      });
  }

  changePage({ page }: { page: number }): void {
    this.actionGetItems({ pagination: { per_page: this.props.perPage, page: page } });
  }

  reloadData(): void {
    this.actionGetItems({
      pagination: {
        per_page: this.props.perPage,
        page: this.state.getItemsResult === null ? 1 : this.state.getItemsResult.current_page
      }
    });
  }

  openEditRowForm({ datum }: { datum: any }) {
    this.setState({
      editRowEnabled: true,
      editableRow: datum,
      editableRowOriginal: datum
    });
  }

  closeEditRowForm() {
    this.setState({
      editRowEnabled: false,
      editableRow: null,
      editableRowOriginal: null
    });
  }

  render() {
    // TODO: Crutch, may be.
    if (this.state.undefinedErrorDetected) {
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

    // TODO: Crutch. DataTable placeholder prop.
    if (this.state.getItemsResult === null) {
      return (
        <Box height={'100%'} width={'100%'} align={'center'} justify={'center'}>
          <Spinner size={'large'} />
        </Box>
      );
    }

    const DataTableElement = React.createElement(GrommetDataTable, {
      fill: true,
      pin: true,
      data: this.state.getItemsResult.items,
      onClickRow: this.openEditRowForm,
      resizeable: true,
      key: Date.now(), // TODO: Crutch.
      ...this.props
    });

    const PaginationElement = (
      <Pagination
        onChange={this.changePage}
        page={this.state.getItemsResult.current_page}
        step={this.state.getItemsResult.per_page}
        numberItems={this.state.getItemsResult.total_count}
      />
    );

    const EditFormElement = this.state.editRowEnabled && (
      <Form
        value={this.state.editableRow}
        onChange={(nextValue) => this.setState({ editableRow: nextValue })}
        onReset={() => this.setState({ editableRow: this.state.editableRowOriginal })}
        onSubmit={({ value }) => {
          this.action()
            .update(value)
            .then(() => {
              this.reloadData();
              this.closeEditRowForm();
            });
        }}>
        {this.props.columns.map((colum: ColumnConfig, key: number) => {
          return (
            <FormField name={colum.property} htmlFor={colum.property} label={`${colum.header}`} key={key}>
              <TextInput id={colum.property} name={colum.property} />
            </FormField>
          );
        })}
        <Box direction={'row'} justify={'center'} gap="small" pad={{ top: 'small' }}>
          <Button type="submit" primary label="Submit" />
          <Button type="reset" label="Reset" />
        </Box>
        <Box direction={'row'} justify={'center'} gap="small" pad={{ top: 'small' }}>
          <Button
            type="button"
            label="Delete"
            color="status-error"
            onClick={() =>
              this.action()
                .delete(this.state.editableRow[this.props.primaryKey])
                .then(() => {
                  this.reloadData();
                  this.closeEditRowForm();
                })
            }
          />
        </Box>
      </Form>
    );

    const EditLayerElement = this.state.editRowEnabled && (
      <Layer onEsc={this.closeEditRowForm} onClickOutside={this.closeEditRowForm} margin={'small'}>
        <Box pad={'medium'} width={'30vw'} overflow="auto">
          <Box align={'end'}>
            <Button icon={<Close />} hoverIndicator onClick={this.closeEditRowForm} />
          </Box>
          {EditFormElement}
        </Box>
      </Layer>
    );

    return (
      <Box pad={'small'} height={'100%'} width={'100%'} justify={'between'}>
        <Box height={'100%'} width={'100%'} overflow="auto">
          {DataTableElement}
        </Box>
        <Box justify={'between'} pad={{ top: 'small' }} direction={'row'}>
          <Box />
          {PaginationElement}
          <Box>Total: {this.state.getItemsResult.total_count}</Box>
        </Box>
        {EditLayerElement}
      </Box>
    );
  }
}
