import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import './styles/styles.scss';

import { Spinner } from '../shared';
import RoutesWrapper from './routes/RoutesWrapper.tsx';
import { theme } from '../shared/config/theme.tsx';
import { ApolloProvider } from '@apollo/client';
import client from '../shared/graphQL/apolloClient.ts';
import { AuthProvider } from './providers/AuthProvider.tsx';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <AuthProvider>
          <Router>
            <Suspense fallback={<Spinner />}>
              <RoutesWrapper />
            </Suspense>
          </Router>
        </AuthProvider>
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default App;
