import * as React from 'react';

export interface MenuItemGroupProps {
  header: string;
  liKey: number;
  items: React.ReactElement;
}

export interface MenuItemGroupState {
  isOpen: boolean;
}

export default class MenuItemGroup extends React.Component<MenuItemGroupProps> {
  state: MenuItemGroupState = {
    isOpen: false
  };

  switchIsOpenState = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <li key={this.props.liKey}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {this.props.header}
          <button onClick={this.switchIsOpenState}>{this.state.isOpen ? '/\\' : '\\/'}</button>
        </div>
        {this.state.isOpen ? <ul>{this.props.items}</ul> : null}
      </li>
    );
  }
}
