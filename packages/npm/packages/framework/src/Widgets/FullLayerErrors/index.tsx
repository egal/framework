import * as React from 'react';
import { Box as GrommetBox } from 'grommet/components/Box';
import { StatusWarning as GrommetStatusWarningIcon } from 'grommet-icons/icons';
import { Heading as GrommetHeading } from 'grommet/components/Heading';
import { Paragraph as GrommetParagraph } from 'grommet/components/Paragraph';
import { Box, Heading, Layer } from 'grommet';

export const SomethingWentWrongFullLayerError = () => (
  <Layer full>
    <GrommetBox fill background="light-1" align="center" justify="center">
      <GrommetStatusWarningIcon size={'xlarge'} color={'dark-1'} />
      <GrommetHeading color={'dark-1'}>Что-то пошло не так...</GrommetHeading>
      <GrommetParagraph size="large">
        Обратитесь в тех. поддержку!
      </GrommetParagraph>
    </GrommetBox>
  </Layer>
);

export const NotFoundFullLayerError = () => (
  // TODO: Make without layer.
  <Layer full animation={'none'}>
    <Box fill align="center" justify="center">
      <Heading>Not found!</Heading>
    </Box>
  </Layer>
);
