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
import { useEffect, useState } from 'react';

type Props = Omit<
  DataTableProps,
  'data' | 'select' | 'onClickRow' | 'onSelect' | 'primaryKey'
> & {
  //
};

export function DataTable(props: Props) {
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
