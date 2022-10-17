import React, { useState } from 'react';
import { useAction, useAuthContext } from '@egalteam/framework';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Form, FormField, Heading, Layer, TextInput } from 'grommet';

export function LoginPage() {
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
