import * as React from 'react';
import { Button } from 'grommet';
import { useResourceContext } from '../../Resource';
import { MouseEventHandler } from 'react';
import { ButtonExtendedProps } from 'grommet/components/Button';
import { Delete } from '../Delete';

export type DeleteButtonProps = Pick<ButtonExtendedProps, 'label'> & {
  onClick:
    | 'delete-selected'
    | 'delete-showing'
    | MouseEventHandler<any>
    | undefined;
};

export function DeleteButton({ onClick, label = 'Delete' }: DeleteButtonProps) {
  const {
    resource,
    selectedKeys,
    manipulates: { showing },
  } = useResourceContext();

  const props: ButtonExtendedProps = {};

  if (onClick === 'delete-selected') {
    props.disabled = !(selectedKeys.value.length > 0);
    props.onClick = () => {
      // TODO: Remake to bachDelete and after implement normal .then().
      selectedKeys.value.map((key) => resource.delete.call({ key }));
      selectedKeys.reset();
      resource.getItems.call();
    };
    props.badge = props.disabled ? undefined : selectedKeys.value.length;
  } else if (onClick === 'delete-showing') {
    props.disabled = false;
    props.onClick = () => {
      if (!resource.metadata.result) throw new Error();
      const key = showing.entity[resource.metadata.result.primary_key.name];
      resource.delete.call({ key }).then(() => {
        selectedKeys.reset();
        resource.getItems.call();
      });
    };
  } else {
    props.onClick = onClick;
  }

  return (
    <Button
      label={label}
      primary={!props.disabled}
      color={!props.disabled ? 'status-error' : undefined}
      {...props}
    />
  );
}

export type DeleteSelectedButtonProps = Omit<DeleteButtonProps, 'onClick'>;

export function DeleteSelectedButton(props: DeleteSelectedButtonProps) {
  return <DeleteButton onClick={'delete-selected'} {...props} />;
}

export type DeleteShowingButtonProps = Omit<DeleteButtonProps, 'onClick'>;

export function DeleteShowingButton(props: DeleteShowingButtonProps) {
  return <DeleteButton onClick={'delete-showing'} {...props} />;
}
