import {
  List,
  TextField,
  TagField,
  DateField,
  Table,
  NumberField,
  useTable,
  useSelect,
  FilterDropdown,
  Select,
} from "@pankod/refine-antd";
import { IMovement } from "../../interfaces/Product";
import ReactJson from "react-json-view";
import { Includes } from "@egal/refine-laravel-orion";

export const MovementList: React.FC = () => {
  const includes: Includes = [
    //
    { relation: "product" },
  ];

  const { tableProps } = useTable<IMovement>({
    //
    metaData: { includes },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="product_id" title="Product ID" />
        <Table.Column dataIndex={["product", "name"]} title="Product" />
        <Table.Column
          dataIndex="status"
          title="Status"
          render={(value) => <TagField value={value} />}
        />
        <Table.Column
          dataIndex="type"
          title="Type"
          render={(value) => <TagField value={value} />}
        />
        <Table.Column
          dataIndex="count"
          title="Count"
          render={(value) => <NumberField value={value} />}
        />
        <Table.Column
          dataIndex="metadata"
          title="Metadata"
          render={(value) => <ReactJson src={value} />}
        />
      </Table>
    </List>
  );
};
