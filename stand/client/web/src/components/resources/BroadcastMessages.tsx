import * as React from 'react';
import { Text, Box, Header } from 'grommet';
import { useAction, useActionGetItems } from '@egalteam/framework';
import { useEffect, useState } from 'react';

type Props = {
  background_color?: string;
  text?: string;
};

export const BroadcastMessages = ({ background_color, text }: Props) => {
  const [broadcastMessages, setBroadcastMessages] = useState<any>([]);

  const actionGetBanner = useAction({ name: 'BroadcastMessage', service: 'core' }, 'getItems');

  useEffect(() => {
    actionGetBanner.call({}).then((result) => {
      return setBroadcastMessages(result);
    });
  }, []);

  return broadcastMessages.filter((msg: any) => {
    return (
      msg.active && (
        <Header background={background_color}>
          <Box pad={'medium'} justify={'center'} fill background={'light-5'} align={'center'}>
            <Text>{text}</Text>
          </Box>
        </Header>
      )
    );
  });
};
