import React from "react";
import { Card, Dropdown, Image, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Button from "@restart/ui/esm/Button";

const Header = () => {
  const user = useSelector((state) => state.authentication.user);
  let location = useLocation();

  console.log(location);
  return (
    <>
      <div className="iq-top-navbar">
        <div className="iq-navbar-custom">
          <Navbar expand="lg" variant="light" className="p-0">
            <div className="iq-navbar-logo d-flex justify-content-between">
              <Link
                to={user?.cvr > 0 ? "/business" : "/investor"}
                style={{ position: "relative" }}
              >
                <span className="logo-text">pitchr</span>
                <span className="beta-mark">BETA</span>
              </Link>
            </div>
            <div>
              {user?.type == "Business" ? (
                <ul className="topbar-nav">
                  <li
                    className={`${
                      location.pathname === "/business"
                        ? "topbar-li-active"
                        : "topbar-li"
                    } `}
                  >
                    <Link to={"/business"} className="topbar-a">
                      Overview
                    </Link>
                  </li>
                  <li
                    className={`${
                      location.pathname ===
                      `/business/app/company/${user?.user_id}/deck`
                        ? "topbar-li-active"
                        : "topbar-li"
                    } `}
                  >
                    <Link
                      to={`/business/app/company/${user?.user_id}/deck`}
                      className="topbar-a"
                    >
                      Profile
                    </Link>
                  </li>
                  <li
                    className={`${
                      location.pathname === "/business/app/chat"
                        ? "topbar-li-active"
                        : "topbar-li"
                    } `}
                  >
                    <Link to={"/business/app/chat"} className="topbar-a">
                      Chat
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="topbar-nav">
                  <li
                    className={`${
                      location.pathname === "/investor"
                        ? "topbar-li-active"
                        : "topbar-li"
                    } `}
                  >
                    <Link to={"/investor"} className="topbar-a">
                      Feed
                    </Link>
                  </li>
                  <li
                    className={`${
                      location.pathname === `/investor/app/profile`
                        ? "topbar-li-active"
                        : "topbar-li"
                    } `}
                  >
                    <Link to={`/investor/app/profile`} className="topbar-a">
                      Profile
                    </Link>
                  </li>
                  <li
                    className={`${
                      location.pathname === "/investor/app/chat"
                        ? "topbar-li-active"
                        : "topbar-li"
                    } `}
                  >
                    <Link to={"/investor/app/chat"} className="topbar-a">
                      Chat
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            <Navbar.Toggle as="button">
              <i className="ri-menu-3-line"></i>
            </Navbar.Toggle>
            <Navbar.Collapse>
              <Nav as="ul" className="ms-auto navbar-list">
                <Dropdown as="li" className="nav-item">
                  <Dropdown.Toggle
                    href="#"
                    as={Button}
                    bsPrefix="d-flex align-items-center search-toggle"
                  >
                    <Image
                      src={user?.profile_pic}
                      className="img-fluid rounded-circle me-3"
                      alt="user"
                    />
                    <div className="caption">
                      <h6 className="mb-0 line-height">{user?.name}</h6>
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className="sub-drop dropdown-menu caption-menu"
                    aria-labelledby="drop-down-arrow"
                  >
                    <Card className="shadow-none m-0">
                      <Card.Header className="bg-primary">
                        <div className="header-title">
                          <h5 className="mb-0 text-white">
                            Hello {user?.name}
                          </h5>
                          <span className="text-white font-size-12">
                            Available
                          </span>
                        </div>
                      </Card.Header>
                      <Card.Body className="p-0 ">
                        <Link
                          to={
                            user?.cvr > 0
                              ? `/business/app/company/${user?.user_id}/deck`
                              : "/investor/app/profile"
                          }
                          className="iq-sub-card iq-bg-primary-hover d-flex align-items-center justify-content-between"
                        >
                          <div className="d-flex align-items-center">
                            <div className="rounded card-icon bg-soft-primary">
                              <i className="ri-file-user-line"></i>
                            </div>
                            <div className="ms-3">
                              <h6 className="mb-0 ">My Profile</h6>
                              <p className="mb-0 font-size-12">
                                View personal profile details.
                              </p>
                            </div>
                          </div>
                        </Link>

                        <div className="d-inline-block w-100 text-center p-3">
                          <Link
                            className="btn btn-primary iq-sign-btn"
                            to="/auth/sign-in"
                            role="button"
                          >
                            Sign out
                            <i className="ri-login-box-line ms-2"></i>
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    </>
  );
};

export default Header;
