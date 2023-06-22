import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import ReactFlagsSelect from "react-flags-select";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Select from "react-select";
import Flag from "../../../components/Flag/Flag";
import { userActions } from "../../../store/actions";
import API from "../../../util/AxiosConfig";

export default function AboutUs() {
  const user = useSelector((state) => state.authentication.user);
  let { id } = useParams();

  const [edit, setEdit] = useState(user.user_id == id);
  const [description, setDescription] = useState(null);
  const [selected, setSelected] = useState("");
  const [writeDescription, setWriteDescription] = useState(false);
  const [developmentStage, setDevelopmentStage] = useState(null);
  const [location, setLocation] = useState(null);
  const [writeDevelopmentStage, setWriteDevelopmentStage] = useState(false);
  const dispatch = useDispatch();
  const [goal, setGoal] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [competence, setCompetence] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [competences, setCompetences] = useState([]);
  const [profile, setProfile] = useState(null);
  const [writeGoal, setWriteGoal] = useState(false);
  const [writeCompetences, setWriteCompetences] = useState(false);

  const [writeIndustry, setWriteIndustry] = useState(false);
  const [temporaryIndustry, setTemporaryIndustry] = useState([]);

  const [writeMarkets, setWriteMarkets] = useState(false);
  const [temporaryMarkets, setTemporaryMarkets] = useState([]);

  const preIndustrys = [
    { value: "Technology", label: "Technology" },
    { value: "Fintech", label: "Fintech" },
    { value: "Entertainment", label: "Entertainment" },
  ];

  useEffect(async () => {
    await API.get(`/getUser/${id}`).then(async (rest) => {
      setProfile(rest.data.user);
      setDescription(rest.data.user?.description);
      setDevelopmentStage(rest.data.user?.development_stage);
      setLocation(rest.data.user?.location);
      setGoal(rest.data.user?.goal);
      setPercentage(rest.data.user?.percentage);
      const res = await API.get(`/getCompetences/${rest.data.user?.id}`);
      setCompetences(res.data);
    });
  }, []);

  const addIndustry = (selectedOption) => {
    setTemporaryIndustry({ name: selectedOption.value });
  };

  const submitIndustry = async (e) => {
    e.preventDefault();
    dispatch(userActions.updateIndustry(temporaryIndustry.name, user?.id));
    setWriteIndustry(false);
    //setIndustry(temporaryIndustry)
  };

  const submitDescription = () => {
    if (description.length > 0) {
      dispatch(userActions.updateDescription(description, user?.user_id));
      setWriteDescription(false);
    }
  };

  const submitDevolpmentStage = () => {
    if (developmentStage.length > 0) {
      dispatch(
        userActions.updateDevelopmentStage(developmentStage, user?.user_id)
      );
      setWriteDevelopmentStage(false);
    }
  };

  const addMarket = (code) => {
    setSelected(code);
    setTemporaryMarkets({ name: code });
  };

  const submitMarkets = async (e) => {
    e.preventDefault();
    dispatch(userActions.updateLocation(temporaryMarkets.name, user?.id));
    setWriteMarkets(false);
  };

  const submitGoalAndPercentage = () => {
    if (goal.length > 0) {
      dispatch(userActions.updateGoal(goal, percentage, user?.user_id));
      setWriteGoal(false);
    }
  };

  const addCompetence = () => {
    setCompetences((oldArray) => [...oldArray, { name: competence }]);
  };

  const removeCompetence = (key) => {
    setCompetences(competences.filter((item, index) => index !== key));
  };

  const submitCompetences = async (e) => {
    let payload = {
      competences: competences,
    };

    e.preventDefault();
    console.log(competences);
    await API.put(`/updateCompetences/${user?.user_id}`, { data: payload })
      .then((res) => {
        setWriteCompetences(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(edit);

  return (
    <>
      <Row>
        <Col sm>
          <Card>
            <Card.Body className=" profile-page">
              <div className="profile-setting-header">
                <h4 className="mb-3">About You</h4>
                {edit && description?.length > 0 ? (
                  <div className="user-img img-fluid">
                    <i
                      className="fas fa-user-edit"
                      role="button"
                      onClick={() => setWriteDescription(true)}
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
                    <Button onClick={() => submitDescription()}>Submit</Button>
                    <Button
                      style={{ marginLeft: 10 }}
                      onClick={() => setWriteDescription(false)}
                    >
                      Cancel
                    </Button>
                  </Form>
                </div>
              ) : (
                <>
                  {user?.id !== profile?.id ? (
                    <>
                      <h6>{profile?.description}</h6>
                    </>
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
                                role="button"
                                onClick={() => setWriteDescription(true)}
                              ></i>
                            </div>
                            <div className="ms-3">
                              <h6>Add a description</h6>
                            </div>
                          </li>
                        </ul>
                      )}
                    </>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col sm>
          <Card>
            <Card.Body className=" profile-page">
              <div className="profile-setting-header">
                <h4
                  className="mb-3"
                  style={{ marginBottom: "0px", marginRight: "10px" }}
                >
                  Development stage
                </h4>
                {edit && developmentStage?.length > 0 ? (
                  <div className="user-img img-fluid">
                    <i
                      className="fas fa-user-edit"
                      role="button"
                      onClick={() => setWriteDevelopmentStage(true)}
                    ></i>
                  </div>
                ) : null}
              </div>
              {writeDevelopmentStage ? (
                <div>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Which stage is your startup in?</Form.Label>
                      <Form.Control
                        as="select"
                        value={developmentStage}
                        onChange={(e) => setDevelopmentStage(e.target.value)}
                      >
                        <option value="Pre-seed">Pre-seed</option>
                        <option value="Seed">Seed</option>
                        <option value="Start-up">Start-up</option>
                        <option value="Scale up">Scale up</option>
                      </Form.Control>
                    </Form.Group>
                    <Button onClick={() => submitDevolpmentStage()}>
                      Submit
                    </Button>
                    <Button
                      style={{ marginLeft: 10 }}
                      onClick={() => setWriteDevelopmentStage(false)}
                    >
                      Cancel
                    </Button>
                  </Form>
                </div>
              ) : (
                <>
                  {user?.id !== profile?.id ? (
                    <>
                      <h6>{developmentStage}</h6>
                    </>
                  ) : (
                    <>
                      {user?.development_stage ? (
                        <ul className="suggestions-lists m-0 p-0">
                          <li className="d-flex mb-4 align-items-center">
                            <div className="ms-3">
                              <h6>{user?.development_stage}</h6>
                            </div>
                          </li>
                        </ul>
                      ) : (
                        <ul className="suggestions-lists m-0 p-0">
                          <li className="d-flex mb-4 align-items-center">
                            <div className="user-img img-fluid">
                              <i
                                className="ri-add-fill"
                                role="button"
                                onClick={() => setWriteDevelopmentStage(true)}
                              ></i>
                            </div>
                            <div className="ms-3">
                              <h6>Choose your stage</h6>
                            </div>
                          </li>
                        </ul>
                      )}
                    </>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm>
          <Card>
            <Card.Body className=" profile-page">
              <div className="profile-setting-header">
                <h4 className="mb-3">Location</h4>
                {edit && user?.location?.length > 0 ? (
                  <div className="user-img img-fluid">
                    <i
                      className="fas fa-user-edit"
                      role="button"
                      onClick={() => setWriteMarkets(true)}
                    ></i>
                  </div>
                ) : null}
              </div>

              {writeMarkets ? (
                <div>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>What markets are you looking for?</Form.Label>
                      <ReactFlagsSelect
                        searchable
                        selected={selected}
                        onSelect={(code) => addMarket(code)}
                      />

                      {user?.location ? (
                        <ul className="suggestions-lists m-0 p-0">
                          <Badge style={{ padding: "8px" }} pill bg="primary">
                            <Flag flagNationCode={user?.location} />
                          </Badge>{" "}
                        </ul>
                      ) : null}
                    </Form.Group>
                    <Button onClick={(e) => submitMarkets(e)}>Submit</Button>
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
                  {user?.id !== profile?.id ? (
                    <>
                      <Flag flagNationCode={location ? location : "DK"} />{" "}
                    </>
                  ) : (
                    <>
                      {user?.location ? (
                        <ul className="suggestions-lists m-0 p-0">
                          <li className="d-flex mb-4 align-items-center">
                            <div className="ms-3">
                              <Flag flagNationCode={user?.location} />
                            </div>
                          </li>
                        </ul>
                      ) : (
                        <ul className="suggestions-lists m-0 p-0">
                          <li className="d-flex mb-4 align-items-center">
                            <div className="user-img img-fluid">
                              <i
                                className="ri-add-fill"
                                role="button"
                                onClick={() => setWriteMarkets(true)}
                              ></i>
                            </div>
                            <div className="ms-3">
                              <h6>Add location</h6>
                            </div>
                          </li>
                        </ul>
                      )}
                    </>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col sm>
          <Card>
            <Card.Body className=" profile-page">
              <div className="profile-setting-header">
                <h4 className="mb-3">Industry</h4>
                {edit && !writeIndustry && user?.industry ? (
                  <div className="user-img img-fluid">
                    <i
                      className="fas fa-user-edit"
                      role="button"
                      onClick={() => setWriteIndustry(true)}
                    ></i>
                  </div>
                ) : null}
              </div>

              {writeIndustry ? (
                <div>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>What industry are you in?</Form.Label>

                      <Select onChange={addIndustry} options={preIndustrys} />
                    </Form.Group>
                    <Button onClick={(e) => submitIndustry(e)}>Submit</Button>
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
                  {user?.id !== profile?.id ? (
                    <>
                      <h6>{profile?.industry}</h6>
                    </>
                  ) : (
                    <>
                      {user?.industry ? (
                        <ul className="suggestions-lists m-0 p-0">
                          <li className="d-flex mb-4 align-items-center">
                            <div className="ms-3">
                              <h6>{user?.industry}</h6>
                            </div>
                          </li>
                        </ul>
                      ) : (
                        <ul className="suggestions-lists m-0 p-0">
                          <li className="d-flex mb-4 align-items-center">
                            <div className="user-img img-fluid">
                              <i
                                className="ri-add-fill"
                                role="button"
                                onClick={() => setWriteIndustry(true)}
                              ></i>
                            </div>
                            <div className="ms-3">
                              <h6>Add your industry</h6>
                            </div>
                          </li>
                        </ul>
                      )}
                    </>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col sm>
          <Card>
            <Card.Body className=" profile-page">
              <h4 className="mb-3">Looking for</h4>

              <Row>
                <Col sm>
                  <div className="profile-setting-header">
                    <p style={{ marginBottom: "0px", marginRight: "10px" }}>
                      Capital
                    </p>
                    {edit && goal?.length > 0 ? (
                      <div className="user-img img-fluid">
                        <i
                          className="fas fa-user-edit"
                          role="button"
                          onClick={() => setWriteGoal(true)}
                        ></i>
                      </div>
                    ) : null}
                  </div>
                  {writeGoal ? (
                    <div>
                      <Form>
                        <fieldset>
                          <Form.Group className="mb-3">
                            <Form.Label>
                              How much capital are you looking for?
                            </Form.Label>
                            <Form.Control
                              as="select"
                              value={goal}
                              onChange={(e) => setGoal(e.target.value)}
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

                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="textInput">
                              How much ownership are you offering?
                            </Form.Label>
                            <Form.Control
                              id="textInput"
                              placeholder="Percentage"
                              as="input"
                              onChange={(e) => setPercentage(e.target.value)}
                            />
                          </Form.Group>

                          <Button
                            onClick={() => submitGoalAndPercentage()}
                            type="submit"
                          >
                            Submit
                          </Button>
                          <Button
                            style={{ marginLeft: 10 }}
                            onClick={() => setWriteGoal(false)}
                          >
                            Cancel
                          </Button>
                        </fieldset>
                      </Form>
                    </div>
                  ) : (
                    <>
                      {user?.id !== profile?.id ? (
                        <>
                          <h6>
                            {goal} for {percentage}% of our company.
                          </h6>
                        </>
                      ) : (
                        <>
                          {user?.goal ? (
                            <ul className="suggestions-lists m-0 p-0">
                              <li className="d-flex mb-4 align-items-center">
                                <div className="ms-3">
                                  <h6>
                                    {user?.goal} for {user?.percentage}% of our
                                    company.
                                  </h6>
                                </div>
                              </li>
                            </ul>
                          ) : (
                            <ul className="suggestions-lists m-0 p-0">
                              <li className="d-flex mb-4 align-items-center">
                                <div className="user-img img-fluid">
                                  <i
                                    className="ri-add-fill"
                                    onClick={() => setWriteGoal(true)}
                                    role="button"
                                  ></i>
                                </div>
                                <div className="ms-3">
                                  <h6>Add desired capital</h6>
                                </div>
                              </li>
                            </ul>
                          )}
                        </>
                      )}
                    </>
                  )}
                </Col>

                <Col sm>
                  <div style={{ display: "flex" }}>
                    <p style={{ marginBottom: "0px", marginRight: "10px" }}>
                      Competences
                    </p>
                    {edit && !writeCompetences && competences?.length > 0 ? (
                      <div className="user-img img-fluid">
                        <i
                          className="fas fa-user-edit"
                          onClick={() => setWriteCompetences(true)}
                          role="button"
                        ></i>
                      </div>
                    ) : null}
                  </div>

                  {writeCompetences ? (
                    <div>
                      <Form>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlTextarea1"
                        >
                          <InputGroup className="mb-3">
                            <FormControl
                              onChange={(e) => setCompetence(e.target.value)}
                            />
                            <Button
                              onClick={() => addCompetence()}
                              variant="outline-secondary"
                              id="button-addon2"
                            >
                              +
                            </Button>
                          </InputGroup>

                          {competences.length > 0 ? (
                            <ul className="suggestions-lists m-0 p-0">
                              {competences?.map((competence, key) => (
                                <Badge className="p-2 m-1" pill bg="primary">
                                  {competence.name}
                                  <i
                                    role="button"
                                    className="pl-1 fas fa-trash-alt"
                                    onClick={() => removeCompetence(key)}
                                  ></i>
                                </Badge>
                              ))}
                            </ul>
                          ) : null}
                        </Form.Group>
                        <Button onClick={(e) => submitCompetences(e)}>
                          Submit
                        </Button>
                        <Button
                          style={{ marginLeft: 10 }}
                          onClick={() => setWriteCompetences(false)}
                        >
                          Cancel
                        </Button>
                      </Form>
                    </div>
                  ) : (
                    <>
                      {competences.length > 0 ? (
                        <ul className="suggestions-lists m-0 p-0">
                          {competences?.map((competence, key) => (
                            <Badge key={key}>
                              <p>{competence.name}</p>
                            </Badge>
                          ))}
                        </ul>
                      ) : (
                        <ul className="suggestions-lists m-0 p-0">
                          <li className="d-flex mb-4 align-items-center">
                            {edit ? (
                              <>
                                <div className="user-img img-fluid">
                                  <i
                                    className="ri-add-fill"
                                    role="button"
                                    onClick={() => setWriteCompetences(true)}
                                  ></i>
                                </div>
                                <div className="ms-3">
                                  <h6>Add wanted competence</h6>
                                </div>
                              </>
                            ) : (
                              <p>Hasn't been added yet.</p>
                            )}
                          </li>
                        </ul>
                      )}
                    </>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
