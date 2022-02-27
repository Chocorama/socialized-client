import React, { useEffect, useState } from 'react';
import { Badge, IconButton, Popover, Typography } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { gql, useMutation } from '@apollo/client';

const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
  const [liked, setLiked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (e) => {
    console.log(e);
    setAnchorEl(e.currentTarget);
  };

  const handlePopoverClose = (e) => {
    e.preventDefault();
    console.log('hi');
    setAnchorEl(null);
  };

  //   check if theres a user and if there is, check if current loggen in user equals posts likes user
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likes, user]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: {
      postId: id,
    },
  });

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        onClick={likePost}
        onMouseEnter={handlePopoverOpen}
        // onMouseLeave={handlePopoverClose}
      >
        <Badge color='secondary' badgeContent={likeCount}>
          <ThumbUpOffAltIcon />
        </Badge>
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>Testing</Typography>
      </Popover>
    </>
  );
};

const LIKE_POST_MUTATION = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
