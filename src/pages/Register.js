import { gql, useMutation } from '@apollo/client';
import { Box, Button, Container, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import UseForm from '../util/hooks';

const Register = () => {
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const { onFieldChange, onFormSubmit, values, setValues } = UseForm(
    registerUser,
    {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  );

  const onClearClick = () => {
    setValues({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
  };

  const [addUser] = useMutation(REGISTER_USER, {
    update(cache, { data: { register: userData } }) {
      context.login(userData);
      navigate('/');
    },
    onError(error) {
      setErrors(error.graphQLErrors[0]?.extensions.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div>
      <Box
        noValidate
        component='form'
        onSubmit={onFormSubmit}
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
          <h2>Register</h2>
          <TextField
            error={Boolean(errors?.username)}
            label='Username'
            name='username'
            variant='filled'
            value={values.username}
            onChange={onFieldChange}
            helperText={errors?.username}
          />
          <TextField
            error={Boolean(errors?.email)}
            label='Email'
            name='email'
            variant='filled'
            value={values.email}
            onChange={onFieldChange}
            helperText={errors?.email}
          />
          <TextField
            error={Boolean(errors?.password)}
            label='Password'
            name='password'
            variant='filled'
            type='password'
            value={values.password}
            onChange={onFieldChange}
            helperText={errors?.password}
            // TODO: Add a visibility icon for passwords
          />
          <TextField
            error={Boolean(errors?.confirmPassword)}
            label='Confirm Password'
            name='confirmPassword'
            variant='filled'
            type='password'
            value={values.confirmPassword}
            onChange={onFieldChange}
            helperText={errors?.confirmPassword}
            // TODO: Add a visibility icon for passwords
          />

          <div>
            <Button type='submit'>Register</Button>
            <Button onClick={onClearClick} color='error'>
              Clear
            </Button>
          </div>
        </Container>
      </Box>
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
