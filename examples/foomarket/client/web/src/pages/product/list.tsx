import {
  List,
  TextField,
  TagField,
  DateField,
  Table,
  NumberField,
  useTable,
} from "@pankod/refine-antd";
import { IProduct } from "../../interfaces/Product";

export const ProductList: React.FC = () => {
  const { tableProps } = useTable<IProduct>();
  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column
          dataIndex="stock_count"
          title="Stock count"
          render={(value) => <NumberField value={value} />}
        />
      </Table>
    </List>
  );
};
