import * as React from 'react';
import { Box, Button, Form } from 'grommet';
import { useResourceContext } from '../Resource';
import { FullLayerModal } from '../FullLayerModal';
import { useEffect, useState } from 'react';
import { useResourceActionsContext } from './Actions';
import { UpdateSelectedButton } from './Buttons/Update';
import {
  FormFields as BaseFormFields,
  FormFieldsProps as BaseFormFieldsProps,
} from './FormFields';
import { FormField } from './FormField';

export function FormFields(props: BaseFormFieldsProps) {
  return <BaseFormFields excludeGuarded {...props} />;
}

type Props = {
  children?: React.ReactNode;
};

export function Update({ children }: Props) {
  const {
    resource,
    extensions,
    selectedKeys,
    manipulates: { updating: manipulate },
    translation: { t },
  } = useResourceContext();

  const [showButton, setShowButton] = useState(false);

  useResourceActionsContext();

  useEffect(() => {
    extensions.updating.makeExists();
    extensions.updating.makeReady();
  }, []);

  useEffect(() => {
    switch ([extensions.showing.exists, extensions.deleting.exists].join()) {
      case [true, true].join():
      case [true, false].join():
      case [false, true].join():
        setShowButton(true);
        break;
      case [false, false].join():
        break;
    }
  }, [
    extensions.showing.exists,
    extensions.updating.exists,
    extensions.deleting.exists,
  ]);

  return (
    <Box>
      {showButton && <UpdateSelectedButton />}
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
              {children ?? <FormFields />}
              <Button
                type="submit"
                label={t('actions.update.buttons.submit', {
                  defaultValue: 'Save',
                })}
                primary
              />
              <Button
                type="reset"
                label={t('actions.update.buttons.reset', {
                  defaultValue: 'Reset',
                })}
              />
            </Box>
          </Form>
        </FullLayerModal>
      )}
    </Box>
  );
}

Update.FormField = FormField;
Update.FormFields = FormFields;
