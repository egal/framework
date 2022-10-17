import * as React from 'react';
import { Delete } from './Delete';
import { Update } from './Update';
import { useResourceContext } from '../../Resource';
import { Button } from 'grommet';
import { ButtonExtendedProps } from 'grommet/components/Button';

type Props = Omit<
  ButtonExtendedProps,
  'label' | 'color' | 'primary' | 'onClick'
>;

export function Show({ ...props }: Props) {
  const {
    selectedKeys,
    manipulates: { showing },
  } = useResourceContext();
  const active = selectedKeys.value.length === 1;

  return (
    <Button
      label={'Show'}
      color={active ? 'brand' : undefined}
      primary={active}
      disabled={!active}
      onClick={() => showing.enable(selectedKeys.getSelectedEntity())}
    />
  );
}
