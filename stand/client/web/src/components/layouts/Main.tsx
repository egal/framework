import * as React from 'react';
import { Box, Button, Grid, Heading, Sidebar } from 'grommet';
import { Logout } from 'grommet-icons';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItemConfig, PrivateElement } from '@egalteam/framework';
import logo from '../../assets/logo.svg';

type Props = {
  children?: React.ReactElement;
  menu?: MenuItemConfig[];
};

export const Layout = ({ children, menu }: Props) => {
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
          { name: 'main', start: [1, 1], end: [1, 1] }
        ]}>
        <Box gridArea={'header'} background={'brand'} pad="xsmall" />
        <Box gridArea="nav" background={'light-5'}>
          <Sidebar
            responsive={false}
            background={'light-2'}
            header={<img src={logo} alt={'logotype'} />}
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
            pad={'medium'}>
            <Menu items={menu} />
          </Sidebar>
        </Box>
        <Box gridArea={'main'}>{children}</Box>
      </Grid>
    </PrivateElement>
  );
};