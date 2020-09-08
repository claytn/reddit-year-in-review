import React from "react";
import { AppProps } from "next/app";
import "react-tabs/style/react-tabs.css";

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
