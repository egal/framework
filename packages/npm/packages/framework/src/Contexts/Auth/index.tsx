import { createContext, useContext } from 'react';
import { Auth } from '../../Hooks';

export const AuthContext = createContext<Auth | undefined>(undefined);

export function useAuthContext(): Auth {
  const context = useContext(AuthContext);

  if (context === undefined) throw new Error('Context not initialized!');

  return context;
}
