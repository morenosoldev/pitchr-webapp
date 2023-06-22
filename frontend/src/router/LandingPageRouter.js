import React from "react";
import { Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import index3 from "../views/LandingPage/Pages/index3/index3";

const LandingPageRouter = () => {
  return (
    <TransitionGroup className="h-100">
      <CSSTransition classNames="fadeUp" timeout={300}>
        <Switch>
          <Route path="/" exact component={index3} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default LandingPageRouter;
