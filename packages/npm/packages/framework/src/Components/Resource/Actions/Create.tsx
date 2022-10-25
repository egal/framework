import * as React from 'react';
import { Box, Button, Form, FormField, TextInput } from 'grommet';
import { useEntityManipulate } from '../../../Hooks';
import { FullLayerModal } from '../FullLayerModal';
import { useResourceContext } from '../Resource';
import { useEffect } from 'react';
import { useResourceActionsContext } from './Actions';
import { CreateButton, CreateButtonProps } from './Buttons/Create';
import { FormFieldsFactory } from '../FormFieldsFactory';

type Props = {
  children?: React.ReactNode;
  button?: CreateButtonProps;
};

export function Create({ children, button = {} }: Props) {
  const {
    resource,
    extensions: { creating },
    manipulates: { creating: manipulate },
  } = useResourceContext();

  useResourceActionsContext();

  useEffect(() => {
    creating.makeExists();
    creating.makeReady();
  }, []);

  return (
    <>
      <Box>
        <CreateButton {...button} />
      </Box>
      {manipulate.enabled && (
        <FullLayerModal onClose={manipulate.disable}>
          <Form
            value={manipulate.entity}
            onChange={(newEntity) => manipulate.changeEntity(newEntity)}
            onReset={manipulate.resetEntity}
            onSubmit={() => {
              resource.create
                .call({ attributes: manipulate.entity })
                .then(() => {
                  manipulate.disable();
                  resource.getItems.call();
                });
            }}
          >
            <Box gap={'small'} direction={'column'}>
              {children ?? <FormFieldsFactory excludeGuarded />}
              <Button type="submit" label="Save" primary />
              <Button type="reset" label="Reset" />
            </Box>
          </Form>
        </FullLayerModal>
      )}
    </>
  );
}
