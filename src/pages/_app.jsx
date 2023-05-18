import React from 'react';

import Layout from '../components/Layout';
import '../styles/globals.css';

import { StylesProvider } from '../contexts/StylesContext';
import { SystemTimeProvider } from '@/contexts/SystemTimeContext';

function App({ Component, pageProps }) {
    return (
      <StylesProvider>
        <SystemTimeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SystemTimeProvider>
      </StylesProvider>
    );
  }

export default App;