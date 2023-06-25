import React from "react";
import { Switch, Route } from "react-router-dom";
import ConfirmMail from "../views/Auth/confirm-mail";
import LockScreen from "../views/Auth/lock-screen";
import Recoverpw from "../views/Auth/recoverpw";
import SignIn from "../views/Auth/sign-in";
import FileAccess from "../views/Auth/FileAccess";
import Welcome from "../views/Auth/welcome";
import SignUpBusiness from "../views/Auth/sign-up-business";
import SignUpInvestor from "../views/Auth/sign-up-investor";

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
