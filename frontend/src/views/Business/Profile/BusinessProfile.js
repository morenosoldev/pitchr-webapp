import React, { useEffect, useState } from "react";
import { Tab, Container, Row, Col, Nav, Card, Spinner } from "react-bootstrap";
import File from "../../dashboard/app/file";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { pitchActions } from "../../../store/actions/pitch.actions";
import { viewActions } from "../../../store/actions/views.actions";
import AboutUs from "./AboutUs";
import { storage } from "../../../firebase";
import { userActions } from "../../../store/actions";
import API from "../../../util/AxiosConfig";
import PitchDeck from "../../../components/PitchDeck/PitchDeck";
import Groups from "../../dashboard/app/groups";
import FinancialIndex from "../Financials";

export default function BusinessProfile() {
  let { type, id } = useParams();
  const user = useSelector((state) => state.authentication.user);
  const [profile, setProfile] = useState(null);
  const edit = user?.user_id == id ? true : false;
  const dispatch = useDispatch();
  const [key, setKey] = useState("all");
  const pitch = useSelector((state) => state.pitch.video);
  const loading = false;

  //FØRSTE API KALD, HENT BUSINESS PROFIL UDFRA ID. SÅ HENT LOGO, NAVN, BESKRIVELSE.
  useEffect(async () => {
    await API.get(`/getUser/${id}`).then(async (res) => {
      setProfile(res.data.user);
      dispatch(await pitchActions.getPitch(res.data.user?.id));
      setKey(type);

      if (user?.user_id !== Number(id)) {
        dispatch(viewActions.addProfileViews(id, user?.user_id));
      }
    });
  }, [user]);

  const uploadImage = async (image) => {
    const imageRef = storage.ref(`images/${image.name}`);
    await imageRef.put(image).on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (error) => {
        // file upload failed
        console.log(error);
      },
      () => {
        // file upload completed
        storage
          .ref(`images/${image.name}`)
          .getDownloadURL()
          .then(
            async (url) => {
              console.log(url);
              dispatch(userActions.updateProfilePicture(url, profile?.user_id));
            },
            (error) => {
              // failed to get download URL
              console.log(error);
            }
          );
      }
    );
  };

  //PASS ID TIL TEAM OG FILES, ÆNDR I DE OBJEKTER
  return (
    <Container fluid>
      <Row>
        <Col sm>
          <Row>
            <Col sm>
              <Card>
                <Card.Body className=" profile-page p-0">
                  <div
                    className="profile-header"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div
                      style={{ marginTop: "1.25rem" }}
                      className="user-detail text-center mb-3"
                    >
                      {profile?.profile_pic ? (
                        <div className="profile-img">
                          <img
                            src={profile?.profile_pic}
                            alt="profile-img1"
                            className="avatar-130 img-fluid"
                          />

                          {edit ? (
                            <label
                              className="add-picture"
                              for="file-input-cover"
                            >
                              <i className="fas fa-camera"></i>
                            </label>
                          ) : null}

                          <input
                            id="file-input-cover"
                            type="file"
                            onChange={async (e) =>
                              await uploadImage(e.target.files[0])
                            }
                            style={{ display: "none" }}
                          />
                        </div>
                      ) : (
                        <Spinner animation="grow" />
                      )}

                      <div className="profile-detail">
                        <h3>{profile?.name}</h3>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Tab.Container
            activeKey={key}
            onSelect={(k) => setKey(k)}
            id="left-tabs-example"
            defaultActiveKey="about-us"
          >
            <Card>
              <Card.Body>
                <div className="user-tabing">
                  <Nav
                    as="ul"
                    variant="pills"
                    className="d-flex align-items-center justify-content-center profile-feed-items p-0 m-0"
                  >
                    <Nav.Item as="li" className="col-12 col-sm-2 p-0">
                      <Nav.Link
                        href="#about-us"
                        eventKey="about-us"
                        role="button"
                        className="text-center p-3"
                      >
                        About us
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item as="li" className="col-12 col-sm-2 p-0">
                      <Nav.Link
                        href="#pitch"
                        eventKey="pitch"
                        role="button"
                        className="text-center p-3"
                      >
                        Pitch
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item as="li" className=" col-12 col-sm-2 p-0">
                      <Nav.Link
                        href="#business-team"
                        eventKey="team"
                        role="button"
                        className="text-center p-3"
                      >
                        Team
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item as="li" className=" col-12 col-sm-2 p-0">
                      <Nav.Link
                        href="#financials"
                        eventKey="financials"
                        role="button"
                        className="text-center p-3"
                      >
                        Financials
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item as="li" className="col-12 col-sm-2 p-0">
                      <Nav.Link
                        href="#business-files"
                        eventKey="files"
                        role="button"
                        className="text-center p-3"
                      >
                        Files
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
              </Card.Body>
            </Card>

            <Tab.Content>
              <Tab.Pane eventKey="pitch">
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: 50,
                    }}
                  >
                    <Spinner animation="grow" />
                  </div>
                ) : (
                  <>
                    {pitch ? (
                      <PitchDeck
                        pitchID={pitch.id}
                        pitchDeck={pitch.pitchDeck}
                        loom={pitch.loom}
                        calendly={pitch.calendly}
                        businessID={pitch.BusinessId}
                        userID={pitch.user_id}
                        company={pitch.companyName}
                        logo={pitch.companyLogo}
                        undertitle={pitch.title}
                        description={pitch.description}
                        thumbnail={pitch.thumbnail}
                        videoSrc={pitch.videoUrl}
                      />
                    ) : (
                      <Container>
                        <Row>
                          <Col sm={12}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                padding: 20,
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <h2>No pitch uploaded</h2>
                              <i
                                style={{
                                  fontSize: "4rem",
                                  marginTop: 20,
                                  marginBottom: 20,
                                }}
                                className="fas fa-times-circle"
                              ></i>
                              {user?.user_id == id ? (
                                <h3>
                                  Upload your first pitch!{" "}
                                  <Link to="/business/app/upload">
                                    Click Here.
                                  </Link>
                                </h3>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    )}{" "}
                  </>
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="about-us">
                <AboutUs />
              </Tab.Pane>

              <Tab.Pane eventKey="team">
                <Groups userID={profile?.id} urlID={id} />
              </Tab.Pane>

              <Tab.Pane eventKey="files">
                <File />
              </Tab.Pane>

              <Tab.Pane eventKey="financials">
                <FinancialIndex />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
}
