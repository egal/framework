export const API_URL =
  process.env.REACT_APP_API_URL ??
  `${window.location.protocol}//server.${window.location.host}`;

export const KEYCLOAK_URL =
  process.env.REACT_APP_KEYCLOAK_URL ??
  `${window.location.protocol}//id.${window.location.host}`;

export const KEYCLOAK_REALM = "master";

export const KEYCLOAK_CLIENT_ID = "web";
