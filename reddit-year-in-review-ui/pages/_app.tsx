import React from "react";
import { ThemeProvider } from "styled-components";
import { AppProps } from "next/app";
import Head from "next/head";
import theme from "../theme";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>A year in review for reddit</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
      <style jsx global>
        {`
          .dangerously-set-html p {
            margin: 0;
            font-size: 14px;
          }
        `}
      </style>
    </>
  );
};

export default App;
