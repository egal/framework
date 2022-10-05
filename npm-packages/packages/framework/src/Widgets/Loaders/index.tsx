import * as React from 'react';
import { Spinner as GrommetSpinner } from 'grommet/components/Spinner';
import { Box as GrommetBox } from 'grommet/components/Box';

export function FullBoxLoader() {
  return (
    <GrommetBox
      height={'100%'}
      width={'100%'}
      align={'center'}
      justify={'center'}
    >
      <GrommetSpinner size={'large'} />
    </GrommetBox>
  );
}
