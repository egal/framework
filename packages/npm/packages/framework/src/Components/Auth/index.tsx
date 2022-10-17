import * as React from 'react';
import { useAuthContext } from '../../Contexts';
import { useNavigate } from 'react-router-dom';

// TODO: Test a fix this components.

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
  const auth = useAuthContext();
  const navigate = useNavigate();

  if (onlyFor === 'logged' && !auth.logged)
    navigate(onFailureNavigateTo ?? '/login');

  if (onlyFor === 'guest' && auth.logged)
    navigate(onFailureNavigateTo ?? '/logout');

  return children;
}
