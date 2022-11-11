import * as React from 'react';
import { useResourceContext } from '../../Resource';
import { ButtonExtendedProps } from 'grommet/components/Button';
import { MouseEventHandler } from 'react';
import { Button } from 'grommet';

export type UpdateButtonProps = {
  onClick:
    | 'update-selected'
    | 'update-showing'
    | MouseEventHandler<any>
    | undefined;
};

export function UpdateButton({ onClick }: UpdateButtonProps) {
  const {
    manipulates: { updating, showing },
    translation: { t },
  } = useResourceContext();

  const { selectedKeys } = useResourceContext();

  const props: ButtonExtendedProps = {};

  if (onClick === 'update-selected') {
    props.disabled = !(selectedKeys.value.length === 1);
    props.onClick = () => updating.enable(selectedKeys.getSelectedEntity());
  } else if (onClick === 'update-showing') {
    props.disabled = false;
    props.onClick = () => {
      const entity = { ...showing.entity };
      showing.disable(); // TODO: May be not?
      updating.enable(entity);
    };
  } else {
    props.onClick = onClick;
  }

  return (
    <Button
      label={t('actions.update.buttons.init', { defaultValue: 'Update' })}
      color={!props.disabled ? 'status-warning' : undefined}
      primary={!props.disabled}
      disabled={props.disabled}
      {...props}
    />
  );
}

export type UpdateSelectedButtonProps = Omit<UpdateButtonProps, 'onClick'>;

export function UpdateSelectedButton(props: UpdateSelectedButtonProps) {
  return <UpdateButton onClick={'update-selected'} {...props} />;
}

export type UpdateShowingButtonProps = Omit<UpdateButtonProps, 'onClick'>;

export function UpdateShowingButton(props: UpdateShowingButtonProps) {
  return <UpdateButton onClick={'update-showing'} {...props} />;
}
