import React, { ReactElement } from 'react';
import { MenuItem, MenuItemProps } from './MenuItem';

export interface MenuItemGroupProps extends MenuItemProps {
  children: ReactElement[];
}

export interface MenuItemGroupState {
  isOpen: boolean;
}

export default class MenuItemGroup extends MenuItem<MenuItemGroupProps> {
  state: MenuItemGroupState = {
    isOpen: false
  };

  switchIsOpenState = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <li key={this.props.key}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {this.props.header}
          <button onClick={this.switchIsOpenState}>{this.state.isOpen ? '/\\' : '\\/'}</button>
        </div>
        {this.state.isOpen ? <ul>{this.props.children}</ul> : null}
      </li>
    );
  }
}
