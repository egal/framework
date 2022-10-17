import ReactDOM from 'react-dom/client';
import './index.css';
import {
  App,
  NotFoundFullLayerError as NotFound,
  interfaceConfig,
  authConfig,
  Resource,
  Select
} from '@egalteam/framework';
import { Heading, TextInput, FormField } from 'grommet';
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
            config={{
              getItems: {
                initParams: {
                  relations: ['country']
                }
              }
            }}>
            <Resource.Actions>
              <Resource.Actions.Create>
                <FormField name="name" component={TextInput} label="Name" required />
                <FormField name="surname" component={TextInput} label="Surname" required />
                <FormField label={'Country'}>
                  <Select
                    name={'country_id'}
                    model={{ name: 'Country', service: 'core' }}
                    valueKey={{ key: 'id', reduce: true }}
                    labelKey={'name'}
                  />
                </FormField>
                <FormField label={'User'}>
                  <Select
                    name={'user_id'}
                    model={{ name: 'User', service: 'auth' }}
                    valueKey={{ key: 'id', reduce: true }}
                    labelKey={'email'}
                  />
                </FormField>
              </Resource.Actions.Create>
              <Resource.Actions.Update>
                <FormField name="name" component={TextInput} label="Name" required />
                <FormField name="surname" component={TextInput} label="Surname" required />
                <FormField label={'Country'}>
                  <Select
                    name={'country_id'}
                    model={{ name: 'Country', service: 'core' }}
                    valueKey={{ key: 'id', reduce: true }}
                    labelKey={'name'}
                  />
                </FormField>
                <FormField label={'User'}>
                  <Select
                    disabled
                    name={'user_id'}
                    model={{ name: 'User', service: 'auth' }}
                    valueKey={{ key: 'id', reduce: true }}
                    labelKey={'email'}
                  />
                </FormField>
              </Resource.Actions.Update>
            </Resource.Actions>
            <Resource.DataTable
              columns={[
                { property: 'id', header: 'ID' },
                { property: 'name', header: 'Name' },
                { property: 'country_id', header: 'Country ID' },
                { property: 'country.name', header: 'Country name' }
              ]}
            />
          </Resource>
        )
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
