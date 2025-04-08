import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import Cookies from 'js-cookie';

import { BASE_URL } from '../constants/baseUrl';

const httpLink = new HttpLink({
  uri: BASE_URL,
  credentials: 'same-origin'
});

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get('access_token');

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      console.error(`GraphQL error: ${message}`);
      if (message === 'Unauthorized') {
        localStorage.removeItem('access_token');
      }
    });
  }
  if (networkError) {
    console.error(`Network error: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;