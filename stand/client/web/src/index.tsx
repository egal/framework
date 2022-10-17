import ReactDOM from 'react-dom/client';
import './index.css';
import { App, NotFoundFullLayerError as NotFound, interfaceConfig, authConfig, Resource } from '@egalteam/framework';
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
    interfaceConfig={deepMerge(interfaceConfig, {
      dataTableResource: {
        createButton: {
          label: 'Create'
        }
      }
    })}
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
        // TODO: Show and set (create/update) relation one2many (employee.country.name).
        header: 'Employees',
        path: '/employees',
        element: <EmployeesResource />
      },
      {
        header: 'Speakers',
        path: '/speakers',
        element: (
          <Resource
            key={'speakers'}
            model={{ service: 'core', name: 'Speaker' }}
            //
          >
            <Resource.DataTable
              columns={[
                //
                { property: 'id', header: 'ID' },
                { property: 'name', header: 'Name' }
              ]}
            />
          </Resource>
        )
      }
    ]}
    additionalRoutes={[
      { path: '*', element: <NotFound /> },
      { path: '/custom', element: <Heading>Custom route!</Heading> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/logout', element: <LogoutPage /> }
    ]}
  />
);
