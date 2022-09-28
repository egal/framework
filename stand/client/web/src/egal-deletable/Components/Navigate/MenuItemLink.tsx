import * as React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button } from 'grommet';

export interface MenuItemLinkProps {
  header: string;
  liKey: number;
  path: string;
}

export default class MenuItemLink extends React.Component<MenuItemLinkProps> {
  render() {
    return (
      <Box pad="xsmall">
        <Link to={this.props.path}>
          <Button gap="xsmall" alignSelf="start" plain label={this.props.header} />
        </Link>
      </Box>
    );
  }
}
