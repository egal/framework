import { createContext, ReactNode, useContext } from 'react';
import { Auth, AuthConfig, useAuth } from '../../Hooks';

const contextNotInitializedErrorCallback = () => {
  throw new Error('Context not initialized!');
};

export const AuthContext = createContext<Auth>({
  logged: false,
  getMasterToken: contextNotInitializedErrorCallback,
  getServiceToken: contextNotInitializedErrorCallback,
  login: contextNotInitializedErrorCallback,
  logout: contextNotInitializedErrorCallback,
});

export function useAuthContext(): Auth {
  // TODO: Exception "Not in context".
  return useContext(AuthContext);
}
