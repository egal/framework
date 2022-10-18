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
import {
  interfaceConfig as defaultInterfaceConfig,
  InterfaceConfig,
  InterfaceConfigContext,
} from '../../Contexts/InterfaceConfig';
import { AuthContext } from '../../Contexts';
import {
  AuthConfig,
  authConfig as defaultAuthConfig,
  useAuth,
} from '../../Hooks/useAuth';

type AppConfig = {
  menu?: MenuItemConfig[];
  layout: React.ComponentType<any>;
  theme: ThemeType;
  additionalRoutes?: PathRouteProps[];
  mobileResolutionSupport?: boolean;
  interfaceConfig?: InterfaceConfig;
  authConfig?: AuthConfig;
};

export function App({
  menu = [],
  theme,
  additionalRoutes = [],
  layout: Layout,
  mobileResolutionSupport = true,
  interfaceConfig = defaultInterfaceConfig,
  authConfig = defaultAuthConfig,
}: AppConfig) {
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
        <InterfaceConfigContext.Provider value={interfaceConfig}>
          {MobileResolutionNotSupportedElement}
          {RouterElement}
        </InterfaceConfigContext.Provider>
      </AuthContext.Provider>
    </Grommet>
  );
}
