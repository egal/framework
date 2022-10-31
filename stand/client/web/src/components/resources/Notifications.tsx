import * as React from 'react';
import { useAuthContext, useRelay, useResource } from '@egalteam/framework';
import { Box, Button, List } from 'grommet';
import { Notification as NotificationIcon, Checkmark } from 'grommet-icons';
import { FullLayerModal } from '@egalteam/framework/dist/cjs/Components/Resource/FullLayerModal';
import { useEffect, useState } from 'react';

type NotificationType = {
  id: string;
  user_id: string;
  checked: boolean;
  message: string;
};
export const Notifications = () => {
  const isNotificationsOpen = useRelay();

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
    resource.getItems.call();
    console.log(auth.getMasterToken());
  }, []);

  const markAsRead = (item: NotificationType) => {
    resource.update.call({ key: item.id, attributes: { checked: item.checked } });
  };

  return (
    <>
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
