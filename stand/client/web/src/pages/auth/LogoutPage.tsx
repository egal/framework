import { FullBoxLoader, useAuthContext } from '@egalteam/framework';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

export function LogoutPage() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const navigateLogin = () => navigate('/login');

  useEffect(() => {
    // TODO: Logout not working, infinity loop.
    auth.logout().then(navigateLogin).catch(navigateLogin);
  }, []);

  return <FullBoxLoader />;
}
