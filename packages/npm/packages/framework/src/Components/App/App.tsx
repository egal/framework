import * as React from 'react';
import { Grommet, ThemeType } from 'grommet';
import {
  Route,
  Routes,
  BrowserRouter as Router,
  PathRouteProps,
} from 'react-router-dom';
import { MenuItemConfig } from '../../Widgets';
import { AuthContext } from '../../Contexts';
import {
  AuthConfig,
  authConfig as defaultAuthConfig,
  useAuth,
} from '../../Hooks/useAuth';
import { AppContext } from './Context';
import { AppConfig, appConfig } from './Config';

type Props = {
  menu?: MenuItemConfig[];
  layout: React.ComponentType<any>;
  theme: ThemeType;
  additionalRoutes?: PathRouteProps[];
  authConfig?: AuthConfig;
  config?: AppConfig;
};

export function App({
  menu = [],
  theme,
  additionalRoutes = [],
  layout: Layout,
  authConfig = defaultAuthConfig,
  config = appConfig,
}: Props) {
  const routeGenerator = (
    { path, element, items }: MenuItemConfig,
    key: number
  ): React.ReactElement[] => {
    if (items) {
      return items.flatMap(routeGenerator);
    }

    return [
      <Route
        path={path}
        element={<Layout menu={menu}>{element}</Layout>}
        key={key}
      />,
    ];
  };

  const RouterElement = (
    <Router>
      <Routes>
        {...menu.flatMap(routeGenerator)}
        {additionalRoutes?.map((route, key) => (
          <Route key={key} {...route} />
        ))}
      </Routes>
    </Router>
  );

  const AuthContextThere = ({ children }: { children: React.ReactNode }) => {
    const auth = useAuth(authConfig);

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
  };

  return (
    <Grommet theme={theme}>
      <AppContext.Provider value={{ config }}>
        <AuthContextThere>{RouterElement}</AuthContextThere>
      </AppContext.Provider>
    </Grommet>
  );
}
