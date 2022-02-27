import { Skeleton, Stack } from '@mui/material';
import React from 'react';

const SkeletonLoader = () => {
  return (
    <Stack spacing={1}>
      <Skeleton variant='text' />
      <Skeleton variant='circular' width={40} height={40} />
      <Skeleton variant='rectangular' width={210} height={118} />
    </Stack>
  );
};

export default SkeletonLoader;
