import * as React from 'react';
import { Button } from 'grommet';
import { useResourceContext } from '../../Resource';
import { MouseEventHandler } from 'react';
import { ButtonExtendedProps } from 'grommet/components/Button';

type Props = Omit<
  ButtonExtendedProps,
  'label' | 'color' | 'primary' | 'onClick'
> & {
  onClick:
    | 'delete-selected'
    | 'delete-showing'
    | MouseEventHandler<any>
    | undefined;
};

export function Delete({ onClick, ...props }: Props) {
  const {
    resource,
    selectedKeys,
    manipulates: { showing },
  } = useResourceContext();
  const active = selectedKeys.value.length > 0;

  const newProps: ButtonExtendedProps = {};

  if (onClick === 'delete-selected') {
    newProps.onClick = () => {
      // TODO: Remake to bachDelete and after implement normal .then().
      selectedKeys.value.map((key) => resource.delete.call({ key }));
      selectedKeys.reset();
      resource.getItems.call();
    };
    newProps.badge = active ? selectedKeys.value.length : undefined;
  } else if (onClick === 'delete-showing') {
    newProps.onClick = () => {
      if (!resource.metadata.result) throw new Error();
      const key = showing.entity[resource.metadata.result.primary_key.name];
      resource.delete.call({ key }).then(() => {
        selectedKeys.reset();
        resource.getItems.call();
      });
    };
  } else {
    newProps.onClick = onClick;
  }

  return (
    <Button
      label={'Delete'}
      primary={active}
      color={active ? 'status-error' : undefined}
      disabled={!active}
      {...newProps}
      {...props}
    />
  );
}

export function DeleteSelected(props: Omit<Props, 'onClick'>) {
  return <Delete onClick={'delete-selected'} {...props} />;
}

export function DeleteShowing(props: Omit<Props, 'onClick'>) {
  return <Delete onClick={'delete-showing'} {...props} />;
}
