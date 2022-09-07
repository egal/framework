import * as React from 'react';
import NumberViewWidget from '../Widgets/NumberViewWidget';
import StringViewWidget from '../Widgets/StringViewWidget';
import TableColumnType from '../Types/TableColumnType';
import { faker } from '@faker-js/faker';

type Props = {
  header?: string;
  modelName: string;
  columns: TableColumnType[];
};

type State = {
  bool: boolean;
};

export default class Table extends React.Component<Props, State> {
  render() {
    const data: any[] = [];

    Array.from({ length: 10 }).forEach(() =>
      data.push({
        id: faker.datatype.number(),
        age: faker.datatype.number({ min: 0, max: 100 }),
        username: faker.internet.userName(),
        first_name: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past()
      })
    );

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

    const tableHeaders = columnsProps.map((columnProps: TableColumnType, index: number) => {
      return <th key={index}>{columnProps.header}</th>;
    });

    tableHeaders.push(<th>Actions</th>);

    const tableData = data.map((dataRow, index: number) => {
      return (
        <tr key={index}>
          {columnsProps.map((columnProps: TableColumnType, index: number) => {
            return (
              <td key={index}>
                {React.createElement(
                  columnProps.viewWidget,
                  {},
                  dataRow[columnProps.modelFieldPath as keyof object]
                )}
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
        {this.props.header === null ? null : <h1>{this.props.header}</h1>}
        <table>
          <tr>{tableHeaders}</tr>
          {tableData}
        </table>
      </div>
    );
  }
}
