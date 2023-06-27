import React from "react";
import { Col, Card, Row, Tab, Form, Button, Badge } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Competences from "./Competences";
import { userActions } from "../../store/actions";

export default function CapitalAndCompetences({ available_capital }) {
  const user = useSelector((state) => state.authentication.user);

  const [writeCapital, setWriteCapital] = useState(false);
  const [writeCompetences, setWriteCompetences] = useState(false);
  const [capital, setCapital] = useState();
  const dispatch = useDispatch();

  const submitCapital = () => {
    if (capital.length > 0) {
      dispatch(userActions.updateCapital(capital, user?.user_id));
      setWriteCapital(false);
    }
  };

  return (
    <Tab.Pane eventKey="forth">
      <Tab.Container id="left-tabs-example" defaultActiveKey="p1">
        <Row>
          <Col sm>
            <Card>
              <Card.Body>
                <div className="profile-setting-header">
                  <h4>Capital</h4>
                  {!writeCapital ? (
                    <div className="user-img img-fluid">
                      <i
                        className="fas fa-user-edit"
                        onClick={() => setWriteCapital(true)}
                        role="button"
                      ></i>
                    </div>
                  ) : null}
                </div>
                {writeCapital ? (
                  <div>
                    <Form>
                      <fieldset>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            How much capital are you looking for?
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={capital}
                            onChange={(e) => setCapital(e.target.value)}
                          >
                            <option value="0-50.000 kr">0-50.000 kr</option>
                            <option value="100-250.000 kr">
                              100-250.000 kr
                            </option>
                            <option value="250-500.000 kr">
                              250-500.000 kr
                            </option>
                            <option value="500-1.000.000 kr">
                              500-1.000.000 kr
                            </option>
                          </Form.Control>
                        </Form.Group>

                        <Button onClick={() => submitCapital()} type="submit">
                          Submit
                        </Button>
                        <Button
                          style={{ marginLeft: 10 }}
                          onClick={() => setWriteCapital(false)}
                        >
                          Cancel
                        </Button>
                      </fieldset>
                    </Form>
                  </div>
                ) : (
                  <>
                    {user?.available_capital ? (
                      <ul className="suggestions-lists m-0 p-0">
                        <li className="d-flex mb-4 align-items-center">
                          <div>
                            <Badge style={{ padding: "8px" }} pill bg="primary">
                              {user?.available_capital} k
                            </Badge>{" "}
                          </div>
                        </li>
                      </ul>
                    ) : (
                      <ul className="suggestions-lists m-0 p-0">
                        <li className="d-flex mb-4 align-items-center">
                          <div className="user-img img-fluid">
                            <i
                              className="ri-add-fill"
                              onClick={() => setWriteCapital(true)}
                              role="button"
                            ></i>
                          </div>
                          <div className="ms-3">
                            <h6>Add available capital</h6>
                          </div>
                        </li>
                      </ul>
                    )}
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col sm>
            <Card>
              <Card.Body>
                <div className="profile-setting-header">
                  <h4>Competences</h4>
                  {!writeCompetences ? (
                    <div className="user-img img-fluid">
                      <i
                        className="fas fa-user-edit"
                        onClick={() => setWriteCompetences(true)}
                        role="button"
                      ></i>
                    </div>
                  ) : null}
                </div>

                <div className="friend-list-tab mt-2">
                  <Competences
                    writeCompetences={writeCompetences}
                    setWriteCompetences={setWriteCompetences}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </Tab.Pane>
  );
}
