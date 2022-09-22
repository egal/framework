import * as React from 'react';
import { Box, Button, Collapsible } from 'grommet';
import { FormDown, FormNext } from 'grommet-icons';

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
    const ArrowIcon = this.state.isOpen ? FormDown : FormNext;

    return (
      <>
        <Box pad="xsmall">
          <Button onClick={this.switchIsOpenState}>
            <Box direction="row" justify="between">
              <div>{this.props.header}</div>
              <ArrowIcon />
            </Box>
          </Button>
        </Box>
        <Collapsible open={this.state.isOpen}>
          <Box margin={{ left: 'small' }}>{this.props.items}</Box>
        </Collapsible>
      </>
    );
  }
}
