import { gql } from '@apollo/client';

export const FETCH_POSTS_QUERY = gql`
  query GetPosts {
    getPosts {
      id
      body
      createdAt
      username
      comments {
        id
        createdAt
        username
        body
      }
      likes {
        username
      }
      likeCount
      commentCount
    }
  }
`;
