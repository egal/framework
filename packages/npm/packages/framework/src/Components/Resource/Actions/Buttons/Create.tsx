import * as React from 'react';
import { Box, Button } from 'grommet';
import { useResourceContext } from '../../Resource';

type Props = {};

export function Create(props: Props) {
  const {
    resource,
    manipulates: { creating: manipulate },
  } = useResourceContext();

  return (
    <Button
      label={'Create'}
      primary
      color={'status-ok'}
      onClick={() => manipulate.enable({ weight: '' })}
    />
  );
}
