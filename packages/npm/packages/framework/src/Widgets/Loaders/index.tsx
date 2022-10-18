import * as React from 'react';
import {
  Spinner as GrommetSpinner,
  SpinnerExtendedProps,
} from 'grommet/components/Spinner';
import { Box as GrommetBox } from 'grommet/components/Box';

type Props = SpinnerExtendedProps;

export const FullBoxLoader = (props: Props) => (
  <GrommetBox
    height={'100%'}
    width={'100%'}
    align={'center'}
    justify={'center'}
  >
    <GrommetSpinner {...props} />
  </GrommetBox>
);
