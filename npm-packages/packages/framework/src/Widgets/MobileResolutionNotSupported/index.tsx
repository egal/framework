import * as React from 'react';
import { Box, Heading, Layer } from 'grommet';
import { Close, Halt, PhoneVertical } from 'grommet-icons';

export function MobileResolutionNotSupported() {
  return (
    <Layer full>
      <Box fill align="center" justify="center">
        <Box direction={'row'}>
          <Halt size={'xlarge'} color={'dark-1'} />
          <Close size={'xlarge'} color={'dark-1'} />
          <PhoneVertical size={'xlarge'} color={'dark-1'} />
        </Box>
        <Heading color={'dark-1'}>View from mobile not supported!</Heading>
      </Box>
    </Layer>
  );
}
