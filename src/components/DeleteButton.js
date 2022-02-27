import { gql, useMutation } from '@apollo/client';
import {
  Backdrop,
  Badge,
  Button,
  Fade,
  IconButton,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { FETCH_POSTS_QUERY } from '../util/graphql';

const DeleteButton = ({ postId, commentId }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const mutation = commentId ? DELETE_COMMENT : DELETE_POST;

  const [deleteItem] = useMutation(mutation, {
    variables: {
      postId,
      commentId,
    },
    update(cache, result) {
      console.log(result);
      if (!commentId) {
        const data = cache.readQuery({
          query: FETCH_POSTS_QUERY,
        });

        console.log(data);

        cache.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            ...data,
            getPosts: [...data.getPosts.filter((p) => p.id !== postId)],
          },
        });

        navigate('/');
      }
    },
  });

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#fff',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <Badge color='secondary'>
          <DeleteOutlineIcon />
        </Badge>
      </IconButton>
      <Modal
        aria-labelledby='verify-close'
        aria-describedby='verify-close-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id='verify-close' variant='h6' component='h2'>
              Are you sure?
            </Typography>
            <Typography id='transition-modal-description' sx={{ mt: 2 }}>
              This action will delete your post, and you won't get it back. Is
              that correct?
            </Typography>
            <Stack direction='row' spacing={2} sx={{ mt: '2rem' }}>
              <Button
                color='error'
                onClick={() => {
                  deleteItem();
                  setOpen(false);
                }}
              >
                Delete
              </Button>
              <Button onClick={handleClose}>Cancel</Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

const DELETE_COMMENT = gql`
  mutation DeleteComment($postId: ID!, $commentId: String!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;
