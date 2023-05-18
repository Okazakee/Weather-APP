import React from 'react';

import Layout from '../components/Layout';
import '../styles/globals.css';

import { StylesProvider } from '../contexts/StylesContext';
import { SystemTimeProvider } from '@/contexts/SystemTimeContext';
import { WeatherDataProvider } from '@/contexts/WeatherDataContext';

function App({ Component, pageProps }) {
    return (
      <StylesProvider>
        <SystemTimeProvider>
          <WeatherDataProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </WeatherDataProvider>
        </SystemTimeProvider>
      </StylesProvider>
    );
  }

export default App;