import React from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/images/logo-full.png";
import user1 from "../../assets/images/user/1.jpg";
import Circles from "../../components/Circles/Circles";

const LockScreen = () => {
  let history = useHistory();
  return (
    <>
      <section className="sign-in-page">
        <Circles />
        <Container className="p-0">
          <Row className="no-gutters">
            <Col md="6" className="text-center pt-5">
              <div className="sign-in-detail text-white">
                <Link className="sign-in-logo mb-5" to="#">
                  <Image src={logo} className="img-fluid" alt="logo" />
                </Link>
                <div className="sign-slider overflow-hidden "></div>
              </div>
            </Col>
            <Col md="6" className="bg-white pt-5 pt-5 pb-lg-0 pb-5">
              <div className="sign-in-from">
                <Image src={user1} alt="userimage" className="rounded-circle" />
                <h4 className="mt-3 mb-0">Hi ! Michael Smith</h4>
                <p>Enter your password to access the admin.</p>
                <Form className="mt-4">
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="Password"
                      className="mb-0"
                      id="exampleInputEmail1"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <div className="d-inline-block w-100">
                    <Button
                      variant="primary"
                      type="submit"
                      className="float-right mt-3"
                      onClick={() => history.push("/")}
                    >
                      Log In
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

export default LockScreen;
