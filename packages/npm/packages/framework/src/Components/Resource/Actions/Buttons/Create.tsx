import * as React from 'react';
import { Box, Button } from 'grommet';
import { useResourceContext } from '../../Resource';
import { ButtonExtendedProps } from 'grommet/components/Button';

export type CreateButtonProps = Pick<ButtonExtendedProps, 'label'>;

export function CreateButton({ label = 'Create' }: CreateButtonProps) {
  const {
    manipulates: { creating: manipulate },
  } = useResourceContext();

  return (
    <Button
      label={label}
      primary
      color={'status-ok'}
      onClick={() => manipulate.enable({})}
    />
  );
}
