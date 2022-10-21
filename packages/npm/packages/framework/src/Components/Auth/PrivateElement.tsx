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

  const check = () => {
    console.log(auth.logged);

    if (onlyFor === 'logged' && !auth.logged) {
      setAvailable(false);
      navigate(onFailureNavigateTo ?? '/login');
      return;
    }

    if (onlyFor === 'guest' && auth.logged) {
      setAvailable(false);
      navigate(onFailureNavigateTo ?? '/logout');
      return;
    }

    setAvailable(true);
  };

  useEffect(check, []);
  useEffect(check, [auth.logged]);

  return available ? <>{children}</> : <FullBoxLoader />;
}
