import React from 'react';
import { MenuItemConfig, MenuConfig as MenuProps } from '../App';
import MenuItemGroup from './MenuItemGroup';
import MenuItemLink from './MenuItemLink';
import { Button, Nav, Sidebar } from 'grommet';
import { Logout } from 'grommet-icons';

export default class Menu extends React.Component<MenuProps> {
  constructor(props: MenuProps) {
    super(props);
    this.renderMenuItem = this.renderMenuItem.bind(this);
  }

  renderMenuItem(item: MenuItemConfig, key: number): React.ReactElement {
    if (item.render !== undefined) {
      return item.render;
    } else if (item.items !== undefined) {
      return <MenuItemGroup header={item.header} key={key} items={<>{item.items.map(this.renderMenuItem)}</>} />;
    } else if (item.path !== undefined) {
      return <MenuItemLink liKey={key} key={key} path={item.path} header={item.header} />;
    } else {
      throw new Error();
    }
  }

  // TODO: https://storybook.grommet.io/?path=/story/utilities-collapsible-nested--nested
  render(): React.ReactElement {
    return (
      <Sidebar
        responsive={false}
        background="light-2"
        header={this.props.logotype ? <img src={this.props.logotype} alt="logotype" /> : null}
        footer={<Button icon={<Logout />} label={'Exit'} />}
        pad={'medium'}>
        <Nav gap="xsmall" responsive={false}>
          {this.props.items.map(this.renderMenuItem)}
        </Nav>
      </Sidebar>
    );
  }
}
