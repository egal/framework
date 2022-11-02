import * as React from 'react';
import { useWindowSize } from '../../Hooks';
import { Box, Heading, Layer } from 'grommet';
import { Close, Halt, PhoneVertical } from 'grommet-icons';

type Resolution = {
  height: number;
  width: number;
};

type Props = {
  children: React.ReactNode;
  message?: React.ReactNode;
  min?: Partial<Resolution>;
  max?: Partial<Resolution>;
};

export function SupportedWindowsSize({
  children,
  message = <Heading>Resolution not supported!</Heading>,
  min: enteredMin,
  max: enteredMax,
}: Props) {
  const windowsSize = useWindowSize();

  const defaultMin = { height: 0, width: 0 };
  const min: Resolution =
    enteredMin === undefined ? defaultMin : { ...defaultMin, ...enteredMin };

  const defaultMax = {
    height: Number.MAX_SAFE_INTEGER,
    width: Number.MAX_SAFE_INTEGER,
  };
  const max: Resolution =
    enteredMax === undefined ? defaultMax : { ...defaultMax, ...enteredMax };

  const messageLayerElement = (
    <Layer full animation={'none'}>
      <Box fill align="center" justify="center">
        {message}
      </Box>
    </Layer>
  );

  return (
    <>
      {(windowsSize.height >= min.height &&
        windowsSize.height <= max.height &&
        windowsSize.width >= min.width &&
        windowsSize.width <= max.width) ||
        messageLayerElement}
      {children}
    </>
  );
}
