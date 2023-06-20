import React from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import {
  BsBullseye,
  BsCpu,
  BsFillEnvelopeFill,
  BsFillPlusCircleFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import Card from "../Card";
import { history } from "../../util/history";
import Flag from "../Flag/Flag";
import ChatService from "../../store/services/chat.service";
import Equity from "../../views/Business/Charts/Equity";
import DeckSlider from "../Feed/DeckSlider";
import MRR from "../Financials/MRR";
import "./style.css";
import { AiFillVideoCamera, AiOutlineVideoCamera } from "react-icons/ai";

const PitchDeck = ({
  savedPitch,
  addSavedPitch,
  isVisible,
  company,
  pitchDeck,
  logo,
  calendly,
  deck,
  location,
  members,
  description,
  charts,
  userID,
  pitchID,
}) => {
  const addChat = () => {
    ChatService.createChat(userID)
      .then((chats) => {
        //socket.emit("add-friend", chats);
        history.push("/investor/app/chat");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="pitch-big" style={{ display: "flex" }}>
      <Card className="pitch-card card-block card-stretch">
        <Card.Body>
          <div className="user-post h-100 w-100">
            <div className="h-100">
              <div className="pickgradient row-span-2 d-flex h-100 row-span-md-1">
                <Container
                  fluid
                  className="d-flex align-items-center justify-content-center"
                >
                  <Row className="w-100 h-100">
                    <Col className="mb-3" sm={12} md={12}>
                      <div style={{ width: "100%" }} className="user-profile">
                        <div className="user text-center mb-4">
                          <Row className="mb-4">
                            <Col sm={3}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-evenly",
                                }}
                              >
                                <div className="me-3">
                                  <Link
                                    to={`/investor/app/company/${userID}/deck`}
                                  >
                                    <img
                                      className="rounded-circle avatar-50 company-pic"
                                      src={logo}
                                    />
                                  </Link>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <p className="fw-bold m-0 text-left">
                                    {company}
                                  </p>
                                  <p className="company-description text-left">
                                    {description}
                                  </p>
                                  <span>
                                    <Flag
                                      flagNationCode={location}
                                      showText={false}
                                    />
                                  </span>
                                </div>
                              </div>
                            </Col>

                            <Col sm={3}>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <p className="company-icon">
                                  {" "}
                                  <BsCpu style={{ display: "inline" }} />{" "}
                                  Fintech
                                </p>
                                <p className="company-icon">
                                  {" "}
                                  <BsBullseye
                                    style={{ display: "inline" }}
                                  />{" "}
                                  Startup{" "}
                                </p>
                              </div>
                            </Col>

                            <Col sm={6}>
                              <Row>
                                <Button
                                  className="mb-3"
                                  onClick={() => addChat()}
                                >
                                  Contact startup <BsFillEnvelopeFill />
                                </Button>
                                <Link
                                  as={Button}
                                  to={`/investor/app/company/${userID}/deck#pitch`}
                                >
                                  Watch pitch <AiFillVideoCamera />
                                </Link>
                              </Row>
                            </Col>
                          </Row>

                          <Row>
                            <Col sm={6} md={6}>
                              <div style={{ display: "flex" }} className="mb-4">
                                <span>Team</span>
                              </div>
                              <div className="d-flex">
                                {members.slice(0, 3).map((member, index) => (
                                  <Col key={index} xs>
                                    <div className="team-member">
                                      <img
                                        className="rounded-circle avatar-50"
                                        src={member.profilePic}
                                      />
                                      <p
                                        style={{
                                          fontSize: "0.6rem",
                                          color: "black",
                                        }}
                                        className="mt-4"
                                      >
                                        {member.name}
                                      </p>
                                      <span style={{ fontSize: "9px" }}>
                                        {member.jobTitle}
                                      </span>
                                    </div>
                                  </Col>
                                ))}

                                {members.length >= 3 ? (
                                  <Col xs>
                                    <div
                                      style={{
                                        marginTop: "80px",
                                        display: "flex",
                                        alignItems: "center",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <BsFillPlusCircleFill />
                                      <Link
                                        to={`/investor/app/company/${userID}/team`}
                                        style={{ fontSize: "9px" }}
                                      >
                                        See more...
                                      </Link>
                                    </div>
                                  </Col>
                                ) : null}
                              </div>
                            </Col>

                            <Col sm={6} md={6}>
                              <div style={{ display: "flex" }} className="mt-4">
                                <span>Equity</span>
                              </div>
                              <Row>
                                <Col>
                                  <div
                                    style={{ width: "100%", height: "125px" }}
                                  >
                                    <Equity data={members} />
                                  </div>
                                </Col>
                                <Col>
                                  <Table hover size="sm">
                                    <thead>
                                      <tr>
                                        <th>Name</th>
                                        <th>Equity</th>
                                      </tr>
                                    </thead>

                                    <tbody>
                                      {members.map((member) => (
                                        <tr>
                                          <td>{member?.name}</td>
                                          <td>{member?.equity}%</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </Table>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Col>

                    <Col sm={12} md={12} className="h-100">
                      <Row className="h-100">
                        <DeckSlider userID={userID} />
                      </Row>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PitchDeck;
