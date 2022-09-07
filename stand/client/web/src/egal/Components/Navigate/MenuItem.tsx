import React from 'react';

export interface MenuItemProps {
  header: string;
  key?: number;
}

export abstract class MenuItem<T extends MenuItemProps = MenuItemProps> extends React.Component<
  T,
  any
> {}
