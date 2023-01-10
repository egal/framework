import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import keycloak from "./keycloak";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { axios } from "./exios";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

// -------------------------------
// Fix error "Warning: [antd: Menu] `children` will be removed in next major version. Please use `items` instead.".
// Next lines, from:
// https://github.com/refinedev/refine/issues/1857#issuecomment-1242945776.
// -------------------------------
const _error = console.error;
const itemsWarning =
  "`children` will be removed in next major version. Please use `items` instead.";
console.error = function (msg, ...args) {
  if (!`${msg}`.includes(itemsWarning)) {
    _error.apply(console, [msg, ...args]);
  }
};
// -------------------------------

root.render(
  <>
    <ReactKeycloakProvider
      authClient={keycloak}
      onEvent={(event) => {
        // TODO: When need remove token from axios instance?
        switch (event) {
          case "onTokenExpired":
            keycloak.updateToken(600);
            break;
          case "onAuthSuccess":
          case "onAuthRefreshSuccess":
            axios.defaults.headers.common.Authorization = `Bearer ${keycloak.token}`;
            break;
        }
      }}
    >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ReactKeycloakProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
