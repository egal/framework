import * as React from 'react';
import { Text, Box, Header } from 'grommet';
import { useActionGetItems } from '@egalteam/framework';
import { useEffect } from 'react';

type Props = {
  //   background_color?: string;
  //   text?: string;
};

type BroadcastMessageType = {
  id: string;
  background_color: string;
  message: string;
  active: boolean;
};

export const BroadcastMessages = (props: Props) => {
  const actionGetBanner = useActionGetItems(
    { name: 'BroadcastMessage', service: 'notification' },
    {
      filter: [['active', 'eq', true]]
    }
  );

  useEffect(() => {
    const myInterval = setInterval(() => actionGetBanner.call(), 30000);

    actionGetBanner.call();

    return () => {
      clearInterval(myInterval);
    };
  }, []);

  if (actionGetBanner.result === undefined) return <></>;

  return (
    <>
      {actionGetBanner.result.items.map((msg: any) => (
        <Header key={msg.id}>
          <Box pad={'small'} justify={'center'} fill background={{ color: msg.background_color }} align={'center'}>
            <Text>{msg.message}</Text>
          </Box>
        </Header>
      ))}
    </>
  );
};
