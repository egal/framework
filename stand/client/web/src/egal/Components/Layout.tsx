import * as React from 'react';
import { MenuConfig, MenuItemConfig } from './App';
import Menu from './Navigate/Menu';

type Props = {
  children: React.ReactElement;
  menu: MenuConfig;
};

export default class Layout extends React.Component<Props> {
  render() {
    return (
      <div style={{ display: 'flex' }}>
        {React.createElement(Menu, this.props.menu)}
        <div style={{ margin: '20px' }}>{this.props.children}</div>
      </div>
    );
  }
}
