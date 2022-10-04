import ReactDOM from 'react-dom/client';
import './index.css';
import logo from './assets/logo.svg';
import {
  App,
  Layout,
  DataTableResource,
  NotFoundFullLayerError as NotFound,
  interfaceConfig,
  authConfig,
  useAction,
  useAuthContext
} from '@egalteam/framework';
import { Box, Heading, Layer, Meter as GrommetMeter, Form, FormField, TextInput, Button } from 'grommet';
import { grommet as grommetTheme } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import React, { useState } from 'react';
import { Link, redirect } from 'react-router-dom';

function LoginComponent() {
  const [formValue, setFormValue] = useState({ email: '', password: '' });
  const [
    //
    logged,
    getMasterToken,
    getServiceToken,
    login,
    logout
  ] = useAuthContext();

  return (
    // TODO: Without Layer.
    <Layer full animation={'none'}>
      <Box fill align={'center'} justify={'center'}>
        <Form
          value={formValue}
          onChange={(newValue) => setFormValue(newValue)}
          onSubmit={() => {
            useAction('http://localhost:8080', 'auth', 'User', 'login', formValue).then(
              ({ user_master_token }: { user_master_token: string }) => {
                // TODO: Use UMRT.
                login(user_master_token);
              }
            );
          }}>
          <Box gap={'small'}>
            <Heading>Login</Heading>
            <FormField name={'email'}>
              <TextInput id={'email'} name={'email'} placeholder={'my@email.com'} />
            </FormField>
            <FormField name={'password'}>
              <TextInput id={'password'} name={'password'} placeholder={'*****'} type={'password'} />
            </FormField>
            <Button type={'submit'} label={'Login'} primary />
            {/* TODO: Remake to ReactRouterDOM.Link */}
            <a href={'/register'}>
              <Button label={'Register'} />
            </a>
          </Box>
        </Form>
      </Box>
    </Layer>
  );
}

function RegisterComponent() {
  const [formValue, setFormValue] = useState({ email: null, password: null });

  return (
    // TODO: Without Layer.
    <Layer full animation={'none'}>
      <Box fill align={'center'} justify={'center'}>
        <Form
          value={formValue}
          onChange={(newValue) => setFormValue(newValue)}
          onSubmit={() => {
            // TODO: Make redirect to login on reg.then().
            useAction('http://localhost:8080', 'auth', 'User', 'register', formValue);
          }}>
          <Box gap={'small'}>
            <Heading>Register</Heading>
            <FormField name={'email'}>
              <TextInput id={'email'} name={'email'} placeholder={'my@email.com'} />
            </FormField>
            <FormField name={'password'}>
              <TextInput id={'password'} name={'password'} placeholder={'*****'} type={'password'} />
            </FormField>
            <Button type={'submit'} label={'Register'} primary />
            {/* TODO: Remake to ReactRouterDOM.Link */}
            <a href={'/login'}>
              <Button label={'Login'} />
            </a>
          </Box>
        </Form>
      </Box>
    </Layer>
  );
}

function TestComponent() {
  return null;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App
    mobileResolutionSupport={false}
    layout={<Layout logotype={logo} />}
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
      { header: 'Test', path: '/test', element: <TestComponent /> },
      {
        header: 'Home',
        items: [
          { header: 'Home', path: '/', element: <Heading>Home page</Heading> },
          { header: 'Home', path: '/', element: <Heading>Home page</Heading> },
          {
            header: 'Home',
            items: [
              { header: 'Home', path: '/', element: <Heading>Home page</Heading> },
              { header: 'Home', path: '/', element: <Heading>Home page</Heading> }
            ]
          }
        ]
      },
      {
        header: 'Employees',
        path: '/employees',
        element: (
          <DataTableResource
            serviceName={'auth'}
            modelName={'Employee'}
            perPage={10}
            fields={[
              { name: 'id', header: 'ID' },
              { name: 'address', header: 'Address', filter: true },
              { name: 'adult', header: 'Adult', renderType: 'toggle', filter: { secondary: true } },
              { name: 'phone', header: 'Phone' },
              {
                name: 'weight',
                header: 'Weight',
                renderDataTable: (item) => (
                  <GrommetMeter values={[{ value: item.weight }]} thickness="small" size="small" />
                )
              },
              { name: 'created_at', header: 'Created at', filter: { primary: true } },
              { name: 'updated_at', header: 'Updated at', filter: { primary: true } }
            ]}
          />
        )
      }
    ]}
    additionalRoutes={[
      { path: '*', element: <NotFound /> },
      { path: '/custom', element: <h1>Custom route!</h1> },
      { path: '/login', element: <LoginComponent /> },
      { path: '/register', element: <RegisterComponent /> }
    ]}
  />
);
