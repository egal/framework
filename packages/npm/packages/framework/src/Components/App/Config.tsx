export type AppConfig = {
  actions: {
    apiURL: string;
  };
};

export const appConfig = {
  actions: {
    apiURL: process.env.REACT_APP_API_URL ?? `${window.location.origin}/api`,
  },
};
