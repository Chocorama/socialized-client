import { gql, useMutation } from '@apollo/client';
import { Box, Button, Container, TextField } from '@mui/material';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import UseForm from '../util/hooks';

const Login = () => {
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { onFieldChange, onFormSubmit, values, setValues } = UseForm(
    loginUserHelperFunction,
    {
      username: '',
      password: '',
    }
  );

  const [loginUser] = useMutation(LOGIN_USER, {
    update(cache, { data: { login: userData } }) {
      context.login(userData);
      navigate('/');
    },
    onError(error) {
      console.log(error.graphQLErrors[0]?.extensions.errors);
      setErrors(error.graphQLErrors[0]?.extensions.errors);
    },
    variables: values,
  });

  const onClearClick = () => {
    setValues({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
  };

  function loginUserHelperFunction() {
    loginUser();
  }

  return (
    <Box
      onSubmit={onFormSubmit}
      component='form'
      sx={{
        '& > :not(style)': { m: 1, width: '44ch' },
      }}
    >
      <Container
        sx={{
          m: 'auto !important',
          padding: '0 10px',
        }}
      >
        <h2>Login</h2>
        <TextField
          error={Boolean(errors?.username || errors?.wrongPassword)}
          label='Username'
          name='username'
          variant='filled'
          value={values.username}
          onChange={onFieldChange}
          helperText={errors?.username || errors?.wrongPassword}
        />
        <TextField
          error={Boolean(errors?.password || errors?.wrongPassword)}
          label='Password'
          name='password'
          variant='filled'
          type='password'
          value={values.password}
          onChange={onFieldChange}
          helperText={errors?.password || errors?.wrongPassword}
        />
        <div>
          <Button type='submit'>Login</Button>
          <Button onClick={onClearClick} color='error'>
            Clear
          </Button>
        </div>
      </Container>
    </Box>
  );
};

const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      token
      username
      createdAt
    }
  }
`;

export default Login;
