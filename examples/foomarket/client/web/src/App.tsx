import React, { useEffect } from "react";
import {
  notificationProvider,
  Layout,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-antd";
import "@pankod/refine-antd/dist/reset.css";
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import "@pankod/refine-antd/dist/reset.css";
import { Login } from "./pages/login";
import { useKeycloak } from "@react-keycloak/web";
import { dataProvider } from "@egal/refine-laravel-orion";
import { authProvider } from "@egal/refine-keycloak";
import { API_URL, INVENTORY_DATA_PROVIDER } from "./constants";
import { axios } from "./exios";
import { ProductList } from "./pages/product/list";
import { ProductCreate } from "./pages/product/create";
import { MovementList } from "./pages/movement/list";
import { MovementCreate } from "./pages/movement/create";

function App() {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return <>Loading...</>;
  }

  return (
    <Refine
      authProvider={authProvider(keycloak)}
      LoginPage={Login}
      dataProvider={{
        default: dataProvider(API_URL, axios),
        [INVENTORY_DATA_PROVIDER]: dataProvider(
          `${API_URL}/inventory/api`,
          axios
        ),
      }}
      notificationProvider={notificationProvider}
      Layout={Layout}
      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      routerProvider={routerProvider}
      resources={[
        {
          name: "products",
          list: ProductList,
          create: ProductCreate,
          options: {
            dataProviderName: INVENTORY_DATA_PROVIDER,
          },
        },
        {
          name: "movements",
          list: MovementList,
          create: MovementCreate,
          options: {
            dataProviderName: INVENTORY_DATA_PROVIDER,
          },
        },
      ]}
    />
  );
}

export default App;
