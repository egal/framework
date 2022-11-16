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

export type AuthConfig = {
  service: string;
};

export const authConfig: AuthConfig = {
  service: 'auth',
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
  logged: boolean;
  getMasterToken: () => MasterToken;
  getServiceToken: <SubType = any>(
    serviceName: string
  ) => Promise<ServiceToken<SubType>>;
  login: (rawMasterToken: string) => Promise<void>;
  logout: () => Promise<void>;
};

export function useAuth(config: AuthConfig = authConfig): Auth {
  const [logged, setLogged] = useState<boolean>(false);
  const [masterToken, setMasterToken] = useState<MasterToken>();
  const [servicesTokens, setServicesTokens] = useState<ServicesTokens>({});

  // TODO: Refactoring.
  type Res = { data: string };
  const actionLoginToService = useAction<Res, any, any>(
    { service: config.service, name: 'User' },
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

  useEffect(() => {
    if (!logged && cookieMasterToken.value !== undefined) {
      rawLogin(cookieMasterToken.value);
    }
  }, []);

  return {
    logged,

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
        const now = Date.now() / 1000;
        return now > token.exp - 10;
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
      let cookieToken: typeof token;
      let stateToken: typeof token;

      token = stateToken = servicesTokens[serviceName];
      if (token === undefined) token = cookieToken = getFromCookie();
      if (token === undefined || expired(token)) token = await loginToService();
      if (cookieToken === undefined || expired(cookieToken))
        cookieSetServiceToken(serviceName, token.raw);
      if (stateToken === undefined || expired(stateToken))
        setServicesTokens({ ...servicesTokens, [serviceName]: token });

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
