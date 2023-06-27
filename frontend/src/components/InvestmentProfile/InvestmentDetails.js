import React, { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
  Tab,
} from "react-bootstrap";
import ReactFlagsSelect from "react-flags-select";
import { useSelector } from "react-redux";
import Select from "react-select";
import API from "../../util/AxiosConfig";
import Flag from "../Flag/Flag";

export default function InvestmentDetails() {
  const user = useSelector((state) => state.authentication.user);
  const [investmentInterest, setInvestmentInterest] = useState("");
  const [investmentInterests, setInvestmentInterests] = useState([]);
  const [temporaryInterests, setTemporaryInterests] = useState([]);
  const [writeInvestmentInterest, setWriteInvestmentInterest] = useState(false);
  const [selected, setSelected] = useState("");

  const [writeMarkets, setWriteMarkets] = useState(false);
  const [markets, setMarkets] = useState([]);
  const [temporaryMarkets, setTemporaryMarkets] = useState([]);

  const [previousInvestment, setPreviousInvestment] = useState("");
  const [previousInvestments, setPreviousInvestments] = useState([]);
  const [temporaryInvestments, setTemporaryInvestments] = useState([]);
  const [writePreviousInvestments, setWritePreviousInvestments] =
    useState(false);

  const [writeIndustry, setWriteIndustry] = useState(false);
  const [industrys, setIndustrys] = useState([]);
  const [temporaryIndustrys, setTemporaryIndustrys] = useState([]);

  const preIndustrys = [
    { value: "Technology", label: "Technology" },
    { value: "Fintech", label: "Fintech" },
    { value: "Entertainment", label: "Entertainment" },
  ];

  const addMarket = (code) => {
    setTemporaryMarkets((oldArray) => [...oldArray, { name: code }]);
  };

  const removeMarket = (key) => {
    setTemporaryMarkets(
      temporaryMarkets.filter((item, index) => index !== key)
    );
  };

  const submitMarkets = async (e) => {
    e.preventDefault();
    await API.put(`/markets/${user.user_id}`, {
      markets: temporaryMarkets,
    })
      .then((res) => {
        setWriteMarkets(false);
        setMarkets(temporaryMarkets);
      })
      .catch((err) => {});
  };

  const addInvestmentInterest = () => {
    setTemporaryInterests((oldArray) => [
      ...oldArray,
      { name: investmentInterest },
    ]);
  };

  const removeInvestmentInterest = (key) => {
    setTemporaryInterests(
      temporaryInterests.filter((item, index) => index !== key)
    );
  };

  const submitInvestmentInterest = async (e) => {
    e.preventDefault();
    await API.put(`/investmentinterests/${user.user_id}`, {
      investmentInterests: temporaryInterests,
    })
      .then((res) => {
        setWriteInvestmentInterest(false);
        setInvestmentInterests(temporaryInterests);
      })
      .catch((err) => {});
  };

  const addPreviousInvestment = () => {
    if (previousInvestment.length > 0) {
      setTemporaryInvestments((oldArray) => [
        ...oldArray,
        { name: previousInvestment },
      ]);
    }
  };

  const removePreviousInvestment = (key) => {
    setTemporaryInvestments(
      temporaryInvestments.filter((item, index) => index !== key)
    );
  };

  const submitPreviousInvestment = async (e) => {
    e.preventDefault();
    await API.put(`/previousinvestments/${user.user_id}`, {
      previousInvestments: temporaryInvestments,
    })
      .then((res) => {
        setWritePreviousInvestments(false);
        setPreviousInvestments(temporaryInvestments);
      })
      .catch((err) => {});
  };

  const addIndustry = (selectedOption) => {
    setTemporaryIndustrys((oldArray) => [
      ...oldArray,
      { name: selectedOption.value },
    ]);

    console.log("selectedOption", selectedOption);
    console.log("temporaryIndustrys", temporaryIndustrys);
  };

  const removeIndustry = (key) => {
    setTemporaryIndustrys(
      temporaryIndustrys.filter((item, index) => index !== key)
    );
  };

  const submitIndustrys = async (e) => {
    e.preventDefault();
    await API.put(`/industrys/${user.user_id}`, {
      industrys: temporaryIndustrys,
    })
      .then((res) => {
        setWriteIndustry(false);
        setIndustrys(temporaryIndustrys);
      })
      .catch((err) => {});
  };

  return (
    <Tab.Pane eventKey="third">
      <Tab.Container id="left-tabs-example" defaultActiveKey="all-friends">
        <Card>
          <Card.Body>
            <Container fluid>
              <Row>
                <Col sm={4}>
                  <div className="profile-setting-header">
                    <h4>Invests in</h4>

                    {!writeInvestmentInterest ? (
                      <div className="user-img img-fluid">
                        <i
                          className="fas fa-user-edit"
                          onClick={() => setWriteInvestmentInterest(true)}
                          role="button"
                        ></i>
                      </div>
                    ) : null}
                  </div>
                  <div>
                    {writeInvestmentInterest ? (
                      <div>
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                          >
                            <InputGroup className="mb-3">
                              <FormControl
                                onChange={(e) =>
                                  setInvestmentInterest(e.target.value)
                                }
                              />
                              <Button
                                onClick={() => addInvestmentInterest()}
                                variant="outline-secondary"
                                id="button-addon2"
                              >
                                +
                              </Button>
                            </InputGroup>

                            {temporaryInterests ? (
                              <ul className="suggestions-lists m-0 p-0">
                                {temporaryInterests?.map((interest, key) => (
                                  <Badge
                                    style={{ padding: "8px" }}
                                    pill
                                    bg="primary"
                                  >
                                    {interest.name}
                                    <i
                                      style={{
                                        paddingLeft: "4px",
                                      }}
                                      className="fas fa-trash-alt"
                                      onClick={() =>
                                        removeInvestmentInterest(key)
                                      }
                                    ></i>
                                  </Badge>
                                ))}
                              </ul>
                            ) : null}
                          </Form.Group>
                          <Button onClick={(e) => submitInvestmentInterest(e)}>
                            Submit
                          </Button>
                          <Button
                            style={{ marginLeft: 10 }}
                            onClick={() => setWriteInvestmentInterest(false)}
                          >
                            Cancel
                          </Button>
                        </Form>
                      </div>
                    ) : (
                      <>
                        {user?.investmentInterests?.length > 0 ? (
                          <ul className="suggestions-lists m-0 p-0">
                            {user?.investmentInterests?.map((interest, key) => (
                              <Badge
                                style={{ padding: "8px" }}
                                pill
                                bg="primary"
                              >
                                {interest.name}
                              </Badge>
                            ))}
                          </ul>
                        ) : (
                          <ul className="suggestions-lists m-0 p-0">
                            <li className="d-flex mb-4 align-items-center">
                              <div className="user-img img-fluid">
                                <i
                                  className="ri-add-fill"
                                  onClick={() =>
                                    setWriteInvestmentInterest(true)
                                  }
                                  role="button"
                                ></i>
                              </div>
                              <div className="ms-3">
                                <h6>Add investment interest</h6>
                              </div>
                            </li>
                          </ul>
                        )}
                      </>
                    )}
                  </div>
                </Col>
                <Col sm={4}>
                  <Container>
                    <Row>
                      <Col>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                          }}
                        >
                          <h4>Previous investments</h4>
                          {writePreviousInvestments &&
                          previousInvestments.length > 0 ? null : (
                            <div className="user-img img-fluid">
                              <i
                                className="fas fa-user-edit"
                                onClick={() =>
                                  setWritePreviousInvestments(true)
                                }
                                role="button"
                              ></i>
                            </div>
                          )}
                        </div>

                        <div>
                          {writePreviousInvestments ? (
                            <div>
                              <Form>
                                <Form.Group
                                  className="mb-3"
                                  controlId="exampleForm.ControlTextarea1"
                                >
                                  <InputGroup className="mb-3">
                                    <FormControl
                                      onChange={(e) =>
                                        setPreviousInvestment(e.target.value)
                                      }
                                    />
                                    <Button
                                      onClick={() => addPreviousInvestment()}
                                      variant="outline-secondary"
                                      id="button-addon2"
                                    >
                                      +
                                    </Button>
                                  </InputGroup>

                                  {temporaryInvestments ? (
                                    <ul className="suggestions-lists m-0 p-0">
                                      {temporaryInvestments?.map(
                                        (interest, key) => (
                                          <Badge
                                            style={{
                                              padding: "8px",
                                            }}
                                            pill
                                            bg="primary"
                                          >
                                            {interest.name}
                                            <i
                                              style={{
                                                paddingLeft: "4px",
                                              }}
                                              className="fas fa-trash-alt"
                                              onClick={() =>
                                                removePreviousInvestment(key)
                                              }
                                            ></i>
                                          </Badge>
                                        )
                                      )}
                                    </ul>
                                  ) : null}
                                </Form.Group>
                                <Button
                                  onClick={(e) => submitPreviousInvestment(e)}
                                >
                                  Submit
                                </Button>
                                <Button
                                  style={{ marginLeft: 10 }}
                                  onClick={() =>
                                    setWritePreviousInvestments(false)
                                  }
                                >
                                  Cancel
                                </Button>
                              </Form>
                            </div>
                          ) : (
                            <>
                              {user?.previousInvestments.length > 0 ? (
                                <ul className="suggestions-lists m-0 p-0">
                                  {user?.previousInvestments?.map(
                                    (interest, key) => (
                                      <Badge
                                        style={{ padding: "8px" }}
                                        pill
                                        bg="primary"
                                      >
                                        {interest.name}
                                      </Badge>
                                    )
                                  )}
                                </ul>
                              ) : (
                                <ul className="suggestions-lists m-0 p-0">
                                  <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid">
                                      <i
                                        className="ri-add-fill"
                                        onClick={() =>
                                          setWritePreviousInvestments(true)
                                        }
                                        role="button"
                                      ></i>
                                    </div>
                                    <div className="ms-3">
                                      <h6>Add previous investments</h6>
                                    </div>
                                  </li>
                                </ul>
                              )}
                            </>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </Col>
                <Col sm={4}>
                  <Container>
                    <Row>
                      <Col sm>
                        <div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <h4>Markets</h4>
                            {writeMarkets && markets.length > 0 ? null : (
                              <div className="user-img img-fluid">
                                <i
                                  className="fas fa-user-edit"
                                  onClick={() => setWriteMarkets(true)}
                                  role="button"
                                ></i>
                              </div>
                            )}
                          </div>

                          {writeMarkets ? (
                            <div>
                              <Form>
                                <Form.Group
                                  className="mb-3"
                                  controlId="exampleForm.ControlTextarea1"
                                >
                                  <Form.Label>
                                    What markets are you looking for?
                                  </Form.Label>
                                  <ReactFlagsSelect
                                    searchable
                                    selected={selected}
                                    onSelect={(code) => addMarket(code)}
                                  />

                                  {temporaryMarkets ? (
                                    <ul className="suggestions-lists m-0 p-0">
                                      {temporaryMarkets?.map((market, key) => (
                                        <>
                                          <Badge
                                            style={{
                                              padding: "8px",
                                            }}
                                            pill
                                            bg="primary"
                                          >
                                            <Flag
                                              flagNationCode={market.name}
                                            />
                                            <i
                                              style={{
                                                paddingLeft: "4px",
                                              }}
                                              className="fas fa-trash-alt"
                                              onClick={() => removeMarket(key)}
                                            ></i>
                                          </Badge>{" "}
                                        </>
                                      ))}
                                    </ul>
                                  ) : null}
                                </Form.Group>
                                <Button onClick={(e) => submitMarkets(e)}>
                                  Submit
                                </Button>
                                <Button
                                  style={{ marginLeft: 10 }}
                                  onClick={() => setWriteMarkets(false)}
                                >
                                  Cancel
                                </Button>
                              </Form>
                            </div>
                          ) : (
                            <>
                              {user?.markets.length > 0 ? (
                                <div className="markets">
                                  <div className="user-img img-fluid"></div>
                                  {user?.markets?.map((market, key) => (
                                    <>
                                      <Badge pill bg="primary">
                                        <Flag flagNationCode={market.name} />
                                      </Badge>{" "}
                                    </>
                                  ))}
                                </div>
                              ) : (
                                <ul className="suggestions-lists m-0 p-0">
                                  <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid">
                                      <i
                                        className="ri-add-fill"
                                        onClick={() => setWriteMarkets(true)}
                                      ></i>
                                    </div>
                                    <div className="ms-3">
                                      <h6>Add markets</h6>
                                    </div>
                                  </li>
                                </ul>
                              )}
                            </>
                          )}
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm>
                        <div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <h4>Industry</h4>
                            {writeIndustry && industrys.length > 0 ? null : (
                              <i
                                className="fas fa-user-edit"
                                onClick={() => setWriteIndustry(true)}
                                role="button"
                              ></i>
                            )}
                          </div>

                          {writeIndustry ? (
                            <div>
                              <Form>
                                <Form.Group
                                  className="mb-3"
                                  controlId="exampleForm.ControlTextarea1"
                                >
                                  <Form.Label>
                                    What industrys are you looking for?
                                  </Form.Label>

                                  <Select
                                    onChange={addIndustry}
                                    options={preIndustrys}
                                  />

                                  {temporaryIndustrys ? (
                                    <ul className="suggestions-lists m-0 p-0">
                                      {temporaryIndustrys?.map(
                                        (industry, key) => (
                                          <>
                                            <Badge
                                              style={{
                                                padding: "8px",
                                              }}
                                              pill
                                              bg="primary"
                                            >
                                              {industry.name}
                                              <i
                                                role="button"
                                                className="ms-2 fas fa-trash-alt"
                                                onClick={() =>
                                                  removeIndustry(key)
                                                }
                                              ></i>
                                            </Badge>{" "}
                                          </>
                                        )
                                      )}
                                    </ul>
                                  ) : null}
                                </Form.Group>
                                <Button onClick={(e) => submitIndustrys(e)}>
                                  Submit
                                </Button>
                                <Button
                                  style={{ marginLeft: 10 }}
                                  onClick={() => setWriteIndustry(false)}
                                >
                                  Cancel
                                </Button>
                              </Form>
                            </div>
                          ) : (
                            <>
                              {user?.industries.length > 0 ? (
                                <div className="markets">
                                  <div className="user-img img-fluid"></div>

                                  {user?.industries?.map((industry, key) => (
                                    <>
                                      <Badge
                                        style={{ padding: "8px" }}
                                        pill
                                        bg="primary"
                                      >
                                        {industry.name}
                                      </Badge>{" "}
                                    </>
                                  ))}
                                </div>
                              ) : (
                                <ul className="suggestions-lists m-0 p-0">
                                  <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid">
                                      <i
                                        className="ri-add-fill"
                                        onClick={() => setWriteIndustry(true)}
                                      ></i>
                                    </div>
                                    <div className="ms-3">
                                      <h6>Add </h6>
                                    </div>
                                  </li>
                                </ul>
                              )}
                            </>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </Tab.Container>
    </Tab.Pane>
  );
}
