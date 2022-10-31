import * as React from 'react';
import { Box, Button, Grid, Sidebar } from 'grommet';
import { Logout } from 'grommet-icons';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItemConfig, PrivateElement, useAuthContext } from '@egalteam/framework';
import logo from '../../assets/logo.svg';
import { useEffect } from 'react';
import { BroadcastMessages } from '../resources/BroadcastMessages';
import { Notifications } from '../resources/Notifications';

type Props = {
  children?: React.ReactElement;
  menu?: MenuItemConfig[];
};

export const Layout = ({ children, menu }: Props) => {
  const navigate = useNavigate();

  return (
    <PrivateElement>
      <Grid
        rows={['auto', 'xxsmall', 'flex']}
        columns={['15%', 'flex']}
        gap="small"
        width={'100vw'}
        height={'100vh'}
        areas={[
          { name: 'broadcast_messages', start: [0, 0], end: [1, 0] },
          { name: 'nav', start: [0, 1], end: [0, 2] },
          { name: 'header', start: [1, 1], end: [1, 1] },
          { name: 'main', start: [1, 2], end: [1, 2] }
        ]}>
        <Box gridArea={'broadcast_messages'} fill>
          <BroadcastMessages />
        </Box>

        <Box gridArea={'header'} background={{ color: 'brand' }} pad="xsmall" align={'end'} justify={'center'}>
          <Notifications />
        </Box>

        <Box gridArea="nav" background={'light-5'} fill>
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
