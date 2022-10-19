import React, { createContext, useContext } from 'react';
import { AppConfig, appConfig } from './Config';

type App = {
  config: AppConfig;
};

export const app: App = {
  config: appConfig,
};

export const AppContext = createContext<App | undefined>(undefined);

export function useAppContext(): App {
  const context = useContext(AppContext);
  if (!context) throw new Error('Must be used in AppContext!');

  return context;
}
