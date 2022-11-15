import * as React from 'react';
import { CheckBox } from 'grommet';
import { useResourceCardContext } from './useResourceCardContext';

export function Selector() {
  const { selected, changeSelecting } = useResourceCardContext();

  return <CheckBox checked={selected} onChange={changeSelecting} />;
}
