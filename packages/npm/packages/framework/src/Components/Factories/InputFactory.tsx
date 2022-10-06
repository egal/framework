import * as React from 'react';
import { CheckBox, TextInput } from 'grommet';

export type InputFactoryProps = {
  name: string;
  renderType: string;
  enabled: boolean;
  render?: () => React.ReactElement;
};

export function InputFactory({
  name,
  renderType,
  render,
  enabled,
}: InputFactoryProps) {
  if (render) {
    return render();
  }

  switch (renderType) {
    case 'checkbox':
    case 'boolean':
    case 'toggle':
      return (
        <CheckBox
          id={name}
          name={name}
          toggle={renderType === 'toggle'}
          disabled={!enabled}
        />
      );
    default:
      return <TextInput id={name} name={name} disabled={!enabled} />;
  }
}
