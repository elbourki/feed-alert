import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { chakra } from "@chakra-ui/react";
import Join from "./pages/Join";
import Home from "./pages/Home";
import { Analytics } from "aws-amplify";
import Feed from "./pages/Feed";
import Verify from "./pages/Verify";
import Login from "./pages/Login";

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

const App = () => {
  const location = useLocation();

  return (
    <Main>
      <AnimatePresence exitBeforeEnter={true} initial={false}>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/">
            <Slide>
              <Home />
            </Slide>
          </Route>
          <Route path="/feed/:feed_id">
            <Slide>
              <Feed />
            </Slide>
          </Route>
          <Route path="/join">
            <Slide>
              <Join />
            </Slide>
          </Route>
          <Route path="/login">
            <Slide>
              <Login />
            </Slide>
          </Route>
          <Route path="/verify">
            <Slide>
              <Verify />
            </Slide>
          </Route>
        </Switch>
      </AnimatePresence>
    </Main>
  );
};

export default App;
