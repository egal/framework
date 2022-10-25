import * as React from 'react';

import {
  Box,
  DataTable as GrommetDataTable,
  Spinner,
  Keyboard,
  Text,
  Heading,
  CheckBox,
} from 'grommet';
import { ColumnConfig, DataTableProps } from 'grommet/components/DataTable';
import { useResourceContext } from './Resource';
import { Clear } from 'grommet-icons';
import { useEffect, useState } from 'react';
import { ServerModelFieldMetadata } from '../../Hooks';
import { sentenceCase } from 'change-case';

type Props<DataItemType> = Omit<
  DataTableProps,
  'data' | 'select' | 'onClickRow' | 'onSelect' | 'primaryKey'
>;

export function DataTable<DataItemType = any>({
  columns: columnsProp = [{ property: '*' }],
  ...props
}: Props<DataItemType>) {
  const { resource, selectedKeys, extensions, manipulates } =
    useResourceContext();
  const [selectingProps, setSelectingProps] = useState<Partial<DataTableProps>>(
    {}
  );

  useEffect(() => {
    switch (
      [
        extensions.showing.exists,
        extensions.updating.exists,
        extensions.deleting.exists,
      ].join()
    ) {
      case [true, true, true].join():
      case [false, true, true].join():
      case [true, false, true].join():
      case [true, true, false].join():
      case [false, false, true].join():
        setSelectingProps({
          select: selectedKeys.value,
          onClickRow: 'select',
          onSelect: (newSelectedKeys) => selectedKeys.set(newSelectedKeys),
        });
        break;
      case [true, false, false].join():
        setSelectingProps({
          onClickRow: ({ datum }) => manipulates.showing.enable(datum),
        });
        break;
      case [false, true, false].join():
        setSelectingProps({
          onClickRow: ({ datum }) => manipulates.updating.enable(datum),
        });
        break;
      case [false, false, false].join():
        break;
    }
  }, [
    extensions.showing.exists,
    extensions.updating.exists,
    extensions.deleting.exists,
  ]);

  if (
    !resource.metadata.result ||
    !resource.getItems.result ||
    !selectingProps
  ) {
    return <Spinner />;
  }

  const usedColumnsProperties: string[] = columnsProp
    .filter((column) => column.property !== '*')
    .map((column): string => column.property);

  const allFields = resource.metadata.getAllFields();

  const columns: ColumnConfig<DataItemType>[] = columnsProp
    .flatMap((column): ColumnConfig<DataItemType>[] => {
      if (column.property !== '*') return [column];

      return allFields
        .filter((field) => !usedColumnsProperties.includes(field.name))
        .map((field) => {
          return { property: field.name };
        });
    })
    .map((column): ColumnConfig<DataItemType> => {
      if (column.property.includes('.')) return column;

      if (column.render === undefined) {
        switch (resource.metadata.findField(column.property).type) {
          case 'boolean':
            column.render = (datum) => (
              <CheckBox checked={datum[column.property] as boolean} />
            );
            break;
        }
      }

      if (column.header === undefined) {
        column.header = sentenceCase(column.property);
      }

      return column;
    });

  if (resource.getItems.result.total_count === 0) {
    return (
      <Box fill justify={'center'} align={'center'}>
        <Clear size={'large'} />
        <Heading level={3}>No values!</Heading>
      </Box>
    );
  }

  return (
    <Box overflow="auto" fill justify={'start'}>
      <Box>
        <GrommetDataTable<DataItemType>
          fill
          pin
          columns={columns}
          {...props}
          {...selectingProps}
          primaryKey={resource.metadata.result.primary_key.name}
          data={resource.getItems.result.items}
        />
      </Box>
    </Box>
  );
}
