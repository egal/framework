import { useState } from 'react';

const isBrowser = typeof window !== 'undefined';

type CookieOptions = {
  days?: number;
  path?: string;
  domain?: string;
  SameSite?: 'None' | 'Lax' | 'Strict';
  Secure?: boolean;
  HttpOnly?: boolean;
};

function stringifyOptions(options: CookieOptions) {
  return Object.keys(options).reduce((acc, key) => {
    if (key === 'days') {
      return acc;
    } else {
      if (options[key] === false) {
        return acc;
      } else if (options[key] === true) {
        return `${acc}; ${key}`;
      } else {
        return `${acc}; ${key}=${options[key]}`;
      }
    }
  }, '');
}

export const setCookie = (
  name: string,
  value: string,
  options?: CookieOptions
) => {
  if (!isBrowser) return;

  const optionsWithDefaults = {
    days: 7,
    path: '/',
    ...(options ?? {}),
  };

  const expires = new Date(
    Date.now() + optionsWithDefaults.days * 864e5
  ).toUTCString();

  document.cookie =
    name +
    '=' +
    encodeURIComponent(value) +
    '; expires=' +
    expires +
    stringifyOptions(optionsWithDefaults);
};

export const removeCookie = (name: string) => {
  setCookie(name, '', { days: -1 });
};

export const getCookie = (name: string, initialValue?: string) => {
  return (
    (isBrowser &&
      document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
      }, '')) ||
    initialValue
  );
};

export function useCookie(
  key: string,
  initialValue?: string
): {
  value: string | undefined;
  set: (value: string, options?: CookieOptions) => void;
  remove: () => void;
} {
  const [value, setValue] = useState(() => {
    return getCookie(key, initialValue);
  });

  const set = (value: string, options?: CookieOptions) => {
    setValue(value);
    setCookie(key, value, options ?? {});
  };

  const remove = () => {
    removeCookie(key);
  };

  return {
    //
    value,
    set,
    remove,
  };
}
