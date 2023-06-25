import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import "swiper/components/navigation/navigation.scss";
import "swiper/swiper-bundle.min.css";
import { userActions } from "../../store/actions";

SwiperCore.use([Navigation, Autoplay]);

const SignUpBusiness = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.alert.message);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const registerBusiness = (e) => {
    e.preventDefault();

    // Validation logic
    if (!email || !name || !password) {
      // Check if any of the fields is empty
      // You can display an error message or perform any other necessary actions

      return;
    }

    const user = {
      name: name,
      email: email,
      password: password,
    };
    dispatch(userActions.registerBusiness(user));
  };

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
              <div className="sign-in-detail text-white"></div>
            </Col>
            <Col md="6" className="bg-white pt-5 pt-5 pb-lg-0 pb-5">
              <div className="sign-in-from">
                <Link to="/auth/sign-in">
                  <span
                    style={{
                      fontSize: "4rem",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    pitchr
                  </span>
                </Link>
                <h3 className="mb-0">Sign Up as Business</h3>
                <p>
                  Enter your email address and password to access admin panel.
                </p>
                <Form className="mt-4">
                  <Form.Group className="form-group">
                    <Form.Label>Your Company Name</Form.Label>
                    <Form.Control
                      type="email"
                      className="mb-0"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      id="emailInput"
                      placeholder="Your Company Name"
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mb-0"
                      id="emailInput"
                      placeholder="Enter email"
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      className="mb-0"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="passwordInput"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <div className="d-inline-block w-100">
                    <Form.Check className="d-inline-block mt-2 pt-1">
                      <Form.Check.Input
                        type="checkbox"
                        className="me-2"
                        id="customCheck1"
                      />
                      <Form.Check.Label>
                        I accept <Link to="#">Terms and Conditions</Link>
                      </Form.Check.Label>
                    </Form.Check>
                    <Button
                      type="button"
                      className="btn-primary float-end"
                      onClick={(e) => registerBusiness(e)}
                    >
                      Sign Up
                    </Button>
                  </div>
                  <p>{message}</p>
                  {message ? (
                    <div className="bad-feedback">{message}</div>
                  ) : null}
                  <div className="sign-info">
                    <span className="dark-color d-inline-block line-height-2">
                      Already Have Account ?{" "}
                      <Link to="/auth/sign-in">Log In</Link>
                    </span>
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

export default SignUpBusiness;
