import React from "react";
import Header from "../../components/partials/dashboard/headerStyle/header";
import InvestorRouter from "../../router/InvestorRouter";

const InvestorDashboard = () => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div id="content-page" className="content-page">
          <InvestorRouter />
        </div>
      </div>
    </>
  );
};

export default InvestorDashboard;
