import * as React from 'react';
import { Layer as GrommetLayer, LayerProps } from 'grommet/components/Layer';
import { Box as GrommetBox } from 'grommet/components/Box';
import { Button as GrommetButton } from 'grommet/components/Button';
import { Close as GrommetCloseIcon } from 'grommet-icons/icons';

type Props = {
  onClose: () => void;
  children: React.ReactNode;
} & LayerProps;

export function FullLayerModal({ onClose, children, ...grommetProps }: Props) {
  return (
    <GrommetLayer onEsc={onClose} onClickOutside={onClose} {...grommetProps}>
      <GrommetBox pad={'medium'} width={'large'} overflow="auto">
        <GrommetBox height={{ min: 'auto' }} align={'end'} fill={'horizontal'}>
          <GrommetButton
            icon={<GrommetCloseIcon />}
            hoverIndicator
            onClick={onClose}
          />
        </GrommetBox>
        {children}
      </GrommetBox>
    </GrommetLayer>
  );
}
