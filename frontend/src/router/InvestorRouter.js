import React from "react";
import { Switch, Route } from "react-router-dom";
import Chat from "../views/dashboard/app/chat";
import InvestorProfile from "../views/Investor/InvestorProfile";
import InvestorFeed from "../views/Investor/InvestorFeed";
import File from "../views/dashboard/app/file";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import SavedPitches from "../views/Investor/SavedPitches";
import Profile from "../views/Business/Profile/Profile";

const InvestorRouter = () => {
  return (
    <TransitionGroup className="h-100">
      <CSSTransition classNames="fadeUp" timeout={300}>
        <Switch>
          <Route path="/investor" exact component={InvestorFeed} />
          <Route path="/investor/app/profile" component={InvestorProfile} />
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
