import * as React from 'react';
import { ColumnConfig, DataTable as GrommetDataTable, DataTableExtendedProps } from 'grommet/components/DataTable';
import { DataProvider, GetItemsResult } from '../../Providers/DataProvider';
import { Box, Meter, Text } from 'grommet';

interface Props extends DataTableExtendedProps {
  modelName: string;
  serviceName: string;
  data?: undefined;
}
type State = {
  items: [];
};

export class DataTable extends React.Component<Props, State> {
  state: State = {
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
    console.log(this.state.items);
    return React.createElement(GrommetDataTable, {
      ...this.props,
      data: this.state.items,
      paginate: true
    });
  }
}
