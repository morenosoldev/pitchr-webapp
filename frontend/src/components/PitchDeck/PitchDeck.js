import React from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { AiFillVideoCamera } from "react-icons/ai";
import { BsBullseye, BsCpu, BsFillEnvelopeFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import ChatService from "../../store/services/chat.service";
import { history } from "../../util/history";
import Equity from "../../views/Business/Charts/Equity";
import Card from "../Card";
import DeckSlider from "../Feed/DeckSlider";
import Flag from "../Flag/Flag";
import "./style.css";

const PitchDeck = ({
  company,
  logo,
  calendly,
  location,
  business,
  members,
  description,
  pitchID,
  userID,
}) => {
  const addChat = async () => {
    try {
      const chats = await ChatService.createChat(userID);
      history.push("/investor/app/chat");
    } catch (error) {
      console.error("Error creating chat:", error);
    }
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
                    <Col
                      className="mb-3 d-flex align-items-center"
                      sm={12}
                      md={12}
                      xxl={4}
                    >
                      <div style={{ width: "100%" }} className="user-profile">
                        <div className="user  mb-4">
                          <Row className="mb-4">
                            <Col sm={5}>
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
                                  <h4 className="fw-bold m-0 text-left">
                                    {company}
                                  </h4>

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
                                  <BsCpu
                                    style={{ display: "inline" }}
                                    className="me-1"
                                  />{" "}
                                  {business.industry}
                                </p>
                                <p className="company-icon">
                                  <BsBullseye
                                    style={{ display: "inline" }}
                                    className="me-1"
                                  />
                                  {business.development_stage}
                                </p>
                              </div>
                            </Col>

                            <Col sm={4}>
                              <Row>
                                <Button
                                  className="mb-3"
                                  variant="primary"
                                  onClick={() => addChat()}
                                >
                                  Contact startup{" "}
                                  <BsFillEnvelopeFill className="ms-2" />
                                </Button>
                                <Link
                                  className="p-0"
                                  to={`/investor/app/company/${userID}/deck#pitch`}
                                >
                                  <Button variant="secondary" className="w-100">
                                    Watch pitch{" "}
                                    <AiFillVideoCamera className="ms-2" />
                                  </Button>
                                </Link>
                              </Row>
                            </Col>
                          </Row>

                          <Row>
                            <Col>
                              <div style={{ display: "flex" }} className="mb-4">
                                <span>Elevator pitch</span>
                              </div>
                              <p className="company-description">
                                {description}
                              </p>
                            </Col>
                          </Row>

                          <Row>
                            <Col sm={12} md={12}>
                              <div style={{ display: "flex" }} className="mb-4">
                                <span>Team</span>
                              </div>
                              <div className="d-flex">
                                {members.slice(0, 3).map((member, index) => (
                                  <Col key={index} xs>
                                    <div className="team-member">
                                      <img
                                        className="rounded-circle avatar-100"
                                        src={member.profilePic}
                                      />
                                      <p className="mt-4">{member.name}</p>
                                      <span>{member.jobTitle}</span>
                                    </div>
                                  </Col>
                                ))}
                              </div>
                            </Col>
                          </Row>

                          <Row className="equity-container">
                            <div style={{ display: "flex" }} className="mt-4">
                              <span>Equity</span>
                            </div>
                            <Row>
                              <Col sm={6}>
                                <div style={{ width: "100%", height: "225px" }}>
                                  <Equity data={members} />
                                </div>
                              </Col>
                              <Col sm={6}>
                                <Table hover>
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
                          </Row>
                        </div>
                      </div>
                    </Col>

                    <Col
                      sm={12}
                      md={12}
                      xxl={8}
                      className="h-100 pitch-deck-pdf"
                    >
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
