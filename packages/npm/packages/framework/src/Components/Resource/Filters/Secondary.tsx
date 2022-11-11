import * as React from 'react';
import { Box, Button, Form, Spinner } from 'grommet';
import { Filter } from 'grommet-icons';
import { FullLayerModal } from '../FullLayerModal';
import { useRelay } from '../../../Hooks';
import { useResourceContext } from '../Resource';
import { FilterFormField } from './FilterFormField';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

export function Secondary({ children }: Props) {
  const edit = useRelay();

  const {
    manipulates: {
      filtering: { secondary },
    },
  } = useResourceContext();

  useEffect(() => {
    secondary.enable({});
    return () => {
      if (secondary.enabled) secondary.disable();
    };
  }, []);

  if (!secondary.enabled) return <Spinner />;

  return (
    <>
      <Button
        icon={<Filter />}
        onClick={edit.enable}
        badge={
          // TODO: Not working.
          secondary.entity.length > 0 ? secondary.entity.length : undefined
        }
      />
      {edit.enabled && (
        <FullLayerModal
          onClose={edit.disable}
          position={'right'}
          full={'vertical'}
        >
          <Form
            value={secondary.entity}
            onChange={(newEntity) => secondary.changeEntity(newEntity)}
          >
            <Box gap={'small'} direction={'column'}>
              {children}
            </Box>
          </Form>
        </FullLayerModal>
      )}
    </>
  );
}

Secondary.FormFiled = FilterFormField;
