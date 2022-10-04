import * as React from 'react';
import { Text, CheckBox } from 'grommet';

type RenderTypeConfig = string | 'boolean' | 'checkbox' | 'toggle';

export type ViewFactoryProps<ValueType = any> = {
  value: ValueType;
  renderType: RenderTypeConfig;
};

export function ViewFactory<ValueType = any>({
  value,
  renderType,
}: ViewFactoryProps<ValueType>): React.ReactElement {
  switch (renderType) {
    case 'boolean':
    case 'checkbox':
    case 'toggle': {
      // TODO: Disabled выглядит не круто, а без него при наведение подсветка срабатывает.
      return (
        <CheckBox checked={value as boolean} toggle={renderType === 'toggle'} />
      );
    }
    default:
      return <Text>{value as string}</Text>;
  }
}
