import React from "react";
import { Switch, Route } from "react-router-dom";

//app
import userProfile from "../views/dashboard/app/user-profile";
import Chat from "../views/dashboard/app/chat";

//TransitionGroup
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Groups from "../views/dashboard/app/groups";
import FileWrapper from "../views/dashboard/app/FileWrapper";
import UploadMRR from "../views/Business/Financials/UploadExcel/UploadMRR";
import UploadMAU from "../views/Business/Financials/UploadExcel/UploadMAU";
import UploadBURN from "../views/Business/Financials/UploadExcel/UploadBURN";
import CreateMRR from "../views/Business/Financials/CreateSheet/CreateMRR";
import CreateMAU from "../views/Business/Financials/CreateSheet/CreateMAU";
import CreateBURN from "../views/Business/Financials/CreateSheet/CreateBURN";
import Profile from "../views/Business/Profile/Profile";
import "../assets/scss/socialv.scss";
import NewBusiness from "../views/Business/NewBusiness";
import UploadDeck from "../views/Business/Deck/UploadDeck";

const BusinessRouter = () => {
  return (
    <TransitionGroup style={{ height: "100%" }}>
      <CSSTransition classNames="fadeUp" timeout={300}>
        <Switch>
          <Route path="/business" exact component={NewBusiness} />

          {/* app */}
          <Route path="/business/app/profile" component={userProfile} />
          <Route path="/business/app/team" component={Groups} />
          <Route path="/business/app/company/:id/:type" component={Profile} />
          <Route path="/business/app/upload" component={UploadDeck} />
          <Route path="/business/app/chat" component={Chat} />
          <Route path="/business/app/file/:id" component={FileWrapper} />

          {/*FINANCIALS*/}
          <Route path="/business/financials/upload/mrr" component={UploadMRR} />
          <Route path="/business/financials/upload/mau" component={UploadMAU} />
          <Route
            path="/business/financials/upload/burnrate"
            component={UploadBURN}
          />

          <Route path="/business/financials/insert/mrr" component={CreateMRR} />
          <Route path="/business/financials/insert/mau" component={CreateMAU} />
          <Route
            path="/business/financials/insert/burnrate"
            component={CreateBURN}
          />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default BusinessRouter;
