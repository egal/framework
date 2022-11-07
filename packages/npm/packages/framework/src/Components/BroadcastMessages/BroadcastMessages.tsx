import * as React from 'react';
import { Text, Box, Header } from 'grommet';
import { useEffect } from 'react';
import { useActionGetItems } from '../../Hooks';
import dateFormat from 'dateformat';

type BroadcastMessageType = {
  id: string;
  background_color: string;
  message: string;
  active: boolean;
};

type Props = {
  delay?: number;
};

export const BroadcastMessages = ({ delay = 30000 }: Props) => {
  const now = dateFormat(new Date(), 'yyyy-mm-dd hh:mm:ss');

  const actionGetItems = useActionGetItems<BroadcastMessageType>(
    { name: 'BroadcastMessage', service: 'notification' },
    {
      filter: [
        [['starts_at', 'lt', now], 'OR', ['starts_at', 'eq', now]],
        'AND',
        [['ends_at', 'gt', now], 'OR', ['ends_at', 'eq', now]],
      ],
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
          <Box
            pad={'small'}
            justify={'center'}
            fill
            background={{ color: msg.background_color }}
            align={'center'}
          >
            <Text>{msg.message}</Text>
          </Box>
        </Header>
      ))}
    </>
  );
};
