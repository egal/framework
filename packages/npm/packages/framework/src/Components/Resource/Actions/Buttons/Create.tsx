import * as React from 'react';
import { Button } from 'grommet';
import { useResourceContext } from '../../Resource';

export function CreateButton() {
  const {
    manipulates: { creating: manipulate },
    translation: { t },
  } = useResourceContext();

  return (
    <Button
      primary
      label={t('actions.create.buttons.init', { defaultValue: 'Create' })}
      color={'status-ok'}
      onClick={() => manipulate.enable({})}
    />
  );
}
