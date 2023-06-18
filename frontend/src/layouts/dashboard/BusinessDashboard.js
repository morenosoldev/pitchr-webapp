import React from "react";
import Header from "../../components/partials/dashboard/headerStyle/header";
import BusinessRouter from "../../router/BusinessRouter";

export default function BusinessDashboard() {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div id="content-page" className="content-page">
          <BusinessRouter />
        </div>
      </div>
    </>
  );
}
