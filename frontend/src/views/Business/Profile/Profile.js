import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";
import ReactFlagsSelect from "react-flags-select";
import {
  AiOutlineAreaChart,
  AiOutlineCamera,
  AiOutlineClose,
  AiOutlineEdit,
} from "react-icons/ai";
import "./profile.scss";
import { BsCpu, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DeckSlider from "../../../components/Feed/DeckSlider";
import Flag from "../../../components/Flag/Flag";
import { uploadFile } from "../../../firebase";
import { userActions } from "../../../store/actions";
import { viewActions } from "../../../store/actions/views.actions";
import API from "../../../util/AxiosConfig";
import File from "../../dashboard/app/file";
import Groups from "../../dashboard/app/groups";
import FinancialIndex from "../Financials";
import DeckShowcase from "./DeckShowcase";

export default function Profile() {
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();
  const { type, id } = useParams();
  const [key, setKey] = useState("all");
  const [profile, setProfile] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [description, setDescription] = useState("");
  const [capital, setCapital] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [stage, setStage] = useState("");
  const [country, setCountry] = useState("");
  const [competence, setCompetence] = useState("");
  const [competences, setCompetences] = useState([]);
  const [editElevatorPitch, setEditElevatorPitch] = useState(false);
  const [editIndustry, setEditIndustry] = useState(false);
  const [editCountry, setEditCountry] = useState(false);
  const [editStage, setEditStage] = useState(false);
  const [editCapital, setEditCapital] = useState(false);
  const [editCompetences, setEditCompetences] = useState(false);
  const [editInvestorAsk, setInvestorAsk] = useState(false);
  const [edit, setEdit] = useState(false);

  const options = [
    { name: "Swedish", value: "sv" },
    { name: "English", value: "en" },
    {
      type: "group",
      name: "Group name",
      items: [{ name: "Spanish", value: "es" }],
    },
  ];

  useEffect(async () => {
    setKey(type);

    if (user?.user_id !== Number(id)) {
      dispatch(viewActions.addProfileViews(id, user?.user_id));
    }

    async function getProfile() {
      const profile = (await API.get(`/business/${id}`)).data;
      setEdit(user?.user_id == id);

      setProfile(profile);
      setDescription(profile?.description);
      setCountry(profile?.Business.location);
      setStage(profile?.Business.development_stage);
      setCompetences(profile?.Business.competences);
    }

    getProfile();
  }, [user]);

  const updateDescription = () => {
    dispatch(userActions.updateDescription(description, user?.user_id));
    setEditElevatorPitch(false);
  };

  const addCompetence = () => {
    if (competence.length > 0) {
      setCompetences((oldArray) => [...oldArray, { name: competence }]);
    }
    setCompetence("");
  };

  const updatePicture = async (file) => {
    console.log("køre nu");
    const image = await uploadFile(file);
    console.log(image);
    dispatch(userActions.updateProfilePicture(image, user?.user_id));
    return;
  };

  const removeCompetence = (index) => {
    setCompetences([
      ...competences.slice(0, index),
      ...competences.slice(index + 1, competences.length),
    ]);
  };

  const updateIndustry = () => {
    dispatch(userActions.updateIndustry(industry, user?.user_id));
    setEditIndustry(false);
  };

  const updateLocation = () => {
    dispatch(userActions.updateLocation(country, user?.user_id));
    setEditCountry(false);
  };

  const updateDevelopmentStage = () => {
    dispatch(userActions.updateDevelopmentStage(stage, user?.user_id));
    setEditStage(false);
  };

  const updateGoal = () => {
    dispatch(userActions.updateGoal(capital, percentage, user?.user_id));
    setEditCapital(false);
  };

  const updateCompetences = async () => {
    await API.put(`/competences/${user?.user_id}`, {
      competences: competences,
    });
    dispatch(
      userActions.updateIndustry(profile?.Business.industry, user?.user_id)
    );
    setEditCompetences(false);
  };

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col className="h-100" sm={3}>
          <Card style={{ overflowY: "scroll" }} className="h-100">
            <Card.Body>
              <div style={{ width: "100%" }} className="user-profile">
                <div className="user">
                  <Row>
                    <Row>
                      <div
                        className="mb-2"
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <div style={{ position: "relative" }}>
                          <img
                            className="rounded-circle avatar-50"
                            src={profile?.profile_pic}
                          />

                          {edit ? (
                            <label
                              htmlFor="file-upload"
                              className="custom-file-upload"
                            >
                              <div className="add-picture-ab">
                                <AiOutlineCamera color="white" />
                              </div>
                            </label>
                          ) : null}

                          <input
                            id="file-upload"
                            hidden
                            type="file"
                            onChange={(e) => updatePicture(e.target.files[0])}
                          />

                          <p style={{ fontWeight: "bold" }}>{profile?.name}</p>
                        </div>
                      </div>
                      <hr></hr>
                    </Row>

                    <Row>
                      <div className="text-left mb-3 mt-3">
                        <h5 className="d-flex align-items-center text-left">
                          Elevator pitch{" "}
                          {!editElevatorPitch && edit ? (
                            <AiOutlineEdit
                              style={{ marginLeft: "5px", cursor: "pointer" }}
                              onClick={() => setEditElevatorPitch(true)}
                            />
                          ) : edit ? (
                            <AiOutlineClose
                              style={{ marginLeft: "5px", cursor: "pointer" }}
                              onClick={() => setEditElevatorPitch(false)}
                            />
                          ) : null}{" "}
                        </h5>
                        {editElevatorPitch ? (
                          <>
                            <Form.Control
                              as="textarea"
                              className="mb-2"
                              rows={3}
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                            <Button onClick={() => updateDescription()}>
                              Save
                            </Button>
                          </>
                        ) : (
                          <div>
                            {profile?.description ? (
                              <p
                                style={{
                                  textAlign: "left",
                                  fontSize: "0.6rem",
                                }}
                              >
                                {profile?.description}
                              </p>
                            ) : (
                              <p className="text-left">No elevator pitch</p>
                            )}
                          </div>
                        )}
                      </div>
                      <hr></hr>
                    </Row>

                    <Row>
                      <div className="text-left mb-3 mt-3">
                        <h5
                          style={{
                            textAlign: "left",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          Industry{" "}
                          {!editIndustry && edit ? (
                            <AiOutlineEdit
                              style={{ marginLeft: "5px", cursor: "pointer" }}
                              onClick={() => setEditIndustry(true)}
                            />
                          ) : edit ? (
                            <AiOutlineClose
                              style={{ marginLeft: "5px", cursor: "pointer" }}
                              onClick={() => setEditIndustry(false)}
                            />
                          ) : null}
                        </h5>
                        {editIndustry ? (
                          <>
                            <Form.Select
                              className="mb-2"
                              aria-label="Industry"
                              value={industry}
                              onChange={(e) => {
                                console.log("e.target.value", e.target.value);
                                setIndustry(e.target.value);
                              }}
                            >
                              <option>Industry</option>
                              <option value="fintech">Fintech</option>
                              <option value="software">Software</option>
                              <option value="blabla">Blalba</option>
                            </Form.Select>

                            <Button onClick={() => updateIndustry()}>
                              Save
                            </Button>
                          </>
                        ) : (
                          <p className="text-left">
                            {" "}
                            <BsCpu
                              style={{ display: "inline", marginRight: "5px" }}
                            />
                            {profile?.Business?.industry
                              ? profile?.Business?.industry
                              : "No industry set yet"}
                          </p>
                        )}
                      </div>
                      <hr></hr>
                    </Row>

                    <Row>
                      <div className="text-left mb-3 mt-3">
                        <h5
                          style={{
                            textAlign: "left",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          Location{" "}
                          {!editCountry && edit ? (
                            <AiOutlineEdit
                              style={{ marginLeft: "5px", cursor: "pointer" }}
                              onClick={() => setEditCountry(true)}
                            />
                          ) : edit ? (
                            <AiOutlineClose
                              style={{ marginLeft: "5px", cursor: "pointer" }}
                              onClick={() => setEditCountry(false)}
                            />
                          ) : null}
                        </h5>

                        {editCountry ? (
                          <>
                            <ReactFlagsSelect
                              searchable
                              className="mb-2"
                              selected={country}
                              onSelect={(code) => setCountry(code)}
                            />
                            <Button onClick={() => updateLocation()}>
                              Save
                            </Button>
                          </>
                        ) : (
                          <p className="text-left">
                            <Flag
                              flagNationCode={
                                profile?.Business.location
                                  ? profile?.Business.location
                                  : "DK"
                              }
                              showText={true}
                            />
                          </p>
                        )}
                      </div>
                      <hr></hr>
                    </Row>

                    <Row>
                      <div className="text-left mb-3 mt-3">
                        <h5
                          style={{
                            textAlign: "left",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          Development stage{" "}
                          {!editStage && edit ? (
                            <AiOutlineEdit
                              style={{ marginLeft: "5px", cursor: "pointer" }}
                              onClick={() => setEditStage(true)}
                            />
                          ) : edit ? (
                            <AiOutlineClose
                              style={{ marginLeft: "5px", cursor: "pointer" }}
                              onClick={() => setEditStage(false)}
                            />
                          ) : null}
                        </h5>

                        {editStage ? (
                          <>
                            <Form.Select
                              className="mb-2"
                              aria-label="Development stage"
                              value={stage}
                              onChange={(e) => {
                                console.log("e.target.value", e.target.value);
                                setStage(e.target.value);
                              }}
                            >
                              <option>Stage</option>
                              <option value="Seed">Seed</option>
                              <option value="Startup">Startup</option>
                              <option value="Scale up">Scale up</option>
                            </Form.Select>
                            <Button onClick={() => updateDevelopmentStage()}>
                              Save
                            </Button>
                          </>
                        ) : (
                          <p className="mt-2 d-flex align-items-center text-left">
                            {" "}
                            <AiOutlineAreaChart
                              style={{ display: "inline" }}
                            />{" "}
                            {profile?.Business?.development_stage
                              ? profile?.Business?.development_stage
                              : "No development stage set yet"}{" "}
                          </p>
                        )}
                      </div>
                      <hr></hr>
                    </Row>

                    <Row>
                      <div className="mt-2">
                        <h5
                          style={{
                            textAlign: "left",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          Investor ask
                        </h5>

                        <Row className="text-left mt-2 mb-2">
                          <span
                            style={{ fontWeight: "bold", textAlign: "left" }}
                          >
                            Capital{" "}
                            {!editCapital && edit ? (
                              <AiOutlineEdit
                                onClick={() => setEditCapital(true)}
                                style={{
                                  marginLeft: "5px",
                                  cursor: "pointer",
                                  display: "inline",
                                }}
                              />
                            ) : edit ? (
                              <AiOutlineClose
                                style={{
                                  marginLeft: "5px",
                                  cursor: "pointer",
                                  display: "inline",
                                }}
                                onClick={() => setEditCapital(false)}
                              />
                            ) : null}
                          </span>
                          <div>
                            {editCapital ? (
                              <>
                                <Form.Select
                                  value={capital}
                                  onChange={(e) => setCapital(e.target.value)}
                                  aria-label="Capital"
                                >
                                  <option>Wanted capital</option>
                                  <option value="500.000 - 1000.000">
                                    500.000 - 1M
                                  </option>
                                  <option value="500.000 - 1000.000">
                                    1M - 2M
                                  </option>
                                  <option value="500.000 - 1000.000">
                                    2M - 5M
                                  </option>
                                </Form.Select>

                                <Form.Group
                                  className=" mt-3"
                                  controlId="exampleForm.ControlInput1"
                                >
                                  <span
                                    className="mb-2"
                                    style={{
                                      fontWeight: "bold",
                                      textAlign: "left",
                                      display: "flex",
                                    }}
                                  >
                                    Percentage
                                  </span>
                                  <Form.Control
                                    className="mb-2"
                                    type="number"
                                    placeholder="Percentage"
                                    value={percentage}
                                    onChange={(e) =>
                                      setPercentage(e.target.value)
                                    }
                                  />
                                </Form.Group>

                                <Button onClick={() => updateGoal()}>
                                  Save
                                </Button>
                              </>
                            ) : (
                              <p className="text-left">
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "1rem",
                                    marginRight: 3,
                                  }}
                                >
                                  $
                                </span>
                                {profile?.Business?.goal} for{" "}
                                {profile?.Business?.percentage}%
                              </p>
                            )}
                          </div>
                        </Row>

                        <Row>
                          <span
                            style={{ fontWeight: "bold", textAlign: "left" }}
                          >
                            Competences{" "}
                            {!editCompetences && edit ? (
                              <AiOutlineEdit
                                onClick={() => setEditCompetences(true)}
                                style={{
                                  marginLeft: "5px",
                                  cursor: "pointer",
                                  display: "inline",
                                }}
                              />
                            ) : edit ? (
                              <AiOutlineClose
                                style={{
                                  marginLeft: "5px",
                                  cursor: "pointer",
                                  display: "inline",
                                }}
                                onClick={() => setEditCompetences(false)}
                              />
                            ) : null}
                          </span>
                          {editCompetences ? (
                            <>
                              <ul className="text-left suggestions-lists m-0 p-0">
                                <Form.Group
                                  className="mt-3"
                                  controlId="exampleForm.ControlInput1"
                                >
                                  <Form.Control
                                    className="mb-2"
                                    type="text"
                                    placeholder="Add competence"
                                    value={competence}
                                    onChange={(e) =>
                                      setCompetence(e.target.value)
                                    }
                                  />
                                  <Button onClick={addCompetence}>Add</Button>
                                </Form.Group>
                                {competences.map((competence, index) => (
                                  <Badge>
                                    <p style={{ display: "inline" }}>
                                      {competence.name}
                                    </p>
                                    <BsTrash
                                      style={{
                                        cursor: "pointer",
                                        display: "inline",
                                        marginLeft: "6px",
                                      }}
                                      onClick={() => removeCompetence(index)}
                                    />
                                  </Badge>
                                ))}
                              </ul>

                              <Button onClick={() => updateCompetences()}>
                                Save
                              </Button>
                            </>
                          ) : (
                            <ul className="text-left suggestions-lists m-0 p-0">
                              {profile?.Business?.competences.map(
                                (competence) => (
                                  <Badge>
                                    <p>{competence.name}</p>
                                  </Badge>
                                )
                              )}
                            </ul>
                          )}
                        </Row>
                      </div>
                    </Row>
                  </Row>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={9} className="h-100">
          <Card className="h-100">
            <Row style={{ display: "flex" }} className="h-100">
              <Tab.Container
                activeKey={key}
                onSelect={(k) => setKey(k)}
                id="left-tabs-example"
                defaultActiveKey="deck"
              >
                <Nav
                  as="ul"
                  variant="tabs"
                  style={{ height: "65px", borderBottom: "none" }}
                  className="d-flex align-items-center justify-content-center profile-feed-items p-0 m-0 mb-2"
                >
                  <Nav.Item
                    as="li"
                    className={`banner ${
                      key == "deck" ? "activeMenu" : ""
                    } col-12 col-sm-2 p-0`}
                  >
                    <Nav.Link
                      href="#deck"
                      eventKey="deck"
                      role="button"
                      className="text-center"
                    >
                      Deck
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item
                    as="li"
                    className={`banner ${
                      key == "pitch" ? "activeMenu" : ""
                    } col-12 col-sm-2 p-0`}
                  >
                    <Nav.Link
                      href="#pitch"
                      eventKey="pitch"
                      role="button"
                      className="text-center"
                    >
                      Pitch
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item
                    as="li"
                    className={`banner ${
                      key == "team" ? "activeMenu" : ""
                    } col-12 col-sm-2 p-0`}
                  >
                    <Nav.Link
                      href="#team"
                      eventKey="team"
                      role="button"
                      className="text-center"
                    >
                      Team
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item
                    as="li"
                    className={`banner ${
                      key == "financials" ? "activeMenu" : ""
                    } col-12 col-sm-2 p-0`}
                  >
                    <Nav.Link
                      href="#financials"
                      eventKey="financials"
                      role="button"
                      className="text-center"
                    >
                      Metrics
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item
                    as="li"
                    className={`banner ${
                      key == "files" ? "activeMenu" : ""
                    } col-12 col-sm-2 p-0`}
                  >
                    <Nav.Link
                      href="#files"
                      eventKey="files"
                      role="button"
                      className="text-center"
                    >
                      Document Room
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content style={{ height: "calc(100% - 65px)" }}>
                  <Tab.Pane className="h-100" eventKey="deck">
                    <DeckSlider userID={id} />
                  </Tab.Pane>

                  <Tab.Pane className="h-100" eventKey="team">
                    <Groups />
                  </Tab.Pane>

                  <Tab.Pane className="h-100" eventKey="pitch">
                    <DeckShowcase />
                  </Tab.Pane>

                  <Tab.Pane eventKey="files">
                    <File />
                  </Tab.Pane>

                  <Tab.Pane className="h-100" eventKey="financials">
                    <FinancialIndex />
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
