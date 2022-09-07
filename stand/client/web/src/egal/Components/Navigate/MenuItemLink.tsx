import React, { ReactElement } from 'react';
import { MenuItem, MenuItemProps } from './MenuItem';
import { Link } from 'react-router-dom';

export interface MenuItemLinkProps extends MenuItemProps {
  path: string;
  children: ReactElement;
}

export default class MenuItemLink extends MenuItem<MenuItemLinkProps> {
  render() {
    return (
      <li key={this.props.key}>
        <Link to={this.props.path}>{this.props.header}</Link>
      </li>
    );
  }
}
