import React, { useState, useEffect } from "react";
import { pitchService } from "../../store/services/pitch.service";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { Row, Container, Col } from "react-bootstrap";
import Pitch from "../../components/Feed/Pitch";
import PitchDeck from "../../components/PitchDeck/PitchDeck";

export default function SavedPitches() {
  const [loading, setLoading] = useState(true);
  const [pitches, setPitches] = useState([]);
  const user = useSelector((state) => state.authentication.user);

  useEffect(async () => {
    setPitches(await pitchService.fetchSavedPitches(user.user_id));

    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Container fluid style={{ maxHeight: "80vh" }}>
            <Row>
              <Col lg={12} className="row m-0 p-0">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                  }}
                >
                  <Spinner animation="grow" />
                </div>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <Container fluid>
          <Row>
            <Col
              lg={12}
              className="row m-0 p-0"
              style={{
                overflowY: "scroll",
                scrollbarWidth: "thin",
                height: "80vh",
              }}
            >
              {pitches[0] ? (
                pitches.map((pitch, index) => (
                  <PitchDeck
                    key={index}
                    pitchDeck={pitch?.pitchDeck}
                    pitchID={pitch?.id}
                    businessID={pitch?.BusinessId}
                    userID={pitch?.user_id}
                    company={pitch?.companyName}
                    logo={pitch?.companyLogo}
                    undertitle={pitch?.title}
                    description={pitch?.description}
                    thumbnail={pitch?.thumbnail}
                    videoSrc={pitch?.videoUrl}
                  />
                ))
              ) : (
                <p>You haven't saved any pitches yet</p>
              )}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
