import * as React from 'react';
import { CheckBox as GrommetCheckBox, Text } from 'grommet';

type RenderType = string | 'boolean' | 'checkbox' | 'toggle';

export type DataTableCellFactoryConfig<ValueType = any> = {
  value: ValueType;
  renderType: RenderType;
};

export function DataTableCellFactory<ValueType = any>({
  value,
  renderType,
}: DataTableCellFactoryConfig<ValueType>): React.ReactElement {
  switch (renderType) {
    case 'boolean':
    case 'checkbox':
    case 'toggle': {
      // TODO: Disabled выглядит не круто, а без него при наведение подсветка срабатывает.
      return (
        <GrommetCheckBox
          checked={value as boolean}
          toggle={renderType === 'toggle'}
        />
      );
    }
    default:
      return <Text>{value as string}</Text>;
  }
}
