import * as React from 'react';
import { Grommet, ThemeType } from 'grommet';
import {
  Route,
  Routes,
  BrowserRouter as Router,
  PathRouteProps,
} from 'react-router-dom';
import {
  MobileResolutionNotSupportedFullLayerError,
  MenuItemConfig,
} from '../../Widgets';
import { useWindowSize } from '../../Hooks';
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
  mobileResolutionSupport?: boolean;
  authConfig?: AuthConfig;
  config?: AppConfig;
};

export function App({
  menu = [],
  theme,
  additionalRoutes = [],
  layout: Layout,
  mobileResolutionSupport = true,
  authConfig = defaultAuthConfig,
  config = appConfig,
}: Props) {
  const MobileResolutionNotSupportedElement = !mobileResolutionSupport &&
    useWindowSize().width < 1200 && (
      <MobileResolutionNotSupportedFullLayerError />
    );

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

  return (
    <Grommet theme={theme}>
      <AuthContext.Provider value={useAuth(authConfig)}>
        <AppContext.Provider value={{ config }}>
          {MobileResolutionNotSupportedElement}
          {RouterElement}
        </AppContext.Provider>
      </AuthContext.Provider>
    </Grommet>
  );
}
