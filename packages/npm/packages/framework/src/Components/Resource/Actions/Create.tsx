import * as React from 'react';
import { Box, Button, Form } from 'grommet';
import { FullLayerModal } from '../FullLayerModal';
import { useResourceContext } from '../Resource';
import { useEffect } from 'react';
import { useResourceActionsContext } from './Actions';
import { CreateButton } from './Buttons/Create';
import { FormFieldsFactory } from '../FormFieldsFactory';

type Props = {
  children?: React.ReactNode;
};

export function Create({ children }: Props) {
  const {
    resource,
    extensions: { creating },
    manipulates: { creating: manipulate },
    translation: { t },
  } = useResourceContext();

  useResourceActionsContext();

  useEffect(() => {
    creating.makeExists();
    creating.makeReady();
  }, []);

  return (
    <>
      <Box>
        <CreateButton />
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
              <Button
                type="submit"
                label={t('actions.create.buttons.submit', {
                  defaultValue: 'Save',
                })}
                primary
              />
              <Button
                type="reset"
                label={t('actions.create.buttons.reset', {
                  defaultValue: 'Reset',
                })}
              />
            </Box>
          </Form>
        </FullLayerModal>
      )}
    </>
  );
}
