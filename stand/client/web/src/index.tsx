import ReactDOM from 'react-dom/client';
import './index.css';
import {
  App,
  NotFoundFullLayerError as NotFound,
  authConfig,
  appConfig,
  AppConfig,
  RecursivePartial
} from '@egalteam/framework';
import { Heading } from 'grommet';
import { grommet as grommetTheme } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import React from 'react';
import { EmployeesResource } from './components/resources/EmployeesResource';
import { Test } from './components/Test';
import { LoginPage } from './pages/auth/LoginPage';
import { LogoutPage } from './pages/auth/LogoutPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { Layout } from './components/layouts/Main';
import { SpeakersResource } from './components/resources/SpeakersResource';

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
      { header: 'Home', path: '/', element: <Heading>Home page</Heading> },
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
        path: '/employees',
        element: <EmployeesResource />
      },
      {
        header: 'Speakers',
        path: '/speakers',
        element: <SpeakersResource />
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
