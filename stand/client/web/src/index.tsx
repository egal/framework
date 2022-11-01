import ReactDOM from 'react-dom/client';
import './index.css';
import {
  App,
  NotFoundFullLayerError as NotFound,
  authConfig,
  appConfig,
  AppConfig,
  RecursivePartial,
  Resource
} from '@egalteam/framework';
import { Heading } from 'grommet';
import { grommet as grommetTheme } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import React from 'react';
import { Test } from './components/Test';
import { LoginPage } from './pages/auth/LoginPage';
import { LogoutPage } from './pages/auth/LogoutPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { Layout } from './components/layouts/Main';
import { SpeakersResource } from './components/resources/SpeakersResource';
import { CountriesResourceWithRenamedButtons } from './components/resources/CountriesResourceWithRenamedButtons';
import { EmployeesWithFiltersResource } from './components/resources/EmployeesWithFiltersResource';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App
    mobileResolutionSupport={false}
    layout={Layout}
    theme={deepMerge(grommetTheme, {
      table: {
        footer: {
          background: {
            color: 'background-back'
          }
        }
      },
      dataTable: {
        pinned: {
          header: {
            background: {
              opacity: '0.9',
              color: 'background-front'
            }
          }
        }
      }
    })}
    config={deepMerge<AppConfig, RecursivePartial<AppConfig>>(appConfig, {})}
    authConfig={deepMerge(authConfig, {})}
    menu={[
      {
        header: 'Home',
        path: '/',
        element: <Heading>Home page</Heading>
      },
      { header: 'Test', path: '/test', element: <Test /> },
      {
        header: 'First',
        items: [
          { header: 'Second', path: '/second', element: <Heading>Second page</Heading> },
          { header: 'Third', path: '/third', element: <Heading>Third page</Heading> },
          {
            header: 'Fifth',
            items: [
              { header: 'Sixth', path: '/sixth', element: <Heading>Sixth page</Heading> },
              { header: 'Seventh', path: '/seventh', element: <Heading>Seventh page</Heading> }
            ]
          }
        ]
      },
      {
        header: 'Employees',
        items: [
          {
            header: 'Base',
            path: '/EmployeesResource',
            element: <Resource key={'EmployeesResource'} model={{ service: 'auth', name: 'Employee' }} />
          },
          {
            header: 'Filters',
            path: '/EmployeesWithFiltersResource',
            element: <EmployeesWithFiltersResource />
          }
        ]
      },
      {
        header: 'BroadcastMessage',
        path: '/BroadcastMessage',
        element: <Resource key={'BroadcastMessage'} model={{ service: 'notification', name: 'BroadcastMessage' }} />
      },
      {
        header: 'PersonalNotifications',
        path: '/PersonalNotifications',
        element: (
          <Resource key={'PersonalNotifications'} model={{ service: 'notification', name: 'PersonalNotification' }} />
        )
      },
      {
        header: 'Speakers',
        path: '/speakers',
        element: <SpeakersResource />
      },
      {
        header: 'Countries #1',
        path: '/countries-1',
        element: <CountriesResourceWithRenamedButtons />
      }
    ]}
    additionalRoutes={[
      { path: '*', element: <NotFound /> },
      { path: '/custom', element: <h1>Custom route!</h1> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/logout', element: <LogoutPage /> }
    ]}
  />
);
