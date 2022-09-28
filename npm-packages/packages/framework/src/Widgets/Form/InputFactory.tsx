import * as React from 'react';
import { CheckBox, TextInput } from 'grommet';

export type InputConfig<EntityType = any> = {
  name: string;
  header: string;
  renderType: string;
  render?: (entity: EntityType) => React.ReactElement;
  enabled: boolean;
};

type Props<EntityType = any> = {
  input: InputConfig<EntityType>;
  entity: EntityType;
};

export function InputFactory<EntityType = any>({
  input,
  entity,
}: Props<EntityType>) {
  if (input.render) {
    return input.render(entity);
  }

  switch (input.renderType) {
    case 'checkbox':
    case 'boolean':
    case 'toggle':
      return (
        <CheckBox
          name={input.name}
          toggle={input.renderType === 'toggle'}
          disabled={!input.enabled}
        />
      );
    default:
      return (
        <TextInput
          id={input.name}
          name={input.name}
          disabled={!input.enabled}
          value={entity[input.name]}
        />
      );
  }
}
