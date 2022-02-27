import React, { useContext, useState } from 'react';
import moment from 'moment';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  CardHeader,
  IconButton,
  Badge,
  Grow,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

const PostCard = ({
  post: {
    body,
    createdAt,
    id,
    username,
    likeCount,
    commentCount,
    likes,
    comments,
  },
}) => {
  const { user } = useContext(AuthContext);

  const CommentPost = () => {
    console.log(`Post by ${username} commented on by you`);
  };

  const deletePost = () => {
    console.log('deleted');
  };

  return (
    <>
      <Grow in>
        <Card>
          <CardHeader
            avatar={
              <Avatar
                alt='Remy Sharp'
                src='https://mui.com/static/images/avatar/3.jpg'
              />
            }
            title={username}
            subheader={
              <Typography
                component={Link}
                to={`/posts/${id}`}
                color='text.secondary'
                fontSize='small'
              >
                {moment(createdAt).fromNow(true)}
              </Typography>
            }
          />
          <CardContent>
            <Typography variant='body2'>{body}</Typography>
          </CardContent>
          <CardActions
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <LikeButton user={user} post={{ id, likeCount, likes }} />
              <IconButton onClick={CommentPost}>
                <Badge color='secondary' badgeContent={commentCount}>
                  <ChatBubbleOutlineIcon />
                </Badge>
              </IconButton>
            </Box>
            {user && user.username === username && <DeleteButton postId={id} />}
          </CardActions>
        </Card>
      </Grow>
    </>
  );
};

export default PostCard;
