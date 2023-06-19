import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/actions";
import { useSelector } from "react-redux";
import { Button, Card, Col, Form, Nav, Row, Tab } from "react-bootstrap";

export default function AboutMe() {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [writeDescription, setWriteDescription] = useState(false);
  const user = useSelector((state) => state.authentication.user);

  const submitDescription = () => {
    if (description.length > 0) {
      dispatch(userActions.updateDescription(description, user?.user_id));
      setWriteDescription(false);
    }
  };

  return (
    <Tab.Pane eventKey="second">
      <Tab.Container id="left-tabs-example" defaultActiveKey="about5">
        <Card>
          <Card.Body>
            <Row>
              <Col md={3}>
                <Nav
                  variant="pills"
                  className=" basic-info-items list-inline d-block p-0 m-0"
                >
                  <Nav.Item>
                    <Nav.Link href="#" eventKey="about5">
                      Introduction
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col className=" ps-4">
                <Tab.Content>
                  <Tab.Pane eventKey="about5">
                    <div className="profile-setting-header">
                      <h4 className="mb-3">About You</h4>

                      {!writeDescription ? (
                        <div className="user-img img-fluid">
                          <i
                            className="fas fa-user-edit"
                            onClick={() => setWriteDescription(true)}
                            role="button"
                          ></i>
                        </div>
                      ) : null}
                    </div>

                    {writeDescription ? (
                      <div>
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                          >
                            <Form.Label>
                              Add a short description of yourself.
                            </Form.Label>
                            <Form.Control
                              onChange={(e) => setDescription(e.target.value)}
                              as="textarea"
                              rows={3}
                            />
                          </Form.Group>
                          <Button onClick={() => submitDescription()}>
                            Submit
                          </Button>
                          <Button
                            variant="danger"
                            style={{ marginLeft: 10 }}
                            onClick={() => setWriteDescription(false)}
                          >
                            Cancel
                          </Button>
                        </Form>
                      </div>
                    ) : (
                      <>
                        {user?.description ? (
                          <ul className="suggestions-lists m-0 p-0">
                            <li className="d-flex mb-4 align-items-center">
                              <div className="ms-3">
                                <h6>{user?.description}</h6>
                              </div>
                            </li>
                          </ul>
                        ) : (
                          <ul className="suggestions-lists m-0 p-0">
                            <li className="d-flex mb-4 align-items-center">
                              <div className="user-img img-fluid">
                                <i
                                  className="ri-add-fill"
                                  onClick={() => setWriteDescription(true)}
                                  role="button"
                                ></i>
                              </div>
                              <div className="ms-3">
                                <h6>Add short description</h6>
                              </div>
                            </li>
                          </ul>
                        )}
                      </>
                    )}
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Tab.Container>
    </Tab.Pane>
  );
}
