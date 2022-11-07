import * as React from 'react';
import { Box, Button, List, Notification } from 'grommet';
import { Notification as NotificationIcon, Checkmark } from 'grommet-icons';
import { useEffect, useState } from 'react';
import { FullLayerModal } from '../Resource/FullLayerModal';
import { useAuthContext } from '../../Contexts';
import { useRelay, useResource } from '../../Hooks';

type NotificationType = {
  id: string;
  user_key: string;
  checked: boolean;
  title: string;
  text: string;
  created_at: string;
  updated_at: string;
};

type Props = {
  delay?: number;
};

export const PersonalNotifications = ({ delay = 5000 }: Props) => {
  const isNotificationsOpen = useRelay();
  const [mountingTime, setMountingTime] = useState(new Date());

  const auth = useAuthContext();

  const resource = useResource<NotificationType>(
    { name: 'PersonalNotification', service: 'notification' },
    {
      actionGetItems: {
        initParams: {
          filter: [
            ['user_key', 'eq', auth.getMasterToken().sub.key],
            'AND',
            ['checked', 'eq', false],
          ],
        },
      },
    }
  );

  useEffect(() => {
    setMountingTime(new Date());

    const notificationInterval = setInterval(
      () => resource.getItems.call(),
      delay
    );

    resource.getItems.call();

    return () => {
      clearInterval(notificationInterval);
    };
  }, []);

  const markAsRead = (item: NotificationType) => {
    resource.update
      .call({ key: item.id, attributes: { checked: true } })
      .then(() => {
        resource.getItems.call();
      });
  };

  return (
    <>
      {resource.getItems.result &&
        resource.getItems.result.items
          .filter((item) => new Date(item.created_at) > new Date(mountingTime))
          .map((item) => (
            <Box background={'white'} key={item.id}>
              <Notification
                status="unknown"
                toast
                title={item.title}
                message={item.text === null ? undefined : item.text}
              />
            </Box>
          ))}
      {isNotificationsOpen.enabled && (
        <Box background={'white'}>
          <FullLayerModal
            onClose={isNotificationsOpen.disable}
            position={'right'}
            full={'vertical'}
          >
            {resource.getItems.result && (
              <List<NotificationType>
                margin={{ top: 'medium' }}
                background={'white'}
                primaryKey={'id'}
                secondaryKey={'text'}
                data={resource.getItems.result.items}
                action={(item) => (
                  <Button
                    hoverIndicator="light-1"
                    icon={<Checkmark />}
                    onClick={() => markAsRead(item)}
                  />
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
                  value: resource.getItems.result.items.length,
                }
          }
        ></Button>
      )}
    </>
  );
};
