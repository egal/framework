import * as React from 'react';
import { Box as GrommetBox } from 'grommet/components/Box';
import { StatusWarning as GrommetStatusWarningIcon } from 'grommet-icons/icons';
import { Heading as GrommetHeading } from 'grommet/components/Heading';
import { Paragraph as GrommetParagraph } from 'grommet/components/Paragraph';
import { Box, Heading, Layer } from 'grommet';
import { Close, Halt, PhoneVertical } from 'grommet-icons';

export function SomethingWentWrongFullLayerError() {
  return (
    <Layer full>
      <GrommetBox fill background="light-1" align="center" justify="center">
        <GrommetStatusWarningIcon size={'xlarge'} color={'dark-1'} />
        <GrommetHeading color={'dark-1'}>Что-то пошло не так...</GrommetHeading>
        <GrommetParagraph size="large">
          Обратитесь в тех поддержку!
        </GrommetParagraph>
      </GrommetBox>
    </Layer>
  );
}

export function MobileResolutionNotSupportedFullLayerError() {
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

export function NotFoundFullLayerError() {
  return (
    <Layer full>
      <Box fill align="center" justify="center">
        <Heading>Not found!</Heading>
      </Box>
    </Layer>
  );
}
