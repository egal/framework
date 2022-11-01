import * as React from 'react';
import { useAuthContext, useRelay, useResource } from '@egalteam/framework';
import { Box, Button, List, Notification, Text } from 'grommet';
import { Notification as NotificationIcon, Checkmark } from 'grommet-icons';
import { FullLayerModal } from '@egalteam/framework/dist/cjs/Components/Resource/FullLayerModal';
import { useEffect, useState } from 'react';

type NotificationType = {
  id: string;
  user_id: string;
  checked: boolean;
  title: string;
  text: string;
};

type Props = {
  delay?: number;
};

export const Notifications = ({ delay = 5000 }: Props) => {
  const isNotificationsOpen = useRelay();
  const [mountingTime, setMountingTime] = useState(new Date());

  const auth = useAuthContext();

  const resource = useResource(
    { name: 'PersonalNotification', service: 'notification' },
    {
      actionGetItems: {
        initParams: {
          filter: [['user_id', 'eq', auth.getMasterToken().sub.id], 'AND', ['checked', 'eq', false]]
        }
      }
    }
  );

  useEffect(() => {
    setMountingTime(new Date());

    const notificationInterval = setInterval(() => resource.getItems.call(), delay);

    resource.getItems.call();

    return () => {
      clearInterval(notificationInterval);
    };
  }, []);

  const markAsRead = (item: NotificationType) => {
    resource.update.call({ key: item.id, attributes: { checked: item.checked } });
  };

  return (
    <>
      {resource.getItems.result &&
        resource.getItems.result.items
          .filter((item: any) => new Date(item.created_at) > new Date(mountingTime))
          .map((item: any) => (
            <Box background={'white'} key={item.id}>
              <Notification status="unknown" toast title={item.title} message={item.text ?? ''} />
            </Box>
          ))}

      {isNotificationsOpen.enabled && (
        <Box background={'white'}>
          <FullLayerModal onClose={isNotificationsOpen.disable} position={'right'} full={'vertical'}>
            {resource.getItems.result && (
              <List
                margin={{ top: 'medium' }}
                background={'white'}
                secondaryKey="message"
                data={resource.getItems.result.items as NotificationType[]}
                action={(item: NotificationType) => (
                  <Button icon={<Checkmark />} secondary onClick={() => markAsRead(item)}></Button>
                )}
              />
            )}
          </FullLayerModal>
        </Box>
      )}
      {resource.getItems.result && (
        <Button
          icon={<NotificationIcon />}
          onClick={isNotificationsOpen.enable}
          badge={
            resource.getItems.result.items.length === 0
              ? undefined
              : {
                  background: 'status-warning',
                  value: resource.getItems.result.items.length
                }
          }></Button>
      )}
    </>
  );
};
