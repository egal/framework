import * as React from 'react';
import { Box, Form, Spinner } from 'grommet';
import { FilterFormField } from './FilterFormField';
import { useResourceContext } from '../Resource';
import { useEffect } from 'react';

type Props<FormValueType> = {
  initFormValue: FormValueType;
  children: React.ReactNode;
};

export function Primary<FormValueType>({
  initFormValue,
  children,
}: Props<FormValueType>) {
  const {
    manipulates: {
      filtering: { primary },
    },
  } = useResourceContext();

  useEffect(() => {
    primary.enable(initFormValue);
    return () => {
      if (primary.enabled) primary.disable();
    };
  }, []);

  if (!primary.enabled) return <Spinner />;

  return (
    <Box margin={{ right: 'small' }}>
      <Form
        value={primary.entity}
        onChange={(newEntity) => primary.changeEntity(newEntity)}
      >
        <Box direction={'row'} gap={'small'}>
          {children}
        </Box>
      </Form>
    </Box>
  );
}

Primary.FormFiled = FilterFormField;
