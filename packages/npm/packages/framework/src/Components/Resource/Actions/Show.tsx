import * as React from 'react';
import { Box, Form } from 'grommet';
import { FullLayerModal } from '../FullLayerModal';
import { useResourceContext } from '../Resource';
import { Buttons } from './Buttons/Buttons';
import { useEffect, useState } from 'react';
import { useResourceActionsContext } from './Actions';

type Props = {
  children: React.ReactNode;
};

export function Show({ children }: Props) {
  const {
    manipulates: { showing },
    extensions,
  } = useResourceContext();

  const [showButton, setShowButton] = useState(false);
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  useResourceActionsContext();

  useEffect(() => {
    extensions.showing.makeExists();
    extensions.showing.makeReady();
  }, []);

  useEffect(() => {
    switch ([extensions.updating.exists, extensions.deleting.exists].join()) {
      case [true, true].join():
      case [true, false].join():
      case [false, true].join():
        setShowButton(true);
        break;
      case [false, false].join():
        break;
    }
    switch ([extensions.updating.exists, extensions.deleting.exists].join()) {
      case [true, true].join():
        setShowUpdateButton(true);
        setShowDeleteButton(true);
        break;
      case [true, false].join():
        setShowUpdateButton(true);
        break;
      case [false, true].join():
        setShowDeleteButton(true);
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
    <>
      {showButton && (
        <Box>
          <Buttons.Show />
        </Box>
      )}
      {showing.enabled && (
        <FullLayerModal onClose={showing.disable}>
          <Form value={showing.entity}>
            <Box gap={'small'} direction={'column'}>
              {children}
              {showUpdateButton && <Buttons.UpdateShowing />}
              {showDeleteButton && <Buttons.DeleteShowing />}
            </Box>
          </Form>
        </FullLayerModal>
      )}
    </>
  );
}
