import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import {
  getCookie,
  removeCookie,
  removeCookieByPattern,
  setCookie,
  useCookie,
} from './useCookie';
import { useAction } from './Actions';
import { deepMerge } from 'grommet/utils';
import { RecursivePartial } from '../Utils';

export type AuthConfig = {
  service: string;
  jwt: {
    leeway: number | (() => number);
  };
};

export const authConfig: AuthConfig = {
  service: 'auth',
  jwt: {
    leeway: -10,
  },
};

type Token<SubType> = {
  raw: string;
  typ: string;
  sub: SubType;
  exp: number;
};

type MasterTokenSubType = any;
type MasterToken = Token<MasterTokenSubType>;

export type ServiceToken<SubType> = Token<SubType>;

// TODO: Not any.
type ServicesTokens = { [key: string]: ServiceToken<any> };

export type Auth = {
  isLogged: () => boolean;
  getMasterToken: () => MasterToken;
  getServiceToken: <SubType = any>(
    serviceName: string
  ) => Promise<ServiceToken<SubType>>;
  login: (rawMasterToken: string) => Promise<void>;
  logout: () => Promise<void>;
};

export function useAuth(config: RecursivePartial<AuthConfig> = {}): Auth {
  const mConfig: AuthConfig = deepMerge(config, authConfig);

  const [logged, setLogged] = useState<boolean | undefined>(undefined);
  const [masterToken, setMasterToken] = useState<MasterToken>();
  const [servicesTokens, setServicesTokens] = useState<ServicesTokens>({});

  // TODO: Refactoring.
  type Res = { data: string };
  const actionLoginToService = useAction<Res, any, any>(
    { service: mConfig.service, name: 'User' },
    'loginToService'
  );

  const cookieMasterToken = useCookie('master_token');

  const cookieServiceTokenNamePostfix = '_service_token';

  const cookieGetServiceToken = (serviceName: string) =>
    getCookie(`${serviceName}${cookieServiceTokenNamePostfix}`);

  const cookieSetServiceToken = (serviceName: string, raw: string) =>
    setCookie(`${serviceName}${cookieServiceTokenNamePostfix}`, raw);

  const cookieRemoveServiceToken = (serviceName: string) =>
    removeCookie(`${serviceName}${cookieServiceTokenNamePostfix}`);

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

  const logout = (): Promise<void> => {
    return new Promise((resolve) => {
      if (!logged) {
        throw new Error('Logout impossible, because not logged!');
      }

      setServicesTokens({});
      setMasterToken(undefined);
      cookieMasterToken.remove();
      removeCookieByPattern(new RegExp(`^.*${cookieServiceTokenNamePostfix}$`));
      setLogged(false);
      resolve();
    });
  };

  const loginFromCookieIfLoggedIsUndefined = (): boolean => {
    if (logged !== undefined) return logged;

    if (cookieMasterToken.value === undefined) {
      setLogged(false);
      return false;
    } else {
      rawLogin(cookieMasterToken.value);
      return true;
    }
  };

  useEffect(() => {
    loginFromCookieIfLoggedIsUndefined();
  }, []);

  return {
    isLogged: () =>
      logged !== undefined ? logged : loginFromCookieIfLoggedIsUndefined(),

    getMasterToken: (): MasterToken => {
      if (!logged)
        throw new Error(
          'Getting master token is impossible, because user not logged!'
        );

      if (masterToken === undefined)
        throw new Error('Master token is undefined!');

      return masterToken;
    },

    getServiceToken: async <SubType,>(
      serviceName: string
    ): Promise<ServiceToken<SubType>> => {
      if (!logged)
        throw new Error(
          'Login to service is impossible, because user not logged!'
        );

      const decode = (raw: string): ServiceToken<any> => {
        return { ...jwtDecode(raw), raw };
      };

      const expired = (token: ServiceToken<any>): boolean => {
        const leeway =
          typeof mConfig.jwt.leeway === 'number'
            ? mConfig.jwt.leeway
            : mConfig.jwt.leeway();
        const now = Date.now() / 1000;
        return now > token.exp + leeway;
      };

      const loginToService = async (): Promise<ServiceToken<any>> => {
        if (masterToken === undefined)
          throw new Error(
            'Login to service is impossible, because master token is not set!'
          );

        // TODO: Refresh master token.
        if (expired(masterToken)) {
          await logout();
          throw new Error('Master token expired! Logout.');
        }

        // TODO: Without @ts-ignore, how?
        // @ts-ignore
        const raw: string = await actionLoginToService.call({
          token: masterToken.raw,
          service_name: serviceName,
        });

        return decode(raw);
      };

      const getFromCookie = (): ServiceToken<any> | undefined => {
        const cookieRaw = cookieGetServiceToken(serviceName);
        return cookieRaw === undefined ? undefined : decode(cookieRaw);
      };

      let token: ServiceToken<any> | undefined;

      token = servicesTokens[serviceName] ?? getFromCookie();

      if (token === undefined || expired(token)) {
        token = await loginToService();
        cookieSetServiceToken(serviceName, token.raw);
        setServicesTokens({ ...servicesTokens, [serviceName]: token });
      }

      return token;
    },

    login: (rawMasterToken: string) => {
      return new Promise((resolve) => {
        rawLogin(rawMasterToken);
        cookieMasterToken.set(rawMasterToken);
        resolve();
      });
    },

    logout,
  };
}
