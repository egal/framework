import * as React from 'react';
import { PathRouteProps, Route, Routes } from 'react-router-dom';
import MenuItemLink from './Navigate/MenuItemLink';
import MenuItemGroup from './Navigate/MenuItemGroup';
import { ReactElement } from 'react';

type Props = {
  menu: React.ReactElement;
  layout: any;
  additionalRoutes: PathRouteProps[];
};

export default class App extends React.Component<Props> {
  private scanRoutes = (menuItem: ReactElement) => {
    if (menuItem.type === MenuItemLink) {
      return (
        <Route
          path={menuItem.props.path}
          element={React.createElement(
            this.props.layout,
            { menu: this.props.menu },
            menuItem.props.element
          )}
        />
      );
    } else if (menuItem.type === MenuItemGroup) {
      return menuItem.props.children.map(this.scanRoutes);
    }
  };

  render() {
    return (
      <Routes>
        {this.props.menu.props.children.map(this.scanRoutes)}
        {this.props.additionalRoutes.map((routeProps: PathRouteProps) => {
          return React.createElement(Route, routeProps);
        })}
      </Routes>
    );
  }
}
