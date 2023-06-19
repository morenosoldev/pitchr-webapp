import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import BusinessDashboard from "../layouts/dashboard/BusinessDashboard";
import InvestorDashboard from "../layouts/dashboard/InvestorDashboard";
import { useSelector } from "react-redux";
import AuthRouter from "./AuthRouter";

const IndexRouters = () => {
  const isAuthenticated = useSelector(
    (state) => state.authentication.isLoggedIn
  );
  const user = useSelector((state) => state.authentication.user);

  useEffect(() => {
    console.log("user", user);
  }, [user]);
  return (
    <>
      <Switch>
        <Route path="/auth" component={AuthRouter}></Route>
        <ProtectedRoute
          isAuthenticated={isAuthenticated && user?.type == "Business"}
          path="/business"
          component={BusinessDashboard}
        ></ProtectedRoute>
        <ProtectedRoute
          isAuthenticated={isAuthenticated && user?.type == "Investor"}
          path="/investor"
          component={InvestorDashboard}
        ></ProtectedRoute>
      </Switch>
    </>
  );
};

export default IndexRouters;
