import React from "react";

import Layout from "../components/Layout";
import "../styles/globals.css";

import { StylesProvider } from "@/contexts/StylesContext";
import { SystemProvider } from "@/contexts/SystemContext";
import { WeatherDataProvider } from "@/contexts/WeatherDataContext";

function App({ Component, pageProps }) {
  return (
    <StylesProvider>
      <SystemProvider>
        <WeatherDataProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </WeatherDataProvider>
      </SystemProvider>
    </StylesProvider>
  );
}

export default App;
