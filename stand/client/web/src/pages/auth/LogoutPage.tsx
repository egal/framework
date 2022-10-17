import { FullBoxLoader, useAuthContext } from '@egalteam/framework';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

export function LogoutPage() {
  const auth = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    auth.logout(); // TODO: Logout not working.
    navigate('/login');
  }, []);

  return <FullBoxLoader />;
}
