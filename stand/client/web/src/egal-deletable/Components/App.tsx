import * as React from 'react';
import { PathRouteProps, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Box, Grommet, Heading, Layer } from 'grommet';
import { Close, Halt, PhoneVertical } from 'grommet-icons';

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
  mobileSupport?: boolean;
  menu: MenuConfig;
  layout: any;
  theme: any;
  additionalRoutes?: PathRouteProps[];
}

interface State {
  isOnMobileDevice: boolean;
}

export default class App extends React.Component<Props, State> {
  static defaultProps: Props | any = {
    mobileSupport: false
  };

  static defaultState: State = {
    isOnMobileDevice: true
  };

  constructor(props: Props) {
    super(props);
    this.state = App.defaultState;

    this.isOnMobileDeviceUpdate = this.isOnMobileDeviceUpdate.bind(this);
  }

  isOnMobileDeviceUpdate() {
    this.setState({ isOnMobileDevice: window.screen.width < 1200 });
  }

  componentDidMount() {
    window.addEventListener('resize', this.isOnMobileDeviceUpdate);
    this.isOnMobileDeviceUpdate();
  }

  private scanRoutes = (menuItem: MenuItemConfig, key: number): React.ReactElement => {
    return menuItem.items === undefined ? (
      <Route
        path={menuItem.path}
        element={React.createElement(this.props.layout, { menu: this.props.menu }, menuItem.element)}
        key={key}
      />
    ) : (
      <Route path={'/'} key={key}>
        {menuItem.items.map(this.scanRoutes)}
      </Route>
    );
  };

  render() {
    return (
      <Grommet theme={this.props.theme}>
        {this.state.isOnMobileDevice ? (
          <Layer full>
            <Box fill align="center" justify="center">
              <Box direction={'row'}>
                <Halt size={'xlarge'} color={'dark-1'} />
                <Close size={'xlarge'} color={'dark-1'} />
                <PhoneVertical size={'xlarge'} color={'dark-1'} />
              </Box>
              <Heading color={'dark-1'}>View from mobile not supported!</Heading>
            </Box>
          </Layer>
        ) : (
          <Router>
            <Routes>
              {this.props.menu.items.map(this.scanRoutes)}
              {this.props.additionalRoutes?.map((routeProps: PathRouteProps, key: number) => {
                return React.createElement(Route, { ...routeProps, key: key });
              })}
            </Routes>
          </Router>
        )}
      </Grommet>
    );
  }
}
