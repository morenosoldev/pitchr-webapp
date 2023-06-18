import React from "react";
import Header from "../../components/partials/dashboard/headerStyle/header";
import RightSidebar from "../../components/partials/dashboard/sidebarStyle/rightsidebar";
import Sidebar from "../../components/partials/dashboard/sidebarStyle/InvestorSidebar";
import Footer from "../../components/partials/dashboard/footerStyle/footer";
import Layout1Router from "../../router/layout1-router";

const Layout1 = () => {
  return (
    <>
      <div className="wrapper">
        <Sidebar />
        <Header />
        <RightSidebar />
        <Layout1Router />
      </div>
      <Footer />
    </>
  );
};

export default Layout1;
