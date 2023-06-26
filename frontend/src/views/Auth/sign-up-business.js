import React, { useState } from "react";
import { Button, Col, Container, Spinner, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import "swiper/components/navigation/navigation.scss";
import "swiper/swiper-bundle.min.css";
import { userActions } from "../../store/actions";
import Circles from "../../components/Circles/Circles";

SwiperCore.use([Navigation, Autoplay]);

const SignUpBusiness = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.alert.message);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const registerBusiness = (e) => {
    setLoading(true);
    e.preventDefault();

    // Validation logic
    if (!email || !name || !password) {
      // Check if any of the fields is empty
      // You can display an error message or perform any other necessary actions
      setLoading(false);
      return;
    }

    const user = {
      name: name,
      email: email,
      password: password,
    };
    dispatch(userActions.registerBusiness(user));
    setLoading(false);
  };

  return (
    <>
      <section>
        <Circles />
        <Container fluid className="p-0">
          <Row className="no-gutters login-container">
            <Col md className="text-center d-none d-md-block pt-5">
              <div className="sign-in-detail text-white"></div>
            </Col>
            <Col md="6" className="pt-5 login-form pt-5 pb-lg-0 pb-5">
              <div className="sign-in-from">
                <Link to="#">
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
                <h3 className="mb-0">Sign up as a Startup</h3>

                <Form className="mt-4">
                  <Form.Group className="form-group">
                    <Form.Label style={{ color: "black" }}>
                      Company name
                    </Form.Label>
                    <Form.Control
                      name="company"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mb-0"
                      id="exampleInputEmail1"
                      placeholder="Enter name of company"
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label style={{ color: "black" }}>
                      Email address
                    </Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mb-0"
                      id="exampleInputEmail1"
                      placeholder="Enter email"
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label style={{ color: "black" }}>Password</Form.Label>
                    <Link to="#" className="float-end">
                      Forgot password?
                    </Link>
                    <Form.Control
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mb-0"
                      id="exampleInputPassword1"
                      placeholder="Password"
                    />

                    {message ? (
                      <div className="bad-feedback">{message.toString()}</div>
                    ) : null}
                  </Form.Group>
                  <div className="d-inline-block w-100">
                    {loading ? (
                      <Button className="float-end" variant="dark" disabled>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <span className="visually-hidden">Loading...</span>
                      </Button>
                    ) : (
                      <Button
                        variant="dark"
                        type="button"
                        className="float-end"
                        onClick={registerBusiness}
                      >
                        {" "}
                        <span>Sign up</span>{" "}
                      </Button>
                    )}
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
