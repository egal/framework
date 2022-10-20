import * as React from 'react';
import { useResourceContext } from '../../Resource';
import { Button } from 'grommet';
import { ButtonExtendedProps } from 'grommet/components/Button';

export type ShowSelectedButtonProps = Pick<ButtonExtendedProps, 'label'>;

export function ShowSelectedButton({
  label = 'Show',
}: ShowSelectedButtonProps) {
  const {
    selectedKeys,
    manipulates: { showing },
  } = useResourceContext();
  const active = selectedKeys.value.length === 1;

  return (
    <Button
      label={label}
      color={active ? 'brand' : undefined}
      primary={active}
      disabled={!active}
      onClick={() => showing.enable(selectedKeys.getSelectedEntity())}
    />
  );
}
