import * as React from 'react';
import { MenuConfig, MenuItemConfig } from './App';
import Menu from './Navigate/Menu';
import { Box, Grid } from 'grommet';

type Props = {
  children: React.ReactElement;
  menu: MenuConfig;
};

export default class Layout extends React.Component<Props> {
  render() {
    return (
      <Grid
        rows={['xxsmall', 'flex']}
        columns={['15%', 'flex']}
        gap="small"
        width={'100vw'}
        height={'100vh'}
        areas={[
          { name: 'nav', start: [0, 0], end: [0, 1] },
          { name: 'header', start: [1, 0], end: [1, 0] },
          { name: 'main', start: [1, 1], end: [1, 1] }
        ]}>
        <Box gridArea="header" background="brand">
          Header
        </Box>
        <Box gridArea="nav" background="light-5">
          <Menu {...this.props.menu} />
        </Box>
        <Box gridArea="main">{this.props.children}</Box>
      </Grid>
    );
  }
}
