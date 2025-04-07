import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import './styles/styles.scss';

import { Spinner } from '../shared';
import RoutesWrapper from './routes/RoutesWrapper';
import { theme } from '../shared/config/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Suspense fallback={<Spinner />}>
          <RoutesWrapper />
        </Suspense>
      </Router>
    </ThemeProvider>
  )
}

export default App;
