import * as React from 'react';
import {
  ColumnConfig as GrommetColumnConfig,
  DataTable as GrommetDataTable,
  DataTableExtendedProps
} from 'grommet/components/DataTable';
import { DataProvider } from '../../Providers/DataProvider';

interface ColumnConfig<TRowType = any> extends GrommetColumnConfig<TRowType> {
  someone?: undefined;
}

interface Props<TRowType = any> extends DataTableExtendedProps<TRowType> {
  modelName: string;
  serviceName: string;
  data?: undefined;
  columns?: ColumnConfig<TRowType>[];
}

type State = {
  items: object[];
};

export class DataTable extends React.Component<Props, State> {
  state = {
    items: []
  };

  componentDidMount() {
    new DataProvider(this.props.serviceName, this.props.modelName)
      .getItems({
        pagination: {
          per_page: 10,
          page: 1
        }
      })
      .then((res) => {
        this.setState({ items: res.items });
      });
  }

  render() {
    return React.createElement(GrommetDataTable, {
      ...this.props,
      data: this.state.items,
      paginate: true,
      key: Date.now() // TODO: Crutch.
    });
  }
}
