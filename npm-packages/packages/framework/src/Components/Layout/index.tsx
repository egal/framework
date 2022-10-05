import * as React from 'react';
import { Box, Button, Grid, Heading, Sidebar } from 'grommet';
import { MenuItemConfig, Menu } from '../../Widgets';
import { Logout } from 'grommet-icons';
import { PrivateElement } from '../Auth';
import { useNavigate } from 'react-router-dom';

type Props = {
  logotype?: string;
  children?: React.ReactElement;
  menuItems?: MenuItemConfig[];
};

export const Layout = ({ children, menuItems, logotype }: Props) => {
  const navigate = useNavigate();

  return (
    <PrivateElement>
      <Grid
        rows={['xxsmall', 'flex']}
        columns={['15%', 'flex']}
        gap="small"
        width={'100vw'}
        height={'100vh'}
        areas={[
          { name: 'nav', start: [0, 0], end: [0, 1] },
          { name: 'header', start: [1, 0], end: [1, 0] },
          { name: 'main', start: [1, 1], end: [1, 1] },
        ]}
      >
        <Box gridArea={'header'} background={'brand'} pad="xsmall">
          <Heading level={3}>Header</Heading>
        </Box>
        <Box gridArea="nav" background={'light-5'}>
          <Sidebar
            responsive={false}
            background={'light-2'}
            header={logotype ? <img src={logotype} alt={'logotype'} /> : null}
            footer={
              <Button
                primary
                icon={<Logout />}
                label={'Exit'}
                onClick={() => {
                  navigate('/logout');
                }}
              />
            }
            pad={'medium'}
          >
            <Menu items={menuItems} />
          </Sidebar>
        </Box>
        <Box gridArea={'main'}>{children}</Box>
      </Grid>
    </PrivateElement>
  );
};
