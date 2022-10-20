import * as React from 'react';
import { Box, Button, Form } from 'grommet';
import { useResourceContext } from '../Resource';
import { FullLayerModal } from '../FullLayerModal';
import { Buttons } from './Buttons/Buttons';
import { useEffect } from 'react';
import { useResourceActionsContext } from './Actions';

type Props = {
  children: React.ReactNode;
};

export function Update({ children }: Props) {
  const {
    resource,
    extensions: { updating },
    selectedKeys,
    manipulates: { updating: manipulate },
  } = useResourceContext();

  useResourceActionsContext();

  useEffect(() => {
    updating.makeExists();
    updating.makeReady();
  }, []);

  return (
    <Box>
      <Buttons.UpdateSelected />
      {manipulate.enabled && (
        <FullLayerModal onClose={manipulate.disable}>
          <Form
            value={manipulate.entity}
            onChange={(newEntity) => manipulate.changeEntity(newEntity)}
            onReset={manipulate.resetEntity}
            onSubmit={() => {
              if (!resource.metadata.result) throw new Error();
              resource.update
                .call({
                  key: manipulate.entity[
                    resource.metadata.result.primary_key.name
                  ],
                  attributes: manipulate.entity,
                })
                .then(() => {
                  manipulate.disable();
                  selectedKeys.reset();
                  resource.getItems.call();
                });
            }}
          >
            <Box gap={'small'} direction={'column'}>
              {children}
              <Button type="submit" label="Save" primary />
              <Button type="reset" label="Reset" />
            </Box>
          </Form>
        </FullLayerModal>
      )}
    </Box>
  );
}
