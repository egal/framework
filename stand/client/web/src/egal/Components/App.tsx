import * as React from 'react';
import { PathRouteProps, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Grommet } from 'grommet';

export interface MenuItemConfig {
  header: string;
  path?: string;
  items?: MenuItemConfig[];
  render?: React.ReactElement;
  element?: React.ReactElement;
}

export interface MenuConfig {
  logotype?: string;
  items: MenuItemConfig[];
}

interface Props {
  menu: MenuConfig;
  layout: any;
  additionalRoutes?: PathRouteProps[];
}

export default class App extends React.Component<Props> {
  private scanRoutes = (menuItem: MenuItemConfig, key: number): React.ReactElement => {
    if (menuItem.items === undefined) {
      return (
        <Route
          path={menuItem.path}
          element={React.createElement(this.props.layout, { menu: this.props.menu }, menuItem.element)}
          key={key}
        />
      );
    } else {
      return (
        <Route path={'/'} key={key}>
          {menuItem.items.map(this.scanRoutes)}
        </Route>
      );
    }
  };

  render() {
    return (
      <Grommet>
        <Router>
          <Routes>
            {this.props.menu.items.map(this.scanRoutes)}
            {this.props.additionalRoutes?.map((routeProps: PathRouteProps, key: number) => {
              return React.createElement(Route, { ...routeProps, key: key });
            })}
          </Routes>
        </Router>
      </Grommet>
    );
  }
}
