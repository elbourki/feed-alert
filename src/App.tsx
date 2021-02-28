import React, { useContext, useEffect, useState } from "react";
import {
  Switch,
  Route as RouterRoute,
  useLocation,
  Redirect,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { chakra, Flex, Spinner } from "@chakra-ui/react";
import Join from "./pages/Join";
import Home from "./pages/Home";
import { Analytics, Auth, Hub } from "aws-amplify";
import Feed from "./pages/Feed";
import Verify from "./pages/Verify";
import Login from "./pages/Login";
import New from "./pages/New";
import { AuthContext } from "./auth-context";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { AUTH_TYPE, createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import awsconfig from "./aws-exports";

Analytics.autoTrack("pageView", {
  enable: true,
  type: "SPA",
});

const Main = chakra("main", {
  baseStyle: {
    position: "relative",
    overflow: "hidden",
  },
});

const Slide = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    custom={(value: number) =>
      (window.location.pathname === "/" ? -1 : 1) * value
    }
    transition={{ ease: "linear", duration: 0.15 }}
    variants={{
      animate: { opacity: 1, x: 0, y: 0 },
      exit: (custom) => ({
        opacity: 0,
        x: custom(-50),
        y: 0,
      }),
      initial: (custom) => ({
        opacity: 0,
        x: custom(50),
        y: 0,
      }),
    }}
    animate="animate"
    exit="exit"
    initial="initial"
  >
    {children}
  </motion.div>
);

const Route = ({
  component: Component,
  auth = false,
  guest = false,
  ...rest
}: any) => {
  const user = useContext(AuthContext);

  return (
    <RouterRoute
      {...rest}
      render={(props) =>
        auth && !user ? (
          <Redirect to="/login" />
        ) : guest && user ? (
          <Redirect to="/" />
        ) : (
          <Slide>
            <Component {...props} />
          </Slide>
        )
      }
    ></RouterRoute>
  );
};

const appSyncConfig = {
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
};

const cognitoConfig: any = {
  ...appSyncConfig,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () =>
      (await Auth.currentSession()).getIdToken().getJwtToken(),
  },
};

const keyConfig: any = {
  ...appSyncConfig,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: awsconfig.aws_appsync_apiKey,
  },
};

const client = new ApolloClient({
  cache: new InMemoryCache(),
});

const App = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [fetching, setFetching] = useState(true);

  const listener = () => {
    return Auth.currentAuthenticatedUser()
      .then((user) => setUser(user))
      .catch(() => setUser(null))
      .finally(() => setFetching(false));
  };

  client.setLink(
    ApolloLink.split(
      () => !!user,
      createAuthLink(cognitoConfig),
      createAuthLink(keyConfig)
    ).split(
      () => !!user,
      createSubscriptionHandshakeLink(cognitoConfig),
      createSubscriptionHandshakeLink(keyConfig)
    )
  );

  useEffect(() => {
    listener();
    Hub.listen("auth", listener);
    return () => Hub.remove("auth", listener);
  }, []);

  return (
    <Main>
      {fetching ? (
        <Flex minH="100vh" justifyContent="center" alignItems="center">
          <Spinner />
        </Flex>
      ) : (
        <AuthContext.Provider value={user}>
          <ApolloProvider client={client}>
            <AnimatePresence exitBeforeEnter={true} initial={false}>
              <Switch
                location={location}
                key={
                  location.pathname.startsWith("/feed")
                    ? "feed"
                    : location.pathname
                }
              >
                <Route exact path="/" component={Home} />
                <Route path="/feed/:feedID" component={Feed} />
                <Route guest path="/join" component={Join} />
                <Route guest path="/login" component={Login} />
                <Route auth path="/new" component={New} />
                <Route guest path="/verify" component={Verify} />
              </Switch>
            </AnimatePresence>
          </ApolloProvider>
        </AuthContext.Provider>
      )}
    </Main>
  );
};

export default App;
