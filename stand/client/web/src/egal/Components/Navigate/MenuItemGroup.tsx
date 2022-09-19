import * as React from 'react';
import { Box, Button } from 'grommet';

import groupMenuItemArrowSvg from '../../../assets/group_menu_item_arrow.svg';
import groupMenuItemArrow from '../../../assets/group_menu_item_arrow.svg';

export interface MenuItemGroupProps {
  header: string;
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
    const groupMenuItemArrow = this.state.isOpen ? (
      <img
        src={groupMenuItemArrowSvg}
        style={{
          transform: 'scaleY(-1)'
        }}
      />
    ) : (
      <img src={groupMenuItemArrowSvg} />
    );

    return (
      <>
        <Box pad="xsmall">
          <Button onClick={this.switchIsOpenState}>
            <Box direction="row" justify="between">
              <div>{this.props.header}</div>
              <div>{groupMenuItemArrow}</div>
            </Box>
          </Button>
        </Box>
        {this.state.isOpen ? <Box pad={{ left: 'small' }}>{this.props.items}</Box> : null}
      </>
    );
  }
}
