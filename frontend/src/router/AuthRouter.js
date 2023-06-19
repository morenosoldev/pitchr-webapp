import React from "react";
import { Switch, Route } from "react-router-dom";
import ConfirmMail from "../views/dashboard/auth/confirm-mail";
import LockScreen from "../views/dashboard/auth/lock-screen";
import Recoverpw from "../views/dashboard/auth/recoverpw";
import SignIn from "../views/dashboard/auth/sign-in";
import FileAccess from "../views/dashboard/auth/FileAccess";
import Welcome from "../views/dashboard/auth/welcome";
import SignUpBusiness from "../views/dashboard/auth/sign-up-business";
import SignUpInvestor from "../views/dashboard/auth/sign-up-investor";

const AuthRouter = () => {
  return (
    <>
      <Switch>
        <Route path="/auth/confirm-mail" component={ConfirmMail} />
        <Route path="/auth/lock-screen" component={LockScreen} />
        <Route path="/auth/recoverpw" component={Recoverpw} />
        <Route path="/auth/sign-in" component={SignIn} />
        <Route path="/auth/sign-up/investor" component={SignUpInvestor} />
        <Route path="/auth/sign-up/business" component={SignUpBusiness} />
        <Route path="/auth/confirm/:confirmationCode" component={Welcome} />
        <Route
          path="/auth/confirmFileAccess/:confirmationCode"
          component={FileAccess}
        />
      </Switch>
    </>
  );
};

export default AuthRouter;
