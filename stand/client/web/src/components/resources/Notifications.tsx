import * as React from 'react';
import { Resource, Select, useRelay, useResource } from '@egalteam/framework';
import { Box, Button, List, Text } from 'grommet';
import { Notification as NotificationIcon } from 'grommet-icons';
import { FullLayerModal } from '@egalteam/framework/dist/cjs/Components/Resource/FullLayerModal';
import { useEffect } from 'react';

type NotificationType = {
  id: string;
  user_id: string;
  checked: boolean;
  message: string;
};
export const Notifications = () => {
  const isNotificationsOpen = useRelay();

  const resource = useResource({ name: 'PersonalNotification', service: 'notification' });

  useEffect(() => {
    resource.getItems.call();
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
                primaryKey="name"
                secondaryKey="percent"
                data={resource.getItems.result.items as NotificationType[]}
                action={(item: NotificationType) => (
                  <Button secondary label={'Прочитано'} onClick={() => markAsRead(item)}></Button>
                )}
              />
            )}
          </FullLayerModal>
        </Box>
      )}
      <Button
        icon={<NotificationIcon />}
        onClick={isNotificationsOpen.enable}
        badge={{
          background: 'status-warning',
          value: 5
        }}></Button>
    </>
  );
};
