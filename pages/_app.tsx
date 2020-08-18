import type { AppProps } from "next/app";

import "../styles/normalize.css";
import "../styles/global.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;
