import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import firebase from "firebase/app";
import "firebase/messaging";
import config from "./config";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import customTheme from "./theme";

import { Helmet, HelmetProvider } from "react-helmet-async";

Amplify.configure(awsconfig);

firebase.initializeApp(config.firebase);

serviceWorkerRegistration.register();

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <HelmetProvider>
        <Helmet titleTemplate="%s | Feed Alert"></Helmet>
        <ColorModeScript
          initialColorMode={customTheme.config.initialColorMode}
        />
        <Router>
          <App />
        </Router>
      </HelmetProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
