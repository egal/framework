import * as React from 'react';
import { useAuthContext } from '../../Contexts';
import { useNavigate } from 'react-router-dom';

// TODO: Test this components.

type Props = {
  children: React.ReactElement;
  onlyFor?: 'all' | 'logged' | 'guest';
  onFailureNavigateTo?: string;
};

export function PrivateElement({
  onlyFor = 'logged',
  children,
  onFailureNavigateTo,
}: Props) {
  const [logged] = useAuthContext();
  const navigate = useNavigate();

  onlyFor === 'logged' && !logged && navigate(onFailureNavigateTo ?? '/login');
  onlyFor === 'guest' && logged && navigate(onFailureNavigateTo ?? '/logout');

  return children;
}
