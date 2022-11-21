import ReactDOM from 'react-dom/client';
import './index.css';
import {
  App,
  NotFoundFullLayerError as NotFound,
  authConfig,
  appConfig,
  AppConfig,
  RecursivePartial,
  Resource,
  SupportedWindowsSize,
  Select,
} from '@egalteam/framework';
import { FormField, Heading, TextInput } from 'grommet';
import { grommet as grommetTheme } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import React from 'react';
import { Test } from './components/Test';
import { LoginPage } from './pages/auth/LoginPage';
import { LogoutPage } from './pages/auth/LogoutPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { Layout } from './components/layouts/Main';
import { EmployeesWithFiltersResource } from './components/resources/EmployeesWithFiltersResource';
import i18next from './i18next';
import { SpeakersAsCardsResource } from './components/resources/SpeakersAsCardsResource';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SupportedWindowsSize min={{ width: 1200 }}>
    <App
      i18n={i18next}
      layout={Layout}
      theme={deepMerge(grommetTheme, {
        table: {
          footer: {
            background: {
              color: 'background-back',
            },
          },
        },
        dataTable: {
          pinned: {
            header: {
              background: {
                opacity: '0.9',
                color: 'background-front',
              },
            },
          },
        },
      })}
      config={deepMerge<AppConfig, RecursivePartial<AppConfig>>(appConfig, {})}
      authConfig={deepMerge(authConfig, {})}
      menu={[
        { header: 'Home', path: '/', element: <Heading>Home page</Heading> },
        { header: 'Test', path: '/test', element: <Test /> },
        {
          header: 'Auth',
          items: [
            {
              header: 'Employees',
              items: [
                {
                  header: 'Base',
                  path: '/EmployeesResource',
                  element: <Resource key={'EmployeesResource'} model={{ service: 'auth', name: 'Employee' }} />,
                },
                {
                  header: 'Filters',
                  path: '/EmployeesWithFiltersResource',
                  element: <EmployeesWithFiltersResource />,
                },
              ],
            },
          ],
        },
        {
          header: 'Core',
          items: [
            {
              header: 'Speaker',
              items: [
                {
                  header: 'Speaker',
                  path: '/speaker',
                  element: <Resource key={'Speaker'} model={{ service: 'core', name: 'Speaker' }} />,
                },
                {
                  header: 'SpeakersAsCardsResource',
                  path: '/SpeakersAsCardsResource',
                  element: <SpeakersAsCardsResource />,
                },
              ],
            },
            {
              header: 'School',
              path: '/School',
              element: <Resource key={'School'} model={{ service: 'core', name: 'School' }} />,
            },
            {
              header: 'LessonRequest',
              path: '/LessonRequest',
              element: (
                <Resource key={'LessonRequest'} model={{ service: 'core', name: 'LessonRequest' }}>
                  <Resource.Actions>
                    <Resource.Actions.Create>
                      <FormField label={'Speaker'}>
                        <Select
                          name={'speaker_id'}
                          model={{ name: 'Speaker', service: 'core' }}
                          valueKey={{ key: 'id', reduce: true }}
                          labelKey={'name'}
                        />
                      </FormField>
                      <FormField label={'School'}>
                        <Select
                          name={'school_id'}
                          model={{ name: 'School', service: 'core' }}
                          valueKey={{ key: 'id', reduce: true }}
                          labelKey={'name'}
                        />
                      </FormField>
                      <FormField label={'Stage'} component={TextInput} name={'stage'} />
                    </Resource.Actions.Create>
                  </Resource.Actions>
                  <Resource.DataTable />
                  <Resource.Pagination />
                </Resource>
              ),
            },
          ],
        },
        {
          header: 'Notification',
          items: [
            {
              header: 'BroadcastMessage',
              path: '/BroadcastMessage',
              element: (
                <Resource key={'BroadcastMessage'} model={{ service: 'notification', name: 'BroadcastMessage' }} />
              ),
            },
            {
              header: 'PersonalNotification',
              path: '/PersonalNotification',
              element: (
                <Resource
                  key={'PersonalNotifications'}
                  model={{ service: 'notification', name: 'PersonalNotification' }}
                />
              ),
            },
            {
              header: 'EmailNotification',
              path: '/EmailNotification',
              element: (
                <Resource key={'EmailNotification'} model={{ service: 'notification', name: 'EmailNotification' }} />
              ),
            },
          ],
        },
      ]}
      additionalRoutes={[
        { path: '*', element: <NotFound /> },
        { path: '/custom', element: <h1>Custom route!</h1> },
        { path: '/login', element: <LoginPage /> },
        { path: '/register', element: <RegisterPage /> },
        { path: '/logout', element: <LogoutPage /> },
      ]}
    />
  </SupportedWindowsSize>
);
