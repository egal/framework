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
import { AuthContext } from '../../Contexts/Auth';
import {
  AuthConfig,
  authConfig as defaultAuthConfig,
  useAuth,
} from '../../Hooks/useAuth';

type AppConfig = {
  menu?: MenuItemConfig[];
  layout: React.ReactElement;
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
  layout,
  mobileResolutionSupport = true,
  interfaceConfig = defaultInterfaceConfig,
  authConfig = defaultAuthConfig,
}: AppConfig) {
  const MobileResolutionNotSupportedElement = !mobileResolutionSupport &&
    useWindowSize().width < 1200 && (
      <MobileResolutionNotSupportedFullLayerError />
    );

  // TODO: Recursive load routes.
  const RouterElement = (
    <Router>
      <Routes>
        {menu.map(({ path, element }: MenuItemConfig, key: number) => (
          <Route
            path={path}
            // TODO: Twice render because using React.cloneElement. Its convenient to user use.
            element={React.cloneElement(layout, { menuItems: menu }, element)}
            key={key}
          />
        ))}
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
