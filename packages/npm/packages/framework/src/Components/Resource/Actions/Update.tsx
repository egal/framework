import * as React from 'react';
import { Box, Button, Form, Spinner } from 'grommet';
import { useResourceContext } from '../Resource';
import { FullLayerModal } from '../FullLayerModal';
import { Buttons } from './Buttons/Buttons';
import { useEffect } from 'react';

type Props = {
  //
  children: React.ReactNode;
};

export function Update({ children }: Props) {
  const {
    resource,
    selectedKeys,
    extensions: { showing: updating },
    manipulates: { updating: manipulate },
  } = useResourceContext();

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
