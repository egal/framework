import { createContext, useContext } from 'react';
import { Auth, authConfig, useAuth } from '../../Hooks';

const contextNotInitializedError = new Error('Context not initialized!');

export const AuthContext = createContext<Auth>([
  false,
  () => {
    throw contextNotInitializedError;
  },
  () => {
    throw contextNotInitializedError;
  },
  () => {
    throw contextNotInitializedError;
  },
  () => {
    throw contextNotInitializedError;
  },
]);

export function useAuthContext() {
  return useContext(AuthContext);
}
