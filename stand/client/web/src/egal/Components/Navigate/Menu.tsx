import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { MenuItemConfig, MenuConfig as MenuProps } from '../App';
import MenuItemGroup from './MenuItemGroup';
import MenuItemLink from './MenuItemLink';

export default class Menu extends React.Component<MenuProps> {
  constructor(props: MenuProps) {
    super(props);
    this.renderMenuItem = this.renderMenuItem.bind(this);
  }

  renderMenuItem(item: MenuItemConfig, key: number): React.ReactElement {
    if (item.render !== undefined) {
      return item.render;
    } else if (item.items !== undefined) {
      return React.createElement(MenuItemGroup, {
        header: item.header,
        liKey: key,
        key: key,
        items: <div key={key}>{item.items.map(this.renderMenuItem)}</div>
      });
    } else if (item.path !== undefined) {
      return <MenuItemLink liKey={key} key={key} path={item.path} header={item.header} />;
    } else {
      throw new Error();
    }
  }

  render(): React.ReactElement {
    const Container = styled.div`
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100vh;
      width: 256px;
      background: #ffffff;
      border-right: 1px solid #e2e8f0;
    `;

    const Body = styled.ul`
      margin-top: 40px;
    `;

    return (
      <Container>
        <div>
          {this.props.logotype ? <img src={this.props.logotype} alt="logotype" /> : null}
          <Body>{this.props.items.map(this.renderMenuItem)}</Body>
        </div>
        <div>
          <button>X Exit</button>
        </div>
      </Container>
    );
  }
}
