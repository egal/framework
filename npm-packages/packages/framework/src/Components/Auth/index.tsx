import * as React from 'react';
import { useAuthContext } from '../../Contexts';
import { redirect } from 'react-router-dom';

// TODO: Test this components.

export function PrivateElement({
  element,
  onFailure = () => redirect('/login'),
}: {
  element: React.ReactNode;
  onFailure?: () => void;
}) {
  const [logged] = useAuthContext();
  return logged ? element : onFailure();
}

export function GuestElement({
  element,
  onFailure = () => redirect('/logout'),
}: {
  element: React.ReactNode;
  onFailure?: () => void;
}) {
  const [logged] = useAuthContext();
  return !logged ? element : onFailure();
}
