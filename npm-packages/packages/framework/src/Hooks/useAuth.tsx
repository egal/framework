import { useState } from 'react';
import jwtDecode from 'jwt-decode';

export type AuthConfig = {
  //
};

export const authConfig: AuthConfig = {
  //
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

  const login = (rawMasterToken: string): void => {
    if (logged) {
      throw new Error('Login impossible, because already logged!');
    }

    setMasterToken({
      raw: rawMasterToken,
      ...jwtDecode<Omit<MasterToken, 'raw'>>(rawMasterToken),
    });
    setLogged(true);
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

  return [
    //
    logged,
    getMasterToken,
    getServiceToken,
    login,
    logout,
  ];
}
