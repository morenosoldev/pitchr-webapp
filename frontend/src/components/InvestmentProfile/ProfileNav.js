import React from "react";
import { Col, Nav } from "react-bootstrap";

export default function ProfileNav() {
  return (
    <Col sm={12}>
      <div className="card p-0">
        <div className="card-body p-0">
          <div className="user-tabing">
            <Nav
              as="ul"
              variant="pills"
              className="d-flex align-items-center justify-content-center profile-feed-items p-0 m-0"
            >
              <Nav.Item as="li" className="col-12 col-sm-3 p-0">
                <Nav.Link
                  href="#pills-about-tab"
                  eventKey="second"
                  role="button"
                  className="text-center p-3"
                >
                  About me
                </Nav.Link>
              </Nav.Item>

              <Nav.Item as="li" className=" col-12 col-sm-3 p-0">
                <Nav.Link
                  href="#pills-friends-tab"
                  eventKey="third"
                  role="button"
                  className="text-center p-3"
                >
                  Investment details
                </Nav.Link>
              </Nav.Item>

              <Nav.Item as="li" className="col-12 col-sm-3 p-0">
                <Nav.Link
                  href="#pills-photos-tab"
                  eventKey="forth"
                  role="button"
                  className="text-center p-3"
                >
                  Capital and competences
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>
      </div>
    </Col>
  );
}
