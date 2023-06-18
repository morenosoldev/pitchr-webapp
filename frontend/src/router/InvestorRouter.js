import React from "react";
import { Switch, Route } from "react-router-dom";
import userProfile from "../views/dashboard/app/user-profile";
import Chat from "../views/dashboard/app/chat";
import File from "../views/dashboard/app/file";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import index from "../views/Investor";
import SavedPitches from "../views/Investor/SavedPitches";
import Profile from "../views/Business/Profile/Profile";

const InvestorRouter = () => {
  return (
    <TransitionGroup className="h-100">
      <CSSTransition classNames="fadeUp" timeout={300}>
        <Switch>
          <Route path="/investor" exact component={index} />
          <Route path="/investor/app/profile" component={userProfile} />
          <Route path="/investor/app/chat" component={Chat} />
          <Route path="/investor/app/company/:id/:type" component={Profile} />
          <Route path="/investor/app/file" component={File} />
          <Route path="/investor/app/pitches" component={SavedPitches} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default InvestorRouter;
