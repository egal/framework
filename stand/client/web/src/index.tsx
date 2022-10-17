import ReactDOM from 'react-dom/client';
import './index.css';
import logo from './assets/logo.svg';
import {
  App as EgalApp,
  Layout,
  NotFoundFullLayerError as NotFound,
  interfaceConfig,
  authConfig,
  useAction,
  useAuthContext,
  FullBoxLoader,
  Resource
} from '@egalteam/framework';
import { Box, Heading, Layer, Form, FormField, TextInput, Button, Text, DateInput } from 'grommet';
import { grommet as grommetTheme } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import React, { useEffect, useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';

function LoginComponent() {
  const [formValue, setFormValue] = useState({ email: '', password: '' });
  const auth = useAuthContext();
  const navigate = useNavigate();
  const actionLogin = useAction<any, any>({ name: 'User', service: 'auth' }, 'login');

  return (
    // TODO: Without Layer.
    <Layer full animation={'none'}>
      <Box fill align={'center'} justify={'center'}>
        <Form
          value={formValue}
          onChange={(newValue) => setFormValue(newValue)}
          onSubmit={() => {
            actionLogin.call(formValue).then(({ user_master_token }: { user_master_token: string }) => {
              // TODO: Use UMRT.
              auth.login(user_master_token);
              navigate('/');
            });
          }}>
          <Box gap={'small'}>
            <Heading>Login</Heading>
            <FormField name={'email'} component={TextInput} placeholder={'my@email.com'} />
            <FormField name={'password'} component={TextInput} placeholder={'*****'} type={'password'} />
            <Button type={'submit'} label={'Login'} primary />
            {/* TODO: Remake to ReactRouterDOM.Link */}
            <Link to={'/register'}>
              <Button label={'Register'} />
            </Link>
          </Box>
        </Form>
      </Box>
    </Layer>
  );
}

function RegisterComponent() {
  const [formValue, setFormValue] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const actionRegister = useAction({ name: 'User', service: 'auth' }, 'register');

  return (
    // TODO: Without Layer.
    <Layer full animation={'none'}>
      <Box fill align={'center'} justify={'center'}>
        <Form
          value={formValue}
          onChange={(newValue) => setFormValue(newValue)}
          onSubmit={() => {
            // TODO: Make redirect to login on reg.then().
            actionRegister.call(formValue).then(() => {
              redirect('/login');
            });
          }}>
          <Box gap={'small'}>
            <Heading>Register</Heading>
            <FormField name={'email'} component={TextInput} placeholder={'my@email.com'} />
            <FormField name={'password'} component={TextInput} placeholder={'*****'} type={'password'} />
            <Button type={'submit'} label={'Register'} primary />
            {/* TODO: Remake to ReactRouterDOM.Link */}
            <Button label={'Login'} onClick={() => navigate('/login')} />
          </Box>
        </Form>
      </Box>
    </Layer>
  );
}

function LogoutComponent() {
  const auth = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    auth.logout(); // TODO: Logout not working.
    navigate('/login');
  }, []);

  return <FullBoxLoader />;
}

function TestComponent() {
  return (
    <Link to={'/'}>
      <Button label={'Go home!'} />
    </Link>
  );
}

const App = () => (
  <EgalApp
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
        element: (
          <Resource
            key={'employees'}
            model={{ service: 'auth', name: 'Employee' }}
            //
          >
            <Resource.Filters>
              <Resource.Filters.Primary
                initFormValue={{
                  'AND:address:co': ''
                  //
                }}>
                <Resource.Filters.FormField
                  combiner="AND"
                  fieldName="address"
                  operator="co"
                  component={TextInput}
                  label="Address"
                />

                <Resource.Filters.FormField
                  groupCombiner="AND"
                  group="phone"
                  combiner="OR"
                  fieldName="phone"
                  operator="gt"
                  component={TextInput}
                  label="Phone gt"
                />
                <Resource.Filters.FormField
                  groupCombiner="AND"
                  group="phone"
                  combiner="AND"
                  fieldName="phone"
                  operator="lt"
                  component={TextInput}
                  label="Phone lt"
                />

                <Resource.Filters.FormField
                  groupCombiner="AND"
                  group="updated_at"
                  combiner="AND"
                  fieldName="updated_at"
                  operator="gt"
                  component={DateInput}
                  label="Updated at gt"
                />
                <Resource.Filters.FormField
                  groupCombiner="AND"
                  group="updated_at"
                  combiner="OR"
                  fieldName="updated_at"
                  operator="lt"
                  component={DateInput}
                  label="Updated at lt"
                />
              </Resource.Filters.Primary>
              <Resource.Filters.Secondary>
                <FormField name="phone" component={TextInput} label={'Phone'} />
              </Resource.Filters.Secondary>
            </Resource.Filters>
            <Resource.Actions>
              <Resource.Actions.Create>
                <FormField name="address" component={TextInput} label="Address" required />
                <FormField name="phone" component={TextInput} label="Phone" />
                <FormField name="adult" component={TextInput} label="Adult" required />
                <FormField name="weight" component={TextInput} label="Weight" required />
              </Resource.Actions.Create>
              <Resource.Actions.Show>
                <FormField name="id" component={TextInput} label="ID" disabled />
                <FormField name="address" component={TextInput} label="Address" disabled />
                <FormField name="phone" component={TextInput} label="Phone" disabled />
                <FormField name="adult" component={TextInput} label="Adult" disabled />
                <FormField name="weight" component={TextInput} label="Weight" disabled />
                <FormField name="created_at" component={TextInput} label="Created at" disabled />
                <FormField name="updated_at" component={TextInput} label="Updated at" disabled />
              </Resource.Actions.Show>
              <Resource.Actions.Update>
                <FormField name="id" component={TextInput} label="ID" disabled />
                <FormField name="address" component={TextInput} label="Address" required />
                <FormField name="phone" component={TextInput} label="Phone" />
                <FormField name="adult" component={TextInput} label="Adult" required />
                <FormField name="weight" component={TextInput} label="Weight" required />
              </Resource.Actions.Update>
              <Resource.Actions.Delete />
            </Resource.Actions>
            <Resource.DataTable
              columns={[
                { property: 'address', header: 'Address' },
                { property: 'phone', header: 'Phone' },
                { property: 'updated_at', header: 'Updated at' }
              ]}
            />
            <Resource.Pagination />
          </Resource>
        )
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
      { path: '/custom', element: <h1>Custom route!</h1> },
      { path: '/login', element: <LoginComponent /> },
      { path: '/register', element: <RegisterComponent /> },
      { path: '/logout', element: <LogoutComponent /> }
    ]}
  />
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
