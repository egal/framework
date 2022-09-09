import * as React from 'react';
import NumberViewWidget from '../Widgets/NumberViewWidget';
import StringViewWidget from '../Widgets/StringViewWidget';
import TableColumnType from '../Types/TableColumnType';
import axios from 'axios';
import { DataProvider } from '../Providers/DataProvider';
import { Box, DataTable, Meter, Text } from 'grommet';

type Props = {
  header?: string;
  serviceName: string;
  modelName: string;
  columns: TableColumnType[];
};

type State = {
  items: object[];
};

export default class Table extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { items: [] };
  }

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
    const columnsProps = this.props.columns.map((column: TableColumnType): TableColumnType => {
      const props: TableColumnType = Object.assign({}, column);

      if (props.viewWidget === undefined) {
        switch (props.type) {
          case 'number':
            props.viewWidget = NumberViewWidget;
            break;
          case 'string':
            props.viewWidget = StringViewWidget;
            break;
        }
      }

      return props;
    });

    const tableHeader = (
      <tr>
        {columnsProps.map((columnProps: TableColumnType, index: number) => {
          return <th key={index}>{columnProps.header}</th>;
        })}
        <th>Actions</th>
      </tr>
    );

    const tableBody = this.state.items.map((item, index: number) => {
      return (
        <tr key={index}>
          {columnsProps.map((columnProps: TableColumnType, index: number) => {
            return (
              <td key={index}>
                {React.createElement(columnProps.viewWidget, {}, item[columnProps.field as keyof object])}
              </td>
            );
          })}
          <td>
            <button>Edit</button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        {this.props.header && <h1>{this.props.header}</h1>}
        <table>
          <thead>{tableHeader}</thead>
          <tbody>{tableBody}</tbody>
        </table>
      </div>
    );
  }
}
