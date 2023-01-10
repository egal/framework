import { AuthProvider } from '@pankod/refine-core';
import Keycloak from 'keycloak-js';

export function authProvider(keycloak: Keycloak): AuthProvider {
  // TODO: Remove @ts-ignore.
  // @ts-ignore
  return {
    login: async () => {
      return Promise.resolve();
    },
    logout: async () => {
      await keycloak.logout();

      return Promise.resolve('/');
    },
    checkError: async () => {
      return Promise.resolve();
    },
    checkAuth: async () => {
      return keycloak.authenticated ? Promise.resolve() : Promise.reject();
    },
    getPermissions: async () => {
      return Promise.resolve();
    },
    // TODO: Remove @ts-ignore.
    // @ts-ignore
    getUserIdentity: async () => {
      if (keycloak.authenticated) {
        if (!keycloak.profile) {
          await keycloak.loadUserProfile();
        }
        return Promise.resolve(keycloak.profile);
      }
    },
  };
}
