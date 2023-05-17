import React from 'react';

import Layout from '../components/Layout';
import '../styles/globals.css';

import { StylesProvider } from '../contexts/StylesContext';

function App({ Component, pageProps }) {
    return (
      <StylesProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StylesProvider>
    );
  }

export default App;