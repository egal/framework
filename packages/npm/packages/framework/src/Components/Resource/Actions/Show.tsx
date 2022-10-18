import * as React from 'react';
import { Box, Form } from 'grommet';
import { FullLayerModal } from '../FullLayerModal';
import { useResourceContext } from '../Resource';
import { Buttons } from './Buttons/Buttons';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

export function Show({ children }: Props) {
  const {
    manipulates: { showing },
    extensions: { showing: showingExtension },
  } = useResourceContext();

  useEffect(() => {
    showingExtension.makeExists();
    showingExtension.makeReady();
  }, []);

  return (
    <>
      <Box>
        <Buttons.Show />
      </Box>
      {showing.enabled && (
        <FullLayerModal onClose={showing.disable}>
          <Form value={showing.entity}>
            <Box gap={'small'} direction={'column'}>
              {children}
              <Buttons.UpdateShowing />
              <Buttons.DeleteShowing />
            </Box>
          </Form>
        </FullLayerModal>
      )}
    </>
  );
}
