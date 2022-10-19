import * as React from 'react';

import {
  Box,
  DataTable as GrommetDataTable,
  Spinner,
  Keyboard,
  Text,
  Heading,
} from 'grommet';
import { DataTableProps } from 'grommet/components/DataTable';
import { useResourceContext } from './Resource';
import { Clear } from 'grommet-icons';
import { useEffect } from 'react';

type Props = Omit<
  DataTableProps,
  'data' | 'select' | 'onClickRow' | 'onSelect' | 'primaryKey'
> & {
  //
};

export function DataTable(props: Props) {
  const { resource, selectedKeys, extensions } = useResourceContext();
  let selectingProps: Partial<DataTableProps> = {};

  // TODO: Not working disabling select.
  // useEffect(() => {
  //   if (
  //     extensions.showing.exists ||
  //     extensions.updating.exists ||
  //     extensions.deleting.exists
  //   ) {
  selectingProps = {
    select: selectedKeys.value,
    onClickRow: 'select',
    onSelect: (newSelectedKeys) => selectedKeys.set(newSelectedKeys),
  };
  //   }
  // }, [
  //   extensions.showing.exists,
  //   extensions.updating.exists,
  //   extensions.deleting.exists,
  // ]);

  if (
    !resource.metadata.result ||
    !resource.getItems.result ||
    !selectingProps
  ) {
    return <Spinner />;
  }

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
        <GrommetDataTable
          fill
          pin
          {...props}
          {...selectingProps}
          primaryKey={resource.metadata.result.primary_key.name}
          data={resource.getItems.result.items}
        />
      </Box>
    </Box>
  );
}
