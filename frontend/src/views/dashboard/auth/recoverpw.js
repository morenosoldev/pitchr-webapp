import React from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import logo from "../../../assets/images/logo-full.png";

const Recoverpw = () => {
  let history = useHistory();
  return (
    <>
      <section className="sign-in-page">
        <div id="container-inside">
          <div id="circle-small"></div>
          <div id="circle-medium"></div>
          <div id="circle-large"></div>
          <div id="circle-xlarge"></div>
          <div id="circle-xxlarge"></div>
        </div>
        <Container className="p-0">
          <Row className="no-gutters">
            <Col md="6" className="text-center pt-5">
              <div className="sign-in-detail text-white">
                <Link className="sign-in-logo mb-5" to="#">
                  <Image src={logo} className="img-fluid" alt="logo" />
                </Link>
                <div className="sign-slider overflow-hidden"></div>
              </div>
            </Col>
            <Col md="6" className="bg-white pt-5 pt-5 pb-lg-0 pb-5">
              <div className="sign-in-from">
                <h1 className="mb-0">Reset Password</h1>
                <p>
                  Enter your email address and we'll send you an email with
                  instructions to reset your password.
                </p>
                <Form className="mt-4">
                  <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      className="mb-0"
                      id="exampleInputEmail1"
                      placeholder="Enter email"
                    />
                  </Form.Group>
                  <div className="d-inline-block w-100">
                    <Button
                      variant="primary"
                      type="button"
                      className="float-right mt-3"
                      onClick={() => history.push("/auth/sign-in")}
                    >
                      Reset Password
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Recoverpw;
