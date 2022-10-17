import React, { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { useAction } from '@egalteam/framework';
import { Box, Button, Form, FormField, Heading, Layer, TextInput } from 'grommet';

export function RegisterPage() {
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
