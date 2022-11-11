import * as React from 'react';
import { useResourceContext } from '../../Resource';
import { Button } from 'grommet';

export function ShowSelectedButton() {
  const {
    selectedKeys,
    manipulates: { showing },
    translation: { t },
  } = useResourceContext();
  const active = selectedKeys.value.length === 1;

  return (
    <Button
      label={t('actions.show.buttons.init', { defaultValue: 'Show' })}
      color={active ? 'brand' : undefined}
      primary={active}
      disabled={!active}
      onClick={() => showing.enable(selectedKeys.getSelectedEntity())}
    />
  );
}
