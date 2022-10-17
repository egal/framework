import { createContext, useContext } from 'react';
import { Auth } from '../../Hooks';

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
  return useContext(AuthContext);
}
