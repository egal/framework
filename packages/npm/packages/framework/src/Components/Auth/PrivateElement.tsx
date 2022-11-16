import * as React from 'react';
import { useAuthContext } from '../../Contexts';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FullBoxLoader } from '../../Widgets';

// TODO: Test a fix this components.

type Props = {
  children: React.ReactNode;
  onlyFor?: 'all' | 'logged' | 'guest';
  onFailureNavigateTo?: string;
};

export function PrivateElement({
  onlyFor = 'logged',
  children,
  onFailureNavigateTo,
}: Props) {
  const [available, setAvailable] = useState(false);
  const auth = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (onlyFor === 'logged' && !auth.isLogged()) {
      setAvailable(false);
      navigate(onFailureNavigateTo ?? '/login');
      return;
    }

    if (onlyFor === 'guest' && auth.isLogged()) {
      setAvailable(false);
      navigate(onFailureNavigateTo ?? '/logout');
      return;
    }

    setAvailable(true);
  });

  return available ? <>{children}</> : <FullBoxLoader />;
}
