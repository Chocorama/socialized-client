import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Container, Grid, Typography } from '@mui/material';

import PostCard from '../components/PostCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { AuthContext } from '../context/auth';
import PostForm from '../components/PostForm';

import { FETCH_POSTS_QUERY } from '../util/graphql';

const Home = () => {
  const { user } = useContext(AuthContext);

  const { data: { getPosts: posts } = {}, loading } = useQuery(
    FETCH_POSTS_QUERY,
    {
      pollInterval: 1000,
    }
  );

  return (
    <>
      <Typography variant='h5' className='page-title' sx={{ mt: '10px' }}>
        RECENT POSTS
      </Typography>
      <Grid container spacing={2} mt={2}>
        {user && (
          <Container>
            <PostForm />
          </Container>
        )}
        {loading
          ? Array.from(Array(12)).map((_, i) => (
              <Grid item key={i}>
                <SkeletonLoader />
              </Grid>
            ))
          : posts &&
            posts.map((post) => (
              <Grid item xs={12} sm={6} lg={3} key={post.id}>
                <PostCard post={post} />
              </Grid>
            ))}
      </Grid>
    </>
  );
};

export default Home;
