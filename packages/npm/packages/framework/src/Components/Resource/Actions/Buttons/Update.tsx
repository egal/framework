import * as React from 'react';
import { useResourceContext } from '../../Resource';
import { ButtonExtendedProps } from 'grommet/components/Button';
import { MouseEventHandler } from 'react';
import { Button } from 'grommet';

type Props = Omit<
  ButtonExtendedProps,
  'label' | 'color' | 'primary' | 'onClick'
> & {
  onClick:
    | 'update-selected'
    | 'update-showing'
    | MouseEventHandler<any>
    | undefined;
};

export function Update({ onClick, ...props }: Props) {
  const {
    manipulates: { updating, showing },
  } = useResourceContext();

  const { selectedKeys } = useResourceContext();

  const newProps: ButtonExtendedProps = {};

  if (onClick === 'update-selected') {
    newProps.disabled = !(selectedKeys.value.length === 1);
    newProps.onClick = () => updating.enable(selectedKeys.getSelectedEntity());
  } else if (onClick === 'update-showing') {
    newProps.disabled = false;
    newProps.onClick = () => {
      const entity = { ...showing.entity };
      showing.disable(); // TODO: May be not?
      updating.enable(entity);
    };
  } else {
    newProps.onClick = onClick;
  }

  return (
    <Button
      label={'Update'}
      color={!newProps.disabled ? 'status-warning' : undefined}
      primary={!newProps.disabled}
      disabled={newProps.disabled}
      {...newProps}
      {...props}
    />
  );
}

export function UpdateSelected(props: Omit<Props, 'onClick'>) {
  return <Update onClick={'update-selected'} {...props} />;
}

export function UpdateShowing(props: Omit<Props, 'onClick'>) {
  return <Update onClick={'update-showing'} {...props} />;
}
