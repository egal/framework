import * as React from 'react';
import { PathRouteProps, Route, Routes } from 'react-router';
import MenuItemLink from './Navigate/MenuItemLink';
import MenuItemGroup from './Navigate/MenuItemGroup';

type Props = {
  menu: React.ReactElement;
  layout: any;
  additionalRoutes: PathRouteProps[];
};

export default class App extends React.Component<Props> {
  private scanRoutes = (menuItem: any, index: number) => {
    if (menuItem.type === MenuItemLink) {
      return (
        <Route
          path={menuItem.props.path}
          key={index}
          element={React.createElement(
            this.props.layout,
            { menu: this.props.menu },
            menuItem.props.children
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
