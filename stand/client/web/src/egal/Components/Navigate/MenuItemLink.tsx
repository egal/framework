import * as React from 'react';
import { Link } from 'react-router-dom';

export interface MenuItemLinkProps {
  header: string;
  liKey: number;
  path: string;
}

export default class MenuItemLink extends React.Component<MenuItemLinkProps> {
  render() {
    return (
      <li key={this.props.liKey}>
        <Link to={this.props.path}>{this.props.header}</Link>
      </li>
    );
  }
}
