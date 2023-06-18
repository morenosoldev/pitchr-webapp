import React, { useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Scrollbar from "smooth-scrollbar";

const InvestorSidebar = () => {
  useEffect(() => {
    Scrollbar.init(document.querySelector("#sidebar-scrollbar"));
  });
  let location = useLocation();

  return (
    <>
      <div className="iq-sidebar">
        <div id="sidebar-scrollbar">
          <nav className="iq-sidebar-menu">
            <Accordion as="ul" id="iq-sidebar-toggle" className="iq-menu">
              <li
                className={`${
                  location.pathname === "/investor" ? "active" : ""
                } `}
              >
                <Link to="/investor">
                  <i className="las la-newspaper"></i>
                  <span>Feed</span>
                </Link>
              </li>
              <li
                className={`${
                  location.pathname === "/investor/app/profile" ? "active" : ""
                }`}
              >
                <Link to="/investor/app/profile">
                  <i className="las la-user"></i>
                  <span>Profile</span>
                </Link>
              </li>
              <li
                className={`${
                  location.pathname === "/investor/app/chat" ? "active" : ""
                }`}
              >
                <Link to="/investor/app/chat">
                  <i className="lab la-rocketchat"></i>
                  <span>Chat</span>
                </Link>
              </li>

              <li
                className={`${
                  location.pathname === "/investor/app/pitches" ||
                  location.pathname === "/investor/app/group-detail"
                    ? "active"
                    : ""
                }`}
              >
                <Link to="/investor/app/pitches">
                  <i class="fas fa-photo-video"></i>
                  <span>Saved pitches</span>
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

export default InvestorSidebar;
