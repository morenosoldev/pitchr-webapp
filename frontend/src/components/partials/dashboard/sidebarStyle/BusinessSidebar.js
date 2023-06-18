import React, { useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Scrollbar from "smooth-scrollbar";

const BusinessSidebar = () => {
  useEffect(() => {
    Scrollbar.init(document.querySelector("#sidebar-scrollbar"));
  });
  const user = useSelector((state) => state.authentication.user);

  let location = useLocation();
  return (
    <>
      <div className="iq-sidebar">
        <div id="sidebar-scrollbar">
          <nav className="iq-sidebar-menu">
            <Accordion as="ul" id="iq-sidebar-toggle" className="iq-menu">
              <li
                className={`${
                  location.pathname === "/business" ? "active" : ""
                } `}
              >
                <Link to="/business">
                  <i className="las la-newspaper"></i>
                  <span>Analytics</span>
                </Link>
              </li>
              <li
                className={`${
                  location.pathname === `/business/app/company/${user.id}`
                    ? "active"
                    : ""
                }`}
              >
                <Link to={`/business/app/company/${user.user_id}`}>
                  <i className="las la-user"></i>
                  <span>Profile</span>
                </Link>
              </li>

              <li
                className={`${
                  location.pathname === "/business/app/file" ? "active" : ""
                }`}
              >
                <Link to={`/business/app/file/${user?.user_id}`}>
                  <i className="las la-file"></i>
                  <span>Files</span>
                </Link>
              </li>
              <li
                className={`${
                  location.pathname === "/business/app/chat" ? "active" : ""
                }`}
              >
                <Link to="/business/app/chat">
                  <i className="lab la-rocketchat"></i>
                  <span>Chat</span>
                </Link>
              </li>
            </Accordion>
          </nav>
          <div className="p-5"></div>
        </div>
      </div>
    </>
  );
};

export default BusinessSidebar;
