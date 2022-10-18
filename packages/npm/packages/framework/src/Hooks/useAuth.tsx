import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useCookie } from './useCookie';

export type AuthConfig = {
  authServiceName: string;
};

export const authConfig: AuthConfig = {
  authServiceName: 'auth',
};

type Token = {
  raw: string;
};

type MasterToken = Token & {
  //
};

export type ServiceToken = Token;

type ServicesTokens<ServiceTokenType extends ServiceToken = any> =
  ServiceTokenType[];

export type Auth = {
  logged: boolean;
  getMasterToken: () => MasterToken;
  getServiceToken: <ServiceTokenType = any>(
    serviceName: string
  ) => ServiceTokenType;
  login: (rawMasterToken: string) => Promise<void>;
  logout: () => Promise<void>;
};

export function useAuth(config: AuthConfig = authConfig): Auth {
  const [logged, setLogged] = useState<boolean>(false);
  const [masterToken, setMasterToken] = useState<MasterToken>();
  const [servicesTokens, setServicesTokens] = useState<ServicesTokens>([]);

  const cookieMasterToken = useCookie('master_token');

  const getMasterToken = (): MasterToken => {
    if (!logged) {
      throw new Error(
        'Getting master token is impossible, because user not logged!'
      );
    }

    if (masterToken === undefined) {
      throw new Error('Master token is undefined!');
    }

    return masterToken;
  };

  const rawLogin = (rawMasterToken: string): void => {
    if (logged) {
      throw new Error('Login impossible, because already logged!');
    }

    setMasterToken({
      raw: rawMasterToken,
      ...jwtDecode<Omit<MasterToken, 'raw'>>(rawMasterToken),
    });
    setLogged(true);
  };

  // TODO: Default value for ServiceTokenType.
  const getServiceToken = <ServiceTokenType,>(
    serviceName: string
  ): ServiceTokenType => {
    // TODO: Implementation.
    throw new Error('Not implemented!');
  };

  if (!logged && cookieMasterToken.value !== undefined) {
    rawLogin(cookieMasterToken.value);
  }

  return {
    logged,
    getMasterToken,
    getServiceToken,
    login: (rawMasterToken: string) => {
      return new Promise((resolve) => {
        rawLogin(rawMasterToken);
        cookieMasterToken.set(rawMasterToken);
        resolve();
      });
    },
    logout: () => {
      return new Promise((resolve, reject) => {
        try {
          if (!logged) {
            throw new Error('Logout impossible, because not logged!');
          }

          setServicesTokens([]);
          setMasterToken(undefined);
          cookieMasterToken.remove();
          setLogged(false);
          resolve();
        } catch (e) {
          reject();
        }
      });
    },
  };
}
