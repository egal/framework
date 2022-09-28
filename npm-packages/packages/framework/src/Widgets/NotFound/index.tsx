import * as React from 'react';
import { Box, Heading, Layer } from 'grommet';

export function NotFound() {
  return (
    <Layer full>
      <Box fill align="center" justify="center">
        <Heading>Not found!</Heading>
      </Box>
    </Layer>
  );
}
