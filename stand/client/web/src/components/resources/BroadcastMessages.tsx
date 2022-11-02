import * as React from 'react';
import { Text, Box, Header } from 'grommet';
import { useActionGetItems } from '@egalteam/framework';
import { useEffect } from 'react';

type Props = {
  delay?: number;
};

type BroadcastMessageType = {
  id: string;
  background_color: string;
  message: string;
  active: boolean;
};

export const BroadcastMessages = ({ delay = 30000 }: Props) => {
  const actionGetItems = useActionGetItems<BroadcastMessageType>(
    { name: 'BroadcastMessage', service: 'notification' },
    {
      filter: [['active', 'eq', true]]
    }
  );

  useEffect(() => {
    const myInterval = setInterval(() => actionGetItems.call(), delay);

    actionGetItems.call();

    return () => {
      clearInterval(myInterval);
    };
  }, []);

  return (
    <>
      {(actionGetItems.result?.items ?? []).map((msg) => (
        <Header key={msg.id}>
          <Box pad={'small'} justify={'center'} fill background={{ color: msg.background_color }} align={'center'}>
            <Text>{msg.message}</Text>
          </Box>
        </Header>
      ))}
    </>
  );
};
