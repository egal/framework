import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'grommet';

type Props = {
  //
};

export function Test(props: Props) {
  return (
    <Link to={'/'}>
      <Button label={'Go home!'} />
    </Link>
  );
}
