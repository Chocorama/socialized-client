import { gql, useMutation } from '@apollo/client';
import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import UseForm from '../util/hooks';

import { FETCH_POSTS_QUERY } from '../util/graphql';

const PostForm = () => {
  const { onFormSubmit, onFieldChange, values } = UseForm(createPostHelper, {
    body: '',
  });

  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: {
      body: values.body,
    },
    update(cache, { data: { createPost } }) {
      const data = cache.readQuery({
        query: FETCH_POSTS_QUERY,
      });

      cache.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: [createPost, ...data.getPosts],
        },
      });

      values.body = '';
    },
  });

  function createPostHelper() {
    createPost();
  }

  return (
    <Box
      component='form'
      onSubmit={onFormSubmit}
      sx={{ display: 'flex', mt: '2rem' }}
    >
      <TextField
        name='body'
        error={error && true}
        helperText={error && 'Please write at least something...'}
        label='Create a post'
        value={values.body}
        onChange={onFieldChange}
      />
      <Button type='submit' sx={{ margin: '0 auto' }}>
        Submit
      </Button>
    </Box>
  );
};

const CREATE_POST = gql`
  mutation CreatePost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      comments {
        id
        body
        username
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
      likeCount
      commentCount
    }
  }
`;

export default PostForm;
