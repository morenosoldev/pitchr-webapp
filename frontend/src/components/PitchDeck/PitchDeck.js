import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { BsBullseye, BsCpu, BsFillPlusCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Card from "../Card";
import Flag from "../Flag/Flag";
import Equity from "../../views/Business/Charts/Equity";
import DeckSlider from "../Feed/DeckSlider";
import MRR from "../Financials/MRR";
import "./style.css";

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
  return (
    <div className="pitch-big" style={{ display: "flex" }}>
      <Card className="pitch-card card-block card-stretch">
        <Card.Body>
          <div style={{ width: "100%", height: "100%" }} className="user-post">
            <div style={{ height: "100%" }}>
              <div
                className="pickgradient row-span-2 row-span-md-1"
                style={{ display: "flex", height: "100%" }}
              >
                <Container style={{ height: "100%" }} fluid>
                  <Row style={{ height: "100%" }}>
                    <Col className="tw-items-center tw-flex" sm={4}>
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
                                <div>
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
                                  <p style={{ fontWeight: "bold" }}>
                                    {company}
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
                                <div>
                                  <p
                                    className="company-description"
                                    style={{ textAlign: "left" }}
                                  >
                                    {description}
                                  </p>
                                </div>
                              </Row>
                            </Col>
                          </Row>

                          <Row>
                            <div style={{ display: "flex" }} className="mb-4">
                              <span>Team</span>
                            </div>

                            {members.map((member, index) => (
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
                          </Row>

                          <Row
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                            className="mt-7"
                          >
                            <div style={{ display: "flex" }} className="mt-4">
                              <span>Equity</span>
                            </div>
                            <Col sm={7}>
                              <div style={{ width: "100%", height: "125px" }}>
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
                                      <td>{member.name}</td>
                                      <td>{member.equity}%</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </Col>
                          </Row>

                          <Row className="mt-4">
                            <div style={{ display: "flex" }} className="mb-4">
                              <span>Key numbers</span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                              }}
                            >
                              {charts.map((chart) => (
                                <Col
                                  style={{
                                    display: "contents",
                                    marginRight: 10,
                                  }}
                                >
                                  <MRR data={chart} />
                                </Col>
                              ))}
                            </div>
                          </Row>
                        </div>
                      </div>
                    </Col>

                    <Col sm={8} className="h-100">
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
