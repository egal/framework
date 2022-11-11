import * as React from 'react';

import {
  Box,
  DataTable as GrommetDataTable,
  Spinner,
  Heading,
  CheckBox,
} from 'grommet';
import {
  ColumnConfig as GColumnConfig,
  DataTableProps as GDataTableProps,
} from 'grommet/components/DataTable';
import { useResourceContext } from './Resource';
import { Clear } from 'grommet-icons';
import { sentenceCase } from 'change-case';
import { useTranslation } from 'react-i18next';

type ColumnConfig<DataItemType> = GColumnConfig<DataItemType> & {
  exclude?: boolean;
};

type Props<DataItemType> = Omit<
  GDataTableProps<DataItemType>,
  'data' | 'select' | 'onClickRow' | 'onSelect' | 'primaryKey' | 'columns'
> & {
  columns?: ColumnConfig<DataItemType>[];
};

export function DataTable<DataItemType = any>({
  columns: columnsProp = [{ property: '*' }],
  ...props
}: Props<DataItemType>) {
  const {
    model: { name: model, service },
    resource,
    selectedKeys,
    extensions,
    manipulates,
    translation: { t },
  } = useResourceContext();

  if (!resource.metadata.result || !resource.getItems.result) {
    return <Spinner />;
  }

  const usedColumnsProperties: string[] = columnsProp
    .filter((column) => column.property !== '*')
    .map((column): string => column.property);

  const allFields = resource.metadata.getAllFields();

  const columns: GColumnConfig<DataItemType>[] = columnsProp
    .flatMap((column): ColumnConfig<DataItemType>[] => {
      if (column.property !== '*') return [column];

      return allFields
        .filter((field) => !usedColumnsProperties.includes(field.name))
        .map((field) => {
          return { property: field.name };
        });
    })
    .filter((column) => (column.exclude === undefined ? true : !column.exclude))
    .map((column): GColumnConfig<DataItemType> => {
      if (column.header === undefined) {
        column.header = t(`fields.${column.property}`, {
          defaultValue: sentenceCase(column.property),
        });
      }

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

  const selectingProps: Partial<GDataTableProps> = (() => {
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
        return {
          select: selectedKeys.value,
          onClickRow: 'select',
          onSelect: (newSelectedKeys) => selectedKeys.set(newSelectedKeys),
        };
      case [true, false, false].join():
        return {
          onClickRow: ({ datum }) => manipulates.showing.enable(datum),
        };
      case [false, true, false].join():
        return {
          onClickRow: ({ datum }) => manipulates.updating.enable(datum),
        };
      case [false, false, false].join():
      default:
        return {};
    }
  })();

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
