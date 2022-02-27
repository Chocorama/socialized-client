import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import App from './App';

const httpLink = new HttpLink({
  // uri points to gql server
  uri: 'http://localhost:5000',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('jwtToken');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
