import * as React from 'react';
import {
  ColumnConfig as GrommetColumnConfig,
  DataTable as GrommetDataTable,
  DataTableProps,
} from 'grommet/components/DataTable';
import { ViewFactory, ViewFactoryProps } from '../../Components/Factories';

export type FieldConfig<EntityType = any> = Omit<ViewFactoryProps, 'value'> & {
  name: string;
  header: string;
  render?: (datum: EntityType) => React.ReactNode;
} & Omit<GrommetColumnConfig<EntityType>, 'header' | 'render' | 'property'>;

export type DataTableConfig<EntityType = any> = {
  entities: EntityType[];
  fields: FieldConfig<EntityType>[];
} & DataTableProps<EntityType>;

export function DataTable<EntityType = any>({
  fields,
  entities,
  ...grommetDataTableProps
}: DataTableConfig<EntityType>) {
  const columns: GrommetColumnConfig<EntityType>[] = fields.map(
    ({
      render: customRender,
      renderType,
      header,
      name,
      ...grommetProps
    }): GrommetColumnConfig<EntityType> => {
      const render = (datum: EntityType) => (
        <ViewFactory renderType={renderType} value={datum[name]} />
      );

      return {
        property: name,
        header: header,
        render: customRender ?? render,
        ...grommetProps,
      };
    }
  );

  return React.createElement(GrommetDataTable, {
    fill: true,
    pin: true,
    data: entities,
    // TODO: onClickRow
    // onClickRow: this.dataTableOnClickRowCallback,
    columns: columns,
    ...grommetDataTableProps,
  });
}
