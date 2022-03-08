import React, { useState } from 'react';
import { Badge, IconButton, Popover, Typography } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { gql, useMutation } from '@apollo/client';

const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
  // const [liked, setLiked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  // check if theres a user and if there is, check if current logged in user equals posts likes user
  // useEffect(() => {
  //   if (user && likes.find((like) => like.username === user.username)) {
  //     setLiked(true);
  //   } else {
  //     setLiked(false);
  //   }
  // }, [setLiked, likes, user]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: {
      postId: id,
    },
  });

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup='true'
        onClick={likePost}
        onMouseLeave={handlePopoverClose}
        onMouseEnter={handlePopoverOpen}
      >
        <Badge color='secondary' badgeContent={likeCount}>
          <ThumbUpOffAltIcon />
        </Badge>
      </IconButton>
      <Popover
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>Like a post!</Typography>
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
