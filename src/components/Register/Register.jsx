import { gql } from 'apollo-boost';
import User from '../../data/User';
import React, { useContext, useState } from 'react';

import { Redirect, Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Button, Form, Grid, Loader } from 'semantic-ui-react';

const registerMutation = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      accessToken
    }
  }
`;

export default () => {
  const user = useContext(User);

  const [state, setState] = useState({
    code: '',
    email: '',
    password: '',
    displayName: '',
  });

  const handleChange = (e, { name, value }) => {
    setState({ ...state, [name]: value });
  };

  const [register, { called, loading, data, error }] = useMutation(registerMutation, {
    variables: {
      input: {
        email: state.email,
        password: state.password,
        code: state.code,
        displayName: state.displayName,
      },
    },
  });

  if (error) {
    return <div> there was an error registering you </div>;
  }

  if (data) {
    user.login(data.register.accessToken);
    return <Redirect to='/' />;
  }

  if (called || loading) {
    return <Loader active />;
  }

  return (
    <Grid textAlign='center' style={{ marginTop: '50px' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form size='large' onSubmit={register}>
          <Form.Input
            fluid
            icon='user'
            name='displayName'
            iconPosition='left'
            onChange={handleChange}
            value={state.displayName}
            placeholder='Display Name'
          />
          <Form.Input
            fluid
            icon='mail'
            name='email'
            iconPosition='left'
            value={state.email}
            onChange={handleChange}
            placeholder='E-mail address'
          />
          <Form.Input
            fluid
            icon='lock'
            type='password'
            name='password'
            iconPosition='left'
            placeholder='Password'
            value={state.password}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            icon='code'
            name='code'
            value={state.code}
            iconPosition='left'
            placeholder='Beta Code'
            onChange={handleChange}
          />
          <Grid>
            <Grid.Column width={10}>
              <Form.Button color='teal' fluid content='Register' />
            </Grid.Column>
            <Grid.Column width={6}>
              <Button as={Link} to='/login' color='teal' basic fluid content='Or Login' />
            </Grid.Column>
          </Grid>
        </Form>
      </Grid.Column>
    </Grid>
  );
};