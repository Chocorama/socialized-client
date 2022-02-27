import { gql, useMutation, useQuery } from '@apollo/client';
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import LikeButton from '../components/LikeButton';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import { AuthContext } from '../context/auth';
import DeleteButton from '../components/DeleteButton';

const SinglePost = () => {
  const { postId } = useParams();
  const { user } = useContext(AuthContext);

  const [comment, setComment] = useState('');

  const { data: { getPost: post } = {}, loading } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [createComment] = useMutation(CREATE_COMMENT, {
    update(cache, results) {
      setComment('');
    },
    variables: {
      postId,
      body: comment,
    },
  });

  let singlePost;

  if (loading) {
    return (
      <Box sx={{ width: 300 }}>
        <Skeleton />
        <Skeleton animation='wave' />
        <Skeleton animation={false} />
      </Box>
    );
  } else {
    const {
      body,
      commentCount,
      comments,
      createdAt,
      id,
      likeCount,
      likes,
      username,
    } = post;
    singlePost = (
      <Card sx={{ mt: '100px' }}>
        <CardHeader
          avatar={
            <Avatar
              alt='Remy Sharp'
              src='https://mui.com/static/images/avatar/3.jpg'
            />
          }
          title={username}
          subheader={
            <Typography color='text.secondary' fontSize='small'>
              {moment(createdAt).fromNow(true)}
            </Typography>
          }
        />
        <CardContent>
          <Typography variant='body2'>{body}</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <LikeButton user={user} post={{ id, likeCount, likes }} />
            <IconButton>
              <Badge color='secondary' badgeContent={commentCount}>
                <ChatBubbleOutlineIcon />
              </Badge>
            </IconButton>
          </Box>
          {user && user.username === username && <DeleteButton postId={id} />}
        </CardActions>
        {user && (
          <div>
            <p>Make a comment</p>
            <Box component='form' name='comment'>
              <TextField
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button onClick={createComment}>Submit</Button>
            </Box>
          </div>
        )}
        {commentCount > 0 &&
          comments.map((comment) => (
            <Box sx={{ ml: '2rem' }}>
              <CardHeader
                key={comment.id}
                title={
                  user.username === comment?.username
                    ? 'You'
                    : comment?.username
                }
                action={
                  user &&
                  user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )
                }
                subheader={
                  <Typography color='text.secondary' fontSize='small'>
                    {moment(comment.createdAt).fromNow()}
                  </Typography>
                }
              />
              <CardContent>
                <Typography variant='body2'>{comment.body}</Typography>
              </CardContent>
            </Box>
          ))}
      </Card>
    );
  }

  return <>{singlePost}</>;
};

const CREATE_COMMENT = gql`
  mutation CreateComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query GetPost($postId: ID!) {
    getPost(postId: $postId) {
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

export default SinglePost;
