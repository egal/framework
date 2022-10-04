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

export type Auth = [
  logged: boolean,
  getMasterToken: () => MasterToken,
  getServiceToken: <ServiceTokenType = any>(
    serviceName: string
  ) => ServiceTokenType,
  login: (rawMasterToken: string) => void,
  logout: () => void
];

export function useAuth(config: AuthConfig = authConfig): Auth {
  const [logged, setLogged] = useState<boolean>(false);
  const [masterToken, setMasterToken] = useState<MasterToken>();
  const [servicesTokens, setServicesTokens] = useState<ServicesTokens>([]);

  const [cookieMasterToken, setCookieMasterToken] = useCookie('master_token');

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

  const login = (rawMasterToken: string): void => {
    rawLogin(rawMasterToken);
    setCookieMasterToken(rawMasterToken);
  };

  const logout = (): void => {
    if (!logged) {
      throw new Error('Logout impossible, because not logged!');
    }

    setServicesTokens([]);
    setMasterToken(undefined);
    setLogged(false);
  };

  // TODO: Default value for ServiceTokenType.
  const getServiceToken = <ServiceTokenType,>(
    serviceName: string
  ): ServiceTokenType => {
    // TODO: Implementation.
    throw new Error('Not implemented!');
  };

  if (!logged && cookieMasterToken !== undefined) {
    rawLogin(cookieMasterToken);
  }

  return [
    //
    logged,
    getMasterToken,
    getServiceToken,
    login,
    logout,
  ];
}
