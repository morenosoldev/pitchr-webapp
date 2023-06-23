import { useEffect } from "react";
import { Card, Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Competences from "../../../components/BusinessProfile/Competences";
import DevelopmentStage from "../../../components/BusinessProfile/DevelopmentStage";
import ElevatorPitch from "../../../components/BusinessProfile/ElevatorPitch";
import Industry from "../../../components/BusinessProfile/Industry";
import InvestorAsk from "../../../components/BusinessProfile/InvestorAsk";
import ProfileTop from "../../../components/BusinessProfile/ProfileTop";
import DeckSlider from "../../../components/Feed/DeckSlider";
import Location from "../../../components/BusinessProfile/Location";
import { viewActions } from "../../../store/actions/views.actions";
import File from "../../dashboard/app/file";
import Groups from "../../dashboard/app/groups";
import FinancialIndex from "../Financials";
import DeckShowcase from "./DeckShowcase";
import { useState } from "react";
import "./profile.scss";

export default function Profile() {
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();
  const [stopVideo, setStopVideo] = useState(false);
  const { id } = useParams();
  const [key, setKey] = useState("deck");

  useEffect(() => {
    if (user?.user_id !== Number(id)) {
      dispatch(viewActions.addProfileViews(id, user?.user_id));
    }
    console.log(key);

    if (key !== "pitch") {
      setStopVideo(true);
    } else {
      setStopVideo(false);
    }
  }, [user, key]);

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col className="h-100" sm={12} md={12} lg={4} xl={4} xxl={4}>
          <Card style={{ overflowY: "scroll" }} className="h-100">
            <Card.Body>
              <div style={{ width: "100%" }} className="user-profile">
                <div className="user">
                  <Row>
                    <ProfileTop edit={user.user_id == id} />
                    <ElevatorPitch edit={user.user_id == id} />
                    <Industry edit={user.user_id == id} />
                    <Location edit={user.user_id == id} />
                    <DevelopmentStage edit={user.user_id == id} />

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

                        <InvestorAsk edit={user.user_id == id} />
                        <Competences edit={user.user_id == id} />
                      </div>
                    </Row>
                  </Row>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={12} xl={8} xxl={8} className="h-100">
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
                  <Tab.Pane className="h-100 " eventKey="deck">
                    <div className="d-flex h-100 align-items-center justify-content-center">
                      <DeckSlider userID={id} />
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="team">
                    <Groups />
                  </Tab.Pane>

                  <Tab.Pane className="h-100" eventKey="pitch">
                    <DeckShowcase stopVideo={stopVideo} />
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
