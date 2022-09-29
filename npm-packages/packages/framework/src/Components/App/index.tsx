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

type AppConfig = {
  menu?: MenuItemConfig[];
  layout: React.ReactElement;
  theme: ThemeType;
  additionalRoutes?: PathRouteProps[];
  mobileResolutionSupport?: boolean;
};

export function App({
  menu = [],
  theme,
  additionalRoutes = [],
  layout,
  mobileResolutionSupport = true,
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
        {additionalRoutes?.map((route, key) =>
          React.createElement(Route, { ...route, key: key })
        )}
      </Routes>
    </Router>
  );

  return (
    <Grommet theme={theme}>
      {MobileResolutionNotSupportedElement}
      {RouterElement}
    </Grommet>
  );
}
